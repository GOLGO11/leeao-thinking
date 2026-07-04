import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '049.李敖札记');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT049-009', '依赖当日谈话语境，主要是党外位置的机锋，独立思想展开不足。'],
  ['LAT049-015', '萧孟能入狱报道属于较窄事件对比，媒体遮掩与政治斗争主题已由更强条目覆盖。'],
  ['LAT049-023', '主要是对谣言与书籍流通事件的回应，思想主轴不如写作与查禁条目稳定。'],
  ['LAT049-026', '与上一条“可行性与大众性”同源同义，校对轮保留展开更完整的段落。'],
  ['LAT049-037', '原段落以“我看却正好相反”承接前文，脱离上下文后检索独立性不足。'],
  ['LAT049-045', '国际新闻事件下的短评较短，政治判断未充分展开。'],
  ['LAT049-051', '以新闻轶事联想“不迁怒”，札记趣味较强，但思想索引主轴较弱。'],
  ['LAT049-052', '主体为黄炎培日记长引，李敖自己的判断只在引介层面，校对轮不保留。'],
  ['LAT049-055', '“从这封信里”依赖未收入的信件正文，脱离上下文后指向不清。'],
  ['LAT049-058', '与上一条工作即消遣的观点重复，校对轮保留原则表述更完整者。'],
  ['LAT049-076', '主体为《梦溪笔谈》原文长引，李敖自己的判断在后一段短评中，不保留长引为思想条目。'],
  ['LAT049-081', '主要是对吴越潮的私谊追念，人物评价强于思想判断。'],
  ['LAT049-094', '“以舞入党”段落过短，偏事件讽刺，独立思想容量不足。'],
  ['LAT049-095', '借资料事件偏个人怨评，知识分子主题已由更完整条目覆盖。'],
]);

