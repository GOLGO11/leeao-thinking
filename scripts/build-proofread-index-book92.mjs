import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const sequence = '092';
const bookTitle = '李敖政论综艺集';
const bookDir = path.join(repoRoot, 'outputs', `${sequence}.${bookTitle}`);
const inputPath = path.join(bookDir, '思想索引-提取轮.json');

const outputJson = path.join(bookDir, '思想索引-校对轮.json');
const outputCsv = path.join(bookDir, '思想索引-校对轮.csv');
const outputMd = path.join(bookDir, '思想索引-校对轮.md');
const canonicalJson = path.join(bookDir, '思想索引.json');
const canonicalCsv = path.join(bookDir, '思想索引.csv');
const canonicalTxt = path.join(bookDir, '思想索引.txt');
const proofreadNote = path.join(bookDir, '校对说明.md');

const categories = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(categories);

const dropReasons = new Map();
function addDrops(ids, reason) {
  for (const id of ids) dropReasons.set(id, reason);
}

addDrops(
  [10, 22, 31, 36, 93, 101, 124, 128, 140, 155, 159, 162, 247, 269],
  '偏现场趣谈、自我宣传、花边叙事或索引独立性较弱',
);

const genericTitles = new Set([
  '台独叙事必须查证',
  '言论自由要靠争取',
  '情爱记忆要看人性',
  '坐牢不能摧毁精神',
  '查禁反而留下法权证据',
  '鲁迅不能被神话遮蔽',
  '胡适价值要放回历史',
  '中华民国亡国要按史料看',
  '台湾是中国的一部分',
  '美国神话要拆穿',
  '日本问题不能脱离历史',
  '统一问题要回到中国结构',
  '人权不能只做口号',
  '真相要靠资料拆穿',
  '判断必须有逻辑标准',
  '人生要保持独立判断',
  '写作要有自己的标准',
  '文化判断要看根基',
]);

