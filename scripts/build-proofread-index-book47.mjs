import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '047.一个预备军官的日记');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT047-006', '夹缝用时属于过细技巧，已由时时用功、新进程和集中工作覆盖。'],
  ['LAT047-009', '少支出读英文偏短期生活安排，读书方法已由英文泛读、新进程等条目展开。'],
  ['LAT047-012', '沉默转变主题已由内敛蜕变和沉着有力条目完整覆盖。'],
  ['LAT047-013', '独立心灵是短条，个人主义与人格独立已由苦痛成珠、理智批评等条目展开。'],
  ['LAT047-015', '沉着有力与内敛蜕变重复，后者更完整地呈现自我锻炼过程。'],
  ['LAT047-019', '孤独群居承接乐群孤独，保留前段即可涵盖核心判断。'],
  ['LAT047-022', '少驳多立偏通信策略，思想方法的独立性不如写实主义和价值判断集中。'],
  ['LAT047-024', '不为女人扰混入花费与人情细节，情爱节制主题已有不陷女人、忘情主义等条目。'],
  ['LAT047-025', '表现肉体只是后文权利论的发端，保留肉体权利条目即可覆盖。'],
  ['LAT047-028', '贤妻错觉停留在引出话题，工业女性和人格重复条目展开更充分。'],
  ['LAT047-030', '补偿择偶主要转述外部社会学研究，李敖自己的判断由人格重复条目保留。'],
  ['LAT047-032', '不苛求伴侣偏具体劝婚，情爱观的独立判断不如爱情束缚、无害则试等条目。'],
  ['LAT047-033', '反高调演说大量为现场反应，写作/演说思想不够集中。'],
  ['LAT047-039', '滑稽之雄后半截断在诗前，作为独立文化判断不完整。'],
  ['LAT047-043', '反映时代较短，文化移植和规范变迁已覆盖时代/思想关系。'],
  ['LAT047-055', '反叛回忆录偏私人草稿记录，自传价值和百万自传条目更完整。'],
  ['LAT047-064', '锻炼必要过短，写作锻炼主题已由题材处理和英文平易覆盖。'],
  ['LAT047-069', '同情支柱过短，已由同情了解条目展开。'],
  ['LAT047-076', '日记特色过短，日记之道条目已完整说明日记方法。'],
  ['LAT047-078', '集火性史与中国性史重复，保留方法更明确的中国性史条目。'],
  ['LAT047-079', '拖死狗读书是短期自嘲式读书法，方法索引价值有限。'],
  ['LAT047-081', '研究时间是求职条件短句，集中工作条目更能呈现时间方法。'],
  ['LAT047-086', '文章难登过短，政治/出版压抑判断尚未展开。'],
  ['LAT047-087', '旧我已变偏返乡情绪记录，自我蜕变已有内敛蜕变和只像李敖。'],
  ['LAT047-088', '恋爱开明混入家事和购物情境，恋爱自由主题已有更直接条目。'],
  ['LAT047-091', '输血论主要来自外部电影与引语，李敖自己的判断不够展开。'],
  ['LAT047-092', '恋爱自由过短，情爱自由与家庭干涉主题已由感情自由、肉体权利等条目覆盖。'],
  ['LAT047-097', '退伍担当是短时情境记录，人格判断不够展开。'],
  ['LAT047-098', '晚成作家为资料摘列，李敖自己的知识判断不足。'],
]);

