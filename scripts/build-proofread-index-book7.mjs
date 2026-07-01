import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '007.李敖风流自传');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT007-014', '段落重心在追债和恶作剧细节，“报复与正义”的思想主轴已由 LAT007-013 承载。'],
  ['LAT007-017', '段落偏政治讽刺结论，论证密度不足，且“知识分子与美国”主题在后段美国论述中展开更充分。'],
  ['LAT007-018', '中国版图与蒋介石责任主题与前书已收政治条目重复，本轮不再单列。'],
  ['LAT007-023', '段落主要是少年搜集资料与玩笑轶事，索引性不如后续自修、材料组织和研究方法条目。'],
  ['LAT007-040', '自由中国结缘偏履历节点，思想价值由 LAT007-041、LAT007-043、LAT007-044 等条目承担。'],
  ['LAT007-045', '入伍日记起点偏事件说明，完整记录意识已由 LAT007-052 的预官日记条目承载。'],
  ['LAT007-054', '胡适赠款偏人物感念，与李敖思想索引的独立检索性较弱。'],
  ['LAT007-055', '胡适通风报信偏人物细节，不单列为思想条目。'],
  ['LAT007-067', '段落重心在胡适交友与李敖自我定位，人物关系色彩重，校对轮删除。'],
  ['LAT007-071', '政治犯名单段落主要交代案件责任过程，法权主题不如刑求、缄默权、洗脑等条目稳定。'],
  ['LAT007-082', '段落只是引出译文和诗作，未包含完整坐牢哲学正文。'],
  ['LAT007-084', '假民主论述与前一本议坛材料重复度高，校对轮压缩重复政治论述。'],
  ['LAT007-087', '万岁评论查禁率偏事实统计，言论自由主题由 LAT007-088、LAT007-089、LAT007-093 等条目承载。'],
  ['LAT007-091', '段落较短，主要是敌方批评的反向解读，思想密度不足。'],
  ['LAT007-116', '写作量古今第一偏自我成绩说明，写作观念由凡例、插播式写法和后记条目承载。'],
  ['LAT007-121', '大陆审查序文偏个案经历，出版审查主题已由 LAT007-120 集中呈现。'],
]);

