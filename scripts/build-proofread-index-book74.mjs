import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 74;
const bookTitle = '中国性研究';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT074-007', '段落以朱熹引文作承接，独立看不完整；学易还原平易已由前一条承载。'],
  ['LAT074-035', '段落只有一句口号，依赖前文相术细节，独立检索性不足。'],
  ['LAT074-041', '段落过短，只是对前文中医材料的感叹，已由中医巫术和生克哲学条目承载。'],
  ['LAT074-058', '段落偏私人调笑与情感站队，思想索引价值弱。'],
  ['LAT074-069', '段落主要是海明威小说例证，离本书中国性文化与政治批评主线较远。'],
  ['LAT074-072', '段落主要是报纸转述法界意见，不是李敖自己的判断。'],
  ['LAT074-075', '段落是“现代技术配古代脑袋”的例证，核心判断已由前后条目承载。'],
  ['LAT074-076', '段落继续罗列同一“西餐叉子吃人肉”例证，校对轮保留综合判断即可。'],
  ['LAT074-078', '段落只是说明史通狱政见闻有价值，偏资料来源说明。'],
  ['LAT074-081', '段落与“神由人造”“神仙小便”两条重复，思想增量有限。'],
  ['LAT074-083', '段落偏文字游戏式结尾，依赖厕所材料上下文。'],
  ['LAT074-086', '段落只有一句评语，独立思想密度不足。'],
  ['LAT074-089', '段落过短，命名现实的判断已由前后两条完整承载。'],
  ['LAT074-094', '段落重复国民党生殖器串联论，已由 LAT074-092 承载。'],
  ['LAT074-097', '段落是关系庇护的细部例证，校对轮保留轻判机制条即可。'],
  ['LAT074-098', '段落主要铺陈张纲埋轮故事，抓首脑方法由下一条完整承载。'],
  ['LAT074-101', '段落只是“也”字形体说明，已由许慎考释条承载。'],
  ['LAT074-104', '段落与前文生殖崇拜条重复，校对轮保留更集中的女阴攻防组。'],
  ['LAT074-105', '段落只是引文前的提示句，思想判断不足。'],
  ['LAT074-109', '段落是阴毛相术细节，过于资料化。'],
  ['LAT074-110', '段落是阴毛医药细节，过于资料化。'],
  ['LAT074-111', '段落偏奇闻趣味，思想索引价值弱。'],
  ['LAT074-112', '段落重复对柏杨作家标准的批评，已由《柏杨割错了屌》条承载。'],
  ['LAT074-113', '段落是批判缘起，具体史实校正由后续条目承载。'],
  ['LAT074-116', '段落实际为电子书页脚，误入提取轮。'],
  ['LAT074-119', '段落过短，“据说”不可作史证已由前后历史论证承载。'],
  ['LAT074-122', '段落主要介绍清宫宫女制度，偏历史资料。'],
  ['LAT074-124', '段落只是“两头大”专题开场，后续法权条目更完整。'],
  ['LAT074-125', '段落主要引陈顾远材料，法制意义由后续兼祧条目承载。'],
  ['LAT074-131', '段落是漫画例证，性交姿势与女权论点由前后条目承载。'],
  ['LAT074-133', '段落偏玩笑式结尾，思想密度不足。'],
  ['LAT074-138', '段落是对审查机关的讽刺致谢，审查尺度问题已由前一条承载。'],
  ['LAT074-141', '段落是动物实验结论，母职判断由相邻两条承载。'],
  ['LAT074-148', '段落与“难养”组其他条目重复，校对轮保留方法辨析与悲剧意识。'],
  ['LAT074-151', '段落主要复述尼采对女人的判断，校对轮保留性心理解释和理论实践辨析。'],
  ['LAT074-160', '段落是刘家昌个案叙述，概括性判断由下一条承载。'],
  ['LAT074-176', '段落只写铁栏杆与照片红条，意象强但判断不足。'],
  ['LAT074-178', '段落是单个对话轶事，制度内爱情问题由其他条目承载。'],
  ['LAT074-179', '段落只有小标题，不能独立承载思想。'],
  ['LAT074-183', '段落是脚注式价格时间细节，制度残酷已由人肉市场与额外时间条承载。'],
  ['LAT074-187', '段落主要是代写情书轶事，偏素材记录。'],
  ['LAT074-193', '段落偏朋友关系追述，与本书性政治主线较远。'],
]);

