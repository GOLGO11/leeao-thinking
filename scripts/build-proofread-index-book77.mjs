import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 77;
const bookTitle = '中国现代史正论';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT077-010', '段落过短，只是“乱拍马屁”的单句判断，陈立夫身份捏造问题已由后续史实核查条目承载。'],
  ['LAT077-020', '段落过短，只是说CC中人激烈否认，独立思想密度不如后续博读旁引破欺人条目。'],
  ['LAT077-027', '段落只是引出胡适批评的第一点，完整判断已由模糊命令与贴标签剥夺人权条目承载。'],
  ['LAT077-028', '段落只是引出胡适批评的第二点，内容过窄且不构成独立思想索引。'],
  ['LAT077-030', '段落只是引出“无法可依”的第三点，完整法权判断由后续法条与法治条目承载。'],
  ['LAT077-031', '段落是短承接句，没有明确法条的后果已由贴标签剥夺人权和法治权限条目展开。'],
  ['LAT077-036', '段落过短，只是人权命令后的事实追问，唐山罢市和真正法治两条已承载核心判断。'],
  ['LAT077-039', '段落只是引出胡适的根本办法，约法和根本法律问题已由后续条目承载。'],
  ['LAT077-041', '段落只是引出“今日需要一个约法”的理由，独立检索价值不足。'],
  ['LAT077-044', '段落只是说明党纲与法律分野不易明了，党纲不能替代法律保障条目已更集中。'],
  ['LAT077-056', '段落过短，宪法被临时条款冻结和有宪法不等于有人权的判断已由前两条承载。'],
  ['LAT077-057', '段落偏传信逸事，三通与通电的笑笔不如后续三通前科条目具有思想密度。'],
  ['LAT077-058', '段落主要是孙铭九与张学良关系细节，偏史实铺垫。'],
  ['LAT077-060', '段落过短，东北军军头判断已由少壮派高于将领和与虎谋皮条目承载。'],
  ['LAT077-066', '段落只是说明军头被杀原因，偏单一史实节点。'],
  ['LAT077-085', '段落过短，只是张学良长寿使国民党现形的感叹，前后自由与声明秀条目已承载。'],
  ['LAT077-089', '段落偏祝寿舆论铺垫，平反与和稀泥判断由后续条目承载。'],
  ['LAT077-095', '段落只是说四篇谈话资料难得，史料发掘责任已由前一条承载。'],
  ['LAT077-099', '段落与后续公布真相换清白条目高度重叠，校对轮保留后者。'],
  ['LAT077-102', '段落主要转述汪荣祖分析，外部作者话语占主导，不作为李敖思想索引独立条目。'],
  ['LAT077-106', '段落只是电视节目中的关键问题未答，欲说还休的判断由后续史料对照条目承载。'],
  ['LAT077-107', '段落只是提出问题并引出《求是报》，内容过短。'],
  ['LAT077-115', '段落过短，只是被拦截电讯仍能取得的事实说明。'],
  ['LAT077-118', '段落过短，只是“纵囚记”戏码的短评，长期拘禁与认同问题由后续条目承载。'],
  ['LAT077-119', '段落偏比喻铺垫，大丈夫与家的判断不如后续还乡和认同拘禁者条目集中。'],
  ['LAT077-120', '段落偏单一心理解释，张学良回避还乡问题由长期拘禁可转为认同拘禁者条目承载。'],
  ['LAT077-122', '段落与回避还乡、令人失望主题重复，校对轮保留更完整的认同拘禁者条目。'],
  ['LAT077-123', '段落偏感慨收束，思想增量弱于前面关于自由、还乡和正义的条目。'],
  ['LAT077-124', '段落来自龚忠武后记，外部作者话语占主导。'],
  ['LAT077-125', '段落来自龚忠武后记，虽可检索但不是李敖自己的判断段落。'],
  ['LAT077-126', '段落来自龚忠武后记，外部作者自述占主导。'],
  ['LAT077-129', '段落过短，只是国民党造谣用心险恶的短叹，造谣诽谤已成定论条目已承载。'],
  ['LAT077-130', '段落偏马君武私人反讽，独立思想索引价值不足。'],
  ['LAT077-141', '段落只是引出通车记录，三通第一通结论由后续条目承载。'],
  ['LAT077-145', '段落只是引出国民党建议中央通邮，偏承接句。'],
  ['LAT077-146', '段落是通邮谈判结果的引子，高压下通邮防卫藩篱尽撤条目更完整。'],
  ['LAT077-148', '段落只是引出密约内容，卖国密约暴露真相条目更集中。'],
  ['LAT077-155', '段落主要转述蔡介雄说法，外部材料占主导。'],
  ['LAT077-156', '段落主要转述林庚申说法，外部材料占主导。'],
]);

