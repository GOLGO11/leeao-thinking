import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 86;
const bookTitle = '李敖大哥大';
const sequence = String(bookSeq).padStart(3, '0');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT086-016', '以貌取人段落偏节目调侃和个人相面式判断，长期思想索引价值较弱。'],
  ['LAT086-025', '权力家族与性政治段落过度依赖黄色历史轶闻，思想概念可由其他权力批判条目承载。'],
  ['LAT086-039', '阿扁当皇帝段落为除夕节目现场讽刺，长期权力与短线政治主题由 LAT086-055 承载。'],
  ['LAT086-053', '学生负担段落偏教育个案插叙，独立思想密度不如同组二二八与教育改革条目。'],
  ['LAT086-092', '三党合作变色判断偏当期政党攻防，索引稳定性较弱。'],
  ['LAT086-093', '新党由台湾人主导属于具体政党战术，长期思想价值较低。'],
  ['LAT086-096', '排宋条款段落依赖亲民党当时布局，较偏时局战术。'],
  ['LAT086-099', '新党颜色表述偏党务策略，主题已由其他政党制度条目承载。'],
  ['LAT086-104', '总统制坏制度主题由 LAT086-120 与 LAT086-152 更集中承载。'],
  ['LAT086-105', '推责特色偏陈水扁个人政治判断，概念不够展开。'],
  ['LAT086-109', '新党最后机会偏当期政党存亡判断，长期索引价值较弱。'],
  ['LAT086-110', '金门公投反制属于具体政治战术，校对轮不单列。'],
  ['LAT086-119', '李登辉频繁修宪主题与 LAT086-120 总统制批判重叠，保留后者。'],
  ['LAT086-128', '钱穆市产与仁义道德主题已由 LAT086-020 承载，本条重复。'],
  ['LAT086-133', '新闻专业现场判断依赖莫文蔚节目个案，思想独立性不足。'],
  ['LAT086-151', '大学生思想太弱与 LAT086-150 同组，校对轮保留前者更完整的大学生政治化判断。'],
  ['LAT086-156', '李敖没有做狗偏个人自我定位，且与全书公共思想索引目标距离较远。'],
  ['LAT086-163', 'WHA遭挡关偏单一国际事件，台湾尊严与外交依赖主题已由相邻条目承载。'],
  ['LAT086-173', '科技基本法段落偏政策新闻查错，思想概念较窄。'],
]);

