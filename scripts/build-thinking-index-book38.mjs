import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const poetryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('005.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, poetryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('002.'));
const sourceDir = path.join(rootDir, sourceRoot, poetryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '038.李敖的情诗');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '038',
  title: '李敖的情诗',
  slug: 'leeao-de-qingshi',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《三情之书》序、Rosa/CL 长文、情诗短章和中学旧作中提取可独立检索的思想段落。因本书与《爱情的秘密》有大量重复诗篇，本轮避开既有总表中的相同原句，短诗只收能承载观点的句子。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['人格', '侠骨之外还有柔情', '001', 2, '三情之书,侠骨,柔情,人格'],
  ['情爱', '三情主题是现代爱情', '001', 3, '现代爱情,三情之书,情爱'],
  ['情爱', '中国人不懂现代爱情', '001', 5, '现代爱情,中国人,情爱'],
  ['文化', '中国历史少有健康爱情', '001', 6, '中国历史,爱情故事,文化'],
  ['文化', '中国爱情传统充满病态', '001', 7, '爱情传统,病态,文化'],
  ['情爱', '真爱情不该粗暴占有', '001', 8, '情杀,病态,真正爱情,情爱'],
  ['文化', '现代爱情要脱离旧土壤', '001', 9, '现代爱情,中国文化,乡土,文化'],
  ['情爱', '爱情不是盲目', '001', 12, '爱情,盲目,情爱'],
  ['情爱', '睁眼恋爱才是真恋爱', '001', 13, '恋爱,优点缺点,不盲目,情爱'],
  ['情爱', '爱情不该混入痛苦', '001', 15, '爱情,痛苦,纯快乐,情爱'],
  ['情爱', '为爱情痛苦是技术错误', '001', 18, '爱情痛苦,技术错误,情爱'],
  ['情爱', '灵上肉下是错误', '001', 29, '灵肉,崇灵贬肉,情爱'],
  ['情爱', '灵肉平等值得反省', '001', 33, '灵肉平等,卫道者,情爱'],
  ['情爱', '爱情要承认感情会变', '001', 35, '感情变化,洒脱,情爱'],
  ['情爱', '爱情要技巧处理变化', '001', 42, '爱情技巧,感情变化,情爱'],
  ['情爱', '最高技巧是不一起下坡', '001', 43, '爱情技巧,余味,分手,情爱'],
  ['情爱', '爱情不能贪求真善美', '001', 45, '爱情,唯美,真善美,情爱'],
  ['情爱', '男女关系只能是唯美', '001', 46, '男女关系,唯美,情爱'],
  ['方法', '从心路变化看信念', '001', 47, '信念,心路历程,方法'],
  ['情爱', '爱情如牙刷要更替', '003', 3, '爱情如牙刷,更替,情爱'],
  ['方法', '爱情战术要从容', '007', 13, '爱情军师,从容,方法'],
  ['情爱', '女人面前要学乖', '007', 14, '爱情军师,女人,情爱'],
  ['写作', '能做打油诗才可做好诗', '010', 15, '打油诗,白话诗,写作'],
  ['知识', '怀疑使人年轻', '010', 26, '怀疑,王充,知识'],
  ['写作', '真理自古要辩驳', '010', 51, '真理,辩驳,写作'],
  ['人格', '书生报国心不死', '010', 54, '书生,报国,人格'],
  ['人格', '沧海最爱自由', '010', 62, '自由,沧海,人格'],
  ['情爱', '恋爱要甜不要酸咸', '011', 50, '恋爱,sweetheart,情爱'],
  ['方法', '机巧最糟糕', '012', 12, '机巧,蒙昧,方法'],
  ['人格', '匹夫也可为百世师', '013', 13, '百世师,人格'],
  ['写作', '史家要鞭尸魑魅', '013', 43, '史家,治史,写作'],
  ['人格', '丈夫九死无悔', '014', 18, '丈夫,九死无悔,人格'],
  ['写作', '饿死也不雕虫', '014', 21, '雕虫,写作,人格'],
  ['写作', '写作要雕龙', '014', 41, '雕龙,写作'],
  ['方法', '往事可以忆而不伤', '016', 8, '往事,伤感,方法'],
  ['情爱', '旧欢如水不堪拾', '020', 6, '旧欢,情爱'],
  ['写作', '西化中文很糟', '022', 45, '西化中文,翻译,写作'],
  ['法权', '查禁书籍制造闭门思过', '022', 49, '查禁,文星,法权'],
  ['人格', '孤独也不失勇气口味', '022', 54, '孤独,勇气,人格'],
  ['文化', '母子恋会制造婚姻难题', '022', 63, '母子恋,婚姻,文化'],
  ['文化', '婆婆报复制造媳妇痛苦', '022', 64, '婆媳,报复,文化'],
  ['文化', '望孙逻辑支配婆媳关系', '022', 66, '望孙,婆媳,文化'],
  ['方法', '分析太清楚会不留余地', '022', 67, '分析,清楚,方法'],
  ['方法', '弃幻求真需要代价', '022', 76, '真幻,代价,方法'],
  ['人格', '看破价值会成为异乡人', '022', 77, '价值,异乡人,人格'],
  ['情爱', '时光倒流是美丽折磨', '022', 78, '时光倒流,记忆,情爱'],
  ['情爱', '留下和带走也许公平', '022', 86, '留下,带走,情爱'],
  ['政治', '未来要由我们制造', '023', 16, '等待,制造,政治'],
  ['人格', '不只为唾弃而生', '023', 21, '唾弃,人格'],
  ['人格', '我们有要做的事', '023', 22, '事业,人格'],
  ['情爱', '情不变就可继续等', '024', 8, '情不变,等待,情爱'],
  ['人格', '不能做骆驼就做仙人掌', '024', 13, '仙人掌,等待,人格'],
  ['方法', '选择后要放大所选', '026', 4, '选择,放大,方法'],
  ['方法', '证明选择常靠贬低落选', '026', 9, '选择,落选,方法'],
  ['情爱', '只爱一点点', '027', 3, '只爱一点点,情爱'],
  ['情爱', '不再要爱情会心硬', '028', 7, '不再爱,心硬,情爱'],
  ['情爱', '爱情偷走多情女儿心', '032', 10, '小偷,女儿心,情爱'],
  ['情爱', '变心需要爱情保险', '033', 12, '变心,爱情保险,情爱'],
  ['情爱', '爱情是水灾', '034', 3, '爱情,水灾,情爱'],
  ['情爱', '爱情使人猜而不想', '034', 11, '爱情,猜,情爱'],
  ['情爱', '爱情奉送悲哀', '034', 15, '爱情,悲哀,情爱'],
  ['情爱', '身体交出后灵魂也给出', '038', 10, '身体,灵魂,情爱'],
  ['情爱', '分手也要笑着', '041', 9, '分手,笑,情爱'],
  ['情爱', '旧梦重温最难', '042', 13, '旧梦,重温,情爱'],
  ['情爱', '患难以后知情重', '044', 4, '患难,情重,情爱'],
  ['方法', '月亮只露光明形状', '047', 13, '月亮,光明,方法'],
  ['写作', '改诗承载隐痛', '048', 10, '改诗,隐痛,写作'],
  ['情爱', '口琴会将情吹破', '049', 20, '胡茵梦,口琴,情爱'],
  ['人格', '天地总比人更大', '050', 4, '天地,无所逃,人格'],
  ['文化', '世界只剩你就没有我们', '051', 17, '坟,世界,文化'],
  ['方法', '喜欢该做才开阔', '054', 15, '喜欢,该做,方法'],
  ['情爱', '失掉身体就不可逆料', '064', 5, '身体,分离,情爱'],
  ['情爱', '情书越寄越要丢', '064', 8, '情书,分离,情爱'],
  ['情爱', '情多并不可靠', '065', 5, '情,可靠,情爱'],
  ['情爱', '没有欢乐情会退票', '065', 17, '欢乐,情,情爱'],
  ['情爱', '人生离合不可知', '066', 12, '人生离合,情爱'],
  ['情爱', '除了回忆无所有', '066', 15, '回忆,旧情,情爱'],
  ['情爱', '情也可以成为囚犯', '071', 25, '探监,情囚犯,情爱'],
  ['人格', '走自己的世俗路', '072', 4, '世俗,道路,人格'],
  ['人格', '鹏云志不必告诉燕雀', '073', 7, '鹏云志,燕雀,人格'],
  ['人格', '赤胆蒙祸不苟安', '075', 5, '蒙祸,苟安,人格'],
  ['写作', '我手写我口', '076', 6, '写作,表达,写作'],
  ['人格', '我心做主宰', '076', 7, '心,主宰,人格'],
  ['人格', '一身都是胆', '077', 5, '胆,人格'],
  ['写作', '诗中要有气魄', '080', 4, '诗,气魄,写作'],
  ['写作', '不被牵着鼻子走', '080', 5, '独立,写作'],
  ['人格', '忍恨藏起笑中刀', '081', 5, '忍恨,笑中刀,人格'],
  ['人格', '孤愤要留在心头', '082', 5, '孤愤,人格'],
  ['文化', '除了自救还能靠谁', '083', 15, '宗教,自救,文化'],
  ['文化', '任何宗教都别信', '083', 16, '宗教,不信,文化'],
  ['政治', '造反不怕杀', '087', 3, '造反,政治'],
  ['情爱', '爱情要保持遥远', '088', 5, '爱情,遥远,情爱'],
  ['情爱', '心情愿如井水', '089', 4, '心情,井水,情爱'],
  ['情爱', '多情是小儿女心肠', '093', 5, '多情,烦恼,情爱'],
  ['情爱', '相见未语也可知心', '095', 3, '心照,知心,情爱'],
  ['人格', '直言不怕祸', '096', 20, '直言,祸,人格'],
  ['人格', '李敖是铁汉', '096', 24, '铁汉,人格'],
  ['人格', '老思想支配快乐', '102', 4, '思想,快乐,人格'],
  ['写作', '有话就真说', '105', 4, '真说,写作'],
  ['写作', '有屁即直放', '105', 5, '直放,写作'],
  ['人格', '志在挽狂澜', '111', 2, '挽狂澜,人格'],
  ['情爱', '爱情死后又剩一人', '114', 5, '爱情死,孤独,情爱'],
  ['人格', '无暇送你殷勤', '116', 7, '志向,殷勤,人格'],
  ['写作', '作诗不拘束', '117', 15, '作诗,不拘束,写作'],
  ['人格', '人生要痛快', '117', 25, '人生,痛快,人格'],
  ['人格', '宁作真小人', '117', 38, '真小人,伪君子,人格'],
  ['情爱', '不将朋友作情人', '120', 5, '朋友,情人,情爱'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function sourceFileByKey(key) {
  const files = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
  const file = /^\d+$/.test(key)
    ? files.find((name) => name.startsWith(`${key}.`))
    : files.find((name) => name.includes(key));
  if (!file) {
    throw new Error(`Missing source file key: ${key}`);
  }
  return file;
}

function paragraphs(filePath) {
  const text = decoder.decode(fs.readFileSync(filePath));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const lines = [
    `# 《${bookInfo.title}》思想索引：${bookInfo.round}`,
    '',
    `- 状态：${bookInfo.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用 8 个原子分类；本书以情爱为主轴，同时保留诗论、写作原则、人格姿态、文化批判和少量政治判断。',
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

function writeSummary(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const counts = categoryCounts(records);
  const lines = [
    `# 《${bookInfo.title}》${bookInfo.round}说明`,
    '',
    `本轮从 ${sourceBookDir} 中提取 ${records.length} 条思想索引。`,
    '',
    '## 取舍说明',
    '',
    '- 收入：现代爱情、爱情不盲目、爱情纯快乐、灵肉平等、感情会变、爱情技巧、唯美关系、Rosa/CL 记忆、婆媳文化、写作原则、诗论、人格姿态和少量政治判断。',
    '- 暂不收入：目录、资料站署名、外文原诗行、纯祝寿戏谑、重复上一册的情诗原句，以及只服务押韵但不能独立检索的诗句。',
    '- 本书有大量逐行成段的短诗；本轮只取能单独承载观点的行，校对轮可继续压缩短句型条目。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 后续校对重点',
    '',
    '- 重点检查短诗句是否过碎，尤其情爱与人格条目。',
    '- 与《爱情的秘密》重复的情爱判断应继续合并或删除。',
    '- 对《三情之书》序中的中心论点可保留为本书核心索引。',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const paragraphCache = new Map();
const records = entries.map(([category, title, sourceKey, sourceParagraph, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const sourceFile = sourceFileByKey(sourceKey);
  const sourceFilePath = path.join(sourceDir, sourceFile);
  if (!paragraphCache.has(sourceFilePath)) {
    paragraphCache.set(sourceFilePath, paragraphs(sourceFilePath));
  }

  const sourceParagraphs = paragraphCache.get(sourceFilePath);
  const description = sourceParagraphs[sourceParagraph - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${sourceParagraph}: ${sourceFile}`);
  }

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
    source_path: path.relative(rootDir, sourceFilePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

fs.mkdirSync(outputDir, { recursive: true });

const payload = {
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
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records));
