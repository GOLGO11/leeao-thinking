import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '030.千秋万岁编外集');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT030-002', '联合国结尾短评与前一条国际法双重标准判断重复，校对轮保留更有分析密度的前一条。'],
  ['LAT030-005', '国大代表腐败是短事实结论，已由选举操纵条承载政治判断。'],
  ['LAT030-008', '夜半处决段落叙事性与革命志士抒情较重，秘密监狱机制已由捆绑与审讯两条承载。'],
  ['LAT030-012', '集中营人数规模偏事实统计，思想判断弱于编号、锁禁与赦免特权三条。'],
  ['LAT030-026', '美国社会歧视段落以现象罗列为主，和本书核心法权、特务、表达自由线索距离较远。'],
  ['LAT030-031', '科学必须全盘接受与前一条科学拒绝折衷、后一条科学民主关系有重叠。'],
  ['LAT030-061', '军费与士兵困苦属于雷震日记中的战时观察，独立思想索引密度不足。'],
  ['LAT030-062', '胡适对苏联看法变化偏国际关系史料，和本书校对轮主线距离较远。'],
  ['LAT030-063', '《自由中国》在军中传播偏刊物影响史，保留后一条写反调招致特务监控即可承载写作线索。'],
  ['LAT030-066', '向法官说明事实段落过短，必须依赖上下文，独立检索价值不足。'],
]);

