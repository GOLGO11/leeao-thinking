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
  .find((name) => name.startsWith('007.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '049.李敖札记');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '049',
  title: '李敖札记',
  slug: 'leeao-zhaji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖札记》一百三十五则短札中提取思想索引。description 保留源文本原段落；目录、自序中第三人称宣传文字、新闻材料长引、纯人事流水、过短机锋和缺少独立判断的段落不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['政治', '001', 2, '知识恐怖', '国民党,恐怖,知识分子'],
  ['方法', '004', 3, '假装生气', '俗人,生气,方法'],
  ['政治', '006', 15, '拉住议事', '议会,阻挡,政治'],
  ['政治', '007', 6, '官样谎话', '俞国华,总统府,政治'],
  ['政治', '008', 2, '大盗戏台', '国民党,政治表演,讽刺'],
  ['政治', '009', 2, '朋党政治', '国民党,政党,朋党'],
  ['法权', '010', 6, '忠诚逼索', '警总,保证书,法权'],
  ['政治', '012', 2, '聚敛德政', '国民党,银行,民生'],
  ['政治', '013', 3, '在野限度', '党外,逮捕,在野党'],
  ['人格', '015', 2, '杂种两边', '国民党,党外,人格'],
  ['法权', '016', 2, '中国人通行', '旅行自由,美国护照,法权'],
  ['人格', '017', 4, '士不拜码头', '拜码头,骨气,人格'],
  ['知识', '018', 2, '自由标本', '陈鼓应,自由主义,知识'],
  ['知识', '018', 3, '作文失败', '国民党,知识分子,写作'],
  ['政治', '020', 6, '坐牢消息', '萧孟能,中央日报,政治'],
  ['政治', '021', 2, '政府威信', '政府,黑社会,威信'],
  ['政治', '023', 2, '与子偕亡', '国民党,台湾人,政治'],
  ['人格', '025', 2, '恩仇报答', '恩怨,报仇,公平'],
  ['知识', '027', 2, '胡适乡愿', '胡适,乡愿,全集'],
  ['政治', '028', 2, '假共产党', '余登发,背叛,政治'],
  ['写作', '029', 2, '写作不为钱', '写作,收入,坚持'],
  ['人格', '030', 5, '痛恨伪善', '伪善,敌人,人格'],
  ['写作', '031', 4, '文字流通', '书籍,流通,谣言'],
  ['政治', '032', 2, '逃命预言', '国民党,逃亡,政治'],
  ['方法', '033', 2, '可为不可为', '政治人物,可能性,判断'],
  ['方法', '033', 3, '可爱不可爱', '群众,政治判断,方法'],
  ['政治', '034', 2, '忏悔缺席', '国民党,告白,掩盖'],
  ['政治', '036', 2, '开饭社会', '政治控制,饭碗,社会'],
  ['法权', '037', 4, '查禁尺度', '出版,查禁,法权'],
  ['人格', '038', 4, '同情勇气', '压迫,勇气,人格'],
  ['知识', '041', 4, '自由小人', '知识分子,自由,人格'],
  ['政治', '043', 4, '是非沦亡', '党外,国民党,是非'],
  ['知识', '044', 2, '国民党文人', '国民党,文人,知识'],
  ['写作', '045', 3, '游记真实', '游记,真实,文体'],
  ['法权', '046', 4, '绿岛之岛', '绿岛,监狱,法权'],
  ['文化', '047', 4, '三民主义读者', '三民主义,读者,文化'],
  ['政治', '048', 5, '专制一课', '专制,政治课,国民党'],
  ['政治', '049', 2, '拒绝利用', '林希翎,国民党,利用'],
  ['政治', '050', 2, '自大狂党', '国民党,自大,政治'],
  ['情爱', '053', 2, '露点尺度', '胸部,尺度,情爱'],
  ['法权', '054', 2, '特权儿童', '小学生,特权,法权'],
  ['知识', '056', 4, '谄媚学问', '张大千,学问,谄媚'],
  ['政治', '059', 2, '县长想象', '尤清,县长,政治'],
  ['文化', '061', 2, '电视迷信', '迷信,电视,文化'],
  ['政治', '062', 4, '独夫逃路', '杜瓦里埃,独裁,政治'],
  ['法权', '063', 2, '官司输赢', '诉讼,法权,敌人'],
  ['法权', '064', 2, '盗国逻辑', '罗马法,盗国,法权'],
  ['知识', '065', 2, '胡适考证', '胡适,考证,知识'],
  ['政治', '066', 2, '活人死人', '国民党,共产党,政治'],
  ['法权', '067', 2, '戒严时代', '戒严,独裁,法权'],
  ['人格', '068', 2, '不迁怒', '不迁怒,情绪,人格'],
  ['知识', '070', 3, '日记证据', '黄炎培,日记,考证'],
  ['政治', '076', 2, '外交无路', '国民党,外交,政治'],
  ['政治', '077', 2, '革命家属', '革命,家属,政治'],
  ['人格', '078', 8, '感激困难', '党外,感恩,人格'],
  ['人格', '079', 4, '高等自居', '神,自信,人格'],
  ['方法', '081', 2, '做事不玩', '工作,休闲,方法'],
  ['方法', '081', 3, '玩事分界', '做事,玩事,方法'],
  ['政治', '084', 2, '群贤自喻', '立法院,中华民国,政治'],
  ['方法', '085', 2, '破坏团体', '团体,破坏,方法'],
  ['文化', '086', 2, '小格局', '麻将,台湾,文化'],
  ['写作', '087', 2, '监狱日记', '日记,监狱,写作'],
  ['写作', '087', 4, '台湾监狱', '台湾,日记,监狱'],
  ['政治', '088', 2, '鲜花规格', '游行,献花,政治'],
  ['方法', '089', 2, '来去携带', '旅行,携带,方法'],
  ['法权', '090', 2, '道歉钥匙', '坐牢,道歉,法权'],
  ['知识', '091', 2, '台大抹去', '台大,校史,知识'],
  ['写作', '092', 2, '蒋氏研究', '蒋介石,写作,研究'],
  ['政治', '093', 3, '烟政报应', '公卖,美国,政治'],
  ['情爱', '094', 2, '裸体幸福', '裸体,幸福,情爱'],
  ['政治', '095', 2, '来去自由', '海峡,出入境,自由'],
  ['法权', '096', 2, '广告尺度', '广告,谈判,法权'],
  ['政治', '097', 2, '民进新贵', '民进党,蒋经国,政治'],
  ['写作', '099', 2, '散文自信', '散文,白话文,写作'],
  ['知识', '100', 2, '历史见识', '历史,知识,判断'],
  ['方法', '101', 3, '量敌为计', '韩信,判断,方法'],
  ['法权', '103', 2, '搜书禁书', '禁书,搜查,法权'],
  ['法权', '104', 2, '法律迟到', '法院,报仇,法权'],
  ['政治', '105', 2, '动武格局', '议会,动武,政治'],
  ['政治', '107', 2, '老兵一席', '老兵,政治,台湾'],
  ['人格', '112', 3, '正义朋友', '正义,朋友,人格'],
  ['政治', '115', 2, '地方独夫', '国民党,地方,政治'],
  ['人格', '117', 2, '死活报仇', '报仇,敌人,人格'],
  ['写作', '118', 2, '诽谤成书', '诽谤,出版,写作'],
  ['法权', '119', 2, '贼的法理', '盗窃,法理,法权'],
  ['法权', '120', 2, '被告法理', '被告,法庭,法权'],
  ['人格', '121', 2, '公关羞耻', '公关,羞耻,人格'],
  ['知识', '123', 2, '双重无知', '陈鼓应,学者,知识'],
  ['人格', '124', 2, '两头伪善', '伪善,宗教,人格'],
  ['知识', '125', 2, '海外自由人', '知识分子,海外,自由'],
  ['知识', '126', 2, '末代样品', '溥仪,历史,知识'],
  ['写作', '127', 2, '左拉自比', '左拉,写作,自况'],
  ['法权', '128', 2, '发言尺度', '发言,民主,法权'],
  ['文化', '130', 3, '文字变跳舞', '作家,国民党,文化'],
  ['知识', '131', 2, '教授求助', '教授,资料,知识'],
  ['法权', '132', 2, '国大非法', '国民大会,修宪,法权'],
  ['文化', '133', 2, '军纪差异', '军纪,台湾,文化'],
  ['情爱', '135', 2, '性与自由', '性开放,自由,情爱'],
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
    if (record.id?.startsWith('LAT049-')) continue;
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
  id: `LAT049-${String(index + 1).padStart(3, '0')}`,
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
      '本书优先收录政治讽刺、法权尺度、知识分子判断、写作自况、行动方法、人格恩仇、文化批评和少量情爱自由段落。',
      '目录、自序第三人称宣传、新闻长引、纯人事流水、过短机锋和缺少独立思想判断的段落不收。',
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
  '# 《李敖札记》思想索引提取说明',
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
  '本轮覆盖《李敖札记》中的一百三十五则短札。提取重点不是把每一则札记都入表，而是保留能独立呈现思想判断的原文段落：国民党政治讽刺、党外批评、出版查禁与诉讼尺度、知识分子与学术判断、写作自况、行动方法、恩仇人格、文化趣味和少量性与自由材料。',
  '',
  '提取轮保留若干较宽条目，供校对轮继续压缩。目录、自序中第三人称宣传文字、纯新闻长引、只有人事经过而无判断的流水段落、过短机锋、广告尾注和与既有总表重复的段落不收。',
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
