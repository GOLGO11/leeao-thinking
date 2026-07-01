import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('002.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup))
  .find((name) => name.startsWith('001.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '009.传统下的独白');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '009',
  title: '传统下的独白',
  slug: 'chuantong-xia-de-dubai',
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
  ['文化', '反抗传统贯穿杂文', '001', 3, '传统,反抗,杂文'],
  ['人格', '狂叛就狂叛', '001', 4, '狂叛,孤独,独白'],
  ['文化', '世儒惯用帽子', '001', 7, '世儒,帽子,传统'],
  ['写作', '狂叛品文章', '001', 8, '文章,狂叛,内容'],
  ['写作', '文章本色是直据胸臆', '001', 9, '文章本色,直据胸臆,唐顺之'],

  ['人格', '做而不述胜过载道伪善', '004', 13, '做而不述,载道,伪善'],
  ['文化', '宗法婚姻压抑真情', '004', 20, '宗法,婚姻,真情'],
  ['文化', '家务机器解放妇女', '004', 22, '妇女独立,家务,主妇式社会'],
  ['文化', '吸收文明要学得像', '008', 2, '西方文明,日本,学习'],
  ['文化', '中国本位挡不住时势', '008', 3, '中国本位,西化,辜鸿铭'],

  ['文化', '女性更先现代化', '008', 4, '女性,现代化,北大'],
  ['方法', '现代出头靠考选', '008', 7, '考选世界,出头,现代'],
  ['写作', '游戏文章也能载道', '012', 24, '游戏文章,载道,道貌岸然'],
  ['写作', '讽刺文章深处有情节', '012', 25, '讽刺,小说,圣人之道'],
  ['文化', '长袍背后的心理学', '013', 10, '长袍,心理学,传统'],

  ['文化', '父母于子无恩', '016', 4, '父母,王充,孔融'],
  ['知识', '教育像冷冻机', '017', 8, '教育,冷冻机,军队'],
  ['法权', '医师法贻害社会', '018', 3, '医师法,法律,社会'],
  ['法权', '小百姓关心修法', '018', 4, '修法,小百姓,立法院'],
  ['知识', '巫医传统阻碍科学', '018', 8, '巫医,科学,中医'],

  ['知识', '科学医学压倒原始医术', '018', 15, '科学医学,解剖学,中医'],
  ['知识', '黜虚玄而尚实际', '018', 28, '科学化,旧医,虚玄'],
  ['知识', '废止旧医为民族进化', '018', 30, '废止旧医,民族进化,卫生行政'],
  ['法权', '法律俯顺舆情牺牲现代化', '018', 46, '医师法,舆情,现代化'],
  ['法权', '修法要从原意开刀', '018', 51, '修法,立法原意,医师法'],

  ['文化', '国字号阻碍现代化', '018', 53, '国字号,国粹,现代化'],
  ['政治', '政府不可鼓励传统余孽', '018', 54, '政府,传统余孽,现代化'],
  ['人格', '换一种方式爱国', '018', 55, '知识分子,爱国,实际问题'],
  ['知识', '未经科学验证即伪药', '018', 64, '科学验证,伪药,密医'],
  ['法权', '五年密医合法化', '018', 76, '密医,医师法,检核'],

  ['法权', '立法不能拿人命儿戏', '018', 81, '立法,人命,责任'],
  ['知识', '医学不应分中西', '018', 87, '医学,中西医,不承认主义'],
  ['法权', '立法失职不可冲淡', '018', 104, '立法委员,失职,医师法'],
  ['写作', '舆论家要鞭策立法', '018', 105, '舆论,立法,医师法'],
  ['法权', '学术批评受不罚保护', '019', 2, '学术批评,公评,不罚'],

  ['法权', '立委自利造密法官', '019', 36, '立法委员,律师,密法官'],
  ['法权', '有权未必有能', '019', 77, '立法权,专门委员,权能'],
  ['法权', '监督政府不是干扰政府', '019', 83, '监督政府,质询权,立法院'],
  ['法权', '律师资格后门破坏法治', '019', 88, '律师资格,后门,法治'],
  ['法权', '三种身份造成干扰', '019', 94, '立委律师,诉讼,法律顾问'],

  ['法权', '立委律师鱼熊不可兼得', '019', 99, '公务员,律师,兼任'],
  ['法权', '恶法违背制法原则', '019', 111, '恶法,制法原则,制度'],
  ['文化', '先问老年人是否交棒', '020', 7, '老年人,青年,交棒'],
  ['人格', '老年人要留余荫', '020', 15, '余荫,老年人,下一代'],
  ['人格', '白头新人物', '020', 22, '创造精神,进取,白头'],

  ['文化', '老生常谈需要反省', '020', 27, '老生常谈,反省,青年'],
  ['文化', '棒子不该抓着不放', '020', 30, '棒子,老年人,青年'],
  ['人格', '可敬老人愿学新把戏', '020', 38, '老年人,学习,父与子'],
  ['方法', '戳穿问题再解决', '020', 47, '戳穿,问题,解决'],
  ['文化', '青年也要被垂听', '020', 49, '青年,垂听,接力赛'],

  ['人格', '身教先于训育', '020', 65, '身教,骨气,战斗'],
  ['文化', '等待真正崭新的棒子', '020', 85, '交棒,青年,崭新'],
  ['法权', '国库不该养宗教偶像', '021', 32, '国库,宗教偶像,宪法'],
  ['人格', '天师也要自力谋生', '021', 33, '张天师,自力谋生,人格'],
  ['文化', '花公家钱吃祖宗饭', '021', 36, '祖宗饭,公款,孔圣问题'],

  ['人格', '没有独立人格的悲哀', '021', 40, '独立人格,祖宗,世袭'],
  ['知识', '中学教育斲丧性灵', '022', 19, '中学教育,性灵,杜威'],
  ['知识', '大学应培养有骨头知识分子', '022', 22, '大学教育,独立思考,知识分子'],
  ['写作', '冲向文星写文章', '022', 27, '文星,写作,独立'],
  ['人格', '锋利激情来自狂热', '022', 29, '狂热,犬儒,锋利'],

  ['文化', '培养愤世嫉俗气概', '022', 30, '愤世嫉俗,传统伦理,青年'],
  ['文化', '老不争气该缴棒', '022', 31, '老年人,交棒,青年机会'],
  ['知识', '要追问是谁搅浊环境', '022', 55, '环境,教育,人才'],
  ['方法', '批判就是证明不是东西', '022', 39, '批判,交棒,不是东西'],
  ['写作', '写文章撕破伪善', '022', 41, '写文章,伪善,学术'],

  ['人格', '宁做真小人', '022', 42, '真小人,伪君子,丧礼改革'],
  ['政治', '青年有现代化中国蓝图', '022', 58, '青年,现代化中国,大老爷'],
  ['方法', '低调的不合作主义', '022', 63, '不合作主义,低调,乱世'],
  ['人格', '少做懦夫多充勇士', '022', 65, '懦夫,勇士,真我'],
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
  '# 《传统下的独白》思想索引提取说明',
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${path.relative(rootDir, sourceDir)}`,
  '- 原则：本书以杂文、散文和论辩文字为主，提取时收录反传统写作、宗法婚恋、现代化、科学医学、法权批评、宗教补贴、代际交棒、教育与人格等可检索思想节点；纯叙事、抒情、戏拟笑料和资料性后记不入表。',
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