const overrides = new Map([
  ['LAT030-001', { title: '国际法不能只管别人', keywords: '美国,联合国,国际法,强权政治' }],
  ['LAT030-003', { title: '假选举只是骗人把戏', keywords: '国民党,选举,国大代表,政治' }],
  ['LAT030-004', { title: '选票可以被地方关系操纵', keywords: '国大代表,选举黑幕,地方关系,政治' }],
  ['LAT030-006', { title: '秘密监狱用黑暗捆绑治人', keywords: '秘密监狱,特务,身体自由,法权' }],
  ['LAT030-007', { title: '特务审讯只有暴力和套话', keywords: '特务,审讯,暴力,法权' }],
  ['LAT030-009', { title: '集中营用编号抹掉姓名', keywords: '集中营,编号,人格剥夺,法权' }],
  ['LAT030-010', { title: '暗室锁禁摧毁囚人身体', keywords: '集中营,监禁,身体,法权' }],
  ['LAT030-011', { title: '赦免特权只给军统同志', keywords: '集中营,军统,赦免特权,法权' }],
  ['LAT030-013', { title: '社论署名才对读者负责', keywords: '独立评论,署名,责任,写作' }],
  ['LAT030-014', { title: '吸收科学才能打开未来', keywords: '胡适,现代科学,西方文化,知识' }],
  ['LAT030-015', { title: '大学教授只负责陈列学说', keywords: '大学,学说,真理,方法' }],
  ['LAT030-016', { title: '闭门密议扼杀民主', keywords: '民主,闭门协商,少数民族,政治' }],
  ['LAT030-017', { title: '民主让匹夫对天下有份', keywords: '宪法,民主,民权,法权' }],
  ['LAT030-018', { title: '制衡不是三权并排', keywords: '美国宪法,制衡,司法,法权' }],
  ['LAT030-019', { title: '限制立法权也是制衡', keywords: '议会权,制衡,立法权,法权' }],
  ['LAT030-020', { title: '代表性需要客观制度', keywords: '中央政权,代表性,选举,政治' }],
  ['LAT030-021', { category: '知识', title: '大学首先要有学问自由', keywords: '大学,学问自由,良心自由,知识' }],
  ['LAT030-022', { title: '紧急权必须预先设限', keywords: '紧急权,宪政独裁,法治,法权' }],
  ['LAT030-023', { title: '戒严权只能来自军事必要', keywords: '戒严,军事必要,自由权利,法权' }],
  ['LAT030-024', { title: '国民党使戒严背离法治', keywords: '戒严,国民党,法治,法权' }],
  ['LAT030-025', { title: '政治人格重于文笔才华', keywords: '柏杨,道德勇气,政治人格,人格' }],
  ['LAT030-027', { title: '新宋学容易滑成文字把戏', keywords: '学问,内圣外王,新儒家,知识' }],
  ['LAT030-028', { title: '科学知识不能靠愿望综合', keywords: '意见,科学知识,全盘西化,知识' }],
  ['LAT030-029', { title: '科学方法拒绝本位折衷', keywords: '科学,折衷主义,日本,知识' }],
  ['LAT030-030', { title: '社会科学没有中国特权', keywords: '社会科学,中国社会学,知识' }],
  ['LAT030-032', { title: '民主和科学没有必然同盟', keywords: '科学,民主,认知,知识' }],
  ['LAT030-033', { title: '宪法被遵守才有意义', keywords: '宪法,民主,法治,法权' }],
  ['LAT030-034', { title: '人民可用宪法对抗政府', keywords: '法治,宪法,司法,法权' }],
  ['LAT030-035', { title: '极权法治只许政府解释宪法', keywords: '极权,宪法解释,政府,法权' }],
  ['LAT030-036', { title: '民主法治以宪法兑现为界', keywords: '民主,极权,宪法,法权' }],
  ['LAT030-037', { title: '诱人犯罪牺牲司法正义', keywords: '诱人犯罪,司法,公平,法权' }],
  ['LAT030-038', { title: '执法者不能设陷阱诱人', keywords: '诱人犯罪,警察,正义,法权' }],
  ['LAT030-039', { title: '警察只能执行逮捕', keywords: '警察权,逮捕,民主国家,法权' }],
  ['LAT030-040', { title: '处罚权只能属于法院', keywords: '法院,审问,处罚,法权' }],
  ['LAT030-041', { title: '行政罚不是文字魔术', keywords: '行政罚,违警罚法,宪法,法权' }],
  ['LAT030-042', { title: '违警罚法逼近警察国家', keywords: '违警罚法,警察国家,自由,法权' }],
  ['LAT030-043', { title: '宪法列举自由是限制立法', keywords: '自由,宪法,立法权,法权' }],
  ['LAT030-044', { title: '表达自由不能按工具切割', keywords: '表达自由,出版自由,媒介,法权' }],
  ['LAT030-045', { title: '名誉侵害也须司法救济', keywords: '诽谤,司法程序,表达自由,法权' }],
  ['LAT030-046', { title: '电影也是表达工具', keywords: '电影检查,表达自由,出版自由,法权' }],
  ['LAT030-047', { title: '立法受限才有人民自由', keywords: '立法权,行政权,自由,法权' }],
  ['LAT030-048', { title: '同法同院才是法治', keywords: '法治,法律平等,法院,法权' }],
  ['LAT030-049', { title: '国防监狱遮蔽政治犯', keywords: '火烧岛,政治犯,国防监狱,法权' }],
  ['LAT030-050', { title: '感训只会加深仇恨', keywords: '政治犯,感训,折磨,法权' }],
  ['LAT030-051', { title: '虚假心得反衬冤狱', keywords: '火烧岛,蒋介石,心得,政治' }],
  ['LAT030-052', { title: '政治犯靠纸条互相支援', keywords: '政治犯,互助,难友,人格' }],
  ['LAT030-053', { title: '家信检查把邮政政治化', keywords: '火烧岛,邮政政治化,家信,法权' }],
  ['LAT030-054', { title: '买台湾地图也被审查', keywords: '地图,保防官,政治审查,法权' }],
  ['LAT030-055', { title: '政治身份可以被国家栽造', keywords: '政治犯,冤狱,国民党,政治' }],
  ['LAT030-056', { title: '小报告让政治犯彼此互疑', keywords: '火烧岛,小报告,政治犯,政治' }],
  ['LAT030-057', { title: '互助也会被特务解释成情报', keywords: '火烧岛,特务,难友互助,法权' }],
  ['LAT030-058', { title: '公营事业拿国库补洞', keywords: '公营事业,国库,特权,政治' }],
  ['LAT030-059', { title: '自由主义常只给友方自由', keywords: '钱学森,自由主义,离境自由,法权' }],
  ['LAT030-060', { title: '管头发就是管身体', keywords: '头发政治,国民党,学生管制,政治' }],
  ['LAT030-064', { title: '写反调使人变成问题人物', keywords: '自由中国,特务,写作,写作' }],
  ['LAT030-065', { title: '阅历能识破政治钓鱼', keywords: '殷海光,钓鱼,经验,方法' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除短结论、纯事实统计、重复承载项和偏史料条目。',
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
    '本轮由提取轮进入校对轮，删除短结论、纯事实统计、重复承载和偏史料段落，保留本书关于国际法与强权、特务监狱、集中营、宪政法治、诱人犯罪、警察权、表达自由、政治犯处境、科学方法和写作处境的核心索引；description 仍逐条保留源文本原文段落。',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 56) {
  throw new Error(`Expected 56 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT030-${String(index + 1).padStart(3, '0')}`,
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
