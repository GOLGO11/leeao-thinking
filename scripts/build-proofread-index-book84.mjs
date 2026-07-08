import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 84;
const bookTitle = '李敖颠倒众生';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT084-002', '段落重心是李敖自我姿态，公共思想索引价值不如同篇用人和人格定位条目。'],
  ['LAT084-027', '段落后半大量转入康宁祥个人丑闻，解读方法被人身攻防稀释。'],
  ['LAT084-044', '段落以地域气派评断张学良用人为主，表述过宽且独立思想密度不足。'],
  ['LAT084-051', '闯空门比喻攻击性强，政治判断与后续外交烂摊子条目重复。'],
  ['LAT084-052', '段落集中于李登辉出访困境，时事情境过窄。'],
  ['LAT084-062', '段落主要为族群互殴比较，长期可检索思想价值不足。'],
  ['LAT084-067', '金正日礼遇细节偏新闻解读，保留同篇更核心的谈判身份条目。'],
  ['LAT084-070', '两韩统一与列强口是心非已由同篇台湾战场和国家承认条目覆盖。'],
  ['LAT084-072', '段落围绕单次媒体措辞纠偏，过窄且标题承载力有限。'],
  ['LAT084-081', '记者会套招判断偏现场爆料，保留同组更稳定的善意行动与一中定义条目。'],
  ['LAT084-084', '嘴皮善意与 LAT084-082 重复，后者概念更清楚。'],
  ['LAT084-094', '最高领袖亲民秀与 LAT084-085 的竞选状态判断重复。'],
  ['LAT084-097', '段落重心是谢然之个人攻防，新闻自由判断已有更稳定条目。'],
  ['LAT084-101', '西安事变民族道德判断与 LAT084-043 重复。'],
  ['LAT084-111', '民视集体诉讼编号式行动说明，与 LAT084-119 重复。'],
  ['LAT084-113', '党政退出媒体主题已由 LAT084-078 与 LAT084-105 承载。'],
  ['LAT084-114', '段落是李敖个人诉讼抗辩，技术性过强。'],
  ['LAT084-117', '段落重心是蔡同荣个人下台攻防，思想索引价值偏低。'],
  ['LAT084-118', '民视股权返还与 LAT084-119 的集体诉讼条目重复。'],
  ['LAT084-123', '两万投资人集体诉讼与 LAT084-119 重复。'],
  ['LAT084-126', '段落围绕唐飞识人细节展开，革命失落主题承载不清。'],
  ['LAT084-128', '标题与段落承载不一致，段落实际只是国防捐与戒急用忍比较。'],
  ['LAT084-130', '段落大量转入大学校长个人攻防，公共判断被稀释。'],
  ['LAT084-132', '标题与段落承载不一致，且与革命失落主题重复。'],
  ['LAT084-148', '蒋介石官邸收回议题过窄，公共财产判断被个案细节淹没。'],
  ['LAT084-154', '尹案推动取决于总统摊牌，属案件推进判断，保留更稳定的法权条目。'],
  ['LAT084-155', '段落偏政治爆料链条，长期思想索引价值不如法权程序条目。'],
  ['LAT084-158', '回扣层级推测偏案件爆料，保留证物、诽谤、冤案真相等更稳定判断。'],
  ['LAT084-161', '段落混入康宁祥私生活攻防，监察失职判断被稀释。'],
  ['LAT084-162', '谁先宣布逃亡属于尹案线索细节，过窄。'],
  ['LAT084-164', '段落过短，保密失控主题已由证物保管链条目覆盖。'],
  ['LAT084-167', '来宾李美葵发言，不属于李敖自己的判断段。'],
  ['LAT084-168', '来宾李庆华发言，不属于李敖自己的判断段。'],
  ['LAT084-169', '来宾李庆华发言，不属于李敖自己的判断段。'],
  ['LAT084-170', '来宾李庆华发言，不属于李敖自己的判断段。'],
]);

