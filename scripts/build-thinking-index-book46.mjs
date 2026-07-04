import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const diaryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('006.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, diaryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('004.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '046.大学后期日记乙集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '046',
  title: '大学后期日记乙集',
  slug: 'daxue-houqi-riji-yiji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《大学后期日记乙集》前记、1959年1月至8月日记和附录公开信中提取思想索引。description 保留源文本原段落；纯行程、人物寒暄、恋爱琐事、资料堆列和缺少独立思想判断的短句不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['写作', 'pre', 6, '日记缺陷', '日记,论学,写作'],
  ['人格', 'pre', 8, '反抗腐败教育', '教育,反抗,人格'],
  ['人格', 'pre', 13, '不肖万岁', '不肖,独立,人格'],

  ['人格', '001', 31, '群体染缸', '群体,个人,人格'],
  ['情爱', '001', 39, '爱情微小', '爱情,理想,情爱'],
  ['知识', '001', 62, '知识宇宙', '知识,勇气,知识'],
  ['知识', '001', 63, '带人类前进', '爱因斯坦,理想,知识'],
  ['写作', '001', 69, '震惊一世', '写作,道德勇气,写作'],
  ['知识', '001', 75, '巨著开导', '巨著,理想,知识'],
  ['方法', '001', 88, '科学方法', '逻辑,科学方法,方法'],
  ['人格', '001', 91, '英雄创造', '英雄,现实,人格'],
  ['知识', '001', 97, '苦读巨书', '读书,苦功,知识'],
  ['文化', '001', 99, '西方启发', '西方,创造,文化'],
  ['知识', '001', 101, '肯定知识', '知识,学术,知识'],
  ['方法', '001', 108, '管住情感', '情感,理智,方法'],
  ['人格', '001', 118, '传记提升', '传记,人格,人格'],
  ['方法', '001', 124, '再创造读书', '读书,热情,方法'],
  ['方法', '001', 125, '孤独必要', '孤独,朋友,方法'],
  ['知识', '001', 149, '书本扎根', '书本,快乐,知识'],
  ['情爱', '001', 153, '不自溺情感', '女人,情感,情爱'],
  ['方法', '001', 197, '强读半小时', '读书,方法,方法'],
  ['知识', '001', 207, '西方方法治史', '西方,中国史,知识'],
  ['方法', '001', 300, '方法学重要', '逻辑,方法学,方法'],
  ['知识', '001', 389, '知识永乐', '知识,读书,知识'],

  ['人格', '002', 16, '远离俗事', '沉默,理想,人格'],
  ['文化', '002', 20, '铁匠生命', '劳动,人生,文化'],
  ['方法', '002', 26, '零星英文', '零星时间,英文,方法'],
  ['方法', '002', 29, '完成精神', '工作,坚持,方法'],
  ['方法', '002', 84, '善用时间', '时间,读书,方法'],
  ['方法', '002', 85, '书本孤单', '孤独,书本,方法'],
  ['文化', '002', 88, '向往西方', '西方,东方,文化'],
  ['知识', '002', 102, '名著提升', '名著,思想,知识'],
  ['情爱', '002', 138, '打破性问题', '性,保守,情爱'],
  ['政治', '002', 148, '政治用语', '西方,政治,政治'],
  ['方法', '002', 190, '孤独知识', '孤独,知识,方法'],

  ['方法', '003', 9, '存款式快乐', '工作,快乐,方法'],
  ['人格', '003', 28, '朋友沙子', '朋友,人格,人格'],
  ['人格', '003', 48, '锻炼决绝', '意志,决绝,人格'],
  ['方法', '003', 71, '过人轻松', '轻松,从容,方法'],
  ['情爱', '003', 82, '精神恋', '理想,爱情,情爱'],
  ['方法', '003', 108, '故意活泼', '快乐,活泼,方法'],

  ['方法', '004', 47, '少计划多工作', '工作,自省,方法'],
  ['方法', '004', 66, '时间尽读', '时间,读书,方法'],
  ['情爱', '004', 84, '性要理智', '性,理智,情爱'],
  ['人格', '004', 127, '永远漠视', '朋友,沉默,人格'],
  ['方法', '004', 129, '独玩独工作', '独处,工作,方法'],
  ['情爱', '004', 136, '不与女人往还', '女人,固执,情爱'],

  ['写作', '005', 24, '大众化第一', '大众化,学者,写作'],
  ['政治', '005', 25, '普及学术改革', '社会改革,学术,政治'],
  ['方法', '005', 47, '独处定力', '独处,读书,方法'],
  ['人格', '005', 61, '布鲁塔斯精神', '朋友,人格,人格'],
  ['人格', '005', 63, '能坏不坏', '善恶,人格,人格'],
  ['人格', '005', 146, '做人技巧', '朋友,沟通,人格'],
  ['方法', '005', 184, '独处内敛', '内敛,知止,方法'],
  ['人格', '005', 194, '未来大成就', '文学,学术,政治'],
  ['人格', '005', 203, '加深我的行', '努力,有办法,人格'],

  ['情爱', '006', 6, '正视偶像', '女人,正视,情爱'],
  ['人格', '006', 51, '做大丈夫', '独立,大丈夫,人格'],
  ['人格', '006', 243, '大英雄色彩', '英雄,女人,人格'],
  ['情爱', '006', 249, '彻底反情', '女人,彻底,情爱'],
  ['人格', '006', 263, '风度结晶', '风度,学问,人格'],
  ['人格', '006', 267, '不求赏识', '了解,自清,人格'],
  ['人格', '006', 268, '充实自我', '充实,力量,人格'],
  ['方法', '006', 270, '刻苦努力', '努力,价值,方法'],

  ['人格', '007', 4, '担当坚强', '担当,坚强,人格'],
  ['法权', '007', 8, '倡导见解自由', '宪法,言论自由,法权'],
  ['人格', '007', 18, '伟大活力', '人生态度,精神,人格'],
  ['知识', '007', 130, '实际知识', '知识,实际,知识'],
  ['方法', '007', 137, '军中转变', '军中,思想,方法'],
  ['方法', '007', 237, '单调硬仗', '单调,生活,方法'],

  ['政治', '009', 5, '腐化自动休学', '大学,腐化,政治'],
  ['法权', '009', 16, '母校作伪证', '伪证,大学,法权'],
  ['法权', '009', 17, '国立大学法理', '法理,伪证,法权'],
  ['法权', '009', 18, '学术自由软骨', '学术自由,权势,法权'],
  ['法权', '009', 19, '刑法伪证', '伪证,法院,法权'],
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

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT046-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);
filesByKey.set('pre', sourceFiles.find((name) => name.includes('前记')));

