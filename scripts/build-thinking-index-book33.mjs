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
  .find((name) => name.startsWith('003.'));
const sourceDir = path.join(rootDir, sourceRoot, fictionGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '033.红色11');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '033',
  title: '红色11',
  slug: 'hongse-11',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从剧本正文与作者后记中提取可独立检索的思想段落；重点收白色恐怖、冤狱制造、刑求逼供、军事审判、政治犯经验、革命伦理、自由人格、共产主义与自由主义辨析、文学见证等材料。剧中人名单、舞台动作、纯剧情推进、口号式短对白、资源站广告不收；涉及男女关系的段落，只有主旨落在亲密关系本身时才归入“情爱”。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['法权', '办案以党国损失压倒无罪', '002', 27, '侦讯,无罪,党国,法权'],
  ['法权', '办案可以不靠证据', '002', 29, '证据,刑求,共产党,法权'],
  ['政治', '党国忠诚也会被机器吞噬', '002', 37, '国民党,政府,忠诚,政治'],
  ['法权', '疲劳审问先毁人格', '002', 43, '疲劳审问,刑求,人格羞辱,法权'],
  ['法权', '女性政治犯遭遇性化刑求', '002', 50, '女政治犯,刑求,特务,法权'],
  ['方法', '革命不能只靠左倾幼稚', '002', 67, '左倾幼稚病,革命,台湾,方法'],
  ['方法', '革命判断要看时间空间', '002', 69, '时间,空间,革命,方法'],
  ['法权', '坐牢是制度化互相折磨', '002', 71, '监狱,政治犯,折磨,法权'],
  ['政治', '共产主义的正义性最高', '002', 72, '共产主义,正义,主义,政治'],
  ['政治', '共产党尺度暴露正义缺席', '002', 73, '共产党,正义,军法,政治'],
  ['法权', '七岁儿童团也能成为罪证', '002', 76, '儿童团,军法庭,罪证,法权'],
  ['法权', '口供可以补造人生履历', '002', 78, '口供,调查局,伪造,法权'],
  ['方法', '黑牢也可转为人生历练', '002', 158, '塞翁哲学,管仲哲学,坐牢,方法'],
  ['人格', '不自由处也可守住自由', '002', 195, '梭罗,监狱,自由,人格'],
  ['人格', '自由会被不自由纠缠', '002', 199, '斯宾塞,自由,政治,人格'],
  ['法权', '抓不抓共产党都会制造冤狱', '002', 235, '武汉大旅社,冤狱,政治审判,法权'],
  ['法权', '证据会被案卷技术扭曲', '002', 239, '证据,针孔,调查局,法权'],
  ['法权', '刑求逼供还要逼人咬人', '002', 241, '刑求,口供,咬人,法权'],
  ['法权', '法官护政权不护人权', '002', 245, '法官,人权,正义,法权'],
  ['政治', '红帽可以反成党国罪证', '002', 298, '红帽,国民党,冤狱,政治'],
  ['法权', '欲加之罪总可找法律包装', '002', 302, '欲加之罪,政治问题,法律,法权'],
  ['法权', '罪名不是阶下囚能决定', '002', 315, '罪名,囚犯,伊索寓言,法权'],
  ['法权', '精神病也能被做成叛乱案', '002', 329, '叛乱案,精神病,军事法,法权'],
  ['法权', '法官能把时间证据扭歪', '002', 331, '法官,证据,判决,法权'],
  ['法权', '政治犯出狱还被保人制度拴住', '002', 344, '政治犯,保人,出狱,法权'],
  ['法权', '政治案辩护也会牵连律师', '002', 352, '律师,自由中国,辩护,法权'],
  ['法权', '被抓本身就是有罪证明', '002', 354, '国特逻辑,有罪,特务,法权'],
  ['政治', '领袖逻辑制造连坐', '002', 358, '蒋介石,连坐,国民党,政治'],
  ['法权', '刽子手的假日成了生机', '003', 19, '死刑犯,假日,法律,法权'],
  ['法权', '天子门生也不能依法判决', '003', 23, '李玉堂,判决,法律,法权'],
  ['方法', '监狱斗争有前后阶段', '003', 31, '监狱斗争学,共产党,方法'],
  ['政治', '诬人台独符合双方利益', '003', 40, '台独,特务,政治罪名,政治'],
  ['法权', '上诉会被当成抗拒政府', '003', 80, '上诉,加刑,政府,法权'],
  ['法权', '军法官以少杀自称有良心', '003', 84, '军法官,良心,死刑,法权'],
  ['法权', '地理课也可变成宣传罪', '003', 109, '为匪宣传,地理课,军法,法权'],
  ['政治', '追随政府反而失去普通自由', '003', 113, '政府,台湾,自由,政治'],
  ['政治', '最残暴未必最讨人厌', '003', 115, '政府,国民党,统治,政治'],
  ['法权', '政府不愁没法律整人', '003', 136, '政府,法律,法网,法权'],
  ['政治', '硬说你是共产党会逼人成真', '003', 155, '共产党,政府,政治身份,政治'],
  ['政治', '凡人做共产党有实践问题', '003', 179, '共产党,陈独秀,主义,政治'],
  ['政治', '自由主义连接资本与共产', '003', 183, '自由主义,资本主义,共产主义,政治'],
  ['法权', '迫害言论自由要换罪名', '003', 185, '言论自由,台独罪名,法权'],
  ['人格', '紧要关头的幽默也是反抗', '003', 187, '幽默,刑求,反抗,人格'],
  ['人格', '精神力量抵抗肉体背叛', '003', 189, '精神力量,抗衡,刑求,人格'],
  ['政治', '国民党会不断制造共产党', '003', 204, '国民党,制造共产党,政治'],
  ['政治', '从国民党这边入共产党更容易', '003', 206, '国民党,调查局,共产党,政治'],
  ['法权', '大法官让宪法变蝌蚪法律', '003', 218, '大法官,宪法解释,刑期,法权'],
  ['法权', '自首会招来新的罪名', '003', 230, '自首,自首不实,罪名,法权'],
  ['法权', '国特逻辑把党外推成叛徒', '003', 232, '国特逻辑,党外,叛徒,法权'],
  ['法权', '抱着六法全书也逃不过特务逻辑', '003', 234, '六法全书,特务,匪谍,法权'],
  ['法权', '一句万岁可以做成叛乱', '003', 273, '万岁,叛乱,证据,法权'],
  ['法权', '宗教标语也能变政治罪', '003', 283, '宗教,标语,政治罪,法权'],
  ['方法', '期中结账是为了调整未来', '003', 289, '审判,期中结账,未来,方法'],
  ['政治', '连三民主义也能读出反叛', '003', 359, '三民主义,民主,国民党,政治'],
  ['政治', '政府落实为具体统治人群', '003', 365, '政府,统治集团,国民党,政治'],
  ['方法', '善恶小事做与不做不同', '004', 29, '小善小恶,行动,方法'],
  ['政治', '假匪谍配额制造牺牲', '004', 33, '匪谍,配额,政治犯,政治'],
  ['政治', '缴匪谍是一种配额文化', '004', 35, '缴匪谍,配额,政治文化,政治'],
  ['法权', '酷吏岗位排斥软心肠', '004', 43, '酷吏,法官,判决,法权'],
  ['人格', '独善其身不是完整好人', '004', 111, '好人,独善其身,自由,人格'],
  ['方法', '改变未来不能只靠痛快', '004', 138, '仇恨,未来,变化,方法'],
  ['方法', '用一生尺度衡量牢狱时间', '004', 149, '时间,坐牢,人生尺度,方法'],
  ['人格', '观念胜利先于实际胜利', '004', 189, '正义,观念,实际,人格'],
  ['人格', '最坏准备逼近真正自由', '004', 221, '心理准备,自由,坐牢,人格'],
  ['人格', '志士仁人不以坐牢为苦', '004', 227, '志士仁人,监狱,磨练,人格'],
  ['政治', '岛上共产党有多种形态', '004', 268, '共产党,国民党,政治分类,政治'],
  ['政治', '牢饭也会制造饭票共产党', '004', 270, '饭票共产党,牢饭,政治'],
  ['人格', '人生阶段论化解坐牢处遇', '004', 288, '人生阶段论,坐牢,人格'],
  ['方法', '人生阶段论要成为习惯', '004', 290, '人生阶段论,习惯,知识,方法'],
  ['方法', '有为主义重在做过', '004', 296, '有为主义,无为主义,行动,方法'],
  ['人格', '军队和监狱训练男子汉', '004', 324, '军队,监狱,坚强,人格'],
  ['政治', '古典共产党以前仆后继为特色', '004', 334, '古典共产党,革命,政治'],
  ['方法', '摩登共产党不必照古典方法', '004', 336, '摩登共产党,方法,革命,方法'],
  ['文化', '道德也会生老病死', '004', 374, '道德,时代,文化'],
  ['法权', '领袖御批凌驾审判', '004', 428, '人权,判决,蒋介石,法权'],
  ['法权', '牢中看病也受制度折磨', '004', 432, '监狱,医疗,牙医,法权'],
  ['人格', '招供咬人也有不得已', '004', 449, '招供,咬人,坐牢,人格'],
  ['情爱', '革命与女友会发生冲突', '004', 463, '女朋友,共产主义,牺牲,情爱'],
  ['情爱', '爱人不该被推上革命前线', '004', 471, '美女,革命,家庭,情爱'],
  ['人格', '极限关头牺牲名誉救人', '004', 495, '牺牲,智慧,仁慈,人格'],
  ['政治', '共产主义道德性与可行性分层', '004', 497, '共产主义,道德,实行,政治'],
  ['政治', '崇高主义也要借现实手段', '004', 507, '共产主义,资本主义,现实手段,政治'],
  ['人格', '越过恶水的力量在心中', '004', 522, '桥,力量,心中,人格'],
  ['人格', '临刑仍要清醒从容', '005', 21, '临刑,清醒,尊严,人格'],
  ['政治', '人权牌有帝国双重标准', '006', 2, '美国,人权牌,白色恐怖,政治'],
  ['法权', '白色恐怖把人权摧残成统计', '006', 3, '白色恐怖,人权,蒋介石,法权'],
  ['写作', '写作见证不掠血泪', '006', 10, '写作取材,个案,血泪,写作'],
  ['人格', '正义之士不能不追问责任', '006', 7, '良知,正义之战,问责,人格'],
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
    '- 分类策略：沿用 8 个原子分类；本书以政治、法权、人格、方法为主，“情爱”只收革命与亲密关系冲突本身。',
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
    '- 收入：白色恐怖、冤狱制造、刑求逼供、军事审判、政治犯经验、坐牢方法、自由人格、革命伦理、共产主义与自由主义辨析、文学见证等可独立检索的思想段落。',
    '- 暂不收入：剧中人名单、舞台动作、纯剧情推进、资源站广告、只承担气氛或口号作用的短对白。',
    '- 剧本对白只在能够离开具体剧情、独立承载判断时收入；冤案叙事过密处优先保留最能概括制度逻辑的段落。',
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
