import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '019.上下古今谈');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT019-010', '专栏题目说明偏序言性质，思想判断已由文体、托古病和时潮条目承载。'],
  ['LAT019-017', '“好人使命”与前后两条好人行动、奋斗好人的判断重复，校对轮保留表达更完整的条目。'],
  ['LAT019-031', '乡愁成因偏背景解释，核心公共判断已由“不分客主”的大气派条目承载。'],
  ['LAT019-042', '娼妓受罚成代罪者的判断已由公娼管理、法律权利和废娼改革条目覆盖。'],
  ['LAT019-058', '原子弹改变战争理解偏铺垫，战争不再是解决路径的结论条目更集中。'],
  ['LAT019-069', '教育精力投向实学与文字传播知识思想的条目相邻重复，保留后者。'],
  ['LAT019-071', '新时代英雄的知识人形象与卷首新英雄、明星英雄条目重复。'],
  ['LAT019-073', '福特“藏富于民”的判断与后文财富保障防专制条目重复，保留论证更直接的后者。'],
  ['LAT019-082', '大义罚亲偏例证，法权判断已由“外公内私破坏法治”条目承担。'],
  ['LAT019-091', '爱与美的最终肯定偏抒情结尾，思想分类检索价值弱于前后两性自由条目。'],
]);

const overrides = new Map([
  ['LAT019-001', { category: '方法', title: '公众身份增强说服力', keywords: '公众身份,说服力,意见' }],
  ['LAT019-006', { category: '方法', title: '大众传播唤起民众', keywords: '大众传播,现代化,群众心理' }],
  ['LAT019-008', { category: '方法', title: '真理需要低阻力传播', keywords: '真理,说服力,传播' }],
  ['LAT019-014', { title: '历史既是光荣也是包袱', keywords: '历史,光荣,包袱' }],
  ['LAT019-021', { title: '压制潮流须先清理理由', keywords: '时代潮流,传统理由,限制' }],
  ['LAT019-022', { title: '语意含混妨碍科学表达', keywords: '语意,中文,科学表达' }],
  ['LAT019-023', { title: '赤子之心混淆定义', keywords: '赤子之心,定义思考,语意学' }],
  ['LAT019-027', { category: '法权', title: '父兄权力是专制遗痕', keywords: '父权,兄权,专制遗痕' }],
  ['LAT019-030', { title: '滥改文章违背原意', keywords: '改文章,原作者,意旨' }],
  ['LAT019-032', { title: '同一土地不该分客主', keywords: '乡土,中国土地,客主' }],
  ['LAT019-033', { title: '民代乱象不是反民主理由', keywords: '民主,民意代表,信念' }],
  ['LAT019-034', { title: '民主初期要教育监督', keywords: '民主初期,教育,监督' }],
  ['LAT019-035', { title: '民主靴防止人上人', keywords: '民主靴,人上人,多数智慧' }],
  ['LAT019-037', { title: '民意代表不是政府传声筒', keywords: '民意代表,权力腐败,政府' }],
  ['LAT019-040', { title: '娼妓制度是文明耻辱', keywords: '娼妓制度,文明,废娼' }],
  ['LAT019-041', { title: '开放社会自然废娼', keywords: '瑞典,性开放,废娼' }],
  ['LAT019-044', { title: '废娼须另求改革', keywords: '废娼,改革,公娼制度' }],
  ['LAT019-046', { title: '无法之罚伤及无辜', keywords: '无法可罚,无辜,法律秩序' }],
  ['LAT019-047', { title: '警察好恶不得定人流氓', keywords: '流氓,警察,任意' }],
  ['LAT019-048', { title: '无期限管训毁坏人权', keywords: '管训,人权,宪法' }],
  ['LAT019-049', { title: '未经立法不是法律', keywords: '立法院,法律,取缔流氓' }],
  ['LAT019-050', { title: '公民教育才能统一人格', keywords: '圣人教育,公民教育,人格' }],
  ['LAT019-056', { title: '情治机构也须守人权', keywords: '特务,人权,法治国家' }],
  ['LAT019-057', { title: '无人监督守法才是慎独', keywords: '闯红灯,慎独,自律' }],
  ['LAT019-059', { title: '战争不再是前进过程', keywords: '战争,和平,原子弹' }],
  ['LAT019-061', { title: '感情问题外人无权管辖', keywords: '感情,道德,干预' }],
  ['LAT019-063', { title: '武侠小说制造知识懒惰', keywords: '武侠小说,知识懒惰,斗志' }],
  ['LAT019-066', { title: '社会转型尚未定型', keywords: '社会转型,封建,农业社会' }],
  ['LAT019-067', { title: '贞操论遮蔽封闭社会', keywords: '贞操,封闭社会,男女接触' }],
  ['LAT019-068', { title: '毛笔字违背时代潮流', keywords: '毛笔字,时代潮流,教育' }],
  ['LAT019-070', { title: '文字目的在传播知识思想', keywords: '文字,知识思想,书法' }],
  ['LAT019-072', { title: '英雄神化遮蔽普通人命', keywords: '关公,英雄,普通人' }],
  ['LAT019-074', { title: '财富是反政治控制武器', keywords: '财富,腐败政治,基层保障' }],
  ['LAT019-075', { title: '生活保障防止政治控制', keywords: '藏富于民,专制,生活保障' }],
  ['LAT019-076', { category: '法权', title: '非暴力也能争取人权', keywords: '马丁路德金,非暴力,人权' }],
  ['LAT019-079', { title: '独裁违逆民主潮流', keywords: '独裁,民主趋向,历史潮流' }],
  ['LAT019-080', { title: '不可丧失民主信念', keywords: '民主趋向,信念,时代潮流' }],
  ['LAT019-081', { title: '外公内私破坏法治', keywords: '孔孟,亲情,法治' }],
  ['LAT019-085', { title: '明星成为新时代英雄', keywords: '明星,英雄定义,新时代' }],
  ['LAT019-086', { title: '打倒片面贞操观', keywords: '贞操,王宝钏,男权' }],
  ['LAT019-087', { title: '婚恋自由勇气值得效法', keywords: '恋爱自由,婚姻自由,王宝钏' }],
  ['LAT019-089', { title: '不查房间是自由进步', keywords: '查房间,私人自由,警察' }],
  ['LAT019-090', { title: '社会应容纳自由女性', keywords: '叶枫,女性,社会进步' }],
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
    '- 分类策略：继续使用 7 个原子分类；删去序言性、重复性、例证性和抒情性条目。',
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
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 83) {
  throw new Error(`Expected 83 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT019-${String(index + 1).padStart(3, '0')}`,
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

console.log(`Built ${payload.book.title} proofread index: ${records.length} records.`);
