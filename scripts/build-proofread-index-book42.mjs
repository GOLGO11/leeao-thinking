import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '042.挑战李敖——敖语录');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const keptEdits = [
  ['LAT042-003', '情爱', '男女判断次序', '男女,判断,情爱'],
  ['LAT042-004', '政治', '清流投浊', '清流,政治,台湾'],
  ['LAT042-005', '情爱', '长寿与婚姻', '长寿,婚姻,情爱'],
  ['LAT042-006', '情爱', '男女冲突和解', '男女,冲突,情爱'],
  ['LAT042-007', '政治', '政治提拔', '提拔,打压,政治'],
  ['LAT042-008', '人格', '真话缺点', '真话,缺点,人格'],
  ['LAT042-009', '政治', '政府沟通', '政府,人民,政治'],
  ['LAT042-010', '情爱', '感官情迷', '男女,感官,情爱'],
  ['LAT042-011', '政治', '政客忏悔', '政治家,政客,政治'],
  ['LAT042-012', '写作', '鬼话文体', '情书,传单,道歉信'],
  ['LAT042-013', '政治', '假民主', '假民主,台湾,政治'],
  ['LAT042-016', '方法', '正视问题', '问题,解决,方法'],
  ['LAT042-017', '法权', '书与牢狱', '写书,坐牢,法权'],
  ['LAT042-018', '政治', '选举作弊', '选举,作弊,政治'],
  ['LAT042-019', '政治', '人民选总统', '总统,人民,政治'],
  ['LAT042-020', '人格', '真话好话', '真话,好话,人格'],
  ['LAT042-021', '方法', '做到难事', '人生,快乐,方法'],
  ['LAT042-022', '法权', '主持正义', '天道,正义,法权'],
  ['LAT042-023', '情爱', '婚姻长短', '结婚,幸福,情爱'],
  ['LAT042-024', '政治', '坏同志各异', '政党,同志,政治'],
  ['LAT042-025', '情爱', '婚姻知识', '婚姻,女人,情爱'],
  ['LAT042-026', '情爱', '感情失智', '感情,理智,情爱'],
  ['LAT042-028', '人格', '自我精彩', '自我,演说,人格'],
  ['LAT042-029', '政治', '政党政治败坏', '政党政治,国民党,民进党'],
  ['LAT042-030', '方法', '邻居界限', '邻居,界限,方法'],
  ['LAT042-031', '政治', '政党拿钱', '民进党,国民党,政治'],
  ['LAT042-033', '政治', '政治脸皮', '政治,脸皮,政治'],
  ['LAT042-034', '政治', '势力势利视野', '国民党,民进党,新党'],
  ['LAT042-035', '方法', '怕死冒险', '怕死,冒险,方法'],
  ['LAT042-037', '方法', '疯的自知', '哲学家,科学家,方法'],
  ['LAT042-038', '政治', '选举语言', '选举,语言,政治'],
  ['LAT042-039', '人格', '精神上升', '精神,肉体,人格'],
  ['LAT042-040', '文化', '衣裳要人', '衣裳,人,文化'],
  ['LAT042-041', '政治', '选举质量', '选举,台湾,政治'],
  ['LAT042-042', '情爱', '成功夫妻', '丈夫,妻子,情爱'],
  ['LAT042-043', '情爱', '女人五心', '女人,男人,情爱'],
  ['LAT042-045', '情爱', '金钱变坏', '男人,女人,情爱'],
  ['LAT042-048', '政治', '鲁莽进步', '民主进步,民进党,政治'],
  ['LAT042-049', '人格', '锤子脊梁', '前卫,后台,人格'],
  ['LAT042-050', '方法', '抓鼠标准', '猫,老鼠,方法'],
];

const dropped = [
  ['LAT042-001', '以性别笑话为主，思想可迁移性偏低。'],
  ['LAT042-002', '主要是自我神话和被骂场景，索引价值不足。'],
  ['LAT042-014', '政党辱骂性强，独立判断弱。'],
  ['LAT042-015', '个人代沟感受较轻，思想密度不足。'],
  ['LAT042-027', '语义较绕，更多是男女笑话。'],
  ['LAT042-032', '人物类型笑话多于可检索判断。'],
  ['LAT042-036', '个人年龄感慨较强，方法论不够清晰。'],
  ['LAT042-044', '过度依赖2000年前后政党人事情境。'],
  ['LAT042-046', '即时选举骂句，独立思想性不足。'],
  ['LAT042-047', '辱骂性政党比喻，保留价值不如同组政治条目。'],
];

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

const recordsById = new Map(extraction.records.map((record) => [record.id, record]));
const records = keptEdits.map(([sourceId, category, title, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceId}`);
  }
  const source = recordsById.get(sourceId);
  if (!source) {
    throw new Error(`Missing extraction record ${sourceId}`);
  }
  return {
    ...source,
    id: `LAT042-${String(index + 1).padStart(3, '0')}`,
    round: '校对轮',
    status: '已校对',
    category,
    title,
    keywords,
    source_id: sourceId,
  };
});

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮压缩纯笑话、人身嘲讽、即时选战人事判断和思想密度偏低的短句，保留可独立检索的政治、情爱、方法、人格等判断；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除纯笑话、人身嘲讽、即时人事骂句和独立检索价值不足的语录。',
      '保留政治、情爱、方法、人格等类别中能脱离当日语境被检索的判断。',
    ],
    dropped: dropped.map(([id, reason]) => ({
      id,
      title: recordsById.get(id)?.title ?? '',
      reason,
    })),
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
  '# 《挑战李敖——敖语录》思想索引校对说明',
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
  ...payload.proofreading.dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 校对说明',
  '',
  '本书短语录密度高，但笑话和即时政治人事判断也多。校对轮保留可独立检索的思想判断，删除纯笑话、辱骂性比喻、过度依赖2000年前后选举人事的短句，以及方法论或人格判断不够清晰的段落。',
  '',
  '`description` 字段仍全部沿用提取轮中的源文本原段落，未做改写。',
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
