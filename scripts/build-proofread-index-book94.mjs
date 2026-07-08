import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const sequence = '094';
const bookTitle = '李敖放电集';
const bookDir = path.join(repoRoot, 'outputs', `${sequence}.${bookTitle}`);
const inputPath = path.join(bookDir, '思想索引-提取轮.json');

const outputJson = path.join(bookDir, '思想索引-校对轮.json');
const outputCsv = path.join(bookDir, '思想索引-校对轮.csv');
const outputMd = path.join(bookDir, '思想索引-校对轮.md');
const canonicalJson = path.join(bookDir, '思想索引.json');
const canonicalCsv = path.join(bookDir, '思想索引.csv');
const canonicalTxt = path.join(bookDir, '思想索引.txt');
const proofreadNote = path.join(bookDir, '校对说明.md');

const categories = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(categories);

const dropReasons = new Map([
  ['LAT094-020', '偏自夸毛笔字，和前一条中华文化批评重复，思想独立性较弱。'],
  ['LAT094-029', '同一全倒半倒议题的短句余波，已由 LAT094-028 覆盖。'],
  ['LAT094-043', '第三方人物报道的描述性文字，不是李敖自己的判断段。'],
  ['LAT094-058', '偏选举副手操作和新闻转述，思想耐久性较弱。'],
  ['LAT094-059', '偏选举副手操作和新闻转述，思想耐久性较弱。'],
  ['LAT094-085', '偏价格与资料索取的操作性短讯，已由情趣用品法规和技术条目覆盖。'],
  ['LAT094-096', '偏新党内部选战处境，已由骄傲的狼不是备胎条目覆盖。'],
]);

const overrides = new Map([
  ['LAT094-042', {
    category: '政治',
    title: '社会需要批判者',
    keywords: ['社会批评', '批判者', '台湾'],
  }],
  ['LAT094-047', {
    category: '人格',
    title: '狱底有游魂就不自由',
    keywords: ['自由', '监狱', '戴布兹'],
  }],
  ['LAT094-071', {
    title: '先知被混人包围是错位',
    keywords: ['先知', '台湾', '人格'],
  }],
  ['LAT094-074', {
    title: '声势能让异见者俯首',
    keywords: ['声势', '人格', '立场'],
  }],
  ['LAT094-081', {
    category: '文化',
    title: '佛教经文才瞧不起女人',
    keywords: ['佛教', '女人', '性别'],
  }],
  ['LAT094-093', {
    title: '男女问题不能靠警察压住',
    keywords: ['男女问题', '警察', '情爱'],
  }],
  ['LAT094-094', {
    title: '经济问题不能靠警察压住',
    keywords: ['经济问题', '警察', '政治'],
  }],
  ['LAT094-095', {
    title: '警察压不住的问题要靠智慧',
    keywords: ['智慧', '警察', '方法'],
  }],
  ['LAT094-113', {
    title: '政策判断要看上下文轨迹',
    keywords: ['政策', '上下文', '一国两制'],
  }],
]);

function padIndex(index) {
  return String(index).padStart(3, '0');
}

function categoryCounts(records) {
  return categories
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function toCsv(records) {
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
    'source_id',
  ];
  const lines = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => {
      if (header === 'keywords') return csvEscape(record.keywords.join(';'));
      return csvEscape(record[header]);
    }).join(',')),
  ];
  return `\uFEFF${lines.join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 书名：${bookTitle}`,
    '- 轮次：校对轮',
    '- 状态：已校对',
    `- 条目数：${records.length}`,
    '- 说明：description 保持源文本原段落，只校对取舍、标题、分类、关键词和编号。',
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push(`- 提取轮：${record.source_id}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => [
    `${record.id}. ${record.title}`,
    `分类：${record.category}`,
    `来源：${record.source_file}#${record.source_paragraph}`,
    `关键词：${record.keywords.join('、')}`,
    `提取轮：${record.source_id}`,
    record.description,
  ].join('\n')).join('\n\n')}\n`;
}

function toProofreadNote(records, droppedRecords) {
  const lines = [
    `# ${bookTitle} 校对说明`,
    '',
    '- 轮次：校对轮',
    '- 状态：已校对',
    '- 校对原则：保留李敖自己的判断、批评、方法和有索引价值的引证目的；剔除第三方描述、同题弱重复、短期选战操作和低独立性的操作性短讯。',
    '- 原文处理：所有保留条目的 `description` 未改写，仍为源文本原段落。',
    `- 提取轮条目数：${records.length + droppedRecords.length}`,
    `- 校对轮条目数：${records.length}`,
    `- 剔除条目数：${droppedRecords.length}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 剔除记录',
    '',
    ...droppedRecords.map((item) => `- ${item.source_id}｜${item.title}：${item.reason}`),
    '',
    '## 主要收整',
    '',
    '- 将“健康社会需要批判者”从人格调到政治，避免把社会批评误收为个人性格。',
    '- 将“狱底有游魂就不自由”调到人格，保留其自由感和人格姿态，而不是狭义法权条目。',
    '- 将佛教经文与女人条目调到文化，按宗教文本批评处理。',
    '- 收短少数标题，使检索标题更像思想索引，而不是新闻句或原段落摘句。',
    '',
  ];
  return `${lines.join('\n')}\n`;
}

const source = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const sourceRecords = source.records || [];
const droppedRecords = [];
const keptRecords = [];

for (const record of sourceRecords) {
  const reason = dropReasons.get(record.id);
  if (reason) {
    droppedRecords.push({
      source_id: record.id,
      title: record.title,
      source_file: record.source_file,
      source_paragraph: record.source_paragraph,
      reason,
    });
    continue;
  }

  const override = overrides.get(record.id) || {};
  const category = override.category || record.category;
  if (!categorySet.has(category)) {
    throw new Error(`未知分类：${record.id} ${category}`);
  }

  keptRecords.push({
    ...record,
    round: '校对轮',
    status: '已校对',
    category,
    title: override.title || record.title,
    keywords: override.keywords || record.keywords,
    source_id: record.id,
  });
}

const records = keptRecords.map((record, index) => ({
  ...record,
  id: `LAT${sequence}-${padIndex(index + 1)}`,
}));

const output = {
  generated_at: new Date().toISOString(),
  book: {
    ...source.book,
    round: '校对轮',
    status: '已校对',
    note: '校对轮剔除第三方描述、同题弱重复、短期选战操作和低独立性短讯；收整标题和分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    source_count: sourceRecords.length,
    dropped_count: droppedRecords.length,
    dropped_records: droppedRecords,
    record_count: records.length,
    category_counts: categoryCounts(records),
  },
  taxonomy: source.taxonomy,
  records,
};

fs.writeFileSync(outputJson, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputCsv, toCsv(records), 'utf8');
fs.writeFileSync(outputMd, toMarkdown(records), 'utf8');
fs.writeFileSync(canonicalJson, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
fs.writeFileSync(canonicalCsv, toCsv(records), 'utf8');
fs.writeFileSync(canonicalTxt, toTxt(records), 'utf8');
fs.writeFileSync(proofreadNote, toProofreadNote(records, droppedRecords), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  source_records: sourceRecords.length,
  records: records.length,
  dropped: droppedRecords.length,
  category_counts: categoryCounts(records),
}, null, 2));
