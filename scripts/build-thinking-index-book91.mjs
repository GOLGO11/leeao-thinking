import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 91;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '李敖演讲集';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('大李敖全集6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('011.') && name.includes('李敖演讲集'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));

const metadataSignals = [
  '李敖影音E书',
  '李敖数字博物馆',
  '资源下载站',
  '油管/抖音',
  'wjm_tcy',
  'QQ群',
  '不自由的自由',
  '制作',
];

const nonLiaoSpeakers = [
  '主持人',
  '主持人曾子墨',
  '主持人（副校长',
  '陈文茜',
  '观众',
  '男观众',
  '女观众',
  '观众问',
  '问',
  '叶丽晴',
  '吴小莉',
  '马家辉',
  '胡一虎',
  '林衡哲',
  '李戡',
  '刘长乐',
  '周玉蔻',
  '谢长廷',
  '宋楚瑜',
  '郝龙斌',
  '何丽玲',
  '王清峰',
  '周春塘',
  '张煦华',
  '李嗣涔',
  '施性忠',
  '姜义华',
  '潘毓刚',
  '平路',
  '曾子墨',
  '李强',
  '陈支平',
];

const categoryKeywords = new Map([
  ['写作', ['写作', '文章', '文学', '小说', '文字', '白话文', '作者', '出版', '书名', '读者', '著作', '大全集']],
  ['方法', ['方法', '证据', '资料', '判断', '标准', '逻辑', '过程', '目的', '手段', '研究', '分析', '证明', '真相', '粗糙', '比较', '细腻']],
  ['知识', ['历史', '史料', '真相', '胡适', '鲁迅', '关公', '三国', '孔子', '知识', '学问', '文化史', '典故', '哲学', '传统']],
  ['人格', ['人格', '骨气', '勇气', '尊严', '人生', '老年', '青年', '快乐', '不服气', '独立', '英雄', '战斗', '精神', '理想', '做人', '做事', '诚实', '荣誉', '力行', '实践', '道德', '气节', '自信']],
  ['文化', ['文化', '中文', '汉字', '语言', '佛教', '宗教', '诗', '艺术', '大学', '教育', '国学', '文明', '传统']],
  ['政治', ['台湾', '中国', '祖国', '国民党', '共产党', '民进党', '蒋介石', '李登辉', '陈水扁', '马英九', '美国', '日本', '台独', '统一', '民主', '选举', '总统', '国家', '政府', '大陆', '香港']],
  ['法权', ['法律', '宪法', '法院', '司法', '法官', '判决', '人权', '言论自由', '自由', '查禁', '禁书', '坐牢', '监狱', '政治犯', '审判', '诉讼', '冤狱']],
  ['情爱', ['爱情', '婚姻', '女朋友', '情人', '恋爱', '男欢女爱', '裸体', '接吻', '情书', '追女孩子', '丈夫', '离婚', '休妻']],
]);

const judgmentSignals = [
  '我认为',
  '我觉得',
  '我告诉',
  '我主张',
  '我反对',
  '所以我',
  '所以',
  '为什么',
  '问题是',
  '证明',
  '真相',
  '不是',
  '就是',
  '不能',
  '应该',
  '必须',
  '要',
  '错误',
  '假的',
  '谎话',
  '自由',
  '民主',
  '历史',
  '中国',
  '台湾',
  '国民党',
  '共产党',
  '美国',
  '日本',
  '台独',
  '统一',
  '言论',
  '法律',
  '写作',
  '中文',
];

const titleRules = [
  [/男欢女爱|男女之间的关系|男女.*平等/u, '情爱关系要看人性'],
  [/自由、爱情都要开清单|宪法里面给我们的自由/u, '自由要用清单兑现'],
  [/台湾人民自救宣言|彭明敏|台独坐牢|假的历史/u, '台独历史被改写'],
  [/浮华肤浅|诚实荣誉|为政不在多言|顾力行|做人做事/u, '诚实荣誉要靠实行'],
  [/冷眼人生|泪眼人生|瞪眼人生/u, '人生要敢于瞪眼'],
  [/中文.*开发|电脑.*中文|中文.*词库/u, '中文需要被开发'],
  [/坐牢.*(女朋友|婚姻)|女朋友.*坐牢|补偿.*女朋友/u, '坐牢会制造情爱补偿'],
  [/接吻|恋爱|爱情观念/u, '爱情观念会塑造人'],
  [/有为主义|哭哭啼啼|没有出息/u, '有为主义反对悲愤'],
  [/民主绝非一人一票|纳税.*票/u, '民主不只是人头计数'],
  [/粗糙的谎话|粗糙.*谎话/u, '不能容忍粗糙谎话'],
  [/台湾.*中国.*一部分|中国.*台湾.*一部分/u, '台湾是中国的一部分'],
  [/台独.*假|没有台独|台独.*骗/u, '台独叙事是假的'],
  [/中华民国.*亡国|亡国之民/u, '中华民国亡国要按史料看'],
  [/言论自由/u, '言论自由要靠争取'],
  [/查禁|禁书/u, '查禁反而留下法权证据'],
  [/白色恐怖/u, '白色恐怖会让名字消失'],
  [/坐牢|监狱|政治犯/u, '坐牢不能摧毁精神'],
  [/审判|法官|法院|司法/u, '司法问题要看权力结构'],
  [/胡适/u, '胡适价值要重新放回历史'],
  [/鲁迅/u, '鲁迅不能被神话遮蔽'],
  [/关公|三国/u, '历史人物不能只看演义'],
  [/蒋介石/u, '蒋介石叙事要被拆穿'],
  [/国民党/u, '国民党叙事要被拆穿'],
  [/共产党/u, '共产党问题要放回中国历史'],
  [/美国/u, '美国神话要被拆穿'],
  [/日本/u, '日本问题不能忘记历史'],
  [/民主/u, '民主不能只是口号'],
  [/选举|总统/u, '选举也可以变成思想运动'],
  [/统一|祖国/u, '统一问题要回到祖国'],
  [/香港/u, '香港问题要看国家力量'],
  [/中文|白话文|汉字/u, '中文需要被发扬光大'],
  [/写作|文章|文学|小说/u, '写作要有自己的标准'],
  [/青年|年轻人|小朋友/u, '青年要有独立判断'],
  [/爱情|婚姻|女朋友|情人|恋爱|情书|追女孩子|丈夫|离婚|休妻|男欢女爱|男女.*关系|男女.*平等/u, '情爱关系要看人性'],
  [/历史/u, '历史判断必须有证据'],
  [/真相/u, '真相要靠资料拆穿'],
  [/过程|手段|目的/u, '过程和手段比目的更重要'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/gu, ' ').trim();
}

function sourceTopic(sourceFile) {
  return sourceFile
    .replace(/^\d+\./u, '')
    .replace(/^\d{8}/u, '')
    .replace(/\.txt$/u, '')
    .trim();
}

function readParagraphs(sourceFile) {
  const text = decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/u)
    .map(normalize)
    .filter(Boolean);
}

