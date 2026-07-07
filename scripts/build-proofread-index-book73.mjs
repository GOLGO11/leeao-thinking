import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 73;
const bookTitle = '要把金针度与人';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT073-001', '段落主要是自述读书之多，真正的读书习惯与方法已由《分尸读书法》条目完整承载。'],
  ['LAT073-002', '段落篇幅集中在陈梦雷生平与《古今图书集成》规模，思想密度不足，且“集天下之书”由后续条目承载。'],
  ['LAT073-032', '段落是梁启超辛亥以后履历，未承载提取轮标题所说的文体解放判断。'],
  ['LAT073-094', '段落只有“这种大胆的革命性言论”一句，依赖上文，独立检索性不足。'],
  ['LAT073-115', '段落只有“中国第一部文法书的由来”一句，信息性过强，思想判断不足。'],
  ['LAT073-120', '段落仅以陪葬《相马经》说明古人重视马，趣味性强于思想密度。'],
  ['LAT073-124', '段落主要概述《天工开物》内容范围，实学批判由下一条完整承载。'],
  ['LAT073-131', '段落依赖前文棋书归类说明，单独看只剩书目结构提示。'],
  ['LAT073-174', '段落与代序中“集天下之书为一书”重复，且偏《通志》书目介绍。'],
  ['LAT073-207', '段落重点是配图来源和出版操作，过细且偏资料展示，不作为思想索引保留。'],
]);

const overrides = new Map([
  ['LAT073-003', { title: '集旧中国天下之书为一书' }],
  ['LAT073-004', { title: '古书要化腐朽为神奇' }],
  ['LAT073-007', { title: '拙劣著作只配藏拙' }],
  ['LAT073-012', { category: '方法', title: '四部分类暴露思考混乱' }],
  ['LAT073-013', { title: '深知传统后才能整理传统' }],
  ['LAT073-018', { title: '训诂可通向实事求是' }],
  ['LAT073-024', { category: '文化', title: '定一尊会挤出异端学问' }],
  ['LAT073-025', { title: '大书只大而无用还不够' }],
  ['LAT073-037', { title: '伪书也可保存思想材料' }],
  ['LAT073-043', { title: '反谶纬须连着反司法黑暗' }],
  ['LAT073-047', { category: '文化', title: '以人为重才能反妖妄' }],
  ['LAT073-055', { category: '人格', title: '六经注我是思想气魄' }],
  ['LAT073-058', { category: '文化', title: '道统捏造必须被拆穿' }],
  ['LAT073-059', { category: '文化', title: '刘基可贵在反迷信' }],
  ['LAT073-061', { category: '文化', title: '乖僻中也可有进步独见' }],
  ['LAT073-063', { title: '李贽有思想自由和殉道气魄' }],
  ['LAT073-070', { category: '方法', title: '孟子影响中国人推理' }],
  ['LAT073-079', { category: '文化', title: '太平经可见民间追寻' }],
  ['LAT073-081', { title: '十翼非孔子作须辨伪' }],
  ['LAT073-092', { title: '王安石不肯一切不事事' }],
  ['LAT073-102', { category: '人格', title: '好官不该以不坏自夸' }],
  ['LAT073-108', { title: '救荒实用胜过理气心性' }],
  ['LAT073-112', { title: '说文由论战书转成字典' }],
  ['LAT073-117', { category: '方法', title: '不可以今格苛求古人' }],
  ['LAT073-122', { category: '文化', title: '中国医学史有巫医底色' }],
  ['LAT073-127', { category: '人格', title: '民生实事需要有心人' }],
  ['LAT073-130', { category: '方法', title: '棋书归兵类暴露分类观' }],
  ['LAT073-134', { title: '先天下忧是知识分子风范' }],
  ['LAT073-139', { category: '人格', title: '汪中耻为无用之学' }],
  ['LAT073-153', { title: '李商隐不只是女人诗' }],
  ['LAT073-158', { title: '三国演义会重塑历史印象' }],
  ['LAT073-159', { title: '西游记写出伪善与反抗' }],
  ['LAT073-175', { category: '知识', title: '二十略才是通志精华' }],
  ['LAT073-185', { title: '旧选本败在文章挂帅' }],
  ['LAT073-188', { title: '文章标准在表达什么和好不好' }],
  ['LAT073-191', { title: '古书笼统源于思想一元化' }],
  ['LAT073-199', { title: '现代观点可重做中国名著' }],
  ['LAT073-200', { title: '要从古典中寻找新义' }],
  ['LAT073-206', { category: '方法', title: '古书规格也要配合时代' }],
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
    .replace(/[《》“”‘’"!?.,，。！？、：；（）()\s]+/g, '')
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
      '校对轮删除自我铺垫、人物履历、上下文残句、纯书目资料、重复方法表述和过细出版操作；保留能独立检索的读书方法、古书处理、分类方法、思想史判断、政法文化批评、人格判断、文学史判断与情爱观照。description 未改写。',
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
  '- 保留可独立检索的读书方法、古书处理、现代分类、版本观念、思想人物判断、政法文化批评、文学史判断和写作观。',
  '- 删除自我铺垫、人物履历、上下文残句、纯书目资料、重复方法表述、过细出版操作，以及不能独立承载思想的资料性段落。',
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
