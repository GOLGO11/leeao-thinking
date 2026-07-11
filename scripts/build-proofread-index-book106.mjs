import fs from 'node:fs';
import path from 'node:path';

const bookNo = '106';
const bookTitle = '郑南榕研究';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与相邻的历史方法、言论自由、论战证据、司法回避、政治污染、烈士意义或身份政治论证重复，已由同一论证链中更完整的段落承载',
    ids: [
      'LAT106-008', 'LAT106-014', 'LAT106-020', 'LAT106-022', 'LAT106-026',
      'LAT106-031', 'LAT106-035', 'LAT106-039', 'LAT106-040', 'LAT106-047',
      'LAT106-061', 'LAT106-064', 'LAT106-067', 'LAT106-072', 'LAT106-075',
      'LAT106-076', 'LAT106-079', 'LAT106-081', 'LAT106-089', 'LAT106-091',
      'LAT106-092', 'LAT106-096', 'LAT106-097', 'LAT106-098', 'LAT106-106',
      'LAT106-111', 'LAT106-112', 'LAT106-116', 'LAT106-118', 'LAT106-120',
      'LAT106-124', 'LAT106-125', 'LAT106-130', 'LAT106-138', 'LAT106-139',
      'LAT106-142', 'LAT106-158', 'LAT106-161',
    ],
  },
  {
    reason: '主要是悼亡抒情、自我功劳、人物褒贬、行动轶事或上下文依赖过强的具体叙述，脱离章节后的独立思想价值不足',
    ids: [
      'LAT106-001', 'LAT106-011', 'LAT106-025', 'LAT106-033', 'LAT106-049',
      'LAT106-056', 'LAT106-057', 'LAT106-077', 'LAT106-085', 'LAT106-099',
      'LAT106-128', 'LAT106-133', 'LAT106-136', 'LAT106-147', 'LAT106-150',
      'LAT106-152', 'LAT106-155', 'LAT106-156', 'LAT106-164', 'LAT106-165',
      'LAT106-166', 'LAT106-167',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT106-004': { title: '知识范围狭窄会限制政治判断' },
  'LAT106-006': { title: '优异必须是全面表现而非单点表现' },
  'LAT106-009': { title: '抵制必须先由行动者以身作则' },
  'LAT106-010': { title: '草率组党会给党外巨头独裁机会' },
  'LAT106-012': { title: '岛屿处境容易强化狭窄地域意识' },
  'LAT106-013': { title: '比较岛屿意识必须考察大陆关系' },
  'LAT106-015': { title: '地域意识沦为政治工具就会失去是非' },
  'LAT106-016': { title: '政治动员不应牺牲语言进步原则' },
  'LAT106-017': { title: '多份周刊轮流出版可以突破言论钳制' },
  'LAT106-018': { title: '党外刊物不能为销量追逐官方新闻' },
  'LAT106-019': { title: '政治报道必须让理论配合事实' },
  'LAT106-021': { title: '理解政党不能让现在掩盖过去' },
  'LAT106-024': { title: '历史包袱深的社会尤其需要历史方法' },
  'LAT106-027': { title: '比较人物必须限定时代和范围' },
  'LAT106-032': { title: '有勇气认错才是强者' },
  'LAT106-034': { title: '文章气势离不开人格力量' },
  'LAT106-036': { title: '没有持久生命力就成不了好作家' },
  'LAT106-037': { title: '性不应被变成无意义的禁忌' },
  'LAT106-038': { title: '男女关系本应单纯快乐' },
  'LAT106-041': { title: '选举期间也不能用契约拘束言论' },
  'LAT106-042': { title: '言论自由是优先自由' },
  'LAT106-043': { title: '民主程序无权剥夺言论自由' },
  'LAT106-045': { title: '法律无责不等于挂名者没有道义责任' },
  'LAT106-046': { title: '批判正确也不能忽略更早史源' },
  'LAT106-050': { title: '人的评价不能随利用价值翻转' },
  'LAT106-051': { title: '承诺必须接受行动检验' },
  'LAT106-052': { title: '依赖第三势力仲裁是战略错误' },
  'LAT106-053': { title: '由旁观辩护转为亲身承担才是真转变' },
  'LAT106-054': { title: '权位会使理想主义者滑向变节' },
  'LAT106-055': { title: '公开指控别人也必须面对自己的行径' },
  'LAT106-058': { title: '前科制度持续追逼会阻断从良' },
  'LAT106-059': { title: '党化教育会把政治谋杀包装成爱国' },
  'LAT106-060': { title: '国家指定叛徒会为私人暴力提供目标' },
  'LAT106-062': { title: '政权会牺牲为它效命的人' },
  'LAT106-063': { title: '公开危险真相不能等待绝对安全' },
  'LAT106-065': { title: '有真实内容就不怕空洞攻击' },
  'LAT106-066': { title: '超越敌我才能判断文章好坏' },
  'LAT106-068': { title: '靠打倒别人壮大自己是自卑反射' },
  'LAT106-069': { title: '赞成批评不等于容忍失实攻击' },
  'LAT106-070': { title: '新材料必须带来新的历史解释' },
  'LAT106-071': { title: '断章取义会伪造历史面目' },
  'LAT106-073': { title: '报道必须通过真实检验' },
  'LAT106-074': { title: '刑罚判断必须区分法定刑和宣告刑' },
  'LAT106-078': { title: '是非应优先于交情和利害' },
  'LAT106-082': { title: '辨明是非不能被要求做乡愿' },
  'LAT106-083': { title: '权力会用多重环节阻断杂志传播' },
  'LAT106-084': { title: '备用刊名可以突破停刊封锁' },
  'LAT106-086': { title: '争取百分之百自由必须承担后果' },
  'LAT106-087': { title: '没有普及性的言论自由仍不完整' },
  'LAT106-088': { title: '没有长期积累的反对者容易投机' },
  'LAT106-093': { title: '理想行动同样需要经营能力' },
  'LAT106-095': { title: '准备牺牲不是主动求死' },
  'LAT106-101': { title: '被申请回避的法官不得参与裁定' },
  'LAT106-102': { title: '把政治问题交给司法会扭曲审判' },
  'LAT106-103': { title: '情治人员大量进入司法会危及小民' },
  'LAT106-104': { title: '讯问被告必须采取恳切态度' },
  'LAT106-105': { title: '公开党派敌意足以产生偏颇之虞' },
  'LAT106-108': { title: '绝食抗争必须先判断敌人的相对条件' },
  'LAT106-110': { title: '保存自己才能继续实现理想' },
  'LAT106-115': { title: '政治行动应按个人长处分工' },
  'LAT106-119': { title: '争取言论自由也要保有容纳异议的心胸' },
  'LAT106-127': { title: '超前者必须承受长期孤独' },
  'LAT106-129': { title: '不要为梦幻的理想牺牲' },
  'LAT106-131': { title: '政治指控必须先通过常识检验' },
  'LAT106-132': { title: '对立阵营都会为政治目的歪曲死者' },
  'LAT106-134': { title: '受排斥的身份可能推动过度证明' },
  'LAT106-135': { title: '不当鼓掌会把理想主义者逼向极端' },
  'LAT106-137': { title: '表面死因只是抽象理想的具体依托' },
  'LAT106-140': { title: '牺牲本身可能比表面死因更重要' },
  'LAT106-141': { title: '籍贯会随政治成败被重新解释' },
  'LAT106-144': { title: '死者容易被政客转化成政治资源' },
  'LAT106-145': { title: '烈士的意义首先在烈士本人' },
  'LAT106-146': { title: '牺牲有时恰能证明此路不通' },
  'LAT106-151': { title: '维护自由民主不等于赞成国家分离' },
  'LAT106-153': { title: '相同牺牲可能服务相反目标' },
  'LAT106-159': { title: '没有证据不能对重大指控下断语' },
  'LAT106-160': { title: '来稿太晚不能免除编辑的查证责任' },
  'LAT106-162': { title: '涉及死者名誉的报道尤其必须查证' },
  'LAT106-163': { title: '勾连情报机关会把报道变成抹黑工具' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) counts.set(record.category, (counts.get(record.category) || 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'))
    .map(([category, count]) => ({ category, count }));
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(records) {
  const headers = ['id', 'source_id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  return `${[
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
      id: `LAT106-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 107) throw new Error(`Expected 107 retained records, found ${records.length}`);
for (const key of ['title', 'description', 'source_id']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${key}`);
}
const sourceById = new Map(input.records.map((record) => [record.id, record]));
for (const record of records) {
  if (record.description !== sourceById.get(record.source_id)?.description) {
    throw new Error(`Description changed for ${record.source_id}`);
  }
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖本人可独立检索的言论自由原则、历史方法、论战证据、司法批判、政治伦理、知识分子人格、身份政治分析和情爱观点；删去相邻论证中的重复台阶、郑南榕人物赞语、悼亡修辞、自我功劳、行动轶事及跨篇重复结论。description 字段未改写，仍保留提取轮原文。';
const book = {
  ...input.book,
  round: '校对轮',
  status: '已校对',
  note: proofreadSummary,
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
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
  proofread_at: new Date().toISOString(),
  dropped_records: [...dropMap.entries()].map(([id, reason]) => ({
    id,
    reason,
    title: input.records.find((record) => record.id === id)?.title || '',
  })),
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
  '- 保留李敖本人可独立检索的言论自由原则、历史方法、论战证据、司法批判、政治伦理、知识分子人格、身份政治分析和情爱观点。',
  '- 郑南榕文章、郑南榕旧信、小董自白、新闻材料、司法文书、受访者证词和叶菊兰口述，仍只在李敖明确评价、反驳或归纳的完整段落中随文保留。',
  '- 言论自由部分保留优先自由、多数程序边界、政治活动风险和传播普及性等不同层次，不逐篇保留重复结论。',
  '- 自焚与烈士部分保留常识检验、政治利用、牺牲条件和抽象理想等分析，删去纯悼亡修辞和人物赞颂。',
  '- 提取轮确认的三条跨册整段重复继续保持零重复入选。',
  '- 分类继续固定为八个原子分类，没有为本书增加复合分类。',
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
