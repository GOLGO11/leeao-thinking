import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const sequence = '093';
const bookTitle = '快意还乡——李敖神州文化之旅';
const bookDir = path.join(repoRoot, 'outputs', `${sequence}.${bookTitle}`);
const inputPath = path.join(bookDir, '思想索引-提取轮.json');

const outputJson = path.join(bookDir, '思想索引-校对轮.json');
const outputCsv = path.join(bookDir, '思想索引-校对轮.csv');
const outputMd = path.join(bookDir, '思想索引-校对轮.md');
const canonicalJson = path.join(bookDir, '思想索引.json');
const canonicalCsv = path.join(bookDir, '思想索引.csv');
const canonicalTxt = path.join(bookDir, '思想索引.txt');
const proofreadNote = path.join(bookDir, '校对说明.md');

const categories = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(categories);

const dropReasons = new Map([
  [3, '偏开场调侃，思想独立性较弱'],
  [42, '偏朋友互怼和现场玩笑，索引独立性较弱'],
  [99, '非李敖原话，属于整理者评述'],
]);

const titleRules = [
  [/喜欢这些东西不能有贪念|兰亭序.*武则天/u, '爱古物不能有贪念'],
  [/不查禁你这么多书，也不会亡党亡国|喷火口/u, '查禁停止不会亡党亡国'],
  [/自由和爱情一样，都要列举|中华人民共和国的宪法/u, '自由清单写在宪法里'],
  [/我要《宪法》，我不要自由主义|谁还要自由主义/u, '要宪法不要自由主义'],
  [/自由主义只是两个部分|反求诸己.*反求诸宪法/u, '自由主义分为两种反求'],
  [/心灵开放是重要的|心灵开放.*真正的自由主义者/u, '心灵开放是自由主义第一层'],
  [/什么东西开放，言论自由会更安全|A片|小电影/u, '言论自由开放后会常态化'],
  [/这个房屋里面没有汉奸|祖国大地上，没有谁不爱中国/u, '祖国大地没有汉奸'],
  [/你的根就在这里|清华大学.*自了汉/u, '清华教育不能培养自了汉'],
  [/中文是全世界最简单的文字|现代科技，打字/u, '中文文法适合现代输入'],
  [/四字成语来表达思想|夺门而出|望风而逃/u, '四字成语保留中文思路'],
  [/中文有它好的语言，好的表现法，好的意境|待月西厢下/u, '中文意境要用现代科技发扬'],
  [/不可不听，不能再听/u, '演讲不可不听也不能再听'],
  [/三场讲演其实是一个讲演|三个路线走下去/u, '三场演讲是一场整体表达'],
  [/林肯总统.*如果我做对了|杰弗逊.*言论自由/u, '总统容忍辱骂才能养成言论自由'],
  [/北京政府.*休戚相关|北京政府的祸福/u, '北京政府祸福与我休戚相关'],
  [/我来的时候根本没有带梦来|看祖国的进步/u, '看祖国进步不必带梦'],
  [/文学和思想对我而言|文学方法去表达/u, '文学可以表达思想'],
  [/读万卷书，行万里路|行零里路/u, '读书胜过奔波旅行'],
  [/每一页有重要的部分|大卸八块，五马分尸/u, '读书要拆书并分类'],
  [/历史考证.*小说|做好历史考证/u, '历史小说要以考证为底'],
  [/利玛窦.*传教士.*科学技术|认识西方文明/u, '西学传入需要智慧转化'],
  [/经过历史上两次破坏|利玛窦墓/u, '利玛窦墓见证西学来华'],
  [/宗教是人们的鸦片.*席勒|德国诗人席勒/u, '宗教鸦片说未必出自马克思'],
  [/用证据来证明了我的观点|鲁迅该是伟大的文学家/u, '批评鲁迅要拿证据'],
  [/狂人.*文化水平|自信的方法发挥/u, '自信表达会被误称为狂'],
  [/我的标准是自保，不是害人|斯巴达式的教育/u, '自保教育是教人做强者'],
  [/政治家的眼光和老百姓是不一致|自由不在外面，自由在我们眼前/u, '自由不在外面而在眼前'],
  [/自由主义本身是虚无缥缈|自由主义.*宪法/u, '自由主义要落到宪法现实'],
  [/新加坡的媒体逼我说出一个真相|自由主义.*换取.*宪法/u, '自由主义要换取宪法落实'],
  [/共产主义.*人类最好的理想|人类贪婪的过程/u, '共产主义理想要经过人性'],
  [/不再斗争的时候|风平浪静/u, '不再斗争是珍贵时刻'],
  [/民主.*英国人统治|争取民主.*太晚/u, '香港民主诉求要看历史时机'],
  [/感情用事会误事|不给女人投票权/u, '感情用事会误伤民主判断'],
  [/休戚与共.*共产党|快乐与痛苦都和共产党/u, '和共产党是休戚与共'],
  [/双腿.*没有踩在外国的土地|双脚没有踩在外国/u, '双脚从未踩在外国土地'],
  [/文化是一切根本|文化.*影响政治.*经济/u, '文化会影响政治经济'],
  [/三个指标性的大学|思想和文化上扎根/u, '三所大学是思想文化试点'],
  [/不要再谈理想问题|思凡.*现实问题/u, '思凡就是转向现实问题'],
  [/回到祖国的讲演分三场|金刚怒目.*菩萨低眉.*尼姑思凡/u, '三场演讲各有表达方法'],
  [/中国的语言有它的变化|风流.*坏字/u, '词义会随历史变迁'],
  [/党中央刊物《红旗》|共产党的叛徒/u, '政治立场会随着现实转换'],
  [/欲速则不达|违反了生产力/u, '富国强兵不能违背生产力'],
  [/很高兴看到了祖国|看到了未来/u, '祖国进步带来未来信心'],
  [/臭鸡蛋|武侠小说.*不入流|金庸.*假货/u, '批判对象不必全部吃完'],
];

