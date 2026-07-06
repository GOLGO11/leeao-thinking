import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '061.李敖书简集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT061-012', '业务秘密与“事实非理由”同题，后者更集中呈现“依据事实复文仍须正当理由”的法权判断，校对轮删除。'],
  ['LAT061-015', '有问不答偏单案催复与行动结尾，第一手证据条目已承载公司复文证据原则，校对轮删除。'],
  ['LAT061-016', '被夹可敬是婚姻道德论证的短引子，后续婚姻道德与公序婚德更完整，校对轮删除。'],
  ['LAT061-026', '重要证据段落过短，且无证入罪、估计非证、单方栽证、断章取账已分别承载证据批判，校对轮删除。'],
  ['LAT061-031', '分散印书偏操作性安全安排，思想索引独立性不足，校对轮删除。'],
  ['LAT061-032', '拒见权力是狱中私人场景，思想判断较弱，校对轮删除。'],
  ['LAT061-038', '揭黑震动只是揭发黑幕后的过桥引子，封锁无效与狱政条目更完整，校对轮删除。'],
  ['LAT061-045', '拒同席与知识士羊、判定后不谈同题，后两条更能形成稳定索引入口，校对轮删除。'],
  ['LAT061-051', '气忍声不吞只是给周清玉信中三点意见的引子，斗士不姑息和点破统战更完整，校对轮删除。'],
  ['LAT061-063', '靠行募款偏短且依赖肯尼迪募款新闻语境，抱大腿条目更能承载趋炎附势批判，校对轮删除。'],
  ['LAT061-071', '婚期划界偏私人婚礼建议，情爱思想入口不如婚姻道德、公序婚德和爱人以德稳定，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT061-001', { title: '公司法纠偏', keywords: '公司法,主管机关,纠正' }],
  ['LAT061-002', { title: '股东有权追查', keywords: '股东权利,特权阶级,追查' }],
  ['LAT061-003', { title: '诚信必须举证', keywords: '诚信原则,举证责任,邮局证明' }],
  ['LAT061-004', { title: '命令抵触法律无效', keywords: '法律,行政命令,无效' }],
  ['LAT061-005', { title: '违法信用卡伤人格', keywords: '银行法,信用卡,人格侮辱' }],
  ['LAT061-006', { title: '信托目的不可代定', keywords: '信托,委托人,特定目的' }],
  ['LAT061-007', { title: '受托人不得自利', keywords: '信托关系,不当利益,受托人' }],
  ['LAT061-008', { title: '关系企业藏弊', keywords: '信托投资,关系企业,财务健全' }],
  ['LAT061-009', { title: '权利滥用不受保护', keywords: '公序良俗,诚信原则,权利滥用' }],
  ['LAT061-010', { title: '财阀目无法条', keywords: '财阀,特权,法律途径' }],
  ['LAT061-011', { title: '广告也被审查', keywords: '党报,广告,公平机会' }],
  ['LAT061-013', { title: '事实澄清须有理由', keywords: '泄露秘密,正当理由,商业道德' }],
  ['LAT061-014', { title: '证据须第一手', keywords: '公司复文,证据,法律依据' }],
  ['LAT061-017', { title: '婚姻道德高于懂法', keywords: '法律,道德,婚姻' }],
  ['LAT061-018', { title: '不义灭夫违公序', keywords: '不义灭夫,公秩良序,群众' }],
  ['LAT061-019', { category: '情爱', title: '爱人以德', keywords: '爱人以德,姑息,婚姻' }],
  ['LAT061-020', { title: '新闻不该中立', keywords: '新闻,中立,道德选择' }],
  ['LAT061-021', { title: '徒法不足自行', keywords: '司法改革,注意事项,法律' }],
  ['LAT061-022', { title: '以实例教法官', keywords: '司法改革,实例,可读性' }],
  ['LAT061-023', { title: '无证不可入罪', keywords: '证据,推测,论理法则' }],
  ['LAT061-024', { title: '估计不可作罪证', keywords: '估计,罪证,刑事法则' }],
  ['LAT061-025', { title: '单方证据不可采', keywords: '备忘录,证据,公正' }],
  ['LAT061-027', { title: '断章取账不是判决', keywords: '账册,罗织,判决' }],
  ['LAT061-028', { title: '程序也会入罪', keywords: '刑事诉讼法,程序,司法' }],
  ['LAT061-029', { title: '司法逼出反政府', keywords: '司法制度,反政府势力,批评' }],
  ['LAT061-030', { title: '司法官须有品德', keywords: '司法改革,能力学识,辞职' }],
  ['LAT061-033', { title: '酷刑要举证', keywords: '看守所,酷刑,证据' }],
  ['LAT061-034', { title: '凌虐不是个案', keywords: '凌虐,看守所,人犯' }],
  ['LAT061-035', { title: '医疗漠视即责任', keywords: '病舍,医疗,健康' }],
  ['LAT061-036', { title: '狱政特权剥夺亲近', keywords: '狱政,特权,家属' }],
  ['LAT061-037', { title: '名单应公开听证', keywords: '打人名单,值勤表,公开听证' }],
  ['LAT061-039', { title: '官方一面倒封杀', keywords: '官方批判,封杀,舆论' }],
  ['LAT061-040', { title: '新闻封锁救不了司法', keywords: '司法问题,新闻封锁,失职' }],
  ['LAT061-041', { title: '老而知美', keywords: '美,老人,趣味' }],
  ['LAT061-042', { category: '政治', title: '黑牢不白坐', keywords: '政治整肃,法律罪名,黑牢' }],
  ['LAT061-043', { title: '表演来自硬里', keywords: '学问造诣,大胆见解,人格风范' }],
  ['LAT061-044', { title: '知识分子成羊', keywords: '知识分子,官方,曲学阿世' }],
  ['LAT061-046', { title: '判定后少废话', keywords: '戴高乐,性格,废话' }],
  ['LAT061-047', { title: '长寿也是武器', keywords: '清白,长寿,敌人' }],
  ['LAT061-048', { title: '真话者靠长寿见证', keywords: '马寅初,真话,平反' }],
  ['LAT061-049', { title: '党外要树是非', keywords: '老政治犯,党外,是非感' }],
  ['LAT061-050', { title: '历史文件要写真相', keywords: '措辞,历史人物,真相' }],
  ['LAT061-052', { title: '爱斗士不姑息', keywords: '党外,群众,爱人以德' }],
  ['LAT061-053', { title: '点破党外统战', keywords: '官方,康宁祥,统一战线' }],
  ['LAT061-054', { title: '恶法蹂躏人权', keywords: '警察,人权,恶法' }],
  ['LAT061-055', { title: '知恶法仍同流', keywords: '法律素养,恶法,同流合污' }],
  ['LAT061-056', { title: '保障人权非放纵', keywords: '刑诉法,人权,警察权' }],
  ['LAT061-057', { title: '万年代表无代表性', keywords: '宪法,代表性,民意' }],
  ['LAT061-058', { title: '合法强奸民意', keywords: '民意,迷途知返,选择' }],
  ['LAT061-059', { title: '言论自由有代价', keywords: '千秋评论,查禁,言论自由' }],
  ['LAT061-060', { title: '不合作主义', keywords: '国民党,不合作,欺骗' }],
  ['LAT061-061', { category: '政治', title: '反击能力成制衡', keywords: '反击能力,政权,制衡' }],
  ['LAT061-062', { title: '生死都要对方付代价', keywords: '生死,抗争,代价' }],
  ['LAT061-064', { title: '不要抱美国大腿', keywords: '美国参议员,趋炎附势,国民党' }],
  ['LAT061-065', { title: '冤狱善后可反击', keywords: '极权,冤狱,法官良知' }],
  ['LAT061-066', { title: '封锁三十三年结怨', keywords: '办报,改选,结怨' }],
  ['LAT061-067', { title: '失败者靠幻想', keywords: '监察院,幻想,失败者' }],
  ['LAT061-068', { title: '权力怕人偷看', keywords: '国民党,中山楼,偷看' }],
  ['LAT061-069', { title: '文化复兴成禁苑', keywords: '中山楼,文化复兴,禁苑' }],
  ['LAT061-070', { title: '国民党与警察同在', keywords: '警察,民众,国民党' }],
  ['LAT061-072', { title: '清高政治难理财', keywords: '党外基金,财务,清高' }],
  ['LAT061-073', { title: '言论自由难过苏俄', keywords: '言论自由,改版,军方' }],
  ['LAT061-074', { title: '事实才有公信力', keywords: '求证,事实,公信力' }],
  ['LAT061-075', { title: '稻草人谬误', keywords: '辩论,曲解,谬误' }],
  ['LAT061-076', { title: '描述不完整即窜改', keywords: '描述,史实,方法学' }],
  ['LAT061-077', { title: '不受高薪收买', keywords: '高薪,独立,斗气' }],
  ['LAT061-078', { title: '论人要看事实', keywords: '两面人,事实,咬文嚼字' }],
  ['LAT061-079', { title: '乡愿混淆是非', keywords: '乡愿,是非,伪善' }],
  ['LAT061-080', { title: '正直被目为偏激', keywords: '正直,偏激,公道' }],
  ['LAT061-081', { title: '不为乡愿所骗', keywords: '乡愿,公道,人物评价' }],
  ['LAT061-082', { title: '写信就敢发表', keywords: '书信,发表,大丈夫' }],
  ['LAT061-083', { title: '敌人帮忙流传', keywords: '公开信,查禁,封杀' }],
  ['LAT061-084', { title: '变节者最可怕', keywords: '变节者,告密,知识分子' }],
  ['LAT061-085', { title: '极权使知识人匿名', keywords: '知识分子,恫吓,匿名' }],
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
      id: `LAT061-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除同题重复的商业秘密与公司回信细节、过短过桥段、纯操作性安排、私人化场景、案情程序短段和思想入口不够稳定的婚礼建议；保留能独立呈现李敖法权意识、证据方法、狱政批判、党外路线、知识分子判断、写作/新闻伦理和情爱道德的原文段落。description 未改写。',
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
  '# 《李敖书简集》思想索引校对说明',
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
  '- 删除同题重复、过短过桥段、纯操作安排、私人化场景、案情程序短段和思想入口不够稳定的小段。',
  '- 财阀、司法、狱政和出版查禁材料优先按“法权”归类；国民党、党外路线、政治人物和权力结构批判按“政治”归类。',
  '- 情爱条目只保留婚姻伦理、爱人以德和审美趣味等主旨明确的段落，不把私人婚礼建议扩展为思想条目。',
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
  `Proofread 061.李敖书简集: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
