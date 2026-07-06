import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 71;
const bookTitle = '读史指南';
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
  (name) => name.startsWith('002.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'dushi-zhinan',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《读史指南》的四部备要与四部丛刊对照、《古今图书集成》研究、百科全书介绍和中国历史演义总说中提取思想索引。description 保留源文本原段落；纯书目表格、版本流水账、长表格、目录页和档案馆页尾不进入本轮。',
};

const candidates = [
  ['001.四部备要暨四部丛刊书目対照表例.txt', 2, '方法', '四部对照以备要为主'],
  ['001.四部备要暨四部丛刊书目対照表例.txt', 529, '知识', '四部要籍是国学精华'],
  ['001.四部备要暨四部丛刊书目対照表例.txt', 530, '方法', '两帙互补成国学藏书'],
  ['001.四部备要暨四部丛刊书目対照表例.txt', 533, '人格', '早年功力连贯后来成绩'],

  ['002.《古今图书集成》研究.txt', 13, '知识', '古今图书集成是书中之王'],
  ['002.《古今图书集成》研究.txt', 14, '方法', '中国人缺读书工具'],
  ['002.《古今图书集成》研究.txt', 19, '知识', '百科材料一检即得'],
  ['002.《古今图书集成》研究.txt', 61, '方法', '大书来龙去脉值得研究'],
  ['002.《古今图书集成》研究.txt', 75, '方法', '从版本问题开始论列'],
  ['002.《古今图书集成》研究.txt', 77, '知识', '真正编者是陈梦雷'],
  ['002.《古今图书集成》研究.txt', 78, '人格', '陈梦雷苦命中编成巨著'],
  ['002.《古今图书集成》研究.txt', 80, '知识', '四年半编成万卷巨书'],
  ['002.《古今图书集成》研究.txt', 90, '政治', '雍正序抹去陈梦雷'],
  ['002.《古今图书集成》研究.txt', 96, '政治', '蒋廷锡奉命掠美'],
  ['002.《古今图书集成》研究.txt', 99, '知识', '掠美者不配纂修之名'],
  ['002.《古今图书集成》研究.txt', 102, '方法', '校订不是原编纂'],
  ['002.《古今图书集成》研究.txt', 107, '政治', '除名是权力掠夺成果'],
  ['002.《古今图书集成》研究.txt', 125, '知识', '铜活字集成是印刷大业'],
  ['002.《古今图书集成》研究.txt', 128, '政治', '皇权攫取编纂成果'],
  ['002.《古今图书集成》研究.txt', 140, '知识', '原始文件揭示印刷情况'],
  ['002.《古今图书集成》研究.txt', 167, '知识', '铜活字完整本极稀少'],
  ['002.《古今图书集成》研究.txt', 195, '方法', '版本说法须辨误'],
  ['002.《古今图书集成》研究.txt', 214, '知识', '集成珍贵到求见不得'],
  ['002.《古今图书集成》研究.txt', 245, '知识', '集成价值在百科规模'],
  ['002.《古今图书集成》研究.txt', 256, '方法', '加编索引是划时代贡献'],
  ['002.《古今图书集成》研究.txt', 257, '方法', '浩瀚类书必须有索引'],
  ['002.《古今图书集成》研究.txt', 258, '方法', '目录不能替代现代索引'],
  ['002.《古今图书集成》研究.txt', 268, '方法', '索引整理校正二百五十年错误'],
  ['002.《古今图书集成》研究.txt', 310, '知识', '索引有益今人与后人'],

  ['003.介绍世界最大的百科全书.txt', 2, '知识', '文星版集成是最大百科'],
  ['003.介绍世界最大的百科全书.txt', 3, '方法', '古籍研究常无从下手'],
  ['003.介绍世界最大的百科全书.txt', 4, '方法', '既有索引仍不足用'],
  ['003.介绍世界最大的百科全书.txt', 6, '知识', '陈梦雷分类重编古籍'],
  ['003.介绍世界最大的百科全书.txt', 19, '方法', '分类汇编省去穷搜旁讨'],
  ['003.介绍世界最大的百科全书.txt', 23, '方法', '治学缺陷在不会编索引'],
  ['003.介绍世界最大的百科全书.txt', 24, '方法', '死编书不能活用书'],
  ['003.介绍世界最大的百科全书.txt', 25, '方法', '文星索引弥补无从下手'],
  ['003.介绍世界最大的百科全书.txt', 39, '知识', '百科全书是知识万宝囊'],
  ['003.介绍世界最大的百科全书.txt', 50, '文化', '妇女地位材料可供研究'],
  ['003.介绍世界最大的百科全书.txt', 58, '法权', '祥刑典保存法制史资料'],
  ['003.介绍世界最大的百科全书.txt', 62, '知识', '工具书价值显见'],

  ['004.中国历史演义总说.txt', 24, '方法', '旧史分类浩繁难读'],
  ['004.中国历史演义总说.txt', 25, '方法', '历史进入民间要高明法子'],
  ['004.中国历史演义总说.txt', 26, '文化', '说书兼有教育娱乐'],
  ['004.中国历史演义总说.txt', 31, '写作', '各朝需要有趣历史教科书'],
  ['004.中国历史演义总说.txt', 51, '写作', '通俗历史帮助中国人寻脉络'],
  ['004.中国历史演义总说.txt', 56, '方法', '读东周可以上会古人'],
  ['004.中国历史演义总说.txt', 61, '方法', '读秦汉须均衡衡古论今'],
  ['004.中国历史演义总说.txt', 67, '政治', '光武推崇不合作知识分子'],
  ['004.中国历史演义总说.txt', 69, '文化', '佛教谶纬深刻影响思想'],
  ['004.中国历史演义总说.txt', 76, '文化', '三国演义塑造民间信仰'],
  ['004.中国历史演义总说.txt', 77, '方法', '三国演义要会读'],
  ['004.中国历史演义总说.txt', 82, '政治', '疑天下导致五胡乱华'],
  ['004.中国历史演义总说.txt', 89, '文化', '民族文化大融合形成中国'],
  ['004.中国历史演义总说.txt', 92, '文化', '唐朝开放成就多彩文化'],
  ['004.中国历史演义总说.txt', 94, '政治', '唐朝文武分离'],
  ['004.中国历史演义总说.txt', 95, '人格', '唐太宗以度量待人才'],
  ['004.中国历史演义总说.txt', 96, '政治', '人才态度导致科举取士'],
  ['004.中国历史演义总说.txt', 97, '文化', '唐朝文化面万古长存'],
  ['004.中国历史演义总说.txt', 99, '文化', '五代民族混同壮大中国'],
  ['004.中国历史演义总说.txt', 102, '政治', '内战使百姓吃尽苦头'],
  ['004.中国历史演义总说.txt', 105, '政治', '宋朝对内神气对外窝囊'],
  ['004.中国历史演义总说.txt', 107, '政治', '宋代削弱宰相尊严'],
  ['004.中国历史演义总说.txt', 108, '政治', '重文轻武留下外患'],
  ['004.中国历史演义总说.txt', 112, '方法', '元史不该窄解'],
  ['004.中国历史演义总说.txt', 114, '文化', '元朝不能被种族曲解'],
  ['004.中国历史演义总说.txt', 116, '政治', '元朝政治也有光明面'],
  ['004.中国历史演义总说.txt', 119, '政治', '明太祖建立特工政治'],
  ['004.中国历史演义总说.txt', 120, '政治', '明朝是皇帝独夫集权'],
  ['004.中国历史演义总说.txt', 122, '政治', '明朝政治闹剧是耻辱'],
  ['004.中国历史演义总说.txt', 124, '方法', '读清史要取消种族偏见'],
  ['004.中国历史演义总说.txt', 126, '政治', '清朝税制改革惠及百姓'],
  ['004.中国历史演义总说.txt', 129, '方法', '评清须看未有变局强敌'],
  ['004.中国历史演义总说.txt', 132, '政治', '逊位诏书扩大民族观点'],
  ['004.中国历史演义总说.txt', 134, '政治', '和平解决体现政治技术'],
  ['004.中国历史演义总说.txt', 137, '知识', '历史一词显示文化交流'],
  ['004.中国历史演义总说.txt', 138, '方法', '会读演义少力大得'],
  ['004.中国历史演义总说.txt', 141, '方法', '三国之外还须全史演义'],
  ['004.中国历史演义总说.txt', 143, '写作', '校订演义中有苦心调剂'],
  ['004.中国历史演义总说.txt', 147, '知识', '预言性演义可成历史文献'],
  ['004.中国历史演义总说.txt', 148, '人格', '历史演义可养成理智爱国'],
];

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
    .replace(/[《》“”‘’"'，。！？、：；;()\s]+/g, '')
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

const records = candidates.flatMap(([sourceFile, paragraphNumber, category, title]) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceFile}:${paragraphNumber}`);
  }

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
  '- 保留可独立检索的读书方法、索引方法、版本考证、著作权归属判断、历史演义方法和各朝政治文化判断。',
  '- 删除纯书目表格、长表格数据、版本流水账、目录页、广告页尾和不能独立承载思想的例证碎片。',
  '- 标题可浓缩，description 保留源文本原段落，不改写。',
  '',
  '分类说明：',
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
