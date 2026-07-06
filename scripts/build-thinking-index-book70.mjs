import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 70;
const bookTitle = '历史与人像';
const round = '提取轮';
const status = '待校对';
const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '009.历史文化类',
  '001.历史与人像',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'lishi-yu-renxiang',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《历史与人像》的历史札记、人物分析、节育运动、性道德法制、宋代婚姻制度、李易安辩诬与徐树铮年谱批评中提取思想索引。description 保留源文本原段落；纯史料罗列、脚注书目、他人附录正文、表格碎片和档案馆页尾不进入本轮。',
};

const candidates = [
  ['《历史与人像》自序.txt', 3, '写作', '保留思想方法的过渡痕迹'],

  ['001.袁世凯的祀孔.txt', 19, '政治', '复古政治宗教化圣人'],
  ['001.袁世凯的祀孔.txt', 22, '法权', '信教自由不能偏袒孔教'],
  ['001.袁世凯的祀孔.txt', 29, '文化', '尊孔令维护旧道德'],
  ['001.袁世凯的祀孔.txt', 34, '文化', '孔教化不可掩耳盗铃'],

  ['002.余玠人格品质的分析.txt', 2, '方法', '用人格心理学分析史传'],
  ['002.余玠人格品质的分析.txt', 5, '人格', '史传人物不宜儒生化'],
  ['002.余玠人格品质的分析.txt', 22, '方法', '集众思才可广忠益'],
  ['002.余玠人格品质的分析.txt', 29, '人格', '独当气魄在敢负全责'],
  ['002.余玠人格品质的分析.txt', 33, '政治', '功成能臣会被帝王收拾'],
  ['002.余玠人格品质的分析.txt', 37, '政治', '专制帝王兔死狗烹'],

  ['003.杜威的教育思想及其他.txt', 12, '文化', '教育是社会改造方法'],
  ['003.杜威的教育思想及其他.txt', 15, '知识', '经验是应付未来的工具'],
  ['003.杜威的教育思想及其他.txt', 19, '知识', '哲学就是广义教育学'],
  ['003.杜威的教育思想及其他.txt', 21, '文化', '杜威联络东西教育思想'],
  ['003.杜威的教育思想及其他.txt', 26, '写作', '早年旧作见进步教育渴望'],

  ['004.桑格夫人和节育运动.txt', 14, '文化', '文明古国也有残忍习俗'],
  ['004.桑格夫人和节育运动.txt', 19, '情爱', '新女性反抗传统禁忌'],
  ['004.桑格夫人和节育运动.txt', 30, '法权', '避孕知识被法律封锁'],
  ['004.桑格夫人和节育运动.txt', 32, '人格', '献身解救苦难女性'],
  ['004.桑格夫人和节育运动.txt', 36, '法权', '女反抗者向法律挑战'],
  ['004.桑格夫人和节育运动.txt', 41, '人格', '直接行动促成废法'],
  ['004.桑格夫人和节育运动.txt', 46, '情爱', '母亲有控制命运自由'],
  ['004.桑格夫人和节育运动.txt', 66, '法权', '不能服从不尊重的法律'],
  ['004.桑格夫人和节育运动.txt', 69, '法权', '宽大解释造成法律转捩'],
  ['004.桑格夫人和节育运动.txt', 72, '方法', '社会运动要扩大问题视野'],
  ['004.桑格夫人和节育运动.txt', 73, '情爱', '女人应有不生孩子自由'],
  ['004.桑格夫人和节育运动.txt', 115, '政治', '人口激增造成社会问题'],
  ['004.桑格夫人和节育运动.txt', 120, '文化', '节育问题照出中国退缩'],

  ['005.纪翠绫该生在什么时候？.txt', 3, '文化', '单纯案件牵出观念问题'],
  ['005.纪翠绫该生在什么时候？.txt', 4, '方法', '从历史线索检讨性道德'],
  ['005.纪翠绫该生在什么时候？.txt', 5, '情爱', '性道德仍太传统'],
  ['005.纪翠绫该生在什么时候？.txt', 12, '法权', '宫刑是不人道的手段'],
  ['005.纪翠绫该生在什么时候？.txt', 43, '法权', '强奸鉴定荒谬地偏压女性'],
  ['005.纪翠绫该生在什么时候？.txt', 53, '法权', '私刑比法律制裁更可怕'],
  ['005.纪翠绫该生在什么时候？.txt', 56, '文化', '监狱文化暴露妇女屈辱'],
  ['005.纪翠绫该生在什么时候？.txt', 60, '情爱', '爱情自由要付社会高价'],
  ['005.纪翠绫该生在什么时候？.txt', 92, '法权', '判决前不能预定人格有罪'],

  ['006.行李考.txt', 8, '知识', '考证分歧可两存疑'],
  ['006.行李考.txt', 11, '写作', '旧文可显现写作过渡'],
  ['006.行李考.txt', 18, '知识', '引用文字须核对原文'],

  ['007.“两昆仑”考.txt', 5, '知识', '解释不能停在挚友猜想'],
  ['007.“两昆仑”考.txt', 9, '方法', '文意推断仍须理由充分'],
  ['007.“两昆仑”考.txt', 14, '知识', '解释以吻合妥贴为准'],

  ['008.宋帝始生异象考.txt', 24, '方法', '用比例观察帝王异象'],
  ['008.宋帝始生异象考.txt', 57, '知识', '异象可见古人思想模式'],
  ['008.宋帝始生异象考.txt', 59, '方法', '排比研究可成论文题目'],

  ['009.宋禁科场书.txt', 3, '法权', '出版自由是意见自由要点'],
  ['009.宋禁科场书.txt', 11, '法权', '台湾出版法兼具预防追惩'],
  ['009.宋禁科场书.txt', 12, '法权', '宋代出版管制采检查制'],
  ['009.宋禁科场书.txt', 18, '政治', '以情报为名禁书因噎废食'],
  ['009.宋禁科场书.txt', 28, '方法', '禁书难堵潮流需求'],
  ['009.宋禁科场书.txt', 30, '写作', '可用宋会要写专题史'],

  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 4, '文化', '中国亲属计算偏向父系'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 5, '文化', '宋代家族制度父权化'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 6, '文化', '婚后居处以父处为主'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 8, '法权', '婚后妇人被吸收人格'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 12, '法权', '宋代婚姻属夫妻同体'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 34, '文化', '夫妻同体桎梏妇女'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 36, '方法', '用近代亲属法解释古法'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 52, '法权', '良贱为婚暴露身分等级'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 58, '法权', '禁监临婚娶防官吏强娶'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 68, '法权', '重婚禁令维护嫡庶形式'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 76, '情爱', '寡妇再嫁理论禁而现实多'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 81, '文化', '贞操思想成为礼教流毒'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 87, '法权', '夫妻贞操没有相对性'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 133, '情爱', '家长权力制造婚姻悲剧'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 154, '法权', '受虐妻子可提议离异'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 158, '情爱', '两愿离婚承认不相安'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 160, '法权', '丈夫失踪可裁判离婚'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 162, '法权', '被夫家亲强奸可请离'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 176, '法权', '义绝概率明显偏压妻方'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 180, '法权', '婚约约束多偏向女方'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 235, '法权', '离婚财产观偏向丈夫'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 251, '法权', '离婚手续核心是离书'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 299, '知识', '重视清明集等新史料'],
  ['010.夫妻同体主义下的宋代婚姻的无效撤销解消及其效力与手续.txt', 300, '方法', '法史写作受日本学者启发'],

  ['011.李易安再嫁了吗？.txt', 3, '文化', '才女受谣言源于嫉忌'],
  ['011.李易安再嫁了吗？.txt', 5, '知识', '近时记录也须检查手法'],
  ['011.李易安再嫁了吗？.txt', 12, '知识', '文章少传导致赝品可能'],
  ['011.李易安再嫁了吗？.txt', 13, '方法', '用作品与年岁反证再嫁'],
  ['011.李易安再嫁了吗？.txt', 16, '知识', '从称谓文征辨伪'],
  ['011.李易安再嫁了吗？.txt', 19, '方法', '用社会史推断案件不可信'],
  ['011.李易安再嫁了吗？.txt', 20, '法权', '官方命令再嫁说不成立'],
  ['011.李易安再嫁了吗？.txt', 24, '人格', '人格背景可作内在证据'],
  ['011.李易安再嫁了吗？.txt', 25, '知识', '做历史考据真不容易'],
  ['011.李易安再嫁了吗？.txt', 26, '情爱', '再嫁守寡都是个人私事'],

  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 8, '写作', '为亲者也不该讳错'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 13, '写作', '父子传记难在不乱捧'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 18, '知识', '打开天窗会曲解历史'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 19, '知识', '史料运用要守史源'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 20, '方法', '年谱史例法度要纯'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 23, '政治', '守旧派不能包装成新人物'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 35, '政治', '私德不能抵消卖国行为'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 41, '政治', '亲日解释经不起事实检验'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 55, '法权', '非法杀人不能洗作苦衷'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 63, '法权', '玩法弄权缺少法制观念'],
  ['012.对《徐树铮先生文集年谱合刊》的批评.txt', 68, '政治', '外蒙筹边高压后患无穷'],
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
  return fileName.replace(/^《[^《》]+》/u, bookTitle).replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'.，。！？、?:：；;\s]+/g, '')
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
  '- 保留可独立检索的历史观、人物判断、史料方法、出版自由、性道德法制、婚姻法权、节育运动、女性处境、年谱批评和政治判断等原文段落。',
  '- 删除纯史料罗列、年表日期、脚注书目、他人附录正文、表格碎片、目录页和档案馆页尾。',
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
