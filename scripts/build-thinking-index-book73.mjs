import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 73;
const bookTitle = '要把金针度与人';
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
  (name) => name.startsWith('004.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'yao-ba-jinzhen-du-yuren',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《要把金针度与人》的读书方法、古书处理、现代分类、版本观念、思想人物判断、政法文化批评和文学史判断中提取思想索引。description 保留源文本原段落；目录、纯书目题名、作者生平摘要、版本事实和不能独立承载思想的资料性段落不进入本轮。',
};

const candidates = [
  ['001.', 4, '方法', '读书之多也要转为方法'],
  ['001.', 6, '知识', '读书可编书嘉惠别人'],
  ['001.', 9, '方法', '集天下之书为一书'],
  ['001.', 11, '方法', '古书要活用才有金针'],
  ['001.', 14, '方法', '读书得间须先辨层次'],
  ['001.', 16, '方法', '读死书会变书呆子'],
  ['001.', 20, '写作', '拙劣著作该水葬'],
  ['001.', 23, '方法', '老学究与疑古派各有病'],
  ['001.', 25, '方法', '疑古不能一笔抹杀周礼'],
  ['001.', 31, '方法', '读古书要用现代新学问'],
  ['001.', 34, '方法', '工具书要有方法学标准'],
  ['001.', 37, '文化', '四部分类暴露思考混乱'],
  ['001.', 40, '文化', '整理传统要先深知传统'],

  ['002.', 2, '方法', '读书多靠习惯与方法'],
  ['002.', 3, '方法', '多读书不必做书呆'],
  ['002.', 4, '方法', '分尸读书是书为我用'],
  ['002.', 5, '方法', '好书才值得分尸'],

  ['003.', 9, '方法', '训诂也可实事求是'],
  ['003.', 14, '政治', '四库一边发扬一边摧残'],
  ['003.', 15, '政治', '禁毁书目是统一思想清册'],
  ['003.', 18, '政治', '张之洞也有求新求变面'],
  ['003.', 19, '政治', '中体西用是反动主流'],
  ['003.', 24, '方法', '读书要博而精且会辨伪'],
  ['003.', 28, '知识', '被挤出局的学问仍可翻案'],
  ['003.', 37, '知识', '大书要能见用'],
  ['003.', 42, '写作', '文心雕龙不是一般文学书'],
  ['003.', 47, '方法', '史学专书显示方法自觉'],
  ['003.', 51, '方法', '史学方法有枝叶发展'],
  ['003.', 52, '方法', '六经皆史推翻载道传统'],
  ['003.', 53, '方法', '学问要为实事不是空言'],
  ['003.', 56, '方法', '疑义分类才便于读古书'],
  ['003.', 65, '写作', '梁启超解放古文体裁'],

  ['004.', 4, '方法', '读老子要先破文字关'],
  ['004.', 5, '方法', '阐述老子要用现代方法'],
  ['004.', 6, '方法', '出土本可推翻旧校勘'],
  ['004.', 11, '文化', '论语不必抱读经态度'],
  ['004.', 14, '方法', '伪书也能保留思想线索'],
  ['004.', 19, '文化', '庄子思想主调在出世'],
  ['004.', 25, '文化', '荀子受冷落不公平'],
  ['004.', 26, '文化', '荀子集大成而有气魄'],
  ['004.', 29, '政治', '吕氏春秋是思想大统战'],
  ['004.', 32, '政治', '帝王政治有宫廷黑暗悲剧'],
  ['004.', 44, '法权', '反谶纬也反司法黑暗'],
  ['004.', 48, '方法', '王充脱离儒家一统'],
  ['004.', 49, '方法', '思想不必守传统绳墨'],
  ['004.', 50, '方法', '疑古论今要有实证锋芒'],
  ['004.', 53, '人格', '以人为重才反妖妄'],
  ['004.', 54, '政治', '思想锋芒可直指政治黑暗'],
  ['004.', 60, '方法', '人事为本天道为末'],
  ['004.', 65, '人格', '正义感要同情人民'],
  ['004.', 66, '文化', '开明思想须反迷信'],
  ['004.', 76, '人格', '民胞物与值得欣赏'],
  ['004.', 78, '政治', '反王安石暴露理学水平'],
  ['004.', 83, '文化', '反对天理人欲二分'],
  ['004.', 86, '方法', '六经注我是一种气魄'],
  ['004.', 91, '人格', '陈亮有英雄气魄'],
  ['004.', 93, '政治', '叶适有鹰派思想'],
  ['004.', 95, '方法', '道统捏造要被拆穿'],
  ['004.', 99, '方法', '刘基可贵在反迷信'],
  ['004.', 109, '方法', '知行合一是一种突破'],
  ['004.', 112, '方法', '王廷相以乖僻反迷信'],
  ['004.', 116, '政治', '何心隐案是异端迫害'],
  ['004.', 119, '人格', '思想自由有殉道气魄'],
  ['004.', 122, '人格', '顾炎武守不合作主义'],
  ['004.', 139, '文化', '颜元反程朱虚学'],
  ['004.', 144, '方法', '戴震有客观实学硬功夫'],
  ['004.', 145, '法权', '以理杀人是文化暴力'],
  ['004.', 166, '文化', '墨家救世比儒家动人'],
  ['004.', 170, '方法', '公孙龙代表逻辑方法'],

  ['005.', 6, '文化', '孟子影响中国人逻辑'],
  ['005.', 8, '政治', '义利辨不可抹掉民生乐利'],
  ['005.', 12, '政治', '董仲舒是统一思想罪人'],
  ['005.', 15, '政治', '道统自任容易抵排异端'],
  ['005.', 20, '方法', '朱熹整理经典不是科学研究'],
  ['005.', 21, '文化', '朱熹给头脑输入错路'],
  ['005.', 25, '文化', '神灭论反佛教迷信'],
  ['005.', 28, '文化', '慧能反形式而重精神'],
  ['005.', 31, '文化', '道教和老子思想扯不上'],
  ['005.', 33, '知识', '太平经可见民间思路'],
  ['005.', 44, '知识', '周易只是卜筮手册'],
  ['005.', 45, '方法', '十翼非孔子作已成定说'],
  ['005.', 48, '方法', '吕才反迷信少见'],
  ['005.', 53, '写作', '笔记文体可容纳广泛世界'],

  ['006.', 9, '方法', '管子作者问题须分辨'],
  ['006.', 13, '文化', '晏子书近墨家思想'],
  ['006.', 17, '政治', '慎到由道家入法家'],
  ['006.', 21, '政治', '术与法不可一无'],
  ['006.', 27, '政治', '商鞅变法罕见成功'],
  ['006.', 31, '政治', '外儒内法造成统治虚伪'],
  ['006.', 35, '政治', '青年才俊在政治中有瓶颈'],
  ['006.', 42, '法权', '废肉刑也可能名轻实杀'],
  ['006.', 51, '政治', '王安石不能一切不事事'],
  ['006.', 52, '政治', '王安石思想细密超出时代'],
  ['006.', 65, '政治', '邓牧反君主专制'],
  ['006.', 70, '政治', '黄宗羲忠于天下万民'],
  ['006.', 75, '政治', '唐甄直指帝王皆贼'],
  ['006.', 90, '政治', '富强本在议院教养技艺'],
  ['006.', 100, '方法', '兵学最高在达于道'],
  ['006.', 106, '法权', '出土秦律延伸法律史上限'],
  ['006.', 107, '政治', '秦简也是意识形态资料'],
  ['006.', 111, '法权', '唐律疏义是中国法系经典'],
  ['006.', 115, '政治', '好官不该只以不坏自夸'],
  ['006.', 116, '法权', '替百姓争人权才吃紧为人'],
  ['006.', 118, '法权', '法学须由法条印证实务'],
  ['006.', 122, '政治', '周礼是政制乌托邦'],
  ['006.', 124, '知识', '周礼仍有研究材料价值'],
  ['006.', 133, '政治', '李觏学问要经世致用'],
  ['006.', 138, '政治', '救荒书胜过理气空谈'],
  ['006.', 143, '政治', '洪亮吉能看见官逼民反'],
  ['006.', 156, '知识', '士大夫耻言财经是病'],
  ['006.', 157, '知识', '盐铁论可见财经思想水平'],

  ['007.', 3, '知识', '说文从论战变字典'],
  ['007.', 4, '知识', '文字学是溯源寻根'],
  ['007.', 14, '方法', '西文法可揭示中文义例'],
  ['007.', 15, '方法', '文法书显示现代语学自觉'],

  ['008.', 6, '方法', '周髀摆脱迷信污染'],
  ['008.', 13, '知识', '不必苛求古代科学玄学残留'],
  ['008.', 16, '知识', '沈括通才古无今罕'],
  ['008.', 22, '知识', '植物名实图考特开生面'],
  ['008.', 27, '知识', '相马经显示古人不马虎'],

  ['009.', 4, '人格', '反革命者也可有殉道'],
  ['009.', 12, '知识', '中国医学史有巫医底色'],
  ['009.', 14, '方法', '阴阳五行纠缠不合科学'],
  ['009.', 22, '知识', '天工开物是科技百科'],
  ['009.', 23, '文化', '科技实学挑战八股心性'],
  ['009.', 26, '方法', '实证农书要有准备'],
  ['009.', 28, '政治', '民生方法需要有心人实做'],

  ['010.', 3, '人格', '顾恺之坦率不谦虚'],
  ['010.', 18, '文化', '棋类也有文化来源差异'],
  ['010.', 19, '文化', '棋书被归兵类不是游艺'],
  ['010.', 20, '方法', '棋道可与兵法相合'],

  ['011.', 6, '写作', '赋的空架子害了文学'],
  ['011.', 25, '人格', '陶潜的价值在不合作'],
  ['011.', 43, '人格', '先天下忧影响知识分子'],
  ['011.', 48, '写作', '文章应明道致用'],
  ['011.', 55, '文化', '苏轼思想水准不必神化'],
  ['011.', 59, '人格', '慷慨赴义仍然伟大'],
  ['011.', 75, '写作', '袁宏道精神清新幽默'],
  ['011.', 108, '知识', '汪中耻为无用之学'],
  ['011.', 109, '方法', '破迷信也可带火气'],
  ['011.', 116, '法权', '女权人权可在旧学中前进'],
  ['011.', 119, '政治', '交涉要看理势'],
  ['011.', 121, '政治', '攘外误国早有预见'],
  ['011.', 125, '文化', '道德化诗经会曲解本来面目'],
  ['011.', 126, '文化', '追本来面目还要更远一步'],
  ['011.', 140, '人格', '曹操自许持平非吹牛'],
  ['011.', 155, '人格', '阮籍以喝酒不合作'],
  ['011.', 181, '政治', '陈子昂死于政治迫害'],
  ['011.', 182, '写作', '陈子昂才是起衰第一人'],
  ['011.', 191, '政治', '李白也反抗权贵'],
  ['011.', 195, '政治', '杜甫写人民苦难'],
  ['011.', 200, '写作', '诗应能救济人病'],
  ['011.', 217, '文化', '李商隐不只是女人诗'],
  ['011.', 226, '情爱', '女性再嫁不该被造谣'],
  ['011.', 241, '写作', '我手写我口是文体革命'],
  ['011.', 270, '政治', '桃花扇写政权私化亡国'],
  ['011.', 276, '政治', '水浒是抗议文学'],
  ['011.', 280, '文化', '小说会改变历史印象'],
  ['011.', 285, '文化', '西游记能写伪善与可爱'],
  ['011.', 294, '政治', '儒林外史悲悯社会黑暗'],
  ['011.', 299, '文化', '红楼梦写旧社会矛盾'],
  ['011.', 300, '文化', '红楼梦攻击道学八股'],
  ['011.', 305, '政治', '老残游记戳破黑暗伪善'],

  ['012.', 3, '方法', '左传史料可见古人样子'],
  ['012.', 6, '写作', '左传可读性高过春秋'],
  ['012.', 9, '方法', '春秋书法有褒贬力量'],
  ['012.', 10, '方法', '穿凿中仍可研究大道理'],
  ['012.', 13, '知识', '帛书文献价值空前'],
  ['012.', 19, '方法', '国语左传不可轻作同源'],
  ['012.', 28, '人格', '史记随处写正义'],
  ['012.', 29, '方法', '后代史家未必有直笔'],
  ['012.', 44, '方法', '通鉴有大功也难读'],
  ['012.', 49, '方法', '郑樵反辞章义理空谈'],
  ['012.', 50, '知识', '通志是集天下书为一书'],
  ['012.', 51, '方法', '二十略才是通志精华'],
  ['012.', 54, '方法', '清代综合受时代知识限制'],
  ['012.', 55, '政治', '王夫之历史观连着政治思想'],
  ['012.', 60, '方法', '赵翼用归纳法治史'],
  ['012.', 65, '方法', '崔述推翻古史神话'],
  ['012.', 67, '方法', '疑古不可墨守也不可空谈'],
  ['012.', 72, '写作', '世说新语贵在脱帽闲谈'],
  ['012.', 82, '知识', '容闳自传写西方文化入中国'],

  ['013.', 10, '方法', '凡书皆史关键在处理古书'],
  ['013.', 17, '方法', '古书难懂才需要现代处理'],
  ['013.', 23, '方法', '旧选本失败在文章挂帅'],
  ['013.', 25, '写作', '评文章必须先有标准'],
  ['013.', 26, '写作', '文章只有好坏问题'],
  ['013.', 27, '写作', '新文章标准在表达'],
  ['013.', 33, '写作', '文言文不是好表达工具'],
  ['013.', 34, '写作', '白话文接替文言文是大变局'],
  ['013.', 41, '方法', '内容笼统造成分类困难'],
  ['013.', 56, '方法', '旧书目无法现代分类'],
  ['013.', 58, '方法', '现代观点改变版本观念'],
  ['013.', 60, '方法', '现代处理古书要配合新知'],
  ['013.', 62, '知识', '出土古书带来新发现'],
  ['013.', 76, '方法', '处理古书要矫正四部分类'],
  ['013.', 78, '方法', '现代观点不能忽视读懂古书'],
  ['013.', 80, '方法', '古书处理要顾及现代读者能力'],
  ['013.', 83, '方法', '用现代观点处理中国名著'],
  ['013.', 85, '方法', '从古典中寻找新义'],
  ['013.', 91, '文化', '异类思想不该被压扁'],
  ['013.', 92, '方法', '分类现代化就是方法学'],
  ['013.', 94, '方法', '注释不当反而害读者'],
  ['013.', 95, '方法', '名著去取要有大刀阔斧'],
  ['013.', 97, '方法', '选书以精华为准'],
  ['013.', 98, '知识', '旧式装订已经落伍'],
  ['013.', 99, '知识', '配图要用新出土文献'],
];

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphsOf(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split(/\n+/)
    .map((line) => line.trim())
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
  '- 保留可独立检索的读书方法、目录分类、版本观念、古书处理、出土文献判断、思想史判断、政法批评、文学史判断和写作观。',
  '- 删除目录、纯书名、作者简历、版本事实、收藏信息、资料清单，以及只起过渡作用的说明句。',
  '- 书中大量条目是书目介绍；只有当段落包含李敖自己的判断、方法、取舍标准或思想评价时才进入本轮。',
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
