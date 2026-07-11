import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '114';
const bookTitle = '蒋介石研究';
const slug = 'chiang-kai-shek-research';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '016.蒋介石研究');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
序|2|研究暴君是在为国民争人格|人格|暴君;国民人格;研究
序|3|憎恶对象仍须凭证据写历史|方法|憎恶;证据;历史写作
序|4|揭穿美化不等于刻意丑化|写作|美化;丑化;历史批评
001|8|违反常识的传记说法须受怀疑|方法|常识;传记;怀疑
001|9|照片可以直接推翻文字神话|方法|照片;文字;历史神话
001|12|同期回忆可以反证官方年表|方法|同期回忆;官方年表;反证
002|6|内部钦定履历会成为宣传模板|政治|履历;宣传;内部刊物
002|18|史料可信度须考察出版和作者背景|方法|出版背景;作者;可信度
002|19|互相矛盾的回忆会暴露历史疑点|方法|回忆;矛盾;历史疑点
002|29|叙述者可用语意暗示制造错误印象|写作|暗示;印象;叙述
002|44|刻意牵连学校制度会制造学历联想|写作|学校制度;学历;联想
002|61|完整名册可以否定虚构学历|方法|名册;学历;反证
002|66|引用回忆也须校正其中事实错误|方法|回忆;事实错误;校正
002|69|本人自述可以反证官方学历|方法|本人自述;学历;反证
002|71|历史术语须按制度中的固定定义|方法|术语;制度;定义
002|76|教育阶段必须依制度顺序严格区分|知识|教育阶段;制度;学历
002|77|多种证据可以还原真实学历|方法|多种证据;学历;还原
003|13|组织成立时间须由同期成员记录确认|方法|组织;成立时间;同期记录
003|15|局部说法应按其他可靠信息判断|方法|局部说法;可靠信息;判断
003|27|成员名单的交叉汇总可以检验身份|方法|成员名单;交叉汇总;身份
003|31|加入时间可以判断成员是否为创始者|方法|加入时间;创始者;组织
003|32|史料无征不能事后追加政治资历|方法|史料无征;政治资历;追加
004|3|继承人神话会让其他历史人物淡出|政治|继承人;神话;历史人物
004|6|政治宣传会把相识时间不断提前|政治|政治宣传;相识时间;神话
004|22|多种官方年表同文可确认宣传定说|方法|官方年表;同文;宣传
004|26|官方机构出版的传记应视为权力自述|方法|官方机构;传记;权力
004|32|作者与权力关系影响传记可信度|方法|作者;权力关系;传记
004|41|虚构学历会继续污染其他历史叙事|写作|虚构学历;历史叙事;污染
004|47|自称客观不能替代事实证据|方法|客观;事实;证据
004|56|权力亲信的著述不能当作独立证言|方法|权力亲信;著述;独立证言
004|62|同一著作前后矛盾会削弱历史判断|方法|著作;前后矛盾;历史判断
004|64|外部行程可以直接排除不可能日期|方法|外部行程;日期;排除
004|65|应比对人物历年自述以确定事实|方法|历年自述;比对;事实
004|72|跨时期自述可以揭露历史矛盾|方法|跨时期;自述;矛盾
004|74|年龄换算可以检验政治履历|方法|年龄;换算;政治履历
004|75|同一人的入党年份须接受前后核对|方法|入党年份;前后核对;自述
004|78|本人无意间的自述可推翻官方神话|方法|本人自述;官方神话;反证
004|82|本人自述可确定首次会见时间|方法|本人自述;会见时间;确定
004|83|默许有利神话也是一种政治选择|人格|默许;有利神话;政治选择
005|6|让史料说话也会得到权力不愿见的真相|方法|史料;权力;真相
005|13|行动时间占比可以校正英雄传记|方法|时间占比;英雄传记;校正
005|15|人物行为模式可以用连续事件统计|方法|行为模式;连续事件;统计
005|64|持续天数和在场名单能校正共患难神话|方法|持续天数;在场名单;神话
005|65|历史叙事不应抹杀更早承担风险的人|人格|历史叙事;风险;公允
005|73|连续函电能显示人物对责任的逃避|方法|函电;责任;逃避
005|99|按时间排比可以发现持续行为模式|方法|时间排比;行为模式;历史
006|6|当事人的传统解释应接受情理检验|方法|传统解释;情理;检验
006|9|家庭结构可以解释葬俗选择|文化|家庭结构;葬俗;解释
006|10|后来的实地调查可以验证历史推论|方法|实地调查;历史推论;验证
006|15|社会身份会影响传统礼俗选择|文化|社会身份;传统礼俗;选择
007|2|篡夺革命会转而清除革命同志|政治|篡夺革命;革命同志;清除
007|3|评价革命应区分边缘行动和腹地实践|方法|革命;边缘行动;腹地实践
007|7|传记中的时间空白可能是在隐藏迫害|方法|传记;时间空白;迫害
007|26|死后褒扬不能抹去生前迫害|人格|死后褒扬;生前迫害;历史
008|8|党内第一手控诉可以补足官方历史|方法|党内控诉;第一手资料;官方历史
008|9|身后赞词应与生前控诉相互对照|方法|身后赞词;生前控诉;对照
009|2|公开文献的沉默可能掩盖秘密权力关系|方法|公开文献;沉默;秘密权力
009|4|秘密讲话可以还原统治者的真实制度观|方法|秘密讲话;统治者;制度观
009|7|把特务视为领袖工具是否定个人意志|政治|特务;领袖工具;个人意志
009|13|内部材料可以显示特务体系的权力等级|政治|内部材料;特务体系;权力等级
010|3|删去批评性文字会扭曲政治宣言|写作|删节;批评;政治宣言
010|16|文件日期可以检验后来包装的动机|方法|文件日期;动机;包装
010|23|人物言行应与本人宣称的标准对照|人格|人物言行;本人标准;对照
011|4|政治人物会对不同对象重复使用同一套话|写作|政治人物;套话;对象
011|7|同一称谓的多次使用可以揭穿虚情|方法|称谓;多次使用;虚情
012|4|御用传记的夹缝也可能保存相反事实|方法|御用传记;夹缝;相反事实
012|12|中英文版本对读可以确认隐藏事实|方法|中英文;版本对读;隐藏事实
012|13|仔细阅读宣传材料也能发现真相|方法|宣传材料;细读;真相
013|19|外国作者的中国史判断仍须本地史料校正|方法|外国作者;本地史料;校正
013|24|名义职权和实际控制必须严格区分|法权|名义职权;实际控制;区分
013|38|日记时间线可以反驳公开答复|方法|日记;时间线;公开答复
013|41|亲属记述可以反证当事人声明|方法|亲属记述;当事人声明;反证
013|46|御用传记也可能承认违宪事实|方法|御用传记;违宪;事实
013|51|无公职者支配国库违反法治|法权|无公职;国库;法治
013|54|私人权力不能凌驾代总统职权|法权|私人权力;代总统;职权
013|62|纪念文字的遗漏可以反推秘密角色|方法|纪念文字;遗漏;秘密角色
013|89|交出总统职务后即不再拥有总统权力|法权|总统职务;权力;宪法
013|98|公开引退与幕后控制的矛盾可以互证|方法|公开引退;幕后控制;互证
013|100|翻译错误应回到原文纠正|写作|翻译错误;原文;纠正
013|102|评价政策须同时计算获益和失去的支持|方法|政策;获益;支持
014|2|回忆录和未公开文件合读可以补足真相|方法|回忆录;未公开文件;真相
014|19|节目内的自由不是真正采访自由|政治|采访自由;节目;控制
014|20|秘密文件可以揭穿公开采访的布置|方法|秘密文件;公开采访;布置
014|27|幕后指示可以证明宣传活动是有意表演|政治|幕后指示;宣传;表演
014|31|邀请记者又秘密监控是政治宣传的矛盾|政治|记者;秘密监控;政治宣传
014|37|撤退成功的说法也会反证此前失败|方法|撤退成功;此前失败;反证
015|19|文件互勘可以确认当事人是否承认失败|方法|文件互勘;当事人;失败
015|26|多份自述合读才能完整确定责任|方法|多份自述;责任;完整
016|12|政治承诺应按时间顺序连续排比|方法|政治承诺;时间顺序;排比
016|20|明确期限的政治承诺必须接受兑现检验|政治|明确期限;政治承诺;兑现
016|24|期限将至才修改承诺是在逃避责任|人格|修改承诺;期限;责任
016|30|反攻条件的逻辑必须符合军事常识|方法|反攻条件;逻辑;军事常识
016|34|短期内反复改期会暴露承诺失信|政治|反复改期;承诺;失信
016|36|列表可以呈现政治承诺的连续变化|方法|列表;政治承诺;变化
016|39|表格能够使文字戏法显出原形|方法|表格;文字戏法;检验
016|41|超过承诺期限即可检验政治信用|政治|承诺期限;政治信用;检验
016|44|政治预言可以由事后日期直接验证|方法|政治预言;事后日期;验证
016|58|相信政治时间表前应先调查信用记录|方法|政治时间表;信用记录;调查
016|63|不可预见不能无限取消既有承诺|人格|不可预见;既有承诺;责任
016|72|小规模承诺同样必须按期兑现|政治|小规模承诺;按期;兑现
016|76|法律与宪法抵触时应以宪法为准|法权|法律;宪法;抵触
016|77|长期使用例外理由会架空宪政承诺|法权|例外理由;宪政;承诺
016|82|没有信用的时间表不具有约束价值|政治|信用;时间表;约束
017|3|领袖吹嘘穿帮后不能用幽默卸责|人格|领袖;吹嘘;责任
017|8|权力人物以第一人称神化自己是自大|人格|权力人物;自我神化;自大
017|9|自称领袖和训词暴露帝王心态|政治|自称领袖;训词;帝王心态
017|11|统治者亲笔自称救星是个人崇拜|政治|统治者;救星;个人崇拜
018|9|政治附庸风雅会扰乱学术问题|文化|政治;附庸风雅;学术
018|14|不学却强谈学术更暴露无知|人格|不学;学术;无知
019|3|知识分子投靠权力会失去独立性|人格|知识分子;权力;独立
019|4|帝王权力和御用学者会相互需要|文化|帝王权力;御用学者;依附
019|16|权力的亲疏安排可以操纵知识分子|政治|亲疏;权力;知识分子
019|27|公帑不能由领袖个人市恩|法权|公帑;领袖;市恩
019|37|总统复职必须遵守宪法程序|法权|总统复职;宪法;程序
019|38|临时条款不能绕过总统任期限制|法权|临时条款;总统任期;限制
019|40|权力会用召见和质问压迫学者表态|政治|召见;质问;学者
019|45|独裁者往往要掌权至死|政治|独裁者;掌权;至死
019|46|经济依附会改变学者的公共立场|人格|经济依附;学者;公共立场
019|50|依附独裁者会使师长人格破裂|人格|独裁者;师长;人格
020|2|遗嘱中的政治资历仍须由年代检验|方法|遗嘱;政治资历;年代
020|9|宗教自述应与长期实际行为对照|方法|宗教自述;实际行为;对照
020|11|连续行为模式可以验证私人信仰|方法|连续行为;私人信仰;验证
020|15|混合信仰会推翻单一宗教身份|文化|混合信仰;宗教身份;反证
021|15|生育时间可以反证官方行程年表|方法|生育时间;官方年表;反证
021|17|数学换算可以校正传记中的留学叙事|方法|数学换算;传记;留学
021|21|史料矛盾值得继续查证而非回避|人格|史料矛盾;查证;责任
022|10|家族实践可能违反自称维护的正统文化|文化|家族实践;正统文化;矛盾
022|13|经典禁令可以反证民俗曾经普遍|方法|经典禁令;民俗;反证
022|16|民俗传统不等于经典正统|文化|民俗传统;经典;正统
022|17|继承制度必须区分大宗和小宗|知识|继承制度;大宗;小宗
022|23|传统制度判断必须同时满足多项规则|方法|传统制度;多项规则;判断
022|25|后代实际行为可以检验形式上的过继|方法|后代行为;过继;检验
022|28|所谓族规也应放回一般文化制度判断|文化|族规;文化制度;判断
`.trim();

function sourceFiles() {
  return fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt') && !name.includes('目录'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/\r/g, '')
    .split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
}

function parseSpecs(allSourceFiles) {
  return specLines.split(/\n+/).map((line, index) => {
    const [fileToken, paragraphText, title, category, keywordText, ...extra] = line.split('|');
    if (extra.length || !fileToken || !paragraphText || !title || !category || !keywordText) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    if (!categorySet.has(category)) throw new Error(`Invalid category ${category}`);
    const matches = fileToken === '序'
      ? allSourceFiles.filter((name) => name.includes('自序'))
      : allSourceFiles.filter((name) => name.startsWith(`${fileToken}.`));
    if (matches.length !== 1) throw new Error(`Cannot resolve source token: ${fileToken}`);
    return {
      fileName: matches[0],
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
  const lines = [`# ${bookTitle} 思想索引（${round}）`, '', `- 书名：${bookTitle}`, `- 条目：${records.length}`, '- 说明：标题用于检索浓缩，description 保留源文本原段落。', ''];
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
if (allSourceFiles.length !== 23) throw new Error(`Expected 23 source files, found ${allSourceFiles.length}`);
const paragraphMap = new Map(allSourceFiles.map((name) => [name, paragraphs(name)]));
const sourceParagraphCount = [...paragraphMap.values()].reduce((sum, items) => sum + items.length, 0);
if (sourceParagraphCount !== 946) throw new Error(`Expected 946 paragraphs, found ${sourceParagraphCount}`);

