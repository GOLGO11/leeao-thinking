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
  .find((name) => name.startsWith('004.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '012.李敖文存');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '012',
  title: '李敖文存',
  slug: 'leeao-wencun',
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
  ['写作', '文章兼问内容表达', '001', 6, '文章标准,内容表达,韩愈'],
  ['方法', '文章评判换新标准', '001', 9, '评判标准,表达,文章'],
  ['人格', '敢说不好就是不好', '001', 10, '判断,勇气,名家'],
  ['写作', '文言文不能好表达', '001', 15, '文言文,表达工具,梁启超'],
  ['写作', '白话文正宗化', '001', 16, '白话文,正宗,文章史'],
  ['写作', '白话基础薄弱生出狗屁文章', '001', 18, '白话文,新八股,文风'],

  ['人格', '自我肯定最重要', '003', 13, '自我肯定,大丈夫,独行'],
  ['人格', '大丈夫自己鼓掌', '003', 14, '掌声,封锁,大丈夫'],
  ['文化', '出世精神做入世事业', '003', 26, '大乘佛教,入世,出世'],
  ['人格', '看破后再回红尘', '003', 28, '看破红尘,救世,得失'],
  ['人格', '先出世再入世即菩萨', '003', 39, '菩萨,智慧,仁勇'],

  ['法权', '极权无法律毁独立思想', '004', 20, '极权,法律,独立思考'],
  ['人格', '四人同席仍不说假话', '004', 29, '真话,台湾,不说假话'],

  ['人格', '观念解脱越过牢房', '005', 11, '梭罗,牢房,精神自由'],
  ['方法', '自由关键在心理状态', '005', 14, '甘地,心理状态,自由'],
  ['法权', '自由以兄弟不自由为责任', '005', 18, '责任,受难,自由'],
  ['人格', '伟大性灵自有不自由', '005', 26, '自由的不自由,性灵,责任'],

  ['知识', '光荣妄想制造自传神话', '006', 14, '妄想,自我膨胀,传记'],
  ['方法', '当年老子叙事要当心', '006', 16, '回忆,自我陶醉,求真'],
  ['方法', '当事人的话不可尽信', '007', 27, '当事人,历史,辨伪'],

  ['方法', '理解古物先放弃今义', '008', 8, '古物,床,定义'],
  ['政治', '床成统治道具', '008', 17, '床,统治,权力'],
  ['文化', '西方文化藏在屁股底下', '008', 20, '椅子,西化,国粹'],

  ['知识', '固有文化需读准字义', '009', 8, '吃素,荤,固有文化'],
  ['文化', '吃素放生混入功利', '009', 10, '吃素,放生,功利'],
  ['方法', '深通佛法在能破执', '009', 18, '佛法,破执,功德'],

  ['方法', '乱世保身为保写作自由', '010', 6, '保身,写作,自由'],
  ['写作', '文章凶人老实', '010', 7, '文章,勇气,纸上谈兵'],
  ['知识', '命名义和团思想', '010', 14, '义和团思想,文化沙文主义,概念'],
  ['方法', '文化改建先清理基地', '010', 17, '文化改建,旧文化,清理'],
  ['文化', '固有文化消融西方是迷梦', '010', 18, '固有文化,西洋文化,翻译'],
  ['知识', '中国近代民族意识来自西方', '010', 22, '民族主义,国家观念,西化'],
  ['文化', '文化沙文主义来自文化征服幻想', '010', 25, '文化沙文主义,民族主义,排外'],
  ['方法', '看出义和团思想要方法训练', '010', 26, '义和团思想,思想方法,警觉'],
  ['知识', '中国过去没有科学', '010', 29, '科学,前科学,中国文化'],
  ['法权', '古书民字证明没有民主', '010', 31, '民主,民,古书'],
  ['人格', '转向西化需要大勇', '010', 34, '西化,韦政通,大勇'],
  ['文化', '儒家做人道理为君子设计', '010', 54, '儒家,阶层,君子'],
  ['政治', '三纲深入固有文化基层', '010', 55, '三纲五常,固有文化,统治'],
  ['政治', '大一统造成精神闭塞', '010', 86, '大一统,民主,科学'],
  ['文化', '新文化要全用西方水土', '010', 87, '新文化,西方,五四'],
  ['法权', '全国一个大雇主无民主', '010', 107, '民主,雇主,社会主义'],
  ['方法', '精确表达属于语意学', '010', 181, '语意学,精确,表达'],
  ['方法', '一处漏洞足以推翻谎言', '010', 185, '谎言,证伪,逻辑'],
  ['政治', '反共需坚持科学民主', '010', 189, '反共,科学,民主'],

  ['知识', '黄金有机体论是鬼话', '011', 8, '黄金,物质,神话'],
  ['文化', '黄金被伦理化成君子', '011', 18, '黄金,伦理化,君子'],
  ['知识', '黄金神变解释违背物质不灭', '011', 39, '黄金,物质不灭,苏轼'],

  ['文化', '麻将被封为国赌', '012', 24, '麻将,国赌,国粹'],
  ['文化', '以闲为幸福耗掉光阴', '012', 35, '麻将,消闲,民族'],
  ['方法', '禁赌关键在不赌后做什么', '012', 36, '禁赌,替代,口号'],
  ['法权', '禁赌不是严刑峻法问题', '012', 40, '禁赌,法律,严刑峻法'],
  ['人格', '戒赌理由是浪费时间', '012', 45, '戒赌,时间,道德'],

  ['方法', '了解中国必须接历史脉络', '013', 4, '历史脉络,中国人,方法'],
  ['法权', '承认行业才可研究改善', '013', 6, '娼妓,粉饰,改善'],
  ['法权', '官妓无肉体自由', '013', 15, '官妓,自由,人身'],
  ['政治', '政府吃软饭难要求道德', '013', 18, '政府,道德,公营'],
  ['文化', '娼妓传统以充文用', '013', 28, '娼妓,文人,文学'],
  ['知识', '制度名词禁令皆有脉络', '013', 42, '制度,民俗,历史'],

  ['方法', '影印改变秘本观念', '014', 6, '影印,古籍,秘本'],
  ['方法', '版本考究不等于弘扬文化', '014', 10, '版本,普及,文化'],
  ['知识', '四部分类垄断学术发展', '014', 11, '四部,分类,古籍'],
  ['方法', '古籍出版应普及实用', '014', 13, '古籍,出版,实用'],

  ['文化', '武士道是走狗道', '015', 15, '武士道,日本,愚忠'],
  ['文化', '鞠躬不是平等相处', '015', 18, '町人道,平等,日本'],
  ['知识', '军阀财阀是同一综合体', '015', 20, '军阀,财阀,日本'],
  ['方法', '统计学用坏就是谎话', '015', 23, '统计学,日本,谎话'],
  ['方法', '不只算打赢还要算以后', '015', 25, '战争,统计,后果'],
  ['文化', '和魂洋才丢了民主基础', '015', 38, '和魂洋才,民主,西化'],
  ['人格', '好失败者要从失败得到远见', '015', 58, '失败,日本,教训'],

  ['人格', '冷漠人缘反成特立独行成功', '016', 2, '蒋廷黻,特立独行,流俗'],
  ['知识', '现代人知道发言边界', '016', 39, '现代人,知识阶级,发言'],
  ['方法', '传统求知偏书本不事实', '016', 42, '求知,书本,事实'],
  ['人格', '士大夫缺大无畏精神', '016', 48, '士大夫,独立,大无畏'],
  ['知识', '士大夫阶级不事生产', '016', 52, '士大夫,生产,知识'],
  ['知识', '知识界真精神在入世实事', '016', 53, '知识界,经世致用,实事'],
  ['政治', '国粹阻碍国力就要抛弃', '016', 59, '国力,国粹,道德'],
  ['政治', '国力是人民诸力集合', '016', 64, '国力,青年,人民'],
  ['文化', '文艺也是国家力量', '016', 66, '文艺,国家力量,精神'],
  ['文化', '中国应尊重商人', '016', 71, '商人,商业,偏见'],
  ['人格', '公然为商人辩护是大无畏', '016', 75, '商人,事实,大无畏'],
  ['法权', '自由主义以人权为基础', '016', 82, '自由主义,人权,民主'],
  ['法权', '无政治自由就是地狱', '016', 90, '政治自由,全能主义,地狱'],
  ['法权', '不能废政治自由求经济自由', '016', 91, '政治自由,经济自由,进步'],
  ['法权', '经济压迫会压垮自由意志', '016', 100, '经济压迫,自由意志,海耶克'],
  ['政治', '统制越热闹老百姓越穷', '016', 103, '统制,国营,政治自由'],
  ['法权', '好反对党是民主必需', '016', 160, '反对党,民主政府,责任'],

  ['人格', '读书人不该玩政治', '017', 11, '左舜生,政治,读书人'],

  ['写作', '文学写苦难大众', '019', 3, '文学,苦难,众生'],
  ['写作', '文学没有地区性', '019', 4, '文学,地区性,标准'],

  ['方法', '敌人有时帮人大忙', '020', 4, '敌人,竞争,判断'],
  ['人格', '真正问题在自己', '020', 6, '讨厌,敌人,反省'],
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

function writeNote(filePath, records) {
  const categoryLines = taxonomy.map((category) => {
    const count = records.filter((record) => record.category === category).length;
    return `- ${category}：${count}`;
  });

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本轮优先收录具有明确思想判断、方法论、写作观、文化批判、政治法权含义的段落；纯掌故与材料性段落暂不密集收录。',
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  return entries.map(([category, title, sourcePrefix, sourceParagraph, keywords], index) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category: ${category}`);
    }

    const sourceFile = resolveSourceFile(sourcePrefix);
    const sourceParagraphs = paragraphs(readSource(sourceFile));
    const description = sourceParagraphs[sourceParagraph - 1];

    if (!description) {
      throw new Error(`Missing source paragraph: ${sourceFile} P${sourceParagraph}`);
    }

    const fullSourcePath = path.join(sourceDir, sourceFile);

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
      source_path: path.relative(rootDir, fullSourcePath).replaceAll(path.sep, '/'),
      keywords,
    };
  });
}

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
const payload = {
  generated_at: new Date().toISOString(),
  book,
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
writeNote(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
