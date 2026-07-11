import fs from 'node:fs';
import path from 'node:path';

const bookNo = '110';
const bookTitle = '为文学开窗';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的文学批评、情爱判断、文学史解释或古书出版原则同义复现，或已被相邻段落完整覆盖',
    ids: [
      'LAT110-002', 'LAT110-007', 'LAT110-011', 'LAT110-014', 'LAT110-016',
      'LAT110-019', 'LAT110-021', 'LAT110-024', 'LAT110-029', 'LAT110-033',
      'LAT110-036', 'LAT110-042', 'LAT110-050', 'LAT110-055', 'LAT110-059',
      'LAT110-071', 'LAT110-075', 'LAT110-097', 'LAT110-110', 'LAT110-116',
      'LAT110-132', 'LAT110-140', 'LAT110-143', 'LAT110-147', 'LAT110-148',
    ],
  },
  {
    reason: '属于版面密度、缺文符号、具体书目格式等过细编辑技术，脱离特定校书现场后检索价值有限',
    ids: [
      'LAT110-062', 'LAT110-067', 'LAT110-074', 'LAT110-085', 'LAT110-090',
      'LAT110-098', 'LAT110-107', 'LAT110-108', 'LAT110-112', 'LAT110-115',
      'LAT110-119', 'LAT110-120', 'LAT110-121', 'LAT110-123', 'LAT110-125',
    ],
  },
  {
    reason: '主要是材料铺垫、个人轶事或自我说明，脱离上下文后不足以独立构成思想索引',
    ids: [
      'LAT110-005', 'LAT110-053', 'LAT110-054', 'LAT110-065', 'LAT110-159',
      'LAT110-160',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT110-001': { title: '陈腐文坛会剥夺读者的精神自由' },
  'LAT110-003': { title: '文学批评须摆脱私人感情' },
  'LAT110-004': { title: '作者善良不能保证作品伟大' },
  'LAT110-006': { title: '文学人物可能成为读者的行为模板' },
  'LAT110-008': { title: '词语重复会暴露文体贫乏' },
  'LAT110-009': { title: '批评作品仍须肯定其成功处' },
  'LAT110-010': { title: '爱情不能简化为家庭缺爱的补偿' },
  'LAT110-012': { title: '师生身份不能使爱情成为罪过' },
  'LAT110-013': { title: '观念不清便无法用文字澄清问题' },
  'LAT110-015': { title: '泛道德主义会把恋爱污名化' },
  'LAT110-017': { title: '爱情不受父母支配' },
  'LAT110-018': { title: '爱女之名可能掩盖家长的控制欲' },
  'LAT110-020': { title: '善意亲情也可能造成伤害' },
  'LAT110-022': { title: '作品改编不能加重原作的观念混乱' },
  'LAT110-023': { title: '纯洁不是有效的爱情判断' },
  'LAT110-026': { title: '礼教和法律无法冻结感情变化' },
  'LAT110-030': { title: '谈情和性交都是爱情的一部分' },
  'LAT110-031': { title: '灵高肉低的偏见有宗教来源' },
  'LAT110-032': { title: '灵魂和肉体在爱情中同样重要' },
  'LAT110-034': { title: '子女不应毁伤自己来服从父母' },
  'LAT110-035': { title: '传统观念内部经常自相矛盾' },
  'LAT110-037': { title: '高频词统计可以发现文体重复' },
  'LAT110-040': { title: '流行成功会诱使作家重复旧配方' },
  'LAT110-046': { title: '文学批评可以超出狭义书评' },
  'LAT110-047': { title: '公开保存反对意见体现批评雅量' },
  'LAT110-051': { title: '高压环境会塑造驯顺写作者' },
  'LAT110-057': { title: '中国电影必须改革剧旨和蒙太奇' },
  'LAT110-064': { title: '传统和威权会形成双重思想束缚' },
  'LAT110-066': { title: '章太炎构成中国古文学的光荣结局' },
  'LAT110-068': { title: '学术领袖也可以积极介入政论' },
  'LAT110-077': { title: '中国文学长期存在民间和文人两流' },
  'LAT110-078': { title: '异源文学会在历史中合流' },
  'LAT110-081': { title: '中国文学曾寄生于思想文字' },
  'LAT110-082': { title: '文句结构和流传工具会塑造文学体裁' },
  'LAT110-083': { title: '中国戏剧的范围深度和演进速度有限' },
  'LAT110-084': { title: '争取世界地位必须先研究外部路径' },
  'LAT110-086': { title: '转述他人思想必须增加准确标准' },
  'LAT110-087': { title: '思想和修辞需要跨学科研究' },
  'LAT110-094': { title: '知识遭到歪曲时不能沉默' },
  'LAT110-100': { title: '引文和正文必须清楚区分' },
  'LAT110-109': { title: '重新断句可以避免擅改原字' },
  'LAT110-113': { title: '目录标题必须与正文一致' },
  'LAT110-122': { title: '书目必须补足出版时间和地点' },
  'LAT110-133': { title: '古书必须经过选择和活用才有现代价值' },
  'LAT110-134': { title: '现代分类应矫正儒家四部分类失衡' },
  'LAT110-136': { title: '评判文章只需追问内容和表达' },
  'LAT110-146': { title: '版本迷恋会绞杀书籍功能和流传' },
  'LAT110-154': { title: '现代导读应兼具考订和评判' },
  'LAT110-157': { title: '古书要靠新出版形态重新进入现代' },
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
      id: `LAT110-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 114) throw new Error(`Expected 114 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的文学批评原则、情爱与亲情边界、修辞翻译、文学史解释、文献校勘和古书出版方法；删去同义复现、材料铺垫、个人轶事及过细的编辑技术条目。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留李敖本人可独立检索的文学批评原则、情爱与亲情边界、修辞翻译、文学史解释、文献校勘和古书出版方法。',
  '- 引文、来函及被批评作者的独立观点仍不转列为李敖思想，只保留李敖明确提出或认同的判断。',
  '- 情爱部分保留师生身份、父母边界、专一教条与灵肉关系等不同层次，其余同义复现予以删除。',
  '- 校书部分保留可复用的版本、引证、断句和校勘方法，不保留版面密度、缺文符号等过细操作。',
  '- 古书部分保留分类、禁毁、读者效用、版本与内容平衡、现代导读和出版形态等不同原则。',
  '- 提取轮确认与前册没有整段重复，校对后继续保持零重复入选。',
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
