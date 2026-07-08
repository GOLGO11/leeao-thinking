import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 85;
const bookTitle = '李敖Talk秀';
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
  (name) => name.startsWith('005.'),
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
  slug: 'leeao-talk-show',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖Talk秀》十九集节目文字中提取思想索引。取舍以李敖本人可独立检索的判断段为主，优先保留言论自由、政治标准、历史解释、法权审查、监狱制度、丧礼改革、写作方法、文化语言、两性/婚恋/同性议题；主持串场、来宾问答、节目笑料、纯个人攻防和过窄现场互动从严剔除。标题用于浓缩检索，description 保留源文本原段落。',
};

const candidates = [
  ['001.', 20, '人格', '思想家比总统更大'],
  ['001.', 21, '人格', '总统不如思想事业重要'],
  ['001.', 23, '法权', '谈性会打开言论尺度'],
  ['001.', 24, '情爱', '性管制落伍应改用疏导'],
  ['001.', 66, '情爱', '处女是唯心不是事实'],
  ['001.', 68, '情爱', '性暴力不应等同失贞'],
  ['001.', 143, '人格', '宽广胸怀面对受害者'],
  ['001.', 150, '知识', '贞操观念并非中国特有'],
  ['001.', 230, '情爱', '男女相处贵在体贴'],
  ['002.', 6, '知识', '民国总统史不能从蒋介石算起'],
  ['002.', 8, '法权', '人权核心是百分百言论自由'],
  ['002.', 9, '政治', '成熟民主常有低投票率'],
  ['002.', 11, '政治', '民主是生活习惯'],
  ['002.', 13, '法权', '民主气度要能开元首玩笑'],
  ['002.', 15, '法权', '玩笑尺度体现言论自由'],
  ['002.', 16, '文化', '民主必须进入生活'],
  ['002.', 17, '法权', '没有禁法也会有事实审查'],
  ['002.', 19, '情爱', '性教育是正经学问'],
  ['002.', 21, '法权', '媒体人应拓宽言论尺度'],
  ['002.', 22, '文化', '贞节牌坊压抑人性'],
  ['002.', 23, '情爱', '守寡苦靠隐秘自慰撑住'],
  ['002.', 25, '情爱', '面对自慰比遮盖重要'],
  ['003.', 4, '政治', '政治人物要面对历史歉债'],
  ['003.', 5, '法权', '违建不分大小只分该拆'],
  ['003.', 6, '政治', '被打压者也曾打压别人'],
  ['003.', 9, '知识', '宪法没有国歌条款'],
  ['003.', 11, '政治', '威权用匪字管理思想'],
  ['003.', 12, '法权', '言论自由承诺要经权力考验'],
  ['003.', 13, '法权', '官股媒体仍会变成权力审查'],
  ['003.', 14, '法权', '新闻局处分必须依法公平'],
  ['003.', 16, '法权', '任用审查者会背叛言论自由'],
  ['003.', 18, '法权', '导读标准不能替代法律'],
  ['003.', 19, '政治', '正直者也会被民意厌烦'],
  ['003.', 20, '文化', '教育缺少样板导致校园暴力'],
  ['003.', 21, '人格', '大学校长应有对抗教育部气派'],
  ['003.', 22, '文化', '教育部长人格影响教育行政'],
  ['003.', 97, '方法', '校园暴力要先救急'],
  ['003.', 143, '法权', '弱者抗议也有理由'],
  ['003.', 145, '方法', '救急先于教育理论'],
  ['003.', 172, '写作', '创作者比批评者值得立像'],
  ['004.', 3, '政治', '张学良不独立付出代价'],
  ['004.', 4, '法权', '言论自由不包括拍马屁'],
  ['004.', 5, '政治', '族群归因会污蔑个案'],
  ['004.', 6, '法权', '法治不能放任暴民政治'],
  ['004.', 7, '政治', '族群挑拨要反向举证'],
  ['004.', 8, '人格', '政治受难者常被后人遗忘'],
  ['004.', 9, '人格', '人权光环不能遮蔽沉默'],
  ['004.', 10, '法权', '人权御史也可能避开大案'],
  ['004.', 11, '政治', '官员不能任意转换身份'],
  ['004.', 12, '政治', '新闻局体制不能倒转'],
  ['004.', 13, '政治', '国安捐会制造经济限制'],
  ['004.', 29, '人格', '达观面对亲人死亡'],
  ['004.', 77, '情爱', '爱情要敢爱敢分'],
  ['004.', 93, '情爱', '单恋也能转成家庭伦理'],
  ['004.', 115, '情爱', '限时分手保存爱情美感'],
  ['004.', 123, '情爱', '重温旧梦会破坏旧梦'],
  ['004.', 140, '情爱', '爱情只爱一点点'],
  ['004.', 190, '人格', '残障者也能力争上游'],
  ['005.', 3, '知识', '历史定案可能晚出真相'],
  ['005.', 4, '知识', '照片篡改制造继承神话'],
  ['005.', 5, '知识', '历史真相需要慢慢发掘'],
  ['005.', 7, '政治', '支持政见者不能替退票免责'],
  ['005.', 8, '人格', '理念变官位后不能改口'],
  ['005.', 9, '政治', '教育部长应信任本地教育'],
  ['005.', 10, '人格', '政治诚信不能退票'],
  ['005.', 11, '政治', '政治规格不能任意破坏'],
  ['005.', 13, '政治', '政治礼貌也是规格'],
  ['005.', 211, '情爱', '多元性别应被尊重'],
  ['005.', 236, '方法', '更好会成为好的敌人'],
  ['006.', 4, '知识', '万岁话语会被权力垄断'],
  ['006.', 5, '知识', '三民主义包含共产主义'],
  ['006.', 7, '政治', '主义可以变形吸纳对手'],
  ['006.', 9, '政治', '口号政治会制造路线流弊'],
  ['006.', 11, '政治', '三民主义不能照本实行'],
  ['006.', 12, '政治', '国父遗教常被挂羊头卖狗肉'],
  ['006.', 13, '政治', '权力会重写反核理由'],
  ['006.', 14, '政治', '公文尊称自己暴露权力习气'],
  ['006.', 88, '文化', '哈日背后有中日文化往返'],
  ['006.', 115, '文化', '日本侵害台湾不能被切割'],
  ['006.', 116, '文化', '哈日要学负责精神'],
  ['006.', 126, '法权', '出版自由包括身体表达'],
  ['006.', 134, '法权', '慰安妇羞耻应归加害者'],
  ['007.', 4, '政治', '张学良追求统一而受牺牲'],
  ['007.', 5, '知识', '历史罪名会被权力转嫁'],
  ['007.', 8, '情爱', '爱情坚贞也有历史代价'],
  ['007.', 9, '人格', '政治要玩真的付代价'],
  ['007.', 10, '政治', '总统要做大事不是作秀'],
  ['007.', 11, '政治', '政治不能只全省走透透'],
  ['007.', 12, '政治', '国家健康比个人健康重要'],
  ['007.', 117, '情爱', '同性议题可以严肃讨论'],
  ['007.', 118, '知识', '同性词语有历史典故'],
  ['007.', 143, '知识', '同性恋有哲学传统'],
  ['007.', 145, '情爱', '同性倾向不能叫症状'],
  ['007.', 149, '知识', '中国史中男色女色皆有'],
  ['007.', 187, '法权', '同性权利经历漫长演变'],
  ['008.', 2, '方法', '成败会改变身份标签'],
  ['008.', 3, '政治', '身份认同会随利害伸缩'],
  ['008.', 7, '法权', '慰安妇和解不能买断发言'],
  ['008.', 8, '法权', '民视募股欺骗投资人'],
  ['008.', 9, '人格', '替台湾人做事不分族群'],
  ['008.', 114, '法权', '合法堕胎要安全合理'],
  ['008.', 117, '情爱', '私生子不是坏事'],
  ['008.', 184, '政治', '前总统待遇会拖垮财政'],
  ['009.', 148, '情爱', '婚姻会暴露生活丑态'],
  ['009.', 168, '情爱', '同居要保留生活技巧'],
  ['009.', 217, '情爱', '试婚可以避免错嫁'],
  ['009.', 244, '方法', '不实践者不宜订规则'],
  ['009.', 250, '情爱', '同居让年轻人体验人生'],
  ['009.', 280, '法权', '演艺人员承载言论自由'],
  ['009.', 284, '文化', '入戏能力来自代入'],
  ['009.', 300, '知识', '二二八叙事不能抹掉外省受害者'],
  ['009.', 302, '法权', '赔偿机制会产生伪证'],
  ['010.', 4, '情爱', '任夫人抗命体现婚姻自主'],
  ['010.', 5, '人格', '人生如戏但当事不能演'],
  ['010.', 8, '人格', '坐牢和作战磨练男人'],
  ['010.', 10, '写作', '坐牢写作成为秘密记录'],
  ['010.', 11, '方法', '监狱公文也可变资料'],
  ['010.', 12, '法权', '揭露监狱黑暗会改变制度'],
  ['010.', 40, '情爱', '师生恋也可成为共同写作'],
  ['010.', 79, '法权', '师生恋利益输送会害别人'],
  ['011.', 75, '人格', '坐牢经历也有资格差别'],
  ['011.', 76, '人格', '比制度更狠才能谈判'],
  ['011.', 77, '知识', '每种牢都有单独习惯'],
  ['011.', 78, '方法', '读书笔记可保存秘密记录'],
  ['011.', 80, '知识', '牢也有一百种'],
  ['011.', 81, '法权', '监狱拥挤会伤害囚犯'],
  ['011.', 83, '人格', '苦中作乐是牢中人生观'],
  ['011.', 84, '法权', '监狱整人技术荒谬'],
  ['011.', 107, '情爱', '幻想需要媒介道具'],
  ['011.', 225, '情爱', '一夫一妻是人类过渡'],
  ['012.', 114, '写作', '写作不必亲身经验'],
  ['012.', 133, '人格', '大学生别为钱牺牲原则'],
  ['013.', 10, '方法', '军人四型也是用人观'],
  ['013.', 62, '文化', '网络语言改变中文'],
  ['013.', 64, '方法', '工具普及后就难以修改'],
  ['013.', 68, '写作', '中文动词有独特力量'],
  ['013.', 86, '文化', '中文电脑标准必须抢位'],
  ['013.', 92, '文化', '低质表达会转移到电脑'],
  ['013.', 96, '写作', '好作家不靠灵感'],
  ['013.', 163, '方法', '没有永远朋友只有利益'],
  ['013.', 231, '文化', '喜剧也能表达哲学'],
  ['014.', 5, '文化', '丧葬不必念经烧纸'],
  ['014.', 7, '文化', '丧礼会把活人变死人'],
  ['014.', 8, '文化', '孝礼原意会被表演化'],
  ['014.', 10, '文化', '守古礼不能阻止改革'],
  ['014.', 11, '人格', '租棺作假应被拒绝'],
  ['014.', 12, '人格', '真孝不怕被骂不孝'],
  ['014.', 42, '情爱', '一夜情互不合意会勉强'],
  ['014.', 87, '情爱', '一夜情对情投意合太短'],
  ['014.', 134, '方法', '回答问题要扣紧问题'],
  ['015.', 20, '政治', '后来者受益于牺牲者'],
  ['015.', 148, '情爱', '色情释放可降低犯罪'],
  ['015.', 162, '情爱', '情色影像有性教育效果'],
  ['015.', 172, '人格', '潜意识兽性要由文明约束'],
  ['016.', 3, '政治', '私生子认祖有现实权力逻辑'],
  ['016.', 4, '文化', '认祖归宗也要名正言顺'],
  ['016.', 81, '法权', '古代离婚也有三不去保障'],
  ['017.', 9, '法权', '大官考察看不到监狱内部'],
  ['017.', 11, '法权', '监狱民营化会产生买卖问题'],
  ['017.', 19, '法权', '监狱是丛林社会'],
  ['017.', 23, '法权', '狱政要理解囚情稳定'],
  ['017.', 37, '法权', '监狱靠囚犯协助管理'],
  ['017.', 43, '法权', '监狱最怕内幕外泄'],
  ['017.', 51, '法权', '人权资料流出会触发惩罚'],
  ['017.', 57, '人格', '惩罚可反转为谈判条件'],
  ['017.', 76, '法权', '外面不了解监狱内部'],
  ['017.', 84, '法权', '监狱贿赂不全是道德问题'],
  ['017.', 88, '法权', '破坏生态平衡不等于改革'],
  ['017.', 97, '法权', '监狱不能改造人'],
  ['017.', 102, '文化', '葬礼应是个人纪念'],
  ['017.', 104, '法权', '便民改革不能只宣布'],
  ['018.', 2, '政治', '看国家前途不看个人前途'],
  ['018.', 3, '政治', '衰弱社会不需大病才崩盘'],
  ['018.', 5, '政治', '体制不顺会压过专业部长'],
  ['018.', 6, '人格', '受欺负者也有不受欺负责任'],
  ['018.', 8, '政治', '权力性格会推开前面的人'],
  ['018.', 20, '人格', '为原则辞职比做官伟大'],
  ['018.', 26, '政治', '阿扁比李登辉更强硬'],
  ['018.', 56, '文化', '用自己的方法纪念亲人'],
  ['018.', 57, '文化', '叫魂仪式来自旧信仰'],
  ['018.', 58, '人格', '维护真理才是大孝'],
  ['019.', 14, '法权', '犯意不能等同犯行'],
  ['019.', 53, '法权', '政治侦防从白色恐怖延续'],
  ['019.', 55, '法权', '政敌资料上报缺少法律约束'],
  ['019.', 57, '知识', '档案监控说明侦防细密'],
  ['019.', 65, '政治', '查弊会碰到政治底线'],
  ['019.', 76, '法权', '军头应主动澄清财产'],
  ['019.', 84, '政治', '弊案牌可能虎头蛇尾'],
  ['019.', 86, '方法', '敌对者也会互相保护秘密'],
  ['019.', 92, '政治', '民间资料反衬官方无能'],
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
    .replace(/[《》“”‘’！？。，、：；（）()\s]/g, '')
    .slice(0, 18);
}

