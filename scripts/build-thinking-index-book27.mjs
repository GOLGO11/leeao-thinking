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
  .find((name) => name.startsWith('012.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '027.李敖新刊');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '027',
  title: '李敖新刊',
  slug: 'leeao-xinkan',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖新刊》的总序、正文和李敖自撰附录中提取可独立检索的思想段落，重点覆盖出版自由、禁书与自印、遗教与三民主义、宪法党限、旧文化运动、司法与报阀、戒严与政治犯、文星旧案、法律解释和知识分子勇气等主题；胡适、龚德柏、殷海光等非李敖原文附录只在李敖导语或李敖自撰文字中取材。',
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
  ['写作', '有书未必能印', '总序', 3, '书籍,印刷,出版,写作'],
  ['法权', '掌权就干涉印书', '总序', 4, '国民党,禁书,出版自由,法权'],
  ['法权', '禁书纪录暴露钳制', '总序', 5, '禁书,言论自由,国民党,法权'],
  ['写作', '有书自己印', '总序', 6, '李敖出版社,自印,出版,写作'],
  ['写作', '新刊弥补报纸禁例', '总序', 7, '李敖新刊,专栏,禁例,写作'],
  ['知识', '政治也是专业', '001', 6, '政治专业,明星政治,知识'],
  ['政治', '明星政治只是锋头', '001', 7, '明星政治,政治秀,专业,政治'],
  ['政治', '锋头主义不是政治家', '001', 8, '政治明星,政治家,锋头主义,政治'],
  ['文化', '养女恶俗由结构变形', '002', 3, '养女,童养媳,台湾,文化'],
  ['政治', '殖民政策加重淫业', '002', 4, '日本殖民,淫业,养女,政治'],
  ['文化', '娼妓政策使养女成妓源', '002', 6, '妓女传统,养女,台湾,文化'],
  ['方法', '质询考验党外斤两', '003', 5, '质询,行政院,党外,方法'],
  ['法权', '行政拒答暴露权力气派', '003', 6, '行政院,拒答,质询,法权'],
  ['法权', '民法拆穿退租谎话', '003', 9, '民法,租赁,行政院,法权'],
  ['政治', '房事也动不了国民党', '003', 10, '民进党,国民党,房事,政治'],
  ['知识', '读遗教会发现两难', '004', 3, '遗教,三民主义,共产主义,知识'],
  ['方法', '四法处理遗教矛盾', '004', 4, '遗教,解释方法,王麻子,方法'],
  ['政治', '视而不见式反共', '004', 5, '国民党,反共,三民主义,政治'],
  ['政治', '遗教挂羊头卖狗肉', '005', 2, '遗教,国民党,挂羊头,政治'],
  ['方法', '弹性处理不能调包', '005', 3, '遗教,弹性处理,欺骗,方法'],
  ['法权', '宪法外壳抵触遗教', '005', 4, '宪法,遗教,国民大会,法权'],
  ['方法', '不可救药者不能陈情', '006', 4, '陈情,统治者,反抗,方法'],
  ['文化', '五四精神不是客气请愿', '006', 5, '五四,大学生,请愿,文化'],
  ['人格', '学生反抗要有气魄', '006', 6, '大学生,气魄,清华,人格'],
  ['法权', '迟来弹劾没有效果', '007', 5, '监察院,弹劾,法官,法权'],
  ['法权', '司法腐败也分层次', '007', 7, '法官,贪污,司法,法权'],
  ['人格', '明知冤案却缺勇气', '007', 8, '冤案,法官,勇气,人格'],
  ['政治', '主义与国策各行一制', '008', 2, '民生主义,共产主义,国策,政治'],
  ['法权', '土地遗教无法照行', '008', 4, '平均地权,土地法,遗教,法权'],
  ['知识', '投资不可混作投机', '008', 5, '土地投资,投机,经济定律,知识'],
  ['方法', '主义要经事实验证', '009', 3, '三民主义,事实验证,客观条件,方法'],
  ['政治', '三民主义埋下制度祸根', '009', 4, '三民主义,宪法,五院,政治'],
  ['政治', '成就在于不实行主义', '009', 5, '三民主义,口头禅,国民党,政治'],
  ['法权', '报阀享有司法保护', '010', 2, '报阀,司法,广告自由,法权'],
  ['法权', '广告责任不能推给空气', '010', 3, '广告,诽谤,发行人,法权'],
  ['方法', '借对造律师发言', '010', 4, '诉讼,证据,律师,方法'],
  ['法权', '同院异判只因怕报阀', '010', 6, '法院,报阀,同案异判,法权'],
  ['政治', '三民主义变成口头禅', '011', 3, '三民主义,口头禅,国民党,政治'],
  ['政治', '永不实行也永不放弃', '011', 4, '三民主义,大骗子,国民党,政治'],
  ['知识', '双十本可反家天下', '012', 5, '双十节,云南起义,家天下,知识'],
  ['政治', '国民党否决孙中山国庆构想', '012', 6, '双十节,遗教,国民党,政治'],
  ['方法', '事实拆穿版权案叙事', '013', 4, '冯作民,版权,事实,方法'],
  ['法权', '第三者不该替契约还债', '013', 6, '契约,债务,第三者,法权'],
  ['人格', '偏执狂总归咎他人', '013', 7, '偏执狂,归咎,冯作民,人格'],
  ['法权', '异常契约暴露蹊跷', '014', 3, '契约,版权,稿费,法权'],
  ['方法', '密件出土才见圈套', '014', 5, '密件,证据,圈套,方法'],
  ['方法', '秘件帮助认识真相', '014', 6, '密件,真相,冯作民,方法'],
  ['政治', '政治欢迎只是利用假象', '016', 3, '谢聪敏,民进党,欢迎,政治'],
  ['政治', '台独与情治双杀李敖', '016', 5, '台独,情治,冤狱,政治'],
  ['人格', '革命组织要回顾被牺牲者', '016', 6, '革命组织,牺牲者,李敖,人格'],
  ['政治', '连环套利用自由作家', '017', 2, '谢聪敏,冤狱,连环套,政治'],
  ['方法', '咬人分活咬死咬', '017', 5, '咬人,移花接木,冤狱,方法'],
  ['政治', '政治无情无义', '017', 6, '政治,国民党,台独,政治'],
  ['法权', '冤枉一旦成案难更正', '018', 3, '冤狱,更正,情治,法权'],
  ['政治', '将错就错符合台独利益', '018', 4, '国民党,台独,冤狱,政治'],
  ['法权', '判刑变成唯一叛徒', '018', 5, '军法,叛徒,冤狱,法权'],
  ['知识', '政治人唐突学术', '019', 2, '国民党,学术,政治,知识'],
  ['知识', '孙文学说不成学说', '019', 4, '孙文学说,知难行易,知识'],
  ['政治', '革命背离救民初心', '019', 5, '孙中山,革命,三民主义,政治'],
  ['知识', '孙中山真意不以南京为首都', '020', 4, '孙中山,南京,首都,知识'],
  ['政治', '台北首都说仰赖假造', '020', 5, '台北,首都,国民党,政治'],
  ['文化', '官修文化可以武化其中', '021', 2, '胡适,新文化,官修,文化'],
  ['文化', '旧文人与新军阀合造文化政策', '021', 3, '国民党,文化政策,旧文人,文化'],
  ['文化', '台湾叠成边缘避难文化', '021', 4, '台湾,边缘文化,避难区,文化'],
  ['文化', '国民党只有旧文化运动', '021', 5, '中国文化复兴,旧文化,台湾,文化'],
  ['知识', '民生主义即共产主义', '022', 5, '民生主义,共产主义,孙中山,知识'],
  ['方法', '党史删话掩盖矛盾', '022', 8, '党史,删改,孙中山,方法'],
  ['政治', '三民主义像变形虫', '022', 9, '三民主义,变形虫,政治'],
  ['文化', '知识分子被强迫签名', '023', 18, '知识分子,公开信,国防部总政治部,文化'],
  ['政治', '文武合一整垮文星', '023', 19, '文星,政工,国防部总政治部,政治'],
  ['政治', '低水平政工招朋引类', '023', 20, '王昇,政工,文化水平,政治'],
  ['方法', '文证揭开隐蔽迫害', '023', 21, '殷海光,文星,文证,方法'],
  ['写作', '刊出信史保存儒林内史', '023', 22, '殷海光,信史,文献,写作'],
  ['人格', '人可分先知与做秀者', '024', 4, '曲突徙薪,先知,做秀,人格'],
  ['人格', '先知常被忽略', '024', 5, '曲突徙薪,介之推,忘恩,人格'],
  ['人格', '做前一类人要忍忘恩', '024', 7, '曲突徙薪,忘恩负义,人格'],
  ['法权', '解严以后越解越严', '025', 2, '解严,文字狱,违警罚法,法权'],
  ['政治', '国民党把戒严当护身符', '025', 3, '戒严法,国民党,政治'],
  ['政治', '解严使国民党自打脸', '025', 4, '解严,国民党,政治'],
  ['法权', '后戒严有三种手法', '025', 5, '解严,国家安全法,恶法,法权'],
  ['法权', '死后见证使代笔遗嘱无效', '026', 22, '代笔遗嘱,民法,见证人,法权'],
  ['法权', '补签见证涉嫌伪造', '026', 23, '伪造文书,遗嘱,告发,法权'],
  ['法权', '死后补签荒唐不通', '026', 28, '蒋介石,遗嘱,见证,法权'],
  ['方法', '遗嘱疑团逼出伪造解释', '026', 29, '遗嘱,疑团,方法'],
  ['法权', '司法院长扶同为恶更可恶', '026', 30, '司法院,伪造文书,法纪,法权'],
  ['法权', '广狭遗嘱说不能成立', '026', 42, '遗嘱,检察官,民法,法权'],
  ['法权', '强制程序防止代笔伪造', '026', 44, '代笔遗嘱,强制规定,伪造,法权'],
  ['文化', '假三毛逃避真苦难', '027', 3, '三毛,苦难,逃避现实,文化'],
  ['文化', '真三毛是社会控诉', '027', 4, '三毛,难童,张乐平,文化'],
  ['写作', '辑刊旧作留历史文征', '027', 5, '三毛三部作,历史文征,写作'],
  ['法权', '生病退学不该赔偿', '028', 25, '军校,退学,诚信原则,法权'],
  ['政治', '军中教育也有照顾责任', '028', 28, '军事教育,军校,责任,政治'],
  ['人格', '老兵哀呼要求反省', '028', 30, '老兵,国民党,反省,人格'],
  ['法权', '知犯罪嫌疑应告发', '029', 3, '公务员,告发义务,朱高正,法权'],
  ['法权', '院长不能托言不知', '029', 6, '立法院,院长,告发义务,法权'],
  ['政治', '忠诚反对者受到保护', '029', 7, '朱高正,国民党,忠诚反对者,政治'],
  ['人格', '超脱是非会变无是非', '029', 8, '倪文亚,是非,人格'],
  ['法权', '禁止持有书刊没有依据', '030', 4, '禁书,持有,出版法,法权'],
  ['方法', '法条解释要看上下文', '030', 18, '法律解释,文法,上下文,方法'],
  ['法权', '法令解释不能乱援引', '030', 22, '法律解释,国防部总政治部,法权'],
  ['法权', '法令不适用则搜索违法', '030', 30, '搜索,扣押,国家赔偿,法权'],
  ['法权', '证据法则重初次证词', '030', 34, '证据法则,证词,法权'],
  ['写作', '上诉状可成自由文献', '030', 38, '上诉状,自由,文献,写作'],
  ['人格', '办报树敌也要敢言', '033', 3, '龚德柏,报人,言论自由,人格'],
  ['写作', '秘录要替作者流传', '033', 4, '龚德柏,秘录,出版,写作'],
  ['人格', '不要命才有言论自由', '033', 5, '言论自由,勇敢,龚德柏,人格'],
  ['法权', '国法党限文章触及要害', '037', 2, '国法党限,文星,宪法,法权'],
  ['人格', '文禁下敢捋虎须', '037', 4, '文禁,文网,勇气,人格'],
  ['写作', '文征保存言论自由史', '037', 5, '文星,文征,言论自由史,写作'],
  ['法权', '还政可以慢不能倒退', '037', 12, '还政,宪法,司法,军队'],
  ['政治', '党务人员不研究法令', '037', 20, '党务,法令,国民党,政治'],
  ['文化', '舆论懦弱惯坏箝制者', '037', 23, '舆论界,新闻自由,箝制,文化'],
  ['文化', '文星象征纯文化力量', '037', 52, '文星,文化力量,政治,文化'],
  ['方法', '渐进改革不走绝路', '037', 53, '渐进改革,逼反,方法'],
  ['法权', '政治犯不同于刑事犯', '038', 2, '政治犯,刑事犯,法权'],
  ['政治', '否认政治犯是台湾邪门', '038', 3, '政治犯,国民党,台湾,政治'],
  ['法权', '不删选罢法就是出卖政治犯', '038', 4, '政治犯,选罢法,参政权,法权'],
  ['政治', '政治犯复出会压过投机者', '038', 5, '政治犯,民进党,参政权,政治'],
];

const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith('.txt'))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }));
const sourceCache = new Map();

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function resolveSourceFile(sourceKey) {
  if (sourceKey === '总序') {
    const preface = sourceFiles.find((name) => name.includes('总序'));
    if (preface) return preface;
  }

  const file = sourceFiles.find((name) => name.startsWith(`${sourceKey}.`));
  if (!file) {
    throw new Error(`Missing source file for key: ${sourceKey}`);
  }
  return file;
}

function readSource(sourceFile) {
  if (!sourceCache.has(sourceFile)) {
    sourceCache.set(sourceFile, decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile))));
  }
  return sourceCache.get(sourceFile);
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 说明：标题为索引用浓缩标题；description 保留源文本原文段落。',
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

function writeNote(filePath, records) {
  const categoryLines = taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0)
    .map((item) => `- ${item.category}：${item.count}`);

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    `- 源目录：${book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本轮只收可独立检索的思想判断、方法判断、制度判断、文化判断和法律论证段，不按篇目平均分配。',
    '- 目录、资源推广文字、纯叙事段子和非李敖正文附录不单独收录。',
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
if (records.length !== 118) {
  throw new Error(`Expected 118 records, got ${records.length}`);
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