const titleRules = [
  [/孔子是一个和平的人|万世师表/u, '孔子形象要回到原典'],
  [/没有力量的人.*留下了.*声音|没有力量的人.*世界都知道/u, '弱者也能用证据留下力量'],
  [/台湾就是我的家乡|台湾的一部分/u, '台湾身份不等于外省漂泊'],
  [/军中乐园|妓女说排长买张票/u, '调查现实要亲身进入现场'],
  [/乱世的枭雄人生/u, '太平日子不必追求乱世枭雄'],
  [/生理的原因反倒少，心理原因/u, '情爱问题先看心理原因'],
  [/我会勾引她，不是追她/u, '情爱记忆不只靠追求'],
  [/恨，不是坏的力量/u, '恨也是历史行动力量'],
  [/台湾的民主是假的|台湾所谓两个党的政治/u, '台湾民主常被两党结构掏空'],
  [/张惠妹.*女性.*年轻人.*高山族/u, '政治搭档可以代表多重身份'],
  [/查禁了我的很多书|96本被查禁/u, '查禁书籍留下法权证据'],
  [/李登辉.*共产党的叛徒/u, '李登辉问题要用历史拆穿'],
  [/白话文的前三名是李敖/u, '白话文成就要放在比较中看'],
  [/以男人的政见为政见/u, '亲密关系会牵动政治立场'],
  [/老赌徒不做假牌/u, '经验丰富者不必做假牌'],
  [/做了副总统.*女人.*权力/u, '权力竞争不能只诉诸女性身份'],
  [/台湾的报业.*民主的不够.*专制的不够/u, '国民党败退后的反省发生分裂'],
  [/坐牢出来第一个感觉|坐牢算什么/u, '坐牢经验会反照台湾政治'],
  [/脚一直踩在你的脚上面|奋斗的结果/u, '言论自由来自奋斗不是恩赐'],
  [/身临其境太笨|间接取得/u, '间接经验可以替代亲身奔波'],
  [/完整的美丽画面|阴阳眼/u, '困境中要学会选择性观看'],
  [/海峡两岸发生战争|领土统一/u, '两岸战争本质是领土统一问题'],
  [/瘦、高、白、秀、幼|女人看男人标准很宽/u, '审美标准来自具体条件'],
  [/诺贝尔标准/u, '诺贝尔奖标准也要被批判'],
  [/白色恐怖的延伸/u, '白色恐怖会延伸成沉默结构'],
  [/蒋介石、蒋经国、李登辉、陈水扁/u, '台湾领导者都要接受历史清算'],
  [/婚姻在人类历史上是一个过渡/u, '婚姻观念会随技术改变'],
  [/传唤证人时应该用隔离方式/u, '真相调查要有程序设计'],
  [/台湾玩真的不敢/u, '台湾闹事上限受美国控制'],
  [/苗族就是现在台湾的高山族祖先/u, '高山族来源不能只讲海外叙事'],
  [/夫妻亲人可以不作证|父为子隐/u, '亲密关系中也有不揭底真理'],
  [/法西斯.*构成诽谤/u, '词义变化会影响法律判断'],
  [/李远哲.*达赖喇嘛|诺贝尔奖的时候是美国人/u, '诺贝尔奖常奖励反中国姿态'],
  [/慰安妇.*日本人|日本人要进安全理事会/u, '日本入常不能忘记慰安妇'],
  [/14岁.*离开了北京|对大陆，尤其对北京有了最完整的回忆/u, '北京记忆不等于乡愁'],
  [/坐牢整天在看书|读书之多没有人超过我/u, '坐牢读书也会成为负担'],
  [/哭哭啼啼没有出息|伤痕文学/u, '伤痕文学不能只会哭哭啼啼'],
  [/梁实秋.*珍惜人生|魔术师.*珍惜人生/u, '疾病会逼人珍惜人生'],
  [/为什么我可敬.*坐了牢|爱台湾爱到坐了牢/u, '爱台湾要看承担'],
  [/孙中山.*英国香港总督|革命不择手段/u, '革命叙事也要查外援'],
  [/101席.*台独公投|没有任何借口/u, '执政多数会暴露台独借口'],
  [/台湾的法律.*性能力|法院.*性能力/u, '法律判断不能只看形式'],
  [/历史上动手脚|台湾历史定位成四百年/u, '分离叙事会先改写历史'],
  [/曹操跟刘备|书写得极好/u, '作家价值要看书写质量'],
  [/批评家永远不会被立铜像/u, '批评家不能替代创作者'],
  [/12年来没有讲话|应该反省或者应该忏悔/u, '知识分子失声应当反省'],
  [/文学和思想对我而言/u, '文学可以表达思想'],
  [/痛苦跟快乐都和共产党|休戚与共/u, '和共产党是休戚与共'],
  [/不是怀乡，没有乡愁|人生如朝露/u, '还乡情感不该陷入悲情'],
  [/死不要脸就到了台湾|向后转，再前进/u, '国民党败退话术掩饰逃亡'],
  [/党中央刊物《红旗》|国民党的济南市长/u, '政治立场会随着现实转换'],
  [/斯大林.*外蒙古|中苏友好条约/u, '共产党也曾被斯大林出卖'],
  [/勇敢的台湾站起来搞台湾独立|为什么不做/u, '台独执政后不敢兑现'],
  [/圆点、句点|还是要台湾/u, '政府用标点掩饰国家真相'],
  [/艾森豪总统.*国防部长|威尔森.*通用公司/u, '公职利益回避不能只卖股票'],
  [/以色列.*阿拉法特|斩陈水扁的首/u, '斩首能力不等于政治选择'],
  [/过去整个中国的政治就是你不好/u, '中国政治不能只是打倒别人'],
  [/借尸还魂.*台独分子|守住这个尸体/u, '中华民国尸体被用来防台独借尸'],
  [/台湾人尊严|软脚虾/u, '对美国承诺暴露台湾尊严问题'],
  [/高信疆.*胡茵梦|婚姻不会超过一年/u, '婚姻迷信暴露关系裂痕'],
  [/政治是专家的事情|马英九其实是外行/u, '政治是专家的事情'],
  [/美国有很多影响|国民党的八股/u, '美国资讯曾启蒙台湾青年'],
  [/失恋.*写日记|日记一停下来就无效/u, '失恋自救不能靠反复日记'],
  [/雷震.*最后来台湾|雷震到台湾来以后开始反省/u, '雷震从帮蒋到反省国民党'],
  [/女朋友的妈妈也不接受|将来做了总统/u, '早年情爱受贫穷与阶级阻挡'],
  [/太阳花.*加入民进党|第三势力可以起来/u, '第三势力不能再被民进党吸纳'],
  [/忘是个很高的哲学|但言浑忘不言无/u, '遗忘不等于没有'],
  [/横眉冷对.*千万人头落地/u, '中国安定优先于追究责任'],
  [/刑求.*右手|原子笔.*刑求/u, '刑求也不能摧毁精神仇恨'],
  [/形象牌|你形象不能跟他比/u, '形象牌会压倒政治关系'],
  [/没有资格成一个国家|中华民国在1949年已经亡国/u, '中华民国幻觉耗尽台湾财政'],
  [/以为台湾是国家，其实不是|国防预算每年3200亿/u, '台湾国家幻觉消耗国防预算'],
  [/宪法就是你要遵守的|没有什么宪法一中/u, '一中问题已经写在宪法里'],
  [/中华民国是我创造的.*谎话/u, '青天白日旗叙事并不等于历史'],
  [/知识分子不跟政府作对/u, '知识分子不能跟政府合作'],
  [/台湾的变态是因为受了日本影响/u, '台湾性别观念受日本文化影响'],
  [/中国有句老话，久病床前无孝子/u, '不要用困境考验朋友'],
  [/臭鸡蛋.*武侠小说/u, '武侠侠义要接受现实检验'],
  [/美国的第三任总统杰斐逊/u, '小乱也能迫使政府重视'],
  [/国民党兵败.*台湾/u, '国民党败退后的自由派反省'],
  [/马子是中国男人夜里小便的夜壶/u, '日常称谓也会包含自我羞辱'],
  [/维持现状就是出局/u, '维持现状会遮蔽统一动态'],
  [/陈水扁是个孝子|30岁以前跟他妈妈/u, '亲情也可能成为人格伤害'],
  [/横眉冷对.*捧着卵子过河/u, '中国革命走到小心翼翼过河'],
  [/我不是政治人物/u, '思想人物也可以介入政治行动'],
  [/赛车.*美帝的玩意儿/u, '流行活动也有帝国历史背景'],
  [/拦路虎.*蒋介石/u, '战斗姿态来自现实阻路'],
  [/文字又细腻.*电视节目/u, '电视表达不能替代文字细腻'],
  [/个人的选择、家庭的选择，到美国去/u, '个人移民会排挤公共教育资源'],
  [/强阳不倒|阳痿两个字.*动词/u, '书名可以把名词转成动词'],
  [/美国的《生物能源文摘》|中国人吃肉犯法/u, '美国资源话语会责怪中国发展'],
  [/间接的经验|亲身经历的方法/u, '知识进步依靠间接经验'],
  [/蒋介石的战略错误/u, '蒋介石战略错误造成历史代价'],
  [/钓鱼台问题.*蒋介石留下/u, '钓鱼台问题来自蒋介石遗留'],
  [/国学的现代意义/u, '国学现代意义有政治与文化两面'],
  [/《诗经》本来都是情诗/u, '政治挂帅会改写文学理解'],
  [/台湾能够拖到今天拖了61年/u, '台湾存续来自历史偶然'],
  [/蒋介石有特别贪污/u, '蒋介石问题不能只看贪污'],
  [/男女间的事情不是那么诚实/u, '男女关系不必坦白到底'],
  [/美国人现在印美金/u, '美国金融秩序让世界买单'],
  [/背着包袱过河|摸着石头过河|捧着卵子过河/u, '中国革命经历三种过河'],
  [/辜宽敏.*假的台独/u, '民进党应反省假台独人物'],
  [/日本女人.*金美龄/u, '日本责任不能靠台湾人代辩'],
  [/一个党说了算.*两个党说了算/u, '台湾两党说了算也是垄断'],
  [/情书.*太太看不懂/u, '真相拆穿后会破坏浪漫神话'],
  [/一个党说了算，中国的台湾也不能两个党说了算/u, '两岸都不该由少数党说了算'],
  [/无产阶级.*议会就是要颠覆/u, '参加选举也可以为了颠覆结构'],
  [/亡国62年|中华民国38年已经亡国/u, '中华民国亡国要按史料看'],
  [/真的搞台湾独立.*愿意跟你一起挨飞弹/u, '台独若玩真的才值得严肃看待'],
  [/武器只能保护台湾1%的地方/u, '军购保护不了多数台湾人'],
  [/没有骂连战的自由/u, '言论自由也受节目平台边界限制'],
  [/张惠妹.*原住民/u, '原住民身份不能永远被童稚化'],
  [/政治犯.*没有一个案子平反/u, '台湾政治犯案件仍未真正平反'],
  [/构成法律的要件我就会告/u, '打官司重在过程而非胜负'],
  [/蔡英文出现证明一个坏的讯号/u, '蔡英文崛起遮蔽白色恐怖斗争者'],
  [/媒体封锁.*言论自由是假的/u, '没有媒体机会就没有言论自由'],
  [/高门槛来控制我们/u, '选举门槛会控制政治参与'],
  [/苏起.*九二共识/u, '九二共识没有白纸黑字证据'],
  [/国民党应该垮掉/u, '国民党应在历史中作废'],
  [/公投.*民进党的公投整个是个骗局/u, '民进党公投路线经不起兑现'],
  [/宋庆龄.*名位.*权力/u, '共产党给名位慷慨给权力谨慎'],
  [/勾践只尝过胆，没有卧过薪/u, '历史典故也要回到史料'],
  [/没有文字.*闽南话/u, '没有文字积累难成文学传统'],
  [/胡适.*不配读经/u, '读经前要先有理解能力'],
  [/蒋介石自己说自己是救星/u, '蒋介石救星叙事要被拆穿'],
  [/不谈兴票案，逼你们公布全部档案/u, '档案公开比单案攻防更重要'],
  [/案子是真的，证据是假的/u, '假证据会破坏真案件焦点'],
  [/三年之丧.*传统文化/u, '传统礼制会进入现代政治表演'],
  [/打破家天下的制度/u, '国共悲哀都在家天下结构'],
  [/女人政见/u, '女人政见也会受性别想象操控'],
  [/台湾在世界没什么地位|台湾算老几/u, '台湾要认清自身世界位置'],
  [/九二共识.*的确是他创造的/u, '九二共识是被创造出来的概念'],
  [/在美国念大学役男可以缓召/u, '兵役规则暴露台湾制度偏差'],
  [/得票率就39%/u, '低得票率不决定总统好坏'],
  [/关说.*司法黑暗/u, '司法黑暗时关说可能松动严法'],
  [/国防部每年花我们多少钱/u, '废除国防部是财政重分配方案'],
  [/投票率太高/u, '台湾政治兴趣来自被压抑的官迷'],
  [/马英九是亲美的/u, '马英九亲美并非亲北京'],
  [/我不用电脑/u, '纸面资料仍有一览无余价值'],
  [/核四.*花了多少钱/u, '核四争议要先算历史成本'],
  [/统战最高的原则/u, '统战原则在联合次要敌人'],
  [/阿里斯太提斯/u, '民主放逐也会流于厌烦投票'],
  [/郭国基.*脚镣/u, '台湾反抗者不是台独分子'],
  [/基辛格写的On China/u, '毛泽东台湾判断影响两岸时间表'],
  [/告你以前调查你财产/u, '诉讼策略要先调查对手财产'],
  [/国民党.*列宁式政党|民进党也是列宁式政党/u, '台湾没有民主因为两党都是列宁式政党'],
  [/经济上的旋转门条款/u, '旋转门条款要限制军财经利益'],
  [/宪法.*为因应国家统一前之需要/u, '维持现状可能违反宪法方向'],
  [/军法就是军法/u, '军法不能被情绪性废掉'],
  [/婚丧喜庆一来不参加/u, '节省应酬时间才能积累学问'],
  [/胡茵梦是她追我/u, '情爱叙事也要反转追求关系'],
  [/美国文化大有关系|消耗人类的资源/u, '美国生活方式不能被中国复制'],
  [/我到现在还是个战士/u, '晚年仍可保持战士姿态'],
  [/台湾前途什么东西/u, '台湾前途从来不是台湾人说了算'],
  [/蔡英文是代表.*又想台湾独立/u, '蔡英文路线在台独与国统间混乱'],
  [/为什么我们要相信美国/u, '美国保护台湾有守住前提'],
  [/以为台湾是国家，其实不是/u, '台湾国家幻觉消耗国防预算'],
  [/老共怎么样反省/u, '共产党台湾政策需要反省失败'],
  [/过去我一个女朋友.*因为我穷/u, '早年情爱受贫穷与阶级阻挡'],
];

