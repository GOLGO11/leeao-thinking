import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 79;
const bookTitle = '中国迷信新研';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT079-005', '段落只是地域数量分布，独立思想密度不如大表统计方法和部位统计条目。'],
  ['LAT079-009', '段落只是引出朱氏割肺例子，常识质疑和屠户刀法条目已承载核心判断。'],
  ['LAT079-018', '段落过短，祖父吃小孙女肉的判断已由准儿媳文化牺牲和割肉事姑条目承载。'],
  ['LAT079-019', '段落只是婢女割股的补例，割股伦理扩张已由身份与对象差异条目承载。'],
  ['LAT079-029', '段落偏制度变化细节，官方不鼓励实则仍鼓励条目更能承载主旨。'],
  ['LAT079-031', '段落来自注释，未成年女孩割股数量虽可检索，但不是正文主线判断。'],
  ['LAT079-037', '段落过短，只是引出后文例证，正史荒谬已由器官移植式孝行条目承载。'],
  ['LAT079-039', '段落过短，正史双轨问题已由欧阳修两难和官方斥而仍奖条目承载。'],
  ['LAT079-040', '段落过短，官方奖励的双轨问题已由前后条目承载。'],
  ['LAT079-042', '段落过短，夫妇争割模式由后续互相复制条目更集中承载。'],
  ['LAT079-044', '段落过短，清代政府鼓励问题由李盛山和官方不鼓励实则鼓励条目承载。'],
  ['LAT079-049', '段落只是台湾现代割股材料引子，现代台湾仍有旧文化痕迹条目更集中。'],
  ['LAT079-060', '段落只是研究价值的短收束，方法论主旨已由旁征博引和大判断条目承载。'],
  ['LAT079-064', '段落偏厌胜钱支流，厌胜的核心定义、道具和现代照片条目更重要。'],
  ['LAT079-071', '段落主要列举火炮史，厌炮思想核心由定义与阴部厌炮机制条目承载。'],
  ['LAT079-080', '段落偏消灭纸人的术法细节，纸人替身和三种用途已承载主旨。'],
  ['LAT079-087', '段落只是巫蛊史例的泛称，巫蛊不全由女巫行之条目更有辨析性。'],
  ['LAT079-092', '段落与偶人替身和掘地求偶人的政治大乱重复，校对轮保留更集中条目。'],
  ['LAT079-097', '段落只是勾魂摄魄篇的短收束，照相摄魄传说已承载核心。'],
  ['LAT079-105', '段落偏单一宋代史例，掘敌祖坟成为政治文化条目更完整。'],
  ['LAT079-110', '段落偏激将故事，厉鬼理论主线由疾病、归属和复仇表达条目承载。'],
]);

