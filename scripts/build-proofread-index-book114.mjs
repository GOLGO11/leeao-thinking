import fs from 'node:fs';
import path from 'node:path';

const bookNo = '114';
const bookTitle = '蒋介石研究';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的自述互勘、日期换算、名单反证、宣传控制、政治承诺或权力依附判断同义复现',
    ids: [
      'LAT114-009', 'LAT114-017', 'LAT114-019', 'LAT114-025', 'LAT114-027',
      'LAT114-030', 'LAT114-033', 'LAT114-036', 'LAT114-037', 'LAT114-040',
      'LAT114-041', 'LAT114-042', 'LAT114-056', 'LAT114-065', 'LAT114-068',
      'LAT114-072', 'LAT114-073', 'LAT114-074', 'LAT114-087', 'LAT114-093',
      'LAT114-095', 'LAT114-096', 'LAT114-100', 'LAT114-103', 'LAT114-105',
      'LAT114-118', 'LAT114-119', 'LAT114-121', 'LAT114-124', 'LAT114-132',
    ],
  },
  {
    reason: '主要是单一引文的局部纠错、证据链中的过渡步骤或只对具体人物事件成立的应用细节',
    ids: [
      'LAT114-013', 'LAT114-045', 'LAT114-050', 'LAT114-052', 'LAT114-060',
      'LAT114-062', 'LAT114-076', 'LAT114-079', 'LAT114-085', 'LAT114-086',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT114-005': { title: '照片可以推翻文字神话' },
  'LAT114-007': { title: '钦定履历会成为宣传模板' },
  'LAT114-010': { title: '语意暗示可以制造错误印象' },
  'LAT114-011': { title: '制度牵连可以制造学历联想' },
  'LAT114-015': { title: '历史术语须按制度固定定义' },
  'LAT114-016': { title: '教育阶段须按制度顺序区分' },
  'LAT114-018': { title: '组织成立时间须由同期记录确认' },
  'LAT114-020': { title: '成员名单交叉汇总可以检验身份' },
  'LAT114-021': { title: '加入时间可以判断是否为创始者' },
  'LAT114-026': { title: '官方传记应视为权力自述' },
  'LAT114-028': { title: '虚构学历会污染其他历史叙事' },
  'LAT114-031': { title: '同一著作前后矛盾会削弱可信度' },
  'LAT114-034': { title: '跨时期自述可以揭露矛盾' },
  'LAT114-038': { title: '本人自述可以确定首次会见时间' },
  'LAT114-043': { title: '持续天数和名单能校正共患难神话' },
  'LAT114-044': { title: '历史叙事不应抹杀更早承担风险者' },
  'LAT114-046': { title: '时间排比可以发现持续行为模式' },
  'LAT114-047': { title: '传统解释须接受情理检验' },
  'LAT114-049': { title: '实地调查可以验证历史推论' },
  'LAT114-051': { title: '篡夺革命会清除革命同志' },
  'LAT114-053': { title: '传记空白可能是在隐藏迫害' },
  'LAT114-055': { title: '党内第一手控诉可以补足官方历史' },
  'LAT114-057': { title: '公开文献沉默可能掩盖秘密权力' },
  'LAT114-058': { title: '秘密讲话可以还原统治者制度观' },
  'LAT114-063': { title: '人物言行须与自称标准对照' },
  'LAT114-064': { title: '政治人物会对不同对象重复套话' },
  'LAT114-066': { title: '御用传记夹缝也可能保存反证' },
  'LAT114-067': { title: '中英文版本对读可以确认隐藏事实' },
  'LAT114-069': { title: '外国作者的判断仍须本地史料校正' },
  'LAT114-070': { title: '名义职权和实际控制须严格区分' },
  'LAT114-075': { title: '私人权力不能凌驾代总统职权' },
  'LAT114-077': { title: '交出总统职务后不再拥有总统权力' },
  'LAT114-078': { title: '公开引退与幕后控制可以互证' },
  'LAT114-080': { title: '评价政策须同时计算获益和失去' },
  'LAT114-081': { title: '回忆录和未公开文件合读可以补真相' },
  'LAT114-083': { title: '秘密文件可以揭穿采访布置' },
  'LAT114-084': { title: '幕后指示可以证明宣传是有意表演' },
  'LAT114-088': { title: '多份自述合读才能完整确定责任' },
  'LAT114-089': { title: '政治承诺应按时间顺序排比' },
  'LAT114-090': { title: '明确期限的承诺必须接受兑现检验' },
  'LAT114-092': { title: '军事承诺的逻辑须符合军事常识' },
  'LAT114-094': { title: '列表可以呈现政治承诺的变化' },
  'LAT114-097': { title: '政治预言可以由事后日期验证' },
  'LAT114-098': { title: '相信政治时间表前须调查信用' },
  'LAT114-101': { title: '法律与宪法抵触时以宪法为准' },
  'LAT114-102': { title: '长期使用例外理由会架空宪政' },
  'LAT114-106': { title: '自称领袖和训词暴露帝王心态' },
  'LAT114-108': { title: '政治附庸风雅会扰乱学术' },
  'LAT114-110': { title: '知识分子投靠权力会失去独立' },
  'LAT114-112': { title: '权力可以用亲疏安排操纵知识分子' },
  'LAT114-115': { title: '临时条款不能绕过总统任期' },
  'LAT114-120': { title: '宗教自述须与长期行为对照' },
  'LAT114-123': { title: '生育时间可以反证官方行程' },
  'LAT114-125': { title: '史料矛盾值得继续查证' },
  'LAT114-126': { title: '家族实践可能违反正统文化' },
  'LAT114-127': { title: '经典禁令可以反证民俗普遍' },
  'LAT114-129': { title: '继承制度须区分大宗和小宗' },
  'LAT114-130': { title: '传统制度判断须同时满足多项规则' },
  'LAT114-131': { title: '后代行为可以检验形式过继' },
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
      id: `LAT114-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

if (dropMap.size !== 40 || records.length !== 92) {
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
const proofreadSummary = '校对轮保留李敖可独立检索的来源批评、照片名册、日期制度、自述互勘、政治承诺、宪法程序、宣传控制及知识分子人格判断；删除同义证明步骤、局部纠错和只对单一人物事件成立的应用细节。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留照片、完整名册、官方年表、内部传记、跨时期自述、中英版本、秘密文件与日记时间线等不同来源批评方法。',
  '- 保留时间排比、年龄换算、制度定义、行动占比、列表验证、外部行程与后代行为等不同校勘路径。',
  '- 保留名义职权、总统复职、任期限制、公帑使用、宪法优位与私人权力边界等法权判断。',
  '- 保留个人崇拜、采访控制、宣传表演、革命同志清除、政治承诺失信及独裁权力结构等政治判断。',
  '- 保留反暴君人格、证据写史、知识分子独立、死后褒扬与生前迫害等人格判断。',
  '- 提取轮已跳过的《胡适与我》同文条目继续不重复收入。',
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
  categories: counts,
}, null, 2));
