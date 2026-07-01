import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '011.独白下的传统');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT011-003', '与“旧学缺少方法训练”“新学究仍遮蔽中国”重复，校对轮不再单列。'],
  ['LAT011-013', '与“旧忌讳不可复兴”同属避讳结论，保留后者作为更完整的现代转向。'],
  ['LAT011-015', '谏官制度定义性较强，谏诤制度已由“小官更敢说话”“谏诤不同于言论自由”承载。'],
  ['LAT011-020', '官场拖延偏章内过渡，传令与科学效率主题已有更集中条目。'],
  ['LAT011-023', '小报受欢迎且被查禁与“新闻封锁源于怕丑事”重叠，保留后者作为主条。'],
  ['LAT011-028', '祥瑞背书与“征兆是骗人公式”重复，校对轮保留骗局公式作为总括。'],
  ['LAT011-034', '割股奖禁与“割股救亲冲突孝道”相邻重叠，删除行政细节条。'],
  ['LAT011-036', '酒礼压过享受偏掌故，喝酒篇保留“酒可避祸也不可禁绝”作为思想主条。'],
  ['LAT011-038', '声音被道德化与“音乐被做成道德工具”重叠，保留后者。'],
  ['LAT011-046', '家族利益压过公益是列表单项，已由“家族观念阻碍进步”承载。'],
  ['LAT011-057', '欢喜佛软化恶行只是五层意义之一，校对轮保留文化交流总括。'],
  ['LAT011-058', '观音现众身偏佛学解释枝节，不单列为思想索引。'],
  ['LAT011-070', '孝子动物感应偏补充例群，动物感应主题已有主条。'],
  ['LAT011-075', '言论道具本质是戏为开场设定，主旨由诽谤、无罪和华表条目承载。'],
  ['LAT011-079', '无师自学更接近人生方法，偏离本篇不合作主义主线。'],
  ['LAT011-081', '拒征软中有硬是单句评语，不合作主义由前后两条承载。'],
]);

