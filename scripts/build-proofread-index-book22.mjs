import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '022.我是天安门');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT022-006', '近程试验与“香港应做民主试验特区”重复，校对轮保留后一条更完整的政治方案。'],
  ['LAT022-015', '国民党香港立场前后矛盾偏单一政党史事，索引价值弱于香港体用与民主试验主线。'],
  ['LAT022-016', '五五宪草史实校勘偏事实纠错，未形成足够独立的思想索引入口。'],
  ['LAT022-025', '新痛旧痛的人道标准与相邻“不可感情用事”“乐观悲观不可情绪化”重复。'],
  ['LAT022-027', '学运作为政争工具是背景铺垫，保留“学生干政要有限度”的结论条目。'],
  ['LAT022-033', '实事求是的词义解释偏定义铺垫，保留“功过都要从事实出发”的应用判断。'],
  ['LAT022-041', '从分处下手与毛泽东湘独材料重复，保留“湘独论与台独论似曾相识”。'],
  ['LAT022-043', '理论接上实际运动偏毛泽东湘独论的程序细节，校对轮保留更具检索价值的历史反讽。'],
  ['LAT022-058', '革命造成骨肉离散偏毛家史事结论，和全书制度、革命、牺牲主题已有更强条目承载。'],
  ['LAT022-062', '索尔兹伯里写作方法偏导读性说明，和本书政治思想主线距离较远。'],
  ['LAT022-066', '列宁和约例证是“欲取先予”的展开，保留原则条目即可。'],
  ['LAT022-069', '实力者择时与“强者也需要喘息时间”重复，且笑话铺陈较多。'],
  ['LAT022-071', '中国贫穷使试验缺基础与同篇“先解决贫穷”“救贫更急”重复。'],
  ['LAT022-073', '衣食作为自由民主前提与后文“仓廪实则知自由民主”重复，保留后者。'],
  ['LAT022-080', '婚姻迷信帮派死灰复燃偏新闻短评，思想承载力较弱。'],
  ['LAT022-083', '化妆品进入大陆偏文化趣味短评，校对轮暂不收。'],
]);