function sourceSeq(record) {
  const match = String(record.id || record.source_id || '').match(/(\d+)$/);
  if (!match) throw new Error(`无法解析记录编号：${record.id}`);
  return Number(match[1]);
}

function stripSpeaker(text) {
  return String(text || '').trim().replace(/^(李敖|李|敖|答)[：:]\s*/u, '').trim();
}

function baseTitle(title) {
  return String(title || '').replace(/（\d+-\d+）$/u, '').trim();
}

function isWeakTitle(title) {
  const text = baseTitle(title);
  return /（\d+-\d+）$/u.test(title)
    || /中的.+判断$/u.test(text)
    || /^(好比说|一般的人|那不是|那是一种|想这个|我们|我|你|他|她|们|就是|这个|问题是|所以|当然|现在|过去|今天|因为|原因|并且|看了以后|文茜|死不要脸|人不是别人|说你看|没有|可是|在台湾大学|最后|刚才)/u.test(text)
    || text.length < 8
    || text.length > 24;
}

function cleanClause(text) {
  return String(text || '')
    .replace(/^[，,。、“”‘’「」：:\s]+/u, '')
    .replace(/^(所以|可是|但是|因为|因此|事实上|简单说|换句话说|我认为|我觉得|我告诉你|我告诉各位|我必须讲|我可以告诉你|大家知道|注意哦|你知道吗|为什么)/u, '')
    .replace(/[“”‘’「」]/gu, '')
    .replace(/\s+/gu, '')
    .trim();
}

function scoreClause(clause, index) {
  let score = 0;
  if (clause.length >= 8 && clause.length <= 22) score += 4;
  if (/不是|不能|不要|应该|必须|证明|真相|历史|自由|民主|中国|台湾|美国|日本|国民党|共产党|民进党|台独|宪法|法律|写作|文学|爱情|女人|男人|人生|经验|资料|证据/u.test(clause)) score += 4;
  if (/要|会|能|可以|来自|在于|不等于|并非/u.test(clause)) score += 1.5;
  if (index < 3) score += 0.5;
  if (/^(这是|这个|那种|一样|一个|第二|第一|第三|好比|举个例子|请你|你们|他们|我们|我)/u.test(clause)) score -= 2;
  if (/哈哈|谢谢|主持人|广告|观众|画面|开玩笑|美女|校花/u.test(clause)) score -= 4;
  return score;
}

function fallbackTitle(record) {
  const clauses = stripSpeaker(record.description)
    .split(/[。！？；，,：:]/u)
    .map(cleanClause)
    .filter((part) => part.length >= 8 && part.length <= 36)
    .filter((part) => !/谢谢|欢迎|节目|主持|掌声|画面|哈哈|开玩笑/u.test(part));

  const best = clauses
    .map((clause, index) => ({ clause, score: scoreClause(clause, index) }))
    .sort((a, b) => b.score - a.score)[0]?.clause;

  if (best && best.length >= 8) return best.slice(0, 22);
  return baseTitle(record.title).slice(0, 22);
}

function proofreadTitle(record) {
  const text = stripSpeaker(record.description);
  for (const [pattern, title] of titleRules) {
    if (pattern.test(text)) return title;
  }
  const original = baseTitle(record.title);
  if (!isWeakTitle(original)) return original;
  return fallbackTitle(record);
}

