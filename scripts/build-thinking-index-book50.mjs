import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const diaryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('006.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, diaryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('008.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '050.李敖五五日记');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '050',
  title: '李敖五五日记',
  slug: 'leeao-wuwu-riji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖五五日记》1990年4月至1991年4月的按月日记中提取思想索引。description 保留源文本原段落；目录、广告尾注、纯日常流水、纯外部报道、来信建议和资料堆列不进入本轮，少量清楚记录李敖演讲或谈话观点的报道段落暂予保留供校对轮取舍。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['方法', '001', 6, '清明轻快', '时间,定稿,方法'],
  ['写作', '001', 7, '每日定稿', '每日二千字,写作,定稿'],
  ['写作', '001', 12, '出版赔累', '出版,稿费,写作'],
  ['文化', '001', 14, '迷信愚化', '迷信,知识阶层,文化'],
  ['文化', '001', 16, '愚民文化', '打坐,愚民文化,文化'],
  ['政治', '001', 26, '奴性官位', '林洋港,司法院,政治'],
  ['法权', '001', 29, '广告拒登', '广告,媒体垄断,法权'],

  ['方法', '002', 3, '随地开工', '勤奋,做工,方法'],
  ['文化', '002', 6, '蛋头文体', '文体,独立思想,文化'],
  ['法权', '002', 19, '总统法理', '李登辉,总统,法权'],
  ['写作', '002', 35, '揭发赔累', '出版,理想,写作'],
  ['写作', '002', 97, '文章不靠报', '文章,报纸,写作'],
  ['方法', '002', 139, '重订新戒', '身体,饮食,方法'],
  ['政治', '002', 165, '独裁魔鬼', '自由女神,不自由,政治'],

  ['写作', '003', 20, '定稿标准', '人事,定稿,写作'],
  ['政治', '003', 41, '民运格局', '民运,格局,政治'],
  ['情爱', '003', 132, '新女性批评', '新女性,李昂,情爱'],
  ['情爱', '003', 140, '依法恋爱', '交女朋友,法律,情爱'],
  ['人格', '003', 181, '长命不窝囊', '长命,窝囊,人格'],

  ['政治', '004', 145, '立委专业', '立委,专业知识,政治'],
  ['政治', '004', 148, '立委变节', '立委,民进党,政治'],

  ['政治', '005', 111, '批民进党更险', '民进党,国民党,政治'],
  ['法权', '005', 146, '人犯空间', '人犯,监狱,法权'],

  ['人格', '006', 48, '不做打手', '中央日报,国民党,人格'],
  ['政治', '006', 50, '权力恐共', '国民党,恐共,政治'],
  ['写作', '006', 51, '隐而不退', '独立战斗,写作,世界性作品'],
  ['政治', '006', 52, '暗杀顾忌', '江南案,暗杀,政治'],
  ['法权', '006', 96, '言论协议', '言论自由,世界论坛报,法权'],
  ['写作', '006', 97, '专书复仇', '蒋纬国,揭发,写作'],

  ['文化', '008', 186, '爱女作秀', '名流,作秀,文化'],
  ['写作', '008', 210, '复仇见天日', '龚德柏,复仇,写作'],

  ['人格', '009', 30, '成就不算', '成就奖,自信,人格'],
  ['人格', '009', 31, '伏尔泰之笔', '伏尔泰,揭发,人格'],
  ['法权', '009', 32, '放逐变留刑', '出国自由,护照,法权'],
  ['政治', '009', 33, '去留分工', '去留,救国,政治'],
  ['政治', '009', 34, '去者责任', '海外华人,祖国自由,政治'],
  ['人格', '009', 35, '海外肯定', '查禁,抹杀,人格'],
  ['文化', '009', 83, '不供低趣味', '青年,真话,文化'],
  ['知识', '009', 92, '胡适渊源', '胡适,五四,知识'],
  ['人格', '009', 93, '雪中送炭', '胡适,细心,人格'],
  ['知识', '009', 94, '胡适看重', '胡适,师门,知识'],
  ['知识', '009', 95, '求士不朽', '胡适,求士,知识'],
  ['方法', '009', 108, '文件证据', '张学良,证据,方法'],
  ['方法', '009', 153, '太自在则老', '工作,自在,方法'],
  ['写作', '009', 171, '文字落实', '谈话,文字,写作'],
  ['文化', '009', 213, '形式礼佛', '佛学,形式,文化'],

  ['政治', '010', 173, '泄愤非自由', '天安门,群众,政治'],

  ['写作', '011', 125, '写稿不办社', '求是报,办报,写作'],
  ['知识', '011', 134, '防录音', '张学良,记录,知识'],

  ['人格', '012', 30, '离己而去', '老孟,机会,人格'],
  ['政治', '012', 129, '蒋公教育', '国民党教育,真理,政治'],
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
  const lines = [
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT050-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);

