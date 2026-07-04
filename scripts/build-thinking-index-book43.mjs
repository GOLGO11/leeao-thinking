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
  .find((name) => name.startsWith('001.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '043.大学札记');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '043',
  title: '大学札记',
  slug: 'daxue-zhaji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《大学札记》的前记及1957年大学时期札记中提取思想索引。description 保留源文本原段落；纯行程、会面流水账、诗题、资源尾巴和缺少独立思想判断的材料不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['人格', 'pre', 3, '自我炼钢', '自我锻炼,修养,人格'],
  ['人格', '001', 2, '担当气象', '担当,沉着,人格'],
  ['人格', '004', 2, '消极暂时', '消极,坚强,人格'],
  ['方法', '005', 2, '理智意志', '理智,意志,方法'],
  ['人格', '005', 3, '英雄意志', '意志,英雄气,人格'],
  ['方法', '006', 4, '抵抗诱惑', '诱惑,戒绝,方法'],
  ['人格', '007', 5, '默然不语', '沉默,牺牲,人格'],
  ['方法', '008', 2, '回想条件', '回想,经验,方法'],
  ['人格', '009', 2, '壮烈反动', '意志,反动,人格'],
  ['人格', '010', 2, '失败不屈', '丘吉尔,坚强,人格'],
  ['人格', '011', 2, '影响别人', '影响,虚荣,人格'],
  ['人格', '012', 2, '道德勇气', '道德勇气,律己,人格'],
  ['人格', '013', 2, '意志生活', '意志,生活,人格'],
  ['人格', '014', 2, '独醒快乐', '智慧,快乐,人格'],
  ['人格', '015', 2, '持志不衰', '持志,旧习,人格'],
  ['方法', '016', 6, '紧张生活', '工作,时间,方法'],
  ['人格', '017', 2, '不怕孤立', '孤立,高志,人格'],
  ['方法', '018', 2, '失败生命力', '失败,奋斗,方法'],
  ['方法', '020', 2, '多言之害', '多言,沉默,方法'],
  ['文化', '021', 2, '艺术自然', '艺术,自然,文化'],
  ['人格', '023', 2, '同情心', '同情心,朋友,人格'],
  ['人格', '024', 2, '洁身自爱', '青年,洁身自爱,人格'],
  ['情爱', '025', 2, '性欲节制', '性欲,动机,情爱'],
  ['人格', '026', 2, '替友设想', '朋友,慈爱,人格'],
  ['方法', '027', 2, '自我耽溺', '自律,日记,方法'],
  ['人格', '028', 2, '伟大标准', '伟大,标准,人格'],
  ['人格', '029', 5, '辽阔心怀', '胸襟,慷慨,人格'],
  ['政治', '030', 2, '顺民压力', '顺民,环境,政治'],
  ['人格', '031', 6, '给人温暖', '温暖,担当,人格'],
  ['方法', '032', 2, '毒蛇解毒', '痛苦,处理,方法'],
  ['方法', '033', 2, '已往是贼', '过去,未来,方法'],
  ['方法', '034', 2, '反省造因', '反省,努力,方法'],
  ['方法', '036', 2, '懒惰标准', '懒惰,工作,方法'],
  ['方法', '036', 13, '工作抗疲倦', '疲倦,工作,方法'],
  ['方法', '037', 5, '善用往事', '往事,经验,方法'],
  ['方法', '037', 6, '过去刺激', '过去,刺激,方法'],
  ['人格', '038', 2, '责人与自责', '自责,宽恕,人格'],
  ['知识', '039', 5, '透视永恒', '斯宾诺沙,永恒,知识'],
  ['法权', '039', 7, '拒绝缄默', '思想,表达,法权'],
  ['法权', '039', 10, '有限言论自由', '言论自由,真理,法权'],
  ['知识', '039', 11, '双手支持思想', '思想,劳动,知识'],
  ['人格', '039', 18, '害人害己', '平等,人类,人格'],
  ['人格', '039', 19, '聪明与快乐', '聪明,快乐,人格'],
  ['政治', '040', 2, '志士比例', '志士,社会,政治'],
  ['方法', '042', 2, '大业有养', '大业,忍耐,方法'],
  ['方法', '043', 2, '悲观病根', '悲观,历史眼光,方法'],
  ['人格', '045', 2, '第一等人', '第一等人,取舍,人格'],
  ['方法', '046', 2, '控制思想', '思想,精神纪律,方法'],
  ['情爱', '047', 2, '爱情移动', '爱情,变化,情爱'],
  ['情爱', '048', 2, '摆脱恋字', '恋,摆脱,情爱'],
  ['人格', '049', 2, '苦处打出', '吃苦,立志,人格'],
  ['知识', '050', 2, '学问之乐', '学问,收敛,知识'],
  ['方法', '051', 2, '忍受单调', '单调,工作,方法'],
  ['情爱', '052', 2, '爱情比例', '爱情,比例,情爱'],
  ['方法', '053', 2, '止谤无辩', '诽谤,沉默,方法'],
  ['人格', '054', 2, '和血吞', '忍耐,自强,人格'],
  ['人格', '055', 2, '发大勇猛', '立志,勇猛,人格'],
  ['方法', '056', 2, '沉默进步', '沉默,谨言,方法'],
  ['情爱', '058', 2, '理智锁情', '胡适,感情,情爱'],
  ['情爱', '059', 6, '多年忘情', '忘情,理智,情爱'],
  ['情爱', '059', 11, '不动心生活', '忘情,余味,情爱'],
  ['人格', '060', 2, '精明英爽', '奇气,精神,人格'],
  ['方法', '062', 2, '行动改情感', '行动,感情,方法'],
  ['方法', '063', 9, '蜕变四步', '蜕变,习惯,方法'],
  ['知识', '064', 2, '思想贡献', '殷海光,哲学,知识'],
  ['情爱', '065', 2, '胃口倒尽', '爱情,兴趣,情爱'],
  ['人格', '067', 2, '严肃长者', '严肃,长者风,人格'],
  ['人格', '068', 2, '倔强与刚愎', '倔强,自胜,人格'],
  ['方法', '069', 2, '宁静定力', '宁静,克己,方法'],
  ['方法', '070', 2, '善用逆境', '逆境,磨折,方法'],
  ['人格', '071', 2, '铁石心肠', '意志,断念,人格'],
  ['方法', '072', 2, '沉默寡言', '沉默,成功,方法'],
  ['方法', '073', 2, '规律生活', '规律,平静,方法'],
  ['方法', '074', 4, '目标奠基', '目标,愿望,方法'],
  ['人格', '075', 2, '认识自己', '孤独,自知,人格'],
  ['人格', '076', 2, '痛苦锻炼', '痛苦,忍受,人格'],
  ['方法', '077', 2, '正视善恶', '真相,善恶,方法'],
  ['方法', '078', 2, '犁破困难', '困难,决心,方法'],
  ['方法', '080', 2, '忘掉而笑', '记忆,痛苦,方法'],
  ['知识', '082', 2, '空想想象', '空想,想象,知识'],
  ['人格', '083', 2, '能为不为', '节制,余味,人格'],
  ['方法', '085', 2, '安闲之乐', '安闲,自由,方法'],
  ['人格', '087', 2, '失败处开始', '失败,奋斗,人格'],
  ['人格', '089', 2, '自负气象', '自负,气象,人格'],
  ['人格', '091', 2, '胸襟雄心', '胸襟,雄心,人格'],
  ['人格', '094', 2, '堕落形态', '堕落,气象,人格'],
  ['人格', '096', 2, '愉快自恃', '愉快,自恃,人格'],
  ['人格', '097', 2, '乐观笑脸', '乐观,笑脸,人格'],
  ['人格', '099', 2, '有所不为', '人格,牺牲,人格'],
  ['方法', '100', 2, '明哲有所避', '灾难,取舍,方法'],
  ['人格', '102', 2, '努力自造', '自造,蜕变,人格'],
  ['人格', '103', 2, '抵挡流俗', '流俗,正视,人格'],
  ['方法', '105', 2, '远离敌人', '远离,舍弃,方法'],
  ['政治', '106', 2, '救出自己', '青年,自救,政治'],
  ['人格', '107', 2, '轻世肆志', '鲁仲连,尊严,人格'],
  ['知识', '109', 2, '知识分子胸襟', '知识分子,合作,知识'],
  ['人格', '110', 2, '拒绝世俗生活', '世俗,大志,人格'],
  ['人格', '113', 5, '消灭狂态', '狂态,谨言,人格'],
  ['人格', '114', 4, '孤独造我', '孤独,自我,人格'],
  ['人格', '114', 8, '脱离俗情', '胸襟,俗情,人格'],
  ['方法', '117', 2, '远大憧憬', '眼光,理想,方法'],
  ['写作', '118', 2, '日记祈祷', '日记,自励,写作'],
  ['人格', '119', 2, '成熟境界', '成熟,长者风,人格'],
  ['方法', '120', 2, '拒绝耗时', '时间,交往,方法'],
  ['方法', '121', 7, '青春时间', '青春,时间,方法'],
  ['人格', '122', 12, '智深勇沉', '修养,沉着,人格'],
  ['方法', '124', 2, '静默之趣', '静默,沉默,方法'],
  ['方法', '125', 2, '少说有力', '少说,定力,方法'],
  ['方法', '126', 2, '现实理想', '现实,理想,方法'],
  ['方法', '127', 2, '选择生活方式', '生活方式,经验,方法'],
  ['方法', '130', 2, '小段时间', '时间,专攻,方法'],
  ['人格', '131', 2, '孤立不惧', '孤立,寂寞,人格'],
  ['情爱', '132', 2, '解情之蔽', '忘情,情蔽,情爱'],
  ['情爱', '133', 2, '情欲节制', '情欲,节制,情爱'],
  ['方法', '135', 2, '一点一滴', '时间,进步,方法'],
  ['方法', '136', 2, '大处小处', '眼光,计划,方法'],
  ['人格', '137', 2, '不再辱', '尊严,自觉,人格'],
  ['人格', '138', 2, '腐心精神', '精神,九死无悔,人格'],
  ['人格', '139', 2, '有用的人', '有用,好人,人格'],
  ['方法', '141', 2, '主敬入睡', '主敬,日记,方法'],
  ['方法', '142', 2, '慢说话', '说话,失言,方法'],
  ['方法', '145', 2, '隔断功夫', '隔断,放下,方法'],
  ['方法', '146', 13, '困难在心', '困难,拖延,方法'],
  ['方法', '147', 2, '不放松', '律己,警惕,方法'],
  ['方法', '148', 2, '休息偷时', '休息,计划,方法'],
  ['人格', '152', 22, '环境借口', '环境,苟安,人格'],
  ['人格', '152', 23, '置死后生', '勇气,后路,人格'],
  ['方法', '152', 24, '先别怕困难', '困难,信心,方法'],
  ['人格', '152', 26, '绝处逢生', '苟安,潜力,人格'],
  ['人格', '152', 29, '殉道勇气', '勇气,彻底,人格'],
  ['人格', '153', 2, '台大硬汉', '孤立,毅力,人格'],
  ['人格', '154', 2, '朋友观点', '自重,人格,朋友'],
  ['人格', '154', 21, '影响而成熟', '影响,成熟,人格'],
  ['人格', '157', 2, '伟大解痛', '伟大,痛苦,人格'],
  ['方法', '159', 2, '谈话记结论', '谈话,记录,方法'],
  ['情爱', '160', 4, '能为而不为', '人格,尊严,情爱'],
  ['人格', '161', 2, '力量表情', '表情,力量,人格'],
  ['情爱', '163', 2, '清醒处情', '情爱,理智,情爱'],
  ['人格', '164', 2, '孤单可爱', '孤独,自我,人格'],
  ['写作', '171', 2, '日记解脱', '日记,解脱,写作'],
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
    if (record.id?.startsWith('LAT043-')) continue;
    map.set(normalize(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(sourceFiles.map((name) => [name.slice(0, 3), name]));
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
  id: `LAT043-${String(index + 1).padStart(3, '0')}`,
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
      '本书为大学时期修养札记，优先收录可独立检索的自我锻炼、读书治学、时间纪律、孤独沉默、情爱节制和知识分子态度。',
      '纯行程、会面流水账、诗题、资源尾巴、过度依赖私人情境的短句不收。',
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
  '# 《大学札记》思想索引提取说明',
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
  '本书由1957年大学时期札记构成，主题集中在自我锻炼、意志、读书治学、时间纪律、沉默孤独、处世与情爱节制。提取轮优先收录能够脱离单日行程而独立检索的思想段落。',
  '',
  '暂不收录纯会面、纯行程、诗题、资料页尾、只说明书籍来源或个人琐事的段落；对长篇摘译或通信，只截取其中已经形成清楚思想判断的原段落。后续校对轮可继续压缩重复的自我砥砺条目，并检查外引段落是否需要降密。',
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
