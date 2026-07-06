import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 66;
const outputDir = path.join(rootDir, 'outputs', '066.李敖书启集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT066-005', '斯德哥尔摩征候群背景说明较多，已由“以征候检验政治犯”条目承担思想入口。'],
  ['LAT066-009', '人民有权知道与“史德标准是真实与公正”相邻重复，保留原则更完整的一条。'],
  ['LAT066-012', '管理费调整的委托权限过细，已由专款专用和在职责任条目覆盖。'],
  ['LAT066-015', '读者护持偏短促致意，思想索引独立性不足。'],
  ['LAT066-019', '单一纳税证据点过窄，已由“用证据逐条驳斥诬蔑”覆盖。'],
  ['LAT066-025', '诉讼警告偏执行姿态，已由“不应损人犯法”条目收束。'],
  ['LAT066-026', '私产收益同意问题已由“私产不能越俎代庖”覆盖。'],
  ['LAT066-029', '律师函警告偏个案维权，保留“长期收费即承认权利”即可。'],
  ['LAT066-032', '四合一权力问题与分权制衡、主任委员不碰钱重复。'],
  ['LAT066-035', '分层负责内容已由“信任治理不必官僚移交”和“主任委员不碰钱”覆盖。'],
  ['LAT066-040', '原标题与段落内容不完全吻合，且轮值管理已由三会书面解决和科学计算覆盖。'],
  ['LAT066-043', '长官包庇惩处与前两条违建法规、公务员责任重复。'],
  ['LAT066-045', '不随胡搅蛮缠起舞与“提问题不如提方案”同题，保留更可复用的方法条目。'],
  ['LAT066-046', '没完没了是短促姿态，独立思想密度不足。'],
  ['LAT066-061', '败诉官员不得捏造事实属同一国家赔偿案后续程序，保留非法搜书与党国打压条目。'],
  ['LAT066-069', '大陆出版收益安排偏私人事务，索引价值弱于出版授权条目。'],
  ['LAT066-074', '笑容解释偏个人气质，已由“冷淡也是法门”保留更完整的人格判断。'],
  ['LAT066-076', '苦难不写的感叹较窄，已由写大书争千秋条目覆盖写作方向。'],
  ['LAT066-082', '疑似引述邻居来函，非李敖自己的思想段落，删除。'],
  ['LAT066-083', '疑似引述邻居来函，非李敖自己的思想段落，删除。'],
  ['LAT066-088', '不参加婚丧喜庆已在误报与造假条目中体现，单独保留价值不足。'],
  ['LAT066-097', '公开更正诉求与无受害人不能否定事实、受害人喊冤不可视为空言重复。'],
  ['LAT066-100', '提出原件依据与鉴定不能未看原件断言重复。'],
  ['LAT066-102', '孙中山多次书写的例证属鉴定案细节，保留文献对照和鉴定方法即可。'],
]);

const overrides = new Map([
  ['LAT066-001', { title: '出书之后仍要自我校勘' }],
  ['LAT066-004', { category: '知识', title: '挖掘历史真相是责任' }],
  ['LAT066-006', { title: '用拘禁反应检验政治犯' }],
  ['LAT066-007', { title: '臣子不可做领袖私臣' }],
  ['LAT066-008', { title: '史德在真实与公正' }],
  ['LAT066-014', { title: '在职一天也要维护正义' }],
  ['LAT066-016', { title: '证据逐条驳斥诬蔑' }],
  ['LAT066-018', { title: '认真答复为了留下文献' }],
  ['LAT066-023', { title: '摊开账面才知谁在贴补' }],
  ['LAT066-027', { title: '团体争议不能损人犯法' }],
  ['LAT066-030', { title: '财务提款要分权制衡' }],
  ['LAT066-033', { title: '处分共同财产须经大会' }],
  ['LAT066-036', { title: '移交必须有合法接替人' }],
  ['LAT066-039', { title: '用科学计算堵住口实' }],
  ['LAT066-044', { title: '不同意方案就提出方案' }],
  ['LAT066-048', { category: '知识', title: '研究思想模式从根救起' }],
  ['LAT066-049', { title: '重要原文不宜被擅改' }],
  ['LAT066-051', { title: '作证也是留下历史记录' }],
  ['LAT066-052', { title: '自己的书要生前印出' }],
  ['LAT066-053', { title: '写思想大书胜过小岛文章' }],
  ['LAT066-057', { title: '监察不能只为国库服务' }],
  ['LAT066-058', { title: '司法黑资料要务实处理' }],
  ['LAT066-063', { title: '哲学系事件要追党化教育' }],
  ['LAT066-065', { title: '大学要有容纳第一流的气魄' }],
  ['LAT066-068', { title: '出庭就是面对历史记录' }],
  ['LAT066-071', { title: '成文原语比转述可靠' }],
  ['LAT066-072', { title: '早期回忆更可信' }],
  ['LAT066-073', { title: '引文必须照原语' }],
  ['LAT066-075', { title: '冷淡也是一种法门' }],
  ['LAT066-077', { title: '写大书才是争千秋' }],
  ['LAT066-078', { title: '报格可以高于血本' }],
  ['LAT066-079', { title: '护短卖报格就是失人格' }],
  ['LAT066-080', { title: '任劳任怨不能无限耗损' }],
  ['LAT066-081', { title: '指点别人者也该分担管理' }],
  ['LAT066-086', { title: '被封杀已司空见惯' }],
  ['LAT066-089', { title: '用不在场证明破除误报' }],
  ['LAT066-091', { title: '以做好事为名造假很恐怖' }],
  ['LAT066-092', { title: '台湾也是埋骨之地' }],
  ['LAT066-093', { title: '争一时还是争千秋' }],
  ['LAT066-095', { title: '受害人喊冤不是空言' }],
  ['LAT066-098', { title: '鉴定不能未看原件就断言' }],
  ['LAT066-099', { title: '文献对照可以破双钩说' }],
  ['LAT066-101', { title: '胶片比对不是鉴定方法' }],
  ['LAT066-103', { title: '勿以小毛病抹杀贡献' }],
  ['LAT066-104', { title: '战友有错也要批评' }],
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
    'source_id',
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

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”"'.,，。！？!?:：；;、\s]+/g, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))]
    .filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(
        `### ${record.id}｜${record.title}`,
        '',
        record.description,
        '',
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
        '',
      );
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
    const category = edit.category ?? record.category;
    const title = edit.title ?? record.title;

    return {
      ...record,
      ...edit,
      id: `LAT${String(bookSeq).padStart(3, '0')}-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
      category,
      title,
      keywords: edit.keywords ?? buildKeywords(record, title, category),
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
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除同案重复、过细程序点、短促姿态、他人材料残影和已被更强段落覆盖的条目；保留能够独立呈现李敖史德观、写作方向、法权意识、组织治理、人格判断、政治批判、知识方法与文化批判的原文段落。description 未改写。',
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
  '# 《李敖书启集》思想索引校对说明',
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
  '- description 只沿用原书段落，不做转述、摘要或润色。',
  '- 删除同案重复、过细程序点、短促姿态、他人材料残影和已被更强段落覆盖的条目。',
  '- 邻里自治材料只保留组织治理、权利边界、证据方法和人格伦理，不逐案拆账目。',
  '- 张学良、台大、胡适、书画鉴定等材料优先按“知识”归类；司法、媒体更正、行政责任按“法权”归类。',
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id} ${item.title}：${item.reason}`),
  '',
];

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread 066.${extraction.book.title}: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