const paragraphCache = new Map();
function sourceParagraphs(key) {
  const fileName = filesByKey.get(key);
  if (!fileName) {
    throw new Error(`Missing source file for key ${key}`);
  }
  if (!paragraphCache.has(fileName)) {
    const text = decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
    paragraphCache.set(
      fileName,
      text
        .replace(/\r/g, '')
        .split(/\n\s*\n+/)
        .map(normalize)
        .filter(Boolean),
    );
  }
  return { fileName, paragraphs: paragraphCache.get(fileName) };
}

const previous = previousDescriptions();
const skipped = [];
const seenCurrent = new Map();
const keptCandidates = [];

for (const [category, key, paragraphNumber, title, keywords] of candidateEntries) {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${key} P${paragraphNumber}`);
  }
  const { fileName, paragraphs } = sourceParagraphs(key);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${key} P${paragraphNumber}`);
  }
  const normalized = normalize(description);
  if (previous.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: previous.get(normalized) });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: seenCurrent.get(normalized) });
    continue;
  }
  keptCandidates.push({
    category,
    title,
    description,
    source_file: fileName,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, path.join(sourceDir, fileName)).replaceAll(path.sep, '/'),
    keywords,
  });
  seenCurrent.set(normalized, `${key} P${paragraphNumber}`);
}

const records = keptCandidates.map((candidate, index) => ({
  id: `LAT050-${String(index + 1).padStart(3, '0')}`,
  book: book.title,
  round: book.round,
  status: book.status,
  ...candidate,
}));

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    candidate_count: candidateEntries.length,
    skipped_duplicate_count: skipped.length,
  },
  taxonomy,
  records,
  extraction: {
    principles: [
      '每条 description 保留源文本原文段落，不改写。',
      '标题只作索引用的浓缩，不替代原文判断。',
      '沿用 8 个原子分类，不新增临时类别。',
      '本书优先收录五十五岁期间的时间管理、写作纪律、出版与办报、国民党批评、法权经验、知识谱系、人格自况和少量情爱观段落。',
      '目录、前记短说明、广告尾注、纯日常流水、纯外部报道、读者来信、资料堆列和缺少李敖判断的段落不收。',
      '与既有总表完全重复的 description 自动跳过。',
    ],
    skipped_duplicates: skipped,
  },
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);

const noteLines = [
  '# 《李敖五五日记》思想索引提取说明',
  '',
  `- 提取轮条目：${records.length}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 跳过既有/本书重复：${skipped.length}`,
  `- 来源目录：${book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 取舍说明',
  '',
  '本轮覆盖《李敖五五日记》1990年4月25日至1991年4月10日的日记。提取重点不是逐日记事，而是保留能独立呈现思想判断的源文段落：时间管理与定稿纪律、出版和办报判断、对国民党及民进党的政治批评、言论自由与出入境限制、知识分子与胡适谱系、人格自况、文化迷信批评和少量情爱观。',
  '',
  '提取轮保留少量记录李敖演讲或电视谈话观点的报道段落，供校对轮继续压缩。纯剪报资料、读者来信建议、日常行程、人名往来、资料清单、广告尾注和缺少李敖判断的段落不收。',
  '',
];
fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built ${book.sequence}.${book.title}: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