function speakerOf(text) {
  const match = text.match(/^([^：:]{1,14})[：:]/u);
  return match ? match[1] : '';
}

function stripSpeaker(text) {
  return text.replace(/^李敖[：:]\s*/u, '').replace(/^答[：:]\s*/u, '').trim();
}

function isMetadata(text) {
  return metadataSignals.some((signal) => text.includes(signal));
}

function isLiAoParagraph(text) {
  const speaker = speakerOf(text);
  if (!speaker) return true;
  if (speaker === '李敖' || speaker === '答') return true;
  return !nonLiaoSpeakers.some((name) => speaker.startsWith(name));
}

function categoryScore(text, topic, category) {
  let score = 0;
  for (const keyword of categoryKeywords.get(category) ?? []) {
    if (text.includes(keyword)) score += 1;
    if (topic.includes(keyword)) score += 0.8;
  }
  return score;
}

function classify(text, topic) {
  const hasStrongLegal = /查禁|禁书|宪法|法院|司法|法官|判决|冤狱|诉讼|政治犯/u.test(text);
  const hasStrongIntimacy = /爱情|婚姻|女朋友|情人|恋爱|接吻|裸体|男欢女爱|情书|追女孩子|丈夫|离婚|休妻/u.test(text);
  const hasStrongCulture = /中文|汉字|母语|台语|词库|白话文/u.test(text);
  const hasStrongPersonality = /诚实|荣誉|有为主义|没有出息|气节|尊严|骨气|力行/u.test(text);
  const hasStrongPolitics = /台独|统一|祖国|国民党|共产党|蒋介石|李登辉|陈水扁|马英九|美国|日本|台湾|中国|香港|选举|总统/u.test(text);

  if (hasStrongLegal) return '法权';
  if (hasStrongIntimacy) return '情爱';
  if (hasStrongCulture) return '文化';
  if (hasStrongPersonality && !hasStrongPolitics) return '人格';

  const scores = new Map(taxonomy.map((category) => [category, categoryScore(text, topic, category)]));

  if (/言论自由|查禁|禁书|坐牢|监狱|政治犯|审判|法院|司法|人权/u.test(text)) {
    scores.set('法权', scores.get('法权') + 2.5);
  }
  if (/台独|统一|祖国|国民党|共产党|蒋介石|李登辉|陈水扁|马英九|美国|日本|台湾|中国|香港|选举/u.test(text)) {
    scores.set('政治', scores.get('政治') + 2.2);
  }
  if (/中文|文化|佛教|宗教|教育|文明|汉字/u.test(text)) {
    scores.set('文化', scores.get('文化') + 1.5);
  }
  if (/写作|文章|小说|文学|白话文|出版|读者/u.test(text)) {
    scores.set('写作', scores.get('写作') + 1.8);
  }
  if (/证据|资料|真相|方法|逻辑|过程|手段|标准|粗糙的谎话/u.test(text)) {
    scores.set('方法', scores.get('方法') + 1.7);
  }
  if (/历史|胡适|鲁迅|关公|三国|史料|学问/u.test(text)) {
    scores.set('知识', scores.get('知识') + 1.5);
  }
  if (/人格|骨气|勇气|人生|青年|老年|战斗|精神|快乐|独立/u.test(text)) {
    scores.set('人格', scores.get('人格') + 1.4);
  }
  if (/做人|做事|诚实|荣誉|力行|实践|道德|尊严|气节|自信/u.test(text)) {
    scores.set('人格', scores.get('人格') + 1.8);
  }
  if (/爱情|婚姻|女朋友|情人|恋爱|接吻|裸体|男欢女爱|情书|追女孩子|丈夫|离婚|休妻/u.test(text)) {
    scores.set('情爱', scores.get('情爱') + 1.6);
  }

  const [topCategory, topScore] = [...scores.entries()].sort((a, b) => b[1] - a[1])[0];
  return topScore <= 0 ? '人格' : topCategory;
}

