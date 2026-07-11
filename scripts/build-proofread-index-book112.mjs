import fs from 'node:fs';
import path from 'node:path';

const bookNo = '112';
const bookTitle = '闽变研究与文星讼案';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '是内批评检查表、证人申请或历史判断中的短问句与短结论，离开相邻完整段落后语义不独立',
    ids: [
      'LAT112-007',
      'LAT112-022', 'LAT112-023', 'LAT112-024', 'LAT112-025', 'LAT112-026',
      'LAT112-027', 'LAT112-028', 'LAT112-029', 'LAT112-030', 'LAT112-031',
      'LAT112-032', 'LAT112-033', 'LAT112-034', 'LAT112-035', 'LAT112-036',
      'LAT112-037', 'LAT112-038',
      'LAT112-045', 'LAT112-046',
      'LAT112-060', 'LAT112-082', 'LAT112-100',
    ],
  },
  {
    reason: '与同书保留的历史研究责任、作者处境、文字归属、摘引规则、证据时间线或历史不可改写同义复现',
    ids: [
      'LAT112-003', 'LAT112-008', 'LAT112-011', 'LAT112-018',
      'LAT112-048', 'LAT112-051', 'LAT112-053', 'LAT112-054', 'LAT112-057',
      'LAT112-064', 'LAT112-066', 'LAT112-070',
      'LAT112-074', 'LAT112-075', 'LAT112-078', 'LAT112-084', 'LAT112-088',
      'LAT112-090', 'LAT112-095', 'LAT112-098', 'LAT112-102', 'LAT112-106',
    ],
  },
  {
    reason: '主要是单一人物的辩护路径、具体文件效力或个案操作细节，脱离文星讼案后思想索引价值有限',
    ids: [
      'LAT112-081', 'LAT112-096', 'LAT112-097',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT112-001': { title: '现代史研究受史料和忌讳限制' },
  'LAT112-002': { title: '史料垄断会阻碍当代史研究', category: '知识' },
  'LAT112-004': { title: '改写个人历史也须遵守事实' },
  'LAT112-005': { title: '学者有责任阻止历史欺骗' },
  'LAT112-006': { title: '民意代表不能借公职处理私怨' },
  'LAT112-009': { title: '日期误差可以暴露回忆失真' },
  'LAT112-010': { title: '删去关键人名会改变历史叙事' },
  'LAT112-012': { title: '旧事成为历史后仍可接受研究' },
  'LAT112-013': { title: '民意代表不能借法律压制人民' },
  'LAT112-014': { title: '知识分子的尊严在于独立' },
  'LAT112-015': { title: '严以责人而轻以律己有损学格' },
  'LAT112-017': { title: '历史术语须由跨语种文献确认' },
  'LAT112-019': { title: '党派和无意识会影响历史记录' },
  'LAT112-039': { title: '理解文字必须研究作者处境' },
  'LAT112-041': { title: '人物研究只应保留相关事实' },
  'LAT112-042': { title: '人身调查不必然包含恶意' },
  'LAT112-043': { title: '禁止人物调查会毁掉历史判断' },
  'LAT112-044': { title: '现场参与者可以检验历史争议' },
  'LAT112-047': { title: '无证据不能指控他人盗窃' },
  'LAT112-049': { title: '错置作者属于证据变造' },
  'LAT112-050': { title: '历史名词具有固定的文献含义' },
  'LAT112-052': { title: '公民也有历史辨伪责任' },
  'LAT112-055': { title: '外国档案可以交叉印证本国资料' },
  'LAT112-056': { title: '澄清历史不等于追究个人刑责' },
  'LAT112-058': { title: '过去声誉不能证明后来行动' },
  'LAT112-059': { title: '证据充分后不必无限堆叠材料' },
  'LAT112-061': { title: '时间先后可以击破自我叙事' },
  'LAT112-062': { title: '旁证可以揭穿事后编造' },
  'LAT112-063': { title: '言论者应预估文字的长期影响' },
  'LAT112-065': { title: '立言必须保持谨慎', category: '写作' },
  'LAT112-067': { title: '言论贡献不能按字数衡量' },
  'LAT112-068': { title: '政论须接受前后一致性检验' },
  'LAT112-069': { title: '知识分子须承担国家成败责任' },
  'LAT112-071': { title: '质疑司法独立会损害当事人权益' },
  'LAT112-072': { title: '判决前宣告有罪违背司法程序' },
  'LAT112-073': { title: '词语褒贬须由语义和语境判断' },
  'LAT112-076': { title: '删节是否曲解取决于原意是否改变' },
  'LAT112-077': { title: '句法结构可以检验文字曲解' },
  'LAT112-079': { title: '人物动机须追踪行动前的承诺' },
  'LAT112-080': { title: '同一运动的参与动机可能不同' },
  'LAT112-083': { title: '政治赦免不能抹去历史记录' },
  'LAT112-085': { title: '后来立场不能抹去先前经历' },
  'LAT112-086': { title: '引用争议须回到准确原文核对' },
  'LAT112-087': { title: '政治标签随判断基线变化' },
  'LAT112-089': { title: '作者自己的分类可以反驳临时定义' },
  'LAT112-091': { title: '原始宣言比事后节本更能证明性质' },
  'LAT112-092': { title: '文字形式化可以暴露逻辑后果' },
  'LAT112-093': { title: '对方定义可以检验其行为' },
  'LAT112-094': { title: '投诚与联合具有不同组织关系', category: '政治' },
  'LAT112-099': { title: '相似判例可以参照诽谤责任' },
  'LAT112-101': { title: '法律手段不能永久改写历史' },
  'LAT112-103': { title: '指写作者受人指使是否定其独立人格' },
  'LAT112-104': { title: '明知不实仍公开指控应负法律责任' },
  'LAT112-105': { title: '部分指控真实不免除其余诬告责任' },
  'LAT112-107': { title: '指控者须为自己的主张举证' },
  'LAT112-108': { title: '错置作者并使用材料属于证据变造' },
  'LAT112-109': { title: '刑事证明须超越合理怀疑' },
  'LAT112-110': { title: '不能对他人文字承担刑责' },
  'LAT112-111': { title: '量刑公平可以用同类项目统计检验' },
  'LAT112-112': { title: '罪少判重违反量刑公平' },
  'LAT112-113': { title: '年龄和地位不应影响司法判断' },
  'LAT112-114': { title: '历史真实比个人诉讼得失重要' },
  'LAT112-115': { title: '历史问题不宜由法院代替学术裁决' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) counts.set(record.category, (counts.get(record.category) || 0) + 1);
  return input.taxonomy.map((category) => ({ category, count: counts.get(category) || 0 }))
    .filter(({ count }) => count > 0);
}

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

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of dropMap.keys()) {
  if (!inputIds.has(id)) throw new Error(`Unknown dropped id: ${id}`);
}
for (const id of Object.keys(overrides)) {
  if (!inputIds.has(id)) throw new Error(`Unknown override id: ${id}`);
  if (dropMap.has(id)) throw new Error(`Dropped id also has override: ${id}`);
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
      id: `LAT112-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

if (records.length !== input.records.length - dropMap.size) throw new Error('Retained count mismatch');
for (const key of ['title', 'description']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${key}`);
}
for (const record of records) {
  const source = input.records.find((item) => item.id === record.source_id);
  if (!source || record.description !== source.description) throw new Error(`Description changed: ${record.id}`);
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖本人可独立检索的现代史辨伪、史料内外批评、言论责任、证据规则、司法程序与历史真实原则；删除依赖上下文的短问句、同义复现、证人名单及只对单一诉讼成立的操作细节。description 字段未改写，仍保留提取轮原文。';
const book = {
  ...input.book,
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
  proofread_at: book.proofread_at,
  dropped_records: book.dropped_records,
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
  '- 保留李敖本人可独立检索的现代史研究限制、史料内外批评、历史术语、时间线、旁证与跨语种互证。',
  '- 保留言论者的长期责任、立言谨慎、前后一致性以及知识分子的独立与公共责任。',
  '- 保留真实陈述、公平评论、举证责任、合理怀疑、证据变造、量刑公平与司法独立等法权判断。',
  '- 003 至 007、013、016 至 019 的他人署名文章、法律文书和机构函件仍不转列为李敖思想。',
  '- 015、020 联名诉状只保留可明确代表李敖共同诉讼立场的判断。',
  '- 提取轮已跳过的十四条《中国现代史定论》跨册同文继续不重复收入。',
  '- 分类继续固定为八个原子分类，没有新增复合分类。',
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
