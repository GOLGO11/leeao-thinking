import fs from 'node:fs';
import path from 'node:path';

const bookNo = '105';
const bookTitle = '李登辉的假面具';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与相邻的翻译考证、共产党身份、政治幻想、文化统制、党政合一或史料方法论证重复，已由同一论证链中更完整的段落承载',
    ids: [
      'LAT105-002', 'LAT105-008', 'LAT105-015', 'LAT105-017', 'LAT105-019',
      'LAT105-020', 'LAT105-022', 'LAT105-023', 'LAT105-026', 'LAT105-027',
      'LAT105-028', 'LAT105-034', 'LAT105-036', 'LAT105-039', 'LAT105-045',
      'LAT105-052', 'LAT105-055', 'LAT105-056', 'LAT105-058', 'LAT105-062',
      'LAT105-066', 'LAT105-069', 'LAT105-070', 'LAT105-073', 'LAT105-074',
      'LAT105-082', 'LAT105-083', 'LAT105-087', 'LAT105-097', 'LAT105-103',
      'LAT105-105', 'LAT105-116', 'LAT105-120', 'LAT105-128', 'LAT105-138',
      'LAT105-140',
    ],
  },
  {
    reason: '主要是自我开场、党内传单去向、人物讥刺、沉默即默认或自我功劳叙述，脱离章节后的独立思想价值不足',
    ids: [
      'LAT105-001', 'LAT105-012', 'LAT105-044', 'LAT105-059', 'LAT105-144',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT105-003': { title: '翻译必须还原词语所指的历史实物' },
  'LAT105-004': { title: '语义解释必须回到物质背景' },
  'LAT105-005': { title: '错误翻译会使政治比喻失效' },
  'LAT105-006': { title: '公开举手会把党内选举变成权力表态' },
  'LAT105-007': { title: '政党会为现实人选破坏自身法规' },
  'LAT105-009': { title: '短视收编会同时腐蚀政治伦理和法规' },
  'LAT105-010': { title: '新闻报道不能轻易推翻正式公文书' },
  'LAT105-016': { title: '文证和图证比道听途说更可靠' },
  'LAT105-018': { title: '法律解释可以检验政治履历' },
  'LAT105-024': { title: '对外幻想常与对内支配同时发生' },
  'LAT105-033': { title: '上下文可以揭穿错误引用' },
  'LAT105-041': { title: '朱熹和王阳明的分歧在理居物中还是心中' },
  'LAT105-043': { title: '道德哲学不能保证实践者有道德' },
  'LAT105-053': { title: '对称译语会掩盖原义的不对称结构' },
  'LAT105-060': { title: '政变解释必须符合行动者的现实能力' },
  'LAT105-061': { title: '权力双方合则两利时没有政变必要' },
  'LAT105-072': { title: '总统必须超然于单一政党' },
  'LAT105-075': { title: '长期违宪会让人民习惯权力越界' },
  'LAT105-077': { title: '领袖不逞智炫能才能发挥众人责任' },
  'LAT105-078': { title: '虚位元首不应越级管理行政细务' },
  'LAT105-080': { title: '行政权干预报道会摧毁新闻自由' },
  'LAT105-085': { title: '只接受外国专访是在轻视本国媒体' },
  'LAT105-099': { title: '政治委托的研究先失去中立性' },
  'LAT105-109': { title: '口述史缺一方就必须用文字史料补证' },
  'LAT105-111': { title: '篇幅分配会暴露研究者的价值排序' },
  'LAT105-112': { title: '事件史的关键在普通受害者而非高官' },
  'LAT105-121': { title: '历史分析必须落实关键事实调查' },
  'LAT105-123': { title: '声称不判责任却加重一方责任是自相矛盾' },
  'LAT105-124': { title: '分散书写相关证据会淡化责任' },
  'LAT105-127': { title: '大量死亡估计必须从姓名和特征查起' },
  'LAT105-129': { title: '误差高达一半的估计不能称为统计' },
  'LAT105-145': { title: '权谋不能代替向更高智慧求学' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) counts.set(record.category, (counts.get(record.category) || 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'))
    .map(([category, count]) => ({ category, count }));
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(records) {
  const headers = ['id', 'source_id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  return `${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(
      Array.isArray(record[header]) ? record[header].join(';') : record[header],
    )).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`, '',
    `- 原始条目：${input.records.length}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${dropMap.size}`, '',
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

let sequence = 1;
const records = input.records
  .filter((record) => !dropMap.has(record.id))
  .map((record) => {
    const override = overrides[record.id] || {};
    return {
      ...record,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
      id: `LAT105-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 104) throw new Error(`Expected 104 retained records, found ${records.length}`);
for (const key of ['title', 'description', 'source_id']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${key}`);
}
const sourceById = new Map(input.records.map((record) => [record.id, record]));
for (const record of records) {
  if (record.description !== sourceById.get(record.source_id)?.description) {
    throw new Error(`Description changed for ${record.source_id}`);
  }
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖本人可独立检索的翻译考证、概念辨析、制度批判、政治伦理、文化评价、史料方法和调查结论；删去同一论证链中过密的证据台阶、跨篇重复结论、自我开场、人物讥刺和上下文依赖过强的项目。description 字段未改写，仍保留提取轮原文。';
const book = {
  ...input.book,
  round: '校对轮',
  status: '已校对',
  note: proofreadSummary,
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
};
const payload = {
  ...input,
  book,
  round: '校对轮',
  status: '已校对',
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
  note: proofreadSummary,
  proofread_at: new Date().toISOString(),
  dropped_records: [...dropMap.entries()].map(([id, reason]) => ({
    id,
    reason,
    title: input.records.find((record) => record.id === id)?.title || '',
  })),
  records,
};

fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.md'), toMarkdown(records), 'utf8');
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
  '- 保留李敖本人可独立检索的翻译考证、概念辨析、制度批判、政治伦理、文化评价、史料方法和调查结论。',
  '- 新闻报道、官方档案、谢聪敏文章、胡适日记、二二八口述史和政府报告，只在李敖明确评价、反驳或归纳的完整段落中随文保留。',
  '- 二二八部分保留证据标准、引文一致性、口述史补证、反证纳入、数字核验和公义原则等不同层次，不逐级保留全部材料台阶。',
  '- 《鸿禧山庄》合写报告继续只保留李敖纳入正文的分析，不把被引会计师和记者的独立意见转列为李敖思想。',
  '- 提取轮确认的八条跨册整段重复继续保持零重复入选。',
  '- 分类继续固定为八个原子分类，没有为本书增加复合分类。',
  '- 标题只做压缩、纠偏和辨识度修订；description 不改写原文。', '',
  '## 分类统计', '',
  ...counts.map(({ category, count }) => `- ${category}：${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '校对说明.md'), proofreadNote, 'utf8');

console.log(JSON.stringify({
  book: `${bookNo}.${bookTitle}`,
  source: input.records.length,
  dropped: dropMap.size,
  retained: records.length,
  categories: counts,
}, null, 2));