const overrides = new Map([
  ['LAT007-001', { title: '浮生杂忆尽得风流', keywords: '浮生杂忆,破格,风流自传' }],
  ['LAT007-002', { title: '信笔所之破章法', keywords: '信笔所之,章法,颠覆' }],
  ['LAT007-003', { title: '瓜蔓式随性铺展', keywords: '瓜蔓式,跑野马,随性' }],
  ['LAT007-004', { title: '跳跃式自传保远方', keywords: '跳跃式,高度,远方' }],
  ['LAT007-006', { title: '以示范为主', keywords: '示范,播种,个人' }],
  ['LAT007-007', { title: '为人类观念行为结帐', keywords: '观念,行为,结帐' }],
  ['LAT007-008', { title: '驯兽师式应对敌我', keywords: '驯兽师,敌我,不可测' }],
  ['LAT007-009', { title: '动物化后再人道化', keywords: '自然法则,动物化,人道化' }],
  ['LAT007-013', { title: '报复使正义复活', keywords: '报复,正义,清算' }],
  ['LAT007-016', { title: '牺牲名誉换奋斗', keywords: '名誉,奋斗,大丈夫' }],
  ['LAT007-019', { title: '小说须有思想历史纵深', keywords: '文学,思想,历史' }],
  ['LAT007-020', { title: '文字狱反证作品力量', keywords: '查禁,文字狱,小说' }],
  ['LAT007-022', { title: '恨日本也学日文', keywords: '日本,日文,学习' }],
  ['LAT007-024', { title: '小学生文库开启读书路', keywords: '小学生文库,图书馆长,丛书' }],
  ['LAT007-028', { title: '不过旧历年的现代化', keywords: '旧历年,现代化,特立独行' }],
  ['LAT007-029', { title: '用知识傲慢反制学校', keywords: '知识傲慢,制式学校,自修' }],
  ['LAT007-030', { title: '现代人不必乡愁', keywords: '乡愁,现代化,书房' }],
  ['LAT007-031', { title: '老师要能搅动思想', keywords: '严侨,思想,数学' }],
  ['LAT007-034', { title: '真儒宗不倒向统治者', keywords: '儒宗,知识分子,统治者' }],
  ['LAT007-036', { title: '丧礼改革伏机特立独行', keywords: '丧礼改革,特立独行,大勇' }],
  ['LAT007-037', { title: '学校会斲丧性灵', keywords: '学校,自修,性灵' }],
  ['LAT007-038', { title: '做学问靠材料组织剪裁', keywords: '毕业论文,材料,组织剪裁' }],
  ['LAT007-039', { title: '不走安心学问路', keywords: '文星,写文章,树敌' }],
  ['LAT007-041', { title: '文字也能与朝廷争胜', keywords: '自由中国,自由民主,文字收功' }],
  ['LAT007-042', { title: '讲真话会打破迷梦', keywords: '真话,迷梦,胡适' }],
  ['LAT007-043', { title: '封闭时代选择胡适', keywords: '胡适,封闭,自由主义' }],
  ['LAT007-044', { title: '胡适得皮殷海光得肉', keywords: '胡适,殷海光,自由主义' }],
  ['LAT007-047', { title: '政工如蝎子', keywords: '政工,军队,蝎子' }],
  ['LAT007-048', { title: '题壁是大字报远源', keywords: '题壁,大字报,老大哥' }],
  ['LAT007-050', { title: '少做懦夫多做勇士', keywords: '勇士,懦夫,未来' }],
  ['LAT007-052', { title: '偷写完整预官日记', keywords: '日记,记录,预官' }],
  ['LAT007-056', { title: '不可救药统治者只能打', keywords: '陈情,统治者,打' }],
  ['LAT007-058', { title: '思想领导政治', keywords: '文星,思想,政治' }],
  ['LAT007-059', { title: '练习独立思想', keywords: '独立思想,知识分子,文星' }],
  ['LAT007-060', { title: '禁书越禁越流传', keywords: '传统下的独白,查禁,流传' }],
  ['LAT007-061', { title: '统战可坏不可伪', keywords: '统战,合作,伪君子' }],
  ['LAT007-062', { title: '经济独立才站得直', keywords: '经济基础,拒绝,站直' }],
  ['LAT007-063', { title: '反固实让敌人失地', keywords: '反固实,敌人,无地自容' }],
  ['LAT007-064', { title: '文坛无正文无反骨', keywords: '文坛,蒋政权,反骨' }],
  ['LAT007-065', { title: '暗室里自造光芒', keywords: '暗室,光芒,特立独行' }],
  ['LAT007-068', { category: '方法', title: '害之反足以成之', keywords: '迫害,公布,反成其事' }],
  ['LAT007-070', { title: '自由中国忽略底层苦难', keywords: '自由中国,上层,苦难' }],
  ['LAT007-072', { title: '反台独者被戴台独帽', keywords: '台独,罪名,纽约时报' }],
  ['LAT007-074', { title: '文学凝聚人间血泪', keywords: '文学笔法,血泪,红色11' }],
  ['LAT007-075', { title: '人生只是正义之战', keywords: '人生,正义,艰难' }],
  ['LAT007-076', { title: '缄默权可溯耶稣', keywords: '缄默权,耶稣,法庭' }],
  ['LAT007-077', { title: '岛上没有自由感', keywords: '自由,法庭,政治犯' }],
  ['LAT007-079', { title: '悔悟应属他人', keywords: '悔悟,无罪,强制' }],
  ['LAT007-080', { title: '朋友不可犯大是大非', keywords: '朋友,大是大非,错误' }],
  ['LAT007-081', { title: '拒做国民党打手', keywords: '国民党,干薪,打手' }],
  ['LAT007-083', { title: '冤狱仍可提炼好处', keywords: '冤狱,好处,坐牢' }],
  ['LAT007-085', { title: '斗争方式必须务实', keywords: '方法,黑白脸,斗争' }],
  ['LAT007-086', { title: '才华之外更重人格', keywords: '人格,不合作,拒绝合作' }],
  ['LAT007-088', { title: '争取百分百言论自由', keywords: '言论自由,郑南榕,优先' }],
  ['LAT007-089', { title: '不奉中华民国正朔', keywords: '求是报,正朔,言论自由' }],
  ['LAT007-090', { title: '带头正人心布公道', keywords: '求是评论,正人心,布公道' }],
  ['LAT007-092', { title: '资料本领形成成绩单', keywords: '资料,本领,成绩单' }],
  ['LAT007-093', { title: '出版黑狱内幕', keywords: '黑狱,政治犯,出版' }],
  ['LAT007-094', { title: '从图腾处挖国民党根', keywords: '孙中山,图腾,国民党' }],
  ['LAT007-095', { title: '拆蒋为国民争人格', keywords: '蒋介石,道德意义,人格' }],
  ['LAT007-096', { title: '二二八只谈真相真理', keywords: '二二八,真相,真理' }],
  ['LAT007-097', { title: '旧道德也能守原则', keywords: '旧道德,原则,细心' }],
  ['LAT007-098', { title: '骂人也要有证据', keywords: '证据,骂人,演讲' }],
  ['LAT007-099', { title: '看书要防书毒', keywords: '看书,书毒,防范' }],
  ['LAT007-100', { title: '迂回前进也是前进', keywords: '迂回,前进,方法' }],
  ['LAT007-101', { title: '金钱可以保护自由', keywords: '金钱,自由,保护' }],
  ['LAT007-102', { title: '言论自由要敢摸老虎屁股', keywords: '言论自由,老虎屁股,自由' }],
  ['LAT007-103', { title: '要使祖国自由', keywords: '祖国,中国,自由' }],
  ['LAT007-104', { title: '知识分子要强壮快乐积极', keywords: '知识分子,强壮,快乐' }],
  ['LAT007-105', { title: '不掩没恶人的长处', keywords: '共匪,公道,长处' }],
  ['LAT007-106', { title: '知识分子要避免不公道', keywords: '共产党,正面,不公道' }],
  ['LAT007-107', { title: '第一流知识分子唯恐中国大乱', keywords: '中国,大乱,知识分子' }],
  ['LAT007-108', { title: '党一时中国永久', keywords: '党,中国,永久' }],
  ['LAT007-109', { title: '与共产党周旋纠缠', keywords: '共产党,周旋,纠缠' }],
  ['LAT007-110', { title: '真爱国者督促中国变好', keywords: '爱国,中国,变好' }],
  ['LAT007-111', { title: '风流是逍遥其内', keywords: '风流,逍遥,艺术' }],
  ['LAT007-112', { title: '圣人行恶人名', keywords: '墨子,圣人,恶人' }],
  ['LAT007-113', { title: '亡天下时知识分子要站出来', keywords: '亡天下,知识分子,浩然之气' }],
  ['LAT007-114', { title: '圣人做我也不过如此', keywords: '圣人行,行义,评判' }],
  ['LAT007-115', { title: '全盘西化不能任意选择', keywords: '全盘西化,文化移植,选择' }],
  ['LAT007-117', { title: '拒绝做美国人', keywords: '美国人,中国人,务实' }],
  ['LAT007-118', { title: '从美国受害者观点看事情', keywords: '美国,迫害,立场' }],
  ['LAT007-119', { title: '拆穿美国并送葬旧梦', keywords: '美国,梦,告别' }],
  ['LAT007-120', { title: '大陆出版审查令人倒胃', keywords: '阳痿美国,大陆,审查' }],
  ['LAT007-122', { title: '插播式自传写法', keywords: '广告,书法,插播' }],
  ['LAT007-123', { title: '不合作是知识分子尊严', keywords: '不合作,知识分子,尊严' }],
  ['LAT007-124', { title: '快乐战士', keywords: '快乐,战士,奋斗' }],
  ['LAT007-125', { title: '把自传写成纪功碑', keywords: '纪功碑,施教,自传' }],
  ['LAT007-126', { title: '余生给永恒作品', keywords: '余生,永恒,作品' }],
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
    '- 分类策略：校对轮继续使用 7 个原子分类，删除纯经历、弱段落和重复政治论述。',
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
    const override = overrides.get(record.id) ?? {};

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