const overrides = new Map([
  ['LAT074-001', { category: '写作', title: '性研究要打开两性观念' }],
  ['LAT074-003', { title: '营妓雏妓问题通向国民党批判' }],
  ['LAT074-004', { title: '性命之学也要开新境界' }],
  ['LAT074-008', { category: '文化', title: '乾坤可作身体象征读法' }],
  ['LAT074-012', { category: '文化', title: '战国策公开保存性政治话语' }],
  ['LAT074-013', { title: '禁言也应先让人知道所禁为何' }],
  ['LAT074-020', { title: '俗语俗字也是文学革命资源' }],
  ['LAT074-021', { title: '写作可用俗字反斯文' }],
  ['LAT074-022', { title: '雅俗判断常流于无知' }],
  ['LAT074-026', { title: '古诗翻译不能抹去原始本义' }],
  ['LAT074-029', { title: '迷信系统中也可有观察' }],
  ['LAT074-039', { title: '中医有巫术迷信底色' }],
  ['LAT074-040', { title: '现代生物学可破器官迷信' }],
  ['LAT074-045', { title: '跟着国民党的作家不足论' }],
  ['LAT074-047', { title: '司马迁受刑要看赎刑背景' }],
  ['LAT074-050', { title: '器官也可作能屈能伸隐喻' }],
  ['LAT074-052', { title: '佛教不能根治性欲问题' }],
  ['LAT074-054', { title: '不合作才不被体制内化' }],
  ['LAT074-059', { category: '法权', title: '审查俗字须先面对古典' }],
  ['LAT074-062', { title: '国民党吃肉后让台湾人抢骨头' }],
  ['LAT074-063', { title: '孙悟空拒绝未入流小官' }],
  ['LAT074-065', { title: '台湾人要从官迷中醒来' }],
  ['LAT074-068', { category: '文化', title: '阉人并非中国独有' }],
  ['LAT074-073', { title: '囚犯传后问题有文化先例' }],
  ['LAT074-074', { title: '现代方法可服务古代心机' }],
  ['LAT074-077', { title: '旧脑新器构成中国思想模式' }],
  ['LAT074-079', { title: '事件细节之外要看思想模型' }],
  ['LAT074-080', { title: '神由人照自身创造' }],
  ['LAT074-087', { title: '编辑删改会软化语言力量' }],
  ['LAT074-088', { title: '性禁忌会毒害文字判断' }],
  ['LAT074-090', { title: '反璞归真要冲破假道学' }],
  ['LAT074-096', { category: '法权', title: '性关系可换来司法优待' }],
  ['LAT074-099', { title: '解决问题要直抓首脑' }],
  ['LAT074-102', { title: '许慎也字说未必错误' }],
  ['LAT074-103', { category: '政治', title: '译名也暴露国民党无知' }],
  ['LAT074-106', { title: '女阴也可成为文化武器' }],
  ['LAT074-107', { title: '阴防意象可作文化讽刺' }],
  ['LAT074-108', { title: '中国阴毛文化用途更广' }],
  ['LAT074-114', { title: '历史判断要回到原典' }],
  ['LAT074-115', { category: '方法', title: '武则天乱伦说不能乱扣' }],
  ['LAT074-117', { category: '政治', title: '制度借口不能替慈禧脱罪' }],
  ['LAT074-118', { category: '政治', title: '复仇使命不能洗白罪恶' }],
  ['LAT074-120', { title: '三百年复仇说经不起史实' }],
  ['LAT074-123', { title: '满清也会遮蔽血统政治' }],
  ['LAT074-126', { title: '法律未必承认平妻名义' }],
  ['LAT074-127', { title: '兼祧制度打开平妻法路' }],
  ['LAT074-128', { category: '文化', title: '身体审美受性选择影响' }],
  ['LAT074-132', { title: '性姿势也可重新设计权力关系' }],
  ['LAT074-134', { title: '乳房自由受审查压制' }],
  ['LAT074-136', { title: '露乳尺度也是自由问题' }],
  ['LAT074-137', { title: '三点不露暴露审查荒唐' }],
  ['LAT074-139', { title: '岛上文章缺乏阳刚力量' }],
  ['LAT074-140', { title: '有奶不是母职唯一条件' }],
  ['LAT074-142', { title: '人母不必天然优于兽母' }],
  ['LAT074-143', { title: '俞正燮有女权意识' }],
  ['LAT074-144', { title: '反强迫守节是进步思想' }],
  ['LAT074-145', { title: '钱穆难养解释有误' }],
  ['LAT074-146', { title: '难养句不是妾仆专指' }],
  ['LAT074-149', { title: '悲剧意识来自不高估人性' }],
  ['LAT074-150', { title: '尼采鞭子语是性心理问题' }],
  ['LAT074-152', { title: '哲学理论不等于情爱实践' }],
  ['LAT074-153', { title: '情爱实践胜过哲学抽象' }],
  ['LAT074-157', { category: '情爱', title: '戴绿帽恐惧有社会根源' }],
  ['LAT074-158', { title: '法律可比社会观念进步' }],
  ['LAT074-159', { title: '现代法胜过古代礼法' }],
  ['LAT074-161', { title: '戴绿帽焦虑可到离奇程度' }],
  ['LAT074-162', { title: '林语堂误读古代营妓' }],
  ['LAT074-164', { title: '军市制度由马祖承继' }],
  ['LAT074-165', { title: '宋代营妓制度严酷腐败' }],
  ['LAT074-167', { title: '军中乐园是国民党制度发明' }],
  ['LAT074-169', { title: '接客下限制造人肉市场' }],
  ['LAT074-170', { title: '主义国家难掩弱女苦难' }],
  ['LAT074-172', { title: '国民党只准性欲不准爱情' }],
  ['LAT074-173', { title: '性被允许而爱情被禁止' }],
  ['LAT074-175', { title: '实地调查留下稀有材料' }],
  ['LAT074-177', { title: '营妓所嵌入军队福利系统' }],
  ['LAT074-180', { title: '军中乐园制造爱情纠纷' }],
  ['LAT074-181', { title: '集体体检成为制度化羞辱' }],
  ['LAT074-182', { title: '伪婚姻满足爱情需要' }],
  ['LAT074-184', { title: '额外时间变成剥削规则' }],
  ['LAT074-185', { title: '官方卫生制度会流于形式' }],
  ['LAT074-186', { title: '私窑子反衬军中乐园剥削' }],
  ['LAT074-188', { title: '中国研究要依靠一手高人' }],
  ['LAT074-189', { title: '国民党使妓女更痛苦' }],
  ['LAT074-190', { title: '司法可成为政治迫害工具' }],
  ['LAT074-191', { title: '政治犯会被非法剥夺职业权' }],
  ['LAT074-192', { title: '坐牢写作需要秘密运出' }],
  ['LAT074-194', { title: '政治犯文字应真名出版' }],
  ['LAT074-195', { title: '出版政治犯文字要真名不删' }],
  ['LAT074-196', { title: '长期关心妓女问题' }],
  ['LAT074-197', { title: '写作要越过风花雪月' }],
  ['LAT074-198', { title: '娼妓政策目标与技术都要检讨' }],
  ['LAT074-199', { title: '公娼制度以权宜牺牲原则' }],
  ['LAT074-200', { title: '废娼是近代人权运动' }],
  ['LAT074-201', { title: '废娼九年仍流莺满地' }],
  ['LAT074-202', { title: '废娼理想被制度背叛' }],
  ['LAT074-203', { title: '国民党重复禁娼旧套' }],
  ['LAT074-204', { title: '自愿名义会变警察押送' }],
  ['LAT074-205', { title: '救妓不是职业训练即可' }],
  ['LAT074-206', { title: '雏妓问题要从社会结构看' }],
  ['LAT074-207', { title: '私行为要看是否伤害公共权利' }],
  ['LAT074-208', { title: '私性行为以无权势压迫为界' }],
  ['LAT074-209', { title: '掌权者性行为会牵动政治' }],
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
  return fileName.replace(/^\d+\./u, '').replace(/^《中国性研究》/u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"!?.,，。！？、：；（）()\s]+/g, '')
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
      '校对轮删除源文件页脚、标题句、上下文残句、纯转述材料、重复例证、过细相术医药细节和偏轶事段落；保留可独立检索的古书性文字考释、身体文化、性禁忌批评、国民党性政治、军中乐园与雏妓制度、审查法权、写作出版判断。description 未改写。',
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
  '- 保留可独立检索的古书性文字考释、身体文化、性禁忌批评、国民党性政治、军中乐园与雏妓制度、审查法权、写作出版判断。',
  '- 删除源文件页脚、标题句、上下文残句、纯转述材料、重复例证、过细相术医药细节和偏轶事段落。',
  '- 《国民党与营妓》保留制度判断、调查方法、权力结构与法权批评，不把规则清单和零散见闻全部保留。',
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
