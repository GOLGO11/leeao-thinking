import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sequence = '096';
const bookTitle = '李敖送电集';
const dir = path.join('outputs', `${sequence}.${bookTitle}`);
const inputPath = path.join(dir, '思想索引-提取轮.json');

const categories = ['政治', '法权', '文化', '知识', '方法', '人格', '写作', '情爱'];

const dropGroups = [
  {
    reason: '同题两岸、台独、战争与一国两制论证已有更强条目保留，删去重复伸展项。',
    ids: [
      'LAT096-036',
      'LAT096-039',
      'LAT096-040',
      'LAT096-041',
      'LAT096-042',
      'LAT096-043',
      'LAT096-045',
      'LAT096-052',
      'LAT096-061',
      'LAT096-062',
      'LAT096-072',
      'LAT096-104',
      'LAT096-113',
      'LAT096-127',
      'LAT096-138',
      'LAT096-145',
      'LAT096-148',
      'LAT096-153',
      'LAT096-178',
      'LAT096-182',
      'LAT096-224',
      'LAT096-259',
    ],
  },
  {
    reason: '竞选现场、人物攻防或短期话术意味较重，独立思想索引价值偏弱。',
    ids: [
      'LAT096-027',
      'LAT096-028',
      'LAT096-031',
      'LAT096-049',
      'LAT096-051',
      'LAT096-054',
      'LAT096-055',
      'LAT096-063',
      'LAT096-097',
      'LAT096-106',
      'LAT096-130',
      'LAT096-133',
      'LAT096-159',
      'LAT096-176',
      'LAT096-177',
      'LAT096-185',
      'LAT096-209',
      'LAT096-210',
      'LAT096-215',
      'LAT096-223',
      'LAT096-225',
      'LAT096-228',
      'LAT096-229',
      'LAT096-230',
      'LAT096-232',
    ],
  },
  {
    reason: '史料、法令与个案揭弊细节过细，保留能代表方法论或判断原则的条目。',
    ids: [
      'LAT096-024',
      'LAT096-056',
      'LAT096-057',
      'LAT096-060',
      'LAT096-067',
      'LAT096-074',
      'LAT096-089',
      'LAT096-187',
      'LAT096-191',
      'LAT096-193',
      'LAT096-195',
      'LAT096-212',
      'LAT096-216',
      'LAT096-219',
      'LAT096-267',
      'LAT096-268',
      'LAT096-269',
      'LAT096-270',
    ],
  },
  {
    reason: '个人修炼、读书方法或青年劝诫与后文条目重复，保留表述更集中者。',
    ids: [
      'LAT096-009',
      'LAT096-016',
      'LAT096-069',
      'LAT096-080',
      'LAT096-082',
      'LAT096-087',
      'LAT096-093',
      'LAT096-236',
      'LAT096-241',
      'LAT096-242',
      'LAT096-243',
      'LAT096-246',
      'LAT096-254',
    ],
  },
  {
    reason: '局部材料或概念重复，删去后不影响本书思想线索完整性。',
    ids: ['LAT096-172', 'LAT096-181', 'LAT096-204', 'LAT096-206'],
  },
];