const specs = parseSpecs(allSourceFiles);
const candidates = specs.map((spec) => {
  const sourceParagraphs = paragraphMap.get(spec.fileName);
  const description = sourceParagraphs[spec.source_paragraph - 1];
  if (!description) throw new Error(`Missing paragraph: ${spec.fileName}#${spec.source_paragraph}`);
  if (spec.source_paragraph === 1 || /李敖影音E书|李敖数字博物馆|资源下载站|油管\/抖音/.test(description)) {
    throw new Error(`Selected structural paragraph: ${spec.fileName}#${spec.source_paragraph}`);
  }
  return { ...spec, description, source_path: path.join(sourceBookDir, spec.fileName) };
});

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const candidate of candidates) {
    if (seen.has(candidate[key])) throw new Error(`Duplicate candidate ${key}: ${candidate.fileName}#${candidate.source_paragraph}`);
    seen.set(candidate[key], candidate);
  }
}

const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const priorByDescription = new Map();
for (const record of master.records) {
  if (record.book !== bookTitle && !priorByDescription.has(record.description)) priorByDescription.set(record.description, record);
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
  } else retainedCandidates.push(candidate);
}

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
  source_path: spec.source_path,
  keywords: spec.keywords,
}));

const structuralExclusions = {
  titles: allSourceFiles.length,
  production_credits: allSourceFiles.length * 5,
  source_quotations_and_subheads: sourceParagraphCount - allSourceFiles.length - (allSourceFiles.length * 5) - candidates.length,
};
const payload = {
  generated_at: new Date().toISOString(),
  book: {
    sequence,
    title: bookTitle,
    slug,
    sourceDir: sourceBookDir,
    round,
    status,
    note: '本轮只提取李敖自序及考证正文中可独立检索的方法、政治、法权、人格、文化与写作判断。官方年表、他人回忆、档案、电文、名单和长篇引文只作证据，不直接转列为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: allSourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    structural_exclusions: structuralExclusions,
    candidate_count: candidates.length,
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: skippedDuplicates.length,
    skipped_duplicates: skippedDuplicates,
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
  `- 源文件：${allSourceFiles.length}`,
  `- 源段落：${sourceParagraphCount}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 保留李敖本人明确表达、可以脱离单一史实独立检索的史料批评、年代校勘、制度辨析、权力责任及知识分子人格判断。',
  '- 官方年表、传记、日记、电文、回忆录、成员名单和制度原文仅作为证据，不把被引作者的判断记在李敖名下。',
  '- 相同方法若分别使用照片、名册、自述、版本、时间线、表格或法律层级等不同证据路径，提取轮暂予保留，待校对轮再收敛。',
  '- 纯人物辱骂、章节小标题、长篇史料转录、日期署名、注释和数字版制作附注不单独建项。',
  '- 与既有总表源文完全相同的段落只记录重复来源，不重复建项。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 重复来源', '',
  ...(skippedDuplicates.length ? skippedDuplicates.map((item) => `- ${item.source_file}#${item.source_paragraph} = ${item.previous_book} ${item.previous_id}`) : ['- 无']), '',
  '## 分类统计', '',
  ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  candidates: candidates.length,
  records: records.length,
  source_file_count: allSourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