const overrides = new Map([
  ['LAT084-001', { title: '颠倒众生是逆向求正' }],
  ['LAT084-003', { title: '用人开放才是真度量' }],
  ['LAT084-005', { title: '法院不能欺善怕恶' }],
  ['LAT084-006', { title: '尊重法律就该亲自到庭' }],
  ['LAT084-007', { title: '新闻评论贵在快速解读' }],
  ['LAT084-008', { title: '白皮书不能乱用概念' }],
  ['LAT084-009', { title: '能源政策要有替代方案' }],
  ['LAT084-010', { title: '控制媒体就是控制言论' }],
  ['LAT084-011', { title: '坦白条件比装病坦荡' }],
  ['LAT084-014', { title: '历史记录之外还有解释权' }],
  ['LAT084-015', { title: '解释历史需要第二层工夫' }],
  ['LAT084-018', { title: '史料会从意外处出土' }],
  ['LAT084-021', { title: '统派不能只靠大声口号' }],
  ['LAT084-023', { title: '放弃领土会落入违宪逻辑' }],
  ['LAT084-025', { title: '新闻事件需要解读方法' }],
  ['LAT084-033', { title: '导读不能替代法律依据' }],
  ['LAT084-034', { title: '广电法也该进入废除范围' }],
  ['LAT084-036', { title: '政治暴力会留下示范' }],
  ['LAT084-037', { title: '红墨水事件先是法律个案' }],
  ['LAT084-040', { title: '弱者也有抗议权' }],
  ['LAT084-045', { title: '档案断裂遮蔽历史真相' }],
  ['LAT084-048', { title: '管不了调查局就该自责' }],
  ['LAT084-054', { title: '身份不能任意分身' }],
  ['LAT084-056', { title: '正名就是名实相符' }],
  ['LAT084-057', { title: '特务黑资料可控制局面' }],
  ['LAT084-058', { title: '养案才能交换条件' }],
  ['LAT084-061', { title: '暴力示范不能选择性遗忘' }],
  ['LAT084-068', { title: '抱美国大腿仍可能被踢开' }],
  ['LAT084-077', { title: '现状会被实力变化打破' }],
  ['LAT084-080', { title: '新闻公平是广电法要求' }],
  ['LAT084-082', { title: '善意必须落实为行动' }],
  ['LAT084-088', { title: '失败者风度不是接受赏赐' }],
  ['LAT084-090', { title: '个人不能等同国家' }],
  ['LAT084-098', { title: '党务密令会钳制复刊' }],
  ['LAT084-102', { title: '赵四陪关是主动爱情' }],
  ['LAT084-104', { category: '政治', title: '掌权者不能包揽好事' }],
  ['LAT084-107', { title: '汉学比本土学更世界性' }],
  ['LAT084-110', { title: '假斗士会遮蔽真受难者' }],
  ['LAT084-112', { title: '对国民党民进党一视同仁' }],
  ['LAT084-119', { title: '集体诉讼让股东有尊严' }],
  ['LAT084-122', { title: '言论自由要给申辩空间' }],
  ['LAT084-124', { title: '党政法院力量破坏公平竞争' }],
  ['LAT084-129', { category: '知识', title: '太学祭酒象征知识分子高位' }],
  ['LAT084-131', { category: '政治', title: '反革命概念会强制革命' }],
  ['LAT084-138', { title: '表达要情信词巧' }],
  ['LAT084-139', { title: '表达要因人而异' }],
  ['LAT084-149', { title: '竞争要创造优势规则' }],
  ['LAT084-151', { title: '性出版审查应区分表达' }],
  ['LAT084-156', { title: '诽谤死者也要负法律责任' }],
  ['LAT084-157', { title: '证物保管链不能不追究' }],
  ['LAT084-160', { title: '诉讼可以用来取得证据' }],
  ['LAT084-163', { title: '办案方向被误导就难水落石出' }],
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
    .replace(/[《》“”‘’！？。，、：；（）()\s]/g, '')
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
    '校对轮处理：',
    '',
    '- 删除来宾原话、过窄时政推进、重复案件材料、过重个人攻防和标题承载不一致的条目。',
    '- 保留逆向思考、历史解释权、资料证据方法、媒体管制、两岸政治、法权程序、人格判断和少量情爱/生死观。',
    '- 只调整取舍、标题、分类与关键词；所有 `description` 均未改写。',
    '',
    '分类统计：',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    `提取轮 ${payload.book.source_count} 条，校对轮保留 ${payload.records.length} 条，删除 ${payload.book.dropped_count} 条。`,
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
      '校对轮删除来宾原话、过窄时政推进、重复案件材料、过重个人攻防和标题承载不一致的条目；保留逆向思考、历史解释权、资料证据方法、媒体管制、两岸政治、法权程序、人格判断和少量情爱/生死观。只调整取舍、标题、分类与关键词，description 未改写。',
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