function scoreParagraph(text, topic, paragraphIndex) {
  if (isMetadata(text)) return -100;
  if (!isLiAoParagraph(text)) return -100;
  if (paragraphIndex <= 1 && text.length < 80) return -100;

  const stripped = stripSpeaker(text);
  if (stripped.length < 80) return -50;
  if (/^(讲题|地点|时间|主持人|观众|问|陈文茜|叶丽晴)/u.test(stripped)) return -100;

  let score = 0;
  const length = stripped.length;
  if (length >= 120 && length <= 900) score += 3;
  if (length > 900 && length <= 1500) score += 1.5;
  if (length > 1500) score -= 2;
  if (/李敖[：:]/u.test(text)) score += 1.2;
  if (/大家看|照片|画面|大特写|谢谢|掌声/u.test(stripped)) score -= 1.2;

  for (const signal of judgmentSignals) {
    if (stripped.includes(signal)) score += 0.8;
  }
  for (const category of taxonomy) {
    score += Math.min(categoryScore(stripped, topic, category), 5) * 0.45;
  }
  if (/我认为|我觉得|我告诉|我主张|我反对|我不能接受|我不承认/u.test(stripped)) score += 2.2;
  if (/证明什么|这证明|这告诉|这就是|问题是|为什么/u.test(stripped)) score += 1.6;

  return score;
}

