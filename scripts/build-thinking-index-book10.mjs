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
  .find((name) => name.startsWith('002.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '010.传统下的再白');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '010',
  title: '传统下的再白',
  slug: 'chuantong-xia-de-zaibai',
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
  ['文化', '爱情是现代化落后一环', '001', 3, '爱情,现代化,落伍'],
  ['文化', '为抽象名词牺牲爱情', '001', 8, '爱情,抽象名词,传统'],
  ['文化', '泛道德主义禁谈男女', '001', 9, '泛道德主义,男女,禁忌'],
  ['人格', '泛道德主义造成双重人格', '001', 12, '泛道德主义,双重人格,说教'],
  ['文化', '正常爱情被扼杀', '001', 14, '爱情,真情,面具'],
  ['文化', '中西合璧爱情成悲剧', '001', 15, '爱情,中西合璧,半吊子'],
  ['文化', '爱情应全盘现代化', '001', 17, '爱情,现代化,全盘学习'],
  ['法权', '查禁不能双重标准', '001', 19, '查禁,红楼梦,卫道'],

  ['文化', '女生入北大破旧礼', '002', 3, '女性,北大,男女不杂坐'],
  ['文化', '历史包袱阻碍女性苏醒', '002', 4, '女性,男尊女卑,历史包袱'],
  ['文化', '女人记忆择取有利', '002', 15, '女人,记忆,攻击'],
  ['文化', '女人理由随感情变形', '002', 17, '女人,理由,感情'],
  ['文化', '负人后靠追忆开脱', '002', 20, '女人,良心,开脱'],

  ['政治', '入党如信教', '004', 11, '入党,信党,政党'],
  ['方法', '避祸学回应罗织学', '004', 15, '罗织学,避祸学,方法'],
  ['政治', '统制技术最现代', '004', 17, '统制技术,避祸学,现代'],
  ['方法', '攻击即防御', '004', 19, '攻击,防御,手段'],
  ['人格', '野蛮政权下的独立存在', '004', 23, '野蛮政权,独立,画家'],
  ['政治', '堂皇谎话也会失信', '004', 25, '谎话,老百姓,信任'],
  ['法权', '审查者读书最多', '004', 27, '审查,异端邪说,书刊'],

  ['文化', '新规范能替代旧霉货', '005', 6, '新规范,旧传统,结婚'],
  ['方法', '稳健不等于做法正确', '005', 10, '稳健,耶稣,理想'],
  ['方法', '在环境极限内蠕动', '005', 11, '环境极限,老顽固,小乱'],
  ['人格', '少做懦夫多充勇士', '005', 12, '懦夫,勇士,真我'],
  ['人格', '稳健也会变乡愿', '005', 13, '乡愿,稳健,老成持重'],

  ['法权', '党方力量干涉序文', '007', 4, '王世杰,序文,党方干涉'],
  ['法权', '序文被权力链割除', '007', 5, '删序,权力链,蒋廷黻选集'],
  ['写作', '文章斩草除根办不到', '007', 9, '文章,斩草除根,重发'],
  ['政治', '对异己应辩论明白', '007', 25, '孙中山,异己,辩论'],
  ['政治', '党内异见要和平待之', '007', 29, '林森,本党,和平'],
  ['文化', '捍卫文化者也仰洋教', '007', 33, '中国文化,洋教,现世报'],
  ['人格', '拒绝做弱者', '007', 35, '强者哲学,弱者,信仰'],
  ['人格', '强者需要智慧力量狠心', '007', 36, '强者,智慧,力量'],
  ['知识', '洞澈人际与科际', '007', 37, '智慧,人际,科际'],
  ['人格', '力量要打击恶势力', '007', 38, '力量,恶势力,智慧'],
  ['方法', '铲除感情干扰', '007', 39, '感情,阻力,强者'],
  ['人格', '真理高于朋友', '007', 42, '真理,朋友,牺牲'],
  ['方法', '矛盾关口要一刀两断', '007', 44, '矛盾,一刀两断,强者'],
  ['知识', '译词必须贴合原意', '007', 47, '翻译,轩渠,原意'],

  ['法权', '公帑讲学安抚权贵', '008', 13, '学人归国讲学,公帑,权贵'],
  ['知识', '最高学术机构缺少成绩', '008', 29, '中央研究院,学术研究,假学人'],
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
  '# 《传统下的再白》思想索引提取说明',
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${path.relative(rootDir, sourceDir)}`,
  '- 原则：本书篇幅较短，提取时收录爱情现代化、泛道德主义、女性与礼教、知识人行动、统制与审查、删序事件、强者哲学、学术机构腐败等思想节点；纯笑骂语录、单句定义和流水证据不密集收录。',
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
