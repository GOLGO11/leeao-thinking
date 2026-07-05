import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '056.李敖对话录');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT056-006', '偏苏洪月娇等党外个案攻防，原则性判断已由“大目标”“战斗标准”等条目承载，校对轮删去。'],
  ['LAT056-012', '台湾知识分子逃避现实主题已由后文《花花公子》访问中的“知识人逃避”更完整承载，校对轮删去。'],
  ['LAT056-029', '以许荣淑、康宁祥为例说明力量尺度，个案色彩较重，独立索引价值不如领袖条件和压力政治条目，校对轮删去。'],
  ['LAT056-033', '“西化是不可避免的事实”段落较短，同题由“西化即世界化”“读透后失望”等条目展开，校对轮删去。'],
  ['LAT056-035', '“土城看守所是实验室”机锋较强但展开不足，社会研究方法已由长考、真相规则等条目承载，校对轮删去。'],
  ['LAT056-052', '“小功夫”主题已由前一条集中呈现，本条主要补充大方向条件，校对轮删去。'],
  ['LAT056-055', '立法院象征意义与保留历史记录的判断已由下一条“选举大目标”完整展开，校对轮删去。'],
  ['LAT056-065', '“把它欺负回来”偏个人快意和玩笑式反击，思想展开不如同书其他人格、政治条目稳定，校对轮删去。'],
  ['LAT056-067', '台湾话语音寻根偏专门训诂例证，和本书主干思想索引关系较旁，校对轮删去。'],
  ['LAT056-074', '读中国书要会读的主题已由“古书定位”更清楚地说明，校对轮删去。'],
  ['LAT056-077', '支持反对势力以维持制衡的主题，与后文“制衡进步”“反对大向”重合，校对轮删去。'],
  ['LAT056-080', '“内容能打”夹杂封面玩笑和市场趣味，写作出版方法由“写作工厂”“言论自由生态”承载，校对轮删去。'],
  ['LAT056-102', '“信己所思”偏自我信念表达，方法论展开较薄，校对轮删去。'],
  ['LAT056-113', '党外无须领袖与前一条“山头策略”同题，且展开较少，校对轮删去。'],
  ['LAT056-118', '“思想定位”是短句式自我定位，后文“思想探底”具体说明方法和限制，校对轮删去。'],
  ['LAT056-120', '现代文明与全盘西化主题已由“西化即世界化”集中说明，校对轮删去。'],
]);

