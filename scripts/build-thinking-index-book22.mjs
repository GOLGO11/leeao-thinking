import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('007.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '022.我是天安门');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '022',
  title: '我是天安门',
  slug: 'wo-shi-tiananmen',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《我是天安门》40篇正文中提取可独立检索的思想段落，重点收香港体用与民主试验、天安门历史重复、共产制度批判、中国贫穷与人权、西藏与神权、人权双重标准等主题；新闻铺垫、笑话段和重复例证未机械收录。',
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
  ['方法', '体用不能倒置', '001', 32, '香港,体用,经济特区,西学'],
  ['法权', '香港繁荣靠制度柱石', '001', 33, '香港,自由,民主,宪政,法治'],
  ['法权', '自由人权高于政权家奴', '001', 35, '香港,自由,人权,亡国奴,家奴'],
  ['政治', '香港反照中国真国耻', '001', 38, '香港,国耻,帝国主义,统治能力'],
  ['政治', '香港应做民主试验特区', '001', 42, '香港,民主试验,港人治港,中国前途'],
  ['方法', '留小地做近程试验', '001', 44, '香港,试验,统一,一分为二'],
  ['政治', '帝国主义是强权老毛病', '002', 2, '帝国主义,强权,民族,和平'],
  ['政治', '帝国主义常被当替罪羊', '002', 5, '国民党,帝国主义,替罪羊,口号'],
  ['方法', '怪帝国主义容易逃避自省', '002', 9, '帝国主义,自省,责任,鸦片'],
  ['方法', '反外来膨胀先求自身膨胀', '002', 22, '帝国主义,膨胀,责任,蒋廷黻'],
  ['法权', '租界也可能带来言论自由', '002', 26, '租界,言论自由,出版法,法治'],
  ['法权', '中国缺人权法治人道', '002', 28, '人权,人道,法治,公平'],
  ['政治', '殖民下限胜过大国民水平', '002', 29, '殖民,大国民,香港,爱国'],
  ['政治', '领土光荣还要人民活得更好', '002', 34, '领土,人民,帝国主义,李鸿章'],
  ['政治', '国民党香港立场前后矛盾', '003', 34, '香港,国民党,主权,历史'],
  ['知识', '宪草史实不可乱引', '004', 3, '五五宪草,史实,周恩来,董必武'],
  ['政治', '国共主义国号有同源荒谬', '004', 5, '国共,中华民国,三民主义,共产主义'],
  ['方法', '中国政局不是谁打倒谁', '005', 8, '天安门,中国政局,历史,兴亡'],
  ['政治', '天安门历史会重演', '005', 13, '天安门,三一八,六四,历史重复'],
  ['政治', '抗议者会变开枪者', '005', 15, '抗议者,开枪者,历史,中国人民'],
  ['方法', '后人哀而不鉴必复哀', '005', 16, '历史鉴戒,天安门,循环,改朝换代'],
  ['政治', '共产主义理想抵不过人性', '006', 4, '共产主义,马克思,人性,圣人'],
  ['法权', '制度不好会让好人走反面', '006', 5, '制度,政治体制,邓小平,天安门'],
  ['方法', '国家大事不可感情用事', '007', 6, '感情用事,国家大事,冷静,中国问题'],
  ['方法', '人道标准不能只看新痛', '007', 8, '人道标准,中共记录,六四,历史'],
  ['方法', '乐观悲观都不可情绪化', '007', 9, '乐观,悲观,感情用事,政治判断'],
  ['政治', '学运也可成为政争工具', '008', 8, '学生干政,学运,统一战线,政争'],
  ['方法', '学生干政要有限度', '008', 10, '学生干政,限度,学运,招祸'],
  ['政治', '政治需要会使革命走火入魔', '009', 6, '法国大革命,政治需要,法理,人道'],
  ['政治', '革命民主也可能成暴民政治', '009', 7, '法国大革命,暴民,国会,民主'],
  ['政治', '中国革命路还很长', '009', 10, '法国大革命,中国革命,邓小平,长路'],
  ['知识', '知识分子不应忽热忽冷', '010', 7, '唐德刚,知识分子,史识,感情用事'],
  ['方法', '实事求是就是务得事实', '011', 4, '实事求是,事实,结论,方法'],
  ['方法', '功过都要从事实出发', '011', 8, '实事求是,功过,赵紫阳,事实'],
  ['人格', '功劳不该因罪过被抹杀', '011', 12, '唐太宗,侯君集,功劳,实事求是'],
  ['知识', '贫穷不能全归罪共产制度', '012', 6, '贫穷,共产制度,历史,没裤子'],
  ['政治', '强国代价要双面看', '012', 7, '强国,核子弹,贫穷,亡国奴'],
  ['政治', '小岛也该有大陆胸襟', '014', 2, '台湾独立,拿破仑,科西嘉,大陆胸襟'],
  ['政治', '地方主义可转向统一野心', '014', 6, '毛泽东,湖南独立,统一,地方主义'],
  ['政治', '独立口号可能只是政治赌博', '014', 7, '台独,湘独,政治口号,赌博'],
  ['方法', '中国可从分处下手', '015', 8, '毛泽东,湖南独立,分处,小中国'],
  ['知识', '湘独论与台独论似曾相识', '015', 15, '湖南独立,台湾独立,自决,历史'],
  ['方法', '理论必须接上实际运动', '015', 17, '理论,运动,湖南自治,实践'],
  ['政治', '打天下不同于治天下', '016', 3, '打天下,治天下,刘邦,陆贾'],
  ['方法', '三七开会变成作恶弹性', '016', 5, '毛泽东,三七开,错误,弹性'],
  ['政治', '革命家不必配治天下', '016', 6, '毛泽东,革命家,治天下,刘邦'],
  ['政治', '革命成功会滑向个人独裁', '017', 9, '共产党,个人独裁,制度,马克思'],
  ['政治', '帝王式共产主义更可怕', '017', 10, '毛泽东,帝王,共产主义,暴君'],
  ['方法', '救亡图存常目的热方法盲', '017', 14, '救亡图存,目的热,方法盲,义和团'],
  ['法权', '独裁离不开官僚恶政', '017', 17, '陈独秀,独裁,官僚政治,民主'],
  ['知识', '陈独秀始终回到英美民主', '017', 19, '陈独秀,英美民主,最后见解,五四'],
  ['方法', '知识分子带路也会方法盲', '017', 23, '知识分子,方法盲,胡适,主义'],
  ['法权', '中国忘了试验真正民主', '017', 26, '美式民主,基本人权,中国试验,法权'],
  ['政治', '反帝赢了比赛可能输了', '017', 27, '反帝,共产主义,资本主义,基本人权'],
  ['方法', '毛泽东功罪要分开看', '017', 28, '毛泽东,功罪,打天下,治天下'],
  ['人格', '共产党人情不该是亲友做官', '019', 17, '毛岸英,人情,亲友做官,原则'],
  ['法权', '没制度制衡主义难防腐化', '019', 31, '权力,制度,制衡,腐化'],
  ['政治', '革命会造成骨肉离散', '020', 10, '革命,骨肉,毛泽东,家庭'],
  ['文化', '牺牲信仰会走火入魔', '021', 2, '牺牲,集体狂热,宗教,强制'],
  ['政治', '牺牲下一代是可怕宗教', '021', 5, '共产主义,牺牲,下一代,目的热'],
  ['人格', '哪一代都不是蚂蚁', '021', 6, '牺牲,个人价值,蚂蚁,国民党'],
  ['知识', '历史写作要反复查证', '022', 5, '长征,历史写作,采访,事实'],
  ['政治', '长征意义要看革命成功以后', '022', 9, '长征,革命成功,迫害,历史意义'],
  ['政治', '长征可反观共产宗教', '023', 8, '长征,共产宗教,思想反共,理想'],
  ['方法', '欲取先予是政治哲学', '024', 3, '欲取先予,政治哲学,假道灭虢,权术'],
  ['方法', '政治忍让可以等待气候', '024', 5, '布列斯特和约,列宁,忍让,时机'],
  ['政治', '强者也需要喘息时间', '024', 6, '钓鱼岛,中国大陆,实力,喘息'],
  ['政治', '护土要靠真实实力', '025', 7, '保钓,实力,武力,民气'],
  ['方法', '真正有实力者也要择时', '025', 8, '保钓,改革开放,时机,实力'],
  ['政治', '中国问题先解决贫穷', '026', 10, '中国问题,贫穷,长远眼光,根本'],
  ['知识', '中国贫穷让试验缺基础', '026', 13, '贫穷,资本,中华民国,试验'],
  ['政治', '救贫比自由民主更急', '026', 16, '贫穷,自由民主,救死,救贫'],
  ['方法', '自由民主要以衣食为前提', '026', 18, '自由民主,衣食,仓廪实,前提'],
  ['方法', '自由民主不能求近功', '026', 20, '自由民主,长程,孙中山,法国大革命'],
  ['方法', '仓廪实则知自由民主', '026', 23, '贫穷,自由民主,长远,中国步骤'],
  ['政治', '中国问题是不挨打不挨饿', '026', 24, '中国问题,挨打,挨饿,长远'],
  ['方法', '指控伪善必须举证', '027', 4, '美国,人权,举证,宣传'],
  ['法权', '人权制度也在演进', '027', 9, '美国,人权,演进,集会自由'],
  ['方法', '人权批评要理解民众生活', '027', 10, '人权,民众生活,美国,伪善'],
  ['文化', '旧势力根深蒂固', '028', 7, '婚姻,迷信,帮派,旧势力'],
  ['法权', '生存权是人口大国首要人权', '030', 4, '生存权,人权,十一亿人口,中国'],
  ['知识', '外交友好也要历史平衡', '032', 4, '中苏关系,苏联,帝国主义,历史'],
  ['文化', '政权挡不住生活欲望', '033', 7, '化妆品,资本主义,生活欲望,妇女'],
  ['知识', '知识分子不能说假话', '034', 6, '知识分子,费孝通,真话,假话'],
  ['方法', '非暴力也可能只是打不过', '035', 12, '达赖,非暴力,西藏,策略'],
  ['文化', '同情神权不等于自由解放', '035', 16, '西藏,神权,自由,解放'],
  ['政治', '中央统治可比神权统治进步', '035', 22, '西藏,中央政府,神权统治,进步'],
  ['法权', '恢复旧西藏不是恢复人权', '039', 14, '达赖,西藏,人权,农奴'],
  ['政治', '极权崩溃常靠窝里反', '040', 11, '叶利钦,共产党,极权,窝里反'],
];

const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith('.txt'))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }));
const sourceCache = new Map();

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function resolveSourceFile(sourceKey) {
  const file = sourceFiles.find((name) => name.startsWith(`${sourceKey}.`));
  if (!file) {
    throw new Error(`Missing source file for key: ${sourceKey}`);
  }
  return file;
}

function readSource(sourceFile) {
  if (!sourceCache.has(sourceFile)) {
    sourceCache.set(sourceFile, decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile))));
  }
  return sourceCache.get(sourceFile);
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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
    '- 说明：标题为索引用浓缩标题；description 保留源文本原文段落。',
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

function writeNote(filePath, records) {
  const categoryLines = taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0)
    .map((item) => `- ${item.category}：${item.count}`);

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    `- 源目录：${book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本轮只收可独立检索的思想判断、方法判断、制度判断和历史解释段，不按篇目平均分配。',
    '- 纯新闻铺垫、长篇资料转引、短笑话、重复例证和附录推广文字不单独收录。',
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
if (records.length !== 89) {
  throw new Error(`Expected 89 records, got ${records.length}`);
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
