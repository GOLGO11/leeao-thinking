import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '027.李敖新刊');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT027-008', '与“政治也是专业”和“明星政治暴露专业贫乏”同组承载，校对轮删除较短的结论句。'],
  ['LAT027-012', '质询经过偏铺垫，行政拒答和民法拆穿两条已能承载该组判断。'],
  ['LAT027-015', '“房事也动不了国民党”是短结语，思想承载力弱于前两条法律与行政分析。'],
  ['LAT027-022', '台大陈情旧事偏背景，五四精神与学生气魄两条已足以承载该篇思想。'],
  ['LAT027-038', '三民主义口头禅与“永不实行也永不放弃”高度重合，保留后者。'],
  ['LAT027-045', '冯作民契约细节偏个案例证，第三者责任和密件证据两条已能覆盖。'],
  ['LAT027-047', '秘件内容偏人物情节和攻击性例证，保留“密件出土才见圈套”的方法层判断。'],
  ['LAT027-048', '谢聪敏回台欢迎假象偏时事情节，后续双杀、连环套和政治无情已承载核心。'],
  ['LAT027-050', '革命组织回顾牺牲者一条偏个人恩怨，校对轮保留更可检索的政治结构判断。'],
  ['LAT027-055', '短结论已由“台独与情治合成双杀”和“冤案成局后难以更正”承载。'],
  ['LAT027-066', '段落主要是孙文原话，李敖自己的判断由“三民主义像变形虫”承载。'],
  ['LAT027-067', '党史删话事实太短，校对轮保留综合性更强的“三民主义像变形虫”。'],
  ['LAT027-071', '王昇履历细节偏人物攻击，文武合一和文证揭迫害两条已承载。'],
  ['LAT027-083', '蒋介石遗嘱旁证与蒋经国代笔遗嘱问题重合，保留法律结构更清楚的条目。'],
  ['LAT027-085', '司法院长扶同为恶是情绪性短结论，补签伪造和强制程序两条更稳。'],
  ['LAT027-086', '检方回函细节偏案件过程，校对轮保留代笔遗嘱强制程序的法权判断。'],
  ['LAT027-088', '假三毛逃避现实与既有三毛主题接近，保留真三毛社会控诉和辑刊文征。'],
  ['LAT027-093', '老兵哀呼是个案尾声，生病退学不该赔偿和军校责任已能承载。'],
  ['LAT027-095', '院长回函往返偏具体书信过程，知犯罪嫌疑应告发和忠诚反对者怀柔已覆盖。'],
  ['LAT027-104', '龚德柏办报履历偏传记铺垫，保留秘录流传与言论自由勇气两条。'],
]);

const overrides = new Map([
  ['LAT027-006', { title: '政治也是专家职业', keywords: '政治专业,专家职业,明星政治,知识' }],
  ['LAT027-007', { title: '政治秀暴露专业贫乏', keywords: '政治秀,明星政治,专业贫乏,政治' }],
  ['LAT027-036', { title: '用对造律师反证报社责任', keywords: '广告责任,律师证言,报社,方法' }],
  ['LAT027-044', { title: '偏执狂把责任全归别人', keywords: '偏执狂,责任转嫁,冯作民,人格' }],
  ['LAT027-049', { title: '台独与情治合成双杀', keywords: '台独,情治,双杀作业,政治' }],
  ['LAT027-052', { title: '咬人有活咬死咬', keywords: '咬人,移花接木,冤案,方法' }],
  ['LAT027-054', { title: '冤案成局后难以更正', keywords: '冤案,情治,将错就错,法权' }],
  ['LAT027-068', { title: '三民主义像变形虫', keywords: '三民主义,民生主义,变形虫,政治' }],
  ['LAT027-074', { title: '人分先知和做秀者', keywords: '先知,做秀,曲突徙薪,人格' }],
  ['LAT027-092', { category: '法权', title: '军校也有照顾责任', keywords: '军校,照顾责任,教育责任,法权' }],
  ['LAT027-096', { title: '忠诚反对者受怀柔', keywords: '忠诚反对者,怀柔,朱高正,政治' }],
  ['LAT027-099', { title: '解释法条要看上下文', keywords: '法条解释,上下文,context,方法' }],
  ['LAT027-111', { category: '法权', title: '党务不能越过法令', keywords: '党务,法令,党限,法权' }],
  ['LAT027-112', { title: '懦弱舆论惯坏箝制者', keywords: '舆论,箝制,报界,文化' }],
  ['LAT027-114', { title: '渐进改革拒绝逼反', keywords: '渐进改革,逼反,文星,方法' }],
  ['LAT027-115', { title: '政治犯不是刑事犯', keywords: '政治犯,刑事犯,法理,法权' }],
]);

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
    'proofread_from',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；删除重复承载、短弱结论、偏人物情节和纯例证项。',
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
      lines.push(`- 提取轮编号：${record.proofread_from}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const counts = categoryCounts(records, taxonomy);

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮由提取轮 ${originalRecords.length} 条校对为 ${records.length} 条，删除 ${dropReasons.size} 条。`,
    '',
    '校对动作只涉及条目取舍、分类、标题、关键词和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮由提取轮进入校对轮，删除短弱结论、个案铺垫、重复承载和偏人物情节的条目，保留本书关于出版自由、禁书与自印、遗教与三民主义、司法报阀、戒严与政治犯、文星旧案、法条解释和知识分子勇气的核心索引；description 仍逐条保留源文本原文段落。',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 98) {
  throw new Error(`Expected 98 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT027-${String(index + 1).padStart(3, '0')}`,
    book: bookBase.title,
    round: bookBase.round,
    status: bookBase.status,
    proofread_from: record.id,
  };
});

const allowedCategories = new Set(taxonomy);
for (const record of records) {
  if (!allowedCategories.has(record.category)) {
    throw new Error(`Unexpected category for ${record.id}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...bookBase,
    record_count: records.length,
    category_counts: categoryCounts(records, taxonomy),
  },
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${bookBase.title} ${bookBase.round}: ${records.length} records.`);
