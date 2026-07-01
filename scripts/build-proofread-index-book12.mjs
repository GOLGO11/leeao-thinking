import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '012.李敖文存');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT012-007', '与“大丈夫不靠掌声活”相邻重复，保留后者作为更有力度的自我肯定条目。'],
  ['LAT012-011', '与“出世精神要做入世事业”“看破后再回红尘”重复，菩萨总结不再单列。'],
  ['LAT012-013', '自我处境说明过短，思想信息已由极权与真话条目承载。'],
  ['LAT012-014', '梭罗例证与甘地段落同属牢中精神自由，保留论点更完整的甘地段落。'],
  ['LAT012-017', '“自由的不自由”总结与前一条责任段落重复，保留前者的完整论述。'],
  ['LAT012-030', '承接前文引文，单独成条上下文不足，保留下一条“消融西方文化不是旧路可走”。'],
  ['LAT012-046', '黄金鬼话偏掌故辨误，黄金思想保留伦理化与物质不灭两条。'],
  ['LAT012-049', '麻将国赌偏开题调侃，赌博篇保留时间、禁赌和法律三条主旨。'],
  ['LAT012-063', '古籍出版总结与版本、分类、影印条目重叠，校对轮不单列。'],
  ['LAT012-071', '蒋廷黻人缘冷漠偏人物评语，校对轮聚焦其知识阶级、自由主义和国力思想。'],
  ['LAT012-076', '依赖“上面言论”的总结段，上下文不足，保留前一条士大夫不事生产。'],
  ['LAT012-081', '与“士大夫缺大无畏精神”重复，商人主题保留更完整的尊商段落。'],
  ['LAT012-091', '敌人帮忙是引入判断，保留“真正问题在自己”作为主旨条。'],
]);

