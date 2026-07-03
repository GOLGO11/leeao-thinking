import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const fictionGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('004.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, fictionGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('004.'));
const sourceDir = path.join(rootDir, sourceRoot, fictionGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '034.虚拟的十七岁');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '034',
  title: '虚拟的十七岁',
  slug: 'xuni-de-shiqisui',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从小说正文与写作后记中提取可独立检索的思想段落；重点收虚拟、科技、人工智慧、资讯自由、真相、文学写法、模特儿与观察、时间意识、文化财产权、年龄关系和抽象情爱观等材料。纯情节推进、露骨场面、过度依赖人物关系的私密对白、重复铺陈和资源站广告不收；涉及情爱或身体的段落，只在主旨是关系判断、文学方法或虚拟观念时收入。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['文化', '发禁解除也是自由', '001', 6, '发禁,自由,高中女生,文化'],
  ['文化', '道也在低贱处', '003', 13, '佛教,屎尿,赵州,文化'],
  ['文化', '健身变修炼便成祸源', '004', 50, '修炼,气功,迷信,文化'],
  ['写作', '不能写作就是浪费生命', '005', 40, '政治犯,写作,生命效率,写作'],
  ['知识', '科技噩梦不止文学想象', '007', 66, '科技,科学怪人,文学,知识'],
  ['知识', '记忆与器官都可能被控制', '007', 67, '虚拟灵魂,记忆,器官控制,知识'],
  ['知识', '人机器化不同于机器拟人化', '007', 71, '机器人,自然人机器化,科技,知识'],
  ['知识', '中文工具要等待电脑条件', '007', 81, '林语堂,中文打字机,电脑,知识'],
  ['政治', '从老大哥到机器人都要抢救人类', '008', 113, '极权,机器人,科技,政治'],
  ['知识', '演化论之后还要靠科技补强', '008', 32, '达尔文,演化,科技,知识'],
  ['知识', '人工智慧要能同人脑交融', '008', 69, '人工智慧,电脑,人脑,知识'],
  ['知识', '记忆拷贝制造虚拟身体', '009', 17, '记忆扫描,人工大脑,虚拟身体,知识'],
  ['法权', '活体实验必须面对同意伦理', '009', 32, '活体试验,同意,道德,法权'],
  ['方法', '一年时间可能改变死局', '009', 42, '时间,死刑,机会,方法'],
  ['人格', '青涩边缘死亡也可自我圆满', '009', 46, '十七岁,死亡,自我,人格'],
  ['方法', '十七年轮回观看衰老', '009', 50, '十七年,轮回,衰老,方法'],
  ['写作', '写作要理解十七岁', '013', 56, '代沟,十七岁,写作,写作'],
  ['写作', '模特儿不是静止被动', '013', 59, '模特儿,演员,导演,写作'],
  ['方法', '多出的年岁是智慧底层', '014', 27, '年龄,智慧,历练,方法'],
  ['政治', '科技统治就是1984恐怖', '018', 16, '奥威尔,科技统治,1984,政治'],
  ['知识', '科技放大五色五音', '020', 70, '老子,科技,感官,知识'],
  ['人格', '虚有其表的青春只是皮囊', '020', 72, '十七岁,皮囊幻相,人格'],
  ['知识', '文明创造靠人脑', '023', 14, '人工智慧,人脑,文明,知识'],
  ['知识', '非生物科技会吞噬人类', '023', 41, '生物智慧,非生物智慧,科技,知识'],
  ['知识', '数字记录不等于主体存在', '023', 54, '矽谷,资讯,主体,知识'],
  ['方法', '资讯要通向解释和想象', '023', 56, '资讯,知识,想象,方法'],
  ['知识', '电脑学习语言反其道而行', '023', 81, '电脑,语言学习,误解,知识'],
  ['知识', '电脑不懂语言歧义', '023', 88, '电脑,语言歧义,文学,知识'],
  ['情爱', '爱情非永恒须面对变心', '024', 110, '爱情,非永恒,变心,情爱'],
  ['情爱', '现实爱情不如文学完整', '024', 114, '爱情,文学,现实,情爱'],
  ['情爱', '爱情真相会被文学和科学拆穿', '024', 140, '爱情,真相,莎士比亚,情爱'],
  ['写作', '莎士比亚不断被文学家转用', '024', 147, '莎士比亚,英美文学,写作'],
  ['文化', '知识也能反击文化傲慢', '024', 152, '辜鸿铭,知识分子,文化'],
  ['情爱', '可爱和值得爱并不容易合一', '024', 190, '爱情,可爱,值得爱,情爱'],
  ['法权', '文物漂泊暴露文明掠夺', '025', 4, '昭陵六骏,文物,掠夺,法权'],
  ['法权', '国际公约保护文化财产', '025', 6, '文化财产,国际公约,法权'],
  ['知识', '神童也可超电脑', '025', 74, '神童,电脑,数学,知识'],
  ['方法', '追随者也会窃取领导大脑', '026', 12, '白鲸,唐吉诃德,大脑,方法'],
  ['情爱', '太上忘情不是无情', '027', 8, '太上忘情,情,情爱'],
  ['文化', '名牌要有文化水平', '040', 63, '名牌,钢笔,文化水平,文化'],
  ['文化', '名牌钢笔服务写作', '040', 75, '钢笔,名牌,文化贵族,文化'],
  ['情爱', '古典爱情太痛苦耗时', '040', 119, '爱情,古典,痛苦,情爱'],
  ['情爱', '年龄差不只在身体', '040', 122, '年龄,身体,关系,情爱'],
  ['情爱', '成熟眼光不取同龄浅薄', '040', 124, '十七岁,眼光,男人,情爱'],
  ['情爱', '爱情远见在知道结局', '042', 27, '爱情,结局,解释,情爱'],
  ['方法', '现代境界要随知识推移', '043', 2, '人生境界,知识,现代,方法'],
  ['知识', '古代想象由现代科技实现', '043', 4, '科技,古人想象,知识'],
  ['知识', '现代科技补强人类视野', '043', 5, '望远镜,显微镜,科技,知识'],
  ['方法', '时间空间在移动中互证', '044', 44, '时间,空间,真理,方法'],
  ['方法', '沙漏让时间可感', '044', 51, '沙漏,时间,度量,方法'],
  ['方法', '时间可以突维成经验', '045', 23, '四度空间,时间,达利,方法'],
  ['方法', '沙漏让抽象时间具体消逝', '045', 34, '沙漏,时间,具体,方法'],
  ['方法', '模拟就是对模特儿的虚拟', '047', 132, '模拟,虚拟,模特儿,方法'],
  ['知识', '青春思想也会衰老', '048', 15, '青春,思想,知识,知识'],
  ['知识', '青春与实力难以结合', '048', 17, '青春,实力,爱因斯坦,知识'],
  ['知识', '格物致知要借现代科技', '048', 33, '格物致知,科技,知识'],
  ['知识', '虚拟偶像解决衰老', '048', 50, '虚拟偶像,科技,衰老,知识'],
  ['方法', '虚拟需要适度科技', '048', 77, '虚拟,科技,沙漏,方法'],
  ['知识', '资讯爆炸制造焦虑', '051', 4, '资讯,知识爆炸,焦虑,知识'],
  ['法权', '人类应有免于资讯自由', '051', 13, '资讯自由,垃圾资讯,法权'],
  ['方法', '关键是过滤并融会资讯', '051', 19, '资讯,解释,融会贯通,方法'],
  ['知识', '神童现象有轨迹范围', '052', 3, '神童,高斯,知识'],
  ['人格', '识破真相带来悲怜', '052', 102, '真相,见证,悲怜,人格'],
  ['人格', '真实人生应减少哀愁', '053', 32, '哀愁,人生,快乐,人格'],
  ['知识', '青春美丽需要思想', '055', 62, '十七岁,思想,青春,知识'],
  ['知识', '思想高于心眼', '055', 64, '思想,莎士比亚,邵雍,知识'],
  ['写作', '文学模特儿需要演出', '055', 67, '文学模特儿,演出,写作'],
  ['情爱', '负面化爱情是不懂快乐', '055', 105, '爱情,负面化,快乐,情爱'],
  ['文化', '思想上的三寸金莲也要扬弃', '056', 151, '三寸金莲,思想,文化'],
  ['方法', '荒谬也能作为计算支点', '056', 192, '荒谬,年龄,阿基米德,方法'],
  ['人格', '一念之转也能救赎人生', '058', 21, '一念之转,人生观,人格'],
  ['文化', '美国有啦啦队式文化', '059', 11, '美国文化,青春,文化'],
  ['写作', '年轻身体与年深头脑并置', '060', 3, '身体,头脑,写作'],
  ['写作', '朱仑现象抵抗科技疯狂', '060', 6, '朱仑现象,科技疯狂,写作'],
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

function sourceFileByPrefix(prefix) {
  const file = fs
    .readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt'))
    .find((name) => name.startsWith(`${prefix}.`));
  if (!file) {
    throw new Error(`Missing source file prefix: ${prefix}`);
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
    '- 分类策略：沿用 8 个原子分类；本书以知识、方法、写作、情爱为主，情爱只收抽象关系判断和文学化爱情观。',
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
    '- 收入：虚拟、科技、人工智慧、资讯自由、真相、文学写法、模特儿与观察、时间意识、文化财产权、年龄关系和抽象情爱观等可独立检索的思想段落。',
    '- 暂不收入：纯情节推进、露骨场面、过度依赖人物关系的私密对白、重复铺陈、资源站广告。',
    '- 涉及情爱或身体的段落，只有主旨落在关系判断、文学方法、虚拟观念或年龄意识时收入；单纯场面描写不收。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-提取轮.csv',
    '- 思想索引-提取轮.json',
    '- 思想索引-提取轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

fs.mkdirSync(outputDir, { recursive: true });

const paragraphCache = new Map();
const records = entries.map(([category, title, filePrefix, sourceParagraph, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }
  const sourceFile = sourceFileByPrefix(filePrefix);
  const sourcePath = path.join(sourceDir, sourceFile);
  if (!paragraphCache.has(sourcePath)) {
    paragraphCache.set(sourcePath, paragraphs(sourcePath));
  }
  const sourceParagraphs = paragraphCache.get(sourcePath);
  const description = sourceParagraphs[sourceParagraph - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${sourceFile} P${sourceParagraph}`);
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
    source_path: path.relative(rootDir, sourcePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

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
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
