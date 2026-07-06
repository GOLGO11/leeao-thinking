import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 69;
const outputDir = path.join(rootDir, 'outputs', '069.李敖写的信');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT069-004', '军中自处之道偏私人劝勉，独立思想密度不如前后归隐与生活方法条目。'],
  ['LAT069-013', '发薪制度与合约脱节已由后一条“制度漏洞讽刺专任”更完整承载。'],
  ['LAT069-022', '胡适死后忙纪念工作偏短促反应，不能充分支撑思想索引。'],
  ['LAT069-024', '青年应成熟一句过短，反佞佛主题已有总表重复条目承载。'],
  ['LAT069-026', '保证人是时代小问题过短，已由前一条人保制度反映不信任覆盖。'],
  ['LAT069-028', '指出伪作真凶与前后石达开诗辨伪条目重复，保留起因与定案两端。'],
  ['LAT069-031', '蜡烛比喻后接请客玩笑，思想密度不足。'],
  ['LAT069-038', '香烟疏导玩火本能过窄，保留后一条文明社会需要疏导工具。'],
  ['LAT069-048', '留学生救国建国问题只是提问，保留后一条海外知识分子的贡献判断。'],
  ['LAT069-053', '推进科学的中国本位夹在私人邀约里，语境过窄。'],
  ['LAT069-074', '对外传播前修正错误与前一条公开信签名重复同题，保留更完整段落。'],
]);

const overrides = new Map([
  ['LAT069-001', { title: '归隐生活不倚赖他人' }],
  ['LAT069-002', { title: '耐受单调才得幸福' }],
  ['LAT069-003', { title: '生活方法各自为之' }],
  ['LAT069-005', { title: '目录增补要有专家自信' }],
  ['LAT069-006', { title: '编年表现思想演变' }],
  ['LAT069-007', { title: '编收以写作年月为主' }],
  ['LAT069-008', { title: '版本校订要详列根据' }],
  ['LAT069-009', { title: '有问题文章不必改动' }],
  ['LAT069-010', { title: '编年之外还要索引' }],
  ['LAT069-011', { title: '不盲捧胡适也不乱骂' }],
  ['LAT069-012', { title: '追问胡适真正的灯' }],
  ['LAT069-014', { title: '迟发薪水讽刺专任制度' }],
  ['LAT069-015', { title: '新朴学重返故纸堆' }],
  ['LAT069-016', { title: '统计比例纠正概括' }],
  ['LAT069-017', { title: '社会已被西方文明改变' }],
  ['LAT069-018', { title: '东方文明瓦解是趋势' }],
  ['LAT069-019', { title: '院字号人物只是小蠹虫' }],
  ['LAT069-020', { title: '已经回不去故纸堆' }],
  ['LAT069-021', { title: '开门打鬼两路并行' }],
  ['LAT069-023', { title: '新时代要用活文字' }],
  ['LAT069-025', { title: '人保制度反映互不信任' }],
  ['LAT069-027', { title: '引用石达开诗须辨伪' }],
  ['LAT069-029', { title: '疑案定案后不宜误引' }],
  ['LAT069-030', { title: '文章呼吁可推动制度变动' }],
  ['LAT069-032', { title: '迷信养女十年未改' }],
  ['LAT069-033', { title: '旧文体浮词藻语' }],
  ['LAT069-034', { title: '青年热心而胆怯' }],
  ['LAT069-035', { title: '不盲动也是进步' }],
  ['LAT069-036', { title: '解禁应留下历史记录' }],
  ['LAT069-037', { title: '用道德评判抽烟是伪善' }],
  ['LAT069-039', { title: '疏导工具稳定文明社会' }],
  ['LAT069-040', { title: '有清望者做好事最难' }],
  ['LAT069-041', { title: '不熟主题不妄写序' }],
  ['LAT069-042', { title: '邮局查扣平邮难以追证' }],
  ['LAT069-043', { title: '他人无信自己仍守信' }],
  ['LAT069-044', { title: '停刊处分可随登记解除' }],
  ['LAT069-045', { title: '另办杂志延续抵抗' }],
  ['LAT069-046', { title: '历史疑义要查原书' }],
  ['LAT069-047', { title: '写作计划须成套' }],
  ['LAT069-049', { title: '海外知识分子不能只顾学术' }],
  ['LAT069-050', { title: '海外学人施助带隔膜' }],
  ['LAT069-051', { title: '海外杂志要有泥土气' }],
  ['LAT069-052', { title: '文星改组是党化接棒' }],
  ['LAT069-054', { title: '知识人遣词要能交通' }],
  ['LAT069-055', { title: '影响群众先写好文章' }],
  ['LAT069-056', { title: '表达方式须抓住群众' }],
  ['LAT069-057', { title: '以暴易暴破坏改革平衡' }],
  ['LAT069-058', { title: '解救者也会害死浑沌' }],
  ['LAT069-059', { title: '斩尽杀绝没有太平' }],
  ['LAT069-060', { category: '知识', title: '意识形态译名更足义' }],
  ['LAT069-061', { title: '独裁常制造盲目爱戴' }],
  ['LAT069-062', { title: '自由人须阻止全体主义' }],
  ['LAT069-063', { title: '文人应多做理论建树' }],
  ['LAT069-064', { title: '国家观念有进步演变' }],
  ['LAT069-065', { category: '政治', title: '文人不再为帝王鹰犬' }],
  ['LAT069-066', { title: '学术代理商会包办美意' }],
  ['LAT069-067', { title: '私人基金应拔尖' }],
  ['LAT069-068', { title: '学术奖金应精缩' }],
  ['LAT069-069', { title: '唯精避免审议垄断' }],
  ['LAT069-070', { title: '现实压力压垮轻诺' }],
  ['LAT069-071', { title: '医疗救助应制度化' }],
  ['LAT069-072', { title: '胡适评传受资料限制' }],
  ['LAT069-073', { title: '公开信重名不可疏忽' }],
  ['LAT069-075', { title: '群老当道也要听青年声' }],
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
  return fileName.replace(/^《[^》]+》/u, '李敖写的信').replace(/^\d+\./u, '').replace(/\.txt$/u, '');
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
      '校对轮删除私人劝勉、过短提问、已由更强段落覆盖的重复主题、玩笑化尾句和过窄情境；保留能够独立呈现李敖编年索引方法、文字观、出版法权、反禁书、反全体主义、知识人写作、文化基金与政治判断的原文段落。description 未改写。',
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
  '# 李敖写的信校对说明',
  '',
  `校对输入：${extraction.records.length} 条`,
  `校对保留：${records.length} 条`,
  `删除条目：${dropped.length} 条`,
  '',
  '校对原则：',
  '',
  '- 删除私人劝勉、过短提问、玩笑化尾句、已由更强段落覆盖的重复主题和过窄情境。',
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
