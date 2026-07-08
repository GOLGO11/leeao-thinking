import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 87;
const bookTitle = '李敖有话说';
const round = '提取轮';
const status = '待校对';
const sequence = String(bookSeq).padStart(3, '0');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');
const maxRecords = 360;

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categoryQuotas = new Map([
  ['写作', 24],
  ['方法', 36],
  ['知识', 46],
  ['人格', 34],
  ['文化', 36],
  ['政治', 118],
  ['法权', 56],
  ['情爱', 24],
]);

const categoryKeywords = new Map([
  ['写作', ['写作', '写书', '文章', '文学', '小说', '文字', '中文', '句典', '文法', '作品', '作家', '办报', '报纸']],
  ['方法', ['方法', '证据', '资料', '判断', '思考', '观念', '解释', '标准', '比较', '角度', '真相', '研究', '读书', '想象力', '本领']],
  ['知识', ['历史', '史料', '档案', '知识', '真相', '文化', '书', '读物', '文件', '古代', '近代史', '资料', '学问']],
  ['人格', ['人格', '勇气', '骨气', '尊严', '诚实', '快乐', '人生', '斗士', '孤独', '理想', '报仇', '恩怨', '清白', '格调']],
  ['文化', ['中文', '汉字', '语言', '文字', '文物', '艺术', '宗教', '经典', '诗经', '书法', '戏剧', '美学', '信仰', '圣经']],
  ['政治', ['台湾', '台独', '中国', '美国', '国民党', '民进党', '陈水扁', '马英九', '统一', '民主', '选举', '国家', '政党', '政府', '军购', '二二八', '九二共识', '一国两制']],
  ['法权', ['法律', '宪法', '司法', '法院', '自由', '言论', '权利', '诉讼', '控告', '法治', '立法', '议会', '立法院', '弹劾', '判决', '权力']],
  ['情爱', ['爱情', '婚姻', '前妻', '红颜', '美女', '色情', '性玩具', '性欲', '恋爱', '同居', '老婆', '男女']],
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
  '所以我们',
  '我们可以看到',
  '我的意思',
  '这告诉我们',
  '问题来了',
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
  (name) => name.startsWith('007.'),
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
  slug: 'leeao-has-something-to-say',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖有话说》七百三十五集节目文字中提取思想索引。因体量远大于前书，生成器采用可复验的段落筛选：逐集读取 GB18030 源文，剔除标题、制作信息、短串场和弱现场段，按“李敖本人可独立检索的判断段”打分，并用八个原子分类做分布收束。标题用于检索浓缩，description 保留源文本原段落。',
};

function normalize(text) {
  return String(text ?? '').replace(/\s+/gu, ' ').trim();
}

function sourceTopic(sourceFile) {
  return sourceFile
    .replace(/^\d+\./u, '')
    .replace(/\.txt$/u, '')
    .replace(/^\d{4}[-.]\d{2}[-.]\d{2}[：:]/u, '')
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

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
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
  const scores = new Map(taxonomy.map((category) => [category, categoryScore(text, topic, category)]));

  if (text.includes('言论自由')) scores.set('法权', scores.get('法权') + 4);
  if (text.includes('台独') || text.includes('统一') || text.includes('美国')) scores.set('政治', scores.get('政治') + 2);
  if (text.includes('中文') || text.includes('汉字')) scores.set('文化', scores.get('文化') + 3);
  if (text.includes('读书') || text.includes('资料') || text.includes('证据')) scores.set('方法', scores.get('方法') + 2);
  if (/(爱情|性欲|性玩具|色情|婚姻|前妻|同居|恋爱)/u.test(text)) {
    scores.set('情爱', scores.get('情爱') + 4);
  }

  return taxonomy
    .slice()
    .sort((a, b) => scores.get(b) - scores.get(a) || taxonomy.indexOf(a) - taxonomy.indexOf(b))[0];
}

function scoreParagraph(text, topic, paragraphIndex, paragraphCount) {
  if (paragraphIndex === 0) return Number.NEGATIVE_INFINITY;
  if (text.length < 90) return Number.NEGATIVE_INFINITY;
  if (metadataSignals.some((signal) => text.includes(signal))) return Number.NEGATIVE_INFINITY;
  if (/^(广告|好，广告|广告回来|上一集)/u.test(text)) return Number.NEGATIVE_INFINITY;

  let score = Math.min(text.length, 520) / 70;
  for (const signal of strongSignals) {
    if (text.includes(signal)) score += 5;
  }
  for (const category of taxonomy) {
    for (const keyword of categoryKeywords.get(category) ?? []) {
      if (text.includes(keyword)) score += 1.2;
      if (topic.includes(keyword)) score += 0.6;
    }
  }

  if (text.includes('言论自由')) score += 7;
  if (text.includes('台独')) score += 4;
  if (text.includes('九二共识') || text.includes('一国两制')) score += 5;
  if (text.includes('二二八')) score += 4;
  if (text.includes('读书') || text.includes('写作') || text.includes('中文')) score += 4;
  if (text.includes('我李敖')) score += 1;
  if (/^李敖[：:]/u.test(text)) score += 2;
  if (paragraphIndex > paragraphCount - 6) score -= 8;
  if (text.includes('这就是我今天')) score -= 1.5;

  return score;
}

function extractCandidates() {
  const candidates = [];

  for (const sourceFile of sourceFiles) {
    const paragraphs = readParagraphs(sourceFile);
    const topic = sourceTopic(sourceFile);
    const fileCandidates = [];

    paragraphs.forEach((text, index) => {
      const score = scoreParagraph(text, topic, index, paragraphs.length);
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
    if (fileCandidates[0] && fileCandidates[0].score >= 18) {
      candidates.push(fileCandidates[0]);
    }

    const second = fileCandidates.find(
      (candidate) =>
        candidate.score >= 38 &&
        candidate.category !== fileCandidates[0]?.category &&
        Math.abs(candidate.source_paragraph - (fileCandidates[0]?.source_paragraph ?? 0)) > 2,
    );
    if (second) candidates.push(second);
  }

  return candidates;
}

function selectBalanced(candidates) {
  const selected = new Map();

  for (const category of taxonomy) {
    const quota = categoryQuotas.get(category) ?? 0;
    const categoryCandidates = candidates
      .filter((candidate) => candidate.category === category && candidate.score >= 18)
      .sort((a, b) => b.score - a.score)
      .slice(0, quota);
    for (const candidate of categoryCandidates) {
      selected.set(`${candidate.sourceFile}#${candidate.source_paragraph}`, candidate);
    }
  }

  const remaining = candidates
    .slice()
    .sort((a, b) => b.score - a.score)
    .filter((candidate) => !selected.has(`${candidate.sourceFile}#${candidate.source_paragraph}`));

  for (const candidate of remaining) {
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

function autoTitle(candidate) {
  const text = candidate.description;
  const topic = candidate.topic.replace(/[“”"']/gu, '').trim();

  if (topic && !/^(我终于有一个机会|节目告一段落|我的另外一个境界|说说我不再做节目)/u.test(topic)) {
    return topic.slice(0, 24);
  }

  const rules = [
    [/言论自由/u, '言论自由要落实到媒介'],
    [/九二共识/u, '九二共识不能被赖掉'],
    [/一国两制/u, '一国两制最利台湾'],
    [/台独/u, topic.includes('台独') ? topic : '台独不是现实出路'],
    [/二二八/u, topic.includes('二二八') || topic.includes('228') ? topic : '二二八真相要回到证据'],
    [/军购/u, topic.includes('军购') ? topic : '军购问题要理性判断'],
    [/美国/u, topic.includes('美国') ? topic : '美国问题牵动台湾问题'],
    [/马英九/u, topic.includes('马英九') ? topic : '马英九路线需要检验'],
    [/陈水扁/u, topic.includes('陈水扁') ? topic : '陈水扁政治要用事实检验'],
    [/中文|汉字/u, topic.includes('中文') || topic.includes('汉字') ? topic : '中文价值需要抢救'],
    [/写作/u, topic.includes('写') ? topic : '写作要靠资料和方法'],
    [/读书/u, topic.includes('读书') ? topic : '读书要讲方法'],
    [/爱情/u, topic.includes('爱情') ? topic : '爱情要看真实代价'],
    [/性玩具|性欲/u, topic.includes('性') ? topic : '性问题也要依法判断'],
    [/知识分子/u, topic.includes('知识') ? topic : '知识分子要监督权力'],
    [/证据|资料/u, topic.includes('证据') || topic.includes('资料') ? topic : '判断要靠证据资料'],
  ];

  for (const [pattern, title] of rules) {
    if (pattern.test(text)) return title.slice(0, 24);
  }

  return topic.slice(0, 24) || '李敖有话说';
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

function sourceDateSuffix(sourceFile) {
  const match = sourceFile.match(/\d{4}-(\d{2})-(\d{2})/u);
  return match ? `${match[1]}-${match[2]}` : sourceFile.slice(0, 3);
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
      record.title = `${record.title}（${sourceDateSuffix(record.source_file)}）`;
      record.keywords = makeKeywords(record.category, record.title, record.source_file);
    }
  }
}

function buildRecords() {
  const candidates = selectBalanced(extractCandidates());
  const existingDescriptions = loadExistingDescriptions();
  const localDescriptions = new Map();
  const skippedDuplicates = [];
  const records = [];

  for (const candidate of candidates) {
    const normalizedDescription = normalize(candidate.description);
    const duplicateId = localDescriptions.get(normalizedDescription) ?? existingDescriptions.get(normalizedDescription);
    if (duplicateId) {
      skippedDuplicates.push({
        source_file: candidate.sourceFile,
        source_paragraph: candidate.source_paragraph,
        title: autoTitle(candidate),
        duplicateId,
      });
      continue;
    }

    const id = `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`;
    const title = autoTitle(candidate);
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
    '- 逐集读取 GB18030 源文，剔除标题、制作信息、短串场和弱现场段。',
    '- 优先保留李敖自己的明确判断、方法、价值标准或可复用概念。',
    '- 因全书 735 集、约 1.66 万段，本轮用分数和分类配额先形成精炼提取版，校对轮再人工收束。',
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
