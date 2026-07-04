import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '039.李语录');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT039-007', '折旧与报废混合知识、同志、战友、情人等机智比喻，思想主轴不够集中。'],
  ['LAT039-012', '投资报酬率与报仇率偏语言游戏，校对轮删除。'],
  ['LAT039-022', '烟酒不沾偏个人抗议姿态，独立思想索引价值弱于其他政治条目。'],
  ['LAT039-025', '党外活动偏个人回应，政治判断承载不足。'],
  ['LAT039-030', '小人与敌人偏报复姿态，且与后文小人条目重复。'],
  ['LAT039-039', '继承敌人过短且含义需强依赖语境。'],
  ['LAT039-040', '走热路与烧冷灶偏文化俏皮话，校对轮删除。'],
  ['LAT039-042', '钢琴与羊偏广告讽刺，独立思想密度不足。'],
  ['LAT039-046', '小人物与大人物偏自我标签，承载力较弱。'],
  ['LAT039-053', '加入哪个党偏政治玩笑，校对轮保留更完整的国民党批判条目。'],
  ['LAT039-058', '代办之爱过短，情爱判断不如同书其他条目完整。'],
  ['LAT039-073', '赢过别人与输了自己过短且泛化。'],
  ['LAT039-082', '年少气盛与年老气盛偏短句机锋，删除。'],
  ['LAT039-083', '离合际遇偏人生感叹，思想分类价值不足。'],
  ['LAT039-086', '制造敌人偏售书机锋，写作思想承载较弱。'],
  ['LAT039-099', '选举两用药偏短讽刺，政治线索已有更完整条目。'],
  ['LAT039-102', '两种死过短，宗教判断不够展开。'],
  ['LAT039-105', '论胡适只是一句人物评语，独立知识索引价值不足。'],
  ['LAT039-111', '制小人原则与后文小人习性、远小人条目重复。'],
  ['LAT039-112', '报仇也别太晚与同书报仇、敌人条目重复。'],
  ['LAT039-114', '文化美容偏短讽刺，文化判断承载不足。'],
  ['LAT039-120', '绝交一得偏处世短句，与解释、敌友条目相近。'],
  ['LAT039-122', '动物园与公园偏短机锋，方法论承载不足。'],
  ['LAT039-127', '神话三种偏政治讽刺清单，校对轮压缩两党讽刺密度。'],
  ['LAT039-129', '国民党作家过短，写作判断不如读者、奋笔、作家条目完整。'],
  ['LAT039-135', '仲裁者条件过短，保留现实与理想、敌人困扰等更完整人格条目。'],
  ['LAT039-139', '国民党与民进党没有未来过短，且两党政治判断已较密。'],
  ['LAT039-141', '割手指比喻过短且需语境解释。'],
  ['LAT039-157', '少赚与多赔与 LAT039-177 同义相近，保留后者。'],
  ['LAT039-159', '道德与不道德过短，独立思想承载不足。'],
  ['LAT039-161', '醒脑与提神偏朋友敌人机锋，删除。'],
  ['LAT039-163', '革命过犹不及过短，保留革命同伴、结党革命等条目。'],
  ['LAT039-167', '正义与人过短，正义线索保留政党与正义等更可检索条目。'],
  ['LAT039-171', '量力与力量过短，任务判断不够展开。'],
  ['LAT039-173', '谣言之起过短，校对轮删除。'],
  ['LAT039-174', '聪明人与笨蛋偏短机锋，删除。'],
  ['LAT039-179', '扮演谁偏自我姿态，独立思想价值不足。'],
  ['LAT039-180', '快慢王八蛋偏粗短政治骂句，保留更有判断结构的政党怪物条目。'],
]);

const overrides = new Map([
  ['LAT039-002', { title: '纸上真话胜过纸上马屁' }],
  ['LAT039-003', { title: '得失都可喜' }],
  ['LAT039-004', { title: '成熟是知道后说不知道' }],
  ['LAT039-009', { title: '容忍批评维护自由' }],
  ['LAT039-011', { title: '是非常是相对比较' }],
  ['LAT039-013', { title: '文艺工作者不能逃避困穷' }],
  ['LAT039-014', { title: '有所不为而后有为' }],
  ['LAT039-018', { title: '傲骨胜过骄气' }],
  ['LAT039-021', { title: '勇士只需一个前进理由' }],
  ['LAT039-023', { title: '淤泥中不与泥同调' }],
  ['LAT039-024', { title: '同路人容易成陌路' }],
  ['LAT039-029', { title: '材料不对努力无用' }],
  ['LAT039-033', { title: '解决问题胜过分担' }],
  ['LAT039-049', { title: '自由民主不能限量配给' }],
  ['LAT039-056', { category: '知识', title: '读书胜过行路' }],
  ['LAT039-092', { title: '黑暗中也可挖光明' }],
  ['LAT039-104', { title: '作家不管畅销都写书' }],
  ['LAT039-119', { title: '政权决定动口动手法' }],
  ['LAT039-193', { title: '师势压过正义' }],
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
    '- 分类策略：沿用 8 个原子分类；本轮压缩短语录中的机锋句、重复政治讽刺、报仇与小人重复线索，保留能独立检索的思想判断。',
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
    '校对动作只涉及条目取舍、标题压缩、个别分类修正和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 分类修正',
    '',
    '- LAT039-056：由“人格”改为“知识”，原文主旨是读书与行路的知识取向比较。',
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
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮删除短到只剩机锋、偏粗短政治骂句、重复报仇或小人线索、纯个人姿态和弱情爱笑话，保留政治批判、人格箴言、方法论、写作观、知识批评、文化观察与法权判断中可独立检索的语录。description 仍逐条保留源文本原文段落。',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...override,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      round: book.round,
      status: book.status,
      proofread_from: record.id,
    };
  });

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
  proofread: {
    from_round: originalPayload.book.round,
    original_count: originalPayload.records.length,
    retained_count: records.length,
    dropped_count: dropReasons.size,
    dropped: [...dropReasons.entries()].map(([id, reason]) => ({ id, reason })),
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records, taxonomy).map((item) => `${item.category}:${item.count}`).join(' '));
