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
  .find((name) => name.startsWith('004.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '019.上下古今谈');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '019',
  title: '上下古今谈',
  slug: 'shangxia-gujin-tan',
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
  ['知识', '公众身份放大意见', '001', 22, '刘秀嫚,公众人物,说服力'],
  ['写作', '思想训练支撑专栏', '001', 26, '写作训练,思考训练,真知灼见'],
  ['人格', '公共人物要做实事', '001', 28, '公众影响,积极行动,意义'],
  ['文化', '贤妻良母压缩女性', '001', 29, '贤妻良母,女性自我,传统'],
  ['文化', '新英雄摆脱杀伐', '001', 32, '英雄定义,新时代,和平手段'],
  ['知识', '大众传播推动现代化', '001', 36, '大众传播,现代化,群众心理'],
  ['人格', '打破容忍沉默', '001', 44, '容忍,沉默,正义'],
  ['知识', '真理借低阻力传播', '001', 48, '真理,说服力,传播'],

  ['人格', '浪子精神投向社会', '002', 4, '浪子,社会改造,震聋醒聩'],
  ['方法', '旧题目需要新写法', '003', 8, '时代进步,旧题目,新看法'],
  ['写作', '写文章要有话直说', '004', 6, '文体,下里巴人,直说'],
  ['写作', '以俗为雅保留生气', '004', 7, '以俗为雅,个性,生气'],
  ['方法', '托古病借古售药', '005', 8, '托古病,古人,论证'],
  ['文化', '历史也是包袱', '006', 5, '历史,光荣,包袱'],
  ['知识', '现代人必须关心时潮', '006', 6, '时潮,现代人,世界潮流'],

  ['人格', '好人容忍助长恶事', '007', 4, '好人,容忍,恶势力'],
  ['人格', '好人使命在行动', '007', 7, '好人,使命,行动'],
  ['人格', '奋斗好人是战士', '008', 6, '奋斗的好人,战士,恶势力'],
  ['文化', '女性身体自由是现代自由', '009', 5, '天乳运动,女性身体,自由'],
  ['文化', '上空装否定禁忌', '010', 5, '上空装,身体禁忌,传统'],
  ['方法', '压制潮流要先清理理由', '010', 8, '时代潮流,传统理由,限制'],
  ['知识', '语意含混妨碍科学', '011', 3, '语意,中文,科学表达'],
  ['方法', '赤子之心犯定义思考', '011', 7, '赤子之心,定义思考,语意学'],
  ['知识', '良心是传统标准反射', '012', 5, '良心,传统标准,后天教育'],
  ['知识', '用知识理智订新标准', '012', 8, '知识,理智,新标准'],
  ['法权', '恋爱自由权是案件关键', '013', 5, '恋爱自由权,性交自由权,越权'],
  ['文化', '父兄权力是专制遗痕', '013', 6, '父权,兄权,专制遗痕'],
  ['人格', '敢做敢当是真大丈夫', '014', 10, '责任,敢做敢当,大丈夫'],
  ['人格', '法律以外也负责任', '015', 6, '马克吐温,负责,债务'],
  ['写作', '改文章须尊重意旨', '016', 7, '改文章,原作者,意旨'],
  ['文化', '乡愁根源正在削弱', '017', 4, '乡愁,农业社会,现代社会'],
  ['政治', '中国土地不分客主', '017', 8, '乡土,中国土地,客主'],

  ['政治', '民主是小百姓问政', '018', 6, '民主,小百姓,庸人政治'],
  ['政治', '民主初期靠教育监督', '018', 7, '民主初期,教育,监督'],
  ['政治', '民主靴抵抗人上人', '019', 2, '民主靴,人上人,多数智慧'],
  ['政治', '民主社会不让人踩头', '019', 7, '民主社会,普通人,平等'],
  ['政治', '代表民意防权力腐败', '019', 10, '民意代表,权力腐败,政府'],
  ['法权', '永不录用剥夺公权', '020', 7, '永不录用,公权,公务员'],
  ['法权', '惩戒必须经法定程序', '020', 11, '公务员惩戒,法定程序,撤职'],

  ['文化', '公娼制度有违文明', '021', 2, '公娼,文明,废娼'],
  ['文化', '开放社会让卖身自然消退', '021', 5, '瑞典,性开放,废娼'],
  ['法权', '娼妓被罚成代罪者', '022', 6, '公娼管理,牺牲者,代罪者'],
  ['法权', '公娼管理牺牲原则', '023', 5, '公娼,原则,法律'],
  ['政治', '废娼需要新改革', '023', 9, '废娼,改革,公娼制度'],
  ['法权', '坏人也有法律权利', '025', 7, '法律权利,坏人,法治'],
  ['法权', '无法可罚会伤无辜', '026', 3, '无法可罚,无辜,法律秩序'],
  ['法权', '警察好恶不能定罪', '026', 12, '流氓,警察,任意'],
  ['法权', '无期限管训毁人权', '027', 13, '管训,人权,宪法'],
  ['法权', '未经立法不能算法律', '027', 18, '立法院,法律,取缔流氓'],
  ['文化', '公民教育统一人格', '028', 11, '圣人教育,公民教育,人格'],
  ['法权', '法律失效催生私刑', '030', 9, '自力报复,法律失效,私刑'],
  ['方法', '私刑治理不能靠严刑', '030', 11, '自力报复,严刑峻法,正本清源'],
  ['方法', '偏见不是意见', '031', 11, '偏见,意见,成见'],
  ['法权', '刑求证据不可靠', '032', 5, '刑求,口供,证据'],
  ['法权', '科学侦查取代刑求', '032', 8, '刑求,科学侦查,警察'],
  ['法权', '情治也应保障人权', '033', 9, '特务,人权,法治国家'],
  ['人格', '无监督守法才是慎独', '034', 7, '闯红灯,慎独,自律'],
  ['政治', '原子弹改变战争理解', '035', 5, '原子弹,战争,毁灭'],
  ['政治', '战争不是解决路径', '035', 10, '战争,和平,原子弹'],
  ['法权', '驱逐案缺乏法律根据', '036', 7, '驱逐,法律根据,警察'],
  ['文化', '感情问题外人无权干预', '036', 9, '感情,道德,干预'],
  ['文化', '武侠小说反映挫败', '037', 6, '武侠小说,挫败情绪,逃避现实'],
  ['知识', '武侠小说败坏求知斗志', '037', 9, '武侠小说,知识懒惰,斗志'],
  ['人格', '真理不怕围攻', '038', 10, '真理,新思想,围攻'],
  ['人格', '富人应回馈社会', '039', 8, '财富,回馈社会,慈善'],
  ['文化', '社会转型未到家', '040', 6, '社会转型,封建,农业社会'],
  ['文化', '贞操说回避封闭现实', '040', 7, '贞操,封闭社会,男女接触'],
  ['文化', '毛笔字不合时代', '041', 4, '毛笔字,时代潮流,教育'],
  ['知识', '教育精力应投向实学', '041', 6, '教育,实学,科学'],
  ['知识', '文字用于传播知识', '041', 8, '文字,知识思想,书法'],
  ['文化', '新英雄是知识人', '042', 7, '英雄,知识人,新时代'],
  ['文化', '神化英雄遮蔽人命', '043', 10, '关公,英雄,普通人'],
  ['政治', '藏富于民防专制', '044', 7, '福特,藏富于民,社会稳定'],

  ['政治', '财富能抵抗腐败政治', '045', 4, '财富,腐败政治,基层保障'],
  ['政治', '基层保障防止专制', '045', 5, '藏富于民,专制,生活保障'],
  ['政治', '非暴力争取人权', '046', 6, '马丁路德金,非暴力,人权'],
  ['法权', '言论自由保护反对者', '047', 12, '言论自由,伏尔泰,反对意见'],
  ['人格', '笑脸也能解决难题', '048', 7, '笑脸,幽默,处世'],
  ['政治', '独裁违逆民主潮流', '049', 5, '独裁,民主趋向,历史潮流'],
  ['政治', '不可丧失民主信念', '049', 19, '民主趋向,信念,时代潮流'],
  ['法权', '外公内私破坏法治', '050', 5, '孔孟,亲情,法治'],
  ['法权', '法律高于亲情', '050', 10, '大义灭亲,法律,亲情'],
  ['文化', '半吊子西化造成杂糅', '051', 3, '半吊子西化,融会中西,固有文化'],
  ['文化', '固有文化应退博物馆', '051', 10, '固有文化,博物馆,现代生机'],
  ['文化', '明星改写英雄定义', '052', 7, '明星,英雄定义,新时代'],
  ['文化', '打倒片面贞操', '053', 14, '贞操,王宝钏,男权'],
  ['文化', '婚恋自由勇气值得效法', '054', 15, '恋爱自由,婚姻自由,王宝钏'],
  ['法权', '判案不能靠猜想', '055', 9, '判案,证据,人权'],
  ['法权', '不查房间是自由进步', '056', 10, '查房间,私人自由,警察'],
  ['文化', '社会应容纳自由女性', '056', 11, '叶枫,女性,社会进步'],
  ['文化', '最后肯定爱与美', '057', 9, '爱,美,女性'],
  ['写作', '批评应触及权威', '058', 6, '批评,权威,报纸'],
  ['写作', '报纸需要言论幅度', '059', 6, '报纸,言论范围,标准'],
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
    '- 本书是短论专栏合集，本轮只收可独立检索的判断段、方法段和结论段，不按篇目机械平均分配。',
    '- 纯笑话铺垫、长篇例证、新闻附录和来信原文，除非能承载明确思想判断，否则不单独收入。',
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
if (records.length !== 93) {
  throw new Error(`Expected 93 records, got ${records.length}`);
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