const overrides = new Map([
  ['LAT056-003', { title: '决断温文', keywords: '温柔敦厚,离婚,英雄气概' }],
  ['LAT056-005', { title: '白话广告', keywords: '白话文,押韵,广告效果' }],
  ['LAT056-010', { title: '经世学问', keywords: '学问,知识分子,经世治用' }],
  ['LAT056-011', { title: '读书为用', keywords: '读书,写文章,表达思想' }],
  ['LAT056-014', { title: '民主玩笑', keywords: '民主,开玩笑,生活态度' }],
  ['LAT056-017', { title: '匹夫为师', keywords: '胡适,知识分子,历史纪录' }],
  ['LAT056-018', { title: '思想分项', keywords: '中国思想史,项目,中华民族' }],
  ['LAT056-021', { title: '探底文化', keywords: '中国文化,徐复观,古书' }],
  ['LAT056-024', { title: '歧见边界', keywords: '歧见,言论自由,是非' }],
  ['LAT056-025', { title: '是非反乡愿', keywords: '乡愿,是非,道理' }],
  ['LAT056-027', { title: '情绪验文', keywords: '文章,情绪,见解' }],
  ['LAT056-030', { title: '自由气质', keywords: '自由民主,气质,胡适' }],
  ['LAT056-031', { title: '间接知识', keywords: '知识,研判,书本' }],
  ['LAT056-036', { title: '褫权破法', keywords: '褫夺公权,冤狱,法治' }],
  ['LAT056-037', { title: '作怪有底', keywords: '特立独行,知识基础,大学' }],
  ['LAT056-040', { title: '读书方法', keywords: '读书,知识爆炸,方法' }],
  ['LAT056-043', { title: '不怕失败', keywords: '失败,教育,写作' }],
  ['LAT056-045', { title: '异议知识人', keywords: '知识分子,异议,真理' }],
  ['LAT056-046', { title: '美感不可帽', keywords: '美感,中国式民主,国民党' }],
  ['LAT056-050', { title: '玩命自由', keywords: '言论自由,刑求,代价' }],
  ['LAT056-051', { title: '政治小功', keywords: '政治,细心,礼貌' }],
  ['LAT056-053', { title: '选罢违宪', keywords: '选罢法,政治犯,褫夺公权' }],
  ['LAT056-054', { title: '拒认体制', keywords: '体制,无政府主义,不合作' }],
  ['LAT056-056', { title: '选举大目标', keywords: '选举,大目标,不合作' }],
  ['LAT056-057', { title: '制度封杀', keywords: '党禁,戒严法,万年国会' }],
  ['LAT056-058', { title: '政党定律', keywords: '政党,民主,代议政治' }],
  ['LAT056-059', { title: '拒追新闻', keywords: '新闻,权力核心,判断' }],
  ['LAT056-060', { title: '自由证据', keywords: '自由中国,言论自由,证据' }],
  ['LAT056-061', { title: '清教工作', keywords: '工作,律己,成绩' }],
  ['LAT056-062', { title: '情理分界', keywords: '理,情,政敌' }],
  ['LAT056-063', { title: '真理胜友', keywords: '真理,朋友,执著' }],
  ['LAT056-066', { title: '法律追溯', keywords: '罪刑法定,叛乱,大法官' }],
  ['LAT056-068', { title: '退党制裁', keywords: '波兰,退党,道义制裁' }],
  ['LAT056-069', { title: '战斗标准', keywords: '党外,战斗,现实' }],
  ['LAT056-071', { title: '不严肃文', keywords: '文字技巧,个性语言,党外' }],
  ['LAT056-072', { title: '挖根细腻', keywords: '细腻,出拳,书房' }],
  ['LAT056-073', { title: '写作留臭', keywords: '写文章,国民党,历史记录' }],
  ['LAT056-075', { title: '古书定位', keywords: '古书,历史背景,定位' }],
  ['LAT056-076', { title: '党外公开', keywords: '自由民主,公开,讨论' }],
  ['LAT056-078', { title: '出版法漏洞', keywords: '出版法,每月一书,查禁' }],
  ['LAT056-079', { title: '查禁智取', keywords: '查禁,抢书,智取' }],
  ['LAT056-081', { title: '个案详追', keywords: '个案,党外杂志,粗糙' }],
  ['LAT056-082', { title: '写作工厂', keywords: '写作工业,中央厨房,文章' }],
  ['LAT056-083', { title: '言论生态', keywords: '言论自由,杂志,读者' }],
  ['LAT056-084', { title: '真相辩证', keywords: '真相,讨论,史料' }],
  ['LAT056-085', { title: '资料解释', keywords: '资料处理,解释,党外杂志' }],
  ['LAT056-086', { title: '自由无禁区', keywords: '自由言论,禁忌,国民党' }],
  ['LAT056-087', { title: '批判保水准', keywords: '互相检讨,批判,水准' }],
  ['LAT056-088', { title: '公开资料新解', keywords: '公开资料,解释,内幕' }],
  ['LAT056-089', { title: '封杀失效', keywords: '查禁,抓人,复原' }],
  ['LAT056-090', { title: '揭暗不追屁', keywords: '揭发黑暗,分析,黑屁' }],
  ['LAT056-091', { title: '道义非公关', keywords: '支持,道义,私交' }],
  ['LAT056-092', { title: '不囿人物', keywords: '胡适评传,历史,全局' }],
  ['LAT056-095', { title: '主题贯书', keywords: '读书方法,主题,剪辑' }],
  ['LAT056-096', { title: '检定传统', keywords: '传统,清单,检定' }],
  ['LAT056-097', { title: '读透后失望', keywords: '传统,全盘西化,十三经' }],
  ['LAT056-098', { title: '遵经成伪', keywords: '礼记,三年之丧,虚伪' }],
  ['LAT056-099', { title: '西化即世界化', keywords: '全盘西化,典权,世界化' }],
  ['LAT056-100', { title: '读书勿死', keywords: '读书方法,元史,材料' }],
  ['LAT056-101', { title: '文化平均面', keywords: '中国文化,平均面,历史哲学' }],
  ['LAT056-103', { title: '声韵文章', keywords: '文章,声韵,演说稿' }],
  ['LAT056-104', { title: '主题超时效', keywords: '文章,主题理念,时效' }],
  ['LAT056-105', { title: '自负气魄', keywords: '自负,温柔敦厚,气魄' }],
  ['LAT056-106', { title: '怒骂严肃', keywords: '嬉笑怒骂,严肃,读者' }],
  ['LAT056-107', { title: '非暴仍动', keywords: '群众运动,甘地,非暴力' }],
  ['LAT056-108', { title: '作战拒请愿', keywords: '请愿,作战,求情' }],
  ['LAT056-109', { title: '自由有牺牲', keywords: '自由,牺牲,冲突' }],
  ['LAT056-110', { title: '杂志成武器', keywords: '党外杂志,武器,言论自由' }],
  ['LAT056-111', { title: '压力胜感动', keywords: '政治人物,压力,制衡' }],
  ['LAT056-112', { title: '山头策略', keywords: '组党,山头,党外' }],
  ['LAT056-114', { title: '领袖六件', keywords: '领袖,眼光,度量' }],
  ['LAT056-115', { title: '对抗无弹性', keywords: '国民党,对抗,激进' }],
  ['LAT056-116', { title: '毁誉不摇', keywords: '庄子,境界,时髦' }],
  ['LAT056-117', { title: '制衡进步', keywords: '党外,制衡,一党独裁' }],
  ['LAT056-119', { title: '思想探底', keywords: '中国思想,政治压力,见微知著' }],
  ['LAT056-121', { title: '殉道分开', keywords: '殉道,精神,时代' }],
  ['LAT056-122', { title: '暴政永抗', keywords: '暴政,国民党,精神' }],
  ['LAT056-123', { title: '真相规则', keywords: '真相,规则,导向' }],
  ['LAT056-124', { title: '智仁勇', keywords: '大丈夫,大智,大仁,大勇' }],
  ['LAT056-125', { title: '知识人逃避', keywords: '知识分子,逃避,勇气' }],
  ['LAT056-126', { title: '女人之美', keywords: '女人,美,新女性' }],
  ['LAT056-127', { title: '情理法兼备', keywords: '胡茵梦,情理,依法' }],
  ['LAT056-128', { title: '性自由起点', keywords: '性自由,裸女,禁忌' }],
  ['LAT056-129', { title: '反对大向', keywords: '反对党,一党独大,支持' }],
  ['LAT056-130', { title: '卖断追权', keywords: '文星,出版权,诈欺' }],
  ['LAT056-131', { title: '著作权二分', keywords: '著作人格权,著作财产权,出版权' }],
  ['LAT056-132', { title: '出版权三分', keywords: '著作权让与,出版权让与,出版权授与' }],
  ['LAT056-133', { title: '独资主体', keywords: '独资商号,朱婉坚,出版权' }],
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
      id: `LAT056-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除同题重复、展开不足、偏自我机锋、偏专门例证和个案色彩过重的条目；保留能独立呈现李敖写作方法、史料方法、知识分子伦理、文化判断、政治原则、法权意识、人格标准与情爱观的原文段落。description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description 原文。',
      '删除同题重复、展开不足、偏自我机锋、偏专门例证和个案色彩过重的条目。',
      '保留能够独立检索的写作方法、史料方法、知识分子伦理、文化判断、政治原则、法权意识、人格标准与情爱观段落。',
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
  '# 《李敖对话录》思想索引校对说明',
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
  `Built proofread 056.李敖对话录: ${records.length} records. Dropped: ${dropped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
