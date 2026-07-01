import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '010.传统下的再白');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT010-002', '为抽象名词牺牲爱情偏历史举例，爱情现代化主题已由落后一环、泛道德主义和全盘现代化条目承载。'],
  ['LAT010-006', '中西合璧爱情成悲剧与“爱情应全盘现代化”相邻重叠，校对轮保留后者作为更完整结论。'],
  ['LAT010-011', '女人记忆择取有利偏性别笑骂，不作为思想索引单列。'],
  ['LAT010-012', '女人理由随感情变形偏性别笑骂，校对轮删除以避免女性条目过密。'],
  ['LAT010-013', '负人后靠追忆开脱偏性别心理嘲讽，缺少独立思想索引价值。'],
  ['LAT010-017', '攻击即防御是短格言，语义过密且脱离上下文，不单列。'],
  ['LAT010-018', '野蛮政权下的独立存在只有单句判断，思想支撑不足。'],
  ['LAT010-026', '党方力量干涉序文与“序文被权力链割除”重复，保留后者作为删序事件主条。'],
  ['LAT010-032', '拒绝做弱者是一句提纲，强者哲学由后续智慧、狠心和一刀两断条目展开。'],
  ['LAT010-035', '力量要打击恶势力与强者条件条目重叠，校对轮删除。'],
  ['LAT010-039', '译词必须贴合原意偏局部训诂，不进入本书思想索引。'],
]);

const keepIds = [
  'LAT010-001',
  'LAT010-003',
  'LAT010-004',
  'LAT010-005',
  'LAT010-007',
  'LAT010-008',
  'LAT010-009',
  'LAT010-010',
  'LAT010-014',
  'LAT010-015',
  'LAT010-016',
  'LAT010-019',
  'LAT010-020',
  'LAT010-021',
  'LAT010-022',
  'LAT010-023',
  'LAT010-024',
  'LAT010-025',
  'LAT010-027',
  'LAT010-028',
  'LAT010-029',
  'LAT010-030',
  'LAT010-031',
  'LAT010-033',
  'LAT010-034',
  'LAT010-036',
  'LAT010-037',
  'LAT010-038',
  'LAT010-040',
  'LAT010-041',
];

const overrides = new Map([
  ['LAT010-001', { category: '文化', title: '爱情生活是现代化落后一环', keywords: '爱情,现代化,落伍' }],
  ['LAT010-003', { category: '文化', title: '泛道德主义封锁男女之事', keywords: '泛道德主义,男女,禁忌' }],
  ['LAT010-004', { category: '人格', title: '道德脸孔造成双重人格', keywords: '泛道德主义,双重人格,说教' }],
  ['LAT010-005', { category: '文化', title: '真情被迫转入地下', keywords: '爱情,真情,面具' }],
  ['LAT010-007', { category: '文化', title: '爱情现代化要全盘学', keywords: '爱情,现代化,全盘学习' }],
  ['LAT010-008', { category: '法权', title: '查禁要先一视同仁', keywords: '查禁,红楼梦,卫道' }],
  ['LAT010-009', { category: '文化', title: '女生入北大突破旧礼', keywords: '女性,北大,男女不杂坐' }],
  ['LAT010-010', { category: '文化', title: '历史包袱压住女性苏醒', keywords: '女性,男尊女卑,历史包袱' }],
  ['LAT010-014', { category: '政治', title: '入党也是一种信教', keywords: '入党,信党,政党' }],
  ['LAT010-015', { category: '方法', title: '罗织学逼出避祸学', keywords: '罗织学,避祸学,方法' }],
  ['LAT010-016', { category: '政治', title: '统制技术也会现代化', keywords: '统制技术,避祸学,现代' }],
  ['LAT010-019', { category: '政治', title: '谎话堂皇也会失信', keywords: '谎话,老百姓,信任' }],
  ['LAT010-020', { category: '法权', title: '审查者读尽异端却不受影响', keywords: '审查,异端邪说,书刊' }],
  ['LAT010-021', { category: '文化', title: '新规范能替代旧霉货', keywords: '新规范,旧传统,结婚' }],
  ['LAT010-022', { category: '方法', title: '稳健不是做法正确', keywords: '稳健,耶稣,理想' }],
  ['LAT010-023', { category: '方法', title: '在环境极限内行动', keywords: '环境极限,老顽固,小乱' }],
  ['LAT010-024', { category: '人格', title: '少做懦夫多充勇士', keywords: '懦夫,勇士,真我' }],
  ['LAT010-025', { category: '人格', title: '过早稳健就是乡愿', keywords: '乡愿,稳健,老成持重' }],
  ['LAT010-027', { category: '法权', title: '序文被权力链割除', keywords: '删序,权力链,蒋廷黻选集' }],
  ['LAT010-028', { category: '写作', title: '文章不能被斩草除根', keywords: '文章,斩草除根,重发' }],
  ['LAT010-029', { category: '政治', title: '对异己应辩论明白', keywords: '孙中山,异己,辩论' }],
  ['LAT010-030', { category: '政治', title: '党内异见要和平待之', keywords: '林森,本党,和平' }],
  ['LAT010-031', { category: '文化', title: '捍卫文化者也仰洋教', keywords: '中国文化,洋教,现世报' }],
  ['LAT010-033', { category: '人格', title: '强者需要智慧力量狠心', keywords: '强者,智慧,力量' }],
  ['LAT010-034', { category: '知识', title: '智慧要洞澈人际与科际', keywords: '智慧,人际,科际' }],
  ['LAT010-036', { category: '方法', title: '强者要铲除感情干扰', keywords: '感情,阻力,强者' }],
  ['LAT010-037', { category: '人格', title: '真理高于朋友', keywords: '真理,朋友,牺牲' }],
  ['LAT010-038', { category: '方法', title: '矛盾关口要一刀两断', keywords: '矛盾,一刀两断,强者' }],
  ['LAT010-040', { category: '法权', title: '公帑讲学沦为权贵安抚', keywords: '学人归国讲学,公帑,权贵' }],
  ['LAT010-041', { category: '知识', title: '最高学术机构也会空心化', keywords: '中央研究院,学术研究,假学人' }],
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
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：校对轮继续使用 7 个原子分类，删除重复举例、偏笑骂语录、过短格言和拆分过细的强者哲学条目。',
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
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
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

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const originalById = new Map(originalPayload.records.map((record) => [record.id, record]));
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

for (const id of keepIds) {
  if (!originalById.has(id)) {
    throw new Error(`Unknown keep id: ${id}`);
  }
  if (!overrides.has(id)) {
    throw new Error(`Missing proofreading override for ${id}`);
  }
}

const accountedIds = new Set([...keepIds, ...dropReasons.keys()]);
for (const record of originalPayload.records) {
  if (!accountedIds.has(record.id)) {
    throw new Error(`Unaccounted original record: ${record.id}`);
  }
}

const records = keepIds.map((id, index) => {
  const record = originalById.get(id);
  const override = overrides.get(id);

  return {
    ...record,
    ...override,
    id: `LAT${bookBase.sequence}-${String(index + 1).padStart(3, '0')}`,
    book: bookBase.title,
    round: bookBase.round,
    status: bookBase.status,
    proofread_from: record.id,
  };
});

const book = {
  ...bookBase,
  record_count: records.length,
  category_counts: categoryCounts(records, taxonomy),
};

const payload = {
  generated_at: new Date().toISOString(),
  book,
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

console.log(`Proofread ${originalPayload.records.length} records into ${records.length} records for ${book.title}.`);
