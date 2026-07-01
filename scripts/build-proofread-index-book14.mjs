import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '014.波波颂');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT014-003', '与牢中时间尺度条目重叠，校对轮保留更完整的时间感分析。'],
  ['LAT014-004', '偏即时感受，思想索引价值弱于相邻的人格与方法条目。'],
  ['LAT014-006', '与朋友、寂寞和时代没落条目重叠。'],
  ['LAT014-013', '“伪君子重视造型”偏例证，保留更清楚的伪善结构条目。'],
  ['LAT014-015', '三毛例子过窄，保留更概括的伪君子与慈善作秀条目。'],
  ['LAT014-024', '与党禁承诺和等待开放党禁条目重叠。'],
  ['LAT014-027', '弱于反共、利用与受难者视角等条目。'],
  ['LAT014-032', '与第一流志士拒绝极权危邦条目重叠。'],
  ['LAT014-035', '索尔仁尼琴类比偏个案，保留人格与信仰判断条目。'],
  ['LAT014-038', '与“人不能只为同胞活”和出境自由条目重叠。'],
  ['LAT014-042', '党外软弱判断已由未审先道歉和公私界限条目承载。'],
  ['LAT014-044', '偏总结重复，保留更具体的法权与职权边界条目。'],
  ['LAT014-050', '劝勉语气强，内容已由政治变色和党外利益条目覆盖。'],
  ['LAT014-052', '与政治流放和国民党式流刑条目重叠。'],
  ['LAT014-058', '与乡愁现实和重建希望条目重叠。'],
  ['LAT014-060', '猫的寓言偏趣味化，校对轮不单列。'],
  ['LAT014-062', '古董段落中的机锋弱于“好古不能不敏求”。'],
  ['LAT014-065', '顾恺之轶事偏材料，不作独立思想索引。'],
  ['LAT014-066', '顾恺之轶事延伸偏窄，校对轮并入不保留。'],
  ['LAT014-069', '与美国支持法西斯和被迫害者视角条目重叠。'],
  ['LAT014-071', '与“支援法西斯只求一时苟安”重叠。'],
  ['LAT014-072', '观音造像知识铺陈过多，保留方法与写作使用价值较高的条目。'],
  ['LAT014-076', '与陶潜不合作和不为五斗米折腰条目重叠。'],
  ['LAT014-079', '古字误读偏个案，保留一般错误与翻译判断条目。'],
  ['LAT014-083', '假诗例子偏个案，保留读书粗心和引文出处条目。'],
  ['LAT014-090', '与履历查证和积非成是条目重叠。'],
  ['LAT014-094', '个人致谢意味较强，弱于写作志愿和人格原则条目。'],
]);

