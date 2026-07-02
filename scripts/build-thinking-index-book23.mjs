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
  .find((name) => name.startsWith('008.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '023.你是景福门');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '023',
  title: '你是景福门',
  slug: 'ni-shi-jingfumen',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《你是景福门》47篇正文中提取可独立检索的思想段落，重点收六四后的台北姿态、匪情资料与专家迷信、人权双重标准、革命与反革命、台独权术、原住民土地权、台湾民性、省籍政治和民进党制度批评等主题；纯新闻铺垫、资料清单、重复例证、短笑话和附录推广文字未机械收录。',
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
  ['政治', '景福门不能冒充天安门', '001', 6, '景福门,天安门,御用文人,自由民主'],
  ['方法', '自由民主争取是长程', '002', 3, '自由民主,长程,代价,历史'],
  ['方法', '运动推进要适可而止', '002', 5, '学生运动,策略,里程碑,适可而止'],
  ['政治', '台北声援多是做秀', '002', 9, '台北,声援,做秀,哀悼'],
  ['方法', '知识分子不应随媒体滥情', '003', 2, '知识分子,滥情,媒体,真相'],
  ['政治', '滥情秀源于胆怯愚民', '003', 7, '国民党,滥情,胆怯,愚民'],
  ['方法', '匪情猜谜终会穿帮', '004', 7, '匪情专家,邓小平,猜谜,造谣'],
  ['政治', '反攻叫嚣是色厉内荏', '004', 8, '反攻大陆,机会,中苏,色厉内荏'],
  ['法权', '无力执法只是意诛', '004', 10, '法律,绳之以法,反攻大陆,意诛'],
  ['写作', '切片可作机会教育', '004', 11, '切片,机会教育,以小见大,清醒'],
  ['知识', '没有资讯无从谈大陆', '005', 3, '资讯,匪情资料,资料封锁,大陆问题'],
  ['方法', '封锁资料制造猜谜专家', '005', 4, '匪情专家,资料封锁,猜谜,研判'],
  ['方法', '匪情研判沦为猜谜', '005', 10, '匪情,研判,猜谜,记者'],
  ['方法', '批评先要核对原文', '006', 5, '批评,事实,栽诬,原文'],
  ['方法', '具体实惠不冲突理想', '006', 7, '橘子汁,自由民主,具体,理想'],
  ['人格', '栽诬不如承担代价', '006', 8, '栽诬,代价,战场,人格'],
  ['政治', '开放政策本身正确', '007', 6, '开放政策,现代化,学潮,中国'],
  ['政治', '中国病根在穷', '007', 10, '贫穷,贪污,知识分子,检讨'],
  ['方法', '台湾勿刺激大陆', '007', 12, '台湾,大陆,统一,刺激'],
  ['法权', '政治赦免历史罪行', '008', 9, '政治赦免,历史罪行,追诉,国民党'],
  ['法权', '国家赦免挡不住社会清算', '008', 10, '政治赦免,血债,清算,正义'],
  ['知识', '政治形势不等于历史赦免', '008', 11, '历史,赦免,张邦昌,吴襄'],
  ['写作', '历史罪行必须写清楚', '008', 12, '历史罪行,写作,是非,国民党'],
  ['人格', '真实了解要看阴暗', '009', 5, '索尔仁尼琴,台湾,监狱,真实'],
  ['人格', '异议者来台应自主去取', '009', 7, '刘宾雁,自主,对象选择,发言'],
  ['知识', '民运文化水平有差距', '010', 4, '民运,民阵,自由民主,文化水平'],
  ['政治', '亡命民运终有归宿问题', '010', 5, '民运,亡命,归宿,失根'],
  ['人格', '理想者要准备潦倒', '010', 6, '理想,亡命,潦倒,共产党员'],
  ['人格', '人可潦倒不可失格', '010', 7, '潦倒,失格,混乱,汉子'],
  ['法权', '台湾也阻隔人权斗士', '011', 4, '殷海光,海耶克,基本人权,台湾'],
  ['法权', '台湾人权斗士更艰苦', '011', 5, '人权斗士,殷海光,方励之,美国'],
  ['人格', '批判人权迫害不能选择性', '011', 6, '人权,知识分子,国民党,选择性'],
  ['方法', '以子之矛揭美国伪善', '012', 10, '美国,人权,伪善,国际公约'],
  ['法权', '美国伪善不正当化北京迫害', '012', 11, '美国,北京,人权,伪善'],
  ['法权', '人权争辩默认人权不可蹂躏', '012', 12, '人权,争辩,太平洋,改善'],
  ['方法', '要看见自己人的可恶', '013', 4, '自己人,国民党,民进党,醒觉'],
  ['政治', '美国打破平衡又不管', '014', 11, '库尔德,美国,生态平衡,伪善'],
  ['人格', '鼓励反抗者须承担后果', '014', 15, '库尔德,美国,鼓励,责任'],
  ['知识', '历史评价不能花瓶客观', '015', 4, '魏德迈,历史评价,客观,自由时报'],
  ['方法', '私人关系会扭曲判断', '015', 5, '魏德迈,蒋介石,私人关系,客观'],
  ['法权', '为匪宣传标准荒谬过宽', '016', 3, '为匪宣传,惩治叛乱条例,孙中山,国民党'],
  ['知识', '简体字不是罪状', '016', 4, '简体字,教育部,国民党,新闻局'],
  ['知识', '国民党与苏联爱恨互依', '017', 2, '国民党,苏联,外交,历史'],
  ['政治', '国民党低估赤化后果', '017', 4, '国民党,苏联,赤化,香港'],
  ['文化', '台湾低格调产品外溢', '018', 3, '台湾文化,大陆,低格调,产品'],
  ['文化', '文化冒名是亵渎苦难', '018', 7, '三毛,张乐平,苦难,文化'],
  ['知识', '中国称谓不能抹杀地理', '019', 4, '中国,地理,韩国,国民党'],
  ['方法', '地理历史标准不能胡搅', '019', 6, '中国,地理,历史,自欺欺人'],
  ['知识', '血洗台湾说法有待考证', '020', 5, '血洗台湾,中共,言论,考证'],
  ['方法', '反共义士名号须纠正', '021', 3, '反共义士,正名,国民党,名号'],
  ['方法', '正名使名实相符', '021', 6, '正名,孔子,名实,反共义士'],
  ['政治', '反共也会复制红色手法', '021', 7, '反共义士,红卫兵,自由民主,红色政权'],
  ['人格', '变节者靠斗人垫高忠贞', '021', 19, '变节者,忠贞,恐惧,寂寞'],
  ['文化', '布尔什维克气质难漂白', '021', 20, '布尔什维克,反共,变节,气质'],
  ['政治', '作恶之报大于因', '021', 25, '国民党,反共义士,作恶,报应'],
  ['政治', '国共都性好革命', '022', 2, '革命,国民党,共产党,孙中山'],
  ['知识', '革命本义被国共改写', '022', 3, '革命,反革命,改朝换代,国共'],
  ['法权', '反革命法规国共相激', '022', 23, '反革命,法规,国民党,共产党'],
  ['方法', '法统自居不能再革命', '022', 29, '法统,革命,国民党,逻辑'],
  ['政治', '中国人要革革命的命', '022', 32, '革命,反革命,中国人民,职业革命家'],
  ['政治', '小地方不能抗衡中国', '023', 6, '南越,中国,赵佗,两广独立'],
  ['知识', '南越终被统一', '023', 7, '南越,汉武帝,统一,历史'],
  ['政治', '国民党靠台独吃饭', '024', 7, '台独,国民党,民进党,权术'],
  ['方法', '敌人与兄弟可被权术互用', '024', 15, '权术,敌人,兄弟,台独牌'],
  ['政治', '台独受益人可能是国民党', '024', 17, '台独,国民党,民进党,受益人'],
  ['人格', '台湾人也可远望', '025', 8, '台湾人,远望,廖天欣,统一'],
  ['方法', '入联合国须先看门槛', '025', 10, '联合国,常识,台湾,中华人民共和国'],
  ['法权', '台湾单独出场缺法源', '025', 11, '台湾,法源,开罗宣言,中华民国'],
  ['知识', '高山族是真台湾人', '026', 2, '高山族,原住民,真台湾人,假台湾人'],
  ['知识', '假台湾人参与原住民灭绝', '026', 3, '原住民,汉人,荷兰人,种族灭绝'],
  ['法权', '土地侵夺制度化', '026', 4, '原住民,土地,高利贷,制度化'],
  ['法权', '台湾土地原属原住民', '027', 3, '原住民,土地,台北,万华'],
  ['法权', '官司可能成告自己', '027', 4, '原住民,司法,土地,熟番歌'],
  ['法权', '土地缩减造成生计困境', '027', 5, '原住民,土地,山地保留地,生计'],
  ['法权', '法庭抗争不等于正义', '028', 8, '吴凤,法庭抗争,正义,林勤纲'],
  ['人格', '同族也会杀错人', '028', 9, '吴凤,林勤纲,同族,反讽'],
  ['政治', '原独反讽名正言顺', '029', 9, '原独,原住民,临时政府,自治'],
  ['方法', '台湾主人要原到源头', '029', 10, '原独,台湾人,原住民,原罪'],
  ['方法', '听见原住民另一面声音', '030', 9, '原住民,印第安人,偏听,立场'],
  ['知识', '台湾原住民的族源位置', '030', 12, '台湾原住民,高山族,语系,百越'],
  ['政治', '省籍党籍之争是强盗鬼打架', '030', 14, '原住民,省籍,党籍,假台湾人'],
  ['文化', '原住民不应被固定成展品', '031', 14, '原住民,进取,人类学,博物馆'],
  ['法权', '赎罪心胸保障原住民权益', '031', 18, '原住民,宪法,权益,赎罪'],
  ['政治', '原住民要超出两党骗子', '031', 19, '高山党,国民党,民进党,原住民'],
  ['法权', '猎权中主客颠倒', '032', 4, '布农族,玉山,打猎,主客颠倒'],
  ['文化', '功利是台湾民性的根', '033', 5, '台湾民性,功利,府志,诸罗县志'],
  ['文化', '功利心延续为现实习性', '033', 6, '功利,现实,商业道德,台湾人'],
  ['政治', '统治者会利用功利民性', '033', 7, '功利民性,统治者,笼络,分化'],
  ['文化', '功利也创造经济奇迹', '033', 26, '功利主义,台湾经济,商人,成功'],
  ['文化', '官迷有两层', '034', 4, '官迷,头衔,选举,台湾人'],
  ['文化', '官位稀缺养成官迷', '034', 7, '官迷,日本统治,官位,台湾人'],
  ['人格', '政治官迷太没出息', '034', 10, '官迷,政治,台湾人,没出息'],
  ['政治', '地方首长小气争亏', '035', 6, '地方政治,台北市,台北县,小气'],
  ['文化', '民主圣火可成封建戏法', '036', 4, '黑名单,民主圣火,龙山寺,封建'],
  ['方法', '假装活动成年后成自闭', '036', 8, '黑名单,假装活动,自闭,民进党'],
  ['法权', '返国权是基本人权', '036', 16, '黑名单,返国权,迁徙自由,人权'],
  ['方法', '开门揖盗是懦种挑战', '036', 17, '黑名单,开门揖盗,懦种,台独'],
  ['方法', '省籍指控要受事实检验', '037', 5, '省籍,萧天赞,事实,民进党'],
  ['政治', '台湾人身份不是护符', '037', 7, '省籍,台湾人,外省人,司法'],
  ['法权', '法官中立是必要形式', '038', 5, '法官,党籍,司法中立,宪法'],
  ['政治', '民进党也会推翻理想', '038', 6, '民进党,司法,理想,倒车'],
  ['知识', '劣币驱逐良币', '039', 2, '格雷欣法则,劣币,良币,经济学'],
  ['人格', '朱高正是劣币之尤', '039', 8, '朱高正,忘恩负义,劣币,政治犯'],
  ['政治', '派系都是劣币', '039', 9, '新潮流系,朱高正,劣币,派系'],
  ['政治', '派系解散不能只靠宣布', '040', 3, '前进系,派系,解散,民进党'],
  ['法权', '破坏制度以殉一人', '040', 5, '制度,民进党,朱高正,新潮流系'],
  ['方法', '真话也要看时机', '041', 4, '真话,时机,政治技巧,雷震'],
  ['方法', '打着红旗反红旗', '041', 5, '台独,政治技巧,周恩来,群众'],
  ['方法', '将军不能只保卒', '041', 6, '权术,黄信介,朱高正,新潮流系'],
  ['文化', '人格者是不通中文', '042', 13, '人格者,中文,日文,正名'],
  ['人格', '大德高于小德', '042', 15, '人格,大德,党外,一党独大'],
  ['政治', '夺权成功会使人格变低', '042', 18, '党外,民进党,权力,腐化'],
  ['人格', '民进党人格层次已下降', '042', 19, '民进党,人格,权势,国民党'],
  ['方法', '政客不适格谈人格', '042', 22, '人格,政客,适格,道德'],
  ['政治', '民进党建党误学苏联', '043', 6, '民进党,苏联,国民党,党纪'],
  ['法权', '系权凌驾党权不是民主', '043', 8, '新潮流系,系权,党权,民主政党'],
  ['政治', '党工特工路线夺权', '043', 9, '新潮流系,党工,特工,夺权'],
  ['文化', '党旗仪式也裹胁贵宾', '044', 8, '民进党,党旗,贵宾,仪式'],
  ['人格', '政党应不自卑不自大', '044', 9, '民进党,自卑,自大,政党'],
  ['方法', '选举是小目标手段', '045', 9, '大目标,小目标,选举,党外'],
  ['人格', '苦难时代须警觉小目标', '045', 11, '大目标,小目标,苦难,警觉'],
  ['政治', '两系都已堕落', '045', 13, '美丽岛系,新潮流系,大目标,台独'],
  ['政治', '台湾政党错过大路', '045', 14, '国民党,民进党,大路,无能'],
  ['方法', '懂法律可少挨揍', '046', 4, '民进党,集会游行法,法律,权谋'],
  ['方法', '环保与繁荣有代价', '047', 9, '环保,繁荣,工业,宜兰'],
  ['政治', '拆台者要承担后果', '047', 11, '陈定南,宜兰,责任,政客'],
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
    `# 《${book.title}》思想索引（${book.round}）`,
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
    '- 纯新闻铺垫、长篇资料清单、短笑话、重复例证和附录推广文字不单独收录。',
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
if (records.length !== 126) {
  throw new Error(`Expected 126 records, got ${records.length}`);
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
