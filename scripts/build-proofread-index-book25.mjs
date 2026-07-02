import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '025.你笨蛋，你笨蛋');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT025-004', '“离乡伤痕”与同篇“强者不止哭泣”同属伤痕文学判断，校对轮保留承载力更强的一条。'],
  ['LAT025-011', '署名问题偏出版情境，思想判断弱于同篇胡适、时序和立身本末诸条。'],
  ['LAT025-015', '“最好纪念是传思想”与选集保存、传播思想和政治阻挠诸条重复。'],
  ['LAT025-026', '诉讼高目标与“法律程序可作象征”“小事认真才有大事”接近，保留后两条。'],
  ['LAT025-034', '囚中以歌换新闻偏传记细节，保留“忘我才能忘情”作为人格判断。'],
  ['LAT025-036', '“真实与谜”偏小说说明，思想承载力弱于“少年也能知道一切”。'],
  ['LAT025-050', '全集赶在八十岁前完成偏写作计划，作为索引主题独立性较弱。'],
  ['LAT025-071', '段落涉及极端报复，校对轮保留“弱者抵抗蛮力”的人格判断，不单列暴力报复表述。'],
  ['LAT025-073', '体育作秀判断较短，已由“运动纪录表演要区分”覆盖。'],
  ['LAT025-077', '书写材料衰败偏物象感慨，思想索引价值较弱。'],
  ['LAT025-091', '离开小岛求大视野与“小岛政治缺世界眼光”重复。'],
  ['LAT025-093', '友情场景偏回忆叙事，保留“洗脑只会使人顽强”和“台独政见需要验收”。'],
  ['LAT025-110', '“至少做晨星”句子过短，已由第一流知识分子系列条目承载。'],
  ['LAT025-113', '文学作品不必多诠释过短，作为本书思想索引独立性不足。'],
]);

