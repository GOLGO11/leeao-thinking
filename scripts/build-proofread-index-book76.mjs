import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 76;
const bookTitle = '中国近代史新论';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT076-002', '段落只是自鸣钟与皇帝关系的短承接句，后续居留空间和传教策略条目已承载核心判断。'],
  ['LAT076-014', '段落过短，只是一句感叹，地图影响已由世界地图和天下观条目承载。'],
  ['LAT076-033', '段落偏制度细节，皇帝与传教士关系的思想密度不足。'],
  ['LAT076-043', '段落只是乾隆兴趣不长的事实说明，西乐输入主题已有五线谱条目承载。'],
  ['LAT076-052', '段落偏拉丁文教育制度事实，条约政治意义由前一条承载。'],
  ['LAT076-063', '段落是雅克萨战事前导，未认清俄国性质的判断由后一条更集中承载。'],
  ['LAT076-066', '段落主要写谈判排场和军容，独立思想增量弱于外交得失条目。'],
  ['LAT076-069', '段落偏立碑办法说明，界碑错误和失地判断由后续条目承载。'],
  ['LAT076-072', '段落是研究材料前导句，地理知识缺乏和想象地理两条已足够。'],
  ['LAT076-085', '段落过短，故步自封判断已由落后不认落后条目承载。'],
  ['LAT076-088', '段落只是观察可怕的短叹，马嘎尔尼观察的意义由纸龙与鸦片战争远源条目承载。'],
  ['LAT076-089', '段落偏短，旁观者看穿天朝的判断已由纸龙条目承载。'],
  ['LAT076-094', '段落主要是闭门造船失败事例，后续中体西用批评更能独立承载思想。'],
  ['LAT076-105', '段落只是说明历史消息对学史者有意义，判断过泛。'],
  ['LAT076-109', '段落主要转录左舜生评语和书名争议，李敖自己的判断由下一条承载。'],
  ['LAT076-112', '段落是引出陈家父女个案的预告句，独立索引价值不足。'],
  ['LAT076-121', '段落主要是吴稚晖自述材料，李敖判断由查《苏报》和出卖同志条目承载。'],
  ['LAT076-125', '段落主要借胡适评章太炎，偏外部评价，革命史判断由后续条目承载。'],
  ['LAT076-127', '段落主要转录邹容材料，李敖对《革命军》功劳的结论由下一条承载。'],
  ['LAT076-131', '段落是私见敌人后被捕的事实节点，暗示生效和出卖同志两条更集中。'],
  ['LAT076-138', '段落过短，逃兵接收革命果实的讽刺由后续党国元老条目承载。'],
  ['LAT076-148', '段落是单一史实订正，第一手史料仍需推敲的总判断由结论条承载。'],
  ['LAT076-149', '段落是单一史实订正，校对轮保留方法论总结，不保留每个订误例。'],
  ['LAT076-150', '段落是单一史实订正，校对轮保留回忆录订正有限和最终读法。'],
  ['LAT076-151', '段落过窄，偏法学家姓名查证细节。'],
  ['LAT076-152', '段落是单一结论订正，已由第一手史料推敲条目概括。'],
  ['LAT076-153', '段落是五大臣出洋错漏细目，过于材料性。'],
]);

