import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '040.李敖语录');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropGroups = [
  {
    reason: '序言元信息偏书目说明，不作为思想判断入校对轮。',
    ids: ['LAT040-001', 'LAT040-002'],
  },
  {
    reason: '自我姿态或人格机锋与相邻条目重复，校对轮保留更完整的判断段落。',
    ids: [
      'LAT040-005',
      'LAT040-008',
      'LAT040-009',
      'LAT040-010',
      'LAT040-013',
      'LAT040-015',
      'LAT040-020',
      'LAT040-021',
      'LAT040-026',
      'LAT040-031',
      'LAT040-033',
      'LAT040-037',
      'LAT040-040',
      'LAT040-045',
      'LAT040-049',
      'LAT040-050',
      'LAT040-054',
      'LAT040-058',
      'LAT040-063',
      'LAT040-065',
    ],
  },
  {
    reason: '牢狱经验中偏生活细节或表达场景，校对轮保留人格磨练与法权判断主线。',
    ids: ['LAT040-074', 'LAT040-077', 'LAT040-080', 'LAT040-081', 'LAT040-083'],
  },
  {
    reason: '历史人物掌故偏个案材料，思想索引保留更能抽象成原则的少数人物条目。',
    ids: [
      'LAT040-084',
      'LAT040-085',
      'LAT040-086',
      'LAT040-087',
      'LAT040-089',
      'LAT040-090',
      'LAT040-092',
      'LAT040-094',
      'LAT040-097',
      'LAT040-099',
      'LAT040-100',
      'LAT040-103',
    ],
  },
  {
    reason: '通论短段与相邻方法/人格条目含义相近，校对轮压缩密度。',
    ids: [
      'LAT040-109',
      'LAT040-110',
      'LAT040-115',
      'LAT040-117',
      'LAT040-119',
      'LAT040-121',
      'LAT040-128',
    ],
  },
  {
    reason: '知识与文化条目偏资料性或细案性，保留更具方法论、传统批判和文学观的段落。',
    ids: [
      'LAT040-151',
      'LAT040-152',
      'LAT040-155',
      'LAT040-156',
      'LAT040-157',
      'LAT040-158',
      'LAT040-165',
      'LAT040-173',
      'LAT040-179',
      'LAT040-185',
      'LAT040-189',
      'LAT040-191',
    ],
  },
  {
    reason: '民主政治章节中同义密集，校对轮保留制度、自由、反对意见和思想领导等主干。',
    ids: ['LAT040-195', 'LAT040-203', 'LAT040-205', 'LAT040-209'],
  },
  {
    reason: '国民党批判中偏短评或细案，校对轮保留结构性政治判断。',
    ids: ['LAT040-217', 'LAT040-218'],
  },
  {
    reason: '党外政治条目中过于贴近个别事件或姿态，校对轮保留原则性判断。',
    ids: ['LAT040-227', 'LAT040-229', 'LAT040-230', 'LAT040-233'],
  },
  {
    reason: '情爱章节中偏个人情书片段或重复恋爱姿态，保留爱情哲学与关系判断主线。',
    ids: [
      'LAT040-244',
      'LAT040-252',
      'LAT040-253',
      'LAT040-265',
      'LAT040-266',
      'LAT040-267',
      'LAT040-268',
      'LAT040-270',
      'LAT040-272',
      'LAT040-274',
    ],
  },
];

