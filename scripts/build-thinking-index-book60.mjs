import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const letterGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('008.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, letterGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('003.'));
const sourceDir = path.join(rootDir, sourceRoot, letterGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '060.李敖书翰集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '060',
  title: '李敖书翰集',
  slug: 'leeao-shuhanji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书翰集》的公开信、旧信、论讼信札和回信中提取思想索引。description 保留源文本原段落；目录、制作信息、收信人原话、纯私人问候、纯事务安排、案情流水和缺少独立判断的材料不进入本轮。书信中的出版自由、法律抗争、知识分子品格、文化基金、写作谋生、婚恋与灵肉判断等段落，按主旨归入原子分类。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['情爱', '001', 4, '婚姻自主', '婚姻,家长,旧习'],
  ['知识', '002', 6, '新朴学', '胡适,科学方法,乾嘉'],
  ['文化', '002', 9, '西化已成', '东西文化,西化,新思潮'],
  ['文化', '002', 11, '东方瓦解', '东方文明,儒家,人欲'],
  ['法权', '003', 136, '处分可解', '出版法,停止发行,登记'],
  ['法权', '003', 139, '违法赔偿', '宪法,民法,国家赔偿'],
  ['法权', '003', 141, '违宪诉讼', '出版自由,违宪,官司'],
  ['法权', '003', 143, '旨趣争讼', '出版登记,解释,官司'],
  ['方法', '003', 144, '留下记录', '历史记录,诉讼,方法'],
  ['人格', '003', 157, '御史嫉恶', '监察,嫉恶,惩贪'],
  ['写作', '003', 180, '儒林内史', '写作,高等教育,内外史'],
  ['知识', '003', 280, '出塔上街', '知识分子,象牙塔,现实'],
  ['写作', '005', 24, '被迫从良', '文星,查禁,写作'],
  ['人格', '005', 25, '正面作战', '化名,光明磊落,敌人'],
  ['方法', '005', 35, '逻辑界限', '逻辑,推论,读书'],
  ['知识', '006', 4, '佞佛幼稚', '青年,佞佛,思想成熟'],
  ['人格', '007', 7, '自由淑世', '自由主义,个人主义,改良'],
  ['方法', '007', 11, '公论无情', '理,情,公论'],
  ['方法', '007', 12, '情理分明', '情理,是非,中国人'],
  ['人格', '007', 14, '剃刀边缘', '理,面子,得罪'],
  ['人格', '008', 23, '澄清真面', '老好人,真面目,知人论世'],
  ['人格', '008', 29, '流言靡惑', '流言,朋友,信任'],
  ['文化', '009', 18, '文警误导', '文警,文化创建,青年'],
  ['方法', '009', 20, '沉默反击', '沉默,反击,同情'],
  ['写作', '009', 22, '正面著作', '思想与方法,著作,反击'],
  ['知识', '009', 23, '自由学人', '自由学人,天下,小人'],
  ['文化', '009', 25, '创建责任', '文化创建,责任,知识界'],
  ['政治', '009', 52, '放人作证', '出境,自由,政府'],
  ['方法', '009', 59, '朋友蒙蔽', '朋友,判断,真相'],
  ['方法', '009', 61, '理智待友', '朋友,学生,感情'],
  ['法权', '009', 66, '授权公平', '版权,授权,fair-play'],
  ['人格', '009', 71, '独立谋生', '独立文人,广告,谋生'],
  ['法权', '010', 6, '出版精神', '查禁,出版自由,精神'],
  ['法权', '010', 9, '出口自由', '书展,出版,言论自由'],
  ['法权', '010', 10, '演讲禁令', '台大,演说,禁令'],
  ['政治', '010', 11, '不合作主义', '知识分子,民主自由,非暴力'],
  ['人格', '010', 13, '少盲动', '青年,行动,思想'],
  ['人格', '011', 6, '拒做烂好人', '好人,恶人,批评'],
  ['人格', '012', 4, '好斗不屈', '好斗,真相,陷害'],
  ['法权', '013', 3, '删序反讽', '查禁,删序,感想'],
  ['人格', '013', 5, '坚忍武器', '坚忍,政权,等待'],
  ['知识', '015', 3, '会用书', '看书,用书,上当'],
  ['人格', '016', 4, '好人做事', '清望,做好事,敬重'],
  ['人格', '016', 6, '恶势逼退', '恶势力,好人,退志'],
  ['人格', '016', 7, '退缩证谣', '退缩,压力,谣言'],
  ['情爱', '018', 6, '慎独性材', '手淫,性心理学,慎独'],
  ['法权', '019', 21, '水法抗争', '自来水,公共福利,法律行动'],
  ['法权', '019', 28, '法治进步', '法治,正义,公务员'],
  ['法权', '019', 30, '认错起点', '公务员,认错,吏治'],
  ['法权', '020', 4, '民心士气', '查禁,罪名,民心士气'],
  ['情爱', '020', 18, '母子恋', '母子恋,婆媳,弗洛伊德'],
  ['情爱', '020', 19, '婆媳报复', '婆婆,报复,自由'],
  ['情爱', '020', 20, '望孙型', '婆婆,孙子,生产'],
  ['情爱', '020', 21, '孙子函数', '婆媳,重婚,孙子'],
  ['方法', '020', 22, '说清事实', '分析,事实,讽刺'],
  ['人格', '020', 31, '弃幻求真', '真幻,人生,智慧'],
  ['人格', '020', 32, '异乡虚无', '看破,价值,异乡人'],
  ['法权', '021', 3, '司法黑暗', '法院,法官,司法'],
  ['法权', '021', 4, '官逼民反', '法律,冤抑,暴戾'],
  ['法权', '021', 5, '合法途径', '知识人,合法途径,群众'],
  ['法权', '021', 7, '反戒讼', '戒讼,法治,认真'],
  ['写作', '022', 8, '扒粪新闻', '新闻,扒粪,记者'],
  ['方法', '023', 6, '正视人间', '现实,正视,虚玄'],
  ['人格', '023', 7, '知识耻辱', '知识人,小世界,御用文人'],
  ['法权', '024', 4, '刁民法治', '刁民,法治,认真'],
  ['写作', '024', 5, '刁民传', '刁民,写作,青史'],
  ['知识', '025', 7, '存在不玄', '存在主义,玄虚,学问'],
  ['写作', '026', 14, '文人戏子', '文人,戏子,文戏'],
  ['政治', '026', 22, '爱国换法', '爱国,知识分子,社会改良'],
  ['方法', '026', 23, '表演上下限', '知识分子,上限,下限'],
  ['政治', '026', 25, '爱国不改', '爱国方式,文星,基本态度'],
  ['方法', '027', 4, '基金方向', '文化基金,方向,章程'],
  ['知识', '027', 12, '学术分赃', '学术,奖金,学阀'],
  ['知识', '027', 14, '学术代理', '良法,学术代理商,围标'],
  ['知识', '027', 15, '私人拔尖', '科学,私人资助,拔尖'],
  ['知识', '027', 16, '重奖少数', '学术奖金,诺贝尔,鼓励'],
  ['知识', '027', 17, '重金精选', '讲座,大学,精选'],
  ['知识', '027', 19, '基金深耕', '文化基金,出版,学校'],
  ['方法', '028', 31, '时间观念', '出版年月日,历史,新闻'],
  ['写作', '029', 5, '卖文活', '卖文,环境,文字'],
  ['法权', '029', 6, '文星接管', '文星,查禁,接管'],
  ['写作', '029', 7, '出版单行道', '文化出版,出路,时代'],
  ['写作', '029', 9, '低调出版', '杂志,书店,原则'],
  ['文化', '029', 28, '白发文化', '文化,捐助,功德'],
  ['知识', '030', 4, '抄袭铁案', '台大,抄袭,铁证'],
  ['人格', '032', 4, '非个人奋斗', '知识分子,婚变,恶势力'],
  ['情爱', '032', 5, '婚事当事', '婚姻,家长,当事人'],
  ['知识', '033', 3, '坦率历史', '古装片,历史,坦率'],
  ['知识', '033', 7, '史实校验', '电影,史实,年代'],
  ['知识', '033', 20, '古装全套', '电影,时代背景,服饰'],
  ['文化', '033', 30, '剑道精神', '剑,哲理,越绝书'],
  ['人格', '034', 10, '没有悲观', '政权,忍耐,胜利'],
  ['文化', '034', 20, '党政得失', '文化事业,党政,群众'],
  ['法权', '034', 26, '侦听反击', '软禁,侦听器,人权'],
  ['写作', '035', 6, '资料维生', '资料,职业,谋生'],
  ['人格', '035', 8, '不吃饭', '收买,气派,独立'],
  ['写作', '035', 25, '文人定价', '文人,资料,稿费'],
  ['法权', '037', 2, '跟监定义', '软禁,跟监,警总'],
  ['法权', '037', 20, '非法查扣', '查扣,国民党,书'],
  ['人格', '037', 23, '此账不完', '坚忍,乱世,抗争'],
  ['法权', '037', 42, '扣单外送', '非法查扣,联合国,纽约时报'],
  ['法权', '037', 43, '处理方法', '查扣,警总,知过能改'],
  ['法权', '037', 44, '记录横行', '横行,记录,散布'],
  ['方法', '037', 62, '断讯反制', '临检,报复,消息来源'],
  ['人格', '037', 63, '青年软弱', '青年,软弱,教育'],
  ['法权', '037', 65, '无和可解', '查禁,软禁,国民党'],
  ['文化', '038', 4, '歪曲死人', '殷海光,死人,斯大林'],
  ['知识', '038', 6, '思想懦种', '思想工作者,懦弱,势利'],
  ['方法', '038', 18, '思想戒惧', '思想工作,学问,工具'],
  ['人格', '038', 20, '创造快乐', '名利,创造,快乐'],
  ['法权', '040', 4, '半囚状态', '看管,离境,人权'],
  ['知识', '042', 4, '教育监狱', '教育,考试,学校'],
  ['情爱', '042', 8, '琼瑶恶果', '琼瑶,青年,女作家'],
  ['情爱', '042', 9, '灵肉分野', '女人,灵肉,女作家'],
  ['情爱', '042', 10, '灵肉失衡', '女人,灵肉,悲哀'],
  ['情爱', '044', 5, '爱情寻乐', '爱情,快乐,痛苦'],
];

function normalize(text) {
  return String(text ?? '').replace(/\r/g, '').trim();
}

function normalizeForCompare(text) {
  return String(text ?? '').replace(/\s+/g, '').trim();
}

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
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
  ];

  for (const item of categoryCounts(payload.records)) {
    lines.push(`## ${item.category}（${item.count}）`, '');
    for (const record of payload.records.filter((entry) => entry.category === item.category)) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT060-')) continue;
    map.set(normalizeForCompare(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);

const paragraphCache = new Map();
function sourceParagraphs(key) {
  const fileName = filesByKey.get(key);
  if (!fileName) {
    throw new Error(`Missing source file for key ${key}`);
  }
  if (!paragraphCache.has(fileName)) {
    const text = decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
    paragraphCache.set(
      fileName,
      text
        .replace(/\r/g, '')
        .split(/\n\s*\n+/)
        .map(normalize)
        .filter(Boolean),
    );
  }
  return { fileName, paragraphs: paragraphCache.get(fileName) };
}

const previous = previousDescriptions();
const skipped = [];
const seenCurrent = new Map();
const keptCandidates = [];

for (const [category, key, paragraphNumber, title, keywords] of candidateEntries) {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${key} P${paragraphNumber}`);
  }
  const { fileName, paragraphs } = sourceParagraphs(key);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${key} P${paragraphNumber}`);
  }
  const normalized = normalizeForCompare(description);
  if (previous.has(normalized)) {
    skipped.push({
      key,
      paragraphNumber,
      title,
      duplicateOf: previous.get(normalized),
    });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({
      key,
      paragraphNumber,
      title,
      duplicateOf: seenCurrent.get(normalized),
    });
    continue;
  }
  keptCandidates.push({
    category,
    key,
    paragraphNumber,
    title,
    keywords,
    fileName,
    description,
  });
  seenCurrent.set(normalized, `${key} P${paragraphNumber}`);
}

