import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '037.爱情的秘密');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');
const decoder = new TextDecoder('gb18030');

const dropReasons = new Map([
  ['LAT037-005', '布莱克译诗行本身偏引文，校对轮保留李敖对爱情无言之美的解释。'],
  ['LAT037-010', '闭眼体味句子与“生活节奏训练文字节奏”“观察要进入对象”相近，且偏故事教学细节。'],
  ['LAT037-011', '看云不止看颜色与后文“观察要进入对象”相近，校对轮保留更有方法概括的一条。'],
  ['LAT037-014', '蒙难残作有特别意义偏个人译诗履历，独立思想索引价值弱于坐牢强者、狱中写作等条目。'],
  ['LAT037-018', '狱中译作需要保存与“翻译坚持押韵”“纪念性使原译不再改”相近，校对轮保留后者。'],
  ['LAT037-021', '纪念性使原译不再改与狱中译作、翻译方法条目相近，且偏文本处理说明。'],
  ['LAT037-027', '“岛是监狱狱是岛”是诗中半句，过短，校对轮不单独索引。'],
  ['LAT037-028', '“墙头草”诗句过短，政治判断不如后文出版、台独、沟通等条目完整。'],
  ['LAT037-029', '“不要中立”诗句过短，独立检索价值弱。'],
  ['LAT037-033', '文人坏命令人同情偏人物小结，校对轮保留居浩然与徐文长类比的完整段落。'],
  ['LAT037-037', '“真幻原一体”是诗行碎片，校对轮压缩诗行型条目。'],
  ['LAT037-041', '情人说谎可以不说破与“情没有对错”“美没有善恶”同组，校对轮保留更概括者。'],
  ['LAT037-043', '浅情才是深情与短暂爱情、快乐爱情条目重复。'],
  ['LAT037-046', '高人相信拥抱与“爱靠身体连接”“情书会失效”重复。'],
  ['LAT037-048', '“欢乐是创造”与“欢乐比情更真实”同组，校对轮保留后者。'],
  ['LAT037-049', '“爱情应断”诗行过短，校对轮保留“短暂恋爱才能永恒”。'],
  ['LAT037-051', '“爱不是痛苦”与“爱是纯快乐”重复，校对轮保留正面命题。'],
  ['LAT037-053', '会爱的人没有失落与“爱来去有无都不苦”重复。'],
  ['LAT037-054', '会爱的人照样收获与“爱来去有无都不苦”重复。'],
  ['LAT037-057', '遥远制造空灵与“爱的办法是暂停”“无为通向永恒”同组，校对轮保留方法主轴。'],
  ['LAT037-058', '不浓制造朦胧与“爱的办法是暂停”“无为通向永恒”同组，校对轮保留方法主轴。'],
  ['LAT037-061', '爱得浅也可以成立与“爱是纯快乐”“短暂恋爱才能永恒”相近。'],
  ['LAT037-062', '爱得远也可以成立与“爱的办法是暂停”“无为通向永恒”相近。'],
  ['LAT037-069', '为爱情放弃闪光是矮化只有半句诗行，校对轮不单独索引。'],
  ['LAT037-070', '艺术把藏身者解放只有半句诗行，且与本书诗论主轴关系较弱。'],
  ['LAT037-071', '入世救苍生要实践只有短句，缺少上下文承载。'],
  ['LAT037-072', '叛乱乱判照见法庭只有半句诗行，法权含义不如出版法、审判沉默等条目完整。'],
  ['LAT037-073', '主力战之后是殊死战只有短句，校对轮压缩诗行型条目。'],
  ['LAT037-075', '珍惜仅有青翠偏人生诗意，和本书核心索引线关系较松。'],
  ['LAT037-076', '不回首旧日光华偏人生诗意，和本书核心索引线关系较松。'],
  ['LAT037-081', '童稚境界可以浮现成诗偏作品赞语，校对轮保留生死境界和儿童生命力。'],
  ['LAT037-091', '后浪风光也短暂偏单句政治讽刺，校对轮保留更具体的国民党、台湾、出版条目。'],
  ['LAT037-099', '以山谷之道写狱事的原文段落只是引出全诗，实际思想已由“脱胎换骨可以改陈出新”承载。'],
]);

