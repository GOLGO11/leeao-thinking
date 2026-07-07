import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 81;
const bookTitle = '李敖笑傲江湖';
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
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('001.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'leeao-xiaoao-jianghu',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖笑傲江湖》一百五十个节目录稿文件中提取思想索引。取舍上以每集一条可独立检索的主判断为主，保留政治批判、法权论述、知识方法、人格标准、文化判断、写作观与情爱观等段落；纯串场、来宾发言、节目宣传、资料铺陈和缺少李敖判断的段落不直接转为思想索引。标题可浓缩，description 保留源文本原段落。',
};

const candidates = [
  ['001.', 24, '方法', '揭发真相要听双方证据'],
  ['002.', 7, '情爱', '该锁的是头部不是阴部'],
  ['003.', 21, '政治', '台湾发财后应援助大陆'],
  ['004.', 14, '政治', '私生遮丑不该杀人'],
  ['005.', 15, '政治', '不了解大陆疾苦会误判中国'],
  ['006.', 21, '文化', '三国可看破正统观念'],
  ['007.', 8, '政治', '权力争夺不能简单分好坏'],
  ['008.', 12, '方法', '标点错误暴露不懂易经'],
  ['009.', 20, '政治', '对日本应以直报怨'],
  ['010.', 6, '政治', '钱学森反美是国家立场'],
  ['011.', 20, '人格', '脱离国民党是人格起点'],
  ['012.', 17, '文化', '和尚欲望并不最少'],
  ['013.', 7, '知识', '语言限制也能改变制度'],
  ['014.', 15, '人格', '挫折后要准备第二次战斗'],
  ['015.', 22, '文化', '教育改革不能缺人格教育'],
  ['016.', 17, '法权', '法官心态仍残留威权'],
  ['017.', 13, '写作', '文章不能逃避现实疾苦'],
  ['018.', 26, '法权', '言论自由要一案一案争取'],
  ['019.', 8, '写作', '拍马屁不该牵扯别人'],
  ['020.', 6, '人格', '坐牢改变生活取舍'],
  ['021.', 14, '政治', '党报宣传已经阳痿'],
  ['022.', 3, '政治', '泛政治说掩盖政治责任'],
  ['023.', 3, '文化', '政治解严后思想仍戒严'],
  ['024.', 23, '政治', '务实外交买不到尊严'],
  ['025.', 7, '政治', '反共政工也会两头无耻'],
  ['026.', 19, '法权', '出版法违宪还被扩张'],
  ['027.', 24, '文化', '教科书动词暴露媚日史观'],
  ['028.', 11, '文化', '台湾人不该被乱分族群'],
  ['029.', 31, '人格', '办事不必悲情叹气'],
  ['030.', 19, '法权', '监察院不能只打低阶苍蝇'],
  ['031.', 13, '政治', '省政府迁金门是意淫大陆'],
  ['032.', 30, '法权', '刁民也能依法较真'],
  ['033.', 20, '政治', '候选人各有致命缺陷'],
  ['034.', 3, '政治', '国民党百年历史是骗局'],
  ['035.', 27, '方法', '查调查局要讲证据'],
  ['036.', 23, '文化', '粗话也有语言功能'],
  ['037.', 14, '政治', '主权问题不能选择性动武'],
  ['038.', 7, '政治', '新闻教育藏着政工遗毒'],
  ['039.', 26, '政治', '反共政工后来也去大陆'],
  ['040.', 23, '方法', '看照片要能分析细节'],
  ['041.', 5, '人格', '李登辉是外来政权执行者'],
  ['042.', 9, '人格', '不要求诚信证明社会有病'],
  ['043.', 6, '政治', '廉价豪宅暴露权力特权'],
  ['044.', 13, '政治', '李登辉学蒋介石更退步'],
  ['045.', 12, '法权', '言论自由靠更多自由医治'],
  ['046.', 14, '法权', '监察院长可推动弹劾'],
  ['047.', 4, '政治', '总统也可能是共产党叛徒'],
  ['048.', 17, '法权', '民主最终目的在法治'],
  ['049.', 21, '政治', '直选暴君仍会没有民主'],
  ['050.', 11, '方法', '政治人物说过的话要认账'],
  ['051.', 3, '政治', '改革承诺会变连任借口'],
  ['052.', 17, '政治', '修宪扩权像袁世凯'],
  ['053.', 5, '方法', '联合政府说法要合史实'],
  ['054.', 25, '政治', '民进党支持助长李登辉'],
  ['055.', 19, '政治', '台独口号不能解决台湾问题'],
  ['056.', 22, '政治', '上帝话术不能遮盖颠倒黑白'],
  ['057.', 8, '政治', '精省可被曲线变废省'],
  ['058.', 4, '人格', '爱国家应胜于爱党'],
  ['059.', 23, '人格', '义助柏杨也要分清真相'],
  ['060.', 25, '方法', '凭记忆批评非常危险'],
  ['061.', 6, '法权', '公布法官名字也是监督'],
  ['062.', 7, '法权', '高位法官也可能是酷吏'],
  ['063.', 9, '政治', '务实外交闯祸还装成功'],
  ['064.', 18, '法权', '白色恐怖不容自由民主炫耀'],
  ['065.', 24, '人格', '不合作主义保持独立'],
  ['066.', 3, '法权', '旧官司暴露司法黑暗'],
  ['067.', 13, '法权', '大公司到台湾也会失责'],
  ['068.', 14, '写作', '贴左派标签可抹杀批评'],
  ['069.', 8, '知识', '红豆词要从文本读'],
  ['070.', 7, '情爱', '坐牢也有身体欲望问题'],
  ['071.', 7, '人格', '厚道不能毁人前途'],
  ['072.', 16, '政治', '蒋经国也曾是共产党'],
  ['073.', 18, '写作', '黄色笑话也可用来骂政治'],
  ['074.', 13, '政治', '孙中山也曾制造两个中国'],
  ['075.', 8, '政治', '陈炯明被苏联武器打垮'],
  ['076.', 13, '人格', '刚直人物也可能有盲点'],
  ['077.', 3, '政治', '国民党再造只是换汤不换药'],
  ['078.', 24, '政治', '历史不能拿来做政治斗争'],
  ['079.', 6, '法权', '新闻自由是根本问题'],
  ['080.', 4, '政治', '警备总部副司令害人很多'],
  ['081.', 8, '政治', '汉贼不两立不能忘王业不偏安'],
  ['082.', 3, '方法', '求知要有基本态度'],
  ['083.', 8, '方法', '自传回忆录常有假书'],
  ['084.', 26, '法权', '不了解监狱就改革不了监狱'],
  ['085.', 16, '法权', '长期囚禁会改变人的生存状态'],
  ['086.', 13, '政治', '蒋介石承诺可不签字'],
  ['087.', 5, '方法', '西安事变史不能照教科书'],
  ['088.', 17, '方法', '张学良明史专家说不可信'],
  ['089.', 12, '政治', '政治分合若无原则便可笑'],
  ['090.', 19, '人格', '为国民争人格不是口号'],
  ['091.', 4, '方法', '宣传会扭曲历史真相'],
  ['092.', 7, '知识', '知识分子曾能影响政治'],
  ['093.', 14, '方法', '揭发真相也要辨别动机'],
  ['094.', 4, '文化', '国民党污染思想和文学'],
  ['095.', 23, '政治', '蒋氏虐政不能被遗忘'],
  ['096.', 23, '文化', '教材无趣会扼杀主动学习'],
  ['097.', 23, '人格', '道德标准不能随党变色'],
  ['098.', 14, '法权', '法院会配合政治大员'],
  ['099.', 18, '人格', '第一流知识分子难改国民党'],
  ['100.', 10, '政治', '务实外交口号头脑不清'],
  ['101.', 13, '法权', '律师必须忠实搜求证据'],
  ['102.', 19, '文化', '改嫁后合葬暴露中西观念差异'],
  ['103.', 24, '人格', '入党以后难谈独立清望'],
  ['104.', 7, '人格', '自己人不敢鞭蒋氏父子'],
  ['105.', 3, '法权', '软禁也是一种关押'],
  ['106.', 16, '方法', '原件拿不出就是证据问题'],
  ['107.', 18, '法权', '报禁靠执照垄断言论'],
  ['108.', 12, '政治', '蒋介石并非伟大政治家'],
  ['109.', 17, '情爱', '胡适新文化反对处女情结'],
  ['110.', 8, '政治', '国际政治黑暗处处可见'],
  ['111.', 7, '政治', '国民党党史会消灭汪精卫'],
  ['112.', 6, '知识', '也字原是女人阴部'],
  ['113.', 8, '知识', '不可知论反对有无武断'],
  ['114.', 3, '方法', '回忆录不实要及时反驳'],
  ['115.', 20, '人格', '像个男人就该自己负责'],
  ['116.', 4, '方法', '李敖方法是证据怀疑解释'],
  ['117.', 6, '方法', '秦孝仪变造史料须举证'],
  ['118.', 7, '方法', '辞典条目也会美化杀人'],
  ['119.', 23, '政治', '自己老婆都移不走还想移蒋陵'],
  ['120.', 23, '政治', '战败不能归咎马歇尔'],
  ['121.', 22, '政治', '陈布雷尸谏不能替蒋开脱'],
  ['122.', 9, '政治', '淮海战役是决定性战役'],
  ['123.', 10, '法权', '俘虏自由后反被国民党拒绝'],
  ['124.', 20, '知识', '日常历史到处可见'],
  ['125.', 9, '写作', '语言高明来自妙喻'],
  ['126.', 7, '文化', '中正纪念堂假宫殿不如真宫殿'],
  ['127.', 18, '情爱', '神父和尚都受男女问题困扰'],
  ['128.', 8, '方法', '炒陈饭是用历史理解现在'],
  ['129.', 9, '文化', '台大校长不一定会办大学'],
  ['130.', 7, '文化', '台湾误解民主源于思想闭塞'],
  ['131.', 7, '政治', '立委慰问西藏不如关注台湾苦难'],
  ['132.', 15, '文化', '演艺人员靠掌声生存'],
  ['133.', 22, '人格', '恩怨分明背后仍有玩世心'],
  ['134.', 13, '法权', '坐过牢才懂司法和监狱内幕'],
  ['135.', 5, '法权', '洗脑也是政治犯出狱流程'],
  ['136.', 38, '政治', '共产党变节有觉悟和投降之别'],
  ['137.', 20, '政治', '特务系统秘密只是冰山一角'],
  ['138.', 29, '政治', '真台独只有郑南榕'],
  ['139.', 9, '法权', '解严后仍想用警察法禁书'],
  ['140.', 19, '政治', '政工头子也会有所修正'],
  ['141.', 11, '写作', '章法命名可见学问'],
  ['142.', 12, '情爱', '性开放是自由的一部分'],
  ['143.', 14, '写作', '写作是细腻人生的一种'],
  ['144.', 13, '知识', '不出户也可知天下'],
  ['145.', 12, '方法', '目的层次不能替代方法层次'],
  ['146.', 3, '法权', '封锁名字也是迫害方式'],
  ['147.', 17, '法权', '进入联合国要先看国际法'],
  ['148.', 11, '写作', '台湾自由主义史被篡夺'],
  ['149.', 7, '人格', '道德标准塑造美国强大'],
  ['150.', 6, '法权', '网络力量比报纸更快更大'],
];

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/^\uFEFF/, '');
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
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"?!.,，。！？、：；（）()\s]+/g, '')
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
    if (record.book === bookTitle) continue;
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
  '- 以每个节目文件一条主索引为主，优先保留有明确判断、方法、价值标准或可复用概念的段落。',
  '- 跳过纯串场、纯叙事、纯资料、来宾发言和缺少李敖判断的段落；第 139 至 150 文件若与既有《李敖快意恩仇录》条目原文重复，自动跳过。',
  '- 标题用于检索和浓缩主题，description 保留源文本原段落，不改写。',
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
