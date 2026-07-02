import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('011.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '026.我梦碎，所以我梦醒');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '026',
  title: '我梦碎，所以我梦醒',
  slug: 'wo-meng-sui-suoyi-wo-meng-xing',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《我梦碎，所以我梦醒》的序言、正文和结语中提取可独立检索的思想段落，重点覆盖梦碎梦醒的方法意识、辛亥与国号叙事、台独与公投、国民党党国史、宪法与法统、两党政治、美国与军购、知识分子处境、文化宣传和与世推移等主题；附录访谈只少量收录明确承载李敖判断的段落。',
};

const taxonomy = [
  '写作',
  '方法',
  '知识',
  '人格',
  '文化',
  '政治',
  '法权',
];

const entries = [
  ['方法', '梦碎才算梦醒', '序', 6, '梦碎,梦醒,现实,方法'],
  ['方法', '从表象随机抽样', '序', 8, '随机抽样,梦,表象,方法'],
  ['人格', '志士仁人只是点缀', '序', 10, '志士仁人,常人,精神,人格'],
  ['政治', '周旋促其变好', '序', 14, '共产党,周旋,休戚与共,政治'],
  ['方法', '务实活下去', '序', 16, '务实,同床异梦,活下去,方法'],
  ['政治', '小岛浪费雄奇之人', '序', 24, '台湾,小岛,政治,浪费'],
  ['政治', '大陆一党台湾两党都不可', '序', 31, '一党,两党,第三势力,政治'],
  ['政治', '台湾需要第三势力', '序', 33, '第三势力,国民党,民进党,台湾'],
  ['政治', '台湾政策缺大国气象', '序', 47, '共产党,台湾政策,大国气象,政治'],
  ['写作', '写书是穷途中的园地', '序', 52, '写书,书种子,穷途,写作'],
  ['政治', '辛亥公约数被炒作', '001', 5, '辛亥革命,公约数,海峡两岸,政治'],
  ['人格', '不敢玩真的', '002', 11, '民进党,公投,勇气,人格'],
  ['法权', '民进党挡出台独法源', '002', 13, '台独,公投,法源,民进党'],
  ['方法', '正名是骗局', '002', 15, '正名,骗局,台湾,方法'],
  ['政治', '台湾共和国才停自欺', '002', 28, '台湾共和国,自欺,台独,政治'],
  ['人格', '真革命要付代价', '003', 3, '革命,坐牢,流血,人格'],
  ['政治', '台独假货不敢动国号', '003', 5, '台独,国号,台湾共和国,政治'],
  ['政治', '台独真相是骗局', '003', 11, '台独,骗局,民进党,政治'],
  ['人格', '误国死前自剖', '004', 9, '陈布雷,误国,自杀,人格'],
  ['方法', '死不是励众而是自剖', '004', 10, '陈布雷,自剖,历史解释,方法'],
  ['政治', '蒋自承亡国', '005', 21, '蒋介石,亡国,中华民国,政治'],
  ['政治', '国民党无资格代表中国', '006', 4, '国民党,中国,代表性,政治'],
  ['方法', '用证据点破亡国', '006', 6, '证据,亡国,蒋介石,方法'],
  ['政治', '亡国总统沐猴而冠', '006', 15, '亡国,总统,蒋介石,政治'],
  ['政治', '失败应下台', '007', 4, '政治责任,下台,国民党,政治'],
  ['人格', '摧毁知耻道德', '007', 11, '知耻,道德,蒋介石,马英九'],
  ['政治', '领导无方仍继续干', '007', 14, '领导无方,责任,政治,国民党'],
  ['政治', '父死子继使民国帝国化', '008', 4, '父死子继,民国,帝国,政治'],
  ['政治', '国家运作在坏人手里', '008', 8, '国家,政府,坏人,政治'],
  ['方法', '孙黄小手段失大体', '009', 9, '孙中山,黄兴,南京,方法'],
  ['知识', '南京非建都良地', '009', 17, '南京,首都,孙中山,知识'],
  ['政治', '无国家何来首都', '009', 29, '首都,国家,中华民国,政治'],
  ['政治', '蒋才是真主和', '010', 4, '汪精卫,蒋介石,和平,政治'],
  ['方法', '汪蒋二分法错误', '010', 16, '汪精卫,蒋介石,二分法,方法'],
  ['政治', '汉奸大王轮不到汪', '010', 17, '汉奸,汪精卫,蒋介石,政治'],
  ['政治', '秘密接触暴露抗战宣传', '011', 16, '抗日,秘密接触,国民党,政治'],
  ['政治', '国民党珍珠港后才宣战', '011', 20, '宣战,日本,珍珠港,国民党'],
  ['政治', '受降低姿态被遮盖', '012', 23, '受降,国民党,日本,政治'],
  ['法权', '暗盘使冈村无罪', '012', 45, '冈村宁次,战犯,审判,法权'],
  ['方法', '受降照片说明扯谎', '012', 73, '照片,受降,证据,方法'],
  ['政治', '受降媚骨辱国体', '012', 89, '受降,何应钦,国体,政治'],
  ['知识', '学问挖出钓鱼台公案', '013', 10, '钓鱼台,琉球,学问,知识'],
  ['方法', '领土争议要等中国强大', '013', 12, '钓鱼台,中国强大,邓小平,方法'],
  ['政治', '蒋承认外蒙罪愆', '014', 5, '外蒙古,蒋介石,罪愆,政治'],
  ['政治', '急于卖国换统一建国', '014', 25, '外蒙古,条约,卖国,政治'],
  ['知识', '无国际法常识仍签约', '014', 29, '国际法,现代史,外蒙古,知识'],
  ['政治', '僵尸国号烧钱', '015', 24, '中华民国,百年,预算,政治'],
  ['政治', '自吹背后是债务党产案件', '016', 7, '马英九,债务,党产,政治'],
  ['法权', '法统不能腰斩历史', '017', 15, '法统,宪法,总统,法权'],
  ['方法', '百年与总统任次矛盾', '017', 17, '中华民国,百年,总统,方法'],
  ['知识', '孙中山从未正统', '018', 6, '孙中山,正统,中华民国,知识'],
  ['方法', '道统引文瞒天过海', '019', 20, '道统,引文,蒋介石,方法'],
  ['政治', '蒋捏造国父道统', '019', 21, '蒋介石,国父,道统,政治'],
  ['知识', '政治人碰学术易坏学术', '020', 2, '政治,学术,知识,台湾'],
  ['文化', '党团党棍污染学术', '020', 3, '学统,党团,党棍,文化'],
  ['法权', '临时条款捆宪法', '021', 9, '临时条款,宪法,戒严法,法权'],
  ['法权', '国民党不服限制性法律', '021', 12, '国民党,法律,限制,法权'],
  ['法权', '宪法五花大绑无人信', '021', 21, '宪法,临时条款,戒严,法权'],
  ['政治', '宪法成为一家一党工具', '021', 32, '宪法,国民党,一家一党,政治'],
  ['法权', '修宪破坏内阁制', '022', 15, '修宪,内阁制,总统,法权'],
  ['法权', '总统独大从人到法', '022', 22, '总统,修宪,权力,法权'],
  ['方法', '遗教被弹性处理', '023', 3, '孙中山,遗教,宪法,方法'],
  ['法权', '国安会成一权政府', '023', 4, '国家安全会议,权力,宪法,法权'],
  ['政治', '总统制是夺权试验', '024', 7, '总统制,民进党,夺权,政治'],
  ['法权', '政制应超出党派私利', '024', 9, '政制,宪法,党派,法权'],
  ['人格', '曲学阿世祸延政体', '024', 11, '曲学阿世,政制,学者,人格'],
  ['知识', '台湾政党仍是乙式政党', '025', 3, '政党,苏维埃,台湾,知识'],
  ['政治', '乙式政党造不出真民主', '025', 5, '政党,民主,苏维埃,政治'],
  ['法权', '戒严与宪法互相抵触', '026', 4, '戒严,宪法,党禁,法权'],
  ['方法', '时机错毁掉组党努力', '026', 7, '雷震,时机,组党,方法'],
  ['政治', '两党分肥取代党争', '026', 18, '两党,分肥,党争,政治'],
  ['政治', '民进党是另一个国民党', '027', 2, '民进党,国民党,政治'],
  ['方法', '基本问题不解预算全反', '027', 8, '军购,预算,基本问题,方法'],
  ['政治', '政党协商黑箱是假民主', '027', 42, '政党协商,黑箱,民主,政治'],
  ['政治', '开除党籍是独裁资料', '028', 9, '开除党籍,国民党,独裁,政治'],
  ['政治', '民进党也学会党威手续', '028', 11, '民进党,党纪,党威,政治'],
  ['政治', '共产党成带枪在野党', '029', 5, '共产党,国民党,在野党,政治'],
  ['知识', '胡适劝无武装政党太天真', '029', 8, '胡适,共产党,武装,知识'],
  ['方法', '真话打破迷梦招恨', '030', 3, '真话,梦,现实,方法'],
  ['写作', '文字收功有限', '030', 5, '写作,文字,自由中国,写作'],
  ['政治', '训政独裁打掉小党', '031', 5, '训政,独裁,小党,政治'],
  ['人格', '小党领袖看见烈士之路', '031', 9, '小党,烈士,左舜生,人格'],
  ['文化', '烧书迫害思想者', '032', 4, '烧书,思想,民社党,文化'],
  ['政治', '小党花瓶化', '032', 6, '小党,花瓶,国民党,政治'],
  ['政治', '暴政必亡自欺失败', '033', 4, '暴政必亡,中国,自欺,政治'],
  ['文化', '孔子学院式软实力苍白', '034', 5, '孔子学院,软实力,文化'],
  ['政治', '有钱还要有软实力', '034', 7, '中国,软实力,政治'],
  ['政治', '拒绝表决证实假民主', '035', 19, '表决,民主,民进党,政治'],
  ['政治', '国民党度量被苏联改造', '036', 4, '国民党,苏联,度量,政治'],
  ['政治', '党国书记体制不如北洋', '036', 5, '北洋,国民党,共产党,政治'],
  ['法权', '盗印权可服务国家发展', '037', 3, '盗印,版权,国家发展,法权'],
  ['知识', '清北洋能权衡版权利害', '037', 8, '版权,北洋,清朝,知识'],
  ['政治', '国民党保护美国版权', '037', 11, '版权,美国,国民党,政治'],
  ['知识', '新文化在前五四在后', '038', 2, '新文化运动,五四运动,知识'],
  ['文化', '五四真义是学生干政救亡', '038', 6, '五四,学生,救亡,文化'],
  ['人格', '安全时才勇敢可鄙', '039', 5, '勇敢,危险,人格'],
  ['文化', '隐藏烈士身份是二次背叛', '039', 6, '烈士,共产党,纪念,文化'],
  ['方法', '蒋介石军阶一路假冒', '040', 3, '蒋介石,军阶,考证,方法'],
  ['人格', '陈仪敢作敢为有功台湾', '041', 11, '陈仪,台湾,人格'],
  ['方法', '历史会偏怜晚节', '041', 26, '历史,晚节,评价,方法'],
  ['人格', '爱国代价巨大', '041', 27, '爱国,陈仪,代价,人格'],
  ['政治', '小岛放大老国民党恶心密度', '042', 3, '台湾,国民党,小岛,政治'],
  ['政治', '政海可成病房', '042', 10, '政海,老人政治,台湾,政治'],
  ['人格', '原罪之外仍须公道', '043', 8, '公道,胡赓年,评价,人格'],
  ['政治', '政治人物制造奴性配角', '044', 4, '政治人物,奴性,台湾,政治'],
  ['政治', '小岛选举只有小人可藐', '044', 5, '选举,小人,孟子,政治'],
  ['政治', '达赖神权统治非自由解放', '045', 4, '达赖,西藏,神权,政治'],
  ['方法', '人权判断不能只锁定中共', '045', 16, '人权,中共,西藏,方法'],
  ['政治', '诺奖和平叙事胡说', '045', 17, '诺贝尔和平奖,达赖,政治'],
  ['文化', '三毛浪漫逃避现实', '046', 5, '三毛,浪漫,现实,文化'],
  ['人格', '冤狱使才人止于中校', '047', 13, '冤狱,孙立人案,陈亮勋,人格'],
  ['人格', '玩世天真穿透冤狱', '047', 14, '陈亮勋,玩世,天真,人格'],
  ['文化', '国旗成廉价日用品', '048', 7, '国旗,中华民国,文化'],
  ['法权', '迟来开放不能抵消压制', '049', 5, '蒋经国,解严,戒严,法权'],
  ['法权', '解严越解越严', '049', 7, '解严,戒严,法权'],
  ['法权', '政治案件不平反', '049', 10, '政治案件,平反,戒严,法权'],
  ['人格', '蒋把人才当奴才', '050', 4, '蒋介石,人才,奴才,人格'],
  ['政治', '蒋经国无储才眼光', '050', 6, '蒋经国,人才,政治'],
  ['政治', '台湾不能自外于中央', '051', 3, '台湾,中国,中央,政治'],
  ['方法', '面积比例戳破百分百论', '051', 5, '台湾,面积,中国,方法'],
  ['政治', '反军购拆穿媚美自毁', '053', 5, '军购,美国,台湾,政治'],
  ['政治', '蓝绿对美贱相被逼出', '053', 14, '蓝绿,美国,军购,政治'],
  ['政治', '看门狗自己买骨头荒谬', '054', 3, '看门狗,美国,军购,政治'],
  ['法权', '提供不是售予', '054', 5, '台湾关系法,提供,售予,法权'],
  ['方法', '购买与决心都是美国前提', '054', 9, '军购,美国,决心,方法'],
  ['政治', '固守保台是自欺', '055', 10, '固守保台,军购,自欺,政治'],
  ['法权', '严重关切不是承诺', '056', 5, '严重关切,美国,承诺,法权'],
  ['法权', '美国无义务防卫台湾', '056', 7, '美国,防卫台湾,义务,法权'],
  ['法权', '台湾关系法不是双边条约', '057', 3, '台湾关系法,条约,法权'],
  ['政治', '台湾只是美国利益看门狗', '057', 5, '台湾,美国利益,看门狗,政治'],
  ['政治', '抱美国大腿已来不及', '057', 9, '美国,台湾,抱大腿,政治'],
  ['知识', '读经已是老题目', '058', 2, '读经,胡适,知识'],
  ['方法', '与世推移是面对现实', '059', 7, '与世推移,现实,方法'],
  ['方法', '反抗与成功是两回事', '059', 15, '反抗,成功,时机,方法'],
  ['方法', '黄莺拒孵贼蛋', '060', 8, '黄莺,牛鹂,政治比喻,方法'],
  ['人格', '面对现实重建残余', '061', 13, '现实,梦醒,重建,人格'],
  ['政治', '孙蒋都不可信', '061', 18, '孙中山,蒋介石,可信度,政治'],
  ['政治', '蓝绿都是逆流', '061', 20, '蓝绿,逆流,美国,政治'],
  ['政治', '中共有功但台湾政策错', '061', 23, '共产党,台湾政策,自由,政治'],
  ['政治', '中国不是共产党一党之私', '061', 24, '中国,共产党,台湾,政治'],
  ['政治', '与共产党周旋以共存', '061', 25, '共产党,周旋,共存,政治'],
];

