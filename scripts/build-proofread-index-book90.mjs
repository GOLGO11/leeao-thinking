import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const sequence = '090';
const bookTitle = '笑傲六十年·有话说李敖';
const bookDir = path.join(repoRoot, 'outputs', `${sequence}.${bookTitle}`);
const inputPath = path.join(bookDir, '思想索引-提取轮.json');

const outputJson = path.join(bookDir, '思想索引-校对轮.json');
const outputCsv = path.join(bookDir, '思想索引-校对轮.csv');
const outputMd = path.join(bookDir, '思想索引-校对轮.md');
const canonicalJson = path.join(bookDir, '思想索引.json');
const canonicalCsv = path.join(bookDir, '思想索引.csv');
const canonicalTxt = path.join(bookDir, '思想索引.txt');
const proofreadNote = path.join(bookDir, '校对说明.md');

const categories = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(categories);

const dropReasons = new Map();
const addDrops = (ids, reason) => {
  for (const id of ids) dropReasons.set(id, reason);
};

addDrops([2, 6, 28, 29, 32, 36, 61, 88, 117, 120], '偏传记铺陈、串场或自我定位说明，索引独立性较弱');
addDrops([20, 25, 46, 67, 69, 83, 94, 95, 100, 118], '与相邻主题重复，校对轮保留信息量更完整或判断更清晰者');

const titleOverrides = new Map([
  [3, '蒋介石团队使台湾问题纠缠六十年'],
  [10, '有骨气连遗体也可作证'],
  [18, '自由中国不能只在纵贯线'],
  [19, '民间真相要靠明察暗访'],
  [21, '江南成了李敖替死鬼'],
  [23, '可怜人也有自己的正义'],
  [24, '要替无声者讲公道话'],
  [27, '文星书籍多被查禁'],
  [30, '文星只是兴风作浪的踏板'],
  [33, '文星抄家使他正式翻脸'],
  [35, '文星之后才是真正翻江倒海'],
  [37, '胡适铜像是改革开放试金石'],
  [38, '胡适要分启蒙者和蒋友'],
  [40, '胡适在台湾只是点缀'],
  [41, '求士使身后不朽'],
  [44, '对国民党不谅解有现实根源'],
  [45, '言论自由不能只是空话'],
  [47, '禁书残本是禁书史文献'],
  [49, '查禁十书是怪现状之尤'],
  [50, '白色恐怖像天罗地网'],
  [51, '媒体封锁才是真白色恐怖'],
  [52, '集中营不能粉刷成观光饭店'],
  [53, '受审沉默也是抗辩'],
  [55, '小刑求也会直达内心'],
  [56, '刑求中仍能保留幽默'],
  [57, '肉体受苦时精神仍可抵抗'],
  [58, '坐牢比牛棚还牛棚'],
  [60, '冤狱笑话都带着泪'],
  [62, '吹牛也要有修辞学'],
  [64, '黑牢文章能引发监狱震动'],
  [65, '冲决网罗才算报复'],
  [66, '言论自由要宣战争取'],
  [68, '写作量也是对抗力量'],
  [70, '越查禁越照样出版'],
  [71, '禁书记录是世界级法权记录'],
  [76, '许历农认错说明查禁无必要'],
  [79, '选举可以是思想运动'],
  [80, '短政见显出中文能力'],
  [84, '参加伪国会是为了颠覆它'],
  [86, '议会规则只属于真民主'],
  [87, '假民主要用非常手段'],
  [89, '裸抗也是反军购表达'],
  [90, '军购挡不住战争风险'],
  [91, '高价军购只买死讯'],
  [92, '台湾出钱给美国买眼睛'],
  [96, '台湾关系法不能凌驾中国关系'],
  [97, '保护美国利益就该送武器'],
  [98, '美国祸害中国台湾有历史脉络'],
  [101, '美国模式不能成为全球标准'],
  [102, '义卖慰安妇是反日本羞辱'],
  [106, '李敖自认见证人与送葬人'],
  [107, '中华民国亡国支撑台湾假历史'],
  [108, '谴责蒋介石关键在卖国'],
  [110, '台湾民主台独都是假戏'],
  [112, '蒋介石遗毒是卖国媚美拦路'],
  [113, '历史判断必须有是非'],
  [114, '战斗型不做先烈型'],
  [119, '目标远时过程更重要'],
  [121, '抢救中文是未来使命'],
  [123, '回祖国不是乡愁叙事'],
  [124, '收回香港证明国家力量'],
  [125, '革命完成后要享受文明成果'],
]);

const categoryOverrides = new Map([
  [18, '方法'],
  [31, '写作'],
  [34, '文化'],
  [40, '知识'],
  [44, '人格'],
  [47, '知识'],
  [52, '文化'],
  [71, '法权'],
  [89, '方法'],
  [106, '政治'],
  [119, '方法'],
]);

const keywordSeeds = [
  '李敖', '台湾', '中国', '祖国', '国民党', '蒋介石', '马英九', '胡适',
  '文星', '查禁', '言论自由', '白色恐怖', '监狱', '政治犯', '军购',
  '美国', '日本', '台独', '中华民国', '历史', '中文', '写作', '爱情',
  '老兵', '法权', '人格', '方法', '文化', '情爱',
];

