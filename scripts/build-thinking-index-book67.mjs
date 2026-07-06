import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 67;
const bookTitle = '坐牢家爸爸给女儿的八十封信';
const round = '提取轮';
const status = '待校对';
const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '008.书信函件类',
  '010.坐牢家爸爸给女儿的八十封信',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zuolaojia-baba-gei-nuer-de-bashi-fengxin',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《坐牢家爸爸给女儿的八十封信》的自序、狱中函授、语言教育、历史常识、文化比较、人格劝诫、政治法权判断与父女书信中提取思想索引。description 保留源文本原段落；目录、制作信息、纯例句、纯物种资料、纯地名铺陈和过细词汇解释不进入本轮。',
};

const candidates = [
  ['《坐牢家爸爸给女儿的八十封信》自序.txt', 4, '政治', '用函授避开党国教育'],
  ['《坐牢家爸爸给女儿的八十封信》自序.txt', 5, '法权', '狱中书信空间来自例外'],
  ['《坐牢家爸爸给女儿的八十封信》自序.txt', 7, '写作', '监狱使文字难以带出'],
  ['《坐牢家爸爸给女儿的八十封信》自序.txt', 8, '写作', '忧患之书破格出局'],
  ['001.猫狗谚.txt', 19, '人格', '狗忠于人不打落水狗'],
  ['001.猫狗谚.txt', 20, '人格', '交朋友要小心'],
  ['001.猫狗谚.txt', 21, '文化', '文明人也会吃人'],
  ['002.再会呀，鳄鱼呀！.txt', 3, '方法', '再凶的东西也有软肋'],
  ['003.纸上谈钱.txt', 4, '方法', '小钱里有大事'],
  ['004.喊一声“芝麻开门！”就行了.txt', 5, '方法', '最后稻草压垮骆驼'],
  ['007.理发匠就是外科医生，外科医生就是理发匠.txt', 5, '方法', '机会失掉就抓不住'],
  ['008.送礼·向厕所跑.txt', 3, '文化', '送礼照出实际差异'],
  ['009.你羊我就马，你马我就羊.txt', 6, '人格', '感恩才不忘恩'],
  ['010.打老虎秘诀.txt', 5, '方法', '不入虎穴无虎子'],
  ['010.打老虎秘诀.txt', 7, '方法', '学英文要不马虎'],
  ['012.千年王八万年龟.txt', 3, '知识', '俗语也要经知识校正'],
  ['013.不飞的鸟.txt', 10, '人格', '自欺不是逃生'],
  ['014.你杀鹅我就杀鸡.txt', 6, '方法', '贪心会断财路'],
  ['018.破锅有烂灶、李大有张嫂.txt', 6, '方法', '样样通会样样松'],
  ['019.情人与天使.txt', 3, '方法', '赶上功课再大玩'],
  ['019.情人与天使.txt', 4, '情爱', '情人节应是情爱节'],
  ['020.看那熊相.txt', 18, '方法', '宰熊后再卖皮'],
  ['021.为什么还叫别人是姥姥？.txt', 4, '方法', '天才靠用功'],
  ['022.苍蝇的老婆最多.txt', 8, '方法', '看不懂就常常看'],
  ['024.关于脖子的种种.txt', 6, '文化', '怪风俗前先照见缠足'],
  ['025.眼睛有时候会上当.txt', 17, '知识', '眼睛有时会上当'],
  ['027.老鼠不信任一个洞.txt', 18, '人格', '背叛是亲热里的阴谋'],
  ['027.老鼠不信任一个洞.txt', 24, '人格', '别打落水狗'],
  ['030.狼来了！狼来了！.txt', 8, '人格', '说谎者失去信用'],
  ['030.狼来了！狼来了！.txt', 12, '方法', '抓狼耳朵的两难'],
  ['031.谁先完蛋？.txt', 16, '方法', '不把所有蛋放一篮'],
  ['031.谁先完蛋？.txt', 29, '知识', '生男生女责任在父方'],
  ['032.猴相.txt', 16, '方法', '别动正在赢的队伍'],
  ['034.蘑菇个没完.txt', 14, '知识', '灵芝并不神秘'],
  ['035.非驴非马.txt', 16, '人格', '驴叫不必回叫'],
  ['036.骑小马·回台湾.txt', 17, '方法', '死马骨头也有价值'],
  ['036.骑小马·回台湾.txt', 26, '人格', '随遇而安充实自己'],
  ['036.骑小马·回台湾.txt', 29, '方法', '写信经修改更进步'],
  ['037.鸽子·囮子·凯子.txt', 12, '知识', '洋泾浜不可乱造'],
  ['038.斗出自大来.txt', 18, '人格', '自大像公鸡'],
  ['039.谁在瞎忙？.txt', 12, '人格', '空话骗人'],
  ['039.谁在瞎忙？.txt', 15, '人格', '轻诺寡信'],
  ['040.运动道德吗？.txt', 6, '方法', '是什么就说什么'],
  ['043.林肯·栗子·笑.txt', 4, '方法', '刻苦读书补教育不足'],
  ['044.“浪费蜡烛去找针”.txt', 3, '方法', '例行检查防患未然'],
  ['044.“浪费蜡烛去找针”.txt', 6, '文化', '人同此心心同此理'],
  ['045.坐牢的名人.txt', 4, '法权', '坐牢不等于作恶'],
  ['045.坐牢的名人.txt', 6, '写作', '牢中写书会改变世界'],
  ['045.坐牢的名人.txt', 7, '写作', '作家常因写作入狱'],
  ['045.坐牢的名人.txt', 11, '政治', '囚犯也能得百万票'],
  ['046.水肉·水月·影子戏.txt', 5, '方法', '抓影子会失掉实在'],
  ['046.水肉·水月·影子戏.txt', 6, '人格', '溺爱会成为作恶同谋'],
  ['047.怪签名.txt', 9, '政治', '不团结就分别上绞架'],
  ['048.你看中国人分得多细.txt', 3, '文化', '中文亲属关系分得细'],
  ['049.天上天堂与人间天堂.txt', 4, '文化', '天堂是人间想出的地方'],
  ['049.天上天堂与人间天堂.txt', 8, '政治', '乌托邦会倒置是非'],
  ['050.猫抓耗子法案.txt', 8, '法权', '猫抓耗子式管理囚犯'],
  ['051.谈年论孝.txt', 31, '文化', '移风易俗从不过旧年做起'],
  ['051.谈年论孝.txt', 32, '人格', '真孝不是丧礼虚文'],
  ['052.“爸”·“爹”·“妈”.txt', 3, '情爱', '父亲称呼要亲热'],
  ['052.“爸”·“爹”·“妈”.txt', 22, '方法', '壮士断臂是决断'],
  ['053.木字头的.txt', 5, '政治', '傀儡政府没有主权'],
  ['054.踏脚石与马铃薯.txt', 6, '文化', '五月花资格遮不住印第安人'],
  ['054.踏脚石与马铃薯.txt', 9, '人格', '别只吹祖宗'],
  ['055.我讨厌日本.txt', 21, '政治', '虚君只是国家象征'],
  ['055.我讨厌日本.txt', 25, '人格', '讨厌也不抹杀长处'],
  ['056.从达芬奇到蒲公英.txt', 7, '知识', '早于时代会被误认'],
  ['057.瞎子可以摸出象来.txt', 4, '知识', '第六感带迷信味'],
  ['057.瞎子可以摸出象来.txt', 5, '人格', '睁着眼睛也会瞎'],
  ['057.瞎子可以摸出象来.txt', 9, '方法', '时间够瞎子也能摸象'],
  ['057.瞎子可以摸出象来.txt', 22, '法权', '窃听顺风耳要有限度'],
  ['058.彼得·潘·潘彼得.txt', 4, '方法', '看书要仔细'],
  ['059.记印度阿三.txt', 5, '文化', '无聊特技不是救民'],
  ['059.记印度阿三.txt', 11, '文化', '对牛客气对人不客气'],
  ['059.记印度阿三.txt', 14, '法权', '贱民像政治犯'],
  ['059.记印度阿三.txt', 20, '法权', '殉夫坏俗终被禁止'],
  ['059.记印度阿三.txt', 23, '政治', '极贫极富有殖民责任'],
  ['060.萨摩亚与自挽诗.txt', 15, '法权', '没有铁栏杆的监狱'],
  ['060.萨摩亚与自挽诗.txt', 16, '文化', '画地为牢和夜不闭户'],
  ['060.萨摩亚与自挽诗.txt', 39, '写作', '盼女儿写好英文句子'],
  ['064.他们六个.txt', 11, '知识', '爱老师更爱真理'],
  ['064.他们六个.txt', 15, '法权', '对了也会被宗教法庭软禁'],
  ['064.他们六个.txt', 19, '知识', '头脑比时代新会倒霉'],
  ['064.他们六个.txt', 43, '知识', '真理大海仍未发现'],
  ['064.他们六个.txt', 48, '知识', '修正前人也依赖前人'],
  ['065.从鸭嘴兽到水獭.txt', 9, '法权', '袋鼠法庭是私设公堂'],
  ['065.从鸭嘴兽到水獭.txt', 27, '政治', '不平则鸣'],
  ['065.从鸭嘴兽到水獭.txt', 31, '政治', '白澳政策自私'],
  ['066.“那么让他们吃饼嘛！”.txt', 4, '政治', '多奶酪国家难一党'],
  ['066.“那么让他们吃饼嘛！”.txt', 11, '政治', '统治者不知民间疾苦'],
  ['066.“那么让他们吃饼嘛！”.txt', 12, '法权', '圣女贞德死于假罪名'],
  ['066.“那么让他们吃饼嘛！”.txt', 13, '写作', '伏尔泰文字影响革命'],
  ['066.“那么让他们吃饼嘛！”.txt', 14, '写作', '哲学家要有洞防走狗'],
  ['067.嘴含一根草.txt', 41, '人格', '守望相助也要送死'],
  ['069.飞上枝头看飞枝.txt', 17, '知识', '吴凤神话要校正'],
  ['071.“古希腊的辉煌”.txt', 27, '文化', '抄希腊最不希腊'],
  ['071.“古希腊的辉煌”.txt', 30, '方法', '快刀斩乱麻'],
  ['071.“古希腊的辉煌”.txt', 32, '人格', '哲学家的自由胜过皇帝'],
  ['072.“古罗马的壮丽”.txt', 10, '文化', '看人受罪以为乐'],
  ['072.“古罗马的壮丽”.txt', 17, '政治', '恺撒的归恺撒'],
  ['072.“古罗马的壮丽”.txt', 21, '方法', '坚壁清野拖垮敌人'],
  ['073.波澜N多的波兰.txt', 7, '文化', '文艺保存民族意识'],
  ['073.波澜N多的波兰.txt', 9, '政治', '慷他人之慨'],
  ['073.波澜N多的波兰.txt', 18, '知识', '哥白尼奠基后世发现'],
  ['073.波澜N多的波兰.txt', 21, '人格', '居里夫人苦学成功'],
  ['073.波澜N多的波兰.txt', 23, '法权', '政治犯家属也被放逐'],
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
  return fileName.replace(/^《[^》]+》/u, bookTitle).replace(/^\d+\./, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'.,，。！？、?:：；;\s]+/g, '')
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
  '- 保留狱中父女函授、教育方法、语言比较、文化批判、政治法权判断和人格劝诫中可独立检索的原文段落。',
  '- 删除目录、制作信息、纯例句、纯物种资料、纯地名铺陈和过细词汇解释。',
  '- 标题可浓缩，description 保留源文本原段落，不重写。',
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