function sourceSeq(record) {
  const match = String(record.id || record.source_id || '').match(/(\d+)$/);
  if (!match) throw new Error(`无法解析记录编号：${record.id}`);
  return Number(match[1]);
}

function stripSpeaker(text) {
  const value = String(text || '').trim();
  return value.replace(/^(李敖|李|敖|答)[：:]\s*/u, '').trim();
}

function baseTitle(title) {
  return String(title || '').replace(/（\d+-\d+）$/u, '').trim();
}

function isWeakTitle(title) {
  const text = baseTitle(title);
  return genericTitles.has(text)
    || /中的.+判断$/u.test(text)
    || /^(好比说|一般的人|那不是|那是一种|想这个|我们|我|你|他|她|们|就是|这个|问题是|所以|当然|现在|过去|今天|因为|原因|并且|看了以后|文茜|死不要脸|人不是别人|说你看|没有|可是|在台湾大学|最后|刚才)/u.test(text)
    || text.length < 8
    || text.length > 24;
}

function cleanClause(text) {
  return String(text || '')
    .replace(/^[，,。、“”‘’「」：:\s]+/u, '')
    .replace(/^(所以|可是|但是|因为|因此|事实上|简单说|换句话说|我认为|我觉得|我告诉你|我告诉各位|我必须讲|我可以告诉你|大家知道|注意哦|你知道吗|为什么)/u, '')
    .replace(/[“”‘’「」]/gu, '')
    .replace(/\s+/gu, '')
    .trim();
}

