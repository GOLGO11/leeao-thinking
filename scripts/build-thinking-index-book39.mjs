import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const poetryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('005.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, poetryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('003.'));
const sourceDir = path.join(rootDir, sourceRoot, poetryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '039.李语录');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '039',
  title: '李语录',
  slug: 'li-yulu',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李语录》及附录短札中抽取可独立检索的语录型思想条目。因本书每条原文多为短语录，提取时排除目录、制作组署名、纯题目段、纯俏皮话和缺少独立思想承载力的性笑话，优先保留政治批判、人格判断、方法论、写作观、知识批评、文化观察、法权判断和少量情爱判断。description 仍逐条保留源文本原文段落。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['写作', '001', 3, '不朽,李敖,写作'],
  ['写作', '001', 9, '纸上,写作,马屁'],
  ['人格', '001', 11, '得失,患得患失,人格'],
  ['人格', '001', 17, '成熟,知道,人格'],
  ['知识', '001', 21, '玄学,牟宗三,知识'],
  ['政治', '002', 3, '不良老年,国民党,政治'],
  ['方法', '002', 5, '折旧,知识,情人,方法'],
  ['政治', '002', 7, '财政,藏富于民,国民党'],
  ['法权', '002', 11, '自由,尊严,杰斐逊'],
  ['方法', '002', 13, '黑白,伪君子,判断'],
  ['方法', '002', 15, '是非,相对,方法'],
  ['人格', '002', 19, '报仇,大人物,人格'],
  ['写作', '002', 21, '文艺,责任,写作'],
  ['政治', '003', 3, '国民党,纳粹,有所不为'],
  ['人格', '003', 12, '朋友,敌人,人格', '敌人与朋友'],
  ['政治', '003', 18, '变节,共产党,国民党'],
  ['知识', '003', 20, '学问,发电机,知识'],
  ['人格', '004', 3, '傲骨,骄气,人格'],
  ['人格', '004', 7, '天下,忧患,人格'],
  ['政治', '004', 9, '革命,良币,劣币'],
  ['人格', '004', 15, '前进,后退,勇士'],
  ['政治', '004', 21, '烟酒,抗议,理论'],
  ['人格', '005', 5, '莲,淤泥,人格'],
  ['人格', '005', 11, '同志,同路人,人格'],
  ['政治', '005', 17, '党外,活动,政治'],
  ['政治', '005', 19, '思想巨人,行动侏儒,政治'],
  ['政治', '006', 3, '历史,讳饰诬枉,国民党'],
  ['情爱', '006', 13, '真话,女人,情爱'],
  ['方法', '006', 15, '材料,努力,方法'],
  ['人格', '006', 19, '小人,敌人,人格'],
  ['知识', '007', 5, '教育,企鹅,知识'],
  ['政治', '007', 7, '老百姓,倒悬,国民党'],
  ['方法', '007', 9, '问题,解决,方法'],
  ['写作', '007', 11, '罗素,胡适,文章题目'],
  ['人格', '007', 13, '魔鬼,赌真牌,人格'],
  ['知识', '007', 19, '学者,政府,知识'],
  ['政治', '007', 21, '政工,政战,政治'],
  ['人格', '008', 15, '人格,统治,国民党'],
  ['政治', '008', 19, '敌人,政权,政治'],
  ['文化', '008', 21, '美国人,中国人,文化'],
  ['写作', '009', 3, '新诗人,写作,欺骗'],
  ['人格', '009', 11, '怕苦,人格'],
  ['法权', '009', 17, '政府,抓放,德政'],
  ['人格', '010', 15, '后路,前冲,人格'],
  ['方法', '010', 17, '刀,笔,刀笔'],
  ['人格', '011', 3, '小人物,大人物,人格'],
  ['政治', '011', 5, '人才,奴才,国民党'],
  ['写作', '011', 7, '热情,灵感,作文'],
  ['法权', '011', 9, '自由,民主,配给'],
  ['文化', '011', 11, '荣辱,无耻,文化'],
  ['方法', '011', 15, '错误,聪明人,方法'],
  ['写作', '011', 17, '无知,写作范围,写作'],
  ['政治', '012', 5, '反国民党,加入,政治'],
  ['人格', '012', 11, '敌人,朋友,斗争'],
  ['人格', '012', 15, '报仇,上帝,动手'],
  ['人格', '013', 3, '激浊,扬清,人格'],
  ['法权', '013', 7, '经济,政治,法律'],
  ['情爱', '013', 13, '女人,自爱,情爱'],
  ['方法', '013', 15, '对不对,能不能,方法'],
  ['知识', '013', 17, '孔子,知识,不知道'],
  ['方法', '013', 21, '常识,非常,方法'],
  ['政治', '014', 11, '独裁,民主,政治'],
  ['政治', '014', 13, '民主,政治'],
  ['政治', '014', 15, '国民党,开大门,政治'],
  ['政治', '014', 17, '红包,礼物,政治'],
  ['方法', '014', 21, '平静,定时炸弹,方法'],
  ['人格', '015', 3, '高人,群众,负责'],
  ['人格', '015', 5, '笨人,自作聪明,人格'],
  ['方法', '015', 7, '制造问题,解决问题,方法'],
  ['政治', '015', 13, '三民主义,主义,政治'],
  ['人格', '015', 15, '壁上观,可耻,人格'],
  ['写作', '015', 17, '奋笔,自由,写作'],
  ['人格', '016', 3, '赢过别人,输了自己,人格'],
  ['人格', '016', 5, '好人,坏事,人格'],
  ['人格', '016', 9, '不义,打倒,人格'],
  ['人格', '016', 11, '恩怨,不可交,人格'],
  ['写作', '016', 13, '孙中山,蒋介石,写作'],
  ['人格', '016', 15, '英雄,懦夫,人格'],
  ['政治', '016', 17, '国民党,党外,政治'],
  ['法权', '017', 7, '法律,法官,法权'],
  ['情爱', '017', 11, '婚姻,离婚,情爱'],
  ['人格', '018', 3, '年老气盛,人格'],
  ['人格', '018', 5, '离合,人生,人格'],
  ['方法', '018', 9, '良医,方法'],
  ['写作', '018', 15, '研究,国民党,写作'],
  ['写作', '018', 19, '朋友,敌人,买书'],
  ['写作', '019', 3, '出版,风险,写作'],
  ['政治', '019', 7, '独裁者,零件,政治'],
  ['政治', '019', 13, '党外,数典忘祖,政治'],
  ['政治', '019', 15, '黑猫白猫,党外,政治'],
  ['写作', '019', 21, '打击不义,用笔,写作'],
  ['人格', '020', 3, '黑暗,光明,人格'],
  ['文化', '020', 7, '台湾,台独,文化'],
  ['人格', '020', 11, '隐士,斗士,人格'],
  ['方法', '020', 13, '问题,说清楚,方法'],
  ['方法', '020', 15, '有理,听起来有理,方法'],
  ['政治', '020', 21, '孙中山,蒋介石,政治'],
  ['政治', '021', 3, '国民党,党外,政治'],
  ['政治', '021', 11, '选举,兴奋剂,政治'],
  ['政治', '022', 3, '宣传,保密,政治'],
  ['政治', '022', 7, '国民党,狼,政治'],
  ['文化', '022', 15, '有神论,无神论,文化'],
  ['法权', '022', 21, '读书,禁书,烧书'],
  ['写作', '023', 5, '作家,写书,写作'],
  ['知识', '023', 13, '胡适,知识'],
  ['政治', '024', 5, '三民主义,平等,政治'],
  ['写作', '024', 21, '屠户,笔,写作'],
  ['人格', '025', 7, '虚心,虚无,人格'],
  ['人格', '025', 9, '敌人,朋友,打击点'],
  ['法权', '025', 11, '情理法,小人,法权'],
  ['人格', '025', 13, '小人,痛苦,人格'],
  ['人格', '025', 15, '报仇,敌人,人格'],
  ['人格', '026', 7, '争执,敌人,人格'],
  ['文化', '026', 13, '文化美容,骗术,文化'],
  ['人格', '026', 15, '人生,观众,演员'],
  ['知识', '026', 17, '党化教育,教育,知识'],
  ['人格', '026', 19, '真话,事实,人格'],
  ['方法', '026', 21, '活人,死人,防人'],
  ['政治', '027', 11, '政权,动口,动手'],
  ['人格', '027', 19, '朋友,绝交,人格'],
  ['方法', '027', 21, '解释,敌人,朋友'],
  ['方法', '028', 3, '人性,动物园,方法'],
  ['知识', '028', 5, '哲学,玄学,知识'],
  ['文化', '028', 7, '新道德,旧道德,文化'],
  ['文化', '028', 9, '政客,巨贾,书'],
  ['方法', '028', 13, '真理,味精,方法'],
  ['政治', '028', 15, '神话,台独,反攻大陆'],
  ['人格', '028', 17, '受伤,逃跑,人格'],
  ['写作', '028', 19, '国民党,作家,写作'],
  ['人格', '029', 11, '做事,困难,人格'],
  ['人格', '029', 13, '好人,坏人,评价'],
  ['人格', '029', 19, '人生,成绩,人格'],
  ['人格', '030', 7, '大义,小不义,人格'],
  ['人格', '031', 5, '复仇,翻案,人格'],
  ['人格', '031', 9, '战斗,仲裁,人格'],
  ['人格', '031', 11, '人缘,真理,人格'],
  ['政治', '031', 13, '革命,反革命,政治'],
  ['政治', '031', 19, '国民党,民进党,政治'],
  ['政治', '031', 21, '国民党,民进党,未来'],
  ['文化', '032', 13, '外省人,大陆,台湾'],
  ['人格', '032', 17, '好坏,人格'],
  ['人格', '032', 19, '钱,权,被骂'],
  ['政治', '033', 9, '政治,经济,教育'],
  ['人格', '033', 11, '现实主义,理想主义'],
  ['政治', '033', 13, '清君侧,君,政治'],
  ['政治', '034', 7, '投票,选举,政治'],
  ['法权', '034', 13, '言论,尺度,警备总部'],
  ['人格', '034', 15, '敌人,困扰,人格'],
  ['人格', '034', 21, '好人,恶缘,人格'],
  ['政治', '035', 5, '国民党,民进党,台湾'],
  ['政治', '035', 7, '权力,腐化,国民党'],
  ['政治', '035', 11, '国民党,语意学,政治'],
  ['政治', '035', 17, '共产党,国民党,贪婪'],
  ['知识', '036', 3, '历史家,过去,知识'],
  ['写作', '036', 19, '读者,写文章,写作'],
  ['政治', '036', 21, '国民党,民进党,三达德'],
  ['人格', '037', 9, '理想,赚钱,人格'],
  ['政治', '037', 11, '革命,对象,政治'],
  ['人格', '037', 21, '道德,不道德,人格'],
  ['政治', '038', 5, '政党,正义,政治'],
  ['人格', '038', 13, '老友,宿敌,人格'],
  ['方法', '038', 19, '攻击,防御,方法'],
  ['政治', '039', 11, '革命,过犹不及'],
  ['人格', '039', 15, '敌人,麻烦,人格'],
  ['政治', '039', 17, '国民党,罪恶,政治'],
  ['政治', '039', 19, '谎话,蒋介石,政治'],
  ['人格', '040', 7, '正义,冤枉,人格'],
  ['法权', '041', 5, '法律,法官,法权'],
  ['政治', '041', 11, '说谎,政客,律师'],
  ['方法', '041', 13, '黑暗,看事,方法'],
  ['人格', '041', 23, '任务,力量,人格'],
  ['方法', '041', 25, '工作,困难,方法'],
  ['方法', '041', 27, '谣言,智者,方法'],
  ['方法', '041', 29, '聪明人,笨蛋,方法'],
  ['政治', '042', 11, '开玩笑,民主,政治'],
  ['文化', '042', 13, '衣食足,民主,文化'],
  ['人格', '042', 17, '理想,少赚,人格'],
  ['政治', '042', 21, '政治,暴力,经济,暴利'],
  ['人格', '042', 23, '大作家,自己,人格'],
  ['政治', '043', 3, '国民党,民进党,政治'],
  ['政治', '043', 9, '政党,怪物,政治'],
  ['政治', '043', 15, '民主,独裁,政党'],
  ['政治', '044', 4, '政府,人民,台湾'],
  ['政治', '044', 6, '政治挂帅,共产党,国民党'],
  ['方法', '044', 16, '真假,人生,方法'],
  ['知识', '044', 24, '学人,报人,学报'],
  ['政治', '044', 26, '自由学者,民运,政治'],
  ['人格', '045', 17, '认真,真理,人格'],
  ['政治', '045', 23, '当权者,政治'],
  ['人格', '045', 25, '性情中人,读书,人格'],
  ['文化', '046', 9, '台湾,国民党,文化', '这个岛上的水准'],
  ['知识', '046', 13, '历史,杂志,知识'],
  ['文化', '046', 27, '师生关系,师势,文化'],
  ['知识', '046', 30, '徐复观,熊十力,知识'],
  ['人格', '046', 34, '百世师,人格'],
  ['方法', '046', 40, '平等,方法'],
  ['人格', '046', 44, '小人,边缘点,人格'],
  ['人格', '046', 46, '远小人,距离,人格'],
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

function sourceFileByKey(key) {
  const files = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
  const file = /^\d+$/.test(key)
    ? files.find((name) => name.startsWith(`${key}.`))
    : files.find((name) => name.includes(key));
  if (!file) {
    throw new Error(`Missing source file key: ${key}`);
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

function sourceTitle(sourceParagraphs, sourceParagraph, titleOverride) {
  if (titleOverride) return titleOverride;
  for (let index = sourceParagraph - 2; index >= 0; index -= 1) {
    const match = sourceParagraphs[index]?.match(/^\d{3}\.(.+)$/);
    if (match) return normalize(match[1]);
  }
  throw new Error(`Missing source title before paragraph ${sourceParagraph}`);
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
    '- 分类策略：沿用 8 个原子分类；本书为短语录集合，标题优先沿用原语录题名，分类按语录主旨归入政治、人格、方法、写作、知识、文化、法权、情爱。',
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
    '- 收入：政治批判、人格判断、方法论、写作观、知识批评、文化观察、法权判断和少量情爱判断。',
    '- 暂不收入：目录、制作组署名、纯题目段、纯押题机智、纯性笑话、缺少独立思想承载力的短句，以及与既有总表高度重复的材料。',
    '- 本书原文多为短语录；提取轮先保留能单独检索和归类的语录，校对轮可继续压缩政治讽刺和人格箴言中较弱的条目。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 后续校对重点',
    '',
    '- 检查政治讽刺类是否仍偏密，尤其国民党、民进党、三民主义相关条目。',
    '- 检查人格箴言类是否应合并相近判断，例如小人、敌人、报仇、真理等线索。',
    '- 检查情爱条目是否只是性笑话，校对轮可继续删弱留强。',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const paragraphCache = new Map();
const records = entries.map(([category, sourceKey, sourceParagraph, keywords, titleOverride], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const sourceFile = sourceFileByKey(sourceKey);
  const sourceFilePath = path.join(sourceDir, sourceFile);
  if (!paragraphCache.has(sourceFilePath)) {
    paragraphCache.set(sourceFilePath, paragraphs(sourceFilePath));
  }

  const sourceParagraphs = paragraphCache.get(sourceFilePath);
  const description = sourceParagraphs[sourceParagraph - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${sourceParagraph}: ${sourceFile}`);
  }

  return {
    id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title: sourceTitle(sourceParagraphs, sourceParagraph, titleOverride),
    description,
    source_file: sourceFile,
    source_paragraph: sourceParagraph,
    source_path: path.relative(rootDir, sourceFilePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

fs.mkdirSync(outputDir, { recursive: true });

const payload = {
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
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
