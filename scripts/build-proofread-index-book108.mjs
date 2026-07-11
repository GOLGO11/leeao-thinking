import fs from 'node:fs';
import path from 'node:path';

const bookNo = '108';
const bookTitle = '李远哲的真面目';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与相邻的史料核验、推荐诚意、投票选择、危楼决策、调查责任或制度监督论证重复，或只承担承上启下作用',
    ids: [
      'LAT108-010', 'LAT108-012', 'LAT108-013', 'LAT108-019', 'LAT108-021',
      'LAT108-024', 'LAT108-026', 'LAT108-027', 'LAT108-028', 'LAT108-031',
      'LAT108-032', 'LAT108-035', 'LAT108-051', 'LAT108-060', 'LAT108-062',
      'LAT108-065', 'LAT108-066', 'LAT108-073',
    ],
  },
  {
    reason: '主要是书稿宣传、自我功劳、骂人修辞、人物轶事或采购案个案细节，脱离章节后的独立思想价值不足',
    ids: [
      'LAT108-001', 'LAT108-004', 'LAT108-005', 'LAT108-022', 'LAT108-040',
      'LAT108-043', 'LAT108-049', 'LAT108-059', 'LAT108-069', 'LAT108-083',
      'LAT108-084',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT108-002': { title: '科学奖荣誉不能由共同族群掠美' },
  'LAT108-003': { title: '表达国家意见不必借顾问名目破坏体制' },
  'LAT108-006': { title: '伟大科学家不能乡愿而见义无勇' },
  'LAT108-007': { title: '最高研究机关应为科研不彰承担责任' },
  'LAT108-008': { title: '嫉才和政治迎合会合谋造成学术迫害' },
  'LAT108-009': { title: '情感好恶不妨碍行文尊重证据' },
  'LAT108-011': { title: '研究者不得隐瞒关键史料' },
  'LAT108-014': { title: '推荐没有下文又不追问就不可信' },
  'LAT108-015': { title: '严师带来的痛苦不能成为忘恩借口' },
  'LAT108-016': { title: '有能力补救却不行动会加深旧错' },
  'LAT108-017': { title: '师生关系不能妨碍公正推荐' },
  'LAT108-018': { title: '外行也能借专业文献核验评价' },
  'LAT108-020': { title: '学术自由是解聘争议的核心' },
  'LAT108-023': { title: '讨论旧文本必须先找到原文' },
  'LAT108-025': { title: '高级知识分子应以行动推动改革' },
  'LAT108-029': { title: '学术界的卑鄙更常披着清高外衣' },
  'LAT108-030': { title: '身份判断的标准不能因对象改变' },
  'LAT108-033': { title: '无法改变命运时仍应选择较小伤害' },
  'LAT108-034': { title: '放弃投票会把选择权交给别人' },
  'LAT108-036': { title: '地方荣誉必须接受世界尺度检验' },
  'LAT108-037': { title: '出版形式可以绕开言论审查' },
  'LAT108-038': { title: '法律不能因对象而改变效力' },
  'LAT108-039': { title: '专业成功不能证明行政能力' },
  'LAT108-041': { title: '直接询问当事人可以检验官方说法' },
  'LAT108-042': { title: '好人身份不能排除做坏事' },
  'LAT108-044': { title: '公职不是最重要的人生履历' },
  'LAT108-045': { title: '小型政治体应先保护并治理人民' },
  'LAT108-046': { title: '威权时代沉默者不能突然自称英雄' },
  'LAT108-047': { title: '正义采用同样残忍的手段就会失去意义' },
  'LAT108-048': { title: '政党名称可以在实体消失后继续存在' },
  'LAT108-050': { title: '官方安全说法必须接受基础资料核查' },
  'LAT108-052': { title: '反复决策会浪费公共资金' },
  'LAT108-053': { title: '行政决策不能当成无对错的实验' },
  'LAT108-054': { title: '制度不能为单一任职者量身修改' },
  'LAT108-055': { title: '备案监督必须真正审查' },
  'LAT108-056': { title: '个人利益不能凌驾法令制度' },
  'LAT108-057': { title: '不同制度不能随意比照例外' },
  'LAT108-058': { title: '公职退休后必须交还职务附随利益' },
  'LAT108-061': { title: '掌权者会用缓兵之计背弃媒体改革' },
  'LAT108-063': { title: '长期冲突记录和年年甲等必须得到解释' },
  'LAT108-064': { title: '不追究行政责任的调查并不完整' },
  'LAT108-067': { title: '把陈情转回被控机关不是真正监督' },
  'LAT108-068': { title: '长期不处理已知风险会产生管理责任' },
  'LAT108-070': { title: '整合口号可能只带来机构扩张' },
  'LAT108-071': { title: '现实事件可以检验官方风险判断' },
  'LAT108-072': { title: '监督别人以前必须先管好自身机构' },
  'LAT108-074': { title: '公文异常急迫可能暴露个人特权' },
  'LAT108-075': { title: '学术研究机关不应同时垄断政策筹议' },
  'LAT108-076': { title: '无法落实的法定任务只是空话' },
  'LAT108-077': { title: '监督机关对制度违法沉默就是失职' },
  'LAT108-078': { title: '广泛例外会把违法任用制度化' },
  'LAT108-079': { title: '重大决定的可信度取决于坚持' },
  'LAT108-080': { title: '知识群体的劝进会替权力反复提供台阶' },
  'LAT108-081': { title: '把辞职改称请假是政治语言欺骗' },
  'LAT108-082': { title: '四十天无人发现旷职暴露管理失灵' },
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
      id: `LAT108-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 55) throw new Error(`Expected 55 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的学术权威边界、史料方法、知识分子人格、行政责任、制度监督、法令一致性和政治语言判断；删去书稿宣传、自我功劳、骂人修辞、相邻论证中的重复台阶及采购案中过度依赖个案细节的叙述。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留李敖本人可独立检索的学术权威边界、史料方法、知识分子人格、行政责任、制度监督、法令一致性和政治语言判断。',
  '- 王企祥、林明璋、潘毓刚、郭中一、杨国枢、中研院调查委员会及匿名检举者的独立观点仍不转列为李敖思想。',
  '- “推荐恩师”论证保留不追问回信、严师不能成为忘恩借口、有能力补救旧错和师生关系不妨碍公正推荐四个不同层次。',
  '- 危楼、黑官和司机命案部分保留资料矛盾、行政责任、制度监督和管理风险，不逐项保留案情台阶。',
  '- 提取轮确认的四十六条跨册整段重复继续保持零重复入选。',
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
