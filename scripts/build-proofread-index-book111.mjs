import fs from 'node:fs';
import path from 'node:path';

const bookNo = '111';
const bookTitle = '丑陋的中国人研究';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的民族性、友情正义、人权普遍性、史料互证或翻译语境判断同义复现，或已被相邻完整段落覆盖',
    ids: [
      'LAT111-005', 'LAT111-009', 'LAT111-013', 'LAT111-017', 'LAT111-019',
      'LAT111-023', 'LAT111-027', 'LAT111-040', 'LAT111-041', 'LAT111-045',
      'LAT111-046', 'LAT111-047', 'LAT111-061', 'LAT111-069', 'LAT111-074',
      'LAT111-075', 'LAT111-077', 'LAT111-080', 'LAT111-084', 'LAT111-086',
      'LAT111-088', 'LAT111-089', 'LAT111-091', 'LAT111-109', 'LAT111-116',
      'LAT111-121', 'LAT111-135', 'LAT111-137', 'LAT111-143', 'LAT111-145',
      'LAT111-150', 'LAT111-159', 'LAT111-160', 'LAT111-162',
    ],
  },
  {
    reason: '主要是门牌、钤记、个人藏书、具体外交证据或出版往来等个案操作细节，脱离本案后独立检索价值有限',
    ids: [
      'LAT111-026', 'LAT111-031', 'LAT111-033', 'LAT111-056', 'LAT111-128',
      'LAT111-129', 'LAT111-130', 'LAT111-173',
    ],
  },
  {
    reason: '主要是人物生平铺垫、自我评价、文章开场或只对单一人物成立的短评，独立思想密度不足',
    ids: [
      'LAT111-010', 'LAT111-015', 'LAT111-124', 'LAT111-132', 'LAT111-168',
      'LAT111-172',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT111-001': { title: '民族性只呈现主要人格类型' },
  'LAT111-002': { title: '地理和生理不能单独解释民族性' },
  'LAT111-003': { title: '民族性研究不能抹去少数样本' },
  'LAT111-006': { title: '家长式领袖崇拜是一种强迫孺慕' },
  'LAT111-007': { title: '政治教育可能让有识者更盲从' },
  'LAT111-008': { title: '主动攀附权力是一种自愿孺慕' },
  'LAT111-014': { title: '错误事实上的解释更加不可原谅' },
  'LAT111-018': { title: '认祖攀贵是权势文化的历史惯性' },
  'LAT111-020': { title: '婚姻守信可以体现人格' },
  'LAT111-022': { title: '销毁私人手稿会永久损失社会史料' },
  'LAT111-024': { title: '权势消失后的人情变化检验友情' },
  'LAT111-025': { title: '证人有偏执也不能否定具体事实' },
  'LAT111-028': { title: '微小行为可以反证宏大人格赞词' },
  'LAT111-029': { title: '一面倒的悼词仍须保留另一面' },
  'LAT111-030': { title: '批评时也要说明对方没有做过的恶' },
  'LAT111-032': { title: '辩正史实须同时查考公私材料' },
  'LAT111-034': { title: '教育机构不应协助外人陷害学生' },
  'LAT111-035': { title: '大学披露学生资料须有法理依据' },
  'LAT111-036': { title: '不敢维护自由却协助迫害更加可耻' },
  'LAT111-037': { title: '旧报广告也能保存权力欺压的证据' },
  'LAT111-042': { title: '历史判断有火气仍须以证据为基础' },
  'LAT111-043': { title: '写作者可以替无力发声者主持公道' },
  'LAT111-044': { title: '受任遗嘱执行后不能任意卸责' },
  'LAT111-048': { title: '责任人不能把义务推给第三者' },
  'LAT111-049': { title: '法律无效时社会仍可实施道义制裁' },
  'LAT111-050': { title: '善行记录具有施教和警世作用' },
  'LAT111-052': { title: '成名会迫使无才作者继续写作' },
  'LAT111-055': { title: '危难时应先抢救作品而非空头招牌' },
  'LAT111-057': { title: '法律文书可以保存狱中真相' },
  'LAT111-060': { title: '海外舆论能向爱面子的政权施压' },
  'LAT111-062': { title: '持续揭发比求情更能制约迫害' },
  'LAT111-064': { title: '人权目标不能在救出一人后停止' },
  'LAT111-066': { title: '证词中的可查证细节可以成为翻案活扣' },
  'LAT111-070': { title: '患难行动比事后诗句更能证明感情' },
  'LAT111-071': { title: '办案必须区分事实和猜疑' },
  'LAT111-073': { title: '以大义责友不等于否定相知' },
  'LAT111-076': { title: '判断政治写作要看批评上限' },
  'LAT111-079': { title: '恐惧会使受难者走向自我审查' },
  'LAT111-090': { title: '把已有证据的问题说成复杂是一种遁词' },
  'LAT111-092': { title: '逐项列证可使人事判断接受核验' },
  'LAT111-094': { title: '人间天理未明时公共主张都是空的' },
  'LAT111-098': { title: '传统作者归属须接受史料检验' },
  'LAT111-103': { title: '论战著作可能因工具价值获得长久生命' },
  'LAT111-105': { title: '多重文化附会会共同制造污名' },
  'LAT111-127': { title: '外交电报可以检验政治事件性质' },
  'LAT111-131': { title: '多种史料互证可以揭穿政治叙事' },
  'LAT111-133': { title: '英雄神话须接受时间线和政策文件检验' },
  'LAT111-136': { title: '对恩人的恐惧可能锁定迫害目标' },
  'LAT111-138': { title: '拘禁压力可能使人格依附迫害者' },
  'LAT111-148': { title: '刑求会诱发假供并被制度加工成罪案' },
  'LAT111-161': { title: '译义必须回到其他用例检验' },
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
      id: `LAT111-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 125) throw new Error(`Expected 125 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的民族性研究、史料核验、翻译方法、公共正义、人权行动、友情伦理和威权心理；删去同义复现、人物铺垫、自我评价及只对单一个案成立的操作细节。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留李敖本人可独立检索的民族性研究、史料核验、翻译方法、公共正义、人权行动、友情伦理和威权心理。',
  '- 屠申虹、孙国栋、艾玫、孙观汉、王光逖、王金仲达及其他来信、判决书和长引文中的独立观点仍不转列为李敖思想。',
  '- 民族性部分保留主要人格类型、成因复杂性、少数样本和整体污名四个层次，不保留针对单一作者的人格短评。',
  '- 人权与友情部分区分援助动机、人权普遍性、道义完整、和解条件、正义高于朋友和受难者依附迫害者等不同判断。',
  '- 史料方法保留作者归属、年代比对、公私材料、原刊对照、词源语境和多种史料互证，不保留门牌、钤记等过细步骤。',
  '- 翻译部分保留句法主词、知识系统、人物处境、跨文本用例和历史语感，不重复保留同一译义论证的每一个中间步骤。',
  '- 提取轮跳过的十条跨册同文继续不入选，校对后与前册保持零整段重复。',
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