const dropReasons = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = new Map([
  ['LAT040-003', { title: '自炼成钢' }],
  ['LAT040-004', { title: '担当风险' }],
  ['LAT040-006', { title: '英雄意志' }],
  ['LAT040-007', { title: '沉默力量' }],
  ['LAT040-011', { title: '道德勇气' }],
  ['LAT040-012', { title: '伟大标准' }],
  ['LAT040-014', { title: '反对懒惰' }],
  ['LAT040-016', { title: '是非挂帅' }],
  ['LAT040-017', { title: '痛恨乡愿' }],
  ['LAT040-018', { title: '珍惜光阴' }],
  ['LAT040-019', { title: '战斗隐居' }],
  ['LAT040-022', { title: '公开大义' }],
  ['LAT040-023', { title: '选择一种人' }],
  ['LAT040-024', { title: '忠言逆耳' }],
  ['LAT040-025', { title: '宁做真小人' }],
  ['LAT040-027', { title: '拒绝低级情绪' }],
  ['LAT040-028', { title: '先明真理' }],
  ['LAT040-029', { title: '主动生活' }],
  ['LAT040-035', { title: '讲是非' }],
  ['LAT040-036', { title: '全力以赴' }],
  ['LAT040-039', { title: '文字救世' }],
  ['LAT040-041', { title: '揭发真相' }],
  ['LAT040-047', { title: '整理观念' }],
  ['LAT040-051', { title: '思想领导政治' }],
  ['LAT040-052', { title: '独立思考' }],
  ['LAT040-055', { title: '工作治苦闷' }],
  ['LAT040-060', { title: '成绩检定' }],
  ['LAT040-061', { title: '把握常变' }],
  ['LAT040-064', { title: '反传统' }],
  ['LAT040-068', { title: '以写带看' }],
  ['LAT040-070', { title: '笼中歌唱' }],
  ['LAT040-071', { title: '监狱训练' }],
  ['LAT040-073', { title: '时间批发' }],
  ['LAT040-075', { title: '热水虐政' }],
  ['LAT040-076', { title: '牢中医疗' }],
  ['LAT040-078', { title: '法律代打' }],
  ['LAT040-082', { title: '关人即失败' }],
  ['LAT040-088', { title: '尊重不合作者' }],
  ['LAT040-091', { title: '天下公事' }],
  ['LAT040-096', { title: '知识分子尊严' }],
  ['LAT040-098', { title: '中西沟通' }],
  ['LAT040-101', { title: '不合作主义' }],
  ['LAT040-102', { title: '受苦气魄' }],
  ['LAT040-104', { title: '自由灵魂' }],
  ['LAT040-105', { title: '善要实践' }],
  ['LAT040-111', { title: '材料限制' }],
  ['LAT040-113', { title: '重视档案' }],
  ['LAT040-114', { title: '显性伪君子' }],
  ['LAT040-116', { title: '大德细行' }],
  ['LAT040-120', { title: '悟真识幻' }],
  ['LAT040-122', { title: '自由非谏诤' }],
  ['LAT040-123', { title: '良心后天' }],
  ['LAT040-126', { title: '永不泄气' }],
  ['LAT040-127', { title: '伪融会中西' }],
  ['LAT040-132', { title: '私生活边界' }],
  ['LAT040-133', { title: '社会靠法治' }],
  ['LAT040-134', { title: '坏人也有法' }],
  ['LAT040-136', { title: '依附威权' }],
  ['LAT040-138', { title: '笔杆责任' }],
  ['LAT040-139', { title: '特立独行' }],
  ['LAT040-141', { title: '威权公式' }],
  ['LAT040-143', { title: '唱反调' }],
  ['LAT040-144', { title: '文化衰弱' }],
  ['LAT040-145', { title: '祖宗崇拜' }],
  ['LAT040-146', { title: '浅尝即止' }],
  ['LAT040-148', { title: '半吊子西化' }],
  ['LAT040-150', { title: '僵尸思想' }],
  ['LAT040-162', { title: '道德分界' }],
  ['LAT040-164', { title: '师道无是非' }],
  ['LAT040-172', { title: '家族连坐' }],
  ['LAT040-174', { title: '文化沙文' }],
  ['LAT040-178', { title: '拒绝纲常' }],
  ['LAT040-181', { title: '文章标准' }],
  ['LAT040-183', { title: '狂叛文章' }],
  ['LAT040-186', { title: '作家责任' }],
  ['LAT040-187', { title: '不必媚世' }],
  ['LAT040-192', { title: '玩笑测民主' }],
  ['LAT040-193', { title: '政府是小撮人' }],
  ['LAT040-197', { title: '习惯民主' }],
  ['LAT040-199', { title: '义正自由' }],
  ['LAT040-204', { title: '容纳反对' }],
  ['LAT040-206', { title: '可骂自己人' }],
  ['LAT040-208', { title: '思想挂帅' }],
  ['LAT040-210', { title: '极权小朝廷' }],
  ['LAT040-212', { title: '配给自由' }],
  ['LAT040-214', { title: '戒严法理' }],
  ['LAT040-216', { title: '把持不负责' }],
  ['LAT040-221', { title: '做狷者' }],
  ['LAT040-223', { title: '不以弱者自居' }],
  ['LAT040-224', { title: '政治不即溶' }],
  ['LAT040-226', { title: '新生代是非感' }],
  ['LAT040-231', { title: '战斗正路' }],
  ['LAT040-232', { title: '立场明确' }],
  ['LAT040-234', { title: '知识分子主见' }],
  ['LAT040-235', { title: '爱情不永恒' }],
  ['LAT040-236', { title: '正视爱情' }],
  ['LAT040-237', { category: '情爱', title: '自由恋爱' }],
  ['LAT040-238', { title: '坦率相爱' }],
  ['LAT040-239', { title: '情变根源' }],
  ['LAT040-240', { title: '别以痛苦自豪' }],
  ['LAT040-241', { title: '快乐之源' }],
  ['LAT040-242', { title: '不以占有为目标' }],
  ['LAT040-243', { title: '感情不必专一' }],
  ['LAT040-245', { title: '恋爱是美' }],
  ['LAT040-246', { title: '短暂真实' }],
  ['LAT040-247', { title: '不必偷偷摸摸' }],
  ['LAT040-249', { title: '两个主体' }],
  ['LAT040-251', { title: '拒绝激烈证爱' }],
  ['LAT040-254', { title: '穷追非热爱' }],
  ['LAT040-255', { title: '婚姻谋生' }],
  ['LAT040-256', { title: '主妇社会' }],
  ['LAT040-257', { title: '婚姻人格' }],
  ['LAT040-258', { title: '愚贞' }],
  ['LAT040-259', { title: '漂亮离婚' }],
  ['LAT040-260', { title: '灵肉平等' }],
  ['LAT040-261', { title: '妇女地位' }],
  ['LAT040-262', { title: '贤妻良母' }],
  ['LAT040-263', { title: '重男轻女' }],
  ['LAT040-264', { title: '爱情自由代价' }],
  ['LAT040-269', { title: '纸上罗曼斯' }],
  ['LAT040-271', { title: '恋爱尊严' }],
  ['LAT040-273', { title: '爱情变幻' }],
  ['LAT040-275', { title: '迷念幻象' }],
  ['LAT040-276', { title: '精神恋' }],
  ['LAT040-277', { title: '冷思热行' }],
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
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    '- 校对原则：删去序言元信息、弱人物掌故、相近机锋、个别人事和弱情书片段，保留可独立检索的思想判断。',
    '- 说明：标题与分类用于检索导航；description 保留源文本原文段落。',
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records, payload.taxonomy).map(
      (item) => `- ${item.category}：${item.count}`,
    ),
    '',
  ];

  for (const category of payload.taxonomy) {
    const items = payload.records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of items) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段｜关键词：${record.keywords}｜提取轮：${record.proofread_from}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalPayload) {
  const dropped = originalPayload.records
    .filter((record) => dropReasons.has(record.id))
    .map((record) => `- ${record.id}｜${record.category}｜${record.title}：${dropReasons.get(record.id)}`);

  const lines = [
    '# 《李敖语录》思想索引校对说明',
    '',
    `- 提取轮条目：${originalPayload.records.length}`,
    `- 校对轮条目：${payload.records.length}`,
    `- 删除条目：${dropReasons.size}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 校对原则',
    '',
    '- 保留政治、法权、文化、写作、方法、知识、人格、情爱各类中能独立检索的判断。',
    '- 压缩同一章节内的密集短机锋，删除更像人物掌故、个人姿态或情书场景的条目。',
    '- 对保留条目只压缩标题和修正分类，不改写 description 原文。',
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records, payload.taxonomy).map(
      (item) => `- ${item.category}：${item.count}`,
    ),
    '',
    '## 删除明细',
    '',
    ...dropped,
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮删除序言元信息、偏人物掌故、相近人格机锋、细案化政治条目和弱情书片段，保留能够独立检索的思想判断；description 仍逐条保留源文本原文段落。',
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
  taxonomy: originalPayload.taxonomy,
  records,
  proofread: {
    from_round: originalPayload.book.round,
    original_count: originalPayload.records.length,
    retained_count: records.length,
    dropped_count: dropReasons.size,
    dropped: originalPayload.records
      .filter((record) => dropReasons.has(record.id))
      .map((record) => ({
        id: record.id,
        category: record.category,
        title: record.title,
        reason: dropReasons.get(record.id),
      })),
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload);

console.log(
  `Built ${book.sequence}.${book.title} ${book.round}: ${records.length} records. Dropped: ${dropReasons.size}.`,
);
console.log(
  categoryCounts(records, payload.taxonomy)
    .map((item) => `${item.category}:${item.count}`)
    .join(' '),
);
