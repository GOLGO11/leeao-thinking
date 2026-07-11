import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '108';
const bookTitle = '李远哲的真面目';
const slug = 'the-truth-about-lee-yuan-tseh';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '010.李远哲的真面目');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
《李远哲的真面目》引言.txt|3|权势会使人以神自居|人格|权势;疯狂;自我神化
《李远哲的真面目》引言.txt|11|封建官场文化会借形式表演权威|文化|官场文化;形式;权威
《李远哲的真面目》引言.txt|12|科学奖荣誉不能由共同族群掠美|文化|科学奖;荣誉;族群
《李远哲的真面目》引言.txt|13|专业成就容易被误当成全能|知识|专业成就;造神;能力边界
《李远哲的真面目》引言.txt|16|国家意见无需借顾问名目破坏体制|政治|国政顾问;国家体制;意见
《李远哲的真面目》引言.txt|20|拆除偶像应从原始证据开始|方法|原始证据;造神;检验
001|9|高级知识分子也可能只有低级伦理|人格|知识分子;伦理;凉薄
001|10|伟大科学家不应乡愿而见义无勇|人格|科学家;乡愿;勇气
001|23|最高研究机关应为科研不彰自省|政治|研究机关;科学研究;责任
001|40|学术迫害常由嫉才和政治迎合合谋|文化|学术迫害;嫉才;政治迎合
001|68|情感好恶不妨碍证据严谨|方法|情感;证据;历史方法
001|77|连续取证不应预设成见|方法|取证;预设成见;实事求是
001|78|关键史料不得隐瞒|方法|关键史料;公开;求证
001|86|推荐诚意要由实际帮助判断|方法|推荐;诚意;实际帮助
001|87|长期不作为会削弱迟来推荐的诚意|方法|不作为;迟来推荐;诚意
001|88|没有回音后不追问显示推荐不诚|方法|回信;追问;推荐
001|102|严师带来的痛苦不能成为忘恩借口|人格|严师;忘恩;借口
001|104|有能力补救旧错却不行动会加深错误|人格|补救;旧错;责任
001|134|师生关系不应妨碍公正推荐|人格|师生关系;推荐;公正
001|139|外行也应借专业文献核验评价|方法|专业文献;外行;核验
001|142|公共园地开放不能因反方沉默被称为单面|写作|公共园地;反方;单面之说
001|143|学术自由是解聘争议的真正关键|法权|学术自由;解聘;争议
001|149|受举证者应主动要求更正|方法|举证;更正;回应责任
001|153|爱人以德不能姑息护短|人格|爱人以德;姑息;护短
002|19|讨论旧文本必须先找到原文|方法|旧文本;原文;核对
002|109|坐享他人斗争成果会产生逃兵内疚|人格|斗争成果;逃兵;内疚
002|110|高级知识分子应以行动推动政治改革|政治|知识分子;政治改革;行动
002|111|人可以回到最初信念重新自省|人格|最初信念;自省;回归
003|2|批评逃兵者也应接受同一标准|人格|逃兵;双重标准;批评
004|4|逃离后回来接收成果比一逃到底更可耻|人格|逃离;接收成果;知耻
005|28|学术界的卑鄙更常披着清高外衣|文化|学术界;清高;卑鄙
007|3|身份标准不应因对象而改变|方法|身份;标准;双重标准
007|7|学术介入政治也必须检验是否正确|政治|学术;政治;检验
007|10|中立清高的形象必须接受行为检验|人格|中立;清高;行为
007|13|政治人物要用事实检验而不是要求承诺|方法|政治人物;事实;承诺
007|14|公开批判必须拿出完整证据|方法|公开批判;完整证据;举证
007|22|无法改变命运时也应选择较小伤害|政治|选择;较小伤害;选举
007|23|放弃投票会把决定权交给别人|政治|投票;决定权;弃权
007|30|公开谈判比秘密交易更能减少损失|政治|公开谈判;秘密交易;损失
007|39|地方荣誉必须接受世界标准|文化|地方荣誉;世界标准;本土化
007|40|关门自大无法改变国际现实|文化|关门自大;国际现实;台湾
008|2|出版形式可以绕开言论审查|写作|出版;言论审查;禁书
008|10|法律不能因人而异|法权|法律;因人而异;行政
008|12|专业成功不等于行政能力|知识|专业;行政能力;专家
008|14|未登记团体无权监督他人|法权|团体登记;监督;合法性
008|18|直接向当事人核验可以揭穿官方说法|方法|当事人;核验;官方说法
008|20|公共声望可能被用来暗示政治选择|政治|公共声望;政治暗示;选举
008|22|好人身份不能排除做坏事的可能|人格|好人;坏事;身份
008|25|批评高声望人物更需要证据|方法|高声望;批评;证据
009|3|国内主权主张必须面对国际承认|政治|主权;国际承认;一个中国
009|4|公职不是人生最重要的履历|人格|公职;履历;人生价值
009|5|小型政治体应先保护和治理人民|政治|政治体;保护人民;治理
009|7|威权时代的沉默者不能突然自称英雄|人格|威权;沉默;英雄
009|13|正义若采用同样残忍的手段就会失去意义|人格|正义;残忍手段;人性
009|14|公职责任不能强迫普通人民共同牺牲|法权|公职责任;人民;牺牲
009|17|政党名称可能在实体消失后继续存在|政治|政党;名称;实体
009|18|卖台指控泛滥会失去辨别力|写作|卖台;政治指控;辨别
010|5|官方安全说法必须接受基础资料核查|方法|官方说法;基础资料;核查
010|18|决策从补强转向拆除必须说明依据|方法|政策转向;补强;拆除
010|32|法律意见提出前已有决定会使审议流于形式|方法|法律意见;预先决定;审议
010|34|反复决策会浪费纳税人的钱|政治|反复决策;公共预算;纳税人
010|35|行政决策不能当作无对错的实验|政治|行政决策;实验;责任
010|41|错误决策可能比贪污更危险|政治|错误决策;贪污;公共损失
010|42|短暂勘察不能取代完整专业鉴定|方法|勘察;专业鉴定;证据
010|43|领导人的肉眼判断不能取代专业技师|知识|领导人;专业技师;判断
010|45|官方公文不得曲解专业鉴定结论|法权|官方公文;专业鉴定;曲解
010|47|公共声明不能选择性引用鉴定报告|方法|公共声明;鉴定报告;选择性引用
010|48|批评别人之前必须先让自身治理经得起检验|人格|批评;自身治理;检验
011|5|反对学官两栖者不应自己违法两栖|人格|学官两栖;双重标准;晚节
011|12|制度不能为单一任职者修改|法权|制度;单一任职者;修法
011|13|备案监督必须真正审查|法权|备案;监督;审查
011|15|个人利益不能凌驾法令制度|法权|个人利益;法令;制度
011|16|故意隐瞒兼职可能构成公文欺骗|法权|隐瞒兼职;公文;欺骗
011|19|违法被揭发后不能再用行政力量掩饰|法权|违法;行政力量;掩饰
011|20|官方声称获得同意就必须拿出证据|方法|官方声明;同意;证据
011|21|私下放水不能推翻公开行文|法权|私下放水;公开行文;监督
011|22|不同制度之间不能随意比照例外|法权|制度;比照;例外
011|23|公职退休后应交还职务附随利益|法权|公职退休;宿舍;附随利益
011|24|知识分子的言论必须接受自身行为检验|人格|知识分子;言论;行为
012|2|当选后不能立即宣布竞选承诺作废|政治|竞选承诺;当选;诚信
012|3|书面政见可以用来检验执政行为|方法|书面政见;执政;检验
012|24|掌权者可能用缓兵之计背弃媒体改革|政治|媒体改革;缓兵之计;掌权
013|16|官方调查报告也必须接受疑点审查|方法|调查报告;疑点;审查
013|17|调查结论必须公开关键事实|方法|调查结论;关键事实;公开
013|18|长期冲突记录与年年甲等不能同时不解释|方法|冲突记录;考绩;矛盾
013|19|不追究行政责任的报告并不完整|方法|行政责任;调查报告;完整性
013|29|独立调查必须回答受害者的制度疑问|方法|独立调查;受害者;制度疑问
013|32|领导者不能推翻部属已经作出的明确承诺|政治|领导者;部属;承诺
013|33|领导者限定调查范围可能预先排除责任|政治|调查范围;领导者;责任
013|35|把陈情转回被控机关不是真正监督|法权|陈情;被控机关;监督
013|51|领导者精力有限不能用外务荒废本职|政治|领导者;外务;本职
013|52|掩盖责任的调查不能称为独立|方法|独立调查;掩盖责任;卸责
013|53|长期未处理已知风险会产生管理责任|政治|已知风险;管理;责任
013|54|道义辞职不能取代行政责任|法权|道义责任;行政责任;辞职
013|55|官员不能用国家的钱弥补自己的错误|法权|公共资金;官员错误;赔偿
013|56|被迫两年后才道歉不算主动负责|人格|迟来道歉;压力;责任
015|6|领导者不尊重读书人会迫使部属离开|人格|领导者;读书人;辞职
015|7|公职进退可以检验知识分子的风骨|人格|公职;知识分子;风骨
015|9|狭窄专业成就不能证明行政能力|知识|专业成就;行政能力;边界
015|10|整合口号可能只带来机构扩张|政治|整合;机构扩张;口号
015|11|复杂到无人敢谈不等于问题已经解决|方法|复杂问题;沉默;解决
015|12|特殊待遇必须透明而光明|法权|特殊待遇;透明;薪酬
015|17|责任应追到真正拥有决策权的人|方法|决策权;责任;档案
015|24|制定标准的人也必须遵守标准|人格|标准;一致性;行为
015|25|现实事件可以检验官方风险说法|方法|现实事件;官方说法;检验
015|26|监督别人以前必须先管好自己的机构|政治|监督;本职;机构治理
016|3|两个专任职务不能同时兼任|法权|专任职务;兼任;排他性
016|18|人事监督应驳回违法待遇|法权|人事监督;违法待遇;驳回
016|28|机构特殊性不能成为超越薪酬法律的理由|法权|机构特殊性;薪酬;法律
016|40|受益者不应亲自核发自己的待遇请求|人格|利益冲突;待遇;核发
016|44|政治同意不能使违法待遇合法|法权|政治同意;违法待遇;合法性
016|47|公文的异常急迫性可能暴露个人特权|方法|公文;最速件;个人特权
017|5|行政会议命令不能凌驾立法机关制定的法律|法权|行政会议;法律;权力边界
017|9|扩张机构任务就是扩张权力|政治|机构任务;扩权;组织法
017|10|增加官位可能假借学术改革之名|政治|扩编;官位;学术改革
017|21|学术研究机关不应同时垄断政策筹议|政治|研究机关;政策筹议;职掌
017|22|机构职掌重叠会制造双头治理|政治|机构职掌;重叠;双头治理
017|23|无法落实的法定任务只是空话|政治|法定任务;落实;空话
017|24|内部选举可能侵蚀学术机构的独立|政治|内部选举;学术机构;独立
017|26|新设机构前应先完成跨部门协调|方法|新设机构;协调;法源
017|27|监督机关面对制度违法而沉默就是失职|法权|监督机关;制度违法;失职
017|28|行政职位必须遵守法定任用资格|法权|行政职位;任用资格;法律
017|29|广泛例外会把违法任用制度化|法权|例外;违法任用;制度化
018|14|重大决定的可信度取决于能否坚持|人格|重大决定;坚持;可信度
018|25|知识群体的劝进会为权力反复提供台阶|文化|知识群体;劝进;权力
018|26|把辞职改称请假是政治语言欺骗|写作|辞职;请假;政治语言
020|11|没有私吞也不能免除程序违法|法权|私吞;行政程序;违法
020|12|四十天无人发现旷职暴露管理失灵|政治|旷职;管理;机构失灵
020|13|借设备应付调查会让错误继续扩大|法权|借设备;调查;掩饰
020|14|上级利用部属后否认知情是一种出卖|人格|上级;部属;否认
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
if (bodySourceFiles.length !== 22) throw new Error(`Expected 22 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 1001) throw new Error(`Expected 1001 paragraphs, found ${sourceParagraphCount}`);

const excludedThirdPartyFiles = bodySourceFiles.filter((name) => /^(014|019|021)\./.test(name));
if (excludedThirdPartyFiles.length !== 3) throw new Error(`Expected 3 third-party files, found ${excludedThirdPartyFiles.length}`);
const liAoSourceFiles = bodySourceFiles.filter((name) => !excludedThirdPartyFiles.includes(name));
if (liAoSourceFiles.length !== 19) throw new Error(`Expected 19 Li Ao files, found ${liAoSourceFiles.length}`);
const liAoParagraphCount = liAoSourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (liAoParagraphCount !== 895) throw new Error(`Expected 895 Li Ao-scope paragraphs, found ${liAoParagraphCount}`);

const specs = parseSpecs(allSourceFiles);
if (specs.length !== 130) throw new Error(`Expected 130 candidate specs, found ${specs.length}`);
const owned = new Set(liAoSourceFiles);
const cache = new Map();
const candidates = specs.map((spec) => {
  if (!owned.has(spec.fileName)) throw new Error(`Third-party file selected: ${spec.fileName}`);
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
if (skippedDuplicates.length !== 46) throw new Error(`Expected 46 skipped duplicates, found ${skippedDuplicates.length}`);
if (retainedCandidates.length !== 84) throw new Error(`Expected 84 retained candidates, found ${retainedCandidates.length}`);

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
    note: '本轮只提取李敖本人明确撰写、定稿、反驳或归纳的独立判断。全书夹有王企祥、林明璋、潘毓刚、郭中一、杨国枢、中研院调查委员会及匿名检举者的长篇文字，其中独立观点不转列为李敖思想；014、019、021 三个主体为他人来稿的文件整体排除。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    li_ao_source_file_count: liAoSourceFiles.length,
    li_ao_file_paragraph_count: liAoParagraphCount,
    candidate_count: candidates.length,
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: skippedDuplicates.length,
    skipped_duplicates: skippedDuplicates,
    excluded_third_party_files: excludedThirdPartyFiles,
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
  `- 李敖署名及定稿范围文件数：${liAoSourceFiles.length}`,
  `- 李敖署名及定稿范围段落数：${liAoParagraphCount}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖本人明确撰写、定稿、反驳或归纳的学术权威边界、制度监督、行政责任、证据方法、政治判断和知识分子人格。',
  '- 王企祥、林明璋、潘毓刚、郭中一、杨国枢、中研院调查委员会及匿名检举者的长篇文字，只在李敖明确评价或归纳的完整段落中随文保留。',
  '- 014、019、021 三个文件的主体是他人来稿，整体排除，不把来稿作者的独立观点转列为李敖思想。',
  '- 单纯案情材料、公文原文、被引文章、人物履历、骂人和宣传附注不建项。',
  '- 与既有总表源文完全相同的段落只记录重复来源，不重复建项。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 排除文件', '',
  ...excludedThirdPartyFiles.map((name) => `- ${name}`), '',
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
  li_ao_source_file_count: liAoSourceFiles.length,
  li_ao_file_paragraph_count: liAoParagraphCount,
  excluded_third_party_file_count: excludedThirdPartyFiles.length,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
