import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '024.为自由招魂');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT024-004', '“悲剧脸谱”是后续分列项的引入段，校对轮保留自由民主潮流与专制恐惧两条更强判断。'],
  ['LAT024-005', '段落只有“用暴力维持政权”短句，且提取轮标题与段意错位。'],
  ['LAT024-006', '段落只有“一党专政”短句，思想承载力弱于同篇的整体判断。'],
  ['LAT024-007', '段落只有“特务横行，基本人权没保障”短句，已被后续警总、户警合一和人权条目充分承载。'],
  ['LAT024-008', '段落实际为“统制经济”短句，提取轮标题与段意错位。'],
  ['LAT024-023', '“玩笑得先从上面开起”过短，保留开玩笑自由与民主气质的完整判断。'],
  ['LAT024-024', '俳优故事偏历史例证，和“开玩笑自由缓和真实”“民主须容忍玩笑”重复。'],
  ['LAT024-029', '烈士临死说话偏例证铺垫，保留“流血自由使死有意义”和“现代殉难失去悲壮”。'],
  ['LAT024-055', '杜鲁门与皮尔逊互骂是例证，保留“言论自由不看态度”和“敢怒敢言才是自由”。'],
  ['LAT024-077', '“民吁日报”是过渡例证，保留结论性的“至少要有埋怨自由”。'],
  ['LAT024-079', '租界报刊清单偏历史资料，保留“帝国主义也带来自由”和国民党比较判断。'],
  ['LAT024-089', '抢书现场诗句偏情境铺写，保留同诗中更具人格判断的“遭抢仍要继续走”。'],
  ['LAT024-093', '“一流知识分子不随国民党走”与“作家本该有良知血性”接近，保留后者。'],
  ['LAT024-111', '《自立晚报》经营困境偏背景铺陈，保留党国入股、监军和自由平台被吞并的制度判断。'],
]);

