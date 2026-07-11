import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '109';
const bookTitle = '你不知道的彭明敏';
const slug = 'the-peng-ming-min-you-do-not-know';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '011.你不知道的彭明敏');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
《你不知道的彭明敏》引言.txt|3|历史记录应为社会热潮保留冷静面|方法|历史记录;社会热潮;冷静
《你不知道的彭明敏》引言.txt|4|知识分子的尊严不容政治牺牲朋友|人格|知识分子;尊严;朋友
《你不知道的彭明敏》引言.txt|6|严厉批评仍应保留人物的光明面|人格|批评;人物;光明面
001|12|对照原刊可以发现书本删改|方法|原刊;书本;删改
001|14|逐字比对可以揭穿粗糙圆谎|方法|逐字比对;圆谎;文本
001|38|批评朋友仍须承认真实情谊|人格|朋友;批评;情谊
001|42|拒绝权势收买才能守住志气|人格|权势;收买;志气
001|43|偶然因素也会引爆政治事件|方法|偶然因素;政治事件;历史
001|46|公共形象使私德成为公共问题|人格|公共形象;私德;责任
001|74|行为不检会给政治对手留下把柄|人格|行为;政治对手;把柄
001|78|革命者应准备承担行动后果|人格|革命者;行动;后果
001|97|屈辱式宽大只会加深仇恨|政治|宽大;屈辱;仇恨
001|102|回忆叙述必须接受同时代证据检验|方法|回忆;同时代证据;检验
001|104|政治被告应利用公开审判表达信念|法权|政治被告;公开审判;信念
001|109|当事人自述可以反证审讯事实|方法|当事人;自述;审讯
001|117|预先否认会暴露预期中的指控|方法|预先否认;指控;推断
001|118|正人君子形象必须接受行为检验|人格|正人君子;形象;行为
001|121|判决书可能选择性呈现犯罪事实|方法|判决书;犯罪事实;选择
001|134|错误标示消息来源会制造政治危险|写作|消息来源;标示;政治危险
001|135|政治目的不能成为出卖朋友的理由|人格|政治目的;朋友;出卖
001|139|刊登攻击也应刊登当事人答辩|写作|攻击;答辩;公平
001|145|电视镜头前的谈话不能推作私言|写作|电视;公开谈话;私言
001|148|救援姿态可能掩盖先前的伤害|人格|救援;伤害;双面
001|149|复杂人格可能同时伤人救人|人格|复杂人格;伤人;救人
001|158|版本比较可以发现隐秘删节|方法|版本;比较;删节
001|159|权势出现后才来的拥护未必真诚|人格|权势;拥护;真诚
001|169|政治先行者应被始终如一地感怀|人格|政治先行者;感怀;慎终
001|181|不予评论也可能模糊事实|写作|不予评论;事实;模糊
001|185|第一流知识分子应影响政治而不涉足政治|政治|知识分子;政治;独立
001|191|知识分子应领导思想而不卷入政治|政治|知识分子;思想;政治
001|195|独立成功仍不能消除强邻难题|政治|独立;强邻;国际关系
001|197|尚未掌权也可能先为权势遗忘朋友|人格|权势;忘友;掌权
001|206|知识分子放弃是非追逐权力就是堕落|人格|知识分子;是非;权力
001|210|文字删改会变造历史真相|写作|文字删改;历史;真相
001|212|公共人物应以历史位置约束权欲|人格|公共人物;历史位置;权欲
001|213|总统权力必须受到宪政结构限制|法权|总统;权力;宪政
002|13|极权常用动听牺牲口号强迫服从|政治|极权;牺牲口号;服从
002|15|领袖崇拜既制造恐惧也索求爱戴|政治|领袖崇拜;恐惧;爱戴
002|17|翻译应避开既有词语的情感负担|写作|翻译;词语;情感负担
002|19|独裁失败必须依靠自由人的努力|政治|独裁;自由人;努力
002|21|政治意识低落时文人宜先建设理论|文化|政治意识;文人;理论
002|41|国家道德会随政治思想演变|文化|国家道德;政治思想;演变
002|42|第一流文人不肯再做权力鹰犬|人格|文人;权力;鹰犬
003|5|反对运动也会遗忘早期受难者|人格|反对运动;受难者;遗忘
003|14|人权救援应超越意识形态界限|法权|人权救援;意识形态;界限
003|24|保护消息来源可以由自己承担责任|人格|消息来源;责任;保护
003|28|斗争变容易后最容易遗忘老路工|人格|斗争;先行者;遗忘
004|3|解严后必须兑现人民的上诉权|法权|解严;上诉权;宪法
004|33|思想内容不能替代犯罪证据|法权|思想;犯罪证据;判决
004|34|公开交往不能被罗织为秘密联络|法权|公开交往;秘密联络;罗织
004|35|携带密封信件本身不构成犯罪|法权|密封信件;犯罪;知情
004|36|阅读历史文件不等于参与政治组织|法权|历史文件;阅读;政治组织
004|37|向人权机构公布政治犯名单并非犯罪|法权|人权机构;政治犯;名单
004|40|对立双方的利益可能共同做大案件|政治|对立双方;利益;案件
004|55|案发时形成的文件具有更强证据力|方法|原始文件;证据力;案发
004|64|承认冤枉却不纠正是制度利益作祟|法权|冤枉;纠正;制度利益
004|65|强迫自白若无补强证据不得定罪|法权|强迫自白;补强证据;定罪
004|69|让被控机关自查刑求只是表演|法权|刑求;自查;监督
004|71|法律开脱不能抹去道德历史责任|人格|法律;道德;历史责任
004|74|刑求者会用被迫自白完成自我欺骗|人格|刑求;自白;自欺
004|75|特别法与宪法权利应优先保障上诉|法权|特别法;宪法;上诉
005|2|优良定本可以驱逐粗劣版本|写作|定本;版本;出版
005|19|少数人的抵抗更能显出时代压力|政治|抵抗;少数;时代
005|43|政治判断必须检验官方介入的现实可能|方法|官方介入;现实;检验
005|78|反对者返乡可能被解释成政权招安|政治|返乡;招安;政治形象
005|80|政治行动方式应配合个人长处|方法|政治行动;个人长处;选择
005|82|反威权可以跨越统独分歧|政治|反威权;统独;自由民主
006|4|出版使命可以高于营利目的|写作|出版;使命;营利
006|5|版权授权必须服从契约地域范围|法权|版权;契约;地域
006|6|选书应重作品质量而非私人关系|写作|选书;作品质量;私人关系
006|8|新版本应同时追求真相与文本完整|写作|版本;真相;文本
006|10|禁书损失应归责查禁者|法权|禁书;损失;查禁
006|11|未经授权的声明不能代表当事人|法权|授权;声明;当事人
006|12|政治批评必须先核验事实依据|方法|政治批评;事实;核验
006|13|批评政权者也要检验自己的依赖|人格|批评政权;依赖;自省
006|14|迫使政权依自己的法律行事也是斗争|法权|政权;法律;斗争
006|15|政治打拼必须见诸行动|人格|政治;行动;勇气
007|3|政治新贵会挤开早期先行者|政治|政治新贵;先行者;排挤
007|4|朋友之道不能为政治手段牺牲|人格|朋友;政治手段;牺牲
007|6|对绝交者说公道话才见政治气度|人格|绝交;公道;政治气度
008|4|核心指控消失后附属罪名失去基础|法权|核心指控;罪名;基础
008|5|共同聚会不能证明正式组织存在|法权|聚会;组织;证明
008|7|罗织组织罪名是特务政治的倒退|政治|组织罪名;特务政治;罗织
009|3|政治挂帅会使知识分子失去所守|人格|政治挂帅;知识分子;尊严
009|4|可以利用任职揭露法律自相矛盾|法权|任职;法律;矛盾
009|8|知识分子不应成为政党打手|人格|知识分子;政党;打手
009|9|个人价值不必等待官方复权|人格|个人价值;复权;官方
009|10|忠奸标准不能交由政权裁定|人格|忠奸;标准;政权
010|4|言论管制可以利用管辖边界周旋|法权|言论管制;管辖;周旋
010|6|取得交易凭证可以揭穿查禁说法|方法|交易凭证;查禁;证据
010|7|暂不追究违法有时更利于读者|方法|追究;违法;读者
010|9|知识分子不应集体依附政治人物|人格|知识分子;政治人物;独立
011|19|出版处分超过法定期限即失效|法权|出版;处分;法定期限
011|23|政治返乡必须精算声望代价|方法|返乡;声望;代价
012|4|公开私人书信可以粉碎政治谣言|写作|私人书信;谣言;公开
012|5|公开信函必须全文无删并呈现原件|写作|公开信函;全文;原件
012|7|发表私人书信应由发表者承担责任|人格|私人书信;发表;责任
012|8|谦和不能埋没知识分子的尊严|人格|谦和;知识分子;尊严
012|10|政治判断应区分实质理由与程序条件|方法|实质理由;程序条件;判断
012|11|为他人争取救济比只求自身更高贵|人格|救济;他人;品格
013|4|资源不足也可以用办报持续抵抗|写作|办报;抵抗;资源
013|5|小篇幅可以换取长期实际效果|写作|篇幅;长期;效果
014|10|认真前辈会坦白纠正微小错误|人格|前辈;纠错;认真
014|14|日记不足以穷尽人物的隐藏品德|方法|日记;人物;品德
015|10|威权开放也可能是吸纳反对者的手段|政治|威权;开放;吸纳
015|11|进入旧政权会使反对者失去理想|人格|旧政权;反对者;理想
015|13|拒绝从政可以保存反对者的独立|人格|从政;独立;反对者
015|14|革命成功后退出组织可以避免腐化|人格|革命;组织;腐化
016|6|职业写作不能依赖灵感|写作|职业写作;灵感;训练
016|8|报纸的首要价值在于内容可读|写作|报纸;内容;可读
016|20|政治转变必须由实际行动证明|人格|政治转变;行动;证明
016|22|公民投票结果不必然代表正确判断|政治|公民投票;判断;多数
016|28|强制洗脑可能使反抗者更加顽强|政治|洗脑;反抗;顽强
016|32|政治运动常在成功后遗忘受难先驱|人格|政治运动;先驱;遗忘
016|34|公共苦难比一家亲情更有写作分量|写作|公共苦难;亲情;写作
016|37|优秀人才陷入政党政治是一种浪费|政治|人才;政党政治;浪费
016|39|暴君统治之后仍可能出现暴民统治|政治|暴君;暴民;统治
017|4|政治通缉可能只是权力需要的具文|法权|通缉;权力;具文
017|15|荒谬官样文章也值得作为史料保存|写作|官样文章;史料;保存
018|14|揭露不义需要承担现实风险|人格|揭露;不义;风险
018|16|内部措辞可以反推文件的机构来源|方法|内部措辞;文件;机构
018|17|公开证据是抵抗非法监听的办法|法权|证据;监听;公开
019|28|秘密文件可以揭示公开政策背后的机制|方法|秘密文件;政策;机制
019|29|政权会用罪名化命名制造叛国形象|写作|命名;罪名;叛国
019|30|提拔地方精英也可能是政治控制手段|政治|地方精英;提拔;控制
019|31|国家教育与金钱可以被用来制造忠诚|政治|国家教育;金钱;忠诚
019|32|海外资助也可能服务政治争取|政治|海外资助;留学生;争取
019|33|政权会借非官方刊物发动抹黑|写作|政权;刊物;抹黑
019|34|严密监视仍可能掩盖情报失灵|政治|监视;情报;失灵
020|5|政治运动应以自由民主为根本|政治|政治运动;自由民主;根本
020|7|独立主张必须说明现实可行办法|政治|独立;可行性;办法
020|8|提不出具体办法的号召只是愿望|方法|具体办法;号召;愿望
020|9|先知必须持续走在群众前面|人格|先知;群众;进步
020|10|友情不能成为宽容大是大非错误的理由|人格|友情;是非;错误
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
if (sourceParagraphCount !== 970) throw new Error(`Expected 970 paragraphs, found ${sourceParagraphCount}`);

