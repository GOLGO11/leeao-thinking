import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 71;
const bookTitle = '读史指南';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT071-001', '对照表排列说明偏技术性，独立思想索引价值不足。'],
  ['LAT071-005', '“书中之王”短句与后文百科规模和工具书价值条目重复。'],
  ['LAT071-006', '段落以“像：”收尾，是下文例举的引子，校对轮用索引方法完整段落承载。'],
  ['LAT071-008', '“来龙去脉值得研究”过短，像文章提示语，缺少独立思想密度。'],
  ['LAT071-009', '版本问题开场语偏结构提示，后文具体版本辨误条目更有检索价值。'],
  ['LAT071-012', '编纂年代说明偏事实节点，已由真正编者、掠美与成果攫取条目覆盖。'],
  ['LAT071-018', '铜活字印刷评价后接引文，段落未完整展开；相关价值由皇权攫取成果条目承载。'],
  ['LAT071-020', '原始文件印刷情况后接他人回忆，偏版本材料引子。'],
  ['LAT071-021', '完整本不超过十一套偏单一版本稀见事实，和珍贵难得条目重复。'],
  ['LAT071-025', '加编索引的功能已由“浩瀚类书必须索引”和“目录不能替代索引”两条充分展开。'],
  ['LAT071-029', '索引功德的总结句与校正沿袭错误条目重复。'],
  ['LAT071-030', '最大百科规模与《古今图书集成》研究中的百科价值条目重复。'],
  ['LAT071-032', '既有索引不足用是例证性铺垫，保留更完整的索引方法批评即可。'],
  ['LAT071-036', '死编书不能活用书与不会编索引、目录不能替代索引两条重叠。'],
  ['LAT071-039', '妇女地位材料只是工具书应用例之一，过于细项。'],
  ['LAT071-041', '段落以“等学科”起首，依赖前文列举，独立可读性不足。'],
]);

const overrides = new Map([
  ['LAT071-002', { category: '方法', title: '四部要籍须别择互补' }],
  ['LAT071-003', { title: '两套丛书可互补藏书' }],
  ['LAT071-004', { title: '早年用功连贯后来成绩' }],
  ['LAT071-007', { title: '百科材料能够一检即得' }],
  ['LAT071-010', { title: '集成真正编者是陈梦雷' }],
  ['LAT071-011', { title: '陈梦雷苦命中编成百科巨著' }],
  ['LAT071-013', { title: '雍正序抹去陈梦雷姓名' }],
  ['LAT071-015', { category: '政治', title: '掠美者不配纂修名义' }],
  ['LAT071-016', { title: '校订不能冒充原编纂' }],
  ['LAT071-017', { title: '除名陈梦雷是权力掠夺' }],
  ['LAT071-019', { title: '皇权攫取陈梦雷成果' }],
  ['LAT071-022', { title: '版本说法必须辨误' }],
  ['LAT071-024', { title: '集成价值在百科规模' }],
  ['LAT071-026', { title: '浩瀚类书必须索引' }],
  ['LAT071-027', { title: '繁琐目录不能替代索引' }],
  ['LAT071-028', { title: '索引整理能校正沿袭错误' }],
  ['LAT071-031', { title: '古籍研究苦于无从下手' }],
  ['LAT071-033', { title: '陈梦雷分类重编中国古籍' }],
  ['LAT071-034', { title: '分类汇编省去穷搜旁讨' }],
  ['LAT071-035', { title: '治学缺陷在缺乏索引' }],
  ['LAT071-037', { title: '文星索引补足备检需要' }],
  ['LAT071-040', { title: '祥刑典保留法制史资料' }],
  ['LAT071-042', { title: '旧式史部浩繁难读' }],
  ['LAT071-043', { title: '历史入民间要另想法子' }],
  ['LAT071-044', { title: '说书承担教育娱乐功能' }],
  ['LAT071-045', { title: '各朝需要有趣历史教科书' }],
  ['LAT071-046', { title: '通俗历史帮助寻出脉络' }],
  ['LAT071-047', { title: '读东周演义可以引古证今' }],
  ['LAT071-049', { title: '光武帝推崇不合作知识分子' }],
  ['LAT071-050', { title: '佛教谶纬深刻影响中国思想' }],
  ['LAT071-051', { title: '三国演义塑造民间信仰' }],
  ['LAT071-054', { title: '民族文化融合形成中国' }],
  ['LAT071-056', { title: '唐朝文化胡化但武力不足' }],
  ['LAT071-057', { category: '政治', title: '唐朝以人才政策治天下' }],
  ['LAT071-058', { title: '科举取士体现人才治术' }],
  ['LAT071-060', { title: '五代混同有助中国壮大' }],
  ['LAT071-063', { title: '宋代君权削弱宰相尊严' }],
  ['LAT071-065', { title: '元史范围不该窄解' }],
  ['LAT071-066', { category: '方法', title: '读元史不能陷入种族曲解' }],
  ['LAT071-067', { title: '元朝政治并非全然黑暗' }],
  ['LAT071-068', { title: '明太祖开启特工政治' }],
  ['LAT071-069', { title: '明朝中央集权实为独夫集权' }],
  ['LAT071-070', { title: '明朝政治闹剧是民族耻辱' }],
  ['LAT071-072', { title: '清朝税制改革惠及百姓' }],
  ['LAT071-073', { title: '评清须看未有变局强敌' }],
  ['LAT071-076', { title: '历史一词显示文化交流' }],
  ['LAT071-077', { title: '会读历史演义少力大得' }],
  ['LAT071-079', { title: '校订演义需要苦心调剂' }],
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
    'source_id',
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

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'，。！？、：；;()\s]+/g, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(
        `### ${record.id}｜${record.title}`,
        '',
        record.description,
        '',
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
        '',
      );
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const extractionIds = new Set(extraction.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!extractionIds.has(id)) {
    throw new Error(`Unknown extraction id: ${id}`);
  }
}

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    const category = edit.category ?? record.category;
    const title = edit.title ?? record.title;

    return {
      ...record,
      ...edit,
      id: `LAT${String(bookSeq).padStart(3, '0')}-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
      category,
      title,
      keywords: edit.keywords ?? buildKeywords(record, title, category),
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }

  const source = extraction.records.find((item) => item.id === record.source_id);
  if (!source) {
    throw new Error(`Missing source record for ${record.id}`);
  }

  if (record.description !== source.description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除技术性表格说明、文章引子、半截引文提示、纯版本稀见事实、工具书应用细项和重复百科规模条目；保留可独立检索的读书方法、索引方法、版本辨误、著作权归属、历史演义方法和各朝政治文化判断。description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
  dropped,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
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
  `# ${bookTitle}校对说明`,
  '',
  `来源：${path.relative(rootDir, extractionPath).replaceAll(path.sep, '/')}`,
  '',
  `提取轮 ${extraction.records.length} 条；校对轮 ${records.length} 条；删除 ${dropped.length} 条。`,
  '',
  '校对原则：',
  '',
  '- 保留能独立承载李敖读史方法、工具书方法、版本考证、权力批判、历史演义观和朝代政治文化判断的原文段落。',
  '- 删除技术性表格说明、文章引子、半截引文提示、过细版本事实、单纯应用例和与更完整条目重复的段落。',
  '- 只调整取舍、标题和分类；所有 `description` 均沿用提取轮原文段落。',
  '',
  '删除条目：',
  '',
  ...dropped.map((item) => `- ${item.id} ${item.title}：${item.reason}`),
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), note, 'utf8');

console.log(`Proofread ${bookTitle}: ${records.length} records, dropped ${dropped.length}.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
