import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 79;
const bookTitle = '中国迷信新研';
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
  (name) => name.startsWith('010.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zhongguo-mixin-xinyan',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《中国迷信新研》的割股愚孝、厌胜厌镇、祝诅巫蛊、纸人与偶人、媚道、勾魂摄魄、祖坟风水、厉鬼、阴部思想和国民党迷信意识形态中提取思想索引。description 保留源文本原段落；长表格、纯材料引文、日期、电子书页脚和他人来信中非李敖判断段落不直接转为思想索引。',
};

const candidates = [
  ['001.', 5, '文化', '割股是中国文化只此一家的花样'],
  ['001.', 6, '文化', '巫医系统延伸到今日中医'],
  ['001.', 7, '文化', '割肉治病比正统医学更荒诞'],
  ['001.', 630, '方法', '大表统计可呈现割股全貌'],
  ['001.', 631, '方法', '地域分布揭示割股集中区'],
  ['001.', 632, '知识', '割肉部位统计显示割股占多数'],
  ['001.', 633, '方法', '训诂可归并割肉方法'],
  ['001.', 634, '方法', '医学常识可质疑割肉存活'],
  ['001.', 635, '方法', '神乎其技的割肉记述不可信'],
  ['001.', 637, '方法', '屠户刀法不能解释割肺存活'],
  ['001.', 639, '方法', '公式化成功率暴露荒谬叙述'],
  ['001.', 640, '方法', '霍然病愈是公式化描写'],
  ['001.', 642, '方法', '割肝割肺不能按常识相信'],
  ['001.', 644, '知识', '割股事实上的伤亡率可观'],
  ['001.', 646, '文化', '多角割股显示愚孝加码'],
  ['001.', 648, '文化', '割肉事姑显示儿媳压力'],
  ['001.', 650, '文化', '准儿媳也会成为文化牺牲品'],
  ['001.', 653, '文化', '祖父也能吃小孙女的肉'],
  ['001.', 656, '文化', '婢女也会被纳入割股伦理'],
  ['001.', 658, '文化', '割股行为有祷告公式'],
  ['001.', 659, '文化', '孝感动天是割股原因'],
  ['001.', 663, '文化', '病人思肉促成亲人代肉'],
  ['001.', 668, '文化', '医药无效使人肉变药物'],
  ['001.', 672, '政治', '官方荣誉鼓励割股'],
  ['001.', 677, '方法', '韩愈认为割股反成不孝'],
  ['001.', 678, '政治', '免税优待使割股不单纯'],
  ['001.', 680, '政治', '割股可演变成逃税手段'],
  ['001.', 688, '政治', '明太祖处理割股采取两面光'],
  ['001.', 691, '政治', '禁例使政府不再公开鼓励割股'],
  ['001.', 695, '政治', '官方不鼓励实际仍鼓励'],
  ['001.', 701, '知识', '未成年女孩割股数量很多'],
  ['001.', 709, '文化', '民国以后大脑中仍是旧中国'],

  ['002.', 4, '方法', '男女割股需分开取材研究'],
  ['002.', 15, '文化', '毁伤身体与救亲大孝形成两难'],
  ['002.', 19, '人格', '反迷信者也会在割股上糊涂'],
  ['002.', 22, '方法', '欧阳修的两难造成思想双轨'],
  ['002.', 30, '方法', '正史割股点灯太不可信'],
  ['002.', 32, '方法', '器官移植式孝行是胡扯'],
  ['002.', 42, '政治', '正史言论与政府奖励形成双轨'],
  ['002.', 44, '政治', '官方斥为非正仍予奖励'],
  ['002.', 66, '政治', '统治者只能接受两面光主意'],
  ['002.', 69, '文化', '夫妇割股比赛别有洞天'],
  ['002.', 73, '文化', '争割模式会互相复制'],
  ['002.', 77, '政治', '清代男人割股仍受政府鼓励'],
  ['002.', 88, '方法', '割股佳话也是鬼话'],
  ['002.', 94, '文化', '前进读书人也难免文化压力'],
  ['002.', 95, '写作', '研究中国文化要有行家水准'],
  ['002.', 97, '文化', '男女割股对象差异值得注意'],

  ['003.', 2, '方法', '现代台湾割股材料也应补入'],
  ['003.', 21, '文化', '现代台湾仍有礼失求野痕迹'],
  ['003.', 22, '写作', '鬼书来自欠通文字水平'],

  ['004.', 44, '方法', '根深蒂固材料极难处理'],
  ['004.', 45, '方法', '研究需独具慧眼又上穷碧落'],
  ['004.', 46, '方法', '旁征博引粗中有细是必要条件'],
  ['004.', 47, '方法', '大判断与小结裹缺一不可'],
  ['004.', 50, '写作', '好文章能融著述与比类'],

  ['005.', 2, '知识', '铸像卜休咎是北方民族习惯'],
  ['005.', 6, '文化', '铸像失败可左右政治抉择'],
  ['005.', 8, '文化', '皇后取舍也可由铸像决定'],
  ['005.', 9, '方法', '没落习惯仍值得研究'],

  ['006.', 2, '知识', '厌胜一词源于压伏'],
  ['006.', 3, '文化', '厌胜相信诅咒可制胜'],
  ['006.', 4, '文化', '厌胜往往配合法术道具'],
  ['006.', 7, '文化', '厌胜钱从攻击转为镇邪'],
  ['006.', 8, '文化', '照片可成为现代厌胜道具'],
  ['006.', 9, '文化', '打小人分记名与不记名'],

  ['007.', 2, '知识', '厌镇是建筑中的巫术手脚'],
  ['007.', 4, '文化', '木工厌胜被说成行业传统'],
  ['007.', 6, '文化', '厌镇文明邪恶而多样'],

  ['008.', 2, '文化', '厌炮用女人裸体破炮火'],
  ['008.', 4, '文化', '厌炮思想随火炮出现'],
  ['008.', 7, '文化', '把炮当战士才会用阴部厌炮'],

  ['009.', 2, '知识', '祝诅是祈鬼神降祸他人'],
  ['009.', 4, '政治', '皇帝也会向下祝诅臣民'],
  ['009.', 6, '法权', '祝诅思想常引发凶案重刑'],
  ['009.', 7, '文化', '活动偶人增强祝诅效果'],

  ['010.', 2, '文化', '纸人取代偶人更方便'],
  ['010.', 3, '知识', '纸人有三种迷信用途'],
  ['010.', 6, '文化', '纸人被当作施法替身'],
  ['010.', 7, '文化', '消灭纸人也大费周章'],

  ['011.', 2, '情爱', '媚道迷信兼具固宠与害敌'],
  ['011.', 4, '情爱', '媚道要祭祀吃药等形式条件'],
  ['011.', 6, '情爱', '媚道可用婴儿肢体作条件'],
  ['011.', 7, '情爱', '春宫画也可成为媚道工具'],

  ['012.', 2, '知识', '蛊毒与巫蛊须分辨'],
  ['012.', 3, '法权', '一杀一烧显示蛊毒巫蛊差异'],
  ['012.', 4, '文化', '巫蛊之事史不乏书'],
  ['012.', 5, '文化', '巫蛊不全由女巫行之'],

  ['013.', 2, '知识', '偶人有冥器与害人两用'],
  ['013.', 3, '文化', '偶人被视为本人替身'],
  ['013.', 5, '政治', '掘地求偶人会造成政治大乱'],
  ['013.', 6, '文化', '埋偶人迷信后代照来'],

  ['014.', 2, '知识', '勾摄从行政语转为捉拿'],
  ['014.', 3, '文化', '捉拿身体延伸为勾取灵魂'],
  ['014.', 6, '法权', '勾魂可被用来办案'],
  ['014.', 11, '文化', '照相术入华产生摄魄传说'],
  ['014.', 13, '文化', '摄魄文化可对照勾魂传统'],

  ['015.', 2, '人格', '其如予何表达自信口气'],
  ['015.', 5, '人格', '天命在兹会留下自信影响'],
  ['015.', 6, '文化', '天命自信会变相发作'],

  ['016.', 2, '文化', '地脉被相信关系吉凶'],
  ['016.', 3, '文化', '祖坟风水比住宅更重要'],
  ['016.', 4, '知识', '阴宅风水在晋后走火入魔'],
  ['016.', 7, '文化', '地脉念头集中到祖坟'],
  ['016.', 8, '政治', '掘祖坟破敌宋朝已有'],
  ['016.', 9, '政治', '掘敌祖坟成为中国政治文化'],
  ['016.', 10, '政治', '现代政治愤怒仍会指向祖坟'],

  ['017.', 2, '知识', '厉鬼含恶鬼与绝后之鬼'],
  ['017.', 4, '文化', '病入膏肓源于厉鬼索命'],
  ['017.', 6, '人格', '活人不如厉鬼可作激将'],
  ['017.', 8, '文化', '疾病可被解释为神鬼作弄'],
  ['017.', 10, '文化', '鬼有所归乃不为厉'],
  ['017.', 11, '文化', '厉鬼也可成为复仇表达'],
  ['017.', 12, '政治', '厉鬼被拿来反共抗俄'],

  ['018.', 2, '情爱', '阴阳生殖器思想充满矛盾'],
  ['018.', 3, '情爱', '生殖器崇拜也及于女人'],
  ['018.', 4, '情爱', '妇人厌炮是阴部思想精华'],

  ['019.', 13, '政治', '国民党意识形态上限教条下限迷信'],
  ['019.', 14, '文化', '上层教条与下层迷信并存'],
  ['019.', 16, '政治', '官僚学究方士流毒被国民党接收'],
  ['019.', 17, '人格', '大迷信后劝人不迷信脸皮太厚'],
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
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalizeText)
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
    .replace(/[《》“”‘’"!?.,，。！？、：；（）()\s]+/g, '')
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
    if (record.book === bookTitle) continue;
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
  '- 保留可独立检索的割股愚孝机制、迷信术语定义、史料辨伪方法、官方鼓励结构、巫术与政治案件、祖坟风水、厉鬼观念、阴部思想和国民党迷信意识形态等判断。',
  '- 删除长表格、纯材料引文、日期、电子书页脚和他人来信中非李敖判断段落。',
  '- 对短篇考证保留定义、归纳、关键判断与方法段；标题可浓缩，description 保留源文本原段落，不改写。',
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
