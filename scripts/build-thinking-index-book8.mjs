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
  .find((name) => name.startsWith('008.'));
const sourceDir = path.join(rootDir, sourceRoot, memoirGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '008.李敖相关');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '008',
  title: '李敖相关',
  slug: 'li-ao-xiangguan',
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
  ['知识', '十二岁已有李敖实验室', '001', 21, '李敖实验室,图书馆馆长,早熟'],
  ['人格', '饿早饭义助师母', '001', 28, '严侨,义助,师母'],
  ['写作', '文星批评国法党限', '001', 40, '文星,国法党限,国民党'],
  ['法权', '告别文坛书也被查禁', '001', 41, '查禁,告别文坛,警总'],
  ['法权', '官方私方诉讼夹杀', '001', 43, '诉讼,夹杀,妨害公务'],
  ['人格', '基于人权义助柏杨', '001', 44, '柏杨,人权,义助'],
  ['法权', '洗脑中一言不发', '001', 52, '洗脑,无保出狱,法治'],
  ['人格', '拒绝抓兵式职务', '001', 53, '拒绝研究,拒绝签到,拒绝领薪水'],
  ['写作', '写司法黑暗抱冤狱不平', '001', 59, '司法黑暗,冤狱,写作'],
  ['人格', '顽童战士文化基督山', '001', 61, '顽童,战士,正义'],

  ['法权', '查禁下苦撑待变', '001', 62, '查禁,售书,苦撑'],
  ['政治', '国民党阻塞别人前进', '001', 63, '国民党,阻塞,现代化'],
  ['法权', '反分裂决议破坏程序正义', '001', 84, '程序正义,宪法,滥权'],
  ['政治', '智慧党拆穿假民主', '001', 86, '假民主,列宁式政党,智慧党'],
  ['方法', '不要只摸一条腿', '002', 2, '瞎子摸象,整体,李敖'],
  ['法权', '封锁扭曲李敖真面目', '002', 3, '封锁,查禁,视而不见'],
  ['知识', '反国民党源于深厚哲学', '002', 14, '民主自由,人权,哲学'],
  ['人格', '世界级地位封锁不了', '002', 16, '世界级,封锁,海外'],
  ['法权', '单独挑战威权尺度', '003', 5, '威权,言论开放,忽视'],
  ['写作', '直率犀利批判传统政治', '004', 6, '文星,全盘西化,批判'],

  ['法权', '出狱前书籍查禁系统', '006', 21, '出版法,戒严法,查禁'],
  ['写作', '复出后文化事业仍被追杀', '006', 23, '劫后余生,千秋评论,追杀'],
  ['法权', '攻訐现行法制即遭禁', '006', 108, '传统下的独白,现行法制,查禁'],
  ['文化', '儒家思想批判被查禁', '006', 110, '孔家思想,中国思想,儒家'],
  ['方法', '和平改革反枪杆', '006', 114, '和平改革,反盲动,反枪杆'],
  ['法权', '出版法违宪与不合作', '006', 117, '出版法,违宪,不合作主义'],
  ['法权', '出版法违宪与官逼民反', '006', 119, '出版法,官逼民反,法律'],
  ['政治', '一国两制文章遭处分', '006', 199, '一国两制,出版法,扣押'],
  ['政治', '孙中山卖国封面遭禁', '006', 200, '孙中山研究,卖国,查禁'],
  ['法权', '事实陈述须合理查证', '009', 38, '事实陈述,意见表达,合理查证'],

  ['法权', '言论自由具有较高价值', '009', 39, '言论自由,公众人物,名誉'],
  ['法权', '不实指控须郑重致歉', '009', 56, '不实,名誉,致歉'],
  ['法权', '自卫自辩与可受公评', '010', 15, '自卫,自辩,可受公评'],
  ['法权', '公然侮辱与诽谤有别', '010', 17, '公然侮辱,诽谤,名誉'],
  ['知识', '思想表达二分法', '011', 418, '著作权,思想,表达'],
  ['法权', '事实陈述与意见表达分流', '011', 424, '事实陈述,意见表达,名誉权'],
  ['法权', '言论自由不是内容自由', '011', 426, '言论自由,适当评论,谩骂'],
  ['法权', '李敖名誉受两岸传播损害', '009', 43, '名誉权,赔偿,两岸传播'],
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
  '# 《李敖相关》思想索引提取说明',
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${path.relative(rootDir, sourceDir)}`,
  '- 原则：本书多为年表、宣传词、查禁清单、公报和判决书，提取时仅收录能支撑李敖思想索引的自我定位、写作批判、查禁结构、法权边界与言论自由法理；纯案号、财产申报、流水履历和家事判决不入表。',
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