const overrides = new Map([
  ['LAT047-001', { title: '禁役权利', keywords: '禁役,兵役法,法权' }],
  ['LAT047-004', { title: '迎接生活', keywords: '劳动,自然,文化' }],
  ['LAT047-005', { title: '豪爽不灭', keywords: '豪爽,理智,人格' }],
  ['LAT047-007', { title: '时时用功', keywords: '用功,零碎时间,方法' }],
  ['LAT047-010', { title: '力量敬重', keywords: '力量,敬重,人格' }],
  ['LAT047-011', { title: '新式文人', keywords: '文人,行动,文化' }],
  ['LAT047-016', { title: '内敛蜕变', keywords: '内敛,蜕变,人格' }],
  ['LAT047-020', { title: '苦痛成珠', keywords: '苦痛,人道主义,人格' }],
  ['LAT047-026', { title: '钻入环境', keywords: '环境,经验,方法' }],
  ['LAT047-027', { title: '亲历写实', keywords: '写实,亲历,方法' }],
  ['LAT047-031', { title: '人格重复', keywords: '人格,心理需要,情爱' }],
  ['LAT047-036', { category: '法权', title: '肉体权利', keywords: '传统,肉体,法权' }],
  ['LAT047-038', { title: '幽默救命', keywords: '幽默,人生,文化' }],
  ['LAT047-040', { title: '理智批评', keywords: '理智,批评,方法' }],
  ['LAT047-041', { title: '思想自由', keywords: '思想自由,平等,法权' }],
  ['LAT047-045', { title: '规范变迁', keywords: '法律,道德,法权' }],
  ['LAT047-050', { category: '知识', title: '精神生命', keywords: '文化累积,立言,知识' }],
  ['LAT047-052', { title: '反权威引证', keywords: '逻辑,权威,方法' }],
  ['LAT047-054', { title: '中国残忍史', keywords: '历史,人道主义,知识' }],
  ['LAT047-058', { title: '英文进程', keywords: '英文,集中,方法' }],
  ['LAT047-061', { title: '忍耐寂寞', keywords: '交游,寂寞,方法' }],
  ['LAT047-066', { title: '现实基础', keywords: '金钱,现实,方法' }],
  ['LAT047-070', { title: '拆穿关公', keywords: '历史人物,偶像,知识' }],
  ['LAT047-073', { title: '自由计价', keywords: '自由,冤狱,法权' }],
  ['LAT047-077', { title: '中国性史', keywords: '性史,社会学,写作' }],
  ['LAT047-082', { title: '实践哲学', keywords: '经验,理解,知识' }],
  ['LAT047-083', { title: '军中权力', keywords: '军中,权力,政治' }],
  ['LAT047-089', { title: '只像李敖', keywords: '性灵,自我,人格' }],
  ['LAT047-096', { title: '无害则试', keywords: '女人,快乐,情爱' }],
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
    return {
      ...record,
      ...edit,
      id: `LAT047-${String(index + 1).padStart(3, '0')}`,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} in ${record.source_id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除过短方法、小型生活安排、外部资料占主体、情爱观重复、写作计划重复和现场反应过重的条目，保留军中锻炼、新式文人、写实方法、性礼教批判、思想自由、规范变迁、自由计价、日记方法、中国性史、自传计划和集中工作等骨干段落；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除过短方法、小型生活安排、外部资料占主体、现场反应过重和重复覆盖的条目。',
      '压缩情爱观和读书方法的密集处，保留能独立检索并代表李敖判断的原文段落。',
      '保留军中锻炼、新式文人、写实方法、性礼教批判、思想自由、自由计价、日记方法、中国性史、自传计划和集中工作等骨干条目。',
    ],
    dropped,
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

const noteLines = [
  '# 《一个预备军官的日记》思想索引校对说明',
  '',
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  `- 来源目录：${payload.book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 校对说明',
  '',
  '本书篇幅大，提取轮有意识略宽，保留了较多军中生活、情爱观、写作计划和方法短条。校对轮压掉过短技巧、重复情爱判断、外部资料占主体、现场反应过重和单纯生活安排类条目，使索引集中在军中锻炼、新式文人、写实方法、性礼教批判、思想自由、自由计价、日记方法、中国性史、自传计划和集中工作等主轴上。',
  '',
  '`description` 字段全部沿用提取轮中的源文本原段落，未做改写。',
  '',
];
fs.writeFileSync(path.join(outputDir, '校对说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread ${payload.book.sequence}.${payload.book.title}: ${records.length} records. ` +
    `Dropped: ${dropped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
