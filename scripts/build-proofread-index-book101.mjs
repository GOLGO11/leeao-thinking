import fs from 'node:fs';
import path from 'node:path';

const bookNo = '101';
const bookTitle = '胡适与我';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');

const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '祝寿颂词、承接句、单一史实或自我表彰色彩较重，独立思想索引价值较弱',
    ids: [
      'LAT101-003',
      'LAT101-006',
      'LAT101-008',
      'LAT101-011',
      'LAT101-014',
      'LAT101-021',
      'LAT101-027',
      'LAT101-028',
      'LAT101-036',
      'LAT101-037',
      'LAT101-043',
      'LAT101-045',
      'LAT101-058',
      'LAT101-062',
      'LAT101-064',
      'LAT101-069',
      'LAT101-071',
      'LAT101-072',
      'LAT101-075',
      'LAT101-093',
      'LAT101-107',
      'LAT101-115',
      'LAT101-121',
      'LAT101-122',
      'LAT101-136',
    ],
  },
  {
    reason: '与相邻条目重复，或同一友谊、史料、政治及法权论证链已由更完整段落承载',
    ids: [
      'LAT101-002',
      'LAT101-024',
      'LAT101-051',
      'LAT101-055',
      'LAT101-074',
      'LAT101-081',
      'LAT101-092',
      'LAT101-094',
      'LAT101-096',
      'LAT101-102',
      'LAT101-109',
      'LAT101-134',
      'LAT101-135',
      'LAT101-146',
    ],
  },
];

