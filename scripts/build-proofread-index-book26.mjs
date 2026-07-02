import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '026.我梦碎，所以我梦醒');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT026-009', '与结语中“中共有功但台湾政策错”承载的判断高度重合，校对轮保留结语版本。'],
  ['LAT026-012', '“不敢玩真的”已由公投法源、正名骗局和台湾共和国三条承载，删除口号式重复项。'],
  ['LAT026-018', '段落过短且与台独假货、正名骗局、台湾共和国三条重复。'],
  ['LAT026-019', '陈布雷误国叙事由“死不是励众而是自剖”承担，删除较偏人物情节的一条。'],
  ['LAT026-027', '与“失败应下台”和“摧毁知耻道德”同组，删除例证密度较高的一条。'],
  ['LAT026-035', '“汉奸大王”是前两条汪蒋判断的修辞性结论，校对轮保留概念更稳的二分法条目。'],
  ['LAT026-038', '受降姿态已由冈村审判、受降照片和何应钦条目承担，删除铺垫性例证。'],
  ['LAT026-045', '外蒙古条约问题由蒋自承罪愆和国际法常识两条承载，删除中间论证。'],
  ['LAT026-047', '建国百年花费偏时事预算例证，思想承载力弱于法统与僵尸国号系列。'],
  ['LAT026-048', '马英九百年自夸偏时事情境，已被法统、政体与知耻系列覆盖。'],
  ['LAT026-053', '蒋捏造道统与“道统引文瞒天过海”重复，保留证据方法更清楚的一条。'],
  ['LAT026-055', '党团党棍污染学术是“政治人碰学术易坏学术”的延展，删除重复铺垫。'],
  ['LAT026-057', '国民党不服限制性法律已由临时条款捆宪法、宪法五花大绑和一家一党工具覆盖。'],
  ['LAT026-062', '遗教弹性处理偏入口说明，保留权力结构更明确的国安会条目。'],
  ['LAT026-073', '军购预算表决偏具体个案，民进党护航和政党协商黑箱已能承担该组判断。'],
  ['LAT026-076', '民进党党威手续与开除党籍主题重复，保留国民党独裁资料的源头条。'],
  ['LAT026-082', '小党领袖烈士之路偏人物回忆，校对轮保留训政独裁与小党花瓶化两条。'],
  ['LAT026-088', '与已校对的《李敖议坛哀思录》LAT006-069 为完全相同源段落，删除以避免总表重复。'],
  ['LAT026-090', '党国书记体制与“国民党度量被苏联改造”重复，删除补充比较项。'],
  ['LAT026-092', '清北洋版权权衡偏过渡论证，保留盗印权和国民党保护美国版权两条。'],
  ['LAT026-100', '历史偏怜晚节偏感慨，陈仪判断由有功台湾和爱国代价两条承载。'],
  ['LAT026-103', '政海病房偏人物例证，保留“小岛放大老国民党恶心密度”的总判断。'],
  ['LAT026-106', '小岛选举小人可藐与政治人物制造奴性配角同组，删除修辞性重复。'],
  ['LAT026-109', '诺奖和平叙事已由达赖神权统治与人权判断两条覆盖，删除重复攻击项。'],
  ['LAT026-112', '陈良埙玩世天真偏传记细节，保留冤狱使才人止于中校的制度性判断。'],
  ['LAT026-115', '解严越解越严与迟来开放、政治案件不平反同组，删除中间铺垫。'],
  ['LAT026-122', '蓝绿对美贱相与反军购拆穿媚美自毁重复，保留概括性更强的一条。'],
  ['LAT026-131', '抱美国大腿已来不及与台湾关系法、看门狗、无义务防卫等条重复，删除修辞性结尾。'],
  ['LAT026-132', '读经老题目段落短弱，独立索引价值不足。'],
]);

