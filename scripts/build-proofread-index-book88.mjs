import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 88;
const bookTitle = '笑敖年代';
const sequence = String(bookSeq).padStart(3, '0');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT088-001', '与 LAT088-002 同属党产政见兑现主题，且论述较短，校对轮保留证据更完整的后者。'],
  ['LAT088-005', '拉法叶案与郝龙斌选情推演偏当期选举战术，长期思想索引价值较弱。'],
  ['LAT088-014', '冯沪祥案调查程序与证据主题已有 LAT088-013、LAT088-015、LAT088-037、LAT088-038 承载，本条删除以免同题过密。'],
  ['LAT088-019', '包围马英九的抗议战术较短促，校对轮由 LAT088-022、LAT088-092、LAT088-093 承载有效方法主题。'],
  ['LAT088-024', '皇帝式长线计划的比喻偏戏谑铺陈，思想判断不如同书其他权力制衡条目稳定。'],
  ['LAT088-030', '宋楚瑜行政努力被摧毁与 LAT088-028 主题接近，且本条更偏竞选人事评价。'],
  ['LAT088-033', '吕秀莲接班属于反扁运动的人事推演，思想密度不足。'],
  ['LAT088-043', '刘家昌与党产关系偏人物掌故，党产政见主题已有更集中的条目。'],
  ['LAT088-053', '高俊明公开信的材料铺陈较长，扣卖台帽子的判断由 LAT088-055 更集中承载。'],
  ['LAT088-060', '三一九枪击与美国关系的判断猜测性较强，校对轮不单列。'],
  ['LAT088-066', '包围马英九的战术段落与 LAT088-092、LAT088-093 重复，删除以收敛分类。'],
  ['LAT088-073', '东京玫瑰与战场图像偏现场展示和历史感慨，未形成稳定思想索引题。'],
  ['LAT088-076', '反扁群众动员辛苦的判断与 LAT088-077、LAT088-078 重复，校对轮删除。'],
  ['LAT088-079', '阎锡山与政府来台段落偏史事介绍，独立思想判断较弱。'],
  ['LAT088-082', '开放李敖书房与大陆游客午餐偏个人设想，公共思想密度不足。'],
  ['LAT088-090', '年龄与经验辩护偏竞选自述，校对轮不单列。'],
  ['LAT088-097', '泛蓝票源定位偏选举算术，稳定思想索引价值不足。'],
  ['LAT088-101', '军购发言权段落含较多现场铺垫，军购判断由 LAT088-103、LAT088-104、LAT088-115 等承载。'],
]);

