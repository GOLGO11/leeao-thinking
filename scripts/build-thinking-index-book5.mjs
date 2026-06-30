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
  .find((name) => name.startsWith('005.'));
const sourceDir = path.join(rootDir, sourceRoot, memoirGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '005.李敖快意恩仇录');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '005',
  title: '李敖快意恩仇录',
  slug: 'li-ao-kuaiyi-enchoulu',
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
  ['写作', '续作作为回忆点睛', '002.《李敖快意恩仇录》自序.txt', 3, '回忆录,续作,点睛'],

  ['文化', '追远寻根与祖宗攀附', '003.陆根纪.txt', 3, '祖宗,寻根,攀附'],
  ['写作', '回忆录要衬出时代', '003.陆根纪.txt', 133, '回忆录,时代,衬托'],
  ['法权', '禁书中的作者抹除', '003.陆根纪.txt', 137, '禁书,作者,出版'],

  ['知识', '课外书与知识傲慢', '004.小寒纪.txt', 3, '课外书,知识,学校'],
  ['知识', '少年图书馆研究', '004.小寒纪.txt', 13, '图书馆,研究,札记'],
  ['人格', '少年思想的预言', '004.小寒纪.txt', 50, '少年,思想,预言'],

  ['人格', '真理甚于吾师', '005.大寒纪.txt', 21, '师生,真理,决绝'],
  ['文化', '丧礼改革反传统', '005.大寒纪.txt', 23, '丧礼,改革,传统'],
  ['方法', '大学治学不守笔记', '005.大寒纪.txt', 48, '大学,笔记,独立治学'],
  ['人格', '做真的我胜过假成绩', '005.大寒纪.txt', 55, '作弊,成绩,真实'],
  ['知识', '自修胜过大学师友', '005.大寒纪.txt', 64, '自修,大学,师友'],

  ['写作', '预官日记作为记录', '006.投笔纪.txt', 4, '日记,记录,军中'],
  ['人格', '不入党威胁中的硬气', '006.投笔纪.txt', 29, '入党,硬汉,殉道'],
  ['人格', '在极限中少做懦夫', '006.投笔纪.txt', 108, '极限,勇士,真我'],
  ['方法', '肉体训练转成精神训练', '006.投笔纪.txt', 112, '军中,磨练,精神训练'],
  ['人格', '从军中磨练出反抗本钱', '006.投笔纪.txt', 137, '预备军官,磨练,反抗'],

  ['法权', '母校伪证陷害学生', '007.委蜕纪.txt', 20, '台大,伪证,诉讼'],
  ['法权', '学术自由不能助纣陷害', '007.委蜕纪.txt', 22, '学术自由,陷害,权势'],
  ['人格', '父亲放任自由意志', '007.委蜕纪.txt', 41, '父亲,自由意志,读书'],
  ['知识', '胡适使他放弃旧路', '007.委蜕纪.txt', 50, '胡适,思想,转变'],
  ['方法', '借题发挥是思想方法', '007.委蜕纪.txt', 60, '借题发挥,胡适,方法'],
  ['人格', '个人主义与特立独行', '007.委蜕纪.txt', 71, '个人主义,思想自由,胡适'],

  ['政治', '文星从文化思想挖根', '008.星火纪.txt', 6, '文星,国民党,文化思想'],
  ['写作', '禁书愈禁愈流传', '008.星火纪.txt', 8, '禁书,写作,流传'],
  ['法权', '青年责难政府应被容忍', '008.星火纪.txt', 14, '言论,政府,容忍'],
  ['政治', '大学教授失去五四气象', '008.星火纪.txt', 19, '教授,五四,勇气'],
  ['人格', '知识分子的傲骨与不合作', '008.星火纪.txt', 21, '知识分子,傲骨,不合作'],

  ['文化', '全盘西化不可选择', '009.白露纪.txt', 3, '全盘西化,文化移植,选择'],
  ['方法', '看书不必看作者', '009.白露纪.txt', 14, '读书,作者,客观'],
  ['方法', '研究社会问题要实察', '009.白露纪.txt', 23, '社会问题,考察,纸上谈兵'],

  ['人格', '不在安全地带种树', '010.根株纪.txt', 8, '牺牲,努力,乱世'],
  ['人格', '素愿重于名誉牺牲', '010.根株纪.txt', 13, '素愿,名誉,牺牲'],
  ['人格', '逆境不靠正人君子', '010.根株纪.txt', 16, '逆境,君子,援手'],
  ['写作', '专栏应拓宽言论尺度', '010.根株纪.txt', 21, '专栏,言论自由,尺度'],

  ['政治', '自由民主反省与自由中国', '011.殷鉴纪.txt', 3, '自由民主,自由中国,殷海光'],
  ['人格', '求真精神与自卫意识', '011.殷鉴纪.txt', 5, '求真,自卫,理想主义'],
  ['法权', '畸形环境中的生存权', '011.殷鉴纪.txt', 17, '生存权,工作权,宪法'],
  ['写作', '整理遗稿才是真纪念', '011.殷鉴纪.txt', 27, '遗稿,思想,纪念'],
  ['人格', '斗士不可劝停', '011.殷鉴纪.txt', 39, '斗士,纪念,殷海光'],

  ['方法', '冤狱文书要偷运海外', '012.东郭纪.txt', 7, '冤狱,法律文书,海外'],
  ['方法', '海外舆论压力的策略', '012.东郭纪.txt', 12, '海外舆论,压力,营救'],
  ['政治', '公开揭发形成连锁反应', '012.东郭纪.txt', 14, '揭发,知识人,政权'],
  ['方法', '求情无效而公开必要', '012.东郭纪.txt', 17, '求情,公开,压制自由'],

  ['政治', '拒绝国民党提拔的志气', '013.彭尸纪.txt', 15, '彭明敏,国民党,志气'],
  ['政治', '知识分子应影响政治', '013.彭尸纪.txt', 31, '知识分子,政治,洁身自爱'],
  ['政治', '自由民主才是运动本位', '013.彭尸纪.txt', 38, '自由民主,台湾自救,定位'],
  ['方法', '空泛号召是一厢情愿', '013.彭尸纪.txt', 41, '一厢情愿,具体办法,联合国'],
  ['人格', '不容朋友的大是大非错误', '013.彭尸纪.txt', 44, '朋友,大是大非,进言'],

  ['方法', '以外国记者突破封锁', '014.寒武纪.txt', 28, '雷震,外国记者,封锁'],
  ['法权', '反台独者被戴台独帽', '014.寒武纪.txt', 29, '台独,冤狱,政治犯'],

  ['法权', '刑求逼出台独供词', '015.三叠纪.txt', 3, '刑求,台独,政治犯'],
  ['法权', '大案常由刑求逼供造成', '015.三叠纪.txt', 7, '刑求,假案,爆炸案'],
  ['法权', '感训本质是政治洗脑', '015.三叠纪.txt', 10, '感训,洗脑,政治犯'],
  ['人格', '朋友之道不能让位政治手段', '015.三叠纪.txt', 11, '朋友,政治手段,卑鄙'],
  ['法权', '小人物被当匪谍牺牲', '015.三叠纪.txt', 38, '匪谍,小人物,军法'],
  ['法权', '无罪者被强制悔过', '015.三叠纪.txt', 60, '悔过,政治犯,陈独秀'],

  ['写作', '复出文字触犯官方词汇', '016.梦遗纪.txt', 4, '复出,蒙难,官方压力'],
  ['政治', '从受害者观点看美国', '016.梦遗纪.txt', 30, '美国,法西斯,受害者'],
  ['人格', '社会公义软硬不吃', '016.梦遗纪.txt', 55, '公义,黑狱,收买'],
  ['法权', '武夫审查书刊', '016.梦遗纪.txt', 66, '审查,书刊,言论自由'],

  ['方法', '用历史训练剖析国民党', '017.猪猡纪.txt', 7, '历史训练,史料,国民党'],
  ['写作', '文明持久地批判暴君', '017.猪猡纪.txt', 10, '批判,暴君,专集'],
  ['政治', '支持反对党不等于轻信政客', '017.猪猡纪.txt', 29, '反对党,政客,民主'],
  ['方法', '公开资料也能重新解释', '017.猪猡纪.txt', 41, '公开资料,解释,考证'],
  ['写作', '十年笔伐与辨冤白谤', '017.猪猡纪.txt', 43, '笔伐,辨冤,国民党'],

  ['法权', '老百姓要反闹衙门', '018.闹衙纪.txt', 3, '衙门,老百姓,官司'],
  ['法权', '查禁法令制造执行混乱', '018.闹衙纪.txt', 4, '查禁,法令,出版'],
  ['法权', '持有禁书不等于散布', '018.闹衙纪.txt', 8, '禁书,持有,出版法'],
  ['法权', '司法判决不能违背常识', '018.闹衙纪.txt', 11, '判决,常识,经验法则'],

  ['文化', '性宣传反转宣淫', '019.宣淫纪.txt', 3, '性宣传,宣淫,性教育'],
  ['文化', '性禁忌造成失真', '019.宣淫纪.txt', 61, '性禁忌,假道学,失真'],

  ['人格', '给知识分子留下浩然之气', '020.志留纪.txt', 5, '知识分子,浩然之气,敌人'],
  ['人格', '亡天下时站出来打', '020.志留纪.txt', 6, '亡天下,知识分子,道德'],
  ['人格', '以圣人行自许', '020.志留纪.txt', 11, '圣人行,豪杰,仗义'],
  ['政治', '政治家应由思想家领导', '020.志留纪.txt', 12, '思想家,政治家,自我肯定'],
  ['方法', '玩世喜感化掉不如意', '020.志留纪.txt', 13, '玩世,喜感,评论'],
  ['知识', '整理人类观念行为的计划', '020.志留纪.txt', 66, '观念,行为,结论'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用当前 7 个原子分类，避免按人物、事件、年份继续拆碎。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
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
      lines.push(record.description);
      lines.push('');
    }
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
const records = entries.map(([category, title, sourceFile, sourceParagraph, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

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
  '# 《李敖快意恩仇录》思想索引提取说明',
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${path.relative(rootDir, sourceDir)}`,
  '- 原则：收录可复用的思想段落，减少纯人物掌故和单次情节。',
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