const overrides = new Map([
  ['LAT037-001', { title: '真诗人要拆穿伪诗' }],
  ['LAT037-002', { title: '伪诗病在无真情' }],
  ['LAT037-003', { title: '诗要以情理拯溺' }],
  ['LAT037-006', { title: '爱情需要无言之美' }],
  ['LAT037-007', { title: '灵悟不可被言语榨干' }],
  ['LAT037-009', { title: '节奏来自生活训练' }],
  ['LAT037-012', { title: '观察要进入对象' }],
  ['LAT037-013', { title: '消逝者在经验中返回' }],
  ['LAT037-015', { title: '坐牢可锻炼强者' }],
  ['LAT037-017', { title: '译诗要坚持押韵' }],
  ['LAT037-019', { title: '发表前要声明归属' }],
  ['LAT037-022', { title: '原题错误暴露抄袭' }],
  ['LAT037-024', { title: '反西化也会写坏中文' }],
  ['LAT037-026', { title: '拙译足以毁掉原诗' }],
  ['LAT037-031', { title: '发禁侵犯身体自由' }],
  ['LAT037-032', { title: '规矩不能替代巧思' }],
  ['LAT037-034', { title: '才华也会走向衰病' }],
  ['LAT037-035', { title: '大丈夫要从容洒脱' }],
  ['LAT037-038', { title: '裸相可以庄严' }],
  ['LAT037-044', { title: '爱情靠身体连接' }],
  ['LAT037-045', { title: '情书失效于身体缺席' }],
  ['LAT037-047', { title: '欢乐比情更真实' }],
  ['LAT037-050', { title: '短暂保存爱情永恒' }],
  ['LAT037-052', { title: '爱应是纯快乐' }],
  ['LAT037-055', { title: '爱来去有无都甜蜜' }],
  ['LAT037-056', { title: '爱的办法是暂停' }],
  ['LAT037-059', { title: '无为才近永恒' }],
  ['LAT037-063', { title: '沉默就是呐喊' }],
  ['LAT037-064', { title: '夹缝里腰杆不弯' }],
  ['LAT037-065', { title: '苦中作乐看一线天' }],
  ['LAT037-066', { title: '滥情让月色依赖美女' }],
  ['LAT037-067', { title: '成熟后做快活欣赏者' }],
  ['LAT037-068', { title: '平等不等于关系翻覆' }],
  ['LAT037-074', { title: '事业能压过嗜好' }],
  ['LAT037-077', { title: '学者死而求知' }],
  ['LAT037-079', { title: '生死外仍有至情至乐' }],
  ['LAT037-080', { title: '大人低估儿童生命力' }],
  ['LAT037-082', { title: '正义仍靠我辈' }],
  ['LAT037-083', { title: '活人统治靠死人', source_paragraph: 45 }],
  ['LAT037-084', { title: '要打中国牌' }],
  ['LAT037-085', { title: '以血荐蚩尤' }],
  ['LAT037-086', { title: '眼界不能只剩台湾' }],
  ['LAT037-087', { title: '国民党才是台独' }],
  ['LAT037-089', { title: '下笔也要救人' }],
  ['LAT037-092', { title: '沟通也可成为骗局' }],
  ['LAT037-093', { title: '审判沉默也是姿态' }],
  ['LAT037-094', { title: '出版法缝隙可突破封锁' }],
  ['LAT037-095', { title: '狱中稿件也能外传' }],
  ['LAT037-096', { title: '查禁抢书仍要再印' }],
  ['LAT037-097', { title: '写作恒久也是战斗' }],
  ['LAT037-098', { title: '脱胎换骨是改陈出新' }],
  ['LAT037-100', { title: '迫害也能助成就' }],
  ['LAT037-101', { title: '翻译要说痛快中文' }],
  ['LAT037-102', { title: '现代诗翻译有不可译处' }],
  ['LAT037-103', { title: '译文难传节奏韵律' }],
  ['LAT037-104', { title: '中文功力能降低翻译难度' }],
  ['LAT037-105', { title: '译诗要兼顾韵口典故' }],
  ['LAT037-106', { title: '神话把性爱接上文明祸根' }],
  ['LAT037-107', { title: '文明神谕借禽鸟显形' }],
  ['LAT037-108', { title: '灵肉结合产生双重本质' }],
  ['LAT037-109', { title: '过度释诗只是辞费' }],
  ['LAT037-110', { title: '凝神沧海使心灵浩瀚' }],
  ['LAT037-111', { title: '沧海催动寻仇和不屈' }],
  ['LAT037-112', { title: '生活能印证诗句' }],
]);

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function paragraphs(filePath) {
  const text = decoder.decode(fs.readFileSync(filePath));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
}

const paragraphCache = new Map();

function sourceParagraph(record, paragraphNumber) {
  const fullPath = path.resolve(rootDir, record.source_path);
  if (!paragraphCache.has(fullPath)) {
    paragraphCache.set(fullPath, paragraphs(fullPath));
  }
  const text = paragraphCache.get(fullPath)[paragraphNumber - 1];
  if (!text) {
    throw new Error(`Missing source paragraph ${paragraphNumber}: ${record.source_path}`);
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
    'proofread_from',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用 8 个原子分类；本书校对轮压缩诗行碎片，保留爱情、诗论、翻译、出版突破、政治讽刺和人格判断等主轴材料。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push(`- 提取轮编号：${record.proofread_from}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const counts = categoryCounts(records, taxonomy);
  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮由提取轮 ${originalRecords.length} 条校对为 ${records.length} 条，删除 ${dropReasons.size} 条。`,
    '',
    '校对动作只涉及条目取舍、标题压缩、个别段落定位修正和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 段落定位修正',
    '',
    '- LAT037-083：提取轮标题指向“活人统治靠死人”，但段落号落到下一句；校对轮改指同文件 P45。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮删除短到无法独立承载思想的诗句、偏外部引文和重复项，保留爱情含蓄、灵肉关系、诗与翻译、韵律与中文功力、出版突破、政治讽刺和人格判断等核心索引。description 仍逐条保留源文本原文段落。',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};
    const sourceParagraphNumber = override.source_paragraph ?? record.source_paragraph;
    const description =
      override.source_paragraph !== undefined
        ? sourceParagraph(record, sourceParagraphNumber)
        : record.description;
    const { source_paragraph: _sourceParagraphOverride, ...recordOverride } = override;
    return {
      ...record,
      ...recordOverride,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      round: book.round,
      status: book.status,
      source_paragraph: sourceParagraphNumber,
      description,
      proofread_from: record.id,
    };
  });

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
  proofread: {
    from_round: originalPayload.book.round,
    original_count: originalPayload.records.length,
    retained_count: records.length,
    dropped_count: dropReasons.size,
    dropped: [...dropReasons.entries()].map(([id, reason]) => ({ id, reason })),
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records, taxonomy).map((item) => `${item.category}:${item.count}`).join(' '));
