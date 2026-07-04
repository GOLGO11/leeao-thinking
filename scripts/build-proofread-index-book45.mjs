import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '045.大学后期日记甲集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT045-004', '心静进步主题已由“冷静无情绪”和“乐天成力”条目覆盖。'],
  ['LAT045-018', '情爱态度过短，且与爱情点缀、恋爱轻松、断情绝欲条目重复。'],
  ['LAT045-021', '反靠祖宗和宗教津贴主题在后续段落中展开更完整，保留后续核心判断。'],
  ['LAT045-026', '朋友借钱与记账控制预算的私人情境过重，方法判断不够集中。'],
  ['LAT045-029', '西方书籍新世界的判断较轻，已由“转向西方”条目覆盖。'],
  ['LAT045-033', '外部引语占主体，李敖本人的判断只是附注，索引独立性不足。'],
  ['LAT045-035', '女人不牺牲主题已由不做奴才、爱情生活一部等条目覆盖。'],
  ['LAT045-036', '家居孤立是短期生活安排，已由专一砍断和时间纪律条目覆盖。'],
  ['LAT045-039', '一边谈天一边工作的技巧过细，方法索引价值有限。'],
  ['LAT045-047', '孟大中材料人物情境较重，独行研究判断不够属于李敖自身思想。'],
  ['LAT045-048', '只是小说新写法的意向，未展开写作判断。'],
  ['LAT045-049', '日程片段过细，已由零星专心和三段工作条目覆盖。'],
  ['LAT045-050', '参考室读书是短期生活安排，已由读书方法、读书快乐和时间纪律覆盖。'],
  ['LAT045-052', '伏尔泰引语占主体，李敖自己的方法判断不够展开。'],
  ['LAT045-054', '读书快乐过短，已由西史真乐和读书方法条目覆盖。'],
  ['LAT045-056', '帽子礼俗材料较零碎，作为文化思想索引过窄。'],
  ['LAT045-060', '上升第一等主题已由胡适气派、伟大生活态度和锻炼大人物条目覆盖。'],
  ['LAT045-066', '论文共学偏学习事件记录，独立思想判断较弱。'],
  ['LAT045-067', '大量工作是短句，已由充实快乐、字数鞭促和三段工作覆盖。'],
  ['LAT045-071', '旧卡片新意义偏个人进步记录，思想判断不够集中。'],
  ['LAT045-073', '欧洲观念材料以演员谈裸体为例，外部情境较重，性观念主题由性教育条目保留。'],
  ['LAT045-082', '只是拟写考证文章的题目，尚未形成思想判断。'],
  ['LAT045-084', '小说争取琐碎时间的技巧已由零星专心和三段工作覆盖。'],
]);

const overrides = new Map([
  ['LAT045-006', { title: '夜间工作', keywords: '夜生活,工作,方法' }],
  ['LAT045-017', { title: '唯美人生', keywords: '唯美主义,人生,文化' }],
  ['LAT045-020', { title: '口述真理', keywords: '真理,经验,知识' }],
  ['LAT045-023', { title: '反世袭梦', keywords: '世袭,独立人格,政治' }],
  ['LAT045-024', { title: '教育特权', keywords: '特权,教育,法权' }],
  ['LAT045-037', { title: '说服不敌对', keywords: '灰心,说服,方法' }],
  ['LAT045-040', { title: '砍断专一', keywords: '专一,时间,方法' }],
  ['LAT045-055', { title: '恋爱只求轻松', keywords: '恋爱,轻松,情爱' }],
  ['LAT045-057', { title: '反看可厌', keywords: '女人,观察,情爱' }],
  ['LAT045-085', { title: '九小时工作', keywords: '工作表,时间,方法' }],
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
      id: `LAT045-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮压缩外引占主体、人物情境过重、时间方法重复、单纯题名或写作意向、过密情爱自语等条目，保留反腐败教育、自我锻炼、读书治学、写作方法、情爱观、现代性和反特权立场；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除外引占主体、人物情境过重、时间方法重复、题名式短条和未展开写作意向。',
      '压缩过密的情爱自语，保留能构成独立情爱观的原文段落。',
      '保留反腐败教育、自我锻炼、读书治学、写作方法、现代性和反特权立场的骨干条目。',
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
  '# 《大学后期日记甲集》思想索引校对说明',
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
  '本书材料密度高，但提取轮中有若干外引占主体、人物情境过重、时间方法重复、恋爱自语过密或只停留在题名和写作意向的条目。校对轮保留能单独构成思想索引的段落，使反教育压迫、读书治学、时间纪律、情爱观、现代性和反特权主题更清楚。',
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
