import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '044.早年日记');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT044-007', '主要是军队生活背景与自我悍气说明，已由新生活和强悍反动条目覆盖。'],
  ['LAT044-008', '私人谈话和人物往来成分较重，写作方法判断不够集中。'],
  ['LAT044-010', '旧信史料意识被大量搬家、会面和杂务包围，作为单条思想索引过散。'],
  ['LAT044-014', '私人交往和自我形象描写过重，征服环境主题已由其他人格条目覆盖。'],
  ['LAT044-022', '针对个人批评的应对色彩较强，独立思想判断不够可迁移。'],
  ['LAT044-028', '主要是出版计划和设计细节，思想判断不足。'],
  ['LAT044-030', '只是文章题名和写作动作，未展开思想内容。'],
  ['LAT044-033', '孙陵个人遭遇和自由创作争执较短，后续直接查禁条目更有索引价值。'],
  ['LAT044-034', '合作与查禁感叹过短，并且依附孙陵处境，独立性不足。'],
  ['LAT044-035', '饭局谈话列举事项较多，对出版法和司法的判断不够集中。'],
  ['LAT044-037', '一句禁书消息，事实性强，已由后续查扣和警察干预条目覆盖。'],
  ['LAT044-038', '低调不被信任是短反应，政治法权判断不如后续程序条目完整。'],
  ['LAT044-040', '便衣查禁过程偏事实记录，保留后续更能体现程序问题的笔录条目。'],
  ['LAT044-041', '警车拉书与查扣事实重复，保留程序、送检和拒写违法信条目。'],
  ['LAT044-046', '外引左舜生文字占主体，不宜作为李敖思想索引的核心条目。'],
  ['LAT044-049', '司法黑暗判断过短，已由法院程序条目覆盖。'],
]);

const overrides = new Map([
  ['LAT044-005', { title: '爱情超现实', keywords: '爱情,超现实,情爱' }],
  ['LAT044-012', { title: '金钱伤友', keywords: '朋友,金钱,人格' }],
  ['LAT044-016', { title: '写作不服管', keywords: '写作,职务,独立' }],
  ['LAT044-024', { title: '学术与弹劾', keywords: '学术,弹劾,知识' }],
  ['LAT044-031', { title: '武人不敬人', keywords: '武人,人,政治' }],
  ['LAT044-047', { title: '警察阻售', keywords: '警察,禁卖,法权' }],
  ['LAT044-048', { title: '司法程序黑暗', keywords: '法院,程序,法权' }],
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
      id: `LAT044-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮压缩私人交往、出版流水、短事实消息、外引占主体和查禁过程重复条目，保留可独立检索的情爱观、自我锻炼、研究方法、时间纪律、政治法权和司法程序判断；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除私人交往过重、纯事实流水、题名式短条、外引占主体和查禁过程重复的条目。',
      '保留能够独立检索的情爱观、自我锻炼、研究方法、时间纪律、政治法权和司法程序判断。',
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
  '# 《早年日记》思想索引校对说明',
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
  '本书前半部的日记中，很多条目夹杂私人往来、搬迁、会面和日常事务；后半部的断片中，警总查禁和法院往来密度很高，但不少段落只是过程记录。校对轮保留思想判断清楚、能独立检索的段落，压缩重复事实链条和外引占主体的材料。',
  '',
  '`description` 字段全部沿用提取轮中的源文本原段落，未做改写。',
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
