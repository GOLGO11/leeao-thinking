import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 82;
const bookTitle = '挑战李敖';
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
  (name) => name.startsWith('002.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'tiaozhan-leeao',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《挑战李敖》一百一十个节目文本中提取思想索引。取舍以每集一条主判断为主，优先保留李敖自己的政治批判、法权主张、历史方法、证据意识、人格标准、文化判断、写作观与情爱观；对来宾长段、观众提问、纯新闻铺陈、节目串场和缺少李敖判断的段落从严剔除。标题可浓缩，description 保留源文本原段落。',
};

const candidates = [
  ['001.', 52, '法权', '言论自由包括过度言论'],
  ['002.', 52, '法权', '法院党化时投票是根本追究'],
  ['003.', 47, '法权', '总统豁免不能免除下台追究'],
  ['004.', 21, '方法', '不懂专业就要承认边界'],
  ['005.', 32, '政治', '政治人物要找对专家'],
  ['006.', 11, '法权', '死刑执行也应遵守制度'],
  ['007.', 24, '政治', '政治人物本领在会用人'],
  ['008.', 34, '方法', '投诉资料能揭穿名人神主牌'],
  ['009.', 24, '法权', '控告政府需要公信力团体'],
  ['010.', 29, '方法', '博士名望不能替代专业判断'],
  ['011.', 11, '法权', '合法集会也会被行政打压'],
  ['012.', 9, '方法', '照片资料能还原学术履历'],
  ['013.', 9, '知识', '世事洞明皆是学问'],
  ['014.', 37, '政治', '政治家要培养接班人'],
  ['015.', 35, '方法', '面对大陆问题不能自欺'],
  ['016.', 23, '方法', '黑金谈判必须公开透明'],
  ['017.', 54, '方法', '机密资料也要说明取得方式'],
  ['018.', 42, '知识', '简体字并非现代才有'],
  ['019.', 48, '法权', '妇女问题需要制度保障'],
  ['020.', 15, '法权', '权利法案展示自由制度演变'],
  ['021.', 26, '政治', '台独战争要先问代价'],
  ['022.', 26, '政治', '集权主义会打爱国招牌'],
  ['023.', 45, '知识', '大陆学历不该被政治否认'],
  ['024.', 18, '方法', '读史要看序跋背后的策略'],
  ['025.', 40, '政治', '两岸谈判是最大的国家大事'],
  ['026.', 38, '政治', '两岸制度要由谈判决定'],
  ['027.', 29, '方法', '隔绝黑金要公开接触'],
  ['028.', 41, '方法', '没有证据不能指控窃听'],
  ['029.', 11, '方法', '查账要看资金真实流向'],
  ['030.', 32, '法权', '合法裁量仍需政治检验'],
  ['031.', 27, '政治', '以台湾筹码换中国前途'],
  ['032.', 50, '法权', '总统第一事应恢复宪法'],
  ['033.', 19, '政治', '领导者高明在会用人'],
  ['034.', 12, '政治', '市长应以公共身份处理党产'],
  ['035.', 28, '政治', '选战判断要看基本盘'],
  ['036.', 23, '政治', '领袖品质在会不会用人'],
  ['037.', 14, '政治', '国家定位口号制造台独风险'],
  ['038.', 35, '人格', '揭发黑暗需要勇气'],
  ['039.', 30, '政治', '政治人物立场含糊也不正确'],
  ['040.', 72, '方法', '有为才能改变公共标准'],
  ['041.', 38, '政治', '政党政治是间接民主机制'],
  ['042.', 23, '人格', '思想人物必须坚持道德标准'],
  ['043.', 29, '政治', '卖台指控要问实际能力'],
  ['044.', 20, '方法', '省籍牌要看利益操纵'],
  ['045.', 37, '人格', '历史定位要看整体表现'],
  ['046.', 40, '方法', '一国两制要看证据变化'],
  ['047.', 33, '政治', '地区政治不能由个人独断'],
  ['048.', 28, '政治', '捡战利品不等于白色恐怖受难'],
  ['049.', 77, '情爱', '厌女哲学也可能虚伪'],
  ['050.', 15, '知识', '智慧高于聪明'],
  ['051.', 77, '政治', '中国定义不必刻意拆分'],
  ['052.', 34, '法权', '香港终审权显示法治冲突'],
  ['053.', 41, '政治', '弃选也可能成为政治棋'],
  ['054.', 15, '方法', '蒋家财产要看生活证据'],
  ['055.', 21, '政治', '国家命题不能单方设定'],
  ['056.', 25, '方法', '博学记忆可以后天训练'],
  ['057.', 15, '法权', '公投要有宪法基础'],
  ['058.', 6, '情爱', '灵肉判断不能脱离身体事实'],
  ['059.', 28, '人格', '旧体制核心人物须先忏悔'],
  ['060.', 51, '政治', '私生活批评可触及政治伪装'],
  ['061.', 22, '法权', '选举必须遵守基本规则'],
  ['062.', 24, '方法', '长期研究才有专家判断'],
  ['063.', 22, '方法', '追求真相要洞达人情'],
  ['064.', 43, '政治', '领导者要知人分责'],
  ['065.', 38, '政治', '批评财团不该选择性'],
  ['066.', 19, '法权', '合理游戏规则保障言论自由'],
  ['067.', 126, '政治', '权力保护常是推卸责任'],
  ['068.', 28, '情爱', '没有欲哪有情'],
  ['069.', 36, '法权', '宪法是根本大法不能轻改'],
  ['070.', 64, '政治', '现实主义要维持恐怖平衡'],
  ['071.', 36, '方法', '读书可帮助思想脱胎换骨'],
  ['072.', 12, '政治', '党产承诺要看旧记录'],
  ['073.', 16, '政治', '邦联方案不适合中国谈判'],
  ['074.', 33, '方法', '参选目标是宣传理念揭发黑暗'],
  ['075.', 42, '法权', '主权独立需要国际承认'],
  ['076.', 12, '法权', '案件过量会损害司法品质'],
  ['077.', 46, '政治', '总统被架空仍有道德力量'],
  ['078.', 23, '方法', '掩耳盗铃式政治是自欺'],
  ['079.', 23, '方法', '专业知识分子容易专而不博'],
  ['080.', 7, '法权', '学术自由不能掩盖党内斗争'],
  ['081.', 34, '政治', '两岸安排可以谈判设计'],
  ['082.', 151, '写作', '五四白话文仍有旧语法负担'],
  ['083.', 6, '政治', '说话算话才有公信力'],
  ['084.', 10, '文化', '坟上钉钉子暴露千年迷信'],
  ['085.', 7, '法权', '言论自由要能容纳身体呈现'],
  ['086.', 86, '法权', '艺术色情不该因查询而被禁'],
  ['087.', 41, '文化', '中国迷信容易制造骗子'],
  ['088.', 13, '政治', '钓鱼台问题不能回避日本占领'],
  ['089.', 22, '政治', '台独利益主要来自选票和自大'],
  ['090.', 17, '方法', '看书才能了解李登辉真相'],
  ['091.', 26, '方法', '历史人物会被长期污蔑'],
  ['092.', 21, '法权', '言论自由是约束乱搞的方式'],
  ['093.', 34, '方法', '公审状态会让解释失效'],
  ['094.', 49, '方法', '豺狼当道先问主要黑暗'],
  ['096.', 39, '政治', '不辩论就谈不上民主先生'],
  ['097.', 23, '知识', '凯撒妻子典故不能误引'],
  ['098.', 35, '人格', '为真理可与朋友分道扬镳'],
  ['099.', 25, '法权', '毁司法做政治斗争最恐怖'],
  ['100.', 32, '方法', '辨别假政见比罗列政见重要'],
  ['101.', 32, '方法', '鉴定机关不能先用后否'],
  ['102.', 24, '法权', '真民主要言论自由和法治'],
  ['103.', 13, '文化', '教育不能失根忘本'],
  ['104.', 19, '政治', '选人要看能干不看完美'],
  ['105.', 21, '方法', '深厚基础支撑清楚表达'],
  ['106.', 23, '政治', '台湾坐失大陆谈判机会'],
  ['107.', 32, '法权', '总统豁免使普通罪告不成'],
  ['108.', 31, '方法', '骂人要拿真相证明'],
  ['109.', 22, '政治', '国民党下台不等于轮给民进党'],
  ['110.', 30, '方法', '学历史是为了避免重蹈覆辙'],
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
  '- 以每个节目文件一条主索引为主，优先保留李敖自己的明确判断、方法、价值标准或可复用概念。',
  '- 跳过来宾长段、观众提问、纯新闻铺陈、节目串场和缺少李敖判断的段落；第 095 集几乎全为来宾查账说明，本轮不列候选。',
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