const dropMap = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = {
  'LAT101-001': { title: '身后影响取决于知己接班' },
  'LAT101-004': { title: '学术评价不可追随时势' },
  'LAT101-007': { title: '笔杆同样具有千斤重量' },
  'LAT101-010': { title: '珍爱自由不肯暗投' },
  'LAT101-012': { title: '专任工作必须保障基本生活' },
  'LAT101-013': { title: '学术认真不能为自我宣传担保' },
  'LAT101-015': { title: '双方争执应重视直接证言' },
  'LAT101-016': { title: '赞毁阵营显出论世尺度' },
  'LAT101-017': { title: '栽诬不能冒充学术研究' },
  'LAT101-018': { title: '教授头衔不能保证学问人格' },
  'LAT101-022': { title: '思想迫害只会更换标签' },
  'LAT101-023': { title: '栽赃靠实物嫁祸无辜' },
  'LAT101-025': { title: '私人报复会伪装成卫道' },
  'LAT101-026': { title: '当事人回应会提高传闻史料价值' },
  'LAT101-030': { title: '新方法可以弥补旧学根底' },
  'LAT101-031': { title: '重印版本可能删去原信' },
  'LAT101-033': { title: '学术谱系不能凭家世遗传' },
  'LAT101-034': { title: '保护异见需要承担政治压力' },
  'LAT101-035': { title: '大学伟大在于容纳多元' },
  'LAT101-038': { title: '完整文章选本仍会遗漏思想' },
  'LAT101-039': { title: '分类摘录有助流传完整思想' },
  'LAT101-040': { title: '分类条目需要标题协助检索' },
  'LAT101-041': { title: '思想分类难免受编者限制' },
  'LAT101-044': { title: '摧毁大学就是向文化宣战' },
  'LAT101-046': { title: '理性爱国必须计算实力后果' },
  'LAT101-047': { title: '举国滔滔时仍要敢持异议' },
  'LAT101-048': { title: '意见多元落实起来并不容易' },
  'LAT101-049': { title: '理性判断不应被时髦推动' },
  'LAT101-050': { title: '政治发言必须预想全部后果' },
  'LAT101-052': { title: '爱国名义也会造成祸国结果' },
  'LAT101-053': { title: '不了解敌情会使和平方案天真' },
  'LAT101-054': { title: '文官政治未必约束军人' },
  'LAT101-056': { title: '主和抗战可遵循同一原则' },
  'LAT101-057': { title: '一经决定就应全力执行' },
  'LAT101-059': { title: '和平抗战都可坚持不屈服' },
  'LAT101-060': { title: '评价言论必须还原时代处境' },
  'LAT101-061': { title: '高层抽象名词会制造阵营纠缠', category: '方法' },
  'LAT101-063': { title: '思想家也会混淆理论现实' },
  'LAT101-065': { title: '旧文献可以还原思想界混乱' },
  'LAT101-066': { title: '最低限度实验主义也能防错' },
  'LAT101-067': { title: '公开忏悔可以成为思想借鉴' },
  'LAT101-068': { title: '第一流思想家也难免受骗' },
  'LAT101-073': { title: '继承者失职应当感到羞耻' },
  'LAT101-077': { title: '选本价值取决于搜集精审' },
  'LAT101-080': { title: '遗嘱变更必须重查权利归属' },
  'LAT101-082': { title: '标称全集的目录也会残缺错误' },
  'LAT101-083': { title: '公共文化机构也会低效失职' },
  'LAT101-084': { title: '伟大作者的遗产属于全人类' },
  'LAT101-085': { title: '接受遗赠就应兑现遗嘱' },
  'LAT101-086': { title: '失职机构无权阻止他人整理' },
  'LAT101-087': { title: '起诉首先要有当事人资格' },
  'LAT101-089': { title: '阻止思想流通也是文化检查' },
  'LAT101-090': { title: '选集不会割裂作品整体精神' },
  'LAT101-091': { title: '文化争讼要接受同一道德尺度' },
  'LAT101-095': { title: '起诉时必须已具备法律资格' },
  'LAT101-097': { title: '公产不能无条件赠给私人' },
  'LAT101-098': { title: '接受遗赠后不得任意抛弃' },
  'LAT101-101': { title: '书面公证不能被强词否认' },
  'LAT101-103': { title: '行政机关不能配合伪造权利' },
  'LAT101-105': { title: '正义要求拒绝健忘并揭发真相' },
  'LAT101-106': { title: '遗嘱受托者负有整理责任' },
  'LAT101-108': { title: '机构反复决议也可能毫无结果' },
  'LAT101-111': { title: '惭愧道歉不能抵消受托责任' },
  'LAT101-112': { title: '文化工作不能排斥合格者' },
  'LAT101-113': { title: '完整全集必须具备编辑规范' },
  'LAT101-114': { title: '记录人物需要文采史才忠实' },
  'LAT101-116': { title: '统一思想只会造成思想僵化' },
  'LAT101-117': { title: '失去进步思想界就会失去政党生命' },
  'LAT101-118': { title: '删削会进一步压缩反极权思想' },
  'LAT101-119': { title: '选集全集能够还原真实人物' },
  'LAT101-120': { title: '官方纪念可能只留下人物画皮' },
  'LAT101-123': { title: '民主科学需要相容的气质' },
  'LAT101-124': { title: '沿用他人论断必须尊重来源' },
  'LAT101-127': { title: '消灭二等军阀不会终止专制' },
  'LAT101-128': { title: '头等军阀必须承担政治责任' },
  'LAT101-129': { title: '党高于国家会摧毁公共忠诚' },
  'LAT101-130': { title: '政治自由承诺必须接受事实检验' },
  'LAT101-132': { title: '谈话记录必须接受原始回忆校正' },
  'LAT101-137': { title: '说出真话必须承担代价' },
  'LAT101-138': { title: '公开资料足以反驳阴谋猜测' },
  'LAT101-139': { title: '知识分子必须守住政治关节' },
  'LAT101-140': { title: '总统复职必须遵守宪法程序' },
  'LAT101-141': { title: '临时条款不能洗白违法连任' },
  'LAT101-142': { title: '经济供养会腐蚀学者立场' },
  'LAT101-143': { title: '有所反对仍不能用委蛇代替原则' },
  'LAT101-144': { title: '学术权威不能取消批评资格' },
  'LAT101-145': { title: '日记密件应当相互印证' },
  'LAT101-148': { title: '腐败政局无法依靠个人挽救' },
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
        id: `LAT101-${String(sequence++).padStart(3, '0')}`,
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
if (records.length !== 109) {
  throw new Error(`Expected 109 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的史料方法、人物评价、思想传播、政治判断、法权分析、写作原则与人格判断；删去祝寿颂词、承接句、单一史实、自我表彰，以及同一友谊、政治和法律论证链中的重复条目。description 字段未改写，仍保留提取轮原文。';
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

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.md'), toMarkdown(records), 'utf8');
fs.writeFileSync(
  path.join(outputDir, '思想索引.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
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
  '- 保留李敖本人的史料方法、人物评价、思想传播、政治判断、法权分析、写作原则和人格判断。',
  '- 对自序、祝寿诗和胡适身后事业的连续叙述做收敛，只留下可脱离上下文独立检索的判断。',
  '- 胡适日记、私人书信、政治文件及他人引文，只在李敖明确分析、反驳或归纳的完整段落中随文保留。',
  '- 同一法律事实和论证链优先保留法理表达完整、证据指向明确的段落。',
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
