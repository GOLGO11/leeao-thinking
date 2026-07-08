import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 83;
const bookTitle = '李敖秘密书房';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT083-004', '段落重心是胡因梦个案和人身式挖苦，公共知识判断不够独立。'],
  ['LAT083-017', '段落主要说明诺贝尔文学奖提名推动经过，自我宣传性强于思想索引价值。'],
  ['LAT083-038', '段落偏2000年台行政院改组的即时战术推测，长期思想价值较低。'],
  ['LAT083-042', '段落以自己揭黑贡献未获感谢为重心，近于个人功劳申诉。'],
  ['LAT083-046', '戴高乐人格判断与 LAT083-047 重复，且本段多为铺陈。'],
  ['LAT083-048', '佩服戴高乐的自述与 LAT083-047 重复，校对轮保留判断更集中的条目。'],
  ['LAT083-053', '革命成果被后来者夺利与 LAT083-005 主题重复，保留前者更有史料支撑的条目。'],
  ['LAT083-056', '段落主要是李敖自我多面性的比喻，思想判断独立性不足。'],
  ['LAT083-060', '段落重心是胡因梦个人文化转型批评，与 LAT083-004 同属个人攻防材料。'],
  ['LAT083-064', '段落偏对来宾家庭和大陆新娘形象的现场判断，独立思想密度不足。'],
  ['LAT083-070', '段落是对神秘经验的提问式铺陈，未形成李敖自己的完整判断。'],
  ['LAT083-080', '剧场文化判断与 LAT083-081 重复，且本段混入诺奖自我铺陈，删除。'],
  ['LAT083-091', '段落主要是广告笑话，方法判断过薄。'],
  ['LAT083-094', '段落很短且依赖来宾爆料上下文，法权判断已由 LAT083-095 更好承载。'],
  ['LAT083-109', '段落主要是诺奖提名引发台湾反应，与 LAT083-017 同属自我宣传材料。'],
  ['LAT083-110', '青年盲流段落偏现场问答和社会观察零碎化，索引价值不足。'],
  ['LAT083-114', '段落集中于胡因梦个人灵修与情感攻防，校对轮不保留。'],
]);

