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
  .find((name) => name.startsWith('003.'));
const sourceDir = path.join(rootDir, sourceRoot, interviewGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '055.李敖书序集续集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '055',
  title: '李敖书序集续集',
  slug: 'leeao-shuxuji-xuji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书序集续集》的序文、感言、广告词、出版说明和简介文字中提取思想索引。description 保留源文本原段落；目录、价格书目、制作信息、纯日期署名、纯作者履历和只有外部引文而缺少李敖判断的段落不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['法权', '001', 3, '文星遭禁', '文星,香港,查禁'],
  ['法权', '001', 5, '家奴人权', '香港,自由,人权'],
  ['法权', '001', 6, '番地留真', '香港,言论自由,海外'],
  ['政治', '001', 7, '殖民下限', '殖民,香港,国耻'],
  ['写作', '001', 8, '言论乐土', '李敖语录,香港版,见证'],
  ['写作', '003', 3, '一介报纸', '求是报,独立,办报'],
  ['政治', '004', 2, '冰河知识', '国民党,知识分子,极权'],
  ['人格', '004', 3, '不屈不媚', '查禁,坐牢,不媚世'],
  ['法权', '004', 4, '禁关无效', '禁书,关人,伏尔泰'],
  ['法权', '004', 5, '查禁文证', '查禁表,文证,冰河期'],
  ['方法', '005', 2, '二二八民变', '二二八,民变,历史公道'],
  ['方法', '005', 3, '真相亵渎', '二二八,真相,党化'],
  ['方法', '005', 4, '排比证据', '二二八,文化证据,旁征博引'],
  ['方法', '005', 5, '无徵不信', '理性,证据,历史学家'],
  ['写作', '006', 2, '选文倍难', '精选集,选文,白话文'],
  ['政治', '007', 2, '衰世立言', '衰世,政治丑类,知其不可'],
  ['文化', '008', 4, '人像历史', '历史与人像,人像,历史'],
  ['政治', '008', 7, '僵尸思想', '思想趋向,僵尸思想,批判'],
  ['方法', '008', 15, '思想通俗', '思想,学者蛋头,深入浅出'],
  ['写作', '008', 17, '文学成家', '小说,文学家,成家数'],
  ['写作', '008', 18, '书信公开', '书信,公开,秘密通讯'],
  ['写作', '008', 19, '评论肇祸', '评论,伪政府,善恶分明'],
  ['方法', '008', 20, '历史复健', '历史,扭曲,翻案'],
  ['法权', '008', 22, '查禁随笔', '查禁,随笔,思想'],
  ['方法', '008', 24, '人物证据', '人物,黑资料,据笔直书'],
  ['政治', '009', 2, '自由主义', '自由主义,胡适,雷震'],
  ['人格', '010', 4, '朋友是非', '朋友,是非,公开讨论'],
  ['法权', '010', 5, '追究特权', '鸿禧山庄,李登辉,社会公义'],
  ['政治', '010', 8, '内部原弹', '新党,初选,规划名单'],
  ['方法', '010', 11, '败局留鉴', '新党,检讨,民主政治'],
  ['政治', '012', 5, '革命狼狈', '何集璧,共产党,国民党'],
  ['政治', '012', 12, '个人失败', '共产党员,个人失败,共产党'],
  ['人格', '012', 14, '革命牺牲', '政治运动,牺牲,革命'],
  ['人格', '012', 18, '轻财好义', '陈文茜,勇敢,政治投机'],
  ['政治', '012', 19, '勇怯统独', '车臣,台独,勇怯'],
  ['政治', '012', 20, '结党夺权', '革命,夺权,清醒'],
  ['政治', '012', 32, '消极不字', '陈文茜,政治基调,不'],
  ['情爱', '012', 36, '阉夫杀夫', '阉夫,杀夫,性幻想'],
  ['政治', '012', 38, '权力释放', '女性主义,权力游戏,自由'],
  ['政治', '012', 41, '台湾下一步', '台湾,自决,修正主义'],
  ['政治', '012', 48, '岛国本位', '两岸谈判,共产党,岛国本位'],
  ['政治', '012', 50, '口舌谋皮', '陈文茜,共产党,政治实验'],
  ['政治', '012', 52, '强邻难解', '独立运动,强邻,台独'],
  ['文化', '012', 53, '文化疗伤', '姑娘庙,文化,重新出发'],
  ['文化', '012', 54, '文化本行', '张爱玲,文化活动,永恒'],
  ['文化', '012', 57, '小岛国宝', '台湾国宝,世界,格局'],
  ['政治', '012', 58, '自由胜独', '民主,自由,台独'],
  ['政治', '012', 60, '加入打倒', '共产党,颠覆,陈文茜'],
  ['方法', '013', 8, '漏网信史', '张学良,查禁,信史'],
  ['人格', '014', 2, '早死免见', '美人,文人,早死'],
  ['写作', '014', 3, '自悔进步', '少作,藏拙,进步'],
  ['方法', '014', 4, '少作史料', '陈复,成熟作品,史料'],
  ['情爱', '015', 2, '男人魔障', '男女问题,爱情,魔障'],
  ['写作', '015', 4, '旧事新说', '写作,自知,佳作'],
  ['政治', '016', 2, '黑牢反扑', '调查局研究,李世杰,线民'],
  ['写作', '016', 3, '煽风出书', '李世杰,出版,难友'],
  ['法权', '016', 4, '黑牢全貌', '调查局黑牢,刑求,坐牢'],
  ['法权', '016', 5, '刑求饰辞', '刑求,假口供,治狱'],
  ['法权', '016', 6, '刑狱补缺', '黑牢,刑狱,实例'],
  ['文化', '017', 3, '命定席卷', '算命,宿命论,迷信'],
  ['政治', '017', 4, '迷信欺民', '怪力乱神,统治者,欺民'],
  ['方法', '017', 5, '破命系列', '算命,解构,拨乱导正'],
  ['方法', '017', 6, '挡术士财', '算命,电视节目,江湖术士'],
  ['方法', '017', 8, '智慧破雾', '算命术语,智慧,迷信'],
  ['知识', '018', 2, '时间验书', '好书,时间,泰戈尔'],
  ['人格', '018', 3, '人生加值', '人生,价值,境界'],
  ['情爱', '018', 4, '爱情烧手', '爱情,酒杯,烧伤'],
  ['文化', '018', 8, '科技失足', '科技,快乐,满足'],
  ['方法', '018', 10, '诗无训诂', '诗,解读,译本'],
  ['人格', '019', 4, '拒迎权势', '冯沪祥,李登辉,人格'],
  ['人格', '019', 5, '良知挨打', '冯沪祥,良知,批判'],
  ['政治', '019', 9, '共同反独', '台独,黑金,两岸和平'],
  ['文化', '019', 13, '文学净化', '政治,文学,思想家'],
  ['写作', '019', 14, '对话留正', '对话录,历史,正气'],
  ['政治', '019', 15, '祯祥扫妖', '中庸,两岸,拨乱反正'],
  ['法权', '020', 2, '贱民自由', '言论自由,倡优,真言'],
  ['方法', '020', 4, '借古讽今', '讽刺,借古讽今,否认'],
  ['文化', '020', 5, '民间造型', '刘罗锅,民间传说,清官'],
  ['人格', '021', 6, '不告不行', '秦慧珠,诽谤,勇气'],
  ['方法', '021', 9, '真也否认', '政治正确,否认,机密'],
  ['方法', '021', 10, '历史正确', '事实正确,历史正确,政治正确'],
  ['人格', '021', 11, '事实勇气', '秦慧珠,资料,胆识'],
  ['法权', '022', 3, '匿名编书', '白色恐怖,匿名,编书'],
  ['方法', '022', 5, '搜集胡适', '胡适选集,资料搜集,考订'],
  ['写作', '022', 6, '全集完整', '胡适选集,全集,出版'],
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
    if (record.id?.startsWith('LAT055-')) continue;
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
  id: `LAT055-${String(index + 1).padStart(3, '0')}`,
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
  '# 《李敖书序集续集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 只提取能独立呈现李敖判断、方法、价值或知识立场的原文段落。',
  '- 广告中的纯书目、价格、预约方式、制作群信息、下载站信息、纯日期署名不进入索引。',
  '- 《文茜半生缘》序中只保留李敖自己的论断和评议段落，纯外部引文不单独入索引。',
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
  `Built 055.李敖书序集续集: ${records.length} records. ` +
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
