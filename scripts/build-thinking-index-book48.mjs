import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const diaryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('006.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, diaryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('006.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '048.李敖秘藏日记');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '048',
  title: '李敖秘藏日记',
  slug: 'leeao-micang-riji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖秘藏日记》中的软禁残记、金兰琐碎、鲁迅与曹禺评论、1985年一月至四月日记，以及若干短篇随记中提取思想索引。description 保留源文本原段落；新闻材料、他人长引、纯行程流水、资料堆列、短小机锋和广告尾注不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['写作', '001', 3, '软禁伤痕', '软禁,日记,写作'],
  ['政治', '001', 42, '监视编制', '监视,警总,政治'],
  ['方法', '001', 133, '不斗走狗', '监视,应对,方法'],
  ['法权', '001', 231, '非法待遇', '调查局,法律,法权'],
  ['方法', '001', 253, '大目标研究', '世界性,研究,方法'],
  ['法权', '001', 267, '政治问题', '彭案,法律,法权'],
  ['文化', '001', 269, '不胁人亲', '度量,人质,文化'],
  ['政治', '001', 270, '市义买心', '出境,自由,政治'],

  ['写作', '002', 3, '年表取舍', '年表,日记,写作'],
  ['人格', '002', 13, '智者不忧', '孤独,自得,人格'],
  ['情爱', '002', 23, '性与自由', '性交,自由,情爱'],
  ['写作', '002', 33, '专栏条件', '专栏,批评,写作'],
  ['法权', '002', 39, '法治不过', '冤狱,公权,法权'],
  ['方法', '002', 45, '不浪费生命', '生命,取舍,方法'],
  ['方法', '002', 59, '结算前半生', '生命,反省,方法'],
  ['知识', '002', 61, '采花知识', '知识,生命,方法'],
  ['写作', '002', 62, '生命产品', '写作,生命,产品'],
  ['写作', '002', 118, '发热状态', '写作,发热,方法'],
  ['方法', '002', 142, '澄虑掌舵', '价值判断,澄虑,方法'],
  ['方法', '002', 144, '生活下限', '时间,生活表,方法'],
  ['人格', '002', 171, '立言立德', '隐居,立言,人格'],
  ['写作', '002', 177, '抑制作业', '写作,人物,方法'],
  ['写作', '002', 182, '套改现世', 'fiction,写实,写作'],
  ['写作', '002', 189, '虚构自由', 'fiction,non-fiction,写作'],
  ['方法', '002', 196, '防止零碎', '时间,零碎,方法'],
  ['写作', '002', 200, '作品标准', '世界性,永恒性,写作'],
  ['写作', '002', 201, '因写而看', '阅读,写作,方法'],
  ['方法', '002', 205, '先写五小时', '时间,写作,方法'],
  ['人格', '002', 213, '不与陨石同碎', '世界性,工作,人格'],
  ['人格', '002', 245, '勇敢笑容', '勇敢,危机,人格'],
  ['写作', '002', 249, '剧本单元', 'fiction,剧本,写作'],
  ['写作', '002', 253, '电影技法', '群众,印象,写作'],
  ['人格', '002', 269, '孤独愉悦', '清气,孤独,人格'],
  ['方法', '002', 280, '隐居训练', '闭关,训练,方法'],

  ['文化', '003', 3, '酱缸来源', '鲁迅,审查,文化'],
  ['文化', '003', 5, '文艺自由', '鲁迅,创作自由,文化'],
  ['人格', '003', 10, '追求真理', '真理,反抗,人格'],
  ['写作', '003', 11, '杂文主菜', '鲁迅,杂文,写作'],
  ['知识', '003', 13, '情绪思想', '鲁迅,思想,知识'],
  ['文化', '003', 15, '思想贫乏', '鲁迅,中国人,文化'],
  ['文化', '003', 16, '政治膨胀', '文人,政治,文化'],
  ['政治', '003', 18, '无出路批评', '国民党,批评,政治'],
  ['人格', '003', 19, '高压自我', '真理,高压,人格'],
  ['情爱', '003', 22, '爱情自由', '爱情,自由,情爱'],

  ['法权', '004', 11, '抢书钳制', '抢书,言论自由,法权'],

  ['政治', '005', 4, '反乡愿', '公道,党外,政治'],
  ['文化', '005', 5, '私昵造像', '历史,铜像,文化'],
  ['政治', '005', 6, '狭小气量', '国民党,真相,政治'],

  ['政治', '006', 3, '敲去孙立人', '气量,国民党,政治'],
  ['政治', '006', 9, '连坐完人', '阎锡山,连坐,政治'],
  ['政治', '006', 10, '无情先烈', '先烈,归队,政治'],

  ['政治', '007', 5, '统战取舍', '统战,立场,政治'],
  ['人格', '007', 6, '野马不羁', '自由,孤独,人格'],

  ['知识', '008', 19, '暴政读书', '曹禺,钱钟书,知识'],
  ['方法', '008', 20, '史实校正', '夏志清,考证,方法'],

  ['政治', '009', 4, '主义幌子', '主义,利益,政治'],
  ['写作', '009', 17, '定稿验忙', '写作,成绩,方法'],
  ['法权', '009', 49, '法律政争', '法院,诽谤,法权'],
  ['人格', '009', 50, '毒药勇气', '坐牢,勇气,人格'],
  ['方法', '009', 88, '不高估政客', '政治人物,判断,方法'],
  ['方法', '009', 96, '禁止祝寿', '生日,做工,方法'],
  ['知识', '009', 100, '糊涂逻辑', '逻辑,思想方法,知识'],
  ['方法', '009', 125, '录音带判断', '江南案,判断,方法'],

  ['政治', '010', 24, '登记陷阱', '登记,党外,政治'],
  ['知识', '010', 74, '不悦学', '读书风气,知识,文化'],
  ['人格', '010', 103, '清高善变', '前进,清高,人格'],
  ['政治', '010', 141, '党部问罪', '国泰,责任,政治'],
  ['法权', '010', 151, '搜书不休', '警总,搜书,法权'],
  ['法权', '010', 160, '律师使命', '国泰,律师,法权'],

  ['人格', '011', 44, '独立象征', '知识分子,独立,人格'],
  ['法权', '011', 71, '查禁言论', '出版管制,法权'],
  ['知识', '011', 86, '智慧增长', '智慧,成长,知识'],
  ['写作', '011', 89, '公开日记', '日记,公开,写作'],
  ['政治', '011', 90, '苛政内化', '苛政,自我审查,政治'],
  ['方法', '011', 97, '缩小岛事', '时间,专书,方法'],
  ['写作', '011', 99, '方程式游记', '中国,游记,写作'],

  ['法权', '012', 37, '禁令倒置', '禁书,票亭,法权'],
  ['人格', '012', 42, '人性之光', '朋友,人性,人格'],
  ['法权', '012', 102, '升官良心', '公务员,良心,法权'],
  ['政治', '012', 111, '保留批评', '政治规格,批评,政治'],
  ['知识', '012', 131, '拒绝江湖', '文化,水平,知识'],
  ['政治', '012', 142, '一生证明', '政治人物,清白,政治'],
  ['文化', '012', 155, '三民主义加工', '任卓宣,三民主义,文化'],
  ['人格', '012', 164, '不顾人言', '爱国,党外,人格'],
  ['法权', '012', 193, '抓人脱罪查禁', '查禁,出版物,法权'],

  ['方法', '013', 9, '高标伪善', '标准,人格,方法'],
  ['政治', '013', 10, '圣人格政制', '共产,人格,政治'],
  ['文化', '013', 13, '教科书竞争', '教科书,公平,文化'],
  ['文化', '013', 14, '善书荒谬', '民间信仰,文化'],

  ['人格', '014', 12, '同难照顾', '南榕,照顾,人格'],
  ['写作', '014', 17, '写文支持', '南榕,写作,政治'],
  ['人格', '014', 21, '夺魄代价', '南榕,代价,人格'],

  ['文化', '015', 11, '风景快看', '台湾,精致文化,文化'],
  ['知识', '015', 14, '学术污染', '学术,国民党,知识'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
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

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT048-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);

