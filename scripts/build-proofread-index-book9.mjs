import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '009.传统下的独白');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT009-012', '“现代出头靠考选”偏选美文章里的社会观察，和本书反传统主轴相比索引价值较弱。'],
  ['LAT009-015', '“长袍心理学”属于戏拟开场，标题性强但思想支撑不足，校对轮删除。'],
  ['LAT009-017', '“教育像冷冻机”夹在军旅叙事中，教育批评已由《十三年和十三月》的中学、大学条目承载。'],
  ['LAT009-018', '《医师法》贻害社会属于总起句，后续现代化、科学医学和恶法条目展开更完整。'],
  ['LAT009-019', '小百姓关心修法偏文章背景，法权责任由立法、人命、舆论等条目承担。'],
  ['LAT009-022', '该段主要是转引余岩提案，校对轮保留李敖直接论述和更具总括性的废旧医段落。'],
  ['LAT009-033', '立法失职不可冲淡与“立法不能拿人命儿戏”“舆论家要鞭策立法”重叠，删除以减少法权类过密。'],
  ['LAT009-040', '三种身份造成干扰已被“质询是监督不是干扰”和“立委律师鱼熊不可兼得”覆盖。'],
  ['LAT009-041', '鱼熊不可兼得是兼任问题结论，但制度原则由“律师资格不能开后门”和“恶法不代表社会公意”支撑更强。'],
  ['LAT009-044', '留余荫段偏引述人生观，代际交棒主题已有更直接条目。'],
  ['LAT009-046', '老生常谈反省与抓棒不放、青年垂听等段落重叠，删除以收敛《老年人和棒子》条目密度。'],
  ['LAT009-059', '冲向《文星》写文章偏自传叙事，写作思想由狂叛文章和撕破伪善条目承载。'],
]);

const keepIds = [
  'LAT009-001',
  'LAT009-002',
  'LAT009-003',
  'LAT009-004',
  'LAT009-005',
  'LAT009-006',
  'LAT009-007',
  'LAT009-008',
  'LAT009-009',
  'LAT009-010',
  'LAT009-011',
  'LAT009-013',
  'LAT009-014',
  'LAT009-016',
  'LAT009-020',
  'LAT009-021',
  'LAT009-023',
  'LAT009-024',
  'LAT009-025',
  'LAT009-026',
  'LAT009-027',
  'LAT009-028',
  'LAT009-029',
  'LAT009-030',
  'LAT009-031',
  'LAT009-032',
  'LAT009-034',
  'LAT009-035',
  'LAT009-036',
  'LAT009-037',
  'LAT009-038',
  'LAT009-039',
  'LAT009-042',
  'LAT009-043',
  'LAT009-045',
  'LAT009-047',
  'LAT009-048',
  'LAT009-049',
  'LAT009-050',
  'LAT009-051',
  'LAT009-052',
  'LAT009-053',
  'LAT009-054',
  'LAT009-055',
  'LAT009-056',
  'LAT009-057',
  'LAT009-058',
  'LAT009-060',
  'LAT009-061',
  'LAT009-062',
  'LAT009-064',
  'LAT009-065',
  'LAT009-066',
  'LAT009-063',
  'LAT009-067',
  'LAT009-068',
  'LAT009-069',
];

