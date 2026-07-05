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
  .find((name) => name.startsWith('002.'));
const sourceDir = path.join(rootDir, sourceRoot, interviewGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '054.李敖书序集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '054',
  title: '李敖书序集',
  slug: 'leeao-shuxuji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书序集》二十篇书序、推荐文和题记中提取思想索引。description 保留源文本原段落；目录、制作尾注、纯书目资料、纯人物履历、外部附录长序和没有李敖判断的长引不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['政治', '001', 7, '权术双令', '蒋介石,公开指示,秘密指示'],
  ['知识', '001', 34, '校史夺功', '淡江英专,校史改编,历史真相'],
  ['人格', '001', 50, '事业殉道', '居瀛玖,殉道,事业'],
  ['人格', '001', 54, '声讨弱息', '欺凌弱息,声讨,正义'],
  ['文化', '001', 55, '孝义蒙羞', '国民党,伦理道德,样板'],
  ['法权', '001', 59, '杀共恶法', '共产党,法律,惩治叛乱'],
  ['政治', '001', 69, '国共入家', '国共斗争,亲人分野,乱世'],
  ['政治', '001', 78, '党国圈圈', '国民党,生殖器关系,少爷'],
  ['人格', '001', 93, '死友情谊', '死友,遗著,旧道德'],
  ['知识', '002', 3, '积非成是', '汪政权,历史,禁书'],
  ['人格', '002', 7, '收尸义士', '金雄白,死友,公道'],
  ['知识', '003', 3, '教育体制', '法律专修科,司法行政部,大学'],
  ['人格', '003', 4, '破釜兴趣', '退学,重考,兴趣'],
  ['法权', '003', 10, '恶法作业', '恶法录,国民党,批判'],
  ['人格', '003', 11, '富贵靠边', '陆啸钊,文星,取舍'],
  ['法权', '003', 16, '以法贾祸', '陆啸钊,恶法,干禄'],
  ['知识', '004', 21, '实录识中', '紫禁城的黄昏,实录,认识中国'],
  ['知识', '004', 30, '活的现代史', '溥仪,现代史,时代记录'],
  ['方法', '004', 31, '订正译本', '查证,订正,引据'],
  ['方法', '006', 3, '趁热成史', '满宫残照记,调查,史料'],
  ['知识', '006', 22, '刻板有趣', '满宫残照记,史料,宫中秘闻'],
  ['文化', '006', 25, '兴亡剖面', '满洲国,兴亡,人世'],
  ['政治', '007', 18, '异议成敌', '调查局,政治暗流,敌人'],
  ['政治', '007', 20, '同志变谍', '蒋经国,李世杰,匪谍'],
  ['法权', '007', 22, '死刑夜惊', '死刑犯,军法看守所,恐怖'],
  ['政治', '007', 28, '干部谎言', '蒋经国,干部政策,谎话'],
  ['写作', '007', 29, '刑余成书', '李世杰,史记,牢狱'],
  ['政治', '008', 3, '晚年武器', '李宗仁,回归大陆,回忆录'],
  ['方法', '008', 4, '口述成书', '唐德刚,口述历史,结构'],
  ['写作', '008', 5, '完整版本', '李宗仁回忆录,盗印,出版'],
  ['方法', '009', 3, '传记功力', '汪精卫传,史料,脚注'],
  ['写作', '009', 4, '谴责败笔', '传记,谴责语句,主观'],
  ['方法', '009', 5, '义愤不科学', '义愤,历史唯物主义,研究'],
  ['方法', '009', 6, '复杂心迹', '汪精卫,复杂人物,追寻'],
  ['人格', '010', 2, '洗面革心', '雷震,沈醉,反省'],
  ['人格', '010', 3, '道义改过', '沈醉,乔家才,新道德'],
  ['写作', '010', 4, '出书张义', '沈醉,军统内幕,正义'],
  ['方法', '010', 6, '存真慎改', '军统内幕,订正,存真'],
  ['知识', '011', 3, '中国书病', '中国书,奇见,独立见解'],
  ['文化', '011', 4, '讽世破立', '李宗吾,厚黑学,讽世'],
  ['知识', '011', 5, '思想革命', '李宗吾,思想革命,特立独行'],
  ['写作', '011', 6, '死友成书', '张默生,厚黑教主传,禁书'],
  ['政治', '012', 3, '蒋刚伐桂', '毛泽东,蒋介石,桂系'],
  ['政治', '012', 4, '蒋氏内斗', '杨虎城,蒋介石,国民党'],
  ['写作', '012', 5, '两件武器', '李宗仁,回忆录,回归大陆'],
  ['方法', '012', 7, '知人善任', '李宗仁,程思远,人才'],
  ['写作', '013', 4, '谴责使命', '谴责小说,国民党,官场'],
  ['写作', '013', 5, '不媚世', '小说,媚世,逃世'],
  ['人格', '013', 6, '善恶爱憎', '大风,蒋党,同情'],
  ['方法', '013', 7, '小说成史', '新官场现形记,小说,历史'],
  ['写作', '013', 8, '义愤谐谑', '谴责小说,滑稽,义愤'],
  ['知识', '014', 3, '行家眼力', '万大鋐,国共斗争,作品'],
  ['人格', '014', 6, '特务觉悟', '万大鋐,觉悟,立德'],
  ['写作', '015', 2, '小异大同', '鹰犬将军,台湾新版,两岸'],
  ['写作', '015', 3, '配图责任', '图片,责任,新版'],
  ['方法', '015', 4, '附录取舍', '附录,补充正文,选定'],
  ['方法', '015', 5, '校勘疑义', '校阅,疑义,答复'],
  ['方法', '015', 20, '旁证定误', '罗开甲,刘秉哲,旁证'],
  ['政治', '016', 2, '奸雄真伪', '毛泽东,蒋介石,奸雄'],
  ['方法', '016', 3, '侍从观人', '侍从,英雄,回忆'],
  ['方法', '017', 3, '仆从见真', '蒙田,仆从,主人'],
  ['方法', '017', 4, '大陆派真', '蒋介石,侍卫官,大陆派'],
  ['方法', '017', 5, '拒绝捧史', '俞济时,台湾派,丑史'],
  ['知识', '018', 4, '哲学棒喝', '梁漱溟,哲学家,熊十力'],
  ['人格', '018', 5, '骨气知识人', '梁漱溟,教育家,知识分子'],
  ['知识', '019', 2, '史家正义', '汪荣祖,历史学者,正义感'],
  ['人格', '019', 6, '学问正义', '章太炎,学问,正义感'],
  ['知识', '019', 8, '抬出埋没', '章太炎,国民党,研究'],
  ['人格', '019', 9, '不合时宜', '知识分子,陈炯明,公道'],
  ['知识', '019', 10, '研究昭来', '研究往史,范本,正义'],
  ['政治', '020', 2, '官方文证', '李登辉,安全局文件,文证'],
  ['方法', '020', 7, '汇编失收', '匪案汇编,失收,查证'],
  ['方法', '020', 10, '统计证伪', '匪案,戒严,统计'],
  ['方法', '020', 11, '官样套语', '匪案汇编,官方套语,其他文献'],
  ['法权', '020', 17, '个案冤狱', '周芝雨,个案详追,冤狱'],
  ['法权', '020', 28, '美貌成罪', '黄氏姐妹,孙立人,陷害'],
  ['法权', '020', 45, '前科未平', '六月雪,黄氏姐妹,冤狱'],
  ['方法', '020', 47, '死字典', '个案详追,万宝囊,死字典'],
  ['法权', '020', 50, '口舌死刑', '军法,死刑,言论'],
  ['法权', '020', 59, '酷吏接力', '军法,特务,李元簇'],
  ['方法', '020', 60, '原状影印', '秘密文件,影印,保护来源'],
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
    if (record.id?.startsWith('LAT054-')) continue;
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
  seenCurrent.set(normalized, `${key} P${paragraphNumber}`);
  keptCandidates.push({ category, key, paragraphNumber, title, keywords, fileName, description });
}