const overrides = new Map([
  ['LAT083-001', { title: '整理书房是为了找资料' }],
  ['LAT083-002', { title: '爱国小党也可能行使残酷纪律' }],
  ['LAT083-003', { title: '宪法不能为个人反复改造' }],
  ['LAT083-005', { title: '革命功劳常被后来集团垄断' }],
  ['LAT083-006', { title: '书房让人独与天地精神往来' }],
  ['LAT083-007', { title: '郑成功眼中的台湾不是终点' }],
  ['LAT083-008', { title: '宗教串联可能变成政治力量' }],
  ['LAT083-009', { title: '阐释使艺术品获得新生命' }],
  ['LAT083-010', { title: '知识分子不能逃进象牙塔' }],
  ['LAT083-011', { title: '体制好人只能延缓政权崩坏' }],
  ['LAT083-012', { title: '时间要用在最有效率处' }],
  ['LAT083-013', { title: '年轻思想者要走出错误崇拜' }],
  ['LAT083-014', { title: '不可知论应接近科学无神' }],
  ['LAT083-015', { title: '敢退出错误轨道也是勇气' }],
  ['LAT083-016', { title: '权力核心常靠关系吸纳' }],
  ['LAT083-018', { title: '言论自由也需要辩论能力' }],
  ['LAT083-019', { title: '经典处理要有相称学养' }],
  ['LAT083-020', { title: '司法改革必须从根救起' }],
  ['LAT083-021', { title: '科技人才要回向国家建设' }],
  ['LAT083-022', { title: '唯物史观不等于科学' }],
  ['LAT083-023', { title: '投奔自由叙事会遮蔽私人动机' }],
  ['LAT083-024', { title: '鲁迅形象被过度政治化' }],
  ['LAT083-025', { title: '旧式婚姻困住胡适' }],
  ['LAT083-026', { title: '圣人也可凭有为达成' }],
  ['LAT083-027', { title: '概念用语会被后来者偷换' }],
  ['LAT083-028', { title: '知识分子也要用人民语言' }],
  ['LAT083-029', { title: '先驱者离国后仍会被重新评价' }],
  ['LAT083-030', { title: '博士身份也须接受史实查证' }],
  ['LAT083-031', { title: '爱国冲动不应压倒文化约定' }],
  ['LAT083-032', { title: '照片说明让平面史料立体化' }],
  ['LAT083-033', { title: '亲子责任也可用放任表达' }],
  ['LAT083-034', { title: '新文化运动主动引入世界思想' }],
  ['LAT083-035', { title: '名册资料能识破冒充履历' }],
  ['LAT083-036', { title: '历史工作就是玩资料' }],
  ['LAT083-037', { title: '密件显示权力体系的犬群结构' }],
  ['LAT083-039', { title: '一党专政会把决策转入暗处' }],
  ['LAT083-040', { title: '台湾繁荣建立在劫贫济富上' }],
  ['LAT083-041', { title: '政治气氛会诱发文学过度解释' }],
  ['LAT083-043', { title: '历史图片要与身世经验串联' }],
  ['LAT083-044', { title: '迷信骗子也要靠形象包装' }],
  ['LAT083-045', { title: '台湾文化根源来自中原' }],
  ['LAT083-047', { title: '英雄在懦弱时代仍然作战' }],
  ['LAT083-049', { title: '任用人才就要授予责任' }],
  ['LAT083-050', { title: '合理解释必须靠资料证据' }],
  ['LAT083-051', { title: '正义不能因作恶者衰老而放手' }],
  ['LAT083-052', { title: '思想改造不该轻易让位于建党' }],
  ['LAT083-054', { title: '小事也能显示人生观' }],
  ['LAT083-055', { title: '伤痕文学不足以代表文学高度' }],
  ['LAT083-057', { title: '知识成长靠自我开发' }],
  ['LAT083-058', { title: '革命是永恒爱情是阶段' }],
  ['LAT083-059', { title: '爱情会牵动政治立场' }],
  ['LAT083-061', { title: '权臣篡位也有心理关卡' }],
  ['LAT083-062', { title: '民主政治要守住良知尺度' }],
  ['LAT083-063', { title: '情欲会压过政治动力' }],
  ['LAT083-065', { title: '爱情代价是忍受痛苦' }],
  ['LAT083-066', { title: '可信品牌要警惕失真风险' }],
  ['LAT083-067', { title: '民主应成为生活习惯' }],
  ['LAT083-068', { title: '新材料会推翻既有史论' }],
  ['LAT083-069', { title: '创作者比批评者更配立铜像' }],
  ['LAT083-071', { title: '相声人物保存活北京' }],
  ['LAT083-072', { title: '演艺讽刺可突破言论边界' }],
  ['LAT083-073', { title: '耳顺是不介意骂声' }],
  ['LAT083-074', { title: '图片能保存语言难及的事实' }],
  ['LAT083-075', { title: '法官不拿红包也可能乱判' }],
  ['LAT083-076', { title: '藏书不能被选择性肢解' }],
  ['LAT083-077', { title: '权力机关可以拒绝低质质询' }],
  ['LAT083-078', { title: '空中视角改变历史观看' }],
  ['LAT083-079', { title: '人脑方法不能全交给电脑' }],
  ['LAT083-081', { title: '剧本卖不动显示台湾剧场贫弱' }],
  ['LAT083-082', { title: '争执也要保持幽默风度' }],
  ['LAT083-083', { title: '同性权利要公开争取' }],
  ['LAT083-084', { title: '登山也要带进学问' }],
  ['LAT083-085', { title: '童年读物塑造阅读幸福' }],
  ['LAT083-086', { title: '团队活动必须处理人际复杂' }],
  ['LAT083-087', { title: '悲剧情爱观会落伍' }],
  ['LAT083-088', { title: '国家立场可能压过家庭意见' }],
  ['LAT083-089', { title: '女性政治形象也是政治资源' }],
  ['LAT083-090', { title: '速读不能替代精髓掌握' }],
  ['LAT083-092', { title: '李登辉叛徒叙事来自谈判破裂' }],
  ['LAT083-093', { title: '揭弊要同时有资料和勇气' }],
  ['LAT083-095', { title: '枉法裁判难以追究' }],
  ['LAT083-096', { title: '宗教黑暗需要圈内人揭发' }],
  ['LAT083-097', { title: '修行离开环境也会崩溃' }],
  ['LAT083-098', { title: '戒欲信仰会撞上身体现实' }],
  ['LAT083-099', { title: '木佛开光容易成为敛财工具' }],
  ['LAT083-100', { title: '宗教商业化背离施舍精神' }],
  ['LAT083-101', { title: '投机政治人物遇险先跑' }],
  ['LAT083-102', { title: '在野政党应从执政诉求转向制衡' }],
  ['LAT083-103', { title: '中国问题必须被公开面对' }],
  ['LAT083-104', { title: '清望不能拿来挽救坏党' }],
  ['LAT083-105', { title: '书籍形式可绕开杂志执照查禁' }],
  ['LAT083-106', { title: '政治判断来自长期观察' }],
  ['LAT083-107', { title: '异议声音具有民主教育价值' }],
  ['LAT083-108', { title: '编辑恐惧也会形成言论审查' }],
  ['LAT083-111', { title: '党产庞大到难以信托' }],
  ['LAT083-112', { title: '台独主权论难获国际承认' }],
  ['LAT083-113', { title: '中文学习要由句子带动' }],
  ['LAT083-115', { title: '历史内幕书影响早期阅读' }],
  ['LAT083-116', { title: '读书要靠水平串联' }],
  ['LAT083-117', { title: '买书要按线索扩张' }],
  ['LAT083-118', { title: '藏书应成组收藏' }],
  ['LAT083-119', { title: '世界标准要靠推广能力落地' }],
  ['LAT083-120', { title: '卖台帽子会恐怖化公共讨论' }],
  ['LAT083-121', { title: '词义会随古今语境改变' }],
  ['LAT083-122', { title: '专家鉴定不能被一眼推翻' }],
  ['LAT083-123', { title: '指导者先要检验自身能力' }],
  ['LAT083-124', { title: '网络工具弥补不了粗糙语言' }],
  ['LAT083-125', { title: '争取百分百言论自由' }],
  ['LAT083-126', { title: '机构任用不能诉讼双标' }],
  ['LAT083-127', { title: '文化特务会鼓动迫害异议者' }],
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
    .replace(/[《》“”‘’？！。，、：；（）()\s]+/g, '')
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
      '校对轮删除自我宣传、个人攻防、过窄时事战术、短碎司法片段、重复戴高乐/革命成果/剧场文化条目、提问式神秘经验铺陈和缺少独立判断的现场材料；保留书房资料方法、历史证据意识、知识分子人格、宗教文化批判、政治与法权判断、写作观和情爱观。只调整取舍、标题、分类和关键词，description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
  dropped,
};

fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
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
  '- 保留书房资料方法、历史证据意识、知识分子人格、宗教文化批判、政治与法权判断、写作观和情爱观等可独立检索条目。',
  '- 删除自我宣传、个人攻防、过窄时事战术、短碎司法片段、重复戴高乐/革命成果/剧场文化条目、提问式神秘经验铺陈和缺少独立判断的现场材料。',
  '- 只调整取舍、标题、分类和关键词；所有 `description` 均沿用提取轮原文段落。',
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
