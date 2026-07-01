import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup))
  .find((name) => name.startsWith('003.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '018.为中国思想趋向求答案');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '018',
  title: '为中国思想趋向求答案',
  slug: 'wei-zhongguo-sixiang-quxiang-qiu-daan',
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
  ['文化', '文化思想困惑无法拖延', '001', 7, '文化思想,困惑,基本问题'],
  ['文化', '双重标准制造半吊子', '001', 9, '双重标准,现代人,半吊子'],
  ['文化', '僵尸思想借尸还魂', '001', 10, '僵尸思想,古代,现代'],
  ['人格', '政客党棍不配求答案', '001', 15, '政客,党棍,知识分子'],
  ['人格', '求答案者愿做战士', '001', 20, '战士,思想趋向,传统'],
  ['政治', '新知识分子播科学民主现代化', '001', 22, '知识分子,科学,民主,现代化'],
  ['政治', '时代洪流不容旧物阻挡', '001', 23, '科学,民主,现代化,时代'],

  ['文化', '反西化病菌三百年未消', '002', 3, '反西化,中体西用,超越前进'],
  ['方法', '现代化阻力须彻底治疗', '002', 6, '现代化,心病,治疗'],
  ['政治', '爱国不以其道会阻碍现代化', '002', 8, '爱国,现代化,文化医生'],
  ['文化', '中胜于西滥用民族自信', '002', 21, '中胜于西,民族自信,夸大'],
  ['知识', '中土流传病缺历史根据', '002', 31, '中土流传,历史根据,考证'],
  ['文化', '不得已病是畏葸心理', '002', 37, '不得已,工业文明,自由恋爱'],
  ['文化', '酸葡萄病靠理由化自安', '002', 43, '酸葡萄,理由化,西方'],
  ['文化', '中国本位是中体西用盗版', '002', 48, '中国本位,中体西用,盗版'],
  ['文化', '世界文化新生变孔子当家', '002', 68, '世界文化,孔子,唯我论'],
  ['文化', '融合超越怪梦该醒', '002', 77, '融合,超越,现代化'],
  ['方法', '代表取样追踪思想谱系', '002', 78, '代表取样,后设历史学,谱系'],
  ['方法', '不同包装背后同一模式', '002', 80, '思想模式,传统派,分类'],
  ['文化', '泛祖宗主义求助孔夫子', '002', 84, '泛祖宗主义,孔夫子,父亲意像'],
  ['文化', '现代化不能借助古法', '002', 86, '现代化,古法,祖宗'],
  ['方法', '五十年并未彻底学习西方', '002', 95, '西方,学习,浅尝即止'],
  ['知识', '只开始学不能说学遍', '002', 97, '现代化,科学精神,民主政治'],
  ['文化', '新器物装着旧脑袋', '002', 99, '旧脑袋,皮毛西化,现代化'],
  ['文化', '真洋货未进口就被止住', '002', 101, '洋货,西学,浅尝即止'],
  ['知识', '东方思想是农业社会产物', '002', 102, '农业社会,儒家,经济背景'],
  ['政治', '不落后唯有改变经济形态', '002', 108, '工业社会,经济形态,落后'],
  ['文化', '工业社会不靠祖宗价值', '002', 109, '工业社会,传统价值,祖宗'],
  ['方法', '文化移植不是任意剪裁', '002', 128, '文化移植,整体,剪裁'],
  ['文化', '文化移植要椟也要珠', '002', 129, '文化移植,买椟还珠,全要'],
  ['政治', '现代化强国值得付代价', '002', 137, '现代化强国,大目标,代价'],
  ['法权', '取舍标准不配由权威制定', '002', 138, '文化选择,标准,自动吸收'],
  ['文化', '旧经典不配解决今日问题', '002', 143, '旧经典,现代问题,串假戏'],
  ['政治', '固有文化与共党思路相近', '002', 149, '固有文化,共党,思想基型'],
  ['知识', '儒化训练缺科学批评逻辑', '002', 150, '儒化思想,科学批评,逻辑'],
  ['政治', '爱国必须以其道', '002', 157, '爱国,现代化,土耳其'],

  ['方法', '原意要看字里行间', '003', 16, '原意,上下文,语法'],
  ['方法', '用对方文字证明原意', '003', 31, '原意,检证,语法'],
  ['方法', '民族自尊会损伤客观评断', '003', 38, '民族意识,客观评断,情绪'],
  ['方法', '保持差异不能代替解决适应不良', '003', 43, '差异,适应不良,文化接触'],
  ['政治', '目标不是点缀世界博物馆', '003', 47, '现代化强国,文化传统,目标'],
  ['文化', '旧文化不适应新冲击', '003', 53, '旧文化,西方文化,冲击'],
  ['文化', '贞节牌坊不是高度道德', '003', 62, '贞节牌坊,道德,耻辱'],
  ['人格', '大病在不承认弱点', '003', 75, '弱点,承认,生气蓬勃'],
  ['人格', '心智真诚考验学格', '003', 90, '心智真诚,学格,真理'],
  ['方法', '因词拒意是自我防卫', '003', 101, '因词拒意,自我防卫,价值染色'],
  ['方法', '意见要有可检证性', '003', 109, '意见,检证,矛盾'],
  ['方法', '矛盾自己会相打', '003', 184, '自相矛盾,检证,论战'],
  ['知识', '旧词可以承载新观念', '003', 212, '旧词,新观念,语言'],
  ['方法', '辩论要剪除枝叶', '003', 246, '辩论,枝叶,集中'],
  ['方法', '胜负看能否合理辩护', '003', 250, '辩论胜负,矛盾,事实'],
  ['文化', '超越前进没有第三条路', '003', 256, '超越前进,传统派,第三条路'],

  ['写作', '抓词加主义是技术犯规', '004', 6, '帽子,技术犯规,论战'],
  ['方法', '愈小事要知道愈多', '004', 13, '治学,细节,科学'],
  ['写作', '导言之后要转进分论', '004', 18, '导言,分论,写作'],
  ['文化', '西化起点是丢掉农业意识形态', '004', 19, '西化,农业社会,意识形态'],
  ['人格', '不会游也要下水', '004', 26, '善泅者,自告奋勇,知识分子'],

  ['文化', '优势文化下不能妄谈选择', '005', 2, '优势文化,选择,流弊'],
  ['知识', '梅毒是文化交流先头部队', '005', 38, '梅毒,文化交流,医学史'],
  ['方法', '考证能使谬说可笑', '005', 39, '考证,谬说,文化论争'],
  ['文化', '取长舍短好梦是空话', '005', 52, '取长舍短,择善而从,梅毒'],
  ['知识', '小词汇也挡不住西潮', '005', 55, '词汇,西化,文化太保'],

  ['文化', '小广告显示传统阴影', '006', 13, '处女膜整形,传统阴影,现代化'],
  ['知识', '处女膜证明贞节有问题', '006', 21, '处女膜,贞节,生理知识'],
  ['文化', '处女膜主义蔓延为泛处女主义', '006', 31, '处女膜主义,泛处女主义,传统'],
  ['法权', '强迫殉情无视自由意志', '006', 50, '强迫殉情,自由意志,殉夫'],
  ['文化', '泛处女主义遗风犹在', '006', 67, '泛处女主义,遗风,精神国粹'],
  ['法权', '现代道德不以殉夫为要件', '006', 71, '殉夫,现代道德,政府'],
  ['文化', '泛处女主义导出强奸后错误思想', '006', 73, '泛处女主义,强奸,羞忿自杀'],
  ['文化', '传统观念真会害死人', '006', 106, '传统观念,羞忿自尽,李幼冬'],
  ['方法', '澄清观念不能靠浮议', '006', 107, '澄清观念,移风易俗,浮议'],
  ['文化', '精神处女膜制造痛不欲生', '006', 136, '泛处女主义,精神处女膜,羞辱'],
  ['法权', '女人遭强奸不必自杀自毁', '006', 159, '强奸,羞辱,贞操'],
  ['人格', '不必再有玉玷花残之伤', '006', 165, '不幸女人,玉玷花残,精神解脱'],

  ['方法', '复杂问题警惕简单公式', '007', 3, '复杂问题,简单公式,谬误'],
  ['知识', '文献遗产要问积极意义', '007', 5, '文献遗产,新时代,积极意义'],
  ['文化', '孔子时代空气无法生活', '007', 12, '孔子时代,旧空气,中国思想'],
  ['知识', '泛孔系统是代孔立言', '007', 19, '泛孔系统,代孔立言,孔子'],
  ['知识', '反孔系统反对单行法规', '007', 25, '反孔系统,孔子,法规'],
  ['政治', '共党得势不是打倒孔家店', '007', 26, '共产党,孔家店,反孔'],
  ['政治', '反共和建国正道是自由主义', '007', 31, '反共,建国,自由主义'],
  ['知识', '传统思想方法一开始不及格', '007', 32, '传统思想,运作意义,现代学术'],

  ['人格', '再启蒙不能只有先锋', '008', 4, '再启蒙,先锋,主将'],
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

function resolveSourceFile(sourceKey) {
  if (!sourceFileCache.has(sourceKey)) {
    const matches = sourceFiles.filter((name) => (
      name === sourceKey
      || name.startsWith(`${sourceKey}.`)
      || name.includes(sourceKey)
    ));
    if (matches.length !== 1) {
      throw new Error(`Expected one source file for ${sourceKey}, got ${matches.length}`);
    }
    sourceFileCache.set(sourceKey, matches[0]);
  }
  return sourceFileCache.get(sourceKey);
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
    '- 本书围绕中西文化论战、中国思想趋向、文化移植、现代化和性伦理批判展开，本轮优先抽取可独立表达思想判断的方法段、总论段和结论段。',
    '- 论战中的琐碎反击、长篇例证和来信附录，只在能支撑思想分类或方法论时收录。',
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  return entries.map(([category, title, sourceKey, sourceParagraph, keywords], index) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category: ${category}`);
    }

    const sourceFile = resolveSourceFile(sourceKey);
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
if (records.length !== 83) {
  throw new Error(`Expected 83 records, got ${records.length}`);
}

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