function classify(record, title) {
  const text = `${title} ${stripSpeaker(record.description)}`;
  if (/言论自由|思想自由|出版自由|查禁|禁书|坐牢|监狱|政治犯|法院|司法|法官|判决|法律|宪法|人权|诉讼|自由清单|自由主义要/u.test(title)) return '法权';
  if (/文化比政治更根本|文化会影响政治经济|民间文化|文化判断/u.test(title)) return '文化';
  if (/历史人物|历史故事/u.test(title)) return '知识';
  if (/做聪明中国人|好机会也可能被错过/u.test(title)) return '方法';
  if (/悲愤|亲情|有为主义|自保教育|自信表达|独善其身|人生|人格|尊严|战士|勇气|快乐|朋友|理想|独立|困境|情绪|晚年/u.test(title)) return '人格';
  if (/中华民国亡国|大陆身份|民主判断|香港民主|台湾人所著书|台湾|中国|大陆|祖国|美国|日本|国民党|共产党|民进党|蒋介石|李登辉|陈水扁|马英九|宋楚瑜|蔡英文|台独|统一|两岸|香港|民主|选举|总统|军购|国防|政府|国家|公投|政党|一中|九二共识|维持现状|自由主义|政治/u.test(title)) return '政治';
  if (/文化判断|文化会影响|民间文化|中文|汉字|语言|称谓|文化|国学|教育|大学|诗经|传统|艺术|词义|新文化|北大|清华|复旦/u.test(title)) return '文化';
  if (/证据|资料|真相|调查|标准|逻辑|方法|过程|间接经验|程序设计|门槛|成本|比较|判断|网络资讯|读书要拆书|聪明中国人/u.test(title)) return '方法';
  if (/写作|文章|文学|小说|白话文|出版|读者|书名|书籍|文字细腻|表达|演讲|稿子|历史小说|批评鲁迅|读书胜过|不可不听/u.test(title)) return '写作';
  if (/爱情|情爱|婚姻|女朋友|情人|恋爱|男女|妻子|丈夫|胡茵梦|威尔刚|避孕药|亲密/u.test(title)) return '情爱';
  if (/孔子|胡适|鲁迅|勾践|岳飞|典故|史料|历史典故|关公|三国|知识|遗忘|哲学|利玛窦|宗教鸦片|马克思|兰亭序|古物/u.test(title)) return '知识';

  if (/言论自由|宪法|法律|坐牢|查禁|禁书/u.test(text)) return '法权';
  if (/台湾|中国|大陆|祖国|美国|日本|国民党|共产党|民进党|蒋介石|马英九|台独|统一|两岸|香港|民主|政府|国家/u.test(text)) return '政治';
  if (/中文|文化|大学|教育|传统|语言/u.test(text)) return '文化';
  if (/写作|文学|小说|文章|读书|演讲/u.test(text)) return '写作';
  if (/证据|资料|方法|判断|标准|逻辑|网络|资讯/u.test(text)) return '方法';
  if (/胡适|鲁迅|利玛窦|史料|历史|典故/u.test(text)) return '知识';
  if (/爱情|情爱|婚姻|女人|男人/u.test(text)) return '情爱';
  if (/人格|人生|亲情|死亡|朋友|独立/u.test(text)) return '人格';
  return record.category;
}

function keywordsFor(record, title, category) {
  const pool = `${title} ${category} ${record.source_file || ''} ${stripSpeaker(record.description)}`;
  const seeds = [
    '李敖', '台湾', '中国', '大陆', '祖国', '美国', '日本', '国民党', '共产党', '民进党', '蒋介石', '马英九',
    '台独', '统一', '两岸', '香港', '民主', '自由', '言论自由', '宪法', '查禁', '禁书', '坐牢',
    '北大', '清华', '复旦', '胡适', '鲁迅', '利玛窦', '中文', '写作', '文化', '爱情',
  ];
  const picked = [category];
  for (const seed of seeds) {
    if (pool.includes(seed) && !picked.includes(seed)) picked.push(seed);
    if (picked.length >= 4) break;
  }
  return picked;
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) || 0;
    if (count > 0) {
      const suffix = record.source_file.match(/^(\d+)/u)?.[1] || record.source_paragraph;
      record.title = `${record.title}（${suffix}-${record.source_paragraph}）`;
    }
    seen.set(record.title, count + 1);
  }
}

