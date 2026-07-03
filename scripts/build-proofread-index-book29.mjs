import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '029.李敖杂文集');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT029-009', '台大校长作证短总结与前一条任期自肥法理同篇承载，校对轮删去较短结语。'],
  ['LAT029-015', '总理遗教空头票是陪审制组的短尾声，法律结构已由前四条承载。'],
  ['LAT029-018', '私了掩盖战争犯罪已被后文“义助让屈辱变成证词”综合承载。'],
  ['LAT029-025', '党内压力四条路是时评过渡段，权力训练与派系堕落两条已承载核心判断。'],
  ['LAT029-028', '现代政治家胸襟是韩福瑞序文的短结论，保留知识富强条作为主要思想承载。'],
  ['LAT029-029', '博大眼光条目偏序文收束，思想密度弱于知识与文星法权条。'],
  ['LAT029-032', '电话效率是工作日志碎片，过短且偏事务命令。'],
  ['LAT029-033', '书面工作日志是内部管理碎片，独立思想承载力弱。'],
  ['LAT029-034', '单位有人说了算偏内部行规，过短且不宜作为本书思想索引。'],
]);

const overrides = new Map([
  ['LAT029-001', { title: '救国先戒形式主义', keywords: '救国,形式主义,努力,方法' }],
  ['LAT029-008', { title: '校长任期不能自肥延长', keywords: '台大校长,任期,自肥,法权' }],
  ['LAT029-012', { title: '人民陪审不同于英美陪审', keywords: '陪审制,人民陪审员,证据排除,法权' }],
  ['LAT029-016', { title: '武士町人毁掉日本高雅', keywords: '日本,武士,町人,文化' }],
  ['LAT029-020', { title: '新兴宗教不是鸦片而是迷幻药', keywords: '新兴宗教,邪教,迷幻药,文化' }],
  ['LAT029-023', { title: '接到权力还要会处理', keywords: '民进党,人才,权力训练,政治' }],
  ['LAT029-024', { title: '派系护利使人堕落', keywords: '派系,新潮流,利益,政治' }],
  ['LAT029-027', { title: '知识才能排除富强障碍', keywords: '知识,富强,贫穷,知识' }],
  ['LAT029-030', { title: '词典不能败在检索系统', keywords: '林语堂,词典,检索系统,知识' }],
  ['LAT029-036', { title: '思想家的日常谈吐也该保存', keywords: '章太炎,胡适,思想记录,知识' }],
  ['LAT029-037', { title: '读书多才有大学问', keywords: '大学问,读书,李敖,知识' }],
  ['LAT029-038', { title: '活读书才有大头脑', keywords: '大头脑,活读书,思考,方法' }],
  ['LAT029-041', { title: '大人格支撑立言不朽', keywords: '大人格,立言,不朽,人格' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除短弱总结、行政碎片和重复承载项。',
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
    '校对动作只涉及条目取舍、分类、标题、关键词和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
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
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮由提取轮进入校对轮，删除短弱总结、工作日志碎片、重复承载和韩福瑞序文中的框架性短结论，保留本书关于救国方法、陪审法权、慰安妇战争责任、宗教迷信、政治训练、中文工具书、思想记录、写作人格的核心索引；description 仍逐条保留源文本原文段落。',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 33) {
  throw new Error(`Expected 33 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT029-${String(index + 1).padStart(3, '0')}`,
    book: bookBase.title,
    round: bookBase.round,
    status: bookBase.status,
    proofread_from: record.id,
  };
});

const allowedCategories = new Set(taxonomy);
for (const record of records) {
  if (!allowedCategories.has(record.category)) {
    throw new Error(`Unexpected category for ${record.id}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...bookBase,
    record_count: records.length,
    category_counts: categoryCounts(records, taxonomy),
  },
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${bookBase.title} ${bookBase.round}: ${records.length} records.`);