const overrides = new Map([
  ['LAT086-001', { title: '张学良拒绝东北独立' }],
  ['LAT086-002', { title: '历史平反要靠证据' }],
  ['LAT086-005', { title: '规则不能只供参考' }],
  ['LAT086-006', { title: '冗长发言是议会技术' }],
  ['LAT086-008', { title: '卖国判断要看秘密文件' }],
  ['LAT086-010', { title: '慰安妇尊严不能出售' }],
  ['LAT086-011', { title: '尊严不能选择性使用' }],
  ['LAT086-012', { title: '政治也需要专业' }],
  ['LAT086-014', { title: '台独口号常被选举化' }],
  ['LAT086-015', { title: '敌视大陆不是出路' }],
  ['LAT086-017', { title: '历史真相要有人还原' }],
  ['LAT086-018', { title: '台独政治只做小动作' }],
  ['LAT086-021', { title: '留在台湾不等于做狗' }],
  ['LAT086-023', { title: '扫黄不能变成滥权' }],
  ['LAT086-024', { title: '隐私受害者不该被审判' }],
  ['LAT086-027', { title: '自慰问题需要性教育' }],
  ['LAT086-030', { title: 'CHINA名号无法被赶出场' }],
  ['LAT086-032', { title: '独裁者也会被奴才解读' }],
  ['LAT086-033', { title: '撕破脸不是国会规范' }],
  ['LAT086-035', { title: '神圣者也有身体问题' }],
  ['LAT086-037', { title: '知识分子影响力已经没落' }],
  ['LAT086-038', { title: '冤案不能因轮替被处决' }],
  ['LAT086-040', { title: '两岸称谓有法律定义' }],
  ['LAT086-041', { title: '土法炼钢支撑写作' }],
  ['LAT086-042', { title: '写小说不必亲临现场' }],
  ['LAT086-044', { title: '反对台湾分离主义' }],
  ['LAT086-046', { category: '文化', title: '佛教被混乱才有取经' }],
  ['LAT086-047', { title: '外蒙古独立有强权交易' }],
  ['LAT086-048', { title: '承认现实也必须修法' }],
  ['LAT086-050', { title: '二二八叙事不能单面化' }],
  ['LAT086-051', { title: '二二八研究要拿证据' }],
  ['LAT086-055', { title: '终身权力也会减少短线政治' }],
  ['LAT086-056', { title: '台湾经济依赖大陆市场' }],
  ['LAT086-057', { title: '民选总统不等于民选党主席' }],
  ['LAT086-058', { title: '知识分子要敢说真话' }],
  ['LAT086-059', { title: '本土语言政策会消耗竞争力' }],
  ['LAT086-060', { title: '台湾语言仍在中国文化中' }],
  ['LAT086-061', { title: '台湾是美国国防线一环' }],
  ['LAT086-063', { title: '不要只做华盛顿走狗' }],
  ['LAT086-064', { title: '盗版常见于弱势文化' }],
  ['LAT086-067', { title: '被质询者不能反问' }],
  ['LAT086-068', { title: '议员有风闻言事权' }],
  ['LAT086-069', { title: '主权宣示应走向钓鱼台' }],
  ['LAT086-070', { title: '监狱性侵来自封闭权力' }],
  ['LAT086-071', { title: '禁欲制度遮不住欲望' }],
  ['LAT086-072', { category: '文化', title: '允许婚配比伪禁欲合理' }],
  ['LAT086-073', { title: '正名暴露尚未独立' }],
  ['LAT086-074', { title: '台独表演像张天师捉鬼' }],
  ['LAT086-075', { title: '台独必须给出时间表' }],
  ['LAT086-076', { title: '总统兼党主席是民主倒退' }],
  ['LAT086-077', { title: '利益冲突应当回避' }],
  ['LAT086-079', { title: '言论自由不能被权力玩弄' }],
  ['LAT086-080', { title: '言论自由是第一自由' }],
  ['LAT086-081', { title: '不喜欢媒体也要保护权利' }],
  ['LAT086-082', { title: '国防不能成为黑暗统治护符' }],
  ['LAT086-083', { title: '政党领袖应进入国会' }],
  ['LAT086-084', { title: '丑闻要摊在阳光下' }],
  ['LAT086-085', { title: '信念被摧毁会灭亡国家' }],
  ['LAT086-086', { title: '外患罪会迫害新闻自由' }],
  ['LAT086-088', { title: '泄密证据仍应被调查' }],
  ['LAT086-089', { title: '国统纲领是一中依据' }],
  ['LAT086-090', { title: 'WTO仍需要两岸协商' }],
  ['LAT086-091', { title: '法院也曾配合政治私通' }],
  ['LAT086-095', { title: '儒将神话要拆开看' }],
  ['LAT086-097', { title: '鉴定必须依靠证据' }],
  ['LAT086-098', { title: '人格信用会影响事实判断' }],
  ['LAT086-100', { title: '国民党已成历史名词' }],
  ['LAT086-101', { title: '外籍立委有利益冲突' }],
  ['LAT086-102', { title: '国家利益高于政党' }],
  ['LAT086-103', { title: '政治问题也可法律解决' }],
  ['LAT086-106', { title: '言论自由要保护异议主持' }],
  ['LAT086-107', { title: '阿扁政权靠欺骗得来' }],
  ['LAT086-108', { title: 'Call-in节目会培养暴力' }],
  ['LAT086-111', { title: '警察国家会窃听虐待' }],
  ['LAT086-112', { title: '妇女政策不能只是表演' }],
  ['LAT086-113', { title: '政府不可诱民入罪' }],
  ['LAT086-115', { title: '遇到隐私问题不必否认' }],
  ['LAT086-116', { title: '媒体人应批政府而非护航' }],
  ['LAT086-117', { title: '缩头也一样挨刀' }],
  ['LAT086-120', { title: '总统制难以成功' }],
  ['LAT086-121', { title: '色情影像可疏解欲望' }],
  ['LAT086-122', { title: '被偷拍者可开明面对' }],
  ['LAT086-123', { title: '美国言论自由也会低头' }],
  ['LAT086-124', { title: '性工作者也能进入国会' }],
  ['LAT086-125', { title: '搜查反而证明言论自由受害' }],
  ['LAT086-126', { title: '知识分子要与权力过不去' }],
  ['LAT086-127', { title: '打压媒体不配谈杰斐逊' }],
  ['LAT086-129', { title: '台湾是美国的儿政府' }],
  ['LAT086-130', { title: '首都仍然不是台北' }],
  ['LAT086-132', { title: '台湾民主是假的' }],
  ['LAT086-134', { title: '美国并非抗战恩人' }],
  ['LAT086-135', { title: '百分百言论自由被背叛' }],
  ['LAT086-136', { title: '报纸要有风骨' }],
  ['LAT086-137', { title: '一介书生也能办报' }],
  ['LAT086-139', { title: '法律文书不能写阿扁' }],
  ['LAT086-140', { title: '台独是事实不是理论' }],
  ['LAT086-141', { title: '师者要用人格传道' }],
  ['LAT086-142', { title: '警察国家会变恐怖' }],
  ['LAT086-143', { title: '靠嘴巴也能骗来政权' }],
  ['LAT086-145', { title: '知识分子要有专业和骨气' }],
  ['LAT086-146', { title: '总统兼党主席威胁民主' }],
  ['LAT086-147', { title: '用过去言论检验李登辉' }],
  ['LAT086-148', { title: '抗拒大陆经济无济于事' }],
  ['LAT086-149', { title: '污点证人也可用于同归于尽' }],
  ['LAT086-150', { title: '大学生被政治骗成小绵羊' }],
  ['LAT086-152', { title: '内阁制比总统制稳健' }],
  ['LAT086-153', { title: '拒领日本钱可保留尊严' }],
  ['LAT086-154', { category: '法权', title: '软件使用涉及知识产权' }],
  ['LAT086-155', { title: '核废问题要放进一中框架' }],
  ['LAT086-157', { title: '国统纲领仍说中国统一' }],
  ['LAT086-158', { title: '独立方案寄托美国承认' }],
  ['LAT086-160', { title: '国内法下仍是中国人' }],
  ['LAT086-161', { title: '金门姿态是在骗美国' }],
  ['LAT086-162', { title: '台独是事实不是理论' }],
  ['LAT086-164', { title: '统一言论暴露李登辉分裂' }],
  ['LAT086-165', { title: '美国支持一个中国' }],
  ['LAT086-166', { title: '阿米巴政治只做小动作' }],
  ['LAT086-168', { title: '美国面前没有台湾尊严' }],
  ['LAT086-169', { title: '合成照片会制造神话' }],
  ['LAT086-170', { title: '出生地条款不合宪政' }],
  ['LAT086-171', { title: '台湾做美国棋子互斗' }],
  ['LAT086-172', { title: '青年反台独会觉醒' }],
]);

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
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
  return taxonomy.map((category) => ({
    category,
    count: records.filter((record) => record.category === category).length,
  }));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’！？。，、：；（）()\s]/gu, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
      lines.push(`- 提取轮编号：${record.source_id}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(filePath, records) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}｜提取轮编号：${record.source_id}`);
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
    '校对重点：',
    '',
    '- 删除过窄时政战术、同题重复、节目现场讽刺、个人自我定位和思想密度不足的条目。',
    '- 保留言论自由、两岸定位、历史证据、法权程序、政治制度、性与隐私、文化教育和知识分子人格中能独立检索的判断段。',
    '- 只调整取舍、标题、分类、关键词和编号；所有保留条目的 `description` 均未改写。',
    '',
    '分类统计：',
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
if (unknownDrops.length) {
  throw new Error(`Unknown drop ids: ${unknownDrops.join(', ')}`);
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

const payload = {
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除过窄时政战术、同题重复、节目现场讽刺、个人自我定位和思想密度不足的条目；保留言论自由、两岸定位、历史证据、法权程序、政治制度、性与隐私、文化教育和知识分子人格中能独立检索的判断段。只调整取舍、标题、分类、关键词和编号，description 未改写。',
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
