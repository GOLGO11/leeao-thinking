import fs from 'node:fs';
import path from 'node:path';

const bookNo = '104';
const bookTitle = '李登辉的真面目';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与相邻的史料判断、领袖论、文化批判、任期承诺或政商特权论证重复，已由同一论证链中更完整的段落承载',
    ids: [
      'LAT104-007', 'LAT104-008', 'LAT104-012', 'LAT104-019', 'LAT104-025',
      'LAT104-028', 'LAT104-030', 'LAT104-033', 'LAT104-035', 'LAT104-041',
      'LAT104-048', 'LAT104-050', 'LAT104-052', 'LAT104-062', 'LAT104-063',
      'LAT104-065', 'LAT104-067', 'LAT104-075', 'LAT104-084', 'LAT104-098',
      'LAT104-102', 'LAT104-105', 'LAT104-112', 'LAT104-116', 'LAT104-124',
      'LAT104-125', 'LAT104-132', 'LAT104-134', 'LAT104-143',
    ],
  },
  {
    reason: '主要是被引书信或萨达特自述、人物名单、过渡短句、未展开的推断，脱离章节后的独立检索价值不足',
    ids: [
      'LAT104-042', 'LAT104-045', 'LAT104-064', 'LAT104-100', 'LAT104-107',
      'LAT104-108', 'LAT104-114', 'LAT104-115', 'LAT104-136', 'LAT104-137',
      'LAT104-138', 'LAT104-139',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT104-001': { title: '政治人物也可以成为历史警戒样本' },
  'LAT104-002': { title: '憎恨旧政权容易美化它的继承者' },
  'LAT104-003': { title: '自白是否完整要看关键事实有无交代' },
  'LAT104-004': { title: '行政程序可以反证政治履历', category: '方法' },
  'LAT104-005': { title: '威权法律把脱党仍视为继续参加' },
  'LAT104-006': { title: '官方秘密档案可以提供直接文证' },
  'LAT104-009': { title: '久远记忆不能压倒同期记录' },
  'LAT104-010': { title: '结论必须向更强证据开放' },
  'LAT104-011': { title: '史料未明前不应捕风捉影' },
  'LAT104-013': { title: '制度和常理可以反证个别说法' },
  'LAT104-014': { title: '组织关系不能被同乡假设限制' },
  'LAT104-015': { title: '组织外证人未必知道单线内情' },
  'LAT104-016': { title: '人物类比必须辨明政治转换背景' },
  'LAT104-017': { title: '直接记录通常胜过间接证言' },
  'LAT104-018': { title: '官场顺从常比才智更有用' },
  'LAT104-020': { title: '君臣姿态可以暴露统治哲学' },
  'LAT104-021': { title: '奴性也会成为官僚升迁资本' },
  'LAT104-022': { title: '证据不足时只能提出解释草案' },
  'LAT104-023': { title: '政治人物也会成为观念傀儡' },
  'LAT104-024': { title: '不肯媚世就难得世俗奖赏' },
  'LAT104-026': { title: '政权密件会承认公开否认的亡国事实', category: '政治' },
  'LAT104-027': { title: '名存实亡的政权会靠国号自欺' },
  'LAT104-029': { title: '统治者的迷信会成为社会示范' },
  'LAT104-031': { title: '领袖风度在容人和虚己' },
  'LAT104-032': { title: '领袖应克制自己并运用众智' },
  'LAT104-034': { title: '民主政治必须实行分层负责' },
  'LAT104-036': { title: '古代中国的坐姿本是跪坐' },
  'LAT104-037': { title: '文化传播不能硬套民族界线' },
  'LAT104-038': { title: '自然会坐不等于懂得文化坐姿' },
  'LAT104-039': { title: '姿态是否失礼取决于礼俗规范' },
  'LAT104-040': { title: '政治平反必须以正式程序完成' },
  'LAT104-043': { title: '反独裁的政治支持只能是策略' },
  'LAT104-044': { title: '迫害恩人暴露掌权者的无情' },
  'LAT104-046': { title: '家世宣传必须接受事实核对' },
  'LAT104-047': { title: '逢迎活人会连其祖先一并歪曲' },
  'LAT104-049': { title: '司法首长不得干预具体案件' },
  'LAT104-051': { title: '总统谈论个案已经损害司法独立' },
  'LAT104-053': { title: '党纪处分常服从选择性标准' },
  'LAT104-054': { title: '总统领导的民间团体只是国家机关伪装' },
  'LAT104-055': { title: '文化不应由官员主导' },
  'LAT104-056': { title: '文化必须超然于政治运动' },
  'LAT104-057': { title: '党国文化政策必然趋向复古和党化' },
  'LAT104-058': { title: '没有文化的人最喜欢管理文化' },
  'LAT104-059': { title: '台湾的边缘文化会与避难文化重叠' },
  'LAT104-060': { title: '文化复兴不能缩成器物和民俗' },
  'LAT104-061': { title: '文化官僚化会排斥真正作家' },
  'LAT104-066': { title: '政治祭祀会暴露权力者言行不一' },
  'LAT104-068': { title: '不成文规范依靠共同习惯维持' },
  'LAT104-069': { title: '法律精神也包含习惯惯例和常规' },
  'LAT104-070': { title: '法律没有明文禁止不等于行为正当' },
  'LAT104-071': { title: '只问效果会摧毁道德规范' },
  'LAT104-072': { title: '民主是一种生活方式、教养和格调' },
  'LAT104-073': { title: '政治暴力的坏榜样会传给下一代' },
  'LAT104-074': { title: '名义国家可能已经退化为地方政权' },
  'LAT104-076': { title: '政治地位必须面对现实尺度' },
  'LAT104-077': { title: '不对称地位不能靠自大消除' },
  'LAT104-078': { title: '政治领袖会以稳定为由推翻任期承诺' },
  'LAT104-079': { title: '全民拥戴是威权领袖延任的旧戏法' },
  'LAT104-080': { title: '选民纵容会让背信者再次当选' },
  'LAT104-081': { title: '政治领袖不能玩弄国民人格' },
  'LAT104-082': { title: '宁可更换坏人也不能接受欺骗连任' },
  'LAT104-083': { title: '政治人物的失败自认值得重视' },
  'LAT104-085': { title: '制造分裂者也会扮演统一维护者' },
  'LAT104-086': { title: '务实政治也必须把话说清楚' },
  'LAT104-087': { title: '经国大计可能只是把问题不断延后' },
  'LAT104-088': { title: '朋友关系也可能妨碍追求真理' },
  'LAT104-089': { title: '拆穿歪曲真理的敌人是人生快事', category: '人格' },
  'LAT104-090': { title: '敌人追求真理时也不应以私怨否定' },
  'LAT104-091': { title: '只有口头支持而无行动仍是作秀' },
  'LAT104-092': { title: '反对党也可能被金钱收编' },
  'LAT104-093': { title: '政治动机有瑕疵不妨碍大原则成立' },
  'LAT104-094': { title: '国家利益损失比私人利益输送更严重' },
  'LAT104-095': { title: '地方身份不能替侵占国家财产辩护' },
  'LAT104-096': { title: '规则连续为一人改变就是特权' },
  'LAT104-097': { title: '反对金权者也可能正是金权核心' },
  'LAT104-099': { title: '政治判断不应有永久敌友' },
  'LAT104-101': { title: '进出口实绩不能替代航空经验' },
  'LAT104-103': { title: '公文时序可以证明先批后修法' },
  'LAT104-104': { title: '法律也会为单一申请人量身修改' },
  'LAT104-106': { title: '上级越级介入会破坏行政体制' },
  'LAT104-109': { title: '长期租地能够制造事实垄断' },
  'LAT104-110': { title: '监管机关集体受惠仍属集体贪污', category: '法权' },
  'LAT104-111': { title: '被监管者难以自由拒绝监管者索惠' },
  'LAT104-113': { title: '法规例外可以暴露选择性优待' },
  'LAT104-117': { title: '量身修法能让特权披上合法外衣' },
  'LAT104-118': { title: '金钱门槛不能替代经验和安全' },
  'LAT104-119': { title: '特权受益者会把自己包装成受害者' },
  'LAT104-120': { title: '行政裁量也会专为特定企业开门' },
  'LAT104-121': { title: '一次性例外会在受益者过关后关闭' },
  'LAT104-122': { title: '法律开关也可能服务私人利益' },
  'LAT104-123': { title: '特权会先用法律包装自己', category: '法权' },
  'LAT104-126': { title: '被威权政党恭维应当反省人格' },
  'LAT104-127': { title: '观察一个人的朋友可以辅助识人' },
  'LAT104-128': { title: '政权持续拉拢可以反证合作关系' },
  'LAT104-129': { title: '政治出走若只攻击支持者便不可信' },
  'LAT104-130': { title: '权贵也会成为黑暗司法的受益者' },
  'LAT104-131': { title: '经济出走叙事可能掩盖既得特权' },
  'LAT104-133': { title: '投资数据可以检验经济出走说' },
  'LAT104-135': { title: '交叉新闻资料可以揭出资本关系' },
  'LAT104-140': { title: '新诗可以用非美直接面对现实' },
  'LAT104-141': { title: '政党变质会使原有政治希望破灭' },
  'LAT104-142': { title: '社会进步不能自动洗净专制死水' },
  'LAT104-144': { title: '官方谎言会把公众当作傻瓜', category: '政治' },
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
      id: `LAT104-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 103) throw new Error(`Expected 103 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的史料辨析、领袖论、政治伦理、文化批判、法权主张与政商特权分析；删去同一论证链中过密的证据台阶、过渡短句、主要属于被引人物的意见、人物名单和未展开的推断。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留李敖本人可独立检索的史料辨析、领袖论、政治伦理、文化批判、法权主张与政商特权分析。',
  '- 官方文件、新闻、书信、回忆和诗文，只在李敖明确评价、反驳或归纳的完整段落中随文保留。',
  '- 李登辉共产党身份、文化总会、政治暴力和长荣特权等连续论证，优先保留结论完整、方法明确的段落。',
  '- 萨达特自述中的独立思想不计为李敖思想；只有李敖自己的明确判断才可入选。',
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