function sourceSeq(record) {
  const match = String(record.source_id || record.id || '').match(/(\d+)$/);
  if (!match) throw new Error(`无法解析记录编号：${record.id}`);
  return Number(match[1]);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function keywordsFor(record, title, category) {
  const text = `${title} ${category} ${(record.keywords || []).join(' ')} ${record.source_file || ''}`;
  const picked = [category];
  for (const seed of keywordSeeds) {
    if (text.includes(seed) && !picked.includes(seed)) picked.push(seed);
    if (picked.length >= 4) break;
  }
  return picked;
}

function toCsv(records) {
  const headers = ['id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords', 'source_id'];
  return `${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => {
      if (header === 'keywords') return csvEscape(record.keywords.join(';'));
      return csvEscape(record[header]);
    }).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 书名：${bookTitle}`,
    '- 轮次：校对轮',
    '- 状态：已校对',
    `- 条目数：${records.length}`,
    '- 说明：description 保留源文本原段落，只校对取舍、标题、分类、关键词和编号。',
    '',
  ];
  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push(`- 提取轮：${record.source_id}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => [
    `${record.id}. ${record.title}`,
    `分类：${record.category}`,
    `来源：${record.source_file}#${record.source_paragraph}`,
    `关键词：${record.keywords.join('、')}`,
    `提取轮：${record.source_id}`,
    record.description,
  ].join('\n')).join('\n\n')}\n`;
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) || 0;
    if (count > 0) {
      record.title = `${record.title}（${record.source_file}#${record.source_paragraph}）`;
    }
    seen.set(record.title, count + 1);
  }
}

function categoryCounts(records) {
  return categories
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter((item) => item.count > 0);
}

function buildNote(inputRecords, outputRecords) {
  const byReason = new Map();
  for (const [id, reason] of dropReasons.entries()) {
    if (!byReason.has(reason)) byReason.set(reason, []);
    byReason.get(reason).push(id);
  }

  const lines = [
    `# ${bookTitle} 校对说明`,
    '',
    `- 提取轮条目：${inputRecords.length}`,
    `- 校对轮保留：${outputRecords.length}`,
    `- 校对轮剔除：${inputRecords.length - outputRecords.length}`,
    '- 校对原则：description 保持原文，不做改写；剔除重复、串场、偏传记铺陈和索引独立性较弱的条目；将标题压成可检索判断句。',
    '',
    '## 剔除记录',
    '',
  ];

  for (const [reason, ids] of byReason.entries()) {
    lines.push(`- ${reason}：${ids.map((id) => `LAT090-${String(id).padStart(3, '0')}`).join('、')}`);
  }

  lines.push('');
  lines.push('## 分类分布');
  lines.push('');
  for (const item of categoryCounts(outputRecords)) {
    lines.push(`- ${item.category}：${item.count}`);
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

const inputPayload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const inputRecords = Array.isArray(inputPayload) ? inputPayload : inputPayload.records;
if (!Array.isArray(inputRecords)) {
  throw new Error('提取轮 JSON 未找到 records 数组');
}

const inputSeqs = new Set(inputRecords.map(sourceSeq));
const missingDrops = [...dropReasons.keys()].filter((id) => !inputSeqs.has(id));
const missingTitles = [...titleOverrides.keys()].filter((id) => !inputSeqs.has(id));
const missingCategories = [...categoryOverrides.keys()].filter((id) => !inputSeqs.has(id));
if (missingDrops.length || missingTitles.length || missingCategories.length) {
  throw new Error(`校对配置包含不存在的 id：drops=${missingDrops.join(',')} titles=${missingTitles.join(',')} categories=${missingCategories.join(',')}`);
}

const records = [];
for (const record of inputRecords) {
  const seq = sourceSeq(record);
  if (dropReasons.has(seq)) continue;

  const title = titleOverrides.get(seq) || record.title;
  const category = categoryOverrides.get(seq) || record.category;
  if (!categorySet.has(category)) {
    throw new Error(`未知分类：${record.id} ${category}`);
  }

  records.push({
    ...record,
    id: `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`,
    source_id: record.source_id || record.id,
    round: '校对轮',
    status: '已校对',
    title,
    category,
    keywords: keywordsFor(record, title, category),
  });
}

ensureUniqueTitles(records);

const payload = {
  book: {
    ...(inputPayload.book || {}),
    sequence,
    title: bookTitle,
    round: '校对轮',
    status: '已校对',
    note: '校对轮删除重复、串场、偏传记铺陈和索引独立性较弱的条目；将标题压成可检索判断句，并收敛政治、法权、人格、写作、方法、知识、文化、情爱分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    record_count: records.length,
    candidate_count: inputRecords.length,
    skipped_duplicate_count: 0,
    skipped_duplicates: [],
    category_counts: categoryCounts(records),
    source_count: inputRecords.length,
    dropped_count: inputRecords.length - records.length,
  },
  records,
};

fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputCsv, toCsv(records), 'utf8');
fs.writeFileSync(outputMd, toMarkdown(records), 'utf8');
fs.writeFileSync(canonicalJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(canonicalCsv, toCsv(records), 'utf8');
fs.writeFileSync(canonicalTxt, toTxt(records), 'utf8');
fs.writeFileSync(proofreadNote, buildNote(inputRecords, records), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  input: inputRecords.length,
  output: records.length,
  dropped: inputRecords.length - records.length,
  category_counts: payload.book.category_counts,
}, null, 2));
