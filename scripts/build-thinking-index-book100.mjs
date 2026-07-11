import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 100;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '胡适评传';
const slug = 'hu-shih-critical-biography';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '012.人物研究类',
  '002.胡适评传',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
001.关于《胡适评传》.txt|5|传记使死者重新开口|写作|传记;复活;胡适
001.关于《胡适评传》.txt|6|颂扬会造成传记粗疏|方法|颂扬;史料;错误
001.关于《胡适评传》.txt|7|感情立场搬弄不出真人|方法|酷评;颂扬;史料
001.关于《胡适评传》.txt|8|画像必须忠于人物|方法|画像;方法训练;史学
001.关于《胡适评传》.txt|9|传记要画出时代|写作|时代;舞台;传记
001.关于《胡适评传》.txt|10|个人评传也是时代评传|写作|个人;时代;评传
001.关于《胡适评传》.txt|11|正文文学化须有历史脚注|写作|正文;脚注;历史
001.关于《胡适评传》.txt|12|传记实验可以延伸时代|写作|传记文学;实验;时代
001.关于《胡适评传》.txt|14|传记材料要主动征集|方法|文件;信札;稿本
001.关于《胡适评传》.txt|15|基层史料未成不能只走文学|写作|基层史料;脚注;文学传记
002.《胡适评传》楔子.txt|5|愚昧躁急会使改革者迷路|人格|愚昧;躁急;迷路
002.《胡适评传》楔子.txt|9|历史人物本身充满矛盾|人格|荣誉;耻辱;矛盾
002.《胡适评传》楔子.txt|10|个人生命属于时代|文化|个人;时代;历史
002.《胡适评传》楔子.txt|11|后人只能从残片追摹真相|方法|残碑断简;真相;假面
002.《胡适评传》楔子.txt|12|历史重建应越过脚印|方法|历史;追摹;重建
003.可怜的县太爷（1841-1895）.txt|11|认真报实情容易得罪人|人格|认真;报实情;人缘
003.可怜的县太爷（1841-1895）.txt|27|官场要求记住上司私事|政治|官场;上司;生辰
003.可怜的县太爷（1841-1895）.txt|68|旧文人的名号暴露习气|文化|名号;斋名;旧文人
003.可怜的县太爷（1841-1895）.txt|70|训诂专家未必能带兵|知识|专家;带兵;能力
003.可怜的县太爷（1841-1895）.txt|79|求雨迷信会穿越时代|文化|求雨;迷信;地方官
003.可怜的县太爷（1841-1895）.txt|80|鸦片比例是军事史材料|知识|鸦片;军人;军事史
003.可怜的县太爷（1841-1895）.txt|81|无名文献也能考出作者|方法|无名文献;作者;考证
003.可怜的县太爷（1841-1895）.txt|82|出版者不能遗漏撰人|写作|出版;撰人;疏忽
003.可怜的县太爷（1841-1895）.txt|89|迷信记录也是军事史材料|知识|狗哭;迷信;军事史
003.可怜的县太爷（1841-1895）.txt|106|时间顺序可揭穿第一|方法|时间顺序;牺牲者;史实
003.可怜的县太爷（1841-1895）.txt|111|批评者也要接受史料纠正|方法|批评;史料;纠正
003.可怜的县太爷（1841-1895）.txt|114|学术称号需要严格尺度|知识|地理学家;称号;尺度
003.可怜的县太爷（1841-1895）.txt|132|文字拙劣不损史料价值|方法|碑记;文字;史料价值
003.可怜的县太爷（1841-1895）.txt|175|按日期合编更便于稽考|写作|日记;合编;稽考
004.可怜的小寡妇（1873-1918）.txt|7|男名寄托重男期待|文化|男名;重男;命名
004.可怜的小寡妇（1873-1918）.txt|18|守寡承受连续人生折磨|情爱|守寡;折磨;人生
004.可怜的小寡妇（1873-1918）.txt|19|希望能支撑人抵抗折磨|人格|希望;支撑;母亲
004.可怜的小寡妇（1873-1918）.txt|45|家庭订婚塑造婚姻保守|情爱|订婚;婚姻;保守
004.可怜的小寡妇（1873-1918）.txt|47|年龄计算能发现传记沿误|方法|年龄;计算;沿误
004.可怜的小寡妇（1873-1918）.txt|50|性别倒置命名是传统把戏|文化|姓名;性别;传统
004.可怜的小寡妇（1873-1918）.txt|71|现代史训练能识破生年错误|方法|现代史;生年;错误
004.可怜的小寡妇（1873-1918）.txt|80|冷眼旁观塑造好脾气|人格|旁观;好脾气;童年
004.可怜的小寡妇（1873-1918）.txt|84|割肉疗病是持久民间愚昧|文化|割肉疗病;民俗;愚昧
005.半个台湾人（1891-1895）.txt|112|人名解释不能只有当事说法|方法|人名;解释;全祖望
005.半个台湾人（1891-1895）.txt|150|土地缘分可以贯穿一生|文化|台湾;土地;缘分
005.半个台湾人（1891-1895）.txt|167|不喜欢乱猜就直接问当事人|方法|乱猜;赵元任;生年
005.半个台湾人（1891-1895）.txt|174|百科全书也会写错出生地|知识|百科全书;出生地;错误
005.半个台湾人（1891-1895）.txt|176|比较表只是抽样不能刻舟求之|方法|比较表;抽样;影响
006.被拧肉的时代（1895-1904）.txt|33|学费差异制造理解差距|知识|学费;讲书;教育
006.被拧肉的时代（1895-1904）.txt|36|特别教育形成知识优势|知识|特别待遇;知识;小说
006.被拧肉的时代（1895-1904）.txt|64|口述故事训练翻译理解|写作|说书;文言;土话
006.被拧肉的时代（1895-1904）.txt|65|白话小说训练通顺文字|写作|白话小说;文字;文言
006.被拧肉的时代（1895-1904）.txt|66|思想转变可从拜神走向无神|文化|拜神;无神;思想
006.被拧肉的时代（1895-1904）.txt|83|怀疑地狱是无神论起点|文化|地狱;怀疑;无神论
006.被拧肉的时代（1895-1904）.txt|87|清简论证促成无神信仰|文化|神灭论;无神;论证
006.被拧肉的时代（1895-1904）.txt|92|偶然阅读可以改写一生|知识|偶然;阅读;思想
006.被拧肉的时代（1895-1904）.txt|96|思想反叛会向母权归顺|人格|反叛;母权;归顺
006.被拧肉的时代（1895-1904）.txt|102|私下惩罚是一种课子艺术|人格|惩罚;课子;隐私
006.被拧肉的时代（1895-1904）.txt|105|不公开羞辱可以培养自尊|人格|羞辱;自尊;教育
006.被拧肉的时代（1895-1904）.txt|110|早熟会剥夺儿童游戏|人格|早熟;儿童;游戏
006.被拧肉的时代（1895-1904）.txt|112|意识形态会封死儿童发展|文化|意识形态;儿童;发展
006.被拧肉的时代（1895-1904）.txt|114|离家时已经带着怀疑倾向|人格|离家;怀疑;童年
006.被拧肉的时代（1895-1904）.txt|138|童年读物塑造温和脾气|人格|童年读物;脾气;小学
006.被拧肉的时代（1895-1904）.txt|139|童年读物也能培养容忍|人格|童年读物;容忍;影响
006.被拧肉的时代（1895-1904）.txt|179|后来爱好可能是童年补偿|方法|爱好;童年;补偿
007.“努力做徽骆驼”（1904）.txt|4|地域性格可以内含冲突|文化|进取;保守;徽州
007.“努力做徽骆驼”（1904）.txt|10|世界主义者也受乡土束缚|人格|世界主义;乡土;束缚
007.“努力做徽骆驼”（1904）.txt|12|学术不能从家世遗传|知识|家世;汉学;遗传
007.“努力做徽骆驼”（1904）.txt|26|早期诗歌显出入世思想|方法|诗歌;入世;思想
007.“努力做徽骆驼”（1904）.txt|27|安宁环境可以培养无为心理|政治|安宁;警察;无为
007.“努力做徽骆驼”（1904）.txt|29|少年经验会成为晚年哲学张本|方法|少年经验;无为;哲学
007.“努力做徽骆驼”（1904）.txt|60|思想迫害会逼人曲解人物|政治|思想迫害;曲解;人物
007.“努力做徽骆驼”（1904）.txt|88|家世汉学说是附会|知识|家世汉学;附会;遗传
007.“努力做徽骆驼”（1904）.txt|111|谨慎文字不能过度推演|方法|梁启超;文字;推演
007.“努力做徽骆驼”（1904）.txt|125|一纸遗嘱可能改变求学命运|方法|遗嘱;求学;命运
008.“侬跟我来”（1904-1906）.txt|34|新书能打开旧书堆外世界|知识|新书;旧书;思想
008.“侬跟我来”（1904-1906）.txt|40|报纸短评可以塑造少年|文化|报纸;短评;影响
008.“侬跟我来”（1904-1906）.txt|45|剪报习惯是有益训练|知识|剪报;习惯;训练
008.“侬跟我来”（1904-1906）.txt|46|白话小说能预备文学革命|写作|白话小说;文学革命;武器
008.“侬跟我来”（1904-1906）.txt|54|教师鼓励会打开言论自由|知识|教师;鼓励;言论自由
008.“侬跟我来”（1904-1906）.txt|60|思想传播依靠触媒|知识|思想传播;触媒;影响
008.“侬跟我来”（1904-1906）.txt|61|进化论可以导向改良主义|政治|进化论;改良主义;实验主义
008.“侬跟我来”（1904-1906）.txt|62|思想起点会限定政治道路|政治|思想起点;政治道路;自由主义
008.“侬跟我来”（1904-1906）.txt|64|禁书也挡不住文章影响|文化|禁书;文章;影响
008.“侬跟我来”（1904-1906）.txt|80|早年影响决定终身兴趣|方法|梁启超;早年;兴趣
008.“侬跟我来”（1904-1906）.txt|81|团体活动能改变内向性格|人格|团体活动;内向;性格
008.“侬跟我来”（1904-1906）.txt|86|自治精神会争取权利|法权|自治;权利;抗议
008.“侬跟我来”（1904-1906）.txt|91|通俗革命书可以形成广泛影响|写作|革命书;通俗;影响
008.“侬跟我来”（1904-1906）.txt|142|父亲影响常被高估|方法|父亲;影响;高估
008.“侬跟我来”（1904-1906）.txt|160|人际影响存在瓜蔓现象|文化|人际;影响;瓜蔓
009.《竞业旬报》（1906-1908）.txt|26|社会改良需要传播工具|写作|改良;传播;旬报
009.《竞业旬报》（1906-1908）.txt|31|共同语言来自公共沟通需要|文化|国语;沟通;学校
009.《竞业旬报》（1906-1908）.txt|36|写作要让人懂得|写作|写作;明白;浅显
009.《竞业旬报》（1906-1908）.txt|45|熟悉环境让小说更具体|写作|环境;小说;具体
009.《竞业旬报》（1906-1908）.txt|71|传记可以承载思想|写作|传记;思想;白话
009.《竞业旬报》（1906-1908）.txt|85|折中婚姻观仍受传统束缚|情爱|婚姻观;折中;传统
009.《竞业旬报》（1906-1908）.txt|95|爱国容易滑向沙文主义|政治|爱国;沙文主义;理智
009.《竞业旬报》（1906-1908）.txt|152|单纯理想可以使人赴死|人格|理想;殉身;时代
009.《竞业旬报》（1906-1908）.txt|226|稀见原刊值得主动调阅|方法|原刊;调阅;史料
009.《竞业旬报》（1906-1908）.txt|248|摘录应能代表思想角度|方法|摘录;思想;角度
009.《竞业旬报》（1906-1908）.txt|277|青年思想会成为晚年种子|方法|青年;思想;种子
009.《竞业旬报》（1906-1908）.txt|284|思想基点会延续到后来|方法|思想基点;家族;婚姻
010.少年诗人（1907-1909）.txt|4|偶然阅读能改变学术道路|方法|偶然阅读;兴趣;学术道路
010.少年诗人（1907-1909）.txt|7|鼓励可能改写受者命运|人格|鼓励;命运;诗人
010.少年诗人（1907-1909）.txt|8|新兴趣会挤掉旧志业|方法|兴趣;数学;文学
010.少年诗人（1907-1909）.txt|12|形式束缚会酝酿文学革命|写作|诗韵;束缚;文学革命
010.少年诗人（1907-1909）.txt|19|模仿是早期写作路径|写作|模仿;白居易;写作
010.少年诗人（1907-1909）.txt|31|诗词说理会产生臭味|写作|诗词;说理;风格
010.少年诗人（1907-1909）.txt|57|少年翻译也可达到工巧|写作|翻译;少年;工巧
010.少年诗人（1907-1909）.txt|58|翻译成绩受教师传承影响|方法|翻译;教师;传承
010.少年诗人（1907-1909）.txt|59|师承关系可能转成思想冲突|文化|师承;思想;冲突
010.少年诗人（1907-1909）.txt|145|师承关系也会被省略|人格|师承;省略;辜鸿铭
011.“无忘城下盟”（1908-1909）.txt|5|学生自治可以模拟民主制度|政治|学生自治;民主;制度
011.“无忘城下盟”（1908-1909）.txt|6|官款会改变制度自主|政治|官款;制度;自主
011.“无忘城下盟”（1908-1909）.txt|12|权利被否认会触发退学|政治|权利;退学;抗争
011.“无忘城下盟”（1908-1909）.txt|14|自治组织能快速建立学校|政治|自治;组织;学校
011.“无忘城下盟”（1908-1909）.txt|21|教学也会反过来训练教师|知识|教学;训练;教师
011.“无忘城下盟”（1908-1909）.txt|25|理想事业也会败于经费|政治|理想;经费;学校
011.“无忘城下盟”（1908-1909）.txt|32|债务会迫使理想接受妥协|政治|债务;理想;妥协
011.“无忘城下盟”（1908-1909）.txt|33|原则会让人拒绝回归|人格|原则;回归;拒绝
011.“无忘城下盟”（1908-1909）.txt|42|求学经历不等于文凭|知识|求学;文凭;经历
011.“无忘城下盟”（1908-1909）.txt|77|当事解释仍要继续考证|方法|逃婚;解释;考证
011.“无忘城下盟”（1908-1909）.txt|107|人际引荐会改变职业道路|文化|引荐;职业;王云五
011.“无忘城下盟”（1908-1909）.txt|121|失去理智不分年龄|政治|青年;中年;理智
011.“无忘城下盟”（1908-1909）.txt|129|自述原文可以纠正回忆|方法|自述;回忆;毕业
012.从逛窑子到上北京（1909-1910）.txt|3|理想主义受挫容易激烈反动|人格|理想主义;受挫;堕落
012.从逛窑子到上北京（1909-1910）.txt|49|赔款也能转为教育资源|政治|赔款;教育;留学
012.从逛窑子到上北京（1909-1910）.txt|51|退款催生留美预备学校|知识|退款;清华;学校
012.从逛窑子到上北京（1909-1910）.txt|64|考试趣味相投会影响分数|文化|考试;考据;趣味
012.从逛窑子到上北京（1909-1910）.txt|68|偏科也可能靠单科优势录取|知识|偏科;录取;国文
012.从逛窑子到上北京（1909-1910）.txt|151|新时代的人不断寻找新空气|文化|新时代;上海;美国
012.从逛窑子到上北京（1909-1910）.txt|152|城市会埋葬一个人的青春|情爱|城市;青春;上海
012.从逛窑子到上北京（1909-1910）.txt|193|自我整顿需要停止糊涂|人格|整顿;糊涂;立身
012.从逛窑子到上北京（1909-1910）.txt|196|受惠经历会强化学术偏爱|方法|受惠;考据;偏爱
012.从逛窑子到上北京（1909-1910）.txt|211|年龄标注能校正榜文错误|方法|年龄;榜文;校正
012.从逛窑子到上北京（1909-1910）.txt|215|学校称号必须严格核定|知识|母校;毕业;称号
012.从逛窑子到上北京（1909-1910）.txt|217|外界期待可能造成专业误选|知识|期待;专业;误选
`.trim();

function getSourceFiles() {
  return fs.readdirSync(sourceDir)
    .filter((fileName) => fileName.endsWith('.txt'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function readParagraphs(fileName) {
  const filePath = path.join(sourceDir, fileName);
  const text = decoder.decode(fs.readFileSync(filePath)).replace(/\r/g, '');
  return text.split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function parseSpec() {
  return specLines.split(/\n+/).map((line, index) => {
    const parts = line.split('|');
    if (parts.length !== 5) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    const [fileName, paragraphText, title, category, keywordText] = parts;
    if (!categorySet.has(category)) {
      throw new Error(`Invalid category "${category}" on line ${index + 1}`);
    }
    const source_paragraph = Number(paragraphText);
    if (!Number.isInteger(source_paragraph) || source_paragraph < 1) {
      throw new Error(`Invalid paragraph "${paragraphText}" on line ${index + 1}`);
    }
    return {
      fileName,
      source_paragraph,
      title,
      category,
      keywords: keywordText.split(';').map((keyword) => keyword.trim()).filter(Boolean),
    };
  });
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
    ...records.map((record) => headers.map((header) => {
      const value = Array.isArray(record[header]) ? record[header].join(';') : record[header];
      return csvEscape(value);
    }).join(',')),
  ];
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [
    `# ${bookTitle} 思想索引（提取轮）`,
    '',
    `- 书名：${bookTitle}`,
    `- 条目：${records.length}`,
    '- 说明：标题用于检索浓缩，description 保留源文本原段落。',
    '',
  ];
  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (items.length === 0) continue;
    lines.push(`## ${category}`, '');
    for (const item of items) {
      lines.push(`### ${item.id} ${item.title}`);
      lines.push('');
      lines.push(`- 来源：${item.source_file} 第 ${item.source_paragraph} 段`);
      lines.push(`- 关键词：${item.keywords.join('、')}`);
      lines.push('');
      lines.push(item.description);
      lines.push('');
    }
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeTxt(filePath, records) {
  const text = records.map((record) => [
    `${record.id}｜${record.category}｜${record.title}`,
    `来源：${record.source_file} 第 ${record.source_paragraph} 段`,
    `关键词：${record.keywords.join('、')}`,
    record.description,
  ].join('\n')).join('\n\n---\n\n');
  fs.writeFileSync(filePath, `${text}\n`, 'utf8');
}

