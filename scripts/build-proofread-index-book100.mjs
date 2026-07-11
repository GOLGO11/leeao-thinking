import fs from 'node:fs';
import path from 'node:path';

const bookNo = '100';
const bookTitle = '胡适评传';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');

const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '序言内部重复、承接句、单一事实纠错或文学渲染较强，独立思想索引价值较弱',
    ids: [
      'LAT100-002',
      'LAT100-005',
      'LAT100-007',
      'LAT100-008',
      'LAT100-011',
      'LAT100-015',
      'LAT100-031',
      'LAT100-036',
      'LAT100-039',
      'LAT100-042',
      'LAT100-045',
      'LAT100-048',
      'LAT100-053',
      'LAT100-057',
      'LAT100-058',
      'LAT100-073',
      'LAT100-080',
      'LAT100-083',
      'LAT100-098',
      'LAT100-107',
      'LAT100-111',
      'LAT100-116',
      'LAT100-123',
      'LAT100-125',
      'LAT100-127',
      'LAT100-130',
    ],
  },
  {
    reason: '与相邻条目重复，或同一因果链、同一史料判断已由更完整段落承载',
    ids: [
      'LAT100-023',
      'LAT100-024',
      'LAT100-066',
      'LAT100-068',
      'LAT100-097',
      'LAT100-113',
    ],
  },
];

const dropMap = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = {
  'LAT100-001': { title: '传记应让死者重新开口' },
  'LAT100-003': { title: '感情立场无法还原真人' },
  'LAT100-004': { title: '人物画像必须忠于本人' },
  'LAT100-006': { title: '个人评传也应写出时代' },
  'LAT100-009': { title: '传记材料应主动征集' },
  'LAT100-012': { title: '历史人物常有矛盾面貌' },
  'LAT100-013': { title: '个人生命嵌在时代之中' },
  'LAT100-014': { title: '后人只能从残片追索真相' },
  'LAT100-016': { title: '如实报告容易得罪同僚' },
  'LAT100-017': { title: '小官也要记住上司私事' },
  'LAT100-018': { title: '繁多名号暴露旧文人习气' },
  'LAT100-019': { title: '训诂专长不能代替带兵能力' },
  'LAT100-021': { title: '鸦片比例可作军事史材料' },
  'LAT100-022': { title: '无名文献也可考出作者' },
  'LAT100-025': { title: '时间顺序能够推翻第一说' },
  'LAT100-026': { title: '批评者也须接受史料纠正' },
  'LAT100-027': { title: '学术称号必须采用严格尺度' },
  'LAT100-028': { title: '文字拙劣不减史料价值' },
  'LAT100-029': { title: '文献按日期合编便于稽考' },
  'LAT100-030': { title: '男名寄托重男愿望' },
  'LAT100-032': { title: '希望可以支撑人抵抗折磨' },
  'LAT100-033': { title: '家庭订婚会塑造婚姻保守' },
  'LAT100-034': { title: '年龄计算可以发现传记沿误' },
  'LAT100-037': { title: '童年旁观塑造温和脾气' },
  'LAT100-041': { title: '拒绝乱猜就应直接问当事人' },
  'LAT100-044': { title: '学费差异造成理解差距' },
  'LAT100-046': { title: '口述故事能训练翻译理解' },
  'LAT100-047': { title: '白话小说能训练通顺文字' },
  'LAT100-050': { title: '简明论证可以促成无神信仰' },
  'LAT100-051': { title: '偶然阅读可能改写一生' },
  'LAT100-052': { title: '思想反叛也会向母权归顺' },
  'LAT100-054': { title: '不公开羞辱有助培养自尊' },
  'LAT100-055': { title: '过早成人会剥夺儿童游戏' },
  'LAT100-060': { title: '成年爱好可能源于童年补偿' },
  'LAT100-062': { title: '世界主义者也会受乡土束缚' },
  'LAT100-063': { title: '学术不能依靠家世遗传' },
  'LAT100-064': { title: '早期诗歌能够显出入世思想' },
  'LAT100-067': { title: '思想迫害会迫使人曲解人物' },
  'LAT100-069': { title: '谨慎文字不可过度推演' },
  'LAT100-071': { title: '新书能打开旧学之外的世界' },
  'LAT100-072': { title: '报纸短评能够塑造少年' },
  'LAT100-074': { title: '白话小说能够预备文学革命' },
  'LAT100-075': { title: '教师鼓励能够开启言论自由' },
  'LAT100-076': { title: '思想传播需要中间触媒' },
  'LAT100-077': { title: '进化论可能导向改良主义' },
  'LAT100-078': { title: '思想起点会限制政治道路' },
  'LAT100-079': { title: '查禁挡不住文章影响' },
  'LAT100-082': { title: '自治精神会推动权利争取' },
  'LAT100-086': { title: '社会改良需要传播工具' },
  'LAT100-087': { title: '共同语言源于公共沟通需要' },
  'LAT100-088': { title: '写作必须让人看懂' },
  'LAT100-089': { title: '熟悉环境能让小说具体' },
  'LAT100-093': { title: '单纯理想可以驱使人赴死' },
  'LAT100-094': { title: '稀见原刊应主动调阅' },
  'LAT100-099': { title: '鼓励可能改写受者命运' },
  'LAT100-103': { title: '诗词说理容易产生臭味' },
  'LAT100-104': { title: '少年翻译也能达到工巧' },
  'LAT100-106': { title: '师承关系也可能转成思想冲突' },
  'LAT100-109': { title: '官款会侵蚀制度自主' },
  'LAT100-115': { title: '坚持原则可能拒绝回归' },
  'LAT100-117': { title: '当事解释仍须继续考证' },
  'LAT100-120': { title: '自述原文可以纠正他人回忆' },
  'LAT100-122': { title: '赔款也能转成教育资源' },
  'LAT100-124': { title: '考试趣味可能左右评分', category: '方法' },
  'LAT100-128': { title: '自我整顿必须停止糊涂' },
  'LAT100-132': { title: '外界期待可能造成专业误选' },
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
        id: `LAT100-${String(sequence++).padStart(3, '0')}`,
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
if (records.length !== 100) {
  throw new Error(`Expected 100 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的传记方法、人物评价、教育观察、思想形成分析、政治判断与写作原则；删去序言内部重复、过渡句、单一史实纠错、文学渲染及同一因果链上的重复条目。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留李敖本人的传记方法、人物评价、教育观察、思想形成分析、政治判断与写作原则。',
  '- 对序言中的传记设计和各章连续因果分析做收敛，只留下可脱离上下文独立检索的判断。',
  '- 胡适自述、诗文、日记及他人引文只有在李敖明确分析或反驳的完整段落中随文保留，不独立列项。',
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


