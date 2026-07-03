import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '033.红色11');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT033-006', '“左倾幼稚病”一条偏短，革命判断已由时间空间、古典共产党、摩登共产党等条目更完整承载。'],
  ['LAT033-009', '共产主义正义性判断过短，并与后文共产主义道德性、崇高主义现实手段等条目重复。'],
  ['LAT033-010', '四类共产党尺度一条与“岛上共产党有多种形态”及“饭票共产党”重复，校对轮保留后文展开更完整者。'],
  ['LAT033-020', '红帽追认一条偏机锋，欲加之罪、政治罪名包装和制造冤狱条目已覆盖其核心。'],
  ['LAT033-029', '刽子手假日一条偏场景化、讽刺性强，独立思想索引价值弱于死刑、判决和监狱制度条目。'],
  ['LAT033-037', '“最讨人厌”一条偏政治情绪判断，校对轮优先保留制度机制和法权逻辑。'],
  ['LAT033-038', '政府不愁没法律整人一条过短，已由“欲加之罪总可找法律包装”更完整承载。'],
  ['LAT033-045', '不断制造共产党一条过短，下一条“从国民党这边入共产党更容易”表达更完整。'],
  ['LAT033-057', '假匪谍配额制造牺牲一条与后一条“缴匪谍是一种配额文化”重复，保留展开更完整者。'],
  ['LAT033-069', '人生阶段论成为习惯与前一条“人生阶段论化解坐牢处遇”重复，保留段落更完整者。'],
  ['LAT033-083', '桥的比喻偏文学收束，思想判断依赖场面和抒情语境，校对轮不单独保留。'],
]);

