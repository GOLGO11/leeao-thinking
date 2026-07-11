import fs from 'node:fs';
import path from 'node:path';

const bookNo = '103';
const bookTitle = '孙中山研究';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');

const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与相邻史料辨析、政治宣传、外援交易、人物翻案或翻译论证重复，已由同一论证链中更完整的段落承载',
    ids: [
      'LAT103-001',
      'LAT103-005',
      'LAT103-009',
      'LAT103-013',
      'LAT103-014',
      'LAT103-022',
      'LAT103-023',
      'LAT103-025',
      'LAT103-026',
      'LAT103-034',
      'LAT103-035',
      'LAT103-039',
      'LAT103-045',
      'LAT103-047',
      'LAT103-050',
      'LAT103-053',
      'LAT103-056',
      'LAT103-063',
      'LAT103-065',
      'LAT103-066',
      'LAT103-072',
      'LAT103-080',
      'LAT103-086',
      'LAT103-089',
      'LAT103-092',
      'LAT103-093',
      'LAT103-098',
      'LAT103-105',
      'LAT103-111',
      'LAT103-115',
      'LAT103-120',
      'LAT103-122',
      'LAT103-127',
    ],
  },
  {
    reason: '自我开场、过渡短句或主要属于被引作者的材料，脱离章节后的独立检索价值较低',
    ids: [
      'LAT103-004',
      'LAT103-006',
      'LAT103-019',
      'LAT103-100',
      'LAT103-138',
      'LAT103-142',
    ],
  },
];

