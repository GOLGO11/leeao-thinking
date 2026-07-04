import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const diaryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('006.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, diaryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('009.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '051.李敖随写录前集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '051',
  title: '李敖随写录前集',
  slug: 'leeao-suixielu-qianji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖随写录前集》一百八十九则随写中提取思想索引。description 保留源文本原段落；目录、群制作者尾注、纯新闻长引、纯人事流水、资料堆列、缺少李敖判断的段落不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['写作', '001', 2, '大书主力', '大书,写作主力,随写'],
  ['文化', '002', 2, '风景加工', '风景区,人工加工,艺术水准'],
  ['方法', '002', 3, '过滤难看', '观看,过滤,审美方法'],
  ['政治', '002', 10, '购物德政', '观光,民进党,地方治理'],
  ['方法', '006', 4, '纸上观察', '观察,纸上作业,细节'],
  ['知识', '010', 3, '古董读书', '古董,古书,知识'],
  ['政治', '015', 3, '反共回归', '列宁,反共,理性'],
  ['文化', '016', 4, '书法真丑', '书法家,台湾,文化批评'],
  ['法权', '017', 8, '法律戏', '台湾审判,法律漏洞,国民党'],
  ['人格', '019', 2, '停刊达观', '求是报,停刊,达观'],
  ['法权', '021', 2, '智慧产权', '智慧财产权,公义,知识传布'],
  ['法权', '021', 3, '百科义举', '大英百科全书,盗印,公义'],
  ['法权', '026', 3, '禁书手法', '禁书,胶带,检查'],
  ['政治', '027', 3, '演习家家酒', '军事演习,蒋家,政治讽刺'],
  ['人格', '028', 3, '胆子来源', '胡志伟,胆子,自我恐惧'],
  ['情爱', '028', 4, '婚姻稳定', '离婚,婚姻,女性'],
  ['政治', '030', 2, '坏人国家', '国家,坏人,权力'],
  ['知识', '030', 3, '国家幻象', '国家观念,马基维利,幻象'],
  ['写作', '031', 4, '小说思想', '北京法源寺,高阳,思想'],
  ['政治', '032', 2, '军备作伪', '国军,军备,自欺'],
  ['文化', '033', 3, '海与格局', '台湾,胸襟,小家子气'],
  ['政治', '034', 9, '政治怪招', '台湾政治,民进党,常识'],
  ['人格', '035', 3, '官迷教授', '教授,官迷,人格'],
  ['写作', '036', 3, '办报精神', '办报,牺牲,精神'],
  ['法权', '038', 5, '人权悬格', '人权,宪法,温饱'],
  ['人格', '042', 4, '奴才等级', '宋美龄,送行,奴才'],
  ['人格', '046', 13, '浩然真性', '陈毅,文革,真性情'],
  ['政治', '047', 3, '作弄反对党', '国民党,民进党,政治作弄'],
  ['政治', '049', 4, '敌人见识', '朱高正,民进党,见识'],
  ['政治', '051', 3, '政治水准', '台湾政治,朱高正,民进党'],
  ['知识', '055', 4, '约翰逊误植', '约翰逊,联合报,知识错误'],
  ['人格', '056', 6, '肉麻无耻', '梁肃戎,宋美龄,人格批评'],
  ['写作', '057', 5, '理论实务', '著作,理论,中国问题'],
  ['知识', '058', 3, '三民分量', '三民主义,通识教育,曲学阿世'],
  ['人格', '058', 5, '感性表演', '李远哲,恩师,表演'],
  ['政治', '061', 3, '党外中毒', '党外,国民党,台湾问题'],
  ['人格', '062', 2, '长寿伤身', '张学良,悲剧英雄,真话'],
  ['知识', '063', 5, '知识隔世', '知识,娱乐,交游'],
  ['法权', '064', 6, '假解严', '电影查禁,解严,钳制'],
  ['人格', '066', 2, '官迷不已', '官迷,精神错乱,权力'],
  ['写作', '067', 5, '作品无力', '写作,群众,南非'],
  ['政治', '068', 7, '以德报怨', '蒋介石,日本,政治批评'],
  ['政治', '069', 4, '口水党棍', '朱高正,中央日报,党棍'],
  ['法权', '071', 19, '亮出法官', '冤狱,法官,司法责任'],
  ['政治', '072', 2, '小朝廷', '中华民国,阅兵,蒋家'],
  ['文化', '074', 2, '故宫腐化', '故宫博物院,秦孝仪,文化机构'],
  ['政治', '075', 3, '市侩媒体', '自由时报,林荣三,媒体'],
  ['知识', '076', 9, '瑞典新观', '瑞典社会主义,书刊,新观点'],
  ['法权', '077', 2, '文网之密', '电视消音,文网,国民党'],
  ['人格', '078', 5, '政治懦夫', '政治秀,反阅兵,懦夫'],
  ['政治', '079', 6, '校园遮伞', '政治运动,校园,学术'],
  ['政治', '080', 8, '憋尿之战', '人权,政治抗议,憋尿'],
  ['政治', '082', 2, '内婚集团', '国民党,官僚,内婚'],
  ['文化', '091', 4, '妖妄进步', '人骨念珠,高等知识分子,妖妄'],
  ['情爱', '091', 7, '通奸道理', '婚外情,离婚,道德'],
  ['人格', '091', 10, '真实热情', '自由主义,道德形象,真实'],
  ['政治', '092', 2, '年龄看党', '国民党,人才,老人当政'],
  ['人格', '093', 3, '坦荡狂想', '李敖,游戏人间,坦荡'],
  ['人格', '094', 3, '政治情绪', '政治,无力感,稳定'],
  ['法权', '096', 12, '黑牢余悸', '刘家顺,政治,黑牢'],
  ['方法', '099', 2, '快乐报复', '黑暗环境,纪律,行动'],
  ['方法', '099', 3, '永保斗志', '斗志,耐心,揭发'],
  ['知识', '100', 5, '抄袭判断', '李镇源,林永丰,抄袭'],
  ['政治', '101', 3, '政治家大道', '政治家,错误路线,大道'],
  ['人格', '103', 3, '罪名尺度', '施启扬,台奸,偏执'],
  ['文化', '104', 20, '创教慎重', '轩辕教,宗教,走火入魔'],
  ['文化', '106', 3, '岛无文化', '歌仔戏,中华文化,台湾文化'],
  ['政治', '107', 4, '畏威不德', '台湾人,蒋渭水,政治心态'],
  ['人格', '108', 4, '辞职表演', '孙震,辞职,权位'],
  ['人格', '112', 3, '人格高下', '宋美龄,溥心畬,拜师'],
  ['文化', '113', 2, '艺术自欺', '朱铭,艺术,不伦不类'],
  ['政治', '114', 3, '冒充台湾人', '宋楚瑜,台湾人,政治利害'],
  ['政治', '115', 3, '官僚无异', '尤清,民进党,官僚'],
  ['文化', '116', 3, '文化费', '文化经费,建设,文化'],
  ['人格', '117', 3, '有墓不扫', '张学良,慈湖,人格'],
  ['文化', '121', 8, '无知妄作', '胡茵梦,闭关,妖妄'],
  ['法权', '122', 3, '狱政败坏', '黑牢,看守所,狱政'],
  ['知识', '125', 2, '历史旧账', '历史,发财,旧账'],
  ['知识', '126', 8, '老兵补正', '五十二军,回忆,史料'],
  ['政治', '127', 3, '宜独反讽', '台独,宜兰独立,公民投票'],
  ['人格', '128', 4, '女强人歧途', '叶菊兰,政治,歧途'],
  ['文化', '129', 2, '导演抄袭', '朱延平,卓别林,国片'],
  ['政治', '131', 3, '作恶成靶', '国民党,特务,恶名'],
  ['人格', '131', 4, '为贼成靶', '作恶,恶名,格言'],
  ['法权', '133', 5, '只问理由', '监察院,弹劾,司法'],
  ['法权', '133', 6, '狼来不信', '监委,弹劾,公信'],
  ['写作', '134', 2, '朋友敌写', '朋友,写作,胡适'],
  ['政治', '136', 33, '跑龙套亡', '青年党,国民党,政党'],
  ['写作', '137', 2, '党报颟顸', '中央日报,报导,党报'],
  ['人格', '138', 3, '玩世自得', '冤狱,玩世,不幸'],
  ['知识', '139', 3, '台湾史功力', '尹章义,台湾史,学术'],
  ['政治', '140', 2, '斗争凶残', '政治斗争,西哈努克,凶残'],
  ['方法', '142', 6, '摄影失真', '摄影,求真,失真'],
  ['方法', '143', 3, '谋害判断', '孙立人案,证据,判断'],
  ['政治', '144', 12, '斗争同志', '共产党,文革,斗争'],
  ['法权', '145', 8, '党营照顾', '电影审查,双重标准,党营'],
  ['人格', '146', 2, '厌恶政治', '谢聪敏,助选,政治'],
  ['政治', '148', 2, '贿选民风', '选风,贿选,民风'],
  ['方法', '148', 3, '别打李牌', '竞选,李敖牌,策略'],
  ['法权', '149', 2, '高院红包', '法官,红包,司法腐败'],
  ['法权', '150', 13, '英雄不公', '许阿桂,司法,英雄'],
  ['文化', '152', 3, '迷信候选', '算命,国代,迷信'],
  ['文化', '153', 11, '妄人方法', '天帝教,目标,方法'],
  ['文化', '154', 3, '三千年前', '祭祖,周礼,开倒车'],
  ['政治', '155', 4, '政治商品', '政治人物,商品,刺激'],
  ['知识', '156', 3, '教授涉政', '大学教授,政治,学术尊严'],
  ['写作', '159', 3, '部分知己', '文章,读者,知己'],
  ['文化', '162', 8, '碑林玩意', '碑林,书法,斯文扫地'],
  ['文化', '163', 3, '大陆失望', '大陆,台湾,失望'],
  ['政治', '163', 4, '政治坏透', '台湾政治,老派,坏透'],
  ['人格', '163', 6, '无安全网', '反国民党,冒险,安全'],
  ['知识', '165', 3, '恐马克思', '马克思,马克斯韦伯,审查'],
  ['法权', '166', 8, '小人抗议', '司法不公,小人物,判刑'],
  ['情爱', '167', 11, '代母夺父', '婚姻,名分,家庭'],
  ['人格', '169', 3, '厚颜自吹', '李登辉,台湾史,自吹'],
  ['知识', '175', 20, '乱世死证', '乱世,悲欢离合,证据'],
  ['法权', '176', 12, '授权不法', '陈水扁,代签,法'],
  ['法权', '177', 3, '监委白饭', '监察委员,弹劾,有愧职守'],
  ['知识', '179', 7, '读书风气', '图书馆,藏书,读书风气'],
  ['方法', '181', 2, '棺材本', '孝思,印书,当务之急'],
  ['文化', '181', 5, '探亲清场', '老兵,探亲,文化'],
  ['文化', '181', 7, '行孝糊涂', '胡虚一,行孝,糊涂'],
  ['文化', '184', 7, '假神拉票', '妈祖,选举,神道'],
  ['人格', '185', 3, '谀蒋不喜', '熊式一,蒋介石传,人格'],
  ['政治', '186', 5, '中央入关', '引清兵入关,地方政府,国民党'],
  ['政治', '186', 7, '口号自淫', '民进党,口号,可行性'],
  ['方法', '187', 5, '逻辑矛盾', '台独,逻辑,自我矛盾'],
  ['人格', '188', 5, '安全勇气', '李镇源,勇气,时机'],
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
    if (record.id?.startsWith('LAT051-')) continue;
    map.set(normalize(record.description), record.id);
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
  const normalized = normalize(description);
  if (previous.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: previous.get(normalized) });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: seenCurrent.get(normalized) });
    continue;
  }
  keptCandidates.push({
    category,
    title,
    description,
    source_file: fileName,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, path.join(sourceDir, fileName)).replaceAll(path.sep, '/'),
    keywords,
  });
  seenCurrent.set(normalized, `${key} P${paragraphNumber}`);
}

