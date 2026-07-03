import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '031.北京法源寺');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT031-005', '“完成自我”段落过短，须依赖谢枋得与康有为对话上下文，校对轮暂不保留。'],
  ['LAT031-014', '公车上书段落以历史铺陈为主，知识分子与制度反应已由康有为读书、八股制度等条承载。'],
  ['LAT031-017', '翁同龢“看见时代却跟不上时代”与后文“先知错位”“先知变后卫”重叠，且偏人物评价。'],
  ['LAT031-021', '强学会作为过渡组织的判断较短，救国组织与教育扎根已由后文教育条承载。'],
  ['LAT031-025', '思想查禁段落偏康有为影响史，独立思想密度弱于前后学问与行动条。'],
  ['LAT031-033', '恭亲王急进转保守偏历史转折叙事，已由世代维新转保守和先知错位条承载。'],
  ['LAT031-035', '皇帝名声吸走目的过短，死事与死君问题已由前后两条承载。'],
  ['LAT031-036', '“一死证明改良路不通”与第十二章、第十五章多条路线判断重复，保留更完整的责任与路线段落。'],
  ['LAT031-048', '“以败为成叫醒世人”与“失败可以是成功前段”重复，保留论述更完整的一条。'],
  ['LAT031-050', '绝笔中“改良之道随我以去”与路线负责、改良不可谈两条重复，且偏书信结语。'],
  ['LAT031-056', '临刑尊严段落过短，人物气概已由后文法场与舍生条承载。'],
  ['LAT031-067', '“不能没骨气”是短对白，独立索引价值弱于后文不跑租界外国条。'],
  ['LAT031-069', '皇帝思想未退与前一条帝制活动判断重复，校对轮保留更完整的一条。'],
  ['LAT031-080', '先知变后卫与先知时代错位、只有未来却活在现在重复。'],
  ['LAT031-090', '人物不凭空捏造与历史考证是小说底子、写实真与艺术真两条重复。'],
  ['LAT031-084', '尾声法源寺血证碑痕偏抒情收束，前文法源寺历史串连条已承载象征意义。'],
]);

