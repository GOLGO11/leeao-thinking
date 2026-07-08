import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 85;
const bookTitle = '李敖Talk秀';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT085-002', '与 LAT085-001 同属文人思想大于总统权位主题，校对轮保留司马迁段落。'],
  ['LAT085-009', '段落重心是节目现场的恋爱条约调侃，思想独立性不如同集贞操与受害者条目。'],
  ['LAT085-015', '与 LAT085-014 同属元首玩笑与言论尺度主题，校对轮保留概念更集中的上一条。'],
  ['LAT085-016', '民主进入生活的判断已由 LAT085-013 承载，本条例证较散。'],
  ['LAT085-021', '贞节与自慰轶事已由 LAT085-020、LAT085-022 分别承载，本条不再单列。'],
  ['LAT085-037', '校园暴力救急主题与 LAT085-039 重复，校对轮保留后者。'],
  ['LAT085-041', '张学良不搞东北独立的主题由 LAT085-083 展开得更完整，本条删除。'],
  ['LAT085-045', '族群挑拨判断与 LAT085-043、LAT085-044 同组，且本条更依赖当期人事攻防。'],
  ['LAT085-050', '新闻局体制解释偏单一行政个案，长期思想索引价值较低。'],
  ['LAT085-058', '郑龙水段落以人物励志介绍为主，李敖本人的思想判断较薄。'],
  ['LAT085-065', '政治诚信与承诺退票主题已由 LAT085-062、LAT085-063 承载。'],
  ['LAT085-067', '政治礼貌规格与 LAT085-066 重复，校对轮保留概括性更强者。'],
  ['LAT085-072', '三民主义与国歌解释依赖张惠妹当期事件，主题已由 LAT085-071、LAT085-073 承载。'],
  ['LAT085-088', '总统作秀与大事判断已由 LAT085-087 承载，本条现场时政性较强。'],
  ['LAT085-089', '国家健康比个人健康的判断仍属总统职责主题，校对轮并入 LAT085-087。'],
  ['LAT085-110', '入戏能力段落偏演艺观察，思想密度不如同集言论自由与历史叙事条目。'],
  ['LAT085-121', '坐牢资格段落为本集开场铺陈，后续监狱制度与人格条目更具体。'],
  ['LAT085-125', '“牢有一百种”与 LAT085-123 同义，校对轮保留后一条的制度差异说明。'],
  ['LAT085-138', '低质表达转移到电脑的判断较窄，且偏现场感慨。'],
  ['LAT085-149', '一夜情判断与 LAT085-148 重复，校对轮保留前者。'],
  ['LAT085-154', '段落大半为 A 片审美与个人幻想，公共思想密度不足，且犯意/犯行主题由 LAT085-182 更稳承载。'],
  ['LAT085-155', '私生子认祖段落依赖蒋家个案轶闻，校对轮保留 LAT085-156 的名正言顺判断。'],
  ['LAT085-166', '外人不了解监狱内部与 LAT085-158、LAT085-161 重叠，且后者制度指向更清晰。'],
  ['LAT085-171', '灵骨塔缴费流程偏便民个案，思想索引独立价值较弱。'],
  ['LAT085-178', '阿扁与李登辉强硬比较过窄，时政人事色彩重。'],
  ['LAT085-179', '用个人方法祭奠亲人与 LAT085-170、LAT085-181 重复。'],
  ['LAT085-188', '弊案牌虎头蛇尾偏当期政治判断，查弊底线主题已由 LAT085-186 承载。'],
  ['LAT085-190', '收尾段落含较多现场玩笑和当期政治攻防，思想密度低于同集前文。'],
]);

