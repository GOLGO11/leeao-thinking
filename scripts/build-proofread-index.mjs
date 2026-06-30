import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '001.李敖自传与回忆');
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const masterCsvPath = path.join(rootDir, 'outputs', '思想索引总表.csv');

const book = {
  sequence: '001',
  title: '李敖自传与回忆',
  slug: 'li-ao-zizhuan-yu-huiyi',
  round: '校对轮',
  status: '已校对',
};

const taxonomy = [
  '写作与传播',
  '思想源流与方法',
  '教育与知识分子',
  '人格与自我',
  '传统与社会',
  '历史观与地域意识',
  '政治权力批判',
  '法律与言论自由',
  '牢狱与迫害经验',
  '人生与社会观察',
];

const revisions = {
  'LAT001-001': ['写作与传播', '反回忆录：由个人传奇见时代', '自传,反回忆录,历史,时代'],
  'LAT001-002': ['传统与社会', '礼教杀人', '礼教,女性,旧家庭'],
  'LAT001-003': ['传统与社会', '无子之罪不在女性', '女性,生理学,七出'],
  'LAT001-004': ['政治权力批判', '小自由不容于政府权力', '籍贯,户政,政府权力'],
  'LAT001-005': ['教育与知识分子', '知识分子不该被训词化', '知识分子,教育,训词'],
  'LAT001-006': ['历史观与地域意识', '人口也是抗拒瓜分的力量', '东北,日俄战争,人口'],
  'LAT001-007': ['传统与社会', '丧礼次序中的男尊女卑', '男尊女卑,传统,家庭'],
  'LAT001-008': ['历史观与地域意识', '让张学良代背不抵抗黑锅', '九一八,张学良,国民党'],
  'LAT001-009': ['历史观与地域意识', '官定抗日史的倒装', '抗日,宣传,历史记忆'],
  'LAT001-010': ['政治权力批判', '党国酬庸：不坐牢就是奖励', '抗日,党国,牢狱'],
  'LAT001-011': ['政治权力批判', '党国外爱国者的困境', '爱国,国民党,汉奸'],
  'LAT001-012': ['传统与社会', '交友重古典忠义', '朋友,旧道德,人格'],
  'LAT001-013': ['教育与知识分子', '教育者不要伤害孩子', '教育,儿童,伤害'],
  'LAT001-014': ['政治权力批判', '共存亡誓言的信用破产', '国民党,信用,逃难'],
  'LAT001-015': ['政治权力批判', '金圆券与以纸易金', '金圆券,财政,民心'],
  'LAT001-016': ['政治权力批判', '安定台湾与丢掉大陆民心', '金圆券,新台币,民心'],
  'LAT001-017': ['法律与言论自由', '法律只睁一只眼', '法律,权势,银圆'],
  'LAT001-018': ['思想源流与方法', '中国之弱在思想学术', '严复,西化,思想学术'],
  'LAT001-019': ['思想源流与方法', '天演论的救亡刺激', '天演论,思想,救亡'],
  'LAT001-020': ['人格与自我', '人格导师严侨', '严侨,人格,自由主义'],
  'LAT001-021': ['教育与知识分子', '考试之外自由读书', '台大,读书,自由'],
  'LAT001-022': ['人格与自我', '军队与民间经验锻造悍气', '军队,民间,悍气'],
  'LAT001-023': ['思想源流与方法', '胡适自由主义与新境界', '胡适,自由主义,严侨'],
  'LAT001-024': ['人格与自我', '传统与群众面前的吾往矣', '传统,勇敢,丧礼'],
  'LAT001-025': ['思想源流与方法', '反对乱骂乱捧胡适', '胡适,辩诬,思想'],
  'LAT001-026': ['人格与自我', '权威和群众底下做一个人', '人,权威,不出卖'],
  'LAT001-027': ['思想源流与方法', '不信权威也不信传统', '权威,传统,不妥协'],
  'LAT001-028': ['思想源流与方法', '学术不足，还要经世与人权', '学术,经世致用,人权'],
  'LAT001-029': ['教育与知识分子', '大学不该制造不会用脑的人', '大学,知识分子,独立判断'],
  'LAT001-030': ['人格与自我', '独立为文，不靠后台', '独立,写作,批评'],
  'LAT001-031': ['政治权力批判', '不合作就斗倒', '不合作,国民党,文星'],
  'LAT001-032': ['写作与传播', '思想传播需要经济基础', '文化商人,思想传播,经济'],
  'LAT001-033': ['写作与传播', '少一点商业，多一点文化', '文化商人,文化,商业'],
  'LAT001-034': ['写作与传播', '文星为中国思想定向', '文星,现代化,思想'],
  'LAT001-035': ['写作与传播', '不背弃文星理想', '文星,理想,战斗'],
  'LAT001-036': ['人格与自我', '吃回警察：对权力的反制', '警察,反击,处世'],
  'LAT001-037': ['人格与自我', '把不如意化成有利', '处世,机变,自利'],
  'LAT001-038': ['牢狱与迫害经验', '迫害中的幽默与自持', '迫害,幽默,自持'],
  'LAT001-039': ['人格与自我', '人群中的思想孤寂', '孤寂,朋友,思想'],
  'LAT001-040': ['人格与自我', '孤寂是独自面对斧钺', '孤寂,责任,迫害'],
  'LAT001-041': ['人格与自我', '敌人比朋友稳定', '敌人,朋友,迫害'],
  'LAT001-042': ['牢狱与迫害经验', '七年四个月的迫害账', '坐牢,软禁,政治犯'],
  'LAT001-043': ['法律与言论自由', '假匪谍充数', '匪谍,军法,国民党'],
  'LAT001-044': ['思想源流与方法', '冷静观察人间万象', '观察,冷静,生死'],
  'LAT001-045': ['牢狱与迫害经验', '血泪一页也是历史见证', '血泪,统治,见证'],
  'LAT001-046': ['牢狱与迫害经验', '小人物被时代卷入政治漩涡', '农民,政治漩涡,苦难'],
  'LAT001-047': ['牢狱与迫害经验', '窃听如何断章取义', '窃听,监狱,荒诞'],
  'LAT001-048': ['牢狱与迫害经验', '牢房里独占安静', '牢房,时间,安静'],
  'LAT001-049': ['牢狱与迫害经验', '太阳成为朋友', '牢房,太阳,孤独'],
  'LAT001-050': ['牢狱与迫害经验', '成为时间的批发商', '时间,牢房,空间'],
  'LAT001-051': ['牢狱与迫害经验', '孤独带来深邃感受', '孤独,人生,感受'],
  'LAT001-052': ['牢狱与迫害经验', '苦难在牢房中传递', '苦难,牢房,民主'],
  'LAT001-053': ['人生与社会观察', '东西方人生悲剧可互相翻印', '人生,悲剧,监狱'],
  'LAT001-054': ['人生与社会观察', '下层人的真性情', '流氓,真性情,伪善'],
  'LAT001-055': ['政治权力批判', '好为人师的优越感', '好为人师,洗脑,优越感'],
  'LAT001-056': ['法律与言论自由', '天下没有御制公论', '公论,宣传,文字狱'],
  'LAT001-057': ['政治权力批判', '国民党意识形态的大拼盘', '意识形态,国民党,感化教育'],
  'LAT001-058': ['政治权力批判', '感化教育不能化解敌人', '反省教育,感化,政治犯'],
  'LAT001-059': ['政治权力批判', '政治犯不能感化', '政治犯,感化,敌人'],
  'LAT001-060': ['政治权力批判', '悔悟宣传的荒唐', '感化,党报,政治犯'],
  'LAT001-061': ['写作与传播', '溪水变成稿纸', '文星,写作,行动'],
  'LAT001-062': ['写作与传播', '杂志要鼓动风潮、造成时势', '文星,杂志,思想'],
  'LAT001-063': ['人格与自我', '一个人跟团体斗', '斗争,不变,团体'],
  'LAT001-064': ['人格与自我', '少做懦夫，少戴假面', '自我,勇士,假面'],
  'LAT001-065': ['历史观与地域意识', '种族自豪是历史不及格', '种族,历史,苗族'],
  'LAT001-066': ['历史观与地域意识', '地域小圈圈有害天下为公', '地域,天下为公,小圈圈'],
  'LAT001-067': ['历史观与地域意识', '岛国褊狭与岛气', '台湾,岛气,褊狭'],
  'LAT001-068': ['历史观与地域意识', '读书要放弃小岛度量衡', '眼界,读书,大气派'],
  'LAT001-069': ['人格与自我', '打击力与独来独往', '打击力,特立独行,大丈夫'],
  'LAT001-070': ['人格与自我', '总是朝前走', '进步,主张,朝前走'],
  'LAT001-071': ['法律与言论自由', '抗议扼杀异己言论', '言论,封锁,异己'],
  'LAT001-072': ['法律与言论自由', '舆论与法律的双杀', '法律,政治问题,斗倒'],
};

