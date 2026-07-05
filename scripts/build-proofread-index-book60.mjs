import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '060.李敖书翰集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT060-005', '出版法处分段落偏技术性法条铺垫，违宪诉讼、旨趣争讼和留下记录条目已能承载出版自由抗争，校对轮删除。'],
  ['LAT060-021', '流言靡惑偏朋友间人际安慰，独立思想入口不够稳定，校对轮删除。'],
  ['LAT060-039', '删序反讽以征书广告和查禁序文事实为主，思想判断不够集中，校对轮删除。'],
  ['LAT060-042', '好人做事偏称许收信人，后续恶势逼退和退缩证谣更能呈现好人做事的判断，校对轮删除。'],
  ['LAT060-046', '水法抗争是自来水案行动步骤引子，法治进步和认错起点条目更独立，校对轮删除。'],
  ['LAT060-058', '刁民传与反戒讼、刁民法治同题，后两条更完整呈现法治精神，校对轮删除。'],
  ['LAT060-062', '表演上下限依赖“特别座”“普通座”语境，爱国换法条目更直接，校对轮删除。'],
  ['LAT060-063', '爱国不改是前信事后说明，与爱国换法同题，校对轮删除。'],
  ['LAT060-066', '学术代理与学术分赃同题，学术分赃和私人拔尖条目已承载学界资源判断，校对轮删除。'],
  ['LAT060-068', '重奖少数是私人拔尖原则的细则，保留私人拔尖、重金精选和基金深耕即可，校对轮删除。'],
  ['LAT060-076', '白发文化偏劝募修辞，思想主旨不够独立，校对轮删除。'],
  ['LAT060-080', '坦率历史主要是写信开场和受托说明，史实校验、古装全套条目更能承载历史方法，校对轮删除。'],
  ['LAT060-087', '资料维生偏生计事实，独立不吃饭和文人定价条目更具索引价值，校对轮删除。'],
  ['LAT060-091', '非法查扣段落过短且偏程序通知，扣单外送和记录横行条目更完整，校对轮删除。'],
  ['LAT060-094', '处理方法偏单案过程，扣单外送和记录横行条目已呈现证据保存与反击方法，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT060-001', { title: '婚事不靠家长', keywords: '婚姻,家长,旧习' }],
  ['LAT060-002', { title: '胡适成新朴学', keywords: '胡适,科学方法,乾嘉' }],
  ['LAT060-003', { title: '西化已成事实', keywords: '东西文化,西化,新思潮' }],
  ['LAT060-004', { title: '东方文明假戏', keywords: '东方文明,儒家,假戏' }],
  ['LAT060-006', { title: '违法侵权要赔偿', keywords: '宪法,民法,国家赔偿' }],
  ['LAT060-007', { title: '出版自由违宪诉讼', keywords: '出版自由,违宪,官司' }],
  ['LAT060-008', { title: '登记旨趣可争', keywords: '出版登记,解释,官司' }],
  ['LAT060-009', { title: '无效也留记录', keywords: '历史记录,诉讼,方法' }],
  ['LAT060-010', { title: '监察要嫉恶', keywords: '监察,嫉恶,惩贪' }],
  ['LAT060-011', { title: '写儒林内史', keywords: '写作,高等教育,内外史' }],
  ['LAT060-012', { title: '走向十字街头', keywords: '知识分子,象牙塔,现实' }],
  ['LAT060-013', { title: '写作被迫从良', keywords: '文星,查禁,写作' }],
  ['LAT060-014', { title: '不化名作战', keywords: '化名,光明磊落,敌人' }],
  ['LAT060-015', { title: '读书多少的逻辑', keywords: '逻辑,推论,读书' }],
  ['LAT060-016', { title: '佞佛是思想未熟', keywords: '青年,佞佛,思想成熟' }],
  ['LAT060-017', { title: '自由主义兼淑世', keywords: '自由主义,个人主义,改良' }],
  ['LAT060-018', { title: '情理两分', keywords: '情理,是非,中国人' }],
  ['LAT060-019', { title: '理来抓破脸', keywords: '理,面子,得罪' }],
  ['LAT060-020', { title: '揭穿老好人', keywords: '老好人,真面目,知人论世' }],
  ['LAT060-022', { title: '文化创建不可与虎谋皮', keywords: '文警,文化创建,青年' }],
  ['LAT060-023', { title: '沉默也是反击', keywords: '沉默,反击,同情' }],
  ['LAT060-024', { title: '用著作正面反击', keywords: '思想与方法,著作,反击' }],
  ['LAT060-025', { title: '自由学人瞩目天下', keywords: '自由学人,天下,小人' }],
  ['LAT060-026', { title: '文化创建责任在己', keywords: '文化创建,责任,知识界' }],
  ['LAT060-027', { title: '放人可做人证', keywords: '出境,自由,政府' }],
  ['LAT060-028', { title: '朋友也会蒙蔽', keywords: '朋友,判断,真相' }],
  ['LAT060-029', { title: '理智对待朋友', keywords: '朋友,学生,感情' }],
  ['LAT060-030', { title: '版权授权公平', keywords: '版权,授权,fair-play' }],
  ['LAT060-031', { title: '独立文人谋生', keywords: '独立文人,广告,谋生' }],
  ['LAT060-032', { title: '争取出版自由', keywords: '查禁,出版自由,精神' }],
  ['LAT060-033', { title: '书也该能出口', keywords: '书展,出版,言论自由' }],
  ['LAT060-034', { title: '大学演讲禁令', keywords: '台大,演说,禁令' }],
  ['LAT060-035', { title: '不合作主义', keywords: '知识分子,民主自由,非暴力' }],
  ['LAT060-036', { title: '青年少盲动', keywords: '青年,行动,思想' }],
  ['LAT060-037', { title: '清除烂好人', keywords: '好人,恶人,批评' }],
  ['LAT060-038', { title: '好斗而不屈', keywords: '好斗,真相,陷害' }],
  ['LAT060-040', { title: '坚忍是武器', keywords: '坚忍,政权,等待' }],
  ['LAT060-041', { title: '会用书不上当', keywords: '看书,用书,上当' }],
  ['LAT060-043', { title: '恶势力逼退好人', keywords: '恶势力,好人,退志' }],
  ['LAT060-044', { title: '退缩会坐实谣言', keywords: '退缩,压力,谣言' }],
  ['LAT060-045', { title: '性资料考据', keywords: '手淫,性心理学,慎独' }],
  ['LAT060-047', { title: '法治从认真开始', keywords: '法治,正义,公务员' }],
  ['LAT060-048', { title: '认错是进步起点', keywords: '公务员,认错,吏治' }],
  ['LAT060-049', { title: '望孙的婆媳结构', keywords: '婆婆,孙子,生产' }],
  ['LAT060-050', { title: '司法黑暗三十年', keywords: '法院,法官,司法' }],
  ['LAT060-051', { title: '法律失灵逼反抗', keywords: '法律,冤抑,暴戾' }],
  ['LAT060-052', { title: '鼓动合法途径', keywords: '知识人,合法途径,群众' }],
  ['LAT060-053', { title: '戒讼是法治大敌', keywords: '戒讼,法治,认真' }],
  ['LAT060-054', { title: '新闻要扒粪', keywords: '新闻,扒粪,记者' }],
  ['LAT060-055', { title: '正视人间', keywords: '现实,正视,虚玄' }],
  ['LAT060-056', { category: '知识', title: '知识人不可自陶醉', keywords: '知识人,小世界,御用文人' }],
  ['LAT060-057', { title: '刁民养成法治', keywords: '刁民,法治,认真' }],
  ['LAT060-059', { title: '存在主义不玄', keywords: '存在主义,玄虚,学问' }],
  ['LAT060-060', { title: '文戏说', keywords: '文人,戏子,文戏' }],
  ['LAT060-061', { title: '换一种爱国', keywords: '爱国,知识分子,社会改良' }],
  ['LAT060-064', { title: '基金先定方向', keywords: '文化基金,方向,章程' }],
  ['LAT060-065', { title: '学术分赃', keywords: '学术,奖金,学阀' }],
  ['LAT060-067', { title: '私人资助要拔尖', keywords: '科学,私人资助,拔尖' }],
  ['LAT060-069', { title: '重金精选', keywords: '讲座,大学,精选' }],
  ['LAT060-070', { title: '基金要深耕', keywords: '文化基金,出版,学校' }],
  ['LAT060-071', { title: '出版日期意识', keywords: '出版年月日,历史,新闻' }],
  ['LAT060-072', { title: '卖文活', keywords: '卖文,环境,文字' }],
  ['LAT060-073', { title: '文星被接管', keywords: '文星,查禁,接管' }],
  ['LAT060-074', { title: '出版是单行道', keywords: '文化出版,出路,时代' }],
  ['LAT060-075', { title: '低调出版八原则', keywords: '杂志,书店,原则' }],
  ['LAT060-077', { title: '抄袭铁证', keywords: '台大,抄袭,铁证' }],
  ['LAT060-078', { title: '知识人非为私斗', keywords: '知识分子,婚变,恶势力' }],
  ['LAT060-079', { title: '婚事归当事人', keywords: '婚姻,家长,当事人' }],
  ['LAT060-081', { title: '史实要校验', keywords: '电影,史实,年代' }],
  ['LAT060-082', { title: '古装片要全套说明', keywords: '电影,时代背景,服饰' }],
  ['LAT060-083', { title: '剑道精神', keywords: '剑,哲理,越绝书' }],
  ['LAT060-084', { title: '没有理由悲观', keywords: '政权,忍耐,胜利' }],
  ['LAT060-085', { title: '文化事业胜党政', keywords: '文化事业,党政,群众' }],
  ['LAT060-086', { title: '侦听器反击', keywords: '软禁,侦听器,人权' }],
  ['LAT060-088', { title: '不吃他们的饭', keywords: '收买,气派,独立' }],
  ['LAT060-089', { title: '资料也有稿价', keywords: '文人,资料,稿费' }],
  ['LAT060-090', { title: '软禁即跟监', keywords: '软禁,跟监,警总' }],
  ['LAT060-092', { title: '此账不会完', keywords: '坚忍,乱世,抗争' }],
  ['LAT060-093', { title: '证据外送', keywords: '非法查扣,联合国,纽约时报' }],
  ['LAT060-095', { title: '记录横行', keywords: '横行,记录,散布' }],
  ['LAT060-096', { title: '断讯反监控', keywords: '临检,报复,消息来源' }],
  ['LAT060-097', { title: '歪曲死者', keywords: '殷海光,死人,斯大林' }],
  ['LAT060-098', { title: '思想工作者懦弱', keywords: '思想工作者,懦弱,势利' }],
  ['LAT060-099', { title: '思想工作要戒惧', keywords: '思想工作,学问,工具' }],
  ['LAT060-100', { title: '创造才是真快乐', keywords: '名利,创造,快乐' }],
  ['LAT060-101', { title: '半囚状态', keywords: '看管,离境,人权' }],
  ['LAT060-102', { title: '教育监狱', keywords: '教育,考试,学校' }],
  ['LAT060-103', { title: '琼瑶伤青年', keywords: '琼瑶,青年,女作家' }],
  ['LAT060-104', { title: '灵肉分裂', keywords: '女人,灵肉,女作家' }],
  ['LAT060-105', { title: '灵肉失衡', keywords: '女人,灵肉,悲哀' }],
  ['LAT060-106', { title: '爱情只求快乐', keywords: '爱情,快乐,痛苦' }],
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
    'source_id',
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

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
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
    return {
      ...record,
      ...edit,
      id: `LAT060-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
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
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除技术性法条铺垫、纯人际安慰、事实性过桥段、同题重复、基金细则中过密条目、劝募修辞、案情程序短段和不够独立的生计事实；保留能独立呈现李敖法权意识、写作方法、知识分子判断、人格伦理、政治自由、婚恋与灵肉判断的原文段落。description 未改写。',
  },
  records,
  dropped,
};

const jsonPath = path.join(outputDir, '思想索引-校对轮.json');
const csvPath = path.join(outputDir, '思想索引-校对轮.csv');
const mdPath = path.join(outputDir, '思想索引-校对轮.md');
const notePath = path.join(outputDir, '校对说明.md');

fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(csvPath, records);
writeMarkdown(mdPath, payload);

const noteLines = [
  '# 《李敖书翰集》思想索引校对说明',
  '',
  `- 校对输入：${path.relative(rootDir, extractionPath)}`,
  `- 校对输出：${path.relative(rootDir, jsonPath)}`,
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 校对原则',
  '',
  '- description 只沿用原书段落，不做转述和改写。',
  '- 删除技术性法条铺垫、纯人际安慰、事实性过桥段、同题重复、基金细则中过密条目、劝募修辞、案情程序短段和不够独立的生计事实。',
  '- 书信里的出版查禁、诉讼策略、软禁跟监和权利救济按“法权”归类；党外路线、政府权力和政治行动按“政治”归类；学术、文化基金、历史考证和知识分子判断按“知识”归类。',
  '- 情爱条目只收婚恋、婆媳、灵肉、爱情痛苦和性资料等主旨明确的段落，不把私人应酬或单句玩笑扩展为思想条目。',
  '',
];

if (dropped.length) {
  noteLines.push('## 删除条目', '');
  for (const item of dropped) {
    noteLines.push(`- ${item.id} ${item.title}：${item.reason}`);
  }
  noteLines.push('');
}

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread 060.李敖书翰集: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