const records = keptCandidates.map((item, index) => ({
  id: `LAT054-${String(index + 1).padStart(3, '0')}`,
  book: book.title,
  round: book.round,
  status: book.status,
  category: item.category,
  title: item.title,
  description: item.description,
  source_file: item.fileName,
  source_paragraph: item.paragraphNumber,
  source_path: path.relative(rootDir, path.join(sourceDir, item.fileName)).replaceAll(path.sep, '/'),
  keywords: item.keywords,
}));

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    record_count: records.length,
  },
  taxonomy,
  records,
  extraction: {
    candidate_count: candidateEntries.length,
    skipped_duplicates: skipped,
    principles: [
      'description 保留源文本原段落，不改写为总结。',
      '优先保留李敖在书序中形成明确判断的段落：历史方法、出版责任、政治评价、法权批判、知识人风骨。',
      '不收目录、制作尾注、纯版本资料、纯人物履历、外部附录长序和没有李敖判断的长引。',
      '《李宗仁回忆录》一篇中唐德刚附录长序未作为李敖思想条目处理。',
    ],
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
  '# 《李敖书序集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跳过重复：${skipped.length}`,
  '',
  '## 提取原则',
  '',
  ...payload.extraction.principles.map((item) => `- ${item}`),
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

if (skipped.length) {
  noteLines.push('## 跳过重复');
  noteLines.push('');
  for (const item of skipped) {
    noteLines.push(
      `- ${item.key} P${item.paragraphNumber} ${item.title}：重复于 ${item.duplicateOf}`,
    );
  }
  noteLines.push('');
}

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built 054.李敖书序集: ${records.length} records. ` +
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
