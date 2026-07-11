import fs from 'node:fs';
import path from 'node:path';

const bookNo = '102';
const bookTitle = '孙逸仙和中国西化医学';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');

const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与相邻民族主义、西化、史料或出版法权条目重复，已由同一论证链中更完整的段落承载',
    ids: [
      'LAT102-003',
      'LAT102-007',
      'LAT102-012',
      'LAT102-013',
      'LAT102-014',
      'LAT102-024',
      'LAT102-025',
      'LAT102-028',
      'LAT102-030',
      'LAT102-050',
      'LAT102-059',
      'LAT102-062',
      'LAT102-087',
      'LAT102-091',
      'LAT102-096',
      'LAT102-107',
      'LAT102-108',
      'LAT102-122',
    ],
  },
  {
    reason: '文学承接、自我说明、单一人物褒评或较弱史实纠错，脱离章节后的独立检索价值较低',
    ids: [
      'LAT102-066',
      'LAT102-067',
      'LAT102-073',
      'LAT102-077',
      'LAT102-082',
      'LAT102-083',
      'LAT102-097',
      'LAT102-118',
      'LAT102-125',
    ],
  },
];

const dropMap = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = {
  'LAT102-001': { title: '民族视野狭窄会缩小中国' },
  'LAT102-002': { title: '中国民族本来就是多源的' },
  'LAT102-004': { title: '传统民族英雄可能只是同族屠夫' },
  'LAT102-005': { title: '异族定义会随历史移动' },
  'LAT102-006': { title: '传统中国误用种族驱逐' },
  'LAT102-008': { title: '推翻满清不等于完成民族主义' },
  'LAT102-009': { title: '真正民族主义要熔成共同民族' },
  'LAT102-010': { title: '狭隘民族观会滑向种族排斥' },
  'LAT102-015': { title: '义和团式排外是伪民族主义' },
  'LAT102-017': { title: '近代生存需要西方制度知识' },
  'LAT102-018': { title: '批评洋务运动也要还原时代' },
  'LAT102-019': { title: '早期文献可以揭示西化起点' },
  'LAT102-020': { title: '直接观察西方才能形成独立见地' },
  'LAT102-021': { title: '只学坚船利炮仍是舍本逐末' },
  'LAT102-022': { title: '救国必须触及西化根本' },
  'LAT102-023': { title: '四千年文明也可能已经不能用' },
  'LAT102-026': { title: '反排外要落实为制度行动' },
  'LAT102-027': { title: '早期西方教育能改变思想格局' },
  'LAT102-029': { title: '思想影响不能只用人物名单衡量' },
  'LAT102-031': { title: '西化是摆脱帝国国民旧习' },
  'LAT102-032': { title: '科学精神反对迷信附会' },
  'LAT102-033': { title: '现代政治必须确认男女平等' },
  'LAT102-034': { title: '共和必须废除世袭身份歧视' },
  'LAT102-035': { title: '政治任用不能照顾亲属私情' },
  'LAT102-036': { title: '公共贡献不该变成邀赏资本' },
  'LAT102-037': { title: '公开谈权利不是政治伪善' },
  'LAT102-038': { title: '言论管制必须具备立法依据' },
  'LAT102-039': { title: '不能借曲解自由来压迫自由' },
  'LAT102-040': { title: '正当政治主张不能依靠暗杀' },
  'LAT102-043': { title: '私权受侵应当诉诸法治抗争' },
  'LAT102-044': { title: '科学新理不能附会古说' },
  'LAT102-045': { title: '实用著作应重内容而非名人品题' },
  'LAT102-046': { title: '不懂专业就应谨慎立言' },
  'LAT102-047': { title: '推荐人才不能受私情牵扯' },
  'LAT102-048': { title: '西医训练能形成终身科学立场' },
  'LAT102-051': { title: '把革命家孔子化会消解革命性' },
  'LAT102-052': { title: '神化人物会复活迷信' },
  'LAT102-053': { title: '创建学说不能凭空捏造引文' },
  'LAT102-054': { title: '反共本身不等于自由民主' },
  'LAT102-055': { title: '曲解人物最终会变成思想八股' },
  'LAT102-056': { title: '革命成功必须先有思想变化' },
  'LAT102-057': { title: '固有文化不能支撑现代建国理论' },
  'LAT102-058': { title: '借名流之言可以抵挡思想帽子' },
  'LAT102-060': { title: '医学史中的人物位置需要专题研究' },
  'LAT102-061': { title: '中国传统医学史首先是巫医史' },
  'LAT102-063': { title: '制度改良没有切断巫医系统' },
  'LAT102-064': { title: '旧医失败推动西医输入' },
  'LAT102-065': { title: '医疗传教促成西医制度输入' },
  'LAT102-068': { title: '摆脱仕绅教育反而可能成为幸运' },
  'LAT102-069': { title: '从传道转向学医仍延续济世精神' },
  'LAT102-070': { title: '不能把后来革命倒灌为最初动机' },
  'LAT102-071': { title: '传统套话容易附会人物动机' },
  'LAT102-072': { title: '当事自述能减少动机猜测' },
  'LAT102-075': { title: '同学回忆也需要校正年代' },
  'LAT102-076': { title: '医疗服务可以为思想传播建立信任' },
  'LAT102-078': { title: '西医教育很早就实践男女同校' },
  'LAT102-079': { title: '新史料可以改写教育史上限' },
  'LAT102-080': { title: '制度名称和实际功能必须分开' },
  'LAT102-081': { title: '旧课本可以重建知识传播史' },
  'LAT102-084': { title: '机构名称必须以史料核准' },
  'LAT102-085': { title: '重要西化思想家也会被时代埋没' },
  'LAT102-086': { title: '新思想常从边缘网络扩散' },
  'LAT102-088': { title: '教育机构的影响可以超出专业' },
  'LAT102-089': { title: '专科学校也能具备大学水准' },
  'LAT102-090': { title: '专业教育必须依靠严格考试' },
  'LAT102-092': { title: '目击原件比转述更有史料价值' },
  'LAT102-093': { title: '双轨叙事才能还原复杂人物' },
  'LAT102-094': { title: '史实名称必须以本证为准' },
  'LAT102-095': { title: '改良失败会推动革命选择' },
  'LAT102-098': { title: '细节丰富的传说仍可能失实' },
  'LAT102-099': { title: '人物早期立场不能被后来身份覆盖' },
  'LAT102-100': { title: '革命宣传不能制造天生革命家' },
  'LAT102-102': { title: '改造维新也可以具有革命意义' },
  'LAT102-103': { title: '革命家也可以是改良家' },
  'LAT102-105': { title: '进化误译会损害演化原义' },
  'LAT102-109': { title: '思想转折可能伴随双重放弃' },
  'LAT102-110': { title: '新制度可以借助自愿服务推广' },
  'LAT102-111': { title: '原始广告可以保存时代细节' },
  'LAT102-112': { title: '革命选择可能逆转个人经济地位' },
  'LAT102-113': { title: '医人和医世构成职业分野' },
  'LAT102-114': { title: '拒绝治疗也要承担现实代价' },
  'LAT102-116': { title: '宗教信仰可以坚持政教分立' },
  'LAT102-119': { title: '出版预审不能伪装成双方约定' },
  'LAT102-121': { title: '立法者也必须服从自己制定的法律' },
  'LAT102-124': { title: '专业能力不能代替法政常识' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'))
    .map(([category, count]) => ({ category, count }));
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(records) {
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
  const lines = [headers.join(',')];
  for (const record of records) {
    lines.push(headers.map((header) => {
      const value = Array.isArray(record[header]) ? record[header].join(';') : record[header];
      return csvEscape(value);
    }).join(','));
  }
  return `${lines.join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 原始条目：${input.records.length}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${dropMap.size}`,
    '',
  ];
  let currentCategory = '';
  for (const record of records) {
    if (record.category !== currentCategory) {
      currentCategory = record.category;
      lines.push(`## ${currentCategory}`, '');
    }
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
    lines.push(`出处：${record.source_file}#${record.source_paragraph}`);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => (
    `${record.id}｜${record.category}｜${record.title}\n${record.description}\n出处：${record.source_file}#${record.source_paragraph}`
  )).join('\n\n')}\n`;
}

function normalizeRecords(records) {
  let sequence = 1;
  return records
    .filter((record) => !dropMap.has(record.id))
    .map((record) => {
      const override = overrides[record.id] || {};
      return {
        ...record,
        round: '校对轮',
        status: '已校对',
        source_id: record.id,
        id: `LAT102-${String(sequence++).padStart(3, '0')}`,
        title: override.title || record.title,
        category: override.category || record.category,
      };
    });
}

function assertUnique(records, key) {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record[key])) {
      throw new Error(`Duplicate ${key}: ${record[key]}`);
    }
    seen.add(record[key]);
  }
}

const inputIds = new Set(input.records.map((record) => record.id));
const missingDropIds = [...dropMap.keys()].filter((id) => !inputIds.has(id));
if (missingDropIds.length) {
  throw new Error(`Drop ids not found: ${missingDropIds.join(', ')}`);
}
const missingOverrideIds = Object.keys(overrides).filter((id) => !inputIds.has(id));
if (missingOverrideIds.length) {
  throw new Error(`Override ids not found: ${missingOverrideIds.join(', ')}`);
}

const records = normalizeRecords(input.records);
if (records.length !== 98) {
  throw new Error(`Expected 98 retained records, found ${records.length}`);
}
assertUnique(records, 'title');
assertUnique(records, 'description');
assertUnique(records, 'source_id');

const sourceById = new Map(input.records.map((record) => [record.id, record]));
for (const record of records) {
  if (record.description !== sourceById.get(record.source_id)?.description) {
    throw new Error(`Description changed for ${record.source_id}`);
  }
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖本人可独立检索的民族史判断、西化评价、史料方法、医学史解释、政治分析、法权主张与写作原则；删去相邻结论重复、论证过渡、自我说明、单一人物褒评和被更完整段落覆盖的史实纠错。description 字段未改写，仍保留提取轮原文。';
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
  `# ${bookTitle} 校对说明`,
  '',
  `- 输入：思想索引-提取轮.json（${input.records.length} 条）`,
  `- 输出：思想索引-校对轮.json / csv / md（${records.length} 条）`,
  `- 删除：${dropMap.size} 条`,
  '- 同步：思想索引.json / csv / txt 已更新为校对轮版本',
  '',
  '## 删除原则',
  '',
  ...dropGroups.map((group) => `- ${group.reason}：${group.ids.join('、')}`),
  '',
  '## 保留原则',
  '',
  '- 保留李敖本人的民族史判断、西化评价、史料方法、医学史解释、政治分析、法权主张和写作原则。',
  '- 民族主义十项结论与三十二项洋派作风按独立思想单元收敛，不逐项保留相似例证。',
  '- 孙中山演说、政令、书信和他人回忆，只在李敖明确评价、反驳或归纳的完整段落中随文保留。',
  '- 改良转革命与出版预审的连续论证，优先保留法理、因果和史料方法表达完整的段落。',
  '- 标题只做压缩和辨识度修订；description 不改写原文。',
  '',
  '## 分类统计',
  '',
  ...counts.map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '校对说明.md'), proofreadNote, 'utf8');

console.log(JSON.stringify({
  book: `${bookNo}.${bookTitle}`,
  source: input.records.length,
  dropped: dropMap.size,
  retained: records.length,
  categories: counts,
}, null, 2));
