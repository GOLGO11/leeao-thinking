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
  .find((name) => name.startsWith('014.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '029.李敖杂文集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '029',
  title: '李敖杂文集',
  slug: 'liao-zawenji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖杂文集》中提取可独立检索的思想段落，优先保留李敖关于救国方法、法权、宗教迷信、政治训练、战争责任、中文工具书、工作方法和写作人格的判断；诗作、纯书信事务、工作日志零碎事项和非李敖口吻材料暂不收入。',
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
  ['方法', '形式救国掩盖努力不足', '001', 3, '救国,形式主义,努力,方法'],
  ['政治', '各司其事才会国家强盛', '001', 4, '救国,各司其事,国家,政治'],
  ['人格', '先救自己胜过高喊救国', '001', 5, '救自己,空谈,救国,人格'],
  ['方法', '形式可以影响实质', '003', 3, '快乐,形式,程序,方法'],
  ['人格', '情绪可以迅速复原', '003', 5, '修养,情绪,恢复,人格'],
  ['知识', '迷信让美貌露出无知', '003', 7, '迷信,密宗,无知,知识'],
  ['人格', '助恶好人仍是坏人', '003', 11, '国民党,好人,助恶,人格'],
  ['法权', '新规定不能延长现任', '004', 7, '台大校长,任期,法理,法权'],
  ['法权', '不作证是不尊重司法', '004', 12, '台大,殷海光,作证,法权'],
  ['方法', '告洋状也可有现代观念', '005', 3, '孙中山,司法改革,现代化,方法'],
  ['法权', '陪审遗教成空头票', '005', 4, '孙中山,陪审制,遗教,法权'],
  ['法权', '人民陪审不是英美陪审', '005', 6, '陪审制,人民陪审员,证据,法权'],
  ['法权', '观审不是陪审', '005', 7, '金门,观审,陪审制,法权'],
  ['政治', '统治不便阻止陪审', '005', 8, '陪审制,统治,国民党,政治'],
  ['法权', '总理遗教变空头支票', '005', 10, '总理遗教,陪审制,空头支票,法权'],
  ['文化', '武士町人扼杀高雅', '006', 4, '日本,武士,町人,文化'],
  ['法权', '慰安妇蹂躏有长久编制', '006', 11, '慰安妇,日本,战争责任,法权'],
  ['法权', '私了掩盖战争犯罪', '006', 12, '慰安妇,私了,战争犯罪,法权'],
  ['人格', '义助让屈辱变成证词', '006', 13, '慰安妇,义助,历史证词,人格'],
  ['文化', '新兴宗教是不稳定迷幻药', '007', 2, '新兴宗教,邪教,迷信,文化'],
  ['政治', '声讨邪教因其爆炸性祸害', '007', 3, '法轮功,邪教,社会风险,政治'],
  ['政治', '行使权力需要训练', '008', 6, '权力,训练,政治,政治'],
  ['政治', '接到天下也要会处理', '008', 7, '民进党,人才,权力,政治'],
  ['政治', '派系只护利益会堕落', '008', 10, '派系,新潮流,利益,政治'],
  ['政治', '党内压力逼出外部路线', '008', 11, '党内压力,路线,政治,政治'],
  ['法权', '行政处分扼杀文星封面', '011', 5, '文星,停刊,行政处分,法权'],
  ['知识', '知识才能真正富强', '011', 13, '知识,富强,贫穷,知识'],
  ['政治', '现代政治家要有开明胸襟', '011', 17, '政治家,开明,理性,政治'],
  ['文化', '博大眼光解开教条桎梏', '011', 18, '韩福瑞,博大眼光,教条,文化'],
  ['知识', '词典要有检索系统', '013', 2, '林语堂,词典,检索,知识'],
  ['写作', '句典构想发扬中文', '013', 3, '句典,中文,文化发功,写作'],
  ['方法', '电话必须讲效率', '014', 2, '效率,电话,工作方法,方法'],
  ['方法', '工作一切以书面为准', '014', 5, '工作日志,书面,管理,方法'],
  ['方法', '单位必须有人说了算', '014', 6, '单位,行规,谨言慎行,方法'],
  ['写作', '答问只答有意义问题', '015', 3, '李敖答问,问题,不言之教,写作'],
  ['知识', '日常谈吐也该保存', '015', 12, '章太炎,胡适,思想记录,知识'],
  ['知识', '大学问来自大量读书', '015', 15, '大学问,读书,李敖,知识'],
  ['方法', '读书要读活', '015', 16, '大头脑,读书,思考,方法'],
  ['写作', '文章要有个人打击力', '015', 17, '白话文,文章,打击力,写作'],
  ['人格', '大气魄提供远景', '015', 18, '大气魄,远景,众生,人格'],
  ['人格', '大人格支撑立言', '015', 19, '大人格,立言,道德,人格'],
  ['写作', '答问展示思想材料', '015', 21, '李敖答问,崑山之圃,写作'],
];

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function sourceFileByPrefix(prefix) {
  const file = fs
    .readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt'))
    .find((name) => name.startsWith(`${prefix}.`));
  if (!file) {
    throw new Error(`Missing source file prefix: ${prefix}`);
  }
  return file;
}

function paragraphs(filePath) {
  const text = decoder.decode(fs.readFileSync(filePath));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
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
  const { book: bookInfo, records } = payload;
  const lines = [
    `# 《${bookInfo.title}》思想索引：${bookInfo.round}`,
    '',
    `- 状态：${bookInfo.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；优先保留可独立检索、可回到源文的思想判断。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
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

function writeSummary(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const counts = categoryCounts(records);
  const lines = [
    `# 《${bookInfo.title}》${bookInfo.round}说明`,
    '',
    `本轮从 ${sourceBookDir} 中提取 ${records.length} 条思想索引。`,
    '',
    '## 取舍说明',
    '',
    '- 收入：救国方法、司法与出版法权、宗教迷信、政治训练、战争责任、中文工具书构想、工作方法、写作人格等可独立检索段落。',
    '- 暂不收入：诗作、纯书信事务、工作日志零碎事项、外部引文过重段落、陈香梅第一人称口吻的韩福瑞传记段落。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-提取轮.csv',
    '- 思想索引-提取轮.json',
    '- 思想索引-提取轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const sourceCache = new Map();
const records = entries.map(([category, title, sourceKey, paragraphNumber, keywords], index) => {
  const sourceFile = sourceFileByPrefix(sourceKey);
  const sourcePath = path.join(sourceDir, sourceFile);
  if (!sourceCache.has(sourcePath)) {
    sourceCache.set(sourcePath, paragraphs(sourcePath));
  }
  const sourceParagraphs = sourceCache.get(sourcePath);
  const description = sourceParagraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  return {
    id: `LAT029-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title,
    description,
    source_file: sourceFile,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, sourcePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

if (records.length !== 42) {
  throw new Error(`Expected 42 records, got ${records.length}.`);
}

const allowedCategories = new Set(taxonomy);
for (const record of records) {
  if (!allowedCategories.has(record.category)) {
    throw new Error(`Unexpected category for ${record.id}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    record_count: records.length,
    category_counts: categoryCounts(records),
  },
  taxonomy,
  records,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
