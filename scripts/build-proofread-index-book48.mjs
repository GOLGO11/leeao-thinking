import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '048.李敖秘藏日记');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT048-003', '段落主体是谢聪敏被跟踪后的长叙事，方法判断只占局部，校对轮以更集中的软禁与法权条目覆盖。'],
  ['LAT048-008', '放彭明敏家属出境的结论段与政治问题、不胁亲属两条重复，独立新增思想有限。'],
  ['LAT048-023', '虚构自由过短，fiction 路线已由现世套改、作品尺度和一片见效条目展开。'],
  ['LAT048-028', '不与陨石同碎以上文语境为前提，单独检索时指代不清。'],
  ['LAT048-030', '剧本单元偏写作计划记录，写作方法已由作品尺度、一片见效和先写五小时覆盖。'],
  ['LAT048-033', '隐居训练是附记说明，与采花知识、发热写作、隐居立言重复。'],
  ['LAT048-038', '情绪思想段落以“谈他老哥说”结尾，原文判断不完整。'],
  ['LAT048-047', '狭小气量与乡愿规格、私昵造像重复，且段落偏写作过程中的情绪总结。'],
  ['LAT048-053', '暴政读书大量为外部文学资料与夏志清说法，校对轮保留史实校正即可。'],
  ['LAT048-058', '毒药勇气主要是导群对李敖的转述评价，不是李敖自己的直接思想表达。'],
  ['LAT048-063', '登记陷阱是电话事件记录，独立判断较短，党外路线已由保留批评权等条目覆盖。'],
  ['LAT048-065', '清高善变偏人事攻击和补记，思想主干不如政治、法权条目稳定。'],
  ['LAT048-067', '搜书不休过短，出版查禁与抢书钳制条目已能覆盖。'],
  ['LAT048-071', '智慧增长主要借外部轶事发挥，李敖自己的思想浓度较低。'],
  ['LAT048-077', '人性之光来自明道电话转述，缺少李敖自己的展开判断。'],
  ['LAT048-078', '升官良心主要是纪镇南的原话，李敖自己的判断不够展开。'],
  ['LAT048-088', '善书荒谬以“妙文曰”引出后文，段落本身没有完整收束。'],
  ['LAT048-089', '同难照顾偏当日支援安排，人格判断较短，夺魄代价与写文支持更能代表主轴。'],
]);

