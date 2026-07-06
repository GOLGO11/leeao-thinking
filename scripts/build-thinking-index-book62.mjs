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
  .find((name) => name.startsWith('005.'));
const sourceDir = path.join(rootDir, sourceRoot, letterGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '062.李敖书札集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '062',
  title: '李敖书札集',
  slug: 'leeao-shuzhaji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书札集》的公开信、书信札记、政论通信、司法与出版抗议、党外往还和人物劝告中提取思想索引。description 保留源文本原段落；目录、制作信息、他人附录、新闻长引、寒暄、案情流水和缺少独立判断的材料不进入本轮。长篇法政材料只保留能独立呈现李敖法权意识、证据方法、政治判断、人格伦理、知识分子批评、新闻写作和情爱思想的段落。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['法权', '001', 8, '抗议有阶', '警察,户口校正,申诉'],
  ['法权', '001', 10, '知过能改', '公务员,纠错,警察'],
  ['情爱', '002', 16, '遗稿受阻', '思想家,婚姻,遗稿'],
  ['情爱', '002', 18, '思想绊脚', '思想流传,寡妇,遗作'],
  ['知识', '002', 27, '保存遗物', '思想家,遗稿,纪念馆'],
  ['文化', '002', 28, '全貌出版', '传记,纪念集,思想全貌'],
  ['政治', '003', 5, '统战对象', '统一战线,青年党,党外'],
  ['政治', '003', 26, '杂碎结盟', '党外,统一战线,见识'],
  ['政治', '003', 28, '党外老化', '青年党,协商,党外'],
  ['人格', '004', 10, '画皮人生', '明星,真实,虚假'],
  ['人格', '004', 12, '掌声虚假', '明星,政客,虚假'],
  ['方法', '005', 4, '书面思考', '写信,思考,成果'],
  ['政治', '005', 8, '批评党外', '党外,自我批评,自由'],
  ['政治', '006', 5, '影子政权', '政权,存在,思维'],
  ['政治', '006', 6, '代表空话', '影子政权,代表,选票'],
  ['法权', '007', 14, '公产私占', '公帑,公产,学者'],
  ['知识', '007', 15, '读书人公私', '读书人,公私,仁义道德'],
  ['法权', '008', 20, '两面夹杀', '侵占,背信,保全权益'],
  ['法权', '008', 28, '构成要件', '侵占罪,法理,常识'],
  ['法权', '008', 46, '冤狱善后', '极权,法律手段,法官良知'],
  ['政治', '008', 47, '斗臭沉默', '报纸垄断,平反,丑化'],
  ['政治', '008', 50, '新闻司法倒退', '办报,司法,开倒车'],
  ['人格', '010', 5, '拒绝凭借', '已成势力,理想,委曲求全'],
  ['人格', '010', 8, '退出统战', '文化统战,主动,自立'],
  ['写作', '010', 9, '写回忆录', '报阀,儒林,内幕'],
  ['政治', '010', 13, '翻掌一扑', '报禁,青年,气魄'],
  ['写作', '011', 4, '私人做事', '胡适全集,私人机构,公家'],
  ['写作', '011', 6, '史料功过', '传记文学,宣传,伪证'],
  ['写作', '011', 9, '写宽尺度', '专栏,言论自由,失职'],
  ['政治', '011', 10, '豹死留皮', '言论尺度,画皮,自由假象'],
  ['政治', '012', 18, '批评条件', '党外,批评,言论自由'],
  ['政治', '012', 21, '骂自己人', '自由民主,党外,秦始皇'],
  ['写作', '012', 32, '杂志骨头', '文责,杂志,勇气'],
  ['法权', '013', 5, '报禁无据', '报禁,宪法,法治'],
  ['法权', '013', 8, '禁令接龙', '行政手续,报禁,理由'],
  ['写作', '014', 4, '血泪记录', '乱世,文学,历史'],
  ['政治', '014', 7, '新生横冲', '新生代,圆滑,政治'],
  ['政治', '015', 68, '取缔失败', '娼妓政策,警政,奖章'],
  ['法权', '015', 76, '证据易得', '证据,警察,不作为'],
  ['政治', '015', 80, '卖淫责任', '卖淫,皮条,内政'],
  ['写作', '016', 6, '亲见为要', '新闻,报导,事实'],
  ['方法', '016', 9, '澄清示范', '解释,施教,争辩'],
  ['人格', '016', 10, '是非放刁', '真理,乡愿,认真'],
  ['方法', '017', 5, '按件检定', '政治人物,战斗,检定'],
  ['方法', '017', 7, '成绩才算', '相信,成绩,空头支票'],
  ['政治', '017', 8, '政论常识', '反对党,坐牢,常识'],
  ['人格', '017', 9, '君子之爱', '原则,大义,姑息'],
  ['政治', '017', 12, '揭发样板', '康宁祥,样板,批评'],
  ['政治', '018', 5, '山头阶段', '山头,后援团,政治组织'],
  ['政治', '019', 5, '思想棒喝', '党外,思想家,政客'],
  ['写作', '019', 10, '代编者立言', '编辑权,特区,共识'],
  ['人格', '019', 38, '真话水准', '真话,乡愿,偏激'],
  ['政治', '019', 47, '是非塞子', '稳健分子,道德,真理'],
  ['政治', '019', 49, '水准测量', '君子之爱,党外,沉沦'],
  ['政治', '020', 7, '无人讲话', '知识分子,政治迫害,公开发声'],
  ['方法', '020', 13, '举证责任', '证据,相信,恩人'],
  ['方法', '020', 23, '分清当时', '辩论,语境,事实'],
  ['写作', '020', 41, '当事写作', '当事人,发表,护航'],
  ['知识', '020', 45, '立言重事实', '知识分子,事实,见解'],
  ['人格', '020', 53, '惭愧不够', '仗义执言,第一线,支援'],
  ['人格', '020', 54, '第一线安', '立身,战斗,光明'],
  ['法权', '021', 10, '责任分担', '出版法,新闻自由,大众利益'],
  ['法权', '021', 19, '文明观念', '法律观念,发行人,杂志'],
  ['法权', '022', 13, '文化族诛', '查禁,延伸解释,陪斩'],
  ['法权', '022', 14, '只限当文', '装订厂,查扣,恶政'],
  ['文化', '022', 15, '抽毁活路', '禁书,专制,抽毁'],
  ['写作', '023', 6, '不掺原作', '千秋评论,原作,读者'],
  ['写作', '023', 7, '催生成书', '号外,督促,序'],
  ['人格', '025', 11, '不肖万岁', '教育,不肖,反抗'],
  ['法权', '026', 8, '役男放行', '兵役,出境,平等'],
  ['人格', '027', 6, '战斗意识', '忧患,逃避,解脱'],
  ['政治', '027', 7, '抗暴活证', '受难者,抗暴,复仇'],
  ['政治', '027', 8, '最后十里', '自由民主,群众,榜样'],
  ['法权', '028', 13, '预抢成本', '查扣,追惩制,出版自由'],
  ['法权', '028', 14, '预抢制', '言论自由,预审,预抢'],
  ['写作', '028', 15, '查扣成本', '出版,查扣,成本'],
  ['政治', '029', 6, '党外全额', '后援会,提名,苏秋镇'],
  ['政治', '029', 7, '清党外', '党外,后患,清理'],
  ['人格', '030', 5, '病中做工', '工作,意义,疲累'],
  ['法权', '031', 41, '抢书无文', '查禁,公文,抢书'],
  ['人格', '031', 46, '个人可放', '是非,原谅,殷海光'],
  ['法权', '031', 54, '命令滞后', '查禁,命令,快半拍'],
  ['政治', '032', 10, '立场身份', '委蛇,立场,身份'],
  ['人格', '032', 11, '不合作记录', '阿登纳,清白,合作'],
  ['人格', '032', 12, '朝远看', '春秋,千秋,委屈'],
  ['政治', '033', 4, '政治不殃民', '三通,老百姓,虐政'],
  ['法权', '033', 7, '宾馆牢房', '三通,法律平等,双重标准'],
  ['政治', '033', 12, '反共猪鬃', '三通,困境,货物'],
  ['政治', '034', 8, '实情失败', '政治人物,基层,失败'],
  ['政治', '034', 12, '批康价值', '新生代,选举,批评'],
  ['人格', '034', 17, '哀矜之情', '君子之爱,细人之爱,悲悯'],
  ['政治', '034', 18, '内心重建', '党外清议,是非,重建'],
  ['人格', '035', 3, '工作战斗', '感喟,工作,战斗'],
  ['人格', '035', 5, '做事人生', '事业,牺牲,风凉话'],
  ['方法', '035', 6, '具体成绩', '成绩,检定,理由'],
  ['写作', '035', 9, '做早留真', '年谱,家信,真人真事'],
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
    if (record.id?.startsWith('LAT062-')) continue;
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
  id: `LAT062-${String(index + 1).padStart(3, '0')}`,
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
  '# 《李敖书札集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 保留公开信、书信札记、政论通信、司法与出版抗议、党外往还和人物劝告中可独立检索的思想判断。',
  '- description 字段逐条取自源文件原段落，不做改写或摘要。',
  '- 附录中的他人文章、新闻长引、寒暄、制作信息、纯案情流水和缺少独立判断的材料不进入索引。',
  '- 长篇司法、出版和警政材料只取法权原则、证据方法、制度批判与可复用判断，不把全部事实链拆成过密条目。',
  '- 分类继续使用 8 个原子分类，避免新增过密分类。',
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

if (skipped.length) {
  noteLines.push('## 跳过的重复段落', '');
  for (const item of skipped) {
    noteLines.push(`- ${item.key} 第 ${item.paragraphNumber} 段「${item.title}」：重复于 ${item.duplicateOf}`);
  }
  noteLines.push('');
}

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built ${book.title}: ${records.length} records from ${candidateEntries.length} candidates; skipped ${skipped.length} duplicates.`,
);