const overrides = new Map([
  ['LAT088-002', { title: '党产承诺必须按政见兑现' }],
  ['LAT088-003', { category: '人格', title: '承认错误要有服善之勇' }],
  ['LAT088-004', { category: '法权', title: '民主政治要容忍严厉批评' }],
  ['LAT088-006', { category: '人格', title: '文人不该歌颂统治者' }],
  ['LAT088-007', { title: '李登辉也要承担党产责任' }],
  ['LAT088-008', { title: '贪污赔钱不能替代法办' }],
  ['LAT088-009', { title: '执政准备不能变成空话' }],
  ['LAT088-010', { category: '人格', title: '受过民主教育更该懂自由' }],
  ['LAT088-011', { title: '御用大法官会消灭立院权力' }],
  ['LAT088-012', { title: '审判案件也可以公开评论' }],
  ['LAT088-013', { title: '物证异常要用科学解释' }],
  ['LAT088-015', { category: '方法', title: '纤维物证可以推翻案情叙事' }],
  ['LAT088-016', { title: '虚与委蛇不能读错' }],
  ['LAT088-017', { category: '政治', title: '资金管制会重演金圆券' }],
  ['LAT088-018', { title: '陈情书不该递给盗贼' }],
  ['LAT088-020', { category: '人格', title: '抗争必须承受足够痛苦' }],
  ['LAT088-021', { title: '司法沦陷会使约束力量消失' }],
  ['LAT088-022', { category: '方法', title: '有效抗争重于理想姿态' }],
  ['LAT088-023', { title: '党国不分会混同公私' }],
  ['LAT088-025', { title: '司法人物要守天理国法人情' }],
  ['LAT088-026', { category: '法权', title: '举证责任决定诉讼成败' }],
  ['LAT088-027', { category: '人格', title: '崇拜人物就要实践精神' }],
  ['LAT088-028', { title: '行政能力不该被政党斗争埋没' }],
  ['LAT088-029', { category: '写作', title: '坐牢也能用写作冲破禁制' }],
  ['LAT088-031', { title: '为烂政权闹革命不值得' }],
  ['LAT088-032', { category: '法权', title: '监察权不应畏惧总统' }],
  ['LAT088-034', { title: '民进党忘恩负义制造假货' }],
  ['LAT088-035', { title: '李登辉旧言不能作废' }],
  ['LAT088-036', { category: '法权', title: '政治资金夹带必须追究' }],
  ['LAT088-037', { title: '法官必须重视关键物证' }],
  ['LAT088-038', { title: '科学鉴定程序比传言重要' }],
  ['LAT088-039', { title: '台独履历要看历史记录' }],
  ['LAT088-040', { title: '知识分子行动不能摇摆' }],
  ['LAT088-041', { category: '人格', title: '不该把受难者扣成镰刀' }],
  ['LAT088-042', { title: '背叛信仰必须先忏悔' }],
  ['LAT088-044', { title: '台独身份要有打拼记录' }],
  ['LAT088-045', { category: '人格', title: '收容逃犯是最高道德境界' }],
  ['LAT088-046', { category: '人格', title: '轮流绝食是假抗争' }],
  ['LAT088-047', { title: '清流位置不该被假货霸占' }],
  ['LAT088-048', { category: '方法', title: '政治声援也可能帮倒忙' }],
  ['LAT088-049', { category: '人格', title: '大道德小道德都要受检验' }],
  ['LAT088-050', { category: '方法', title: '专制审讯可以用假求饶应对' }],
  ['LAT088-051', { title: '宗教领袖也该讲公道话' }],
  ['LAT088-052', { category: '人格', title: '英雄标准应供人民学习' }],
  ['LAT088-054', { title: '卖台标签常被外省化' }],
  ['LAT088-055', { category: '人格', title: '扣卖台帽子会打到自己' }],
  ['LAT088-056', { title: '蒋介石复杂得像项羽又像刘邦' }],
  ['LAT088-057', { title: '联合国驱逐的是蒋介石政权' }],
  ['LAT088-058', { title: '改名政治不能避开国号' }],
  ['LAT088-059', { category: '人格', title: '被压迫者会认同迫害者' }],
  ['LAT088-061', { title: '暴发户政治会粗糙堕落' }],
  ['LAT088-062', { title: '联合国记录已把台湾列入中国' }],
  ['LAT088-063', { title: '朕即国家会吞掉国家' }],
  ['LAT088-064', { title: '军购预算可以被多数挡住' }],
  ['LAT088-065', { title: '控制预算胜过街头辛苦' }],
  ['LAT088-067', { category: '法权', title: '中华民国亡国要按宪法看' }],
  ['LAT088-068', { category: '法权', title: '制度设计会被权力反噬' }],
  ['LAT088-069', { category: '人格', title: '宪法学者不该曲学阿世' }],
  ['LAT088-070', { title: '中文价值要靠现代化维护' }],
  ['LAT088-071', { title: '挡军购要有人当第一大案' }],
  ['LAT088-072', { title: '雷达军购只换七分钟预警' }],
  ['LAT088-074', { category: '知识', title: '真理方向需要头脑清楚的人' }],
  ['LAT088-075', { category: '方法', title: '知识要看活才有用' }],
  ['LAT088-077', { title: '反总统要抓住宪法工具' }],
  ['LAT088-078', { category: '方法', title: '造势不等于逼总统下台' }],
  ['LAT088-080', { category: '方法', title: '小力量可以挑动大党相斗' }],
  ['LAT088-081', { title: '政工会使军队堕落' }],
  ['LAT088-083', { title: '台独会带来毁灭风险' }],
  ['LAT088-084', { category: '法权', title: '核四停工不能违反法律' }],
  ['LAT088-085', { category: '政治', title: '公共注意力要看损失大小' }],
  ['LAT088-086', { category: '法权', title: '地方权力可以依法制衡中央' }],
  ['LAT088-087', { title: '政治行动要面向下一代' }],
  ['LAT088-088', { title: '公共选择要守身份标准' }],
  ['LAT088-089', { category: '方法', title: '不懂专业也可委托专家' }],
  ['LAT088-091', { category: '人格', title: '辞职理由未消失就不该回任' }],
  ['LAT088-092', { category: '方法', title: '务实行动要讲究窍门' }],
  ['LAT088-093', { category: '方法', title: '政治弱点要用压力点亮' }],
  ['LAT088-094', { title: '迁都可以释放台北城市位阶' }],
  ['LAT088-095', { category: '政治', title: '行政能力要看解决问题' }],
  ['LAT088-096', { category: '法权', title: '市长权力不该被做小' }],
  ['LAT088-098', { title: '宁死也不加入国民党' }],
  ['LAT088-099', { title: '在废墟上盖房子终会倒塌' }],
  ['LAT088-100', { title: '民代权利不能被党团剥夺' }],
  ['LAT088-102', { category: '法权', title: '瓦斯攻击也是议会抗争' }],
  ['LAT088-103', { title: '穷人困境不该让位军购' }],
  ['LAT088-104', { title: '武器只能撑等美国不是保护' }],
  ['LAT088-105', { title: '台湾关系法不是台湾保护法' }],
  ['LAT088-106', { title: '战争太重要不能只交给将军' }],
  ['LAT088-107', { title: '中立化是摆脱军备竞赛方案' }],
  ['LAT088-108', { category: '法权', title: '搜索是取得证据的基本动作' }],
  ['LAT088-109', { category: '法权', title: '隔离讯问不能错开' }],
  ['LAT088-110', { title: '国会议员不能逃避表决立场' }],
  ['LAT088-111', { title: '倒阁比假罢免更是真动作' }],
  ['LAT088-112', { category: '法权', title: '预算权比作秀质询更关键' }],
  ['LAT088-113', { category: '法权', title: '贪污不因金额小而可忽略' }],
  ['LAT088-114', { title: '军购始作俑者是国民党' }],
  ['LAT088-115', { title: '军购预算兑现的是美国承诺' }],
  ['LAT088-116', { title: '老兵共同梦被背叛' }],
  ['LAT088-117', { category: '人格', title: '知识领袖应有更高言论' }],
  ['LAT088-118', { title: '总统豁免权遮住司法' }],
  ['LAT088-119', { title: '选民会被蓝绿分类教笨' }],
  ['LAT088-120', { category: '方法', title: '判断历史影像要看修版证据' }],
  ['LAT088-121', { category: '人格', title: '知识分子失职会纵容权力' }],
  ['LAT088-122', { category: '写作', title: '淡出政治回到思想写作' }],
  ['LAT088-123', { title: '市政祝福不如解决债务' }],
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
  return fileName.replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text ?? '')
    .replace(/^李敖[：:]/u, '')
    .replace(/[“”"'‘’《》（）()，。！？、；：,.!?;:\s]/gu, '')
    .trim();
}

function buildKeywords(record, title, category) {
  const raw = [
    category,
    title,
    ...String(title).split(/[，,；;、\s]/u),
    fileTitle(record.source_file),
    ...(Array.isArray(record.keywords) ? record.keywords : String(record.keywords ?? '').split(/[，,、]/u)),
  ];
  const keywords = [];
  for (const item of raw) {
    const keyword = cleanKeyword(item);
    if (keyword && keyword.length >= 2 && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
    if (keywords.length >= 8) break;
  }
  return keywords;
}

function sourceDateSuffix(sourceFile) {
  const match = sourceFile.match(/2006(\d{2})(\d{2})/u);
  return match ? `${match[1]}-${match[2]}` : fileTitle(sourceFile);
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) ?? 0;
    if (count === 0) {
      seen.set(record.title, 1);
      continue;
    }
    seen.set(record.title, count + 1);
    record.title = `${record.title}（${sourceDateSuffix(record.source_file)}）`;
    record.keywords = buildKeywords(record, record.title, record.category);
  }
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书名：${payload.book.title}`,
    `- 轮次：${payload.book.round}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 索引',
    '',
  ];

  for (const record of payload.records) {
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 提取轮编号：${record.source_id}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(filePath, records) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeProofreadNote(filePath, payload, dropped) {
  const lines = [
    `# ${payload.book.title}校对说明`,
    '',
    `本轮从提取轮 ${payload.book.source_count} 条中保留 ${payload.records.length} 条，删除 ${payload.book.dropped_count} 条。`,
    '',
    '## 校对原则',
    '',
    '- 只保留李敖本人段落，继续排除主持人串场、节目寒暄和资料站信息。',
    '- 删除同题重复、选举算术、现场展示、个人竞选铺陈、思想密度不足和猜测性过强的条目。',
    '- 将提取轮中过于宽泛的节目题改为可检索的思想判断题。',
    '- 只调整取舍、标题、分类、关键词和编号，description 保持源文原段落。',
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 删除条目',
    '',
    ...dropped.map((item) => `- ${item.id}：${item.title}。${item.reason}`),
    '',
  ];
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const unknownDrops = [...dropReasons.keys()].filter((id) => !extraction.records.some((record) => record.id === id));
const unknownOverrides = [...overrides.keys()].filter((id) => !extraction.records.some((record) => record.id === id));
if (unknownDrops.length || unknownOverrides.length) {
  throw new Error(`Unknown ids: drops=${unknownDrops.join(',')} overrides=${unknownOverrides.join(',')}`);
}

const dropped = [];
const records = [];

for (const record of extraction.records) {
  const reason = dropReasons.get(record.id);
  if (reason) {
    dropped.push({ id: record.id, title: record.title, reason });
    continue;
  }

  const override = overrides.get(record.id) ?? {};
  const category = override.category ?? record.category;
  const title = override.title ?? record.title;
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} in ${record.id}`);
  }

  records.push({
    ...record,
    id: `LAT${extraction.book.sequence}-${String(records.length + 1).padStart(3, '0')}`,
    source_id: record.source_id ?? record.id,
    round: '校对轮',
    status: '已校对',
    category,
    title,
    keywords: buildKeywords(record, title, category),
  });
}

ensureUniqueTitles(records);

const payload = {
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除同题重复、选举算术、现场展示、个人竞选铺陈、思想密度不足和猜测性过强的条目；将节目题改为可检索的思想判断题，并修正法权、人格、方法、写作等分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
};

const roundBase = '思想索引-校对轮';
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(roundCsvPath, records);
writeMarkdown(roundMdPath, payload);
writeText(path.join(outputDir, '思想索引.txt'), records);
fs.copyFileSync(roundJsonPath, path.join(outputDir, '思想索引.json'));
fs.copyFileSync(roundCsvPath, path.join(outputDir, '思想索引.csv'));
writeProofreadNote(path.join(outputDir, '校对说明.md'), payload, dropped);

console.log(
  `Proofread ${payload.book.title}: ${records.length}/${extraction.records.length} kept, ${dropped.length} dropped. Categories: ${payload.book.category_counts
    .map((item) => `${item.category}=${item.count}`)
    .join(', ')}`,
);
