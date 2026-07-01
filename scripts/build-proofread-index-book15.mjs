import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '015.李敖全集');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT015-015', '发型绿眉类比偏例证，校对轮保留私生活分际和法令责任两个更核心条目。'],
  ['LAT015-018', '爱美段落偏教育现场意见，思想密度弱于相邻的训导和私权条目。'],
  ['LAT015-019', '读者来信反应偏传播效果材料，不单列思想索引。'],
  ['LAT015-025', '袁世凯用小人段落偏历史人物评语，独立检索价值弱于本书政治制度条目。'],
  ['LAT015-033', '同罪不同罚为台大惩戒混乱的例证，已由概括条款和法外开恩条目覆盖。'],
  ['LAT015-036', '校誉受损偏个案结果，保留不懂教育者把持大学的根本判断。'],
  ['LAT015-046', '排斥俗人的争权判断与一人控制文学院条目相近，校对轮保留后者。'],
  ['LAT015-049', '语言课程清单偏教学方案目录，不作为独立思想索引。'],
  ['LAT015-060', '梁启超办报材料偏历史铺陈，保留小说、报纸和副刊的原则性条目。'],
  ['LAT015-062', '《新中国未来记》预言材料偏例证，已由小说更新国民和副刊使命条目承载。'],
  ['LAT015-064', '“副刊”释名偏定义过渡，校对轮保留副刊特殊空间与警世木铎条目。'],
  ['LAT015-071', '医师法新闻比较偏个案材料，舆论责任已由相邻条目覆盖。'],
  ['LAT015-072', '描述为主管机关通知原文，不是李敖自身论述段落。'],
  ['LAT015-077', '公司登记和筹备细节偏操作清单，思想索引密度不足。'],
  ['LAT015-083', '好书重见读者偏出版愿望，保留出版精神动力和知识流传条目。'],
  ['LAT015-085', '战乱护书为历史铺陈，保留知识流传重于苦心显露的直接判断。'],
  ['LAT015-094', '看走眼段落偏自我形象证明，独立思想密度弱。'],
  ['LAT015-112', '艾登辞职段落偏历史事件叙述，校对轮保留抗拒绥靖的判断。'],
  ['LAT015-116', '孙悟空变形类比偏策略轶事，思想主干已由面子文化相关条目间接覆盖。'],
  ['LAT015-118', '民族多源性与民族史混同条目重复，保留后者的历史概括。'],
  ['LAT015-122', '孙中山原文引文由真正民族主义不是排斥异族条目承接。'],
  ['LAT015-124', '文明民族主义引文与相邻民族主义综合判断重复。'],
  ['LAT015-130', '李鸿章引文偏材料，保留洋务皮毛和彻底西化的综合判断。'],
  ['LAT015-131', '科学教育引文偏材料，保留彻底西化和现代文化条目。'],
  ['LAT015-132', '富强根本引文偏材料，保留救中国须彻底西化条目。'],
  ['LAT015-136', '孙中山早年经历偏证据材料，保留反排外和欧化判断。'],
  ['LAT015-152', '不轻易作序与实用之书贵在内容切实相近，校对轮不重复。'],
]);

