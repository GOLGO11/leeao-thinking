import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '020.世论新语');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT020-007', '退党动机判断偏时事性，政治原则已由“互相利用不是政治原则”等条目承载。'],
  ['LAT020-010', '威权谎言列举较长，核心判断已由“欺骗人比欺负人更坏”和“谎话粗制滥造也可耻”承载。'],
  ['LAT020-017', '给原住民历史公道的判断与下一条“共同反省”重复，保留后者。'],
  ['LAT020-022', '未明事实不宜借题发挥与下一条公道原则相邻重复，保留表达更完整的后者。'],
  ['LAT020-029', '革命口号空心化与政党标签空心化重复，保留覆盖国民党和民进党的后者。'],
  ['LAT020-034', '紧急避难法理偏概念铺垫，核心司法自保批判由下一条承载。'],
  ['LAT020-039', '余登发反台独的具体立场偏人物史，保留更抽象的“时髦不能动”判断。'],
  ['LAT020-046', '公共遗迹利众生是对上一条历史遗迹判断的应用，校对轮保留更通用的原则条目。'],
  ['LAT020-047', '裸体形象段落夹杂过多人物调侃，身体观与标准一致性由下一条承载。'],
  ['LAT020-051', '见不义乱为是上一条勇气与正义关系的压缩结论，保留论证更完整的前条。'],
  ['LAT020-053', '检察官辞职勇气偏单一人事评论，政治责任条目已覆盖。'],
  ['LAT020-056', '被阁员拖着走偏当时人事消耗，行政魄力与政治责任已有更通用条目。'],
  ['LAT020-059', '建国史非国民党一党偏历史背景，国家承认与政府承认的法理条目更具索引价值。'],
  ['LAT020-062', '党外催生民进党偏事实辨析，许信良“霸才”条目更能承载政治判断。'],
  ['LAT020-065', '未统治到不等于自外中央与台湾论述法理条目重复。'],
  ['LAT020-066', '秦卫历史比喻偏长例证，归属论述已由历史地理法理和条约用词两条承载。'],
  ['LAT020-073', '和平奖误读自由解放过短且判断已由神权遗产不是自由承载。'],
  ['LAT020-074', '达赖非暴力作为策略遁词与后文非暴力动机辨析重复。'],
  ['LAT020-077', '同情神权不是自由与神权遗产、财权特权两条重复。'],
  ['LAT020-078', '西藏农奴制度偏事实铺陈，校对轮保留更直接的神权和迷信判断。'],
  ['LAT020-081', '非暴力口号与圣人名义被政客借用重复，保留后者。'],
  ['LAT020-084', '安全时作秀不算勇敢与雪中送炭判断重复，且时事场景较重。'],
  ['LAT020-087', '粗暴政治革民主的命与民主气质被暴力破坏重复。'],
  ['LAT020-094', '法律威信被儿戏化是守法重于立法的铺垫，保留后者。'],
  ['LAT020-097', '放手后法官未必可用是司法系统受损后的延伸，保留前条。'],
  ['LAT020-102', '不求回报才见真情偏人物记功，早期受难者公平与苦难成果两条更重要。'],
  ['LAT020-104', '延长任期同属违宪与短期违宪也是违宪重复。'],
  ['LAT020-106', '为政不可事必躬亲与治理分层授权重复，保留更完整的古典论证。'],
  ['LAT020-108', '大小不分是政治渺小是治理分层授权的反面说明，校对轮保留前条。'],
  ['LAT020-109', '共牢难友争权与前面共患难者争权违背政治伦理重复。'],
  ['LAT020-111', '选举戏制造民主假象与选举服务统治、选举工具化重复。'],
  ['LAT020-112', '两党迷信选举各有所图与选举工具化重复。'],
  ['LAT020-118', '批评敌人守事实与敌人也不该被诬蔑重复。'],
  ['LAT020-122', '行政首长越位管小事与为政无为、治理分层授权重复。'],
  ['LAT020-123', '行政首长迷信谄神与知识分子政客搞低级迷信重复。'],
]);

