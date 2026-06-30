import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const memoirGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('001.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, memoirGroup))
  .find((name) => name.startsWith('007.'));
const sourceDir = path.join(rootDir, sourceRoot, memoirGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '007.李敖风流自传');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '007',
  title: '李敖风流自传',
  slug: 'li-ao-fengliu-zizhuan',
  round: '提取轮',
  status: '待校对',
};

const taxonomy = [
  '写作',
  '方法',
  '知识',
  '人格',
  '文化',
  '政治',
  '法权',
];

const entries = [
  ['写作', '破格浮生杂忆', '001', 5, '浮生杂忆,破格,风流自传'],
  ['写作', '颠覆板眼写法', '002', 2, '信笔所之,章法,颠覆'],
  ['写作', '瓜蔓式跑野马', '002', 3, '瓜蔓式,跑野马,随性'],
  ['写作', '跳跃式写法', '002', 7, '跳跃式,高度,远方'],
  ['写作', '自传贵随意唠叨', '003', 2, '自传,随意唠叨,少弄假'],
  ['人格', '示范与播种', '006', 2, '示范,播种,独立存在'],
  ['知识', '整理人类观念行为', '009', 2, '观念,行为,期中结帐'],
  ['方法', '驯兽师式敌我关系', '017', 2, '驯兽师,敌我,不可测'],
  ['方法', '动物化再人道化', '019', 2, '自然法则,动物化,人道化'],
  ['方法', '把死书读活', '023', 2, '读活书,死书,实证'],

  ['人格', '立德先于立言', '084', 2, '三不朽,立德,立言'],
  ['人格', '大人格标准', '085', 2, '大人格,特立独行,大无畏'],
  ['法权', '报复让正义重见天日', '089', 2, '报复,正义,清算'],
  ['方法', '报复中有喜感', '090', 2, '报复,恶作剧,喜感'],
  ['人格', '树敌检验朋友', '091', 2, '树敌,朋友,是非'],
  ['人格', '牺牲名誉去奋斗', '092', 2, '名誉,奋斗,大丈夫'],
  ['知识', '知识分子请美国不要变心', '094', 3, '知识分子,美国,真相'],
  ['政治', '蒋介石使中国变小', '096', 2, '中国,外蒙古,蒋介石'],
  ['写作', '文学要有思想历史纵深', '101', 2, '文学,思想,历史'],
  ['法权', '文字狱证明小说震撼', '101', 3, '查禁,文字狱,小说'],

  ['知识', '视野不限一岛一国', '103', 2, '视野,天下,大智库'],
  ['方法', '恨日本也要学日文', '109', 2, '日本,日文,学习'],
  ['知识', '少年搜集东北资料', '122', 2, '东北志,资料,少年'],
  ['知识', '小学生文库启蒙', '125', 2, '小学生文库,图书馆长,丛书'],
  ['文化', '开明书店的左派朝气', '126', 2, '开明书店,左派,青年'],
  ['文化', '语言不是硬造的', '127', 3, '世界语,语言,人工语言'],
  ['写作', '初中办刊贾祸', '142', 2, '办刊物,初中,贾祸'],
  ['文化', '不过旧历年的现代化实验', '146', 2, '旧历年,现代化,特立独行'],
  ['知识', '知识傲慢反制式教育', '159', 2, '知识傲慢,制式学校,自修'],
  ['文化', '没有乡愁', '160', 2, '乡愁,台湾,书房'],

  ['知识', '搅动思想的老师', '162', 3, '严侨,思想,数学'],
  ['法权', '白色恐怖人人自危', '166', 2, '白色恐怖,匪谍,人人自危'],
  ['人格', '严侨的人格身教', '167', 3, '严侨,人格导师,牺牲'],
  ['人格', '真儒宗不倒向统治者', '171', 6, '儒宗,知识分子,统治者'],
  ['人格', '真理高于吾师', '173', 2, '真理,师承,王作荣'],
  ['人格', '丧礼改革需要大勇', '175', 3, '丧礼改革,特立独行,大勇'],
  ['知识', '学校斲丧性灵', '180', 2, '学校,自修,性灵'],
  ['知识', '放大找材料组织剪裁', '182', 2, '毕业论文,材料,组织剪裁'],
  ['人格', '不走安心学问路', '186', 3, '文星,写文章,树敌'],
  ['写作', '与自由中国结缘', '204', 3, '胡适,自由中国,文章'],

  ['写作', '与朝廷争胜的精神', '205', 2, '自由中国,自由民主,文字收功'],
  ['方法', '真话会打破迷梦', '207', 2, '真话,迷梦,胡适'],
  ['知识', '在封闭中选择胡适', '209', 2, '胡适,封闭,自由主义'],
  ['知识', '胡适得皮殷海光得肉', '210', 2, '胡适,殷海光,自由主义'],
  ['写作', '预官日记起点', '212', 3, '日记,预官,记录'],
  ['人格', '不因金门威胁入党', '215', 3, '国民党,入党,金门'],
  ['政治', '政工是蝎子', '216', 3, '政工,军队,蝎子'],
  ['文化', '题壁与大字报', '224', 7, '厕所文学,大字报,老大哥'],
  ['法权', '亲见人口买卖', '225', 3, '人口买卖,林肯,人权'],
  ['人格', '少做懦夫多做勇士', '226', 4, '勇士,懦夫,未来'],

  ['人格', '末代个人', '229', 2, '孤立,个人力量,伏尔泰'],
  ['写作', '偷写完整预官日记', '233', 2, '日记,记录,预官'],
  ['写作', '扭转百年错误', '237', 11, '第73烈士,辛亥,扭转'],
  ['人格', '胡适高人一等', '243', 11, '胡适,赏识,治学'],
  ['人格', '胡适细心得不露痕迹', '244', 10, '胡适,邮政检查,细心'],
  ['方法', '对不可救药统治者只能打', '247', 2, '陈情,统治者,打'],
  ['写作', '文化商人与思想传播', '250', 2, '文星,文化商人,思想传播'],
  ['政治', '思想领导政治', '255', 2, '文星,思想,政治'],
  ['知识', '练习独立思想', '255', 3, '独立思想,知识分子,文星'],
  ['写作', '禁书越禁越流传', '263', 2, '传统下的独白,查禁,流传'],

  ['方法', '统战要坏也要诚恳', '272', 2, '统战,合作,伪君子'],
  ['人格', '两袋不空站得更直', '276', 2, '经济基础,拒绝,站直'],
  ['方法', '反固实让敌无地自容', '277', 3, '反固实,敌人,无地自容'],
  ['写作', '文坛无正文无反骨', '290', 2, '文坛,蒋政权,反骨'],
  ['人格', '暗室里自造光芒', '290', 16, '暗室,光芒,自造'],
  ['人格', '日新者不会安于徒弟', '309', 4, '徒弟,反下山门,日新'],
  ['知识', '胡适求士没看走眼', '310', 3, '胡适,千山独行,不朽'],
  ['法权', '害之反足以成之', '311', 2, '匪谍,迫害,成就'],
  ['人格', '原则导致无职业', '316', 3, '原则,国民党,职业'],
  ['知识', '自由中国忽略苦难底层', '328', 2, '自由中国,上层,苦难'],

  ['法权', '政治犯名单及身而绝', '387', 2, '政治犯,名单,曝光'],
  ['法权', '反台独者戴台独帽', '389', 2, '台独,罪名,纽约时报'],
  ['法权', '刑求逼供', '401', 2, '刑求,逼供,侦讯'],
  ['写作', '文学凝聚人间血泪', '412', 6, '文学笔法,血泪,红色11'],
  ['法权', '人生是正义之战', '412', 7, '人生,正义,艰难'],
  ['法权', '缄默权的耶稣根源', '423', 5, '缄默权,耶稣,法庭'],
  ['法权', '岛上不会有自由感', '423', 13, '自由,法庭,政治犯'],
  ['法权', '政治犯洗脑', '427', 2, '政治犯,洗脑,感训'],
  ['法权', '悔悟应属他人', '431', 2, '悔悟,无罪,强制'],
  ['人格', '朋友不可犯大是大非', '448', 3, '朋友,大是大非,错误'],

  ['人格', '拒做国民党打手', '461', 2, '国民党,干薪,打手'],
  ['人格', '坐牢哲学', '492', 17, '坐牢,哲学,自由'],
  ['方法', '冤狱也有五种好处', '493', 2, '冤狱,好处,坐牢'],
  ['政治', '假民主乱流', '503', 2, '中华民国,假民主,乱流'],
  ['方法', '务实斗争方式', '558', 3, '方法,黑白脸,斗争'],
  ['人格', '才华之外是人格', '558', 7, '人格,黑天鹅,广结善缘'],
  ['写作', '万岁评论查禁率', '567', 2, '万岁评论,查禁,言论'],
  ['法权', '百分之百言论自由', '569', 2, '言论自由,郑南榕,优先'],
  ['法权', '不奉中华民国正朔', '573', 3, '求是报,正朔,言论自由'],
  ['写作', '带头正人心布公道', '574', 3, '求是评论,正人心,布公道'],

  ['人格', '敌人骂即肯定', '577', 4, '敌人,肯定,恶评'],
  ['写作', '资料本领与成绩单', '578', 4, '资料,本领,成绩单'],
  ['法权', '出版黑狱内幕', '580', 2, '黑狱,政治犯,出版'],
  ['方法', '从图腾挖国民党根', '582', 3, '孙中山,图腾,国民党'],
  ['人格', '拆穿蒋介石为国民争人格', '583', 2, '蒋介石,道德意义,人格'],
  ['法权', '二二八只谈真相真理', '596', 2, '二二八,真相,真理'],
  ['人格', '旧道德守原则又细心', '601', 2, '旧道德,原则,细心'],
  ['写作', '以证据骂人', '606', 3, '证据,骂人,演讲'],
  ['方法', '看书要防书毒', '620', 9, '看书,书毒,防范'],
  ['方法', '迂回前进也是前进', '620', 13, '迂回,前进,方法'],

  ['方法', '金钱保护自由', '620', 15, '金钱,自由,保护'],
  ['法权', '言论自由摸老虎屁股', '620', 20, '言论自由,老虎屁股,自由'],
  ['政治', '祖国需要自由', '620', 24, '祖国,中国,自由'],
  ['人格', '现代知识分子要强壮快乐积极', '620', 28, '知识分子,强壮,快乐'],
  ['方法', '不掩没恶人长处', '622', 3, '共匪,公道,长处'],
  ['方法', '第一流知识分子避免不公道', '623', 3, '共产党,正面,不公道'],
  ['政治', '唯恐中国大乱', '624', 3, '中国,大乱,知识分子'],
  ['政治', '党一时中国永久', '625', 2, '党,中国,永久'],
  ['方法', '与共产党周旋纠缠', '626', 2, '共产党,周旋,纠缠'],
  ['政治', '真爱国者督促它变好', '628', 2, '爱国,中国,变好'],

  ['文化', '风流是逍遥其内', '630', 3, '风流,逍遥,艺术'],
  ['人格', '圣人行恶人名', '632', 2, '墨子,圣人,恶人'],
  ['人格', '亡天下时站出来', '633', 2, '亡天下,知识分子,浩然之气'],
  ['人格', '圣人做我也不过如此', '634', 6, '圣人行,行义,评判'],
  ['文化', '全盘西化不能选择', '641', 2, '全盘西化,文化移植,选择'],
  ['写作', '写作量古今第一', '648', 4, '写作量,古今第一,作品'],
  ['人格', '拒绝做美国人', '649', 4, '美国人,中国人,务实'],
  ['方法', '从被美国间接迫害者看事情', '650', 4, '美国,迫害,立场'],
  ['政治', '拆穿美国送葬旧梦', '651', 2, '美国,梦,告别'],
  ['法权', '大陆出版审查', '652', 2, '阳痿美国,大陆,审查'],

  ['写作', '序被审查断头', '653', 2, '序,审查,出版'],
  ['写作', '插播式自传写法', '656', 2, '广告,书法,插播'],
  ['人格', '不合作是知识分子尊严', '668', 3, '不合作,知识分子,尊严'],
  ['人格', '快乐战士', '668', 4, '快乐,战士,奋斗'],
  ['写作', '纪功碑与施教作用', '674', 2, '纪功碑,施教,自传'],
  ['人格', '余生给永恒作品', '675', 2, '余生,永恒,作品'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
}

function readSource(sourceFile) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
}