const overrides = new Map([
  ['LAT076-001', { title: '利玛窦靠适应策略进入中国' }],
  ['LAT076-003', { title: '技术贡品换得居留空间' }],
  ['LAT076-008', { category: '知识', title: '几何原本开启纯理科学新页' }],
  ['LAT076-011', { title: '世界地图打破天下观' }],
  ['LAT076-012', { title: '世界地图也迁就中国中心观' }],
  ['LAT076-016', { title: '利玛窦死葬具有政治象征' }],
  ['LAT076-020', { title: '文化互惠交流才是真历史' }],
  ['LAT076-027', { title: '外来西学可以公开辩论' }],
  ['LAT076-035', { category: '方法', title: '宗教附会会给反对者口实' }],
  ['LAT076-040', { title: '排外理由阻不住西潮' }],
  ['LAT076-044', { title: '中西画法差异可从明暗看出' }],
  ['LAT076-047', { title: '西洋楼具体象征西方文化' }],
  ['LAT076-051', { title: '拉丁文进入中国条约政治' }],
  ['LAT076-053', { title: '优势文明冲击仍会遭抵制' }],
  ['LAT076-058', { title: '旧派历法之争其实是祖宗战' }],
  ['LAT076-061', { title: '康熙借上帝名义约束俄国' }],
  ['LAT076-064', { title: '打了胜仗仍未认清敌人' }],
  ['LAT076-070', { title: '界碑错误造成土地损失' }],
  ['LAT076-073', { title: '约文含混来自想象地理' }],
  ['LAT076-074', { title: '强势谈判中失地而不自知' }],
  ['LAT076-078', { title: '俄国以武力教会通商三路侵略' }],
  ['LAT076-079', { title: '清廷等于替俄国训练特务' }],
  ['LAT076-080', { title: '萨瓦策划俄国东进政策' }],
  ['LAT076-081', { title: '不懂外交就会承认领事裁判权' }],
  ['LAT076-084', { title: '可怕的是落后而不承认落后' }],
  ['LAT076-086', { title: '礼节问题可透视心理模式' }],
  ['LAT076-087', { title: '整肃军容是不打自招' }],
  ['LAT076-090', { title: '天朝被拆穿成纸龙' }],
  ['LAT076-091', { title: '马嘎尔尼报告成为鸦片战争远源' }],
  ['LAT076-093', { title: '胡林翼面对洋船忧愤吐血' }],
  ['LAT076-095', { title: '中体西用是自慰理论' }],
  ['LAT076-096', { title: '中学为体最终只剩尸体' }],
  ['LAT076-098', { title: '溥仪是帝王浮沉的强样本' }],
  ['LAT076-100', { title: '末代皇帝历史也是未来新页' }],
  ['LAT076-104', { title: '口供真相须由亲闻订正' }],
  ['LAT076-108', { title: '反对要光明磊落勇往直前' }],
  ['LAT076-110', { title: '党人私见不该禁绝野史' }],
  ['LAT076-111', { title: '反对派也会被国民党调教' }],
  ['LAT076-113', { title: '没有出版法便以大逆罪办报' }],
  ['LAT076-116', { title: '陈撷芬以仅存钱财义助革命' }],
  ['LAT076-118', { title: '史料应该彼此串连' }],
  ['LAT076-120', { title: '伟大铜像背后要追问真相' }],
  ['LAT076-122', { title: '查《苏报》可见嘴巴革命也假' }],
  ['LAT076-123', { title: '吴稚晖为钱可以不讲原则' }],
  ['LAT076-128', { title: '《革命军》功劳可比《常识》' }],
  ['LAT076-129', { title: '礼仪之邦也有野蛮法律' }],
  ['LAT076-130', { title: '关键内幕必须重新追踪' }],
  ['LAT076-132', { title: '逍遥自在显示暗示生效' }],
  ['LAT076-133', { title: '暗盘不告就是出卖同志' }],
  ['LAT076-134', { title: '事实俱在时狡辩无用' }],
  ['LAT076-136', { title: '鼓动别人入狱暴露人品' }],
  ['LAT076-139', { title: '苏报案使革命思想成为主流' }],
  ['LAT076-140', { title: '邹容之死让章太炎活下作证' }],
  ['LAT076-141', { title: '章太炎厌恶国民党独占革命' }],
  ['LAT076-142', { title: '革命逃兵后来成党国元老' }],
  ['LAT076-143', { title: '国民党在台湾进一步捏造历史' }],
  ['LAT076-145', { title: '合法砸铜像是为先烈平反' }],
  ['LAT076-146', { title: '卖国贼自白也会向历史撒种子' }],
  ['LAT076-147', { title: '重要回忆录也订正有限' }],
  ['LAT076-154', { title: '第一手史料也须细心推敲' }],
  ['LAT076-155', { title: '中国人其实明明在全盘西化' }],
  ['LAT076-156', { title: '陈序经厘清文化出路三派' }],
  ['LAT076-157', { title: '折中复古都误解文化规律' }],
  ['LAT076-158', { title: '重介全盘西化具有讽世意味' }],
  ['LAT076-159', { title: '外交史料不可只采单方口供' }],
  ['LAT076-162', { title: '专辑编排可补选集不足' }],
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
      '校对轮删除短承接句、纯事实铺垫、外部引文主导条目、重复例证和过窄订误细目；保留可独立检索的西学东传、历法争议、对俄外交、天朝自欺、革命史料、全盘西化和近代史方法判断。description 未改写。',
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
  '- 保留可独立检索的西学东传、历法争议、对俄外交、天朝自欺、革命史料、全盘西化和近代史方法判断。',
  '- 删除短承接句、纯事实铺垫、外部引文主导条目、重复例证和过窄订误细目。',
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
