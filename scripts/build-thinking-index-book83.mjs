import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 83;
const bookTitle = '李敖秘密书房';
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
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('003.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'leeao-secret-study',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖秘密书房》一百三十八个节目正文中提取思想索引。取舍以李敖自己的判断段落为主，优先保留书房资料方法、历史证据意识、知识分子人格、宗教文化批判、政治与法权判断、写作观和情爱观；对纯节目串场、来宾长段、短问答、重复爆料和缺少李敖判断的材料从严剔除。标题用于浓缩检索，description 保留源文本原段落。',
};

const candidates = [
  ['001.', 5, '方法', '资料秩序保障检索效率'],
  ['002.', 13, '政治', '小党也会有残忍纪律'],
  ['003.', 8, '法权', '宪法不能为个人乱修'],
  ['004.', 13, '知识', '学问不能靠身份装饰'],
  ['005.', 8, '政治', '革命功劳常被后来者通吃'],
  ['006.', 3, '知识', '书房打开精神世界'],
  ['007.', 9, '政治', '台湾不是郑成功的终点'],
  ['008.', 9, '政治', '小宗教可能滚成政治力量'],
  ['009.', 12, '文化', '艺术品要靠阐释变活'],
  ['010.', 11, '人格', '知识分子要反抗黑暗'],
  ['011.', 9, '政治', '体制好人只能延缓崩坏'],
  ['012.', 8, '方法', '时间要用在最该用处'],
  ['013.', 11, '人格', '年轻思想者要建立真实定位'],
  ['014.', 7, '文化', '不可知论应保持科学稳健'],
  ['015.', 4, '人格', '逃离错误轨道也是勇气'],
  ['016.', 10, '政治', '权力核心靠关系吸纳'],
  ['017.', 12, '写作', '文学奖也是为中国作品讨公道'],
  ['018.', 11, '法权', '言论自由要靠辩论能力支撑'],
  ['019.', 13, '知识', '经典处理需要相称能力'],
  ['020.', 10, '法权', '司法改革要从根上救起'],
  ['021.', 10, '政治', '科技人才要回向国家'],
  ['022.', 11, '知识', '唯物史观不是科学'],
  ['023.', 11, '政治', '投奔自由叙事会掩盖私人动机'],
  ['024.', 7, '政治', '鲁迅被过分政治化'],
  ['025.', 10, '情爱', '胡适被旧式婚姻困住'],
  ['026.', 7, '人格', '圣人可以有为而成'],
  ['027.', 9, '知识', '好词会被后来者偷换概念'],
  ['028.', 10, '写作', '知识分子要用人民语言表达'],
  ['029.', 8, '政治', '先驱者离国后仍会被重新定位'],
  ['030.', 10, '知识', '胡适博士身份也要查证'],
  ['031.', 14, '政治', '爱国不能压倒新文化约定'],
  ['032.', 5, '方法', '照片经说明才有立体意义'],
  ['033.', 8, '人格', '放任教育也可尊重孩子'],
  ['034.', 10, '知识', '新文化请来世界思想家'],
  ['035.', 8, '方法', '名册材料能识破冒充履历'],
  ['036.', 3, '方法', '玩历史就是玩资料'],
  ['037.', 10, '政治', '密件可看见权力犬群结构'],
  ['038.', 9, '政治', '政治运用常有历史模板'],
  ['039.', 8, '政治', '一党专政会把决策藏起来'],
  ['040.', 10, '政治', '台湾繁荣来自劫贫济富'],
  ['041.', 9, '写作', '政治气氛会逼文学过度解释'],
  ['042.', 10, '人格', '揭黑暗不应被当事人遗忘'],
  ['043.', 3, '方法', '历史图片要同经验串联'],
  ['044.', 6, '文化', '迷信骗子也需要形象包装'],
  ['045.', 9, '文化', '台湾本土文化根源在中原'],
  ['046.', 15, '人格', '戴高乐理性又彆扭'],
  ['047.', 17, '人格', '英雄在懦弱时代仍作战'],
  ['048.', 3, '人格', '佩服人物要抓住一生特色'],
  ['049.', 16, '政治', '任用部长就要授予责任'],
  ['050.', 3, '方法', '事件解释要靠资料证据'],
  ['051.', 5, '人格', '正义不能因衰老而放过'],
  ['052.', 7, '写作', '思想改造不能轻易让位于建党'],
  ['053.', 3, '政治', '革命势力常被旧体制残余夺利'],
  ['054.', 4, '人格', '小事也可见真实人生观'],
  ['055.', 15, '写作', '伤痕文学不能代表文学高度'],
  ['056.', 5, '知识', '理解人物要看多面光芒'],
  ['057.', 11, '知识', '知识开发要靠自己'],
  ['058.', 77, '情爱', '革命永恒爱情阶段'],
  ['059.', 116, '情爱', '政治立场会随爱情牵动'],
  ['060.', 58, '知识', '文化跨行不能凭幻觉突变'],
  ['061.', 170, '政治', '权臣篡位也有最后关卡'],
  ['062.', 91, '政治', '民主政治要有良知尺度'],
  ['063.', 7, '情爱', '情欲会压过政治动力'],
  ['064.', 14, '情爱', '刻板印象会被生活表现推翻'],
  ['065.', 70, '情爱', '爱情代价是忍受痛苦'],
  ['066.', 10, '方法', '可信品牌也怕老后乱讲'],
  ['067.', 5, '政治', '民主应成为生活习惯'],
  ['068.', 12, '方法', '新材料能推翻历史论文'],
  ['069.', 6, '人格', '创作者比批评者更能立铜像'],
  ['070.', 63, '文化', '神秘经验不能轻易解释'],
  ['071.', 4, '文化', '活北京保存在相声人物身上'],
  ['072.', 273, '法权', '演艺讽刺突破言论边界'],
  ['073.', 121, '人格', '耳顺是不介意骂声'],
  ['074.', 3, '方法', '图片能表达事实细节'],
  ['075.', 127, '法权', '法官不拿红包也会乱判'],
  ['076.', 2, '知识', '藏书不能被选择性肢解'],
  ['077.', 67, '政治', '权力机关也能不甩议会质询'],
  ['078.', 24, '方法', '空中视角改变历史观看'],
  ['079.', 67, '方法', '人脑方法不能全交给电脑'],
  ['080.', 2, '文化', '剧本滞销显示台湾剧场贫弱'],
  ['082.', 40, '文化', '剧本卖不动显示台湾没有文化'],
  ['083.', 99, '人格', '争执也要有幽默风度'],
  ['084.', 68, '法权', '同性权利要靠公开争取'],
  ['085.', 93, '知识', '登山也应包含学问'],
  ['086.', 26, '知识', '儿童读物塑造早期阅读幸福'],
  ['087.', 59, '人格', '团队活动需处理人际复杂'],
  ['088.', 33, '情爱', '哭哭啼啼的爱情观会落伍'],
  ['089.', 32, '政治', '国家立场优先于家庭反对'],
  ['090.', 47, '政治', '女性政治人物可利用原始优点'],
  ['091.', 2, '方法', '速读不等于掌握精髓'],
  ['092.', 128, '方法', '广告能力在于什么都能卖'],
  ['094.', 128, '政治', '谈判破裂才坐实叛徒叙事'],
  ['095.', 2, '人格', '揭弊需要资料和勇气'],
  ['096.', 52, '法权', '司法不能维持基本正义'],
  ['098.', 18, '法权', '枉法裁判难告成'],
  ['099.', 2, '文化', '宗教黑暗需圈内人揭发'],
  ['100.', 101, '文化', '修道人离开环境也会崩溃'],
  ['101.', 34, '情爱', '戒欲信仰和身体现实冲突'],
  ['102.', 21, '文化', '木佛开光容易变敛财'],
  ['103.', 34, '文化', '宗教商业化背离施舍精神'],
  ['104.', 40, '政治', '投机政治人物遇险先跑'],
  ['105.', 23, '政治', '在野新党要以制衡为诉求'],
  ['106.', 4, '政治', '中国问题要被公开面对'],
  ['107.', 9, '政治', '清望不能用来挽救坏党'],
  ['108.', 6, '写作', '用书绕开杂志执照查禁'],
  ['109.', 63, '方法', '政治判断来自长期观察'],
  ['110.', 4, '法权', '异议声音有民主教育价值'],
  ['112.', 11, '法权', '编辑恐惧也会压制言论自由'],
  ['113.', 5, '写作', '国际提名暴露台湾忽视文学'],
  ['116.', 47, '文化', '青年盲流反映家庭积蓄缓冲'],
  ['117.', 22, '政治', '党产庞大到信托难处理'],
  ['118.', 36, '政治', '台独主权论难获国际承认'],
  ['119.', 43, '知识', '中文学习应由句子带动'],
  ['120.', 42, '情爱', '玄学追求可能落得空虚'],
  ['121.', 5, '知识', '历史内幕书影响早期读书'],
  ['122.', 7, '方法', '书要靠水平串联使用'],
  ['123.', 3, '方法', '买书要串联式扩张'],
  ['124.', 3, '方法', '藏书应成组收藏'],
  ['125.', 8, '方法', '世界标准要靠能力推广'],
  ['126.', 10, '政治', '卖台帽子会恐怖化公共讨论'],
  ['128.', 3, '知识', '词义会随古今改变'],
  ['129.', 14, '方法', '专家鉴定不能被一眼推翻'],
  ['130.', 10, '政治', '指导者先要检验自身能力'],
  ['131.', 27, '写作', '网络工具不能弥补粗糙语言'],
  ['132.', 3, '法权', '争取百分百言论自由'],
  ['137.', 13, '法权', '机构任用不能诉讼双标'],
  ['138.', 6, '政治', '文化特务会鼓动迫害异议者'],
];

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/^\uFEFF/, '');
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function paragraphsOf(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalizeText)
    .filter(Boolean);
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’？！。，、：；（）()\s]+/g, '')
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

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
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
fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
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
  '- 优先保留李敖自己的明确判断、方法、价值标准或可复用概念。',
  '- 对纯节目串场、来宾长段、短问答、重复爆料和缺少李敖判断的材料从严剔除。',
  '- 标题用于检索和浓缩主题；所有 `description` 均保留源文本原段落，不改写。',
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