function makeKeywords(category, title, sourceFile) {
  return [...new Set([category, cleanKeyword(title), cleanKeyword(fileTitle(sourceFile))].filter(Boolean))].join(',');
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const descriptions = new Map();
  for (const record of master.records ?? []) {
    descriptions.set(normalizeText(record.description), record.id);
  }
  return descriptions;
}

function buildRecords() {
  const existingDescriptions = loadExistingDescriptions();
  const paragraphCache = new Map();
  const localDescriptions = new Map();
  const skippedDuplicates = [];
  const records = [];

  candidates.forEach(([prefix, paragraphNumber, category, title]) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category ${category} for ${prefix} P${paragraphNumber}`);
    }

    const sourceFile = resolveSourceFile(prefix);
    if (!paragraphCache.has(sourceFile)) {
      paragraphCache.set(sourceFile, sourceParagraphs(sourceFile));
    }

    const paragraphs = paragraphCache.get(sourceFile);
    const description = paragraphs[paragraphNumber - 1];
    if (!description) {
      throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
    }

    const normalizedDescription = normalizeText(description);
    const duplicateId = localDescriptions.get(normalizedDescription) ?? existingDescriptions.get(normalizedDescription);
    if (duplicateId) {
      skippedDuplicates.push({ prefix, paragraphNumber, title, duplicateId });
      return;
    }

    localDescriptions.set(normalizedDescription, `LAT${book.sequence}-${String(records.length + 1).padStart(3, '0')}`);
    records.push({
      id: `LAT${book.sequence}-${String(records.length + 1).padStart(3, '0')}`,
      book: book.title,
      round,
      status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: paragraphNumber,
      source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(category, title, sourceFile),
    });
  });

  return { records, skippedDuplicates };
}

function categoryCounts(records) {
  const counts = new Map(taxonomy.map((category) => [category, 0]));
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) ?? 0) + 1);
  }
  return taxonomy.map((category) => ({ category, count: counts.get(category) ?? 0 }));
}

function escapeCsv(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function writeCsv(records, filePath) {
  const columns = [
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
  const rows = [columns.join(',')];
  for (const record of records) {
    rows.push(columns.map((column) => escapeCsv(record[column])).join(','));
  }
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(payload, filePath) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书名：${payload.book.title}`,
    `- 轮次：${payload.book.round}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 候选数：${payload.book.candidate_count}`,
    `- 跳过重复：${payload.book.skipped_duplicate_count}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    '## 索引',
    '',
  ];

  for (const record of payload.records) {
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(records, filePath) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeNote(payload, filePath) {
  const lines = [
    `# ${payload.book.title}提取说明`,
    '',
    `本轮从源目录 \`${payload.book.sourceDir}\` 提取。`,
    '',
    '取舍原则：',
    '',
    '- 优先保留李敖自己的明确判断、方法、价值标准或可复用概念。',
    '- 对主持串场、来宾问答、节目笑料、纯个人攻防和过窄现场互动从严剔除。',
    '- 标题用于检索和浓缩主题；所有 `description` 均保留源文本原段落，不改写。',
    '',
    '分类统计：',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    `候选 ${payload.book.candidate_count} 条，生成 ${payload.records.length} 条，跳过重复 ${payload.book.skipped_duplicate_count} 条。`,
    '',
  ];
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const { records, skippedDuplicates } = buildRecords();
const payload = {
  book: {
    ...book,
    record_count: records.length,
    candidate_count: candidates.length,
    skipped_duplicate_count: skippedDuplicates.length,
    category_counts: categoryCounts(records),
  },
  records,
};

fs.mkdirSync(outputDir, { recursive: true });

const roundBase = `思想索引-${round}`;
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);
const indexJsonPath = path.join(outputDir, '思想索引.json');
const indexCsvPath = path.join(outputDir, '思想索引.csv');
const indexTxtPath = path.join(outputDir, '思想索引.txt');

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.copyFileSync(roundJsonPath, indexJsonPath);
writeCsv(records, roundCsvPath);
fs.copyFileSync(roundCsvPath, indexCsvPath);
writeMarkdown(payload, roundMdPath);
writeText(records, indexTxtPath);
writeNote(payload, path.join(outputDir, '提取说明.md'));

console.log(
  `Built ${payload.book.title}: ${records.length} records, ${skippedDuplicates.length} skipped duplicates. Categories: ${payload.book.category_counts
    .map(({ category, count }) => `${category}=${count}`)
    .join(', ')}`,
);
