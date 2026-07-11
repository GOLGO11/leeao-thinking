import fs from 'node:fs';
import path from 'node:path';

const bookNo = '116';
const bookTitle = '蒋介石研究三集';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的抗命、越级指挥、战略失败、主和史实、领袖苛细或父权依附判断同义复现',
    ids: [
      'LAT116-014', 'LAT116-016', 'LAT116-018', 'LAT116-022', 'LAT116-031',
      'LAT116-033', 'LAT116-034', 'LAT116-037', 'LAT116-044', 'LAT116-049',
      'LAT116-059', 'LAT116-066', 'LAT116-074', 'LAT116-078', 'LAT116-089',
      'LAT116-092', 'LAT116-095', 'LAT116-104', 'LAT116-105', 'LAT116-112',
    ],
  },
  {
    reason: '主要是引文前的过渡句、名单或旁证步骤、单一史实铺垫，尚不足以独立构成思想索引',
    ids: [
      'LAT116-002', 'LAT116-011', 'LAT116-041', 'LAT116-053', 'LAT116-062',
      'LAT116-076', 'LAT116-080', 'LAT116-081', 'LAT116-096', 'LAT116-101',
      'LAT116-110',
    ],
  },
  {
    reason: '标题把戏谑、转述或单一轶事扩大成一般原则，原段不足以支持该层级的概括',
    ids: ['LAT116-075', 'LAT116-079', 'LAT116-109'],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT116-001': { title: '同书异禁暴露审查尺度不一' },
  'LAT116-003': { title: '冷门出版物可能保存关键证据' },
  'LAT116-004': { title: '版本对读可以辨认文字底本' },
  'LAT116-006': { title: '互异记述也可能共认真凶' },
  'LAT116-007': { title: '政治暗杀必须追问知情责任' },
  'LAT116-008': { title: '行动事实可以推翻事后辩解' },
  'LAT116-010': { title: '官方叙述会遮蔽早期密码情报' },
  'LAT116-012': { title: '证据可以拆穿天纵英明神话' },
  'LAT116-013': { title: '表面战史会掩盖巧妙抗命' },
  'LAT116-017': { title: '一味退让不能阻止侵略扩大' },
  'LAT116-019': { title: '口头支持不能免除不增援责任' },
  'LAT116-020': { title: '参战后仍可能孤立异己部队' },
  'LAT116-021': { title: '自主抵抗可以推翻失败主义' },
  'LAT116-023': { title: '内部矛盾可以拆穿统帅自辩' },
  'LAT116-025': { title: '排比史料可以揭穿军事神话' },
  'LAT116-026': { title: '速胜计划可能重演旧错' },
  'LAT116-028': { title: '实际战局可以检验既定计划' },
  'LAT116-029': { title: '个人意志主导错误战场须负责任' },
  'LAT116-030': { title: '越级指挥会放大战略错误' },
  'LAT116-032': { title: '直接听命会架空组织层级' },
  'LAT116-035': { title: '颂扬亲自指挥反会暴露乱源' },
  'LAT116-036': { title: '个人受辱可能驱动军事冒险' },
  'LAT116-038': { title: '不了解工事和武器就开战是轻率' },
  'LAT116-039': { title: '军事空话不能掩盖惨重代价' },
  'LAT116-042': { title: '采纳顾问意见不能卸除决策责任' },
  'LAT116-043': { title: '牵制敌军可能反被敌军牵制' },
  'LAT116-045': { title: '禁书秘本可能保存独到见解' },
  'LAT116-046': { title: '战争判断应放进世界战略因果' },
  'LAT116-047': { title: '当事人承认可反证战略神话' },
  'LAT116-048': { title: '另一战场的牵制会造成对外软弱' },
  'LAT116-050': { title: '替他国承受战争可能遭盟友出卖' },
  'LAT116-052': { title: '作战撤退失败都须追究统帅' },
  'LAT116-054': { title: '士兵惨状会揭穿领袖丰功叙事' },
  'LAT116-055': { title: '官方主战主和二分可能颠倒事实' },
  'LAT116-056': { title: '政治领袖会让他人承担恶名' },
  'LAT116-057': { title: '权力者会占美名并转嫁恶名' },
  'LAT116-058': { title: '安外攘内会扭曲主战主和名实', category: '政治' },
  'LAT116-061': { title: '谈判求和不能被先验判错' },
  'LAT116-063': { title: '有力阻止出走却不行动就须负责' },
  'LAT116-065': { title: '外交条件对比可以辨认真正主和者' },
  'LAT116-069': { title: '权力者会垄断接敌并给他人定罪' },
  'LAT116-070': { title: '抗战名声可能来自谈判未果' },
  'LAT116-071': { title: '敌对材料也可能反证作者结论' },
  'LAT116-072': { title: '亲密关系可能影响外交活动' },
  'LAT116-073': { title: '行程时间可以检验政治秘闻' },
  'LAT116-077': { title: '领袖窃取部属私物有失体统' },
  'LAT116-082': { title: '被俘必死观源于混杂意识形态' },
  'LAT116-086': { title: '守住道德底线就可以求生' },
  'LAT116-090': { title: '互不救援反映整体指挥文化' },
  'LAT116-091': { title: '公开恕词可能掩饰永久排斥' },
  'LAT116-093': { title: '幸存者留下证言能赋予余生价值' },
  'LAT116-094': { title: '领袖会向不同集团展示不同角色' },
  'LAT116-097': { title: '领袖会操控民意机关投票', category: '政治' },
  'LAT116-098': { title: '不从众能够体现独立人格' },
  'LAT116-106': { title: '纪念母亲也可成为自我宣传' },
  'LAT116-111': { title: '书面歌词可反推领袖不会唱国歌' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) counts.set(record.category, (counts.get(record.category) || 0) + 1);
  return input.taxonomy.map((category) => ({ category, count: counts.get(category) || 0 }))
    .filter(({ count }) => count > 0);
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(records) {
  const headers = ['id', 'source_id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  return `\uFEFF${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(
      Array.isArray(record[header]) ? record[header].join(';') : record[header],
    )).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`, '',
    `- 原始条目：${input.records.length}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${dropMap.size}`, '',
  ];
  let currentCategory = '';
  for (const record of records) {
    if (record.category !== currentCategory) {
      currentCategory = record.category;
      lines.push(`## ${currentCategory}`, '');
    }
    lines.push(`### ${record.id} ${record.title}`, '', record.description, '', `出处：${record.source_file}#${record.source_paragraph}`, '');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => (
    `${record.id}｜${record.category}｜${record.title}\n${record.description}\n出处：${record.source_file}#${record.source_paragraph}`
  )).join('\n\n')}\n`;
}

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of dropMap.keys()) {
  if (!inputIds.has(id)) throw new Error(`Unknown dropped id: ${id}`);
}
for (const id of Object.keys(overrides)) {
  if (!inputIds.has(id)) throw new Error(`Unknown override id: ${id}`);
  if (dropMap.has(id)) throw new Error(`Dropped id also has override: ${id}`);
}

let sequence = 1;
const records = input.records
  .filter((record) => !dropMap.has(record.id))
  .map((record) => {
    const override = overrides[record.id] || {};
    return {
      ...record,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
      id: `LAT116-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