const paragraphCache = new Map();
function sourceParagraphs(key) {
  const fileName = filesByKey.get(key);
  if (!fileName) {
    throw new Error(`Missing source file for key ${key}`);
  }
  if (!paragraphCache.has(fileName)) {
    const text = decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
    paragraphCache.set(
      fileName,
      text
        .replace(/\r/g, '')
        .split(/\n\s*\n+/)
        .map(normalize)
        .filter(Boolean),
    );
  }
  return { fileName, paragraphs: paragraphCache.get(fileName) };
}

const previous = previousDescriptions();
const skipped = [];
const seenCurrent = new Map();
const keptCandidates = [];

for (const [category, key, paragraphNumber, title, keywords] of candidateEntries) {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${key} P${paragraphNumber}`);
  }
  const { fileName, paragraphs } = sourceParagraphs(key);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${key} P${paragraphNumber}`);
  }
  const normalized = normalize(description);
  if (previous.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: previous.get(normalized) });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({ key, paragraphNumber, title, duplicateOf: seenCurrent.get(normalized) });
    continue;
  }
  keptCandidates.push({
    category,
    title,
    description,
    source_file: fileName,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, path.join(sourceDir, fileName)).replaceAll(path.sep, '/'),
    keywords,
  });
  seenCurrent.set(normalized, `${key} P${paragraphNumber}`);
}

const records = keptCandidates.map((candidate, index) => ({
  id: `LAT046-${String(index + 1).padStart(3, '0')}`,
  book: book.title,
  round: book.round,
  status: book.status,
  ...candidate,
}));

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    candidate_count: candidateEntries.length,
    skipped_duplicate_count: skipped.length,
  },
  taxonomy,
  records,
  extraction: {
    principles: [
      '每条 description 保留源文本原文段落，不改写。',
      '标题只作索引用的浓缩，不替代原文判断。',
      '沿用 8 个原子分类，避免新增过细分类。',
      '本书为1959年大学后期日记，优先收录知识宇宙、孤独读书、论文治学、工作纪律、情爱节制、大学腐化和学术自由法权材料。',
      '纯行程、人物寒暄、恋爱琐事、资料堆列、外部剪报和缺少独立思想判断的短句不收。',
      '与既有总表完全重复的 description 自动跳过。',
    ],
    skipped_duplicates: skipped,
  },
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);

const noteLines = [
  '# 《大学后期日记乙集》思想索引提取说明',
  '',
  `- 提取轮条目：${records.length}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 跳过既有/本书重复：${skipped.length}`,
  `- 来源目录：${book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 取舍说明',
  '',
  '本书覆盖1959年1月至8月，并附《给钱思亮校长的一封公开信》。日记部分集中在知识宇宙、读书与孤独、论文写作、工作纪律、情爱节制和自我锻炼；公开信部分集中在大学腐化、伪证、学术自由和法权程序。',
  '',
  '本轮不把每一次厌女情绪、会面行程、书报资料或外部剪报都列为索引；只保留能独立检索、可反映李敖思想线索的原文段落。后续校对轮可继续压缩过密的情爱节制和读书方法条目。',
  '',
];
fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built ${book.sequence}.${book.title}: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
