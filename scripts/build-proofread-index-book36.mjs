import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '036.第73烈士');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT036-002', '死去的革命党成为光荣偏楔子场面机锋，校对轮保留“革命者临刑不惧”承载临刑精神。'],
  ['LAT036-004', '国民党窃取革命国家与后文“革命被袁家蒋家偷走”重复，校对轮保留后者。'],
  ['LAT036-008', '排满不能缩小中国民族与“中国民族不能只限中原”相近，校对轮保留更概括的一条。'],
  ['LAT036-012', '革命可能帮别人家天下与“革命被袁家蒋家偷走”重复，校对轮保留后者。'],
  ['LAT036-016', '不效忠民国也可忠诚偏人物立场，和本书主轴的革命、亡国、忠烈祠关系较松。'],
  ['LAT036-018', '革命英雄后来各有后话偏史事铺陈，独立检索价值弱于革命目的和革命被偷走等条目。'],
  ['LAT036-022', '多活五十年未必幸运与“第七十三烈士必须丢掉旧国号”“活先烈”相关条目重复。'],
  ['LAT036-036', '老兵无用后才被放走与“国家拿走青春和自由”“国家需要制造无尽服役”重复。'],
  ['LAT036-038', '李师科不能用犯罪学解释与后文法律责任、合法途径和国家亏欠条目重复。'],
  ['LAT036-046', '弱者袍泽不堪闻问与“李师科代表老兵悲愤”重复，校对轮保留后者。'],
  ['LAT036-047', '完整记忆也能投射希望与“回归不了大陆就回归梦”重复，校对轮保留后者。'],
  ['LAT036-061', '苟且偷生也可转成反抗与“苦撑待变不是永远忍耐”相近，校对轮保留后者。'],
  ['LAT036-067', '长寿才能等到清白偏人生感慨，和本书核心思想线关系较松。'],
]);

const overrides = new Map([
  ['LAT036-003', { title: '收尸改变黄花岗记忆' }],
  ['LAT036-005', { title: '烈士不该背负卖国民国' }],
  ['LAT036-006', { title: '党军使革命落入军阀' }],
  ['LAT036-009', { title: '中国民族不限中原' }],
  ['LAT036-011', { title: '民国自身成革命对象' }],
  ['LAT036-013', { title: '革命被袁蒋偷走' }],
  ['LAT036-014', { title: '宣言反证革命失败' }],
  ['LAT036-017', { title: '忠烈祠是政治符号' }],
  ['LAT036-020', { title: '明杀说出反抗理由' }],
  ['LAT036-021', { title: '第七十三要丢掉旧国号' }],
  ['LAT036-025', { title: '忠烈祠也是虚伪建筑' }],
  ['LAT036-028', { title: '模糊事迹方便夹假先烈' }],
  ['LAT036-034', { title: '国家拿走青春自由' }],
  ['LAT036-041', { title: '小民没有合法途径' }],
  ['LAT036-042', { title: '责任要看国家亏欠' }],
  ['LAT036-043', { title: '方法错但别无更对方法' }],
  ['LAT036-049', { title: '专制人权构成革命理由' }],
  ['LAT036-052', { title: '暴君论否定合法性' }],
  ['LAT036-054', { title: '反抗对象给的罪状不足介意' }],
  ['LAT036-057', { title: '杀贼就是革命实践' }],
  ['LAT036-058', { title: '第七十三让统计回到悲剧' }],
  ['LAT036-065', { title: '假先烈给七十二句号' }],
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
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用 8 个原子分类；本书校对轮保留革命、亡国、忠烈祠、老兵法权、李师科定位和历史剧写法等主轴材料。',
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
    '校对动作只涉及条目取舍、标题压缩和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
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
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮由提取轮进入校对轮，删除偏场景机锋、史事铺陈、重复的革命被偷走条目、重复的老兵困境条目和偏人生感慨的弱条目，保留革命目的、中华民国亡国论、忠烈祠名器、老兵法权、李师科定位与历史剧写法等核心索引。description 仍逐条保留源文本原文段落。',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...override,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      round: book.round,
      status: book.status,
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