if (dropMap.size !== 34 || records.length !== 79) {
  throw new Error(`Proofread count mismatch: dropped=${dropMap.size}, retained=${records.length}`);
}
for (const key of ['title', 'description']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${key}`);
}
for (const record of records) {
  const source = input.records.find((item) => item.id === record.source_id);
  if (!source || record.description !== source.description) throw new Error(`Description changed: ${record.id}`);
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖可独立检索的审查尺度、版本校勘、政治暗杀、军事责任、战略检验、主战主和、忠诚伦理、个人生死自主、权力人格、亲密关系及领袖崇拜判断；删除同义证据链、引文过渡、单一史实铺垫和标题泛化过度的轶事。description 字段未改写，仍保留提取轮原文。';
const book = {
  ...input.book,
  round: '校对轮',
  status: '已校对',
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
  note: proofreadSummary,
  proofread_at: new Date().toISOString(),
  dropped_records: [...dropMap.entries()].map(([id, reason]) => ({
    id,
    reason,
    title: input.records.find((record) => record.id === id)?.title || '',
  })),
};
const payload = {
  ...input,
  book,
  round: '校对轮',
  status: '已校对',
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
  note: proofreadSummary,
  proofread_at: book.proofread_at,
  dropped_records: book.dropped_records,
  records,
};

fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.md'), toMarkdown(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.txt'), toTxt(records), 'utf8');

const proofreadNote = [
  `# ${bookTitle} 校对说明`, '',
  `- 输入：思想索引-提取轮.json（${input.records.length} 条）`,
  `- 输出：思想索引-校对轮.json / csv / md（${records.length} 条）`,
  `- 删除：${dropMap.size} 条`,
  '- 同步：思想索引.json / csv / txt 已更新为校对轮版本', '',
  '## 删除原则', '',
  ...dropGroups.map((group) => `- ${group.reason}：${group.ids.join('、')}`), '',
  '## 保留原则', '',
  '- 保留版本对读、冷门出版物、官方汇编、当事人承认、敌对材料反证与时间线等彼此独立的史料批评路径。',
  '- 保留军事决策、越级指挥、增援责任、顾问意见、战场牵制与国际战略后果等政治判断。',
  '- 保留被俘、求生、殉节、双重标准和个人自由意志组成的完整忠诚伦理论述。',
  '- 保留亲密关系影响外交的情爱条目，并保留其时间线检验方法；删除重复的性魅力结论和戏谑推演。',
  '- 提取轮已跳过的四条跨书同文继续不重复收入。',
  '- 分类继续固定为八个原子分类，没有新增复合分类。',
  '- 标题只做压缩、纠偏和辨识度修订；description 不改写原文。', '',
  '## 分类统计', '',
  ...counts.map(({ category, count }) => `- ${category}：${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '校对说明.md'), proofreadNote, 'utf8');

console.log(JSON.stringify({
  book: `${bookNo}.${bookTitle}`,
  source: input.records.length,
  dropped: dropMap.size,
  retained: records.length,
  category_counts: counts,
}, null, 2));
