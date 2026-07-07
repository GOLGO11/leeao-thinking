import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 80;
const bookTitle = '中国艺术新研';
const round = '提取轮';
const status = '待校对';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('009.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('011.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zhongguo-yishu-xinyan',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《中国艺术新研》的周越书法史断层、艺术真迹考证、故宫文物归属与治理、官方史料窜改、收藏品图说、董小宛手卷与许地山论书法中提取思想索引。description 保留源文本原段落；纯材料引文、脚注、日期、电子书页脚和非李敖判断段落不直接转为思想索引。',
};

const candidates = [
  ['001.', 29, '方法', '同时代题跋最有证据价值'],
  ['001.', 30, '方法', '避讳细节可判定艺术年代'],
  ['001.', 31, '文化', '王著书法承前启后却毁于兵灾'],
  ['001.', 36, '方法', '权威想当然会误判真迹存亡'],
  ['001.', 39, '方法', '石刻留存不能替代真迹'],
  ['001.', 42, '文化', '字太好也会招来散佚'],
  ['001.', 43, '方法', '两岸故宫皆无更显唯一性'],
  ['001.', 45, '文化', '周越跋是举世唯一绝品'],
  ['001.', 46, '文化', '乱世使附属题跋独立流传'],
  ['001.', 50, '方法', '民间记录可补宫廷著录'],
  ['001.', 53, '方法', '材质研究可旁证真迹'],
  ['001.', 56, '文化', '宋四家前书法断层不合进化'],
  ['001.', 57, '方法', '作品亡佚和不读古书造成忽略'],
  ['001.', 58, '知识', '正史寥寥会遮蔽书法大家'],
  ['001.', 78, '文化', '周越书风影响苏轼所见'],
  ['001.', 81, '方法', '俗气评价会以耳代目'],
  ['001.', 89, '方法', '流风年代可解释师承影响'],
  ['001.', 106, '方法', '传世史料可印证墨迹故事'],
  ['001.', 107, '方法', '称臣对象可辅助断代'],
  ['001.', 116, '方法', '钤印题诗可证明流传'],
  ['001.', 118, '文化', '真迹重现可补艺术史断层'],

  ['002.', 2, '文化', '国宝灾变还有现代新厄'],
  ['002.', 3, '政治', '一九四九形成国宝断代'],
  ['002.', 4, '文化', '国宝沉浮需要哲理解释'],
  ['002.', 7, '文化', '幸存周跋可改写艺术史'],
  ['002.', 8, '文化', '跳过前辈不合书法进化'],
  ['002.', 9, '文化', '重要前辈会被历史忽略'],
  ['002.', 10, '文化', '宋人早知周越影响力'],
  ['002.', 11, '写作', '学术定位不能回避批评'],
  ['002.', 12, '方法', '后学可纠正老师并扩展研究'],
  ['002.', 14, '方法', '一件真迹可破解印文公案'],
  ['002.', 16, '文化', '唯一和最早构成文物价值'],
  ['002.', 20, '方法', '周越墨迹确立承上启下新说'],
  ['002.', 27, '法权', '匿名外审必须具名可公开'],
  ['002.', 32, '人格', '不为审查委曲自己'],
  ['002.', 37, '写作', '国家出版胡来不能护航'],
  ['002.', 39, '方法', '删改原文会制造伪引文'],
  ['002.', 44, '政治', '官方笑料常是惯技'],
  ['002.', 45, '法权', '权威人物当然可以批评'],
  ['002.', 46, '法权', '大学删批评侵犯学术自由'],
  ['002.', 48, '法权', '解聘不能等于封笔'],
  ['002.', 51, '方法', '问卷可逼出审查立场'],
  ['002.', 53, '政治', '官方解释权会败坏学风'],
  ['002.', 58, '方法', '照片删人也是史料窜改'],
  ['002.', 64, '政治', '暗杀史实会被曲笔遮掩'],
  ['002.', 79, '政治', '亲共记录会被改成反共'],
  ['002.', 83, '政治', '亲苏电文会被删去'],
  ['002.', 93, '情爱', '好色记录也会被删改'],
  ['002.', 95, '政治', '国民党血统会被政治改写'],
  ['002.', 114, '政治', '特务也会被包装成先烈'],
  ['002.', 118, '方法', '历史典故不能一典双用'],

  ['003.', 6, '政治', '台湾故宫文物是窃国赃物'],

  ['004.', 2, '文化', '博物馆不应舍己田耘人田'],
  ['004.', 3, '法权', '博物馆展览要有法律根据'],
  ['004.', 5, '政治', '自家宝物应开放给国人'],
  ['004.', 8, '方法', '举世唯一真迹不能看都不看'],
  ['004.', 9, '法权', '避嫌说必须列明来源'],
  ['004.', 10, '法权', '古物主管不应私藏古物'],
  ['004.', 11, '法权', '机关首长须对贪渎负责'],
  ['004.', 16, '政治', '长期恋栈应面对任期制'],
  ['004.', 17, '知识', '博物院长要有学术著作证明'],
  ['004.', 18, '方法', '出版人名次序须有学术标准'],
  ['004.', 21, '法权', '白纸黑字的移交不能耍赖'],

  ['005.', 5, '人格', '亡国遗民的不合作很了不起'],
  ['005.', 6, '政治', '不合作也需要现实本钱'],
  ['005.', 7, '情爱', '男人悼亡写作冒襄第一'],
  ['005.', 8, '情爱', '乱世中仍有琴韵书声'],
  ['005.', 21, '方法', '年龄考订未必穷尽生离解释'],
  ['005.', 25, '文化', '佳人之才也可观'],
  ['005.', 26, '情爱', '艺术品可使乱世情鸳重逢'],

  ['006.', 2, '文化', '文徵明有不禁摹本的宽大'],
  ['006.', 4, '方法', '写字要像用笔打仗'],
  ['006.', 6, '人格', '有我则无古人'],
  ['006.', 7, '方法', '看帖不摹才不俗'],
  ['006.', 9, '方法', '反复临写仍要自己创派'],
  ['006.', 12, '方法', '内府条件不等于古碑功力'],
  ['006.', 15, '方法', '刚健之外还需婀娜'],
  ['006.', 20, '政治', '政治不自由中仍有书法自由'],
  ['006.', 21, '文化', '个人书法可影响异国风气'],
  ['006.', 22, '方法', '临气不临形才有变法'],
  ['006.', 24, '知识', '研究眼光不该以中国为中心'],
  ['006.', 26, '人格', '从先知沦为反动派仍独行其是'],
  ['006.', 39, '政治', '专制时代也能以草书终生'],
  ['006.', 41, '政治', '汉奸评价不能全盘抹杀书法'],
  ['006.', 42, '方法', '刻意求工会愈写愈做作'],
  ['006.', 46, '人格', '艺术第一不抵人格败德'],
  ['006.', 49, '方法', '写生可给山水新生命'],
  ['006.', 52, '文化', '小名画家也会被大名埋没'],
  ['006.', 53, '政治', '伪刻也能暴露党国作伪'],
  ['006.', 55, '文化', '现实写生可革命国画'],
  ['006.', 58, '方法', '无款无印不是作品缺点'],
  ['006.', 59, '情爱', '爱男人反而能客观画女人'],

  ['007.', 3, '方法', '艺术价值在创造而非熟巧'],
  ['007.', 4, '文化', '求名人字多为社交借重'],
  ['007.', 5, '文化', '逼青年练字是浪费生命'],
  ['007.', 6, '知识', '许地山论书法是脱俗之言'],
];

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/^\uFEFF/, '');
}

function paragraphsOf(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalizeText)
    .filter(Boolean);
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’!?.,，。！？、：；（）()\s]+/g, '')
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
    if (record.book === bookTitle) continue;
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

const records = candidates.flatMap(([sourceRef, paragraphNumber, category, title]) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceRef}:${paragraphNumber}`);
  }

  const sourceFile = resolveSourceFile(sourceRef);
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
  '- 保留可独立检索的书法史断层判断、真迹鉴别方法、博物馆制度批评、官方史料窜改、收藏品评价、乱世情爱判断与书法艺术观。',
  '- 删除纯材料引文、脚注、日期、电子书页脚和非李敖判断段落。',
  '- 对收藏图说保留带有方法、人格、政治或文化判断的段落；标题可浓缩，description 保留源文本原段落，不改写。',
  '',
  '分类统计：',
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
