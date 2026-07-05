import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '054.李敖书序集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT054-012', '主要是法律专修科设立背景，李敖本人的判断尚未展开，校对轮删去。'],
  ['LAT054-013', '偏个人求学经历与兴趣取舍，思想索引的独立检索价值不如同文后续法权与人格条目，校对轮删去。'],
  ['LAT054-020', '主要是对宫中秘闻的阅读趣味评价，思想判断较薄，校对轮删去。'],
  ['LAT054-035', '与上一条“洗面革心”同属沈醉反省主题，本条以引文说明为主，校对轮保留概括性更强的上一条。'],
  ['LAT054-044', '“李宗仁晚年两件武器”主题已由 LAT054-027 承载，本条重复度高，校对轮删去。'],
  ['LAT054-047', '“不媚世”与上一条“谴责使命”同属谴责小说使命判断，且本条展开较少，校对轮删去。'],
  ['LAT054-053', '主要交代台湾新版与大陆版的版本目标，偏出版缘起，思想展开不足，校对轮删去。'],
  ['LAT054-054', '配图责任属于具体出版操作，保留价值不如附录取舍与旁证校误，校对轮删去。'],
  ['LAT054-056', '校勘疑义以编校过程说明为主，校对轮保留证据链更完整的“旁证校误”。'],
  ['LAT054-059', '侍从视角主题已由后文“近侍破伪”更完整承载，本条引语比重较高，校对轮删去。'],
  ['LAT054-063', '梁漱溟段落偏个人评断和轶闻式棒喝，独立思想索引价值较弱，校对轮删去。'],
  ['LAT054-067', '“抬出埋没”与“史家正义”“学问正义”主题重合，且篇幅短，校对轮删去。'],
  ['LAT054-069', '作为序文结语，主题已由前文“史家正义”“不合时宜”承载，校对轮删去。'],
  ['LAT054-071', '偏《历年办理匪案汇编》的辑次与收录范围说明，方法判断不如统计证伪与官样文章集中，校对轮删去。'],
  ['LAT054-080', '原状影印与保护提供者属于出版执行说明，思想展开不如同文档案方法与法权条目，校对轮删去。'],
]);

const overrides = new Map([
  ['LAT054-005', { category: '政治', title: '孝义样板', keywords: '国民党,伦理样板,政治包装' }],
  ['LAT054-008', { title: '党国亲缘', keywords: '国民党,亲缘政治,派系' }],
  ['LAT054-017', { title: '亡君现代史', keywords: '溥仪,现代史,命运剖面' }],
  ['LAT054-031', { category: '方法', title: '谴责失度', keywords: '传记,谴责语句,历史写法' }],
  ['LAT054-032', { title: '义愤限度', keywords: '汪精卫,义愤,历史研究' }],
  ['LAT054-037', { title: '订正有度', keywords: '军统内幕,订正,存真' }],
  ['LAT054-039', { title: '奇书破立', keywords: '厚黑学,李宗吾,讽世' }],
  ['LAT054-048', { title: '爱憎界限', keywords: '谴责小说,特权分子,人民' }],
  ['LAT054-049', { title: '小说史料', keywords: '新官场现形记,小说,外交内幕' }],
  ['LAT054-050', { title: '义愤文美', keywords: '谴责小说,义愤,文笔' }],
  ['LAT054-051', { category: '方法', title: '行家信任', keywords: '万大鋐,国共斗争,作者判断' }],
  ['LAT054-055', { title: '附录边界', keywords: '附录,正文补充,选材' }],
  ['LAT054-057', { title: '旁证校误', keywords: '罗开甲,刘秉义,旁证' }],
  ['LAT054-060', { title: '近侍破伪', keywords: '蒋介石,侍卫官,近身观察' }],
  ['LAT054-061', { title: '大陆见真', keywords: '蒋介石,大陆派,台湾派' }],
  ['LAT054-064', { title: '骨气教材', keywords: '梁漱溟,知识分子,活教科书' }],
  ['LAT054-070', { category: '方法', title: '官方证据', keywords: '李登辉,官方证据,秘密文件' }],
  ['LAT054-073', { title: '官样文章', keywords: '匪案汇编,官方套语,文献缺陷' }],
  ['LAT054-075', { title: '牵连成罪', keywords: '黄氏姐妹,李朋,冤狱' }],
  ['LAT054-079', { title: '酷吏链条', keywords: '军法,特务,李元簇' }],
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
      id: `LAT054-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除背景资料、出版操作细节、同题重复、称赞式读后感和轶闻性较强的条目；保留能够独立呈现李敖史料判断、写作标准、知识分子伦理、政治批判、法权意识与出版方法的原文段落。description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description 原文。',
      '删除偏背景资料、出版操作细节、同题重复、称赞式读后感和轶闻性条目。',
      '保留能够独立检索的史料方法、写作判断、政治批判、法权意识和人格伦理段落。',
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
  '# 《李敖书序集》思想索引校对说明',
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
  `Built proofread 054.李敖书序集: ${records.length} records. Dropped: ${dropped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