const overrides = new Map([
  ['LAT026-001', { title: '梦碎才是真醒', keywords: '梦碎,梦醒,现实,方法' }],
  ['LAT026-002', { title: '解梦要看人世表象', keywords: '随机抽样,人世面,众生相,方法' }],
  ['LAT026-003', { title: '志士仁人与世推移', keywords: '志士仁人,愚夫愚妇,推移,人格' }],
  ['LAT026-004', { title: '周旋比推翻务实', keywords: '共产党,周旋,休戚与共,政治' }],
  ['LAT026-005', { title: '异梦不能同归于尽', keywords: '务实,同床异梦,同归于尽,方法' }],
  ['LAT026-006', { title: '雄奇之人困于小岛', keywords: '台湾,小岛,国民党,民进党' }],
  ['LAT026-008', { title: '第三势力制衡两党', keywords: '第三势力,制衡,国民党,民进党' }],
  ['LAT026-010', { title: '写书保存穷途自由', keywords: '写书,书种子,穷途,写作' }],
  ['LAT026-011', { title: '辛亥只是临时公约数', keywords: '辛亥革命,公约数,海峡两岸,政治' }],
  ['LAT026-013', { title: '公投法切断台独法源', keywords: '台独,公投法,法源,民进党' }],
  ['LAT026-014', { category: '政治', title: '正名是不行动的骗局', keywords: '正名,台湾共和国,骗局,政治' }],
  ['LAT026-015', { title: '台湾共和国才停止自欺', keywords: '台湾共和国,自欺,台独,政治' }],
  ['LAT026-016', { title: '真革命必须付代价', keywords: '革命,坐牢,流血,人格' }],
  ['LAT026-017', { title: '假台独不敢动国号', keywords: '台独,国号,台湾共和国,政治' }],
  ['LAT026-020', { title: '死亡是自剖不是励众', keywords: '陈布雷,自剖,历史解释,方法' }],
  ['LAT026-021', { title: '蒋介石自承中华民国灭亡', keywords: '蒋介石,亡国,中华民国,政治' }],
  ['LAT026-022', { title: '丢掉中国者无权代表中国', keywords: '国民党,中国,代表性,政治' }],
  ['LAT026-023', { title: '证据点破亡国神话', keywords: '证据,亡国,蒋介石,方法' }],
  ['LAT026-024', { title: '亡国总统仍冒充总统', keywords: '亡国,总统,蒋介石,政治' }],
  ['LAT026-025', { title: '失败政治必须下台', keywords: '政治责任,下台,国民党,政治' }],
  ['LAT026-026', { title: '不知耻摧毁道德', keywords: '知耻,道德,蒋介石,马英九' }],
  ['LAT026-028', { title: '父死子继使民国帝国化', keywords: '父死子继,民国,帝国,政治' }],
  ['LAT026-029', { title: '国家抽象招牌遮住坏人', keywords: '国家,政府,坏人,政治' }],
  ['LAT026-030', { title: '耍小手段会失大体', keywords: '孙中山,黄兴,南京,方法' }],
  ['LAT026-031', { title: '南京不宜建都', keywords: '南京,首都,孙中山,知识' }],
  ['LAT026-032', { title: '没有国家就没有首都', keywords: '首都,国家,中华民国,政治' }],
  ['LAT026-033', { title: '蒋介石骨子里主和', keywords: '汪精卫,蒋介石,和平,政治' }],
  ['LAT026-034', { title: '汪蒋二分法错误', keywords: '汪精卫,蒋介石,二分法,方法' }],
  ['LAT026-036', { title: '秘密接触戳破抗战宣传', keywords: '抗日,秘密接触,国民党,政治' }],
  ['LAT026-037', { title: '珍珠港后才对日宣战', keywords: '宣战,日本,珍珠港,国民党' }],
  ['LAT026-039', { title: '暗盘使战犯可被无罪', keywords: '冈村宁次,战犯,审判,法权' }],
  ['LAT026-040', { title: '照片可以拆穿受降叙事', keywords: '照片,受降,证据,方法' }],
  ['LAT026-041', { title: '受降媚骨有辱国体', keywords: '受降,何应钦,国体,政治' }],
  ['LAT026-042', { title: '学问才能挖出领土公案', keywords: '钓鱼台,琉球,学问,知识' }],
  ['LAT026-043', { title: '领土争议要等国力', keywords: '钓鱼台,中国强大,邓小平,方法' }],
  ['LAT026-044', { title: '蒋介石自承外蒙罪愆', keywords: '外蒙古,蒋介石,罪愆,政治' }],
  ['LAT026-046', { title: '缺常识导致外蒙签约', keywords: '国际法,现代史,外蒙古,知识' }],
  ['LAT026-049', { title: '法统不能腰斩历史', keywords: '法统,宪法,总统,法权' }],
  ['LAT026-050', { title: '百年叙事自相矛盾', keywords: '中华民国,百年,总统,方法' }],
  ['LAT026-051', { title: '孙中山并非正统总统', keywords: '孙中山,正统,中华民国,知识' }],
  ['LAT026-052', { title: '道统引文被瞒天过海', keywords: '道统,引文,蒋介石,方法' }],
  ['LAT026-054', { title: '政治人介入学术会坏学术', keywords: '政治,学术,知识,台湾' }],
  ['LAT026-056', { title: '临时条款绑住宪法', keywords: '临时条款,宪法,戒严法,法权' }],
  ['LAT026-058', { title: '宪法被五花大绑', keywords: '宪法,临时条款,戒严,法权' }],
  ['LAT026-059', { category: '法权', title: '宪法沦为一家一党工具', keywords: '宪法,国民党,一家一党,法权' }],
  ['LAT026-060', { title: '修宪破坏内阁制', keywords: '修宪,内阁制,总统,法权' }],
  ['LAT026-061', { title: '总统独大被法制化', keywords: '总统,修宪,权力,法权' }],
  ['LAT026-063', { title: '国安会变成一权政府', keywords: '国家安全会议,权力,宪法,法权' }],
  ['LAT026-064', { title: '总统制成夺权试验', keywords: '总统制,民进党,夺权,政治' }],
  ['LAT026-065', { title: '政制应高于党派私利', keywords: '政制,宪法,党派,法权' }],
  ['LAT026-066', { title: '曲学阿世祸延政体', keywords: '曲学阿世,政制,学者,人格' }],
  ['LAT026-067', { title: '台湾政党仍是乙式政党', keywords: '政党,苏维埃,台湾,知识' }],
  ['LAT026-068', { title: '乙式政党造不出真民主', keywords: '政党,民主,苏维埃,政治' }],
  ['LAT026-069', { title: '戒严党禁抵触宪法', keywords: '戒严,宪法,党禁,法权' }],
  ['LAT026-070', { title: '政治时机错会毁掉努力', keywords: '雷震,时机,组党,方法' }],
  ['LAT026-071', { title: '两党分肥取代党争', keywords: '两党,分肥,党争,政治' }],
  ['LAT026-072', { title: '民进党变成另一个国民党', keywords: '民进党,国民党,政治' }],
  ['LAT026-074', { title: '政党协商黑箱是假民主', keywords: '政党协商,黑箱,民主,政治' }],
  ['LAT026-075', { title: '开除党籍留下独裁证据', keywords: '开除党籍,国民党,独裁,政治' }],
  ['LAT026-077', { title: '共产党被逼成带枪在野党', keywords: '共产党,国民党,在野党,政治' }],
  ['LAT026-078', { title: '胡适无武装政党论太天真', keywords: '胡适,共产党,武装,知识' }],
  ['LAT026-079', { title: '真话会打破迷梦', keywords: '真话,梦,现实,方法' }],
  ['LAT026-080', { title: '文字收功有限', keywords: '写作,文字,自由中国,写作' }],
  ['LAT026-081', { title: '训政独裁打掉小党', keywords: '训政,独裁,小党,政治' }],
  ['LAT026-083', { title: '烧书迫害思想者', keywords: '烧书,思想,民社党,文化' }],
  ['LAT026-084', { title: '小党被花瓶化', keywords: '小党,花瓶,国民党,政治' }],
  ['LAT026-085', { title: '暴政必亡也会自欺', keywords: '暴政必亡,中国,自欺,政治' }],
  ['LAT026-086', { title: '孔子学院软实力苍白', keywords: '孔子学院,软实力,文化' }],
  ['LAT026-087', { title: '有钱还需要软实力', keywords: '中国,软实力,政治' }],
  ['LAT026-089', { title: '国民党度量被苏联化', keywords: '国民党,苏联,度量,政治' }],
  ['LAT026-091', { title: '盗印权可服务发展', keywords: '盗印,版权,国家发展,法权' }],
  ['LAT026-093', { title: '国民党保护美国版权', keywords: '版权,美国,国民党,政治' }],
  ['LAT026-094', { title: '新文化在五四之前', keywords: '新文化运动,五四运动,知识' }],
  ['LAT026-095', { title: '五四真义是学生救亡', keywords: '五四,学生,救亡,文化' }],
  ['LAT026-096', { title: '安全时才勇敢可鄙', keywords: '勇敢,危险,人格' }],
  ['LAT026-097', { title: '隐藏烈士身份是背叛', keywords: '烈士,共产党,纪念,文化' }],
  ['LAT026-098', { title: '蒋介石军阶一路假冒', keywords: '蒋介石,军阶,考证,方法' }],
  ['LAT026-099', { title: '陈仪有功台湾', keywords: '陈仪,台湾,人格' }],
  ['LAT026-101', { title: '爱国常要付巨大代价', keywords: '爱国,陈仪,代价,人格' }],
  ['LAT026-102', { title: '小岛放大老国民党恶心', keywords: '台湾,国民党,小岛,政治' }],
  ['LAT026-104', { title: '原罪之外仍须公道', keywords: '公道,胡赓年,评价,人格' }],
  ['LAT026-105', { title: '政治人物制造奴性配角', keywords: '政治人物,奴性,台湾,政治' }],
  ['LAT026-107', { title: '达赖神权不是自由解放', keywords: '达赖,西藏,神权,政治' }],
  ['LAT026-108', { title: '人权判断不能只锁定中共', keywords: '人权,中共,西藏,方法' }],
  ['LAT026-110', { title: '三毛浪漫逃避现实', keywords: '三毛,浪漫,现实,文化' }],
  ['LAT026-111', { title: '冤狱使才人止于中校', keywords: '冤狱,孙立人案,陈良埙,人格' }],
  ['LAT026-113', { title: '国旗沦为廉价日用品', keywords: '国旗,中华民国,文化' }],
  ['LAT026-114', { title: '迟来开放抵不掉压制', keywords: '蒋经国,解严,戒严,法权' }],
  ['LAT026-116', { title: '政治案件至今不平反', keywords: '政治案件,平反,戒严,法权' }],
  ['LAT026-117', { title: '蒋介石把人才当奴才', keywords: '蒋介石,人才,奴才,人格' }],
  ['LAT026-118', { title: '蒋经国缺储才眼光', keywords: '蒋经国,人才,政治' }],
  ['LAT026-119', { title: '台湾不能自外于中央', keywords: '台湾,中国,中央,政治' }],
  ['LAT026-120', { title: '面积比例戳破百分百论', keywords: '台湾,面积,中国,方法' }],
  ['LAT026-121', { title: '反军购拆穿媚美自毁', keywords: '军购,美国,台湾,政治' }],
  ['LAT026-123', { title: '看门狗自买骨头荒谬', keywords: '看门狗,美国,军购,政治' }],
  ['LAT026-124', { title: '提供不是售予', keywords: '台湾关系法,提供,售予,法权' }],
  ['LAT026-125', { title: '军购决心是美国前提', keywords: '军购,美国,决心,方法' }],
  ['LAT026-126', { title: '固守保台是自欺', keywords: '固守保台,军购,自欺,政治' }],
  ['LAT026-127', { title: '严重关切不是承诺', keywords: '严重关切,美国,承诺,法权' }],
  ['LAT026-128', { title: '美国无义务防卫台湾', keywords: '美国,防卫台湾,义务,法权' }],
  ['LAT026-129', { title: '台湾关系法不是双边条约', keywords: '台湾关系法,条约,法权' }],
  ['LAT026-130', { title: '台湾只是美国利益看门狗', keywords: '台湾,美国利益,看门狗,政治' }],
  ['LAT026-133', { title: '与世推移就是面对现实', keywords: '与世推移,现实,方法' }],
  ['LAT026-134', { title: '反抗不等于反抗成功', keywords: '反抗,成功,时机,方法' }],
  ['LAT026-135', { title: '黄莺拒孵贼蛋', keywords: '黄莺,牛鹂,政治比喻,方法' }],
  ['LAT026-136', { title: '梦醒后重建残余', keywords: '现实,梦醒,重建,人格' }],
  ['LAT026-137', { title: '孙蒋都不可信', keywords: '孙中山,蒋介石,可信度,政治' }],
  ['LAT026-138', { title: '蓝绿都是逆流', keywords: '蓝绿,逆流,美国,政治' }],
  ['LAT026-139', { title: '中共有功但台湾政策错', keywords: '共产党,台湾政策,自由,政治' }],
  ['LAT026-140', { title: '中国不是共产党一党之私', keywords: '中国,共产党,台湾,政治' }],
  ['LAT026-141', { title: '与共产党周旋以共存', keywords: '共产党,周旋,共存,政治' }],
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
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；删除重复承载、短弱口号、偏人物情节和纯例证项。',
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
  note:
    '本轮由提取轮进入校对轮，删除短弱、重复承载和偏例证条目，保留本书关于梦碎梦醒、国号法统、党国史、宪政、两党政治、军购与美国、中国选择等核心思想索引；description 仍逐条保留源文本原文段落。',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 112) {
  throw new Error(`Expected 112 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT026-${String(index + 1).padStart(3, '0')}`,
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

console.log(`Built ${bookBase.title} ${bookBase.round}: ${records.length} records.`);
