import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 89;
const bookTitle = '李敖语妙天下';
const round = '提取轮';
const status = '待校对';
const sequence = String(bookSeq).padStart(3, '0');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');
const maxRecords = 300;

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const categoryKeywords = new Map([
  ['写作', ['写作', '写书', '文章', '文学', '小说', '文字', '白话文', '稿子', '手稿', '作品', '作家', '书', '杂志', '办报', '表达']],
  ['方法', ['方法', '证据', '资料', '判断', '解释', '标准', '比较', '角度', '真相', '研究', '读书', '检验', '分析', '怀疑', '窍门', '触类旁通', '细腻']],
  ['知识', ['历史', '史料', '档案', '知识', '典故', '真相', '学问', '博士', '原文', '来源', '文献', '资料', '求知', '智慧']],
  ['人格', ['人格', '勇气', '骨气', '傲骨', '尊严', '诚实', '人生', '斗士', '理想', '风骨', '信仰', '独处', '英雄', '快乐', '命运']],
  ['文化', ['中文', '汉字', '语言', '文字', '文物', '艺术', '书法', '诗', '诗人', '宗教', '佛教', '孔子', '孟子', '儒家', '文化', '典故']],
  ['政治', ['台湾', '台独', '统一', '中国', '美国', '日本', '国民党', '民进党', '共产党', '蒋介石', '陈水扁', '马英九', '民主', '选举', '国家', '政府', '总统', '外交', '联合国', '祖国']],
  ['法权', ['法律', '宪法', '司法', '法院', '自由', '言论', '权利', '权力', '诉讼', '法治', '立法', '判决', '程序', '监狱', '坐牢', '查禁', '守宪', '审判']],
  ['情爱', ['爱情', '婚姻', '情人', '性欲', '性爱', '恋爱', '同居', '前妻', '男女关系', '劈腿', '女人到底要什么', '佳偶', '怨偶']],
]);

const strongSignals = [
  '我认为',
  '我告诉',
  '我主张',
  '我反对',
  '我觉得',
  '我一再',
  '我的意思',
  '换句话说',
  '这告诉我们',
  '这就是',
  '所以我',
  '所以我们',
  '问题是',
  '问题来了',
  '为什么',
  '注意',
  '大家注意',
  '证明',
  '真相',
  '窍门',
  '标准',
  '不是吗',
  '再说一遍',
];

