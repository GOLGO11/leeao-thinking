import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '018.为中国思想趋向求答案');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT018-035', '段落为陈康文字的长引文，李敖自己的判断已由前一条“固有文化与共党思路相近”覆盖。'],
  ['LAT018-037', '“原意”判断与下一条语法检证段重复，校对轮保留信息更完整的后者。'],
  ['LAT018-043', '贞节牌坊批判在《论“处女膜整形”》相关条目中展开得更充分，本段不单列。'],
  ['LAT018-050', '段落是梁启超辩论规则引文，不是李敖自己的独立表述。'],
  ['LAT018-051', '段落是胡秋原辩论规则引文，李敖对胜负的判断另由后文语境承载，校对轮不单列。'],
  ['LAT018-063', '段落主要是引出“处女膜整形”题目，思想密度弱于后续定义、批判和结论段。'],
  ['LAT018-067', '“泛处女主义遗风犹在”是承上启下的概述，已由殉夫、强奸、自杀等更具体条目覆盖。'],
]);

const overrides = new Map([
  ['LAT018-004', { title: '政客党棍缺乏求答案资格', keywords: '政客,党棍,知识分子,资格' }],
  ['LAT018-009', { title: '现代化心病须彻底治疗', keywords: '现代化,心病,治疗' }],
  ['LAT018-010', { title: '爱国不以其道会阻碍现代化', keywords: '爱国,现代化,文化医生' }],
  ['LAT018-018', { title: '代表取样能避免枝节混淆', keywords: '代表取样,分类,思想谱系' }],
  ['LAT018-023', { category: '方法', title: '先认识自己未曾一心一意现代化', keywords: '现代化,科学精神,民主政治' }],
  ['LAT018-032', { title: '文化取舍标准不配由权威制定', keywords: '文化选择,标准,自动吸收,权威' }],
  ['LAT018-038', { title: '语法检证能暴露原意', keywords: '原意,检证,语法' }],
  ['LAT018-041', { title: '现代化目标不是点缀世界博物馆', keywords: '现代化强国,文化传统,目标' }],
  ['LAT018-044', { title: '承认弱点才能急起直追', keywords: '弱点,承认,急起直追' }],
  ['LAT018-047', { title: '意见至少要可互证', keywords: '意见,检证,矛盾' }],
  ['LAT018-048', { title: '列出矛盾让其自相攻击', keywords: '自相矛盾,检证,论战' }],
  ['LAT018-053', { title: '抓词造帽子是技术犯规', keywords: '帽子,技术犯规,论战' }],
  ['LAT018-054', { title: '治学要向小处求深', keywords: '治学,细节,科学' }],
  ['LAT018-058', { title: '优势文化下选择余地有限', keywords: '优势文化,选择,流弊' }],
  ['LAT018-064', { title: '处女膜不能证明贞节', keywords: '处女膜,贞节,生理知识' }],
  ['LAT018-068', { title: '现代道德不以自杀殉夫为典范', keywords: '殉夫,现代道德,政府' }],
  ['LAT018-073', { title: '被强奸不必自杀自毁', keywords: '强奸,自杀,贞操' }],
  ['LAT018-082', { category: '方法', title: '传统思想方法一开始不及格', keywords: '传统思想,运作意义,现代学术' }],
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
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；删去纯引文、过渡段、重复判断和由后续条目覆盖的条目。',
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
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 76) {
  throw new Error(`Expected 76 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT018-${String(index + 1).padStart(3, '0')}`,
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

console.log(`Built ${payload.book.title} proofread index: ${records.length} records.`);
