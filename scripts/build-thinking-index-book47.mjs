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
  .find((name) => name.startsWith('005.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '047.一个预备军官的日记');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '047',
  title: '一个预备军官的日记',
  slug: 'yige-yubei-junguan-de-riji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《一个预备军官的日记》引言、1959年9月至1961年2月日记和退伍日记中提取思想索引。description 保留源文本原段落；序文中他人评价、纯军中流水账、女性外貌琐记、剪报资料堆列和缺少独立判断的短句不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['法权', '007', 4, '禁役反讽', '兵役法,禁役,法权'],
  ['人格', '007', 5, '军中酵素', '军队,锻炼,人格'],

  ['人格', '008', 108, '军中磨炼', '军中,海明威,人格'],
  ['文化', '008', 270, '迎接生活', '自然,劳动,文化'],
  ['人格', '008', 312, '豪爽不淘汰', '豪爽,理智,人格'],

  ['方法', '009', 174, '夹缝用时', '时间,军中,方法'],
  ['方法', '009', 409, '时时用功', '用功,读书,方法'],
  ['人格', '009', 454, '行动做人', '行动,书本,人格'],
  ['方法', '009', 461, '少支出读英文', '英文,节制,方法'],
  ['人格', '009', 467, '力量敬重', '力量,风度,人格'],
  ['文化', '009', 588, '积极文人', '文人,行动,文化'],
  ['人格', '009', 614, '沉默转变', '沉默,心胸,人格'],
  ['人格', '009', 638, '独立心灵', '朋友,独立,人格'],
  ['情爱', '009', 645, '感情自由', '感情,自由,情爱'],
  ['人格', '009', 813, '沉着有力', '沉着,努力,人格'],
  ['人格', '009', 902, '内敛蜕变', '内敛,蜕变,人格'],

  ['方法', '010', 46, '自定规律', '规律,工作,方法'],
  ['方法', '010', 48, '乐群孤独', '乐群,孤独,方法'],
  ['方法', '010', 49, '孤独群居', '孤独,群居,方法'],
  ['人格', '010', 53, '苦痛成珠', '苦痛,人道主义,人格'],
  ['情爱', '010', 56, '智慧之爱', '爱,智慧,情爱'],
  ['方法', '010', 101, '少驳多立', '指责,宣传,方法'],
  ['人格', '010', 103, '困难残忍', '困难,残忍,人格'],
  ['情爱', '010', 167, '不为女人扰', '女人,节制,情爱'],
  ['情爱', '010', 208, '表现肉体', '肉体,表现,情爱'],
  ['方法', '010', 224, '钻入环境', '环境,写实,方法'],
  ['方法', '010', 225, '写实主义', '写实,经验,方法'],
  ['情爱', '010', 265, '贤妻错觉', '贤妻良母,传统,情爱'],
  ['文化', '010', 268, '工业女性', '工业化,女性,文化'],
  ['情爱', '010', 270, '补偿择偶', '择偶,心理,情爱'],
  ['情爱', '010', 271, '人格重复', '人格,婚姻,情爱'],
  ['情爱', '010', 274, '不苛求伴侣', '伴侣,现实,情爱'],
  ['写作', '010', 292, '反高调演说', '演说,实在,写作'],
  ['情爱', '010', 317, '性病症', '性,礼法,情爱'],
  ['文化', '010', 322, '引导群众', '群众,新观念,文化'],
  ['方法', '010', 324, '无理传统', '传统,证据,方法'],
  ['人格', '010', 442, '大气度', '理想,气度,人格'],

  ['文化', '011', 40, '幽默救命', '幽默,人生,文化'],
  ['文化', '011', 42, '滑稽之雄', '滑稽,历史,文化'],
  ['方法', '011', 89, '理智批评', '理智,批评,方法'],
  ['法权', '011', 90, '思想自由', '自由,平等,法权'],
  ['文化', '011', 91, '移植西方', '西方思想,中国,文化'],
  ['文化', '011', 92, '反映时代', '时代,思想,文化'],
  ['情爱', '011', 93, '爱情情欲', '爱情,情欲,情爱'],
  ['法权', '011', 96, '规范变迁', '法律,道德,法权'],
  ['知识', '011', 97, '文化生命', '知识分子,文化,知识'],
  ['写作', '011', 255, '自传价值', '自传,知识分子,写作'],
  ['写作', '011', 311, '新时代文人', '文人,立言,写作'],
  ['人格', '011', 316, '同情了解', '同情,了解,人格'],
  ['人格', '011', 318, '死亡人生观', '死亡,人生观,人格'],
  ['方法', '011', 320, '价值判断', '价值判断,哲学,方法'],

  ['方法', '012', 188, '反权威引证', '逻辑,权威,方法'],
  ['政治', '012', 255, '革命辨析', '革命,历史,政治'],
  ['知识', '012', 285, '残忍史', '历史,人道主义,知识'],
  ['写作', '012', 350, '反叛回忆录', '回忆录,反叛,写作'],

  ['文化', '013', 50, '劳动愉快', '劳动,知识分子,文化'],
  ['人格', '013', 127, '不走人情', '人格,利益,人格'],

  ['方法', '014', 202, '新进程', '平静,英文,方法'],
  ['方法', '014', 234, '英文泛读', '英文,阅读,方法'],

  ['写作', '015', 91, '英文平易', '英文,写作,写作'],
  ['方法', '015', 385, '忍耐寂寞', '交游,寂寞,方法'],
  ['人格', '015', 411, '善恶斗争', '善恶,意志,人格'],

  ['写作', '016', 65, '题材处理', '小说,题材,写作'],
  ['写作', '016', 66, '锻炼必要', '锻炼,能力,写作'],

  ['人格', '017', 486, '赤子之心', '赤子,年轻,人格'],

  ['方法', '019', 486, '以毒攻毒', '金钱,节制,方法'],

  ['情爱', '021', 105, '不陷女人', '女人,自由,情爱'],
  ['人格', '021', 298, '诚实荣誉', '诚实,荣誉,人格'],
  ['人格', '021', 305, '同情支柱', '同情,了解,人格'],

  ['知识', '022', 60, '拆穿偶像', '历史人物,偶像,知识'],
  ['人格', '022', 196, '玉碎主义', '自毁,玉碎,人格'],
  ['文化', '022', 258, '青年奋起', '青年,文化,文化'],
  ['法权', '022', 473, '自由计价', '自由,冤狱,法权'],
  ['情爱', '022', 770, '爱情束缚', '爱情,自由欲,情爱'],
  ['写作', '022', 795, '日记之道', '日记,现实,写作'],
  ['写作', '022', 796, '日记特色', '日记,坦白,写作'],

  ['写作', '023', 420, '中国性史', '性史,方法,写作'],
  ['写作', '023', 444, '集火性史', '性史,不朽,写作'],
  ['方法', '023', 512, '拖死狗读书', '读书,生字,方法'],
  ['写作', '023', 573, '百万自传', '自传,青年,写作'],
  ['方法', '023', 647, '研究时间', '工作,研究,方法'],
  ['知识', '023', 697, '实践哲学', '经验,理解,知识'],
  ['政治', '023', 708, '军中四现象', '军中,权力,政治'],
  ['方法', '023', 716, '练习拒绝', '拒绝,青春,方法'],
  ['写作', '023', 779, '野兽派小说', '小说,历史家,写作'],
  ['政治', '023', 854, '文章难登', '文章,社会,政治'],

  ['人格', '024', 8, '旧我已变', '朋友,变化,人格'],
  ['情爱', '024', 12, '恋爱开明', '恋爱,开明,情爱'],
  ['人格', '024', 193, '只像自己', '性灵,自我,人格'],
  ['方法', '024', 213, '集中工作', '工作,时间,方法'],
  ['人格', '024', 247, '输血论', '人格,善事,人格'],
  ['情爱', '024', 250, '恋爱自由', '恋爱自由,家庭,情爱'],
  ['人格', '024', 289, '顽强苦斗', '孤愤,努力,人格'],
  ['知识', '024', 333, '类聚方法', '类聚,思想,知识'],
  ['情爱', '024', 339, '忘情主义', '爱情,忘情,情爱'],
  ['情爱', '024', 442, '无害不禁', '女人,快乐,情爱'],

  ['人格', '025', 51, '退伍担当', '担当,退伍,人格'],
  ['知识', '025', 67, '晚成作家', '作家,晚成,知识'],

  ['方法', '026', 32, '不耗现在', '过去,现在,方法'],
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
    if (record.id?.startsWith('LAT047-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);

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
  id: `LAT047-${String(index + 1).padStart(3, '0')}`,
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
      '本书篇幅很长，优先收录军中锻炼、读书写作、思想方法、人格自塑、性与爱情、自由法权、文化批判和政治讽刺等可独立检索的段落。',
      '他人序文、纯行程、军中点名操课流水账、女性外貌琐记、剪报资料堆列和只有一句感想的短条不收。',
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
  '# 《一个预备军官的日记》思想索引提取说明',
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
  '本书覆盖1959年9月至1961年2月的军中日记，材料跨度远大于前两本大学后期日记。本轮不追求把所有生活事件都收进索引，而是保留能够独立呈现李敖思想线索的原文段落：军中经验如何锻炼人格，读书写作如何在零碎时间中推进，个人主义与人道主义如何并存，性与爱情如何被重新解释，自由、冤狱、法律和军中政治如何进入他的判断。',
  '',
  '提取轮会比校对轮略宽，尤其保留了若干写作计划、情爱观和军中方法段落，供下一轮继续压缩。纯粹行程、点名操课、朋友来信、序文中他人评价、剪报堆列、女性外貌琐记和只有一句口号的短条均不收。',
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