const records = keptCandidates.map((candidate, index) => ({
  id: `LAT060-${String(index + 1).padStart(3, '0')}`,
  book: book.title,
  round: book.round,
  status: book.status,
  category: candidate.category,
  title: candidate.title,
  description: candidate.description,
  source_file: candidate.fileName,
  source_paragraph: candidate.paragraphNumber,
  source_path: path.relative(rootDir, path.join(sourceDir, candidate.fileName)).replaceAll(path.sep, '/'),
  keywords: candidate.keywords,
}));

for (const record of records) {
  const sourceKey = record.source_file.slice(0, 3);
  const { paragraphs } = sourceParagraphs(sourceKey);
  if (paragraphs[record.source_paragraph - 1] !== record.description) {
    throw new Error(`Description mismatch for ${record.id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    record_count: records.length,
    candidate_count: candidateEntries.length,
    skipped_duplicate_count: skipped.length,
  },
  taxonomy,
  records,
  skipped_duplicates: skipped,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);

const noteLines = [
  '# 《李敖书翰集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 只提取能够独立呈现李敖判断、方法、价值或知识工作的原文段落。',
  '- 单纯问候、事务安排、目录、制作信息、外部来信、外部引文、案情流水和缺少独立判断的材料不进入索引。',
  '- 书信里的出版查禁、诉讼策略、软禁跟监和权利救济按“法权”归类；党外路线、政府权力和政治行动按“政治”归类；学术、文化基金、历史考证和知识分子判断按“知识”归类。',
  '- 情爱条目只收婚恋、婆媳、灵肉、爱情痛苦和性资料等主旨明确的段落，不把私人应酬或单句玩笑扩展为思想条目。',
  '- description 字段保持源文本原段落，不做摘要和改写。',
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

if (skipped.length) {
  noteLines.push('## 跳过重复', '');
  for (const item of skipped) {
    noteLines.push(`- ${item.key} P${item.paragraphNumber} ${item.title}：重复于 ${item.duplicateOf}`);
  }
  noteLines.push('');
}

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built 060.李敖书翰集: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
