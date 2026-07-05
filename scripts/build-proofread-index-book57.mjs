import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '057.李敖访谈录1990-2018');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT057-001', '偏《民主天地》内部经营和班底说明，思想判断承载不足，校对轮删除。'],
  ['LAT057-004', '讨回公道的态度已有官司、法权条目承载，本条偏即时反击，校对轮删除。'],
  ['LAT057-005', '以林正杰、费希平等党外个案为主，政治原则展开不足，校对轮删除。'],
  ['LAT057-008', '海外华侨去留的感慨较口语化，独立思想索引价值弱于祖国、民主条目，校对轮删除。'],
  ['LAT057-013', '官司争气主题已有更完整的官司过程、官司造势条目承载，校对轮删除。'],
  ['LAT057-020', '烦恼与自由的主题和孤独愉悦、人格独立条目重复，且展开较薄，校对轮删除。'],
  ['LAT057-021', '生活纪律、健康与性玩笑混杂，思想分类不够稳定，校对轮删除。'],
  ['LAT057-022', '官司自由与身体境况交织较多，法权观点已有更直接条目承载，校对轮删除。'],
  ['LAT057-029', '媒体合作、人际关系和风流自述交织，主题散而不够原子化，校对轮删除。'],
  ['LAT057-042', '定陵纸上考察与间接知识、卧游神游条目同题，且例证性更强，校对轮删除。'],
  ['LAT057-047', '作息与养生自述偏生活习惯，思想索引独立价值不足，校对轮删除。'],
  ['LAT057-050', '女性从政判断与政治牺牲条目重复，且表述重在即时评论，校对轮删除。'],
  ['LAT057-051', '古瑞云个案色彩较重，理想现实主题已有更稳定条目承载，校对轮删除。'],
  ['LAT057-053', '小说身份表述过短，不能独立支撑一条思想索引，校对轮删除。'],
  ['LAT057-054', '二李救文偏机锋式自我定位，思想展开不足，校对轮删除。'],
  ['LAT057-057', '中国故土主题由旧梦破坏、两岸沟通等条目更完整承载，校对轮删除。'],
  ['LAT057-061', '司法不碰与后续官司过程同题，后者更完整，校对轮删除。'],
  ['LAT057-069', '孤独快乐与前文孤独愉悦重复，校对轮保留较完整条目，删除本条。'],
  ['LAT057-075', '主要为记者概括《风流自传》的爱情想像，非李敖直接展开，校对轮删除。'],
  ['LAT057-084', '知识爆发标题与段落实际的畅销、金钱话题不吻合，校对轮删除。'],
  ['LAT057-093', '标题与段落错配，段落实际为情史被写成西门庆式形象，校对轮删除。'],
  ['LAT057-094', '段落截取不完整且以提问残片为主，不能作为原文描述，校对轮删除。'],
  ['LAT057-116', '标题为古书取舍，段落实际谈小孩设计，标题与原文错配，校对轮删除。'],
  ['LAT057-117', '段落仅为采访现场答话，无法形成思想索引，校对轮删除。'],
  ['LAT057-118', '标题为白话训练，段落实际谈子女与群众，标题与原文错配，校对轮删除。'],
  ['LAT057-133', '间接经验主题与间接理解、间接取知重复，本条例证较薄，校对轮删除。'],
  ['LAT057-147', '北大框框偏专门评议北大社科，和本书主干思想索引关系较远，校对轮删除。'],
  ['LAT057-157', '消灭负面主题已有情绪坐标、化解痛苦条目承载，校对轮删除。'],
  ['LAT057-161', '爱情在戏与后文爱情勿痛同题，后者更直接，校对轮删除。'],
  ['LAT057-168', '敬畏文字表述过短，无法独立支撑索引条目，校对轮删除。'],
  ['LAT057-174', '经验互借与间接知识、间接取知同题，校对轮删除。'],
  ['LAT057-176', '微博争胜偏平台使用玩笑，思想展开不足，校对轮删除。'],
  ['LAT057-190', '参选说话与公开两制、政治平台条目重复，校对轮删除。'],
  ['LAT057-191', '朋友经不起主题与朋友不可试、没有寂寞重复，校对轮删除。'],
  ['LAT057-195', '有钱本领过短且偏口语机锋，金钱独立主题由后文条目承载，校对轮删除。'],
  ['LAT057-196', '醍醐灌顶偏长篇自我评价，思想分类不够收敛，校对轮删除。'],
  ['LAT057-198', '全集工程与中文定位、好中文条目重复，校对轮删除。'],
  ['LAT057-200', '微博费时偏媒介操作成本，思想索引价值较弱，校对轮删除。'],
  ['LAT057-206', '不能忍骗与做人较真同题，校对轮保留较完整条目，删除本条。'],
  ['LAT057-211', '定位不清偏太阳花运动即时批评，身份判断由其他条目承载，校对轮删除。'],
  ['LAT057-213', '非法占领偏单一事件定性，程序瑕疵、民主法治条目更适合承载法权判断，校对轮删除。'],
  ['LAT057-218', '鉴定眼光与古物法眼、看书支撑重复，本条展开较散，校对轮删除。'],
  ['LAT057-221', '独来独往偏自我性格表白，和不入党派、快乐任性重复，校对轮删除。'],
  ['LAT057-239', '禁书最多与查禁不服、查禁道歉同题，校对轮删除。'],
  ['LAT057-241', '文学审美与留下文学、美国批判条目交叉，分类不够原子化，校对轮删除。'],
  ['LAT057-244', '风流公开与公开谈性同题，校对轮删除。'],
  ['LAT057-248', '不卖日本偏古董买卖个案，文化判断展开不足，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT057-010', { title: '去情绪见资料', keywords: '情绪,资料,历史判断' }],
  ['LAT057-023', { title: '批评不媚众', keywords: '批评,群众,独立判断' }],
  ['LAT057-026', { title: '老板不越界', keywords: '老板,思想独立,主持人' }],
  ['LAT057-039', { title: '乐观是做法', keywords: '乐观,行动,现实感' }],
  ['LAT057-040', { title: '消灭负面', keywords: '负面情绪,快乐,方法' }],
  ['LAT057-055', { title: '两岸精神沟通', keywords: '两岸,中国,精神沟通' }],
  ['LAT057-064', { title: '选择是非', keywords: '是非,选择,风骨' }],
  ['LAT057-066', { title: '读书见窍门', keywords: '读书,窍门,方法' }],
  ['LAT057-071', { title: '表达推动', keywords: '表达,表演,推动效果' }],
  ['LAT057-095', { title: '官司震慑', keywords: '官司,反击,法律策略' }],
  ['LAT057-104', { title: '政治平台', keywords: '参选,平台,一国两制' }],
  ['LAT057-107', { title: '化解痛苦', keywords: '痛苦,快乐,心理方法' }],
  ['LAT057-110', { title: '知识人没落', keywords: '知识分子,没落,台湾' }],
  ['LAT057-123', { title: '电视为表达', keywords: '电视,表达,影响力' }],
  ['LAT057-128', { title: '红色爱国', keywords: '红色,祖国,政治认同' }],
  ['LAT057-134', { title: '语言有气', keywords: '语言,气势,白话文' }],
  ['LAT057-137', { title: '资料骨子', keywords: '资料,文章,写作方法' }],
  ['LAT057-146', { title: '宪法替自由', keywords: '宪法,言论自由,法权' }],
  ['LAT057-165', { title: '朋友不可试', keywords: '朋友,考验,人性' }],
  ['LAT057-173', { title: '间接取知', keywords: '间接知识,历史,经验' }],
  ['LAT057-197', { title: '短文功夫', keywords: '微博,短文,文字功夫' }],
  ['LAT057-207', { title: '自由要听见', keywords: '自由,声音,媒体' }],
  ['LAT057-223', { title: '生死安乐', keywords: '死亡,快乐,人生观' }],
  ['LAT057-245', { title: '钱即独立', keywords: '金钱,独立,自由' }],
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
      id: `LAT057-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }
  if (record.description !== extraction.records.find((source) => source.id === record.source_id).description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除同题重复、展开不足、偏自我机锋、偏专门例证、报道转述和个案色彩过重的条目；保留能独立呈现李敖写作方法、史料方法、知识分子伦理、文化判断、政治原则、法权意识、人格标准与情爱观的原文段落。description 未改写。',
  },
  records,
  dropped,
};

const jsonPath = path.join(outputDir, '思想索引-校对轮.json');
const csvPath = path.join(outputDir, '思想索引-校对轮.csv');
const mdPath = path.join(outputDir, '思想索引-校对轮.md');
const notePath = path.join(outputDir, '校对说明.md');

fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(csvPath, records);
writeMarkdown(mdPath, payload);

const noteLines = [
  '# 《李敖访谈录1990-2018》思想索引校对说明',
  '',
  `- 校对输入：${path.relative(rootDir, extractionPath)}`,
  `- 校对输出：${path.relative(rootDir, jsonPath)}`,
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 校对原则',
  '',
  '- description 只沿用原书段落，不做转述和改写。',
  '- 标题只做索引层浓缩；关键词只做检索层收敛。',
  '- 删除同题重复、展开不足、偏报道转述、偏个人机锋、偏专门例证或标题与原文错配的条目。',
  '',
  '## 删除清单',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
];

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      book: payload.book.title,
      round: payload.book.round,
      input: extraction.records.length,
      kept: records.length,
      dropped: dropped.length,
      categories: categoryCounts(records),
      outputs: [jsonPath, csvPath, mdPath, notePath],
    },
    null,
    2,
  ),
);