const overrides = new Map([
  ['LAT031-001', { title: '法源寺不是普通寺庙', keywords: '法源寺,悯忠寺,悲怆,文化' }],
  ['LAT031-002', { title: '判断善恶要看行为', keywords: '善恶,行动,心迹,方法' }],
  ['LAT031-003', { title: '权力越大错误越大', keywords: '唐太宗,战争,权力,政治' }],
  ['LAT031-004', { title: '旧学科举不是知识出路', keywords: '知识分子,古书,科举,知识' }],
  ['LAT031-006', { title: '忠奸标准不是黑白两分', keywords: '忠奸,标准,复杂性,方法' }],
  ['LAT031-007', { title: '信仰使死亡有意义', keywords: '信仰,死亡,价值,人格' }],
  ['LAT031-008', { title: '忠有相对也有绝对', keywords: '忠,传统,君臣,文化' }],
  ['LAT031-009', { title: '满汉问题也是内部问题', keywords: '满汉,中国人,民族,文化' }],
  ['LAT031-010', { title: '优秀个人会被群体索价', keywords: '群体,个人,迫害,人格' }],
  ['LAT031-011', { title: '改革眼光来自旧书和西书', keywords: '康有为,读书,西书,知识' }],
  ['LAT031-012', { title: '大著作给知识分子导航', keywords: '康有为,经世济民,知识分子,知识' }],
  ['LAT031-013', { title: '学问世界还有山外山', keywords: '梁启超,学问,康有为,知识' }],
  ['LAT031-015', { title: '怕清议会使贤者误国', keywords: '林则徐,士大夫,清议,人格' }],
  ['LAT031-016', { title: '西方强处在政治进步', keywords: '师夷,政治进步,变法,政治' }],
  ['LAT031-018', { title: '前代维新会变后代保守', keywords: '维新,保守,世代,政治' }],
  ['LAT031-019', { title: '祖宗之法守不住祖宗之地', keywords: '祖宗之法,外交,变法,政治' }],
  ['LAT031-020', { title: '八股制度生产误国官僚', keywords: '八股,人才政策,制度,知识' }],
  ['LAT031-022', { title: '庙宇功德不能抵消百姓代价', keywords: '佛法,寺庙,百姓,文化' }],
  ['LAT031-023', { title: '佛法不在形式功夫', keywords: '佛法,形式主义,文化' }],
  ['LAT031-024', { title: '一针见血还要一刀见血', keywords: '舍身,行动,众生,人格' }],
  ['LAT031-026', { title: '行动历练补足书本学问', keywords: '谭嗣同,书本,行动,方法' }],
  ['LAT031-027', { title: '佛法以智为体以悲为用', keywords: '佛法,智慧,慈悲,文化' }],
  ['LAT031-028', { title: '教育是救国扎根', keywords: '梁启超,教育,救国人才,方法' }],
  ['LAT031-029', { title: '救国不能只靠书生', keywords: '谭嗣同,书生,行动,方法' }],
  ['LAT031-030', { title: '知识分子不该自骄', keywords: '谭嗣同,知识分子,平等,人格' }],
  ['LAT031-031', { title: '夷狄观念看小中国', keywords: '夷狄,中华民族,中国人,文化' }],
  ['LAT031-032', { title: '千载难逢就要试', keywords: '变法,机会,牺牲,方法' }],
  ['LAT031-034', { title: '死事不是死君', keywords: '谭嗣同,死事,死君,人格' }],
  ['LAT031-037', { title: '知不可为仍可为之', keywords: '光绪,牺牲,知其不可,人格' }],
  ['LAT031-038', { title: '好汉做事好汉当', keywords: '谭嗣同,责任,义气,人格' }],
  ['LAT031-039', { title: '变法要有准备和火候', keywords: '变法,准备,火候,方法' }],
  ['LAT031-040', { title: '复杂局面先让它动', keywords: '变法,行动,局面,方法' }],
  ['LAT031-041', { title: '底价是让人民知道改革', keywords: '变法,宣传,改革,方法' }],
  ['LAT031-042', { title: '变法行动也是宣传', keywords: '变法,行动,宣传,方法' }],
  ['LAT031-043', { title: '用脑袋做牺牲品宣传', keywords: '牺牲,宣传,生死,人格' }],
  ['LAT031-044', { title: '失败可以成为成功前段', keywords: '失败,成功,先烈,方法' }],
  ['LAT031-045', { title: '不要城头挂人头', keywords: '革命,烈士,战士,政治' }],
  ['LAT031-046', { title: '路线错误要由自己负责', keywords: '谭嗣同,路线,责任,人格' }],
  ['LAT031-047', { title: '腐败政权不能谈改良', keywords: '改良,革命,腐败政权,政治' }],
  ['LAT031-049', { title: '入地狱才是世间法', keywords: '佛法,众生,地藏,文化' }],
  ['LAT031-051', { title: '人生只能选择一种角色', keywords: '人生选择,烈士,人格' }],
  ['LAT031-052', { title: '监牢累积苦难见证', keywords: '监牢,苦难,历史,文化' }],
  ['LAT031-053', { title: '监狱靠关押敲诈牟利', keywords: '刑部狱,监狱,敲诈,法权' }],
  ['LAT031-054', { title: '瀛台也是豪华监狱', keywords: '瀛台,光绪,监狱,法权' }],
  ['LAT031-055', { title: '死刑被孝敬和规矩支配', keywords: '死刑,刽子手,孝敬,法权' }],
  ['LAT031-057', { title: '失败终点也是胜利起点', keywords: '失败,群众,胜利,政治' }],
  ['LAT031-058', { title: '改良失败证明革命必要', keywords: '改良,革命,法源寺,政治' }],
  ['LAT031-059', { title: '皇帝也可不守法杀人', keywords: '戊戌六君子,死刑,法律,法权' }],
  ['LAT031-060', { title: '排外暴力最会杀自己人', keywords: '义和团,排外,暴力,政治' }],
  ['LAT031-061', { title: '低文化权势制造乱命', keywords: '西太后,义和团,文化乱命,政治' }],
  ['LAT031-062', { title: '谭嗣同之死有两种解释', keywords: '蔡锷,梁启超,谭嗣同,政治' }],
  ['LAT031-063', { title: '民国未退皇帝思想', keywords: '袁世凯,帝制,民国,政治' }],
  ['LAT031-064', { title: '舍生兼具佛法和革命意义', keywords: '谭嗣同,舍生,革命,人格' }],
  ['LAT031-065', { title: '冲决网罗是思想底色', keywords: '仁学,冲决网罗,文化' }],
  ['LAT031-066', { title: '反帝思想难与死君并存', keywords: '谭嗣同,死事,死君,政治' }],
  ['LAT031-068', { title: '失败也不跑租界外国', keywords: '梁启超,蔡锷,骨气,人格' }],
  ['LAT031-070', { title: '先知也会与时代错位', keywords: '康有为,时代,先知,人格' }],
  ['LAT031-071', { title: '民国以后仍有黑夜', keywords: '康有为,民国,政治预言,政治' }],
  ['LAT031-072', { title: '佛法把人推出寺庙', keywords: '佛法,救世,法源寺,文化' }],
  ['LAT031-073', { title: '改良在旧政权眼中也是造反', keywords: '改良,革命,西太后,政治' }],
  ['LAT031-074', { title: '一个觉悟者代表不了集团', keywords: '光绪,当政集团,既得利益,政治' }],
  ['LAT031-075', { title: '中国政体缺少变法弹性', keywords: '变法,当政集团,制度,政治' }],
  ['LAT031-076', { title: '改革不能跳过中间集团', keywords: '变法,中间集团,方法' }],
  ['LAT031-077', { title: '越级改革跳不成', keywords: '王安石,变法,中间集团,方法' }],
  ['LAT031-078', { title: '根烂政权不能谈改良', keywords: '政权,改良,革命,政治' }],
  ['LAT031-079', { title: '改良失败是革命起点', keywords: '改良,革命,失败,政治' }],
  ['LAT031-081', { title: '求新求变需要服善之勇', keywords: '梁启超,求变,服善,人格' }],
  ['LAT031-082', { title: '生命只是接力跑的一段', keywords: '康有为,历史定位,接力,方法' }],
  ['LAT031-083', { title: '先知只有未来却活在现在', keywords: '康有为,先知,未来,知识' }],
  ['LAT031-085', { title: '黑狱中构想小说', keywords: '北京法源寺,黑狱,小说,写作' }],
  ['LAT031-086', { title: '小说也为中国造前途', keywords: '求是报,小说,中国前途,写作' }],
  ['LAT031-087', { title: '古庙为纵线史事为横剖', keywords: '历史小说,结构,思想小说,写作' }],
  ['LAT031-088', { title: '历史小说要写大丈夫', keywords: '历史小说,大丈夫,阳刚,写作' }],
  ['LAT031-089', { title: '历史考证是小说底子', keywords: '历史考证,小说,真实,写作' }],
  ['LAT031-091', { title: '写实真与艺术真可以破格', keywords: '写实真,艺术真,小说理论,写作' }],
  ['LAT031-092', { title: '写大人物振奋人心', keywords: '大人物,谭嗣同,历史小说,写作' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复承载、短对白、偏剧情过渡和抒情收束段落。',
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
    '本轮由提取轮进入校对轮，删除重复承载、短对白、偏剧情过渡和抒情收束段落，保留忠奸辨析、知识与行动、变法方法、改良与革命、舍生人格、法权黑暗和历史小说写法等核心索引；description 仍逐条保留源文本原文段落。',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 76) {
  throw new Error(`Expected 76 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT031-${String(index + 1).padStart(3, '0')}`,
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
