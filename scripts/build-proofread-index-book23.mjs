import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '023.你是景福门');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT023-010', '“切片可作机会教育”偏写作说明，思想承载力弱于同篇政治判断。'],
  ['LAT023-016', '康宁祥个案攻防色彩重，和“具体实惠不冲突理想”“批评先要核对原文”重复。'],
  ['LAT023-017', '开放政策判断为大风文章转述，李敖本人的思想索引承载较弱。'],
  ['LAT023-018', '中国病根在穷同为大风转述，且贫穷主题在总表中已有更直接条目承载。'],
  ['LAT023-043', '国民党与苏联爱恨互依偏历史铺垫，保留“低估赤化后果”的结论段。'],
  ['LAT023-049', '“血洗台湾”考证只有短事实提示，未形成足够独立的思想索引入口。'],
  ['LAT023-050', '“反共义士”名号泛滥与后文“正名使名实相符”重复，保留后者。'],
  ['LAT023-056', '国共性好革命偏开场铺垫，保留革命本义、反革命法规和革革命命等更强条目。'],
  ['LAT023-062', '南越终被统一偏历史例证补充，保留“小地方不能抗衡中国”的思想结论。'],
  ['LAT023-066', '台湾人也可远望偏人物感叹，索引价值弱于联合国、法源和台独权术条目。'],
  ['LAT023-072', '台湾土地原属原住民与“高山族是真台湾人”“土地侵夺制度化”重复。'],
  ['LAT023-080', '原住民族源位置偏知识资料，和本书原住民土地权、政治反讽主线距离较远。'],
  ['LAT023-083', '赎罪心胸保障权益过短，且主要是声明摘句，保留更具制度方案的相邻条目。'],
  ['LAT023-087', '功利现实习性与“功利是台湾民性的根”重复，校对轮保留更集中段落。'],
  ['LAT023-093', '地方首长争亏偏单一短评，思想承载力弱于台湾民性和民进党制度批评主线。'],
  ['LAT023-098', '萧天赞案事实铺陈较重，保留“台湾人身份不是护符”的原则判断。'],
  ['LAT023-105', '派系解散条目段落过长且杂，保留“破坏制度以殉一人”的制度判断。'],
  ['LAT023-113', '民进党人格层次下降与“夺权成功会使人格变低”重复。'],
  ['LAT023-118', '党旗仪式偏会议细节，保留“不自卑不自大”的政党人格判断。'],
]);

