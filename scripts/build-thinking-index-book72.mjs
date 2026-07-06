import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 72;
const bookTitle = '为历史拨云';
const round = '提取轮';
const status = '待校对';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('009.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('003.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'wei-lishi-boyun',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《为历史拨云》的历史拨乱、名教传统、诉讼法权、政治礼俗、图章政治与史学方法等文章中提取思想索引。description 保留源文本原段落；目录、纯题名、档案页尾、长资料清单和他人附录不进入本轮。',
};

const candidates = [
  ['001.', 3, '方法', '四种乌云遮蔽中国史'],
  ['001.', 5, '政治', '一党史观制造假史'],
  ['001.', 6, '政治', '教条史观强史就框架'],
  ['001.', 9, '方法', '历史要见真东西'],

  ['002.', 4, '文化', '五百年思想延续史家抱负'],
  ['002.', 5, '文化', '五百年成为抱负时间单位'],

  ['003.', 4, '文化', '观音形象可男可女'],
  ['003.', 6, '情爱', '以欲止欲成为佛门理论'],

  ['004.', 4, '文化', '恶名加偏旁成为传统'],
  ['004.', 6, '文化', '加水思想荒唐到误认本名'],

  ['005.', 3, '方法', '贪污可分三型'],
  ['005.', 4, '人格', '贪得无厌是贪污狂'],
  ['005.', 5, '政治', '贪污自污可消弭猜忌'],
  ['005.', 6, '政治', '入不敷出造成开支型贪污'],
  ['005.', 7, '政治', '肃贪要改监督与薪金'],

  ['006.', 4, '方法', '单因解释杀嵇康不可取'],
  ['006.', 5, '文化', '名教与自然相对'],
  ['006.', 7, '政治', '名教可被用来镇压不合作'],
  ['006.', 8, '文化', '名教滚成纲常总称'],

  ['007.', 4, '文化', '名器要谨慎赋予'],
  ['007.', 6, '知识', '名器泛指品位级位'],
  ['007.', 7, '政治', '名器应给最该享有者'],

  ['008.', 2, '知识', '汉贼不两立出处要辨正'],
  ['008.', 3, '政治', '诸葛亮北伐是不愿坐亡'],
  ['008.', 4, '政治', '偏安之后两立已成'],
  ['008.', 5, '政治', '国民党忘了王业不偏安'],

  ['009.', 4, '政治', '科举是统治泄洪管道'],
  ['009.', 8, '文化', '半部论语成为刻板思想'],

  ['010.', 4, '政治', '科举耗尽英雄才力'],

  ['011.', 4, '政治', '大臣之风在抓大事'],
  ['011.', 6, '人格', '大人之行在经国安社稷'],
  ['011.', 8, '政治', '国民党大臣专管小事'],

  ['012.', 2, '政治', '大臣标准高于常人小官'],
  ['012.', 3, '人格', '大臣进退要守原则'],
  ['012.', 5, '人格', '合则留不合则去'],
  ['012.', 6, '政治', '恋栈官位是小人无耻'],

  ['013.', 4, '政治', '任命大官应查档案'],
  ['013.', 6, '人格', '恋栈官位会低三下四'],

  ['014.', 2, '写作', '无暇私交才能写大文章'],
  ['014.', 3, '人格', '坦荡久了秘密最少'],
  ['014.', 5, '政治', '国民党大臣无超然风度'],

  ['015.', 5, '人格', '真君子不做公关'],

  ['016.', 6, '文化', '不共戴天应正解'],
  ['016.', 7, '法权', '复仇会乱法犯禁'],
  ['016.', 9, '法权', '调人以回避解决复仇'],
  ['016.', 12, '方法', '译注错误必须辨正'],

  ['018.', 4, '法权', '神羊在司法中像陪审'],
  ['018.', 5, '法权', '中国法律传统有神判痕迹'],
  ['018.', 6, '方法', '王充质疑神羊断罪'],
  ['018.', 11, '文化', '中国被獬豸所弄'],

  ['020.', 2, '法权', '下情上达须先付代价'],
  ['020.', 3, '法权', '立肺石实际难见其利'],
  ['020.', 9, '政治', '国民党不如古人让下情上达'],

  ['021.', 3, '政治', '烧黑资料安反侧者'],
  ['021.', 7, '政治', '今人缺少烧黑资料气度'],

  ['022.', 2, '政治', '官者管也'],
  ['022.', 3, '政治', '官逼民反来自民不畏死'],
  ['022.', 4, '政治', '国民党公信力低到民逼官反'],

  ['023.', 3, '法权', '百姓喊冤有三条路'],
  ['023.', 5, '法权', '拦舆申诉仍有严罚'],
  ['023.', 6, '文化', '奇冤转向青天崇拜'],
  ['023.', 10, '法权', '拦路告状被斥落伍'],

  ['024.', 4, '政治', '民主政治不能围着椅子打转'],
  ['024.', 9, '政治', '宋太祖撤座位的政治椅子学'],

  ['025.', 4, '法权', '中国有听狱之限'],
  ['025.', 6, '法权', '人权既怕草率也怕拖延'],
  ['025.', 8, '法权', '淹禁不决损害人权'],

  ['026.', 6, '文化', '物之生克哲学'],
  ['026.', 7, '方法', '观察粗疏导致吃蝙蝠屎'],
  ['026.', 10, '方法', '伊索比曹植观察深刻'],
  ['026.', 13, '政治', '清议不是骑墙'],
  ['026.', 14, '人格', '主持正义须立场明确'],

  ['027.', 2, '政治', '国王不能与民争利'],
  ['027.', 4, '政治', '防民之口甚于防川'],

  ['028.', 2, '政治', '中国有厌恶政治传统'],
  ['028.', 5, '政治', '政治污染自由尊严'],
  ['028.', 6, '人格', '知识分子也被政治污染'],

  ['029.', 5, '文化', '哭庙必须先定关系位阶'],
  ['029.', 7, '政治', '哭庙变成请求德政管道'],
  ['029.', 9, '政治', '哭庙抗议会招来杀身'],

  ['030.', 2, '政治', '政治用有情做手段'],
  ['030.', 5, '政治', '宋太祖放任前朝之哭'],
  ['030.', 8, '政治', '哭有爱哭与畏哭'],
  ['030.', 9, '政治', '以哭换好感是政治滥情'],

  ['031.', 3, '政治', '大员上香是在提倡迷信'],
  ['031.', 4, '文化', '迷信也有分寸分际'],
  ['031.', 5, '文化', '淫祠泛滥显示迷信政治'],

  ['032.', 2, '文化', '中国盖印源于文盲与官制'],
  ['032.', 16, '政治', '抓把印子象征大权在握'],
  ['032.', 19, '文化', '蜜印使死人干过瘾'],

  ['033.', 5, '政治', '图章政治来自代拆代行'],
  ['033.', 8, '政治', '图章使权责脱节'],
  ['033.', 18, '政治', '图章使引用私人必然'],
  ['033.', 21, '方法', '分层负责须废止图章'],
  ['033.', 28, '政治', '签字会迫使分工负责'],
  ['033.', 41, '政治', '师爷图章使权责分离'],
  ['033.', 42, '政治', '秘书长制度违背分层负责'],
  ['033.', 43, '政治', '议会问责需要权责合一'],
  ['033.', 49, '政治', '一人一职一名一票'],
  ['033.', 57, '政治', '盖章推诿伤行政效率'],
  ['033.', 61, '政治', '签名取代印章可迫分层负责'],
  ['033.', 70, '政治', '盖章导致责任不清职掌混淆'],
  ['033.', 72, '政治', '以签名代盖章使行政脱胎换骨'],
  ['033.', 73, '政治', '国民党对图章政治知易行难'],

  ['034.', 5, '文化', '身体发肤成为孝道元目'],
  ['034.', 9, '文化', '忠孝会发生身体冲突'],
  ['034.', 10, '文化', '不敢毁伤无法自圆其说'],

  ['035.', 10, '情爱', '老夫少妻被说成相济'],
  ['035.', 12, '情爱', '年老情欲牵出性别双标'],

  ['036.', 6, '法权', '小民直接上书后果严重'],
  ['036.', 8, '政治', '现代权力以不让接近给自由'],

  ['037.', 2, '文化', '家族是完整单位'],
  ['037.', 4, '文化', '工业社会冲突传统大家庭'],
  ['037.', 5, '文化', '孝道必须随社会变化打折扣'],

  ['038.', 3, '政治', '幽高墙是软禁优待'],
  ['038.', 11, '政治', '高墙软禁造成骨肉惨象'],

  ['039.', 10, '文化', '成年礼不伦不类'],
  ['039.', 12, '文化', '制礼作乐需背景需要'],
  ['039.', 13, '政治', '成年礼是开倒车扰民'],
  ['039.', 14, '文化', '礼的理论是因事制宜'],

  ['040.', 6, '方法', '考古出土可证伪大牌学者'],
  ['040.', 7, '写作', '出名后难改无才'],

  ['041.', 4, '文化', '守制训练阳奉阴违'],
  ['041.', 7, '法权', '奔丧法给禁子上下其手'],
  ['041.', 9, '法权', '得准字眼封杀奔丧权'],

  ['042.', 2, '人格', '真理关头当仁不让师'],
  ['042.', 6, '人格', '中国人学会不让老师'],

  ['043.', 4, '方法', '实事求是是从实事求是'],
  ['043.', 10, '人格', '实事求是反对和稀泥'],
  ['043.', 11, '方法', '真理须追求也须实践'],

  ['044.', 5, '人格', '毁誉听人是非存己'],
  ['044.', 8, '法权', '平反尽力是人权保障'],

  ['045.', 5, '人格', '济天下众坚持'],
  ['045.', 6, '人格', '卫天下道坚持'],
  ['045.', 7, '法权', '守天下法反对手滑治国'],
  ['045.', 8, '人格', '先天下忧是积极怀抱'],

  ['046.', 3, '方法', '不能抹杀历史事实'],
  ['046.', 5, '政治', '岳飞案祸首是领袖本人'],
  ['046.', 7, '政治', '军人守土无能扰民有余'],

  ['047.', 6, '方法', '治史要详人所略'],
  ['047.', 12, '文化', '捺钵是求生不是游幸'],
  ['047.', 17, '政治', '捺钵成为施政中心'],
  ['047.', 19, '文化', '捺钵遗制影响三朝'],

  ['048.', 7, '方法', '开放档案以外仍须驳谬'],
  ['048.', 8, '政治', '台湾不是盛世'],
  ['048.', 9, '方法', '盛世修史说不通'],
  ['048.', 10, '方法', '春秋之笔也会遮盖真相'],
  ['048.', 11, '方法', '史官制度须保障直笔'],
];

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphsOf(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'，。！？、：；（）()\s]+/g, '')
    .slice(0, 18);
}

