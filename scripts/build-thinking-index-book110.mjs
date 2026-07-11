import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '110';
const bookTitle = '为文学开窗';
const slug = 'open-a-window-for-literature';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '012.为文学开窗');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
001|16|低劣文坛会剥夺读者的精神营养|文化|文坛;精神营养;阅读环境
001|18|判断整体品质不必穷尽每一件样本|方法|抽样;判断;作品品质
001|23|文学批评必须摆脱私人感情|写作|文学批评;私人感情;真话
001|26|作者心地善良不能保证作品伟大|写作|作者;善意;作品
001|35|作品走红可能来自对读者心理的准确镜照|写作|读者心理;流行;作品
001|45|文学人物可能成为读者的行动模板|写作|文学人物;读者;模仿
001|46|文学会使不健康观念更加凝固|文化|文学影响;观念;青年
001|62|意象过度重复会暴露词汇贫乏|写作|意象;重复;词汇
001|90|批评作品仍应肯定成功描写|人格|批评;公允;描写
001|104|爱情不只是家庭缺爱的补偿|情爱|爱情;家庭;补偿
001|107|相恋的基础就是爱情本身|情爱|相恋;爱情;本质
001|119|师生身份不能使爱情自动有罪|情爱|师生恋;身份;爱情
001|120|观念不清会使文字无法澄清问题|写作|观念;文字;澄清
001|122|恋爱者也可能成为传统观念的奴隶|情爱|恋爱;传统;观念
001|123|泛道德主义会把恋爱污名化|文化|泛道德主义;恋爱;污名
001|134|恋爱题材必须厘清爱情本质|写作|恋爱题材;爱情本质;作品
001|136|爱情不受父母身份支配|情爱|爱情;父母;支配
001|139|爱女之名可能掩盖家长控制|情爱|母爱;控制;动机
001|168|盲目母爱会铸成无法挽回的错误|情爱|母爱;盲目;错误
001|172|善意亲情不能保证行为正确|人格|善意;亲情;判断
001|173|父母关爱必须有管辖边界|情爱|父母;关爱;边界
001|176|改编作品也必须澄清核心观念|写作|改编;核心观念;作品
001|181|纯洁与污秽不是有效的爱情判断|情爱|纯洁;污秽;爱情
001|183|感情专一教条会扭曲爱情|情爱|感情专一;教条;爱情
001|185|爱情既非永恒也非专一|情爱|爱情;永恒;专一
001|186|礼教法律无法冻结感情变化|情爱|礼教;法律;感情
001|188|感情不专一不等于道德低下|情爱|感情;专一;道德
001|189|正视人性限度可以减少爱情痛苦|情爱|人性;爱情;痛苦
001|194|新爱情的罪恶感来自专一教条|情爱|罪恶感;新爱情;专一
001|207|谈情与性交都是爱情的一部分|情爱|谈情;性交;爱情
001|208|灵高肉低的偏见有其宗教来源|文化|灵肉;宗教;偏见
001|209|灵魂与肉体在爱情中同样重要|情爱|灵魂;肉体;爱情
001|213|子女孝顺必须有行为限度|人格|孝顺;子女;限度
001|214|子女不应毁伤自己服从父母|人格|子女;父母;服从
001|216|传统观念之间经常自相矛盾|文化|传统;矛盾;观念
001|223|零散洞见会因观念不清而消失|写作|洞见;观念;作者
001|249|统计高频词可以发现文体重复|方法|高频词;文体;重复
001|253|严肃批评不能因伤感情而沉默|人格|批评;感情;沉默
001|259|媚世文学会使青年更加顺从|文化|媚世;青年;顺从
001|261|流行成功会诱使作家重复配方|写作|流行;作家;配方
001|263|作家应引导群众而非取媚群众|写作|作家;群众;取媚
001|265|作家应纠正青年而非附和错误|写作|作家;青年;错误
001|266|知识分子应向陈腐思想宣战|人格|知识分子;陈腐思想;责任
001|267|伟大文学必须连结群众生活|写作|伟大文学;群众;生活
001|272|困苦时代更需要有活力的文学|写作|时代;活力;文学
001|274|文学批评可以超出狭义书评范围|写作|文学批评;书评;范围
002|2|公开保存反对意见是一种批评雅量|人格|反对意见;公开;雅量
002|63|公私权力结合会保护顺从型文学|文化|权力;顺从文学;文坛
002|68|迎合大众会使作家失去尝试勇气|写作|大众口味;作家;勇气
002|69|溶入大众会使作者丧失个性|人格|大众;作者;个性
002|71|高压环境会塑造驯顺的写作者|文化|高压;写作者;驯顺
002|75|敢于直言的批评者可能才是真朋友|人格|批评者;朋友;直言
002|81|群体辩护可能显示作者已经陷入阵营|方法|群体辩护;作者;阵营
002|83|发现看错别人应承认判断错误|人格|识人;错误;承认
003|15|政治帽子可以被用来召唤官方镇压|政治|政治帽子;官方;镇压
003|20|政治命名可以同时讨好并警告当权者|写作|政治命名;当权者;暗示
003|26|中国电影必须在剧旨与蒙太奇上改革|写作|电影;剧旨;蒙太奇
003|32|电影成就必须接受世界尺度检验|文化|电影;世界尺度;检验
003|37|关心一个领域不妨碍严厉批评|人格|关心;批评;电影
004|3|现代白话不应依赖古旧套语|写作|白话;套语;语言
004|5|作家应创造词汇而非偷懒袭旧|写作|作家;词汇;创造
005|7|新造词汇必须经得起语义检验|写作|新词;语义;检验
007|15|写作放不开源于内在抑制|写作|写作;抑制;教育
007|16|传统与威权会形成双重思想束缚|文化|传统;威权;思想束缚
008|2|古典诗歌也能抗议黑暗统治|文化|古典诗歌;抗议;统治
009|8|章太炎是中国古文学的光荣结局|文化|章太炎;古文学;评价
009|14|查核原集可以确认诗作受赠者|方法|原集;诗作;受赠者
009|17|学术主盟者也可以积极介入政论|人格|学术;政论;章太炎
010|30|英文诗可以借古诗格律传神|写作|英文诗;古诗;翻译
011|7|优秀翻译应兼顾信雅达|写作|翻译;信雅达;严复
011|8|英雄成长必须在风险中接受挑战|人格|英雄;成长;挑战
011|9|中西思想可以共同导向反宿命|文化|中西思想;宿命;命运
011|10|坚持真理必须承受随之而来的诬蔑|人格|真理;诬蔑;坚持
012|11|词义差异可能来自地域用法|知识|词义;地域;用法
012|17|标点可以改变古文的意义结构|写作|标点;古文;意义
012|18|直译可以保留原词的形象力量|写作|直译;形象;翻译
013|2|中国文学长期分为民间与文人两流|文化|文学史;民间;文人
013|3|不同来源的文学会在历史中合流|文化|文学;合流;历史
013|4|文学合流既可能繁荣也可能败坏|文化|文学合流;繁荣;败坏
013|5|文学史必须解释变化而非堆砌材料|方法|文学史;变化;材料
014|2|中国文学曾寄生于思想文字之中|文化|中国文学;思想;文字
014|3|文句结构与流传工具塑造文学体裁|文化|文句结构;流传工具;体裁
015|2|中国戏剧的范围深度与演进速度有限|文化|中国戏剧;范围;演进
015|3|争取世界地位必须先研究别人的路径|方法|世界地位;比较;戏剧
016|3|文体不相称可以成为追查抄袭的线索|方法|文体;抄袭;线索
017|2|表达他人思想必须增加准确标准|写作|表达;思想;准确
017|3|思想与修辞需要跨学科研究|知识|思想;修辞;跨学科
017|4|修辞应追求恰如其字并沟通读者|写作|修辞;恰如其字;读者
018|2|复兴文化的口号可能掩盖古书无知|文化|文化复兴;古书;无知
018|4|权威会用责怪学生掩饰自身无知|人格|权威;学生;无知
018|5|出题考人者必须先理解题目来源|知识|考试;题目;来源
018|6|使用典故必须准确理解历史语境|写作|典故;历史语境;准确
018|8|年代比对可以揭穿典故误用|方法|年代;典故;比对
018|9|知识被歪曲时不能以让步换沉默|人格|知识;歪曲;沉默
019|4|政治避讳造成的改名会传播文献错误|方法|政治避讳;改名;文献
019|22|宗教压制科学的历史不能被开脱|文化|宗教;科学;历史
019|37|引用既有译本必须保留准确书名|写作|译本;书名;引用
019|38|名词解释应在第一次出现时完成|写作|名词;解释;结构
019|48|同类外文书名必须采用统一体例|写作|外文书名;体例;统一
019|59|引证文字与正文必须清楚区分|写作|引证;正文;排版
019|61|括号会暗示文字具有确定性|写作|括号;确定性;编辑
019|69|学术引用不应采用盗印版本|写作|学术引用;盗印本;版本
019|91|页码不同的引证必须注明版本|方法|页码;引证;版本
019|114|异常字形不能未经核实就判为错误|方法|字形;核实;原文
019|128|原文可通时不应轻率加注误字|方法|原文;误字;校勘
019|136|文章修订后必须重算相对年代|方法|修订;年代;重算
019|137|编辑应删除意思重复的句尾|写作|编辑;重复;句子
019|164|文献没有根据的用法不宜保留|方法|文献;用法;根据
019|170|重新断句可能避免擅改原字|方法|断句;原字;校勘
019|181|引用原文的标点也应回到原本核对|方法|引文;标点;原本
019|207|诗歌断句必须服从转韵结构|写作|诗歌;断句;转韵
019|214|引用化名作者应注明真实姓名|写作|化名;作者;注明
019|225|目录标题必须与正文标题一致|写作|目录;标题;一致
019|230|相关前人研究应补入当前论述|方法|前人研究;补充;论述
019|237|版面密度必须顾及阅读体验|写作|版面;密度;阅读
019|264|同类外文著作必须统一注明原名|写作|外文著作;原名;统一
019|280|书目著录必须核实真正作者|方法|书目;作者;核实
019|309|辨认影印原件应借助放大核看|方法|影印;放大;核看
019|322|通行异体字不必加注为原文特例|方法|异体字;原文;注释
019|328|引文收入文集后的改题也应注明|写作|引文;改题;文集
019|333|已有研究时不能轻率声称身世不详|方法|研究;身世;核查
019|351|书目必须补足出版时间与地点|写作|书目;出版时间;地点
019|354|缺文符号必须保持统一|写作|缺文;符号;统一
019|361|独立成篇的文章不应降为附录|写作|文章;附录;结构
019|365|地名用字应回到碑文核验|方法|地名;碑文;核验
019|377|标点位置可以改变整句意义|写作|标点;句义;断句
019|380|上下文可以确认有争议的字词|方法|上下文;字词;校勘
019|391|转引文字必须回查原书|方法|转引;原书;核对
019|392|断句不同会改变词语解释|写作|断句;词语;解释
019|407|书名著录应忠于原书标题|写作|书名;原书;著录
019|416|同一书名的不同译法必须统一|写作|书名;翻译;统一
019|418|征引书目应注明所用版本|写作|征引书目;版本;注明
020|4|古书必须经过选择与活用才有现代价值|知识|古书;选择;活用
020|8|现代分类应矫正儒家四部分类的失衡|方法|现代分类;四部分类;失衡
020|9|选本应恢复被压抑的异端思想|文化|选本;异端思想;恢复
020|11|评判文章只需追问表达内容与表达效果|写作|文章;表达内容;效果
020|12|思想内容应高于华丽空洞的文章传统|写作|思想内容;华丽;传统
020|14|控制文献是压迫自由的基本手段|政治|文献;自由;控制
020|18|保存禁书目录可以留下压迫记忆|文化|禁书目录;压迫;记忆
020|19|禁书流传会反证权力控制并非万能|政治|禁书;权力;控制
020|20|阅读古代禁书可以知古鉴今|文化|禁书;知古鉴今;自由
020|22|学问必须关心人民困穷而非空谈心性|知识|学问;人民;困穷
020|27|导读应揭示古书的经世意义|写作|导读;古书;经世
020|29|出土文献可以带来古人没有的新认识|知识|出土文献;新认识;古书
020|32|法律史必须用地方实务印证中央法条|方法|法律史;地方实务;法条
020|34|版本迷恋会绞杀书籍功能与流传|知识|版本;书籍功能;流传
020|35|选书不能把版本癖好误作学问全体|方法|选书;版本;学问
020|36|古书版本应以普及实用与新知衡量|方法|古书;版本;实用
020|37|选本必须同时兼顾内容与版本|方法|选本;内容;版本
020|38|全集形态更能呈现作者全貌|方法|全集;作者;全貌
020|39|失传后重现的作品应补回作者文集|写作|失传作品;文集;补入
020|42|导读既要提供鸟瞰也要教授方法|写作|导读;鸟瞰;方法
020|43|政治教条会扭曲传统书目评价|文化|政治教条;书目;评价
020|44|现代读者需要兼具考订与评判的导读|写作|现代读者;导读;考订
020|45|读书应改变气质并有益公共生活|知识|读书;气质;公共生活
020|47|现代编辑可以打破专家对古书的垄断|文化|现代编辑;古书;垄断
020|48|古书要靠新的出版形态重新进入现代|写作|古书;出版形态;现代
021|3|一字之差可以改变整首诗的境界|写作|一字之差;诗;境界
021|6|不正的观看角度也能产生审美趣味|写作|观看角度;审美;趣味
021|7|观看时间短反而可能更有美感|写作|观看;时间;美感
`.trim();

function sourceFiles() {
  return fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/\r/g, '')
    .split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
}

function parseSpecs(allSourceFiles) {
  const available = new Set(allSourceFiles);
  return specLines.split(/\n+/).map((line, index) => {
    const [fileToken, paragraphText, title, category, keywordText, ...extra] = line.split('|');
    if (extra.length || !fileToken || !paragraphText || !title || !category || !keywordText) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    if (!categorySet.has(category)) throw new Error(`Invalid category ${category}`);
    let fileName = fileToken;
    if (!available.has(fileName)) {
      const matches = allSourceFiles.filter((name) => name.startsWith(`${fileToken}.`));
      if (matches.length !== 1) throw new Error(`Cannot resolve source token: ${fileToken}`);
      [fileName] = matches;
    }
    return {
      fileName,
      source_paragraph: Number(paragraphText),
      title,
      category,
      keywords: keywordText.split(';'),
    };
  });
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath, records) {
  const headers = ['id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  const rows = [headers.join(','), ...records.map((record) => headers.map((header) => csvEscape(
    Array.isArray(record[header]) ? record[header].join(';') : record[header],
  )).join(','))];
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [`# ${bookTitle} 思想索引（提取轮）`, '', `- 书名：${bookTitle}`, `- 条目：${records.length}`, '- 说明：标题用于检索浓缩，description 保留源文本原段落。', ''];
  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`, '');
    for (const item of items) {
      lines.push(`### ${item.id} ${item.title}`, '', `- 来源：${item.source_file} 第 ${item.source_paragraph} 段`, `- 关键词：${item.keywords.join('、')}`, '', item.description, '');
    }
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeTxt(filePath, records) {
  fs.writeFileSync(filePath, `${records.map((record) => [
    `${record.id}｜${record.category}｜${record.title}`,
    `来源：${record.source_file} 第 ${record.source_paragraph} 段`,
    `关键词：${record.keywords.join('、')}`,
    record.description,
  ].join('\n')).join('\n\n---\n\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy.map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter(({ count }) => count > 0);
}

const allSourceFiles = sourceFiles();
const bodySourceFiles = allSourceFiles.filter((name) => !name.includes('目录'));
if (bodySourceFiles.length !== 21) throw new Error(`Expected 21 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 1662) throw new Error(`Expected 1662 paragraphs, found ${sourceParagraphCount}`);

const excludedNonLiOrNonProseRanges = [
  { fileToken: '001', start: 275, end: 439, owner: '刘金田、张润冬、吴建及报刊附录与制作附注' },
  { fileToken: '002', start: 88, end: 116, owner: '蒋芸文章与制作附注' },
  { fileToken: '003', start: 39, end: 175, owner: '王柳敏等报刊附录与制作附注' },
  { fileToken: '006', start: 4, end: 27, owner: '钟梅音、萧孟能书信与制作附注' },
  { fileToken: '007', start: 3, end: 14, owner: '居浩然原文' },
  { fileToken: '008', start: 3, end: 31, owner: '诗歌译文与制作附注' },
  { fileToken: '016', start: 9, end: 32, owner: '居浩然附录与制作附注' },
  { fileToken: '020', start: 50, end: 166, owner: '分类书目清单与制作附注' },
];
const excludedNonLiOrNonProseParagraphCount = excludedNonLiOrNonProseRanges
  .reduce((sum, range) => sum + range.end - range.start + 1, 0);
if (excludedNonLiOrNonProseParagraphCount !== 537) {
  throw new Error(`Expected 537 excluded embedded paragraphs, found ${excludedNonLiOrNonProseParagraphCount}`);
}

const specs = parseSpecs(allSourceFiles);
if (specs.length !== 160) throw new Error(`Expected 160 candidate specs, found ${specs.length}`);
const cache = new Map();
const candidates = specs.map((spec) => {
  const excludedRange = excludedNonLiOrNonProseRanges.find((range) => (
    spec.fileName.startsWith(`${range.fileToken}.`)
      && spec.source_paragraph >= range.start
      && spec.source_paragraph <= range.end
  ));
  if (excludedRange) {
    throw new Error(`Excluded range selected: ${spec.fileName}:${spec.source_paragraph}`);
  }
  if (!cache.has(spec.fileName)) cache.set(spec.fileName, paragraphs(spec.fileName));
  const description = cache.get(spec.fileName)[spec.source_paragraph - 1];
  if (!description) throw new Error(`Missing ${spec.fileName}:${spec.source_paragraph}`);
  return { ...spec, description };
});

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const candidate of candidates) {
    if (seen.has(candidate[key])) {
      throw new Error(`Duplicate candidate ${key}: ${seen.get(candidate[key]).fileName}:${seen.get(candidate[key]).source_paragraph} and ${candidate.fileName}:${candidate.source_paragraph}`);
    }
    seen.set(candidate[key], candidate);
  }
}