function quotaForFile(paragraphCount) {
  if (paragraphCount <= 20) return 2;
  if (paragraphCount <= 40) return 3;
  if (paragraphCount <= 70) return 4;
  if (paragraphCount <= 110) return 5;
  if (paragraphCount <= 160) return 6;
  return 8;
}

function compressTitle(text, topic, category) {
  const stripped = stripSpeaker(text);
  for (const [pattern, title] of titleRules) {
    if (pattern.test(stripped)) return title;
  }

  const sentences = stripped
    .split(/[。！？；]/u)
    .map((part) => part.replace(/^(所以|可是|但是|因此|我认为|我觉得|我告诉各位|我告诉大家|大家知道|请问)/u, '').trim())
    .filter((part) => part.length >= 8 && part.length <= 80)
    .filter((part) => !/大家看|照片|画面|大特写|谢谢/u.test(part));

  const signalSentence = sentences.find((part) => /应该|不能|不是|就是|证明|真相|历史|自由|民主|中国|台湾|美国|写作|中文/u.test(part));
  if (signalSentence) {
    return signalSentence
      .replace(/[，,].*$/u, '')
      .replace(/^(我|我们|你们|他们)/u, '')
      .slice(0, 18);
  }

  return `${sourceTopic(topic).replace(/^李敖/u, '')}中的${category}判断`.slice(0, 22);
}

function categoryFromTitle(title, fallback) {
  if (/情爱|爱情|恋爱|男女关系|情书/u.test(title)) return '情爱';
  if (/言论自由|司法|查禁|禁书|坐牢不能|白色恐怖|法权|宪法|人权|自由要用清单/u.test(title)) return '法权';
  if (/中文|汉字|母语|语言/u.test(title)) return '文化';
  if (/民主|选举|国民党|共产党|蒋介石|台独|中华民国|美国|日本|统一|祖国|香港/u.test(title)) return '政治';
  if (/诚实荣誉|有为主义|人生|青年/u.test(title)) return '人格';
  if (/历史人物|历史判断|胡适|鲁迅|关公/u.test(title)) return '知识';
  if (/真相|证据|资料|过程|手段|方法|标准/u.test(title)) return '方法';
  if (/写作|文章|文学|小说|著作/u.test(title)) return '写作';
  return fallback;
}

function keywordsFor(record) {
  const pool = `${record.title} ${record.category} ${record.source_file} ${record.description}`;
  const picked = [record.category];
  for (const keyword of [
    '李敖', '台湾', '中国', '祖国', '国民党', '共产党', '蒋介石', '李登辉', '陈水扁', '马英九',
    '美国', '日本', '台独', '统一', '香港', '民主', '自由', '言论自由', '查禁', '禁书',
    '坐牢', '监狱', '胡适', '鲁迅', '历史', '中文', '写作', '青年', '爱情',
  ]) {
    if (pool.includes(keyword) && !picked.includes(keyword)) picked.push(keyword);
    if (picked.length >= 4) break;
  }
  return picked;
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) || 0;
    if (count > 0) {
      const suffix = record.source_file.match(/^(\d+)/u)?.[1] ?? record.id;
      record.title = `${record.title}（${suffix}-${record.source_paragraph}）`;
    }
    seen.set(record.title, count + 1);
  }
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
    `# ${bookTitle} 思想索引（提取轮）`,
    '',
    `- 书名：${bookTitle}`,
    `- 轮次：${round}`,
    `- 状态：${status}`,
    `- 条目数：${records.length}`,
    '- 说明：标题用于检索浓缩，description 保留源文本原段落。',
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter((item) => item.count > 0);
}