function categoryCounts(records) {
  return categories
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter((item) => item.count > 0);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function toCsv(records) {
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
  return `${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => {
      if (header === 'keywords') return csvEscape(record.keywords.join(';'));
      return csvEscape(record[header]);
    }).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 书名：${bookTitle}`,
    '- 轮次：校对轮',
    '- 状态：已校对',
    `- 条目数：${records.length}`,
    '- 说明：description 保持源文本原段落，只校对取舍、标题、分类、关键词和编号。',
    '',
  ];
  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push(`- 提取轮：${record.source_id}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => [
    `${record.id}. ${record.title}`,
    `分类：${record.category}`,
    `来源：${record.source_file}#${record.source_paragraph}`,
    `关键词：${record.keywords.join('、')}`,
    `提取轮：${record.source_id}`,
    record.description,
  ].join('\n')).join('\n\n')}\n`;
}

function buildNote(inputRecords, outputRecords) {
  const byReason = new Map();
  for (const [id, reason] of dropReasons.entries()) {
    if (!byReason.has(reason)) byReason.set(reason, []);
    byReason.get(reason).push(`LAT${sequence}-${String(id).padStart(3, '0')}`);
  }
  const lines = [
    `# ${bookTitle} 校对说明`,
    '',
    `- 提取轮条目：${inputRecords.length}`,
    `- 校对轮保留：${outputRecords.length}`,
    `- 校对轮剔除：${inputRecords.length - outputRecords.length}`,
    '- 校对原则：description 保持原文，不改写；剔除开场调侃、朋友互怼、整理者评述等索引独立性较弱的条目；将重复标题和半句标题改成可检索的思想判断句。',
    '',
    '## 剔除记录',
    '',
  ];
  for (const [reason, ids] of byReason.entries()) {
    lines.push(`- ${reason}：${ids.join('、')}`);
  }
  lines.push('');
  lines.push('## 分类分布');
  lines.push('');
  for (const item of categoryCounts(outputRecords)) {
    lines.push(`- ${item.category}：${item.count}`);
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

const inputPayload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const inputRecords = inputPayload.records;
if (!Array.isArray(inputRecords)) throw new Error('提取轮 JSON 未找到 records 数组');

const inputSeqs = new Set(inputRecords.map(sourceSeq));
const missingDrops = [...dropReasons.keys()].filter((id) => !inputSeqs.has(id));
if (missingDrops.length) throw new Error(`校对配置包含不存在的 id：${missingDrops.join(',')}`);

const records = [];
for (const record of inputRecords) {
  const seq = sourceSeq(record);
  if (dropReasons.has(seq)) continue;
  const title = proofreadTitle(record);
  const category = classify(record, title);
  if (!categorySet.has(category)) throw new Error(`未知分类：${record.id} ${category}`);
  records.push({
    ...record,
    id: `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`,
    round: '校对轮',
    status: '已校对',
    category,
    title,
    keywords: [],
    source_id: record.id,
  });
}

ensureUniqueTitles(records);
for (const record of records) {
  record.keywords = keywordsFor(record, record.title, record.category);
}

const duplicateTitles = [...records.reduce((map, record) => {
  map.set(record.title, (map.get(record.title) || 0) + 1);
  return map;
}, new Map()).entries()].filter(([, count]) => count > 1);
if (duplicateTitles.length) throw new Error(`仍有重复标题：${JSON.stringify(duplicateTitles)}`);

const weakTitles = records.filter((record) => isWeakTitle(record.title));
if (weakTitles.length) {
  throw new Error(`仍有弱标题：${weakTitles.map((record) => `${record.id}:${record.title}`).join('；')}`);
}

const book = {
  ...inputPayload.book,
  round: '校对轮',
  status: '已校对',
  note: '校对轮剔除开场调侃、朋友互怼和整理者评述等索引独立性较弱的条目；将重复标题、半句话式标题和大主题兜底标题改成更可检索的思想判断句，并收整分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
  record_count: records.length,
  category_counts: categoryCounts(records),
  source_count: inputRecords.length,
  dropped_count: inputRecords.length - records.length,
  dropped_records: [...dropReasons.entries()].map(([id, reason]) => ({
    source_id: `LAT${sequence}-${String(id).padStart(3, '0')}`,
    reason,
  })),
};
const payload = { taxonomy: inputPayload.taxonomy || categories, book, records };

fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputCsv, toCsv(records), 'utf8');
fs.writeFileSync(outputMd, toMarkdown(records), 'utf8');
fs.writeFileSync(canonicalJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(canonicalCsv, toCsv(records), 'utf8');
fs.writeFileSync(canonicalTxt, toTxt(records), 'utf8');
fs.writeFileSync(proofreadNote, buildNote(inputRecords, records), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  input: inputRecords.length,
  output: records.length,
  dropped: inputRecords.length - records.length,
  category_counts: book.category_counts,
}, null, 2));