function scoreClause(clause, index) {
  let score = 0;
  const length = clause.length;
  if (length >= 8 && length <= 22) score += 4;
  if (length > 22 && length <= 32) score += 2;
  if (/不是|不能|不要|应该|必须|证明|真相|历史|自由|民主|中国|台湾|美国|日本|国民党|共产党|民进党|台独|宪法|法律|写作|文学|爱情|女人|男人|人生|经验|资料|证据/u.test(clause)) score += 4;
  if (/要|会|能|可以|来自|在于|不等于|并非/u.test(clause)) score += 1.5;
  if (index < 3) score += 0.5;
  if (/^(这是|这个|那种|一样|一个|第二|第一|第三|好比|举个例子|请你|你们|他们|我们|我)/u.test(clause)) score -= 2;
  if (/哈哈|谢谢|主持人|广告|观众|画面|穿红夹克|美女|校花/u.test(clause)) score -= 4;
  return score;
}

function fallbackTitle(record) {
  const text = stripSpeaker(record.description);
  const clauses = text
    .split(/[。！？；，,：:]/u)
    .map(cleanClause)
    .filter((part) => part.length >= 8 && part.length <= 36)
    .filter((part) => !/谢谢|欢迎|节目|主持|掌声|画面|哈哈|开玩笑/u.test(part));

  const best = clauses
    .map((clause, index) => ({ clause, score: scoreClause(clause, index) }))
    .sort((a, b) => b.score - a.score)[0]?.clause;

  if (best && best.length >= 8) return best.slice(0, 22);
  return baseTitle(record.title).slice(0, 22);
}

