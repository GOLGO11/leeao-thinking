import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 68;
const bookTitle = '给马戈的五十封信';
const round = '提取轮';
const status = '待校对';
const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '008.书信函件类',
  '011.给马戈的五十封信',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'gei-mage-de-wushi-fengxin',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《给马戈的五十封信》的大学书信、情爱通信、友朋规劝、写作史料意识、研究方法、人格自持、文化实践和跋文回顾中提取思想索引。description 保留源文本原段落；纯问候、私人琐事、诗句笑闹、通讯地址、制作信息和过窄情境不进入本轮。',
};

const candidates = [
  ['001.无闻之美.txt', 3, '方法', '承认无闻之美'],
  ['005.年月日要写清楚.txt', 3, '写作', '书信年月日要写清楚'],
  ['006.活页日记.txt', 7, '知识', '考试不能衡量真才'],
  ['006.活页日记.txt', 8, '写作', '书信是活页日记'],
  ['006.活页日记.txt', 9, '写作', '写信也要修饰训练'],
  ['006.活页日记.txt', 29, '人格', '不被赏识就横眉沉默'],
  ['008.提倡狠心肠.txt', 3, '人格', '重情之外还要坚强'],
  ['009.爱情牢骚.txt', 7, '情爱', '爱情成功常牺牲尊严'],
  ['009.爱情牢骚.txt', 9, '人格', '尊严重于做爱'],
  ['009.爱情牢骚.txt', 18, '情爱', '爱情里尽量浪漫痛快'],
  ['012.十字街头筑隐居.txt', 5, '人格', '不因毁谤失风度'],
  ['012.十字街头筑隐居.txt', 37, '写作', '书信可成日后史料'],
  ['013.所谓“黄色”.txt', 5, '写作', '情色书写也要坦白'],
  ['013.所谓“黄色”.txt', 6, '人格', '拒绝不清白合作'],
  ['014.明归何处.txt', 9, '方法', '不把前途绑在成就'],
  ['014.明归何处.txt', 12, '人格', '支持幽默中的穷快乐'],
  ['015.小舟之逝，从此始矣！.txt', 13, '人格', '人格完整最重要'],
  ['015.小舟之逝，从此始矣！.txt', 18, '情爱', '爱情不能改换本色'],
  ['015.小舟之逝，从此始矣！.txt', 19, '人格', '去留自有标准'],
  ['017.过渡时期的爱情观.txt', 6, '写作', '记下丑恶以警醒自尊'],
  ['017.过渡时期的爱情观.txt', 8, '情爱', '恋爱不可自欺'],
  ['017.过渡时期的爱情观.txt', 15, '情爱', '恨可以抵制盲爱'],
  ['017.过渡时期的爱情观.txt', 18, '情爱', '恋爱前后都要睁眼'],
  ['018.譬如赤子.txt', 6, '人格', '赤子之心是坦白幼稚'],
  ['018.譬如赤子.txt', 14, '人格', '赤子凭直觉感情看人世'],
  ['020.真正的自由恋爱者.txt', 6, '情爱', '自由恋爱者善待来去'],
  ['020.真正的自由恋爱者.txt', 10, '方法', '理论必须能实行'],
  ['020.真正的自由恋爱者.txt', 11, '人格', '英雄要硬得起来'],
  ['021.只消捡起一块石头.txt', 3, '文化', '传统要接受理性审查'],
  ['021.只消捡起一块石头.txt', 5, '方法', '不可与言即不与言'],
  ['021.只消捡起一块石头.txt', 6, '人格', '沉默是不把注意给俗人'],
  ['021.只消捡起一块石头.txt', 17, '人格', '敢于得罪社会'],
  ['021.只消捡起一块石头.txt', 18, '方法', '思想超人化行为俗人化'],
  ['021.只消捡起一块石头.txt', 20, '方法', '活在今天准备明天'],
  ['022.桃花路上.txt', 5, '情爱', '爱情能是天堂也能是坟墓'],
  ['022.桃花路上.txt', 7, '情爱', '抗拒旧情感毒素'],
  ['022.桃花路上.txt', 10, '方法', '事实未明不要急骂'],
  ['023.寡情如此.txt', 18, '人格', '昙花只贵开一次'],
  ['023.寡情如此.txt', 20, '人格', '别人看见的是旧投影'],
  ['024.不知情绪为何物.txt', 6, '情爱', '旧爱成了影子的影子'],
  ['027.为前信进一解.txt', 7, '情爱', '旧爱崩溃也是精神刺激'],
  ['027.为前信进一解.txt', 8, '方法', '善战者不轻用力'],
  ['027.为前信进一解.txt', 11, '人格', '承认自身多变'],
  ['028.“捐书谢俗议”.txt', 5, '方法', '俗议无须解释'],
  ['029.黄狗与疯狗.txt', 3, '知识', '每天应埋头学问'],
  ['038.林语堂演说.txt', 4, '人格', '独乐人乐的滑稽态度'],
  ['040.伪自由主义者林瘟生.txt', 2, '政治', '假自由主义欺世盗名'],
  ['043.非“痴”.txt', 11, '情爱', '知己才值得用情'],
  ['043.非“痴”.txt', 19, '人格', '以直相报'],
  ['043.非“痴”.txt', 20, '情爱', '感情相称才不痴'],
  ['043.非“痴”.txt', 23, '情爱', '爱情容易发明狂想'],
  ['045.非“痴”又一章.txt', 2, '情爱', '鸵鸟式恋爱逃避现实'],
  ['045.非“痴”又一章.txt', 3, '方法', '换角度洗心换脑'],
  ['045.非“痴”又一章.txt', 9, '人格', '正视现实不是怯懦'],
  ['045.非“痴”又一章.txt', 10, '方法', '一次震荡换取清醒'],
  ['045.非“痴”又一章.txt', 11, '方法', '假定价值要接受透视'],
  ['045.非“痴”又一章.txt', 12, '人格', '学问不救人品'],
  ['045.非“痴”又一章.txt', 23, '知识', '时时研究感兴趣问题'],
  ['045.非“痴”又一章.txt', 28, '写作', '默思录和札记必须勤写'],
  ['048.女孩子哪里有这么大的抗酵素？.txt', 6, '方法', '生活能过好幻想也可调剂'],
  ['048.女孩子哪里有这么大的抗酵素？.txt', 7, '情爱', '感情受环境现实影响'],
  ['049.好多个“最后一次”.txt', 10, '方法', '留学打算应一心一意'],
  ['049.好多个“最后一次”.txt', 11, '情爱', '最后一次不该反复'],
  ['050.一封没写完的信.txt', 4, '文化', '思想传播依赖经济基础'],
  ['050.一封没写完的信.txt', 5, '文化', '文化人经营书店有本质差异'],
  ['050.一封没写完的信.txt', 10, '方法', '赚钱可资助文化事业'],
  ['051.跋《给马戈的五十封信》.txt', 9, '人格', '友情疏淡证明有人进步'],
  ['051.跋《给马戈的五十封信》.txt', 10, '文化', '知识人的普遍苦闷'],
  ['051.跋《给马戈的五十封信》.txt', 11, '写作', '清谈救国是书生报国'],
  ['051.跋《给马戈的五十封信》.txt', 12, '人格', '顽固完成早年人生方式'],
  ['051.跋《给马戈的五十封信》.txt', 13, '写作', '旧信保存思想演化痕迹'],
];

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphsOf(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^《[^》]+》/u, bookTitle).replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'.,，。！？、：；;\s]+/g, '')
    .slice(0, 18);
}