const overrides = new Map([
  ['LAT024-002', { title: '压迫引出共同反抗', keywords: '革命,压迫,倒退,反抗' }],
  ['LAT024-003', { title: '自由民主是历史潮流', keywords: '自由民主,历史潮流,反动势力,现代' }],
  ['LAT024-009', { title: '专制害怕开放挑战', keywords: '开放,专制,恐惧,自由民主' }],
  ['LAT024-011', { title: '文警就是文字警察', keywords: '文警,文字警察,御用文人,战斗文艺' }],
  ['LAT024-017', { title: '文章牵一发动全身', keywords: '文章,修改,结构,罪状' }],
  ['LAT024-022', { category: '文化', title: '玩笑自由松弛权力紧张', keywords: '开玩笑,自由,真实,紧张' }],
  ['LAT024-025', { title: '民主须容忍玩笑', keywords: '民主,开玩笑,气质,自由' }],
  ['LAT024-026', { title: '玩笑自由检验民主气质', keywords: '开玩笑,民主气质,标语,自由' }],
  ['LAT024-027', { title: '演说自由也被暗盘封锁', keywords: '演说自由,学生,阻挠,言论自由' }],
  ['LAT024-030', { title: '流血自由使死有意义', keywords: '流血的自由,真我,抗议,死亡' }],
  ['LAT024-031', { title: '现代统治者秘密杀人', keywords: '秘密杀人,统治者,暗杀,现代' }],
  ['LAT024-032', { title: '人质压力制造认罪', keywords: '斯大林,审判,人质,认罪' }],
  ['LAT024-036', { title: '权力剥夺烈士之血', keywords: '流血的自由,于志谟,绞刑,烈士' }],
  ['LAT024-038', { title: '民主也要改造习惯', keywords: '民主,习惯,统治者,被统治者' }],
  ['LAT024-039', { category: '文化', title: '漫画以小击大', keywords: '以小击大,漫画,民主,领袖' }],
  ['LAT024-040', { title: '讽刺漫画奠定民主', keywords: '漫画,讽刺,民主,平等' }],
  ['LAT024-047', { title: '民主需要反对形式', keywords: '异议,民主,唱反调,形式' }],
  ['LAT024-049', { title: '制度需要假想敌', keywords: '制度,反面意见,制衡,假想敌' }],
  ['LAT024-050', { title: '一流知识分子必须异议', keywords: '知识分子,唱反调,批评,真理' }],
  ['LAT024-051', { title: '知识分子不该做应声虫', keywords: '知识分子,应声虫,政府,台湾' }],
  ['LAT024-052', { title: '高压下连怒也不敢', keywords: '高压,敢怒,敢言,政府' }],
  ['LAT024-054', { title: '言论自由不看态度', keywords: '言论自由,态度,真理,民主' }],
  ['LAT024-056', { title: '敢怒敢言才是自由', keywords: '敢怒敢言,现代国民,自由,奴才' }],
  ['LAT024-057', { title: '发行人不当然有著作权', keywords: '著作权,发行人,文星,法律' }],
  ['LAT024-058', { title: '文星精神只争自由', keywords: '文星,思想自由,言论自由,出版自由' }],
  ['LAT024-060', { category: '法权', title: '野蛮自由可转文明自由', keywords: '野蛮之自由,孙中山,文明自由,民权' }],
  ['LAT024-061', { title: '户口制度吞掉自由', keywords: '户口法,野蛮之自由,控制,政府' }],
  ['LAT024-062', { title: '户警合一扩张党国', keywords: '户警合一,警察,国民党,权力' }],
  ['LAT024-064', { title: '仍要梦想野蛮自由', keywords: '野蛮之自由,梦想,警察,自由' }],
  ['LAT024-065', { title: '文化审检被作战化', keywords: '文化审检,作战,思想污染,警总' }],
  ['LAT024-066', { title: '查扣升级为整肃体系', keywords: '严查严扣,辩驳导正,文化审检,整肃' }],
  ['LAT024-068', { title: '文化审检露出武士刀天下', keywords: '文化审检,警总,武士刀,言论自由' }],
  ['LAT024-070', { category: '方法', title: '人权是党外关键目标', keywords: '人权,党外,关键目标,政治' }],
  ['LAT024-071', { category: '法权', title: '没有人权一切皆假', keywords: '人权,奴隶,桎梏,党外' }],
  ['LAT024-073', { title: '表现自由保障自由', keywords: '表现自由,意见自由,第一自由,知识' }],
  ['LAT024-076', { title: '先有言论才看见侵害', keywords: '言论自由,人身自由,侵害,秘雕案' }],
  ['LAT024-080', { title: '帝国主义也带来自由', keywords: '帝国主义,言论自由,常识,中国' }],
  ['LAT024-081', { title: '国民党不如帝国主义', keywords: '国民党,帝国主义,办报自由,比较' }],
  ['LAT024-083', { title: '不许办报是釜底抽薪', keywords: '报禁,釜底抽薪,查封,办报' }],
  ['LAT024-084', { title: '查封不同于禁办', keywords: '报禁,自由,办报,查封' }],
  ['LAT024-085', { title: '子法不能压倒母法', keywords: '出版法,施行细则,母法,报禁' }],
  ['LAT024-086', { category: '法权', title: '节约用纸只是借口', keywords: '节约用纸,报禁,借口,国民党' }],
  ['LAT024-087', { title: '自由社会承认竞争', keywords: '公平竞争,报业,自由社会,报禁' }],
  ['LAT024-088', { title: '报禁谎言侮辱人民', keywords: '报禁,谎言,欺骗,人民' }],
  ['LAT024-091', { title: '出版救济多是空话', keywords: '出版处分,救济,行政诉讼,空话' }],
  ['LAT024-092', { title: '解禁只是后门例外', keywords: '解禁,查禁,救济途径,出版自由' }],
  ['LAT024-096', { title: '禁书史料必须留存', keywords: '禁书史,史料,写作,大风雪' }],
  ['LAT024-098', { title: '查禁标准不能藏肚皮', keywords: '查禁标准,警备总部,大风雪,解禁' }],
  ['LAT024-100', { title: '左右都会迫害艺术家', keywords: '江文也,国民党,共产党,艺术家' }],
  ['LAT024-104', { category: '方法', title: '查禁成本要被分担', keywords: '查禁,成本,党外周刊,读者' }],
  ['LAT024-108', { title: '舆论消毒动员围攻', keywords: '舆论消毒,中央日报,同路人,围攻' }],
  ['LAT024-110', { title: '邮检没收制造损失', keywords: '邮检,没收,邮局,损失' }],
  ['LAT024-112', { title: '依法之名也会毁法', keywords: '自立晚报,停刊,新闻自由,民主法治' }],
  ['LAT024-113', { title: '党国借入股控编辑', keywords: '自立晚报,国民党,入股,编辑政策' }],
  ['LAT024-114', { title: '监军就是掌握编辑', keywords: '叶明勋,自立晚报,监军,编辑政策' }],
  ['LAT024-116', { title: '自立之名可以不自立', keywords: '自立晚报,国民党,言论自由,控制' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除过短分列项、重复例证、历史资料铺垫和思想承载力较弱的条目。',
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
if (keptOriginalRecords.length !== 102) {
  throw new Error(`Expected 102 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT024-${String(index + 1).padStart(3, '0')}`,
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
