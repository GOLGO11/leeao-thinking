import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 88;
const bookTitle = '笑敖年代';
const round = '提取轮';
const status = '待校对';
const sequence = String(bookSeq).padStart(3, '0');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');
const maxRecords = 144;

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const categoryKeywords = new Map([
  ['写作', ['写作', '写书', '文章', '文学', '小说', '文字', '中文', '句子', '文法', '作品', '作家', '办报', '报纸', '标题']],
  ['方法', ['方法', '证据', '资料', '判断', '思考', '解释', '标准', '比较', '角度', '真相', '研究', '读书', '预测', '检验', '分析']],
  ['知识', ['历史', '史料', '档案', '知识', '真相', '文化', '书', '读物', '文件', '古代', '资料', '学问', '博士', '典故']],
  ['人格', ['人格', '勇气', '骨气', '尊严', '诚实', '人生', '斗士', '理想', '报仇', '恩怨', '清白', '格调', '信仰']],
  ['文化', ['中文', '汉字', '语言', '文字', '文物', '艺术', '宗教', '经典', '诗', '书法', '戏剧', '美学', '信仰', '圣经']],
  ['政治', ['台湾', '台独', '中国', '美国', '国民党', '民进党', '陈水扁', '马英九', '统一', '民主', '选举', '国家', '政党', '政府', '军购', '市长', '总统', '外交', '党产']],
  ['法权', ['法律', '宪法', '司法', '法院', '自由', '言论', '权利', '诉讼', '控告', '法治', '立法', '议会', '立法院', '判决', '权力', '豁免', '程序', '预算']],
  ['情爱', ['爱情', '婚姻', '前妻', '红颜', '美女', '色情', '性欲', '恋爱', '同居', '老婆', '男女关系', '劈腿']],
]);

const strongSignals = [
  '我认为',
  '我告诉',
  '我主张',
  '我反对',
  '我觉得',
  '我可以告诉',
  '请大家注意',
  '大家注意',
  '证明什么',
  '为什么',
  '所以我',
  '所以我们',
  '我们可以看到',
  '我的意思',
  '这告诉我们',
  '问题来了',
  '换句话说',
];

const metadataSignals = ['李敖影音E书', '李敖数字博物馆', '资源下载站', 'QQ群', '油管/抖音', '小红书', '哔哩哔哩'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('008.'),
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
  slug: 'xiaoao-era',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《笑敖年代》十六集对谈节目中提取思想索引。节目为主持人汪用和、陈静兰与李敖问答，本轮只取李敖本人段落，剔除主持串场、节目寒暄、短答和制作信息；优先保留政治判断、法权程序、知识分子人格、证据方法、中文文化、情爱人性等可独立检索的判断段。标题用于检索浓缩，description 保留源文本原段落。',
};

function normalize(text) {
  return String(text ?? '').replace(/\s+/gu, ' ').trim();
}

function sourceTopic(sourceFile) {
  return sourceFile
    .replace(/^\d+\./u, '')
    .replace(/\.txt$/u, '')
    .replace(/^\d{8}/u, '')
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
    if (topic.includes(keyword)) score += 0.6;
  }
  return score;
}

function classify(text, topic) {
  const scores = new Map(taxonomy.map((category) => [category, categoryScore(text, topic, category)]));

  if (text.includes('言论自由') || text.includes('豁免权') || text.includes('司法')) scores.set('法权', scores.get('法权') + 4);
  if (text.includes('预算') || text.includes('立法院')) scores.set('法权', scores.get('法权') + 2);
  if (text.includes('台独') || text.includes('统一') || text.includes('美国') || text.includes('民进党')) {
    scores.set('政治', scores.get('政治') + 3);
  }
  if (text.includes('陈水扁') || text.includes('马英九') || text.includes('国民党')) scores.set('政治', scores.get('政治') + 2);
  if (text.includes('中文') || text.includes('汉字')) scores.set('文化', scores.get('文化') + 3);
  if (text.includes('读书') || text.includes('资料') || text.includes('证据')) scores.set('方法', scores.get('方法') + 2);
  if (/(爱情|婚姻|前妻|性欲|劈腿|同居|男女关系|情人)/u.test(text)) {
    scores.set('情爱', scores.get('情爱') + 2.5);
  }
  if (/(知识分子|勇气|人格|个人|信仰|理想)/u.test(text)) scores.set('人格', scores.get('人格') + 2);

  return taxonomy
    .slice()
    .sort((a, b) => scores.get(b) - scores.get(a) || taxonomy.indexOf(a) - taxonomy.indexOf(b))[0];
}