const overrides = new Map([
  ['LAT012-001', { title: '文章首先问内容与表达', keywords: '文章标准,内容,表达' }],
  ['LAT012-002', { title: '评文章只问目的和效果', keywords: '评判标准,表达目的,表达效果' }],
  ['LAT012-003', { title: '好坏判断要敢说真话', keywords: '判断,勇气,名家' }],
  ['LAT012-006', { title: '白话根基薄弱制造新八股', keywords: '白话文,新八股,文风' }],
  ['LAT012-008', { title: '大丈夫不靠掌声活', keywords: '掌声,封锁,大丈夫' }],
  ['LAT012-009', { category: '人格', title: '出世精神要做入世事业', keywords: '大乘佛教,入世,出世' }],
  ['LAT012-010', { title: '看破红尘后仍回到红尘', keywords: '看破红尘,救世,得失' }],
  ['LAT012-015', { title: '自由感受取决于心理状态', keywords: '甘地,心理状态,自由' }],
  ['LAT012-016', { category: '人格', title: '自由者仍担起他人不自由', keywords: '责任,受难,自由' }],
  ['LAT012-018', { title: '自传神话来自光荣妄想', keywords: '妄想,自我膨胀,传记' }],
  ['LAT012-019', { title: '当年如何叙事须警惕', keywords: '回忆,自我陶醉,求真' }],
  ['LAT012-021', { title: '研究古物先放弃今义', keywords: '古物,床,定义' }],
  ['LAT012-022', { title: '床可变成权力道具', keywords: '床,统治,权力' }],
  ['LAT012-024', { title: '复兴固有文化先读准字义', keywords: '吃素,荤,固有文化' }],
  ['LAT012-027', { title: '保身也是保写作自由', keywords: '保身,写作,自由' }],
  ['LAT012-029', { title: '反动势力需要准确命名', keywords: '义和团思想,文化沙文主义,概念' }],
  ['LAT012-031', { title: '消融西方文化不是旧路可走', keywords: '固有文化,西洋文化,翻译' }],
  ['LAT012-034', { title: '识别文化沙文主义要方法训练', keywords: '义和团思想,思想方法,警觉' }],
  ['LAT012-036', { title: '民字证据反证没有民主', keywords: '民主,民,古书' }],
  ['LAT012-037', { title: '转向西化需要冲决勇气', keywords: '西化,韦政通,大勇' }],
  ['LAT012-038', { title: '儒家做人学问服务阶层', keywords: '儒家,阶层,君子' }],
  ['LAT012-039', { title: '三纲五常成为固有文化基层', keywords: '三纲五常,固有文化,统治' }],
  ['LAT012-040', { title: '大一统压住科学民主', keywords: '大一统,民主,科学' }],
  ['LAT012-041', { title: '新文化不能中西折衷', keywords: '新文化,西方,五四' }],
  ['LAT012-042', { title: '单一雇主社会没有民主', keywords: '民主,雇主,社会主义' }],
  ['LAT012-043', { title: '精确表达是语意问题', keywords: '语意学,精确,表达' }],
  ['LAT012-045', { title: '反共要凭科学民主原则', keywords: '反共,科学,民主' }],
  ['LAT012-047', { title: '黄金被道德化成君子', keywords: '黄金,伦理化,君子' }],
  ['LAT012-048', { title: '物质不灭不容神变解释', keywords: '黄金,物质不灭,苏轼' }],
  ['LAT012-050', { title: '以闲为幸福荒废时间', keywords: '麻将,消闲,时间' }],
  ['LAT012-051', { title: '禁赌要先解决替代生活', keywords: '禁赌,替代,口号' }],
  ['LAT012-052', { title: '禁赌不能靠严刑峻法', keywords: '禁赌,法律,严刑峻法' }],
  ['LAT012-053', { title: '戒赌不是道德而是时间', keywords: '戒赌,时间,道德' }],
  ['LAT012-055', { category: '方法', title: '承认现实才谈研究改善', keywords: '娼妓,粉饰,改善' }],
  ['LAT012-056', { title: '官妓没有人身自由', keywords: '官妓,自由,人身' }],
  ['LAT012-057', { title: '政府自身不道德难禁风化', keywords: '政府,道德,公营' }],
  ['LAT012-058', { title: '娼妓制度也充当文学资源', keywords: '娼妓,文人,文学' }],
  ['LAT012-059', { title: '制度民俗名词皆有历史脉络', keywords: '制度,民俗,历史' }],
  ['LAT012-061', { title: '版本考究不等于文化弘扬', keywords: '版本,普及,文化' }],
  ['LAT012-062', { title: '四部旧框架垄断学术均衡', keywords: '四部,分类,古籍' }],
  ['LAT012-064', { title: '武士道底子是愚忠', keywords: '武士道,日本,愚忠' }],
  ['LAT012-065', { title: '鞠躬文化不是平等相处', keywords: '町人道,平等,日本' }],
  ['LAT012-066', { title: '军阀财阀是日本综合体', keywords: '军阀,财阀,日本' }],
  ['LAT012-067', { title: '统计学用坏就成谎话', keywords: '统计学,日本,谎话' }],
  ['LAT012-068', { title: '战略不能只算第一仗', keywords: '战争,统计,后果' }],
  ['LAT012-069', { title: '和魂洋才丢掉民主基础', keywords: '和魂洋才,民主,西化' }],
  ['LAT012-070', { title: '失败者要学到远见', keywords: '失败,日本,教训' }],
  ['LAT012-072', { title: '现代人知道何时能发言', keywords: '现代人,知识阶级,发言' }],
  ['LAT012-073', { title: '求知不能只靠书本', keywords: '求知,书本,事实' }],
  ['LAT012-074', { title: '清议面前要有大无畏', keywords: '士大夫,独立,大无畏' }],
  ['LAT012-075', { title: '士大夫阶级不事生产', keywords: '士大夫,生产,知识' }],
  ['LAT012-077', { title: '国粹妨碍国力就割爱', keywords: '国力,国粹,道德' }],
  ['LAT012-078', { title: '国力来自人民诸力', keywords: '国力,青年,人民' }],
  ['LAT012-079', { title: '文艺也是国家精神力量', keywords: '文艺,国家力量,精神' }],
  ['LAT012-080', { title: '尊重商人才能提高生活', keywords: '商人,商业,偏见' }],
  ['LAT012-083', { title: '无政治自由就是地狱', keywords: '政治自由,全能主义,地狱' }],
  ['LAT012-084', { title: '经济自由不能废政治自由', keywords: '政治自由,经济自由,进步' }],
  ['LAT012-085', { title: '经济压迫会毁自由意志', keywords: '经济压迫,自由意志,海耶克' }],
  ['LAT012-086', { title: '统制越热闹人民越穷', keywords: '统制,国营,政治自由' }],
  ['LAT012-087', { title: '民主需要好的反对党', keywords: '反对党,民主政府,责任' }],
  ['LAT012-088', { title: '读书人不宜玩政治', keywords: '左舜生,政治,读书人' }],
  ['LAT012-089', { title: '文学写苦难大众', keywords: '文学,苦难,众生' }],
  ['LAT012-090', { title: '文学没有地区性', keywords: '文学,地区性,标准' }],
  ['LAT012-092', { title: '讨厌者的问题在自己', keywords: '讨厌,敌人,反省' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复、过短、上下文不足和偏掌故条目。',
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
