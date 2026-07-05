import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '051.李敖随写录前集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT051-014', '短评过短，主要是阅兵演习讽刺，政治主题已有“小朝廷”等更完整条目覆盖。'],
  ['LAT051-023', '人物讥评过窄，主要是对单一教授官迷的短评，独立思想容量不足。'],
  ['LAT051-028', '对国民党作弄民进党的短评可由“政治怪招”“政治水准”等条目覆盖。'],
  ['LAT051-030', '与“政治怪招”同属台湾政治水准判断，且本条更短，校对轮不单列。'],
  ['LAT051-031', '报纸误植属于知识笑柄，但思想判断较窄，校对轮删除。'],
  ['LAT051-033', '友人写作建议较窄，写作主线由“大书为主”“朋友耗时”等条目承接。'],
  ['LAT051-035', '对李远哲表演的个人判断偏事件性，校对轮保留更稳定的“三民主义”判断。'],
  ['LAT051-037', '张学良晚年评价偏人物史论，和本书思想主轴关系较窄。'],
  ['LAT051-040', '官迷短评与前面“官迷教授”同类，且已删除同类局部条目。'],
  ['LAT051-043', '吐口水事件偏局部政坛骂战，政治批评由更完整条目覆盖。'],
  ['LAT051-046', '故宫购书事件偏机构讥评，文化主题已有更强条目。'],
  ['LAT051-048', '主体是外部文章观点引介，李敖自己的判断只是“可注意”，不保留。'],
  ['LAT051-052', '“憋尿战”趣味性强，思想判断偏事件机锋，校对轮删除。'],
  ['LAT051-053', '国民党内婚短评较窄，政治结构主题已有更完整条目。'],
  ['LAT051-058', '自我形象段落偏自况和文气，思想索引性弱于人格原则条目。'],
  ['LAT051-063', '抄袭判断偏单一事件确认，知识主题已有更稳定条目。'],
  ['LAT051-070', '人格高下判断依赖宋美龄学画细节，检索价值较窄。'],
  ['LAT051-075', '张学良扫墓短评偏人物讥评，独立思想容量不足。'],
  ['LAT051-078', '“历史翻旧账”机锋可读，但偏现场笑谈，校对轮不单列。'],
  ['LAT051-081', '叶菊兰评价偏个人惋惜，政治判断不如路线和口号类条目稳定。'],
  ['LAT051-082', '导演抄袭判断偏单一影片事件，文化主题已有更强条目。'],
  ['LAT051-084', '与上一条“恶名难洗”同源同义，校对轮保留展开更完整的上一段。'],
  ['LAT051-086', '与“弹劾理由”同案同义，校对轮保留原则表述更完整者。'],
  ['LAT051-089', '党报车祸数字错误偏报导失误，写作和媒体主题已有更强条目。'],
  ['LAT051-091', '对尹章义台湾史功力的肯定偏人物评价，思想判断较弱。'],
  ['LAT051-097', '“厌恶政治”太短，主要是行程拒绝，独立思想展开不足。'],
  ['LAT051-102', '迷信候选短评较窄，宗教迷信和政治动员主题已有更强条目。'],
  ['LAT051-104', '祭祖复古短评与“神道拉票”“妄人方法”同属文化倒退，校对轮不单列。'],
  ['LAT051-109', '大陆失望偏个人玩笑，文化判断不如后文台湾政治段落明确。'],
  ['LAT051-115', '李登辉自吹台湾史偏人物讥评，知识主题已有更强条目。'],
  ['LAT051-122', '与“探亲耗财”同篇同义，校对轮保留展开更完整的段落。'],
  ['LAT051-124', '熊式一评价偏个人好恶，思想索引性不足。'],
]);