function scoreParagraph(text, paragraphIndex, paragraphCount) {
  if (paragraphIndex === 0) return Number.NEGATIVE_INFINITY;
  if (!/^李敖[：:]/u.test(text)) return Number.NEGATIVE_INFINITY;
  if (text.length < 100) return Number.NEGATIVE_INFINITY;
  if (metadataSignals.some((signal) => text.includes(signal))) return Number.NEGATIVE_INFINITY;
  if (/^李敖[：:](我好|对|是|不是|没有|可以|当然|好|有|谢谢|会|不一定)[。！]?$/u.test(text)) {
    return Number.NEGATIVE_INFINITY;
  }

  let score = Math.min(text.length, 700) / 85;
  for (const signal of strongSignals) {
    if (text.includes(signal)) score += 4;
  }
  for (const category of taxonomy) {
    for (const keyword of categoryKeywords.get(category) ?? []) {
      if (text.includes(keyword)) score += 1;
    }
  }

  if (text.includes('言论自由')) score += 7;
  if (text.includes('台独')) score += 5;
  if (text.includes('军购')) score += 4;
  if (text.includes('党产')) score += 4;
  if (text.includes('市长')) score += 3;
  if (text.includes('陈水扁') || text.includes('马英九')) score += 3;
  if (text.includes('知识分子')) score += 4;
  if (text.includes('我李敖')) score += 2;
  if (paragraphIndex > paragraphCount - 6) score -= 10;
  if (/^李敖[：:](对|是|不是|没有|我跟你讲)[，,]/u.test(text)) score -= 1.5;

  return score;
}

