import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceDir = path.join(
  rootDir,
  '《大李敖全集6.0》分章节',
  '001.自传回忆类',
  '001.李敖自传与回忆',
);
const outputDir = path.join(rootDir, 'outputs', '001.李敖自传与回忆');
const masterCsvPath = path.join(rootDir, 'outputs', '思想索引总表.csv');

const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '001',
  title: '李敖自传与回忆',
  slug: 'li-ao-zizhuan-yu-huiyi',
  round: '提取轮',
  status: '待校对',
};

const entries = [
  ['写作与自我方法', '反回忆录的写法', '《李敖自传与回忆》自序.txt', 4, '自传,历史,时代'],
  ['传统与性别', '礼教杀人', '001.李敖自传.txt', 11, '礼教,女性,旧家庭'],
  ['传统与性别', '无子之罪不在女性', '001.李敖自传.txt', 13, '女性,生理学,七出'],
  ['政府权力与个人自由', '籍贯自由的消失', '001.李敖自传.txt', 19, '籍贯,户政,政府权力'],
  ['知识分子与教育', '知识分子曾受尊敬', '001.李敖自传.txt', 29, '知识分子,教育,军阀'],
  ['历史观与政治记忆', '第三国战场与东北人口', '001.李敖自传.txt', 39, '东北,日俄战争,历史'],
  ['传统与性别', '丧礼次序中的男尊女卑', '001.李敖自传.txt', 57, '男尊女卑,传统,家庭'],
  ['历史观与政治记忆', '不抵抗的责任转嫁', '001.李敖自传.txt', 102, '九一八,张学良,国民党'],
  ['历史观与政治记忆', '抗日史的倒装', '001.李敖自传.txt', 108, '抗日,宣传,国民党'],
  ['政治权力与个人命运', '不坐牢就是奖励', '001.李敖自传.txt', 180, '抗日,党国,牢狱'],
  ['政治权力与个人命运', '党国外的爱国者', '001.李敖自传.txt', 182, '爱国,国民党,汉奸'],
  ['人格与交友', '古典朋友之道', '001.李敖自传.txt', 188, '朋友,旧道德,人格'],
  ['知识分子与教育', '教育者要小心孩子', '001.李敖自传.txt', 223, '教育,儿童,伤害'],
  ['政治权力与信用', '共存亡的把戏', '001.李敖自传.txt', 253, '国民党,信用,逃难'],
  ['政治经济批判', '金圆券掏空民间积蓄', '002.从上海到海上.txt', 13, '金圆券,财政,民心'],
  ['政治经济批判', '黄金安定台湾却丢大陆民心', '002.从上海到海上.txt', 17, '金圆券,新台币,民心'],
  ['法律与权力', '法律只看小人物', '002.从上海到海上.txt', 56, '法律,权势,银圆'],
  ['思想来源', '严复开启西方思想输入', '003.我最难忘的一位老师.txt', 7, '严复,西化,思想史'],
  ['思想来源', '天演论刺激少年中国', '003.我最难忘的一位老师.txt', 12, '天演论,思想,救亡'],
  ['人格与思想形成', '严侨作为人格导师', '003.我最难忘的一位老师.txt', 54, '严侨,人格,自由主义'],
  ['读书与自学', '自由自在自己读书', '003.我最难忘的一位老师.txt', 58, '台大,读书,自由'],
  ['人格与思想形成', '军队凝固思想与悍气', '003.我最难忘的一位老师.txt', 59, '军队,思想,悍气'],
  ['自由主义与思想来源', '胡适自由主义带来新境界', '003.我最难忘的一位老师.txt', 79, '胡适,自由主义,严侨'],
  ['人格与反抗', '在传统与群众前吾往矣', '003.我最难忘的一位老师.txt', 229, '传统,勇敢,丧礼'],
  ['思想方法', '要看胡适真面目', '003.我最难忘的一位老师.txt', 244, '胡适,辩诬,思想'],
  ['人格与反抗', '在权威和群众底下做一个人', '003.我最难忘的一位老师.txt', 245, '人,权威,不出卖'],
  ['思想方法', '不相信权威也不相信传统', '003.我最难忘的一位老师.txt', 247, '权威,传统,不妥协'],
  ['学问与经世', '不以终老学术为足', '005.“北土非吾愿，东林怀我师”.txt', 53, '学术,经世致用,人权'],
  ['知识分子与教育', '大学不该制造读死书的人', '005.“北土非吾愿，东林怀我师”.txt', 115, '大学,知识分子,独立判断'],
  ['人格与反抗', '独来独往独立为文', '005.“北土非吾愿，东林怀我师”.txt', 288, '独立,写作,批评'],
  ['政治权力与不合作', '不合作就斗倒', '005.“北土非吾愿，东林怀我师”.txt', 407, '不合作,国民党,文星'],
  ['文化传播与出版', '思想传播需要经济基础', '006.提升文星的一个回忆.txt', 3, '文化商人,思想传播,经济'],
  ['文化传播与出版', '提升文化商人', '006.提升文星的一个回忆.txt', 4, '文化商人,文化,商业'],
  ['文化传播与出版', '文星为中国思想趋向求答案', '006.提升文星的一个回忆.txt', 7, '文星,现代化,思想'],
  ['文化传播与出版', '不背弃文星理想', '006.提升文星的一个回忆.txt', 9, '文星,理想,战斗'],
  ['处世方法', '让警察被老百姓吃回来', '007.我最难忘的一个警察.txt', 19, '警察,反击,处世'],
  ['处世方法', '化不如意为有利', '007.我最难忘的一个警察.txt', 43, '处世,机变,自利'],
  ['迫害与自持', '面对迫害仍有幽默与自持', '008.最后的九日.txt', 3, '迫害,幽默,自持'],
  ['孤独与自我', '人群中的孤寂', '008.最后的九日.txt', 15, '孤寂,朋友,思想'],
  ['孤独与自我', '孤寂是自己面对斧钺', '008.最后的九日.txt', 16, '孤寂,责任,迫害'],
  ['敌友观', '敌人反比朋友稳定', '008.最后的九日.txt', 20, '敌人,朋友,迫害'],
  ['牢狱经验与政治迫害', '七年四个月的牢狱账', '009.我最难忘的一个“匪谍”.txt', 2, '坐牢,软禁,政治犯'],
  ['法律与权力', '假匪谍充数', '009.我最难忘的一个“匪谍”.txt', 116, '匪谍,军法,国民党'],
  ['思想方法', '冷静观察人间万象', '009.我最难忘的一个“匪谍”.txt', 122, '观察,冷静,生死'],
  ['历史见证', '国民党统治下血泪一页', '009.我最难忘的一个“匪谍”.txt', 123, '血泪,统治,见证'],
  ['历史见证', '小人物卷入政治漩涡', '009.我最难忘的一个“匪谍”.txt', 124, '农民,政治漩涡,苦难'],
  ['监控与荒诞', '窃听造成断章取义', '010.我最难忘的一个小偷.txt', 7, '窃听,监狱,荒诞'],
  ['牢狱经验与生存', '独占安静的两小时', '011.我最难忘的一间牢房.txt', 32, '牢房,时间,安静'],
  ['牢狱经验与生存', '世态炎凉而太阳是朋友', '011.我最难忘的一间牢房.txt', 35, '牢房,太阳,孤独'],
  ['牢狱经验与生存', '时间的批发商', '011.我最难忘的一间牢房.txt', 44, '时间,牢房,空间'],
  ['牢狱经验与生存', '孤独带来特殊感受', '011.我最难忘的一间牢房.txt', 45, '孤独,人生,感受'],
  ['历史见证', '苦难传递下去', '011.我最难忘的一间牢房.txt', 48, '苦难,牢房,民主'],
  ['人生观', '东西方悲剧大同小异', '011.我最难忘的一间牢房.txt', 49, '人生,悲剧,监狱'],
  ['社会观察', '流氓中的真性情', '012.我最难忘的一个流氓.txt', 17, '流氓,真性情,伪善'],
  ['洗脑与政治犯', '好为人师是自造优越感', '013.我最难忘的一段洗脑.txt', 3, '好为人师,洗脑,优越感'],
  ['政治宣传批判', '天下没有御制的公论', '013.我最难忘的一段洗脑.txt', 20, '公论,宣传,文字狱'],
  ['意识形态批判', '国民党意识形态是大拼盘', '013.我最难忘的一段洗脑.txt', 22, '意识形态,国民党,感化教育'],
  ['洗脑与政治犯', '感化教育不能化解敌人', '013.我最难忘的一段洗脑.txt', 34, '反省教育,感化,政治犯'],
  ['洗脑与政治犯', '政治犯不能感化', '013.我最难忘的一段洗脑.txt', 66, '政治犯,感化,敌人'],
  ['政治宣传批判', '三十年悔悟的荒唐', '013.我最难忘的一段洗脑.txt', 72, '感化,党报,政治犯'],
  ['写作与行动', '溪水变成稿纸', '014.被封杀的“人民公敌”.txt', 22, '文星,写作,行动'],
  ['文化传播与出版', '杂志要造成时势', '014.被封杀的“人民公敌”.txt', 25, '文星,杂志,思想'],
  ['人格与反抗', '一个人跟团体斗', '014.被封杀的“人民公敌”.txt', 34, '斗争,不变,团体'],
  ['人格与反抗', '保持自我少戴假面', '014.被封杀的“人民公敌”.txt', 36, '自我,勇士,假面'],
  ['历史观与地域意识', '种族自豪是历史不及格', '014.被封杀的“人民公敌”.txt', 42, '种族,历史,苗族'],
  ['历史观与地域意识', '小圈圈害天下为公', '014.被封杀的“人民公敌”.txt', 43, '地域,天下为公,小圈圈'],
  ['历史观与地域意识', '岛国褊狭造成悲剧', '014.被封杀的“人民公敌”.txt', 44, '台湾,岛气,褊狭'],
  ['读书与眼界', '放弃小岛气派', '014.被封杀的“人民公敌”.txt', 46, '眼界,读书,大气派'],
  ['人格与反抗', '发挥打击力又独来独往', '014.被封杀的“人民公敌”.txt', 47, '打击力,特立独行,大丈夫'],
  ['自我更新', '总是朝前走', '014.被封杀的“人民公敌”.txt', 52, '进步,主张,朝前走'],
  ['言论自由与封杀', '抗议扼杀异己言论', '014.被封杀的“人民公敌”.txt', 62, '言论,封锁,异己'],
  ['法律与权力', '政治问题法律解决', '014.被封杀的“人民公敌”.txt', 65, '法律,政治问题,斗倒'],
];