const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const priorByDescription = new Map();
for (const record of master.records) {
  if (record.book !== bookTitle && !priorByDescription.has(record.description)) {
    priorByDescription.set(record.description, record);
  }
}
const skippedDuplicates = [];
const retainedCandidates = [];
for (const candidate of candidates) {
  const previous = priorByDescription.get(candidate.description);
  if (previous) {
    skippedDuplicates.push({
      source_file: candidate.fileName,
      source_paragraph: candidate.source_paragraph,
      title: candidate.title,
      previous_id: previous.id,
      previous_book: previous.book,
      previous_source_file: previous.source_file,
      previous_source_paragraph: previous.source_paragraph,
      reason: '与既有总表源段落完全相同，本轮不重复提取',
    });
  } else {
    retainedCandidates.push(candidate);
  }
}
if (skippedDuplicates.length !== 0) throw new Error(`Expected 0 skipped duplicates, found ${skippedDuplicates.length}`);
if (retainedCandidates.length !== 160) throw new Error(`Expected 160 retained candidates, found ${retainedCandidates.length}`);
const records = retainedCandidates.map((spec, index) => ({
  id: `LAT${sequence}-${String(index + 1).padStart(3, '0')}`,
  book: bookTitle,
  round,
  status,
  category: spec.category,
  title: spec.title,
  description: spec.description,
  source_file: spec.fileName,
  source_paragraph: spec.source_paragraph,
  source_path: path.join(sourceBookDir, spec.fileName),
  keywords: spec.keywords,
}));

