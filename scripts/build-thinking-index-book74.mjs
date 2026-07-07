import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 74;
const bookTitle = '中国性研究';
const round = '提取轮';
const status = '待校对';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('009.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('005.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name) || name === '《中国性研究》自序.txt');

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zhongguo-xing-yanjiu',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《中国性研究》的经典性文字考释、身体与器官文化、性禁忌批评、国民党性政治、军中乐园与雏妓制度、审查和法权问题中提取思想索引。description 保留源文本原段落；目录、日期、电子书页脚、纯引文、长篇条例新闻材料，以及刘峰松文章中没有李敖评论的转录段落不进入本轮。',
};

const candidates = [
  ['自序', 2, '情爱', '性研究要打开两性观念'],
  ['自序', 4, '文化', '经典曾公开书写性交'],
  ['自序', 10, '政治', '国民党统治下淫威泛滥'],
  ['自序', 11, '写作', '性命之学要开新境界'],

  ['001.', 7, '方法', '孔子与易的关系多属附会'],
  ['001.', 10, '方法', '易经本是卜筮手册'],
  ['001.', 11, '方法', '学易先要还原平易'],
  ['001.', 34, '情爱', '乾坤可作性象征读法'],
  ['001.', 52, '情爱', '咸卦可从性交姿势读'],
  ['001.', 59, '方法', '古文断句影响本义'],
  ['001.', 63, '方法', '读易要回到原文'],

  ['002.', 7, '情爱', '战国策公开记录性政治话语'],
  ['002.', 10, '法权', '禁邪说先要公开邪说'],

  ['003.', 2, '文化', '佛经中有贬女传统'],
  ['003.', 7, '情爱', '佛经也有称赞性交文字'],

  ['004.', 2, '文化', '礼义之邦也有生殖崇拜'],
  ['004.', 3, '文化', '生殖器文化会精致化'],
  ['004.', 9, '方法', '且字可从男性器官考释'],
  ['004.', 14, '文化', '祖先牌位含生殖象征'],

  ['005.', 2, '写作', '俗字俗语也是文学革命'],
  ['005.', 3, '写作', '活文字不必装斯文'],
  ['005.', 4, '写作', '雅俗判断常近于无知'],
  ['005.', 11, '方法', '俗字字源也须考证'],
  ['005.', 12, '写作', '通俗文字会更合现代'],

  ['006.', 3, '文化', '道德化诗经会扭曲本义'],
  ['006.', 4, '文化', '删诗说造成阅读迷障'],
  ['006.', 17, '方法', '古诗翻译不能抹去本义'],
  ['006.', 18, '方法', '译古词要保留原始力量'],
  ['006.', 21, '文化', '情诗也可进入外交话语'],

  ['007.', 13, '方法', '中医荒诞中也有观察'],
  ['007.', 15, '方法', '古代记录可被现代医学印证'],
  ['007.', 16, '方法', '旧病名也要精细分辨'],

  ['008.', 2, '文化', '相术避谈下部源于礼俗'],
  ['008.', 3, '文化', '身体征兆也进入中国文化'],
  ['008.', 4, '文化', '性器官相法值得注意'],
  ['008.', 7, '文化', '看中国文化可从下部始'],

  ['009.', 3, '文化', '犀角迷信来自壮阳想象'],
  ['009.', 4, '文化', '阳具象征害死犀牛'],
  ['009.', 6, '政治', '国民党权贵也卷入走私'],

  ['010.', 2, '文化', '中医底色多是巫术'],
  ['010.', 4, '方法', '现代生物学可破中医鬼话'],
  ['010.', 7, '文化', '官方中医话语也会荒唐'],
  ['010.', 8, '文化', '生克哲学支撑器官迷信'],
  ['010.', 15, '文化', '以动物器官补人是睾丸情结'],
  ['010.', 21, '文化', '还精补脑运动荒诞'],

  ['011.', 3, '写作', '作家批判要有深度风格'],
  ['011.', 6, '人格', '司马迁写史也写正义'],
  ['011.', 11, '法权', '赎刑宫刑要看法律背景'],
  ['011.', 13, '方法', '史论须以本人书信为证'],
  ['011.', 14, '方法', '历史背景可破文学误读'],

  ['012.', 3, '情爱', '器官可作大丈夫隐喻'],
  ['012.', 6, '情爱', '佛教根治淫欲先治心'],
  ['012.', 7, '文化', '佛教治性未必能解决问题'],

  ['013.', 5, '政治', '国民党卖国却诬人卖国'],

  ['014.', 7, '政治', '不合作才不被体制吞没'],
  ['014.', 8, '政治', '国民党开放的是吃剩骨头'],
  ['014.', 9, '政治', '露出生殖器是蔑视政治'],
  ['014.', 10, '政治', '国民党政治比性更脏'],
  ['014.', 16, '情爱', '美女也要同一阵线'],
  ['014.', 19, '写作', '禁俗字先要面对古典'],

  ['015.', 3, '政治', '官迷是中国政治病'],
  ['015.', 4, '政治', '台湾官迷来自殖民遗绪'],
  ['015.', 5, '政治', '国民党留下骨头供人争'],
  ['015.', 12, '政治', '孙悟空拒做未入流官'],
  ['015.', 13, '政治', '国民党开放小官无意义'],
  ['015.', 14, '政治', '台湾要拒绝官迷'],

  ['016.', 4, '文化', '太监多是被人割成'],
  ['016.', 5, '文化', '自我阉割可作国粹讽刺'],
  ['016.', 6, '知识', '阉人并非中国独有'],
  ['016.', 8, '情爱', '宗教压力会制造自我阉割'],
  ['016.', 15, '法权', '法院性别错误暴露司法腐败'],
  ['016.', 16, '法权', '司法能把男人判成女人'],

  ['017.', 16, '法权', '囚犯精液带来法律问题'],
  ['017.', 20, '法权', '囚犯传后也有中国先例'],
  ['017.', 21, '文化', '现代方法可服务古老心机'],
  ['017.', 25, '文化', '现代技术常配古代脑袋'],
  ['017.', 26, '文化', '西方工具可被野蛮使用'],
  ['017.', 28, '文化', '中国思想模式重在旧脑新器'],

  ['018.', 4, '知识', '狱政见闻有一手价值'],
  ['018.', 6, '方法', '细节之外要看思想模式'],

  ['019.', 2, '文化', '神是人照自己创造'],
  ['019.', 3, '文化', '神也有人的身体属性'],
  ['019.', 6, '文化', '神仙小便也是文化线索'],
  ['019.', 12, '文化', '天人合一也可落到厕所'],

  ['020.', 2, '方法', '历史贡献常在身后才显'],
  ['020.', 5, '人格', '自为赵诗才不随他人'],
  ['020.', 13, '写作', '历史诗要写得活泼'],

  ['021.', 5, '写作', '编辑删改会削弱语言力量'],
  ['021.', 8, '文化', '性禁忌毒害编辑判断'],
  ['021.', 9, '写作', '不敢命名会歪曲现实'],
  ['021.', 10, '文化', '反璞归真要冲破性禁忌'],
  ['021.', 12, '政治', '性因素会改变政治史'],
  ['021.', 13, '政治', '国民党权力也有器官串联'],
  ['021.', 17, '写作', '具体词汇比抽象套语有力'],

  ['022.', 2, '政治', '国民党集团有生殖器关系'],
  ['022.', 3, '政治', '关系有积极消极好处'],
  ['022.', 4, '政治', '性关系可换来轻判'],
  ['022.', 5, '政治', '关系远近决定庇护程度'],

  ['023.', 3, '政治', '打虎要抓大奸大恶'],
  ['023.', 4, '方法', '解决问题要抓首脑'],

  ['024.', 5, '方法', '也字也可从女阴考释'],
  ['024.', 6, '文化', '古文字能呈现身体意象'],
  ['024.', 9, '方法', '许慎未必错在也字'],
  ['024.', 10, '文化', '译名也显国民党无知'],

  ['025.', 2, '文化', '中国有阳具崇拜'],
  ['025.', 3, '情爱', '女阴崇拜同样存在'],
  ['025.', 6, '文化', '女阴也可成为攻击武器'],
  ['025.', 9, '文化', '阴防意象可作文化讽刺'],

  ['026.', 2, '文化', '中国阴毛文化用途更广'],
  ['026.', 3, '文化', '阴毛也入相术系统'],
  ['026.', 4, '文化', '阴毛也入医药系统'],

  ['027.', 10, '文化', '剃阴毛也成民间术数'],

  ['028.', 2, '写作', '历史写作不能没深度'],
  ['028.', 3, '方法', '批判要指出严重错误'],
  ['028.', 5, '方法', '历史判断要回到资治通鉴'],
  ['028.', 6, '情爱', '武则天乱伦说不能乱扣'],
  ['028.', 12, '写作', '坏史书会误导戏剧'],

  ['029.', 2, '方法', '制度借口不能替慈禧脱罪'],
  ['029.', 7, '方法', '复仇使命不能洗白罪恶'],
  ['029.', 8, '方法', '据说不是历史证据'],
  ['029.', 11, '方法', '三百年复仇说荒唐'],
  ['029.', 12, '写作', '无知写作会制造无知影像'],

  ['030.', 3, '文化', '清宫放出宫女也有制度差异'],
  ['030.', 9, '政治', '满清也会遮蔽血统政治'],

  ['031.', 2, '情爱', '两头大是婚姻现象'],
  ['031.', 5, '情爱', '娥皇女英也可作平妻先例'],
  ['031.', 14, '法权', '法律未必承认平妻名义'],
  ['031.', 15, '法权', '兼祧制度开平妻法路'],

  ['032.', 5, '情爱', '审美也受性选择影响'],
  ['032.', 7, '文化', '身体审美会随时代变'],

  ['033.', 4, '情爱', '性姿势也可谈女男平等'],
  ['033.', 10, '情爱', '女权也会进入性爱姿势'],
  ['033.', 14, '情爱', '性交姿势可重新设计'],
  ['033.', 19, '情爱', '两性公平要落到身体'],

  ['034.', 3, '法权', '乳房自由也受审查压制'],
  ['034.', 4, '情爱', '女性自由会推进到身体'],
  ['034.', 12, '法权', '露乳尺度也是自由问题'],

  ['036.', 5, '法权', '审查标准荒唐到三点'],
  ['036.', 6, '法权', '准露也是自由空间'],

  ['037.', 2, '写作', '岛上文章缺乏男性力量'],

  ['038.', 6, '情爱', '有奶不是做母亲唯一条件'],
  ['038.', 9, '情爱', '人工母亲不能教育孩子'],
  ['038.', 10, '情爱', '人母不必天然优于兽母'],

  ['039.', 7, '法权', '俞正燮有人权女权意识'],
  ['039.', 13, '法权', '反强迫守节是进步思想'],

  ['040.', 2, '方法', '钱穆解释难养有误'],
  ['040.', 3, '方法', '难养句不是专指男女'],
  ['040.', 7, '情爱', '男女关系常有利害计算'],
  ['040.', 8, '情爱', '理解人性不宜估计过高'],
  ['040.', 9, '情爱', '悲剧意识来自不高估人'],

  ['041.', 4, '方法', '尼采鞭子语是性心理'],
  ['041.', 5, '情爱', '鞭子也有伦理社会学'],
  ['041.', 7, '方法', '哲学家懂理论未必懂实践'],
  ['041.', 8, '情爱', '情场实践胜过哲学抽象'],

  ['042.', 7, '文化', '龟曾是神圣动物'],
  ['042.', 16, '方法', '中国动物知识也会错'],
  ['042.', 32, '方法', '王八解释多不可靠'],
  ['042.', 33, '法权', '戴绿帽恐惧有社会根源'],
  ['042.', 44, '法权', '法律比社会观念进步'],
  ['042.', 45, '法权', '现代法胜过古代法'],

  ['043.', 23, '情爱', '王八身份也会变成公开仪式'],
  ['043.', 24, '情爱', '戴绿帽焦虑可到离奇程度'],

  ['044.', 5, '方法', '林语堂误读古代营妓'],
  ['044.', 6, '文化', '真正营妓始于勾践'],
  ['044.', 7, '文化', '军市制度由马祖承继'],
  ['044.', 11, '政治', '宋代营妓制度严酷腐败'],
  ['044.', 20, '政治', '古代笑话成国民党德政'],

  ['045.', 6, '政治', '军中乐园是国民党制度发明'],
  ['045.', 23, '法权', '军中乐园有私刑惩罚'],
  ['045.', 24, '法权', '制度把女人变成人肉市场'],
  ['045.', 25, '政治', '主义国家难掩弱女苦难'],
  ['045.', 65, '政治', '制度为限制军人婚姻而设'],
  ['045.', 78, '政治', '国民党只管性欲不管爱情'],
  ['045.', 82, '政治', '性被允许爱情被禁止'],
  ['045.', 108, '政治', '军中乐园悲剧并非偶然'],
  ['045.', 120, '方法', '实地调查留下稀有材料'],
  ['045.', 227, '法权', '铁栏杆暴露失去自由'],
  ['045.', 256, '政治', '营妓所嵌入军队福利系统'],
  ['045.', 260, '情爱', '制度内爱情被迫让位金钱'],
  ['045.', 272, '情爱', '军中乐园访客各有目的'],
  ['045.', 274, '情爱', '制度也制造爱情麻烦'],
  ['045.', 310, '法权', '集体体检成制度化羞辱'],
  ['045.', 327, '情爱', '伪婚姻满足爱情需要'],
  ['045.', 333, '政治', '时间单位压缩出制度残酷'],
  ['045.', 335, '法权', '额外时间变成剥削规则'],

  ['046.', 2, '政治', '官方卫生制度会流于形式'],
  ['046.', 3, '政治', '私窑子反衬军中乐园剥削'],
  ['046.', 7, '情爱', '代写情书暴露军人情感需求'],

  ['047.', 12, '方法', '中国研究要听一手高人'],
  ['047.', 14, '政治', '国民党使妓女更痛苦'],

  ['048.', 115, '政治', '司法可服务政治迫害'],
  ['048.', 121, '法权', '政治犯被非法剥夺职业权'],
  ['048.', 122, '写作', '坐牢写作需要暗中运出'],
  ['048.', 139, '人格', '真朋友会让文章流传'],
  ['048.', 141, '写作', '政治犯文字应该真名出版'],
  ['048.', 148, '写作', '出版要守真名不删高稿费'],

  ['049.', 5, '人格', '长期关心妓女问题'],
  ['049.', 8, '写作', '写作要越过风花雪月'],
  ['049.', 12, '政治', '管理目标与技术都要检讨'],
  ['049.', 19, '法权', '公娼制度牺牲原则'],
  ['049.', 20, '法权', '废娼是人权运动'],
  ['049.', 21, '政治', '废娼九年仍未成功'],
  ['049.', 24, '政治', '废娼理想被制度背叛'],
  ['049.', 27, '政治', '国民党重复旧式办法'],
  ['049.', 29, '法权', '自愿名义会变警察押送'],
  ['049.', 31, '政治', '救妓不是训练就业这么简单'],
  ['049.', 40, '政治', '雏妓是结构性社会问题'],

  ['050.', 3, '法权', '私行为要看公共权利'],
  ['050.', 5, '情爱', '私性行为以无权势压迫为界'],
  ['050.', 6, '政治', '掌权者性行为会牵动政治'],
];

