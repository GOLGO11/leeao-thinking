import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const interviewGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('007.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, interviewGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('004.'));
const sourceDir = path.join(rootDir, sourceRoot, interviewGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '056.李敖对话录');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '056',
  title: '李敖对话录',
  slug: 'leeao-duihualu',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖对话录》的访问、答问和自我访谈中提取思想索引。description 保留源文本原段落；采访者提问、栏目标题、目录、制作下载信息、纯笑谈、纯事件细节和胡茵梦等非李敖独立发言不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['政治', '001', 6, '思想领政', '思想家,政治家,政客'],
  ['人格', '001', 11, '复杂人格', '复杂,冰山,全面'],
  ['人格', '001', 16, '亦狂亦侠', '温柔敦厚,英雄气概,做人标准'],
  ['人格', '001', 29, '封锁突围', '表达自己,封锁,战士'],
  ['写作', '001', 40, '广告文字', '白话文,押韵,广告效果'],
  ['政治', '001', 43, '大向优先', '苏洪月娇,党外,大方向'],
  ['文化', '001', 98, '丧礼改革', '丧礼,改革,传统'],
  ['人格', '002', 19, '监狱锻炼', '监狱,军队,男子汉'],
  ['方法', '002', 27, '长考结论', '思考,结论,写文章'],
  ['知识', '002', 33, '经世治用', '学问,知识分子,经世治用'],
  ['方法', '002', 34, '不为读书', '读书,写文章,表达思想'],
  ['知识', '002', 38, '知识起义', '知识分子,勇气,现实'],
  ['法权', '002', 40, '自由非谏', '言论自由,谏诤,平等'],
  ['政治', '002', 67, '玩笑自由', '民主,幽默,生活态度'],
  ['文化', '002', 76, '烂包袱', '全盘西化,中国古代,固有文化'],
  ['写作', '002', 87, '火爆有料', '写作,资料,情绪语言'],
  ['知识', '002', 102, '百世之师', '胡适,容忍,知识分子'],
  ['知识', '002', 106, '思想总理', '中国思想史,中国思想,思想家'],
  ['知识', '003', 6, '学院自修', '台大,历史系,自修'],
  ['方法', '003', 10, '独立深思', '独立思考,隔离,看法'],
  ['文化', '003', 11, '文化探底', '中国文化,徐复观,古书'],
  ['人格', '004', 13, '表达立场', '轻视,乡愿,个性'],
  ['政治', '004', 32, '思想之厉', '思想人物,政治人物,国民党'],
  ['法权', '004', 45, '歧见权利', '歧见,言论自由,是非'],
  ['人格', '004', 50, '是非认真', '乡愿,是非,认真'],
  ['政治', '004', 57, '抗议限度', '党外,言论自由,杯葛'],
  ['写作', '004', 62, '情绪过滤', '文章,情绪,见解'],
  ['写作', '004', 65, '个性语言', '语言表达,官场,个人锋芒'],
  ['人格', '004', 107, '力量尺度', '力量,失职,伟大'],
  ['政治', '004', 114, '民主气质', '自由民主,气质,胡适'],
  ['方法', '004', 133, '间接研判', '知识,研判,书本'],
  ['写作', '004', 149, '骂为技巧', '骂人,正义,理智'],
  ['文化', '004', 166, '西化事实', '西化,事实,全盘西化'],
  ['文化', '004', 172, '忠有条件', '忠,晏子,传统'],
  ['方法', '004', 181, '社会实验', '土城看守所,社会问题,实验室'],
  ['法权', '004', 227, '法治儿戏', '褫夺公权,冤狱,法治'],
  ['人格', '005', 6, '外怪内实', '特立独行,知识基础,不可隐我脚'],
  ['知识', '005', 11, '自修远胜', '大学,自修,师友'],
  ['人格', '005', 18, '羊圈老虎', '大学,老虎,羊'],
  ['方法', '005', 21, '现代读书', '读书,知识爆炸,方法'],
  ['方法', '005', 23, '剪贴分类', '剪贴,资料夹,读书得间'],
  ['人格', '005', 24, '不为面包', '使命感,面包,抱负'],
  ['人格', '005', 34, '失败王牌', '失败,不怕失败,写作'],
  ['方法', '006', 15, '反调正业', '唱反调,职业特质,公平'],
  ['知识', '006', 17, '异议形态', '知识分子,异议,真理'],
  ['文化', '006', 25, '美感不戴帽', '美感,中国式民主,国民党'],
  ['写作', '007', 13, '文学欠训', '文学家,思想训练,血泪人生'],
  ['知识', '007', 19, '先知缺位', '思想家,先知,乱世'],
  ['知识', '007', 21, '皮肉相连', '胡适,殷海光,思想家'],
  ['法权', '007', 25, '特殊自由', '言论自由,刑求,代价'],
  ['方法', '008', 15, '小功夫', '政治,细心,礼貌'],
  ['方法', '008', 17, '小依大向', '大方向,小功夫,权谋'],
  ['法权', '009', 5, '选法违宪', '选罢法,政治犯,褫夺公权'],
  ['政治', '009', 14, '体制不屑', '体制,无政府主义,不合作'],
  ['政治', '009', 30, '象征留史', '党外,立法院,历史记录'],
  ['政治', '009', 32, '大目标', '选举,大目标,不合作'],
  ['法权', '009', 34, '反民体制', '党禁,戒严法,万年国会'],
  ['法权', '009', 37, '政党规则', '政党,民主,代议政治'],
  ['方法', '010', 10, '不追新闻', '新闻,权力核心,判断'],
  ['法权', '010', 16, '证据打分', '自由中国,言论自由,证据'],
  ['人格', '010', 19, '清教工作', '工作,律己,成绩'],
  ['方法', '011', 9, '理来情无存', '理,情,政敌'],
  ['人格', '011', 13, '真理过友', '真理,朋友,执著'],
  ['政治', '011', 18, '忠奸自判', '赖和,国民党,忠奸'],
  ['人格', '011', 24, '欺负回来', '痛快,反击,顽童'],
  ['法权', '012', 4, '溯既往谬', '罪刑法定,叛乱,大法官'],
  ['知识', '012', 10, '语音寻根', '台湾话,语音学,小字'],
  ['政治', '012', 13, '不合作义', '波兰,退党,道义制裁'],
  ['政治', '013', 14, '战斗检验', '党外,战斗,现实'],
  ['写作', '013', 20, '能写即写', '写作,时间,青春'],
  ['写作', '013', 32, '严肃用语', '文字技巧,个性语言,党外'],
  ['方法', '013', 40, '细腻挖根', '细腻,出拳,书房'],
  ['写作', '013', 43, '记录错误', '写文章,国民党,遗臭万年'],
  ['方法', '013', 54, '会读古书', '中国书,会读,资治通鉴'],
  ['方法', '013', 65, '定位定性', '古书,历史背景,定位'],
  ['政治', '013', 75, '公开讨论', '自由民主,公开,讨论'],
  ['政治', '013', 81, '制衡支持', '政治人物,制衡,支持'],
  ['法权', '014', 22, '出版漏洞', '出版法,每月一书,查禁'],
  ['方法', '014', 30, '查禁智取', '查禁,抢书,智取'],
  ['写作', '014', 36, '内容能打', '内容,读者,市场'],
  ['方法', '014', 40, '个案详追', '个案,党外杂志,粗糙'],
  ['写作', '014', 49, '文章工厂', '写作工业,中央厨房,文章'],
  ['法权', '014', 65, '言论生态', '言论自由,杂志,读者'],
  ['方法', '015', 4, '真相辩证', '真相,讨论,史料'],
  ['方法', '015', 6, '资料解释', '资料处理,解释,党外杂志'],
  ['法权', '015', 16, '无物不可碰', '自由言论,禁忌,国民党'],
  ['方法', '015', 32, '批判维持', '互相检讨,批判,水准'],
  ['方法', '015', 37, '公开新解', '公开资料,解释,内幕'],
  ['政治', '015', 43, '抓人无用', '查禁,抓人,复原'],
  ['方法', '015', 45, '揭暗少追', '揭发黑暗,分析,黑屁'],
  ['人格', '015', 73, '道义支持', '支持,道义,私交'],
  ['写作', '016', 80, '历史全局', '胡适评传,历史,全局'],
  ['写作', '016', 87, '白话反省', '白话文学,文体,个性'],
  ['写作', '016', 89, '知识撑文', '中文,词汇,职业作家'],
  ['方法', '016', 90, '主题读书', '读书方法,主题,剪辑'],
  ['方法', '016', 111, '传统清单', '传统,清单,检定'],
  ['文化', '016', 114, '熟后失望', '传统,全盘西化,十三经'],
  ['文化', '016', 116, '遵经作伪', '礼记,三年之丧,虚伪'],
  ['文化', '016', 126, '世界化', '全盘西化,典权,世界化'],
  ['方法', '016', 130, '不死读书', '读书方法,元史,材料'],
  ['方法', '016', 157, '平均面', '中国文化,平均面,历史哲学'],
  ['方法', '016', 186, '信己所思', '思考,结论,错误'],
  ['写作', '016', 204, '文章可读', '文章,声韵,演说稿'],
  ['写作', '016', 280, '主题理念', '文章,主题理念,时效'],
  ['人格', '016', 286, '故意自负', '自负,温柔敦厚,气魄'],
  ['写作', '016', 308, '怒骂升华', '嬉笑怒骂,严肃,读者'],
  ['政治', '017', 7, '非暴不弱', '群众运动,甘地,非暴力'],
  ['政治', '017', 12, '作战非请愿', '请愿,作战,求情'],
  ['政治', '017', 17, '自由牺牲', '自由,牺牲,冲突'],
  ['方法', '017', 47, '杂志武器', '党外杂志,武器,言论自由'],
  ['政治', '017', 51, '压力政治', '政治人物,压力,制衡'],
  ['政治', '018', 5, '山头保存', '组党,山头,党外'],
  ['政治', '018', 23, '无须领袖', '党外,领袖,山头'],
  ['人格', '018', 25, '领袖条件', '领袖,眼光,度量'],
  ['政治', '018', 50, '不讨价', '国民党,对抗,激进'],
  ['人格', '018', 65, '毁誉不动', '庄子,境界,时髦'],
  ['政治', '018', 67, '反对制衡', '党外,制衡,一党独裁'],
  ['知识', '019', 9, '思想定位', '中国思想,全面,深入'],
  ['知识', '019', 10, '思想方法', '政治压力,中国思想,见微知著'],
  ['文化', '019', 23, '现代文明', '全盘西化,现代化,传统'],
  ['人格', '019', 25, '道与殉', '殉道,精神,时代'],
  ['政治', '019', 29, '反抗暴政', '暴政,国民党,精神'],
  ['方法', '019', 31, '真相导向', '真相,规则,导向'],
  ['人格', '019', 53, '大丈夫', '大智,大仁,大勇'],
  ['知识', '019', 62, '逃避现实', '知识分子,逃避,勇气'],
  ['情爱', '019', 68, '女人可爱', '女人,美,新女性'],
  ['情爱', '019', 73, '情理法', '胡茵梦,情理,依法'],
  ['情爱', '019', 83, '性自由', '性自由,裸女,禁忌'],
  ['政治', '019', 96, '支持大向', '反对党,一党独大,支持'],
  ['法权', '020', 15, '黄鱼两吃', '文星,出版权,诈欺'],
  ['法权', '020', 29, '人格财产', '著作人格权,著作财产权,出版权'],
  ['法权', '020', 32, '契约三分', '著作权让与,出版权让与,出版权授与'],
  ['法权', '020', 37, '独资权利', '独资商号,朱婉坚,出版权'],
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

  for (const record of payload.records) {
    lines.push(
      `## ${record.id} ${record.title}`,
      '',
      `- 分类：${record.category}`,
      `- 来源：${record.source_file} / P${record.source_paragraph}`,
      `- 关键词：${record.keywords}`,
      '',
      record.description,
      '',
    );
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT056-')) continue;
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
  id: `LAT056-${String(index + 1).padStart(3, '0')}`,
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
  '# 《李敖对话录》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 只提取能独立呈现李敖判断、方法、价值或知识立场的原文段落。',
  '- 访谈者问题、栏目标题、目录、制作下载信息、纯笑谈和纯事件流水账不进入索引。',
  '- 与胡茵梦同场的答问，只收李敖发言或能明确呈现李敖观点的段落，胡茵梦独立发言不单独入索引。',
  '- 同类政治攻防材料只保留可作为方法、法权或政治原则入口的段落，避免把人物攻防铺得过密。',
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
  `Built 056.李敖对话录: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
if (skipped.length) {
  console.log('Skipped duplicates:');
  for (const item of skipped) {
    console.log(`- ${item.key} P${item.paragraphNumber} ${item.title} duplicateOf ${item.duplicateOf}`);
  }
}