const overrides = new Map([
  ['LAT085-003', { title: '谈性也能扩张言论尺度' }],
  ['LAT085-004', { title: '性问题宜疏导不宜封锁' }],
  ['LAT085-006', { title: '强暴受害不等于失贞' }],
  ['LAT085-007', { category: '情爱', title: '受害者应被宽广接纳' }],
  ['LAT085-011', { title: '人权核心是百分百言论自由' }],
  ['LAT085-012', { title: '低投票率也是民主指标' }],
  ['LAT085-014', { title: '民主气度容许元首玩笑' }],
  ['LAT085-017', { title: '事实审查不靠禁法也会发生' }],
  ['LAT085-018', { category: '知识', title: '性教育也应成为学问' }],
  ['LAT085-022', { title: '自慰问题宜面对不宜遮盖' }],
  ['LAT085-024', { title: '违建只问该不该拆' }],
  ['LAT085-027', { title: '匪字是思想管理' }],
  ['LAT085-028', { title: '言论承诺要经权力考验' }],
  ['LAT085-032', { title: '导读标准不能代替法律' }],
  ['LAT085-033', { title: '正直政治也会被民意厌烦' }],
  ['LAT085-034', { title: '教育缺少样板会助长校园暴力' }],
  ['LAT085-035', { title: '校长要有抗拒教育部的气派' }],
  ['LAT085-039', { title: '救急先于教育理论' }],
  ['LAT085-040', { title: '创作者比批评者值得立像' }],
  ['LAT085-049', { title: '身份要随场域转换' }],
  ['LAT085-052', { title: '死亡也可以达观看待' }],
  ['LAT085-057', { title: '爱情只爱一点点' }],
  ['LAT085-069', { title: '更好会成为好的敌人' }],
  ['LAT085-080', { title: '哈日应学负责精神' }],
  ['LAT085-081', { title: '出版自由包括身体表达' }],
  ['LAT085-085', { title: '爱情坚贞也有历史代价' }],
  ['LAT085-096', { title: '成败会改写身份标签' }],
  ['LAT085-102', { title: '私生子不必被污名化' }],
  ['LAT085-107', { title: '不实践者不宜订规则' }],
  ['LAT085-112', { title: '赔偿制度会诱发伪证' }],
  ['LAT085-114', { title: '人生如戏但坐牢不能演' }],
  ['LAT085-117', { title: '公文也能变成资料' }],
  ['LAT085-124', { title: '读书笔记可保存秘密' }],
  ['LAT085-130', { title: '一夫一妻只是过渡制度' }],
  ['LAT085-135', { title: '输入工具普及后难修改' }],
  ['LAT085-136', { title: '中文动词有独特力量' }],
  ['LAT085-142', { title: '丧葬不必念经烧纸' }],
  ['LAT085-146', { title: '拒绝租棺作假' }],
  ['LAT085-151', { title: '后来者受益于牺牲者' }],
  ['LAT085-167', { title: '监狱贿赂不能只道德化' }],
  ['LAT085-170', { title: '葬礼应成为个人纪念' }],
  ['LAT085-175', { title: '受欺负者也有自救责任' }],
  ['LAT085-181', { title: '维护真理才是大孝' }],
  ['LAT085-185', { category: '法权', title: '档案监控说明侦防细密' }],
  ['LAT085-189', { title: '敌对者也会互守秘密' }],
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
    'source_id',
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
  return taxonomy.map((category) => ({
    category,
    count: records.filter((record) => record.category === category).length,
  }));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’！？。，、：；（）()\s]/gu, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
      lines.push(`- 提取轮编号：${record.source_id}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(filePath, records) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}｜提取轮编号：${record.source_id}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeProofreadNote(filePath, payload, dropped) {
  const lines = [
    `# ${payload.book.title}校对说明`,
    '',
    `本轮从提取轮 ${payload.book.source_count} 条中保留 ${payload.records.length} 条，删除 ${payload.book.dropped_count} 条。`,
    '',
    '校对重点：',
    '',
    '- 删除纯节目现场调侃、过窄时政推进、同题重复、来宾互动依赖过强、人物励志介绍为主和思想密度不足的条目。',
    '- 保留言论自由、政治标准、历史解释、法权程序、监狱制度、丧礼改革、写作方法、语言文化和两性/婚恋/同性议题中能独立检索的李敖判断段。',
    '- 只调整取舍、标题、分类、关键词和编号；所有保留条目的 `description` 均未改写。',
    '',
    '分类统计：',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 删除条目',
    '',
    ...dropped.map((item) => `- ${item.id}：${item.title}。${item.reason}`),
    '',
  ];

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const unknownDrops = [...dropReasons.keys()].filter((id) => !extraction.records.some((record) => record.id === id));
if (unknownDrops.length) {
  throw new Error(`Unknown drop ids: ${unknownDrops.join(', ')}`);
}

const dropped = [];
const records = [];

for (const record of extraction.records) {
  const reason = dropReasons.get(record.id);
  if (reason) {
    dropped.push({ id: record.id, title: record.title, reason });
    continue;
  }

  const override = overrides.get(record.id) ?? {};
  const category = override.category ?? record.category;
  const title = override.title ?? record.title;
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} in ${record.id}`);
  }

  records.push({
    ...record,
    id: `LAT${extraction.book.sequence}-${String(records.length + 1).padStart(3, '0')}`,
    source_id: record.source_id ?? record.id,
    round: '校对轮',
    status: '已校对',
    category,
    title,
    keywords: buildKeywords(record, title, category),
  });
}

const payload = {
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除纯节目现场调侃、过窄时政推进、同题重复、来宾互动依赖过强、人物励志介绍为主和思想密度不足的条目；保留言论自由、政治标准、历史解释、法权程序、监狱制度、丧礼改革、写作方法、语言文化和两性/婚恋/同性议题中能独立检索的李敖判断段。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
};

const roundBase = '思想索引-校对轮';
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(roundCsvPath, records);
writeMarkdown(roundMdPath, payload);
writeText(path.join(outputDir, '思想索引.txt'), records);
fs.copyFileSync(roundJsonPath, path.join(outputDir, '思想索引.json'));
fs.copyFileSync(roundCsvPath, path.join(outputDir, '思想索引.csv'));
writeProofreadNote(path.join(outputDir, '校对说明.md'), payload, dropped);

console.log(
  `Proofread ${payload.book.title}: ${records.length}/${extraction.records.length} kept, ${dropped.length} dropped. Categories: ${payload.book.category_counts
    .map((item) => `${item.category}=${item.count}`)
    .join(', ')}`,
);
