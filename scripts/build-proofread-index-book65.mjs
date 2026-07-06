import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '065.李敖书函集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT065-004', '同属警政外侨案程序追问，已由行政命令、权限与双重标准条目覆盖。'],
  ['LAT065-007', '中文解释问题是出版法任意解释的延伸，独立思想入口较弱。'],
  ['LAT065-011', '侮辱遗像构成要件的技术细节，已由训政遗痕与学术自由条目覆盖。'],
  ['LAT065-015', '文字狱结论与一国两制、诉愿逼真相条目重复。'],
  ['LAT065-018', '检察官辞职主题已由更完整的司法不应给政治用条目覆盖。'],
  ['LAT065-020', '私下道歉与公开辩驳主题，在后续新闻更正条目中已有更完整展开。'],
  ['LAT065-033', '面对现实的方法论已由没办法中找可行办法条目覆盖。'],
  ['LAT065-037', '邻里责任主题已由管事就要负责到底条目覆盖。'],
  ['LAT065-040', '家族自传的历史意义已由复六叔三条写作条目覆盖。'],
  ['LAT065-043', '个人浮沉见时代变化与自传写作、苦难记录条目重复。'],
  ['LAT065-045', '新闻封锁申诉较窄，已由平衡报道与辩驳权条目覆盖。'],
  ['LAT065-052', '小事认真主题已由从小事看认真开篇条目覆盖。'],
  ['LAT065-058', '出版法处分新闻自由的程序点，已由同版辩驳与改版蒙混条目覆盖。'],
  ['LAT065-060', '评议会测验公正的动机，已由新闻评议不能势利条目覆盖。'],
  ['LAT065-063', '同案中伤的类比，属于同一新闻更正链的重复论证。'],
  ['LAT065-064', '平衡查证原则已由平衡报道应补名誉损害和辩驳制度条目覆盖。'],
  ['LAT065-070', '出书反击权贵党羽与言论自由不能委屈、出版反击条目重复。'],
  ['LAT065-074', '公共计划私人成书的个案细节过窄，保留公费学术书公共性即可。'],
  ['LAT065-075', '参展办法条文细节过窄，保留书展不能偷天换日的结论。'],
  ['LAT065-081', '天天是秋后是行动口号，已由个案详追留下信史条目覆盖。'],
  ['LAT065-083', '男女平等与查禁制度关系已由裸体也要男女平等条目收束。'],
  ['LAT065-087', '郑南榕精神是政客背信条目的结尾延伸，独立索引性较弱。'],
  ['LAT065-088', '报社作者规格偏事务规则，已由诚信原则与责任分担条目覆盖。'],
  ['LAT065-095', '报纸公平报道个案较窄，保留三十年争讼人格条目。'],
  ['LAT065-099', '不稀罕参与但有权质问偏短促姿态，已由记者会一视同仁覆盖。'],
  ['LAT065-103', '史实错误立刻改正属于校勘态度，独立思想密度不足。'],
  ['LAT065-105', '小说里程碑与李敖更是文学家主题重复，保留较能索引身份判断的一条。'],
  ['LAT065-108', '转载礼貌偏私人通信，思想索引性不足。'],
  ['LAT065-110', '惜福好学偏临场寄语，思想密度不足。'],
  ['LAT065-113', '做客情绪批判已由中国土地上无主客条目覆盖。'],
]);

const overrides = new Map([
  ['LAT065-021', { title: '售书不靠神道设教' }],
  ['LAT065-034', { title: '没办法里找可行办法' }],
  ['LAT065-042', { category: '写作', title: '苦难不能让它过去' }],
  ['LAT065-047', { title: '八年追索终得清白' }],
  ['LAT065-049', { title: '司法不能全盘失望' }],
  ['LAT065-057', { title: '荣辱标准见人格尊严' }],
  ['LAT065-061', { title: '口头抱歉不能代替辩驳' }],
  ['LAT065-065', { title: '出版导向思想不为选举' }],
  ['LAT065-067', { title: '庙宇文化的恐怖丑陋' }],
  ['LAT065-068', { title: '新闻评议不能势利' }],
  ['LAT065-089', { title: '档案要亲自翻检' }],
  ['LAT065-091', { title: '辩驳制度保护新闻自由' }],
  ['LAT065-100', { title: '台湾诉讼多两个敌人' }],
  ['LAT065-104', { title: '李敖首先是文学家' }],
  ['LAT065-115', { title: '遗愿不可被强改' }],
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

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”"'.,，。！？!?:：；;、\s]+/g, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))]
    .filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(
        `### ${record.id}｜${record.title}`,
        '',
        record.description,
        '',
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
        '',
      );
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
    const category = edit.category ?? record.category;
    const title = edit.title ?? record.title;

    return {
      ...record,
      ...edit,
      id: `LAT065-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
      category,
      title,
      keywords: edit.keywords ?? buildKeywords(record, title, category),
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }

  const source = extraction.records.find((item) => item.id === record.source_id);
  if (!source) {
    throw new Error(`Missing source record for ${record.id}`);
  }
  if (record.description !== source.description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除同案重复、过细程序点、短促反诘、纯事务性往返和已被更强段落覆盖的条目；保留能够独立呈现李敖法权意识、出版抵抗、写作史观、人格伦理、政治判断、知识公共性、文化批判与性别观念的原文段落。description 未改写。',
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
  '# 《李敖书函集》思想索引校对说明',
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
  '- description 只沿用原书段落，不做转述、摘要或润色。',
  '- 删除同案重复、过细程序点、短促反诘、纯事务性往返和已被更强段落覆盖的条目。',
  '- 法律程序、出版法、新闻更正、司法责任、行政边界和诉讼权优先归入“法权”。',
  '- 出版反击、史料保存、自传观、文学自我定位和笔战行动归入“写作”。',
  '- 党国查禁、党外路线、政治人物信用、国族乡土判断归入“政治”。',
  '- 庙宇、身体、语言、归骨、地域心态等社会观念归入“文化”；裸体平等归入“情爱”。',
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id} ${item.title}：${item.reason}`),
  '',
];

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread 065.${extraction.book.title}: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
