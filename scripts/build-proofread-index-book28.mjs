import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '028.千秋万岁乌鸦求是合集');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT028-011', '孔氏特权保送偏例证，封建特权结构已由“革命政权延续封建”承载。'],
  ['LAT028-020', '侯德健个案偏艺术事件，“政治挂帅”主线已由本书更完整条目承载。'],
  ['LAT028-027', '查禁命令追不上抢书是短结语，后文抢书制度与捉迷藏两条承载力更强。'],
  ['LAT028-029', '段落主要为孙中山原文长引，李敖自己的判断由后续“民国之名不等于民权”承载。'],
  ['LAT028-037', '中门村开端过短，官逼民反与自力救济判断由后续三条集中承载。'],
  ['LAT028-039', '权利被藐视的短警句已被“法律失灵逼出自力救济”和“中门村是警告政府的号角”覆盖。'],
  ['LAT028-043', '历史名词结论过短，保留前条自相矛盾的实证判断。'],
  ['LAT028-046', '复兴文化者不读书与秦孝仪相关条目重复，保留更完整的后文条目。'],
  ['LAT028-050', '段落主要是他人旧文引述，不作为李敖本人思想条目保留。'],
  ['LAT028-051', '段落继续承接他人引文，李敖对自由主义招牌化的判断由后文保留。'],
  ['LAT028-053', '段落为监察纠正理由式法条论证，李敖自己的政治法权判断由下一条承载。'],
  ['LAT028-057', '流芳硬仗是同篇短结论，文字战原则和历史记录两条已足够承载。'],
  ['LAT028-065', '施性忠案短结语偏时评尾声，思想密度弱于本书其他政治迫害条目。'],
  ['LAT028-071', '平静十分钟偏人生处方，本书校对轮保留思想索引承载更强的“智者”条。'],
  ['LAT028-087', '索拉兹朋友式批评条目过短，人权比较的核心判断已由前条承载。'],
  ['LAT028-088', '罗素条目主要是书籍介绍，保留下一条李敖对公营组织的批评。'],
  ['LAT028-091', '郭吉仁案偏个案尾声，小民对抗报老板的法权意义不如其他法权条目集中。'],
  ['LAT028-098', '被贼咬的比喻与“自证无罪比自证其罪更难”同组承载，保留后者。'],
  ['LAT028-106', '李登辉一人选举短评与后文“拥戴”批判重合，保留更完整条目。'],
  ['LAT028-108', '许倬云不通历史偏人物评价，保留后一人竞选与民主自由判断。'],
  ['LAT028-111', '谄媚之言的历史事实批判与前条蒋经国民主化判断重复，保留前条。'],
  ['LAT028-115', '伏虎时机偏旧文件感想，独立检索价值弱于相邻政治方法条目。'],
  ['LAT028-120', '老贼不退的愚忠分析偏人物群像尾声，校对轮删去。'],
  ['LAT028-122', '梁肃戎晚年恋栈偏人物贬评，保留政治犯死刑勇气条。'],
  ['LAT028-124', '十一亿资料是马英九个案饰词，人的身份不能分裂已承载该篇方法判断。'],
  ['LAT028-126', '甘地寸阴例证偏修身逸闻，行政院列席义务条更贴合本书法权主线。'],
  ['LAT028-128', '开放政治犯参选不是让步是短结语，参政权违宪条已承载。'],
  ['LAT028-149', '西藏段落主要转述大使讲话，李敖自己的索引判断不足。'],
  ['LAT028-160', '五权与议会政治条与前文“五权理论与议会政治合不住”高度重复，保留前文。'],
  ['LAT028-162', '佞幸当大臣偏宋楚瑜人物时评，思想承载力弱于同组制度条目。'],
  ['LAT028-165', '赵少康经费短评偏个案政治现实，校对轮删去。'],
]);

const overrides = new Map([
  ['LAT028-022', { title: '审查制度塑造顺民', keywords: '审查制度,歌曲,言论审查,法权' }],
  ['LAT028-031', { title: '刑罚取代自力报复', keywords: '刑法,自力报复,复仇,法权' }],
  ['LAT028-076', { title: '悍然源于自大狂', keywords: '国民党,悍然,自大狂,政治' }],
  ['LAT028-102', { category: '法权', title: '武夫审查书刊越界', keywords: '书刊审查,武夫,出版自由,法权' }],
  ['LAT028-146', { title: '办刊要容许骂自己', keywords: '言论自由,文星,办刊雅量,写作' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除非李敖引文、短弱结论、同组重复承载和偏人物时评项。',
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
    '本轮由提取轮进入校对轮，删除非李敖引文、短弱结论、重复承载和偏人物时评的条目，保留本书关于三民主义、宪法与法权、言论审查、司法迫害、出版查禁、政治犯、人权、历史方法、知识分子人格和写作自处的核心索引；description 仍逐条保留源文本原文段落。',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 137) {
  throw new Error(`Expected 137 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT028-${String(index + 1).padStart(3, '0')}`,
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
