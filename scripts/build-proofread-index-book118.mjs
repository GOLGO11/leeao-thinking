import fs from 'node:fs';
import path from 'node:path';

const bookNo = '118';
const bookTitle = '蒋介石研究五集';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的宣传辨伪、责任归属、张学良评价、花园口决堤、废约时序、蒙古责任、战犯放水或烈士制造判断同义复现',
    ids: [
      'LAT118-001', 'LAT118-006', 'LAT118-010', 'LAT118-015', 'LAT118-017',
      'LAT118-022', 'LAT118-026', 'LAT118-028', 'LAT118-031', 'LAT118-032',
      'LAT118-036', 'LAT118-040', 'LAT118-042', 'LAT118-049', 'LAT118-052',
      'LAT118-053', 'LAT118-054', 'LAT118-055', 'LAT118-056', 'LAT118-057',
      'LAT118-058', 'LAT118-062', 'LAT118-063', 'LAT118-067', 'LAT118-071',
      'LAT118-073', 'LAT118-076', 'LAT118-079', 'LAT118-081', 'LAT118-083',
      'LAT118-086', 'LAT118-088', 'LAT118-095', 'LAT118-098', 'LAT118-099',
      'LAT118-100', 'LAT118-107', 'LAT118-111', 'LAT118-119', 'LAT118-124',
      'LAT118-131', 'LAT118-137', 'LAT118-138', 'LAT118-143',
    ],
  },
  {
    reason: '主要是引文前的过渡、篇章进度说明、单一背景铺垫或被引材料占比过高，尚不足以独立构成思想索引',
    ids: [
      'LAT118-082', 'LAT118-084', 'LAT118-104', 'LAT118-112', 'LAT118-113',
    ],
  },
  {
    reason: '段落以猜测被删姓名为主，证据不足以支持关于日记预期读者的稳定判断',
    ids: ['LAT118-145'],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT118-002': { title: '行政密函可以追究妨害自由责任' },
  'LAT118-003': { title: '以出版回应言论钳制' },
  'LAT118-004': { title: '历史措辞会制造唯一参与者假象' },
  'LAT118-007': { title: '突出一人不该抹杀其他参与者', category: '写作' },
  'LAT118-008': { title: '新传记也会继续捏造历史' },
  'LAT118-009': { title: '权力改写革命史有固定套路' },
  'LAT118-011': { title: '高压会使知情者不敢为史实辩护' },
  'LAT118-013': { title: '名义指挥不能遮蔽实际遥控责任' },
  'LAT118-014': { title: '不能用自己也做不到的部署苛责他人' },
  'LAT118-016': { title: '官方叙事会把嫡系失误转嫁给异己' },
  'LAT118-019': { title: '失败政党常把败因推给他人' },
  'LAT118-020': { title: '事件后果不能代替真实因果' },
  'LAT118-021': { title: '矛盾的官方记载可以反证宣传' },
  'LAT118-023': { title: '公开反共不妨碍秘密接触' },
  'LAT118-024': { title: '家乡沦陷者不愿继续内战并非无理', category: '政治' },
  'LAT118-025': { title: '接触时间表可以检验合作起点' },
  'LAT118-027': { title: '事后震惊可以反证事前合谋' },
  'LAT118-029': { title: '不知双方密谈使中间人成为天真者' },
  'LAT118-033': { title: '主动接触方应由往来证据确认' },
  'LAT118-034': { title: '事变前谈妥合作不能归功于事变' },
  'LAT118-035': { title: '挪动史实日期是一种曲笔' },
  'LAT118-037': { title: '历史解释不能违背基本常识' },
  'LAT118-038': { title: '结论不能与引用材料相反' },
  'LAT118-039': { title: '历史研究不能曲解史料迎合权力' },
  'LAT118-041': { title: '把共同责任全推给一人是政治陷害', category: '政治' },
  'LAT118-044': { title: '传播敌方谣言会暴露双重标准' },
  'LAT118-046': { title: '当事证据无法公开会固化替罪叙事' },
  'LAT118-047': { title: '迟出证据可以洗刷旧日谣言' },
  'LAT118-050': { title: '为知名度沉默可能牺牲他人名誉' },
  'LAT118-051': { title: '当事回忆可以拆穿替亲属贴金' },
  'LAT118-059': { title: '多点对照会显出英雄化叙事失真' },
  'LAT118-060': { title: '领袖核定的战史应由领袖负责' },
  'LAT118-061': { title: '让敌人炸堤阻挡自己违反常识' },
  'LAT118-064': { title: '宣传会把平民灾难写成轻微代价' },
  'LAT118-066': { title: '巨大民众代价不能由短暂备战辩护' },
  'LAT118-068': { title: '冲突的决堤说法可以追出命令责任' },
  'LAT118-069': { title: '死亡数字不能与零伤亡宣传并存' },
  'LAT118-070': { title: '伤害人民的政策最终反噬政权' },
  'LAT118-072': { title: '地理和日期可以拆穿阻止开封之说' },
  'LAT118-074': { title: '未完成法律手续不能算正式废约' },
  'LAT118-075': { title: '条约文本必须同实施真相核对' },
  'LAT118-077': { title: '九龙未收回证明完全废约不成立' },
  'LAT118-078': { title: '为争最早废约而改动日期是窜改历史' },
  'LAT118-080': { title: '伪政权更早收回法租界削弱官方功劳' },
  'LAT118-085': { title: '先知蒙古重要却在执政后失去蒙古' },
  'LAT118-087': { title: '被骂卖国的军阀在外交上未必更差' },
  'LAT118-089': { title: '职业外交自主能使弱国外交有效' },
  'LAT118-090': { title: '追求真相必须反驳政党垄断历史解释' },
  'LAT118-091': { title: '既有归还先例使拒还九龙理由失效' },
  'LAT118-093': { title: '重签已失效权利会自失法律立场' },
  'LAT118-097': { title: '新造的不平等条约不只中苏一件' },
  'LAT118-101': { title: '多方证言可以追查不抵抗命令' },
  'LAT118-102': { title: '禁言抗日暴露热河失守责任' },
  'LAT118-103': { title: '历史类比必须比较所得和代价' },
  'LAT118-105': { title: '用苏联支持换取蒙古损失是失败交易' },
  'LAT118-106': { title: '领袖自认责任可以否定他人卸责' },
  'LAT118-109': { title: '顺从美国行动不能改变既成损失' },
  'LAT118-114': { title: '亲日关系可能让侵略元凶逃过审判' },
  'LAT118-115': { title: '抹去侵略策划的战犯判决是在开脱' },
  'LAT118-117': { title: '奉命投降不能算免罪劳绩' },
  'LAT118-120': { title: '国家机器会替侵略者解除政治限制' },
  'LAT118-121': { title: '对异己严酷而对侵略者宽大是统治怪象' },
  'LAT118-123': { title: '审判前已暗许无罪会掏空司法' },
  'LAT118-127': { title: '系统列举可以检验烈士宣传' },
  'LAT118-128': { title: '大量被俘将领反证殉节神话' },
  'LAT118-129': { title: '理解特务人物必须追踪组织系统' },
  'LAT118-130': { title: '自由学人身份也必须核查特务经历' },
  'LAT118-133': { title: '较早获释可以反证被俘不屈' },
  'LAT118-134': { title: '典故不能暗示不存在的殉难' },
  'LAT118-135': { title: '现实影像会击破被俘不屈宣传' },
  'LAT118-136': { title: '降将获祭后投降会使烈士叙事破产' },
  'LAT118-139': { title: '保存文件并加导读可以帮助后人理解政治' },
  'LAT118-141': { title: '钳制言论的公文会成为自我铁证' },
  'LAT118-146': { title: '有地位的知识人只做调人难救政治受害者' },
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
      id: `LAT118-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

if (dropMap.size !== 50 || records.length !== 96) {
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
const proofreadSummary = '校对轮保留李敖可独立检索的历史叙事辨伪、责任归属、张学良评价、花园口决堤、不平等条约、蒙古责任、战犯审判、烈士制造和雷震案判断；删除同义证据链、引文过渡、写作进度说明、单一史实铺垫及证据不足的猜测。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留措辞造像、曲笔删史、命令时间线、当事证言和多方材料互证等独立史料批评路径。',
  '- 保留长期禁锢、决堤责任、废约法律手续、蒙古表决、战犯预先放水和言论钳制等政治及法权判断。',
  '- 保留职业外交、对异己严酷、烈士样板、特务经历和知识分子只做调人的人格及文化判断。',
  '- 孙铭九八项对照只留一项代表证据和总体结论；废约、蒙古及康泽相关论证删除同义复现。',
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
