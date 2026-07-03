import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '035.阳痿美国');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT035-003', '援外慷慨一条与后文“自称慷慨要对照援外排名”重复，校对轮保留后者。'],
  ['LAT035-005', '美国年轻人地理无知一条偏知识旁枝，主题已由后文“对东方无知却指手画脚”承载。'],
  ['LAT035-019', '形象竞选一条偏美国竞选技术史，和本书帝国、人权、法权主轴关系较松。'],
  ['LAT035-022', '鸦片贸易一条与前后“趁战争捡便宜”“望厦条约”材料重复，校对轮保留覆盖更大的条目。'],
  ['LAT035-026', '政府赔偿利益冲突一条偏总统任内个案，独立思想检索价值弱于帝国、排华和国际法主线。'],
  ['LAT035-042', '条约遇宪法即被废弃与前一条“宪法不能成为不履约借口”重复，校对轮保留前者。'],
  ['LAT035-045', '排华制造唯一排斥对象与“排华法案背叛移民道德”“暂停入境是换汤不换药”重复。'],
  ['LAT035-047', '违宪确认后仍可不负责与“中央管不了地方成为赖账话术”重复，校对轮保留后者。'],
  ['LAT035-053', '达赖牌靠人权和平包装与后文西藏独立、人权工具和 CIA 支援材料重复。'],
  ['LAT035-073', '军火贸易背叛世界和平与“支援侵华日本也是血史”重复，校对轮保留更有历史定位的一条。'],
  ['LAT035-089', '英国角色迷惘源于美元秩序偏支线，美元霸权主题已由“美元霸权靠印钞机吃世界”承载。'],
  ['LAT035-092', '光荣和平只是撤退修辞与“越战和平变成请求放行”重复。'],
  ['LAT035-094', '折磨越南后美国先逃与越战撤退、和平修辞、自我神话破产等条目重复。'],
  ['LAT035-102', '宗教领袖名义包装独立活动与“普世人权成了对华工具”“CIA 支援西藏情报游击”重复。'],
]);

const overrides = new Map([
  ['LAT035-004', { title: '独立宣言要看兑现' }],
  ['LAT035-006', { title: '美国例外包装拳头' }],
  ['LAT035-012', { title: '黑人问题丈量美国伪善' }],
  ['LAT035-061', { title: '联合国高调也会破产' }],
  ['LAT035-084', { title: '东京湾事件暴露战争叙事' }],
  ['LAT035-105', { title: '媒体自由只在分肉时出现' }],
  ['LAT035-107', { title: '历史叙事国内赖掉国外抢走' }],
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
    'proofread_from',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用 8 个原子分类；本书校对轮主要保留政治、法权、文化、方法等主轴材料。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push(`- 提取轮编号：${record.proofread_from}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const counts = categoryCounts(records, taxonomy);
  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮由提取轮 ${originalRecords.length} 条校对为 ${records.length} 条，删除 ${dropReasons.size} 条。`,
    '',
    '校对动作只涉及条目取舍、标题压缩和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮由提取轮进入校对轮，删除重复覆盖、偏总统逸闻、偏支线知识和过密的同题材料，保留美国例外论、帝国扩张、排华与奴隶、人权法治、国际法、对华政策、台湾问题、媒体叙事、冷战反共、反恐战争和美元霸权等核心索引。description 仍逐条保留源文本原文段落。',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...override,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      round: book.round,
      status: book.status,
      proofread_from: record.id,
    };
  });

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
  proofread: {
    from_round: originalPayload.book.round,
    original_count: originalPayload.records.length,
    retained_count: records.length,
    dropped_count: dropReasons.size,
    dropped: [...dropReasons.entries()].map(([id, reason]) => ({ id, reason })),
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records, taxonomy).map((item) => `${item.category}:${item.count}`).join(' '));