const dropMap = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = {
  'LAT103-002': { title: '政治迷雾需要历史家作最后审判' },
  'LAT103-003': { title: '爱国者也可能把卖国当作手段' },
  'LAT103-007': { title: '人物行踪可以否定会面传说' },
  'LAT103-008': { title: '亲历者的回忆仍须考订' },
  'LAT103-010': { title: '成文地点可以检验回忆真伪' },
  'LAT103-011': { title: '人物关系和现实条件必须共同验史' },
  'LAT103-012': { title: '政治宣传常常逸出基本常识' },
  'LAT103-015': { title: '单一目的说必须经过必要性检验' },
  'LAT103-016': { title: '政治人物会隐去不利前史' },
  'LAT103-017': { title: '史料结论必须满足时间顺序' },
  'LAT103-018': { title: '强权不能垄断历史' },
  'LAT103-020': { title: '历史真相可能存在矛盾说法' },
  'LAT103-021': { title: '人物自述必须与档案对读' },
  'LAT103-024': { title: '原始文件可以重建事件转折' },
  'LAT103-027': { title: '政治人物会为争取同情改写经历' },
  'LAT103-028': { title: '政治宣传品不能直接当作信史' },
  'LAT103-030': { title: '史家不能忽略敌方留下的材料' },
  'LAT103-031': { title: '内部文件可以突破一面之词' },
  'LAT103-032': { title: '伦敦蒙难源于偶发的自投罗网' },
  'LAT103-033': { title: '被神化者也可能下跪求饶' },
  'LAT103-036': { title: '告洋状是一种扩张性政治标签' },
  'LAT103-038': { title: '指责别人告洋状也可能是夫子自道' },
  'LAT103-040': { title: '争取外援常以国家权利预付' },
  'LAT103-041': { title: '丧权文件也可能夹带现代化条款' },
  'LAT103-042': { title: '外国势力会同时押注朝野' },
  'LAT103-043': { title: '依赖外援容易走向不择手段' },
  'LAT103-044': { title: '革命外援也可能拿国家权益交换' },
  'LAT103-046': { title: '密商应从关系最近者的证言追索' },
  'LAT103-048': { title: '政党会隐藏不利于领袖的文件' },
  'LAT103-049': { title: '当事人不否认也可成为辨真线索' },
  'LAT103-051': { title: '外国势力会把内斗双方变成筹码' },
  'LAT103-052': { title: '档案保存时间可以反驳伪造指控' },
  'LAT103-054': { title: '救国和卖国可能出自同一政党' },
  'LAT103-055': { title: '卖国竞赛不限于单一政治阵营' },
  'LAT103-057': { title: '历史次序必须用时间表核定' },
  'LAT103-058': { title: '政治人物的话必须先求证' },
  'LAT103-059': { title: '领袖误言会被追随者加倍传抄' },
  'LAT103-060': { title: '奉行遗教者也可能背离遗教' },
  'LAT103-061': { title: '共和国庆应当纪念反对家天下' },
  'LAT103-062': { title: '纪念日会被小朝廷重新塑造' },
  'LAT103-064': { title: '官方经典也可以反向阅读' },
  'LAT103-067': { title: '革命成功依赖被遮蔽的社会力量' },
  'LAT103-068': { title: '历史事实不能被领袖批复抹杀' },
  'LAT103-069': { title: '政党会利用社会力量后再踢开' },
  'LAT103-070': { title: '教科书会把复杂内情写成善恶对决' },
  'LAT103-071': { title: '没有武力的领袖只是空头领袖' },
  'LAT103-073': { title: '历史功劳必须按实际参与重算' },
  'LAT103-074': { title: '非法名位会制造可以预见的恶果' },
  'LAT103-075': { title: '政治异议不能被缩成个人私见' },
  'LAT103-076': { title: '以军阀之名打军阀是双重标准' },
  'LAT103-077': { title: '兔死狗烹会把老同志逼成敌人' },
  'LAT103-078': { title: '领袖失控会越法迫害同志' },
  'LAT103-079': { title: '钦定史书会窜改不利信件' },
  'LAT103-081': { title: '政治目的会遮蔽判断' },
  'LAT103-082': { title: '政党会把政见冲突改写成叛逆' },
  'LAT103-083': { title: '秘密结社伦理会污染公开政党' },
  'LAT103-084': { title: '独立人格必须服理而不盲从领袖' },
  'LAT103-085': { title: '守原则者宁可失败也不遗祸' },
  'LAT103-087': { title: '统治者的悔过哲学只要求别人' },
  'LAT103-088': { title: '领袖可能在失败后转用对手主张' },
  'LAT103-090': { title: '借外国武力消灭同胞仍是内战' },
  'LAT103-091': { title: '知识分子应为被污名者说公道话' },
  'LAT103-094': { title: '只有言教没有身教是领袖缺憾' },
  'LAT103-095': { title: '象征性武力往往无补大局' },
  'LAT103-096': { title: '贫困失败也不能夺走人的志气' },
  'LAT103-097': { title: '惩罚器物暴露封建政治心理' },
  'LAT103-099': { title: '作品价值可能晚于当世才确立' },
  'LAT103-101': { title: '名言翻译必须追索版本演变' },
  'LAT103-102': { title: '定译形成也会经过试译阶段' },
  'LAT103-103': { title: '定译必须由历次文本排比确认' },
  'LAT103-104': { title: '宣传译法往往简明有余而明确不足' },
  'LAT103-106': { title: '名言往往其来有自' },
  'LAT103-107': { title: '物证可以确认思想来源' },
  'LAT103-108': { title: '引用前人未必构成严重抄袭' },
  'LAT103-109': { title: '冲突的起草传说可以同时成立' },
  'LAT103-110': { title: '过度简明会扭曲原义' },
  'LAT103-112': { title: '词义分析必须分辨主格和受格' },
  'LAT103-113': { title: '同一人民在句中可以兼为主客' },
  'LAT103-114': { title: '对称口号会掩盖不对称原义' },
  'LAT103-116': { title: '概念附会会把主义变成统战戏法' },
  'LAT103-117': { title: '为人民的口号也可能变成罚人民' },
  'LAT103-118': { title: '论定人物必须把握成熟高峰' },
  'LAT103-119': { title: '纪念也可能把人物小化' },
  'LAT103-121': { title: '真正思想家可以从打手转为批判者' },
  'LAT103-123': { title: '自由抗争需要政治和思想双轨推进' },
  'LAT103-124': { title: '立论必须从原著举证' },
  'LAT103-125': { title: '坦白承认欲望胜过伪装' },
  'LAT103-126': { title: '革命和情爱可以交织一生' },
  'LAT103-128': { title: '革命成功后应转向更宽广的生活' },
  'LAT103-129': { title: '职业革命会让被革命者吃不消' },
  'LAT103-130': { title: '为尊者讳是一种封建史观' },
  'LAT103-131': { title: '被隐藏的伴侣可由老同志证言还原' },
  'LAT103-132': { title: '当事署名可以确认被遮蔽身份' },
  'LAT103-133': { title: '革命女性常在成功后被出局' },
  'LAT103-134': { title: '分居不能自动消除重婚问题' },
  'LAT103-135': { title: '冷门人名可以检验口述真伪' },
  'LAT103-136': { title: '人物身份知识可以打通证据链' },
  'LAT103-137': { title: '历史家应为沉默女性恢复名字' },
  'LAT103-139': { title: '旁证可以确认传闻的事实底座' },
  'LAT103-140': { title: '财务文书可以检验人物自述' },
  'LAT103-141': { title: '官方年谱会避开不利传说' },
  'LAT103-143': { title: '夸张资料仍可能保留争端线索' },
  'LAT103-144': { title: '文献无征时只能保留可能性' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'))
    .map(([category, count]) => ({ category, count }));
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(records) {
  const headers = [
    'id',
    'source_id',
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
  ];
  const lines = [headers.join(',')];
  for (const record of records) {
    lines.push(headers.map((header) => {
      const value = Array.isArray(record[header]) ? record[header].join(';') : record[header];
      return csvEscape(value);
    }).join(','));
  }
  return `${lines.join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 原始条目：${input.records.length}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${dropMap.size}`,
    '',
  ];
  let currentCategory = '';
  for (const record of records) {
    if (record.category !== currentCategory) {
      currentCategory = record.category;
      lines.push(`## ${currentCategory}`, '');
    }
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
    lines.push(`出处：${record.source_file}#${record.source_paragraph}`);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => (
    `${record.id}｜${record.category}｜${record.title}\n${record.description}\n出处：${record.source_file}#${record.source_paragraph}`
  )).join('\n\n')}\n`;
}

function normalizeRecords(records) {
  let sequence = 1;
  return records
    .filter((record) => !dropMap.has(record.id))
    .map((record) => {
      const override = overrides[record.id] || {};
      return {
        ...record,
        round: '校对轮',
        status: '已校对',
        source_id: record.id,
        id: `LAT103-${String(sequence++).padStart(3, '0')}`,
        title: override.title || record.title,
        category: override.category || record.category,
      };
    });
}

function assertUnique(records, key) {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record[key])) {
      throw new Error(`Duplicate ${key}: ${record[key]}`);
    }
    seen.add(record[key]);
  }
}

const inputIds = new Set(input.records.map((record) => record.id));
const missingDropIds = [...dropMap.keys()].filter((id) => !inputIds.has(id));
if (missingDropIds.length) {
  throw new Error(`Drop ids not found: ${missingDropIds.join(', ')}`);
}
const missingOverrideIds = Object.keys(overrides).filter((id) => !inputIds.has(id));
if (missingOverrideIds.length) {
  throw new Error(`Override ids not found: ${missingOverrideIds.join(', ')}`);
}

const records = normalizeRecords(input.records);
if (records.length !== 105) {
  throw new Error(`Expected 105 retained records, found ${records.length}`);
}
assertUnique(records, 'title');
assertUnique(records, 'description');
assertUnique(records, 'source_id');

const sourceById = new Map(input.records.map((record) => [record.id, record]));
for (const record of records) {
  if (record.description !== sourceById.get(record.source_id)?.description) {
    throw new Error(`Description changed for ${record.source_id}`);
  }
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖本人可独立检索的史料方法、人物论定、政治批判、外援分析、翻译考证、法权判断与情爱史观；删去同一论证链中过密的证据台阶、自我开场、过渡短句和主要属于被引作者的材料。description 字段未改写，仍保留提取轮原文。';
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
  `# ${bookTitle} 校对说明`,
  '',
  `- 输入：思想索引-提取轮.json（${input.records.length} 条）`,
  `- 输出：思想索引-校对轮.json / csv / md（${records.length} 条）`,
  `- 删除：${dropMap.size} 条`,
  '- 同步：思想索引.json / csv / txt 已更新为校对轮版本',
  '',
  '## 删除原则',
  '',
  ...dropGroups.map((group) => `- ${group.reason}：${group.ids.join('、')}`),
  '',
  '## 保留原则',
  '',
  '- 保留李敖本人可独立检索的史料辨析、人物论定、政治批判、外援分析、翻译考证、法权判断与情爱史观。',
  '- 孙中山、陈炯明、胡适、殷海光及其他人物的演说、书信、回忆和档案，只在李敖明确评价、反驳或归纳的完整段落中随文保留。',
  '- 伦敦蒙难、对日求援、陈炯明翻案和林肯名言等连续论证，优先保留结论完整、证据方法明确的段落，不逐级保留全部过渡。',
  '- 七个与上一册源文完全相同的实质段落已在提取轮跳过，校对轮继续保持零重复入选。',
  '- 分类继续固定为八个原子分类，没有为本书增加复合分类。',
  '- 标题只做压缩和辨识度修订；description 不改写原文。',
  '',
  '## 分类统计',
  '',
  ...counts.map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '校对说明.md'), proofreadNote, 'utf8');

console.log(JSON.stringify({
  book: `${bookNo}.${bookTitle}`,
  source: input.records.length,
  dropped: dropMap.size,
  retained: records.length,
  categories: counts,
}, null, 2));
