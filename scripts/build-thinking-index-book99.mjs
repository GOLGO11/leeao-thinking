import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 99;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '胡适研究';
const slug = 'hu-shih-studies';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '012.人物研究类',
  '001.胡适研究',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
《胡适研究》前记.txt|17|身后追随更能验出忠诚|人格|胡适;门生;忠诚
《胡适研究》前记.txt|24|论战只回应值得回应者|写作|论战;回应;取舍
《胡适研究》前记.txt|25|理解文章要追到基本思路|方法|基本思路;心理运作;理解
《胡适研究》前记.txt|32|史料封锁甚至隔绝收信人|知识|书信;封锁;史料
《胡适研究》前记.txt|33|求真难免三面不讨好|人格|求真;褒贬;独立
《胡适研究》前记.txt|34|历史工作只问真相|方法|历史;真相;人物
《胡适研究》前记.txt|37|合传可以采用连环结构|写作|合传;连环;传记
《胡适研究》前记.txt|38|少量文字也能承载深意|写作|短文;字数;深意
《胡适研究》前记.txt|41|拒绝合理修正是不虚心|人格|批评;修正;虚心
001.播种者胡适.txt|17|文体束缚会损害精神自由|写作|文体;形式;精神自由
001.播种者胡适.txt|22|文字革命也能开启思想方向|写作|文字;思想;方向
001.播种者胡适.txt|26|文学革命会由目的转成手段|文化|文学革命;文化;手段
001.播种者胡适.txt|27|文章可以汇成思想运动|文化|文章;思潮;运动
001.播种者胡适.txt|29|政治动员会岔开文化远路|政治|五四;政治运动;文化使命
001.播种者胡适.txt|32|政治判断应重具体问题|方法|具体问题;独立思考;实证
001.播种者胡适.txt|38|改革应以实问题替代空口号|政治|改革;口号;演进
001.播种者胡适.txt|43|民主科学须有相容气质|政治|民主;科学;气质
001.播种者胡适.txt|44|思想一贯能够保存远见|人格|一贯;远见;民主
001.播种者胡适.txt|45|教育是可靠而缓慢的投资|知识|教育;投资;人才
001.播种者胡适.txt|50|评价人物要抓住真实贡献|文化|胡适;现代化;贡献
001.播种者胡适.txt|51|学术称号必须接受严格尺度|知识|哲学家;史学家;尺度
001.播种者胡适.txt|52|知识领袖误用精力会带坏学风|知识|学风;考据;影响
001.播种者胡适.txt|53|人情网络会断送学术计划|文化|学术;人情;计划
001.播种者胡适.txt|54|人格独立是不信权威教条|人格|独立;权威;教条
001.播种者胡适.txt|57|个人主义以独立负责为核心|人格|个人主义;独立;负责
001.播种者胡适.txt|58|负责发言不为掌声|写作|发言;责任;掌声
001.播种者胡适.txt|59|理智自由主义常显得保守|政治|自由主义;理智;保守
001.播种者胡适.txt|60|热情应有分寸|情爱|热情;体贴;分寸
001.播种者胡适.txt|61|拒绝权位财富显出操守|人格|权位;财富;操守
001.播种者胡适.txt|62|开放社会只要求基本自由条件|政治|开放社会;自由;现代化
001.播种者胡适.txt|63|领袖不过时说明时代没进步|文化|时代;进步;领袖
001.播种者胡适.txt|64|社会进步应赶过思想领袖|文化|进步;思想领袖;超越
002.为《播种者胡适》翻旧账.txt|4|还原人物必须经得起反驳|方法|历史人物;真面目;反驳
002.为《播种者胡适》翻旧账.txt|7|读文必须扣住作者微意|方法|阅读;微意;误解
002.为《播种者胡适》翻旧账.txt|9|选择性摘引会制造误解|方法|摘引;断章取义;误解
002.为《播种者胡适》翻旧账.txt|10|词气失谨不应遮蔽论证|方法|词气;内容;理性
002.为《播种者胡适》翻旧账.txt|12|史学应重理智重建|方法|原始文件;理智重建;史学
002.为《播种者胡适》翻旧账.txt|14|历史褒贬必须直接读原料|方法|原始材料;褒贬;历史解释
002.为《播种者胡适》翻旧账.txt|15|贡献者不必只有一个|方法|逻辑;唯一;贡献
002.为《播种者胡适》翻旧账.txt|16|命题不谨会造成概念混乱|方法|命题;概念;语意
002.为《播种者胡适》翻旧账.txt|25|表格证据也会反驳作者|方法|表格;证据;矛盾
002.为《播种者胡适》翻旧账.txt|29|思想形成有曲折过程|方法|思想形成;过程;历史
002.为《播种者胡适》翻旧账.txt|40|合作成果不能硬分形式内容|方法|二分法;合作;文学革命
002.为《播种者胡适》翻旧账.txt|57|文化启蒙先要找到表达工具|写作|白话文;工具;启蒙
002.为《播种者胡适》翻旧账.txt|58|白话文改变了思想传播方式|写作|白话文;传播;新青年
002.为《播种者胡适》翻旧账.txt|60|人数不能代替论证|方法|诉诸群众;表格;论证
002.为《播种者胡适》翻旧账.txt|64|用文献取代据说|方法|文献;据说;史实
002.为《播种者胡适》翻旧账.txt|67|表达工具能推动文化运动|文化|白话文;文化运动;工具
002.为《播种者胡适》翻旧账.txt|70|民主科学需要容纳匡正|政治|民主;科学;宽容
002.为《播种者胡适》翻旧账.txt|76|论辩必须先定义名词|方法|定义;名词;论辩
002.为《播种者胡适》翻旧账.txt|79|科学不能当作模糊标签|知识|科学;定义;概念
002.为《播种者胡适》翻旧账.txt|82|实验主义会限制意识形态投入|政治|实验主义;社会主义;存疑
002.为《播种者胡适》翻旧账.txt|83|赶时髦者常抹去旧立场|人格|时髦;立场;诚实
002.为《播种者胡适》翻旧账.txt|96|民主态度可以低调而坚强|政治|民主;低调;坚强
002.为《播种者胡适》翻旧账.txt|97|政治论证不必讨掌声|政治|政治;理智;掌声
002.为《播种者胡适》翻旧账.txt|113|单一解释会读窄文本|方法|不朽;解释;阅读
002.为《播种者胡适》翻旧账.txt|116|比较不相干对象不能构成反驳|方法|逻辑;不相干;比较
002.为《播种者胡适》翻旧账.txt|121|时间序列能够判定首倡|方法|时间序列;标点;首倡
002.为《播种者胡适》翻旧账.txt|126|改革不必变成统一礼制|文化|丧礼;改革;自愿
002.为《播种者胡适》翻旧账.txt|132|年代错误会倒置因果|方法|年代;因果;女权
002.为《播种者胡适》翻旧账.txt|138|思想运动来自交互影响|方法|思想运动;交互影响;功劳
002.为《播种者胡适》翻旧账.txt|140|当事回忆可作关键人证|方法|蔡元培;回忆;人证
002.为《播种者胡适》翻旧账.txt|154|定型期经历影响价值意识|知识|定型年代;留学;价值意识
002.为《播种者胡适》翻旧账.txt|155|守住论点边界才能停止纠缠|方法|扩大论点;转移论点;边界
002.为《播种者胡适》翻旧账.txt|157|检讨历史先熟读原始史料|方法|原始史料;据说;历史
002.为《播种者胡适》翻旧账.txt|158|史学要管束不合法的主观|方法|主观;史料;史学
002.为《播种者胡适》翻旧账.txt|159|翻案必须遵守方法|方法|翻案;演绎;方法
002.为《播种者胡适》翻旧账.txt|160|批评别人前先重读旧作|方法|旧作;批评;一致性
002.为《播种者胡适》翻旧账.txt|164|跨时对比能发现自相矛盾|方法|对比;旧文;矛盾
002.为《播种者胡适》翻旧账.txt|175|旧文能检验当下立场|方法|旧文;立场;检验
002.为《播种者胡适》翻旧账.txt|176|学者应认清自己的园地|人格|学者;专长;园地
002.为《播种者胡适》翻旧账.txt|210|内考证可以检验真诚|方法|内考证;真诚;基本思路
002.为《播种者胡适》翻旧账.txt|248|当事人回忆能收束历史争论|方法|陈独秀;回忆;争论
002.为《播种者胡适》翻旧账.txt|252|读懂文章要理解作者背景|方法|背景;文章;理解
002.为《播种者胡适》翻旧账.txt|254|不讲理的纠缠不会产生真理|方法|纠缠;真理;论战
002.为《播种者胡适》翻旧账.txt|284|公开资料不等于独家内幕|知识|公开资料;内幕;查证
002.为《播种者胡适》翻旧账.txt|287|原刊物应优先于二手材料|方法|原刊;二手材料;校勘
003.三人连环传.txt|33|真友情容得下坦白商榷|情爱|友情;商榷;启发
003.三人连环传.txt|74|性格成熟表现为理智克制|人格|性格;理智;成熟
003.三人连环传.txt|76|提倡者可以启发创造者|写作|提倡;创造;新文学
003.三人连环传.txt|98|新资料应补正旧传记|方法|资料;补正;传记
003.三人连环传.txt|99|保留旧貌也要公开纠错|方法|旧貌;纠错;传记
004.胡适先生走进了地狱.txt|6|辩护者也会被权力收买|政治|辩护者;收买;权力
004.胡适先生走进了地狱.txt|14|知识分子应做异端辩护士|法权|异端;辩护;冤狱
005.胡适对苏俄看法的四阶段.txt|3|缺乏历史认识会招致民族失败|政治|历史认识;苏联;民族失败
005.胡适对苏俄看法的四阶段.txt|14|革命可能带来更残暴的统治|政治|革命;帝俄;统治
005.胡适对苏俄看法的四阶段.txt|45|看不清理论时应保留存疑|方法|存疑;理论;苏联
005.胡适对苏俄看法的四阶段.txt|56|片面赞同会造成思想矛盾|政治|唯物史观;社会主义;矛盾
005.胡适对苏俄看法的四阶段.txt|69|实验失败值得公开转变|政治|社会主义;实验;转变
005.胡适对苏俄看法的四阶段.txt|72|最低限度实验主义能够防身|方法|实验主义;存疑;判断
005.胡适对苏俄看法的四阶段.txt|73|各打五十板也可能抹杀事实|政治|苏联;中间论调;事实
005.胡适对苏俄看法的四阶段.txt|74|文章修订需要背景比较|写作|修订;背景;比较
006.关于《胡适文存》.txt|6|重校可能抹掉版本原貌|写作|重校;版本;原貌
006.关于《胡适文存》.txt|9|节省成本不能牺牲思想记录|写作|删节;思想;版本
006.关于《胡适文存》.txt|13|新版应保存旧序原样|写作|原文;序言;新版
006.关于《胡适文存》.txt|16|分类重编胜过删残旧版|写作|分类;重编;版本
006.关于《胡适文存》.txt|23|负责言论无法靠查禁消灭|法权|言论自由;查禁;出版
006.关于《胡适文存》.txt|27|可靠证据比仓促结论重要|方法|证据;结论;治学
006.关于《胡适文存》.txt|29|论学文字必须可覆按|写作|论学;出处;考证
006.关于《胡适文存》.txt|30|通俗文章允许减少注证|写作|通俗;注证;达意
006.关于《胡适文存》.txt|31|写作需要慢工与慎重|写作|写作;慎重;慢工
006.关于《胡适文存》.txt|36|庄重文章的幽默可能流为刻薄|写作|幽默;刻薄;文风
006.关于《胡适文存》.txt|38|旧文训练会残留在白话里|写作|白话文;古文;训练
006.关于《胡适文存》.txt|41|方法意识和诚实贯穿写作|写作|方法;老实话;文风
006.关于《胡适文存》.txt|44|刊物顾忌会筛掉文章|文化|刊物;顾忌;发表
007.评介《丁文江的传记》.txt|10|书评应先建立评介维度|方法|书评;维度;结构
007.评介《丁文江的传记》.txt|15|传记必须交代时代环境|方法|传记;环境;时代
007.评介《丁文江的传记》.txt|16|思想史要写出变迁沿革|知识|思想史;变迁;传记
007.评介《丁文江的传记》.txt|18|琐事能够显出真实人品|人格|琐事;人品;传记
007.评介《丁文江的传记》.txt|21|避讳会使传记失真|写作|避讳;传记;可靠
007.评介《丁文江的传记》.txt|22|传记不能只写长处|方法|批评;长处;短处
007.评介《丁文江的传记》.txt|23|考证要主动纠正年代错误|方法|考证;年代;错误
007.评介《丁文江的传记》.txt|26|史料出处必须可覆按|方法|出处;史料;覆按
007.评介《丁文江的传记》.txt|28|校补原文必须清楚标记|写作|校补;原文;标记
007.评介《丁文江的传记》.txt|29|编年和纪事本末可以并用|写作|编年;纪事本末;结构
007.评介《丁文江的传记》.txt|30|白话更能写生活人|写作|白话;传记;人物
007.评介《丁文江的传记》.txt|31|批评应分面向展开|方法|批评;结构;面向
007.评介《丁文江的传记》.txt|32|引文必须同原文互校|方法|引文;互校;原文
007.评介《丁文江的传记》.txt|33|材料不足会放大记忆错误|方法|材料;记忆;错误
007.评介《丁文江的传记》.txt|39|名言也要追查真正出处|知识|名言;出处;考证
007.评介《丁文江的传记》.txt|43|传记简略不能漏掉重要事业|写作|传记;简略;事业
007.评介《丁文江的传记》.txt|44|人物足迹适合用地图呈现|知识|地图;足迹;传记
007.评介《丁文江的传记》.txt|45|历史训练可能压低文学性|写作|历史训练;文学性;传记
007.评介《丁文江的传记》.txt|47|后出的原始文件可以补评|方法|原始文件;补充;书评
007.评介《丁文江的传记》.txt|75|原手文件能显示作者自评|方法|原手文件;自评;传记
007.评介《丁文江的传记》.txt|76|材料最缺的阶段往往写得最弱|方法|材料;历史;传记
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
    note: '本轮从《胡适研究》的前记、七篇正文与作者后记中提取思想索引。各篇附录收入叶青、郑学稼、王洪钧、刘星等人的文章或胡适原函；本轮只保留李敖自己的叙述、判断、史料方法和写作原则，不把附录作者或被引人物的意见计为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: bodySourceFiles
      .reduce((count, fileName) => count + readParagraphs(fileName).length, 0),
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
  '- 只提取李敖自己的历史判断、史料方法、传记观、人物评价、自由主义判断和写作原则。',
  '- 各篇附录中的叶青、郑学稼、王洪钧、刘星等人文字，以及胡适、梁启超、徐志摩等人的整段引文，不独立列为李敖思想。',
  '- 李敖在正文中明确分析、赞同或反驳被引材料的段落可以保留，但标题只指向李敖在该段提出的判断。',
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