const candidates = [];
const skipped = [];

for (const sourceFile of sourceFiles) {
  const topic = sourceTopic(sourceFile);
  const paragraphs = readParagraphs(sourceFile);
  const scored = paragraphs.map((paragraph, index) => {
    const stripped = stripSpeaker(paragraph);
    return {
      sourceFile,
      paragraph,
      paragraphNumber: index + 1,
      score: scoreParagraph(paragraph, topic, index),
      category: classify(stripped, topic),
    };
  });

  const quota = quotaForFile(paragraphs.length);
  const selected = scored
    .filter((item) => item.score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, quota)
    .sort((a, b) => a.paragraphNumber - b.paragraphNumber);

  if (!selected.length) {
    skipped.push({ source_file: sourceFile, reason: '未找到达到阈值的李敖判断段' });
  }
  candidates.push(...selected);
}

const seenDescriptions = new Set();
const records = [];
for (const candidate of candidates) {
  const normalizedDescription = normalize(candidate.paragraph);
  if (seenDescriptions.has(normalizedDescription)) continue;
  seenDescriptions.add(normalizedDescription);

  const title = compressTitle(candidate.paragraph, candidate.sourceFile, candidate.category);
  const category = categoryFromTitle(title, candidate.category);
  records.push({
    id: `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`,
    book: bookTitle,
    round,
    status,
    category,
    title,
    description: candidate.paragraph,
    source_file: candidate.sourceFile,
    source_paragraph: candidate.paragraphNumber,
    source_path: path.join(sourceBookDir, candidate.sourceFile).replaceAll(path.sep, '/'),
    keywords: [],
    score: Number(candidate.score.toFixed(2)),
  });
}

ensureUniqueTitles(records);
for (const record of records) {
  record.keywords = keywordsFor(record);
  delete record.score;
}

const book = {
  sequence,
  title: bookTitle,
  slug: 'leeao-speech-collection',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note: '本轮从《李敖演讲集》57 篇演讲、记者会、政见发表和对谈记录中提取思想索引。源文包含主持、观众、嘉宾和李敖问答，本轮过滤非李敖发言、目录、制作信息、资源信息和纯现场说明；优先保留政治判断、法权争辩、历史求真、写作中文、人格人生、文化教育和情爱人性等可独立检索的判断段。标题用于检索浓缩，description 保留源文本原段落。',
  source_file_count: sourceFiles.length,
  record_count: records.length,
  candidate_count: candidates.length,
  skipped_duplicate_count: candidates.length - records.length,
  skipped_duplicates: [],
  skipped_files: skipped,
  category_counts: categoryCounts(records),
};

const payload = { book, records };

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), toMarkdown(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), [
  `# ${bookTitle} 提取说明`,
  '',
  `- 源目录：${book.sourceDir}`,
  `- 正文文件：${sourceFiles.length}`,
  `- 源段落数：${sourceFiles.reduce((sum, sourceFile) => sum + readParagraphs(sourceFile).length, 0)}`,
  `- 提取条目：${records.length}`,
  '- 轮次：提取轮，待校对。',
  '- 取舍：保留李敖发言中的判断段，剔除主持、观众、嘉宾、制作信息、资源信息和纯现场说明段。',
  '- 原文：description 字段逐条取自 GB18030 源文本段落，不做改写。',
  '',
  '## 分类分布',
  '',
  ...book.category_counts.map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n'), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  sourceFiles: sourceFiles.length,
  records: records.length,
  category_counts: book.category_counts,
  outputDir: path.relative(rootDir, outputDir),
}, null, 2));
