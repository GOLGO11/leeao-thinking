import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 67;
const outputDir = path.join(rootDir, 'outputs', '067.坐牢家爸爸给女儿的八十封信');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT067-004', '交友谨慎只是通用格言，且人格判断已由忠诚、不背叛等更强段落承载。'],
  ['LAT067-006', '鳄鱼下巴软肋偏动物知识和策略小机锋，独立思想密度不足。'],
  ['LAT067-007', '纸币词汇铺陈较多，省小钱的大意已不够独立支撑思想索引。'],
  ['LAT067-008', '最后一根稻草属通用成语解释，已由更强的防患未然和不把蛋放一篮等方法条目覆盖。'],
  ['LAT067-009', '机会失掉就抓不住偏短促格言，源段主要是《伊索寓言》介绍。'],
  ['LAT067-011', '感恩节历史和宗教感恩说明偏常识，李敖自身判断较弱。'],
  ['LAT067-013', '学英文不马虎的判断较窄，源段主要解释老虎成语，保留其他语言学习方法条目即可。'],
  ['LAT067-017', '样样通样样松过短，且缺少本书独特语境。'],
  ['LAT067-019', '情人节译名辨析过窄，偏词义校正，不进入校对轮。'],
  ['LAT067-020', '宰熊后卖皮与“不把所有蛋放一篮”的稳健原则重复，保留后者。'],
  ['LAT067-026', '别打落水狗与前文狗忠诚条目重复，且原段过短。'],
  ['LAT067-028', '抓狼耳朵的两难偏单一成语解释，思想索引独立性不足。'],
  ['LAT067-033', '驴朝你叫不要回叫偏短促处世格言，源段不够展开。'],
  ['LAT067-040', '轻诺寡信是前一条“空话骗人”的附属例句，保留更完整段落。'],
  ['LAT067-044', '人同此心心同此理偏语言巧合说明，思想判断不够集中。'],
  ['LAT067-077', '画地为牢和夜不闭户与“没有铁栏杆的监狱”同题，保留后者。'],
  ['LAT067-081', '生不逢辰与“超前时代不被理解”“真理会遭宗教法庭软禁”重复。'],
  ['LAT067-082', '牛顿英文引文未形成李敖自己的论断，删除。'],
  ['LAT067-092', '场拨鼠守望相助偏动物趣闻，规范性判断较弱。'],
  ['LAT067-095', '快刀斩乱麻偏成语释义，独立思想密度不足。'],
]);

