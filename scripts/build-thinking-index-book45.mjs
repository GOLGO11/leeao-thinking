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
  .find((name) => name.startsWith('003.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '045.大学后期日记甲集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '045',
  title: '大学后期日记甲集',
  slug: 'daxue-houqi-riji-jiaji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《大学后期日记甲集》前记及1958年6月至12月日记中提取思想索引。description 保留源文本原段落；纯行程、人物寒暄、恋爱琐事、资料堆列和缺少独立思想判断的短句不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['人格', 'pre', 3, '必要不成熟', '成长,不成熟,人格'],
  ['人格', 'pre', 5, '鬼混武器', '教育,反抗,人格'],

  ['情爱', '001', 46, '自由爱情', '爱情,自由,情爱'],
  ['人格', '001', 60, '心静进步', '心静,进步,人格'],
  ['人格', '001', 64, '乐天成力', '乐天,笑容,人格'],
  ['方法', '001', 71, '夜生活制度', '夜生活,时间,方法'],
  ['人格', '001', 87, '冷静无情绪', '冷静,情绪,人格'],
  ['人格', '001', 93, '胡适气派', '胡适,努力,人格'],
  ['方法', '001', 94, '札记先行', '札记,少说,方法'],
  ['方法', '001', 101, '沉默抗议', '沉默,抗议,方法'],
  ['情爱', '001', 103, '爱情点缀', '爱情,前途,情爱'],
  ['情爱', '001', 117, '迅雷恋爱', '恋爱,痛苦,情爱'],
  ['知识', '001', 119, '西史真乐', '西洋史,长进,知识'],
  ['方法', '001', 122, '反省修养', '反省,修养,方法'],
  ['方法', '001', 123, '读书方法', '读书,札记,方法'],
  ['政治', '001', 125, '过度批判', '批判,共产党,政治'],
  ['文化', '001', 139, '艺术人生', '唯美主义,人生,文化'],
  ['情爱', '001', 163, '情妇无情人', '爱情,女人,情爱'],
  ['方法', '001', 167, '历史比较', '历史比较,进步,方法'],
  ['知识', '001', 181, '真理与经验', '真理,经验,知识'],
  ['政治', '001', 221, '吃祖宗饭', '祖宗,百姓钱,政治'],
  ['法权', '001', 245, '宗教自由边界', '宗教自由,国库,法权'],
  ['政治', '001', 253, '反靠祖宗', '世袭,独立人格,政治'],
  ['法权', '001', 306, '孔氏特权', '特权,教育,法权'],
  ['政治', '001', 307, '教育铲特权', '教育,特权,政治'],
  ['方法', '001', 329, '记账控预算', '朋友,预算,方法'],
  ['方法', '001', 358, '零星专心', '时间,读书,方法'],
  ['人格', '001', 369, '风度不失', '风度,人格,修养'],
  ['知识', '001', 372, '西方新世界', '西方,书籍,知识'],

  ['文化', '002', 69, '贞操观害人', '贞操,传统,文化'],
  ['文化', '002', 70, '澄清观念', '观念,现代化,文化'],
  ['政治', '002', 103, '民主自由', '民主,政治自由,政治'],
  ['知识', '002', 104, '阅读压迫', '阅读,心智,知识'],
  ['人格', '002', 108, '伟大生活态度', '意志,伟大,人格'],
  ['情爱', '002', 122, '女人不牺牲', '女人,牺牲,情爱'],
  ['方法', '002', 142, '家居孤立', '孤立,生活,方法'],
  ['方法', '002', 157, '不因灰心敌对', '灰心,说服,方法'],
  ['方法', '002', 180, '训练糊涂', '理智,糊涂,方法'],
  ['方法', '002', 190, '谈天工作', '工作,时间,方法'],
  ['方法', '002', 206, '专一砍断', '专一,时间,方法'],
  ['知识', '002', 212, '转向西方', '西方,东方,知识'],
  ['文化', '002', 233, '真性情骂人', '真性情,伪善,文化'],

  ['知识', '003', 100, '排外思想', '排外,研究,知识'],
  ['人格', '003', 127, '偏激有界', '思想,行为,人格'],
  ['人格', '003', 153, '不可自怜', '自怜,快乐,人格'],

  ['人格', '004', 85, '大度量', '度量,修养,人格'],
  ['知识', '004', 141, '独行研究', '现代物理,研究,知识'],

  ['写作', '005', 59, '小说新写法', '小说,新写法,写作'],
  ['方法', '005', 32, '零星图书馆', '零星时间,图书馆,方法'],
  ['方法', '005', 111, '参考室读书', '参考室,读书,方法'],
  ['人格', '005', 112, '不毁标准', '标准,沉默,人格'],
  ['方法', '005', 113, '玩忽天性', '玩忽,生活,方法'],
  ['方法', '005', 114, '快乐条件', '快乐,知足,方法'],
  ['知识', '005', 115, '读书快乐', '读书,快乐,知识'],
  ['情爱', '005', 116, '恋爱轻松', '恋爱,尺度,情爱'],
  ['文化', '005', 128, '帽子历史', '礼俗,历史,文化'],
  ['情爱', '005', 137, '可厌一面', '女人,情爱,观察'],
  ['人格', '005', 190, '决绝硬悍', '决绝,硬悍,人格'],
  ['情爱', '005', 195, '苦求可耻', '爱情,婚姻,情爱'],

  ['人格', '006', 51, '上升第一等', '胡适,努力,人格'],
  ['情爱', '006', 89, '断情绝欲', '情欲,痛苦,情爱'],
  ['人格', '006', 111, '锻炼大人物', '锻炼,人格,努力'],
  ['方法', '006', 116, '充实快乐', '努力,充实,方法'],
  ['方法', '006', 158, '摸清环境', '环境,方法,政治'],
  ['知识', '006', 208, '史家讳误', '史家,傅斯年,知识'],
  ['知识', '006', 221, '论文共学', '论文,共学,知识'],
  ['方法', '006', 234, '大量工作', '工作,睡眠,方法'],
  ['写作', '006', 262, '字数鞭促', '写作,字数,写作'],
  ['写作', '006', 267, '经验虚构', '经验,虚构,写作'],
  ['人格', '006', 291, '独立至上', '独立,爱情,人格'],
  ['方法', '006', 319, '旧卡新义', '卡片,进步,方法'],

  ['政治', '007', 6, '民主不易', '民主,贵族,政治'],
  ['情爱', '007', 8, '欧洲观念', '裸体,保守,情爱'],
  ['情爱', '007', 86, '不做奴才', '女人,奴才,情爱'],
  ['情爱', '007', 118, '爱情变幻', '爱情,变幻,情爱'],
  ['情爱', '007', 119, '爱情非纯一', '爱情,纯一,情爱'],
  ['情爱', '007', 120, '生活一部', '爱情,生活,情爱'],
  ['方法', '007', 123, '历史一环', '历史,个人,方法'],
  ['文化', '007', 137, '性教育破暗猜', '性教育,文化,知识'],
  ['文化', '007', 147, '性如接吻', '性教育,自然,文化'],
  ['方法', '007', 164, '自由治学', '大学,治学,方法'],
  ['写作', '007', 206, '王八考证', '考证,写作,文化'],
  ['方法', '007', 226, '永远轻松', '轻松,从容,方法'],
  ['方法', '007', 228, '小说争时', '小说,琐碎时间,方法'],
  ['方法', '007', 231, '三段工作', '工作表,时间,方法'],
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

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT045-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);
filesByKey.set('pre', sourceFiles.find((name) => name.includes('前记')));

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
  id: `LAT045-${String(index + 1).padStart(3, '0')}`,
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
      '沿用 8 个原子分类，避免新增过细分类。',
      '本书为1958年大学后期日记，优先收录可独立检索的反教育压迫、自我锻炼、读书治学、写作方法、情爱判断、现代性和反特权立场。',
      '纯行程、人物寒暄、恋爱琐事、资料堆列、外部长篇剪报和缺少独立思想判断的短句不收。',
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
  '# 《大学后期日记甲集》思想索引提取说明',
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
  '本书覆盖1958年6月至12月，材料密度高，既有大学生活与自我修养，也有后补文章、剪报和大量恋爱心理记录。本轮优先保留已经形成思想判断的方法、人格、知识、文化、政治法权和情爱段落。',
  '',
  '张天师、孔氏特权和瑞典性教育等较长材料中，只收与李敖思想索引直接相关的判断段落；纯资料铺陈和外部剪报说明暂不收入。后续校对轮可继续压缩情爱条目和反特权条目中的重复判断。',
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
