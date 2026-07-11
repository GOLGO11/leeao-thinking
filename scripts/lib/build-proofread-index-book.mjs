import fs from 'node:fs';
import path from 'node:path';

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(records) {
  const headers = ['id', 'source_id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  return `\uFEFF${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(
      Array.isArray(record[header]) ? record[header].join(';') : record[header],
    )).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(bookTitle, records, sourceCount, droppedCount) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`, '',
    `- 原始条目：${sourceCount}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${droppedCount}`, '',
  ];
  let currentCategory = '';
  for (const record of records) {
    if (record.category !== currentCategory) {
      currentCategory = record.category;
      lines.push(`## ${currentCategory}`, '');
    }
    lines.push(`### ${record.id} ${record.title}`, '', record.description, '', `出处：${record.source_file}#${record.source_paragraph}`, '');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => (
    `${record.id}｜${record.category}｜${record.title}\n${record.description}\n出处：${record.source_file}#${record.source_paragraph}`
  )).join('\n\n')}\n`;
}

export function buildProofreadIndexBook({
  sequence,
  bookTitle,
  dropGroups,
  overrides = {},
  expectedSourceCount,
  expectedDroppedCount,
  expectedRetainedCount,
  summary,
  retentionPrinciples = [],
}) {
  const bookNo = String(sequence);
  const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
  const inputPath = path.join(outputDir, '思想索引-提取轮.json');
  const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const dropMap = new Map();

  for (const group of dropGroups) {
    for (const id of group.ids) {
      if (dropMap.has(id)) throw new Error(`Duplicate dropped id: ${id}`);
      dropMap.set(id, group.reason);
    }
  }

  const inputById = new Map(input.records.map((record) => [record.id, record]));
  if (input.records.length !== expectedSourceCount) {
    throw new Error(`Source count mismatch: expected=${expectedSourceCount}, actual=${input.records.length}`);
  }
  for (const id of dropMap.keys()) {
    if (!inputById.has(id)) throw new Error(`Unknown dropped id: ${id}`);
  }
  for (const id of Object.keys(overrides)) {
    if (!inputById.has(id)) throw new Error(`Unknown override id: ${id}`);
    if (dropMap.has(id)) throw new Error(`Dropped id also has override: ${id}`);
  }

  let nextId = 1;
  const records = input.records
    .filter((record) => !dropMap.has(record.id))
    .map((record) => {
      const override = overrides[record.id] || {};
      return {
        ...record,
        round: '校对轮',
        status: '已校对',
        source_id: record.id,
        id: `LAT${bookNo}-${String(nextId++).padStart(3, '0')}`,
        title: override.title || record.title,
        category: override.category || record.category,
        keywords: override.keywords || record.keywords,
      };
    });

  if (dropMap.size !== expectedDroppedCount || records.length !== expectedRetainedCount) {
    throw new Error(`Proofread count mismatch: dropped=${dropMap.size}, retained=${records.length}`);
  }
  for (const key of ['title', 'description']) {
    const values = records.map((record) => record[key]);
    if (new Set(values).size !== values.length) throw new Error(`Duplicate ${key}`);
  }
  for (const record of records) {
    const source = inputById.get(record.source_id);
    if (!source || record.description !== source.description) throw new Error(`Description changed: ${record.id}`);
    if (!input.taxonomy.includes(record.category)) throw new Error(`Unknown category: ${record.id} ${record.category}`);
  }

  const countsMap = new Map();
  for (const record of records) countsMap.set(record.category, (countsMap.get(record.category) || 0) + 1);
  const categoryCounts = input.taxonomy
    .map((category) => ({ category, count: countsMap.get(category) || 0 }))
    .filter(({ count }) => count > 0);
  const proofreadAt = new Date().toISOString();
  const droppedRecords = [...dropMap.entries()].map(([id, reason]) => ({
    id,
    reason,
    title: inputById.get(id)?.title || '',
  }));
  const book = {
    ...input.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: input.records.length,
    dropped_count: dropMap.size,
    category_counts: categoryCounts,
    note: summary,
    proofread_at: proofreadAt,
    dropped_records: droppedRecords,
  };
  const payload = {
    ...input,
    book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: input.records.length,
    dropped_count: dropMap.size,
    category_counts: categoryCounts,
    note: summary,
    proofread_at: proofreadAt,
    dropped_records: droppedRecords,
    records,
  };

  fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.csv'), toCsv(records), 'utf8');
  fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.md'), toMarkdown(bookTitle, records, input.records.length, dropMap.size), 'utf8');
  fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  fs.writeFileSync(path.join(outputDir, '思想索引.csv'), toCsv(records), 'utf8');
  fs.writeFileSync(path.join(outputDir, '思想索引.txt'), toTxt(records), 'utf8');

  const proofreadNote = [
    `# ${bookTitle} 校对说明`, '',
    `- 输入：思想索引-提取轮.json（${input.records.length} 条）`,
    `- 输出：思想索引-校对轮.json / csv / md（${records.length} 条）`,
    `- 删除：${dropMap.size} 条`,
    '- 同步：思想索引.json / csv / txt 已更新为校对轮版本', '',
    '## 删除原则', '',
    ...dropGroups.map((group) => `- ${group.reason}：${group.ids.join('、')}`), '',
    '## 保留原则', '',
    ...retentionPrinciples.map((principle) => `- ${principle}`),
    '- 分类继续固定为八个原子分类，没有新增复合分类。',
    '- 标题只做压缩、纠偏和辨识度修订；description 不改写原文。', '',
    '## 分类统计', '',
    ...categoryCounts.map(({ category, count }) => `- ${category}：${count}`), '',
  ].join('\n');
  fs.writeFileSync(path.join(outputDir, '校对说明.md'), proofreadNote, 'utf8');

  console.log(JSON.stringify({
    book: `${bookNo}.${bookTitle}`,
    source: input.records.length,
    dropped: dropMap.size,
    retained: records.length,
    category_counts: categoryCounts,
  }, null, 2));
}
