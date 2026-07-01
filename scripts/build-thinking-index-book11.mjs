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
  .find((name) => name.startsWith('003.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '011.独白下的传统');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '011',
  title: '独白下的传统',
  slug: 'dubai-xia-de-chuantong',
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
  ['知识', '古学缺方法训练', '001', 18, '古书,方法训练,知识分子'],
  ['知识', '新学究遮蔽中国', '001', 19, '新学究,垄断学术,中国真相'],
  ['知识', '对中国无知是知识分子失败', '001', 29, '中国无知,知识分子,失败'],
  ['写作', '作品被传统缠住', '001', 32, '文字遗产,传统桎梏,小脚作品'],
  ['人格', '特立独行难以善终', '001', 45, '特立独行,隐逸,不合作'],
  ['知识', '理解中国必须回忆传统', '001', 52, '理解中国,传统,精神分析'],
  ['写作', '写法服务受难者理解中国', '001', 56, '写法,受难者,了解中国'],

  ['写作', '曲笔遮蔽真相', '002', 45, '曲笔,直笔,历史真相'],
  ['法权', '史官需要历史独立', '002', 51, '史官,历史独立,制度'],
  ['政治', '皇帝看史书压低直笔', '002', 73, '皇帝,史官,直笔'],
  ['写作', '历史只讲真相', '002', 75, '历史,真相,求真'],

  ['法权', '讳言证明政治黑暗', '003', 13, '讳言,政治清明,政治黑暗'],
  ['文化', '避讳是坏习惯', '003', 38, '避讳,旧习惯,坏习惯'],
  ['文化', '旧忌讳不可复兴', '003', 41, '忌讳,新时代,旧习惯'],

  ['法权', '谏官为皇帝纠错', '004', 10, '谏官,皇帝,纠错'],
  ['法权', '官愈小愈敢说话', '004', 14, '谏官,小官,敢说话'],
  ['人格', '宁鸣不默', '004', 43, '宁鸣而死,不默而生,说话'],
  ['法权', '谏诤不是言论自由', '004', 46, '谏诤,言论自由,平等'],

  ['知识', '精神文明幻想替代发明', '005', 9, '精神文明,幻想,发明'],
  ['政治', '官场拖延不讲效率', '005', 30, '官场,效率,拖延'],
  ['方法', '科学提高命令效率', '005', 62, '科学,统治效率,命令'],
  ['知识', '速度幻想暴露落伍', '005', 64, '速度,电报,落伍'],

  ['法权', '小报受欢迎也被查禁', '006', 8, '小报,查禁,新闻'],
  ['法权', '新闻封锁源于怕丑事', '006', 9, '新闻封锁,邸报,检查'],
  ['法权', '租界成办报自由空间', '006', 30, '租界,办报,新闻自由'],
  ['法权', '言论自由重于临时管制', '006', 43, '言论自由,暂行报律,钳制舆论'],
  ['法权', '报纸在法律夹道中活下去', '006', 45, '报纸,法律,出版法'],

  ['文化', '祥瑞让人物带鬼神背书', '007', 57, '祥瑞,鬼神,大人物'],
  ['知识', '异表经不起科学检定', '007', 58, '异表,科学,白内障'],
  ['政治', '孔子神性巩固统治', '007', 60, '孔子,神性,统治者'],
  ['文化', '征兆是骗人公式', '007', 61, '征兆,骗局,公式'],

  ['文化', '人也吃人的历史', '008', 9, '吃人,人肉,历史'],
  ['文化', '割股救亲与孝冲突', '008', 58, '割股,孝,毁伤身体'],
  ['法权', '政府难定割股奖禁', '008', 59, '割股,政府,旌赏'],
  ['文化', '吃人肉不论理由都荒唐', '008', 62, '吃人肉,荒唐,传统病'],

  ['文化', '酒礼压过享受', '009', 51, '喝酒,礼节,享受'],
  ['方法', '酒可避祸但不能禁绝', '009', 63, '酒,避祸,禁酒'],

  ['文化', '声音被道德化', '010', 7, '音乐,道德,雅乐'],
  ['政治', '音乐被做成教育工具', '010', 17, '音乐,教育,政治目的'],
  ['知识', '乐器源流不能靠民族神话', '010', 28, '乐器,外国,民族神话'],
  ['文化', '旧音乐被夫子扼杀', '010', 29, '旧音乐,国乐,科学化'],

  ['文化', '女人在家中地位可怜', '011', 19, '女人,家庭,男权'],
  ['文化', '大家庭靠忍耐维持', '011', 34, '大家庭,忍耐,五代同堂'],
  ['法权', '家族关系生出残忍法律', '011', 40, '家族,诛族,法律'],
  ['文化', '家族观念阻碍进步', '011', 42, '家族观念,进步,流弊'],
  ['政治', '家族利益压过公益', '011', 49, '家族利益,公益,爱国'],

  ['文化', '女人出路被限于婚育', '012', 10, '女人,出嫁,妈妈'],
  ['文化', '女诫集压迫思想大成', '012', 33, '女诫,压迫女人,教科书'],
  ['文化', '贞节观念不近人情', '012', 51, '贞节,饿死事小,失节事大'],
  ['政治', '贞节牌坊也看关系', '012', 54, '贞节牌坊,关系,奖励'],
  ['文化', '缠小脚是审丑', '012', 60, '小脚,审丑,女性'],
  ['知识', '小脚哲学被思想史漏掉', '012', 64, '小脚哲学,思想史,固有文化'],

  ['文化', '再嫁禁令流殃', '013', 14, '再嫁,贞节,礼教'],
  ['文化', '贞节名册令人震骇', '013', 18, '贞节名册,残酷记录,旌表'],
  ['文化', '旌表只彰夫名', '013', 50, '旌表,妇女,姓名'],

  ['文化', '冥婚形成两面文化', '014', 27, '冥婚,经典,民俗'],

  ['文化', '欢喜佛软化恶行', '015', 11, '欢喜佛,软化恶行,佛书'],
  ['知识', '观音无形可现众身', '015', 27, '观音,无形,现众身'],
  ['文化', '欢喜佛是文化交流怪例', '015', 35, '欢喜佛,文化交流,怪例'],

  ['知识', '历史不是帝王起居注', '016', 4, '历史,帝王家谱,民族活动史'],
  ['方法', '反对单一史观', '016', 40, '唯性史观,非唯主义,历史现象'],
  ['方法', '现代方法重看历史夹缝', '016', 50, '现代方法,历史夹缝,辅助科学'],
  ['知识', '性问题是被忽略大题目', '016', 51, '性,中国历史,忽略'],
  ['人格', '回避性题目证明胆怯', '016', 52, '性研究,真理,胆怯'],
  ['文化', '性空气不清洁', '016', 56, '性,闭锁社会,管制'],
  ['法权', '风化护符制造耻辱', '016', 57, '国情不同,有伤风化,性水准'],

  ['文化', '人事感天不是民间独有', '017', 4, '人事感天,知识分子,迷信'],
  ['知识', '动物有知支撑感动论', '017', 22, '动物有知,感通,感动动物'],
  ['方法', '实力捕治胜过文词感格', '018', 9, '实力捕治,文词,乾隆'],
  ['文化', '孝子动物感应写不完', '018', 27, '孝子,动物感应,传统'],

  ['政治', '鼓是权威象征', '019', 4, '鼓,权威,当权者'],
  ['法权', '谏鼓传达逆耳言', '019', 16, '谏鼓,逆耳之言,上下交通'],
  ['法权', '登闻鼓是人权道具', '019', 32, '登闻鼓,喊冤,人权道具'],
  ['人格', '鼓声成为民间抗议', '019', 91, '鼓声,抗议,小百姓'],

  ['法权', '言论道具本质是戏', '020', 2, '言论道具,专制,象征'],
  ['法权', '诽谤原是忠谏', '020', 8, '诽谤,忠谏,谤木'],
  ['法权', '不加罪才有真话', '020', 43, '不加罪,求言,真话'],
  ['法权', '华表是失传言论道具', '020', 44, '华表,言论自由,象征'],

  ['知识', '无师也可自学', '021', 7, '自学,经书,老师'],
  ['人格', '不合作不必守孟子家法', '021', 9, '不合作,辞受,孟子'],
  ['人格', '拒征是软中有硬', '021', 13, '拒征,消极抵抗,坚决'],
  ['人格', '不合作需要大勇', '021', 27, '不合作主义,大勇,决绝'],
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
  '# 《独白下的传统》思想索引提取说明',
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${path.relative(rootDir, sourceDir)}`,
  '- 原则：本书主题密度高，首轮收录理解中国、史学直笔、避讳、谏诤、传令新闻、祥瑞、吃人、酒礼、音乐、家族、女性、贞节、冥婚、欢喜佛、性史、动物感应、谏鼓谤木与不合作主义等主线；笑话性过渡、堆叠例证和单纯掌故不密集收录。',
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
