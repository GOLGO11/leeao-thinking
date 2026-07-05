import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '058.李敖情书集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT058-011', '“漂亮会衰”与“美丽性灵”同题，后者更能呈现情爱判断，校对轮删除。'],
  ['LAT058-013', '拒绝追求的私人心态较重，缺少可独立检索的思想展开，校对轮删除。'],
  ['LAT058-015', '灵光相照段落偏亲密隐喻和私语，思想入口不如“不只漂亮”“亲密异端”稳定，校对轮删除。'],
  ['LAT058-019', '长夜写作偏单次写作量和稿费记录，写作方法承载不足，校对轮删除。'],
  ['LAT058-021', '文章气势主要是转述他人对李敖的称赞，偏自我评价，校对轮删除。'],
  ['LAT058-032', '拒登广告偏国民党媒体攻击的事件补充，言论自由主题已有更直接条目承载，校对轮删除。'],
  ['LAT058-036', '分家技术偏文星分家操作细节，思想索引价值较弱，校对轮删除。'],
  ['LAT058-046', '层面误解表述过短，无法独立支撑一条思想索引，校对轮删除。'],
  ['LAT058-050', '社会不公偏阿贞个案的同情语境，人生选择主题由后文条目更完整承载，校对轮删除。'],
  ['LAT058-053', '查扣副本偏取回校样的程序记录，查禁和法权主题已有更稳定条目承载，校对轮删除。'],
  ['LAT058-058', '纯爱约束偏私人关系中的克制语境，和灵肉自省、灵肉一致条目重复，校对轮删除。'],
  ['LAT058-078', '溺儒冠段落以戏谑和粗口例证为主，知识分子判断不够收敛，校对轮删除。'],
  ['LAT058-087', '独斗德国人段落以“表示三点意义”引出后续列点，单段不完整，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT058-001', { title: '情书查禁', keywords: '情书,自费出版,查禁' }],
  ['LAT058-004', { title: '爱情睁眼', keywords: '爱情,盲目,清醒' }],
  ['LAT058-005', { title: '反崇灵贬肉', keywords: '灵魂,肉体,灵肉' }],
  ['LAT058-008', { title: '虚无与任性', keywords: '存在主义,虚无主义,任性' }],
  ['LAT058-010', { title: '偶尔之爱', keywords: '爱情,偶尔,坦白' }],
  ['LAT058-012', { title: '性灵胜美', keywords: '美丽,性灵,追求' }],
  ['LAT058-017', { title: '亲密中的异端', keywords: '亲密,异端,独立' }],
  ['LAT058-018', { title: '出版法反讽', keywords: '出版法,立法院,胡秋原' }],
  ['LAT058-020', { title: '官司不和解', keywords: '官司,和谈,出庭' }],
  ['LAT058-022', { title: '浪漫归现实', keywords: '现实,浪漫,幸福' }],
  ['LAT058-023', { title: '苦果自负', keywords: '选择,牢狱,苦果' }],
  ['LAT058-025', { title: '定力抗扰', keywords: '文星,困扰,定力' }],
  ['LAT058-026', { title: '自由剃刀', keywords: '言论自由,剃刀边缘,上限' }],
  ['LAT058-027', { title: '经世写作', keywords: '写作,经世致用,现实' }],
  ['LAT058-028', { title: '禁书节点', keywords: '查禁,文星,出版品' }],
  ['LAT058-029', { title: '写作生路', keywords: '宪法,写文章,生路' }],
  ['LAT058-030', { title: '文化作武器', keywords: '中国文化,自由民主,武器' }],
  ['LAT058-031', { title: '坐牢变恶名', keywords: '坐牢,迫害,恶名' }],
  ['LAT058-033', { title: '孤独避祸', keywords: '文字狱,孤独,写作读书' }],
  ['LAT058-034', { title: '胜诉不取财', keywords: '诽谤,官司,赔偿' }],
  ['LAT058-035', { title: '方法胜文人', keywords: '文学革命,方法,表达法' }],
  ['LAT058-037', { title: '独力谋生', keywords: '文星,外压力,独立生活' }],
  ['LAT058-038', { title: '自印生路', keywords: '自印,著作,生计' }],
  ['LAT058-039', { title: '吃自己的饭', keywords: '查禁,当权者,生计' }],
  ['LAT058-041', { title: '坐牢成英雄', keywords: '当权者,坐牢,英雄' }],
  ['LAT058-042', { title: '逼迫的限度', keywords: '忍耐,绝路,限度' }],
  ['LAT058-043', { title: '牢狱是暴力', keywords: '坐牢,暴力,囚犯' }],
  ['LAT058-045', { title: '悲剧要会笑', keywords: '悲剧,观点,会笑' }],
  ['LAT058-047', { title: '拒做奴才', keywords: '征服,男人,奴才' }],
  ['LAT058-048', { title: '别耗生命', keywords: '女人,折磨,生命' }],
  ['LAT058-049', { title: '身体要及时', keywords: '性欲,及时行乐,恋爱' }],
  ['LAT058-052', { title: '现在才有意义', keywords: '人生,燃烧,现在' }],
  ['LAT058-054', { title: '拘票表功', keywords: '法院,妨害公务,拘票' }],
  ['LAT058-055', { title: '深情可淳化', keywords: '深爱,淳化,灵魂' }],
  ['LAT058-056', { title: '灵肉自省', keywords: '灵肉,欲情,保护' }],
  ['LAT058-057', { title: '爱可胜自由', keywords: '自由,爱,雪莱' }],
  ['LAT058-059', { title: '嘲笑伪诗', keywords: '现代诗,小说,嘲笑' }],
  ['LAT058-060', { title: '边缘上的榜样', keywords: '知识分子,写文章,榜样' }],
  ['LAT058-061', { title: '灵肉皆高级', keywords: '情欲,爱恨,灵肉' }],
  ['LAT058-062', { title: '书信连锁', keywords: '写信,亲密,连锁' }],
  ['LAT058-063', { title: '鉴定文章', keywords: '文章,鉴定,检验' }],
  ['LAT058-064', { title: '殷海光墓志', keywords: '殷海光,自由思想家,死亡' }],
  ['LAT058-065', { title: '考试戕害性灵', keywords: '考试,教育,性灵' }],
  ['LAT058-066', { title: '叛逆不可冷却', keywords: '叛逆,环境,教养' }],
  ['LAT058-067', { title: '起诉示警', keywords: '妨害公务,法院,起诉' }],
  ['LAT058-068', { title: '新闻遮蔽压迫', keywords: '新闻界,查禁,极权' }],
  ['LAT058-069', { title: '宁小气不厚颜', keywords: '女人,厚颜,小气' }],
  ['LAT058-070', { title: '法院无事生非', keywords: '法院,妨害公务,才吏' }],
  ['LAT058-071', { title: '剪后靠悟性', keywords: '电检,电影,悟性' }],
  ['LAT058-072', { title: '专栏可贾祸', keywords: '专栏,写作,以文贾祸' }],
  ['LAT058-073', { title: '政府制造敌人', keywords: '政府,共产党,红帽子' }],
  ['LAT058-074', { title: '官僚扰书', keywords: '书籍,免税,官僚' }],
  ['LAT058-075', { title: '理智压唯美', keywords: '理智,唯美主义,情绪' }],
  ['LAT058-076', { title: '删文损文献', keywords: '胡适,文存,删文' }],
  ['LAT058-079', { title: '接见非人道', keywords: '监狱,接见,自由' }],
  ['LAT058-080', { title: '用法不可深', keywords: '酷吏,用法,公务员' }],
  ['LAT058-081', { title: '权力坏蛋', keywords: '清廉,权力,残忍' }],
  ['LAT058-082', { title: '监狱医疗草率', keywords: '监狱,医疗,犯人' }],
  ['LAT058-083', { title: '病舍给特权', keywords: '病舍,特权,犯人' }],
  ['LAT058-084', { title: '送药合法', keywords: '羁押法,药物,苛政' }],
  ['LAT058-085', { title: '稿费给小友', keywords: '稿费,作风,李敖评论' }],
  ['LAT058-086', { title: '禁书不惧', keywords: '禁书,畅销,千秋评论' }],
  ['LAT058-088', { title: '视死如归', keywords: '下狱,视死如归,达观' }],
  ['LAT058-089', { title: '国民党拖小', keywords: '国民党,人权斗士,台湾' }],
  ['LAT058-090', { title: '行道不丧志', keywords: '受难者,志士仁人,行道' }],
  ['LAT058-091', { title: '废墟中希望', keywords: '废墟,希望,男子汉' }],
  ['LAT058-092', { title: '成全的从容', keywords: '古仁人,成全,从容' }],
  ['LAT058-093', { title: '扫黑是烟幕', keywords: '江南案,国民党,扫黑' }],
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
    'source_id',
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

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
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
    return {
      ...record,
      ...edit,
      id: `LAT058-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
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
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除过度私语、展开不足、外部赞语、单纯事件流程、段落不完整和同题重复条目；保留能独立呈现李敖情爱观、灵肉观、亲密关系技术、写作方法、法权意识、牢狱观察、人格自处和政治判断的原文段落。description 未改写。',
  },
  records,
  dropped,
};

const jsonPath = path.join(outputDir, '思想索引-校对轮.json');
const csvPath = path.join(outputDir, '思想索引-校对轮.csv');
const mdPath = path.join(outputDir, '思想索引-校对轮.md');
const notePath = path.join(outputDir, '校对说明.md');

fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(csvPath, records);
writeMarkdown(mdPath, payload);

const noteLines = [
  '# 《李敖情书集》思想索引校对说明',
  '',
  `- 校对输入：${path.relative(rootDir, extractionPath)}`,
  `- 校对输出：${path.relative(rootDir, jsonPath)}`,
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 校对原则',
  '',
  '- description 只沿用原书段落，不做转述和改写。',
  '- 情爱类保留爱情观、欲望观、灵肉观、亲密关系技术和关系自处；删除单纯私语、调情或抒情片段。',
  '- 非情爱材料按主旨归入写作、方法、知识、人格、文化、政治、法权，不因出现在情书中而强行归入情爱。',
  '- 删除同题重复、展开不足、外部赞语、单纯事件流程、段落不完整或索引价值偏弱的条目。',
  '',
  '## 删除清单',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
];

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      book: payload.book.title,
      round: payload.book.round,
      input: extraction.records.length,
      kept: records.length,
      dropped: dropped.length,
      categories: categoryCounts(records),
      outputs: [jsonPath, csvPath, mdPath, notePath],
    },
    null,
    2,
  ),
);
