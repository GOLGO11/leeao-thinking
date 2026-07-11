import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '115';
const bookTitle = '蒋介石研究续集';
const slug = 'chiang-kai-shek-research-sequel';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '017.蒋介石研究续集');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
序|3|长期掌权者可造成长期祸害|政治|长期掌权;祸国;统治者
序|4|形式归政不等于实际失权|政治|归政;实际权力;下野
序|5|统治迷雾使历史理由仍待追踪|方法|统治迷雾;历史追踪;真相
序|6|资料封锁中仍应挺身做自由人|人格|资料封锁;自由人;奋笔
001|3|多源成员考证可推翻领袖履历|方法|成员考证;多源史料;领袖履历
001|4|权力会以元首名义查禁史实研究|法权|查禁;元首;史实研究
001|5|同一史实会因研究者不同遭禁|法权|史实;研究自由;出版管制
001|45|私书官书可交叉排除虚构成员|方法|私书;官书;交叉验证
001|46|官书反证会暴露查禁逻辑|写作|官书;反证;查禁逻辑
002|11|宣传照片会预设亲密战友叙事|写作|宣传照片;战友叙事;伏图
002|12|图文叙事不应遮蔽其他参与者|方法|图文叙事;参与者;遮蔽
002|14|同时期年表可补足照片外的人物|方法|年表;照片;人物考证
002|15|原版照片可揭穿政治修版|方法|原版照片;修版;变造
002|16|抹去他人以突出领袖是宣传伎俩|政治|抹去;领袖;政治宣传
003|3|政治批判不能以粗制滥造损伤公信力|写作|政治批判;史学训练;公信力
003|69|旁征博引不能替代基础史料功力|方法|旁征博引;基础史料;史学方法
003|70|间接转述的证据力有限|方法|间接转述;证据力;史料
003|73|官方自认材料也须评估含糊程度|方法|官方材料;自认;含糊记述
003|75|关键一手记述胜过堆砌旁证|方法|一手记述;旁证;证据力
003|86|作者与权力的关系决定材料分量|方法|作者背景;权力关系;史料分量
003|88|史料运用之外还须检查历史解释|方法|史料运用;历史解释;检查
003|90|解释失误会暴露历史脉络不清|方法|历史解释;脉络;失误
003|91|兴中会不能直接等同国民党前身|知识|兴中会;国民党;组织源流
003|93|领袖基础不稳时更须检验其行为|方法|领袖基础;行为检验;党内冲突
003|96|党内分裂应回到当时争议判断|方法|党内分裂;同时期文献;历史判断
003|97|与组织决裂可以转向独立行动|政治|组织决裂;独立行动;革命
003|98|不合作主义可源于先行者殉道|人格|不合作;殉道;人格影响
003|100|胜利叙事会遮蔽真正行动者|写作|胜利叙事;行动者;历史遮蔽
003|101|革命不能成为非法逮捕的理由|法权|革命;非法逮捕;法治
003|102|派系领袖责任不能与手下暴力切割|政治|派系;领袖责任;政治暴力
003|104|早期伏笔可解释后来的污名化|方法|早期伏笔;污名化;历史解释
003|105|政治史会通过抹杀与丑化改造敌手|写作|抹杀;丑化;政治史
003|106|实践者可能被权力夺走革命成果|人格|实践者;革命成果;权力
003|206|批判敌人也必须修辞立诚|写作|批判;修辞立诚;历史写作
003|207|利用江湖势力会使革命走向篡夺|政治|江湖势力;革命;篡夺
004|7|政治组织会把共同历史笼为己有|写作|共同历史;政治组织;改写
004|8|历史定位须控制事件比例与人物主次|方法|历史定位;比例;人物主次
004|10|宣传图说会伪造共同奋斗|写作|宣传图说;共同奋斗;伪造
004|30|核心责任名单可检验后设英雄叙事|方法|责任名单;英雄叙事;检验
004|32|核心人物不在行动名单应受质疑|方法|行动名单;核心人物;质疑
004|39|计划与实际行动矛盾可推翻宣传|方法|计划;实际行动;宣传
004|57|历史改写会淡忘第一线行动者|写作|历史改写;第一线;行动者
004|61|政治欲望不能仅由晚年选择推断|方法|政治欲望;晚年选择;推断
004|63|侠骨柔情在黑暗政场反成出局根由|人格|侠骨柔情;政场;出局
004|68|御用史家承认计划未执行可作反证|方法|御用史家;计划;反证
005|33|受人恩惠应以行动回报|人格|恩惠;回报;行动
005|34|不忘旧情是可称道的人格|情爱|旧情;人格;称道
005|37|旧式侠义人格在权力政治中没落|文化|侠义人格;权力政治;没落
005|58|成功后的投机者会排挤重情者|人格|投机者;重情;革命成功
006|6|私人信件可校正政治履历|方法|私人信件;政治履历;校正
006|7|编年史改字会扭曲自我陈述|写作|编年史;改字;自我陈述
006|8|定本会继承旧误并继续删改|写作|定本;旧误;删改
006|10|版本对读能揭出政治性删节|方法|版本对读;政治删节;原信
007|8|教科书中的坏人评价并不简单|文化|教科书;人物评价;历史
007|21|军事责任应追到远程越级指挥|方法|军事责任;越级指挥;作战原理
007|23|领袖要求部下赴死却保留自我|政治|领袖;部下赴死;自我保全
007|24|救援姿态可掩饰让部下送死|人格|救援姿态;部下;送死
007|35|照顾家属承诺可被用作人质控制|政治|家属;承诺;人质控制
007|37|领袖失信会伤害追随者家庭|人格|领袖失信;家庭;追随者
007|48|政权不应阻断亲属奔丧|法权|出境;奔丧;家庭权利
007|49|人质控制会延伸到生活与职业|政治|人质控制;生活;职业
007|52|以人质控制部属是残忍病态|人格|人质;控制;残忍
007|54|是否牺牲应由个人自由意志决定|法权|牺牲;自由意志;个人选择
007|55|强制他人做烈士暴露统治者无情|人格|烈士;强制;统治者
008|3|当事人回忆可补足战役指挥秘辛|方法|当事人回忆;战役;指挥
008|5|军事优势会被低劣指挥抵消|政治|军事优势;指挥;战役
008|7|坏计划若执行也可检验|方法|计划;执行;检验
008|10|权力疑忌会扰乱军事部署|政治|权力疑忌;军事部署;指挥
008|12|失败中制造大捷是政治宣传|写作|大捷;政治宣传;失败
008|18|援军承诺不兑现会把部下置于险境|人格|援军承诺;失信;险境
008|21|撤退与作战目标不能反复切换|方法|撤退;作战目标;指挥
008|28|只顾局部会导致全军失去生机|政治|局部;全军;决策
008|34|向饥饿军队投纪念册是逼部下赴死|人格|饥饿;纪念册;部下赴死
008|43|从一手叙述可同时检验指挥与卖命结局|方法|一手叙述;指挥;卖命结局
009|3|政治牛皮可用逐月失地记录检验|方法|政治牛皮;失地记录;检验
009|12|文告的核心价值在显示统治者心态|方法|政治文告;统治者心态;文本分析
009|13|失败政权会把和平责任转给敌手|政治|失败;和平责任;敌手
009|14|宣称能决战取胜可暴露政治判断|政治|决战;取胜;政治判断
009|25|统治者会把自己的谋和责任转向对手|政治|谋和;责任转移;对手
009|28|秘密语气可显示权力者对部属不满|方法|秘密电文;语气;部属
009|31|官方婉语可还原权力打压|方法|官方婉语;权力打压;回忆
009|33|公开文告之前可能已秘密准备下野|方法|公开文告;秘密准备;下野
009|60|下野应以后续正式文书确认|方法|下野;正式文书;时间线
009|62|用词变化可暴露统治者的责任观|写作|用词变化;责任观;悔祸
009|67|失败者仍以仁慈统治者自居会漠视现实|政治|仁慈统治者;失败;现实
010|3|派系功勋可使权力排斥越压越强|政治|派系;功勋;权力排斥
010|10|当事人回忆可检验政治竞选|方法|当事人回忆;政治竞选;检验
010|140|名义职位可被幕后权力当作挡箭牌|政治|名义职位;幕后权力;挡箭牌
010|143|代总统从严格法理上是总统|法权|代总统;法理;法统
011|3|特务机构会以复杂编制扩张权力|知识|特务机构;编制;军统
011|4|秘密组织会借公开职业掩护活动|政治|秘密组织;公开职业;掩护
011|5|下野者会用仪式安排维持私人权力|政治|下野;私人权力;仪式
011|6|名义总统若无法控制机构就只是空位|政治|名义总统;机构控制;空位
011|10|官方颂词可反证地下权力存在|方法|官方颂词;地下权力;反证
011|13|墓表婉语也可印证秘密效忠|方法|墓表;婉语;秘密效忠
011|14|多篇纪念文可交叉印证秘密组织|方法|纪念文;交叉印证;秘密组织
011|16|对外失败的政权可能对内斗争内行|政治|对外失败;内斗;权力
012|3|谎言环境会使后代无法想象真实失败|写作|谎言环境;后代;真实失败
012|7|危难中的交通特权决定谁能逃离|政治|交通特权;危难;逃离
012|9|专机使权力者拥有不对等的逃生条件|政治|专机;权力者;逃生
012|26|公开资料对读可显示疑点与矛盾|方法|公开资料;对读;矛盾
012|27|目的地差异可用来校正叙事|方法|目的地;叙事;校正
012|28|同一作者的两种记述应相互对照|方法|同一作者;记述;对照
012|32|御用文字会把阻碍改写为民众让路|写作|御用文字;阻碍;民众让路
012|33|逃难记述必须同时通过常情检验|方法|逃难记述;常情;检验
012|37|含糊术语可能正在遮蔽不宜公开的行动|方法|含糊术语;遮蔽;特种技术
012|38|特权逃生手段可能以他人生命为代价|政治|特权;逃生;他人生命
012|39|英雄从容叙事可能依赖未公开手段|写作|英雄叙事;从容;未公开手段
013|3|国际承认可反证国内总统名义|方法|国际承认;总统名义;反证
013|4|总统缺位必须依宪法程序补选|法权|总统缺位;宪法程序;补选
013|5|私人书信称谓可验证政治身份|方法|私人书信;称谓;政治身份
013|15|同时期文证可确认真实职位称谓|方法|同时期文证;职位称谓;验证
013|16|权力不能一手遮尽真理与证据|人格|权力;真理;证据
013|18|不能视事不能作为无程序复职的理由|法权|不能视事;复职;宪法程序
014|2|身兼多家必须以真本领为基础|知识|学问;真本领;名实相符
014|3|独裁者的自大会催生部属造神|人格|独裁者;自大;部属造神
014|13|政治高帽不能替代真实专业水准|人格|政治高帽;专业水准;名实
014|14|欲加名衔时任何牵强引申都可成立|写作|名衔;牵强引申;讽刺
015|3|回忆录可作为权力行为的起点证据|方法|回忆录;权力行为;证据
015|6|回忆中的局部误记不必否定核心事实|方法|局部误记;核心事实;回忆
015|7|单一回忆应以多项旁证验证|方法|回忆;旁证;验证
015|10|高官奔丧自由不应受领袖御批|法权|奔丧;行动自由;领袖御批
015|13|前高官出入境不应受个人批准|法权|出入境;前高官;个人批准
015|18|公职人员出国不应依赖领袖私批|法权|出国;公职人员;领袖私批
015|19|多项行动审批可反推统治者对出走的知情|方法|行动审批;出走;知情
016|6|政治遗嘱的真实性必须可受检验|写作|政治遗嘱;真实性;检验
016|8|代笔遗嘱须依民法见证程序成立|法权|代笔遗嘱;民法;见证程序
016|9|领袖崇拜会把精神追随夸张为无所不在|文化|领袖崇拜;精神追随;夸张
017|4|官方禁止造神可能只是开明伪装|政治|禁止造神;开明伪装;领袖崇拜
017|13|知识分子可为政治造神奠定理论|文化|知识分子;政治造神;理论
017|20|政权内部的造神不会因一纸行政函件停止|政治|造神;行政函件;领袖崇拜
018|3|牢狱广播会同时执行窃听与灌输|政治|牢狱广播;窃听;宣传灌输
018|4|小型叙事矛盾也值得追查|方法|叙事矛盾;小考证;追查
018|9|同一作者前后改变行动主体须受质疑|方法|同一作者;行动主体;前后矛盾
018|12|集体官方报告也会画蛇添足自暴其谎|方法|官方报告;画蛇添足;谎言
018|14|同一报告内部矛盾可直接揭穿叙事|方法|报告矛盾;叙事;揭穿
018|20|仪式记录的时间与参与者应交叉核对|方法|仪式记录;时间;参与者
018|21|文化正统形象会促使官方事后补造故事|写作|文化正统;官方补造;故事
019|6|重复强调亲笔反而暴露著作归属疑点|写作|亲笔;著作归属;强调
019|16|颂词的重复加码不能代替作者证据|写作|颂词;作者证据;重复加码
019|17|成书过程的当事人证言可揭示真正作者|方法|成书过程;当事人证言;真正作者
019|19|领袖专书可能是文学侍从据提纲代笔|写作|领袖专书;文学侍从;代笔
`.trim();

function sourceFiles() {
  return fs.readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt') && !name.includes('目录'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)))
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function parseSpecs(allSourceFiles) {
  return specLines.split(/\n+/).map((line, index) => {
    const [fileToken, paragraphText, title, category, keywordText, ...extra] = line.split('|');
    if (extra.length || !fileToken || !paragraphText || !title || !category || !keywordText) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    if (!categorySet.has(category)) throw new Error(`Invalid category: ${category}`);
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
  const text = Array.isArray(value) ? value.join(';') : String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath, records) {
  const headers = ['id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  const rows = [headers.join(','), ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(','))];
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [`# ${bookTitle}思想索引（${round}）`, '', `- 书名：${bookTitle}`, `- 条目：${records.length}`, '- 说明：标题用于检索浓缩，description 保留源文原段落。', ''];
  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`, '');
    for (const item of items) {
      lines.push(`### ${item.id} ${item.title}`, '', `出处：${item.source_file}#${item.source_paragraph}`, `关键词：${item.keywords.join('、')}`, '', item.description, '');
    }
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeTxt(filePath, records) {
  const blocks = records.map((record) => [
    `${record.id}｜${record.category}｜${record.title}`,
    record.description,
    `出处：${record.source_file}#${record.source_paragraph}`,
  ].join('\n'));
  fs.writeFileSync(filePath, `${blocks.join('\n\n---\n\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter(({ count }) => count > 0);
}

const allSourceFiles = sourceFiles();
if (allSourceFiles.length !== 20) throw new Error(`Expected 20 source files, found ${allSourceFiles.length}`);
const paragraphMap = new Map(allSourceFiles.map((name) => [name, paragraphs(name)]));
const sourceParagraphCount = [...paragraphMap.values()].reduce((sum, items) => sum + items.length, 0);
if (sourceParagraphCount !== 1040) throw new Error(`Expected 1040 paragraphs, found ${sourceParagraphCount}`);

const specs = parseSpecs(allSourceFiles);
const candidates = specs.map((spec) => {
  const description = paragraphMap.get(spec.fileName)[spec.source_paragraph - 1];
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
      reason: '与既有总表源段落完全相同，本轮不重复提取。',
    });
  } else {
    retainedCandidates.push(candidate);
  }
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

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    sequence,
    title: bookTitle,
    slug,
    sourceDir: sourceBookDir,
    round,
    status,
    note: '本轮只提取李敖自序及评论段落中可独立检索的史料方法、政治、法权、人格、文化与写作判断。陈鼓应原文、李宗仁和杜聿明回忆、官方文告、电报、名单与长篇引文只作证据，不直接转列为李敖思想。标题用于检索浓缩，description 保留源文原段落。',
    source_file_count: allSourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
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
  `# ${bookTitle}提取说明`, '',
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 源目录：${sourceBookDir}`,
  `- 源文件：${allSourceFiles.length}`,
  `- 源段落：${sourceParagraphCount}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 保留李敖本人明确表达、可脱离单一史实独立检索的史料批评、版本校勘、制度辨析、权力责任及人格判断。',
  '- 陈鼓应转录文章、李宗仁和杜聿明回忆、官方文告、电报、名单、制度原文与纪念文只作证据，不把被引作者的判断记在李敖名下。',
  '- 提取轮适度保留不同证据路径，待校对轮再合并重复方法或过度依赖单一事例的条目。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文原段落。', '',
  '## 重复来源', '',
  ...(skippedDuplicates.length
    ? skippedDuplicates.map((item) => `- ${item.source_file}#${item.source_paragraph} = ${item.previous_book} ${item.previous_id}`)
    : ['- 无']), '',
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