function readSource(fileName) {
  const fullPath = path.join(sourceDir, fileName);
  return decoder.decode(fs.readFileSync(fullPath));
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
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
  const lines = [
    headers.map(csvCell).join(','),
    ...records.map((record) => headers.map((header) => csvCell(record[header])).join(',')),
  ];
  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 条目数：${records.length}`,
    `- 状态：${book.status}`,
    '- 说明：标题与分类用于检索导航，description 为源文段落抽取，未做思想改写。',
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords}`);
    lines.push('');
    lines.push('原文：');
    lines.push('');
    lines.push(`> ${record.description}`);
    lines.push('');
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  const cache = new Map();

  return entries.map(([category, title, sourceFile, sourceParagraph, keywords], index) => {
    if (!cache.has(sourceFile)) {
      cache.set(sourceFile, paragraphs(readSource(sourceFile)));
    }

    const sourceParagraphs = cache.get(sourceFile);
    const description = sourceParagraphs[sourceParagraph - 1];
    if (!description) {
      throw new Error(`Missing paragraph P${sourceParagraph} in ${sourceFile}`);
    }

    const sourcePath = path.join(sourceDir, sourceFile);
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
      source_path: path.relative(rootDir, sourcePath).replace(/\\/g, '/'),
      keywords,
    };
  });
}

function writeSummary(filePath, records) {
  const categoryCounts = new Map();
  for (const record of records) {
    categoryCounts.set(record.category, (categoryCounts.get(record.category) ?? 0) + 1);
  }

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮输出 ${records.length} 条思想索引。每条索引的标题是浓缩导航，description 字段来自《大李敖全集6.0》分章节源文本段落，未重写为摘要。`,
    '',
    '## 分类统计',
    '',
    ...[...categoryCounts.entries()].map(([category, count]) => `- ${category}：${count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-提取轮.csv',
    '- 思想索引-提取轮.json',
    '- 思想索引-提取轮.md',
    '- ../思想索引总表.csv',
    '',
    '## 下一步',
    '',
    '校对轮建议逐条处理：删除弱条目、合并重复主题、微调分类与标题，但不要改写 description 原文。',
  ];

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify({ book, records }, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeCsv(masterCsvPath, records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
writeSummary(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${records.length} records for ${book.title}.`);
