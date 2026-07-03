import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '032.上山·上山·爱');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT032-017', '“命可以改造”段落过短，造命与反宿命判断由下一条更完整承载。'],
  ['LAT032-028', '“爱情是快乐的屈从”过度依赖具体情爱场面，独立检索时容易脱离语境。'],
  ['LAT032-034', '女友标准一条偏个人选择口径，已由爱情、短暂、距离和来去技巧等条目承载。'],
  ['LAT032-039', '观音献身段落与“纯洁不是孤芳自赏”及“以欲止欲”两条重复，校对轮保留论述更完整者。'],
  ['LAT032-046', '“够水准女人不争胜”与后文新女性、平等和压人判断重复，且独立检索边界较窄。'],
  ['LAT032-048', '“够水准女人有隐性条件”偏人物赞语，与上一组女性观条目重复。'],
  ['LAT032-059', '小葇书信中强者不流泪一条偏情书语境，思想判断由“共同哲学驱逐悲情”承载。'],
  ['LAT032-060', '一个人的夕阳一条偏抒情，独立索引价值弱于后续“共同哲学”和“情人礼物”条目。'],
  ['LAT032-063', '大狱后落泪一条偏情节收束，校对轮不单独保留。'],
  ['LAT032-068', '陪伴也可以是写作一条较短，写作思想由后记与强者文学条目承载。'],
  ['LAT032-084', '肉体展示处就是天堂一条过度依赖场面，未保留为独立思想索引。'],
  ['LAT032-086', '天堂地狱是空中楼阁段落过短，灵肉和宗教问题由前后更完整条目承载。'],
  ['LAT032-089', '坟中情人诉说情爱偏歌曲与情节说明，保留“朦胧比真相更好”作为关系判断。'],
  ['LAT032-095', '情色小说也可以反政府与后文“黄色其外红色其中”重复，保留后者作为本书写作定位。'],
]);

