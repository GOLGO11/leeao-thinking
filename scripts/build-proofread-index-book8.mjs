import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '008.李敖相关');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT008-001', '段落主要是早年履历和投稿事实，“李敖实验室”有趣但思想索引性偏弱。'],
  ['LAT008-002', '义助严侨家属偏人格轶事，与本书核心的查禁、法权和言论自由材料相比不宜单列。'],
  ['LAT008-006', '义助柏杨偏事件记录，人权主题在后续法权条目中展开更完整。'],
  ['LAT008-018', '段落重心是海外媒体地位评价，偏宣传资料，不作为思想索引单列。'],
  ['LAT008-023', '查禁理由较泛，现行法制和出版审查主题已由系统查禁、违宪、不合作等条目承载。'],
  ['LAT008-028', '一国两制文章遭处分偏个案行政事实，校对轮保留更具思想辨识度的孙中山研究查禁条目。'],
  ['LAT008-032', '郑重致歉段偏个案裁判结果，法权原则由合理查证、言论自由和事实/意见分流条目承载。'],
  ['LAT008-033', '自卫自辩抗辩段较短，且属于当事人诉讼主张，缺少可独立复用的思想密度。'],
  ['LAT008-034', '公然侮辱与诽谤差异偏赔偿个案论证，校对轮以更稳定的名誉权法理条目替代。'],
  ['LAT008-038', '名誉损害赔偿段过于个案化，删除以避免法权类条目过密。'],
]);

const overrides = new Map([
  ['LAT008-003', { title: '文星批评国法党限', keywords: '文星,国法党限,国民党' }],
  ['LAT008-004', { title: '告别文坛仍被查禁', keywords: '查禁,告别文坛,警总' }],
  ['LAT008-005', { title: '官方私方形成诉讼夹杀', keywords: '诉讼,夹杀,妨害公务' }],
  ['LAT008-007', { title: '洗脑中保持沉默', keywords: '洗脑,无保出狱,法治' }],
  ['LAT008-008', { title: '拒绝被职务收编', keywords: '拒绝研究,拒绝签到,拒绝领薪水' }],
  ['LAT008-009', { title: '写作介入司法黑暗', keywords: '司法黑暗,冤狱,写作' }],
  ['LAT008-010', { title: '自任顽童战士', keywords: '顽童,战士,正义' }],
  ['LAT008-011', { title: '查禁下苦撑待变', keywords: '查禁,售书,苦撑' }],
  ['LAT008-012', { title: '国民党阻塞现代化', keywords: '国民党,阻塞,现代化' }],
  ['LAT008-013', { title: '草率决议破坏程序正义', keywords: '程序正义,宪法,滥权' }],
  ['LAT008-014', { title: '智慧党拆穿假民主', keywords: '假民主,列宁式政党,智慧党' }],
  ['LAT008-015', { title: '不要只摸一条腿', keywords: '瞎子摸象,整体,李敖' }],
  ['LAT008-016', { title: '封锁扭曲不了真面目', keywords: '封锁,查禁,视而不见' }],
  ['LAT008-017', { title: '反对来自深厚哲学', keywords: '民主自由,人权,哲学' }],
  ['LAT008-019', { title: '单独挑战威权尺度', keywords: '威权,言论开放,忽视' }],
  ['LAT008-020', { title: '犀利批判传统政治', keywords: '文星,全盘西化,批判' }],
  ['LAT008-021', { title: '出狱前书籍查禁系统', keywords: '出版法,戒严法,查禁' }],
  ['LAT008-022', { title: '复出后文化事业仍被追杀', keywords: '劫后余生,千秋评论,追杀' }],
  ['LAT008-024', { title: '批判儒家思想遭禁', keywords: '孔家思想,中国思想,儒家' }],
  ['LAT008-025', { title: '主张和平改革反枪杆', keywords: '和平改革,反盲动,反枪杆' }],
  ['LAT008-026', { title: '出版法违宪和不合作', keywords: '出版法,违宪,不合作主义' }],
  ['LAT008-027', { title: '出版法违宪和官逼民反', keywords: '出版法,官逼民反,法律' }],
  ['LAT008-029', { title: '孙中山图腾批判遭禁', keywords: '孙中山研究,卖国,查禁' }],
  ['LAT008-030', { title: '事实陈述须合理查证', keywords: '事实陈述,意见表达,合理查证' }],
  ['LAT008-031', { title: '言论自由高于名誉让步', keywords: '言论自由,公众人物,名誉' }],
  ['LAT008-035', { title: '思想和表达须分开', keywords: '著作权,思想,表达' }],
  ['LAT008-036', { title: '事实和意见应分流', keywords: '事实陈述,意见表达,名誉权' }],
  ['LAT008-037', { title: '言论自由不是内容免责', keywords: '言论自由,适当评论,谩骂' }],
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
    '- 分类策略：校对轮继续使用 7 个原子分类，删除纯履历、宣传地位和过细个案裁判段落。',
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
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id);
    if (!override) {
      throw new Error(`Missing proofreading override for ${record.id}`);
    }

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
