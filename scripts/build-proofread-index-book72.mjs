import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 72;
const bookTitle = '为历史拨云';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT072-027', '段落主要是赵普与宋太祖轶事铺陈，提取轮标题也偏离源段主旨；“半部论语”思想由后文完整段落承载。'],
  ['LAT072-044', '过渡句过短，只说明复仇思想会乱法犯禁，具体制度处理已由“调人”条目完整承载。'],
  ['LAT072-066', '段落以法规引文提示收尾，独立性不足；“淹禁不决损害人权”条目已承载同一判断。'],
  ['LAT072-094', '一句话原则与后文签字、分工、分层负责条目重复，校对轮保留更完整的制度论述。'],
  ['LAT072-102', '盖章造成责任不清与职掌混淆，已由权责脱节、推诿和签名替代条目分层承载。'],
  ['LAT072-115', '段落偏历史背景和名词说明，软禁制度的思想密度由后文“高墙软禁”条目承载。'],
  ['LAT072-124', '段落以法律条文提示收尾，未展开关键批判；奔丧权被封杀由下一条完整承载。'],
  ['LAT072-140', '段落是论文结构引子，以冒号收束，独立思想密度不足。'],
  ['LAT072-144', '段落是回应社论的开场提示，后续“盛世”“修史”“春秋”三条承载实际判断。'],
]);