function makeKeywords(category, title, sourceFile) {
  return [...new Set([category, cleanKeyword(title), cleanKeyword(fileTitle(sourceFile))].filter(Boolean))].join(',');
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const seen = new Map();
  for (const record of master.records ?? []) {
    const normalized = normalizeText(record.description);
    if (normalized) seen.set(normalized, record.id);
  }
  return seen;
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

const existingDescriptions = loadExistingDescriptions();
const seenInBook = new Map();
const skippedDuplicates = [];
let nextRecordNumber = 1;

const records = candidates.flatMap(([sourceFile, paragraphNumber, category, title]) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceFile}:${paragraphNumber}`);
  }

  const paragraphs = sourceParagraphs(sourceFile);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  const normalized = normalizeText(description);
  const existingId = existingDescriptions.get(normalized);
  const inBookId = seenInBook.get(normalized);
  if (existingId || inBookId) {
    skippedDuplicates.push({
      sourceFile,
      paragraphNumber,
      title,
      duplicateOf: existingId ?? inBookId,
    });
    return [];
  }

  const id = `LAT${String(bookSeq).padStart(3, '0')}-${String(nextRecordNumber).padStart(3, '0')}`;
  nextRecordNumber += 1;
  seenInBook.set(normalized, id);

  return [
    {
      id,
      book: bookTitle,
      round,
      status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: paragraphNumber,
      source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(category, title, sourceFile),
    },
  ];
});

const outputBook = {
  ...book,
  record_count: records.length,
  candidate_count: candidates.length,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: categoryCounts(records),
};

const payload = {
  generated_at: new Date().toISOString(),
  book: outputBook,
  taxonomy,
  records,
  skipped_duplicates: skippedDuplicates,
};

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);

const markdown = [
  `# ${bookTitle}思想索引（提取轮）`,
  '',
  `- 书名：${bookTitle}`,
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 条目数：${records.length}`,
  `- 候选数：${candidates.length}`,
  `- 跳过重复：${skippedDuplicates.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 索引',
  '',
  ...records.map((record) =>
    [
      `### ${record.id} ${record.title}`,
      '',
      `- 分类：${record.category}`,
      `- 来源：${record.source_file}#${record.source_paragraph}`,
      '',
      record.description,
      '',
    ].join('\n'),
  ),
].join('\n');

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), markdown, 'utf8');
fs.writeFileSync(
  path.join(outputDir, '思想索引.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引.csv'), records);
fs.writeFileSync(
  path.join(outputDir, '思想索引.txt'),
  records
    .map((record) =>
      [
        `${record.id}｜${record.category}｜${record.title}`,
        `来源：${record.source_file}#${record.source_paragraph}`,
        record.description,
      ].join('\n'),
    )
    .join('\n\n'),
  'utf8',
);

const note = [
  `# ${bookTitle}提取说明`,
  '',
  `本轮从源目录 \`${sourceBookDir.replaceAll(path.sep, '/')}\` 提取。`,
  '',
  '取舍原则：',
  '',
  '- 保留书信中可独立检索的史料意识、写作方法、情爱判断、人格自持、知识研究、文化实践、政治批判等原文段落。',
  '- 删除纯问候、通讯地址、私人笑闹、单纯诗句、制作信息和需要大量上下文才能成立的琐事。',
  '- 标题可浓缩，description 保留源文本原段落，不改写。',
  '',
  '分类说明：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  `候选 ${candidates.length} 条，生成 ${records.length} 条，跳过重复 ${skippedDuplicates.length} 条。`,
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(`Built ${bookTitle}: ${records.length} records.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
if (skippedDuplicates.length) {
  console.log(`Skipped duplicates: ${skippedDuplicates.length}`);
}
