import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '046.大学后期日记乙集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT046-006', '知识宇宙主题过短，已由“苦读巨书”“知识求乐”等条目展开。'],
  ['LAT046-014', '肯定知识的判断过短，并与知识求乐、不自溺情感等条目重复。'],
  ['LAT046-018', '孤独必要是短条，孤独求知和书本扎根条目展开更完整。'],
  ['LAT046-023', '方法学重要停留在题名式短条，已由科学方法和方法治史覆盖。'],
  ['LAT046-027', '零星读英文属于过细的实用技巧，不作为独立思想索引保留。'],
  ['LAT046-029', '善用时间偏短期行程感想，时间纪律已由强读半小时和少计划多工作覆盖。'],
  ['LAT046-030', '书本孤单过短，书本与孤独主题已由书本扎根和孤独求知展开。'],
  ['LAT046-031', '向往西方是参观后的短观感，西方启发主题已有更集中条目。'],
  ['LAT046-034', '政治用语偏外部政坛话语观察，李敖自己的政治判断不够展开。'],
  ['LAT046-037', '朋友沙子是概念短条，已由永远漠视、布鲁塔斯精神和做人技巧展开。'],
  ['LAT046-043', '时间尽读是时间利用短条，已由强读半小时和少计划多工作覆盖。'],
  ['LAT046-046', '独玩独工作过短，独处主题已由孤独求知和独处知止展开。'],
  ['LAT046-050', '独处定力过短，独处读书主题已由孤独求知和独处知止覆盖。'],
  ['LAT046-060', '彻底反情段落以外引导语收束，情爱节制主题已有理智对性、不与女人往还和正视偶像。'],
  ['LAT046-064', '刻苦努力是口号式短条，已由有办法的人、充实自我和单调硬仗展开。'],
  ['LAT046-066', '倡导见解自由为外部法官引文占主体，缺少李敖自己的判断。'],
  ['LAT046-072', '母校作伪证是短句式指控，已由国立大学法理和刑法伪证展开。'],
]);

const overrides = new Map([
  ['LAT046-005', { title: '爱情微不足道', keywords: '爱情,大理想,情爱' }],
  ['LAT046-008', { title: '震惊一世写作', keywords: '写作,道德勇气,写作' }],
  ['LAT046-009', { category: '写作', title: '巨著开导', keywords: '巨著,写作,写作' }],
  ['LAT046-022', { category: '方法', title: '方法治史', keywords: '西方方法,治史,方法' }],
  ['LAT046-024', { title: '知识求乐', keywords: '知识,读书,知识' }],
  ['LAT046-026', { title: '铁匠人生', keywords: '劳动,人生,文化' }],
  ['LAT046-033', { title: '打破性保守', keywords: '性保守,性问题,情爱' }],
  ['LAT046-035', { title: '孤独求知', keywords: '孤独,知识,方法' }],
  ['LAT046-036', { title: '工作存款', keywords: '工作,快乐,方法' }],
  ['LAT046-041', { title: '有意活泼', keywords: '快乐,活泼,方法' }],
  ['LAT046-044', { title: '理智对性', keywords: '性,理智,情爱' }],
  ['LAT046-045', { title: '漠视朋友', keywords: '朋友,漠视,人格' }],
  ['LAT046-054', { title: '独处知止', keywords: '独处,知止,方法' }],
  ['LAT046-056', { title: '有办法的人', keywords: '努力,办法,人格' }],
  ['LAT046-069', { title: '军中静思', keywords: '军中,思想,方法' }],
  ['LAT046-073', { title: '大学越权伪证', keywords: '国立大学,伪证,法权' }],
  ['LAT046-075', { title: '追究伪证', keywords: '伪证,法院,法权' }],
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
      id: `LAT046-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除知识宇宙、读书孤独、时间纪律、情爱节制和法权公开信中重复或外引占主体的短条，保留日记自评、反腐败教育、知识求乐、少计划多工作、人格锻炼、性与爱情态度、普及学术改革、大学伪证与学术自由等骨干条目；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除题名式短条、行程感想、技巧过细、重复覆盖和外引占主体的条目。',
      '压缩读书孤独、时间纪律和情爱节制的过密条目，保留能独立检索的原文段落。',
      '保留反腐败教育、知识求乐、少计划多工作、人格锻炼、普及学术改革、大学伪证和学术自由的骨干条目。',
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
  '# 《大学后期日记乙集》思想索引校对说明',
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
  '本书日记材料密度较高，但提取轮中有若干题名式短条、读书方法重复、情爱节制重复、时间技巧过细和外部引文占主体的条目。校对轮压缩这些密集处，保留能够单独构成索引的日记自评、反腐败教育、知识求乐、少计划多工作、人格锻炼、性与爱情态度、普及学术改革、大学伪证与学术自由条目。',
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