function resolveSourceFile(prefix) {
  if (prefix === '自序') {
    const sourceFile = sourceFiles.find((name) => name.includes('自序'));
    if (!sourceFile) throw new Error('Cannot find self-preface source file');
    return sourceFile;
  }

  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphsOf(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalizeText)
    .filter(Boolean);
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/^《中国性研究》/u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"!?.,，。！？、：；（）()\s]+/g, '')
    .slice(0, 18);
}

function makeKeywords(category, title, sourceFile) {
  return [...new Set([category, cleanKeyword(title), cleanKeyword(fileTitle(sourceFile))].filter(Boolean))].join(',');
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const seen = new Map();
  for (const record of master.records ?? []) {
    const normalized = normalizeText(record.description);
    if (normalized) seen.set(normalized, record.id);
  }
  return seen;
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

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

const existingDescriptions = loadExistingDescriptions();
const seenInBook = new Map();
const skippedDuplicates = [];
let nextRecordNumber = 1;

const records = candidates.flatMap(([sourceRef, paragraphNumber, category, title]) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceRef}:${paragraphNumber}`);
  }

  const sourceFile = resolveSourceFile(sourceRef);
  const paragraphs = sourceParagraphs(sourceFile);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  const normalized = normalizeText(description);
  const existingId = existingDescriptions.get(normalized);
  const inBookId = seenInBook.get(normalized);
  if (existingId || inBookId) {
    skippedDuplicates.push({
      sourceFile,
      paragraphNumber,
      title,
      duplicateOf: existingId ?? inBookId,
    });
    return [];
  }

  const id = `LAT${String(bookSeq).padStart(3, '0')}-${String(nextRecordNumber).padStart(3, '0')}`;
  nextRecordNumber += 1;
  seenInBook.set(normalized, id);

  return [
    {
      id,
      book: bookTitle,
      round,
      status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: paragraphNumber,
      source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(category, title, sourceFile),
    },
  ];
});

const outputBook = {
  ...book,
  record_count: records.length,
  candidate_count: candidates.length,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: categoryCounts(records),
};

const payload = {
  generated_at: new Date().toISOString(),
  book: outputBook,
  taxonomy,
  records,
  skipped_duplicates: skippedDuplicates,
};

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);

const markdown = [
  `# ${bookTitle}思想索引（提取轮）`,
  '',
  `- 书名：${bookTitle}`,
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 条目数：${records.length}`,
  `- 候选数：${candidates.length}`,
  `- 跳过重复：${skippedDuplicates.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 索引',
  '',
  ...records.map((record) =>
    [
      `### ${record.id} ${record.title}`,
      '',
      `- 分类：${record.category}`,
      `- 来源：${record.source_file}#${record.source_paragraph}`,
      '',
      record.description,
      '',
    ].join('\n'),
  ),
].join('\n');

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), markdown, 'utf8');
fs.writeFileSync(
  path.join(outputDir, '思想索引.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引.csv'), records);