function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
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
  const lines = [
    headers.map(csvCell).join(','),
    ...records.map((record) => headers.map((header) => csvCell(record[header])).join(',')),
  ];
  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 条目数：${records.length}`,
    `- 状态：${book.status}`,
    '- 说明：标题与分类已经过校对；description 为源文段落，未改写。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push('');
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, records) {
  const categoryCounts = new Map();
  for (const category of taxonomy) {
    const count = records.filter((record) => record.category === category).length;
    if (count) categoryCounts.set(category, count);
  }

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮从提取轮 72 条校对为 ${records.length} 条。校对重点是收束分类、优化标题、保持原文段落不改写。`,
    '',
    '## 校对原则',
    '',
    '- 保留 `description` 原文段落，不做摘要化重写。',
    '- 将细碎分类收束为 10 个一级主题，方便网页浏览与后续全库汇总。',
    '- 标题改为更适合检索的索引标题，尽量指向可复用的思想命题。',
    '- 本轮未删除条目：弱条目仍有思想形成、政治经验或后续交叉检索价值。',
    '',
    '## 分类统计',
    '',
    ...[...categoryCounts.entries()].map(([category, count]) => `- ${category}：${count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
    '- ../思想索引总表.csv',
  ];

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

const payload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const records = payload.records.map((record) => {
  const revision = revisions[record.id];
  if (!revision) {
    throw new Error(`Missing proofread revision for ${record.id}`);
  }
  const [category, title, keywords] = revision;
  return {
    ...record,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title,
    keywords,
  };
});

writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeCsv(masterCsvPath, records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), records);
writeSummary(path.join(outputDir, '校对说明.md'), records);
fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify({ book, taxonomy, records }, null, 2)}\n`,
  'utf8',
);

console.log(`Built ${records.length} proofread records for ${book.title}.`);
