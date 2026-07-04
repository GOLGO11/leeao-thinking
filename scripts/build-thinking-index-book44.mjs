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
  .find((name) => name.startsWith('002.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '044.早年日记');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '044',
  title: '早年日记',
  slug: 'zaonian-riji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《早年日记》的校园、从军前、四席小屋和二十年前断片中提取思想索引。description 保留源文本原段落；纯行程、会面流水账、私人情境短句、资源尾巴和缺少独立思想判断的出版事件不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['情爱', '001', 40, '情爱唯美', '爱情,性欲,情爱'],
  ['方法', '001', 75, '死的意识', '死亡,快乐,方法'],
  ['文化', '001', 32, '揭穿伪善', '鲁迅,伏尔泰,文化'],

  ['人格', '002', 7, '新生活三点', '寂寞,努力,强悍'],
  ['情爱', '002', 29, '爱情超时间', '爱情,文人,情爱'],
  ['人格', '002', 173, '强悍反动', '强悍,磨练,人格'],

  ['人格', '003', 5, '军队悍气', '军队,思想,人格'],
  ['写作', '003', 30, '重写与买时间', '写作,时间,方法'],
  ['方法', '003', 33, '自由研究', '研究,方法,知识'],
  ['写作', '003', 49, '旧信史料', '史料,日记,写作'],
  ['方法', '003', 164, '下午专攻', '时间,英文,历史'],
  ['人格', '003', 183, '朋友与钱', '朋友,金钱,人格'],
  ['方法', '003', 373, '十三小时计划', '工作表,英文,历史'],
  ['人格', '003', 421, '征服环境', '环境,自我,人格'],
  ['方法', '003', 527, '早起得时间', '早起,时间,方法'],
  ['写作', '003', 626, '写作独立', '写作,学术职位,写作'],
  ['情爱', '003', 773, '爱情不怕羞', '爱情,态度,情爱'],
  ['情爱', '003', 868, '忍耐寂寞', '寂寞,情爱,理智'],
  ['文化', '003', 983, '田园自然主义', '老子,陶诗,文化'],

  ['知识', '004', 3, '断片施教', '历史,传记,知识'],
  ['方法', '004', 6, '灰心与历史心怀', '灰心,历史,方法'],
  ['人格', '004', 13, '不造灵感', '独立,批评,人格'],
  ['政治', '004', 20, '反共不是护符', '民主,自由,政治'],
  ['知识', '004', 24, '学术误事', '学术,监察,知识'],
  ['人格', '004', 40, '独读气魄', '读书,气魄,人格'],
  ['人格', '004', 42, '闭塞小气派', '气魄,闭塞,人格'],
  ['人格', '004', 57, '原则离文星', '原则,文星,人格'],
  ['写作', '004', 69, '每月新刊', '新刊,出版,写作'],
  ['知识', '004', 102, '神也可证伪', '证据,宗教,知识'],
  ['政治', '004', 108, '思想警察', '思想警察,政治,写作'],
  ['政治', '004', 133, '新式武人', '武人,历史,政治'],
  ['政治', '004', 134, '人的标准', '人,法西斯,政治'],
  ['法权', '004', 138, '自由创作', '自由创作,查禁,法权'],
  ['法权', '004', 140, '合作与查禁', '查禁,合作,法权'],
  ['法权', '004', 180, '奉命不上诉', '出版法,司法,法权'],
  ['政治', '004', 234, '有关方面阻挠', '言责,阻挠,政治'],
  ['法权', '004', 306, '警总禁书', '禁书,印刷,法权'],
  ['法权', '004', 421, '低调不被信任', '警总,政治,法权'],
  ['法权', '004', 423, '法院与党会', '法院,政党,法权'],
  ['法权', '004', 456, '便衣查禁', '查禁,出版,法权'],
  ['法权', '004', 458, '警车拉书', '查禁,警察,法权'],
  ['法权', '004', 465, '谈话笔录', '程序,查扣,法权'],
  ['法权', '004', 477, '涂字送检', '审查,出版,法权'],
  ['法权', '004', 516, '拒写违法信', '违法,警总,法权'],
  ['政治', '004', 520, '知识人借刀', '知识人,政治,人格'],
  ['法权', '004', 524, '言论不可置死', '言论自由,禁书,法权'],
  ['法权', '004', 528, '书摊禁卖', '禁卖,警察,法权'],
  ['法权', '004', 559, '法院黑暗程序', '法院,司法,法权'],
  ['法权', '004', 561, '司法黑暗', '司法,法权,法院'],
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

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT044-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d{3}\..+\.txt$/.test(name));
const filesByKey = new Map(sourceFiles.map((name) => [name.slice(0, 3), name]));

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
  id: `LAT044-${String(index + 1).padStart(3, '0')}`,
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
      '沿用 8 个原子分类，避免新增过细分类。',
      '本书为早年日记材料，优先收录可独立检索的自我砥砺、读书方法、写作出版、政治法权和情爱判断。',
      '纯行程、会面流水账、书信事务、诗题、外部资料摘录和缺少独立思想判断的短句不收。',
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
  '# 《早年日记》思想索引提取说明',
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
  '本书由 1958 年校园日记、1959 年从军前日记、四席小屋日记和 1966 年断片构成，材料跨度大，但大量段落是日常行程、会面、借书、病况、出版往来或查禁过程的事实记录。本轮只收其中已经形成思想判断、方法原则或法权立场的原文段落。',
  '',
  '早期日记部分侧重孤独、强悍、时间纪律、读书研究、写作习惯和情爱节制；1966 年断片部分侧重出版查禁、警总干预、法院程序、言论自由和知识人的政治姿态。后续校对轮可继续压缩过密的查禁事件条目，并检查外引性质较强的段落是否需要降密。',
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
