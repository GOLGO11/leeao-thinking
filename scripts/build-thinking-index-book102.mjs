import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 102;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '孙逸仙和中国西化医学';
const slug = 'sun-yat-sen-and-westernized-medicine-in-china';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '012.人物研究类',
  '004.孙逸仙和中国西化医学',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
001.新夷说（代序）.txt|3|狭窄民族史会缩小中国|文化|民族史;中国;狭窄
001.新夷说（代序）.txt|6|中国民族本来多源|文化|民族;多源;历史
001.新夷说（代序）.txt|8|把边疆民族排除在中国之外是短视|文化|边疆民族;中国;短视
001.新夷说（代序）.txt|10|传统民族英雄也可能残杀同族|政治|民族英雄;同族;战争
001.新夷说（代序）.txt|11|异族标准会随历史变化|方法|异族;标准;历史
001.新夷说（代序）.txt|20|中国传统误用种族驱逐|文化|种族;驱逐;文化
001.新夷说（代序）.txt|21|博大民族常有狭窄族群观|文化|民族;族群观;狭窄
001.新夷说（代序）.txt|32|推翻满清不等于实现民族主义|政治|满清;民族主义;革命
001.新夷说（代序）.txt|36|真正民族主义容纳多族共同体|政治|民族主义;多族;共同体
001.新夷说（代序）.txt|37|狭隘民族主义会滑向种族排斥|政治|民族主义;种族排斥;希特勒
001.新夷说（代序）.txt|40|民族主义是西化产品|文化|民族主义;西化;现代观念
001.新夷说（代序）.txt|45|中国传统缺少现代民族主义|文化|中国传统;民族主义;孙中山
001.新夷说（代序）.txt|50|冒牌民族主义靠排斥维持|政治|伪民族主义;排斥;夷狄
001.新夷说（代序）.txt|52|中国人常把同胞化为异族|文化|同胞;异族;化外
001.新夷说（代序）.txt|55|义和团排外是伪民族主义|政治|义和团;排外;伪民族主义
001.新夷说（代序）.txt|56|高调爱国也可能祸国|政治|爱国;祸国;义和团
001.新夷说（代序）.txt|57|近代生存依靠西方制度知识|文化|西方;制度;知识
001.新夷说（代序）.txt|62|洋务运动只学皮毛却可理解|方法|洋务运动;时代背景;西化
001.新夷说（代序）.txt|83|最早西化文献揭示思想起点|方法|上李傅相书;西化;文献
001.新夷说（代序）.txt|85|直接认识西方能产生独立见地|知识|西方;观察;见地
001.新夷说（代序）.txt|90|只学坚船利炮是舍本逐末|政治|洋务运动;坚船利炮;富强
001.新夷说（代序）.txt|93|救国需要彻底西化|政治|救国;西化;孙中山
001.新夷说（代序）.txt|117|传统文明也必须接受淘汰|文化|传统文明;改革;淘汰
001.新夷说（代序）.txt|119|西方新物和东方旧物构成分野|文化|西方;东方;新旧
001.新夷说（代序）.txt|122|义和团思想首先是仇外心态|政治|义和团;仇外;排外
001.新夷说（代序）.txt|123|反排外必须落实制度与行动|政治|反排外;制度;孙中山
001.新夷说（代序）.txt|125|直接西方教育改变思想格局|知识|西方教育;思想;孙中山
001.新夷说（代序）.txt|128|行路读书共同形成世界眼光|知识|游历;阅读;世界眼光
001.新夷说（代序）.txt|276|思想影响不能只按人名统计|方法|思想影响;人物表;西方
001.新夷说（代序）.txt|277|西化教育能重塑世界眼光|文化|西化;世界眼光;革命者
001.新夷说（代序）.txt|284|西化意味着摆脱帝国旧习|文化|西化;帝国习气;现代人
001.新夷说（代序）.txt|292|科学精神必须拒绝迷信附会|文化|科学;迷信;孙中山
001.新夷说（代序）.txt|296|尊重妇女是现代政治原则|法权|妇女;平等;女权
001.新夷说（代序）.txt|308|共和必须废除世袭身份限制|法权|共和;人权;身份限制
001.新夷说（代序）.txt|316|用人不能照顾亲属私情|政治|用人;亲属;能力
001.新夷说（代序）.txt|318|公共贡献不是邀赏资本|人格|公共贡献;勋位;义务
001.新夷说（代序）.txt|320|权利诉求不必伪善遮掩|法权|权利;义务;伪善
001.新夷说（代序）.txt|324|言论管制必须有立法依据|法权|言论自由;报律;立法
001.新夷说（代序）.txt|326|自由不能被曲解为压迫借口|法权|自由;曲解;压迫
001.新夷说（代序）.txt|328|正当主张不能依靠暗杀|政治|暗杀;主张;革命
001.新夷说（代序）.txt|330|对付异议应先公开辩论|政治|异议;辩论;容忍
001.新夷说（代序）.txt|332|文字表达应当爽快明确|写作|文字;表达;明确
001.新夷说（代序）.txt|334|私权受侵应相信法治抗争|法权|私权;诉讼;法治
001.新夷说（代序）.txt|344|科学新理不能从古说附会|知识|科学;古说;附会
001.新夷说（代序）.txt|346|实用著作应重内容而非品题|写作|实用著作;内容;品题
001.新夷说（代序）.txt|348|专业范围之外应谨慎立言|人格|专业;立言;谨慎
001.新夷说（代序）.txt|352|荐人不能受私情牵扯|人格|荐人;私情;原则
001.新夷说（代序）.txt|354|临终仍坚持西医科学立场|知识|西医;科学;孙中山
001.新夷说（代序）.txt|357|盲目崇拜也会遮蔽人物全貌|方法|崇拜;人物;全貌
001.新夷说（代序）.txt|359|选择性引文会把人物塞进主义|方法|选择性引文;马克思主义;曲解
001.新夷说（代序）.txt|362|把革命家孔子化会抹掉革命性|文化|孔子化;革命家;孙中山
001.新夷说（代序）.txt|364|人物神化会复活落伍迷信|文化|神化;迷信;孙中山
001.新夷说（代序）.txt|365|学说命名不能凭空造引文|方法|学说;引文;造谣
001.新夷说（代序）.txt|366|反共不能替代自由民主|政治|反共;自由;民主
001.新夷说（代序）.txt|367|曲解人物最终会变成思想八股|文化|曲解;八股;教条
001.新夷说（代序）.txt|369|革命成功依赖思想变化|政治|革命;思想变化;笔墨
001.新夷说（代序）.txt|372|固有文化不足以支撑现代建国理论|文化|固有文化;建国;西化
001.新夷说（代序）.txt|384|引述名流有时是抵挡政治帽子|写作|引述;名流;政治帽子
001.新夷说（代序）.txt|386|研究人物要恢复被遮蔽的思想面|方法|人物研究;西化;澄清
001.新夷说（代序）.txt|387|医学史位置需要专题研究|知识|医学史;孙中山;专题研究
002.引子——巫医与西潮.txt|2|中国医学史实为巫医史|知识|中国医学;巫医;历史
002.引子——巫医与西潮.txt|13|巫医合流使医学等同迷信|知识|巫医;医学;迷信
002.引子——巫医与西潮.txt|14|改良名目没有切断巫医系统|文化|巫医;中医;改良
002.引子——巫医与西潮.txt|16|旧医失败为西医输入打开转折|知识|西医;旧医;输入
002.引子——巫医与西潮.txt|17|医疗传教推动西医制度进入中国|文化|医疗传教;西医;中国
002.引子——巫医与西潮.txt|19|弃医从政体现有而不有|人格|弃医;革命;转变
002.引子——巫医与西潮.txt|20|历史研究也可以成为思想指南|写作|历史研究;思想指南;西化
003.从“基督”到学医.txt|2|摆脱传统仕绅教育可能是幸运|知识|教育;传统;孙中山
003.从“基督”到学医.txt|32|传道转向学医保留济世精神|文化|传道;学医;济世
003.从“基督”到学医.txt|36|后来革命不能倒灌为最初动机|方法|革命;动机;倒果为因
003.从“基督”到学医.txt|39|套用传统解释容易造成附会|方法|传统解释;附会;学医
003.从“基督”到学医.txt|45|当事自述可以减少胡乱推测|方法|当事自述;动机;史料
003.从“基督”到学医.txt|52|有原则的异议者也值得肯定|人格|孙眉;异议;原则
003.从“基督”到学医.txt|56|断发时间可以检验思想决绝|方法|断发;时间;思想变化
003.从“基督”到学医.txt|59|同学回忆也要校正年限错误|方法|回忆;年限;校正
004.中国第一个西方医院.txt|3|医疗可以为思想传播建立信任|文化|医疗;传教;信任
004.中国第一个西方医院.txt|7|制度创新会连续打开风气|文化|医院;制度创新;医学
004.中国第一个西方医院.txt|9|西医教育提前实践男女同校|知识|西医教育;男女同校;历史
004.中国第一个西方医院.txt|10|新史料能够推翻教育史上限|方法|教育史;新史料;男女同校
004.中国第一个西方医院.txt|15|名称与实际制度必须分别辨明|方法|医院;学校;名称
004.中国第一个西方医院.txt|24|私藏旧课本可以重建传播史|方法|旧课本;西医;传播史
004.中国第一个西方医院.txt|30|人物相识也可能来自偶然|方法|相识;偶然;史料
004.中国第一个西方医院.txt|45|校名错写暴露著述草率|写作|校名;著述;草率
004.中国第一个西方医院.txt|59|机构名称不能凭想象拼凑|方法|机构名称;考证;错误
005.香港第一个西医大学.txt|8|重要西化思想家也会被时势埋没|知识|何启;西化;思想家
005.香港第一个西医大学.txt|15|新思想常先经边缘网络传播|文化|新思想;传播;香港
005.香港第一个西医大学.txt|16|思想影响也取决于行动机会|政治|思想影响;机会;何启
005.香港第一个西医大学.txt|28|教育机构影响可能超出本专业|知识|教育机构;科学;革命
005.香港第一个西医大学.txt|29|专科学校也可达到大学水准|知识|专科学校;大学;医学
005.香港第一个西医大学.txt|31|严格考试必须依赖专业制度|知识|考试;专业;制度
005.香港第一个西医大学.txt|33|少数毕业说明教育质量严格|知识|毕业;教育质量;西医书院
005.香港第一个西医大学.txt|39|目击原件比后人转述更有价值|方法|原件;目击;史料
005.香港第一个西医大学.txt|70|双轨叙事才能还原复杂人物|写作|双轨叙事;人物;改良
005.香港第一个西医大学.txt|75|史实命名应以本证为准|方法|命名;本证;史实
006.“改良”与“革命”之间.txt|15|改良失败会把人推回革命路线|政治|改良;革命;失败
006.“改良”与“革命”之间.txt|18|改良转革命的爆点来自请愿失败|政治|改良;革命;请愿
006.“改良”与“革命”之间.txt|22|依靠开明大员的希望会破灭|政治|李鸿章;改良;革命
006.“改良”与“革命”之间.txt|23|细节丰富的传说仍可能不实|方法|传说;李鸿章;史实
006.“改良”与“革命”之间.txt|29|人物早期立场不能被后来身份覆盖|方法|早期立场;改良;孙中山
006.“改良”与“革命”之间.txt|30|革命宣传不该制造天生革命家|政治|革命宣传;幼年;神话
006.“改良”与“革命”之间.txt|31|革命应当是万不得已的手段|政治|革命;改良;不得已
006.“改良”与“革命”之间.txt|33|改造维新可以具有革命意义|政治|改造;维新;革命
006.“改良”与“革命”之间.txt|34|革命家也可能是改良家|政治|革命家;改良家;孙中山
006.“改良”与“革命”之间.txt|37|史料解释不能强行服务既定结论|方法|史料解释;既定结论;改良
006.“改良”与“革命”之间.txt|44|进化误译会损害演化含义|知识|进化;演化;翻译
006.“改良”与“革命”之间.txt|45|演化眼光反对一蹴而就的革命|政治|演化;革命;改良
006.“改良”与“革命”之间.txt|52|名人口述也可能制造历史谣言|方法|口述;谣言;史实
007.从行医到革命.txt|5|新史料可改变思想路线判断|方法|新史料;改良;孙中山
007.从行医到革命.txt|6|重大转折常是双重放弃|方法|转折;改良;行医
007.从行医到革命.txt|15|推广新制度可以借助自愿服务|方法|西医;自愿服务;推广
007.从行医到革命.txt|25|原始广告能够保存时代细节|方法|广告;原始文件;时代
007.从行医到革命.txt|42|革命选择可以逆转个人经济地位|人格|革命;经济;选择
007.从行医到革命.txt|61|医人和医世决定职业分野|人格|医人;医世;革命
008.回到“医生”，回到“基督”.txt|5|拒绝治疗也要计算现实代价|知识|治疗;代价;孙中山
008.回到“医生”，回到“基督”.txt|14|群体压力会迫使理性者妥协|人格|群体压力;中医;妥协
008.回到“医生”，回到“基督”.txt|22|宗教信仰可以坚持政教分立|法权|宗教;政教分立;信仰自由
008.回到“医生”，回到“基督”.txt|29|史家应承认自己不喜欢的事实|方法|史家;公正;基督教
008.回到“医生”，回到“基督”.txt|64|一部书可以同时纠正史实与视野|写作|写作;史实;视野
008.回到“医生”，回到“基督”.txt|65|出版前审查不能伪装成约定|法权|出版;预审;约定
008.回到“医生”，回到“基督”.txt|66|政党无权预先审核人民出版|法权|政党;出版;预审
008.回到“医生”，回到“基督”.txt|67|立法者也必须服从自己制定的法律|法权|立法者;法律;出版
008.回到“医生”，回到“基督”.txt|68|审查机关扩权会产生管辖荒谬|法权|审查;扩权;管辖
008.回到“医生”，回到“基督”.txt|69|主动交还自由是对先烈的背叛|法权|自由;先烈;医生
008.回到“医生”，回到“基督”.txt|70|专业能力不能代替法政常识|知识|专业能力;法政;常识
008.回到“医生”，回到“基督”.txt|71|拒绝荒唐条件必须切断合作|人格|拒绝;合作;原则
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
if (bodySourceFiles.length !== 8) {
  throw new Error(`Expected 8 body source files, found ${bodySourceFiles.length}`);
}
const sourceParagraphCount = bodySourceFiles
  .reduce((count, fileName) => count + readParagraphs(fileName).length, 0);
if (sourceParagraphCount !== 912) {
  throw new Error(`Expected 912 source paragraphs, found ${sourceParagraphCount}`);
}
const records = buildRecords();
if (records.length !== 125) {
  throw new Error(`Expected 125 records, found ${records.length}`);
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
    note: '本轮从《孙逸仙和中国西化医学》的代序与七章正文中提取思想索引。全书含大段孙中山演说、政令、私人书信、人物表、英文资料及他人回忆；本轮只保留李敖自己的民族史判断、西化评价、史料辨析、改良与革命分析、医学史解释、法权主张和写作方法，不把孙中山或其他被引人物的独立意见计为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
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
  '- 只提取李敖自己的民族史判断、西化评价、史料辨析、政治分析、医学史解释、法权主张和写作方法。',
  '- 孙中山演说、政令、私人书信、人物表、英文资料和他人回忆，不因观点完整而独立列为李敖思想。',
  '- 被引材料只在李敖作出明确评价、反驳、归纳或方法说明的完整段落中随文保留。',
  '- 三十二项洋派作风不逐项密集摘录，仅保留李敖借实例提出的可独立检索判断。',
  '- 提取轮适度展开民族主义、西化、改良革命与出版法权的不同论证层面，供校对轮再做收敛。',
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