const overrides = new Map([
  ['LAT025-001', { title: '小岛假民主困住人才', keywords: '台湾,假民主,民粹,人才' }],
  ['LAT025-005', { title: '事后查禁取代事前审查', keywords: '文字检查,事后惩罚,禁书,国民党' }],
  ['LAT025-006', { title: '禁未完小说制造纪录', keywords: '禁书,未完小说,查禁,纪录' }],
  ['LAT025-007', { title: '色情判断要看反思净化', keywords: '色情,文学判断,反思,净化' }],
  ['LAT025-008', { title: '强文学由思想领队', keywords: '强文学,思想,小说,写作' }],
  ['LAT025-009', { title: '借题发挥教思想方法', keywords: '借题发挥,思想方法,胡适,陈文茜' }],
  ['LAT025-014', { category: '文化', title: '选集保存散佚思想', keywords: '选集,胡适,散篇,思想传播' }],
  ['LAT025-017', { title: '思想传播不问谁得利', keywords: '思想传播,胡适,得利,文化' }],
  ['LAT025-018', { title: '政治阻挠终归公道', keywords: '胡适,思想传承,公道,政治斗争' }],
  ['LAT025-019', { title: '美国无保台采购义务', keywords: '美国,台湾,军购,义务' }],
  ['LAT025-020', { title: '提供不等于购买', keywords: '台湾关系法,提供,购买,军购' }],
  ['LAT025-021', { title: '军备竞赛耗损台湾', keywords: '军备竞赛,台湾,军购,民生' }],
  ['LAT025-022', { title: '无军队也可以安全', keywords: '安全,军队,台湾,哥斯达黎加' }],
  ['LAT025-025', { category: '方法', title: '正义需要资源支撑', keywords: '正义,资源,仗义输财,方法' }],
  ['LAT025-027', { title: '法律程序可作象征', keywords: '法律程序,象征,布什,诉讼' }],
  ['LAT025-029', { title: '政党政治夹杀独立参选', keywords: '选举,政党,独立候选人,政治' }],
  ['LAT025-030', { title: '战斗者到死方休', keywords: '战斗,退休,死亡,人格' }],
  ['LAT025-031', { title: '小岛政治消耗生命', keywords: '小岛政治,英雄,台湾,议坛' }],
  ['LAT025-032', { title: '闲聊体更接近真相', keywords: '自传,闲聊,真实,写作' }],
  ['LAT025-033', { title: '忘我才能忘情', keywords: '忘我,情歌,监狱,人格' }],
  ['LAT025-035', { title: '少年也能知道一切', keywords: '朱仑现象,少年,知识,小说' }],
  ['LAT025-037', { title: '身份成分压过成就', keywords: '艺术,成分,马偕,黄达夫' }],
  ['LAT025-038', { title: '价值不能化为价格', keywords: '价值,价格,艺术,王尔德' }],
  ['LAT025-040', { title: '至善停在第一念', keywords: '第一念,至善,捐赠,人格' }],
  ['LAT025-042', { title: '共产主义需物质基础', keywords: '共产主义,物质基础,马克思,经济' }],
  ['LAT025-045', { title: '美国道路需要八个地球', keywords: '美国模式,地球,资本主义,中国' }],
  ['LAT025-046', { title: '新帝国主义靠巧取', keywords: '新帝国主义,美元,宣传,美国' }],
  ['LAT025-047', { title: '改革过河要分阶段', keywords: '改革,过河,阶段,方法' }],
  ['LAT025-048', { title: '拜美会使中国出问题', keywords: '拜美,中国,美国,趋势' }],
  ['LAT025-049', { title: '土法炼钢传播言论自由', keywords: '言论自由,禁书,土法炼钢,出版' }],
  ['LAT025-052', { title: '禁书地下流保思想', keywords: '禁书,地下出版,文星,思想' }],
  ['LAT025-053', { title: '容许骂声才显自信', keywords: '批评,大陆,自信,开放' }],
  ['LAT025-054', { title: '出版开放也是自信', keywords: '出版自由,大陆,言论,李敖大全集' }],
  ['LAT025-055', { title: '人权回应不能被动', keywords: '美国人权纪录,中国,回应,被动' }],
  ['LAT025-057', { title: '宣传战要你来我往', keywords: '宣传,软实力,美国,你来我往' }],
  ['LAT025-058', { title: '中国应有反击话语权', keywords: '中国,话语权,人权,反击' }],
  ['LAT025-059', { title: '作家应做社会罗宾汉', keywords: '作家,打手,罗宾汉,人格' }],
  ['LAT025-061', { title: '常识可拆穿叙事', keywords: '偷书,常识,证据,方法' }],
  ['LAT025-064', { title: '台湾关系法是霸权法', keywords: '台湾关系法,美国,霸权,国内法' }],
  ['LAT025-067', { title: '禁书可以伪装流通', keywords: '禁书,黄书,流通,写作' }],
  ['LAT025-070', { title: '弱者也能抵抗蛮力', keywords: '抵抗,小人物,强权,人格' }],
  ['LAT025-072', { title: '运动纪录表演须区分', keywords: '运动,纪录,表演,知识' }],
  ['LAT025-075', { title: '学术工程不能长期待定', keywords: '学术,上古史,中研院,问责' }],
  ['LAT025-076', { title: '学术问责不能停在疑案', keywords: '中研院,弊案,问责,法权' }],
  ['LAT025-078', { title: '晚年写作也可散漫成体', keywords: '老年写作,导读,自由,写作' }],
  ['LAT025-079', { title: '制式教育伤害异才', keywords: '制式教育,异才,退学,知识' }],
  ['LAT025-080', { title: '知识分子过不了三关', keywords: '知识分子,中西,新旧,文化' }],
  ['LAT025-083', { title: '教改积弊压垮学生', keywords: '教改,学生,教材,台湾' }],
  ['LAT025-085', { title: '中华民国叙事是自欺', keywords: '台湾,中华民国,自欺,国民党' }],
  ['LAT025-086', { title: '拒绝表决显出伪民主', keywords: '台湾民主,议会,罢免,民进党' }],
  ['LAT025-087', { title: '蓝绿病根一脉相承', keywords: '蓝绿,国民党,民进党,荒谬' }],
  ['LAT025-088', { title: '国民党只剩技术无理想', keywords: '国民党,理想,政治,腐败' }],
  ['LAT025-089', { title: '小岛政治缺世界眼光', keywords: '小岛,世界视野,台湾,文化' }],
  ['LAT025-090', { title: '少年抗议要经得起查证', keywords: '李戡,抗议,证据,人格' }],
  ['LAT025-092', { title: '白色恐怖洗不掉人', keywords: '洗脑,白色恐怖,顽强,人格' }],
  ['LAT025-094', { title: '台独政见需要验收', keywords: '台独,验收,政治,谢聪敏' }],
  ['LAT025-095', { title: '美国强大却与世为仇', keywords: '美国,强权,军费,世界' }],
  ['LAT025-096', { title: '美元霸权偷吃世界', keywords: '美国,美元,印钞机,世界' }],
  ['LAT025-097', { title: '柔性力量遮蔽恶行', keywords: '柔性力量,美国,觉悟,方法' }],
  ['LAT025-098', { title: '一流知识分子处处出头', keywords: '知识分子,祖国,人才,人格' }],
  ['LAT025-099', { title: '爱国须和而不同', keywords: '祖国,和而不同,知识分子,方法' }],
  ['LAT025-100', { title: '知识分子只有一流', keywords: '知识分子,第一流,人格,标准' }],
  ['LAT025-101', { title: '好头脑才能至善', keywords: '好头脑,至善,反讽,知识' }],
  ['LAT025-102', { title: '境界仍须务实', keywords: '世界公民,务实,方法,知识分子' }],
  ['LAT025-103', { title: '唱衰中国殃及世界', keywords: '中国,唱衰,难民,世界' }],
  ['LAT025-104', { title: '仁要勇气兑现', keywords: '勇于行仁,马寅初,勇气,人格' }],
  ['LAT025-105', { title: '历史评价要防不公道', keywords: '革命,不公道,共产党,历史评价' }],
  ['LAT025-106', { title: '牺牲名誉办国家事', keywords: '郭嵩焘,声名,国家,人格' }],
  ['LAT025-107', { title: '士大夫缺独立无畏', keywords: '士大夫,独立,大无畏,林则徐' }],
  ['LAT025-108', { title: '先知必须继续前进', keywords: '知识分子,前进,易卜生,先知' }],
  ['LAT025-109', { title: '党国要分同心圆', keywords: '党国观念,国家,政党,同心圆' }],
  ['LAT025-111', { title: '文明话语不能偷走是非', keywords: '文明,抗争,龙应台,白色恐怖' }],
  ['LAT025-112', { title: '证据才是批判武器', keywords: '证据,批判,龙应台,方法' }],
  ['LAT025-115', { title: '牢中仍可精读工具书', keywords: '白色恐怖,工具书,英文汉诂,知识' }],
  ['LAT025-116', { title: '札记以抽样见学问', keywords: '札记,抽样,英文汉诂,写作' }],
  ['LAT025-117', { title: '中文文法更合逻辑', keywords: '中文文法,英文文法,逻辑,知识' }],
  ['LAT025-118', { title: '西化文法是庸扰', keywords: '中文西化,鲁迅,余光中,文法' }],
  ['LAT025-119', { title: '翻译要辨宾主', keywords: '翻译,主格,受格,林肯' }],
  ['LAT025-120', { title: '具体意象写抽象', keywords: '具体,抽象,表达,写作' }],
  ['LAT025-121', { title: '正名不能求雅失顺', keywords: '正名,学名,语言,方法' }],
  ['LAT025-122', { title: '对对子训练思想条理', keywords: '联语,对对子,思想条理,陈寅恪' }],
  ['LAT025-123', { title: '参选只为原则道别', keywords: '参选,原则,政党,胜负' }],
  ['LAT025-124', { title: '蓝绿之外才有新思维', keywords: '蓝绿,新思维,台湾,选举' }],
  ['LAT025-125', { title: '国民党少数机器坏团结', keywords: '泛蓝,国民党,团结,选举' }],
  ['LAT025-126', { title: '选举纪录可反追责', keywords: '选举纪录,追责,国民党,方法' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复铺垫、个人情境、短弱句和思想承载力较弱的条目。',
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
if (keptOriginalRecords.length !== 112) {
  throw new Error(`Expected 112 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT025-${String(index + 1).padStart(3, '0')}`,
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
