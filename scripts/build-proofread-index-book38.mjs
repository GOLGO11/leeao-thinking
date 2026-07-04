import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '038.李敖的情诗');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT038-020', '“爱情如牙刷”过短且偏机智比喻，校对轮不单独索引。'],
  ['LAT038-021', '爱情战术句过短，独立思想承载力弱。'],
  ['LAT038-022', '“女人面前要学乖”偏玩笑式诗句，校对轮删除。'],
  ['LAT038-024', '怀疑与王充、胡适的短句偏知识掌故，缺少独立索引厚度。'],
  ['LAT038-028', '恋爱甜酸咸的注释性短句偏押题，删除。'],
  ['LAT038-029', '机巧判断只有短句，且与方法类条目重复。'],
  ['LAT038-032', '丈夫九死句过短，保留其他人格条目即可覆盖。'],
  ['LAT038-034', '写作雕龙与“不雕虫”相邻重复，保留较有态度的一条。'],
  ['LAT038-036', '旧欢如水只是诗意短句，独立思想索引价值不足。'],
  ['LAT038-048', '未来制造句过短，政治判断承载力不足。'],
  ['LAT038-049', '不只为唾弃而生偏诗句碎片，删除。'],
  ['LAT038-050', '“我们有要做的事”过于泛化，校对轮不单独索引。'],
  ['LAT038-051', '等情不变的短句与本书多条情爱等待条目重复。'],
  ['LAT038-053', '选择后放大所选的短句承载不足，删除。'],
  ['LAT038-054', '证明选择靠贬低落选偏短句分析，删除。'],
  ['LAT038-056', '不再要爱情会心硬与爱情水灾、失落条目重复。'],
  ['LAT038-057', '爱情偷心句偏诗意拟人，独立性弱。'],
  ['LAT038-058', '爱情保险句缺少完整判断上下文，删除。'],
  ['LAT038-060', '爱情使人猜而不想与爱情水灾同组，保留更有检索性的条目。'],
  ['LAT038-061', '爱情奉送悲哀偏半句式判断，与爱情痛苦条目重复。'],
  ['LAT038-068', '口琴吹破情偏意象句，删除。'],
  ['LAT038-070', '世界只剩你就没有我们偏诗句情境，删除。'],
  ['LAT038-073', '情书越寄越要丢与身体缺席、情书失效旧条目相近，删除。'],
  ['LAT038-074', '情多并不可靠过短，且与多情烦恼条目重复。'],
  ['LAT038-080', '鹏云燕雀句标题推论过重，原句只是“怎能了解我”。'],
  ['LAT038-098', '老思想支配快乐的标题概括超过原句承载范围，删除。'],
  ['LAT038-103', '无暇殷勤偏个人志向句，独立思想密度不足。'],
]);

const titleOverrides = new Map([
  ['LAT038-001', '侠骨也有柔情'],
  ['LAT038-002', '三情要现代爱情'],
  ['LAT038-003', '现代中国缺现代爱情'],
  ['LAT038-006', '病态情杀不是真爱情'],
  ['LAT038-010', '爱情是纯快乐'],
  ['LAT038-011', '痛苦是爱情技术错误'],
  ['LAT038-012', '崇灵贬肉是错'],
  ['LAT038-013', '懂爱不忽略灵肉'],
  ['LAT038-014', '第一流要承认感情会变'],
  ['LAT038-015', '爱情变化要技巧处理'],
  ['LAT038-016', '爱情不要一起下坡'],
  ['LAT038-017', '爱情不该贪求真善'],
  ['LAT038-019', '从心路变化看三情'],
  ['LAT038-023', '打油诗可通向好诗'],
  ['LAT038-025', '真理要靠辩驳'],
  ['LAT038-027', '明珠不肯暗投'],
  ['LAT038-031', '鞭尸魑魅是史家信条'],
  ['LAT038-035', '往事可忆而不必伤'],
  ['LAT038-037', '坏翻译变成西化中文'],
  ['LAT038-038', '查禁反成闭门思过'],
  ['LAT038-039', '孤独不损勇气口味'],
  ['LAT038-040', '母子恋扭曲婚姻'],
  ['LAT038-041', '婆婆报复延续压迫'],
  ['LAT038-042', '望孙逻辑支配媳妇'],
  ['LAT038-043', '分析太清楚不留余地'],
  ['LAT038-044', '弃幻求真需要代价'],
  ['LAT038-045', '看破价值会变异乡人'],
  ['LAT038-047', '留下带走也可公平'],
  ['LAT038-055', '只爱一点点'],
  ['LAT038-059', '爱情是水灾'],
  ['LAT038-062', '身体给出后灵魂也给出'],
  ['LAT038-064', '旧梦难重温'],
  ['LAT038-066', '月亮只露光明'],
  ['LAT038-067', '改诗表达隐痛'],
  ['LAT038-071', '喜欢该做才开阔'],
  ['LAT038-072', '失去身体就不可逆料'],
  ['LAT038-075', '没有欢乐情会退票'],
  ['LAT038-077', '回忆之外无所有'],
  ['LAT038-078', '情也可以做囚犯'],
  ['LAT038-081', '蒙祸胜过苟安'],
  ['LAT038-085', '诗中要有气魄'],
  ['LAT038-086', '不被牵着鼻子走'],
  ['LAT038-088', '孤愤留在心头'],
  ['LAT038-089', '自救胜过宗教'],
  ['LAT038-090', '宗教不可信'],
  ['LAT038-092', '爱情保持遥远'],
  ['LAT038-094', '多情多烦恼'],
  ['LAT038-095', '心照不必多言'],
  ['LAT038-097', '李敖自称铁汉'],
  ['LAT038-100', '真说不装样'],
  ['LAT038-101', '志在挽狂澜'],
  ['LAT038-102', '爱情死后只剩自己'],
  ['LAT038-106', '宁作真小人'],
  ['LAT038-107', '朋友不作情人'],
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
    '- 分类策略：沿用 8 个原子分类；本轮压缩短诗碎片，保留现代爱情、灵肉关系、情爱技巧、诗论、翻译、文化批判和人格姿态等可独立检索的条目。',
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
    '本轮删除过短、偏押韵、偏戏谑或与相邻条目重复的诗句型索引，保留《三情之书》序的核心爱情论述、Rosa/CL 长文中的人生与文化判断、诗论与翻译判断、以及可独立检索的人格姿态。description 仍逐条保留源文本原文段落。',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => ({
    ...record,
    id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
    round: book.round,
    status: book.status,
    title: titleOverrides.get(record.id) ?? record.title,
    proofread_from: record.id,
  }));

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