function countByCategory(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function assertUnique(records, key, label) {
  const seen = new Set();
  for (const record of records) {
    const value = record[key];
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
}

function buildRecords() {
  const sourceFiles = new Set(getSourceFiles());
  const paragraphCache = new Map();
  const records = parseSpec().map((spec, index) => {
    if (!sourceFiles.has(spec.fileName)) {
      throw new Error(`Missing source file: ${spec.fileName}`);
    }
    if (!paragraphCache.has(spec.fileName)) {
      paragraphCache.set(spec.fileName, readParagraphs(spec.fileName));
    }
    const paragraphs = paragraphCache.get(spec.fileName);
    const description = paragraphs[spec.source_paragraph - 1];
    if (!description) {
      throw new Error(`Missing paragraph ${spec.source_paragraph} in ${spec.fileName}`);
    }
    return {
      id: `LAT${sequence}-${String(index + 1).padStart(3, '0')}`,
      book: bookTitle,
      round,
      status,
      category: spec.category,
      title: spec.title,
      description,
      source_file: spec.fileName,
      source_paragraph: spec.source_paragraph,
      source_path: path.join(sourceBookDir, spec.fileName),
      keywords: spec.keywords,
    };
  });
  assertUnique(records, 'title', 'title');
  assertUnique(records, 'description', 'description');
  return records;
}

const allSourceFiles = getSourceFiles();
const bodySourceFiles = allSourceFiles.filter((fileName) => !fileName.includes('目录'));
if (bodySourceFiles.length !== 12) {
  throw new Error(`Expected 12 body source files, found ${bodySourceFiles.length}`);
}
const sourceParagraphCount = bodySourceFiles
  .reduce((count, fileName) => count + readParagraphs(fileName).length, 0);
if (sourceParagraphCount !== 1912) {
  throw new Error(`Expected 1912 source paragraphs, found ${sourceParagraphCount}`);
}
const records = buildRecords();
const payload = {
  generated_at: new Date().toISOString(),
  book: {
    sequence,
    title: bookTitle,
    slug,
    sourceDir: sourceBookDir,
    round,
    status,
    note: '本轮从《胡适评传》的序言、楔子与十章正文中提取思想索引。正文含大量胡适自述、家谱、诗文、日记、榜文和史料引录；本轮只保留李敖自己的叙述性判断、因果分析、人物评价、史料方法和写作原则，不把胡适或其他被引人物的独立意见计为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: 0,
    skipped_duplicates: [],
    skipped_files: allSourceFiles.filter((fileName) => fileName.includes('目录')),
    category_counts: countByCategory(records),
  },
  taxonomy,
  records,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(path.join(outputDir, '思想索引.csv'), records);
writeTxt(path.join(outputDir, '思想索引.txt'), records);

const note = [
  `# ${bookTitle} 提取说明`,
  '',
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 源目录：${sourceBookDir}`,
  `- 源正文文件数：${payload.book.source_file_count}`,
  `- 源段落数：${payload.book.source_paragraph_count}`,
  `- 提取条目：${records.length}`,
  '',
  '## 提取原则',
  '',
  '- 只提取李敖自己的传记观、因果判断、史料方法、人物评价、文化批评和写作原则。',
  '- 胡适自述、家谱、诗文、日记、榜文和其他史料引文，不因内容完整而独立列为李敖思想。',
  '- 李敖在正文中明确分析、判断或反驳被引材料的段落可以保留，但标题只指向李敖在该段提出的判断。',
  '- 同一段旧文被后文再次引用时只保留首次出现者，避免将重复描述收入索引。',
  '- 提取轮适度展开同题的不同方法层面，供校对轮再做删减和重新编号。',
  '- 标题用于检索浓缩；description 保留源文本原段落。',
  '',
  '## 分类统计',
  '',
  ...payload.book.category_counts.map((item) => `- ${item.category}: ${item.count}`),
  '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  records: records.length,
  source_file_count: payload.book.source_file_count,
  source_paragraph_count: payload.book.source_paragraph_count,
  category_counts: payload.book.category_counts,
}, null, 2));
