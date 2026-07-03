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
  .find((name) => name.startsWith('002.'));
const sourceDir = path.join(rootDir, sourceRoot, fictionGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '032.上山·上山·爱');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '032',
  title: '上山·上山·爱',
  slug: 'shangshan-shangshan-ai',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从小说正文和作者后记中提取可独立检索的思想段落；因本书大量涉及爱情、欲望、肉体、灵肉关系和亲密关系判断，分类体系新增原子分类“情爱”。纯情节推进、单纯感官场面、人物动作铺陈不收；若段落主旨是宗教、政治、写作或文化判断，即使涉及男女情事，也仍归入对应原有分类。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['知识', '不合群教育也能自成知识', '002', 25, '休学,自由,知识,教育'],
  ['情爱', '艺术的爱与爱的艺术', '002', 54, '艺术,爱,女人,情爱'],
  ['政治', '查禁从书名开始', '002', 69, '蓝色魔鬼岛,查禁,蒋介石,政治'],
  ['人格', '异端只能靠自己走下去', '002', 70, '知识分子,异端,孤独,人格'],
  ['法权', '新闻法律受控则异己无望', '002', 71, '报纸,法院,诽谤,法权'],
  ['人格', '观念上可以不被关住', '002', 73, '牢狱,梭罗,观念,人格'],
  ['人格', '强者仍要表现自己', '002', 76, '隐士,战斗,个人,人格'],
  ['人格', '孤独培养浩然之气', '002', 77, '孤独,戴高乐,浩然之气,人格'],
  ['人格', '不要用坐牢火炼亲友', '002', 80, '坐牢,亲友,火炼,人格'],
  ['人格', '乱世道德要先打折扣', '002', 81, '乱世,道德,孤独,人格'],
  ['写作', '思想家的书房是写作工厂', '002', 165, '书房,研究,写作工厂,写作'],
  ['人格', '清洁整齐也是人格分数', '002', 166, '生活,清洁,品质,人格'],
  ['写作', '完美表达只有恰到好处', '002', 249, '文章,雕塑,绘画,写作'],
  ['情爱', '高水准美不止先天', '002', 255, '美人,才华,头脑,情爱'],
  ['方法', '金钱在极权中象征自由', '002', 360, '金钱,极权,自由,方法'],
  ['政治', '政治红灯可以闯', '002', 374, '革命,红灯,政府,政治'],
  ['方法', '命可以改造', '002', 407, '宿命,存在,造命,方法'],
  ['方法', '造命不是宿命', '002', 409, '造命,孔子,孟子,方法'],
  ['人格', '友谊要靠人格和公益', '002', 423, '友谊,人格,公益,人格'],
  ['人格', '行动入世而心灵出世', '002', 427, '孤独,隐士,入世,人格'],
  ['情爱', '爱应有深度不是广度', '002', 431, '爱,怜悯,博爱,情爱'],
  ['人格', '多数不是力量', '002', 433, '多数,群众,力量,人格'],
  ['知识', '知识分子的职守是真理', '002', 438, '知识分子,真理,职守,知识'],
  ['知识', '知识分子必须反对', '002', 442, '反对,知识分子,民主,知识'],
  ['情爱', '灵肉二分是现代失败', '002', 669, '灵肉,唯灵论,肉体,情爱'],
  ['情爱', '灵肉平等才懂爱情', '002', 685, '灵肉平等,爱情,肉体,情爱'],
  ['情爱', '欲先情后也可成爱', '002', 845, '欲,情,爱情,情爱'],
  ['情爱', '爱情是快乐的屈从', '002', 1216, '爱情,快乐,屈从,情爱'],
  ['情爱', '情圣重在内部作业', '002', 1275, '爱情,情圣,内部作业,情爱'],
  ['情爱', '纯灵与灵肉都是关系', '002', 1317, '精神恋爱,灵肉,关系,情爱'],
  ['情爱', '幻是真爱的根基', '002', 1339, '真幻,爱情,精神恋爱,情爱'],
  ['情爱', '青春可爱要有设限', '002', 1348, '青春,短暂,距离,情爱'],
  ['情爱', '先掐死爱情免被爱情掐死', '002', 1353, '爱情本质,短暂,情爱'],
  ['情爱', '女友标准必须精挑细选', '002', 1367, '女朋友,标准,来电,情爱'],
  ['法权', '著作权也有海盗史', '002', 1889, '著作权,盗印,法律,法权'],
  ['知识', '中国太难了解', '002', 1955, '中国,历史,知识分子,知识'],
  ['文化', '缠足暴露知识分子的失声', '002', 2178, '缠足,知识分子,文明,文化'],
  ['文化', '纯洁要在献出中彰显', '002', 2226, '纯洁,欢喜佛,文化'],
  ['文化', '观音献身仍是纯洁', '002', 2228, '观音,欢喜佛,纯洁,文化'],
  ['文化', '佛门也有以欲止欲', '002', 2244, '以欲止欲,观音,佛门,文化'],
  ['文化', '真理阻力不止昏君', '002', 2248, '观音,查禁,愚民,文化'],
  ['文化', '佛经理论和事实行为分裂', '002', 2252, '佛经,女人,好色,文化'],
  ['文化', '佛教用恐惧规训欲望', '002', 2262, '欲海回狂,女人,佛教,文化'],
  ['情爱', '太上忘情不是无情', '002', 2324, '太上忘情,爱情,洒脱,情爱'],
  ['情爱', '第一流爱情会提前结束', '002', 2378, '太上忘情,爱情,分手,情爱'],
  ['情爱', '够水准的女人不争胜', '002', 2434, '女人,争胜,水准,情爱'],
  ['情爱', '平等不该变成压人', '002', 2450, '新女性,平等,大女人主义,情爱'],
  ['情爱', '够水准女人有隐性条件', '002', 2454, '女人,柔美,深度,情爱'],
  ['情爱', '爱情不该掺进痛苦', '002', 2495, '爱情,快乐,两性,情爱'],
  ['写作', '真诗要讽时救病', '002', 2557, '诗,白居易,讽谕,写作'],
  ['情爱', '爱情移位不必悲剧化', '002', 2592, '爱情,生离死别,移位,情爱'],
  ['知识', '传奇未必都要追杀清楚', '002', 2594, '历史,传奇,求真,知识'],
  ['情爱', '用喜剧眼睛看悲剧', '002', 2596, '悲剧,喜剧,情爱'],
  ['政治', '荒谬罪名只须笑迎', '002', 2602, '罪名,政治犯,岳飞,政治'],
  ['情爱', '爱情有无得失皆可喜', '002', 2781, '爱情,孤独,过客,情爱'],
  ['情爱', '面对易散要一念之转', '002', 2783, '彩云易散,分手,情爱'],
  ['情爱', '爱情最高技巧是不走下坡', '002', 2785, '爱情,技巧,结束,情爱'],
  ['情爱', '爱情不该是等待的艺术', '002', 2792, '爱情,等待,洒脱,情爱'],
  ['情爱', '强者不让情人为打压流泪', '003', 8, '情人,强者,眼泪,情爱'],
  ['情爱', '一个人的夕阳不是夕阳', '003', 10, '夕阳,情人,自由,情爱'],
  ['情爱', '我们的哲学驱逐悲情', '003', 20, '回忆,笑容,哲学,情爱'],
  ['情爱', '情人本身才是礼物', '003', 22, '礼物,情人,心物合一,情爱'],
  ['人格', '大狱后眼泪回到理智', '003', 27, '大狱,眼泪,理智,人格'],
  ['知识', '历史要靠深刻对比有生命', '004', 13, '历史感,吉朋,知识'],
  ['政治', '两代陈璧君都有理想执着', '004', 17, '陈璧君,革命,理想,政治'],
  ['文化', '沧桑放到宇宙中才乐观', '004', 28, '中兴湖,中国,宇宙,文化'],
  ['情爱', '冻结美丽也是面对', '004', 33, '冻结,叶葇,陈璧君,情爱'],
  ['写作', '陪伴也可以是写作', '004', 70, '陪伴,模特儿,写作'],
  ['知识', '中间清场检讨人类历史', '004', 206, '历史,检讨,上帝,知识'],
  ['情爱', '爱情需要神秘含蓄', '004', 222, '爱情,秘密,含蓄,情爱'],
  ['人格', '自然教人活得积极', '004', 256, '自然,生命,积极,人格'],
  ['人格', '好人不能只独善其身', '004', 278, '好人,善行,实践,人格'],
  ['文化', '假宗教不是真佛教', '004', 281, '佛教,功德,智慧,文化'],
  ['文化', '菩萨是做事不是风凉话', '004', 291, '菩萨,地藏,做事,文化'],
  ['文化', '新兴宗教有爆炸性祸害', '004', 294, '新兴宗教,法轮功,文化'],
  ['文化', '现代科技加速迷信', '004', 297, '迷信,科技,台湾,文化'],
  ['写作', '哭哭啼啼不是强者文学', '004', 426, '伤痕文学,强者,写作'],
  ['人格', '坐牢靠精神力量', '004', 430, '坐牢,精神力量,人格'],
  ['情爱', '情色死亡也是死法想象', '004', 442, '殉情,高潮,死亡,情爱'],
  ['方法', '选择性视野处理缺陷美', '004', 457, '选择,视野,缺陷美,方法'],
  ['文化', '台湾文化是三重低质文化', '004', 512, '台湾文化,流民文化,文化'],
  ['政治', '台独停在口号层次', '004', 516, '台独,行动,政治'],
  ['人格', '视死如生也可出于天真', '004', 570, '生死,华滋华斯,人格'],
  ['情爱', '肉体展示处就是天堂', '004', 666, '肉体,天堂,情爱'],
  ['情爱', '灵肉关系不能轻言拆伙', '004', 693, '灵魂,肉体,灵肉,情爱'],
  ['文化', '天堂地狱是空中楼阁', '004', 700, '灵魂,天堂,地狱,文化'],
  ['人格', '面对衰老死亡要认真', '004', 722, '衰老,死亡,人格'],
  ['人格', '小岛中保持巨人自我', '004', 726, '自我,台湾,巨人,人格'],
  ['情爱', '坟中情人诉说情爱', '004', 743, 'Danny Boy,情人,坟墓,情爱'],
  ['情爱', '朦胧比真相更好', '004', 744, '真相,秘密,情爱'],
  ['情爱', '裸相也有自然庄严', '004', 787, '自然,庄严,情爱'],
  ['情爱', '死者眼中消亡的我是全部', '004', 802, '情人,死亡,相依,情爱'],
  ['法权', '不检即查以查禁代自由', '005', 4, '言论自由,查禁,法权'],
  ['法权', '一查永逸消灭连载', '005', 5, '查禁,连载,法权'],
  ['写作', '情色小说也可以反政府', '005', 10, '情色小说,反政府,写作'],
  ['写作', '脱了裤子谈思想', '005', 11, '思想,情色文学,写作'],
  ['写作', '清浊关键在激浊扬清', '005', 14, '色情,淫秽,小说,写作'],
  ['写作', '黄色定位会小看其危险性', '005', 16, '黄色小说,定位,危险性,写作'],
  ['写作', '黄色其外红色其中', '005', 17, '性,思想,小说,写作'],
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
    '- 分类策略：全局分类扩展为 8 个原子分类，新增“情爱”用于爱情、欲望、灵肉关系和亲密关系判断；纯情节与单纯感官场面不收。',
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
    '- 收入：情爱观、灵肉关系、爱情与分手方法、女性/男性关系判断、禁书与言论自由、宗教与迷信批判、知识分子职责、写作方法、自我与死亡态度等可独立检索的思想段落。',
    '- 暂不收入：纯情节推进、人物出场交代、场景铺陈、单纯感官描写、只有动作没有判断的段落。',
    '- 分类新增“情爱”，但涉及佛教、政治、法权、写作等主旨的段落仍归入原有分类，不因出现男女或肉体词汇而自动归入“情爱”。',
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

const sourceCache = new Map();
const records = entries.map(([category, title, sourceKey, paragraphNumber, keywords], index) => {
  const sourceFile = sourceFileByPrefix(sourceKey);
  const sourcePath = path.join(sourceDir, sourceFile);
  if (!sourceCache.has(sourcePath)) {
    sourceCache.set(sourcePath, paragraphs(sourcePath));
  }
  const sourceParagraphs = sourceCache.get(sourcePath);
  const description = sourceParagraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  return {
    id: `LAT032-${String(index + 1).padStart(3, '0')}`,
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

for (const [index, record] of records.entries()) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unexpected category at row ${index + 1}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title}: ${records.length} records.`);