const overrides = new Map([
  ['LAT023-001', { title: '景福门不是天安门', keywords: '景福门,天安门,御用文人,自由民主' }],
  ['LAT023-002', { title: '自由民主争取是长程', keywords: '自由民主,长程,代价,历史' }],
  ['LAT023-003', { title: '运动推进须适可而止', keywords: '学生运动,策略,里程碑,适可而止' }],
  ['LAT023-004', { title: '台北声援多半是做秀', keywords: '台北,声援,做秀,哀悼' }],
  ['LAT023-005', { title: '知识分子不该跟着滥情', keywords: '知识分子,滥情,媒体,真相' }],
  ['LAT023-006', { title: '滥情秀源于胆怯愚民', keywords: '国民党,滥情,胆怯,愚民' }],
  ['LAT023-007', { title: '匪情猜谜终会穿帮', keywords: '匪情专家,邓小平,猜谜,造谣' }],
  ['LAT023-008', { title: '反攻叫嚣只是色厉内荏', keywords: '反攻大陆,机会,中苏,色厉内荏' }],
  ['LAT023-009', { title: '无力执法只是意诛', keywords: '法律,绳之以法,反攻大陆,意诛' }],
  ['LAT023-011', { title: '没有资讯无从谈大陆', keywords: '资讯,匪情资料,资料封锁,大陆问题' }],
  ['LAT023-012', { title: '资料封锁制造猜谜专家', keywords: '匪情专家,资料封锁,猜谜,研判' }],
  ['LAT023-013', { title: '匪情研判沦为猜谜', keywords: '匪情,研判,猜谜,记者' }],
  ['LAT023-014', { title: '批评先要核对原文', keywords: '批评,事实,栽诬,原文' }],
  ['LAT023-015', { title: '具体实惠不冲突理想', keywords: '橘子汁,自由民主,具体,理想' }],
  ['LAT023-019', { title: '台湾不要刺激大陆', keywords: '台湾,大陆,统一,刺激' }],
  ['LAT023-020', { title: '政治赦免历史罪行', keywords: '政治赦免,历史罪行,追诉,国民党' }],
  ['LAT023-021', { title: '国家赦免挡不住社会清算', keywords: '政治赦免,血债,清算,正义' }],
  ['LAT023-022', { title: '政治形势不等于历史赦免', keywords: '历史,赦免,张邦昌,吴襄' }],
  ['LAT023-023', { title: '历史罪行必须写清楚', keywords: '历史罪行,写作,是非,国民党' }],
  ['LAT023-024', { category: '方法', title: '真实了解要看阴暗处', keywords: '索尔仁尼琴,台湾,监狱,真实' }],
  ['LAT023-025', { title: '异议者来台应自主去取', keywords: '刘宾雁,自主,对象选择,发言' }],
  ['LAT023-026', { title: '民运文化水平仍有差距', keywords: '民运,民阵,自由民主,文化水平' }],
  ['LAT023-027', { title: '亡命民运终有归宿问题', keywords: '民运,亡命,归宿,失根' }],
  ['LAT023-028', { title: '理想者要准备潦倒', keywords: '理想,亡命,潦倒,共产党员' }],
  ['LAT023-029', { title: '人可潦倒不可失格', keywords: '潦倒,失格,混乱,汉子' }],
  ['LAT023-030', { title: '台湾也阻隔人权斗士', keywords: '殷海光,海耶克,基本人权,台湾' }],
  ['LAT023-031', { title: '台湾人权斗士更艰苦', keywords: '人权斗士,殷海光,方励之,美国' }],
  ['LAT023-032', { category: '方法', title: '人权批判不能选择性', keywords: '人权,知识分子,国民党,选择性' }],
  ['LAT023-033', { title: '以子之矛揭美国伪善', keywords: '美国,人权,伪善,国际公约' }],
  ['LAT023-034', { title: '美国伪善不正当化北京迫害', keywords: '美国,北京,人权,伪善' }],
  ['LAT023-035', { title: '人权争辩默认人权不可蹂躏', keywords: '人权,争辩,太平洋,改善' }],
  ['LAT023-036', { title: '要看见自己人的可恶', keywords: '自己人,国民党,民进党,醒觉' }],
  ['LAT023-037', { title: '美国打破平衡又不管', keywords: '库尔德,美国,生态平衡,伪善' }],
  ['LAT023-038', { title: '鼓励反抗者须承担后果', keywords: '库尔德,美国,鼓励,责任' }],
  ['LAT023-039', { title: '历史评价不能花瓶客观', keywords: '魏德迈,历史评价,客观,自由时报' }],
  ['LAT023-040', { title: '私人关系会扭曲判断', keywords: '魏德迈,蒋介石,私人关系,客观' }],
  ['LAT023-041', { title: '为匪宣传标准荒谬过宽', keywords: '为匪宣传,惩治叛乱条例,孙中山,国民党' }],
  ['LAT023-042', { title: '简体字不是罪状', keywords: '简体字,教育部,国民党,新闻局' }],
  ['LAT023-044', { title: '国民党低估赤化后果', keywords: '国民党,苏联,赤化,香港' }],
  ['LAT023-045', { title: '台湾低格调产品外溢', keywords: '台湾文化,大陆,低格调,产品' }],
  ['LAT023-046', { title: '文化冒名是亵渎苦难', keywords: '三毛,张乐平,苦难,文化' }],
  ['LAT023-047', { title: '中国称谓不能抹杀地理', keywords: '中国,地理,韩国,国民党' }],
  ['LAT023-048', { title: '地理历史标准不能胡搅', keywords: '中国,地理,历史,自欺欺人' }],
  ['LAT023-051', { title: '正名使名实相符', keywords: '正名,孔子,名实,反共义士' }],
  ['LAT023-052', { title: '反共也会复制红色手法', keywords: '反共义士,红卫兵,自由民主,红色政权' }],
  ['LAT023-053', { title: '变节者靠斗人垫高忠贞', keywords: '变节者,忠贞,恐惧,寂寞' }],
  ['LAT023-054', { title: '布尔什维克气质难漂白', keywords: '布尔什维克,反共,变节,气质' }],
  ['LAT023-055', { title: '作恶之报大于因', keywords: '国民党,反共义士,作恶,报应' }],
  ['LAT023-057', { title: '革命本义被国共改写', keywords: '革命,反革命,改朝换代,国共' }],
  ['LAT023-058', { title: '反革命法规国共相激', keywords: '反革命,法规,国民党,共产党' }],
  ['LAT023-059', { title: '法统自居不能再革命', keywords: '法统,革命,国民党,逻辑' }],
  ['LAT023-060', { title: '中国人要革革命的命', keywords: '革命,反革命,中国人民,职业革命家' }],
  ['LAT023-061', { title: '小地方不能抗衡中国', keywords: '南越,中国,赵佗,两广独立' }],
  ['LAT023-063', { title: '国民党靠台独吃饭', keywords: '台独,国民党,民进党,权术' }],
  ['LAT023-064', { title: '敌人与兄弟可被权术互用', keywords: '权术,敌人,兄弟,台独牌' }],
  ['LAT023-065', { title: '台独受益人可能是国民党', keywords: '台独,国民党,民进党,受益人' }],
  ['LAT023-067', { title: '入联合国须先看门槛', keywords: '联合国,常识,台湾,中华人民共和国' }],
  ['LAT023-068', { title: '台湾单独出场缺法源', keywords: '台湾,法源,开罗宣言,中华民国' }],
  ['LAT023-069', { title: '高山族是真台湾人', keywords: '高山族,原住民,真台湾人,假台湾人' }],
  ['LAT023-070', { title: '假台湾人参与原住民灭绝', keywords: '原住民,汉人,荷兰人,种族灭绝' }],
  ['LAT023-071', { title: '土地侵夺制度化', keywords: '原住民,土地,高利贷,制度化' }],
  ['LAT023-073', { title: '原住民告官可能成告自己', keywords: '原住民,司法,土地,熟番歌' }],
  ['LAT023-074', { title: '土地缩减造成生计困境', keywords: '原住民,土地,山地保留地,生计' }],
  ['LAT023-075', { title: '法庭抗争不等于正义', keywords: '吴凤,法庭抗争,正义,林勤纲' }],
  ['LAT023-076', { title: '同族也会杀错人', keywords: '吴凤,林勤纲,同族,反讽' }],
  ['LAT023-077', { title: '原独反讽名正言顺', keywords: '原独,原住民,临时政府,自治' }],
  ['LAT023-078', { title: '台湾主人要原到源头', keywords: '原独,台湾人,原住民,原罪' }],
  ['LAT023-079', { title: '听见原住民另一面声音', keywords: '原住民,印第安人,偏听,立场' }],
  ['LAT023-081', { title: '省籍党籍之争是强盗鬼打架', keywords: '原住民,省籍,党籍,假台湾人' }],
  ['LAT023-082', { title: '原住民不应被固定成展品', keywords: '原住民,进取,人类学,博物馆' }],
  ['LAT023-084', { title: '原住民要超出两党骗子', keywords: '高山党,国民党,民进党,原住民' }],
  ['LAT023-085', { title: '猎权中主客颠倒', keywords: '布农族,玉山,打猎,主客颠倒' }],
  ['LAT023-086', { title: '功利是台湾民性的根', keywords: '台湾民性,功利,府志,诸罗县志' }],
  ['LAT023-088', { title: '统治者会利用功利民性', keywords: '功利民性,统治者,笼络,分化' }],
  ['LAT023-089', { title: '功利也创造经济奇迹', keywords: '功利主义,台湾经济,商人,成功' }],
  ['LAT023-090', { title: '官迷有两层', keywords: '官迷,头衔,选举,台湾人' }],
  ['LAT023-091', { title: '官位稀缺养成官迷', keywords: '官迷,日本统治,官位,台湾人' }],
  ['LAT023-092', { title: '政治官迷太没出息', keywords: '官迷,政治,台湾人,没出息' }],
  ['LAT023-094', { title: '民主圣火可成封建戏法', keywords: '黑名单,民主圣火,龙山寺,封建' }],
  ['LAT023-095', { title: '政治假装会演成自闭', keywords: '黑名单,假装活动,自闭,民进党' }],
  ['LAT023-096', { title: '返国权是基本人权', keywords: '黑名单,返国权,迁徙自由,人权' }],
  ['LAT023-097', { title: '开门揖盗是懦种挑战', keywords: '黑名单,开门揖盗,懦种,台独' }],
  ['LAT023-099', { title: '台湾人身份不是护符', keywords: '省籍,台湾人,外省人,司法' }],
  ['LAT023-100', { title: '法官中立是必要形式', keywords: '法官,党籍,司法中立,宪法' }],
  ['LAT023-101', { title: '民进党也会推翻理想', keywords: '民进党,司法,理想,倒车' }],
  ['LAT023-102', { title: '劣币驱逐良币', keywords: '格雷欣法则,劣币,良币,经济学' }],
  ['LAT023-103', { title: '朱高正是劣币之尤', keywords: '朱高正,忘恩负义,劣币,政治犯' }],
  ['LAT023-104', { title: '派系都是劣币', keywords: '新潮流系,朱高正,劣币,派系' }],
  ['LAT023-106', { title: '破坏制度以殉一人', keywords: '制度,民进党,朱高正,新潮流系' }],
  ['LAT023-107', { title: '真话也要看时机', keywords: '真话,时机,政治技巧,雷震' }],
  ['LAT023-108', { title: '打着红旗反红旗', keywords: '台独,政治技巧,周恩来,群众' }],
  ['LAT023-109', { title: '将军不能只保卒', keywords: '权术,黄信介,朱高正,新潮流系' }],
  ['LAT023-110', { title: '人格者是不通中文', keywords: '人格者,中文,日文,正名' }],
  ['LAT023-111', { title: '大德高于小德', keywords: '人格,大德,党外,一党独大' }],
  ['LAT023-112', { title: '夺权成功会使人格变低', keywords: '党外,民进党,权力,腐化' }],
  ['LAT023-114', { title: '政客不适格谈人格', keywords: '人格,政客,适格,道德' }],
  ['LAT023-115', { title: '民进党建党误学苏联', keywords: '民进党,苏联,国民党,党纪' }],
  ['LAT023-116', { title: '系权凌驾党权不是民主', keywords: '新潮流系,系权,党权,民主政党' }],
  ['LAT023-117', { title: '党工特工路线夺权', keywords: '新潮流系,党工,特工,夺权' }],
  ['LAT023-119', { title: '政党应不自卑不自大', keywords: '民进党,自卑,自大,政党' }],
  ['LAT023-120', { title: '选举是小目标手段', keywords: '大目标,小目标,选举,党外' }],
  ['LAT023-121', { title: '苦难时代须警觉小目标', keywords: '大目标,小目标,苦难,警觉' }],
  ['LAT023-122', { title: '两系都已堕落', keywords: '美丽岛系,新潮流系,大目标,台独' }],
  ['LAT023-123', { title: '台湾政党错过大路', keywords: '国民党,民进党,大路,无能' }],
  ['LAT023-124', { title: '懂法律可少挨揍', keywords: '民进党,集会游行法,法律,权谋' }],
  ['LAT023-125', { title: '环保与繁荣有代价', keywords: '环保,繁荣,工业,宜兰' }],
  ['LAT023-126', { title: '拆台者要承担后果', keywords: '陈定南,宜兰,责任,政客' }],
]);

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
    'proofread_from',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；删除重复、铺垫、第三方转述过重、单一时事考证和思想承载力较弱的条目。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
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
      lines.push(`- 提取轮编号：${record.proofread_from}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const counts = categoryCounts(records, taxonomy);

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮由提取轮 ${originalRecords.length} 条校对为 ${records.length} 条，删除 ${dropReasons.size} 条。`,
    '',
    '校对动作只涉及条目取舍、分类、标题、关键词和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 107) {
  throw new Error(`Expected 107 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT023-${String(index + 1).padStart(3, '0')}`,
    book: bookBase.title,
    round: bookBase.round,
    status: bookBase.status,
    proofread_from: record.id,
  };
});

const allowedCategories = new Set(taxonomy);
for (const record of records) {
  if (!allowedCategories.has(record.category)) {
    throw new Error(`Unexpected category for ${record.id}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...bookBase,
    record_count: records.length,
    category_counts: categoryCounts(records, taxonomy),
  },
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${bookBase.title} ${bookBase.round}: ${records.length} records.`);
