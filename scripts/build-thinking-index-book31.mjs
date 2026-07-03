import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const fictionGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('004.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, fictionGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('001.'));
const sourceDir = path.join(rootDir, sourceRoot, fictionGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '031.北京法源寺');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '031',
  title: '北京法源寺',
  slug: 'beijing-fayuansi',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从小说体文本中提取可独立检索的思想段落，重点保留历史判断、忠奸辨析、知识与行动、变法方法、舍生人格、法权黑暗和历史小说写法；纯剧情推进、场景描写和人物对白铺陈暂不收入。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权'];

const entries = [
  ['文化', '法源寺以悲怆串连历史', '002', 18, '法源寺,悯忠寺,历史,文化'],
  ['方法', '善恶要看行动', '003', 26, '善恶,行动,心迹,方法'],
  ['政治', '大人物错误都是大错', '003', 33, '唐太宗,战争,责任,政治'],
  ['知识', '古书科举不是知识出路', '003', 126, '知识分子,古书,科举,知识'],
  ['人格', '完成自我需要画龙点睛', '003', 162, '完成自我,变法,人格'],
  ['方法', '忠奸不是黑白立判', '004', 26, '忠奸,标准,复杂性,方法'],
  ['人格', '为信仰而死才有意义', '004', 28, '信仰,死亡,价值,人格'],
  ['文化', '忠有相对与绝对之分', '004', 41, '忠,传统,君臣,文化'],
  ['文化', '满洲人也是中国人', '004', 49, '满汉,中国人,民族,文化'],
  ['人格', '优秀个人要付冒犯费', '004', 92, '群体,个人,迫害,人格'],
  ['知识', '读旧书和西书才看见改革', '006', 3, '康有为,读书,西书,知识'],
  ['知识', '大著作为知识分子导航', '006', 6, '康有为,经世济民,知识分子,知识'],
  ['知识', '学问世界山外有山', '006', 7, '梁启超,学问,康有为,知识'],
  ['政治', '国耻激发知识分子反应', '006', 14, '甲午,公车上书,知识分子,政治'],
  ['人格', '贤者怕清议也会误国', '006', 23, '林则徐,士大夫,清议,人格'],
  ['政治', '西方根本强处是政治进步', '007', 36, '师夷,政治进步,变法,政治'],
  ['人格', '看见时代未必跟得上时代', '007', 38, '翁同龢,时代,能力,人格'],
  ['政治', '前一代维新会变成保守', '007', 47, '维新,保守,世代,政治'],
  ['政治', '祖宗之法守不住新世界', '007', 55, '祖宗之法,外交,变法,政治'],
  ['知识', '八股制度制造误国官僚', '007', 60, '八股,人才政策,制度,知识'],
  ['方法', '过渡组织兼具政党和学校', '008', 4, '强学会,组织,过渡,方法'],
  ['文化', '庙宇功德不能遮蔽百姓代价', '008', 17, '佛法,寺庙,百姓,文化'],
  ['文化', '佛门大道被形式遮蔽', '008', 19, '佛法,形式主义,文化'],
  ['人格', '志士以舍身进入行动', '008', 24, '舍身,行动,众生,人格'],
  ['知识', '思想深入人心胜过查禁', '008', 50, '康有为,新学伪经考,知识'],
  ['方法', '行动历练补足书本学问', '008', 56, '谭嗣同,书本,行动,方法'],
  ['文化', '以智为体以悲为用', '008', 110, '佛法,智慧,慈悲,文化'],
  ['方法', '教育是救国的扎根工作', '008', 112, '梁启超,教育,救国人才,方法'],
  ['方法', '救国不能只靠书生', '009', 4, '谭嗣同,书生,行动,方法'],
  ['人格', '知识分子不必自骄', '009', 24, '谭嗣同,知识分子,平等,人格'],
  ['文化', '夷狄观念看小中国', '009', 101, '夷狄,中华民族,中国人,文化'],
  ['方法', '机会难得就要试一试', '009', 120, '变法,机会,牺牲,方法'],
  ['政治', '急进者也会老成保守', '010', 20, '恭亲王,变法,保守,政治'],
  ['人格', '死事不是死君', '010', 53, '谭嗣同,死事,死君,人格'],
  ['政治', '皇帝名声会吸走目的', '010', 83, '光绪,死君,政治目的,政治'],
  ['政治', '一死证明改良路不通', '011', 7, '谭嗣同,改良,革命,政治'],
  ['人格', '知不可为而为之', '012', 6, '光绪,牺牲,知其不可,人格'],
  ['人格', '好汉做事好汉当', '012', 10, '谭嗣同,责任,义气,人格'],
  ['方法', '变法也讲准备和火候', '012', 11, '变法,准备,火候,方法'],
  ['方法', '复杂局面要先动起来', '012', 12, '变法,行动,局面,方法'],
  ['方法', '底价是让人民知道改革', '012', 20, '变法,宣传,改革,方法'],
  ['方法', '行动本身就是宣传手段', '012', 22, '变法,行动,宣传,方法'],
  ['人格', '用脑袋做牺牲品去宣传', '012', 34, '牺牲,宣传,生死,人格'],
  ['方法', '失败可以是成功前段', '012', 35, '失败,成功,先烈,方法'],
  ['政治', '不要城头挂人头', '012', 72, '革命,烈士,战士,政治'],
  ['人格', '为路线错误负责', '012', 78, '谭嗣同,路线,责任,人格'],
  ['政治', '用一死证明改良不可谈', '012', 80, '改良,革命,腐败政权,政治'],
  ['方法', '以败为成叫醒世人', '012', 96, '变法,失败,觉醒,方法'],
  ['文化', '入地狱救众生是世间法', '012', 102, '佛法,众生,地藏,文化'],
  ['政治', '改良之道随我以去', '012', 104, '改良,革命,仁学,政治'],
  ['人格', '人生只能选择一种角色', '013', 23, '人生选择,烈士,人格'],
  ['文化', '监牢累积苦难见证', '013', 32, '监牢,苦难,历史,文化'],
  ['法权', '监狱靠关押敲诈牟利', '013', 56, '刑部狱,监狱,敲诈,法权'],
  ['法权', '瀛台也是豪华监狱', '013', 59, '瀛台,光绪,监狱,法权'],
  ['法权', '死刑被孝敬和规矩支配', '013', 74, '死刑,刽子手,孝敬,法权'],
  ['人格', '临刑尊严来自表现', '013', 76, '谭嗣同,尊严,从容,人格'],
  ['政治', '失败终点也是胜利起点', '013', 77, '失败,群众,胜利,政治'],
  ['政治', '改良失败证明革命必要', '014', 4, '改良,革命,法源寺,政治'],
  ['法权', '皇帝也可不守法律杀人', '014', 28, '戊戌六君子,死刑,法律,法权'],
  ['政治', '排外暴力专杀自己人', '014', 81, '义和团,排外,暴力,政治'],
  ['政治', '低文化权势造成文化乱命', '014', 83, '西太后,义和团,文化乱命,政治'],
  ['政治', '谭死难有两种解释', '015', 5, '蔡锷,梁启超,谭嗣同,政治'],
  ['政治', '皇帝思想并未随民国退去', '015', 8, '袁世凯,帝制,民国,政治'],
  ['人格', '舍生兼具佛法和革命意义', '015', 20, '谭嗣同,舍生,革命,人格'],
  ['文化', '冲决网罗是思想底色', '015', 22, '仁学,冲决网罗,文化'],
  ['政治', '反帝思想难与死君并存', '015', 24, '谭嗣同,死事,死君,政治'],
  ['人格', '中国人不能没骨气', '015', 25, '蔡锷,袁世凯,人格,人格'],
  ['人格', '失败也不跑租界外国', '015', 26, '梁启超,蔡锷,骨气,人格'],
  ['政治', '皇帝没了皇帝思想还在', '015', 35, '袁世凯,皇帝思想,政治'],
  ['人格', '先知也会与时代错位', '015', 36, '康有为,时代,先知,人格'],
  ['政治', '民国之后仍有黑夜', '015', 56, '康有为,民国,政治预言,政治'],
  ['文化', '佛法把人推出寺庙', '016', 67, '佛法,救世,法源寺,文化'],
  ['政治', '改良在旧政权眼中也是造反', '016', 69, '改良,革命,西太后,政治'],
  ['政治', '一个觉悟者代表不了集团', '016', 74, '光绪,当政集团,既得利益,政治'],
  ['政治', '中国政体缺少变法弹性', '016', 75, '变法,当政集团,制度,政治'],
  ['方法', '改革不能跳过中间集团', '016', 76, '变法,中间集团,方法'],
  ['方法', '越级改革跳不成', '016', 77, '王安石,变法,中间集团,方法'],
  ['政治', '根烂政权不能谈改良', '016', 79, '政权,改良,革命,政治'],
  ['政治', '改良失败是革命起点', '016', 81, '改良,革命,失败,政治'],
  ['人格', '先知也会变成后卫', '016', 82, '康有为,先知,时代,人格'],
  ['人格', '求新求变需要服善之勇', '016', 92, '梁启超,求变,服善,人格'],
  ['方法', '生命只是接力跑的一段', '016', 94, '康有为,历史定位,接力,方法'],
  ['知识', '先知只有未来却活在现在', '016', 101, '康有为,先知,未来,知识'],
  ['文化', '法源寺保存血证碑痕', '017', 8, '法源寺,血证,历史,文化'],
  ['写作', '黑狱中构想小说', '018', 2, '北京法源寺,黑狱,小说,写作'],
  ['写作', '报纸和小说都为中国造前途', '018', 5, '求是报,小说,中国前途,写作'],
  ['写作', '以古庙为纵线史事为横剖', '018', 6, '历史小说,结构,思想小说,写作'],
  ['写作', '历史小说要写大丈夫', '018', 7, '历史小说,大丈夫,阳刚,写作'],
  ['写作', '历史考证是小说底子', '018', 8, '历史考证,小说,真实,写作'],
  ['写作', '塑造人物也不凭空捏造', '018', 9, '人物塑造,历史小说,写作'],
  ['写作', '写实真与艺术真可以破格', '018', 10, '写实真,艺术真,小说理论,写作'],
  ['写作', '写大人物振奋人心', '018', 12, '大人物,谭嗣同,历史小说,写作'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function sourceFileByPrefix(prefix) {
  const file = fs
    .readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt'))
    .find((name) => name.startsWith(`${prefix}.`));
  if (!file) {
    throw new Error(`Missing source file prefix: ${prefix}`);
  }
  return file;
}

function paragraphs(filePath) {
  const text = decoder.decode(fs.readFileSync(filePath));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const lines = [
    `# 《${bookInfo.title}》思想索引：${bookInfo.round}`,
    '',
    `- 状态：${bookInfo.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；小说体文本只收可独立检索的思想段落，不按情节摊派。',
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
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const counts = categoryCounts(records);
  const lines = [
    `# 《${bookInfo.title}》${bookInfo.round}说明`,
    '',
    `本轮从 ${sourceBookDir} 中提取 ${records.length} 条思想索引。`,
    '',
    '## 取舍说明',
    '',
    '- 收入：忠奸辨析、民族观、知识分子路径、变法方法、改良与革命、舍生人格、监牢与死刑、历史小说方法等可独立检索的段落。',
    '- 暂不收入：纯剧情推进、人物出场交代、场景描写、单纯史实串联和必须依赖上下文才成立的短对白。',
    '- 小说体段落仍按思想密度取舍；不按章节平均摊派。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-提取轮.csv',
    '- 思想索引-提取轮.json',
    '- 思想索引-提取轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const sourceCache = new Map();
const records = entries.map(([category, title, sourceKey, paragraphNumber, keywords], index) => {
  const sourceFile = sourceFileByPrefix(sourceKey);
  const sourcePath = path.join(sourceDir, sourceFile);
  if (!sourceCache.has(sourcePath)) {
    sourceCache.set(sourcePath, paragraphs(sourcePath));
  }
  const sourceParagraphs = sourceCache.get(sourcePath);
  const description = sourceParagraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  return {
    id: `LAT031-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title,
    description,
    source_file: sourceFile,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, sourcePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

for (const [index, record] of records.entries()) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unexpected category at row ${index + 1}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title}: ${records.length} records.`);