function proofreadTitle(record) {
  const text = stripSpeaker(record.description);
  for (const [pattern, title] of titleRules) {
    if (pattern.test(text)) return title;
  }

  const original = baseTitle(record.title);
  if (!isWeakTitle(original)) return original;
  return fallbackTitle(record);
}

function classify(record, title) {
  const text = `${title} ${stripSpeaker(record.description)}`;
  const hasLegal = /言论自由|查禁|禁书|坐牢|监狱|政治犯|法院|司法|法官|判决|法律|宪法|人权|诉讼|打官司|冤案|平反|军法|档案公开|刑事诉讼/u.test(text);
  const titleOnly = title;
  if (/言论自由|查禁|禁书|坐牢|监狱|政治犯|法院|司法|法官|判决|法律|宪法|人权|诉讼|打官司|冤案|平反|军法|档案公开|刑事诉讼|法律判断|法权|刑求/u.test(titleOnly)) return '法权';
  if (/证据|资料|真相|调查|标准|逻辑|方法|过程|间接经验|程序设计|门槛|成本|比较|判断/u.test(titleOnly)) return '方法';
  if (/写作|文章|文学|小说|白话文|出版|读者|书名|书籍|文字细腻|表达|创作者/u.test(titleOnly)) return '写作';
  if (/中文|汉字|语言|称谓|文化|国学|教育|大学|诗经|传统|艺术|词义|新文化|诺贝尔奖|读经/u.test(titleOnly)) return '文化';
  if (/爱情|情爱|婚姻|女朋友|情人|恋爱|男女|妻子|丈夫|胡茵梦|威尔刚|避孕药|亲密|审美|心理原因|性别观念|贫穷与阶级/u.test(titleOnly)) return '情爱';
  if (/人格|人生|尊严|战士|勇气|快乐|朋友|理想|独立|困境|情绪|悲情|晚年|枭雄|战斗姿态/u.test(titleOnly)) return '人格';
  if (/孔子|胡适|鲁迅|勾践|岳飞|典故|史料|历史典故|关公|三国|知识|遗忘|哲学/u.test(titleOnly)) return '知识';
  if (/台湾|中国|大陆|祖国|美国|日本|国民党|共产党|民进党|蒋介石|李登辉|陈水扁|马英九|宋楚瑜|蔡英文|台独|统一|两岸|香港|民主|选举|总统|军购|国防|政府|国家|公投|政党|一中|中华民国|九二共识|维持现状/u.test(titleOnly)) return '政治';

  const hasIntimacy = /爱情|情爱|婚姻|女朋友|情人|恋爱|男女关系|女人|男人|妻子|丈夫|胡茵梦|性能力|威尔刚|避孕药|亲密/u.test(text);
  const hasWriting = /写作|文章|文学|小说|白话文|出版|读者|书名|书籍|文字细腻|表达/u.test(text);
  const hasCulture = /中文|汉字|语言|称谓|文化|国学|教育|大学|诗经|传统|艺术|词义|新文化/u.test(text);
  const hasMethod = /方法|证据|资料|真相|史料|判断|标准|逻辑|过程|经验|调查|比较|程序设计|门槛|成本/u.test(text);
  const hasKnowledge = /孔子|胡适|鲁迅|勾践|岳飞|典故|史料|历史典故|关公|三国|知识/u.test(text);
  const hasPolitics = /台湾|中国|大陆|祖国|美国|日本|国民党|共产党|民进党|蒋介石|李登辉|陈水扁|马英九|宋楚瑜|蔡英文|台独|统一|两岸|香港|民主|选举|总统|军购|国防|政府|国家|公投|政党/u.test(text);
  const hasPersonality = /人格|人生|尊严|战士|勇气|快乐|贫穷|阶级|诚实|朋友|理想|独立|困境|情绪|晚年/u.test(text);

  if (hasLegal && !/公投路线|民主常被|两党|选举门槛|一党说了算|两岸战争|台湾存续|国民党败退|中华民国亡国|台独|统一|军购保护|维持现状|政治|政党/u.test(title)) return '法权';
  if (hasIntimacy && !hasLegal && !/政见|参政|总统|政党|台独|国民党|民进党/u.test(text)) return '情爱';
  if (hasWriting && !hasLegal && !hasPolitics) return '写作';
  if (hasCulture && !hasLegal && !hasPolitics) return '文化';
  if (hasMethod && !hasPolitics && !hasLegal) return '方法';
  if (hasKnowledge && !hasPolitics && !hasLegal) return '知识';
  if (hasPolitics) return '政治';
  if (hasLegal) return '法权';
  if (hasMethod) return '方法';
  if (hasCulture) return '文化';
  if (hasWriting) return '写作';
  if (hasIntimacy) return '情爱';
  if (hasPersonality) return '人格';
  return record.category;
}