const overrides = new Map([
  ['LAT015-006', { title: '小岛心态制造偏狭', keywords: '小岛,偏狭,气派' }],
  ['LAT015-007', { title: '眼界要越过小岛尺度', keywords: '眼界,世界,小岛' }],
  ['LAT015-014', { title: '私生活有官权不可插手的界线', keywords: '私生活,官权,界线' }],
  ['LAT015-016', { title: '管制发型背后要追法令责任', keywords: '发型,法令,责任' }],
  ['LAT015-024', { category: '方法', title: '训育从严必须有教育作用', keywords: '训育,严格,教育作用' }],
  ['LAT015-030', { title: '惩罚只是教育方法末流', keywords: '惩罚,教育方法,教化' }],
  ['LAT015-038', { title: '原始文件和严谨推论能揭开怪状', keywords: '原始文件,推论,高等教育' }],
  ['LAT015-040', { title: '启发不是当真打人', keywords: '当头棒喝,启发,自由' }],
  ['LAT015-041', { category: '知识', title: '学历史的态度是不说谎', keywords: '历史,事实,不说谎' }],
  ['LAT015-051', { title: '知识分子的优越感会自我包裹', keywords: '知识分子,优越感,自我' }],
  ['LAT015-053', { title: '不甘寂寞容易委身权势', keywords: '知识分子,寂寞,权势' }],
  ['LAT015-055', { title: '知识分子应做思想先导', keywords: '知识分子,思想,先导' }],
  ['LAT015-058', { category: '政治', title: '强制型名人会误认拥护', keywords: '名人,群众,强制' }],
  ['LAT015-061', { title: '小说可以更新国民', keywords: '小说,国民,梁启超' }],
  ['LAT015-065', { title: '副刊是中国报业的特殊空间', keywords: '副刊,报业,特殊空间' }],
  ['LAT015-067', { title: '副刊主流应是警世木铎', keywords: '副刊,警世木铎,报纸' }],
  ['LAT015-070', { title: '舆论家要鞭策立法', keywords: '舆论,立法,责任' }],
  ['LAT015-076', { title: '高手会让更优秀的人工作', keywords: '用人,高手,专家' }],
  ['LAT015-079', { category: '文化', title: '出版落伍就是精神动力落伍', keywords: '出版,精神动力,落伍' }],
  ['LAT015-080', { title: '新纪元要从思想知识着手', keywords: '思想,知识,新纪元' }],
  ['LAT015-084', { title: '好书还要有合适形式', keywords: '好书,形式,出版' }],
  ['LAT015-086', { title: '知识流传重于苦心显露', keywords: '知识流传,读者,丛刊' }],
  ['LAT015-092', { title: '方法学不能替代知识基础', keywords: '方法学,知识基础,水泥' }],
  ['LAT015-096', { title: '政治运动可能吞没思想传播', keywords: '政治运动,思想传播,言论自由' }],
  ['LAT015-098', { title: '高级知识分子也受经验限制', keywords: '知识分子,生活经验,限制' }],
  ['LAT015-100', { title: '思想自由者暴露于无约束权力', keywords: '思想自由,权力,身体' }],
  ['LAT015-102', { title: '大方向正确仍要知识基础', keywords: '大方向,知识基础,中国文化' }],
  ['LAT015-103', { title: '思想家不等于专业学者', keywords: '思想家,专业学者,启蒙' }],
  ['LAT015-105', { title: '启蒙工作常有悲剧性', keywords: '启蒙,悲剧性,自由中国' }],
  ['LAT015-106', { title: '民主还需要日常气质', keywords: '自由民主,气质,日常' }],
  ['LAT015-107', { title: '放异议者出境可做人权证据', keywords: '出境,异议,人权证据' }],
  ['LAT015-110', { category: '法权', title: '言论自由的肉体杀不尽', keywords: '言论自由,身体,九死无悔' }],
  ['LAT015-114', { title: '禁书尺度因人而异', keywords: '禁书,言论自由,尺度' }],
  ['LAT015-117', { title: '民族视野不可困在黄帝子孙', keywords: '民族,黄帝子孙,视野' }],
  ['LAT015-119', { title: '民族英雄也要重新怀疑', keywords: '民族英雄,历史,怀疑' }],
  ['LAT015-120', { title: '中国民族史多次混同', keywords: '民族史,混同,夷夏' }],
  ['LAT015-121', { title: '狭隘民族观配不上大民族', keywords: '民族观,狭隘,大民族' }],
  ['LAT015-123', { title: '真正民族主义不是排斥异族', keywords: '民族主义,异族,融合' }],
  ['LAT015-127', { title: '认识世界要直接取材异域著作', keywords: '异域著作,世界,海国图志' }],
  ['LAT015-134', { title: '取法于人可换来独立', keywords: '取法,改革,独立' }],
  ['LAT015-137', { title: '欧化是现代文化', keywords: '欧化,现代文化,追赶' }],
  ['LAT015-138', { category: '知识', title: '破除迷信是科学精神', keywords: '迷信,科学精神,孙中山' }],
  ['LAT015-140', { title: '男女平等要落实到制度', keywords: '男女平等,制度,女权' }],
  ['LAT015-142', { title: '审判应重证据轻口供', keywords: '审判,证据,口供' }],
  ['LAT015-144', { title: '受辱阶级也应享有权利', keywords: '人权,阶级,平等' }],
  ['LAT015-145', { category: '法权', title: '官员是人民公仆', keywords: '官员,公仆,共和' }],
  ['LAT015-146', { title: '拒绝勋位体现平民主义', keywords: '勋位,平民主义,自处' }],
  ['LAT015-147', { title: '谈政治就不能回避权利', keywords: '政治,权利,义务' }],
  ['LAT015-148', { title: '报律不能压过言论自由', keywords: '报律,出版法,言论自由' }],
  ['LAT015-149', { title: '对异己最好辩论明白', keywords: '异己,辩论,容忍' }],
  ['LAT015-150', { title: '科学问题不得附会古说', keywords: '科学,附会,古说' }],
  ['LAT015-151', { title: '实用之书贵在内容切实', keywords: '实用,内容,题字' }],
  ['LAT015-153', { title: '不乱推荐体现办事认真', keywords: '推荐,认真,航空学校' }],
  ['LAT015-158', { title: '中体西用走不通', keywords: '中体西用,现代文化,科学' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复、过渡、偏材料和思想密度较弱的条目。',
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
if (keptOriginalRecords.length !== 132) {
  throw new Error(`Expected 132 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT015-${String(index + 1).padStart(3, '0')}`,
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
