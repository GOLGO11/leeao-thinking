import fs from 'node:fs';
import path from 'node:path';

const bookNo = '099';
const bookTitle = '胡适研究';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');

const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '论战程序、承接句、书目交代或单一例证较强，独立思想索引价值较弱',
    ids: [
      'LAT099-002',
      'LAT099-004',
      'LAT099-009',
      'LAT099-011',
      'LAT099-041',
      'LAT099-044',
      'LAT099-045',
      'LAT099-047',
      'LAT099-054',
      'LAT099-062',
      'LAT099-070',
      'LAT099-071',
      'LAT099-073',
      'LAT099-074',
      'LAT099-101',
      'LAT099-105',
      'LAT099-106',
      'LAT099-117',
      'LAT099-124',
      'LAT099-125',
    ],
  },
  {
    reason: '与相邻条目重复，或主要承载讽刺情节、胡适原话和传记技术罗列，李敖独立判断较弱',
    ids: [
      'LAT099-032',
      'LAT099-037',
      'LAT099-083',
      'LAT099-084',
      'LAT099-107',
      'LAT099-108',
      'LAT099-112',
      'LAT099-113',
      'LAT099-114',
    ],
  },
];

const dropMap = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = {
  'LAT099-001': { title: '身后追随最能检验忠诚' },
  'LAT099-003': { title: '理解文章须追到基本思路' },
  'LAT099-005': { title: '求真不必讨好任何一派' },
  'LAT099-007': { title: '合传可采用连环结构' },
  'LAT099-008': { title: '少量文字也能写出深意' },
  'LAT099-012': { title: '文学革命可由目的转成手段' },
  'LAT099-013': { title: '文章能汇成思想运动' },
  'LAT099-016': { title: '改革应以具体问题替代口号' },
  'LAT099-018': { title: '思想一贯能保存远见' },
  'LAT099-020': { title: '评价人物要抓真实贡献' },
  'LAT099-021': { title: '学术称号要经严格尺度' },
  'LAT099-024': { title: '人格独立在于不信权威教条' },
  'LAT099-027': { title: '理智自由主义常显保守' },
  'LAT099-028': { title: '热情应当有分寸' },
  'LAT099-030': { title: '开放社会只需基本自由条件' },
  'LAT099-033': { title: '还原人物须经得起反驳' },
  'LAT099-034': { title: '读文须扣住作者微意' },
  'LAT099-038': { title: '历史褒贬须直接读原料' },
  'LAT099-049': { title: '民主科学必须容纳匡正' },
  'LAT099-051': { title: '科学不能成为模糊标签' },
  'LAT099-057': { title: '无关比较不能构成反驳' },
  'LAT099-058': { title: '时间序列能判定首倡' },
  'LAT099-064': { title: '守住论点边界可停止纠缠' },
  'LAT099-066': { title: '史学须管束不合法的主观' },
  'LAT099-067': { title: '历史翻案必须遵守方法' },
  'LAT099-079': { title: '理智克制显出性格成熟' },
  'LAT099-085': { title: '历史认识不足会招致民族失败' },
  'LAT099-086': { title: '革命可能带来更残暴统治' },
  'LAT099-098': { title: '可靠证据重于仓促结论' },
  'LAT099-100': { title: '通俗文章可以减少注证' },
  'LAT099-102': { title: '庄重文章的幽默可能流于刻薄' },
  'LAT099-109': { title: '琐事能显出真实人品' },
  'LAT099-120': { title: '名言也须追查真正出处' },
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
        id: `LAT099-${String(sequence++).padStart(3, '0')}`,
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
if (records.length !== 97) {
  throw new Error(`Expected 97 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的史料方法、传记观、自由主义判断、人物评价、版本学观点与写作原则；删去论战程序、承接句、重复例证、讽刺情节及主要承载他人观点的条目。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留李敖本人的史料方法、传记观、自由主义判断、人物评价、版本学观点与写作原则。',
  '- 对反驳叶青、郑学稼的连续论证做收敛，只留下可脱离论战现场独立检索的方法判断。',
  '- 胡适原话只有在李敖明确分析、赞同或反驳的完整段落中随文保留，不独立列项。',
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
