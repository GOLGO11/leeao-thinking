import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '041.虽千万人，李敖往矣');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropGroups = [
  {
    reason:
      '微博写作背景和自我说明偏密，校对轮保留文体、封锁和写作方法主线，删除事件性或重复性元信息。',
    ids: [
      'LAT041-005',
      'LAT041-031',
      'LAT041-048',
      'LAT041-083',
      'LAT041-111',
      'LAT041-125',
      'LAT041-132',
      'LAT041-134',
      'LAT041-143',
      'LAT041-205',
      'LAT041-259',
      'LAT041-281',
      'LAT041-282',
    ],
  },
  {
    reason: '方法类中删去主要依靠掌故或借题发挥成立、可索引性较弱的短段。',
    ids: ['LAT041-021', 'LAT041-074'],
  },
  {
    reason:
      '知识和文化类中删去过分贴近个案、书目宣传、短答或提取轮标题与源段落主旨不合的条目。',
    ids: [
      'LAT041-056',
      'LAT041-084',
      'LAT041-174',
      'LAT041-209',
      'LAT041-244',
      'LAT041-286',
    ],
  },
  {
    reason:
      '人格类中删去偏情绪姿态、人物掌故或诗性自况的段落，保留人格判断、证据伦理和不合作主线。',
    ids: [
      'LAT041-044',
      'LAT041-058',
      'LAT041-070',
      'LAT041-075',
      'LAT041-217',
      'LAT041-280',
    ],
  },
  {
    reason:
      '政治类提取轮偏密，校对轮删除重复的党争短评、单一事件讽刺、人名掌故和只靠笑点成立的政治段落。',
    ids: [
      'LAT041-007',
      'LAT041-014',
      'LAT041-022',
      'LAT041-082',
      'LAT041-090',
      'LAT041-094',
      'LAT041-097',
      'LAT041-108',
      'LAT041-109',
      'LAT041-114',
      'LAT041-119',
      'LAT041-121',
      'LAT041-153',
      'LAT041-162',
      'LAT041-166',
      'LAT041-167',
      'LAT041-187',
      'LAT041-194',
      'LAT041-210',
      'LAT041-221',
      'LAT041-226',
      'LAT041-235',
      'LAT041-256',
      'LAT041-261',
      'LAT041-263',
      'LAT041-268',
      'LAT041-285',
    ],
  },
  {
    reason:
      '法权类删除偏私人应对、掌故化或与相邻言论自由条目重复的段落，保留宪法、审查、司法和自由主线。',
    ids: [
      'LAT041-028',
      'LAT041-055',
      'LAT041-089',
      'LAT041-095',
      'LAT041-118',
      'LAT041-142',
      'LAT041-195',
    ],
  },
  {
    reason: '情爱类删去文学掌故色彩重、思想判断较弱的一条，保留关系观和爱情观主线。',
    ids: ['LAT041-036'],
  },
];