fs.writeFileSync(
  path.join(outputDir, '思想索引.txt'),
  records
    .map((record) =>
      [
        `${record.id}｜${record.category}｜${record.title}`,
        `来源：${record.source_file}#${record.source_paragraph}`,
        record.description,
      ].join('\n'),
    )
    .join('\n\n'),
  'utf8',
);

const note = [
  `# ${bookTitle}提取说明`,
  '',
  `本轮从源目录 \`${sourceBookDir.replaceAll(path.sep, '/')}\` 提取。`,
  '',
  '取舍原则：',
  '',
  '- 保留可独立检索的经典性文字考释、身体文化、性禁忌批评、国民党性政治、营妓/雏妓制度、审查尺度、法律权利和写作出版判断。',
  '- 删除目录、日期、电子书页脚、纯引文、单纯新闻事实、长篇条例材料，以及刘峰松文章中没有李敖评论的转录段落。',
  '- 《国民党与营妓》只选制度判断、调查方法、权力结构和法权批评段落，不把规则清单或报道细节整体搬入索引。',
  '- 标题可浓缩，description 保留源文本原段落，不改写。',
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  `候选 ${candidates.length} 条，生成 ${records.length} 条，跳过重复 ${skippedDuplicates.length} 条。`,
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(`Built ${bookTitle}: ${records.length} records.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
if (skippedDuplicates.length) {
  console.log(`Skipped duplicates: ${skippedDuplicates.length}`);
}
