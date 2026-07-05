import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '055.李敖书序集续集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT055-017', '《历史与人像》简介偏广告式概括，段落短，独立思想展开不足，校对轮删去。'],
  ['LAT055-020', '“文学成家”偏大全集宣传文案和自我定位，和本书中更具体的写作、历史、评论条目相比检索价值较弱，校对轮删去。'],
  ['LAT055-031', '“革命狼狈”是《文茜半生缘》序中的过渡判断，篇幅短且依赖上下文，校对轮删去。'],
  ['LAT055-032', '“个人失败”与后文“革命牺牲”“勇怯统独”主题重合，且段落过短，校对轮删去。'],
  ['LAT055-037', '“消极不字”主要引出后文阉夫案，思想展开由“权力释放”承载，校对轮删去。'],
  ['LAT055-038', '“阉夫杀夫”段落过短且停在引出外部结论，情爱判断不够完整，校对轮删去。'],
  ['LAT055-044', '“文化疗伤”与下一条“文化本行”同题，后者展开更完整，校对轮删去。'],
  ['LAT055-046', '“小岛国宝”外部引文占比高，李敖判断集中度不如“自由胜独”“文化本行”，校对轮删去。'],
  ['LAT055-050', '“早死免见”机锋较强但偏文人美人闲论，和后续“自悔少作”“少作史料”相比索引价值较弱，校对轮删去。'],
  ['LAT055-055', '“黑牢反扑”主要交代《调查局研究》出版后的影响，法权思想由后文黑牢与刑求条目承载，校对轮删去。'],
  ['LAT055-056', '“煽风出书”偏出版缘起和自我调侃，思想展开不足，校对轮删去。'],
  ['LAT055-062', '“破命系列”偏节目与合作缘起，校对轮保留对迷信体系和破除方法更集中的条目。'],
  ['LAT055-063', '“挡术士财”偏节目反馈和传播效果，思想判断不如“迷信欺民”“智慧破雾”集中，校对轮删去。'],
  ['LAT055-070', '“拒迎权势”和下一条“良知挨打”同题，后者更能呈现坚持批判的代价，校对轮删去。'],
  ['LAT055-074', '“对话留正”偏书籍推荐和内容介绍，政治判断不如“共同反独”“祯祥扫妖”明确，校对轮删去。'],
]);