const dropReasons = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = new Map([
  ['LAT041-001', { title: '微博突围' }],
  ['LAT041-004', { title: '一百四十字文体' }],
  ['LAT041-006', { title: '第一自由' }],
  ['LAT041-009', { title: '暴殄文字' }],
  ['LAT041-011', { title: '上网真格' }],
  ['LAT041-017', { title: '微博战场' }],
  ['LAT041-018', { title: '真爱国' }],
  ['LAT041-029', { title: '专书标准' }],
  ['LAT041-032', { title: '强烈议题' }],
  ['LAT041-037', { title: '现状即落伍' }],
  ['LAT041-039', { title: '精算缺人性' }],
  ['LAT041-046', { title: '真理高于事实' }],
  ['LAT041-051', { title: '微言受警' }],
  ['LAT041-052', { title: '懦夫文学' }],
  ['LAT041-054', { title: '不怕政府' }],
  ['LAT041-057', { title: '自由被垄断' }],
  ['LAT041-060', { title: '主义变形' }],
  ['LAT041-061', { title: '民主可疑' }],
  ['LAT041-065', { title: '政治无你照转' }],
  ['LAT041-067', { title: '组织之坏' }],
  ['LAT041-071', { title: '宪法第三十五条' }],
  ['LAT041-079', { title: '司法不公' }],
  ['LAT041-086', { title: '缠绵之外' }],
  ['LAT041-087', { title: '超前代价' }],
  ['LAT041-088', { title: '人格底盘' }],
  ['LAT041-096', { title: '孵不出民主' }],
  ['LAT041-098', { title: '假民主' }],
  ['LAT041-100', { title: '知识分子尊严' }],
  ['LAT041-104', { title: '追问英国民主' }],
  ['LAT041-110', { title: '现实摧毁幻觉' }],
  ['LAT041-113', { title: '不合作' }],
  ['LAT041-115', { title: '统一之网' }],
  ['LAT041-122', { title: '言论自由三阶段' }],
  ['LAT041-124', { title: '量化自由' }],
  ['LAT041-126', { title: '刺客伦理' }],
  ['LAT041-127', { title: '读书方法' }],
  ['LAT041-129', { title: '国家统一' }],
  ['LAT041-130', { title: '民国幻觉' }],
  ['LAT041-135', { title: '中国是公约数' }],
  ['LAT041-137', { title: '九二共识' }],
  ['LAT041-138', { title: '中国不是党产' }],
  ['LAT041-141', { title: '历史家大方向' }],
  ['LAT041-145', { title: '据理争自由' }],
  ['LAT041-146', { title: '中国态度' }],
  ['LAT041-148', { title: '可恨可怜' }],
  ['LAT041-151', { title: '困惑源于不反省' }],
  ['LAT041-156', { title: '详列防曲解' }],
  ['LAT041-158', { title: '民主讽刺' }],
  ['LAT041-159', { title: '宪法看台湾' }],
  ['LAT041-163', { title: '冤案未平' }],
  ['LAT041-165', { title: '尘网更紧' }],
  ['LAT041-168', { title: '抗战宣战' }],
  ['LAT041-169', { title: '卖国论' }],
  ['LAT041-170', { title: '假历史' }],
  ['LAT041-172', { title: '读书与甚解' }],
  ['LAT041-173', { title: '民权缺人权' }],
  ['LAT041-175', { title: '土芥复仇' }],
  ['LAT041-176', { category: '知识', title: '真历史' }],
  ['LAT041-177', { title: '难民与大话' }],
  ['LAT041-178', { title: '思想挖根' }],
  ['LAT041-180', { title: '租界史' }],
  ['LAT041-181', { title: '盗憎客' }],
  ['LAT041-182', { title: '以假代真' }],
  ['LAT041-184', { title: '技术定于一' }],
  ['LAT041-188', { title: '女性择偶' }],
  ['LAT041-189', { title: '网中湛蓝' }],
  ['LAT041-190', { title: '古典中文' }],
  ['LAT041-191', { title: '抽毁自由' }],
  ['LAT041-192', { title: '过眼' }],
  ['LAT041-196', { title: '科技与自由' }],
  ['LAT041-197', { title: '西化问题' }],
  ['LAT041-198', { title: '分配背叛' }],
  ['LAT041-200', { title: '资本化共产党' }],
  ['LAT041-202', { title: '分裂责任' }],
  ['LAT041-204', { title: '国号怪运' }],
  ['LAT041-206', { title: '轰炸生敌' }],
  ['LAT041-212', { title: '非法搜索' }],
  ['LAT041-213', { title: '无令禁书' }],
  ['LAT041-216', { title: '恶劣面' }],
  ['LAT041-219', { title: '功劳与脖子' }],
  ['LAT041-222', { title: '爱情非基点' }],
  ['LAT041-224', { title: '爱国尾闾' }],
  ['LAT041-228', { title: '赤壁与统一' }],
  ['LAT041-229', { title: '副署宪法' }],
  ['LAT041-231', { title: '养寇' }],
  ['LAT041-232', { title: '国际法外' }],
  ['LAT041-233', { title: '怪胎民主' }],
  ['LAT041-234', { title: '祖国三段' }],
  ['LAT041-237', { title: '远方战场' }],
  ['LAT041-238', { title: '联合与斗争' }],
  ['LAT041-239', { title: '女人世界' }],
  ['LAT041-241', { title: '顾全大局' }],
  ['LAT041-242', { title: '九二共识之误' }],
  ['LAT041-245', { title: '按需分配' }],
  ['LAT041-248', { title: '中国人信念' }],
  ['LAT041-249', { title: '直觉证据' }],
  ['LAT041-250', { title: '自证无罪' }],
  ['LAT041-252', { title: '坏人强国' }],
  ['LAT041-253', { title: '台湾政策' }],
  ['LAT041-255', { title: '望厦条约' }],
  ['LAT041-258', { title: '三民主义变形' }],
  ['LAT041-260', { title: '孙中山分裂' }],
  ['LAT041-262', { title: '强国弱民' }],
  ['LAT041-265', { title: '奴性' }],
  ['LAT041-266', { title: '厉害好人' }],
  ['LAT041-267', { title: '抗战年限' }],
  ['LAT041-269', { title: '民间自由力量' }],
  ['LAT041-270', { title: '守护第三十五条' }],
  ['LAT041-272', { title: '主权谈判' }],
  ['LAT041-273', { title: '一个中国正道' }],
  ['LAT041-274', { title: '长远追求' }],
  ['LAT041-275', { title: '封杀落伍' }],
  ['LAT041-277', { title: '公民不服从' }],
  ['LAT041-279', { title: '科技预言' }],
  ['LAT041-283', { title: '微博下海' }],
  ['LAT041-284', { title: '突破封锁' }],
  ['LAT041-287', { title: '中医检验' }],
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
  const { book: bookInfo, records, taxonomy } = payload;
  const lines = [
    `# 《${bookInfo.title}》思想索引：${bookInfo.round}`,
    '',
    `- 状态：${bookInfo.status}`,
    `- 条目数：${records.length}`,
    '- 校对原则：收紧可独立检索的思想判断；不改写 description 原文。',
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
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, dropped) {
  const counts = categoryCounts(payload.records, payload.taxonomy);
  const lines = [
    '# 《虽千万人，李敖往矣》思想索引校对说明',
    '',
    `- 提取轮条目：${payload.proofread.source_count}`,
    `- 校对轮条目：${payload.records.length}`,
    `- 删除条目：${dropped.length}`,
    `- 标题/分类微调：${overrides.size}`,
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 校对取舍',
    '',
    '本书为微博体，提取轮覆盖较宽。校对轮重点压缩政治短评、个人掌故、重复封杀背景、纯笑点段落和微访谈短答，保留微博文体、言论自由、审查、宪法法权、一个中国、美国批判、历史辨伪、人格伦理和少量情爱判断。',
    '',
    '所有保留条目的 `description` 仍为源文本原文段落，只调整标题、分类、取舍和编号。',
    '',
    '## 删除分组',
    '',
    ...dropGroups.map((group) => `- ${group.reason}（${group.ids.length} 条）`),
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const sourcePayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = sourcePayload.taxonomy;
const sourceRecords = sourcePayload.records ?? [];
const dropped = [];

const keptRecords = sourceRecords
  .filter((record) => {
    const reason = dropReasons.get(record.id);
    if (reason) {
      dropped.push({
        id: record.id,
        title: record.title,
        category: record.category,
        source_file: record.source_file,
        source_paragraph: record.source_paragraph,
        reason,
      });
      return false;
    }
    return true;
  })
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...override,
      id: `LAT041-${String(index + 1).padStart(3, '0')}`,
      round: '校对轮',
      status: '已校对',
    };
  });

for (const record of keptRecords) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category after proofread: ${record.id} ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...sourcePayload.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮压缩微博体中过密的政治短评和重复性背景，保留可独立检索的思想判断；description 未改写。',
    source_round: sourcePayload.book?.round,
    source_count: sourceRecords.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records: keptRecords,
  proofread: {
    source_count: sourceRecords.length,
    kept_count: keptRecords.length,
    dropped_count: dropped.length,
    dropped,
    drop_groups: dropGroups,
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), keptRecords);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, dropped);

console.log(
  `Built ${payload.book.sequence}.${payload.book.title} proofread: ` +
    `${keptRecords.length} records. Dropped: ${dropped.length}.`,
);
for (const { category, count } of categoryCounts(keptRecords, taxonomy)) {
  console.log(`${category}: ${count}`);
}
