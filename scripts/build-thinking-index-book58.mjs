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
  .find((name) => name.startsWith('001.'));
const sourceDir = path.join(rootDir, sourceRoot, letterGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '058.李敖情书集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '058',
  title: '李敖情书集',
  slug: 'leeao-qingshuji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖情书集》的新序、原序及各组书信中提取思想索引。description 保留源文本原段落；目录、制作信息、日期署名、单纯问候、私密调情、纯抒情片段、重复情话和缺少独立判断的生活流水不进入本轮。情爱材料只收能呈现爱情观、欲望观、灵肉关系、亲密关系技术或男女关系判断的段落。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['法权', '001', 2, '情书被抢', '情书,出版,查禁'],
  ['情爱', '001', 3, '纸上罗曼斯', '情书,纸上罗曼斯,肉麻'],
  ['情爱', '001', 6, '爱情快乐主义', '爱情,快乐主义,太上忘情'],
  ['写作', '002', 2, '侠骨柔情', '柔情,情书,爱情文字'],
  ['情爱', '002', 5, '现代爱情', '现代化,爱情,陈旧'],
  ['文化', '002', 7, '爱情传统', '中国传统,爱情,人格'],
  ['情爱', '002', 8, '反病态爱情', '情杀,病态爱情,洒脱'],
  ['情爱', '002', 9, '爱情现代化', '现代化,罗曼蒂克,文化土壤'],
  ['情爱', '002', 12, '爱情不盲', '爱情,盲目,张飞'],
  ['情爱', '002', 13, '睁眼恋爱', '恋爱,优点缺点,希望'],
  ['情爱', '002', 18, '爱情勿痛', '爱情,痛苦,快乐'],
  ['情爱', '002', 29, '灵肉误区', '灵魂,肉体,唯灵论'],
  ['情爱', '002', 33, '灵肉平等', '灵肉,肉体,爱情'],
  ['情爱', '002', 35, '感情会变', '感情变化,来去自如,爱情'],
  ['情爱', '002', 42, '爱情技巧', '技巧,体贴,男女关系'],
  ['情爱', '002', 43, '不下坡', '分手,余味,爱情技术'],
  ['情爱', '002', 45, '爱情唯美', '唯美,女人,真善美'],
  ['情爱', '002', 46, '唯美关系', '男女关系,唯美,婚恋'],
  ['方法', '002', 47, '信念变化', '心路历程,信念,阅读'],
  ['人格', '004', 3, '犯颜规劝', '批评,真诚,规劝'],
  ['人格', '004', 6, '虚无任性', '存在主义,虚无主义,任性'],
  ['人格', '004', 7, '叛道孤立', '传统,叛道者,孤立'],
  ['情爱', '005', 3, '不永远爱', '爱情,偶尔,坦白'],
  ['情爱', '005', 5, '漂亮会衰', '肉体,漂亮,衰老'],
  ['情爱', '005', 6, '美丽性灵', '美丽,性灵,追求'],
  ['情爱', '005', 9, '拒绝可能', '追求,拒绝,中国女孩子'],
  ['人格', '005', 10, '不属任何人', '归属,辩白,热情'],
  ['情爱', '006', 54, '灵光相照', '灵光,生命意义,个性'],
  ['情爱', '006', 56, '不只漂亮', '漂亮,灵光,写作'],
  ['情爱', '006', 57, '亲密异端', 'playmate,异端,遗世独立'],
  ['法权', '006', 260, '出版法矛盾', '出版法,立法院,胡秋原'],
  ['写作', '006', 269, '长夜写作', '写作,稿费,医师法'],
  ['法权', '006', 318, '官司不和', '官司,和谈,出庭'],
  ['写作', '006', 712, '文章气势', '文章,陈独秀,胡适,鲁迅'],
  ['情爱', '006', 893, '现实归宿', '现实,浪漫文人,幸福'],
  ['人格', '006', 894, '承担苦果', '选择,牢狱,反抗'],
  ['人格', '006', 897, '人格分裂', '人格,善意,人生'],
  ['人格', '006', 1004, '困扰定力', '文星,困扰,定力'],
  ['法权', '006', 1005, '自由上限', '言论自由,剃刀边缘,文星'],
  ['写作', '006', 1006, '经世致用', '专书,经世致用,现实'],
  ['法权', '006', 1011, '初次禁书', '查禁,文星,出版品'],
  ['法权', '006', 1013, '断人生路', '宪法,写文章,生路'],
  ['文化', '006', 1020, '文化武器', '中国文化,自由民主,武器'],
  ['法权', '006', 1021, '坐牢恶名', '坐牢,迫害,恶名'],
  ['法权', '006', 1022, '拒登广告', '文星,中央日报,言论攻击'],
  ['人格', '006', 1040, '孤独避祸', '文字狱,孤独,写作读书'],
  ['法权', '006', 1050, '官司胜诉', '诽谤,官司,赔偿'],
  ['方法', '006', 1058, '方法表达', '文学革命,方法,表达法'],
  ['写作', '006', 1059, '分家技术', '文星,出版,技术'],
  ['人格', '007', 3, '独力生活', '文星,外压力,独立生活'],
  ['写作', '007', 4, '自印生路', '自印,著作,生计'],
  ['法权', '007', 5, '有限吃饭', '查禁,当权者,生计'],
  ['人格', '007', 6, '人格活路', '自己出书,人格,选择'],
  ['法权', '007', 7, '坐牢英雄', '当权者,坐牢,英雄'],
  ['人格', '007', 9, '极限忍耐', '忍耐,绝路,失败者'],
  ['法权', '007', 10, '牢狱暴力', '坐牢,暴力,囚犯'],
  ['人格', '007', 15, '悲剧人生', '悲剧,人生,隔绝'],
  ['人格', '007', 17, '笑演悲剧', '悲剧,观点,会笑'],
  ['人格', '009', 24, '层面误解', '了解,论断,人生'],
  ['人格', '009', 31, '不做奴才', '征服,男人,奴才'],
  ['情爱', '009', 41, '勿耗生命', '女人,折磨,生命'],
  ['情爱', '009', 42, '反十八世纪恋爱', '性欲,及时行乐,恋爱'],
  ['人格', '010', 5, '社会不公', '不公平,痛苦,拯救'],
  ['人格', '010', 6, '活在今天', '过去,未来,奋斗'],
  ['人格', '010', 8, '把握眼前', '人生,燃烧,现在'],
  ['法权', '011', 14, '查扣副本', '人间世,查扣,文章'],
  ['法权', '011', 23, '见我即拘', '法院,妨害公务,拘票'],
  ['情爱', '011', 59, '深爱淳化', '深爱,淳化,灵魂'],
  ['情爱', '011', 79, '灵肉自战', '灵肉,欲情,保护'],
  ['情爱', '011', 91, '爱重于自由', '自由,爱,雪莱'],
  ['情爱', '011', 130, '纯爱约束', '纯爱,圣洁,约束'],
  ['写作', '011', 165, '不写新诗', '现代诗,小说,嘲笑'],
  ['知识', '011', 169, '剃刀边缘', '知识分子,写文章,榜样'],
  ['情爱', '011', 172, '灵肉一致', '情欲,爱恨,灵肉'],
  ['情爱', '011', 199, '写信连锁', '写信,亲密,连锁'],
  ['方法', '011', 231, '文章鉴定', '文章,鉴定,检验'],
  ['知识', '011', 232, '自由思想家', '殷海光,自由思想家,死亡'],
  ['知识', '011', 250, '考试机器', '考试,教育,性灵'],
  ['人格', '011', 266, '叛逆血液', '叛逆,环境,静观'],
  ['法权', '011', 277, '显示颜色', '妨害公务,法院,起诉'],
  ['法权', '011', 291, '自由新闻界', '新闻界,查禁,极权'],
  ['人格', '011', 296, '宁小气', '女人,厚颜,小气'],
  ['法权', '011', 334, '法院扰民', '法院,妨害公务,才吏'],
  ['方法', '011', 336, '剪后悟性', '电检,电影,悟性'],
  ['写作', '011', 366, '以文贾祸', '专栏,写作,以文贾祸'],
  ['政治', '011', 379, '制造敌人', '政府,共产党,红帽子'],
  ['法权', '011', 380, '官僚扰民', '书籍,免税,官僚'],
  ['人格', '011', 384, '理智情绪', '理智,唯美主义,情绪'],
  ['方法', '011', 394, '删文可惜', '胡适,文存,删文'],
  ['人格', '012', 6, '大隐于牢', '牢狱,遁世,隐'],
  ['知识', '012', 11, '溺儒冠', '知识分子,刘邦,儒生'],
  ['法权', '012', 46, '接见制度', '监狱,接见,自由'],
  ['法权', '012', 48, '用法深刻', '酷吏,用法,公务员'],
  ['政治', '012', 50, '清廉坏蛋', '清廉,权力,法治'],
  ['法权', '012', 65, '监狱医疗', '监狱,医疗,犯人'],
  ['法权', '012', 66, '病舍特权', '病舍,特权,犯人'],
  ['法权', '012', 67, '送药违法', '羁押法,药物,苛政'],
  ['人格', '012', 79, '稿费用途', '稿费,作风,李敖评论'],
  ['法权', '012', 88, '不怕禁书', '禁书,畅销,千秋评论'],
  ['人格', '013', 11, '独斗德国人', '千秋,查扣,独立'],
  ['人格', '013', 15, '临凶若吉', '下狱,视死如归,达观'],
  ['政治', '013', 16, '与子偕小', '国民党,人权斗士,台湾'],
  ['人格', '013', 17, '不丧志', '受难者,志士仁人,行道'],
  ['人格', '013', 19, '废墟小希望', '废墟,希望,男子汉'],
  ['人格', '013', 20, '成全别人', '古仁人,成全,从容'],
  ['政治', '013', 29, '扫黑烟幕', '江南案,国民党,扫黑'],
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
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
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
    if (record.id?.startsWith('LAT058-')) continue;
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
  id: `LAT058-${String(index + 1).padStart(3, '0')}`,
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
  const { paragraphs } = sourceParagraphs(record.source_file.slice(0, 3));
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
  '# 《李敖情书集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 只提取能独立呈现李敖判断、方法、价值或情爱观的原文段落。',
  '- 情书中的纯问候、纯思念、纯调情、日期署名、制作信息、长篇外部引文和缺少独立判断的生活流水不进入索引。',
  '- 情爱类重点保留现代爱情、灵肉关系、爱情技巧、感情变化、亲密关系伦理和关系自处。',
  '- 书信中涉及出版查禁、言论自由、法院、牢狱、写作方法、知识分子和人格自处的段落，按主旨归入对应原子分类。',
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
  `Built 058.李敖情书集: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