const overrides = new Map([
  ['LAT014-001', { title: '自然不该承受人的感伤', keywords: '自然,感伤,方法' }],
  ['LAT014-002', { title: '自然使人积极活着', keywords: '自然,生命,达观' }],
  ['LAT014-005', { title: '友谊靠人格与公益', keywords: '朋友,人格,公益' }],
  ['LAT014-007', { title: '寂寞中承认朋友没落', keywords: '朋友,寂寞,时代' }],
  ['LAT014-008', { title: '牢中时间感被拉长', keywords: '坐牢,时间,自由' }],
  ['LAT014-009', { title: '牢中空间感被缩小', keywords: '坐牢,空间,墙' }],
  ['LAT014-010', { title: '伪君子坏在冒充', keywords: '伪君子,真小人,面具' }],
  ['LAT014-011', { title: '显性伪君子借正义说风凉话', keywords: '伪君子,正义,风凉话' }],
  ['LAT014-012', { title: '隐性伪君子靠逃避伪善', keywords: '伪君子,逃避,远庖厨' }],
  ['LAT014-014', { title: '慈善作秀是伪中之尤', keywords: '慈善,作秀,伪善' }],
  ['LAT014-016', { title: '选择性信仰就是伪善', keywords: '金庸,信佛,伪善' }],
  ['LAT014-017', { title: '同时侍奉上帝与财神', keywords: '信仰,财富,伪君子' }],
  ['LAT014-018', { title: '受害者姿态遮蔽能力问题', keywords: '新女性,受迫害意识,能力' }],
  ['LAT014-019', { title: '危险不是退避理由', keywords: '选择,牺牲,孟子' }],
  ['LAT014-020', { title: '正言不讳不避牺牲', keywords: '正言不讳,祢衡,危险' }],
  ['LAT014-021', { title: '志士不只为面包', keywords: '面包,理想,志士' }],
  ['LAT014-022', { title: '该劝统治者勿做黄祖', keywords: '祢衡,黄祖,统治者' }],
  ['LAT014-023', { title: '党禁支票长期跳票', keywords: '党禁,国民党,承诺' }],
  ['LAT014-025', { title: '等待开放党禁是做梦', keywords: '党禁,新党,等待' }],
  ['LAT014-026', { title: '读书不足才失望索尔仁尼琴', keywords: '索尔仁尼琴,读书,判断' }],
  ['LAT014-028', { category: '法权', title: '反共不是护符', keywords: '反共,自由民主,法西斯' }],
  ['LAT014-029', { title: '极右之下纯民间团体难存在', keywords: '基金会,官方,利用' }],
  ['LAT014-030', { title: '古拉格受难者不能舍近求远', keywords: '古拉格,囚犯,人道' }],
  ['LAT014-031', { title: '第一流志士拒绝极权危邦', keywords: '志士,极权,原则' }],
  ['LAT014-033', { title: '人格肯定不保证行为正确', keywords: '堂吉诃德,人格,行为' }],
  ['LAT014-034', { title: '信仰纯度不因打击减退', keywords: '信仰,怀疑,纯度' }],
  ['LAT014-036', { title: '人不能只为同胞活', keywords: '战士,自己,圣人' }],
  ['LAT014-037', { category: '法权', title: '无道政权禁人周游列国', keywords: '国民党,出境,孔子' }],
  ['LAT014-039', { title: '权力压出的道歉不由衷', keywords: '道歉,将军,权力' }],
  ['LAT014-040', { title: '私事不能动用军方', keywords: '司法,军方,公私' }],
  ['LAT014-041', { title: '未审先道歉是软弱', keywords: '诽谤,道歉,司法' }],
  ['LAT014-043', { title: '将军也要守公私界限', keywords: '将军,职权,法治' }],
  ['LAT014-045', { title: '专栏写作可用笔如剑', keywords: '皮尔逊,专栏,揭发' }],
  ['LAT014-046', { title: '文化独行侠使权贵头痛', keywords: '皮尔逊,独行侠,权贵' }],
  ['LAT014-047', { title: '政治变色是无耻升级', keywords: '政治动物学,变色龙,无耻' }],
  ['LAT014-048', { title: '不孵贼蛋', keywords: '贼蛋,黄莺,党外' }],
  ['LAT014-049', { title: '主流派把后援会变自援会', keywords: '党外,后援会,利益' }],
  ['LAT014-051', { title: '不准出境制造政治流放', keywords: '出境,流放,国民党' }],
  ['LAT014-053', { title: '国民党式流刑', keywords: '流刑,大陆,出境' }],
  ['LAT014-054', { category: '方法', title: '抒情好不代表思想对', keywords: '抒情文,乡愁,思想' }],
  ['LAT014-055', { title: '乡愁是滥用情绪', keywords: '乡愁,文学,陈腔滥调' }],
  ['LAT014-056', { title: '乡愁来自安土与交通条件', keywords: '乡愁,农业社会,交通' }],
  ['LAT014-057', { title: '乡愁梦会越久越失真', keywords: '乡愁,梦境,现实' }],
  ['LAT014-059', { title: '面对真实才可重建希望', keywords: '真实,希望,中国人' }],
  ['LAT014-061', { title: '好古不能不敏求', keywords: '古董,好古,敏求' }],
  ['LAT014-063', { title: '人间造天堂的梦一开始就错', keywords: '天堂,革命,乌托邦' }],
  ['LAT014-064', { title: '黑暗未除不上天堂', keywords: '使命,黑暗,天堂' }],
  ['LAT014-067', { title: '美国曾支持法西斯政权', keywords: '美国,国民党,法西斯' }],
  ['LAT014-068', { title: '要从被迫害者角度看事', keywords: '美国,迫害,视角' }],
  ['LAT014-070', { title: '支援法西斯只求一时苟安', keywords: '美国,法西斯,苟安' }],
  ['LAT014-073', { title: '以欲止欲是一种策略', keywords: '以欲止欲,佛教,策略' }],
  ['LAT014-074', { title: '性自由入文是打破禁忌', keywords: '性自由,裸女,战斗' }],
  ['LAT014-075', { title: '陶潜归隐是不合作', keywords: '陶潜,不合作,归隐' }],
  ['LAT014-077', { title: '不为五斗米折腰', keywords: '陶潜,五斗米,国民党' }],
  ['LAT014-078', { title: '白纸黑字错误也要分类', keywords: '错误,证据,写作' }],
  ['LAT014-080', { title: '外文语义不可望文生义', keywords: '迪斯累里,语义,翻译' }],
  ['LAT014-081', { title: 'Brave不是勇敢', keywords: '莎士比亚,brave,翻译' }],
  ['LAT014-082', { title: '读书粗心能让死人写书', keywords: '林语堂,梁启超,读书' }],
  ['LAT014-084', { category: '方法', title: '引句出处不能张冠李戴', keywords: '陶渊明,出处,引文' }],
  ['LAT014-085', { title: '文学不该被政战视角吞没', keywords: '文学角度,政战,反叛' }],
  ['LAT014-086', { title: '是非挂帅才保护人', keywords: '是非,保护,主张' }],
  ['LAT014-087', { title: '批评应就事论事', keywords: '批评,事实,题外话' }],
  ['LAT014-088', { title: '媒体垄断会制造假专家', keywords: '媒体垄断,专家,查证' }],
  ['LAT014-089', { title: '履历要靠原始记录查证', keywords: '履历,查证,身份' }],
  ['LAT014-091', { title: '众口一声可积非成是', keywords: '积非成是,学历,笔误' }],
  ['LAT014-092', { title: '文字志愿是救世与关切苍生', keywords: '文字,救世,现实' }],
  ['LAT014-093', { title: '大文章靠长期准备', keywords: '写作,准备,童子功' }],
  ['LAT014-095', { title: '实事求是不能和稀泥', keywords: '实事求是,调人,原则' }],
  ['LAT014-096', { title: '可疑和事老里应外合', keywords: '和事老,沟通,国民党' }],
  ['LAT014-097', { title: '学术政治人物可能是体制受益者', keywords: '学术,政治,体制' }],
  ['LAT014-098', { title: '讽刺文笔可以表达意见', keywords: '讽刺,文笔,意见' }],
  ['LAT014-099', { title: '不知航向无顺风', keywords: '航向,顺风,逆风' }],
  ['LAT014-100', { title: '审查造成不公平竞争', keywords: '审查,公平竞争,杂志' }],
  ['LAT014-101', { title: '诉讼可留下司法记录', keywords: '官司,司法,记录' }],
  ['LAT014-102', { title: '不公平中残存武器也要用', keywords: '司法,武器,不公平' }],
  ['LAT014-103', { title: '宣传会小化先驱', keywords: '施洗者约翰,耶稣,宣传' }],
  ['LAT014-104', { title: '派系利益压低先驱', keywords: '派系,先驱,忘恩负义' }],
  ['LAT014-105', { title: '文人征服属于千秋', keywords: '文人,武人,征服' }],
  ['LAT014-106', { title: '千秋之笔反一时之谎', keywords: '蒋介石,文人,谎言' }],
  ['LAT014-107', { title: '改名法是封建把戏', keywords: '改名,封建,文化' }],
  ['LAT014-108', { title: '改名自慰是否认现实', keywords: '改名,现实,防卫方式' }],
  ['LAT014-109', { title: '人生不只温饱', keywords: '温饱,志向,人生' }],
  ['LAT014-110', { title: '妻财子禄不能解释志士', keywords: '妻财子禄,理想,叛乱' }],
  ['LAT014-111', { title: '金钱买不下政治原则', keywords: '政治原则,金钱,统一' }],
  ['LAT014-112', { title: '禁异己为人师是权利剥夺', keywords: '教师,异己,人权' }],
  ['LAT014-113', { title: '不证自明不必巧立名目', keywords: '理由,不证自明,方法' }],
  ['LAT014-114', { title: '政治跑步滥造理由', keywords: '政治活动,巧立名目,跑步' }],
  ['LAT014-115', { title: '在其位就要谋其政', keywords: '贝克特,敬业,真理' }],
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
    'proofread_from',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；删除重复、过渡、偏掌故和思想密度较弱的条目。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push(`- 提取轮编号：${record.proofread_from}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const counts = categoryCounts(records, taxonomy);

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮由提取轮 ${originalRecords.length} 条校对为 ${records.length} 条，删除 ${dropReasons.size} 条。`,
    '',
    '校对动作只涉及条目取舍、分类、标题、关键词和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 88) {
  throw new Error(`Expected 88 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT014-${String(index + 1).padStart(3, '0')}`,
    book: bookBase.title,
    round: bookBase.round,
    status: bookBase.status,
    proofread_from: record.id,
  };
});

const allowedCategories = new Set(taxonomy);
for (const record of records) {
  if (!allowedCategories.has(record.category)) {
    throw new Error(`Unexpected category for ${record.id}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...bookBase,
    record_count: records.length,
    category_counts: categoryCounts(records, taxonomy),
  },
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${payload.book.title} proofread index: ${records.length} records.`);