const overrides = new Map([
  ['LAT049-001', { title: '恐怖内化', keywords: '国民党,恐怖,知识分子' }],
  ['LAT049-002', { title: '性格表演', keywords: '俗人,表演,方法' }],
  ['LAT049-003', { title: '手铐代议', keywords: '议会,阻挡,代议政治' }],
  ['LAT049-004', { title: '奴才尴尬', keywords: '俞国华,文告,政治谎话' }],
  ['LAT049-005', { title: '大盗戏台', keywords: '专制,清流,政治表演' }],
  ['LAT049-006', { title: '朋党假政党', keywords: '国民党,政党,朋党' }],
  ['LAT049-007', { title: '忠贞考核', keywords: '通信,安全资料,法权' }],
  ['LAT049-008', { title: '延时德政', keywords: '银行,聚敛之臣,民生' }],
  ['LAT049-010', { category: '政治', title: '杂种党外', keywords: '党外,伪君子,政治' }],
  ['LAT049-011', { title: '洋护照自由', keywords: '旅行自由,美国护照,法权' }],
  ['LAT049-012', { title: '训练趋士', keywords: '拜码头,士贵,人格' }],
  ['LAT049-013', { title: '自由格局', keywords: '陈鼓应,自由主义,知识分子' }],
  ['LAT049-014', { title: '作文失败', keywords: '国民党,知识分子,文化' }],
  ['LAT049-016', { title: '威信倒置', keywords: '政府威信,流氓威信,政治' }],
  ['LAT049-017', { title: '与子偕亡', keywords: '国民党,台湾,政治前途' }],
  ['LAT049-018', { title: '宽恕边界', keywords: '恩仇,正义,人格' }],
  ['LAT049-019', { title: '乡愿身后事', keywords: '胡适,乡愿,全集' }],
  ['LAT049-020', { title: '左派假共产', keywords: '左派,背叛,政治' }],
  ['LAT049-021', { title: '写作非钱', keywords: '写作,金钱,志向' }],
  ['LAT049-022', { title: '伪善加级', keywords: '伪善,混蛋,人格' }],
  ['LAT049-024', { title: '逃命预言', keywords: '国民党,逃亡,政治' }],
  ['LAT049-025', { title: '可行与大众', keywords: '可行性,大众性,方法' }],
  ['LAT049-027', { title: '遮盖代忏悔', keywords: '国民党,清流,忏悔' }],
  ['LAT049-028', { title: '开饭控制', keywords: '饭碗,顺民,政治控制' }],
  ['LAT049-029', { title: '查禁双标', keywords: '出版,查禁,法权' }],
  ['LAT049-030', { title: '同情也要撑', keywords: '压迫,勇气,人格' }],
  ['LAT049-031', { title: '自由小人', keywords: '自由人士,知识分子,知识' }],
  ['LAT049-032', { title: '准阉党', keywords: '党外,伪君子,是非' }],
  ['LAT049-033', { title: '文人垮相', keywords: '知识分子,台静农,文化' }],
  ['LAT049-034', { title: '游记近真', keywords: '游记,真实,写作' }],
  ['LAT049-035', { title: '绿岛比岛', keywords: '绿岛,流放,法权' }],
  ['LAT049-036', { title: '无人读主义', keywords: '三民主义,宣传,文化' }],
  ['LAT049-038', { title: '拒作利用', keywords: '林希翎,国民党,政治利用' }],
  ['LAT049-039', { title: '自大狂翻译', keywords: '国民党,自大狂,政治' }],
  ['LAT049-040', { category: '法权', title: '露点双标', keywords: '裸体,扫黄,法权' }],
  ['LAT049-041', { title: '小留学生特权', keywords: '小留学生,特权,法权' }],
  ['LAT049-042', { title: '马屁章法', keywords: '张大千,马屁,知识' }],
  ['LAT049-043', { title: '责人昧己', keywords: '尤清,县长,政治' }],
  ['LAT049-044', { title: '媒体迷信', keywords: '电视,迷信,文化' }],
  ['LAT049-046', { title: '败亦可喜', keywords: '诉讼,判决书,法权' }],
  ['LAT049-047', { title: '盗国法理', keywords: '罗马法,盗国,法权' }],
  ['LAT049-048', { title: '胡适专家', keywords: '胡适,考证,知识' }],
  ['LAT049-049', { title: '死人骗活人', keywords: '纪念,国民党,政治' }],
  ['LAT049-050', { title: '戒严无耻', keywords: '戒严,孙运璿,法权' }],
  ['LAT049-053', { title: '外交倒退', keywords: '外交,国民党,政治' }],
  ['LAT049-054', { title: '先烈家属', keywords: '革命,家属,政治' }],
  ['LAT049-056', { title: '吾就是高人', keywords: '写作,自信,人格' }],
  ['LAT049-057', { title: '工作即消遣', keywords: '工作,消遣,方法' }],
  ['LAT049-059', { title: '帝国群贤', keywords: '立法院,中华民国,政治' }],
  ['LAT049-060', { title: '捣乱七件', keywords: '团体,捣乱,方法' }],
  ['LAT049-061', { title: '麻将格局', keywords: '麻将,台湾,文化' }],
  ['LAT049-062', { title: '日记抽样', keywords: '监狱,日记,写作' }],
  ['LAT049-063', { category: '政治', title: '台湾监狱', keywords: '台湾,监狱,政治' }],
  ['LAT049-064', { title: '献花规格', keywords: '游行,献花,政治' }],
  ['LAT049-065', { title: '带物做工', keywords: '资料,时间,方法' }],
  ['LAT049-066', { title: '道歉关键', keywords: '诉讼,道歉,法权' }],
  ['LAT049-067', { title: '校史截断', keywords: '台大,校史,知识' }],
  ['LAT049-068', { title: '反蒋出版', keywords: '蒋介石研究,出版,写作' }],
  ['LAT049-069', { title: '公卖报应', keywords: '纸烟公卖,美国,政治' }],
  ['LAT049-070', { title: '快乐诗意', keywords: '裸体,快乐,情爱' }],
  ['LAT049-071', { category: '法权', title: '出入境戏', keywords: '出入境,熊猫,法权' }],
  ['LAT049-072', { title: '广告执法', keywords: '广告,烟酒谈判,法权' }],
  ['LAT049-073', { title: '党外正统', keywords: '民进党,党外,政治' }],
  ['LAT049-074', { title: '白话前三', keywords: '白话文,散文,写作' }],
  ['LAT049-075', { title: '历史识见', keywords: '历史,总统,知识' }],
  ['LAT049-077', { title: '禁书漏网', keywords: '禁书,警备总司令,法权' }],
  ['LAT049-078', { title: '延宕快意', keywords: '法律延宕,报应,法权' }],
  ['LAT049-079', { title: '动武无知', keywords: '议会,动武,政治' }],
  ['LAT049-080', { title: '老兵一榻', keywords: '老兵,国民党,政治' }],
  ['LAT049-082', { title: '地方骑民', keywords: '地方政治,独立,政治' }],
  ['LAT049-083', { title: '敌无生死', keywords: '复仇,敌人,人格' }],
  ['LAT049-084', { title: '谤书对书', keywords: '诽谤,出版,写作' }],
  ['LAT049-085', { title: '小偷诉苦', keywords: '盗印,法庭,法权' }],
  ['LAT049-086', { title: '被告喊累', keywords: '诽谤,出庭,法权' }],
  ['LAT049-087', { category: '文化', title: '关系可耻', keywords: '公共关系,公平,文化' }],
  ['LAT049-088', { title: '双料不懂', keywords: '陈鼓应,学者,知识' }],
  ['LAT049-089', { title: '双料伪善', keywords: '伪善,宗教,人格' }],
  ['LAT049-090', { title: '无脊梁学人', keywords: '海外自由学人,自由,知识' }],
  ['LAT049-091', { title: '末代样品', keywords: '溥仪,历史,知识' }],
  ['LAT049-092', { title: '右派左拉', keywords: '左拉,辩冤,写作' }],
  ['LAT049-093', { title: '自限尺度', keywords: '言论尺度,自我设限,法权' }],
  ['LAT049-096', { title: '国代疑点', keywords: '国民大会,选举,法权' }],
  ['LAT049-097', { title: '军纪小事', keywords: '军纪,台湾,文化' }],
  ['LAT049-098', { title: '性是前奏', keywords: '性开放,裸体艺术,情爱' }],
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
      id: `LAT049-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除依赖上下文、纯事件、重复表达、外部长引占主体和思想容量不足的条目，保留政治讽刺、法权尺度、知识分子批评、写作自况、行动方法、人格恩仇、文化批评和情爱自由等骨干段落；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除依赖未收入上下文、纯事件记录、重复表达、外部长引占主体、过短机锋和思想容量不足的条目。',
      '保留能独立呈现李敖判断的政治、法权、知识、写作、方法、人格、文化和情爱段落。',
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
  '# 《李敖札记》思想索引校对说明',
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
  '本轮从提取轮 98 条中保留 84 条。校对重点是让《李敖札记》更像思想索引，而不是短札目录：政治讽刺、出版查禁、法权尺度、知识分子批评、写作自况、做事方法、恩仇人格、文化判断和性与自由等主轴予以保留；依赖上下文、纯事件记录、重复表达、外部长引占主体、过短机锋和思想容量不足的条目予以删除。',
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