for (const key of ['title', 'description']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate retained ${key}`);
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    sequence,
    title: bookTitle,
    slug,
    sourceDir: sourceBookDir,
    round,
    status,
    note: '本轮只提取李敖本人明确撰写、评论、校勘、翻译评价或归纳的独立判断。刘金田、张润冬、吴建、蒋芸、居浩然及报刊附录作者的独立观点不转列为李敖思想；诗歌全文、分类书目和逐字错字清单不拆成条目。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    excluded_non_li_or_non_prose_paragraph_count: excludedNonLiOrNonProseParagraphCount,
    excluded_non_li_or_non_prose_ranges: excludedNonLiOrNonProseRanges,
    candidate_count: candidates.length,
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: skippedDuplicates.length,
    skipped_duplicates: skippedDuplicates,
    skipped_files: allSourceFiles.filter((name) => name.includes('目录')),
    category_counts: categoryCounts(records),
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
  `# ${bookTitle} 提取说明`, '',
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 源目录：${sourceBookDir}`,
  `- 源正文文件数：${bodySourceFiles.length}`,
  `- 全部源段落数：${sourceParagraphCount}`,
  `- 明确排除的他人文本或非论述段落：${excludedNonLiOrNonProseParagraphCount}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖本人明确撰写、评论、校勘、翻译评价或归纳的文学观、情爱观、修辞原则、文学史解释和校书方法。',
  '- 刘金田、张润冬、吴建、蒋芸、居浩然及报刊附录作者的独立观点全部排除；居浩然原文只在李敖明确赞同与归纳的段落中随文保留。',
  '- 诗歌全文、分类书目、作品长引、人物资料、纯错字清单和制作附注不单独建项。',
  '- 《校书别记》只保留可推广的版本、引证、标点、断句和编辑体例原则，不把二百八十八条校字逐条索引化。',
  '- 与既有总表源文完全相同的段落只记录重复来源，不重复建项。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 排除范围', '',
  ...excludedNonLiOrNonProseRanges.map((range) => `- ${range.fileToken} 第 ${range.start}-${range.end} 段：${range.owner}`), '',
  '## 重复来源', '',
  ...(skippedDuplicates.length ? skippedDuplicates.map((item) => `- ${item.source_file}#${item.source_paragraph} = ${item.previous_book} ${item.previous_id}`) : ['- 无']), '',
  '## 分类统计', '',
  ...payload.book.category_counts.map(({ category, count }) => `- ${category}: ${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  candidates: candidates.length,
  records: records.length,
  source_file_count: bodySourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  excluded_non_li_or_non_prose_paragraph_count: excludedNonLiOrNonProseParagraphCount,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
