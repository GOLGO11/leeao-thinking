import fs from 'node:fs';
import path from 'node:path';

const bookNo = '115';
const bookTitle = '蒋介石研究续集';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的照片、名单、史料证据力、宣传改写、军事责任或宪法程序判断同义复现',
    ids: [
      'LAT115-007', 'LAT115-009', 'LAT115-011', 'LAT115-012', 'LAT115-017',
      'LAT115-022', 'LAT115-024', 'LAT115-025', 'LAT115-031', 'LAT115-038',
      'LAT115-040', 'LAT115-045', 'LAT115-050', 'LAT115-057', 'LAT115-062',
      'LAT115-066', 'LAT115-069', 'LAT115-073', 'LAT115-077', 'LAT115-078',
      'LAT115-081', 'LAT115-086', 'LAT115-094', 'LAT115-098', 'LAT115-101',
      'LAT115-107', 'LAT115-110', 'LAT115-120', 'LAT115-123', 'LAT115-132',
      'LAT115-135', 'LAT115-139',
    ],
  },
  {
    reason: '主要是证据链的过渡步骤、单一轶事的泛化、只对具体人物成立的应用细节或过于宽泛的常识判断',
    ids: [
      'LAT115-027', 'LAT115-043', 'LAT115-046', 'LAT115-049', 'LAT115-054',
      'LAT115-089', 'LAT115-114', 'LAT115-117', 'LAT115-118',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT115-001': { title: '长期掌权会造成长期祸害' },
  'LAT115-003': { title: '统治迷雾须用事实持续追踪' },
  'LAT115-004': { title: '资料封锁中仍要做自由人' },
  'LAT115-005': { title: '多源成员资料可推翻领袖履历' },
  'LAT115-006': { title: '查禁史实研究侵犯研究自由' },
  'LAT115-008': { title: '私书官书可交叉排除虚构' },
  'LAT115-010': { title: '宣传照片会预设战友叙事' },
  'LAT115-013': { title: '原版照片可以揭穿政治修版' },
  'LAT115-014': { title: '抹去他人可以突出领袖' },
  'LAT115-015': { title: '政治批判不能损伤公信力' },
  'LAT115-016': { title: '旁征博引不能替代基础史料' },
  'LAT115-018': { title: '官方自认材料也须检查含糊程度' },
  'LAT115-019': { title: '关键一手记述胜过堆砌旁证' },
  'LAT115-020': { title: '作者与权力的关系影响材料分量' },
  'LAT115-021': { title: '运用史料还须检查历史解释' },
  'LAT115-028': { title: '胜利叙事会遮蔽真正行动者' },
  'LAT115-029': { title: '革命不能成为非法逮捕的理由' },
  'LAT115-030': { title: '领袖责任不能与手下暴力切割' },
  'LAT115-032': { title: '政治史会用抹杀与丑化改造敌手' },
  'LAT115-033': { title: '实践者可能被权力夺走成果' },
  'LAT115-035': { title: '利用江湖势力会使革命走向篡夺' },
  'LAT115-036': { title: '政治组织会把共同历史笼为己有' },
  'LAT115-037': { title: '历史定位须区分事件比例和人物主次' },
  'LAT115-039': { title: '责任名单可以检验英雄叙事' },
  'LAT115-041': { title: '计划与实际行动矛盾可推翻宣传' },
  'LAT115-042': { title: '历史改写会淡忘第一线行动者' },
  'LAT115-044': { title: '侠骨柔情在黑暗政场会导致出局' },
  'LAT115-047': { title: '不忘旧情是可称道的人格' },
  'LAT115-048': { title: '旧式侠义人格在权力政治中没落' },
  'LAT115-051': { title: '编年史改字会扭曲自我陈述' },
  'LAT115-052': { title: '定本会继承旧误并继续删改' },
  'LAT115-053': { title: '版本对读可以揭出政治性删节' },
  'LAT115-055': { title: '军事责任应追到远程越级指挥' },
  'LAT115-056': { title: '领袖要求部下赴死却保留自我' },
  'LAT115-058': { title: '照顾家属的承诺可被用作人质控制' },
  'LAT115-059': { title: '领袖失信会伤害追随者家庭' },
  'LAT115-060': { title: '政权不应阻断亲属奔丧' },
  'LAT115-061': { title: '人质控制会延伸到生活与职业' },
  'LAT115-063': { title: '是否牺牲应由个人自由意志决定' },
  'LAT115-064': { title: '当事人回忆可补足战役指挥秘辛' },
  'LAT115-065': { title: '军事优势会被低劣指挥抵消' },
  'LAT115-067': { title: '权力疑忌会扰乱军事部署' },
  'LAT115-068': { title: '失败中制造大捷是政治宣传' },
  'LAT115-070': { title: '撤退与作战目标不能反复切换' },
  'LAT115-071': { title: '只顾局部会导致全军失去生机' },
  'LAT115-072': { title: '向饥饿军队投纪念册是逼部下赴死' },
  'LAT115-074': { title: '政治牛皮可用逐月失地记录检验' },
  'LAT115-075': { title: '文告可以显示统治者心态' },
  'LAT115-076': { title: '失败政权会把和平责任转给敌手' },
  'LAT115-079': { title: '秘密电文语气可显示对部属不满' },
  'LAT115-080': { title: '官方婉语可以还原权力打压' },
  'LAT115-082': { title: '下野应以后续正式文书确认' },
  'LAT115-083': { title: '用词变化可以暴露统治者责任观' },
  'LAT115-084': { title: '失败者仍以仁慈统治者自居' },
  'LAT115-087': { title: '名义职位可被幕后权力当作挡箭牌' },
  'LAT115-088': { title: '代总统从严格法理上就是总统' },
  'LAT115-090': { title: '秘密组织会借公开职业掩护活动' },
  'LAT115-091': { title: '下野者会继续维持私人权力' },
  'LAT115-092': { title: '无法控制机构的总统只有名义' },
  'LAT115-093': { title: '官方颂词可以反证地下权力' },
  'LAT115-095': { title: '多篇纪念文可交叉印证秘密组织' },
  'LAT115-096': { title: '对外失败的政权可能对内斗争内行' },
  'LAT115-097': { title: '谎言环境会使后代无法想象真实失败' },
  'LAT115-099': { title: '专机使权力者拥有不对等的逃生条件' },
  'LAT115-100': { title: '公开资料对读可以显示矛盾' },
  'LAT115-102': { title: '同一作者的两种记述应相互对照' },
  'LAT115-103': { title: '御用文字会把阻碍改写为民众让路' },
  'LAT115-104': { title: '逃难记述必须同时通过常情检验' },
  'LAT115-105': { title: '含糊术语可能遮蔽不宜公开的行动' },
  'LAT115-106': { title: '特权逃生手段可能以他人生命为代价' },
  'LAT115-108': { title: '国际承认可反证国内总统身份' },
  'LAT115-109': { title: '总统缺位必须依宪法程序补选' },
  'LAT115-111': { title: '同时期文证可确认真实职位称谓' },
  'LAT115-112': { title: '权力不能一手遮尽真理与证据' },
  'LAT115-113': { title: '不能视事不能成为无程序复职的理由' },
  'LAT115-115': { title: '独裁者的自大会催生部属造神' },
  'LAT115-116': { title: '政治高帽不能替代真实专业水准' },
  'LAT115-119': { title: '局部误记不必否定回忆的核心事实' },
  'LAT115-121': { title: '高官奔丧自由不应受领袖御批' },
  'LAT115-122': { title: '前高官出入境不应受领袖私批' },
  'LAT115-124': { title: '行动审批可反推统治者对出走的知情' },
  'LAT115-125': { title: '政治遗嘱的真实性必须可受检验', category: '方法' },
  'LAT115-126': { title: '代笔遗嘱须依民法见证程序成立' },
  'LAT115-127': { title: '领袖崇拜会把精神追随夸张为无所不在' },
  'LAT115-128': { title: '官方禁止造神可能只是开明伪装' },
  'LAT115-129': { title: '知识分子可为政治造神奠定理论' },
  'LAT115-130': { title: '政权造神不会因一纸行政函件停止' },
  'LAT115-131': { title: '牢狱广播会同时执行窃听与灌输' },
  'LAT115-133': { title: '同一作者前后改变行动主体须受质疑' },
  'LAT115-134': { title: '集体官方报告也会自暴其谎' },
  'LAT115-136': { title: '仪式记录的时间与参与者应交叉核对' },
  'LAT115-137': { title: '文化正统形象会促使官方事后补造' },
  'LAT115-138': { title: '重复强调亲笔会暴露著作归属疑点' },
  'LAT115-140': { title: '成书过程的当事人证言可揭示作者' },
  'LAT115-141': { title: '领袖专书可能是文学侍从据提纲代笔' },
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
      id: `LAT115-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

if (dropMap.size !== 41 || records.length !== 100) {
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
const proofreadSummary = '校对轮保留李敖可独立检索的照片名单、版本删改、史料证据力、政治宣传、军事责任、宪法程序、人质控制、领袖造神与著作归属判断；删除同义证明步骤、过渡句、单一轶事泛化及重复权利结论。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留照片原版、成员名单、私人书信、官方年表、当事人回忆、多版本文本与仪式记录等不同史料批评路径。',
  '- 保留下野后的实际权力、总统缺位与复职程序、出入境自由、遗嘱见证及个人牺牲选择等法权判断。',
  '- 保留人质控制、部下送死、政权失信、造神、幕后控制与特权逃生等政治和人格判断。',
  '- 保留杨虎不忘旧情的情爱条目，因原文明确将之作为可称道的独立人格判断。',
  '- 提取轮已跳过的《大江大海骗了你》同文条目继续不重复收入。',
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
