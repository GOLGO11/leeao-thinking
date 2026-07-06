import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 68;
const outputDir = path.join(rootDir, 'outputs', '068.给马戈的五十封信');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT068-008', '与后一条“尊严胜过恋爱屈身”同题，且原段末尾只是引出鲁仲连语，保留后一条更完整判断。'],
  ['LAT068-012', '通信将来合订过短，已由“书信要留作共同史料”“书信是活页日记”和跋文旧信价值覆盖。'],
  ['LAT068-021', '编号式列表碎片，已由“恨能保存自尊清醒”“智者不该迷恋”等更完整段落覆盖。'],
  ['LAT068-024', '赤子之心条目只是引出定义，未完整展开判断。'],
  ['LAT068-025', '赤子列表中的单项碎片，不能独立支撑思想索引。'],
  ['LAT068-032', '敢冒社会大不韪的判断过短且私人化，已由“无言是傲岸手段”等更完整段落承载。'],
  ['LAT068-033', '原段停在“或说：”，语义不完整，且“别忘了今天”条目已保留本段后续实践观。'],
  ['LAT068-047', '针对具体人物的人身批评较重，且原段以诗句引子收束，独立政治思想密度不足。'],
]);

const overrides = new Map([
  ['LAT068-001', { title: '无闻之美是洒脱态度' }],
  ['LAT068-002', { title: '书信要留作共同史料' }],
  ['LAT068-003', { title: '考试制度难测真才' }],
  ['LAT068-004', { title: '书信是第一手活页日记' }],
  ['LAT068-005', { title: '写作须经修改用力' }],
  ['LAT068-006', { title: '不被识货便横眉沉默' }],
  ['LAT068-007', { title: '坚强比重感情更重要' }],
  ['LAT068-009', { category: '情爱', title: '尊严胜过恋爱屈身' }],
  ['LAT068-010', { title: '浪漫要过得痛快' }],
  ['LAT068-011', { title: '不为毁谤失掉风度' }],
  ['LAT068-013', { title: '情色书写也可坦白' }],
  ['LAT068-014', { title: '耿介不以成败衡量' }],
  ['LAT068-015', { title: '成就不必绑住当下' }],
  ['LAT068-016', { title: '幽默穷开心无伤' }],
  ['LAT068-017', { title: '人格尊严最看重' }],
  ['LAT068-018', { title: '爱情不能牺牲本色' }],
  ['LAT068-019', { title: '做人取舍自有标准' }],
  ['LAT068-020', { title: '记录丑恶警醒自尊' }],
  ['LAT068-022', { title: '恨能保存自尊清醒' }],
  ['LAT068-023', { title: '智者不该迷恋' }],
  ['LAT068-026', { title: '自由恋爱者须达观' }],
  ['LAT068-027', { title: '不能实行的理论站不住' }],
  ['LAT068-028', { title: '英雄要慷慨决绝' }],
  ['LAT068-029', { title: '传统须有理性证据' }],
  ['LAT068-030', { title: '不能交通者免谈' }],
  ['LAT068-031', { title: '无言是傲岸手段' }],
  ['LAT068-034', { title: '今天比过去未来重要' }],
  ['LAT068-035', { title: '爱情可成乐园也可成坟' }],
  ['LAT068-036', { title: '旧情毒素要用坚强抵制' }],
  ['LAT068-037', { title: '未判明前不可骤责' }],
  ['LAT068-038', { title: '昙花只贵开一次' }],
  ['LAT068-039', { title: '故态投影遮蔽现在' }],
  ['LAT068-040', { title: '旧爱可被彻底否定' }],
  ['LAT068-041', { title: '旧爱成精神刺激体' }],
  ['LAT068-042', { title: '减少刺激胜过硬抵制' }],
  ['LAT068-043', { title: '多变也是自我性格' }],
  ['LAT068-044', { title: '谢俗议要不解释不辩白' }],
  ['LAT068-045', { title: '每天扎根学问' }],
  ['LAT068-046', { title: '嬉笑也能独乐人乐' }],
  ['LAT068-048', { title: '知己才值得以身相报' }],
  ['LAT068-049', { title: '相处要报以直' }],
  ['LAT068-050', { title: '感情相称才不痴' }],
  ['LAT068-051', { title: '爱情会发明狂想' }],
  ['LAT068-052', { title: '恋爱唯美可能逃避现实' }],
  ['LAT068-053', { title: '换角度才能改看真相' }],
  ['LAT068-054', { title: '正视现实不是怯懦' }],
  ['LAT068-055', { title: '震荡可换取清醒' }],
  ['LAT068-056', { title: '价值假定要接受透视' }],
  ['LAT068-057', { title: '学力不等于人品' }],
  ['LAT068-058', { title: '有研究问题才快乐' }],
  ['LAT068-059', { title: '默思札记都要勤写' }],
  ['LAT068-060', { title: '生活好时幻想可调剂' }],
  ['LAT068-061', { title: '感情受现实环境影响' }],
  ['LAT068-062', { title: '留学打算不要三心两意' }],
  ['LAT068-063', { title: '最后一次不可接二连三' }],
  ['LAT068-064', { title: '文化思想需要经济基础' }],
  ['LAT068-065', { title: '文化人开书店不同于商人' }],
  ['LAT068-066', { category: '文化', title: '赚钱资助文化事业' }],
  ['LAT068-067', { title: '友情疏淡来自演化方向' }],
  ['LAT068-068', { title: '知识人苦闷有不同解脱' }],
  ['LAT068-069', { title: '清谈救国也是书生报国' }],
  ['LAT068-070', { title: '早年人生方式十年兑现' }],
  ['LAT068-071', { title: '旧信可见思想演化' }],
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
  return fileName.replace(/^《[^》]+》/u, '给马戈的五十封信').replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'.,，。！？、?:：；;\s]+/g, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
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
    note:
      '校对轮删除重复引子、列表碎片、过短不成段条目、私人化窄场景和人身批评过重的条目；保留能够独立呈现李敖书信史料意识、爱情清醒论、人格自持、写作训练、研究方法、文化经济观与跋文自述的原文段落。description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
  dropped,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

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
  '# 给马戈的五十封信校对说明',
  '',
  `校对输入：${extraction.records.length} 条`,
  `校对保留：${records.length} 条`,
  `删除条目：${dropped.length} 条`,
  '',
  '校对原则：',
  '',
  '- 删除重复引子、列表碎片、过短不成段条目、私人化窄场景和人身批评过重的条目。',
  '- 对重复主题保留更完整、更能呈现李敖判断力的段落。',
  '- 标题做检索化浓缩，分类做少量收敛调整，description 不改写。',
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '删除记录：',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), note, 'utf8');

console.log(`Proofread ${payload.book.title}: ${records.length}/${extraction.records.length} kept.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