const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith('.txt'))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }));
const sourceCache = new Map();

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function resolveSourceFile(sourceKey) {
  if (sourceKey === '序') {
    const preface = sourceFiles.find((name) => name.includes('序') && !name.startsWith('目录'));
    if (preface) return preface;
  }

  const file = sourceFiles.find((name) => name.startsWith(`${sourceKey}.`));
  if (!file) {
    throw new Error(`Missing source file for key: ${sourceKey}`);
  }
  return file;
}

function readSource(sourceFile) {
  if (!sourceCache.has(sourceFile)) {
    sourceCache.set(sourceFile, decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile))));
  }
  return sourceCache.get(sourceFile);
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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

function writeMarkdown(filePath, records) {
  const lines = [
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 说明：标题为索引用浓缩标题；description 保留源文本原文段落。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeNote(filePath, records) {
  const categoryLines = taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0)
    .map((item) => `- ${item.category}：${item.count}`);

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    `- 源目录：${book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本轮只收可独立检索的思想判断、方法判断、制度判断和历史解释段，不按篇目平均分配。',
    '- 目录、资源推广文字、纯例证清单和重复修辞不单独收录；附录访谈只在明确承载李敖判断时少量收录。',
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  return entries.map(([category, title, sourceKey, sourceParagraph, keywords], index) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category: ${category}`);
    }

    const sourceFile = resolveSourceFile(sourceKey);
    const sourceParagraphs = paragraphs(readSource(sourceFile));
    const description = sourceParagraphs[sourceParagraph - 1];

    if (!description) {
      throw new Error(`Missing source paragraph: ${sourceFile} P${sourceParagraph}`);
    }

    const fullSourcePath = path.join(sourceDir, sourceFile);

    return {
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: book.title,
      round: book.round,
      status: book.status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: sourceParagraph,
      source_path: path.relative(rootDir, fullSourcePath).replaceAll(path.sep, '/'),
      keywords,
    };
  });
}

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
if (records.length !== 141) {
  throw new Error(`Expected 141 records, got ${records.length}`);
}

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
writeNote(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
