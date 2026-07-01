import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '017.文化论战丹火录');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT017-002', '开场白中的自我留名姿态较强，独立思想索引价值弱于“记录被围攻史料”。'],
  ['LAT017-004', '“任人砍”偏自我形象和戏剧化语气，校对轮不单列。'],
  ['LAT017-005', '段落只是引出思想论战次序，真正谱系内容在后续列表中，单段信息不足。'],
  ['LAT017-010', '与“思想趋向之外都是余事”重复，校对轮保留后一条更完整表达。'],
  ['LAT017-012', '老问题重提的意义已由“思想趋向之外都是余事”覆盖。'],
  ['LAT017-014', '大段列举反应媒介，偏传播材料清单，不单列思想索引。'],
  ['LAT017-017', '传统活细胞不能移植现代与旧挂钟比喻重复，校对轮保留后者。'],
  ['LAT017-028', '宣扬现代、批评传统与前一条“一贯思路”重复。'],
  ['LAT017-030', '自评文字技巧和材料运用偏自我评价，思想密度不足。'],
  ['LAT017-035', '《联合报》社论引介段偏过渡材料，未展开独立思想判断。'],
  ['LAT017-036', '胡秋原长文引介偏论战场景说明，独立检索价值较弱。'],
  ['LAT017-037', '“说不还嘴却还嘴”偏短促嘲讽，不单列。'],
  ['LAT017-038', '“很可玩味”按语过短，不能独立支撑思想索引。'],
  ['LAT017-040', '对青年党文字的嘲讽偏战术性评价，校对轮收敛。'],
  ['LAT017-041', '短按语信息量不足，已由政治栽诬相关条目覆盖。'],
  ['LAT017-044', '巴札洛夫造谣手段与政治栽诬条目相近，且段落过短。'],
  ['LAT017-045', '“反梅毒战术”按语过短，校对轮不单列。'],
  ['LAT017-050', '攻击文字日薄西山偏论战进程记录，思想抽象度不足。'],
  ['LAT017-056', '“好文字”短评偏材料评价，不能独立形成索引。'],
]);

const overrides = new Map([
  ['LAT017-001', { title: '特立独行者难免被压迫', keywords: '特立独行,悲剧,论战' }],
  ['LAT017-003', { title: '史料应记录别人如何围攻自己', keywords: '史料,围攻,记录' }],
  ['LAT017-006', { category: '知识', title: '中西文化论战属于思想史大题目', keywords: '中西文化,思想史,论战' }],
  ['LAT017-007', { title: '大题目容易空洞化', keywords: '抽象,空洞,混淆' }],
  ['LAT017-008', { title: '思想方法不及格者不宜评论', keywords: '思想方法,评论资格,枝节' }],
  ['LAT017-009', { title: '指路文字要指出思想趋向', keywords: '思想趋向,指路,文献' }],
  ['LAT017-011', { title: '中国要走科学民主现代化', keywords: '科学,民主,现代化' }],
  ['LAT017-013', { title: '认清趋向后枝节皆余事', keywords: '思想趋向,答案,枝节' }],
  ['LAT017-015', { title: '传统文化是死文化', keywords: '传统文化,死文化,现代' }],
  ['LAT017-016', { title: '死文化只能入博物馆', keywords: '文化史,博物馆,时代' }],
  ['LAT017-018', { title: '旧挂钟齿轮配不上新手表', keywords: '传统文化,现代,比喻' }],
  ['LAT017-019', { title: '研究传统不等于提倡传统', keywords: '学术研究,传统文化,恐龙' }],
  ['LAT017-020', { title: '传统文化没有科学民主', keywords: '科学,民主,传统文化' }],
  ['LAT017-021', { title: '提倡传统通向义和团或共产党', keywords: '传统文化,义和团,共产党' }],
  ['LAT017-022', { title: '强国不搬弄固有文化', keywords: '强国,固有文化,现代化' }],
  ['LAT017-023', { title: '跟强国学习胜过背传统棺材', keywords: '学习,强国,传统包袱' }],
  ['LAT017-024', { title: '要西方活文化不要东方僵尸', keywords: '西方文化,现代,活文化' }],
  ['LAT017-025', { title: '国情不同是推托妖言', keywords: '国情不同,融合中西,现代化' }],
  ['LAT017-026', { title: '抛弃死文化学习现代文化', keywords: '死文化,现代文化,西方' }],
  ['LAT017-027', { title: '文章庞杂而思路只有一个', keywords: '思路,一贯,文章' }],
  ['LAT017-029', { title: '西化运动延续现代智者传统', keywords: '西化运动,现代史,董寿慈' }],
  ['LAT017-031', { title: '辑录骂声是呈现反动', keywords: '史料,笑料,文字力量' }],
  ['LAT017-032', { title: '按时间保留论战线索', keywords: '时间线,史料,论战' }],
  ['LAT017-033', { title: '只收公开发表过的反应', keywords: '发表,材料取舍,史料' }],
  ['LAT017-034', { title: '对方承认西化派胜利', keywords: '西化派,胜利,时代' }],
  ['LAT017-039', { title: '涉猎广博不能靠别人供料', keywords: '涉猎,独立,资料' }],
  ['LAT017-042', { title: '抓殷海光是政治栽诬', keywords: '殷海光,文星,政治栽诬' }],
  ['LAT017-043', { title: '提倡西化在旧社会不受欢迎', keywords: '西化,社会,不受欢迎' }],
  ['LAT017-046', { category: '人格', title: '否定独立人格才是人身攻击', keywords: '人身攻击,独立人格,胡秋原' }],
  ['LAT017-047', { title: '闽变辨伪不属文化论战', keywords: '闽变,辨伪,文化论战' }],
  ['LAT017-048', { title: '承认西化大势却反潮流', keywords: '西化,时代潮流,超越论' }],
  ['LAT017-049', { title: '对方说得清楚也要鼓掌', keywords: '公允,鼓掌,论战' }],
  ['LAT017-051', { title: '舆论空谈来自方法训练不足', keywords: '舆论,方法训练,空洞' }],
  ['LAT017-052', { title: '不懂文化学不能谈文化', keywords: '文化学,胡说八道,论战' }],
  ['LAT017-053', { title: '丹火之下显示真金', keywords: '丹火,真金,围剿' }],
  ['LAT017-054', { title: '西化现代化已成固定趋向', keywords: '西化,现代化,趋向' }],
  ['LAT017-055', { title: '接受西方现代文化是答案', keywords: '西方现代文化,传统文化,共产暴政' }],
  ['LAT017-057', { title: '传统包袱会繁殖共产主义', keywords: '传统,反共,共产主义' }],
  ['LAT017-058', { title: '剪裁史料重编文字网', keywords: '剪裁,史料,文字网' }],
  ['LAT017-059', { title: '时间是论战公证人', keywords: '时间,公证人,科学民主' }],
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
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；删除短按语、重复项、材料清单和偏自我姿态条目。',
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
    '校对动作只涉及条目取舍、分类、标题、关键词和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
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
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 40) {
  throw new Error(`Expected 40 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT017-${String(index + 1).padStart(3, '0')}`,
    book: bookBase.title,
    round: bookBase.round,
    status: bookBase.status,
    proofread_from: record.id,
  };
});

const allowedCategories = new Set(taxonomy);
for (const record of records) {
  if (!allowedCategories.has(record.category)) {
    throw new Error(`Unexpected category for ${record.id}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...bookBase,
    record_count: records.length,
    category_counts: categoryCounts(records, taxonomy),
  },
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${payload.book.title} proofread index: ${records.length} records.`);
