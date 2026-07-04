import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '050.李敖五五日记');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT050-004', '迷信愚化判断已由后一条“愚民文化”展开得更完整，本条以省略号收束，校对轮不单列。'],
  ['LAT050-013', '主要是个人饮食和血压管理清单，方法价值较窄，思想索引性不足。'],
  ['LAT050-015', '与开篇定稿纪律重复，且段落较短，校对轮保留展开更完整的定稿条目。'],
  ['LAT050-016', '主体为友人对民运人士的评价，李敖自己的判断不够直接。'],
  ['LAT050-020', '新闻报道中的推荐引介，思想判断由下一条“变不变”段落覆盖。'],
  ['LAT050-023', '人犯空间批评太短，缺少可独立展开的法权判断。'],
  ['LAT050-037', '主要是获奖事件的自我处境说明，政治与法权主题已由前后演说段落覆盖。'],
  ['LAT050-038', '“论青年”段落带省略，语义较残，不适合作为独立索引。'],
  ['LAT050-049', '张学良会面与防录音属于史料细节，李敖自己的思想判断不足。'],
  ['LAT050-050', '对老孟的短评依赖私人情境，脱离上下文后指向不清。'],
]);

const overrides = new Map([
  ['LAT050-001', { title: '清明定稿', keywords: '时间,清明,定稿' }],
  ['LAT050-002', { title: '二千字下限', keywords: '每日二千字,写作,定稿' }],
  ['LAT050-003', { category: '文化', title: '出版情理', keywords: '出版,读书人口,文化' }],
  ['LAT050-005', { title: '打坐愚化', keywords: '打坐,愚民文化,文化' }],
  ['LAT050-006', { title: '官位奴性', keywords: '林洋港,司法院,政治' }],
  ['LAT050-007', { title: '媒体窝囊', keywords: '广告,媒体垄断,法权' }],
  ['LAT050-008', { title: '柜台做工', keywords: '勤奋,做工,方法' }],
  ['LAT050-009', { title: '蛋头坏文体', keywords: '文体,独立思想,文化' }],
  ['LAT050-010', { title: '继任法理', keywords: '李登辉,总统,法权' }],
  ['LAT050-011', { title: '出版孤独', keywords: '出版,政治犯,写作' }],
  ['LAT050-012', { title: '文章不靠报', keywords: '文章,报纸,写作' }],
  ['LAT050-014', { title: '独裁广播', keywords: '自由女神,不自由,政治' }],
  ['LAT050-017', { title: '新女性反感', keywords: '新女性,李昂,情爱' }],
  ['LAT050-018', { title: '恋爱法理', keywords: '交女朋友,法律,情爱' }],
  ['LAT050-019', { title: '长命要不窝囊', keywords: '长命,窝囊,人格' }],
  ['LAT050-021', { title: '入会变节', keywords: '立委,民进党,政治' }],
  ['LAT050-022', { title: '批民进党', keywords: '民进党,国民党,政治' }],
  ['LAT050-024', { title: '拒做打手', keywords: '中央日报,国民党,人格' }],
  ['LAT050-025', { title: '恐共滞政', keywords: '国民党,恐共,政治' }],
  ['LAT050-026', { title: '隐而不退', keywords: '独立战斗,写作,世界性作品' }],
  ['LAT050-027', { title: '暗杀投鼠', keywords: '江南案,暗杀,政治' }],
  ['LAT050-028', { title: '自由协议', keywords: '言论自由,世界论坛报,法权' }],
  ['LAT050-029', { title: '揭蒋纬国', keywords: '蒋纬国,揭发,写作' }],
  ['LAT050-030', { title: '爱女作秀', keywords: '名流,作秀,文化' }],
  ['LAT050-031', { title: '复仇出版', keywords: '龚德柏,复仇,写作' }],
  ['LAT050-032', { title: '成就未成', keywords: '成就奖,自信,人格' }],
  ['LAT050-033', { category: '写作', title: '伏尔泰之笔', keywords: '伏尔泰,揭发,写作' }],
  ['LAT050-034', { title: '放逐变留刑', keywords: '出国自由,护照,法权' }],
  ['LAT050-035', { title: '去留协作', keywords: '去留,救国,政治' }],
  ['LAT050-036', { title: '去者责任', keywords: '海外华人,祖国自由,政治' }],
  ['LAT050-039', { title: '胡适距离', keywords: '胡适,五四,知识' }],
  ['LAT050-040', { title: '胡适细心', keywords: '胡适,雪中送炭,人格' }],
  ['LAT050-041', { title: '胡适师门', keywords: '胡适,师门,知识' }],
  ['LAT050-042', { title: '求士不朽', keywords: '胡适,求士,知识' }],
  ['LAT050-043', { title: '证据补正', keywords: '张学良,证据,方法' }],
  ['LAT050-044', { title: '自在易老', keywords: '工作,自在,方法' }],
  ['LAT050-045', { title: '文字落实', keywords: '谈话,文字,写作' }],
  ['LAT050-046', { title: '闭关形式', keywords: '佛学,形式,文化' }],
  ['LAT050-047', { title: '泄愤非自由', keywords: '天安门,群众,政治' }],
  ['LAT050-048', { title: '不办分社', keywords: '求是报,办报,写作' }],
  ['LAT050-051', { title: '蒋公鸵鸟', keywords: '国民党教育,真理,政治' }],
]);

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function writeCsv(filePath, records) {
  const headers = [
    'id',
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
    'source_id',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const extractionIds = new Set(extraction.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!extractionIds.has(id)) {
    throw new Error(`Unknown extraction id: ${id}`);
  }
}

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...edit,
      id: `LAT050-${String(index + 1).padStart(3, '0')}`,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} in ${record.source_id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除生活管理清单、同题重复、外部评价为主、纯史料细节和私人情境过重的条目，保留时间管理、写作纪律、出版办报、政治法权、胡适谱系、人格自况和情爱判断等骨干段落；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除生活管理清单、同题重复、外部评价为主、纯史料细节、过短事件和私人情境过重的条目。',
      '保留能独立呈现李敖判断的时间管理、写作纪律、出版办报、政治法权、胡适谱系、人格自况、文化批评和情爱段落。',
      '标题继续压缩为检索用语，分类仍使用 8 个原子分类。',
    ],
    dropped,
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

const noteLines = [
  '# 《李敖五五日记》思想索引校对说明',
  '',
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  `- 来源目录：${payload.book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 校对说明',
  '',
  '本轮从提取轮 51 条中保留 41 条。校对重点是让《李敖五五日记》从按月日记与材料汇编中收束出思想骨干：时间管理与定稿纪律、写作和出版判断、办报与言论自由、国民党和民进党批评、出入境与媒体限制、胡适知识谱系、人格自况、文化迷信批评和少量情爱判断。',
  '',
  '删除项主要是生活管理清单、同题重复、外部评价为主、纯史料细节、过短事件和私人情境过重的段落。',
  '',
  '`description` 字段全部沿用提取轮中的源文本原段落，未做改写。',
  '',
];
fs.writeFileSync(path.join(outputDir, '校对说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread ${payload.book.sequence}.${payload.book.title}: ${records.length} records. ` +
    `Dropped: ${dropped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