function extractCandidates() {
  const candidates = [];

  for (const sourceFile of sourceFiles) {
    const paragraphs = readParagraphs(sourceFile);
    const topic = sourceTopic(sourceFile);
    const fileCandidates = [];

    paragraphs.forEach((text, index) => {
      const score = scoreParagraph(text, index, paragraphs.length);
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
    for (const candidate of fileCandidates.slice(0, 8)) {
      if (candidate.score >= 15) candidates.push(candidate);
    }

    const categorySeen = new Set(candidates.filter((candidate) => candidate.sourceFile === sourceFile).map((candidate) => candidate.category));
    for (const candidate of fileCandidates) {
      if (candidates.filter((item) => item.sourceFile === sourceFile).length >= 10) break;
      if (candidate.score < 24) continue;
      if (categorySeen.has(candidate.category)) continue;
      candidates.push(candidate);
      categorySeen.add(candidate.category);
    }
  }

  return candidates;
}

function selectCandidates(candidates) {
  const selected = new Map();
  for (const candidate of candidates.sort((a, b) => {
    const fileOrder = a.sourceFile.localeCompare(b.sourceFile, 'zh-Hans-u-kn-true');
    return fileOrder || b.score - a.score;
  })) {
    const fileCount = [...selected.values()].filter((item) => item.sourceFile === candidate.sourceFile).length;
    if (fileCount >= 10) continue;
    selected.set(`${candidate.sourceFile}#${candidate.source_paragraph}`, candidate);
  }

  for (const candidate of candidates.sort((a, b) => b.score - a.score)) {
    if (selected.size >= maxRecords) break;
    selected.set(`${candidate.sourceFile}#${candidate.source_paragraph}`, candidate);
  }

  return [...selected.values()]
    .sort((a, b) => {
      const fileOrder = a.sourceFile.localeCompare(b.sourceFile, 'zh-Hans-u-kn-true');
      return fileOrder || a.source_paragraph - b.source_paragraph;
    })
    .slice(0, maxRecords);
}

function stripSpeaker(text) {
  return text.replace(/^李敖[：:]\s*/u, '').trim();
}

function autoTitle(candidate) {
  const text = stripSpeaker(candidate.description);
  const rules = [
    [/歌颂.*统治者|余光中.*歌颂|诗人.*歌颂/u, '文人不该歌颂统治者'],
    [/宋美龄.*美国|自由民主.*教育/u, '受过民主教育更该懂自由'],
    [/虚与委蛇/u, '虚与委蛇不能读错'],
    [/陈情书.*盗贼|递上去.*陈情书/u, '陈情书不该递给盗贼'],
    [/有效.*重要|甘地.*有效/u, '有效抗争重于理想姿态'],
    [/党国不分|财产.*政府/u, '党国不分会混同公私'],
    [/言论集|查禁.*书|反对台独.*作废/u, '李登辉旧言不能作废'],
    [/宗教领袖|高俊明牧师|星云大师/u, '宗教领袖也该讲公道话'],
    [/加入国民党胜于怕死|宁可去死/u, '宁死也不加入国民党'],
    [/瓦斯.*议会|议会.*瓦斯/u, '瓦斯攻击也是议会抗争'],
    [/老兵|共同的梦|梦破碎/u, '老兵共同梦被背叛'],
    [/淡出.*政治|思想家的李敖|作家的李敖/u, '淡出政治回到思想写作'],
    [/黄芳彦.*摄护腺|摄护腺癌/u, '黄芳彦借口要被消灭'],
    [/党产/u, '党产政见必须兑现'],
    [/媒体.*政府|媒体就是跟政府干/u, '媒体就是跟政府干'],
    [/是非标准.*乱|亡天下/u, '是非标准乱掉就是亡天下'],
    [/台独.*假|假货.*台独/u, '台独分子多是假货'],
    [/一国两制/u, '一国两制仍是解决方案'],
    [/军购/u, '军购会消耗台湾资源'],
    [/台湾关系法/u, '台湾关系法解释权不在台湾'],
    [/美国在台协会|老美/u, '美国在台利益要追查'],
    [/市长|台北市/u, '市长也可提高政治位阶'],
    [/预算冻结/u, '预算冻结可反抗坏政府'],
    [/豁免权|国务机要费/u, '总统豁免权遮住司法'],
    [/知识分子.*真话|知识分子.*讲真话/u, '知识分子要讲真话'],
    [/个人.*时代|伏尔泰/u, '个人也能影响时代'],
    [/陈水扁/u, '陈水扁政治要用事实检验'],
    [/马英九/u, '马英九路线需要检验'],
    [/言论自由/u, '言论自由要落实到平台'],
    [/宪法/u, '宪法位阶要认真看待'],
    [/司法|法院|法官/u, '司法不能替权力开脱'],
    [/媒体/u, '媒体职责是监督政府'],
    [/读书|资料/u, '读书资料要成为判断本领'],
    [/证据/u, '判断必须拿出证据'],
    [/中文|汉字/u, '中文价值要靠现代化维护'],
    [/爱情|婚姻|劈腿/u, '情爱问题要看人性'],
    [/女人|男人|男女/u, '男女问题要回到人性'],
    [/标准/u, '公共判断不能失去标准'],
    [/总统/u, '总统权力要受检验'],
  ];

  for (const [pattern, title] of rules) {
    if (pattern.test(text)) return title;
  }

  const clauses = text
    .split(/[。！？；]/u)
    .map((item) =>
      item
        .replace(/^(可是|所以|并且|因为|如果|好比说|我告诉大家|我跟你讲|请大家注意|大家注意|看到没有|换句话说|这就是)/u, '')
        .replace(/[，,].*$/u, '')
        .trim(),
    )
    .filter((item) => item.length >= 6);
  const preferred = clauses.find((item) => /(应该|不能|必须|不是|就是|没有|可以|要|会)/u.test(item)) ?? clauses[0] ?? '李敖判断';
  return preferred.slice(0, 24);
}

function sourceDateSuffix(sourceFile) {
  const match = sourceFile.match(/\d{4}(\d{2})(\d{2})/u);
  return match ? `${match[1]}-${match[2]}` : sourceFile.slice(0, 3);
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const descriptions = new Map();
  for (const record of master.records ?? []) {
    if (record.book === bookTitle || String(record.id ?? '').startsWith(`LAT${sequence}-`)) continue;
    descriptions.set(normalize(record.description), record.id);
  }
  return descriptions;
}

function makeKeywords(category, title, sourceFile) {
  return [category, title, sourceTopic(sourceFile)].join(',');
}

function ensureUniqueTitles(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.title)) groups.set(record.title, []);
    groups.get(record.title).push(record);
  }

  for (const group of groups.values()) {
    if (group.length < 2) continue;
    for (const record of group) {
      record.title = `${record.title}（${sourceDateSuffix(record.source_file)}-${record.source_paragraph}）`;
      record.keywords = makeKeywords(record.category, record.title, record.source_file);
    }
  }
}

