import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup))
  .find((name) => name.startsWith('002.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '017.文化论战丹火录');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '017',
  title: '文化论战丹火录',
  slug: 'wenhua-lunzhan-danhuo-lu',
  round: '提取轮',
  status: '待校对',
};

const taxonomy = [
  '写作',
  '方法',
  '知识',
  '人格',
  '文化',
  '政治',
  '法权',
];

const entries = [
  ['人格', '特立独行者难免悲剧', '001', 15, '特立独行,悲剧,论战'],
  ['写作', '先记录孤军奋战的光荣', '001', 16, '记录,孤军奋战,传记'],
  ['写作', '记录别人如何围攻自己', '001', 17, '史料,围攻,纪录'],
  ['人格', '站住不动任人砍', '001', 20, '容忍,金刚之躯,论战'],

  ['知识', '中西文化论战有思想谱系', '002', 3, '思想论战,中西文化,谱系'],
  ['文化', '中西文化是重大论战题目', '002', 14, '中西文化,论战,思想史'],
  ['方法', '大题目容易陷入空洞混淆', '002', 15, '抽象,空洞,混淆'],
  ['方法', '思想方法不及格者不宜评论', '002', 16, '思想方法,评论资格,枝节'],
  ['方法', '真正指路在思想趋向', '002', 18, '思想趋向,指路,文献'],
  ['方法', '避开枝节直指道路', '002', 19, '枝节,方向,趋向'],
  ['政治', '中国应走科学民主现代化趋向', '002', 21, '科学,民主,现代化'],
  ['方法', '老问题重提有深远意义', '002', 24, '老问题,意义,核心'],
  ['方法', '思想趋向之外都是余事', '002', 25, '思想趋向,答案,枝节'],
  ['写作', '文字力量来自广泛反应', '002', 27, '文星,反应,文字力量'],

  ['文化', '传统文化是死文化', '002', 39, '传统文化,死文化,现代'],
  ['文化', '死文化只配做博物馆材料', '002', 40, '文化史,博物馆,时代'],
  ['文化', '传统活细胞不能移植现代', '002', 41, '传统文化,移植,现代'],
  ['文化', '旧挂钟齿轮不能装进新手表', '002', 42, '传统文化,现代,比喻'],
  ['知识', '研究传统不等于提倡传统', '002', 44, '学术研究,传统文化,恐龙'],
  ['文化', '传统文化没有科学民主', '002', 45, '科学,民主,传统文化'],
  ['政治', '提倡传统者通向义和团或共产党', '002', 46, '传统文化,义和团,共产党'],
  ['知识', '强国不靠五千年固有文化', '002', 47, '强国,固有文化,现代化'],
  ['方法', '老实跟强国学习', '002', 48, '学习,强国,传统包袱'],
  ['文化', '追求西方活文化', '002', 49, '西方文化,现代,活文化'],
  ['方法', '国情不同是推托妖言', '002', 50, '国情不同,融合中西,现代化'],
  ['文化', '抛弃死文化学习现代文化', '002', 51, '死文化,现代文化,西方'],
  ['方法', '庞杂文章背后思路只有一个', '002', 52, '思路,一贯,文章'],
  ['写作', '宣扬现代思想批评传统思想', '002', 53, '写作,现代思想,传统思想'],

  ['知识', '西化运动延续现代史脉络', '002', 62, '西化运动,现代史,董寿慈'],
  ['写作', '文字技巧材料方法推动论战', '002', 63, '文字技巧,方法,材料'],
  ['写作', '辑录骂声呈现文字力量', '002', 65, '史料,笑料,文字力量'],
  ['写作', '按时间保留演变线索', '002', 66, '时间线,史料,论战'],
  ['写作', '公开发表过的反应才入册', '002', 67, '发表,材料取舍,史料'],
  ['政治', '对方承认西化派胜利', '002', 120, '西化派,胜利,时代'],
  ['方法', '大报鼓励折衷论调仍不通', '002', 199, '舆论,折衷,文化论战'],
  ['写作', '文化问题不是无战事', '002', 246, '文化问题,论战,反击'],
  ['方法', '说不还嘴却还嘴是尴尬', '002', 335, '论战,还嘴,策略'],
  ['政治', '文化服务战争的说法值得玩味', '002', 361, '文化战,战争,政治'],
  ['人格', '涉猎广博不能靠别人供料', '002', 365, '涉猎,独立,资料'],
  ['写作', '下流阴险也可化为笑料', '002', 397, '笑料,围剿,文章水准'],
  ['政治', '青年党程度暴露在文字里', '002', 409, '青年党,政治,文字'],
  ['政治', '抓殷海光是政治栽诬', '002', 560, '殷海光,文星,政治栽诬'],
  ['政治', '提倡西化在社会中不受欢迎', '002', 576, '西化,社会,不受欢迎'],
  ['方法', '巴札洛夫说法是造谣手段', '002', 583, '巴札洛夫,造谣,战术'],
  ['方法', '反梅毒战术是老套', '002', 594, '梅毒,战术,文化移植'],
  ['法权', '人身攻击要看谁先否定人格', '002', 629, '人身攻击,独立人格,胡秋原'],
  ['方法', '闽变辨伪是独立事件', '002', 630, '闽变,辨伪,文化论战'],
  ['政治', '西化大势不该被超越论遮蔽', '002', 671, '西化,时代潮流,超越论'],
  ['人格', '对方说得清楚也要鼓掌', '002', 674, '公允,鼓掌,论战'],
  ['写作', '攻击文字会日薄西山', '002', 791, '攻击,文字,日薄西山'],
  ['方法', '舆论空谈来自方法训练不足', '002', 859, '舆论,方法训练,空洞'],
  ['知识', '不懂文化学不能谈文化问题', '002', 900, '文化学,胡说八道,论战'],
  ['写作', '丹火显示真金', '002', 906, '丹火,真金,围剿'],

  ['政治', '西化现代化已成固定趋向', '002', 1083, '西化,现代化,趋向'],
  ['文化', '接受西方现代文化是答案', '002', 1084, '西方现代文化,传统文化,共产暴政'],
  ['知识', '观念清楚的文字才是好文字', '002', 1115, '观念,清楚,文字'],
  ['政治', '传统臭包袱不是反共利器', '002', 1156, '传统,反共,共产主义'],
  ['写作', '剪裁史料重编文字网', '002', 1158, '剪裁,史料,文字网'],
  ['方法', '时间是论战的公证人', '002', 1160, '时间,公证人,科学民主'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
}

function readSource(sourceFile) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
}

const sourceFiles = fs.readdirSync(sourceDir);
const sourceFileCache = new Map();

function resolveSourceFile(sourceKey) {
  if (!sourceFileCache.has(sourceKey)) {
    const matches = sourceFiles.filter((name) => (
      name === sourceKey
      || name.startsWith(`${sourceKey}.`)
      || name.includes(sourceKey)
    ));
    if (matches.length !== 1) {
      throw new Error(`Expected one source file for ${sourceKey}, got ${matches.length}`);
    }
    sourceFileCache.set(sourceKey, matches[0]);
  }
  return sourceFileCache.get(sourceKey);
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

function writeMarkdown(filePath, records) {
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file} 第 ${record.source_paragraph} 段`);
    lines.push(`- 关键词：${record.keywords}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeNote(filePath, records) {
  const categoryLines = taxonomy.map((category) => {
    const count = records.filter((record) => record.category === category).length;
    return `- ${category}：${count}`;
  });

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本书主体是论战史料汇编，本轮优先抽取李敖自己的总论、按语、材料剪裁方法和结论性段落。',
    '- 他人来函、社论、长篇攻击文字，只在李敖按语能够形成独立思想索引时收录。',
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  return entries.map(([category, title, sourceKey, sourceParagraph, keywords], index) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category: ${category}`);
    }

    const sourceFile = resolveSourceFile(sourceKey);
    const sourceParagraphs = paragraphs(readSource(sourceFile));
    const description = sourceParagraphs[sourceParagraph - 1];

    if (!description) {
      throw new Error(`Missing source paragraph: ${sourceFile} P${sourceParagraph}`);
    }

    const fullSourcePath = path.join(sourceDir, sourceFile);

    return {
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: book.title,
      round: book.round,
      status: book.status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: sourceParagraph,
      source_path: path.relative(rootDir, fullSourcePath).replaceAll(path.sep, '/'),
      keywords,
    };
  });
}

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
if (records.length !== 59) {
  throw new Error(`Expected 59 records, got ${records.length}`);
}

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
writeNote(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
