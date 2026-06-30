import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceDir = path.join(
  rootDir,
  '《大李敖全集6.0》分章节',
  '001.自传回忆类',
  '002.李敖自传与回忆续集',
);
const outputDir = path.join(rootDir, 'outputs', '002.李敖自传与回忆续集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '002',
  title: '李敖自传与回忆续集',
  slug: 'li-ao-zizhuan-yu-huiyi-xuji',
  round: '提取轮',
  status: '待校对',
};

const taxonomy = [
  '写作与传播',
  '思想源流与方法',
  '教育与知识分子',
  '人格与自我',
  '传统与社会',
  '历史观与地域意识',
  '政治权力批判',
  '法律与言论自由',
  '牢狱与迫害经验',
  '人生与社会观察',
];

const entries = [
  ['政治权力批判', '骨肉隔绝与小岛扣押', '002.乱世母女泪.txt', 12, '国民党,迁徙自由,骨肉隔绝'],
  ['思想源流与方法', '早慧读书与思想定型', '004.“一朝眉羽成，钻破亦在我”.txt', 4, '读书,思想定型,知识分子'],
  ['政治权力批判', '统治思想与书刊管制', '004.“一朝眉羽成，钻破亦在我”.txt', 9, '书刊管制,左派书,国民党'],
  ['思想源流与方法', '文化与国家并非同一命运', '004.“一朝眉羽成，钻破亦在我”.txt', 31, '钱穆,传统文化,国家民族'],
  ['政治权力批判', '御用学者与帝王心态', '004.“一朝眉羽成，钻破亦在我”.txt', 35, '钱穆,蒋介石,御用学者'],
  ['思想源流与方法', '胡适影响的早期来源', '005.我与胡适的“微妙关系”.txt', 3, '胡适,思想来源,文存'],
  ['写作与传播', '播种者胡适引发论战', '005.我与胡适的“微妙关系”.txt', 6, '胡适,文星,论战'],
  ['思想源流与方法', '文证俱在的资料方法', '005.我与胡适的“微妙关系”.txt', 13, '胡适,原始资料,文证'],
  ['思想源流与方法', '五四打断非政治文化运动', '006.为旧帐算新帐.txt', 5, '五四,新文化,政治运动'],
  ['思想源流与方法', '不谈政治的文献证据', '006.为旧帐算新帐.txt', 13, '胡适,陈独秀,文献'],
  ['法律与言论自由', '恶法录的批判作业', '007.《恶法录及其他》新版前言.txt', 10, '恶法录,国民党,法律批判'],
  ['人格与自我', '朋友也要坚持批评', '008.我怎样给王尚义擦屁股.txt', 12, '王尚义,朋友,坦白'],
  ['人生与社会观察', '断裂时代的文化追求者', '009.关于《王尚义与李敖》.txt', 30, '王尚义,五四传统,文化追求'],
  ['教育与知识分子', '中国知识分子的可耻与例外', '009.关于《王尚义与李敖》.txt', 40, '知识分子,儒家传统,特立独行'],
  ['教育与知识分子', '李敖作为知识分子代言人', '009.关于《王尚义与李敖》.txt', 44, '知识分子,台湾,文星'],
  ['写作与传播', '文星反对政治挂帅和思想婢仆', '011.为《文星》招魂.txt', 6, '文星,杂志,思想'],
  ['写作与传播', '文星并非反对研究中国文化', '011.为《文星》招魂.txt', 54, '文星,中国文化,现代化'],
  ['写作与传播', '文星立场有历史根据', '011.为《文星》招魂.txt', 98, '文星,孙中山,自由民主'],
  ['法律与言论自由', '出版没有中央党部预审的法理', '011.为《文星》招魂.txt', 105, '出版法,预审制,中央党部'],
  ['法律与言论自由', '真正扼杀言论自由的罪人', '011.为《文星》招魂.txt', 114, '言论自由,审查,文星'],
  ['法律与言论自由', '国法党限的严正表示', '011.为《文星》招魂.txt', 116, '国法党限,文星,出版审查'],
  ['政治权力批判', '身体暴露在无约束权力之下', '011.为《文星》招魂.txt', 124, '思想自由,言论自由,权力'],
  ['政治权力批判', '党的命令超过行政命令', '011.为《文星》招魂.txt', 127, '文星,党命令,行政命令'],
  ['法律与言论自由', '法律胜利不等于公论胜利', '011.为《文星》招魂.txt', 130, '法律,公论,道德'],
  ['写作与传播', '文星是死不瞑目的烈士', '011.为《文星》招魂.txt', 131, '文星,正义,公道'],
  ['人格与自我', '理想追求高于战友去来', '011.为《文星》招魂.txt', 132, '理想,文星,战友'],
  ['写作与传播', '思想性杂志是永久的', '011.为《文星》招魂.txt', 137, '文星,思想性杂志,永久价值'],
  ['法律与言论自由', '自由中国与文星两次事件', '012.记文星事件.txt', 4, '自由中国,文星,言论自由'],
  ['写作与传播', '文星接替自由中国的位置', '012.记文星事件.txt', 6, '文星,自由中国,思想自由'],
  ['法律与言论自由', '宪法保障被违宪法律搁置', '012.记文星事件.txt', 7, '宪法,言论自由,非法搜索'],
  ['政治权力批判', '开明政治信誉的黑影与伪装', '012.记文星事件.txt', 12, '国民党,自由中国,文星'],
  ['政治权力批判', '迫害反共的自由主义者', '012.记文星事件.txt', 13, '自由主义,反共,迫害'],
  ['人格与自我', '文星是心智真诚的表征', '012.记文星事件.txt', 20, '文星,真诚,台湾'],
  ['教育与知识分子', '知识分子的旧仇新恨', '012.记文星事件.txt', 28, '知识分子,文祸,迫害'],
  ['人格与自我', '软禁中仍有不怕的朋友', '013.软禁中的通讯.txt', 3, '软禁,朋友,言论自由'],
  ['教育与知识分子', '青年从软弱少年到软弱中年', '013.软禁中的通讯.txt', 63, '青年,教育,环境'],
  ['法律与言论自由', '劫后四书仍不能免劫', '013.软禁中的通讯.txt', 65, '查禁,书刊,国民党'],
  ['法律与言论自由', '国际特赦协会与良心犯', '014.我才“妨害军机”呢！.txt', 14, '国际特赦,良心犯,人权'],
  ['牢狱与迫害经验', '泰源名单外泄的意义', '014.我才“妨害军机”呢！.txt', 22, '泰源监狱,政治犯,名单'],
  ['人格与自我', '把责任揽到自己身上', '014.我才“妨害军机”呢！.txt', 24, '泰源名单,责任,孟绝子'],
  ['政治权力批判', '被遗忘的妨害军机', '014.我才“妨害军机”呢！.txt', 28, '妨害军机,党外,台独'],
  ['教育与知识分子', '不受国民党教育污染', '016.《坐牢家爸爸给女儿的八十封信》自序.txt', 4, '女儿,教育,三民主义'],
  ['写作与传播', '政治犯父亲的函授传统', '016.《坐牢家爸爸给女儿的八十封信》自序.txt', 8, '坐牢,书信,尼赫鲁'],
  ['人格与自我', '患难里才见朋友', '017.刘辰旦——患难见真情的朋友.txt', 2, '患难,朋友,软禁'],
  ['法律与言论自由', '判决书可以是编导神话', '017.刘辰旦——患难见真情的朋友.txt', 17, '判决书,刑求,冤案'],
  ['政治权力批判', '大案邀功与刑求逼供', '017.刘辰旦——患难见真情的朋友.txt', 46, '刑求,爆炸案,邀功'],
  ['牢狱与迫害经验', '在岛上没有自由感', '017.刘辰旦——患难见真情的朋友.txt', 63, '自由,台湾,坐牢'],
  ['政治权力批判', '解严秀与政治犯上诉', '018.给李政一的一封信.txt', 4, '解严,政治犯,上诉'],
  ['法律与言论自由', '戒严取消后应恢复原状', '018.给李政一的一封信.txt', 5, '戒严法,上诉,法律'],
  ['人格与自我', '制造晴空乱流', '018.给李政一的一封信.txt', 7, '蒋经国,搅局,晴空乱流'],
  ['牢狱与迫害经验', '找不到保人的候保队', '019.我是我自己的保人.txt', 3, '保人,政治犯,候保队'],
  ['人格与自我', '不交保也不继续感化', '019.我是我自己的保人.txt', 14, '交保,政治犯,感化'],
  ['政治权力批判', '交保是中国文化怪病', '019.我是我自己的保人.txt', 52, '交保,文化怪病,违法'],
  ['法律与言论自由', '刑满必须释放', '019.我是我自己的保人.txt', 56, '监狱行刑法,释放,违法'],
  ['法律与言论自由', '反对政府是民主政制常态', '019.我是我自己的保人.txt', 61, '民主,政府,誓书'],
  ['法律与言论自由', '不利于政府言行何法可裁', '019.我是我自己的保人.txt', 62, '政府,法律,言论'],
  ['人格与自我', '我是我自己的保人', '019.我是我自己的保人.txt', 66, '保人,英雄,拒绝交保'],
  ['法律与言论自由', '公道必须归还', '020.新醒世姻缘.txt', 119, '公道,法院,萧孟能'],
  ['人生与社会观察', '朋友办事的道理与道德', '022.好个“桃园结义”.txt', 35, '朋友,道德,萧孟能'],
  ['人生与社会观察', '文化出版地位与做人问题', '022.好个“桃园结义”.txt', 48, '文化出版,做人,朋友'],
  ['人生与社会观察', '文化理想不该以小算盘收场', '022.好个“桃园结义”.txt', 50, '文化理想,财务,文星'],
  ['人格与自我', '真理高于亲疏', '026.胡茵梦的抗议信.txt', 8, '真理,大义灭亲,择善固执'],
  ['牢狱与迫害经验', '台北看守所的超负荷结构', '028.监狱学土城？.txt', 7, '台北看守所,分监,超收'],
  ['政治权力批判', '保护之名的特别检查', '028.监狱学土城？.txt', 11, '看守所,信件检查,恐怖'],
  ['牢狱与迫害经验', '做工是打发牢狱日子的方法', '028.监狱学土城？.txt', 18, '监狱,做工,寂寞'],
  ['政治权力批判', '所长也调不动的关法', '028.监狱学土城？.txt', 21, '看守所,法务部,政治犯'],
  ['政治权力批判', '思想纯正即可管人', '028.监狱学土城？.txt', 30, '管理员,思想纯正,监狱'],
  ['法律与言论自由', '死刑犯一律钉脚镣是违法', '028.监狱学土城？.txt', 52, '脚镣,刑事诉讼法,违法'],
  ['政治权力批判', '党报滞销与订报保障', '028.监狱学土城？.txt', 91, '党报,经济凌虐,看守所'],
  ['牢狱与迫害经验', '病舍也是特权空间', '028.监狱学土城？.txt', 66, '病舍,特权,看守所'],
  ['法律与言论自由', '书名也能成为查扣理由', '028.监狱学土城？.txt', 130, '查禁书刊,战争与和平,荒诞'],
  ['牢狱与迫害经验', '人犯借看病求片刻移动', '028.监狱学土城？.txt', 73, '看病,囚犯,生命力'],
  ['法律与言论自由', '管理安全压过人权', '028.监狱学土城？.txt', 153, '人权,看守所,带卷出庭'],
  ['牢狱与迫害经验', '人犯爆炸', '028.监狱学土城？.txt', 159, '监狱,人犯爆炸,缓刑'],
  ['政治权力批判', '低成本剥夺自由', '028.监狱学土城？.txt', 161, '自由,政府,监狱成本'],
  ['牢狱与迫害经验', '囚房空间决定身体动作', '028.监狱学土城？.txt', 174, '囚房,空间,身体'],
  ['写作与传播', '文星主流消失后只剩乱流', '031.从主流到乱流.txt', 4, '文星,主流,乱流'],
  ['法律与言论自由', '诬告大登，清白一字不登', '031.从主流到乱流.txt', 11, '媒体,封杀,名誉'],
  ['写作与传播', '文星必须走未来取向', '032.“洁本”云乎哉？.txt', 4, '文星,未来取向,复刊'],
  ['写作与传播', '洁本替暴政开脱', '032.“洁本”云乎哉？.txt', 6, '文星,洁本,暴政'],
  ['写作与传播', '文星是公器', '034.文星与伪文星.txt', 3, '文星,公器,萧孟能'],
  ['写作与传播', '思想挂帅取代政治挂帅', '034.文星与伪文星.txt', 6, '文星,思想挂帅,政治挂帅'],
  ['法律与言论自由', '国法党限的冰河时期冲撞', '034.文星与伪文星.txt', 7, '国法党限,文星,中央党部'],
  ['法律与言论自由', '宪政时代党限不该超过国法', '034.文星与伪文星.txt', 16, '宪政,党限,国法'],
  ['政治权力批判', '国民党应该接受批评', '034.文星与伪文星.txt', 19, '国民党,批评,直谅之士'],
  ['政治权力批判', '退出司法军队与训政惯性', '034.文星与伪文星.txt', 22, '国民党,司法,军队'],
  ['法律与言论自由', '读书人可被随意栽诬', '034.文星与伪文星.txt', 31, '栽诬,刘岩,言论报国'],
  ['写作与传播', '文星开拓中文出版风潮', '035.为文星书店争公道.txt', 3, '文星书店,出版,中文书籍'],
  ['法律与言论自由', '出版契约与斯文扫地', '035.为文星书店争公道.txt', 9, '出版权,契约,出版伦理'],
  ['思想源流与方法', '资料大王的证据意识', '039.资料大王小谈.txt', 4, '资料,证据,官司'],
];

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
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
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, records) {
  const categoryCounts = new Map();
  for (const category of taxonomy) {
    const count = records.filter((record) => record.category === category).length;
    if (count) categoryCounts.set(category, count);
  }

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮输出 ${records.length} 条思想索引。每条索引标题用于检索，description 字段来自源文本段落，未改写为摘要。`,
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
    '',
    '## 下一步',
    '',
    '校对轮建议优先处理文星主题重复、法律案情过长、婚变官司条目的思想密度。',
  ];

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

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify({ book, taxonomy, records }, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
writeSummary(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${records.length} records for ${book.title}.`);