const metadataSignals = [
  '李敖影音E书',
  '李敖数字博物馆',
  '资源下载站',
  'QQ群',
  '油管/抖音',
  '小红书',
  '哔哩哔哩',
  'wjm_tcy',
  '不自由的自由',
  '制作于2018年',
  '上传',
];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('009.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));

const book = {
  sequence,
  title: bookTitle,
  slug: 'leeao-yumiao-tianxia',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖语妙天下》一百一十三集单人节目稿中提取思想索引。源文为李敖独白式讲稿，本轮排除目录、制作信息、资源信息和单纯现场展示段；优先保留政治判断、法权程序、知识方法、人格风骨、写作语言、文化典故、情爱情欲等可独立检索的判断段。标题用于检索浓缩，description 保留源文本原段落。',
};

function normalize(text) {
  return String(text ?? '').replace(/\s+/gu, ' ').trim();
}

function sourceTopic(sourceFile) {
  return sourceFile
    .replace(/^\d+\./u, '')
    .replace(/\.txt$/u, '')
    .replace(/^\d{4}-\d{2}-\d{2}[：:]/u, '')
    .replace(/[？?！!。]$/u, '')
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

function categoryScore(text, topic, category) {
  let score = 0;
  for (const keyword of categoryKeywords.get(category) ?? []) {
    if (text.includes(keyword)) score += 1;
    if (topic.includes(keyword)) score += 0.7;
  }
  return score;
}

function classify(text, topic) {
  const scores = new Map(taxonomy.map((category) => [category, categoryScore(text, topic, category)]));
  const topicText = topic + text;

  if (/(重返萤光幕|上山.*爱|小说|文字智慧|李语录|别时容易|写作|文章)/u.test(topic)) {
    scores.set('写作', scores.get('写作') + 3);
  }
  if (/(想象力|触类旁通|窍门|测量智慧|人世之理|细腻|讹传|身临其境)/u.test(topic)) {
    scores.set('方法', scores.get('方法') + 3);
  }
  if (/(三国|胡适|苏东坡|历史|典故|五十年|学贯中西)/u.test(topic)) {
    scores.set('知识', scores.get('知识') + 2.5);
  }
  if (/(殷海光|独处|行善|风骨|不服气|傲骨|敌人死光|台湾对李敖太小|人要适格|英雄)/u.test(topic)) {
    scores.set('人格', scores.get('人格') + 3);
  }
  if (/(书法|孔孟|孔子|文物|粗话|牙签|中文|台湾话)/u.test(topic)) {
    scores.set('文化', scores.get('文化') + 3);
  }
  if (/(宪法|守宪|言论自由|雷震|郭冠英|权利|司法|法院|坐牢|查禁)/u.test(topic)) {
    scores.set('法权', scores.get('法权') + 3);
  }
  if (/(聪明人只爱|佳偶|女人到底|传统性观念|我家凶悍的老太)/u.test(topic)) {
    scores.set('情爱', scores.get('情爱') + 3);
  }
  if (/(台独|中华民国|统一|联合国|美国|日本|蒋介石|李登辉|二二八|马英九|宋楚瑜|陈水扁|国民党|民进党|卖台)/u.test(topic)) {
    scores.set('政治', scores.get('政治') + 3);
  }

  if (/(翻译|岔枝借译|Proud|英文|用字|语文|文字技巧)/u.test(topicText)) {
    scores.set('方法', scores.get('方法') + 4);
    scores.set('写作', scores.get('写作') + 2);
    scores.set('政治', Math.max(0, scores.get('政治') - 2));
  }
  if (/(宪法|法律|司法|法院|权利|权力|言论自由|坐牢|监狱|查禁|程序|判决|守宪)/u.test(topicText)) {
    scores.set('法权', scores.get('法权') + 4);
  }
  if (/(台独|统一|中华民国|台湾|美国|日本|国民党|民进党|共产党|蒋介石|陈水扁|马英九|联合国)/u.test(topicText)) {
    scores.set('政治', scores.get('政治') + 3);
  }
  if (/(文章|写作|白话文|手稿|文字表达|查禁.*书|书.*查禁)/u.test(topicText)) {
    scores.set('写作', scores.get('写作') + 3);
  }
  if (/(中文|汉字|书法|文物|佛教|宗教|孔子|孟子|儒家|诗|文化)/u.test(topicText)) {
    scores.set('文化', scores.get('文化') + 2.5);
  }
  if (/(证据|资料|真相|判断|方法|窍门|触类旁通|细腻|怀疑|研究)/u.test(topicText)) {
    scores.set('方法', scores.get('方法') + 2.5);
  }
  if (/(历史|史料|典故|知识|学问|求知|智慧)/u.test(topicText)) {
    scores.set('知识', scores.get('知识') + 2);
  }
  if (/(知识分子|风骨|傲骨|人格|英雄|勇气|独处|人生|命运|快乐|理想|信仰)/u.test(topicText)) {
    scores.set('人格', scores.get('人格') + 3);
  }
  if (/(爱情|婚姻|情人|性欲|性爱|恋爱|前妻|男女关系|劈腿|女人到底要什么|佳偶|怨偶)/u.test(topicText)) {
    scores.set('情爱', scores.get('情爱') + 4);
  }
  if (/(女人最好别碰历史|才女.*美女)/u.test(topic)) {
    scores.set('知识', scores.get('知识') + 2);
    scores.set('情爱', Math.max(0, scores.get('情爱') - 2));
  }

  return taxonomy
    .slice()
    .sort((a, b) => scores.get(b) - scores.get(a) || taxonomy.indexOf(a) - taxonomy.indexOf(b))[0];
}

function isMetadata(text) {
  return metadataSignals.some((signal) => text.includes(signal));
}

function scoreParagraph(text, paragraphIndex, paragraphCount, topic) {
  if (paragraphIndex === 0) return Number.NEGATIVE_INFINITY;
  if (isMetadata(text)) return Number.NEGATIVE_INFINITY;
  if (/^注[：:]/u.test(text) && text.length < 100) return Number.NEGATIVE_INFINITY;
  if (text.length < 140) return Number.NEGATIVE_INFINITY;

  let score = Math.min(text.length, 900) / 90;
  for (const signal of strongSignals) {
    if (text.includes(signal)) score += 3;
  }
  for (const category of taxonomy) {
    for (const keyword of categoryKeywords.get(category) ?? []) {
      if (text.includes(keyword)) score += 0.8;
      if (topic.includes(keyword)) score += 0.6;
    }
  }

  if (/真相|证据|资料|原文|档案|史料/u.test(text)) score += 5;
  if (/宪法|言论自由|坐牢|查禁|司法|法院|法律/u.test(text)) score += 6;
  if (/台独|统一|中华民国|联合国|美国|日本|蒋介石|国民党|民进党|共产党/u.test(text + topic)) score += 4;
  if (/知识分子|风骨|傲骨|人格|英雄|勇气/u.test(text + topic)) score += 4;
  if (/文章|写作|文字|白话文|手稿/u.test(text + topic)) score += 3;
  if (/爱情|婚姻|女人到底要什么|性欲|情人|男女/u.test(text + topic)) score += 4;
  if (/窍门|触类旁通|细腻|方法/u.test(text + topic)) score += 4;
  if (/我李敖|李敖语妙天下/u.test(text)) score += 1.5;
  if (/请看|大家看|这个画面|这张照片|这本书/u.test(text)) score -= 1.5;
  if (paragraphIndex > paragraphCount - 6) score -= 8;

  return score;
}

function extractCandidates() {
  const candidates = [];

  for (const sourceFile of sourceFiles) {
    const paragraphs = readParagraphs(sourceFile);
    const topic = sourceTopic(sourceFile);
    const fileCandidates = [];

    paragraphs.forEach((text, index) => {
      const score = scoreParagraph(text, index, paragraphs.length, topic);
      if (!Number.isFinite(score)) return;
      fileCandidates.push({
        sourceFile,
        topic,
        source_paragraph: index + 1,
        score,
        category: classify(text, topic),
        description: text,
      });
    });

    fileCandidates.sort((a, b) => b.score - a.score);
    const selectedForFile = [];
    for (const candidate of fileCandidates) {
      if (selectedForFile.length >= 2) break;
      if (candidate.score >= 16) selectedForFile.push(candidate);
    }

    candidates.push(...selectedForFile);
  }

  return candidates;
}

function selectCandidates(candidates) {
  const selected = new Map();
  for (const candidate of candidates.sort((a, b) => {
    const fileOrder = a.sourceFile.localeCompare(b.sourceFile, 'zh-Hans-u-kn-true');
    return fileOrder || b.score - a.score;
  })) {
    selected.set(`${candidate.sourceFile}#${candidate.source_paragraph}`, candidate);
  }

  const allCandidates = [];
  for (const sourceFile of sourceFiles) {
    const paragraphs = readParagraphs(sourceFile);
    const topic = sourceTopic(sourceFile);
    paragraphs.forEach((text, index) => {
      const score = scoreParagraph(text, index, paragraphs.length, topic);
      if (!Number.isFinite(score)) return;
      allCandidates.push({
        sourceFile,
        topic,
        source_paragraph: index + 1,
        score,
        category: classify(text, topic),
        description: text,
      });
    });
  }

  for (const candidate of allCandidates.sort((a, b) => b.score - a.score)) {
    if (selected.size >= maxRecords) break;
    const key = `${candidate.sourceFile}#${candidate.source_paragraph}`;
    if (selected.has(key)) continue;
    const fileCount = [...selected.values()].filter((item) => item.sourceFile === candidate.sourceFile).length;
    if (fileCount >= 4) continue;
    if (candidate.score < 27) continue;
    selected.set(key, candidate);
  }

  const ordered = [...selected.values()]
    .sort((a, b) => {
      const fileOrder = a.sourceFile.localeCompare(b.sourceFile, 'zh-Hans-u-kn-true');
      return fileOrder || a.source_paragraph - b.source_paragraph;
    });

  const dedupedReverse = [];
  const seenDescriptions = new Set();
  for (const candidate of ordered.slice().reverse()) {
    const normalized = normalize(candidate.description);
    if (seenDescriptions.has(normalized)) continue;
    seenDescriptions.add(normalized);
    dedupedReverse.push(candidate);
  }

  return dedupedReverse.reverse();
}

function compactTopic(topic) {
  return topic
    .replace(/[《》]/gu, '')
    .replace(/[（(][一二三四五六七八九十0-9]+[）)]/gu, '')
    .replace(/[:：，,。！？?！]/gu, '')
    .trim();
}

function autoTitle(candidate) {
  const text = candidate.description;
  const topic = compactTopic(candidate.topic);
  const topicRules = [
    [/连战及陈长文/u, '连战及陈长文欠台湾人一个道歉'],
    [/我也说一回三国/u, '三国故事要看说书传统'],
    [/诸葛孔明/u, '诸葛孔明的精神'],
    [/上山.*爱/u, '《上山·上山·爱》的文学价值'],
    [/聪明人只爱一点点/u, '聪明人只爱一点点'],
    [/好的想象力/u, '好想象力比知识重要'],
    [/殷海光/u, '知识分子要有风骨'],
    [/台湾话/u, '台湾话不是独立语言'],
    [/粗话/u, '粗话也能登大雅之堂'],
    [/胡适/u, '胡适需要重新讨公道'],
    [/中国迟早统一/u, '中国迟早统一'],
    [/台湾想加入联合国/u, '台湾加入联合国是神话'],
    [/中华民国是什么/u, '中华民国亡国要按原文看'],
    [/只载祖国放弃台湾/u, '只载祖国放弃台湾'],
    [/郭冠英/u, '郭冠英因守宪而受罚'],
    [/美国也是从盗版/u, '美国也是从盗版起家'],
    [/李语录/u, '李语录要看文字智慧'],
    [/敌人死光/u, '被关押不能变软弱'],
    [/台湾对李敖太小/u, '台湾对李敖太小'],
    [/不服气/u, '不服气但不怄气'],
    [/孔子后代|孔孟/u, '孔孟思想有细腻处'],
    [/讹传/u, '讹传典故要细腻还原'],
    [/人间万象在窍门/u, '人间万象要看窍门'],
    [/女人到底要什么/u, '女人到底要什么'],
  ];
  const textRules = [
    [/岔枝借译|以我为傲|以你为荣|Proud/u, '翻译要分清正负语感'],
    [/万花筒.*学到|外面所学不到/u, '节目应提供外面学不到的知识'],
    [/杀人放火|文字.*杀人/u, '文字也能杀人放火'],
    [/中华民国.*亡国|亡国.*境地/u, '中华民国亡国要按原文看'],
    [/台湾.*千分之三|你跑不掉/u, '中国迟早统一'],
    [/美国帝国主义|美国.*敌人|创造.*敌人/u, '美国会创造自己的敌人'],
    [/台独.*联合国|加入联合国|台湾想加入联合国/u, '台湾加入联合国是神话'],
    [/闽南话|福佬话/u, '台湾话不是独立语言'],
    [/言论自由|宪法中的言论自由/u, '宪法中的言论自由是假的'],
    [/守宪|郭冠英/u, '郭冠英因守宪而受罚'],
    [/美国.*盗版/u, '美国也是从盗版起家'],
    [/女人到底要什么|女人.*要什么/u, '女人到底要什么'],
    [/聪明人只爱一点点/u, '聪明人只爱一点点'],
    [/性欲|食色性也/u, '食色性也是人性问题'],
    [/佳偶.*怨偶|夫妻/u, '佳偶也会变成怨偶'],
    [/独处/u, '独处能保全自己'],
    [/不服气.*不怄气.*吐气|不服气/u, '不服气但不怄气'],
    [/满脸骄气|一身傲骨/u, '要有一身傲骨'],
    [/虽千万人|吾往矣/u, '虽千万人吾往矣'],
    [/知识分子.*风骨/u, '知识分子要有风骨'],
    [/瞧不起知识分子|知识分子.*原因/u, '知识分子不该只会附和'],
    [/雷震/u, '纪念雷震要有资格'],
    [/陈仪/u, '陈仪是悲剧性的爱国者'],
    [/二二八/u, '二二八叙事不能遮蔽真相'],
    [/蒋介石.*斯大林|斯大林/u, '独裁者也有粗细差别'],
    [/金圆券|劣币驱逐良币/u, '劣币会驱逐良币'],
    [/军购|国防部长/u, '军购会让台湾做冤大头'],
    [/联合起来祸国殃民|国民党.*民进党/u, '蓝绿都可能祸国殃民'],
    [/马关条约|抗战|日本统治/u, '台湾历史不能忘记日本统治'],
    [/美国.*日本|中美日/u, '中美日关系要看历史恩怨'],
    [/孔子|孟子|儒家/u, '孔孟思想有细腻处'],
    [/书法|小楷|毛笔字/u, '书法承载文化暗码'],
    [/粗话|放屁/u, '粗话也能登大雅之堂'],
    [/文物|圆明园|古物/u, '文物有情有灵'],
    [/典故.*讹传|讹传/u, '讹传典故要细腻还原'],
    [/窍门|玉连环|庖丁解牛/u, '人间万象要看窍门'],
    [/触类旁通/u, '求知要学会触类旁通'],
    [/想象力|比知识还重要/u, '好想象力比知识重要'],
    [/史料|历史.*真相|资料.*真相/u, '历史真相要靠史料'],
    [/身临其境/u, '身临其境未必聪明'],
    [/宿命|造命|非命/u, '命运观要分层理解'],
    [/正命/u, '正命不是迷信宿命'],
    [/才女与美女/u, '才女与美女很难兼备'],
    [/女人.*历史|女历史学家/u, '历史求真不宜感情用事'],
    [/敌人死光|越关越强/u, '被关押不能变软弱'],
    [/文字智慧/u, '李语录要看文字智慧'],
  ];

  for (const [pattern, title] of topicRules) {
    if (pattern.test(candidate.topic)) return title;
  }
  for (const [pattern, title] of textRules) {
    if (pattern.test(text)) return title;
  }

  if (topic.length >= 5 && topic.length <= 18) return topic;
  if (candidate.category === '方法') return `${topic.slice(0, 12)}要看方法`;
  if (candidate.category === '法权') return `${topic.slice(0, 12)}要看法权`;
  if (candidate.category === '人格') return `${topic.slice(0, 12)}要看人格`;
  return topic.slice(0, 16);
}

function cleanKeyword(text) {
  return String(text ?? '')
    .replace(/[“”"'‘’《》（）()，。！？、；：,.!?;:\s]/gu, '')
    .trim();
}

function buildKeywords(candidate, title) {
  const raw = [
    candidate.category,
    title,
    candidate.topic,
    ...String(title).split(/[，,；;、\s]/u),
    ...String(candidate.topic).split(/[，,；;、\s]/u),
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

function sourceDateSuffix(sourceFile, paragraph) {
  const match = sourceFile.match(/2009-(\d{2})-(\d{2})/u);
  return match ? `${match[1]}-${match[2]}-${paragraph}` : `段${paragraph}`;
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) ?? 0;
    if (count === 0) {
      seen.set(record.title, 1);
      continue;
    }
    record.title = `${record.title}（${sourceDateSuffix(record.source_file, record.source_paragraph)}）`;
    seen.set(record.title, (seen.get(record.title) ?? 0) + 1);
  }
}

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

function writeMarkdown(filePath, payload) {
  const lines = [
    `# ${payload.book.title}思想索引（${round}）`,
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

function writeNote(filePath, payload) {
  const lines = [
    `# ${payload.book.title}提取说明`,
    '',
    `- 轮次：${payload.book.round}`,
    `- 状态：${payload.book.status}`,
    `- 源目录：${payload.book.sourceDir}`,
    `- 源文件数：${payload.book.source_file_count}`,
    `- 候选条目：${payload.book.candidate_count}`,
    `- 输出条目：${payload.book.record_count}`,
    '',
    '## 提取原则',
    '',
    '- 使用 GB18030 解码读取全集源文。',
    '- 排除目录、资料站信息、上传者署名和纯现场展示段。',
    '- 每集优先保留 2 条高密度判断，少数高密度集补充第 3 条或第 4 条。',
    '- 标题为检索浓缩，description 保留源文原段落。',
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
  ];
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const candidates = extractCandidates();
const selected = selectCandidates(candidates);
const records = selected.map((candidate, index) => {
  const title = autoTitle(candidate);
  return {
    id: `LAT${sequence}-${String(index + 1).padStart(3, '0')}`,
    book: bookTitle,
    round,
    status,
    category: candidate.category,
    title,
    description: candidate.description,
    source_file: candidate.sourceFile,
    source_paragraph: candidate.source_paragraph,
    source_path: path.join(sourceBookDir, candidate.sourceFile).replaceAll(path.sep, '/'),
    keywords: buildKeywords(candidate, title),
  };
});

ensureUniqueTitles(records);
for (const record of records) {
  record.keywords = buildKeywords(
    {
      category: record.category,
      topic: sourceTopic(record.source_file),
    },
    record.title,
  );
}

const payload = {
  book: {
    ...book,
    source_file_count: sourceFiles.length,
    record_count: records.length,
    candidate_count: selected.length,
    skipped_duplicate_count: 0,
    skipped_duplicates: [],
    category_counts: categoryCounts(records),
  },
  records,
};

fs.mkdirSync(outputDir, { recursive: true });

const roundBase = '思想索引-提取轮';
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(roundCsvPath, records);
writeMarkdown(roundMdPath, payload);
writeText(path.join(outputDir, '思想索引.txt'), records);
fs.copyFileSync(roundJsonPath, path.join(outputDir, '思想索引.json'));
fs.copyFileSync(roundCsvPath, path.join(outputDir, '思想索引.csv'));
writeNote(path.join(outputDir, '提取说明.md'), payload);

console.log(
  `Built ${bookTitle}: ${records.length} records from ${sourceFiles.length} files. Categories: ${payload.book.category_counts
    .map((item) => `${item.category}=${item.count}`)
    .join(', ')}`,
);
