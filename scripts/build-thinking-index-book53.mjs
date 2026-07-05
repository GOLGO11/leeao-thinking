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
  .find((name) => name.startsWith('001.'));
const sourceDir = path.join(rootDir, sourceRoot, interviewGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '053.李敖报刊集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '053',
  title: '李敖报刊集',
  slug: 'leeao-baokanji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖报刊集》十八篇报刊序跋、发刊词、停刊告白和编辑室报告材料中提取思想索引。description 保留源文本原段落；目录、题名、外部附录、纯资料说明、单纯人物介绍和群制作者尾注不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['写作', '001', 27, '翻译再造', '莎士比亚,翻译,再创造'],
  ['人格', '001', 29, '信念兑现', '梁实秋,翻译,锲而不舍'],
  ['知识', '001', 39, '论学无情', '傅斯年,学术辩论,乡愿'],
  ['法权', '001', 54, '把人当人', '海耶克,自由,人性'],
  ['政治', '001', 57, '权力分散', '古尔塞勒,分权,民主传统'],
  ['写作', '001', 62, '作家挑战', '琼瑶,媚世,现实'],
  ['知识', '001', 70, '证据修正', '费正清,证据,观点'],
  ['人格', '001', 74, '狂狷之道', '史怀哲,巴鲁克,狂狷'],
  ['法权', '001', 90, '司法革新', '司法改革,现身说法,法理'],
  ['法权', '001', 94, '批评恶法', '法治,法律批评,恶法'],
  ['法权', '001', 96, '自白慎刑', '自白定罪,慎刑,人权'],
  ['法权', '001', 99, '类推死刑', '火场双尸案,类推,死刑'],
  ['法权', '001', 102, '观念扎刀', '人权,法律,基本观念'],
  ['法权', '001', 104, '宗教批评', '宗教自由,言论自由,判断'],
  ['法权', '001', 109, '执法守法', '非法逮捕,非法拘禁,权利保障'],
  ['法权', '001', 110, '宪法入生活', '宪法,人民权利,生活'],
  ['政治', '001', 116, '政治强奸学术', '苏俄,学术,政治'],
  ['法权', '001', 130, '非法证据', '秘密通讯,非法证据,权利'],
  ['法权', '001', 131, '自由权利', '自由,权利,相对性'],
  ['情爱', '001', 141, '公开谈性', '性,公开讨论,认识'],
  ['法权', '001', 143, '禁书标准', '禁书,煽动犯罪,出版自由'],
  ['法权', '001', 145, '社会过滤', '禁书,读者选择,政府禁止'],
  ['法权', '001', 151, '言论实践', '言论自由,社会进步,民主'],
  ['政治', '001', 156, '自由讨论', '民主社会,公平竞争,失败'],
  ['方法', '001', 158, '方法学训练', '方法学,知识界,思想界'],
  ['政治', '001', 164, '思想反共', '海耶克,反共,思想训练'],
  ['文化', '001', 166, '文星使命', '文星,新思潮,新文化'],
  ['知识', '001', 169, '中文系脓疮', '中文系,高等教育,义和团'],
  ['文化', '001', 171, '五四断奶', '五四,现代文艺,新文学'],
  ['文化', '001', 175, '传统绊脚', '传统思想,现代化,文化惰性'],
  ['方法', '001', 182, '冷静中西', '中西文化,冷静讨论,门户之见'],
  ['文化', '001', 186, '传统鸵鸟', '传统,伪君子,现代化'],
  ['写作', '001', 197, '杂志风格', '文星,严肃精神,低级趣味'],
  ['法权', '002', 9, '因义受难', '言论出版自由,迫害,思想自由史'],
  ['法权', '002', 10, '中国曾格', '萧孟能,出版自由,历史地位'],
  ['政治', '004', 3, '政治染真', '杂志,政治挂帅,真理'],
  ['文化', '004', 4, '思想挂帅', '文星,思想挂帅,中国思想'],
  ['政治', '004', 6, '思想领导政治', '思想,政治,现代化'],
  ['方法', '004', 7, '不受人惑', '独立思想,文星,不受人惑'],
  ['写作', '005', 8, '个人杂志', '河上肇,个人杂志,思想界'],
  ['方法', '005', 25, '名词之争', '名词,争论,判断'],
  ['法权', '005', 28, '技术击倒', '出版法,杂志执照,自由代价'],
  ['政治', '005', 32, '防口甚防川', '言论封锁,国民党,内患外患'],
  ['法权', '006', 15, '书籍绕禁', '出版法,书籍类,新闻纸类'],
  ['人格', '006', 21, '斗而不变', '斗争,坚定,不改本色'],
  ['法权', '006', 26, '政治法律化', '政治问题,法律解决,斗倒'],
  ['写作', '006', 31, '黑牢越狱', '千秋评论,黑牢,出版'],
  ['写作', '006', 32, '每月一书', '千秋评论,每月一书,查禁'],
  ['写作', '006', 34, '以文会友', '万岁评论,朋友,理想主义'],
  ['人格', '006', 36, '生活发愤', '死硬派,发愤,生活'],
  ['法权', '007', 3, '查禁九成', '万岁评论,查禁,言论自由'],
  ['写作', '007', 7, '开放千秋', '千秋评论,万岁评论,出拳'],
  ['知识', '008', 4, '期期训诂', '史记,柏杨,文言翻译'],
  ['写作', '008', 6, '纪录抗议', '千秋评论,揭发,抗议'],
  ['写作', '009', 4, '狱中锦囊', '千秋评论,狱中写作,秘密稿件'],
  ['政治', '009', 5, '文字打魔', '千秋评论,国民党,查禁'],
  ['写作', '009', 9, '十年血书', '千秋评论,停刊,血书'],
  ['法权', '010', 3, '朝言论夕入狱', '乌鸦评论,杂志执照,言论'],
  ['人格', '010', 4, '废墟小希望', '劳伦斯,废墟,希望'],
  ['写作', '010', 5, '谴责杂志', '乌鸦评论,谴责,不媚世'],
  ['法权', '012', 4, '争取新闻自由', '求是报,报禁,新闻自由'],
  ['政治', '013', 10, '钳制变形', '新华日报,求是报,国民党'],
  ['政治', '013', 11, '异己报纸', '共产党,新闻自由,异己'],
  ['写作', '013', 12, '一张报南针', '求是报,办报,中国前途'],
  ['政治', '013', 19, '打倒之后', '求是报,中国,政治抱负'],
  ['写作', '015', 5, '重质不重多', '求是报,报纸篇幅,质量'],
  ['人格', '015', 6, '发行负责', '求是报,发行人,责任'],
  ['知识', '015', 8, '开报有益', '求是报,知识,启蒙'],
  ['知识', '016', 5, '媒体命名常识', '新闻史,个人命名,媒体'],
  ['方法', '016', 8, '述往知来', '历史方法,前科方法,揭发'],
  ['方法', '016', 14, '旧文新刊', '旧文新刊,真理重复,查禁'],
  ['方法', '016', 17, '扒粪方法', '扒粪,历史,新闻'],
  ['写作', '016', 20, '丈夫报', '求是报,无党无派,批判'],
  ['文化', '017', 3, '文化沙漠', '报禁,文化沙漠,报纸'],
  ['写作', '017', 4, '言论不干涉', '求是报,办报,言论自由'],
  ['写作', '017', 8, '每月干权', '求是评论,国民党,月刊'],
  ['写作', '018', 3, '主力取舍', '小说,中国思想史,杂志'],
  ['写作', '018', 4, '一家之言', '求是评论,真理,无党派'],
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
    if (record.id?.startsWith('LAT053-')) continue;
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
  id: `LAT053-${String(index + 1).padStart(3, '0')}`,
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
      '本书优先收录办刊写作、出版法与言论自由、司法法权、知识方法、文化批评、政治压迫和人格取舍等能独立呈现李敖判断的段落。',
      '目录、题名、外部附录、纯资料说明、单纯人物介绍、编辑性过渡语和群制作者尾注不收。',
      '001〈李敖与“编辑室报告”〉中保留思想判断清楚的编辑室报告段落；后记提示的作者归属问题留待校对轮继续压缩。',
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
  '# 《李敖报刊集》思想索引提取说明',
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
  '本轮覆盖《李敖报刊集》十八篇材料，重点提取李敖围绕报刊、杂志、言论出版自由、出版法钳制、文星路线、求是报与千秋评论实践所形成的思想索引。提取粒度以原文自然段为准，标题只做检索压缩，description 不改写。',
  '',
  '001〈李敖与“编辑室报告”〉段落多且后记提示作者归属曾有“陆冠李戴”问题，本轮只保留思想判断清晰、与李敖主编《文星》路线高度相关的段落，纯封面人物介绍和过渡说明不收，后续校对轮可继续压缩。',
  '',
  '外部附录、目录、题名、纯资料说明、作者不明而思想判断较弱的段落、纯出版事务流水和群制作者尾注不收。',
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