const sourceFiles = fs.readdirSync(sourceDir);
const sourceFileCache = new Map();

function resolveSourceFile(prefix) {
  if (!sourceFileCache.has(prefix)) {
    const matches = sourceFiles.filter((name) => name.startsWith(`${prefix}.`));
    if (matches.length !== 1) {
      throw new Error(`Expected one source file for ${prefix}, got ${matches.length}`);
    }
    sourceFileCache.set(prefix, matches[0]);
  }
  return sourceFileCache.get(prefix);
}

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

function writeMarkdown(filePath, records) {
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file} 第 ${record.source_paragraph} 段`);
    lines.push(`- 关键词：${record.keywords}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

fs.mkdirSync(outputDir, { recursive: true });

const paragraphCache = new Map();
const records = entries.map(([category, title, sourcePrefix, sourceParagraph, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const sourceFile = resolveSourceFile(sourcePrefix);
  if (!paragraphCache.has(sourceFile)) {
    paragraphCache.set(sourceFile, paragraphs(readSource(sourceFile)));
  }

  const sourceParagraphs = paragraphCache.get(sourceFile);
  const description = sourceParagraphs[sourceParagraph - 1];
  if (!description) {
    throw new Error(`Missing paragraph: ${sourceFile} P${sourceParagraph}`);
  }

  const sourcePath = path.relative(rootDir, path.join(sourceDir, sourceFile));
  return {
    id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title,
    description,
    source_file: sourceFile,
    source_paragraph: sourceParagraph,
    source_path: sourcePath,
    keywords,
  };
});

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    source_dir: path.relative(rootDir, sourceDir),
    record_count: records.length,
    category_counts: categoryCounts(records),
  },
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);

const note = [
  '# 《李敖风流自传》思想索引提取说明',
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${path.relative(rootDir, sourceDir)}`,
  '- 原则：本书篇幅大、材料杂，提取时优先保留可独立索引的思想判断、写作方法、人格立场、政治与法权论述；弱化纯艳遇、流水经历和与前书高度重复的议坛段落。',
  '- 描述字段：直接读取源文件段落，保持原文，不做改写。',
  '- 分类：继续使用写作、方法、知识、人格、文化、政治、法权七类。',
  '',
  '## 分类计数',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${note.join('\n')}\n`, 'utf8');

console.log(`Built ${book.title}: ${records.length} records.`);
