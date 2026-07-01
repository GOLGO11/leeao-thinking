import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup))
  .find((name) => name.startsWith('001.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '016.教育与脸谱');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '016',
  title: '教育与脸谱',
  slug: 'jiaoyu-yu-lianpu',
  round: '提取轮',
  status: '待校对',
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
  ['知识', '教授失去五四气象', '序幕', 4, '大学教授,五四,活力'],
  ['政治', '老教授把持现状', '序幕', 11, '老教授,把持,学风'],
  ['写作', '文字惩罚可以拆穿把戏', '序幕', 12, '文字,批评,脸皮'],

  ['知识', '教授证不能保障终身不研究', '001', 3, '教授,论文,保障'],
  ['知识', '老教授四病是不研究不让贤', '001', 29, '老教授,研究,让贤'],
  ['政治', '学术津贴会变成派系分赃', '001', 30, '津贴,派系,学术'],
  ['方法', '人和事不能分开批评', '001', 46, '人事,制度,批评'],
  ['政治', '教育掌权者该主动让位', '001', 48, '掌权,新人,教育'],
  ['知识', '教育革新是政治革新的条件', '001', 50, '教育革新,思想变化,政治'],
  ['法权', '教育界也需要制衡考核', '001', 51, '教育界,制衡,考核'],
  ['人格', '不能对教育学术装沉默', '001', 52, '教育学术,发难,沉默'],
  ['人格', '原则可以用辞职表达', '001', 54, '原则,辞职,风骨'],

  ['方法', '师道不能压过是非', '002', 32, '师道,是非,真理'],
  ['人格', '真理比师友更亲爱', '002', 33, '真理,师友,亚里士多德'],
  ['方法', '仁者要有当仁不让的勇气', '002', 38, '当仁不让,勇气,真理'],
  ['文化', '名分传统压倒是非传统', '002', 40, '名分,是非,传统'],
  ['文化', '为尊者讳会牺牲真话', '002', 48, '曲笔,伪善,名分'],
  ['文化', '师道底下无直道', '002', 49, '师道,真理,直道'],
  ['方法', '正名可追问师不师', '002', 55, '正名,师不师,名分'],
  ['法权', '误人子弟者应剥夺师名', '002', 64, '老师,误人子弟,名分'],
  ['人格', '背叛老师可督促进步', '002', 69, '背叛,进步,老师'],
  ['人格', '真理面前应谢掉康圣人', '002', 70, '梁启超,真理,叛师'],
  ['知识', '老师至少要传授知识', '002', 75, '老师,知识,经师'],
  ['人格', '学生批评老师可维护师道', '002', 80, '学生批评,师道,真理'],
  ['方法', '裂痕要用真理是非弥补', '002', 82, '真理,是非,师道'],
  ['法权', '老师行为可受公共批评', '002', 85, '身教,个人行为,批评'],
  ['政治', '批评教师团体不是只骂个人', '002', 87, '教师团体,faculty,批评'],
  ['人格', '犯颜直谏常须态度不好', '002', 90, '犯颜,直谏,态度'],

  ['方法', '待遇菲薄论是遮羞术', '003', 23, '待遇,遮羞,教授'],
  ['方法', '待遇菲薄论是偷天换日', '003', 24, '待遇,偷换,学术'],
  ['知识', '学院不是养老院', '003', 35, '学院,养老院,学术'],
  ['法权', '学院无义务养教授到死', '003', 41, '学院,学术,私事'],
  ['知识', '学术新陈代谢不能让情断理', '003', 46, '新陈代谢,学术,青年'],
  ['法权', '老教授挡住青年工作权', '003', 49, '青年,工作权,机会'],
  ['人格', '老教授谋掉青年命脉', '003', 50, '青年,教授,命脉'],
  ['方法', '教授占位就必须研究', '003', 53, '教授,研究,paper'],
  ['方法', '待遇薄不是不研究护符', '003', 56, '待遇,研究,护符'],
  ['政治', '把持要把持出体统', '003', 63, '把持,体统,引咎'],
  ['政治', '老教授要给后继者机会', '003', 64, '退休,接手,机会'],
  ['知识', '赖住不走也要发掘青年', '003', 65, '青年,烂摊子,把持'],
  ['方法', '不要用待遇薄自欺', '003', 66, 'paper,待遇,青年'],

  ['写作', '站到亮处说话是民主条件', '004', 102, '亮处,民主,言论'],
  ['方法', '批评制度要看事实和人事', '004', 131, '事实,人事,制度'],
  ['方法', '大学建议应多举事实', '004', 132, '事实,理论,大学'],
  ['知识', '大学教育培养独立判断', '004', 135, '大学教育,独立判断,真理'],
  ['人格', '年轻人应勇于说出想法', '004', 136, '年轻人,勇气,师道'],
  ['方法', '批评对象是团体不是私怨', '005', 5, 'faculty,个人,团体'],

  ['人格', '学者不该脱离战场', '006', 11, '战场,书斋,知识分子'],
  ['人格', '事师有犯无隐', '006', 12, '师道,犯无隐,批评'],
  ['人格', '不甘在酱缸里酱成老学者', '006', 13, '酱缸,飞,知识分子'],

  ['知识', '真正爱国要靠学术研究', '007', 20, '学术研究,爱国,自由'],
  ['知识', '中国古史要越过长城观', '007', 21, '长城,古史,北方'],
  ['方法', '研究古史要到长城以北找资料', '007', 22, '古史,资料,长城'],
  ['知识', '学术研究需要博大远景', '007', 24, '学术研究,远景,李济'],
  ['知识', '推进科学先要反省固有文化', '007', 28, '科学思想,固有文化,反省'],
  ['文化', '面子心理阻碍科学思想', '007', 31, '面子,科学思想,虚伪'],
  ['知识', '读书目标关闭思想活动力', '007', 34, '读书,思想活动,教育'],
  ['方法', '对子训练压低理性', '007', 38, '对子,逻辑,理性'],
  ['方法', '文字崇拜使人不接触实物', '007', 42, '文字迷信,实物,实验'],
  ['知识', '传统文化缺少知识即力量', '007', 48, '知识,力量,传统文化'],
  ['政治', '学界领导也要负责任', '007', 54, '学界领导,责任,政客'],
  ['政治', '学阀没有租界可逃', '007', 58, '学阀,责任,割据'],
  ['人格', '严肃过度难开创局面', '007', 64, '李济,领导,性格'],
  ['知识', '李济是教育学术悲剧拟人化', '007', 66, '李济,悲剧,文化沙漠'],

  ['政治', '领导者不能散布失败主义', '008', 17, '领导,失败主义,责任'],
  ['人格', '学问好不等于会领导', '008', 24, '学问,领导,性格'],
  ['法权', '学术资料不是少数人私产', '008', 38, '国家财产,资料,学术公器'],
  ['法权', '民主时代不能拒绝公器阅览', '008', 44, '资料开放,国家财产,民主'],
  ['知识', '封锁资料制造假权威', '008', 51, '资料封锁,权威,学者'],
  ['知识', '乾嘉余孽不是科学史学', '008', 67, '乾嘉,科学史学,史语所'],
  ['文化', '新朴学是开倒车学术', '008', 71, '新朴学,国故,学术'],
  ['知识', '公家钱不应资助开倒车学术', '008', 74, '中央研究院,科学,学术'],
  ['知识', '史语所没有达成科学成就之路', '008', 84, '史语所,科学,东方学'],
  ['政治', '独裁型领导会制造作伪空气', '008', 95, '傅斯年,独裁,作伪'],
  ['政治', '不适宜领导会成为逆流', '008', 108, '领导,逆流,李济'],
  ['知识', '研究机关死症是资料把持和范围狭窄', '008', 111, '研究机关,资料,范围'],
  ['政治', '制度和人不能分开', '008', 125, '制度,人,良法'],
  ['政治', '老年人不交棒却怪青年', '008', 128, '交棒,青年,把持'],

  ['法权', '考试法是国家抡才基本标准', '009', 3, '考试法,抡才,标准'],
  ['法权', '自己踢开法律是法治笑话', '009', 5, '考试院,考试法,法治'],
  ['法权', '妾妇之道会放弃考试法', '009', 6, '妾妇之道,考试院,权利'],
  ['法权', '考试院变成检核院', '009', 13, '检核,考试院,宪法'],
  ['法权', '良法要有人严格执行', '009', 21, '考试权,良法,执行'],
  ['政治', '清高职位也要新陈代谢', '009', 23, '考试院,新陈代谢,下台'],
  ['法权', '行政命令不能抵触法律宪法', '009', 50, '行政命令,法律,宪法'],
  ['法权', '检核特权有违公平', '009', 74, '检核,公平,考试'],
  ['政治', '考试院自毁独立门户', '009', 79, '考试院,独立,自毁'],

  ['人格', '知识分子入宦海常得不偿失', '010', 6, '知识分子,宦海,学术'],
  ['方法', '外交史要直接接触原料', '010', 10, '外交史,原料,史料'],
  ['知识', '从政会断送学术计划', '010', 16, '从政,学术,近代史'],
  ['人格', '避谤不是血气人生哲学', '010', 21, '避谤,人格,风骨'],
  ['政治', '防共治本要建设更好社会', '010', 24, '反共,社会,治本'],
  ['政治', '极左极右相差不远', '010', 30, '极权,国社党,共产党'],
  ['政治', '理智爱国不说空话', '010', 32, '爱国,理智,义和团'],
  ['政治', '高调误国', '010', 38, '高调,误国,现代化'],
  ['文化', '国家必须现代化才能生存', '010', 42, '现代化,民族,生存'],
  ['政治', '建设就是创造和改造', '010', 44, '建设,制度,现代化'],
  ['政治', '乞丐国家不能成独立势力', '010', 48, '建设,外援,独立'],
  ['方法', '政治问题先从ABC做起', '010', 66, '实事求是,饭碗,政治'],
  ['方法', '求知要看原物件和事实', '010', 69, '事实,原文件,求知'],
  ['方法', '只知书本不知事实会写八股', '010', 71, '书本,事实,八股'],
  ['人格', '知识分子不能袖手旁观', '010', 73, '知识分子,政治,责任'],
  ['人格', '事业不可牺牲', '010', 77, '做事,事业,圆滑'],
  ['政治', '知识分子和政治关系切身', '010', 79, '知识分子,政治,社会'],

  ['人格', '救灾只看人命不看阵营', '011', 25, '胡佛,救灾,人道'],
  ['人格', '公共服务不取私利', '011', 28, '公共服务,薪水,慈善'],
  ['人格', '没有人有权利退休', '011', 35, '退休,工作,胡佛'],
  ['人格', '人格历史会刻画时代', '011', 50, '人格,历史,时代'],

  ['写作', '文星代表口诛笔伐', '012', 13, '文星,口诛笔伐,是非'],
  ['写作', '女作家不能只做闺秀派', '012', 26, '女作家,社会,闺秀派'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
}

function readSource(sourceFile) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
}

const sourceFiles = fs.readdirSync(sourceDir);
const sourceFileCache = new Map();

function resolveSourceFile(sourceKey) {
  if (!sourceFileCache.has(sourceKey)) {
    const matches = sourceFiles.filter((name) => (
      name === sourceKey
      || name.startsWith(`${sourceKey}.`)
      || name.includes(sourceKey)
    ));
    if (matches.length !== 1) {
      throw new Error(`Expected one source file for ${sourceKey}, got ${matches.length}`);
    }
    sourceFileCache.set(sourceKey, matches[0]);
  }
  return sourceFileCache.get(sourceKey);
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
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file} 第 ${record.source_paragraph} 段`);
    lines.push(`- 关键词：${record.keywords}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeNote(filePath, records) {
  const categoryLines = taxonomy.map((category) => {
    const count = records.filter((record) => record.category === category).length;
    return `- ${category}：${count}`;
  });

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本轮优先收录教育、师道、学术制度、知识分子、法权、现代化和写作批评中的明确思想判断。',
    '- 目录、材料汇编、来往函件和引用段落只在能独立形成思想索引时少量收录。',
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
if (records.length !== 110) {
  throw new Error(`Expected 110 records, got ${records.length}`);
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