const overrides = new Map([
  ['LAT033-001', { title: '党国损失压倒无罪' }],
  ['LAT033-002', { title: '办案不靠证据' }],
  ['LAT033-003', { title: '忠诚也会被党国吞噬' }],
  ['LAT033-004', { title: '疲劳审问毁损人格' }],
  ['LAT033-005', { title: '性化刑求制造政治恐怖' }],
  ['LAT033-007', { title: '革命要看时间空间' }],
  ['LAT033-008', { title: '监狱制度化互相折磨' }],
  ['LAT033-011', { title: '儿童履历也能成为罪证' }],
  ['LAT033-012', { title: '口供能补造人生' }],
  ['LAT033-013', { title: '黑牢可转成历练' }],
  ['LAT033-014', { title: '不自由中仍有自由' }],
  ['LAT033-015', { title: '自由被共同不自由纠缠' }],
  ['LAT033-016', { title: '抓匪不抓匪都会制造冤狱' }],
  ['LAT033-017', { title: '案卷技术扭曲证据' }],
  ['LAT033-018', { title: '逼供还要逼人咬人' }],
  ['LAT033-019', { title: '法官护政权不护人权' }],
  ['LAT033-021', { title: '政治罪名可由法律包装' }],
  ['LAT033-022', { title: '罪名不由阶下囚决定' }],
  ['LAT033-023', { title: '精神病也能做成叛乱案' }],
  ['LAT033-024', { title: '法官能扭曲时间证据' }],
  ['LAT033-025', { title: '出狱仍被保人制度拴住' }],
  ['LAT033-026', { title: '政治案辩护会牵连律师' }],
  ['LAT033-027', { title: '被抓就是有罪证明' }],
  ['LAT033-028', { title: '领袖逻辑制造连坐' }],
  ['LAT033-030', { title: '天子门生也不能依法判决' }],
  ['LAT033-031', { title: '监狱斗争分前后阶段' }],
  ['LAT033-032', { title: '诬陷台独符合双方利益' }],
  ['LAT033-033', { title: '上诉会被当成抗拒政府' }],
  ['LAT033-034', { title: '少杀也能自称有良心' }],
  ['LAT033-035', { title: '地理常识也可变宣传罪' }],
  ['LAT033-036', { title: '追随政府失去普通自由' }],
  ['LAT033-039', { title: '硬说是共产党会逼人成真' }],
  ['LAT033-040', { title: '凡人实践共产主义会出问题' }],
  ['LAT033-041', { title: '自由主义连接资本与共产' }],
  ['LAT033-042', { title: '迫害言论自由要换罪名' }],
  ['LAT033-043', { title: '幽默也是极限反抗' }],
  ['LAT033-044', { title: '精神力量抵抗肉体背叛' }],
  ['LAT033-046', { title: '特务衙门制造共产党' }],
  ['LAT033-047', { title: '大法官制造蝌蚪法律' }],
  ['LAT033-048', { title: '自首会招来新罪名' }],
  ['LAT033-049', { title: '国特逻辑制造叛徒链条' }],
  ['LAT033-050', { title: '六法全书挡不住特务逻辑' }],
  ['LAT033-051', { title: '一句万岁也能做成叛乱' }],
  ['LAT033-052', { title: '宗教标语也会变政治罪' }],
  ['LAT033-053', { title: '期中结账为了调整未来' }],
  ['LAT033-054', { title: '三民主义也能读出反叛' }],
  ['LAT033-055', { title: '政府最终落实为统治者' }],
  ['LAT033-056', { title: '善恶小事做与不做不同' }],
  ['LAT033-058', { title: '缴匪谍是一种配额文化' }],
  ['LAT033-059', { title: '酷吏岗位排斥软心肠' }],
  ['LAT033-060', { title: '独善其身不是完整好人' }],
  ['LAT033-061', { title: '改变未来不能只靠痛快' }],
  ['LAT033-062', { title: '用一生尺度衡量牢狱' }],
  ['LAT033-063', { title: '观念胜利先于实际胜利' }],
  ['LAT033-064', { title: '最坏准备逼近真正自由' }],
  ['LAT033-065', { title: '志士仁人不以坐牢为苦' }],
  ['LAT033-066', { title: '岛上共产党有多种形态' }],
  ['LAT033-067', { title: '牢饭也会制造饭票共产党' }],
  ['LAT033-068', { title: '人生阶段论化解坐牢处遇' }],
  ['LAT033-070', { title: '有为主义重在做过' }],
  ['LAT033-071', { title: '军队和监狱训练男子汉' }],
  ['LAT033-072', { title: '古典共产党以前仆后继为特色' }],
  ['LAT033-073', { title: '摩登共产党不拘古典方法' }],
  ['LAT033-074', { title: '道德也会生老病死' }],
  ['LAT033-075', { title: '领袖御批凌驾审判' }],
  ['LAT033-076', { title: '牢中医疗也是制度折磨' }],
  ['LAT033-077', { title: '招供咬人也有不得已' }],
  ['LAT033-078', { title: '革命会冲突亲密关系' }],
  ['LAT033-079', { title: '爱人不该被推上革命前线' }],
  ['LAT033-080', { title: '极限关头牺牲名誉救人' }],
  ['LAT033-081', { title: '共产主义要区分道德与可行' }],
  ['LAT033-082', { title: '崇高主义要借现实手段' }],
  ['LAT033-084', { title: '临刑仍要清醒从容' }],
  ['LAT033-085', { title: '人权牌有帝国双重标准' }],
  ['LAT033-086', { title: '白色恐怖把人权变统计' }],
  ['LAT033-087', { title: '写作见证不掠血泪' }],
  ['LAT033-088', { title: '正义之士必须追问责任' }],
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
    '- 分类策略：沿用 8 个原子分类；本书以政治、法权、人格、方法为主，情爱只收革命与亲密关系冲突本身。',
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
    '校对动作只涉及条目取舍、标题压缩、关键词微调和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
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
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮由提取轮进入校对轮，删除偏短、重复承载、偏剧情讽刺和过度依赖场面的弱条目，保留本书关于白色恐怖、冤狱制造、刑求逼供、军事审判、政治犯经验、坐牢方法、自由人格、革命伦理、共产主义与自由主义辨析、革命与亲密关系冲突、文学见证等核心索引。description 仍逐条保留源文本原文段落。',
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
