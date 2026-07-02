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
  .find((name) => name.startsWith('010.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '025.你笨蛋，你笨蛋');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '025',
  title: '你笨蛋，你笨蛋',
  slug: 'ni-bendan-ni-bendan',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《你笨蛋，你笨蛋》40篇正文中提取可独立检索的思想段落，重点收写作与禁书、胡适与思想传播、军购与美国霸权、人权宣传、学术问责、教育病理、台湾蓝绿政治、第一流知识分子、语言文法和联语训练等主题；目录、外部附录、资源推广文字、纯例证清单和重复修辞未机械收录。',
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
  ['政治', '台湾假民主困住人才', '001', 3, '台湾,民主,民粹,人才'],
  ['人格', '人才应面向大中国', '001', 4, '人才,大陆,中国,格局'],
  ['人格', '强者不止哭泣', '002', 2, '伤痕文学,强者,哭泣,未来'],
  ['人格', '离乡伤痕更重', '002', 4, '准伤痕文学,故国,知识分子,离乡'],
  ['法权', '文字检查转向事后惩罚', '003', 3, '文字检查,禁书,查禁,国民党'],
  ['法权', '未完小说也能被禁', '003', 8, '禁书,未完小说,查禁,国民党'],
  ['写作', '色情判断看反思净化', '003', 14, '色情,文学判断,反思,净化'],
  ['写作', '强文学由思想领队', '003', 18, '强文学,思想,小说,写作'],
  ['方法', '借题发挥是积极方法', '005', 6, '借题发挥,方法,胡适,陈文茜'],
  ['知识', '胡适是现代启蒙人物', '006', 4, '胡适,启蒙,现代,知识'],
  ['人格', '压迫下署名不是要事', '006', 7, '署名,压迫,胡适语粹,责任'],
  ['方法', '论人不可脱离时序', '006', 10, '时序,考证,论人,方法'],
  ['人格', '看立身本末不听传闻', '006', 13, '立身本末,传闻,胡适,人格'],
  ['写作', '选集保存散佚思想', '007', 8, '选集,胡适,散篇,思想传播'],
  ['人格', '最好纪念是传思想', '007', 9, '纪念,胡适,思想传播,报恩'],
  ['文化', '不自修者畏人修', '007', 14, '胡适选集,文化机构,自修,阻挠'],
  ['文化', '传播思想重于谁得利', '007', 24, '思想传播,胡适,得利,文化'],
  ['人格', '思想传承终归公道', '007', 38, '胡适,思想传承,公道,政治斗争'],
  ['法权', '美国无保台采购义务', '009', 9, '美国,台湾,军购,义务'],
  ['法权', '提供不等于购买', '009', 11, '台湾关系法,提供,购买,军购'],
  ['政治', '军备竞赛消耗台湾', '009', 12, '军备竞赛,台湾,军购,民生'],
  ['政治', '无军队也可有安全', '009', 14, '安全,军队,台湾,哥斯达黎加'],
  ['政治', '军费应投向民生', '009', 15, '军费,民生,内政,台湾'],
  ['政治', '台湾有三重危机', '009', 17, '自欺,媚美,反共,危机'],
  ['人格', '正义需要资源支撑', '010', 7, '正义,钱,仗义输财,资源'],
  ['法权', '诉讼可追求高目标', '010', 13, '诉讼,正义,权利,目标'],
  ['法权', '法律程序可作象征', '010', 18, '法律程序,象征,布什,诉讼'],
  ['方法', '小事认真才有大事', '010', 21, '小事,大事,认真,方法'],
  ['政治', '选举是政党竞争', '011', 6, '选举,政党,独立候选人,政治'],
  ['人格', '战斗者没有退休', '011', 20, '战斗,退休,死亡,人格'],
  ['政治', '小岛政治浪费英雄', '012', 3, '小岛政治,英雄,台湾,议坛'],
  ['写作', '闲聊体更接近真相', '012', 6, '自传,闲聊,真实,写作'],
  ['人格', '忘我才能放下私情', '013', 6, '忘我,情歌,监狱,人格'],
  ['文化', '囚中歌曲换来新闻', '013', 20, '歌曲,监狱,新闻,文化'],
  ['知识', '青年也能知道一切', '014', 6, '朱仑现象,少年,知识,小说'],
  ['写作', '小说可兼真实与谜', '014', 13, '小说,真实,谜,十七岁'],
  ['文化', '成就挡不住成分', '015', 4, '艺术,成分,马偕,黄达夫'],
  ['知识', '价值不是价格', '015', 9, '价值,价格,艺术,王尔德'],
  ['人格', '钱可以价值化', '015', 16, '钱,价值化,捐赠,慰安妇'],
  ['人格', '第一念接近至善', '015', 17, '第一念,至善,捐赠,人格'],
  ['文化', '丑角能说讽刺真话', '017', 2, '丑角,讽刺,真话,戏剧'],
  ['知识', '共产主义需要物质基础', '018', 8, '共产主义,物质基础,马克思,经济'],
  ['政治', '市场经济不是根本矛盾', '018', 16, '市场经济,社会主义,资本主义,改革'],
  ['政治', '资本方法伴随副作用', '018', 18, '资本主义,方法,副作用,改革'],
  ['政治', '美国模式需要八个地球', '018', 19, '美国模式,地球,资本主义,中国'],
  ['政治', '新帝国主义靠巧取', '018', 21, '新帝国主义,美元,宣传,美国'],
  ['方法', '改革要分阶段过河', '018', 23, '改革,过河,阶段,方法'],
  ['政治', '拜美会让中国出问题', '018', 30, '拜美,中国,美国,趋势'],
  ['法权', '土法炼钢传播言论自由', '018', 39, '言论自由,禁书,土法炼钢,出版'],
  ['写作', '全集要趁生命完成', '019', 3, '大全集,写作,八十岁,生命'],
  ['政治', '综合国力会改变态势', '020', 4, '综合国力,大陆,台湾,邓小平'],
  ['文化', '禁书地下流不断', '020', 8, '禁书,地下出版,文星,文化'],
  ['政治', '开放批评显示自信', '020', 11, '批评,大陆,自信,开放'],
  ['法权', '出版自由不能落后', '020', 12, '出版自由,大陆,言论,李敖大全集'],
  ['政治', '回应美国人权战不能被动', '021', 3, '美国人权纪录,中国,回应,被动'],
  ['方法', '人权战要开辟新战场', '021', 4, '人权战,美国,达赖,方法'],
  ['方法', '宣传要你来我往', '021', 5, '宣传,软实力,美国,你来我往'],
  ['政治', '中国应有反击话语权', '021', 6, '中国,话语权,人权,反击'],
  ['人格', '作家不做打手', '022', 10, '作家,打手,罗宾汉,人格'],
  ['法权', '指控说谎必须举证', '022', 17, '诽谤,证据,说谎,法权'],
  ['方法', '偷书叙事要合常识', '022', 20, '偷书,常识,证据,方法'],
  ['法权', '模糊暗示伤害名誉', '022', 36, '名誉,暗示,学历,法权'],
  ['法权', '版权事实应依法确认', '022', 49, '版权,文星,法院,法律事实'],
  ['法权', '台湾关系法是霸权法律', '023', 31, '台湾关系法,美国,霸权,国内法'],
  ['方法', '己所不欲可用于国家', '023', 33, '己所不欲,国家,方法,美国'],
  ['政治', '夏威夷关系法反证霸权', '023', 35, '夏威夷关系法,霸权,美国,反证'],
  ['写作', '禁书可伪装流通', '024', 3, '禁书,黄书,流通,写作'],
  ['方法', '政治冲突也有赛局', '024', 4, '赛局,冲突,虚张声势,方法'],
  ['知识', '科学不能控制政治用途', '024', 5, '科学,政治用途,博弈论,知识'],
  ['人格', '小人物也能抵抗', '025', 7, '抵抗,小人物,强权,人格'],
  ['政治', '压迫会逼出极端报复', '025', 8, '压迫,报复,政治,暴力'],
  ['知识', '运动纪录表演要区分', '026', 2, '运动,纪录,表演,知识'],
  ['文化', '体育作秀很浅薄', '026', 6, '体育,作秀,纪录,文化'],
  ['人格', '信念行动也靠机遇', '027', 2, '共产主义,布朗基,运气,信念'],
  ['知识', '学术工程不能长期待定', '028', 14, '学术,上古史,中研院,问责'],
  ['法权', '学术弊案需要追问', '028', 22, '中研院,弊案,问责,法权'],
  ['写作', '书写材料也会衰败', '029', 5, '帝王蓝,书写,材料,衰败'],
  ['写作', '老年写作可以放任', '030', 3, '老年写作,导读,自由,写作'],
  ['知识', '制式教育折损天才', '030', 16, '制式教育,天才,退学,知识'],
  ['文化', '知识分子常过不了三关', '030', 17, '知识分子,中西,新旧,文化'],
  ['人格', '牺牲感会塑造人格', '030', 41, '人格,牺牲,左派,严侨'],
  ['方法', '转念也能带来得救', '030', 43, '转念,救赎,十七岁,方法'],
  ['文化', '教改积弊加深学生痛苦', '030', 68, '教改,学生,教材,台湾'],
  ['政治', '本土化是骗人题目', '030', 72, '本土化,台湾,教育,政治'],
  ['政治', '台湾政权长期自欺', '030', 81, '台湾,中华民国,自欺,国民党'],
  ['政治', '台湾民主程序虚假', '030', 85, '台湾民主,议会,罢免,民进党'],
  ['政治', '蓝绿荒谬同源', '030', 103, '蓝绿,国民党,民进党,荒谬'],
  ['政治', '国民党已无理想', '030', 108, '国民党,理想,政治,腐败'],
  ['文化', '小岛政治缺世界视野', '030', 111, '小岛,世界视野,台湾,文化'],
  ['人格', '年轻抗议要有证据', '030', 124, '李戡,抗议,证据,人格'],
  ['政治', '离开小岛才有大视野', '030', 129, '台湾,小岛,视野,政治'],
  ['人格', '洗脑只会使人顽强', '031', 5, '洗脑,白色恐怖,顽强,人格'],
  ['人格', '友情可越过政治伤痕', '031', 10, '友情,背影,政治伤痕,人格'],
  ['政治', '台独需要公开验收', '031', 13, '台独,验收,政治,谢聪敏'],
  ['政治', '美国以强大与世为仇', '032', 5, '美国,强权,军费,世界'],
  ['政治', '美国用美元吃世界', '032', 7, '美国,美元,印钞机,世界'],
  ['方法', '柔性力量会淡化恶行', '032', 9, '柔性力量,美国,觉悟,方法'],
  ['人格', '知识分子陷地也要出头', '033', 4, '知识分子,祖国,人才,人格'],
  ['方法', '爱国要和而不同', '033', 5, '祖国,和而不同,知识分子,方法'],
  ['人格', '知识分子只有一流', '033', 6, '知识分子,第一流,人格,标准'],
  ['知识', '好头脑通向至善', '033', 12, '好头脑,至善,反讽,知识'],
  ['方法', '境界仍须务实', '033', 15, '世界公民,务实,方法,知识分子'],
  ['政治', '唱衰中国会殃及世界', '033', 20, '中国,唱衰,难民,世界'],
  ['人格', '勇于行仁兑现仁智', '033', 22, '勇于行仁,马寅初,勇气,人格'],
  ['方法', '评价革命不能只看负面', '033', 25, '革命,不公道,共产党,历史评价'],
  ['人格', '拼却声名替国家办事', '033', 27, '郭嵩焘,声名,国家,人格'],
  ['人格', '士大夫缺大无畏精神', '033', 28, '士大夫,独立,大无畏,林则徐'],
  ['人格', '先知总要继续向前', '033', 32, '知识分子,前进,易卜生,先知'],
  ['政治', '党是小圆国是大圆', '033', 33, '党国观念,国家,政党,同心圆'],
  ['人格', '至少做晨星', '033', 38, '晨星,知识分子,精神,人格'],
  ['政治', '文明说辞可回避抗争', '035', 4, '文明,抗争,龙应台,白色恐怖'],
  ['方法', '用证据证明对方错误', '035', 6, '证据,批判,龙应台,方法'],
  ['写作', '文学作品不必多诠释', '036', 2, '文学作品,诠释,志缘,写作'],
  ['知识', '日期也要准确换算', '036', 10, '日期,辛亥,换算,知识'],
  ['知识', '管制中仍可精读工具书', '037', 5, '白色恐怖,工具书,英文汉诂,知识'],
  ['写作', '札记体可以随缘抽样', '037', 6, '札记,抽样,英文汉诂,写作'],
  ['知识', '中文文法合乎逻辑', '037', 15, '中文文法,英文文法,逻辑,知识'],
  ['知识', '西化文法是庸人自扰', '037', 19, '中文西化,鲁迅,余光中,文法'],
  ['方法', '翻译要辨主格受格', '037', 25, '翻译,主格,受格,林肯'],
  ['写作', '具体意象表达抽象', '037', 44, '具体,抽象,表达,写作'],
  ['方法', '正名不是崇拜学名', '037', 48, '正名,学名,语言,方法'],
  ['知识', '对对子能测思想条理', '038', 2, '联语,对对子,思想条理,陈寅恪'],
  ['政治', '参选不是胜负考量', '039', 8, '参选,原则,政党,胜负'],
  ['政治', '抛弃蓝绿才有新思维', '039', 9, '蓝绿,新思维,台湾,选举'],
  ['政治', '少数党机器破坏团结', '040', 7, '泛蓝,国民党,团结,选举'],
  ['方法', '用选举纪录追责', '040', 17, '选举纪录,追责,国民党,方法'],
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
    `# 《${book.title}》思想索引（${book.round}）`,
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
    '- 本轮只收可独立检索的思想判断、方法判断、制度判断和历史解释段，不按篇目平均分配。',
    '- 目录、外部附录、资源推广文字、纯例证清单和重复修辞不单独收录。',
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
if (records.length !== 126) {
  throw new Error(`Expected 126 records, got ${records.length}`);
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