const overrides = new Map([
  ['LAT032-001', { title: '自由休学也能自成知识', keywords: '休学,自由,知识,教育' }],
  ['LAT032-003', { title: '书名也会犯政治天条', keywords: '蓝色魔鬼岛,查禁,蒋介石,政治' }],
  ['LAT032-004', { title: '异端主轴只能独自走下去', keywords: '知识分子,异端,孤独,人格' }],
  ['LAT032-005', { title: '媒体法院受控时异己无路', keywords: '报纸,法院,诽谤,法权' }],
  ['LAT032-006', { title: '牢狱不能关住观念', keywords: '牢狱,梭罗,观念,人格' }],
  ['LAT032-007', { title: '厌倦人际仍要表现自己', keywords: '隐士,战斗,个人,人格' }],
  ['LAT032-008', { title: '山居孤独养浩然之气', keywords: '孤独,戴高乐,浩然之气,人格' }],
  ['LAT032-009', { title: '不要用坐牢考验亲友', keywords: '坐牢,亲友,火炼,人格' }],
  ['LAT032-010', { title: '乱世道德要接受裂缝', keywords: '乱世,道德,孤独,人格' }],
  ['LAT032-011', { title: '书房就是写作工厂', keywords: '书房,研究,写作工厂,写作' }],
  ['LAT032-012', { title: '清洁整齐也是生活品质', keywords: '生活,清洁,品质,人格' }],
  ['LAT032-014', { title: '美要有水准才完整', keywords: '美人,才华,头脑,情爱' }],
  ['LAT032-015', { title: '极权下金钱保存自由', keywords: '金钱,极权,自由,方法' }],
  ['LAT032-016', { title: '革命家不尊重政府红灯', keywords: '革命,红灯,政府,政治' }],
  ['LAT032-018', { title: '造命传统反驳宿命', keywords: '造命,孔子,孟子,方法' }],
  ['LAT032-019', { title: '友谊需要人格和公益', keywords: '友谊,人格,公益,人格' }],
  ['LAT032-020', { title: '心灵出世行动入世', keywords: '孤独,隐士,入世,人格' }],
  ['LAT032-021', { title: '爱是深度不是广度', keywords: '爱,怜悯,博爱,情爱' }],
  ['LAT032-022', { title: '多数成群不是力量', keywords: '多数,群众,力量,人格' }],
  ['LAT032-023', { title: '知识分子应维护真理', keywords: '知识分子,真理,职守,知识' }],
  ['LAT032-024', { title: '反对是知识分子的形式条件', keywords: '反对,知识分子,民主,知识' }],
  ['LAT032-025', { title: '灵肉二分制造现代失败', keywords: '灵肉,唯灵论,肉体,情爱' }],
  ['LAT032-026', { title: '爱情不该崇灵贬肉', keywords: '灵肉平等,爱情,肉体,情爱' }],
  ['LAT032-027', { title: '情欲可同时发生', keywords: '欲,情,爱情,情爱' }],
  ['LAT032-029', { title: '情圣靠内部作业', keywords: '爱情,情圣,内部作业,情爱' }],
  ['LAT032-030', { title: '精神恋爱和灵肉关系并存', keywords: '精神恋爱,灵肉,关系,情爱' }],
  ['LAT032-031', { title: '第一流爱情以幻成真', keywords: '真幻,爱情,精神恋爱,情爱' }],
  ['LAT032-032', { title: '短暂距离保存青春可爱', keywords: '青春,短暂,距离,情爱' }],
  ['LAT032-033', { title: '爱情要在最好时归宿', keywords: '爱情本质,短暂,情爱' }],
  ['LAT032-035', { title: '著作权不是天然神圣', keywords: '著作权,盗印,法律,法权' }],
  ['LAT032-036', { title: '了解中国不能靠新学究', keywords: '中国,历史,知识分子,知识' }],
  ['LAT032-038', { title: '纯洁不是孤芳自赏', keywords: '纯洁,欢喜佛,文化' }],
  ['LAT032-040', { title: '佛门也讲以欲止欲', keywords: '以欲止欲,观音,佛门,文化' }],
  ['LAT032-041', { title: '散布真理还会遇到愚民', keywords: '观音,查禁,愚民,文化' }],
  ['LAT032-042', { title: '佛经禁欲挡不住事实', keywords: '佛经,女人,好色,文化' }],
  ['LAT032-043', { title: '佛教以恐惧规训欲望', keywords: '欲海回狂,女人,佛教,文化' }],
  ['LAT032-044', { title: '太上忘情是有情而不滞', keywords: '太上忘情,爱情,洒脱,情爱' }],
  ['LAT032-045', { title: '第一流爱情要提前结束', keywords: '太上忘情,爱情,分手,情爱' }],
  ['LAT032-047', { title: '争平等不可变成压人', keywords: '新女性,平等,大女人主义,情爱' }],
  ['LAT032-049', { title: '爱情应是纯快乐', keywords: '爱情,快乐,两性,情爱' }],
  ['LAT032-050', { title: '真诗要救病讽时', keywords: '诗,白居易,讽谕,写作' }],
  ['LAT032-051', { title: '爱情移位不必悲剧化', keywords: '爱情,生离死别,移位,情爱' }],
  ['LAT032-052', { category: '方法', title: '求真也可给传奇留白', keywords: '历史,传奇,求真,方法' }],
  ['LAT032-053', { title: '用喜剧眼睛看悲剧', keywords: '悲剧,喜剧,情爱' }],
  ['LAT032-054', { title: '面对荒谬罪名只须笑', keywords: '罪名,政治犯,岳飞,政治' }],
  ['LAT032-055', { title: '爱情有无得失皆可喜', keywords: '爱情,孤独,过客,情爱' }],
  ['LAT032-056', { title: '彩云易散要一念转开', keywords: '彩云易散,分手,情爱' }],
  ['LAT032-057', { title: '爱情技巧是不走下坡', keywords: '爱情,技巧,结束,情爱' }],
  ['LAT032-058', { title: '爱情不是等待艺术', keywords: '爱情,等待,洒脱,情爱' }],
  ['LAT032-061', { title: '共同哲学驱逐悲情', keywords: '回忆,笑容,哲学,情爱' }],
  ['LAT032-062', { title: '情人本身才是礼物', keywords: '礼物,情人,心物合一,情爱' }],
  ['LAT032-064', { title: '历史要靠深刻对比', keywords: '历史感,吉朋,知识' }],
  ['LAT032-065', { title: '异代理想可相互重叠', keywords: '陈璧君,革命,理想,政治' }],
  ['LAT032-066', { title: '人世沧桑要放进宇宙', keywords: '中兴湖,中国,宇宙,文化' }],
  ['LAT032-067', { title: '冻结美丽也是面对', keywords: '冻结,叶葇,陈璧君,情爱' }],
  ['LAT032-069', { category: '方法', title: '历史中段也要清场', keywords: '历史,检讨,上帝,方法' }],
  ['LAT032-070', { title: '爱情需要神秘含蓄', keywords: '爱情,秘密,含蓄,情爱' }],
  ['LAT032-071', { title: '自然让生命重新发光', keywords: '自然,生命,积极,人格' }],
  ['LAT032-072', { title: '好人必须向外行善', keywords: '好人,善行,实践,人格' }],
  ['LAT032-073', { title: '真佛教不在盖庙敛财', keywords: '佛教,功德,智慧,文化' }],
  ['LAT032-074', { title: '菩萨是做事的人', keywords: '菩萨,地藏,做事,文化' }],
  ['LAT032-075', { title: '新兴宗教有失控风险', keywords: '新兴宗教,法轮功,文化' }],
  ['LAT032-076', { title: '现代科技会放大迷信', keywords: '迷信,科技,台湾,文化' }],
  ['LAT032-077', { title: '强者文学不哭伤痕', keywords: '伤痕文学,强者,写作' }],
  ['LAT032-078', { title: '牢狱靠精神力量撑住', keywords: '坐牢,精神力量,人格' }],
  ['LAT032-079', { title: '死亡想象也有情爱尺度', keywords: '殉情,高潮,死亡,情爱' }],
  ['LAT032-080', { title: '缺陷美靠选择性视野', keywords: '选择,视野,缺陷美,方法' }],
  ['LAT032-081', { title: '台湾文化由流民流氓流亡构成', keywords: '台湾文化,流民文化,文化' }],
  ['LAT032-082', { title: '台独停在口号而非行动', keywords: '台独,行动,政治' }],
  ['LAT032-083', { title: '天真也能视死如生', keywords: '生死,华滋华斯,人格' }],
  ['LAT032-085', { title: '灵肉不能靠诡辩拆伙', keywords: '灵魂,肉体,灵肉,情爱' }],
  ['LAT032-087', { title: '衰老死亡要认真面对', keywords: '衰老,死亡,人格' }],
  ['LAT032-088', { title: '小岛不能小化自我', keywords: '自我,台湾,巨人,人格' }],
  ['LAT032-090', { title: '真相朦胧才保全关系', keywords: '真相,秘密,情爱' }],
  ['LAT032-091', { title: '裸相也可自然庄严', keywords: '自然,庄严,情爱' }],
  ['LAT032-092', { title: '情人死后仍保存相依', keywords: '情人,死亡,相依,情爱' }],
  ['LAT032-093', { title: '不检即查代替言论自由', keywords: '言论自由,查禁,法权' }],
  ['LAT032-094', { title: '一查永逸扼杀连载', keywords: '查禁,连载,法权' }],
  ['LAT032-096', { title: '情色文学也能谈思想', keywords: '思想,情色文学,写作' }],
  ['LAT032-097', { title: '清浊取决于激浊扬清', keywords: '色情,淫秽,小说,写作' }],
  ['LAT032-098', { title: '黄色小说定位低估危险', keywords: '黄色小说,定位,危险性,写作' }],
  ['LAT032-099', { title: '黄色其外红色其中', keywords: '性,思想,小说,写作' }],
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
    '- 分类策略：继续使用 8 个原子分类，保留“情爱”但收紧边界；删除偏情节、偏情书语境、重复和过度依赖场面的弱条目。',
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
  note:
    '本轮由提取轮进入校对轮，删除偏情节、偏情书语境、重复和过度依赖场面的弱条目；保留情爱、灵肉、爱情技术、宗教欲望观、言论查禁、写作定位、知识分子、自我与死亡等核心索引。description 仍逐条保留源文本原文段落。',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 85) {
  throw new Error(`Expected 85 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT032-${String(index + 1).padStart(3, '0')}`,
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
