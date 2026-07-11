import fs from 'node:fs';
import path from 'node:path';

const bookNo = '113';
const bookTitle = '大江大海骗了你';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的因果追问、完整人生、史料互证、政治神话、言论自由或组织沿革判断同义复现',
    ids: [
      'LAT113-017', 'LAT113-019', 'LAT113-025', 'LAT113-027', 'LAT113-037',
      'LAT113-041', 'LAT113-054', 'LAT113-058', 'LAT113-061', 'LAT113-074',
      'LAT113-078', 'LAT113-079', 'LAT113-087', 'LAT113-100', 'LAT113-102',
      'LAT113-105', 'LAT113-109', 'LAT113-118', 'LAT113-119', 'LAT113-126',
      'LAT113-132', 'LAT113-134', 'LAT113-137', 'LAT113-141', 'LAT113-142',
      'LAT113-154', 'LAT113-155', 'LAT113-160', 'LAT113-168', 'LAT113-171',
      'LAT113-172', 'LAT113-173', 'LAT113-177', 'LAT113-181', 'LAT113-183',
      'LAT113-184', 'LAT113-186', 'LAT113-188', 'LAT113-192', 'LAT113-204',
      'LAT113-212', 'LAT113-217', 'LAT113-218',
    ],
  },
  {
    reason: '主要是单一人物、战役、机构或史料片段的应用细节，脱离本书论战语境后不能形成稳定思想索引',
    ids: [
      'LAT113-003', 'LAT113-006', 'LAT113-011', 'LAT113-021', 'LAT113-038',
      'LAT113-040', 'LAT113-043', 'LAT113-051', 'LAT113-055', 'LAT113-056',
      'LAT113-068', 'LAT113-071', 'LAT113-072', 'LAT113-080', 'LAT113-081',
      'LAT113-093', 'LAT113-096', 'LAT113-097', 'LAT113-098', 'LAT113-106',
      'LAT113-112', 'LAT113-114', 'LAT113-115', 'LAT113-120', 'LAT113-121',
      'LAT113-122', 'LAT113-129', 'LAT113-136', 'LAT113-139', 'LAT113-144',
      'LAT113-146', 'LAT113-150', 'LAT113-164', 'LAT113-178', 'LAT113-200',
    ],
  },
  {
    reason: '判断过度依赖相邻上下文、修辞方式或举例类型，独立检索价值低于同书保留的完整原则段落',
    ids: [
      'LAT113-007',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT113-002': { title: '老太太式自传较少弄假' },
  'LAT113-005': { title: '大题目需要经验和史料积累' },
  'LAT113-008': { title: '史料不能只取有利的一面' },
  'LAT113-012': { title: '学术成就不等于文化权威' },
  'LAT113-018': { title: '档案也可能专为欺骗后人而造' },
  'LAT113-022': { title: '不留文字会逃避责任' },
  'LAT113-023': { title: '现象必须追到原因' },
  'LAT113-028': { title: '坏书不应禁且可作为研究样本' },
  'LAT113-031': { title: '历史比较须先确认原因可比' },
  'LAT113-035': { title: '文化解释不能遮蔽具体暴力' },
  'LAT113-039': { title: '因果责任须沿外交文献追查' },
  'LAT113-042': { title: '掌权者不能推卸已承认的责任' },
  'LAT113-044': { title: '单方证言须与其他记录核对' },
  'LAT113-046': { title: '双方都应反省本群体的暴力' },
  'LAT113-049': { title: '迟来正义可能成为机会主义' },
  'LAT113-050': { title: '揭露强权暴行须使用一致标准' },
  'LAT113-053': { title: '不能向党派媒体索求公正' },
  'LAT113-059': { title: '失败者会集体改写失败原因' },
  'LAT113-060': { title: '官方英雄数字须与调查相核' },
  'LAT113-062': { title: '强迫不能证明自愿牺牲' },
  'LAT113-064': { title: '只批评小恶可能是在回避暴政' },
  'LAT113-065': { title: '间接批评可能是在回避权力' },
  'LAT113-066': { title: '政治权力会形成文学体制' },
  'LAT113-067': { title: '独裁者死后仍有政治文化为其免责' },
  'LAT113-069': { title: '误译会颠倒基本语义' },
  'LAT113-073': { title: '党派框架会使史家写错历史' },
  'LAT113-075': { title: '受害者也可能认同迫害者' },
  'LAT113-076': { title: '受难经历不能取代反省能力' },
  'LAT113-077': { title: '历史人物不能只供读者怜悯' },
  'LAT113-082': { title: '对最高权力者的态度可以检验人格' },
  'LAT113-083': { title: '历史写作不能绕开统治者' },
  'LAT113-088': { title: '国家合法性须接受历史和法理检验' },
  'LAT113-089': { title: '政党不能冒领未参与的建国功劳' },
  'LAT113-090': { title: '国际承认不能证明政权继替合法' },
  'LAT113-091': { title: '国际法须区分国家和政府承认' },
  'LAT113-092': { title: '政治修辞不能改变客观事实' },
  'LAT113-094': { title: '少数名人不能代表知识精英去留' },
  'LAT113-095': { title: '权力机构会在思想家死后收编其名义' },
  'LAT113-099': { title: '私人记录可以反证公开说法' },
  'LAT113-101': { title: '战略说辞须与实际命令核对' },
  'LAT113-103': { title: '权力把人才变成奴才会摧毁公民人格' },
  'LAT113-104': { title: '历史正义不能因时间过去而勾销' },
  'LAT113-108': { title: '民主和救亡功劳须接受反证' },
  'LAT113-110': { title: '政党会借外围写作者制造谎言' },
  'LAT113-111': { title: '统帅回忆录会省略不利事实' },
  'LAT113-113': { title: '回忆录须结合人证和内部资料核验' },
  'LAT113-117': { title: '要求他人共存亡者常先留退路' },
  'LAT113-123': { title: '零散同期记录可以拼出历史图景' },
  'LAT113-124': { title: '历史采访必须有文献基础' },
  'LAT113-127': { title: '最后觉悟比早年政治身份重要' },
  'LAT113-128': { title: '口述线索可以串起分散史料' },
  'LAT113-130': { title: '尽责后的生死选择属于个人自由' },
  'LAT113-131': { title: '统治者无权要求部属殉死' },
  'LAT113-133': { title: '历史叙事须追踪灾难后的生命' },
  'LAT113-135': { title: '成功采访需要保持线索警觉' },
  'LAT113-138': { title: '保存并出版秘密手稿可以突破压制' },
  'LAT113-140': { title: '秘密拘禁而不审判违背司法程序' },
  'LAT113-143': { title: '证人消失后仍可用资料重建历史' },
  'LAT113-145': { title: '平反不能依赖加害政权恩赐' },
  'LAT113-147': { title: '细读制度文本可以发现删节' },
  'LAT113-148': { title: '书目丰富不能掩盖关键材料遗漏' },
  'LAT113-149': { title: '逮捕叙事须与行动细节和文件核对' },
  'LAT113-152': { title: '历史会被事后添加虚假资历' },
  'LAT113-153': { title: '机构会借思想家之名取得解释权' },
  'LAT113-156': { title: '批评上限可以检验知识分子勇气' },
  'LAT113-157': { title: '权力内部人士会把自己改写成反抗者' },
  'LAT113-158': { title: '批评触及的最高权力可以衡量力度' },
  'LAT113-159': { title: '权力集中和知识分子怯懦会互相强化' },
  'LAT113-161': { title: '失败叙事须检验当事人是否反省' },
  'LAT113-162': { title: '缩小叙事范围可以提高可靠度' },
  'LAT113-163': { title: '英雄遗书须与敌方和同期记录核对' },
  'LAT113-165': { title: '统治者无权要求被俘者殉死' },
  'LAT113-166': { title: '政党制造的战史不能直接当作史实' },
  'LAT113-167': { title: '常识是检验离奇史说的第一关' },
  'LAT113-169': { title: '出版物和书信可以揭穿神话' },
  'LAT113-170': { title: '协助权力后沉默也是人格选择' },
  'LAT113-174': { title: '权贵迁徙经验不能代表普通人' },
  'LAT113-175': { title: '政权夹缝会剥夺普通人的亲情' },
  'LAT113-176': { title: '政治人格须由关键行动检验' },
  'LAT113-179': { title: '带有憎恶仍须用证据写历史' },
  'LAT113-180': { title: '批评须证明指控而不止辱骂' },
  'LAT113-182': { title: '对照原始照片可以发现影像篡改' },
  'LAT113-185': { title: '强权支持自由服从自身利益' },
  'LAT113-187': { title: '外国顾问制度会架空政治责任' },
  'LAT113-189': { title: '不断改期的承诺证明目标不可行' },
  'LAT113-190': { title: '拆穿政治神话者可能先受迫害' },
  'LAT113-191': { title: '掌握军权的政府仍须向民意负责' },
  'LAT113-193': { title: '组织继承关系必须经过考证' },
  'LAT113-194': { title: '组织合并与另行成立须严格区分' },
  'LAT113-195': { title: '领袖自述可以反证政党连续性' },
  'LAT113-196': { title: '拉长建党历史是在占有他人功劳' },
  'LAT113-197': { title: '独裁会使民主转型留下假民主' },
  'LAT113-198': { title: '对立政党可能共享权力思维' },
  'LAT113-199': { title: '好人支持集体作恶仍须负责' },
  'LAT113-201': { title: '对外依附会使议会服务外国利益' },
  'LAT113-202': { title: '列宁式政党难以产生真民主' },
  'LAT113-203': { title: '独裁者死后应平反冤案' },
  'LAT113-205': { title: '金钱补偿不能替代司法平反' },
  'LAT113-206': { title: '失败可源于不能也可源于不为' },
  'LAT113-207': { title: '脚注列过却漏引是选择性取证' },
  'LAT113-208': { title: '战争类比须先检验事件性质' },
  'LAT113-209': { title: '判断人物要看他反对什么' },
  'LAT113-211': { title: '流畅文风不能弥补常识和用字错误' },
  'LAT113-213': { title: '把结论藏进问题属于丐词' },
  'LAT113-214': { title: '史学批评应立足可核验的考据' },
  'LAT113-215': { title: '言论自由立场须由行动代价证明' },
  'LAT113-216': { title: '人物史须写出受难到依附的完整历程' },
  'LAT113-219': { title: '知识分子应拒非抗暴且不媚俗' },
  'LAT113-220': { title: '事实考证和哲学争执的证明方式不同' },
  'LAT113-221': { title: '史学硬功夫要求主动搜集证据' },
  'LAT113-222': { title: '无证据的攻击会替对手宣传' },
  'LAT113-223': { title: '正确主张交给不适格者会有反效果' },
  'LAT113-224': { title: '批评成就不能代替创作' },
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
      id: `LAT113-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

if (dropMap.size !== 79 || records.length !== 145) {
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
const proofreadSummary = '校对轮保留李敖可独立检索的史料批评、因果追问、采访方法、政治责任、平反原则与知识分子人格判断；删除同义复现、只对单一人物战役成立的应用细节及依赖相邻语境的短结论。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留档案防伪、作者对读、考古反证、时间线、双方材料、单方证言核验、同期记录、口述线索与照片对照等不同证据方法。',
  '- 保留现象追因、完整人生、群体记忆、历史比较、采访基础、史学考据与常识检验等研究原则。',
  '- 保留公民人格、知识分子反省、言论自由代价、反抗暴君、批评上限及不媚俗等人格判断。',
  '- 保留国家合法性、国际承认、秘密拘禁、个人生死、冤案平反与金钱补偿界限等法权判断。',
  '- 提取轮已跳过的《李敖议坛哀思录》同文条目继续不重复收入。',
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
