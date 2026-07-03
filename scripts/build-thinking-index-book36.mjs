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
  .find((name) => name.startsWith('006.'));
const sourceDir = path.join(rootDir, sourceRoot, fictionGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '036.第73烈士');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '036',
  title: '第73烈士',
  slug: 'di73-lieshi',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从剧本正文与志缘中提取可独立检索的思想段落；重点收革命目的、革命被偷走、中华民国亡国论、忠烈祠与名器、纪念虚礼、老兵被国家裹胁、法律与正义、李师科作为第七十三烈士、历史剧写法等材料。纯情节推进、身份悬念、人物插科打诨、过度露骨的军中乐园场面描写和重复铺陈不收。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['人格', '革命者临刑不惧', '001', 11, '革命党,临刑,勇气,人格'],
  ['政治', '死去的革命党成为光荣', '001', 26, '革命党,造反,光荣,政治'],
  ['文化', '收尸勇气改变黄花岗记忆', '002', 3, '黄花岗,收尸,中国文化,文化'],
  ['政治', '国民党窃取革命国家', '002', 27, '国民党,章太炎,国家,亡国,政治'],
  ['政治', '烈士不应背负卖国民国', '002', 116, '七十二烈士,中华民国,外蒙古,政治'],
  ['政治', '党军使革命落入新军阀', '002', 118, '孙中山,党军,蒋介石,革命,政治'],
  ['政治', '北洋军阀不能替国民党背锅', '002', 122, '北洋军阀,国民党,一党专政,政治'],
  ['文化', '排满不能缩小中国民族', '002', 126, '排满,汉族,中国民族,文化'],
  ['文化', '中国民族不能只限中原', '002', 130, '中国民族,中原,夷狄,文化'],
  ['政治', '革命可能带来长期失序', '002', 157, '革命,清朝,中华民国,政治'],
  ['政治', '中华民国本身成了革命对象', '002', 159, '中华民国,外蒙古,革命对象,政治'],
  ['政治', '革命可能帮别人家天下', '002', 171, '革命,家天下,孙中山,蒋介石,政治'],
  ['政治', '革命被袁家蒋家偷走', '002', 176, '革命,中华民国,偷走,政治'],
  ['政治', '革命结果可由革命宣言反证', '002', 187, '革命宣言,中国,失败,政治'],
  ['政治', '我死则国生未必成真', '002', 197, '黄花岗,国家,革命理想,政治'],
  ['人格', '不效忠民国也可忠诚', '002', 221, '忠臣,清朝,七十二烈士,人格'],
  ['文化', '忠烈祠是传统政治符号', '003', 6, '忠烈祠,政治符号,传统,文化'],
  ['政治', '革命英雄后来各有后话', '003', 176, '革命英雄,陈璧君,陈炯明,政治'],
  ['人格', '活先烈以一生守黄花岗', '003', 195, '莫纪彭,活先烈,黄花岗,人格'],
  ['法权', '明杀说出反抗理由', '003', 225, '温生才,明杀,政府无道,法权'],
  ['政治', '第七十三烈士必须丢掉旧国号', '003', 255, '第七十三烈士,中华民国,觉悟,政治'],
  ['人格', '多活五十年未必幸运', '003', 259, '七十二烈士,莫纪彭,亡国,人格'],
  ['人格', '活先烈不必埋在黄花岗', '003', 280, '活先烈,黄花岗,人格'],
  ['文化', '纪念可以变成告朔饩羊', '003', 303, '纪念,自由人权,告朔饩羊,文化'],
  ['文化', '忠烈祠可以是虚伪建筑', '003', 310, '忠烈祠,蒋介石,名器,文化'],
  ['文化', '先烈名字也是名器', '003', 311, '先烈,名器,忠烈祠,文化'],
  ['方法', '朋友也可能成为阻力', '003', 325, '革命,朋友,阻力,方法'],
  ['方法', '朦胧无知方便夹带假先烈', '003', 329, '忠烈祠,先烈事迹,方法'],
  ['政治', '千分之三不能证明未亡国', '003', 343, '中华民国,统一,亡国,政治'],
  ['人格', '不为威胁利诱入党', '004', 10, '国民党,入党,金门,人格'],
  ['人格', '牺牲一生后也该爱自己', '004', 406, '老兵,牺牲,爱国,人格'],
  ['政治', '伪总统陵寝暴露僭越', '005', 6, '蒋介石,慈湖,皇帝,政治'],
  ['政治', '国家需要制造无尽服役', '005', 35, '李师科,国家需要,老兵,政治'],
  ['法权', '国家拿走青春和自由', '005', 36, '李师科,自由,青春,法权'],
  ['政治', '政府拉人民保护政府', '005', 38, '中国农民,政府,国家,政治'],
  ['政治', '老兵无用后才被放走', '005', 52, '老兵,自由,国家,政治'],
  ['人格', '国家造成家庭破碎', '005', 60, '李师科,家庭破碎,国家,人格'],
  ['方法', '李师科不能用犯罪学解释', '005', 62, '李师科,正义,犯罪学,方法'],
  ['人格', '抢银行也有道德动机', '005', 63, '李师科,道德,罗宾汉,人格'],
  ['文化', '穷苦人也有自己的价值观', '005', 75, '文学,穷苦人,价值观,文化'],
  ['法权', '低层小民没有合法途径', '005', 80, '李师科,合法途径,刑求,法权'],
  ['法权', '法律责任要看国家亏欠', '005', 82, '李师科,法律,国家亏欠,法权'],
  ['方法', '方法错但未必有更对方法', '005', 85, '李师科,方法,抗议,方法'],
  ['法权', '法律必须和道德同一', '005', 88, '法律,正义,道德,法权'],
  ['政治', '李师科代表老兵悲愤', '005', 90, '李师科,老兵,悲愤,政治'],
  ['政治', '弱者袍泽不堪闻问', '006', 4, '老兵,伪政府,监狱,政治'],
  ['人格', '完整记忆也能投射希望', '006', 56, '李师科,记忆,希望,人格'],
  ['人格', '回归不了大陆就回归梦', '006', 62, '李师科,老兵哲学,梦,人格'],
  ['法权', '专制人权构成革命前提', '006', 70, '革命,人权,专制,法权'],
  ['政治', '第七十三烈士补足革命缺角', '006', 78, '第七十三烈士,黄花岗,李师科,政治'],
  ['政治', '看穿蒋介石政权本质', '006', 80, '李师科,蒋介石,政权,政治'],
  ['法权', '孟子暴君论否定合法性', '006', 87, '孟子,暴君论,独夫,法权'],
  ['方法', '觉悟来自五点参悟', '006', 93, '李师科,觉悟,政权,方法'],
  ['法权', '罪状由反抗对象给出无须介意', '006', 104, '罪状,反抗对象,法权'],
  ['政治', '黄花岗精神是推翻坏政府', '006', 107, '黄花岗精神,坏政府,尊严,政治'],
  ['文化', '私谥可替代官方忠烈祠', '006', 110, '私谥,忠烈祠,李师科,文化'],
  ['方法', '杀贼就是革命实践', '006', 115, '黄克强,杀贼,革命实践,方法'],
  ['方法', '第七十三个让统计回到悲剧', '006', 187, '第七十三烈士,统计,悲剧,方法'],
  ['政治', '建国百年遮住亡国事实', '007', 3, '中华民国,亡国,忠烈祠,政治'],
  ['文化', '假烈士衬托真烈士', '007', 111, '忠烈祠,假烈士,文化'],
  ['人格', '苟且偷生也可转成反抗', '007', 165, '李师科,苟且偷生,反抗,人格'],
  ['人格', '苦撑待变不是永远忍耐', '007', 166, '苦撑待变,忍耐,行动,人格'],
  ['法权', '迟来的正义仍有意义', '007', 170, '迟来正义,蒋介石,假历史,法权'],
  ['写作', '历史剧要以兴亡为主题', '007', 193, '桃花扇,历史剧,写作'],
  ['文化', '假先烈让七十二有句号', '007', 215, '假先烈,七十二烈士,忠烈祠,文化'],
  ['方法', '非先烈也能衬出先烈', '007', 226, '非先烈,现身说法,方法'],
  ['人格', '长寿才能等到清白', '007', 255, '长寿,清白,岳飞,人格'],
  ['人格', '欣赏反抗也是一种脱身', '007', 290, '李师科,反抗,小人物,人格'],
  ['政治', '爱中国不等于爱中华民国', '007', 292, '李师科,中国,中华民国,政治'],
  ['政治', '中华民国早已亡国', '007', 294, '中华民国,亡国,国民党,政治'],
  ['方法', '七十二是逗点七十三是句号', '007', 308, '七十二烈士,第七十三烈士,方法'],
  ['写作', '模特儿要经过戏剧化', '008', 6, '王宇,模特儿,戏剧化,写作'],
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
    '- 分类策略：沿用 8 个原子分类；本书主要进入政治、法权、人格、文化和方法。',
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
    '- 收入：革命目的、革命被偷走、中华民国亡国论、忠烈祠与名器、纪念虚礼、老兵被国家裹胁、法律与正义、李师科作为第七十三烈士、历史剧写法等可独立检索的思想段落。',
    '- 暂不收入：纯情节推进、身份悬念、人物插科打诨、重复铺陈和只服务戏剧情绪的短句。',
    '- 涉及军中乐园和身体剥削的材料，本轮只保留政治、法权或人格判断明确的段落；过度露骨的场面描写不收。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 后续校对重点',
    '',
    '- 检查“政治”和“法权”的边界：革命合法性、政府暴力和法律正义是否归类一致。',
    '- 检查“忠烈祠”相关条目是否过密，校对轮可压缩“名器、假先烈、纪念虚礼”之间的重复。',
    '- 检查李师科相关条目是否需要合并，尤其是“老兵代表性、个人梦、道德动机、第七十三烈士定位”。',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

fs.mkdirSync(outputDir, { recursive: true });

const used = new Set();
const records = entries.map(([category, title, prefix, paragraphNumber, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const key = `${prefix}:${paragraphNumber}`;
  if (used.has(key)) {
    throw new Error(`Duplicate source paragraph: ${key}`);
  }
  used.add(key);

  const sourceFile = sourceFileByPrefix(prefix);
  const sourcePath = path.join(sourceDir, sourceFile);
  const sourceParagraphs = paragraphs(sourcePath);
  const description = sourceParagraphs[paragraphNumber - 1];

  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  return {
    id: `LAT036-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title,
    description,
    source_file: sourceFile,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, sourcePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  category_counts: categoryCounts(records),
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

console.log(`Built ${records.length} records for ${book.title}.`);
console.table(categoryCounts(records));