function makeKeywords(category, title, sourceFile) {
  return [...new Set([category, cleanKeyword(title), cleanKeyword(fileTitle(sourceFile))].filter(Boolean))].join(',');
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const seen = new Map();
  for (const record of master.records ?? []) {
    const normalized = normalizeText(record.description);
    if (normalized) seen.set(normalized, record.id);
  }
  return seen;
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function writeCsv(filePath, records) {
  const headers = [
    'id',
    'book',
    'round',
    'status',
    'category',
    'title',
    'description',
    'source_file',
    'source_paragraph',
    'source_path',
    'keywords',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

const existingDescriptions = loadExistingDescriptions();
const seenInBook = new Map();
const skippedDuplicates = [];
let nextRecordNumber = 1;

const records = candidates.flatMap(([sourceRef, paragraphNumber, category, title]) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceRef}:${paragraphNumber}`);
  }

  const sourceFile = resolveSourceFile(sourceRef);
  const paragraphs = sourceParagraphs(sourceFile);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  const normalized = normalizeText(description);
  const existingId = existingDescriptions.get(normalized);
  const inBookId = seenInBook.get(normalized);
  if (existingId || inBookId) {
    skippedDuplicates.push({
      sourceFile,
      paragraphNumber,
      title,
      duplicateOf: existingId ?? inBookId,
    });
    return [];
  }

  const id = `LAT${String(bookSeq).padStart(3, '0')}-${String(nextRecordNumber).padStart(3, '0')}`;
  nextRecordNumber += 1;
  seenInBook.set(normalized, id);

  return [
    {
      id,
      book: bookTitle,
      round,
      status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: paragraphNumber,
      source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(category, title, sourceFile),
    },
  ];
});

const outputBook = {
  ...book,
  record_count: records.length,
  candidate_count: candidates.length,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: categoryCounts(records),
};

const payload = {
  generated_at: new Date().toISOString(),
  book: outputBook,
  taxonomy,
  records,
  skipped_duplicates: skippedDuplicates,
};

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);

const markdown = [
  `# ${bookTitle}思想索引（提取轮）`,
  '',
  `- 书名：${bookTitle}`,
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 条目数：${records.length}`,
  `- 候选数：${candidates.length}`,
  `- 跳过重复：${skippedDuplicates.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 索引',
  '',
  ...records.map((record) =>
    [
      `### ${record.id} ${record.title}`,
      '',
      `- 分类：${record.category}`,
      `- 来源：${record.source_file}#${record.source_paragraph}`,
      '',
      record.description,
      '',
    ].join('\n'),
  ),
].join('\n');

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), markdown, 'utf8');
fs.writeFileSync(
  path.join(outputDir, '思想索引.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引.csv'), records);
fs.writeFileSync(
  path.join(outputDir, '思想索引.txt'),
  records
    .map((record) =>
      [
        `${record.id}｜${record.category}｜${record.title}`,
        `来源：${record.source_file}#${record.source_paragraph}`,
        record.description,
      ].join('\n'),
    )
    .join('\n\n'),
  'utf8',
);

const note = [
  `# ${bookTitle}提取说明`,
  '',
  `本轮从源目录 \`${sourceBookDir.replaceAll(path.sep, '/')}\` 提取。`,
  '',
  '取舍原则：',
  '',
  '- 保留可独立检索的史学方法、政治判断、法权诉求、文化批判、人格判断、写作自况与情爱观照。',
  '- 删除目录、纯标题、日期、档案页尾、长资料清单，以及不能独立承载思想的例证碎片。',
  '- `006.中国人的名教思想.txt` 中胡适《名教》附录不进入本轮，只取李敖自己的引论段落。',
  '- 标题可浓缩，description 保留源文本原段落，不改写。',
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  `候选 ${candidates.length} 条，生成 ${records.length} 条，跳过重复 ${skippedDuplicates.length} 条。`,
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(`Built ${bookTitle}: ${records.length} records.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
if (skippedDuplicates.length) {
  console.log(`Skipped duplicates: ${skippedDuplicates.length}`);
}