const overrides = new Map([
  ['LAT048-002', { title: '监视机器', keywords: '监视,警总,政治机器' }],
  ['LAT048-004', { title: '迷信法律', keywords: '调查局,非法待遇,法权' }],
  ['LAT048-005', { title: '新世界研究', keywords: '世界性,研究,方法' }],
  ['LAT048-006', { title: '政治肥己', keywords: '彭案,政治问题,法权' }],
  ['LAT048-007', { category: '法权', title: '不胁亲属', keywords: '人质,出境,法权' }],
  ['LAT048-009', { title: '年表边界', keywords: '年表,日记,写作' }],
  ['LAT048-012', { title: '批评条件', keywords: '专栏,不改文章,写作' }],
  ['LAT048-013', { title: '法治破绽', keywords: '冤狱,褫夺公权,法权' }],
  ['LAT048-014', { title: '生命取舍', keywords: '生命,取舍,方法' }],
  ['LAT048-015', { title: '知识采花', keywords: '知识,生命,史学' }],
  ['LAT048-017', { title: '发热写作', keywords: '写作,发热状态,闭关' }],
  ['LAT048-018', { title: '内力掌舵', keywords: '价值判断,澄虑,方法' }],
  ['LAT048-019', { title: '时间下限', keywords: '时间,生活表,方法' }],
  ['LAT048-020', { title: '隐居立言', keywords: '隐居,立言,人格' }],
  ['LAT048-021', { title: '抑制笔触', keywords: '写作,人物,抑制' }],
  ['LAT048-022', { title: '现世套改', keywords: 'fiction,写实,写作' }],
  ['LAT048-024', { title: '零碎防线', keywords: '时间,零碎,方法' }],
  ['LAT048-025', { title: '作品尺度', keywords: '世界性,永恒性,写作' }],
  ['LAT048-026', { title: '写中吸收', keywords: '阅读,写作,方法' }],
  ['LAT048-029', { title: '勇敢示人', keywords: '勇敢,危机,人格' }],
  ['LAT048-031', { title: '一片见效', keywords: '电影技法,群众,写作' }],
  ['LAT048-032', { title: '清气主动', keywords: '清气,孤独,人格' }],
  ['LAT048-034', { title: '审查造酱', keywords: '鲁迅,审查,文化' }],
  ['LAT048-035', { title: '创作自由', keywords: '鲁迅,创作自由,文化' }],
  ['LAT048-037', { title: '情绪非主菜', keywords: '鲁迅,杂文,写作' }],
  ['LAT048-040', { title: '文人虚胖', keywords: '文人,政治,文化' }],
  ['LAT048-041', { title: '批评者处境', keywords: '国民党,批评,政治' }],
  ['LAT048-042', { title: '高压真我', keywords: '真理,高压,人格' }],
  ['LAT048-043', { title: '爱情非自由', keywords: '爱情,自由,情爱' }],
  ['LAT048-045', { title: '乡愿规格', keywords: '乡愿,党外,政治' }],
  ['LAT048-048', { title: '气量敲碑', keywords: '孙立人,气量,政治' }],
  ['LAT048-049', { title: '乱棍完人', keywords: '阎锡山,连坐,政治' }],
  ['LAT048-050', { title: '活先烈', keywords: '先烈,归队,政治' }],
  ['LAT048-051', { title: '统战边界', keywords: '统战,立场,政治' }],
  ['LAT048-052', { title: '野马孤独', keywords: '自由,孤独,人格' }],
  ['LAT048-054', { title: '考证纠错', keywords: '夏志清,考证,方法' }],
  ['LAT048-056', { title: '定稿验忙', keywords: '写作,定稿,方法' }],
  ['LAT048-057', { title: '法律工具', keywords: '法院,政争,法权' }],
  ['LAT048-059', { title: '政客预留', keywords: '政治人物,判断,方法' }],
  ['LAT048-060', { title: '生日做工', keywords: '生日,做工,方法' }],
  ['LAT048-062', { title: '录音判断', keywords: '江南案,判断,方法' }],
  ['LAT048-066', { title: '党责追问', keywords: '国泰,责任,政治' }],
  ['LAT048-068', { title: '律师路线', keywords: '国泰,律师,法权' }],
  ['LAT048-069', { title: '独立写作', keywords: '知识分子,独立,人格' }],
  ['LAT048-070', { title: '出版查禁', keywords: '出版管制,查禁,法权' }],
  ['LAT048-073', { category: '法权', title: '苛政内化', keywords: '苛政,自我查禁,法权' }],
  ['LAT048-074', { title: '删减岛事', keywords: '时间,专书,方法' }],
  ['LAT048-075', { title: '反方程式', keywords: '中国,游记,写作' }],
  ['LAT048-076', { title: '禁令先后', keywords: '禁书,票亭,法权' }],
  ['LAT048-079', { title: '保留批评权', keywords: '政治规格,批评,政治' }],
  ['LAT048-080', { title: '文化插队', keywords: '文化,水平,知识' }],
  ['LAT048-081', { title: '一生托辞', keywords: '政治人物,清白,政治' }],
  ['LAT048-082', { title: '三民主义烦人', keywords: '任卓宣,三民主义,文化' }],
  ['LAT048-084', { title: '复刊查禁', keywords: '查禁,出版物,法权' }],
  ['LAT048-085', { title: '高标伪善', keywords: '标准,人格,方法' }],
  ['LAT048-086', { title: '圣人政制', keywords: '共产,人格,政治' }],
  ['LAT048-087', { title: '教科书不公', keywords: '教科书,公平,文化' }],
  ['LAT048-090', { title: '写文支持', keywords: '南榕,写作,政治' }],
  ['LAT048-091', { title: '放火代价', keywords: '南榕,代价,人格' }],
  ['LAT048-092', { title: '精致文化', keywords: '台湾,精致文化,文化' }],
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
      id: `LAT048-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除超长事件叙事、重复结论、他人评价为主、外部资料占主体、过短事件和原段落未完整收束的条目，保留软禁监视、闭关写作、鲁迅与文艺自由、党外政治、出版查禁、法权讽刺、人格自塑和少量情爱观骨干段落；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除超长事件叙事、重复结论、他人评价为主、外部资料占主体、过短事件和原段落未完整收束的条目。',
      '保留软禁监视、闭关写作、文艺自由、写作方法、党外政治、出版查禁、法权讽刺、人格自塑和少量情爱观段落。',
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
  '# 《李敖秘藏日记》思想索引校对说明',
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
  '本轮从提取轮 93 条中保留 75 条。校对重点是让索引更像思想索引，而不是日记事件表：软禁监视、政治机器、闭关写作、鲁迅与创作自由、党外政治、出版查禁、法权讽刺、人格自塑和情爱自由等主轴予以保留；超长事件叙事、重复结论、他人评价为主、外部资料占主体、过短事件和原段落未完整收束的条目予以删除。',
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
