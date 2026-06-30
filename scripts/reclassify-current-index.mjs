import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputsDir = path.join(rootDir, 'outputs');

const currentBookFiles = [
  path.join(outputsDir, '001.李敖自传与回忆', '思想索引-校对轮.json'),
  path.join(outputsDir, '002.李敖自传与回忆续集', '思想索引-校对轮.json'),
  path.join(outputsDir, '003.我最难忘的事和人', '思想索引-校对轮.json'),
];

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权'];

const taxonomyNotes = new Map([
  ['写作', '写作、出版、杂志、传播、文献公开。'],
  ['方法', '思想来源、史料证据、历史方法、认识方式。'],
  ['知识', '教育、大学、学术、知识分子。'],
  ['人格', '自我、品格、伦理、勇气、处世。'],
  ['文化', '传统、历史记忆、地域意识、民族观。'],
  ['政治', '党国、权力、意识形态、统治结构。'],
  ['法权', '法律、言论自由、人权、牢狱制度。'],
]);

const baseMap = new Map([
  ['写作与传播', '写作'],
  ['思想源流与方法', '方法'],
  ['教育与知识分子', '知识'],
  ['人格与自我', '人格'],
  ['传统与社会', '文化'],
  ['历史观与地域意识', '文化'],
  ['政治权力批判', '政治'],
  ['法律与言论自由', '法权'],
  ['牢狱与迫害经验', '法权'],
  ['人生与社会观察', '人格'],
]);

const overrides = new Map([
  ['LAT001-038', '人格'],
  ['LAT001-045', '法权'],
  ['LAT001-046', '政治'],
  ['LAT001-048', '人格'],
  ['LAT001-049', '人格'],
  ['LAT001-050', '人格'],
  ['LAT001-051', '人格'],
  ['LAT002-003', '法权'],
  ['LAT002-036', '法权'],
  ['LAT002-040', '法权'],
  ['LAT002-042', '法权'],
  ['LAT002-059', '法权'],
  ['LAT002-068', '法权'],
  ['LAT003-031', '方法'],
]);

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function writeCsv(filePath, records) {
  const hasProofreadFrom = records.some((record) => record.proofread_from);
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
    ...(hasProofreadFrom ? ['proofread_from'] : []),
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, payload) {
  const { book, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：使用收敛后的原子分类；分类名只保留单一概念，不使用“与/和”结构。',
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
      if (record.proofread_from) {
        lines.push(`- 提取轮编号：${record.proofread_from}`);
      }
      lines.push('');
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function classify(record) {
  if (overrides.has(record.id)) return overrides.get(record.id);
  const category = baseMap.get(record.category);
  if (!category) {
    throw new Error(`No category mapping for ${record.id}: ${record.category}`);
  }
  return category;
}

function countByCategory(records) {
  return taxonomy
    .map((category) => [category, records.filter((record) => record.category === category).length])
    .filter(([, count]) => count > 0);
}

const beforeCounts = new Map();
const afterCounts = new Map();
const changedRows = [];
const payloads = [];

for (const jsonPath of currentBookFiles) {
  const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const outputDir = path.dirname(jsonPath);
  const bookRecords = payload.records.map((record) => {
    beforeCounts.set(record.category, (beforeCounts.get(record.category) ?? 0) + 1);
    const category = classify(record);
    afterCounts.set(category, (afterCounts.get(category) ?? 0) + 1);
    if (category !== record.category) {
      changedRows.push({
        id: record.id,
        book: record.book,
        title: record.title,
        from: record.category,
        to: category,
      });
    }
    return { ...record, category };
  });

  const nextPayload = {
    ...payload,
    taxonomy,
    records: bookRecords,
  };

  fs.writeFileSync(jsonPath, `${JSON.stringify(nextPayload, null, 2)}\n`, 'utf8');
  writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), bookRecords);
  writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), nextPayload);
  payloads.push(nextPayload);
}

const reportLines = [
  '# 思想分类重构说明',
  '',
  '本次重构把当前 201 条校对轮数据统一改为 7 个原子分类。分类名只使用单一概念，不再使用“X与Y”或“X和Y”的结构。',
  '',
  '## 新分类',
  '',
  ...taxonomy.map((category) => `- ${category}：${taxonomyNotes.get(category)}`),
  '',
  '## 原分类统计',
  '',
  ...[...beforeCounts.entries()].map(([category, count]) => `- ${category}：${count}`),
  '',
  '## 新分类统计',
  '',
  ...taxonomy.map((category) => `- ${category}：${afterCounts.get(category) ?? 0}`),
  '',
  '## 特别改判',
  '',
  ...[...overrides.entries()].map(([id, category]) => `- ${id}：${category}`),
  '',
  `本次共有 ${changedRows.length} 条记录的分类字段被改写。`,
];

fs.writeFileSync(path.join(outputsDir, '分类重构说明.md'), `\uFEFF${reportLines.join('\n')}\n`, 'utf8');

console.log(`Reclassified ${payloads.reduce((sum, payload) => sum + payload.records.length, 0)} records into ${taxonomy.length} categories.`);