const overrides = new Map([
  ['LAT055-005', { category: '法权', title: '香港乐土', keywords: '香港,言论自由,苦难见证' }],
  ['LAT055-006', { title: '匹夫办报', keywords: '求是报,独立,客观' }],
  ['LAT055-007', { title: '冰河知识人', keywords: '国民党,知识分子,极权' }],
  ['LAT055-010', { title: '查禁铁证', keywords: '查禁表,文证,冰河期' }],
  ['LAT055-011', { title: '二二八定性', keywords: '二二八,民变,历史公道' }],
  ['LAT055-013', { title: '证据排比', keywords: '二二八,文化证据,旁征博引' }],
  ['LAT055-015', { title: '选文难作', keywords: '精选集,选文,白话文' }],
  ['LAT055-018', { title: '僵尸思想', keywords: '思想趋向,借尸还魂,批判' }],
  ['LAT055-021', { category: '法权', title: '公开书信', keywords: '书信,秘密通讯,公开' }],
  ['LAT055-022', { title: '评论闯祸', keywords: '评论,伪政府,善恶分明' }],
  ['LAT055-023', { title: '历史复健', keywords: '历史,扭曲,翻案' }],
  ['LAT055-025', { title: '证据写人', keywords: '人物,证据,据笔直书' }],
  ['LAT055-029', { title: '内部原弹', keywords: '新党,初选,规划名单' }],
  ['LAT055-030', { title: '败局鉴戒', keywords: '新党,检讨,民主政治' }],
  ['LAT055-033', { title: '革命摊牌', keywords: '政治运动,牺牲,革命' }],
  ['LAT055-034', { title: '左派勇气', keywords: '陈文茜,勇敢,政治投机' }],
  ['LAT055-036', { title: '夺权清醒', keywords: '民进党,夺权,清醒' }],
  ['LAT055-039', { title: '脱离权力', keywords: '女性主义,权力游戏,自由' }],
  ['LAT055-040', { title: '台湾下一步', keywords: '台湾,自决,修正主义' }],
  ['LAT055-041', { title: '岛国视野', keywords: '两岸谈判,共产党,岛国本位' }],
  ['LAT055-043', { title: '强邻难解', keywords: '独立运动,强邻,台独' }],
  ['LAT055-045', { title: '文化归路', keywords: '张爱玲,文化活动,永恒' }],
  ['LAT055-047', { title: '自由高于台独', keywords: '民主,自由,台独' }],
  ['LAT055-048', { title: '加入打倒', keywords: '共产党,颠覆,陈文茜' }],
  ['LAT055-051', { title: '少作自悔', keywords: '少作,藏拙,进步' }],
  ['LAT055-052', { title: '少作成史料', keywords: '陈复,成熟作品,史料' }],
  ['LAT055-057', { title: '黑牢全貌', keywords: '调查局黑牢,刑求,坐牢' }],
  ['LAT055-058', { title: '刑求成案', keywords: '刑求,假口供,治狱' }],
  ['LAT055-059', { title: '刑狱补缺', keywords: '黑牢,刑狱,实例' }],
  ['LAT055-061', { title: '迷信欺民', keywords: '怪力乱神,统治者,欺民' }],
  ['LAT055-064', { title: '智慧破雾', keywords: '算命术语,智慧,迷信' }],
  ['LAT055-065', { title: '好书耐时', keywords: '好书,时间,泰戈尔' }],
  ['LAT055-069', { title: '诗无定解', keywords: '诗,解读,译本' }],
  ['LAT055-071', { title: '良知挨打', keywords: '冯沪祥,良知,批判' }],
  ['LAT055-072', { title: '反独反黑', keywords: '台独,黑金,两岸和平' }],
  ['LAT055-073', { title: '文学不埋', keywords: '政治,文学,思想家' }],
  ['LAT055-075', { title: '扫妖振华', keywords: '中庸,两岸,拨乱反正' }],
  ['LAT055-076', { title: '倡优自由', keywords: '言论自由,倡优,真言' }],
  ['LAT055-077', { title: '借古讽今', keywords: '讽刺,借古讽今,否认' }],
  ['LAT055-079', { title: '百尺勇气', keywords: '秦慧珠,王永庆,勇气' }],
  ['LAT055-080', { title: '政治否认', keywords: '政治正确,否认,机密' }],
  ['LAT055-081', { title: '事实正确', keywords: '事实正确,历史正确,政治正确' }],
  ['LAT055-082', { title: '违逆正确', keywords: '秦慧珠,事实正确,胆识' }],
  ['LAT055-083', { title: '匿名编选', keywords: '白色恐怖,匿名,编书' }],
  ['LAT055-085', { category: '方法', title: '选集完整', keywords: '胡适选集,全集,出版' }],
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
      id: `LAT055-${String(index + 1).padStart(3, '0')}`,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} in ${record.source_id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除广告式简介、过渡短句、外部引文占主体、出版过程说明和同题重复条目；保留能独立呈现李敖政治判断、法权意识、写作方法、史料方法、文化判断与人格伦理的原文段落。description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description 原文。',
      '删除广告式简介、过渡短句、出版过程说明、外部引文占主体和同题重复的条目。',
      '保留能独立检索的政治判断、法权意识、写作方法、史料方法、文化判断和人格伦理段落。',
      '标题继续压缩为检索用语，分类仍使用 8 个原子分类。',
    ],
    dropped,
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

const noteLines = [
  '# 《李敖书序集续集》思想索引校对说明',
  '',
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 校对原则',
  '',
  ...payload.proofreading.principles.map((item) => `- ${item}`),
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

fs.writeFileSync(path.join(outputDir, '校对说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built proofread 055.李敖书序集续集: ${records.length} records. Dropped: ${dropped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