const overrides = new Map([
  ['LAT067-001', { title: '狱中函授依赖例外空间' }],
  ['LAT067-002', { title: '监狱使文字无法畅写带出' }],
  ['LAT067-003', { title: '忠诚不做打落水狗的事' }],
  ['LAT067-005', { title: '文明人也会换法吃人' }],
  ['LAT067-010', { title: '送礼习惯照出实际主义' }],
  ['LAT067-012', { title: '冒险才有收获' }],
  ['LAT067-014', { title: '俗语须经知识校正' }],
  ['LAT067-015', { title: '逃避危险不等于安全' }],
  ['LAT067-016', { title: '贪心会断掉财路' }],
  ['LAT067-018', { title: '先补功课再谈玩乐' }],
  ['LAT067-021', { title: '天才要靠用功冒出来' }],
  ['LAT067-022', { title: '反复阅读会慢慢懂' }],
  ['LAT067-023', { title: '批评异俗先照见本土' }],
  ['LAT067-025', { title: '亲热可能包藏背叛' }],
  ['LAT067-029', { title: '不要把所有蛋放一篮' }],
  ['LAT067-030', { title: '性别决定来自父方染色体' }],
  ['LAT067-031', { title: '不要打扰正在赢的团队' }],
  ['LAT067-032', { title: '灵芝并不神秘' }],
  ['LAT067-034', { title: '死马骨头也能引来千里马' }],
  ['LAT067-035', { title: '随遇而安也要充实自己' }],
  ['LAT067-036', { title: '写信经修改才进步' }],
  ['LAT067-037', { category: '方法', title: '语言学习不可洋泾浜' }],
  ['LAT067-038', { title: '自大以为太阳为他升起' }],
  ['LAT067-039', { title: '承诺成山实行成丘' }],
  ['LAT067-041', { title: '直言黑白不颠倒' }],
  ['LAT067-042', { title: '刻苦读书可补教育不足' }],
  ['LAT067-043', { title: '身体检查是防患未然' }],
  ['LAT067-045', { title: '坐牢不能直接定罪' }],
  ['LAT067-046', { title: '牢中写作可能改变世界' }],
  ['LAT067-047', { title: '作家常因文字入狱' }],
  ['LAT067-048', { title: '民意可越过牢门' }],
  ['LAT067-049', { title: '牺牲实在而信虚幻' }],
  ['LAT067-050', { title: '溺爱会成为作恶同谋' }],
  ['LAT067-051', { title: '革命失败就会上绞架' }],
  ['LAT067-052', { title: '中文亲属称谓细密' }],
  ['LAT067-053', { title: '天堂来自人间愿望' }],
  ['LAT067-054', { title: '乌托邦会倒置是非' }],
  ['LAT067-055', { title: '猫抓耗子法案管理绝食者' }],
  ['LAT067-056', { title: '移风易俗要身体力行' }],
  ['LAT067-057', { title: '真孝不是丧礼虚文' }],
  ['LAT067-058', { title: '父亲称呼要有亲热感' }],
  ['LAT067-059', { title: '该牺牲时要断臂' }],
  ['LAT067-060', { title: '傀儡政府就是没有主权' }],
  ['LAT067-061', { title: '五月花资格遮蔽原住民' }],
  ['LAT067-062', { title: '不要只吹祖宗' }],
  ['LAT067-063', { title: '虚君只是国家象征' }],
  ['LAT067-064', { title: '不因讨厌而抹杀长处' }],
  ['LAT067-065', { title: '超前时代反而不被理解' }],
  ['LAT067-066', { title: '第六感没有科学根据' }],
  ['LAT067-067', { title: '人常常视而不见' }],
  ['LAT067-068', { title: '充分时间才能摸出全象' }],
  ['LAT067-069', { title: '顺风耳实行要有限度' }],
  ['LAT067-070', { title: '看图文也要辨别误说' }],
  ['LAT067-071', { title: '特技不能解民倒悬' }],
  ['LAT067-072', { title: '宗教阶级对牛宽对人严' }],
  ['LAT067-073', { title: '沦为贱民等于政治犯' }],
  ['LAT067-074', { title: '殉夫坏俗终被禁止' }],
  ['LAT067-075', { title: '贫富悬殊要追殖民责任' }],
  ['LAT067-076', { title: '监狱也可以没有铁栏杆' }],
  ['LAT067-078', { title: '英文句子要写得像样' }],
  ['LAT067-079', { title: '爱师长更爱真理' }],
  ['LAT067-080', { title: '真理会遭宗教法庭软禁' }],
  ['LAT067-083', { title: '修正牛顿仍依赖牛顿' }],
  ['LAT067-084', { title: '袋鼠法庭就是私设公堂' }],
  ['LAT067-085', { title: '过分不公必有不平之鸣' }],
  ['LAT067-086', { title: '白澳政策是占着不用' }],
  ['LAT067-087', { title: '多样社会难以一党' }],
  ['LAT067-088', { title: '不知民瘼会走向断头台' }],
  ['LAT067-089', { title: '贞德罪名后来证明为假' }],
  ['LAT067-090', { title: '伏尔泰文字影响大革命' }],
  ['LAT067-091', { title: '哲学家要有三窟防走狗' }],
  ['LAT067-093', { title: '吴凤神话须回到事实' }],
  ['LAT067-094', { title: '复制希腊最不希腊' }],
  ['LAT067-096', { title: '哲学家的自由胜过皇帝' }],
  ['LAT067-097', { title: '罗马假期是以苦为乐' }],
  ['LAT067-098', { title: '恺撒与上帝各归其位' }],
  ['LAT067-099', { title: '避实拖垮强敌' }],
  ['LAT067-100', { title: '文艺可保存民族意识' }],
  ['LAT067-101', { title: '慷他人之慨是借别人付账' }],
  ['LAT067-102', { title: '哥白尼为近代天文学奠基' }],
  ['LAT067-103', { title: '居里夫人由苦学成功' }],
  ['LAT067-104', { title: '政治犯牵连家属流放' }],
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
  return fileName
    .replace(/^《[^》]+》/u, '坐牢家爸爸给女儿的八十封信')
    .replace(/^\d+\./, '')
    .replace(/\.txt$/u, '');
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
      '校对轮删除纯成语释义、过细词汇点、动物百科趣闻、短促格言、私人化窄场景和已由更强段落覆盖的条目；保留能够独立呈现李敖狱中写作、父女函授、知识方法、人格判断、文化批判、政治法权意识与反迷信态度的原文段落。description 未改写。',
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
  '# 坐牢家爸爸给女儿的八十封信校对说明',
  '',
  `校对输入：${extraction.records.length} 条`,
  `校对保留：${records.length} 条`,
  `删除条目：${dropped.length} 条`,
  '',
  '校对原则：',
  '',
  '- 删除纯成语释义、过细词汇点、动物百科趣闻、短促格言和私人化窄场景。',
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