const excludedThirdPartyRanges = [
  { fileToken: '002', start: 46, end: 100, owner: '彭明敏文章及附注' },
  { fileToken: '005', start: 84, end: 120, owner: '彭明敏序文、吕佳真文章及附注' },
  { fileToken: '014', start: 17, end: 32, owner: '彭明敏文章及附注' },
  { fileToken: '020', start: 13, end: 42, owner: '彭明敏、谢聪敏附录及附注' },
];
const excludedThirdPartyParagraphCount = excludedThirdPartyRanges
  .reduce((sum, range) => sum + range.end - range.start + 1, 0);
if (excludedThirdPartyParagraphCount !== 138) {
  throw new Error(`Expected 138 excluded embedded paragraphs, found ${excludedThirdPartyParagraphCount}`);
}

const specs = parseSpecs(allSourceFiles);
if (specs.length !== 134) throw new Error(`Expected 134 candidate specs, found ${specs.length}`);
const cache = new Map();
const candidates = specs.map((spec) => {
  const excludedRange = excludedThirdPartyRanges.find((range) => (
    spec.fileName.startsWith(`${range.fileToken}.`)
      && spec.source_paragraph >= range.start
      && spec.source_paragraph <= range.end
  ));
  if (excludedRange) {
    throw new Error(`Third-party range selected: ${spec.fileName}:${spec.source_paragraph}`);
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
if (skippedDuplicates.length !== 8) throw new Error(`Expected 8 skipped duplicates, found ${skippedDuplicates.length}`);
if (retainedCandidates.length !== 126) throw new Error(`Expected 126 retained candidates, found ${retainedCandidates.length}`);
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
    note: '本轮只提取李敖本人明确撰写、答问、反驳或归纳的独立判断。彭明敏文章、回忆录序文、吕佳真文章、谢聪敏附录、匿名投书、新闻材料、司法文书和秘密档案中的独立观点不转列为李敖思想；只在李敖明确评论、推论或总结的原段落中随文保留。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    excluded_third_party_paragraph_count: excludedThirdPartyParagraphCount,
    excluded_third_party_ranges: excludedThirdPartyRanges,
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
  `- 明确排除的内嵌他人文本段落：${excludedThirdPartyParagraphCount}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖本人明确撰写、答问、反驳或归纳的历史方法、出版判断、政治观点、法权主张和知识分子人格。',
  '- 彭明敏文章、回忆录序文、吕佳真文章、谢聪敏附录和匿名投书中的独立观点全部排除。',
  '- 新闻材料、司法文书、秘密档案只作为李敖论证所用材料，不把文件作者的判断转列为李敖思想。',
  '- 单纯案情材料、公文原文、被引文章、人物履历、骂人和宣传附注不建项。',
  '- 与既有总表源文完全相同的段落只记录重复来源，不重复建项。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 排除范围', '',
  ...excludedThirdPartyRanges.map((range) => `- ${range.fileToken} 第 ${range.start}-${range.end} 段：${range.owner}`), '',
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
  excluded_third_party_paragraph_count: excludedThirdPartyParagraphCount,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