const records = keptCandidates.map((candidate, index) => ({
  id: `LAT051-${String(index + 1).padStart(3, '0')}`,
  book: book.title,
  round: book.round,
  status: book.status,
  ...candidate,
}));

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    candidate_count: candidateEntries.length,
    skipped_duplicate_count: skipped.length,
  },
  taxonomy,
  records,
  extraction: {
    principles: [
      '每条 description 保留源文本原文段落，不改写。',
      '标题只作索引用的浓缩，不替代原文判断。',
      '沿用 8 个原子分类，不新增临时类别。',
      '本书优先收录李敖自己落下判断的段落：写作取舍、知识辨误、人格尺度、文化批评、台湾政治、司法法权、行动方法和少量情爱材料。',
      '纯剪报资料、外部长篇引文、日常流水、人名往来、资料清单、群制作者尾注和缺少李敖判断的段落不收。',
      '与既有总表完全重复的 description 自动跳过。',
    ],
    skipped_duplicates: skipped,
  },
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
  '# 《李敖随写录前集》思想索引提取说明',
  '',
  `- 提取轮条目：${records.length}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 跳过既有/本书重复：${skipped.length}`,
  `- 来源目录：${book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 取舍说明',
  '',
  '本轮覆盖《李敖随写录前集》一百八十九则随写。提取重点不是逐则收录，而是保留能独立呈现思想判断的源文段落：写作主力和朋友取舍、知识考证与读书风气、人格尺度、文化迷信与艺术批评、台湾政治水准、司法与法权、行动方法，以及少量情爱和婚姻判断。',
  '',
  '由于本书大量条目采用剪报后附短评的形式，提取时优先保留李敖短评本身足以成为索引的段落；纯新闻长引、外部访谈资料、个人往来流水、单纯资料保存、过短机锋、群制作者尾注，以及没有李敖明确判断的段落不收。少数新闻段落若同段包含李敖的判断，则暂留供校对轮压缩。',
  '',
];
fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built ${book.sequence}.${book.title}: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