const overrides = new Map([
  ['LAT077-004', { title: '研究历史要自己找材料' }],
  ['LAT077-005', { title: '用史学眼光公开密件' }],
  ['LAT077-011', { title: '时间线可拆穿捏造史实' }],
  ['LAT077-013', { title: '宣传能把特工头子包装成君子' }],
  ['LAT077-014', { title: '迟来真相必须追问为何不早说' }],
  ['LAT077-018', { title: '造谣前科构成合理怀疑' }],
  ['LAT077-022', { title: '博读旁引可破政治欺骗' }],
  ['LAT077-023', { title: '训政政府合议外衣独裁实质' }],
  ['LAT077-026', { title: '模糊命令不能保障人权' }],
  ['LAT077-029', { title: '只许州官放火不算保障' }],
  ['LAT077-032', { title: '贴标签就能剥夺人权' }],
  ['LAT077-034', { title: '公民有权负责讨论国家问题' }],
  ['LAT077-037', { title: '真正法治只认法律权限' }],
  ['LAT077-038', { title: '没有法定权限就没有权利保障' }],
  ['LAT077-040', { title: '组织法不能代替人权根本法' }],
  ['LAT077-043', { title: '党纲不能替代法律保障' }],
  ['LAT077-045', { title: '训政设计让宪法遥遥无期' }],
  ['LAT077-047', { title: '宪法也训练政府守权限' }],
  ['LAT077-048', { category: '法权', title: '政府也要受宪法训练' }],
  ['LAT077-050', { title: '宪政应同时训练人民与政府' }],
  ['LAT077-051', { title: '中国明白人缺基本人权法理' }],
  ['LAT077-052', { title: '人权先于国家和政府' }],
  ['LAT077-053', { title: '中国人权论理论武器太单薄' }],
  ['LAT077-054', { title: '宪法万灵论忽视冻结手段' }],
  ['LAT077-055', { title: '临时条款能冻结宪法' }],
  ['LAT077-059', { title: '少壮派判断高过军头' }],
  ['LAT077-062', { title: '与虎谋皮不能保张学良' }],
  ['LAT077-063', { title: '孙铭九以至情真人而不朽' }],
  ['LAT077-064', { title: '公开写作也是传信管道' }],
  ['LAT077-070', { title: '对照异文可得历史真相' }],
  ['LAT077-071', { title: '张学良拒绝满独维护统一' }],
  ['LAT077-072', { title: '爱国者宁做地方官不做傀儡元勋' }],
  ['LAT077-073', { title: '囚禁爱国者五十二年空前绝后' }],
  ['LAT077-074', { title: '长期幽囚会扭曲自由感觉' }],
  ['LAT077-077', { title: '为张学良做历史定位而出版' }],
  ['LAT077-080', { title: '特赦反成无限软禁工具' }],
  ['LAT077-081', { title: '真相不能随当事人缄默' }],
  ['LAT077-084', { title: '熟知历史可识破托辞老套' }],
  ['LAT077-086', { title: '家庭礼拜秀不能证明自由' }],
  ['LAT077-088', { title: '自由观会被长期幽囚扭曲' }],
  ['LAT077-091', { title: '悔祸悔悟说曲解西安事变' }],
  ['LAT077-093', { title: '学历史须辨正关键解释' }],
  ['LAT077-094', { title: '湮没史料要靠历史家发掘' }],
  ['LAT077-097', { title: '当事人隐晦不能埋没真相' }],
  ['LAT077-101', { title: '西安事变研究受困于沉默与假话' }],
  ['LAT077-103', { title: '事关大义不宜曲护蒋介石' }],
  ['LAT077-104', { title: '张学良应公布真相换清白' }],
  ['LAT077-108', { title: '张学良遮掩蒋介石怯懦' }],
  ['LAT077-109', { title: '欲说还休是在掩护背信者' }],
  ['LAT077-110', { title: '半世纪保护关怀太恐怖' }],
  ['LAT077-111', { title: '特赦比十年刑期更可怕' }],
  ['LAT077-114', { title: '为自己吐气就是为正义吐气' }],
  ['LAT077-121', { title: '长期拘禁可转为认同拘禁者' }],
  ['LAT077-127', { title: '马君武诗责张学良是造谣' }],
  ['LAT077-128', { title: '张学良被造谣诽谤已成定论' }],
  ['LAT077-132', { title: '国民党拒绝三通却处处例外' }],
  ['LAT077-133', { title: '查证国民党前科才不轻信' }],
  ['LAT077-135', { title: '不抵抗全记在张学良账上不公道' }],
  ['LAT077-136', { title: '张学良替国民党中央背黑锅' }],
  ['LAT077-137', { title: '不抵抗政策导致东北沦陷' }],
  ['LAT077-140', { title: '事实搭线会造成习惯承认' }],
  ['LAT077-142', { title: '不承认原则下完成第一通' }],
  ['LAT077-143', { title: '民间通讯资金往来难以掐断' }],
  ['LAT077-144', { title: '承认主子不承认奴才' }],
  ['LAT077-147', { title: '高压下通邮防卫藩篱尽撤' }],
  ['LAT077-149', { title: '卖国密约暴露不肯通邮真相' }],
  ['LAT077-150', { title: '便利民众名义下完成第二通' }],
  ['LAT077-152', { title: '物尽其用下完成第三通' }],
  ['LAT077-153', { title: '国民党三通标准离奇' }],
  ['LAT077-157', { title: '绝不三通应先自照镜子' }],
  ['LAT077-158', { title: '所谓不通商只是掩耳盗铃' }],
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

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’!?.,，。！、：；（）()\s]+/g, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(
        `### ${record.id}｜${record.title}`,
        '',
        record.description,
        '',
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
        '',
      );
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const extractionIds = new Set(extraction.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!extractionIds.has(id)) {
    throw new Error(`Unknown extraction id: ${id}`);
  }
}

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    const category = edit.category ?? record.category;
    const title = edit.title ?? record.title;

    return {
      ...record,
      ...edit,
      id: `LAT${String(bookSeq).padStart(3, '0')}-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
      category,
      title,
      keywords: edit.keywords ?? buildKeywords(record, title, category),
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }

  const source = extraction.records.find((item) => item.id === record.source_id);
  if (!source) {
    throw new Error(`Missing source record for ${record.id}`);
  }

  if (record.description !== source.description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除短承接句、纯事实铺垫、外部作者话语主导段落、张学良专题重复例证和过窄材料节点；保留可独立检索的青年党法西斯化批判、国民党密件与陈立夫史实核查、党与法及人权法理、张学良自由与西安事变解释、国民党三通前科等判断。description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
  dropped,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(path.join(outputDir, '思想索引.csv'), records);
fs.writeFileSync(
  path.join(outputDir, '思想索引.txt'),
  records
    .map((record) =>
      [
        `${record.id}｜${record.category}｜${record.title}`,
        `来源：${record.source_file}#${record.source_paragraph}`,
        record.description,
      ].join('\n'),
    )
    .join('\n\n'),
  'utf8',
);

const note = [
  `# ${bookTitle}校对说明`,
  '',
  `来源：${path.relative(rootDir, extractionPath).replaceAll(path.sep, '/')}`,
  '',
  `提取轮 ${extraction.records.length} 条；校对轮 ${records.length} 条；删除 ${dropped.length} 条。`,
  '',
  '校对原则：',
  '',
  '- 保留可独立检索的青年党法西斯化批判、国民党密件与陈立夫史实核查、党与法及人权法理、张学良自由与西安事变解释、国民党三通前科等判断。',
  '- 删除短承接句、纯事实铺垫、外部作者话语主导段落、张学良专题重复例证和过窄材料节点。',
  '- 只调整取舍、标题和分类；所有 `description` 均沿用提取轮原文段落。',
  '',
  '删除条目：',
  '',
  ...dropped.map((item) => `- ${item.id} ${item.title}：${item.reason}`),
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), note, 'utf8');

console.log(`Proofread ${bookTitle}: ${records.length} records, dropped ${dropped.length}.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
