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
  .find((name) => name.startsWith('010.'));
const sourceDir = path.join(rootDir, sourceRoot, diaryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '052.李敖随写录后集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '052',
  title: '李敖随写录后集',
  slug: 'leeao-suixielu-houji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖随写录后集》一百五十八则随写中提取思想索引。description 保留源文本原段落；目录、群制作者尾注、纯新闻长引、外部资料堆列、日常流水和缺少李敖判断的段落不进入本轮。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['方法', '001', 2, '创造主动', '邓维桢,求新求变,掌握主动'],
  ['人格', '003', 2, '出版信任', '沈登恩,出版,信任'],
  ['政治', '004', 27, '李郝二分', '乡土文学,李郝二分法,蒋家奴才'],
  ['文化', '005', 5, '读书破产', '读书风气,怪力乱神,严肃书籍'],
  ['知识', '007', 3, '学术中立', '李远哲,学术中立,知识分子'],
  ['法权', '008', 11, '死囚器官', '死刑,器官捐赠,程序'],
  ['文化', '009', 3, '选举风水', '选举,风水,民主文化'],
  ['政治', '010', 4, '刺蒋误区', '郑自才,党外,台湾共和国'],
  ['文化', '013', 3, '唐诗发疯', '唐诗运动,中国文化,文化批评'],
  ['人格', '015', 2, '真理优先', '真理,台湾人,原则'],
  ['知识', '019', 3, '学府腐烂', '大学,教授,学术标准'],
  ['政治', '022', 3, '总统制牌', '民进党,总统制,政治策略'],
  ['人格', '024', 12, '服役不值', '杨西崑,政权服务,人生价值'],
  ['法权', '027', 5, '弹劾口号', '陈汉珍,监察院,弹劾'],
  ['政治', '030', 3, '黑金不拒', '老国代,黑金,政治伦理'],
  ['法权', '031', 8, '合法之谎', '老国代,合法性,宪政'],
  ['法权', '031', 9, '恶法人权', '老国代,人权恶法,禁书'],
  ['政治', '036', 14, '西藏强制', '西藏,神权,共产党'],
  ['文化', '037', 4, '名词滥用', '国民党,名词,历史判断'],
  ['写作', '038', 3, '六十计划', '写作计划,六十岁,自我规划'],
  ['写作', '038', 6, '写作字数', '写作,字数,著作计划'],
  ['人格', '040', 12, '辞职无耻', '林洋港,辞职,人格批评'],
  ['法权', '042', 2, '法官糊涂', '少年法庭,法官,违法裁定'],
  ['政治', '043', 2, '正学鬼话', '李登辉,正学,政治语言'],
  ['政治', '044', 9, '黑金共相', '立委,黑金,政党'],
  ['政治', '045', 3, '增额无耻', '增额立委,政治无耻,薪水'],
  ['知识', '046', 3, '烈士改造', '国民党,烈士,历史改造'],
  ['文化', '050', 2, '洋名包装', '中国商品,外国名字,文化心理'],
  ['知识', '051', 4, '经国返台', '蒋经国,历史事实,杨西崑'],
  ['政治', '053', 2, '同胞外化', '民进党,大陆人民,外国人'],
  ['政治', '054', 3, '青年变质', '蒋经国,李焕,青年气质'],
  ['知识', '055', 2, '知识怯懦', '知识分子,教授,言论道路'],
  ['人格', '056', 3, '坟头奴相', '国民党,蒋家,人格'],
  ['文化', '057', 3, '汉奸画家', '刘海粟,台湾无知,文化崇拜'],
  ['人格', '058', 2, '赞蒋无耻', '林洋港,蒋介石,群众'],
  ['法权', '061', 9, '法官误案', '刘世源,法官,司法水平'],
  ['法权', '062', 14, '自诉人权', '许阿桂,自诉制度,检察官'],
  ['法权', '063', 3, '执法修法', '检察官,诉讼技巧,执法'],
  ['法权', '063', 4, '英雄倒置', '许阿桂,司法英雄,正义'],
  ['人格', '066', 2, '牧师慈善', '基督教,饥荒,人格批评'],
  ['写作', '067', 2, '敢写咒骂', '写作,咒骂,胆识'],
  ['法权', '074', 3, '病院整人', '精神病院,荣民,关押'],
  ['政治', '077', 2, '安保失信', '林洋港,治安,国民党'],
  ['知识', '079', 2, '日记遭删', '胡适,日记,知识审查'],
  ['方法', '080', 2, '包公选择', '包公,道德冲突,选择'],
  ['政治', '081', 16, '反暴成暴', '民进党,派系,暴力'],
  ['知识', '082', 7, '骂人学问', '章太炎,骂人,学问'],
  ['知识', '082', 8, '标点见识', '章太炎,标点,史书'],
  ['知识', '087', 2, '学术尸位', '近史所,袁世凯,学术进步'],
  ['知识', '087', 3, '抄袭研究', '刘凤翰,抄袭,学术伦理'],
  ['方法', '094', 2, '研究诱因', '查资料,研究,写作诱因'],
  ['方法', '098', 2, '揭发限定', '傅正,王晓波,揭发策略'],
  ['政治', '099', 2, '祈祷奴才', '国民党,美国,祈祷早餐'],
  ['人格', '101', 2, '勤学自课', '陈正诚,语言,资治通鉴'],
  ['文化', '103', 9, '文物失守', '文化保存,古迹,地方政府'],
  ['政治', '104', 2, '台独独立', '台湾独立,李敖,政治身份'],
  ['知识', '106', 2, '读书胜影', '读书,录像带,知识效率'],
  ['知识', '107', 2, '成语无知', '蔡万霖,金玉满堂,经典'],
  ['政治', '108', 20, '傅正真面', '傅正,自由中国,历史真相'],
  ['方法', '113', 2, '死角自知', '自知,知识死角,方法'],
  ['人格', '115', 2, '老年失落', '老年,失落,人生感受'],
  ['政治', '118', 3, '人才无识', '史星中,政治人才,台湾社会'],
  ['法权', '119', 15, '囚工标准', '美国,囚犯劳动,人权标准'],
  ['政治', '119', 18, '美国沉默', '美国,媒体,政治人物'],
  ['文化', '120', 3, '将军迷僧', '警备总司令,佛教,迷信'],
  ['人格', '121', 3, '称赞限度', '叶菊兰,批评,忠言'],
  ['人格', '123', 2, '耻列文人', '高阳,柏杨,国民党文人'],
  ['人格', '124', 2, '不请为荣', '李登辉,艺文界,自我定位'],
  ['文化', '125', 3, '市侩迷信', '辜濂松,还愿,台湾市侩'],
  ['法权', '126', 2, '伪人权会', '中国人权协会,国民党,人权'],
  ['人格', '128', 2, '新闻耗时', '胡基峻,新闻业,时间'],
  ['写作', '129', 2, '小说性灵', '小说,性灵,写作主力'],
  ['写作', '129', 3, '思想笨功', '思想史,学术,笨功夫'],
  ['政治', '131', 15, '雷震扭曲', '雷震,傅正,民进党'],
  ['知识', '133', 13, '异说存证', '张灵甫,国民党宣传,史料'],
  ['政治', '134', 2, '选票做手', '国民党,做票,选举'],
  ['文化', '136', 2, '书店之死', '开明书店,书店,文化衰败'],
  ['方法', '137', 2, '程序回归', '金兰大厦,统一,程序'],
  ['政治', '139', 2, '本土纠偏', '台大,二二八,本土思想'],
  ['法权', '140', 2, '人权三标', '美国,人权,国际法庭'],
  ['法权', '141', 2, '档案双标', '二二八,总统府档案,法定手续'],
  ['方法', '142', 2, '夜读分类', '夜读,分类,读书方法'],
  ['知识', '143', 2, '陈仪公道', '陈仪,二二八,历史论断'],
  ['人格', '144', 2, '笔杆一致', '胡适,批评文章,一致性'],
  ['政治', '145', 2, '救国妇女', '爱国者,战争,妇女'],
  ['知识', '146', 3, '主委误读', '郭为藩,孟子,文化水准'],
  ['人格', '147', 3, '被用之险', '彭明敏,民主发展,被利用'],
  ['政治', '148', 3, '贿选坦白', '国民党,贿选,政治风气'],
  ['写作', '149', 2, '小说标准', '北京法源寺,小说,文学家'],
  ['政治', '151', 2, '台湾资历', '台湾人,年龄,身份'],
  ['法权', '152', 8, '阴影条件', '戒严遗毒,政治案件,平反'],
  ['政治', '156', 12, '回避因果', '二二八,国民党,台独'],
  ['知识', '156', 13, '悲情视野', '二二八,台湾知识分子,见识'],
  ['方法', '158', 11, '借力脱俗', '俗务,文字,摆脱'],
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

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
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

  for (const record of payload.records) {
    lines.push(
      `## ${record.id} ${record.title}`,
      '',
      `- 分类：${record.category}`,
      `- 来源：${record.source_file} / P${record.source_paragraph}`,
      `- 关键词：${record.keywords}`,
      '',
      record.description,
      '',
    );
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT052-')) continue;
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
  id: `LAT052-${String(index + 1).padStart(3, '0')}`,
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
      '沿用 8 个原子分类，不新增临时类别。',
      '本书优先收录李敖自己落下判断的段落：写作取舍、知识辨误、人格尺度、文化批评、台湾政治、司法法权、行动方法。',
      '纯剪报资料、外部长篇引文、日常流水、人名往来、资料清单、群制作者尾注和缺少李敖判断的段落不收。',
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
  '# 《李敖随写录后集》思想索引提取说明',
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
  '本轮覆盖《李敖随写录后集》一百五十八则随写。提取重点不是逐则收录，而是保留能独立呈现思想判断的源文段落：写作主力和创作方法、知识考证与读书风气、人格尺度、文化迷信与艺术批评、台湾政治、司法法权、行动方法等。',
  '',
  '由于本书大量条目采用剪报、来信、资料留存后附短评的形式，提取时优先保留李敖短评本身足以成为索引的段落；纯新闻长引、外部访谈资料、个人往来流水、单纯资料保存、过短机锋、群制作者尾注，以及没有李敖明确判断的段落不收。少数外部材料若同段包含李敖的判断，暂留供校对轮继续压缩。',
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