const overrides = new Map([
  ['LAT096-005', { title: '政治专业不能交给外行' }],
  ['LAT096-007', { title: '清明判断才能保护安全', category: '政治' }],
  ['LAT096-017', { title: '追问第二命题防止空想' }],
  ['LAT096-030', { title: '高难证据支撑揭发黑暗' }],
  ['LAT096-033', { title: '政见缺实现路径就是空谈' }],
  ['LAT096-038', { title: '谈判技术要抓对方弱点' }],
  ['LAT096-053', { title: '民主政治以人民为主' }],
  ['LAT096-065', { title: '捡战利品会背叛党外理想' }],
  ['LAT096-068', { title: '受难叙事要受文证检验' }],
  ['LAT096-076', { title: '洞察人情也是学问' }],
  ['LAT096-077', { title: '信用要看任内行为' }],
  ['LAT096-079', { title: '好中文以具体表达抽象', category: '写作' }],
  ['LAT096-081', { title: '仕途会腐蚀知识分子' }],
  ['LAT096-085', { title: '追求真理可牺牲一切' }],
  ['LAT096-088', { title: '读书无方法就是浪费' }],
  ['LAT096-091', { title: '自设高标准会反噬' }],
  ['LAT096-095', { title: '第二命题拆穿第一命题' }],
  ['LAT096-098', { title: '主张不是结果' }],
  ['LAT096-100', { title: '检验政见先看前瞻性' }],
  ['LAT096-102', { title: '检验政见还看一致性' }],
  ['LAT096-103', { title: '检验政见终看可行性' }],
  ['LAT096-105', { title: '政见也要看人是否可信' }],
  ['LAT096-109', { title: '一国两制对台湾有利' }],
  ['LAT096-110', { title: '用对方标准谈才有基础' }],
  ['LAT096-122', { title: '福利承诺必须问财源' }],
  ['LAT096-129', { title: '选人看能干不看圣贤' }],
  ['LAT096-135', { title: '受气委屈才给人民自由' }],
  ['LAT096-142', { title: '台湾问题根底是中美问题' }],
  ['LAT096-147', { title: '清高学界也会不守法', category: '法权' }],
  ['LAT096-149', { title: '一国两制提供谈判胜算' }],
  ['LAT096-150', { title: '两岸和谈可省巨额军费' }],
  ['LAT096-152', { title: '独立代价要落到亲人身上' }],
  ['LAT096-157', { title: '政治冷漠有时才是进步' }],
  ['LAT096-162', { title: '选人要查过去作为' }],
  ['LAT096-165', { title: '中文语音打破难学迷思' }],
  ['LAT096-171', { title: '学术机构须守中立分际', category: '法权' }],
  ['LAT096-173', { title: '清高不能掩盖不中立' }],
  ['LAT096-174', { title: '政治人物只能检验不能托付' }],
  ['LAT096-175', { title: '学术权力会打击人才' }],
  ['LAT096-179', { title: '兰屿核废料暴露政府欺骗' }],
  ['LAT096-180', { title: '核废料出路要靠两岸谈判' }],
  ['LAT096-183', { title: '本土自大就是关门皇帝' }],
  ['LAT096-188', { title: '粗糙谎话把听者当傻瓜' }],
  ['LAT096-194', { title: '找史料要动手动脚' }],
  ['LAT096-197', { title: '火爆语言之下是证据' }],
  ['LAT096-200', { title: '谈判要看背景和筹码' }],
  ['LAT096-201', { title: '领导标准在能否做事' }],
  ['LAT096-202', { title: '统治集团限制个人变法' }],
  ['LAT096-203', { title: '一厢情愿改不了集团结构' }],
  ['LAT096-205', { title: '黑金结构不会因个人改变' }],
  ['LAT096-207', { title: '面对二二八不等于炒作族群' }],
  ['LAT096-211', { title: '台湾总统只是地区领导人' }],
  ['LAT096-213', { title: '捏造证据会制造原罪' }],
  ['LAT096-214', { title: '户口资料可校验二二八数字' }],
  ['LAT096-217', { title: '体制名录会抹掉异议者' }],
  ['LAT096-218', { title: '制度文本可拆穿违规' }],
  ['LAT096-220', { title: '假信也能扳倒学术人才' }],
  ['LAT096-221', { title: '清望也会给出错误暗示' }],
  ['LAT096-222', { title: '公文和报告差异可见瞒骗' }],
  ['LAT096-226', { title: '主动孤独换来读书空间' }],
  ['LAT096-227', { title: '监狱斗法也靠资料智慧' }],
  ['LAT096-231', { title: '出门无效的主权只是关门话' }],
  ['LAT096-233', { title: '清流知识分子未必有骨头' }],
  ['LAT096-234', { title: '核废料谈判早被秘密推动' }],
  ['LAT096-235', { title: '道德教条在惨烈处失效' }],
  ['LAT096-238', { title: '错误爱情观制造痛苦' }],
  ['LAT096-240', { title: '自胜才算强' }],
  ['LAT096-244', { title: '自己是自己的主人' }],
  ['LAT096-247', { title: '欲望正常但要有力量表达' }],
  ['LAT096-248', { title: '做坏人也需要头脑' }],
  ['LAT096-255', { title: '慎取比硬读重要' }],
  ['LAT096-256', { title: '写作要用具体替代抽象' }],
  ['LAT096-257', { title: '读书要标记切割分类' }],
  ['LAT096-260', { title: '出狱补偿心理会使色令智昏' }],
  ['LAT096-261', { title: '三不原则经不起现实检验' }],
  ['LAT096-262', { title: '女人看男人更看内在条件' }],
  ['LAT096-264', { title: '男女关系很少真正对等' }],
  ['LAT096-265', { title: '领袖违法会让法律成工具' }],
  ['LAT096-266', { title: '权力违法应向人民道歉' }],
  ['LAT096-271', { title: '竞选承诺要由任后文件验证' }],
  ['LAT096-272', { title: '安全考量不能抹掉市民权益' }],
  ['LAT096-273', { title: '软脚虾市府会欺负百姓' }],
  ['LAT096-274', { title: '食言而肥就是权力谄媚' }],
]);

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(records) {
  const headers = [
    'id',
    'source_id',
    'book',
    'sequence',
    'title',
    'category',
    'description',
    'source_location',
    'source_file',
    'source_path',
    'keywords',
    'round',
    'status',
  ];
  const rows = records.map((record) => headers.map((key) => {
    const value = Array.isArray(record[key]) ? record[key].join(';') : record[key];
    return csvEscape(value);
  }).join(','));
  return `${headers.join(',')}\n${rows.join('\n')}\n`;
}