function buildRecords() {
  const candidates = selectCandidates(extractCandidates());
  const existingDescriptions = loadExistingDescriptions();
  const localDescriptions = new Map();
  const skippedDuplicates = [];
  const records = [];

  for (const candidate of candidates) {
    const normalizedDescription = normalize(candidate.description);
    const duplicateId = localDescriptions.get(normalizedDescription) ?? existingDescriptions.get(normalizedDescription);
    const title = autoTitle(candidate);
    if (duplicateId) {
      skippedDuplicates.push({
        source_file: candidate.sourceFile,
        source_paragraph: candidate.source_paragraph,
        title,
        duplicateId,
      });
      continue;
    }

    const id = `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`;
    localDescriptions.set(normalizedDescription, id);
    records.push({
      id,
      book: book.title,
      round,
      status,
      category: candidate.category,
      title,
      description: candidate.description,
      source_file: candidate.sourceFile,
      source_paragraph: candidate.source_paragraph,
      source_path: path.join(sourceBookDir, candidate.sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(candidate.category, title, candidate.sourceFile),
    });
  }

  ensureUniqueTitles(records);
  return { records, skippedDuplicates, candidateCount: candidates.length };
}

function categoryCounts(records) {
  const counts = new Map(taxonomy.map((category) => [category, 0]));
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) ?? 0) + 1);
  }
  return taxonomy.map((category) => ({ category, count: counts.get(category) ?? 0 }));
}

function escapeCsv(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function writeCsv(records, filePath) {
  const columns = [
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
  const rows = [columns.join(',')];
  for (const record of records) {
    rows.push(columns.map((column) => escapeCsv(record[column])).join(','));
  }
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(payload, filePath) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书名：${payload.book.title}`,
    `- 轮次：${payload.book.round}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 候选数：${payload.book.candidate_count}`,
    `- 跳过重复：${payload.book.skipped_duplicate_count}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    '## 索引',
    '',
  ];

  for (const record of payload.records) {
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(records, filePath) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeNote(payload, filePath) {
  const lines = [
    `# ${payload.book.title}提取说明`,
    '',
    `本轮从源目录 \`${payload.book.sourceDir}\` 提取。`,
    '',
    '取舍原则：',
    '',
    '- 逐集读取 GB18030 源文，只保留 `李敖：` 开头的本人判断段。',
    '- 剔除主持串场、节目寒暄、短答、制作信息和过强现场依赖段落。',
    '- 每集先按分数保留高密度判断段，再用分类多样性补入政治、法权、方法、文化、人格、情爱等主题。',
    '- 标题用于检索和浓缩主题；所有 `description` 均保留源文本原段落，不改写。',
    '',
    '分类统计：',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    `候选 ${payload.book.candidate_count} 条，生成 ${payload.records.length} 条，跳过重复 ${payload.book.skipped_duplicate_count} 条。`,
    '',
  ];

  if (payload.book.skipped_duplicate_count) {
    lines.push('跳过重复：');
    lines.push('');
    for (const skipped of payload.book.skipped_duplicates) {
      lines.push(`- ${skipped.source_file}#${skipped.source_paragraph}：${skipped.title}（重复于 ${skipped.duplicateId}）`);
    }
    lines.push('');
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const { records, skippedDuplicates, candidateCount } = buildRecords();
const payload = {
  book: {
    ...book,
    record_count: records.length,
    candidate_count: candidateCount,
    skipped_duplicate_count: skippedDuplicates.length,
    skipped_duplicates: skippedDuplicates,
    category_counts: categoryCounts(records),
  },
  records,
};

fs.mkdirSync(outputDir, { recursive: true });

const roundBase = `思想索引-${round}`;
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);
const indexJsonPath = path.join(outputDir, '思想索引.json');
const indexCsvPath = path.join(outputDir, '思想索引.csv');
const indexTxtPath = path.join(outputDir, '思想索引.txt');

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.copyFileSync(roundJsonPath, indexJsonPath);
writeCsv(records, roundCsvPath);
fs.copyFileSync(roundCsvPath, indexCsvPath);
writeMarkdown(payload, roundMdPath);
writeText(records, indexTxtPath);
writeNote(payload, path.join(outputDir, '提取说明.md'));

console.log(
  `Built ${payload.book.title}: ${records.length} records, ${skippedDuplicates.length} skipped duplicates. Categories: ${payload.book.category_counts
    .map(({ category, count }) => `${category}=${count}`)
    .join(', ')}`,
);
