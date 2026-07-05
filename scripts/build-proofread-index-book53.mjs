import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '053.李敖报刊集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT053-032', '与“传统绊脚”同属反传统惰性的文化批评，本条更依赖余光中当期文章语境，校对轮删去。'],
  ['LAT053-034', '“因义受难”已由下一条“中国曾格”更完整承载，本条偏自我定评和外部报刊肯定，校对轮删去。'],
  ['LAT053-037', '《文星》“思想挂帅”已由“思想领导政治”和“不受人惑”两条支撑，本条宣传性较强，校对轮删去。'],
  ['LAT053-049', '“以文会友”段落后半引文占比高且结尾停在引语提示，思想索引独立性不如其他办刊条目，校对轮删去。'],
  ['LAT053-050', '“生活发愤”只有一句情绪性口号，思想展开不足，校对轮删去。'],
  ['LAT053-052', '“开放千秋”与“个人杂志”重复，且更偏刊物部署说明，校对轮删去。'],
  ['LAT053-053', '“期期训诂”主要是文字训诂与柏杨翻译批评，离本书报刊思想主线较远，校对轮删去。'],
  ['LAT053-055', '“狱中锦囊”与“狱中出版”“每月出书”重复，偏出版经过，校对轮删去。'],
  ['LAT053-068', '“开报有益”广告性和自我推销色彩较重，思想索引价值不如同篇“重质不重多”“负责发行”，校对轮删去。'],
  ['LAT053-069', '“媒体命名常识”偏新闻史常识反驳，主题较窄，校对轮删去。'],
  ['LAT053-076', '“每月干权”主要是订户余款转订的操作说明，思想展开不足，校对轮删去。'],
]);

const overrides = new Map([
  ['LAT053-007', { category: '方法', title: '证据改观', keywords: '费正清,证据,修正观点' }],
  ['LAT053-017', { title: '政治害学', keywords: '苏俄,学术,政治操控' }],
  ['LAT053-027', { title: '新文化使命', keywords: '文星,新思潮,新文化' }],
  ['LAT053-033', { title: '严肃办刊', keywords: '文星,严肃精神,出版风格' }],
  ['LAT053-038', { title: '思想领政', keywords: '思想,政治,现代化' }],
  ['LAT053-040', { title: '个人刊物', keywords: '河上肇,个人杂志,思想界' }],
  ['LAT053-041', { title: '概念辨争', keywords: '名词,争论,判断' }],
  ['LAT053-044', { title: '书籍避禁', keywords: '出版法,书籍类,新闻纸类' }],
  ['LAT053-047', { title: '狱中出版', keywords: '千秋评论,黑牢,出版' }],
  ['LAT053-048', { title: '每月出书', keywords: '千秋评论,每月一书,查禁' }],
  ['LAT053-054', { title: '文字抗议', keywords: '千秋评论,揭发,抗议' }],
  ['LAT053-058', { title: '言论入狱', keywords: '乌鸦评论,杂志执照,言论' }],
  ['LAT053-059', { title: '废墟希望', keywords: '劳伦斯,废墟,未来' }],
  ['LAT053-060', { title: '谴责办刊', keywords: '乌鸦评论,谴责杂志,不媚世' }],
  ['LAT053-064', { title: '报纸南针', keywords: '求是报,办报,中国前途' }],
  ['LAT053-067', { title: '负责发行', keywords: '求是报,发行人,责任' }],
  ['LAT053-070', { title: '史法论报', keywords: '历史方法,前科方法,揭发' }],
  ['LAT053-071', { title: '旧文新用', keywords: '旧文新刊,历史方法,查禁' }],
  ['LAT053-072', { title: '扒粪新闻', keywords: '扒粪,历史,新闻' }],
  ['LAT053-073', { title: '无党丈夫', keywords: '求是报,无党无派,批判' }],
  ['LAT053-075', { title: '资本不干言', keywords: '求是报,办报,言论自由' }],
  ['LAT053-077', { title: '主力节制', keywords: '小说,中国思想史,杂志' }],
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
      id: `LAT053-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除同题重复、纯订户操作、文字游戏、广告性自我说明和思想展开不足的条目；保留能独立呈现李敖办刊、言论自由、出版法权、思想与政治关系、文化批评和写作方法的原文段落。description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除同题重复、订户操作、广告性说明、文字游戏和思想展开不足的条目。',
      '保留报刊实践中能独立显示李敖判断的办刊方法、言论自由、出版法权、政治批评和文化批评段落。',
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
  '# 《李敖报刊集》思想索引校对说明',
  '',
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 校对原则',
  '',
  ...payload.proofreading.principles.map((item) => `- ${item}`),
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

fs.writeFileSync(path.join(outputDir, '校对说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built proofread 053.李敖报刊集: ${records.length} records. ` +
    `Dropped: ${dropped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