function keywordsFor(record, title, category) {
  const pool = `${title} ${category} ${record.source_file || ''} ${stripSpeaker(record.description)}`;
  const seeds = [
    '李敖', '台湾', '中国', '大陆', '祖国', '美国', '日本', '国民党', '共产党', '民进党', '蒋介石', '李登辉',
    '陈水扁', '马英九', '宋楚瑜', '蔡英文', '台独', '统一', '两岸', '香港', '民主', '自由', '言论自由',
    '宪法', '查禁', '禁书', '坐牢', '军购', '胡适', '鲁迅', '中文', '写作', '爱情',
  ];
  const picked = [category];
  for (const seed of seeds) {
    if (pool.includes(seed) && !picked.includes(seed)) picked.push(seed);
    if (picked.length >= 4) break;
  }
  return picked;
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) || 0;
    if (count > 0) {
      const suffix = record.source_file.match(/^(\d+)/u)?.[1] || record.source_paragraph;
      record.title = `${record.title}（${suffix}-${record.source_paragraph}）`;
    }
    seen.set(record.title, count + 1);
  }
}

function categoryCounts(records) {
  return categories
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter((item) => item.count > 0);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function toCsv(records) {
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
    'source_id',
  ];
  return `${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => {
      if (header === 'keywords') return csvEscape(record.keywords.join(';'));
      return csvEscape(record[header]);
    }).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 书名：${bookTitle}`,
    '- 轮次：校对轮',
    '- 状态：已校对',
    `- 条目数：${records.length}`,
    '- 说明：description 保持源文本原段落，只校对取舍、标题、分类、关键词和编号。',
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push(`- 提取轮：${record.source_id}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => [
    `${record.id}. ${record.title}`,
    `分类：${record.category}`,
    `来源：${record.source_file}#${record.source_paragraph}`,
    `关键词：${record.keywords.join('、')}`,
    `提取轮：${record.source_id}`,
    record.description,
  ].join('\n')).join('\n\n')}\n`;
}

function buildNote(inputRecords, outputRecords) {
  const byReason = new Map();
  for (const [id, reason] of dropReasons.entries()) {
    if (!byReason.has(reason)) byReason.set(reason, []);
    byReason.get(reason).push(`LAT092-${String(id).padStart(3, '0')}`);
  }

  const lines = [
    `# ${bookTitle} 校对说明`,
    '',
    `- 提取轮条目：${inputRecords.length}`,
    `- 校对轮保留：${outputRecords.length}`,
    `- 校对轮剔除：${inputRecords.length - outputRecords.length}`,
    '- 校对原则：description 保持原文，不改写；剔除偏现场趣谈、自我宣传、花边叙事和索引独立性较弱的条目；将半句话式标题和节目名兜底标题改成可检索的思想判断句。',
    '',
    '## 剔除记录',
    '',
  ];

  for (const [reason, ids] of byReason.entries()) {
    lines.push(`- ${reason}：${ids.join('、')}`);
  }

  lines.push('');
  lines.push('## 分类分布');
  lines.push('');
  for (const item of categoryCounts(outputRecords)) {
    lines.push(`- ${item.category}：${item.count}`);
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

const inputPayload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const inputRecords = inputPayload.records;
if (!Array.isArray(inputRecords)) throw new Error('提取轮 JSON 未找到 records 数组');

const inputSeqs = new Set(inputRecords.map(sourceSeq));
const missingDrops = [...dropReasons.keys()].filter((id) => !inputSeqs.has(id));
if (missingDrops.length) {
  throw new Error(`校对配置包含不存在的 id：${missingDrops.join(',')}`);
}

const records = [];
for (const record of inputRecords) {
  const seq = sourceSeq(record);
  if (dropReasons.has(seq)) continue;

  const title = proofreadTitle(record);
  const category = classify(record, title);
  if (!categorySet.has(category)) throw new Error(`未知分类：${record.id} ${category}`);

  records.push({
    ...record,
    id: `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`,
    source_id: record.source_id || record.id,
    round: '校对轮',
    status: '已校对',
    title,
    category,
    keywords: keywordsFor(record, title, category),
  });
}

ensureUniqueTitles(records);

const payload = {
  taxonomy: categories,
  book: {
    ...(inputPayload.book || {}),
    sequence,
    title: bookTitle,
    round: '校对轮',
    status: '已校对',
    note: '校对轮剔除偏现场趣谈、自我宣传、花边叙事和索引独立性较弱的条目；将半句话式标题和节目名兜底标题改成可检索的思想判断句，并收整分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    record_count: records.length,
    source_count: inputRecords.length,
    dropped_count: inputRecords.length - records.length,
    category_counts: categoryCounts(records),
  },
  records,
};

fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputCsv, toCsv(records), 'utf8');
fs.writeFileSync(outputMd, toMarkdown(records), 'utf8');
fs.writeFileSync(canonicalJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(canonicalCsv, toCsv(records), 'utf8');
fs.writeFileSync(canonicalTxt, toTxt(records), 'utf8');
fs.writeFileSync(proofreadNote, buildNote(inputRecords, records), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  input: inputRecords.length,
  output: records.length,
  dropped: inputRecords.length - records.length,
  category_counts: payload.book.category_counts,
}, null, 2));
