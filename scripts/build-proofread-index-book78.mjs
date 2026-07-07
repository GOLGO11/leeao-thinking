import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 78;
const bookTitle = '中国现代史定论';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT078-002', '段落主要罗列诉状名目，史学与法理边界已由法律不能箝制历史和缠讼不能替代历史申辩条目承载。'],
  ['LAT078-006', '段落只是引出证据表格，固定术语和举证排重的判断已由前后条目承载。'],
  ['LAT078-012', '段落过短，主要是情绪性收束，闽变性质和证据链已由前后条目承载。'],
  ['LAT078-014', '段落偏人格斥责，和共产党关系、历史歪曲的实质已由官方文告和史料切片条目承载。'],
  ['LAT078-015', '段落只是单点反驳夹击说，完整论证已由官方文告和史料切片条目承载。'],
  ['LAT078-016', '段落只是引出日本外务省资料，外方史证的作用已由后续史料切片条目承载。'],
  ['LAT078-018', '段落过短，只是闽变后果的政治短评，独立索引价值不足。'],
  ['LAT078-019', '段落偏诉讼澄清，和流血战争辨伪主题相比思想密度较低。'],
  ['LAT078-027', '段落与前一条旁证考据揭穿抗日故事高度重复，校对轮保留前者。'],
  ['LAT078-035', '段落偏早年履历细节，胡秋原言论反复和亲苏宣传已由后续条目集中承载。'],
  ['LAT078-036', '段落主要是左倾分子时代氛围铺垫，不作为独立思想索引。'],
  ['LAT078-039', '段落过短，美国前后反复的判断已由白纸黑字条目承载。'],
  ['LAT078-042', '段落只是冠冕话语的承接，亲苏立场与后发检验已由前后条目承载。'],
  ['LAT078-046', '段落只是引出对照清单，文证证明做伪证条目更完整。'],
  ['LAT078-049', '段落只是引出“当时文字”，事后吹牛的判断由先知说经不起检验条目承载。'],
  ['LAT078-052', '段落主要是被批判文本的引文，李敖自己的判断不够独立。'],
  ['LAT078-062', '段落与和平宣言、中立主义和抽象和平名词的判断重复，校对轮保留更集中条目。'],
  ['LAT078-066', '段落与前一条等待台湾是否可保的投机判断重复。'],
  ['LAT078-069', '段落偏单点质疑，反共资格的言行一致判断已由前一条承载。'],
  ['LAT078-078', '段落与后续“自吹全集却漏重要文章”高度重叠，校对轮保留后者。'],
  ['LAT078-082', '段落偏回忆录版本疑点的铺垫，残卷和改稿痕迹条目更具证据密度。'],
  ['LAT078-087', '段落只是引出廖耀湘回忆文字，蒋介石不知兵和杜聿明互证条目更集中。'],
  ['LAT078-090', '段落与辽西战役证明蒋介石不知兵重复，且篇幅较短。'],
  ['LAT078-097', '段落只是引出杜聿明回忆，后续徐州宣传、错误遥控和黄维辨正条目更集中。'],
  ['LAT078-103', '段落偏逃命约定逸事，独立思想密度弱于前后战争责任辨析。'],
  ['LAT078-105', '段落过短，主要是自我定位式收束，不作为独立思想索引。'],
  ['LAT078-110', '段落过短，主要是讽刺收束，王仲廉回忆录的可检索价值已由前两条承载。'],
]);

