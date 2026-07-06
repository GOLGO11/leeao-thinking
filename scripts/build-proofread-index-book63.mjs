import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '063.李敖书笺集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT063-004', '与同篇“私生卡违法”同题，偏公开信火气和行动姿态，法权入口由前条承载即可，校对轮删除。'],
  ['LAT063-009', '与“特立独行不为势劫”同题，结尾号召性强但独立思想密度较低，校对轮删除。'],
  ['LAT063-010', '党外舆论私吞胜利的批评偏即时场景，党外路线批评已有更稳定条目承载，校对轮删除。'],
  ['LAT063-014', '台湾左派段落偏圈内讥评，辱骂密度高于可复用思想入口，校对轮删除。'],
  ['LAT063-040', '搜索伏笔属于查禁背景铺陈，同篇“斗争方式要务实”“不合作高于能文”更能承载思想，校对轮删除。'],
  ['LAT063-043', '海外专栏反击与“斗争方式要务实”同属同篇斗争方式展开，作为独立索引略窄，校对轮删除。'],
  ['LAT063-048', '徐锡麟拒绝假团结与后文“真革命去假团结”同题，后者概括性更强，校对轮删除。'],
  ['LAT063-051', '告报纸段落偏具体诉讼建议，后文“大义不能踩亲人”“批评须有资格”更能呈现人格与政治判断，校对轮删除。'],
  ['LAT063-055', '扣押条款说明偏程序枚举，同篇“滥权扣押须赔偿”更完整承载法权意识，校对轮删除。'],
  ['LAT063-058', '选择执法难服众与“执法标准须公开”同题，后者更抽象稳定，校对轮删除。'],
  ['LAT063-067', '功劳归奔走者偏辜家债务个案中的感谢对象，独立思想入口不如“排难解纷不取钱”稳定，校对轮删除。'],
  ['LAT063-071', '假三毛无良心与“真三毛在悲悯”同题，后者更正面集中呈现文化判断，校对轮删除。'],
  ['LAT063-077', '来硬才会办偏个案交涉经验，同篇两条法权原则已经承载银行官僚问题，校对轮删除。'],
  ['LAT063-082', '第三次闭关偏个人决心交代，后文“势孤然后能独立”“不怕孤立”更能形成稳定人格入口，校对轮删除。'],
  ['LAT063-085', '朋友失败是成功偏隐居趣语，独立思想性弱于“藏头不是逃避”，校对轮删除。'],
  ['LAT063-088', '卖面故事偏附带回忆，文化思想入口较弱，且与本书主线关联较松，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT063-001', { title: '支持反对党政治', keywords: '反对党,多党政治,政治平衡' }],
  ['LAT063-002', { title: '不贤者识其大', keywords: '大方向,不贤者,政治判断' }],
  ['LAT063-003', { title: '信用卡违法收费', keywords: '银行法,信用卡,公众利益' }],
  ['LAT063-005', { title: '死者遗意要守信', keywords: '雷震,遗愿,公道' }],
  ['LAT063-006', { title: '登记拖延无据', keywords: '文星,出版登记,第三者权益' }],
  ['LAT063-007', { title: '特立独行不为势劫', keywords: '党外,特立独行,群众' }],
  ['LAT063-008', { title: '进步须由受苦衡量', keywords: '牺牲,苦难,抗暴' }],
  ['LAT063-011', { title: '借阅实为抢书', keywords: '查禁,借阅,言论钳制' }],
  ['LAT063-012', { title: '救济应变追责', keywords: '灾变,国家赔偿,党外' }],
  ['LAT063-013', { title: '政府责任不能分摊', keywords: '国家赔偿,自救,政府责任' }],
  ['LAT063-015', { title: '乱时仍然内斗', keywords: '兵荒马乱,内斗,国民党' }],
  ['LAT063-016', { title: '断水释兵权', keywords: '缴械,军队,国民党' }],
  ['LAT063-017', { title: '固执笨拙胜投机', keywords: '忠义,固执,投机' }],
  ['LAT063-018', { title: '枪杆下写历史', keywords: '历史,写作,揭发' }],
  ['LAT063-019', { title: '著作人可直接出书', keywords: '出版法,扣押,著作人' }],
  ['LAT063-020', { title: '公权侵害要赔偿', keywords: '公权力,国家赔偿,自由' }],
  ['LAT063-021', { title: '台湾政治规格', keywords: '台湾,政治规格,反对派' }],
  ['LAT063-022', { title: '夜半钟声唤醒', keywords: '过客,唤醒,孤寂' }],
  ['LAT063-023', { title: '冤狱由判决证成', keywords: '最高法院,冤狱,追索' }],
  ['LAT063-024', { title: '矛盾证词要比对', keywords: '矛盾,证据,事实' }],
  ['LAT063-025', { title: '送炭以送到为准', keywords: '承诺,帮助,受难' }],
  ['LAT063-026', { title: '程序遗漏要追究', keywords: '并办,法院,程序' }],
  ['LAT063-027', { title: '发行人责任不停摆', keywords: '出版法,发行人,诽谤' }],
  ['LAT063-028', { title: '顽劣制造更多问题', keywords: '顽劣,迫害,问题' }],
  ['LAT063-029', { title: '真凶先判国民党', keywords: '江南案,国民党,先知' }],
  ['LAT063-030', { title: '阻塞为善最可恶', keywords: '国民党,阻塞,悲剧' }],
  ['LAT063-031', { title: '裸照照见假道学', keywords: '裸体,审查,双重标准' }],
  ['LAT063-032', { title: '终身赠书还义债', keywords: '读者,信用,义债' }],
  ['LAT063-033', { title: '邮检毁书换宣传', keywords: '邮检,查禁,宣传' }],
  ['LAT063-034', { title: '无事证不可称事证', keywords: '事证,诽谤,司法' }],
  ['LAT063-035', { title: '互不联络而互证', keywords: '江南案,证据,互证' }],
  ['LAT063-036', { title: '维护人权不护遁词', keywords: '律师原则,人权,正义' }],
  ['LAT063-037', { title: '全体都是牺牲品', keywords: '江南案,牺牲品,国民党' }],
  ['LAT063-038', { title: '正义标准要面对', keywords: '正义,忠厚,面对' }],
  ['LAT063-039', { title: '不谴责即默认', keywords: '公德,政客,道德标准' }],
  ['LAT063-041', { title: '卖房支撑抗战', keywords: '独行侠,长期抗战,出版' }],
  ['LAT063-042', { title: '斗争方式要务实', keywords: '查扣,损害赔偿,出版' }],
  ['LAT063-044', { title: '不合作高于能文', keywords: '人格,合作,国民党' }],
  ['LAT063-045', { title: '探亲权要公开争', keywords: '探亲,人权,公开声明' }],
  ['LAT063-046', { title: '身份证废纸化', keywords: '身份证,国籍,吃软怕硬' }],
  ['LAT063-047', { title: '政治也有劣币', keywords: '党外,劣币,政治斗争' }],
  ['LAT063-049', { title: '真革命去假团结', keywords: '光复会,真革命,团结' }],
  ['LAT063-050', { title: '自己做良币', keywords: '良币,志士仁人,负责' }],
  ['LAT063-052', { title: '大义不能踩亲人', keywords: '大义灭亲,伪君子,人格' }],
  ['LAT063-053', { title: '批评须有资格', keywords: '党外前辈,忠厚,资格' }],
  ['LAT063-054', { title: '好事总做太迟', keywords: '国民党,做好事,历史' }],
  ['LAT063-056', { title: '滥权扣押须赔偿', keywords: '国家赔偿,公务员,发行权利' }],
  ['LAT063-057', { title: '小事也要有人说', keywords: '平民生活,铁路,问责' }],
  ['LAT063-059', { title: '执法标准须公开', keywords: '违建,特权,标准' }],
  ['LAT063-060', { title: '他族之庇保自由', keywords: '出版自由,租界,查禁' }],
  ['LAT063-061', { title: '人权工作重实例', keywords: '人权,实例,演说' }],
  ['LAT063-062', { title: '无尽灯式写作', keywords: '无尽灯,千秋评论,使命' }],
  ['LAT063-063', { title: '升高言论作报复', keywords: '查禁,地下文学,反击' }],
  ['LAT063-064', { title: '拆穿国民党假历史', keywords: '孙蒋秘史,假历史,文化批判' }],
  ['LAT063-065', { title: '冤狱被一字不登', keywords: '新闻,冤狱,正义' }],
  ['LAT063-066', { title: '排难解纷不取钱', keywords: '鲁仲连,解纷,谢礼' }],
  ['LAT063-068', { category: '人格', title: '功劳不遮习性', keywords: '雷震,自由中国,公私' }],
  ['LAT063-069', { title: '政治人物不可交', keywords: '政治人物,无情,权势' }],
  ['LAT063-070', { title: '真三毛在悲悯', keywords: '三毛,悲悯,讽世' }],
  ['LAT063-072', { title: '好恶都不隐', keywords: '知人论事,是非,作风' }],
  ['LAT063-073', { title: '公产不可市私恩', keywords: '公产,私恩,雷震' }],
  ['LAT063-074', { title: '关切须做出来', keywords: '关切,事实,行动' }],
  ['LAT063-075', { title: '便民不能变官僚', keywords: '抵押权,涂销,便民' }],
  ['LAT063-076', { title: '法律站不住就要办', keywords: '土地登记,公务员,法律' }],
  ['LAT063-078', { title: '党外是牙签国民党', keywords: '党外,国民党,批评' }],
  ['LAT063-079', { title: '毁誉不足介怀', keywords: '特立独行,毁誉,自我' }],
  ['LAT063-080', { title: '洁身不入虚张', keywords: '独来独往,洁身,名义' }],
  ['LAT063-081', { title: '党外招牌会盗名', keywords: '党外,公政会,尊严' }],
  ['LAT063-083', { title: '势孤然后能独立', keywords: '孤立,独立,世俗' }],
  ['LAT063-084', { title: '不怕孤立', keywords: '独立思想,党派,自负责任' }],
  ['LAT063-086', { title: '藏头不是逃避', keywords: '神龙,隐居,自我' }],
  ['LAT063-087', { title: '无言抗议不投降', keywords: '迫害,沉默,抗议' }],
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
      id: `LAT063-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }
  const source = extraction.records.find((item) => item.id === record.source_id);
  if (!source) {
    throw new Error(`Missing source record for ${record.id}`);
  }
  if (record.description !== source.description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除同篇同题重复、即时讥讽强于思想入口、过细法条操作、私人化窄场景和附带回忆条目；保留能独立呈现李敖法权意识、证据方法、党外路线、政治判断、人格独立、写作使命与文化批判的原文段落。description 未改写。',
  },
  records,
  dropped,
};

const jsonPath = path.join(outputDir, '思想索引-校对轮.json');
const csvPath = path.join(outputDir, '思想索引-校对轮.csv');
const mdPath = path.join(outputDir, '思想索引-校对轮.md');
const notePath = path.join(outputDir, '校对说明.md');

fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(csvPath, records);
writeMarkdown(mdPath, payload);

const noteLines = [
  '# 《李敖书笺集》思想索引校对说明',
  '',
  `- 校对输入：${path.relative(rootDir, extractionPath)}`,
  `- 校对输出：${path.relative(rootDir, jsonPath)}`,
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 校对原则',
  '',
  '- description 只沿用原书段落，不做转述和改写。',
  '- 删除同篇同题重复、即时讥讽强于思想入口、过细法条操作、私人化窄场景和附带回忆条目。',
  '- 法律程序、国家赔偿、出版查禁、邮检、探亲权、公共执法等材料优先按“法权”归类。',
  '- 党外路线、政治组织、政客批判和国民党权力结构按“政治”归类；人格条目只保留可脱离个案复用的判断。',
  '- 写作条目保留出版抵抗、史料揭发、无尽灯使命和新闻沉默等主旨；文化条目保留裸体审查、三毛、假历史等文化批判。',
  '',
];

if (dropped.length) {
  noteLines.push('## 删除条目', '');
  for (const item of dropped) {
    noteLines.push(`- ${item.id} ${item.title}：${item.reason}`);
  }
  noteLines.push('');
}

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread 063.李敖书笺集: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