const overrides = new Map([
  ['LAT022-001', { title: '制度之体决定经济之用', keywords: '香港,体用,制度,现代化' }],
  ['LAT022-002', { title: '香港繁荣靠法治柱石', keywords: '香港,自由,民主,宪政,法治' }],
  ['LAT022-003', { title: '自由人权高于政权归属', keywords: '自由,人权,香港,政权' }],
  ['LAT022-004', { title: '香港反照中国统治能力', keywords: '香港,国耻,统治能力,帝国主义' }],
  ['LAT022-005', { title: '香港可做民主试验', keywords: '香港,民主试验,港人治港,中国前途' }],
  ['LAT022-007', { title: '帝国主义是强者通病', keywords: '帝国主义,强权,民族,和平' }],
  ['LAT022-008', { title: '帝国主义可被当作替罪羊', keywords: '帝国主义,替罪羊,国民党,口号' }],
  ['LAT022-009', { title: '怪外人容易逃避自省', keywords: '帝国主义,自省,责任,鸦片' }],
  ['LAT022-010', { title: '反外力先求自身膨胀', keywords: '帝国主义,膨胀,责任,蒋廷黻' }],
  ['LAT022-011', { title: '租界也可能护住言论自由', keywords: '租界,言论自由,出版,法治' }],
  ['LAT022-012', { title: '中国缺人权法治人道', keywords: '人权,人道,法治,公平' }],
  ['LAT022-013', { title: '殖民下限胜过大国民水平', keywords: '殖民,香港,大国民,爱国' }],
  ['LAT022-014', { title: '领土光荣不等于人民幸福', keywords: '领土,人民,帝国主义,李鸿章' }],
  ['LAT022-017', { title: '国共主义国号同源荒谬', keywords: '国共,中华民国,三民主义,共产主义' }],
  ['LAT022-018', { title: '中国政局不是打倒公式', keywords: '天安门,中国政局,历史,兴亡' }],
  ['LAT022-019', { title: '天安门事件会历史重演', keywords: '天安门,三一八,六四,历史重复' }],
  ['LAT022-020', { title: '抗议者也会变成开枪者', keywords: '抗议者,开枪者,历史,中国人民' }],
  ['LAT022-021', { title: '哀而不鉴必再循环', keywords: '历史鉴戒,天安门,循环,改朝换代' }],
  ['LAT022-022', { title: '共产主义理想抵不过人性', keywords: '共产主义,马克思,人性,圣人' }],
  ['LAT022-023', { title: '坏制度会使好人走反面', keywords: '制度,政治体制,邓小平,天安门' }],
  ['LAT022-024', { title: '国家大事不可感情用事', keywords: '感情用事,国家大事,冷静,中国问题' }],
  ['LAT022-026', { title: '乐观悲观都不可情绪化', keywords: '乐观,悲观,感情用事,政治判断' }],
  ['LAT022-028', { title: '学生干政必须知道限度', keywords: '学生干政,限度,学运,招祸' }],
  ['LAT022-029', { title: '政治需要会使革命走火', keywords: '法国大革命,政治需要,法理,人道' }],
  ['LAT022-030', { title: '革命民主也会变成暴民政治', keywords: '法国大革命,暴民,国会,民主' }],
  ['LAT022-031', { title: '中国革命还有长路', keywords: '法国大革命,中国革命,邓小平,长路' }],
  ['LAT022-032', { title: '知识分子不该忽热忽冷', keywords: '唐德刚,知识分子,史识,感情用事' }],
  ['LAT022-034', { title: '功过都要从事实出发', keywords: '实事求是,功过,赵紫阳,事实' }],
  ['LAT022-035', { title: '罪过不该抹掉功劳', keywords: '唐太宗,侯君集,功劳,实事求是' }],
  ['LAT022-036', { title: '贫穷不能全归罪制度', keywords: '贫穷,共产制度,历史,没裤子' }],
  ['LAT022-037', { title: '强国代价要两面看', keywords: '强国,核子弹,贫穷,亡国奴' }],
  ['LAT022-038', { title: '小岛也该有大陆胸襟', keywords: '台湾独立,拿破仑,科西嘉,大陆胸襟' }],
  ['LAT022-039', { title: '地方主义可转成统一野心', keywords: '毛泽东,湖南独立,统一,地方主义' }],
  ['LAT022-040', { title: '独立口号可能只是政治赌博', keywords: '台独,湘独,政治口号,赌博' }],
  ['LAT022-042', { title: '湘独论与台独论互照', keywords: '湖南独立,台湾独立,自决,历史' }],
  ['LAT022-044', { title: '打天下不同于治天下', keywords: '打天下,治天下,刘邦,陆贾' }],
  ['LAT022-045', { title: '三七开会变作恶弹性', keywords: '毛泽东,三七开,错误,弹性' }],
  ['LAT022-046', { title: '革命家未必配治天下', keywords: '毛泽东,革命家,治天下,刘邦' }],
  ['LAT022-047', { title: '革命成功会滑向个人独裁', keywords: '共产党,个人独裁,制度,马克思' }],
  ['LAT022-048', { title: '帝王式共产主义更可怕', keywords: '毛泽东,帝王,共产主义,暴君' }],
  ['LAT022-049', { title: '救亡图存常目的热方法盲', keywords: '救亡图存,目的热,方法盲,义和团' }],
  ['LAT022-050', { title: '独裁离不开官僚恶政', keywords: '陈独秀,独裁,官僚政治,民主' }],
  ['LAT022-051', { title: '陈独秀终归英美民主', keywords: '陈独秀,英美民主,最后见解,五四' }],
  ['LAT022-052', { title: '知识分子带路也会方法盲', keywords: '知识分子,方法盲,胡适,主义' }],
  ['LAT022-053', { title: '中国忘了试验真正民主', keywords: '美式民主,基本人权,中国试验,法权' }],
  ['LAT022-054', { title: '反帝赢了也可能比赛输了', keywords: '反帝,共产主义,资本主义,基本人权' }],
  ['LAT022-055', { title: '毛泽东功罪要分开看', keywords: '毛泽东,功罪,打天下,治天下' }],
  ['LAT022-056', { title: '共产党人情不是亲友做官', keywords: '毛岸英,人情,亲友做官,原则' }],
  ['LAT022-057', { title: '没有制衡主义也会腐化', keywords: '权力,制度,制衡,腐化' }],
  ['LAT022-059', { title: '牺牲信仰会走火入魔', keywords: '牺牲,集体狂热,宗教,强制' }],
  ['LAT022-060', { title: '牺牲下一代是可怕宗教', keywords: '共产主义,牺牲,下一代,目的热' }],
  ['LAT022-061', { title: '哪一代都不是蚂蚁', keywords: '牺牲,个人价值,蚂蚁,国民党' }],
  ['LAT022-063', { title: '长征意义要看成功以后', keywords: '长征,革命成功,迫害,历史意义' }],
  ['LAT022-064', { title: '长征可反观共产宗教', keywords: '长征,共产宗教,思想反共,理想' }],
  ['LAT022-065', { title: '欲取先予是政治哲学', keywords: '欲取先予,政治哲学,假道灭虢,权术' }],
  ['LAT022-067', { title: '强者也需要喘息时间', keywords: '钓鱼岛,中国大陆,实力,喘息' }],
  ['LAT022-068', { title: '护土要靠真实实力', keywords: '保钓,实力,武力,民气' }],
  ['LAT022-070', { title: '中国问题先解决贫穷', keywords: '中国问题,贫穷,长远眼光,根本' }],
  ['LAT022-072', { title: '救贫比自由民主更急', keywords: '贫穷,自由民主,救死,救贫' }],
  ['LAT022-074', { title: '自由民主不能求近功', keywords: '自由民主,长程,孙中山,法国大革命' }],
  ['LAT022-075', { title: '仓廪实则知自由民主', keywords: '贫穷,自由民主,长远,中国步骤' }],
  ['LAT022-076', { title: '中国问题是不挨打不挨饿', keywords: '中国问题,挨打,挨饿,长远' }],
  ['LAT022-077', { title: '指控伪善必须举证', keywords: '美国,人权,举证,宣传' }],
  ['LAT022-078', { title: '人权制度也在演进', keywords: '美国,人权,演进,集会自由' }],
  ['LAT022-079', { title: '人权批评要理解民众生活', keywords: '人权,民众生活,美国,伪善' }],
  ['LAT022-081', { title: '生存权是人口大国首要人权', keywords: '生存权,人权,十一亿人口,中国' }],
  ['LAT022-082', { title: '外交友好也要历史平衡', keywords: '中苏关系,苏联,帝国主义,历史' }],
  ['LAT022-084', { title: '知识分子不能说假话', keywords: '知识分子,费孝通,真话,假话' }],
  ['LAT022-085', { title: '非暴力也可能只是打不过', keywords: '达赖,非暴力,西藏,策略' }],
  ['LAT022-086', { title: '同情神权不等于自由解放', keywords: '西藏,神权,自由,解放' }],
  ['LAT022-087', { title: '中央统治可比神权进步', keywords: '西藏,中央政府,神权统治,进步' }],
  ['LAT022-088', { title: '恢复旧西藏不是恢复人权', keywords: '达赖,西藏,人权,农奴' }],
  ['LAT022-089', { title: '极权崩溃常靠窝里反', keywords: '叶利钦,共产党,极权,窝里反' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复、铺垫、时事例证过细和思想承载力较弱的条目。',
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
if (keptOriginalRecords.length !== 73) {
  throw new Error(`Expected 73 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT022-${String(index + 1).padStart(3, '0')}`,
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