const overrides = new Map([
  ['LAT011-001', { category: '知识', title: '旧学缺少方法训练', keywords: '古书,方法训练,旧学' }],
  ['LAT011-002', { category: '知识', title: '新学究仍遮蔽中国', keywords: '新学究,垄断学术,中国真相' }],
  ['LAT011-004', { category: '写作', title: '文字作品被传统缠住', keywords: '文字遗产,传统桎梏,小脚作品' }],
  ['LAT011-005', { category: '人格', title: '特立独行在中国难长成', keywords: '特立独行,隐逸,不合作' }],
  ['LAT011-006', { category: '知识', title: '理解中国先要回忆传统', keywords: '理解中国,传统,精神分析' }],
  ['LAT011-007', { category: '写作', title: '写法要让受难者理解中国', keywords: '写法,受难者,了解中国' }],
  ['LAT011-008', { category: '写作', title: '曲笔会遮蔽历史真相', keywords: '曲笔,直笔,历史真相' }],
  ['LAT011-009', { category: '法权', title: '史官需要历史独立', keywords: '史官,历史独立,制度' }],
  ['LAT011-010', { category: '政治', title: '权力窥史会压低直笔', keywords: '皇帝,史官,直笔' }],
  ['LAT011-011', { category: '写作', title: '历史不讲感情只求真相', keywords: '历史,真相,求真' }],
  ['LAT011-012', { category: '法权', title: '讳言就是政治黑暗', keywords: '讳言,政治清明,政治黑暗' }],
  ['LAT011-014', { category: '文化', title: '旧忌讳不可复兴', keywords: '忌讳,新时代,旧习惯' }],
  ['LAT011-016', { category: '法权', title: '小官更敢说话', keywords: '谏官,小官,敢说话' }],
  ['LAT011-017', { category: '人格', title: '宁鸣不默是人格底线', keywords: '宁鸣而死,不默而生,说话' }],
  ['LAT011-018', { category: '法权', title: '谏诤不同于言论自由', keywords: '谏诤,言论自由,平等' }],
  ['LAT011-019', { category: '知识', title: '幻想文明替代技术发明', keywords: '精神文明,幻想,发明' }],
  ['LAT011-021', { category: '方法', title: '科学也提高统治效率', keywords: '科学,统治效率,命令' }],
  ['LAT011-022', { category: '知识', title: '速度幻想暴露技术落伍', keywords: '速度,电报,落伍' }],
  ['LAT011-024', { category: '法权', title: '新闻封锁源于怕丑事', keywords: '新闻封锁,邸报,检查' }],
  ['LAT011-025', { category: '法权', title: '租界成为办报自由空间', keywords: '租界,办报,新闻自由' }],
  ['LAT011-026', { category: '法权', title: '言论自由不容临时管制', keywords: '言论自由,暂行报律,钳制舆论' }],
  ['LAT011-027', { category: '法权', title: '报纸在法律夹道中生存', keywords: '报纸,法律,出版法' }],
  ['LAT011-029', { category: '知识', title: '圣人异表经不起科学检定', keywords: '异表,科学,白内障' }],
  ['LAT011-030', { category: '政治', title: '孔子神性巩固统治', keywords: '孔子,神性,统治者' }],
  ['LAT011-031', { category: '文化', title: '征兆是骗人公式', keywords: '征兆,骗局,公式' }],
  ['LAT011-032', { category: '文化', title: '吃人肉显示人也吃人', keywords: '吃人,人肉,历史' }],
  ['LAT011-033', { category: '文化', title: '割股救亲冲突孝道', keywords: '割股,孝,毁伤身体' }],
  ['LAT011-035', { category: '文化', title: '吃人肉都是传统病', keywords: '吃人肉,荒唐,传统病' }],
  ['LAT011-037', { category: '方法', title: '酒可避祸也不可禁绝', keywords: '酒,避祸,禁酒' }],
  ['LAT011-039', { category: '文化', title: '音乐被做成道德工具', keywords: '音乐,教育,政治目的' }],
  ['LAT011-040', { category: '知识', title: '乐器源流不能靠民族神话', keywords: '乐器,外国,民族神话' }],
  ['LAT011-041', { category: '文化', title: '旧音乐被老夫子扼杀', keywords: '旧音乐,国乐,科学化' }],
  ['LAT011-042', { category: '文化', title: '女人在家中地位可怜', keywords: '女人,家庭,男权' }],
  ['LAT011-043', { category: '文化', title: '大家庭靠忍耐维持', keywords: '大家庭,忍耐,五代同堂' }],
  ['LAT011-044', { category: '法权', title: '家族观念生出株连法律', keywords: '家族,诛族,法律' }],
  ['LAT011-045', { category: '文化', title: '家族观念阻碍进步', keywords: '家族观念,进步,流弊' }],
  ['LAT011-047', { category: '文化', title: '女人出路被限于婚育', keywords: '女人,出嫁,妈妈' }],
  ['LAT011-048', { category: '文化', title: '女诫成为压迫教科书', keywords: '女诫,压迫女人,教科书' }],
  ['LAT011-049', { category: '文化', title: '贞节观念不近人情', keywords: '贞节,饿死事小,失节事大' }],
  ['LAT011-050', { category: '政治', title: '贞节牌坊也看关系', keywords: '贞节牌坊,关系,奖励' }],
  ['LAT011-051', { category: '文化', title: '缠小脚不是审美是审丑', keywords: '小脚,审丑,女性' }],
  ['LAT011-052', { category: '知识', title: '小脚哲学被思想史漏掉', keywords: '小脚哲学,思想史,固有文化' }],
  ['LAT011-053', { category: '文化', title: '再嫁禁令流殃', keywords: '再嫁,贞节,礼教' }],
  ['LAT011-054', { category: '文化', title: '贞节名册记录残酷', keywords: '贞节名册,残酷记录,旌表' }],
  ['LAT011-055', { category: '文化', title: '旌表只彰丈夫之名', keywords: '旌表,妇女,姓名' }],
  ['LAT011-056', { category: '文化', title: '冥婚暴露两面文化', keywords: '冥婚,经典,民俗' }],
  ['LAT011-059', { category: '文化', title: '欢喜佛是文化交流怪例', keywords: '欢喜佛,文化交流,怪例' }],
  ['LAT011-060', { category: '知识', title: '历史不只是帝王起居注', keywords: '历史,帝王家谱,民族活动史' }],
  ['LAT011-061', { category: '方法', title: '单一史观解释不了历史', keywords: '唯性史观,非唯主义,历史现象' }],
  ['LAT011-062', { category: '方法', title: '现代方法要重看历史夹缝', keywords: '现代方法,历史夹缝,辅助科学' }],
  ['LAT011-063', { category: '知识', title: '性是被忽略的历史大题目', keywords: '性,中国历史,忽略' }],
  ['LAT011-064', { category: '人格', title: '回避性研究证明胆怯', keywords: '性研究,真理,胆怯' }],
  ['LAT011-065', { category: '文化', title: '性空气被管制搅浊', keywords: '性,闭锁社会,管制' }],
  ['LAT011-066', { category: '法权', title: '风化管制不能遮羞', keywords: '国情不同,有伤风化,性水准' }],
  ['LAT011-067', { category: '文化', title: '人事感天不是民间独有', keywords: '人事感天,知识分子,迷信' }],
  ['LAT011-068', { category: '知识', title: '动物有知支撑感动论', keywords: '动物有知,感通,感动动物' }],
  ['LAT011-069', { category: '方法', title: '实捕胜过文词感格', keywords: '实力捕治,文词,乾隆' }],
  ['LAT011-071', { category: '政治', title: '鼓是权威象征', keywords: '鼓,权威,当权者' }],
  ['LAT011-072', { category: '法权', title: '谏鼓让逆耳言上达', keywords: '谏鼓,逆耳之言,上下交通' }],
  ['LAT011-073', { category: '法权', title: '登闻鼓是人权道具', keywords: '登闻鼓,喊冤,人权道具' }],
  ['LAT011-074', { category: '政治', title: '鼓声终成民间抗议', keywords: '鼓声,抗议,小百姓' }],
  ['LAT011-076', { category: '法权', title: '诽谤原本是忠谏', keywords: '诽谤,忠谏,谤木' }],
  ['LAT011-077', { category: '法权', title: '不加罪才有真话', keywords: '不加罪,求言,真话' }],
  ['LAT011-078', { category: '法权', title: '华表是失传言论道具', keywords: '华表,言论自由,象征' }],
  ['LAT011-080', { category: '人格', title: '不合作可脱离孟子家法', keywords: '不合作,辞受,孟子' }],
  ['LAT011-082', { category: '人格', title: '不合作需要大勇', keywords: '不合作主义,大勇,决绝' }],
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
    '- 分类策略：校对轮继续使用 7 个原子分类，删除重复结论、章内枝节、短过渡与偏掌故条目。',
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
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
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

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

for (const record of originalPayload.records) {
  if (!dropReasons.has(record.id) && !overrides.has(record.id)) {
    throw new Error(`Missing proofreading decision for ${record.id}`);
  }
}

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id);
    if (!override) {
      throw new Error(`Missing override for kept record ${record.id}`);
    }

    return {
      ...record,
      ...override,
      id: `LAT${bookBase.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: bookBase.title,
      round: bookBase.round,
      status: bookBase.status,
      proofread_from: record.id,
    };
  });

const book = {
  ...bookBase,
  record_count: records.length,
  category_counts: categoryCounts(records, taxonomy),
};

const payload = {
  generated_at: new Date().toISOString(),
  book,
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

console.log(`Proofread ${originalPayload.records.length} records into ${records.length} records for ${book.title}.`);