const paragraphCache = new Map();
function sourceParagraphs(key) {
  const fileName = filesByKey.get(key);
  if (!fileName) {
    throw new Error(`Missing source file for key ${key}`);
  }
  if (!paragraphCache.has(fileName)) {
    const text = decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
    paragraphCache.set(
      fileName,
      text
        .replace(/\r/g, '')
        .split(/\n\s*\n+/)
        .map(normalize)
        .filter(Boolean),
    );
  }
  return { fileName, paragraphs: paragraphCache.get(fileName) };
}

const previous = previousDescriptions();
const skipped = [];
const seenCurrent = new Map();
const keptCandidates = [];

for (const [category, key, paragraphNumber, title, keywords] of candidateEntries) {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${key} P${paragraphNumber}`);
  }
  const { fileName, paragraphs } = sourceParagraphs(key);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${key} P${paragraphNumber}`);
  }
  const normalized = normalize(description);
  if (previous.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: previous.get(normalized) });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: seenCurrent.get(normalized) });
    continue;
  }
  keptCandidates.push({
    category,
    title,
    description,
    source_file: fileName,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, path.join(sourceDir, fileName)).replaceAll(path.sep, '/'),
    keywords,
  });
  seenCurrent.set(normalized, `${key} P${paragraphNumber}`);
}

const records = keptCandidates.map((candidate, index) => ({
  id: `LAT048-${String(index + 1).padStart(3, '0')}`,
  book: book.title,
  round: book.round,
  status: book.status,
  ...candidate,
}));

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    candidate_count: candidateEntries.length,
    skipped_duplicate_count: skipped.length,
  },
  taxonomy,
  records,
  extraction: {
    principles: [
      '每条 description 保留源文本原文段落，不改写。',
      '标题只作索引用的浓缩，不替代原文判断。',
      '沿用 8 个原子分类，不新增临时类别。',
      '本书优先收录软禁与监视、闭关写作方法、知识生产、鲁迅与曹禺评价、党外政治、出版查禁、法权讽刺、人格自塑和少量情爱观段落。',
      '新闻长引、纯行程流水、他人评价、资料堆列、过短机锋、广告尾注和缺少独立判断的段落不收。',
      '与既有总表完全重复的 description 自动跳过。',
    ],
    skipped_duplicates: skipped,
  },
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);

const noteLines = [
  '# 《李敖秘藏日记》思想索引提取说明',
  '',
  `- 提取轮条目：${records.length}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 跳过既有/本书重复：${skipped.length}`,
  `- 来源目录：${book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 取舍说明',
  '',
  '本轮覆盖《软禁残记》《金兰琐碎》《杂评鲁迅和他孙子》、1985年一月至四月日记，以及若干短篇随记。提取重点不是把日记事件全部入表，而是保留能独立呈现思想判断的原文段落：软禁监视如何暴露政治机器，闭关生活如何转为知识生产，写作如何安排时间与文体，鲁迅和曹禺如何被重新评价，党外政治和出版查禁如何进入李敖的法权判断。',
  '',
  '提取轮保留若干较宽条目，供校对轮继续压缩。纯新闻、他人长引、日常行程、书信往来、资料清单、广告尾注、过短机锋和只说明事件而缺少思想判断的段落不收。',
  '',
];
fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built ${book.sequence}.${book.title}: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
