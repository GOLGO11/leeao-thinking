import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('015.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '030.千秋万岁编外集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '030',
  title: '千秋万岁编外集',
  slug: 'qianqiu-wansui-bianwai-ji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本书多为《千秋评论》《万岁评论》编外文章，作者来源复杂。本轮只提取可服务李敖思想索引的法权、民主、特务政治、政治犯处境、表达自由、科学方法等材料；纯人事回忆、战史流水、传记细节暂不收入。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权'];

const entries = [
  ['政治', '国际法不能只约束别人', '001', 9, '美国,联合国,国际法,强权'],
  ['政治', '联合国作用取决于强权守正', '001', 10, '联合国,正义,和平,美国'],
  ['政治', '国民党选举只是骗人把戏', '006', 14, '国民党,选举,国大代表,政治'],
  ['政治', '操纵选票制造滑稽选举', '008', 4, '国大代表,选举黑幕,地方政治,政治'],
  ['政治', '代表腐败预示政权垮台', '009', 23, '国民大会,腐败,蒋政府,政治'],
  ['法权', '秘密监狱以黑暗捆绑治人', '012', 9, '秘密监狱,特务,身体自由,法权'],
  ['法权', '特务审讯只剩暴力套话', '012', 14, '特务,审讯,暴力,法权'],
  ['法权', '夜半处决制造恐怖秩序', '012', 21, '秘密监狱,处决,恐怖,法权'],
  ['法权', '集中营用编号抹去姓名', '016', 16, '集中营,编号,人格剥夺,法权'],
  ['法权', '锁禁暗室毁坏囚人身体', '016', 21, '集中营,监禁,身体,法权'],
  ['法权', '赦免只给军统同志', '016', 26, '集中营,军统,特权,法权'],
  ['法权', '集中营规模不是个案', '016', 38, '集中营,规模,政治迫害,法权'],
  ['写作', '评论署名才对读者忠实', '019', 4, '独立评论,署名,责任,写作'],
  ['知识', '现代科学打开思想新境界', '019', 15, '胡适,现代科学,西方文化,知识'],
  ['方法', '大学课堂让学生自行择真', '021', 9, '大学,学说,真理,方法'],
  ['政治', '闭门高压锅是反民主', '032', 24, '民主,闭门协商,少数民族,政治'],
  ['法权', '宪法是共同体生命安排', '035', 5, '宪法,民主,民权,法权'],
  ['法权', '美国政制不是三权鼎立', '035', 6, '美国宪法,权力制衡,司法,法权'],
  ['法权', '无限制议会权同样可畏', '035', 7, '议会权,制衡,立法权,法权'],
  ['政治', '中央政权需要客观代表制度', '035', 10, '中央政权,代表性,选举,政治'],
  ['文化', '大学精神在学问与良心自由', '041', 5, '大学,学问自由,良心自由,文化'],
  ['法权', '紧急权必须预先受限', '043', 6, '紧急权,宪政独裁,法治,法权'],
  ['法权', '戒严权只为军事必要', '043', 14, '戒严,军事必要,自由权利,法权'],
  ['法权', '国民党扭曲宪政独裁', '043', 21, '戒严,国民党,法治,法权'],
  ['人格', '道德勇气重于文笔才华', '047', 6, '柏杨,道德勇气,政治立场,人格'],
  ['法权', '法律禁止歧视不等于社会平等', '048', 8, '美国,人权,歧视,法权'],
  ['知识', '内圣外王容易滑为空论', '058', 13, '学问,内圣外王,新儒家,知识'],
  ['知识', '意见不是科学知识', '059', 4, '意见,科学知识,全盘西化,知识'],
  ['知识', '科学不能折衷', '059', 5, '科学,折衷主义,日本,知识'],
  ['知识', '只有社会学在中国', '059', 6, '社会科学,中国社会学,方法,知识'],
  ['知识', '科学必须全盘接受', '059', 8, '科学,民主,自由,知识'],
  ['知识', '科学认知不同于民主偏好', '059', 9, '科学,民主,认知,知识'],
  ['法权', '有宪法不等于有民主', '060', 2, '宪法,民主,法治,法权'],
  ['法权', '法治以宪法审查政府', '060', 3, '法治,宪法,司法,法权'],
  ['法权', '极权宪法由统治者单方解释', '060', 4, '极权,宪法解释,政府,法权'],
  ['法权', '民主法治兑现宪法', '060', 5, '民主,极权,宪法,法权'],
  ['法权', '诱人犯罪牺牲司法正义', '061', 4, '诱人犯罪,司法,公平,法权'],
  ['法权', '执法者不能设陷阱诱人', '061', 19, '诱人犯罪,警察,正义,法权'],
  ['法权', '警察逮捕权不同于执行逮捕', '063', 7, '警察权,逮捕,民主国家,法权'],
  ['法权', '法院以外不得审问处罚', '063', 8, '法院,审问,处罚,法权'],
  ['法权', '行政罚不能绕过宪法', '063', 13, '行政罚,违警罚法,宪法,法权'],
  ['法权', '违警罚法造成警察国家', '063', 14, '违警罚法,警察国家,自由,法权'],
  ['法权', '自由不是政府赋予', '064', 3, '自由,宪法,立法权,法权'],
  ['法权', '意见表示自由涵盖所有媒介', '064', 5, '表达自由,出版自由,媒介,法权'],
  ['法权', '诽谤救济也须司法程序', '064', 7, '诽谤,司法程序,表达自由,法权'],
  ['法权', '电影检查侵犯表达自由', '064', 12, '电影检查,表达自由,出版自由,法权'],
  ['法权', '限制立法权才有人民自由', '064', 13, '立法权,行政权,自由,法权'],
  ['法权', '法治要求同法同院', '064', 14, '法治,法律平等,法院,法权'],
  ['法权', '国防监狱暴露政治犯不可见', '070', 4, '火烧岛,政治犯,国防监狱,法权'],
  ['法权', '判刑以后仍折磨不是感训', '070', 47, '政治犯,感训,折磨,法权'],
  ['政治', '政治犯被迫书写蒋公遗志', '070', 92, '火烧岛,蒋介石,心得,政治'],
  ['人格', '政治犯用纸条建立互助', '071', 26, '政治犯,互助,难友,人格'],
  ['法权', '邮政政治化检查家信', '071', 90, '火烧岛,邮政政治化,家信,法权'],
  ['法权', '台湾地图也被政治审查', '071', 97, '地图,保防官,政治审查,法权'],
  ['政治', '冤狱把政治身份强加给人', '072', 44, '政治犯,冤狱,国民党,政治'],
  ['政治', '监狱小报告制造互疑', '072', 78, '火烧岛,小报告,政治犯,政治'],
  ['法权', '难友情义被情报化', '072', 99, '火烧岛,特务,难友互助,法权'],
  ['政治', '公营事业用国库补漏洞', '077', 5, '公营事业,国库,特权,政治'],
  ['法权', '自由主义也会限制敌人自由', '079', 29, '钱学森,自由主义,离境自由,法权'],
  ['政治', '头发管制暴露政权荒谬', '080', 12, '头发政治,国民党,学生管制,政治'],
  ['政治', '军费高涨不等于军队健全', '081', 7, '军费,士兵,贪污,政治'],
  ['知识', '胡适改变看法基于事实', '081', 21, '胡适,苏联,事实,知识'],
  ['写作', '自由中国进入军中读者', '082', 9, '自由中国,殷海光,军中阅读,写作'],
  ['写作', '写反调即成特务问题人物', '082', 16, '自由中国,特务,写作,写作'],
  ['方法', '经验可以识破钓鱼阴谋', '082', 33, '殷海光,钓鱼,经验,方法'],
  ['法权', '向法官说明事实抵抗谎言', '082', 86, '法官,事实,谎言,法权'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function sourceFileByPrefix(prefix) {
  const file = fs
    .readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt'))
    .find((name) => name.startsWith(`${prefix}.`));
  if (!file) {
    throw new Error(`Missing source file prefix: ${prefix}`);
  }
  return file;
}

function paragraphs(filePath) {
  const text = decoder.decode(fs.readFileSync(filePath));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const lines = [
    `# 《${bookInfo.title}》思想索引：${bookInfo.round}`,
    '',
    `- 状态：${bookInfo.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；优先保留可独立检索、可回到源文的思想判断。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const counts = categoryCounts(records);
  const lines = [
    `# 《${bookInfo.title}》${bookInfo.round}说明`,
    '',
    `本轮从 ${sourceBookDir} 中提取 ${records.length} 条思想索引。`,
    '',
    '## 取舍说明',
    '',
    '- 收入：宪政、法治、表达自由、诱人犯罪、警察权、戒严、政治犯、特务政治、民主选举、科学方法等可独立检索的段落。',
    '- 暂不收入：纯传记细节、战史流水、人事情节、仅有见闻价值而缺少思想判断的段落。',
    '- 本书为“编外集”，作者来源复杂；本轮按李敖思想索引的谱系价值取材，而非按作者逐篇摊派。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-提取轮.csv',
    '- 思想索引-提取轮.json',
    '- 思想索引-提取轮.md',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const sourceCache = new Map();
const records = entries.map(([category, title, sourceKey, paragraphNumber, keywords], index) => {
  const sourceFile = sourceFileByPrefix(sourceKey);
  const sourcePath = path.join(sourceDir, sourceFile);
  if (!sourceCache.has(sourcePath)) {
    sourceCache.set(sourcePath, paragraphs(sourcePath));
  }
  const sourceParagraphs = sourceCache.get(sourcePath);
  const description = sourceParagraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  return {
    id: `LAT030-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title,
    description,
    source_file: sourceFile,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, sourcePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

for (const [index, record] of records.entries()) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unexpected category at row ${index + 1}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title}: ${records.length} records.`);