const overrides = new Map([
  ['LAT078-001', { title: '法律判决不能箝制历史辨伪' }],
  ['LAT078-003', { title: '缠讼不能替代历史申辩' }],
  ['LAT078-004', { title: '答辩须提要钩玄分类排比' }],
  ['LAT078-005', { title: '史学专名不可因忌讳改称' }],
  ['LAT078-007', { title: '严肃举证要排除重复抄袭' }],
  ['LAT078-008', { title: '可用对方权威反证控诉' }],
  ['LAT078-009', { title: '叛国判断要看充分必要条件' }],
  ['LAT078-010', { title: '维护真实不能接受历史歪曲' }],
  ['LAT078-011', { title: '闽变性质不脱叛与乱' }],
  ['LAT078-013', { title: '官方文告可反驳脱共狡辩' }],
  ['LAT078-017', { title: '史料切片可证明整体关系' }],
  ['LAT078-020', { title: '常识人证可并用辨伪' }],
  ['LAT078-021', { title: '铁证能击穿未经流血说' }],
  ['LAT078-022', { title: '抗日歧见不能解释叛国' }],
  ['LAT078-023', { title: '通敌可被包装成抗日' }],
  ['LAT078-024', { title: '外文定称可校正词义狡辩' }],
  ['LAT078-025', { title: '就地保护可成为侵略借口' }],
  ['LAT078-026', { title: '旁证考据能揭穿自辩故事' }],
  ['LAT078-028', { title: '歪曲历史会恐吓研究者' }],
  ['LAT078-029', { title: '往事成烟后青史要落实证' }],
  ['LAT078-030', { title: '言论须承担长远影响' }],
  ['LAT078-031', { title: '拿笔杆者可导人也可误人' }],
  ['LAT078-032', { category: '写作', title: '立言态度应小心翼翼' }],
  ['LAT078-033', { title: '冒称舆论的乱抒会丧邦' }],
  ['LAT078-034', { title: '检讨一人可抽样国民党心态' }],
  ['LAT078-037', { title: '公开文字可对照宣传策略' }],
  ['LAT078-038', { title: '白纸黑字暴露前后反复' }],
  ['LAT078-040', { title: '赞颂斯大林早过郭沫若' }],
  ['LAT078-041', { title: '明知苏联野心却为其洗刷' }],
  ['LAT078-043', { title: '后发事实可校验铁的友谊' }],
  ['LAT078-044', { title: '千言万语不过宣扬和平共存' }],
  ['LAT078-045', { title: '用侨寓身份替苏联作证欺人' }],
  ['LAT078-047', { title: '文证可证明早年做伪证' }],
  ['LAT078-048', { title: '助长赤焰者不该扮先觉' }],
  ['LAT078-050', { title: '深信之中见亲苏看法' }],
  ['LAT078-051', { title: '先知说要接受当时文字检验' }],
  ['LAT078-053', { title: '同路人宣传换口径更易误人' }],
  ['LAT078-054', { title: '话调相同可见同路关系' }],
  ['LAT078-055', { title: '替莫斯科隐蔽关系就是拉幕' }],
  ['LAT078-056', { title: '把自己错误推给世界人士是健忘' }],
  ['LAT078-057', { title: '只可政治解决会动摇戡乱' }],
  ['LAT078-058', { title: '各打五十板的中立有利一方' }],
  ['LAT078-059', { title: '内战论调可与同路人口径互证' }],
  ['LAT078-060', { title: '自己也曾抱有错误心理' }],
  ['LAT078-061', { title: '和平宣言满是中立主义调子' }],
  ['LAT078-063', { title: '抽象和平名词要问帮助谁' }],
  ['LAT078-064', { title: '未提俄帝不能证明反俄' }],
  ['LAT078-065', { title: '等待台湾是否可保就是投机' }],
  ['LAT078-067', { title: '刚等共党百姓又变大反共' }],
  ['LAT078-068', { title: '反共资格要求言行一致' }],
  ['LAT078-070', { title: '矛盾定义让人无所适从' }],
  ['LAT078-071', { title: '全押宝不是远见而是投机' }],
  ['LAT078-072', { title: '正反全写过不等于有远见' }],
  ['LAT078-073', { title: '抽样调查可识国民党文化水平' }],
  ['LAT078-074', { title: '周恩来并未上街卖报' }],
  ['LAT078-075', { title: '蒋介石会封锁新四军真相' }],
  ['LAT078-076', { title: '调查材料可辨正流行传闻' }],
  ['LAT078-077', { title: '傅斯年选集曾被警总压力删文' }],
  ['LAT078-079', { category: '写作', title: '自吹全集却漏重要文章' }],
  ['LAT078-080', { title: '豪门资本旧作仍有现实透视' }],
  ['LAT078-081', { title: '吴铁城放纵陶百川蹂躏人权' }],
  ['LAT078-083', { title: '残卷可证明回忆录删减' }],
  ['LAT078-084', { title: '改稿痕迹暴露删改方向' }],
  ['LAT078-085', { title: '不敢说真话难懂真历史' }],
  ['LAT078-086', { title: '纪念文字会制造殉国假象' }],
  ['LAT078-088', { title: '辽西败局关键在蒋介石不知兵' }],
  ['LAT078-089', { title: '杜聿明回忆可揭穿决战谜底' }],
  ['LAT078-091', { title: '回忆互证可看兵败逃亡图' }],
  ['LAT078-092', { title: '辽西全军覆没证明主帅不知兵' }],
  ['LAT078-093', { title: '淮海徐蚌使国民党元气大伤' }],
  ['LAT078-094', { title: '最高统帅越级指挥派谁都无用' }],
  ['LAT078-095', { title: '国民党想制造文天祥而不得' }],
  ['LAT078-096', { title: '兵败偏安早有伏机' }],
  ['LAT078-098', { title: '大捷宣传遮盖实际败亡' }],
  ['LAT078-099', { title: '不弃官兵显示将领底线' }],
  ['LAT078-100', { title: '飞机关怀只是表演给人看' }],
  ['LAT078-101', { title: '报道会给降将涂脂抹粉' }],
  ['LAT078-102', { title: '错误遥控让援军变待援' }],
  ['LAT078-104', { title: '黄维未屈服说不合事实' }],
  ['LAT078-106', { title: '死亡新闻也可做历史教育' }],
  ['LAT078-107', { title: '回忆录可用来知人察世' }],
  ['LAT078-108', { title: '革命家也难免迷信观念' }],
  ['LAT078-109', { title: '回忆录自拆鲁西战役内幕' }],
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
      '校对轮删除诉讼名目铺垫、短承接句、重复例证、被批判文本长引和战争回忆中的逸事收束；保留可独立检索的历史辨伪方法、言论责任、亲苏宣传互证、和平中立话语辨析、国民党战争责任和回忆录校勘判断。description 未改写。',
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
  '- 保留可独立检索的历史辨伪方法、言论责任、亲苏宣传互证、和平中立话语辨析、国民党战争责任和回忆录校勘判断。',
  '- 删除诉讼名目铺垫、短承接句、重复例证、被批判文本长引和战争回忆中的逸事收束。',
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
