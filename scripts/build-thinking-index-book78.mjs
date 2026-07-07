import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 78;
const bookTitle = '中国现代史定论';
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
  (name) => name.startsWith('009.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zhongguo-xiandai-shi-dinglun',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《中国现代史定论》的现代史辨伪方法论、言论责任与胡秋原前后矛盾辨析、周恩来卖报传闻、傅斯年全集删文、吴铁城回忆录删减、辽西与淮海徐蚌战史、黄维辨伪和王仲廉回忆录中提取思想索引。description 保留源文本原段落；目录、日期、电子书页脚、注释清单、傅斯年和吴铁城附录原文等外部材料不直接转为李敖思想索引。',
};

const candidates = [
  ['001.', 3, '法权', '法律不能箝制历史论定'],
  ['001.', 4, '方法', '诉状不通史学也不明法理'],
  ['001.', 5, '法权', '缠讼不能替代历史申辩'],
  ['001.', 6, '方法', '分类排比逐条驳斥诬控'],
  ['001.', 14, '方法', '史学专名不可因忌讳改称'],
  ['001.', 16, '方法', '丑史遮不住要用证据表格'],
  ['001.', 22, '方法', '举证严肃须排除重复抄袭'],
  ['001.', 41, '方法', '可用对方权威反证控诉'],
  ['001.', 69, '方法', '判断叛国要看必要充分条件'],
  ['001.', 78, '人格', '维护真实者不能接受歪曲'],
  ['001.', 81, '政治', '闽变性质不脱叛与乱'],
  ['001.', 102, '人格', '证件面前不屈服真理即无耻'],
  ['001.', 111, '方法', '官方文告可反驳不能扯共产党'],
  ['001.', 123, '人格', '狡辩会使人格破产信用坠地'],
  ['001.', 132, '方法', '事实可反驳断无夹击说'],
  ['001.', 135, '方法', '外方资料可补足中国史证'],
  ['001.', 271, '方法', '史料切片可见全局关系'],
  ['001.', 275, '政治', '闽变使赤匪垂灭之焰复燃'],
  ['001.', 279, '方法', '澄清真相不是叫人偿命'],
  ['001.', 280, '方法', '常识与人证并用辨流血战争'],
  ['001.', 324, '方法', '铁证可击穿未经流血说'],
  ['001.', 336, '方法', '抗日歧见不能解释叛国行为'],
  ['001.', 345, '政治', '标榜抗日也可能通敌'],
  ['001.', 391, '方法', '外文定称可校正词义狡辩'],
  ['001.', 403, '政治', '就地保护是日本利用内战'],
  ['001.', 430, '方法', '旁证考据可揭穿抗日故事'],
  ['001.', 431, '方法', '旁证一考据即可露破绽'],
  ['001.', 442, '方法', '歪曲历史会吓阻现代史研究'],
  ['001.', 444, '方法', '往事云烟后青史要落实证'],

  ['002.', 2, '写作', '拿笔杆者要想言论长远影响'],
  ['002.', 3, '写作', '言论责任可兴邦也可丧邦'],
  ['002.', 4, '人格', '立言应小心翼翼'],
  ['002.', 5, '写作', '冒舆论乱抒会助长悲剧'],
  ['002.', 13, '方法', '检讨一人可作国民党心态抽样'],
  ['002.', 34, '方法', '若即若离是合作先河'],
  ['002.', 39, '文化', '左倾分子争马克思正统'],
  ['002.', 56, '方法', '公开言论可与俄共策略比对'],
  ['002.', 70, '方法', '白纸黑字能揭示前后反复'],
  ['002.', 71, '方法', '美国不会跟着昨非今是'],
  ['002.', 75, '政治', '赞颂斯大林比郭沫若更早'],
  ['002.', 81, '方法', '明知苏联野心却替其洗刷'],
  ['002.', 86, '方法', '冠冕话语可包裹亲苏立场'],
  ['002.', 92, '方法', '后来事实可检验铁的友谊'],
  ['002.', 100, '政治', '千言万语不过宣扬和平共存'],
  ['002.', 114, '人格', '用侨寓身份欺骗同胞'],
  ['002.', 117, '方法', '前后文字一对破绽毕现'],
  ['002.', 128, '方法', '文证证明早年替苏联做伪证'],
  ['002.', 129, '人格', '助长赤焰者不该装反共先觉'],
  ['002.', 135, '方法', '事后吹牛要回看当时文字'],
  ['002.', 156, '方法', '深信之中可看出真实看法'],
  ['002.', 157, '方法', '当时先知说经不起当时文字'],
  ['002.', 163, '政治', '中苏亲善无利害冲突是怪话'],
  ['002.', 168, '政治', '同路人宣传换口径更易上当'],
  ['002.', 172, '方法', '话调相同可见同路关系'],
  ['002.', 177, '政治', '替莫斯科隐蔽关系就是拉幕'],
  ['002.', 180, '方法', '把自己错误推给世界人士是健忘'],
  ['002.', 187, '政治', '只可政治解决会动摇戡乱'],
  ['002.', 193, '方法', '表面各打五十板骨子有利一方'],
  ['002.', 199, '方法', '内战论调与同路人众口声同'],
  ['002.', 201, '人格', '自己也曾抱有错误心理'],
  ['002.', 205, '政治', '和平宣言是中立主义调子'],
  ['002.', 212, '政治', '不偏不袒有中立袒共味道'],
  ['002.', 214, '方法', '抽象和平名词要问帮助谁'],
  ['002.', 215, '方法', '宣言没提俄帝不能证明反俄'],
  ['002.', 228, '人格', '等着看台湾是否可保是投机'],
  ['002.', 230, '人格', '对台湾无信心是失败投机'],
  ['002.', 235, '人格', '五十天前等共党百姓后即大反共'],
  ['002.', 238, '人格', '反共需要言行一致'],
  ['002.', 241, '人格', '不同进退不能说共患难'],
  ['002.', 259, '方法', '矛盾定义使人无所适从'],
  ['002.', 261, '方法', '所有的宝全压只是投机赌法'],
  ['002.', 262, '方法', '全压正反论点不等于远见'],
  ['002.', 263, '政治', '抽样调查可识国民党文化水平'],

  ['003.', 4, '方法', '周恩来根本没上街卖报'],
  ['003.', 8, '政治', '蒋介石封锁新四军真相'],
  ['003.', 10, '方法', '调查可辨正流行传闻'],

  ['004.', 3, '写作', '傅斯年选集曾被警总压力删文'],
  ['004.', 4, '方法', '增补四十三篇都不敢自吹全集'],
  ['004.', 5, '方法', '自吹全集却漏重要文章是不及格'],
  ['004.', 6, '政治', '豪门资本影响延伸到台湾'],

  ['005.', 3, '政治', '吴铁城放纵陶百川蹂躏人权'],
  ['005.', 4, '方法', '回忆录未完说法可疑'],
  ['005.', 5, '方法', '残卷证明章目未写说不实'],
  ['005.', 6, '方法', '改稿痕迹暴露删掉国共合作'],
  ['005.', 7, '方法', '不敢说真话难了解真历史'],

  ['006.', 3, '方法', '廖耀湘殉国说是假的'],
  ['006.', 5, '方法', '回忆文字揭蒋介石真面目'],
  ['006.', 6, '政治', '辽西战役关键在蒋介石不知兵'],
  ['006.', 7, '方法', '杜聿明回忆揭穿收复锦州之谜'],
  ['006.', 9, '政治', '蒋介石大梦导致兵败被俘'],
  ['006.', 12, '方法', '两种回忆对照看兵败逃亡图'],
  ['006.', 13, '政治', '辽西战役证明蒋介石不知兵'],

  ['007.', 2, '政治', '淮海徐蚌使国民党元气大伤'],
  ['007.', 3, '政治', '越级指挥使派哪种门将都一样'],
  ['007.', 5, '政治', '国民党想制造文天祥'],
  ['007.', 6, '政治', '兵败山倒早萌伏机'],

  ['008.', 2, '方法', '杜聿明回忆颇足警世'],
  ['008.', 3, '政治', '徐州大捷宣传遮盖黄百韬战死'],
  ['008.', 5, '人格', '杜聿明不肯遗弃官兵独逃'],
  ['008.', 6, '政治', '飞机关怀只是给别人看的'],

  ['009.', 2, '方法', '国民党给降将施脂粉'],
  ['009.', 4, '政治', '蒋介石错误遥控使援军待援'],
  ['009.', 5, '人格', '逃命约定事后成自了汉'],
  ['009.', 6, '方法', '黄维一直未屈服说并非事实'],
  ['009.', 7, '写作', '台湾有李敖国民党难一手遮天'],

  ['010.', 5, '方法', '老贼之死也可做机会教育'],
  ['010.', 7, '方法', '回忆录可知人察世'],
  ['010.', 16, '文化', '革命家也有迷信观念'],
  ['010.', 21, '方法', '王仲廉自拆鲁西战役内幕'],
  ['010.', 29, '人格', '国民党武夫以文事收场'],
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
  '- 保留可独立检索的现代史辨伪方法、言论责任、政治投机、国民党宣传与删文、战史回忆互证、将领传闻辨伪等判断。',
  '- 删除目录、日期、电子书页脚、注释清单、长串史料清单、傅斯年和吴铁城附录原文等外部材料。',
  '- 对长篇中的大段引文，只取李敖自己的导言、判断、归纳、辨伪方法和结论段；标题可浓缩，description 保留源文本原段落，不改写。',
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