const overrides = new Map([
  ['LAT051-001', { title: '大书为主', keywords: '大书,写作主力,随写' }],
  ['LAT051-002', { title: '人工败景', keywords: '风景区,人工加工,艺术水准' }],
  ['LAT051-003', { title: '看可看处', keywords: '观看,过滤,审美方法' }],
  ['LAT051-004', { title: '德政何异', keywords: '观光,民进党,地方治理' }],
  ['LAT051-005', { title: '纸上作业', keywords: '观察,纸上作业,细节' }],
  ['LAT051-006', { title: '不读古书', keywords: '古董,古书,知识' }],
  ['LAT051-007', { title: '反共反动', keywords: '列宁,反共,反动' }],
  ['LAT051-008', { title: '书法泛滥', keywords: '书法家,台湾,文化批评' }],
  ['LAT051-009', { title: '演法律戏', keywords: '台湾审判,法律漏洞,国民党' }],
  ['LAT051-010', { title: '停刊达观', keywords: '求是报,停刊,达观' }],
  ['LAT051-011', { title: '产权公义', keywords: '智慧财产权,公义,知识传布' }],
  ['LAT051-012', { title: '知识传布', keywords: '大英百科全书,盗印,公义' }],
  ['LAT051-013', { title: '禁书开窗', keywords: '禁书,胶带,检查' }],
  ['LAT051-015', { title: '胆小成因', keywords: '胡志伟,胆子,自我恐惧' }],
  ['LAT051-016', { title: '婚稳争权', keywords: '离婚,婚姻,女性' }],
  ['LAT051-017', { title: '国家坏人', keywords: '国家,坏人,权力' }],
  ['LAT051-018', { title: '国家幻象', keywords: '国家观念,马基维利,幻象' }],
  ['LAT051-019', { title: '小说有思想', keywords: '北京法源寺,高阳,思想' }],
  ['LAT051-020', { title: '军备自欺', keywords: '国军,军备,自欺' }],
  ['LAT051-021', { title: '海与胸襟', keywords: '台湾,胸襟,小家子气' }],
  ['LAT051-022', { title: '政治怪招', keywords: '台湾政治,民进党,常识' }],
  ['LAT051-024', { title: '办报牺牲', keywords: '办报,牺牲,精神' }],
  ['LAT051-025', { title: '温饱人权', keywords: '人权,宪法,温饱' }],
  ['LAT051-026', { title: '奴才级数', keywords: '宋美龄,送行,奴才' }],
  ['LAT051-027', { title: '浩然真性', keywords: '陈毅,文革,真性情' }],
  ['LAT051-029', { title: '仇敌见识', keywords: '朱高正,民进党,见识' }],
  ['LAT051-032', { title: '肉麻无耻', keywords: '梁肃戎,宋美龄,人格批评' }],
  ['LAT051-034', { title: '思想课比例', keywords: '三民主义,通识教育,曲学阿世' }],
  ['LAT051-036', { title: '党外歧途', keywords: '党外,国民党,台湾问题' }],
  ['LAT051-038', { title: '知识隔世', keywords: '知识,娱乐,交游' }],
  ['LAT051-039', { title: '解严钳制', keywords: '电影查禁,解严,钳制' }],
  ['LAT051-041', { title: '作品无力', keywords: '写作,群众,南非' }],
  ['LAT051-042', { title: '对日以德', keywords: '蒋介石,日本,政治批评' }],
  ['LAT051-044', { title: '法官署名', keywords: '冤狱,法官,司法责任' }],
  ['LAT051-045', { title: '地方朝廷', keywords: '中华民国,阅兵,蒋家' }],
  ['LAT051-047', { title: '市侩媒体', keywords: '自由时报,林荣三,媒体' }],
  ['LAT051-049', { title: '文网消音', keywords: '电视消音,文网,国民党' }],
  ['LAT051-050', { title: '解严懦夫', keywords: '政治秀,反阅兵,懦夫' }],
  ['LAT051-051', { title: '学术遮伞', keywords: '政治运动,校园,学术' }],
  ['LAT051-054', { title: '妖妄进步', keywords: '人骨念珠,高等知识分子,妖妄' }],
  ['LAT051-055', { title: '通奸话术', keywords: '婚外情,离婚,道德' }],
  ['LAT051-056', { title: '真实崩坏', keywords: '自由主义,道德形象,真实' }],
  ['LAT051-057', { title: '年龄看党', keywords: '国民党,人才,老人当政' }],
  ['LAT051-059', { title: '政治感情', keywords: '政治,无力感,稳定' }],
  ['LAT051-060', { title: '黑牢余悸', keywords: '刘家顺,政治,黑牢' }],
  ['LAT051-061', { title: '五分钟快乐', keywords: '黑暗环境,纪律,行动' }],
  ['LAT051-062', { title: '耐心斗志', keywords: '斗志,耐心,揭发' }],
  ['LAT051-064', { title: '大道不裹胁', keywords: '政治家,错误路线,大道' }],
  ['LAT051-065', { category: '法权', title: '罪名不可滥', keywords: '施启扬,台奸,罪名' }],
  ['LAT051-066', { title: '创教慎之', keywords: '轩辕教,宗教,走火入魔' }],
  ['LAT051-067', { title: '文化无据', keywords: '歌仔戏,中华文化,台湾文化' }],
  ['LAT051-068', { title: '岛民心态', keywords: '台湾人,蒋渭水,政治心态' }],
  ['LAT051-069', { title: '恋栈权位', keywords: '孙震,辞职,权位' }],
  ['LAT051-071', { title: '艺术自欺', keywords: '朱铭,艺术,不伦不类' }],
  ['LAT051-072', { title: '利害冒名', keywords: '宋楚瑜,台湾人,政治利害' }],
  ['LAT051-073', { title: '官僚同构', keywords: '尤清,民进党,官僚' }],
  ['LAT051-074', { title: '文化非钱', keywords: '文化经费,建设,文化' }],
  ['LAT051-076', { title: '妖妄寄托', keywords: '胡茵梦,闭关,妖妄' }],
  ['LAT051-077', { title: '黑牢源流', keywords: '黑牢,看守所,狱政' }],
  ['LAT051-079', { title: '老兵证史', keywords: '五十二军,回忆,史料' }],
  ['LAT051-080', { title: '宜独逻辑', keywords: '台独,宜兰独立,公民投票' }],
  ['LAT051-083', { title: '恶名难洗', keywords: '国民党,特务,恶名' }],
  ['LAT051-085', { title: '弹劾理由', keywords: '监察院,弹劾,司法' }],
  ['LAT051-087', { title: '朋友耗时', keywords: '朋友,写作,胡适' }],
  ['LAT051-088', { title: '跑龙套亡', keywords: '青年党,国民党,政党' }],
  ['LAT051-090', { title: '玩世幸事', keywords: '冤狱,玩世,不幸' }],
  ['LAT051-092', { title: '斗争残酷', keywords: '政治斗争,西哈努克,凶残' }],
  ['LAT051-093', { title: '摄影失真', keywords: '摄影,求真,失真' }],
  ['LAT051-094', { title: '谋害推理', keywords: '孙立人案,证据,判断' }],
  ['LAT051-095', { title: '党内残忍', keywords: '共产党,文革,斗争' }],
  ['LAT051-096', { title: '党营双标', keywords: '电影审查,双重标准,党营' }],
  ['LAT051-098', { title: '贿选心理', keywords: '选风,贿选,民风' }],
  ['LAT051-099', { title: '竞选借牌', keywords: '竞选,李敖牌,策略' }],
  ['LAT051-100', { title: '法官红包', keywords: '法官,红包,司法腐败' }],
  ['LAT051-101', { title: '坏中择坏', keywords: '许阿桂,司法,英雄' }],
  ['LAT051-103', { title: '目标方法', keywords: '天帝教,目标,方法' }],
  ['LAT051-105', { title: '政治商品化', keywords: '政治人物,商品,刺激' }],
  ['LAT051-106', { title: '教授抢骨头', keywords: '大学教授,政治,学术尊严' }],
  ['LAT051-107', { title: '读者知局', keywords: '文章,读者,知己' }],
  ['LAT051-108', { title: '碑林复古', keywords: '碑林,书法,斯文扫地' }],
  ['LAT051-110', { title: '台湾政治坏', keywords: '台湾政治,老派,坏透' }],
  ['LAT051-111', { title: '安全无戏', keywords: '反国民党,冒险,安全' }],
  ['LAT051-112', { title: '马克思恐惧', keywords: '马克思,马克斯韦伯,审查' }],
  ['LAT051-113', { title: '司法抗议', keywords: '司法不公,小人物,判刑' }],
  ['LAT051-114', { title: '名分争夺', keywords: '婚姻,名分,家庭' }],
  ['LAT051-116', { title: '乱世死证', keywords: '乱世,悲欢离合,证据' }],
  ['LAT051-117', { title: '代签法理', keywords: '陈水扁,代签,法' }],
  ['LAT051-118', { title: '监委鹰犬', keywords: '监察委员,弹劾,有愧职守' }],
  ['LAT051-119', { title: '藏书风气', keywords: '图书馆,藏书,读书风气' }],
  ['LAT051-120', { title: '孝思缓急', keywords: '孝思,印书,当务之急' }],
  ['LAT051-121', { title: '探亲耗财', keywords: '老兵,探亲,文化' }],
  ['LAT051-123', { title: '神道拉票', keywords: '妈祖,选举,神道' }],
  ['LAT051-125', { title: '入关比拟', keywords: '引清兵入关,地方政府,国民党' }],
  ['LAT051-126', { title: '口号政治', keywords: '民进党,口号,可行性' }],
  ['LAT051-127', { title: '独立矛盾', keywords: '台独,逻辑,自我矛盾' }],
  ['LAT051-128', { title: '迟到勇气', keywords: '李镇源,勇气,时机' }],
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
    'source_id',
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

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const extractionIds = new Set(extraction.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!extractionIds.has(id)) {
    throw new Error(`Unknown extraction id: ${id}`);
  }
}

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...edit,
      id: `LAT051-${String(index + 1).padStart(3, '0')}`,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} in ${record.source_id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除局部人事讥评、同篇重复、纯事件机锋、外部资料引介和过短段落，保留写作、方法、知识、人格、文化、政治、法权和情爱八类中能独立呈现李敖判断的段落；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除局部人事讥评、同篇重复、纯事件机锋、外部资料引介、过短段落和检索独立性不足的条目。',
      '保留能独立呈现李敖判断的写作取舍、行动方法、知识辨误、人格尺度、文化批评、台湾政治、司法法权和少量情爱材料。',
      '标题继续压缩为检索用语，分类仍使用 8 个原子分类。',
    ],
    dropped,
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

const noteLines = [
  '# 《李敖随写录前集》思想索引校对说明',
  '',
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  `- 来源目录：${payload.book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 校对说明',
  '',
  '本轮从提取轮 128 条中保留 96 条。校对重点是把《李敖随写录前集》从逐日随写、剪报短评和人物讥评中收束出可检索的思想骨干：写作取舍、行动方法、知识辨误、人格尺度、文化批评、台湾政治、司法法权和少量情爱材料。',
  '',
  '删除项主要是局部人事讥评、同篇重复、纯事件机锋、外部资料引介、过短段落和脱离上下文后检索独立性不足的条目。',
  '',
  '`description` 字段全部沿用提取轮中的源文本原段落，未做改写。',
  '',
];
fs.writeFileSync(path.join(outputDir, '校对说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread ${payload.book.sequence}.${payload.book.title}: ${records.length} records. ` +
    `Dropped: ${dropped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