function toMarkdown(payload) {
  const byCategory = new Map();
  for (const record of payload.records) {
    if (!byCategory.has(record.category)) byCategory.set(record.category, []);
    byCategory.get(record.category).push(record);
  }
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 提取轮：${payload.book.source_count} 条`,
    `- 校对轮：${payload.records.length} 条`,
    `- 删除：${payload.book.dropped_count} 条`,
    '- 说明：description 字段保持原文摘录，校对只做去重、删弱项、题名压缩与分类修正。',
    '',
  ];
  for (const category of categories) {
    const records = byCategory.get(category) ?? [];
    if (records.length === 0) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 原编号：${record.source_id}`);
      lines.push(`- 位置：${record.source_location}`);
      lines.push(`- 关键词：${record.keywords.join('、')}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return records.map((record) => [
    `${record.id}｜${record.category}｜${record.title}`,
    `原编号：${record.source_id}`,
    `位置：${record.source_location}`,
    `关键词：${record.keywords.join('、')}`,
    record.description,
  ].join('\n')).join('\n\n---\n\n') + '\n';
}

function toProofreadNote(payload) {
  const counts = categories
    .map((category) => `- ${category}：${payload.book.category_counts[category] ?? 0}`)
    .join('\n');
  const groups = dropGroups
    .map((group) => `- ${group.reason}（${group.ids.length} 条）：${group.ids.join('、')}`)
    .join('\n');
  return [
    `# ${bookTitle} 校对说明`,
    '',
    `- 提取轮条目：${payload.book.source_count}`,
    `- 校对轮保留：${payload.records.length}`,
    `- 删除条目：${payload.book.dropped_count}`,
    '- 校对原则：不改写 description 原文；压缩标题、修正分类；删除重复论证、竞选现场短期材料、过细法令/史料个案和独立思想性不足的自述。',
    '',
    '## 校对后分类',
    '',
    counts,
    '',
    '## 删除分组',
    '',
    groups,
    '',
  ].join('\n');
}

function buildDropReasons() {
  const reasons = new Map();
  for (const group of dropGroups) {
    for (const id of group.ids) {
      if (reasons.has(id)) {
        throw new Error(`Duplicate drop id: ${id}`);
      }
      reasons.set(id, group.reason);
    }
  }
  return reasons;
}

function countByCategory(records) {
  const counts = Object.fromEntries(categories.map((category) => [category, 0]));
  for (const record of records) {
    counts[record.category] = (counts[record.category] ?? 0) + 1;
  }
  return counts;
}

function normalizeRecord(record, index) {
  const override = overrides.get(record.id) ?? {};
  const next = {
    ...record,
    ...override,
    id: `LAT${sequence}-${String(index + 1).padStart(3, '0')}`,
    source_id: record.id,
    round: '校对轮',
    status: '已校对',
  };
  if (!categories.includes(next.category)) {
    throw new Error(`Invalid category ${next.category} on ${record.id}`);
  }
  return next;
}

const input = JSON.parse(await readFile(inputPath, 'utf8'));
const dropReasons = buildDropReasons();
const inputIds = new Set(input.records.map((record) => record.id));
const missingDropIds = [...dropReasons.keys()].filter((id) => !inputIds.has(id));
if (missingDropIds.length > 0) {
  throw new Error(`Drop ids not found: ${missingDropIds.join(', ')}`);
}
const invalidOverrideIds = [...overrides.keys()].filter((id) => !inputIds.has(id));
if (invalidOverrideIds.length > 0) {
  throw new Error(`Override ids not found: ${invalidOverrideIds.join(', ')}`);
}

const dropped_records = input.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    category: record.category,
    reason: dropReasons.get(record.id),
  }));

const records = input.records
  .filter((record) => !dropReasons.has(record.id))
  .map(normalizeRecord);

const payload = {
  ...input,
  generated_at: new Date().toISOString(),
  book: {
    ...input.book,
    round: '校对轮',
    status: '已校对',
    note: '校对轮保留原文描述，删去重复论证、短期竞选材料和过细个案，并压缩题名、修正分类。',
    source_count: input.records.length,
    record_count: records.length,
    dropped_count: dropped_records.length,
    category_counts: countByCategory(records),
    dropped_records,
  },
  records,
};

await writeFile(path.join(dir, '思想索引-校对轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
await writeFile(path.join(dir, '思想索引-校对轮.csv'), toCsv(records), 'utf8');
await writeFile(path.join(dir, '思想索引-校对轮.md'), toMarkdown(payload), 'utf8');
await writeFile(path.join(dir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
await writeFile(path.join(dir, '思想索引.csv'), toCsv(records), 'utf8');
await writeFile(path.join(dir, '思想索引.txt'), toTxt(records), 'utf8');
await writeFile(path.join(dir, '校对说明.md'), toProofreadNote(payload), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  source_count: input.records.length,
  kept: records.length,
  dropped: dropped_records.length,
  category_counts: payload.book.category_counts,
}, null, 2));
