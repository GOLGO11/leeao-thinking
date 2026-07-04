import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '043.大学札记');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT043-009', '与消极、坚强、意志条目重复，且表达偏自我激励。'],
  ['LAT043-016', '短句价值可由时间纪律条目覆盖。'],
  ['LAT043-021', '私人友人观察过重，独立思想判断不足。'],
  ['LAT043-022', '针对个别友人的评价较重，可迁移性不足。'],
  ['LAT043-024', '私人友情伦理较具体，和人格主干重复。'],
  ['LAT043-027', '主要是外文诗句与心怀感受，索引判断不够清楚。'],
  ['LAT043-028', '围绕张世民个人处境展开，作为政治条目偏窄。'],
  ['LAT043-035', '与下一条“过去刺激”同题，保留更凝练的后一条。'],
  ['LAT043-042', '斯宾诺沙长篇中同类伦理判断较多，保留更核心段落。'],
  ['LAT043-059', '胡适材料成分较重，情爱判断由其他条目覆盖。'],
  ['LAT043-060', '忘情主题与后一条“不动心生活”重复。'],
  ['LAT043-062', '偏外在气象与自我造型，思想索引价值较弱。'],
  ['LAT043-066', '情爱厌弃色彩较强，主题已由爱情比例和忘情条目覆盖。'],
  ['LAT043-073', '规律生活判断较轻，可由忍受单调和时间纪律条目覆盖。'],
  ['LAT043-075', '抒情场景较多，思想判断不如相邻条目清楚。'],
  ['LAT043-082', '安闲自由主题与宁静、单调生活条目重复。'],
  ['LAT043-084', '自负自况较重，重复胸襟雄心和第一等人条目。'],
  ['LAT043-087', '愉快自恃主题与乐观、孤独条目重复。'],
  ['LAT043-106', '自我定性短句，独立检索价值偏低。'],
  ['LAT043-107', '静默主题与沉默进步、少说有力条目重复。'],
  ['LAT043-115', '一点一滴主题已由小段时间和时间纪律条目覆盖。'],
  ['LAT043-118', '历史引句与自我激励色彩较强，重复殉道勇气条目。'],
  ['LAT043-120', '个人睡前仪式过细，方法索引价值有限。'],
  ['LAT043-123', '困难主题已由“犁破困难”和“先别怕困难”覆盖。'],
  ['LAT043-125', '原段落只引出分项，作为单条 description 不够完整。'],
  ['LAT043-131', '自我硬汉形象重复孤立、坚强条目。'],
  ['LAT043-135', '技巧太细，作为本书思想索引粒度偏小。'],
  ['LAT043-137', '偏外在表情塑造，重复人格气象条目。'],
]);

const overrides = new Map([
  ['LAT043-004', { title: '理智意志', keywords: '理智,意志,方法' }],
  ['LAT043-038', { category: '方法', keywords: '斯宾诺沙,永恒,方法' }],
  ['LAT043-094', { category: '人格', keywords: '青年,自救,人格' }],
  ['LAT043-102', { keywords: '日记,自励,写作' }],
  ['LAT043-140', { keywords: '日记,解脱,写作' }],
]);

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

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...edit,
      id: `LAT043-${String(index + 1).padStart(3, '0')}`,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} in ${record.source_id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮压缩重复的自我砥砺、纯外引材料、私人情境和过细技巧条目，保留可独立检索的自我锻炼、时间纪律、读书治学、孤独沉默、情爱节制和知识分子态度；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除重复的自我砥砺、纯外引材料、私人友人评价、过细方法技巧和不完整段落。',
      '保留能够独立检索的自我锻炼、时间纪律、读书治学、孤独沉默、情爱节制和知识分子态度。',
    ],
    dropped,
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

const noteLines = [
  '# 《大学札记》思想索引校对说明',
  '',
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  `- 来源目录：${payload.book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 校对说明',
  '',
  '本书思想密度很高，但同类自我砥砺条目密集，且部分段落以私人朋友评价、外引材料或个人仪式为主。校对轮保留能构成思想索引骨架的段落，压缩重复、过细或不完整的条目。',
  '',
  '`description` 字段仍全部沿用提取轮中的源文本原段落，未做改写。',
  '',
];
fs.writeFileSync(path.join(outputDir, '校对说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread ${payload.book.sequence}.${payload.book.title}: ${records.length} records. ` +
    `Dropped: ${dropped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