const overrides = new Map([
  ['LAT020-001', { title: '古文义法不等于思想', keywords: '桐城派,义法,思想,古文' }],
  ['LAT020-002', { title: '文体解放要平易有力', keywords: '梁启超,文体,平易,解放' }],
  ['LAT020-003', { title: '文言活法仍是死文字', keywords: '文言,白话文,文字生命' }],
  ['LAT020-004', { title: '白话成败在思想', keywords: '白话文,思想,文章,混乱' }],
  ['LAT020-005', { title: '短论可以形成突击文体', keywords: '短促突击,文体,专栏' }],
  ['LAT020-006', { title: '互相利用不是政治原则', keywords: '政治利用,原则,国民党,民进党' }],
  ['LAT020-008', { title: '媒体可颠倒知识风骨', keywords: '媒体,读书人,骨气,知识评价' }],
  ['LAT020-009', { title: '人权应先检验本地黑暗', keywords: '人权,监狱,本地黑暗,调查' }],
  ['LAT020-011', { title: '欺骗人比欺负人更坏', keywords: '欺骗,欺负,言论自由,威权' }],
  ['LAT020-012', { title: '谎话粗制滥造也可耻', keywords: '谎话,宣传,粗制滥造,政治语言' }],
  ['LAT020-013', { title: '写作还要面对出版和读者', keywords: '写作,出版者,读者,胆量' }],
  ['LAT020-014', { title: '领袖责任不能用蒙蔽开脱', keywords: '领袖,责任,蒙蔽,威权' }],
  ['LAT020-015', { title: '总统权力不能越出宪法', keywords: '总统,宪法,权力边界,市产' }],
  ['LAT020-016', { title: '为政不可沉溺小事', keywords: '无为而治,行政,小事,治道' }],
  ['LAT020-018', { title: '原住民尺度逼出共同反省', keywords: '原住民,台湾人,历史反省,侵略者' }],
  ['LAT020-019', { title: '改名词不是解决问题', keywords: '名词,问题解决,政治语言' }],
  ['LAT020-020', { title: '史料图像不可加工', keywords: '历史照片,史料,新闻,加工' }],
  ['LAT020-021', { title: '财产公开要交代来源', keywords: '财产公开,财产来源,政治人物' }],
  ['LAT020-023', { title: '公道也要给异见者', keywords: '公道,异见者,公平,彭明敏' }],
  ['LAT020-024', { title: '权力立法常让别人守', keywords: '立法,守法,特权,国民党' }],
  ['LAT020-025', { title: '政府毁小法终会自毁', keywords: '政府,法律威信,自毁,法治' }],
  ['LAT020-026', { title: '宪法权利不该只在课本', keywords: '宪法,结社自由,课本,人民权利' }],
  ['LAT020-027', { title: '认真行使宪法权利不荒谬', keywords: '宪法,迁徙自由,权利实践,反讽' }],
  ['LAT020-028', { title: '不应替历史惭愧而逃避自身', keywords: '历史公道,惭愧,当代责任,懦弱' }],
  ['LAT020-030', { title: '政党标签可能空心化', keywords: '政党属性,民主,进步,羊头狗肉' }],
  ['LAT020-031', { title: '司法法务须脱离政党', keywords: '司法,法务,政党入侵,独立' }],
  ['LAT020-032', { title: '被指控不是证据', keywords: '证据,推理,指控,特务逻辑' }],
  ['LAT020-033', { title: '调查须直面核心涉案人', keywords: '调查,涉案人,证据认定,检察官' }],
  ['LAT020-035', { title: '不可牺牲司法自保', keywords: '司法,政治责任,自保,替死鬼' }],
  ['LAT020-036', { title: '乱命不值得遵守', keywords: '乱命,行政办法,法治,服从' }],
  ['LAT020-037', { title: '无为可减少政府厌恶', keywords: '无为,政府,政治厌恶' }],
  ['LAT020-038', { title: '政治纪念过度损害象征', keywords: '纪念,政治符号,无为,反感' }],
  ['LAT020-040', { title: '大丈夫还要抵抗时髦', keywords: '大丈夫,时髦,孟子,余登发' }],
  ['LAT020-041', { title: '抵抗流行比抵抗威权更难', keywords: '流行,勇气,时髦不能动,人格' }],
  ['LAT020-042', { title: '骂人要以幽默化怒气', keywords: '骂人,幽默,怒气,文章' }],
  ['LAT020-043', { title: '人权不能从大官开始', keywords: '人权,律师,普通人,权利保护' }],
  ['LAT020-044', { title: '程序权利也是人权', keywords: '程序权利,律师,阅卷,冤狱' }],
  ['LAT020-045', { title: '可耻遗迹不必神圣保存', keywords: '历史遗迹,保存,可耻,文化资产' }],
  ['LAT020-048', { title: '传统孝道标准要一致', keywords: '孝道,标准一致,裸体,封建观念' }],
  ['LAT020-049', { title: '政治利益不能抹掉恩义', keywords: '恩义,政治利益,郑南榕,林正杰' }],
  ['LAT020-050', { title: '勇气必须奠基正义', keywords: '勇气,正义,政治责任,大臣' }],
  ['LAT020-052', { title: '政治责任高于法律责任', keywords: '政治责任,法律责任,官员,大臣' }],
  ['LAT020-054', { title: '政治问题不能靠法律清白', keywords: '政治问题,法律清白,行政院长,形象' }],
  ['LAT020-055', { title: '行政魄力在快刀斩乱麻', keywords: '行政魄力,决断,辞职,快刀斩乱麻' }],
  ['LAT020-057', { title: '共患难者争权违背政治伦理', keywords: '难友,争权,政治伦理,民进党' }],
  ['LAT020-058', { title: '回归宪法不能要求违宪', keywords: '宪法,违宪,思路,总统权力' }],
  ['LAT020-060', { title: '国家承认不同于政府承认', keywords: '国际法,国家承认,政府承认,法理' }],
  ['LAT020-061', { title: '霸才不会被权力打垮', keywords: '霸才,人才,权力斗争,许信良' }],
  ['LAT020-063', { title: '严肃目标不能儿戏处理', keywords: '政治行动,严肃目标,儿戏,方法' }],
  ['LAT020-064', { title: '台湾论述须合历史地理法理', keywords: '台湾问题,历史,地理,国际法' }],
  ['LAT020-067', { title: '条约用词能辨明归属', keywords: '开罗宣言,波茨坦宣言,台湾归属,条约' }],
  ['LAT020-068', { title: '知识分子不能逃避现实', keywords: '知识分子,现实,学术,逃避' }],
  ['LAT020-069', { title: '知识分子标准不应错乱', keywords: '知识分子,标准,文化评价,书法' }],
  ['LAT020-070', { title: '知识分子不可失廉隅', keywords: '知识分子,名义,廉隅,士人' }],
  ['LAT020-071', { title: '忠诚须经过判断', keywords: '忠诚,判断,愚忠,程咬金' }],
  ['LAT020-072', { title: '神权遗产不是自由', keywords: '神权,西藏,自由,解放' }],
  ['LAT020-075', { title: '非暴力也要辨认动机', keywords: '非暴力,动机,达赖,策略' }],
  ['LAT020-076', { title: '神权背后常有财权', keywords: '神权,财权,特权,达赖' }],
  ['LAT020-079', { title: '知识分子不该投向迷信', keywords: '知识分子,密宗,迷信,邪教' }],
  ['LAT020-080', { title: '政治策略要承认事实', keywords: '中国,事实,策略,现实判断' }],
  ['LAT020-082', { title: '借圣人名义会败坏运动', keywords: '甘地,非暴力,政客,政治运动' }],
  ['LAT020-083', { title: '真正支援是雪中送炭', keywords: '雪中送炭,支援,勇气,风险' }],
  ['LAT020-085', { title: '宪政需要总统无为', keywords: '宪法,总统,无为,权力限制' }],
  ['LAT020-086', { title: '暴力会破坏民主气质', keywords: '民主,暴力,政治气质,民进党' }],
  ['LAT020-088', { title: '宗教应实际救众生', keywords: '宗教,佛法,众生,实际行动' }],
  ['LAT020-089', { title: '反对派也会重演旧恶', keywords: '反对派,国民党,民进党,旧恶' }],
  ['LAT020-090', { title: '同志爱不是利用别人坐牢', keywords: '同志爱,坐牢,许信良,政治伦理' }],
  ['LAT020-091', { title: '官僚文化部会毁文化', keywords: '文化部,官僚,文化政策,文豪' }],
  ['LAT020-092', { title: '迫害不是尊重知识分子', keywords: '知识分子,迫害,尊重,国民党' }],
  ['LAT020-093', { title: '重典先问大官责任', keywords: '重典,大官,责任,执法' }],
  ['LAT020-095', { title: '守法重于立法', keywords: '守法,立法,司法独立,法治' }],
  ['LAT020-096', { title: '司法独立须重建习惯', keywords: '司法,政治干涉,法官,独立' }],
  ['LAT020-098', { title: '批判仍要记住历史对象', keywords: '蒋介石,记忆,批判,历史' }],
  ['LAT020-099', { title: '恶棍评价标准会降低', keywords: '恶棍,坏事,评价标准,政治人物' }],
  ['LAT020-100', { title: '公平应还给早期受难者', keywords: '白色恐怖,受难者,公平,美丽岛' }],
  ['LAT020-101', { title: '苦难成果不该被垄断', keywords: '苦难,政治成果,美丽岛,自私' }],
  ['LAT020-103', { title: '短期违宪也是违宪', keywords: '违宪,临时条款,国代,共犯' }],
  ['LAT020-105', { title: '受过教育者不应政治迷信', keywords: '迷信,政客,知识分子,庙' }],
  ['LAT020-107', { title: '治理要分层授权', keywords: '为治有体,治理,授权,分工' }],
  ['LAT020-110', { title: '选举也能服务统治', keywords: '选举,统治,民主,权力' }],
  ['LAT020-113', { title: '选举可被各方工具化', keywords: '选举,工具化,国民党,民进党' }],
  ['LAT020-114', { title: '民主政党不该复制极权门槛', keywords: '政党,入党门槛,极权,民进党' }],
  ['LAT020-115', { title: '政党气度要容纳族群', keywords: '政党,气度,族群,代表性' }],
  ['LAT020-116', { title: '忘恩不义应受谴责', keywords: '忘恩负义,政治伦理,施性忠,谴责' }],
  ['LAT020-117', { title: '敌人也不该被诬蔑', keywords: '敌人,诬蔑,公道,事实' }],
  ['LAT020-119', { title: '民主斗争要文武兼具', keywords: '民主斗争,文武兼具,苏秋镇,政治行动' }],
  ['LAT020-120', { title: '代议士要紧追人民权利', keywords: '代议士,人民权利,监督,法案' }],
  ['LAT020-121', { title: '民主程序不能选择性适用', keywords: '初选,民主程序,总统,副总统' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复、铺垫、例证性和时事性过强条目。',
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
if (keptOriginalRecords.length !== 88) {
  throw new Error(`Expected 88 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT020-${String(index + 1).padStart(3, '0')}`,
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

console.log(`Built ${payload.book.title} proofread index: ${records.length} records.`);