const overrides = new Map([
  ['LAT072-001', { title: '中国史被四云遮蔽' }],
  ['LAT072-005', { title: '五百年思想承载史家抱负' }],
  ['LAT072-006', { title: '五百年成为抱负单位' }],
  ['LAT072-008', { title: '以欲止欲引人信佛' }],
  ['LAT072-013', { title: '贪污自污可用于避祸' }],
  ['LAT072-014', { title: '俸禄不足造成开支贪污' }],
  ['LAT072-015', { title: '肃贪须改监督薪金' }],
  ['LAT072-016', { title: '解释嵇康之死不可单因' }],
  ['LAT072-020', { category: '政治', title: '名器不可轻予' }],
  ['LAT072-030', { title: '大臣之风在抓大事' }],
  ['LAT072-033', { category: '人格', title: '大臣持身标准高于常人' }],
  ['LAT072-037', { title: '任大官须先查档案' }],
  ['LAT072-038', { title: '恋栈官位必然失态' }],
  ['LAT072-039', { title: '写大文章无暇私交' }],
  ['LAT072-041', { title: '私交公关败坏大臣风度' }],
  ['LAT072-042', { title: '正人君子不靠公关' }],
  ['LAT072-046', { title: '公羊传译注必须辨误' }],
  ['LAT072-050', { category: '法权', title: '獬豸崇拜遮蔽理智司法' }],
  ['LAT072-051', { title: '下情上达先要挨罚' }],
  ['LAT072-053', { title: '国民党连立肺石也复兴不出' }],
  ['LAT072-056', { title: '官就是管的权威' }],
  ['LAT072-057', { title: '民不畏死才会官逼民反' }],
  ['LAT072-059', { title: '百姓喊冤只剩三条路' }],
  ['LAT072-060', { title: '拦舆申诉仍须受罚' }],
  ['LAT072-063', { title: '议会政治不能只争椅子' }],
  ['LAT072-068', { title: '物类相感构成生克哲学' }],
  ['LAT072-069', { title: '粗疏观察造成蝙蝠迷信' }],
  ['LAT072-070', { title: '伊索寓言更能识破骑墙' }],
  ['LAT072-071', { title: '清议必须是非分明' }],
  ['LAT072-072', { title: '主持正义必须立场明确' }],
  ['LAT072-073', { title: '独裁者不可与民争利' }],
  ['LAT072-078', { title: '哭庙须守关系位阶' }],
  ['LAT072-081', { title: '政治常借有情做手段' }],
  ['LAT072-082', { title: '宋太祖懂得放任前朝之哭' }],
  ['LAT072-085', { title: '大员上香等于提倡迷信' }],
  ['LAT072-087', { title: '淫祠泛滥反映迷信政治' }],
  ['LAT072-088', { title: '盖印源于文盲官制' }],
  ['LAT072-089', { title: '抓把印子象征握权' }],
  ['LAT072-090', { title: '蜜印延伸官印迷信' }],
  ['LAT072-091', { title: '代拆代行催生图章政治' }],
  ['LAT072-092', { title: '图章造成权责脱节' }],
  ['LAT072-093', { title: '图章制度迫出私人政治' }],
  ['LAT072-095', { title: '签字可迫使分工负责' }],
  ['LAT072-097', { title: '秘书长制度悖反分层负责' }],
  ['LAT072-098', { title: '议会问责必须权责合一' }],
  ['LAT072-100', { title: '层层盖章助长推诿' }],
  ['LAT072-101', { title: '签名取代印章才能分层负责' }],
  ['LAT072-103', { title: '签名制度可改造行政' }],
  ['LAT072-104', { title: '图章政治对国民党知易行难' }],
  ['LAT072-108', { title: '老夫少妻被解释为相济' }],
  ['LAT072-109', { title: '年老情欲引出性别双标' }],
  ['LAT072-111', { title: '权力用隔绝冒充自由' }],
  ['LAT072-116', { category: '法权', title: '高墙软禁造成骨肉惨象' }],
  ['LAT072-117', { title: '复古成年礼不伦不类' }],
  ['LAT072-119', { title: '移植成年礼是在扰民' }],
  ['LAT072-120', { title: '礼的本质是因事制宜' }],
  ['LAT072-122', { category: '人格', title: '名成之后难认无才' }],
  ['LAT072-123', { title: '守制礼法训练阳奉阴违' }],
  ['LAT072-125', { title: '得准二字封杀奔丧权' }],
  ['LAT072-128', { title: '实事求是须从实事求是' }],
  ['LAT072-133', { title: '范仲淹坚持济天下众' }],
  ['LAT072-134', { title: '范仲淹坚持卫天下道' }],
  ['LAT072-135', { title: '范仲淹坚持守天下法' }],
  ['LAT072-136', { title: '范仲淹坚持先天下忧' }],
  ['LAT072-137', { title: '历史事实不能按慈悲心改写' }],
  ['LAT072-138', { title: '岳飞案祸首是高宗本人' }],
  ['LAT072-139', { title: '军队骄惰会扰民误国' }],
  ['LAT072-141', { title: '捺钵是生产求生不是游幸' }],
  ['LAT072-142', { title: '捺钵可成为施政中心' }],
  ['LAT072-146', { title: '盛世修史说不合史例' }],
  ['LAT072-148', { title: '史官直笔须有制度保障' }],
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
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'，。！？、：；;()\s]+/g, '')
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
      '校对轮删除过渡句、文章引子、故事铺陈、半截法规提示和图章政治中的重复短句；保留可独立检索的史学方法、政治批判、法权诉求、文化诊断、人格判断与情爱观照。description 未改写。',
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

fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
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
  `# ${bookTitle}校对说明`,
  '',
  `来源：${path.relative(rootDir, extractionPath).replaceAll(path.sep, '/')}`,
  '',
  `提取轮 ${extraction.records.length} 条；校对轮 ${records.length} 条；删除 ${dropped.length} 条。`,
  '',
  '校对原则：',
  '',
  '- 保留能独立承载李敖史学方法、政治批判、法权诉求、文化诊断、人格判断与情爱观照的原文段落。',
  '- 删除过渡句、文章引子、故事铺陈、半截法规提示、重复制度短句和依赖上下文的结构说明。',
  '- 只调整取舍、标题和分类；所有 `description` 均沿用提取轮原文段落。',
  '',
  '删除条目：',
  '',
  ...dropped.map((item) => `- ${item.id} ${item.title}：${item.reason}`),
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), note, 'utf8');

console.log(`Proofread ${bookTitle}: ${records.length} records, dropped ${dropped.length}.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