const overrides = new Map([
  ['LAT079-001', { title: '割股是只此一家的中国文化' }],
  ['LAT079-002', { title: '巫医系统一直延伸到中医' }],
  ['LAT079-003', { title: '割肉治病比巫医更荒诞' }],
  ['LAT079-004', { title: '大表统计呈现割股全貌' }],
  ['LAT079-006', { title: '割肉部位统计显示割股最多' }],
  ['LAT079-007', { title: '训诂可归并割肉方法' }],
  ['LAT079-008', { title: '医学常识可质疑割肉存活' }],
  ['LAT079-010', { title: '屠户刀法不能解释割肺存活' }],
  ['LAT079-011', { title: '公式化成功率暴露荒谬叙述' }],
  ['LAT079-012', { title: '霍然病愈是公式化描写' }],
  ['LAT079-013', { title: '割肝割肺不能按常识相信' }],
  ['LAT079-014', { title: '割股事实伤亡率可观' }],
  ['LAT079-015', { title: '多角割股显示愚孝加码' }],
  ['LAT079-016', { title: '割肉事姑显示儿媳压力' }],
  ['LAT079-017', { title: '准儿媳也会成为文化牺牲品' }],
  ['LAT079-020', { title: '割股行为有祷告公式' }],
  ['LAT079-021', { title: '孝感动天是割股动因' }],
  ['LAT079-022', { title: '病人思肉促成亲人代肉' }],
  ['LAT079-023', { title: '医药无效使人肉变药物' }],
  ['LAT079-024', { title: '官方荣誉鼓励割股' }],
  ['LAT079-025', { title: '韩愈认为割股反成不孝' }],
  ['LAT079-026', { title: '免税优待使割股不单纯' }],
  ['LAT079-027', { title: '割股可演变成逃税手段' }],
  ['LAT079-028', { title: '明太祖处理割股采取两面光' }],
  ['LAT079-030', { title: '官方不鼓励实则仍鼓励' }],
  ['LAT079-032', { title: '民国以后大脑中仍是旧中国' }],
  ['LAT079-033', { title: '男女割股需分开取材研究' }],
  ['LAT079-034', { title: '毁伤身体与救亲大孝形成两难' }],
  ['LAT079-035', { title: '反迷信者也会在割股上糊涂' }],
  ['LAT079-036', { title: '欧阳修的两难造成思想双轨' }],
  ['LAT079-038', { title: '器官移植式孝行是胡扯' }],
  ['LAT079-041', { title: '统治者只能接受两面光主意' }],
  ['LAT079-043', { title: '争割模式会互相复制' }],
  ['LAT079-045', { title: '割股佳话也是鬼话' }],
  ['LAT079-046', { title: '前进读书人也难免文化压力' }],
  ['LAT079-047', { title: '研究中国文化要有行家水准' }],
  ['LAT079-048', { title: '男女割股对象差异值得注意' }],
  ['LAT079-050', { title: '现代台湾仍有礼失求野痕迹' }],
  ['LAT079-051', { title: '鬼书来自欠通文字水平' }],
  ['LAT079-052', { title: '根深蒂固材料极难处理' }],
  ['LAT079-053', { title: '研究需独具慧眼上穷碧落' }],
  ['LAT079-054', { title: '旁征博引粗中有细是必要条件' }],
  ['LAT079-055', { title: '大判断与小结裹缺一不可' }],
  ['LAT079-056', { title: '好文章能融著述与比类' }],
  ['LAT079-057', { title: '铸像卜休咎是北方民族习惯' }],
  ['LAT079-058', { title: '铸像失败可左右政治抉择' }],
  ['LAT079-059', { title: '皇后取舍也可由铸像决定' }],
  ['LAT079-061', { title: '厌胜一词源于压伏' }],
  ['LAT079-062', { title: '厌胜相信诅咒可制胜' }],
  ['LAT079-063', { title: '厌胜往往配合法术道具' }],
  ['LAT079-065', { title: '照片可成为现代厌胜道具' }],
  ['LAT079-066', { title: '打小人分记名与不记名' }],
  ['LAT079-067', { title: '厌镇是建筑中的巫术手脚' }],
  ['LAT079-068', { title: '木工厌胜被说成行业传统' }],
  ['LAT079-069', { title: '厌镇文明邪恶而多样' }],
  ['LAT079-070', { category: '情爱', title: '女人裸体可被用来厌炮' }],
  ['LAT079-072', { category: '情爱', title: '把炮当战士才会用阴部厌炮' }],
  ['LAT079-073', { title: '祝诅是祈鬼神降祸他人' }],
  ['LAT079-074', { title: '皇帝也会向下祝诅臣民' }],
  ['LAT079-075', { title: '祝诅思想常引发凶案重刑' }],
  ['LAT079-076', { title: '活动偶人增强祝诅效果' }],
  ['LAT079-077', { title: '纸人取代偶人更方便' }],
  ['LAT079-078', { title: '纸人有三种迷信用途' }],
  ['LAT079-079', { title: '纸人被当作施法替身' }],
  ['LAT079-081', { title: '媚道迷信兼具固宠与害敌' }],
  ['LAT079-082', { title: '媚道要祭祀吃药等形式条件' }],
  ['LAT079-083', { title: '媚道可用婴儿肢体作条件' }],
  ['LAT079-084', { title: '春宫画也可成为媚道工具' }],
  ['LAT079-085', { title: '蛊毒与巫蛊须分辨' }],
  ['LAT079-086', { title: '一杀一烧显示蛊毒巫蛊差异' }],
  ['LAT079-088', { title: '巫蛊不全由女巫行之' }],
  ['LAT079-089', { title: '偶人有冥器与害人两用' }],
  ['LAT079-090', { title: '偶人被视为本人替身' }],
  ['LAT079-091', { title: '掘地求偶人会造成政治大乱' }],
  ['LAT079-093', { title: '勾摄从行政语转为捉拿' }],
  ['LAT079-094', { title: '捉拿身体延伸为勾取灵魂' }],
  ['LAT079-095', { title: '勾魂可被用来办案' }],
  ['LAT079-096', { title: '照相术入华产生摄魄传说' }],
  ['LAT079-098', { title: '其如予何表达自信口气' }],
  ['LAT079-099', { title: '天命在兹会留下自信影响' }],
  ['LAT079-100', { category: '人格', title: '天命自信会小规模发作' }],
  ['LAT079-101', { title: '地脉被相信关系吉凶' }],
  ['LAT079-102', { title: '祖坟风水比住宅更重要' }],
  ['LAT079-103', { title: '阴宅风水在晋后走火入魔' }],
  ['LAT079-104', { title: '地脉念头集中到祖坟' }],
  ['LAT079-106', { title: '掘敌祖坟成为中国政治文化' }],
  ['LAT079-107', { title: '现代政治愤怒仍会指向祖坟' }],
  ['LAT079-108', { title: '厉鬼含恶鬼与绝后之鬼' }],
  ['LAT079-109', { title: '病入膏肓源于厉鬼索命' }],
  ['LAT079-111', { title: '疾病可被解释为神鬼作弄' }],
  ['LAT079-112', { title: '鬼有所归乃不为厉' }],
  ['LAT079-113', { title: '厉鬼也可成为复仇表达' }],
  ['LAT079-114', { title: '厉鬼被拿来反共抗俄' }],
  ['LAT079-115', { title: '阴阳生殖器思想充满矛盾' }],
  ['LAT079-116', { title: '生殖器崇拜也及于女人' }],
  ['LAT079-117', { title: '妇人厌炮是阴部思想精华' }],
  ['LAT079-118', { title: '国民党意识形态上限教条下限迷信' }],
  ['LAT079-119', { title: '上层教条与下层迷信并存' }],
  ['LAT079-120', { title: '官僚学究方士流毒被国民党接收' }],
  ['LAT079-121', { title: '大迷信后劝人不迷信脸皮太厚' }],
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
    .replace(/[《》“”‘’!?.,，。！、：；（）()\s]+/g, '')
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
      '校对轮删除地域分布细节、脚注补例、短承接句、重复的正史双轨例证、术法支流和篇末收束；保留割股愚孝机制、迷信术语定义、史料辨伪方法、官方鼓励结构、巫术与政治案件、祖坟风水、厉鬼观念、阴部思想和国民党迷信意识形态。description 未改写。',
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
  '- 保留割股愚孝机制、迷信术语定义、史料辨伪方法、官方鼓励结构、巫术与政治案件、祖坟风水、厉鬼观念、阴部思想和国民党迷信意识形态等可独立检索判断。',
  '- 删除地域分布细节、脚注补例、短承接句、重复的正史双轨例证、术法支流和篇末收束。',
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