const overrides = new Map([
  ['LAT009-001', { category: '文化', title: '杂文贯穿反传统', keywords: '传统,反抗,杂文' }],
  ['LAT009-002', { category: '人格', title: '狂叛就狂叛', keywords: '狂叛,孤独,独白' }],
  ['LAT009-003', { category: '方法', title: '世儒用帽子定罪', keywords: '世儒,帽子,定罪' }],
  ['LAT009-004', { category: '写作', title: '狂叛文章重在达意', keywords: '文章,狂叛,达意' }],
  ['LAT009-005', { category: '写作', title: '文章本色是直据胸臆', keywords: '文章本色,直据胸臆,唐顺之' }],
  ['LAT009-006', { category: '人格', title: '做而不述胜过道学', keywords: '做而不述,载道,伪善' }],
  ['LAT009-007', { category: '文化', title: '宗法婚姻压抑真情', keywords: '宗法,婚姻,真情' }],
  ['LAT009-008', { category: '文化', title: '妇女独立靠家务解放', keywords: '妇女独立,家务,主妇式社会' }],
  ['LAT009-009', { category: '文化', title: '吸收文明要学到底', keywords: '西方文明,日本,学习' }],
  ['LAT009-010', { category: '文化', title: '本位守不住时势', keywords: '中国本位,西化,辜鸿铭' }],
  ['LAT009-011', { category: '文化', title: '女性先怀疑旧礼教', keywords: '女性,礼教,现代化' }],
  ['LAT009-013', { category: '写作', title: '游戏文章也能载道', keywords: '游戏文章,载道,道貌岸然' }],
  ['LAT009-014', { category: '写作', title: '讽刺也合圣人之道', keywords: '讽刺,小说,圣人之道' }],
  ['LAT009-016', { category: '文化', title: '父母也可能负子', keywords: '父母,王充,孔融' }],
  ['LAT009-020', { category: '知识', title: '巫医基础使医术难成医学', keywords: '巫医,科学,中医' }],
  ['LAT009-021', { category: '知识', title: '原始医术挡不住科学', keywords: '科学医学,解剖学,中医' }],
  ['LAT009-023', { category: '知识', title: '废旧医关系民族进化', keywords: '废止旧医,民族进化,卫生行政' }],
  ['LAT009-024', { category: '法权', title: '俯顺舆情牺牲现代化', keywords: '医师法,舆情,现代化' }],
  ['LAT009-025', { category: '法权', title: '修法要从原意开刀', keywords: '修法,立法原意,医师法' }],
  ['LAT009-026', { category: '文化', title: '国字号阻碍现代化', keywords: '国字号,国粹,现代化' }],
  ['LAT009-027', { category: '政治', title: '政府不可顺从传统余孽', keywords: '政府,传统余孽,现代化' }],
  ['LAT009-028', { category: '方法', title: '知识分子应解决实际问题', keywords: '知识分子,爱国,实际问题' }],
  ['LAT009-029', { category: '知识', title: '科学未验证就是伪药', keywords: '科学验证,伪药,密医' }],
  ['LAT009-030', { category: '法权', title: '密医经验不应换资格', keywords: '密医,医师法,检核' }],
  ['LAT009-031', { category: '法权', title: '荒唐立法拿人命儿戏', keywords: '立法,人命,责任' }],
  ['LAT009-032', { category: '知识', title: '医学不该分中西', keywords: '医学,中西医,不承认主义' }],
  ['LAT009-034', { category: '写作', title: '舆论要导向正途', keywords: '舆论,立法,医师法' }],
  ['LAT009-035', { category: '法权', title: '学术批评受公评保护', keywords: '学术批评,公评,不罚' }],
  ['LAT009-036', { category: '法权', title: '自利立法制造密法官', keywords: '立法委员,律师,密法官' }],
  ['LAT009-037', { category: '法权', title: '立法有权不等于有能', keywords: '立法权,专门委员,权能' }],
  ['LAT009-038', { category: '法权', title: '质询是监督不是干扰', keywords: '监督政府,质询权,立法院' }],
  ['LAT009-039', { category: '法权', title: '律师资格不能开后门', keywords: '律师资格,后门,法治' }],
  ['LAT009-042', { category: '法权', title: '恶法不代表社会公意', keywords: '恶法,制法原则,制度' }],
  ['LAT009-043', { category: '文化', title: '交棒要先问老人', keywords: '老年人,青年,交棒' }],
  ['LAT009-045', { category: '人格', title: '到老仍要进取创造', keywords: '创造精神,进取,白头' }],
  ['LAT009-047', { category: '文化', title: '抓棒不放源于不放心', keywords: '棒子,老年人,青年' }],
  ['LAT009-048', { category: '人格', title: '可敬老人虚心学习', keywords: '老年人,学习,父与子' }],
  ['LAT009-049', { category: '方法', title: '戳穿问题才能解决', keywords: '戳穿,问题,解决' }],
  ['LAT009-050', { category: '文化', title: '青年声音也该被听见', keywords: '青年,垂听,接力赛' }],
  ['LAT009-051', { category: '人格', title: '老人训育先要身教', keywords: '身教,骨气,战斗' }],
  ['LAT009-052', { category: '文化', title: '只等真正崭新的棒子', keywords: '交棒,青年,崭新' }],
  ['LAT009-053', { category: '法权', title: '信教自由不含养教主义务', keywords: '国库,宗教偶像,宪法' }],
  ['LAT009-054', { category: '人格', title: '教主也要自力谋生', keywords: '张天师,自力谋生,人格' }],
  ['LAT009-055', { category: '文化', title: '天师问题是祖宗饭模式', keywords: '祖宗饭,公款,孔圣问题' }],
  ['LAT009-056', { category: '人格', title: '世袭迷梦终归迷梦', keywords: '独立人格,祖宗,世袭' }],
  ['LAT009-057', { category: '知识', title: '中学教育不合个性发展', keywords: '中学教育,性灵,杜威' }],
  ['LAT009-058', { category: '知识', title: '大学应培养独立判断', keywords: '大学教育,独立思考,知识分子' }],
  ['LAT009-060', { category: '人格', title: '锋利激情滋养批判', keywords: '狂热,犬儒,锋利' }],
  ['LAT009-061', { category: '文化', title: '传统君子教育制造乡愿', keywords: '愤世嫉俗,传统伦理,青年' }],
  ['LAT009-062', { category: '文化', title: '老不争气应收起老调', keywords: '老年人,交棒,青年机会' }],
  ['LAT009-064', { category: '方法', title: '批判是证明旧物不值', keywords: '批判,交棒,不是东西' }],
  ['LAT009-065', { category: '写作', title: '写作要撕破伪善', keywords: '写文章,伪善,学术' }],
  ['LAT009-066', { category: '人格', title: '宁做真小人', keywords: '真小人,伪君子,丧礼改革' }],
  ['LAT009-063', { category: '知识', title: '追问环境教育的责任', keywords: '环境,教育,人才' }],
  ['LAT009-067', { category: '政治', title: '青年要越过旧泡沫', keywords: '青年,现代化中国,大老爷' }],
  ['LAT009-068', { category: '方法', title: '低调也是不合作', keywords: '不合作主义,低调,乱世' }],
  ['LAT009-069', { category: '人格', title: '少一分懦夫多一分勇士', keywords: '懦夫,勇士,真我' }],
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
    '- 分类策略：校对轮继续使用 7 个原子分类，删除偏叙事、偏戏拟、引子型和过细重复的法律论证条目。',
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
