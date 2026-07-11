import fs from 'node:fs';
import path from 'node:path';

const bookNo = '117';
const bookTitle = '蒋介石研究四集';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的祖谱批评、身世考证、黄埔删史、长期监禁、外交失职、烈士叙事或家庭忠诚冲突判断同义复现',
    ids: [
      'LAT117-004', 'LAT117-018', 'LAT117-028', 'LAT117-036', 'LAT117-039',
      'LAT117-051', 'LAT117-059', 'LAT117-063', 'LAT117-067', 'LAT117-069',
      'LAT117-071', 'LAT117-085', 'LAT117-094', 'LAT117-095', 'LAT117-100',
      'LAT117-104',
    ],
  },
  {
    reason: '主要是篇章简介、引文前的过渡、单一史实铺垫或被引材料占比过高，尚不足以独立构成思想索引',
    ids: [
      'LAT117-006', 'LAT117-010', 'LAT117-033', 'LAT117-056', 'LAT117-057',
      'LAT117-062', 'LAT117-068', 'LAT117-072', 'LAT117-076', 'LAT117-089',
      'LAT117-098', 'LAT117-102',
    ],
  },
  {
    reason: '标题把身世疑点或单一沉默轶事扩张为过强结论，原段证据不足以支持该概括',
    ids: ['LAT117-012', 'LAT117-080'],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT117-001': { title: '批评不应随政治风向改变' },
  'LAT117-002': { title: '人物画像不应省略疤痕和皱纹' },
  'LAT117-003': { title: '借显赫祖先争高下是政治荒唐' },
  'LAT117-005': { title: '革命者不必借祖先抬高自己' },
  'LAT117-007': { title: '资料积累能够提升叙事价值' },
  'LAT117-008': { title: '滥用想当然会损害叙事可信度' },
  'LAT117-009': { title: '考证必须检查被忽略的反面文本' },
  'LAT117-011': { title: '钦定文字会隐去不利家史' },
  'LAT117-013': { title: '当事证言可提高身世传说可信度' },
  'LAT117-014': { title: '个人回忆可以反证钦定家世' },
  'LAT117-015': { title: '社会习惯资料可以解释身世疑案' },
  'LAT117-016': { title: '社会学方法可以提出身世假说' },
  'LAT117-017': { title: '个人情结可能被绝对权力放大' },
  'LAT117-021': { title: '有限军事教育不能证明将才', category: '方法' },
  'LAT117-022': { title: '原定人选不能被后来任职改写' },
  'LAT117-027': { title: '政治组织的武力可能来自外国援助' },
  'LAT117-029': { title: '对立政党可能共享组织源流' },
  'LAT117-030': { title: '钦定全集会重塑领袖思想形象' },
  'LAT117-032': { title: '秘密灭门必须留下历史警戒' },
  'LAT117-035': { title: '多方资料可以验证政治承诺' },
  'LAT117-037': { title: '主动承担风险体现政治人格' },
  'LAT117-040': { title: '宽大名义可能掩盖无期监禁' },
  'LAT117-041': { title: '违背不咎既往担保是政治骗局', category: '政治' },
  'LAT117-042': { title: '危机中的自制可以为善后留余地' },
  'LAT117-043': { title: '裁决不能拒绝审查主张内容' },
  'LAT117-045': { title: '主动赴国难也可能遭权力设局' },
  'LAT117-046': { title: '爱国名将也可能遭非法监禁杀害' },
  'LAT117-047': { title: '盲目效忠也可能遭组织抛弃' },
  'LAT117-048': { title: '掩盖罪行终会被事实揭穿' },
  'LAT117-049': { title: '守死不变者可能被所助政权杀害' },
  'LAT117-053': { title: '高压统治会把知识人变成精神俘虏' },
  'LAT117-054': { title: '私人代表会架空正式外交机关' },
  'LAT117-058': { title: '未参与密约的国家不受其拘束' },
  'LAT117-060': { title: '违约事实成立就应及时追责' },
  'LAT117-061': { title: '议会表决可能为卖国政策背书' },
  'LAT117-065': { title: '爱国之名不能倒置卖国责任' },
  'LAT117-066': { title: '长期统治会摧毁社会评价标准' },
  'LAT117-070': { title: '放弃宗主权属于加码让步' },
  'LAT117-073': { title: '领土投票应由本国政府监督' },
  'LAT117-074': { title: '只准参观不得干涉就是奉命放水' },
  'LAT117-075': { title: '封锁报告可以掩盖虚假投票' },
  'LAT117-078': { title: '武装特务会借民众工作扩张权力' },
  'LAT117-081': { title: '逃难者无权苛责别人没有殉难' },
  'LAT117-083': { title: '死节标准会排斥被俘者' },
  'LAT117-084': { title: '烈士崇拜会制造死亡叙事' },
  'LAT117-090': { title: '乐观套话无法遮蔽失败现实' },
  'LAT117-091': { title: '辩白材料也可能反证自杀诱因' },
  'LAT117-093': { title: '高压统治无法理解知识人转向反对党' },
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
      id: `LAT117-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

if (dropMap.size !== 30 || records.length !== 75) {
  throw new Error(`Proofread count mismatch: dropped=${dropMap.size}, retained=${records.length}`);
}
for (const key of ['title', 'description']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${key}`);
}
for (const record of records) {
  const source = input.records.find((item) => item.id === record.source_id);
  if (!source || record.description !== source.description) throw new Error(`Description changed: ${record.id}`);
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖可独立检索的历史叙事规范、身世考证方法、黄埔史删改、政治承诺、非法监禁、外交责任、虚假投票、烈士制造和知识分子依附判断；删除同义证据链、引文过渡、单一史实铺垫及证据不足的泛化标题。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留资料积累、想当然补叙、官方家史、社会习惯、课程制度、组织编制与早期言论等独立史料批评路径。',
  '- 保留政治承诺、非法监禁、宽大骗局、异己报复、地下外交、议会背书及虚假公民投票等政治和法权判断。',
  '- 保留死节标准、烈士制造、宣传栽诬与知识分子依附权力的后果，删除其中重复铺垫和被引材料占比过高的条目。',
  '- “典妻”身世解释明确改题为假说，不把李敖的推测包装成已证实事实。',
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
  category_counts: counts,
}, null, 2));
