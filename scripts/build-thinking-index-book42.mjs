import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const poetryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('005.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, poetryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('006.'));
const sourceDir = path.join(rootDir, sourceRoot, poetryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '042.挑战李敖——敖语录');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '042',
  title: '挑战李敖——敖语录',
  slug: 'tiaozhan-li-ao-ao-yulu',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《挑战李敖——敖语录》的1999年10月至2000年4月月度语录中提取思想索引。description 保留源文本原段落；纯日期、资源广告和只靠人身嘲讽成立的短句不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['情爱', '001', 3, '毒药与仁慈', '女人,仁慈,情爱'],
  ['人格', '001', 5, '先知碰头', '先知,骂名,人格'],
  ['情爱', '001', 11, '先听后看', '男女,判断,情爱'],
  ['政治', '001', 13, '清流浊流', '清流,政治,台湾'],
  ['情爱', '001', 15, '父母与前妻', '长寿,婚姻,情爱'],
  ['情爱', '001', 17, '形上形下和解', '男女,冲突,情爱'],
  ['政治', '001', 19, '提拔与打压', '政治动作,国民党,政治'],
  ['人格', '001', 21, '真话缺点', '真话,缺点,人格'],
  ['政治', '001', 29, '鸡同鸭讲', '政府,人民,政治'],
  ['情爱', '001', 31, '眼睛与耳朵', '男女,感官,情爱'],
  ['政治', '001', 33, '政客与政治家', '政治家,政客,政治'],
  ['写作', '001', 35, '三种鬼话', '情书,传单,道歉信'],
  ['政治', '001', 37, '假民主', '假民主,台湾,政治'],
  ['政治', '001', 41, '狐群狗党', '国民党,政党,政治'],

  ['方法', '002', 3, '代沟惊醒', '代沟,计算,方法'],
  ['方法', '002', 5, '正视问题', '问题,解决,方法'],
  ['法权', '002', 7, '写书与坐牢', '写书,坐牢,法权'],
  ['政治', '002', 11, '选举作弊阶段', '选举,作弊,政治'],
  ['政治', '002', 13, '总统与人民', '总统,人民,政治'],
  ['人格', '002', 21, '真话就是好话', '真话,好话,人格'],
  ['方法', '002', 25, '两种快乐', '人生,快乐,方法'],
  ['法权', '002', 27, '自己主持正义', '天道,正义,法权'],
  ['情爱', '002', 29, '多次与多年', '结婚,幸福,情爱'],
  ['政治', '002', 31, '政党同志', '政党,同志,政治'],
  ['情爱', '002', 33, '婚姻与女人', '婚姻,女人,情爱'],
  ['情爱', '002', 37, '感情中的聪明人', '感情,哲学家,情爱'],

  ['情爱', '003', 5, '怀抱与手掌', '女人,男人,情爱'],
  ['人格', '003', 7, '精彩自我', '朋友,演说,人格'],
  ['政治', '003', 13, '政党政治异化', '政党政治,国民党,民进党'],
  ['方法', '003', 19, '好邻居', '邻居,界限,方法'],
  ['政治', '003', 27, '拿钱与做事', '民进党,国民党,政治'],

  ['人格', '004', 7, '伤的位置', '莽夫,懦夫,人格'],
  ['政治', '004', 11, '政治看脸皮', '政治,脸皮,政治'],
  ['政治', '004', 15, '势力势利视野', '国民党,民进党,新党'],
  ['方法', '004', 17, '怕死与冒险', '怕死,冒险,方法'],
  ['方法', '004', 19, '拉人跑与别跑', '进退,年老,方法'],

  ['方法', '005', 5, '疯子的程度', '哲学家,科学家,方法'],
  ['政治', '005', 7, '选举痛苦', '选举,语言,政治'],
  ['人格', '005', 9, '精神上升', '精神,肉体,人格'],
  ['文化', '005', 21, '衣裳也要人', '衣裳,人,文化'],

  ['政治', '006', 5, '浑蛋选浑蛋', '选举,台湾,政治'],
  ['情爱', '006', 7, '成功夫妻', '丈夫,妻子,情爱'],
  ['情爱', '006', 9, '女人的五个男人', '女人,男人,情爱'],
  ['政治', '006', 13, '政党保护链', '国民党,民进党,政治'],
  ['情爱', '006', 15, '钱与变坏', '男人,女人,情爱'],
  ['政治', '006', 17, '大小笨蛋', '投票,选举,政治'],
  ['政治', '006', 23, '爬树的政党', '民进党,权力,政治'],

  ['政治', '007', 3, '反对鲁莽进步', '民主进步,民进党,政治'],
  ['人格', '007', 5, '锤子与脊梁', '前卫,后台,人格'],
  ['方法', '007', 9, '黑猫白猫与老鼠', '猫,老鼠,方法'],
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
    '## 条目',
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
    if (record.id?.startsWith('LAT042-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
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
  id: `LAT042-${String(index + 1).padStart(3, '0')}`,
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
      '本书为月度语录体，纯日期、资源广告、遗嘱事务和只靠笑点成立的短句不收。',
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
  '# 《挑战李敖——敖语录》思想索引提取说明',
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
  '本书由1999年10月至2000年4月的短语录组成，形式接近笑话、警句和政治讽刺的混合体。本轮优先收录能独立检索的政治判断、处世方法、人格判断、男女关系判断和少量写作/文化/法权判断。',
  '',
  '暂不收录纯日期段、资源广告段、只服务于即时选战人事嘲讽的短句，以及思想可迁移性太低的纯辱骂式语录。后续校对轮可继续压缩政治人物条目，并检查情爱条目是否足够独立。',
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
