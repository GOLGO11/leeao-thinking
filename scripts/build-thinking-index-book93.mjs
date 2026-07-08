import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 93;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '快意还乡——李敖神州文化之旅';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('大李敖全集6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('013.') && name.includes('快意还乡'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));

const metadataSignals = [
  '李敖影音E书',
  '李敖资源下载站',
  '古法创建',
  '数字博物馆',
  '资源下载',
  '抖音',
  '油管',
  'QQ',
  '转载请',
  'http',
  'www.',
  '制作',
];

const categoryKeywords = new Map([
  ['写作', ['写作', '文章', '文学', '小说', '文字', '白话文', '作者', '出版', '书名', '读者', '著作', '全集', '序', '诗', '演讲', '讲演', '读书']],
  ['方法', ['方法', '证据', '资料', '判断', '标准', '逻辑', '过程', '目的', '手段', '研究', '分析', '证明', '真相', '粗糙', '比较', '细腻', '问问题', '调查', '务实', '聪明', '技巧', '分类', '网络', '资讯']],
  ['知识', ['历史', '史料', '真相', '胡适', '鲁迅', '关公', '三国', '孔子', '知识', '学问', '文化史', '典故', '哲学', '传统', '人物', '蔡元培', '利玛窦', '司马迁', '马克思', '林则徐', '王国维']],
  ['人格', ['人格', '骨气', '勇气', '尊严', '人生', '老年', '青年', '快乐', '不服气', '独立', '英雄', '战斗', '精神', '理想', '做人', '做事', '诚实', '荣誉', '力行', '实践', '道德', '气节', '自信', '有为主义', '死亡', '叛徒']],
  ['文化', ['文化', '中文', '汉字', '语言', '佛教', '宗教', '诗', '艺术', '大学', '教育', '国学', '文明', '传统', '本土化', '京戏', '歌仔戏', '北大', '清华', '复旦', '儒家', '诸子百家']],
  ['政治', ['台湾', '中国', '祖国', '国民党', '共产党', '民进党', '蒋介石', '李登辉', '陈水扁', '马英九', '美国', '日本', '台独', '统一', '民主', '选举', '总统', '国家', '政府', '大陆', '香港', '军购', '两岸', '一国两制', '自由主义']],
  ['法权', ['法律', '宪法', '法院', '司法', '法官', '判决', '人权', '言论自由', '思想自由', '出版自由', '自由', '查禁', '禁书', '坐牢', '监狱', '政治犯', '审判', '诉讼', '冤狱', '刑求', '真调会']],
  ['情爱', ['爱情', '婚姻', '女朋友', '情人', '恋爱', '接吻', '性爱', '性', '情书', '追女孩子', '丈夫', '离婚', '休妻', '女人', '男人', '男女']],
]);

const judgmentSignals = [
  '我认为',
  '我觉得',
  '我告诉',
  '我主张',
  '我反对',
  '我不承认',
  '我不能接受',
  '所以',
  '为什么',
  '问题是',
  '证明',
  '真相',
  '不是',
  '就是',
  '不能',
  '应该',
  '必须',
  '错误',
  '假的',
  '谎话',
  '自由',
  '民主',
  '历史',
  '中国',
  '台湾',
  '国民党',
  '共产党',
  '美国',
  '日本',
  '台独',
  '统一',
  '言论',
  '法律',
  '写作',
  '中文',
  '北京',
  '上海',
  '香港',
  '北大',
  '清华',
  '复旦',
  '自由主义',
  '宪法',
  '文化',
  '读书',
  '网络',
];

const titleRules = [
  [/讲演.*紧张|葛兰特.*讲不出口|女厕所来干什么/u, '演讲紧张来自怯场'],
  [/演讲的时候不能用稿子|你自己都记不住/u, '演讲不能依赖稿子'],
  [/北洋军阀.*肚量|不要骂北洋军阀/u, '北洋军阀也有政治肚量'],
  [/都是中国.*孔雀.*西北飞|中国东南的一个岛上，回到西北/u, '还乡是从中国东南回到西北'],
  [/热情澎湃.*压住|很理性的人，从来不感情用事/u, '还乡热情也要保持理性'],
  [/北京故宫是真的，台北故宫是假的|故宫也要统一/u, '故宫统一象征两岸统一'],
  [/九十二万两黄金.*台湾|台北故宫偷去/u, '台北故宫收藏要面对来路'],
  [/喜欢这些东西不能有贪念|古董.*贪念/u, '爱古物不能生贪念'],
  [/自由主义.*心灵.*解放|反求诸己/u, '自由主义先要心灵解放'],
  [/人民和政府的关系|政府.*我不要活|颠儿|怂|翻儿/u, '人民面对坏政府有五种反应'],
  [/什么叫“嘚”|做隐士，藏起来/u, '隐居也是逃避政府的反应'],
  [/消极的方法.*政府摆平|争取自由要靠智慧/u, '争取自由要靠智慧'],
  [/没有人比我李敖争取言论自由|被禁书表.*身高|写文章大不了坐牢/u, '言论自由要用承担争取'],
  [/地摊上和黄色书刊一起卖|读者.*色情狂/u, '禁书会在民间渠道流通'],
  [/给胡适.*立个铜像|1500倍来还胡先生/u, '立胡适铜像是偿还思想人情'],
  [/马寅初.*孤军奋战|北大精神/u, '北大精神在孤军奋战'],
  [/处处设防.*人没有信心|人变坏了/u, '处处设防会败坏信任'],
  [/台湾人所著书.*难忘我是大陆人|感于台湾新丧日本之手/u, '台湾人所著书表达大陆身份'],
  [/历史考证.*写实的真|写历史小说|做好历史考证/u, '历史小说要以考证为底'],
  [/全盘西化.*马克思|马克思就是全盘西化/u, '全盘西化也包括马克思'],
  [/马英九.*不做事|不粘锅/u, '马英九问题在于不负责任'],
  [/屈原.*弱者的表达|不要老是横眉冷对/u, '悲愤表达不是健康选择'],
  [/北京话.*皇圈圈|乡音未改，改的是你们/u, '旧北京话保存在离散记忆里'],
  [/中国人这么穷苦才有今天|感谢中国共产党/u, '贫穷历史要放在中国长程中看'],
  [/布什.*清华大学.*谎话|清华大学是美国支持/u, '清华历史不能被美国叙事夺走'],
  [/当年一群爱国的中国人给国家闯了祸|八国联军叫中国人赔钱/u, '爱国热心也可能闯祸'],
  [/陈毅外长|没有裤子穿也要造原子弹/u, '富强需要肯付代价'],
  [/中国这么穷，这个账不能算在共产党头上|1949年共产党接受/u, '大陆贫穷不能全算共产党'],
  [/这里是我的国家，我要使它自由|哪里有自由/u, '自由要在自己的国家争取'],
  [/自由不在外面，自由在我们眼前|为什么我们要跑/u, '自由不在外面而在眼前'],
  [/中国才是.*目标|献身的目标/u, '中国才是真正献身目标'],
  [/慰安妇.*务实|不拿这个钱，不尽人情/u, '慰安妇问题也要务实处理'],
  [/慰安妇.*老太太|五十万新台币/u, '慰安妇赔偿不能只讲道德'],
  [/不懂经济.*不要装懂|懂经济对我们国家/u, '治国必须懂经济'],
  [/电脑.*资讯|想象力比知识重要|提炼出来/u, '网络资讯需要头脑提炼'],
  [/文学和思想对我而言|文学方法去表达/u, '文学可以表达思想'],
  [/读万卷书，行万里路|行零里路/u, '读书胜过奔波旅行'],
  [/母狮子.*哲学家|家庭会散掉/u, '亲情也要学会独立告别'],
  [/陈文茜.*北大清华演讲|北大清华演讲的批评/u, '朋友批评也要公开回应'],
  [/北京政府.*休戚相关|祸福.*休戚相关/u, '北京政府也与我休戚相关'],
  [/休戚与共.*共产党|快乐与痛苦都和共产党/u, '和共产党是休戚与共'],
  [/陈寅恪.*故事|笑她三声/u, '历史故事要看人性层次'],
  [/更努力为纾解两岸关系|北京行.*两岸/u, '还乡会转化为两岸责任'],
  [/政治问题太小.*文化是永久|文化和思想是最根本/u, '文化比政治更根本'],
  [/利玛窦.*传教士.*科学技术|认识西方文明/u, '西学传入需要智慧转化'],
  [/经过历史上两次破坏|利玛窦墓/u, '利玛窦墓见证西学来华'],
  [/王国维.*白首穷经|生命可以做更高更大的东西/u, '学问生命不能只做白首穷经'],
  [/国家的富强是多么的重要|看过那么凄惨的画面/u, '旧上海记忆证明国家富强重要'],
  [/中国人的机会|中国的文化，中国的文字都有机会/u, '中国机会也是文化机会'],
  [/中文.*全世界最简单|中文电脑化|中文的意境/u, '中文会因现代技术翻身'],
  [/马克·吐温.*电话|投资.*机会/u, '好机会也可能被错过'],
  [/不要再谈理想问题|思凡.*现实问题/u, '思凡就是转向现实问题'],
  [/自由主义本身是虚无缥缈|愿意放弃自由主义|自由.*宪法/u, '自由主义要落到宪法现实'],
  [/自由主义.*换取.*宪法|新加坡的媒体逼我说出一个真相/u, '自由主义要换取宪法落实'],
  [/共产主义.*最好的理想|人类贪婪的过程/u, '共产主义理想要经过人性'],
  [/不再斗争.*珍贵|风平浪静/u, '不再斗争是珍贵时刻'],
  [/香港.*争民主|争取民主.*太晚/u, '香港民主诉求要看历史时机'],
  [/马克思.*招牌|社会科学层面/u, '思想研究不能只打马克思招牌'],
  [/雷震.*只影响了我一个人|影响你们一个人也很好/u, '思想影响一个人也有价值'],
  [/中国的语言有它的变化|风流.*坏字/u, '词义会随历史变迁'],
  [/有为主义|做它和不做它是不一样/u, '有为主义相信行动会改变结果'],
  [/两个口袋空的人腰板站不直|没有竞争能力/u, '经济独立影响精神腰板'],
  [/台独.*反叛人物|毛主席一家死了五口人/u, '台独不能冒充革命'],
  [/感情用事.*误事|不给女人投票权/u, '感情用事会误伤民主判断'],
  [/对人生.*悲观|随时会骑上灰色马/u, '老年面对死亡保持清醒'],
  [/大陆是中国的一部分，台湾也是中国的一部分/u, '大陆台湾都是中国一部分'],
  [/香港.*开明和进步|追求民主.*跃过了英国/u, '香港机会在于开明进步'],
  [/独善其身|先天下之忧而忧/u, '知识分子不能独善其身'],
  [/香港人.*越过了这个境界|台湾式的民主政治/u, '香港不要染上台湾式政治'],
  [/台湾自由输掉了|凤凰电视台.*台湾.*不能落地/u, '台湾自由神话会被现实拆穿'],
  [/台湾反对.*一国两制|反对的是“一国”/u, '台湾反一国两制其实反一国'],
  [/民间的文化还是一个强大的力量|儒家文化是我们的主流/u, '民间文化也是中国主流'],
  [/蔡先生埋在香港|对蒋介石实行不合作/u, '蔡元培葬香港是不合作姿态'],
  [/不怕死，可是我不喜欢死|我不怕死/u, '不怕死不等于喜欢死'],
  [/老人、年轻人、活人、死人|中国人、外国人/u, '文化之旅要看完整的人'],
  [/没有带梦来|看祖国的进步/u, '神州之旅是看祖国进步'],
  [/三个指标性的大学|思想和文化上扎根/u, '三所大学是思想文化试点'],
  [/宗教是人们的鸦片.*席勒|不是，他是德国诗人席勒的话/u, '宗教鸦片说未必出自马克思'],
  [/聪明的中国人|笨是悲哀/u, '做聪明中国人才有利'],
  [/回到祖国的讲演分三场|金刚怒目.*菩萨低眉.*尼姑思凡/u, '三场演讲各有表达方法'],
  [/每一页有重要的部分|大卸八块，五马分尸/u, '读书要拆书分类'],
  [/三场讲演其实是一个讲演|三个路线走下去/u, '三场演讲是一场整体表达'],
  [/我的观点.*证据|用证据来证明/u, '批评鲁迅要拿证据'],
  [/文化.*影响政治.*经济|文化是一切根本/u, '文化会影响政治经济'],
  [/双腿.*没有踩在外国的土地|双脚没有踩在外国/u, '双脚从未踩在外国土地'],
  [/刘长乐老板和我不谋而合|五花八门的方法/u, '神州之旅有共同文化意愿'],
  [/感情上是喜欢过去|理智上是喜欢现在|看进步的中国/u, '理智上要看进步中国'],
  [/党中央刊物《红旗》|共产党的叛徒/u, '政治立场会随着现实转换'],
  [/欲速则不达|违反了生产力/u, '富国强兵不能违背生产力'],
  [/自保，不是害人|斯巴达式的教育/u, '自保教育是教人做强者'],
  [/狂人.*文化水平|自信的方法发挥/u, '自信表达会被误称为狂'],
  [/很高兴看到了祖国|看到了未来/u, '祖国进步带来未来信心'],
  [/臭鸡蛋|武侠小说.*不入流|金庸.*假货/u, '批判对象不必全部吃完'],
  [/台湾.*文化水平|台湾.*边陲文化|本土化.*文化/u, '台湾文化要放回历史背景'],
  [/政治人物.*制度|掐住.*脖子|控制他.*做好事/u, '政治人物要靠制度控制'],
  [/党外.*自由民主运动|历史被改写.*台独|台独运动.*不对/u, '党外历史不能改写成台独'],
  [/台湾.*中国.*一部分|中国.*台湾.*一部分/u, '台湾是中国的一部分'],
  [/台独.*假|没有台独|台独.*骗/u, '台独叙事必须查证'],
  [/中华民国.*亡国|亡国之民/u, '中华民国亡国要按史料看'],
  [/民主.*一人一票|纳税.*票|民主.*口号/u, '民主不能只剩口号'],
  [/选举.*思想|用选举.*传播|选总统.*洗脑/u, '选举也可以变成思想运动'],
  [/海峡两岸|国家统一|一国两制|统一前|祖国.*分离|领土统一/u, '统一问题要回到中国结构'],
  [/美国.*(控制|军购|FBI|利益|干涉|交易)|FBI|军购/u, '美国神话要拆穿'],
  [/日本(人|文化|统治|军国主义)|南京大屠杀|慰安妇/u, '日本问题不能脱离历史'],
  [/言论自由/u, '言论自由要靠争取'],
  [/查禁|禁书/u, '查禁反而留下法权证据'],
  [/坐牢|监狱|政治犯/u, '坐牢不能摧毁精神'],
  [/审判|法官|法院|司法|真调会|刑求/u, '司法问题要看权力结构'],
  [/人权/u, '人权不能只做口号'],
  [/证据|资料|真相|调查/u, '真相要靠资料拆穿'],
  [/逻辑|命题|标准/u, '判断必须有逻辑标准'],
  [/过程|手段|目的/u, '过程和手段比目的重要'],
  [/粗糙.*谎话|谎话|假的/u, '不能容忍粗糙谎话'],
  [/胡适/u, '胡适价值要放回历史'],
  [/鲁迅/u, '鲁迅不能被神话遮蔽'],
  [/关公|三国/u, '历史人物不能只看演义'],
  [/写作|文章|小说|文学/u, '写作要有自己的标准'],
  [/中文|汉字|母语|白话文/u, '中文需要被发扬光大'],
  [/文化|教育|大学|文明/u, '文化判断要看根基'],
  [/人生|老年|青年/u, '人生要保持独立判断'],
  [/诚实|荣誉|力行|实践/u, '诚实荣誉要靠实行'],
  [/骨气|气节|尊严/u, '人格要有骨气'],
  [/威尔刚|避孕药|性能力/u, '技术会改变情爱观念'],
  [/胡茵梦|女朋友|追我|追她|追女孩子/u, '情爱记忆要看人性'],
  [/婚姻.*过渡|小老婆/u, '婚姻观念会随技术改变'],
  [/爱情|恋爱|婚姻|情人|女朋友|接吻|性爱|男女|女人|男人/u, '情爱关系要看人性'],
];

const broadRuleTitles = new Set([
  '日本问题不能脱离历史',
  '统一问题要回到中国结构',
  '美国神话要拆穿',
  '司法问题要看权力结构',
  '坐牢不能摧毁精神',
  '真相要靠资料拆穿',
  '判断必须有逻辑标准',
  '过程和手段比目的重要',
  '不能容忍粗糙谎话',
  '写作要有自己的标准',
  '文化判断要看根基',
  '人生要保持独立判断',
  '情爱关系要看人性',
]);

function isWeakTitle(title) {
  return title.length < 6
    || /^(原因|后来|当然|并且|文茜|不是靠|选立委|死不要脸|中国有句老话|可是|承认|他的出现证明|就是我的痛苦|人不是别人|看了以后|游月霞|这就|他给过|大家不要再搞什么|可是对那种|原因就是|并且不可以|当然有一点不同|我已经|他回来以后)/u.test(title);
}

function normalize(text) {
  return String(text ?? '').replace(/\s+/gu, ' ').trim();
}

function sourceTopic(sourceFile) {
  return sourceFile
    .replace(/^\d+\./u, '')
    .replace(/^\d{8}/u, '')
    .replace(/\.txt$/u, '')
    .trim();
}

function readParagraphs(sourceFile) {
  const text = decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/u)
    .map(normalize)
    .filter(Boolean);
}

function speakerOf(text) {
  const match = text.match(/^([^：:]{1,14})[：:]/u);
  return match ? match[1] : '';
}

function isMetadata(text) {
  return metadataSignals.some((signal) => text.includes(signal));
}

function isLiAoSpeaker(speaker) {
  if (speaker === '李敖' || speaker === '李' || speaker === '敖' || speaker === '答') return true;
  return speaker.startsWith('李敖') && speaker.length <= 8 && !speaker.includes('影音') && !speaker.includes('资源');
}

function isReportedLiAoJudgment(text) {
  if (speakerOf(text)) return false;
  return /李敖(认为|指出|说|表示|强调|主张|批评|反对|提到|笑说)/u.test(text) && text.length >= 90;
}

function isLiAoSpeechParagraph(sourceFile, paragraphIndex) {
  const paragraphNumber = paragraphIndex + 1;
  if (sourceFile.startsWith('003.')) {
    return (paragraphNumber >= 7 && paragraphNumber <= 32)
      || (paragraphNumber >= 111 && paragraphNumber <= 115);
  }
  if (sourceFile.startsWith('005.')) return paragraphNumber >= 12 && paragraphNumber <= 29;
  if (sourceFile.startsWith('008.')) return paragraphNumber >= 11 && paragraphNumber <= 40;
  if (sourceFile.startsWith('009.')) return paragraphNumber >= 12 && paragraphNumber <= 14;
  return false;
}

function isLiAoParagraph(text, sourceFile, paragraphIndex) {
  const speaker = speakerOf(text);
  if (speaker) return isLiAoSpeaker(speaker);
  if (isLiAoSpeechParagraph(sourceFile, paragraphIndex)) return true;
  return isReportedLiAoJudgment(text);
}

function stripSpeaker(text) {
  const speaker = speakerOf(text);
  if (speaker && isLiAoSpeaker(speaker)) {
    return text.replace(/^([^：:]{1,14})[：:]\s*/u, '').trim();
  }
  return text.trim();
}

function categoryScore(text, topic, category) {
  let score = 0;
  for (const keyword of categoryKeywords.get(category) ?? []) {
    if (text.includes(keyword)) score += 1;
    if (topic.includes(keyword)) score += 0.8;
  }
  return score;
}

function classify(text, topic) {
  const hasStrongLegal = /言论自由|思想自由|出版自由|查禁|禁书|宪法|法院|司法|法官|判决|人权|坐牢|监狱|政治犯|审判|诉讼|冤狱|刑求|真调会/u.test(text);
  const hasStrongIntimacy = /爱情|婚姻|女朋友|情人|恋爱|接吻|性爱|性能力|威尔刚|避孕药|情书|追女孩子|追我|追她|丈夫|离婚|休妻|胡茵梦|男女关系/u.test(text);
  const hasStrongCulture = /中文|汉字|母语|白话文|京戏|歌仔戏|文化水平|本土化|大学|教育|北大|清华|复旦|儒家|诸子百家/u.test(text);
  const hasStrongPolitics = /台独|统一|祖国|国民党|共产党|民进党|蒋介石|李登辉|陈水扁|马英九|美国|日本|台湾|中国|大陆|香港|选举|总统|军购|两岸|一国两制/u.test(text);
  const hasStrongMethod = /证据|资料|真相|调查|逻辑|标准|方法|证明|问问题|过程|手段|务实|聪明|技巧|网络|资讯|分类/u.test(text);
  const hasStrongWriting = /写作|文章|小说|文学|出版|著作|读者|演讲|讲演|读书/u.test(text);
  const hasStrongPersonality = /人格|骨气|勇气|尊严|人生|老年|青年|诚实|荣誉|气节|独立|有为主义|死亡|叛徒/u.test(text);

  if (hasStrongLegal) return '法权';
  if (hasStrongIntimacy && !hasStrongPolitics) return '情爱';
  if (hasStrongWriting && !hasStrongPolitics && !hasStrongLegal) return '写作';
  if (hasStrongCulture && !hasStrongPolitics) return '文化';
  if (hasStrongPolitics) return '政治';
  if (hasStrongMethod) return '方法';
  if (/历史|史料|胡适|鲁迅|关公|三国|孔子|蔡元培|利玛窦|司马迁|马克思|林则徐|王国维|学问|知识/u.test(text)) return '知识';
  if (hasStrongPersonality) return '人格';

  const scores = new Map(taxonomy.map((category) => [category, categoryScore(text, topic, category)]));
  if (hasStrongCulture) scores.set('文化', scores.get('文化') + 1.5);
  if (hasStrongWriting) scores.set('写作', scores.get('写作') + 1.5);
  if (hasStrongPersonality) scores.set('人格', scores.get('人格') + 1.2);
  const [topCategory, topScore] = [...scores.entries()].sort((a, b) => b[1] - a[1])[0];
  return topScore <= 0 ? '人格' : topCategory;
}

function scoreParagraph(text, topic, paragraphIndex, sourceFile) {
  if (isMetadata(text)) return -100;
  if (!isLiAoParagraph(text, sourceFile, paragraphIndex)) return -100;

  const stripped = stripSpeaker(text);
  if (stripped.length < 85) return -100;
  if (/^(谢谢|哈哈|是|对|没有|不是|好|不知道|当然|可以|不可以)[。！!，,]?$/u.test(stripped)) return -100;
  if (paragraphIndex <= 2 && stripped.length < 120) return -40;
  if (/^(题目|地点|时间|主持人|观众|记者|转载|内容有点拉杂)/u.test(stripped)) return -100;

  let score = 0;
  const length = stripped.length;
  if (length >= 100 && length <= 360) score += 3;
  if (length > 360 && length <= 900) score += 2.2;
  if (length > 900 && length <= 1400) score += 1;
  if (length > 1400) score -= 2;
  if (speakerOf(text) === '李敖' || speakerOf(text) === '李') score += 1.2;
  if (isLiAoSpeechParagraph(sourceFile, paragraphIndex)) score += 1.4;
  if (isReportedLiAoJudgment(text)) score += 0.7;
  if (/画面|大特写|掌声|广告|观众朋友|欢迎收看|热线|电话|笑声/u.test(stripped)) score -= 1.1;
  if (/妻子一个换一个|货色|暗恋不成|一脸横肉/u.test(stripped) && stripped.length < 180) score -= 2;

  for (const signal of judgmentSignals) {
    if (stripped.includes(signal)) score += 0.75;
  }
  for (const category of taxonomy) {
    score += Math.min(categoryScore(stripped, topic, category), 5) * 0.45;
  }
  if (/我认为|我觉得|我告诉|我主张|我反对|我不承认|我不能接受/u.test(stripped)) score += 1.7;
  if (/这证明|这说明|这告诉|这就是|问题是|为什么/u.test(stripped)) score += 1.4;
  if (/证据|资料|史料|真相|逻辑|制度|自由|民主|法律|中国|台湾|香港|中文|文化|宪法/u.test(stripped)) score += 0.9;

  return score;
}

function quotaForFile(eligibleCount, sourceFile) {
  if (sourceFile.startsWith('003.')) return Math.min(eligibleCount, 18);
  if (sourceFile.startsWith('005.')) return Math.min(eligibleCount, 16);
  if (sourceFile.startsWith('008.')) return Math.min(eligibleCount, 18);
  if (sourceFile.startsWith('009.')) return Math.min(eligibleCount, 12);
  if (sourceFile.startsWith('010.')) return Math.min(eligibleCount, 12);
  if (sourceFile.startsWith('011.')) return Math.min(eligibleCount, 10);
  if (sourceFile.startsWith('006.')) return Math.min(eligibleCount, 8);
  if (eligibleCount >= 15) return 5;
  if (eligibleCount >= 8) return 4;
  if (eligibleCount >= 1) return 1;
  return 0;
}

function compressTitle(text, topic, category) {
  const stripped = stripSpeaker(text);
  let ruleFallback = '';
  for (const [pattern, title] of titleRules) {
    if (!pattern.test(stripped)) continue;
    if (!broadRuleTitles.has(title)) return title;
    ruleFallback = title;
    break;
  }

  const sentences = stripped
    .split(/[。！？；]/u)
    .map((part) => part.replace(/^(所以|可是|但是|因为|因此|事实上|简单说|我认为|我觉得|我告诉你|我告诉大家|大家知道|大家想想看|告诉大家|请问)/u, '').trim())
    .filter((part) => part.length >= 8 && part.length <= 90)
    .filter((part) => !/画面|大特写|掌声|广告|观众朋友|欢迎收看/u.test(part));

  const signalSentence = sentences.find((part) => /应该|不能|不是|就是|证明|真相|历史|自由|民主|中国|台湾|香港|美国|写作|中文|文化|宪法|北大|清华|复旦|爱情|人格/u.test(part));
  if (signalSentence) {
    const cleaned = signalSentence
      .replace(/^[，,。、“”‘’「」：:]+/u, '')
      .replace(/^(所以|可是|但是|因为|因此|事实上|简单说)/u, '')
      .replace(/^(我认为|我觉得|我告诉你|我告诉大家|我告诉各位|我必须讲|我可以告诉你|我和大家说)/u, '')
      .replace(/^(我|我们|大家|各位|你们|他们|这个|这种|一种)/u, '')
      .trim();
    const firstClause = cleaned.split(/[，,：:「『“]/u).find((part) => part.trim().length >= 8)?.trim() ?? cleaned;
    const title = firstClause.slice(0, 22);
    if (!isWeakTitle(title)) return title;
  }

  if (ruleFallback) return ruleFallback;
  return `${sourceTopic(topic).replace(/^《|》$/gu, '')}中的${category}判断`.slice(0, 24);
}

function categoryFromTitle(title, fallback) {
  if (/情爱|爱情|恋爱|男女|婚姻|情书|女朋友|胡茵梦|追我|追她|性能力|威尔刚|避孕药/u.test(title)) return '情爱';
  if (/言论自由|思想自由|出版自由|司法|查禁|禁书|坐牢|监狱|人权|法律|宪法|法权/u.test(title)) return '法权';
  if (/写作|文章|文学|小说|著作|读书|演讲/u.test(title)) return '写作';
  if (/中文|汉字|文化|教育|北大|清华|复旦|大学/u.test(title)) return '文化';
  if (/民主|选举|国民党|共产党|蒋介石|台独|台湾|中华民国|美国|日本|统一|祖国|政治|政府|人民|北洋|香港|一国两制|自由主义/u.test(title)) return '政治';
  if (/人生|青年|人格|骨气|诚实|荣誉|有为主义|死亡/u.test(title)) return '人格';
  if (/历史|胡适|鲁迅|关公|三国|史料|蔡元培|利玛窦|司马迁|马克思|王国维/u.test(title)) return '知识';
  if (/真相|证据|资料|过程|手段|方法|逻辑|标准|务实|聪明|网络|资讯/u.test(title)) return '方法';
  return fallback;
}

function keywordsFor(record) {
  const pool = `${record.title} ${record.category} ${record.source_file} ${record.description}`;
  const picked = [record.category];
  for (const keyword of [
    '李敖', '台湾', '中国', '祖国', '国民党', '共产党', '民进党', '蒋介石', '李登辉', '陈水扁', '马英九',
    '美国', '日本', '台独', '统一', '两岸', '民主', '自由', '言论自由', '查禁', '禁书', '坐牢',
    '宪法', '香港', '北京', '上海', '北大', '清华', '复旦', '自由主义', '蔡元培', '胡适', '利玛窦',
    '真相', '证据', '历史', '中文', '写作', '文化', '网络', '青年', '人生', '爱情',
  ]) {
    if (pool.includes(keyword) && !picked.includes(keyword)) picked.push(keyword);
    if (picked.length >= 4) break;
  }
  return picked;
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) || 0;
    if (count > 0) {
      const suffix = record.source_file.match(/^(\d+)/u)?.[1] ?? record.id;
      record.title = `${record.title}（${suffix}-${record.source_paragraph}）`;
    }
    seen.set(record.title, count + 1);
  }
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
    `# ${bookTitle} 思想索引（提取轮）`,
    '',
    `- 书名：${bookTitle}`,
    `- 轮次：${round}`,
    `- 状态：${status}`,
    `- 条目数：${records.length}`,
    '- 说明：标题用于检索浓缩，description 保留源文本原段落。',
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter((item) => item.count > 0);
}

const selected = [];
const skippedFiles = [];
let sourceParagraphCount = 0;
let eligibleCountTotal = 0;

for (const sourceFile of sourceFiles) {
  const topic = sourceTopic(sourceFile);
  const paragraphs = readParagraphs(sourceFile);
  sourceParagraphCount += paragraphs.length;
  const scored = paragraphs.map((paragraph, index) => {
    const stripped = stripSpeaker(paragraph);
    return {
      sourceFile,
      paragraph,
      paragraphNumber: index + 1,
      score: scoreParagraph(paragraph, topic, index, sourceFile),
      category: classify(stripped, topic),
    };
  });

  const eligible = scored.filter((item) => item.score >= 7.8);
  eligibleCountTotal += eligible.length;
  const quota = quotaForFile(eligible.length, sourceFile);
  const picked = eligible
    .sort((a, b) => b.score - a.score)
    .slice(0, quota)
    .sort((a, b) => a.paragraphNumber - b.paragraphNumber);

  if (!picked.length) {
    skippedFiles.push({ source_file: sourceFile, reason: '未找到达到阈值的李敖判断段' });
  }
  selected.push(...picked);
}

const seenDescriptions = new Set();
const records = [];
const duplicateDescriptions = [];
for (const item of selected) {
  const normalizedDescription = normalize(item.paragraph);
  if (seenDescriptions.has(normalizedDescription)) {
    duplicateDescriptions.push({ source_file: item.sourceFile, source_paragraph: item.paragraphNumber });
    continue;
  }
  seenDescriptions.add(normalizedDescription);

  const rawTitle = compressTitle(item.paragraph, item.sourceFile, item.category);
  const category = categoryFromTitle(rawTitle, item.category);
  records.push({
    id: `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`,
    book: bookTitle,
    round,
    status,
    category,
    title: rawTitle,
    description: item.paragraph,
    source_file: item.sourceFile,
    source_paragraph: item.paragraphNumber,
    source_path: path.join(sourceBookDir, item.sourceFile).split(path.sep).join('/'),
    keywords: [],
    score: Number(item.score.toFixed(2)),
  });
}

ensureUniqueTitles(records);
for (const record of records) {
  record.keywords = keywordsFor(record);
  delete record.score;
}

const book = {
  sequence,
  title: bookTitle,
  slug: 'leeao-shenzhou-cultural-journey',
  sourceDir: sourceBookDir.split(path.sep).join('/'),
  round,
  status,
  note: '本轮从《快意还乡——李敖神州文化之旅》12个旅程、演讲和访谈文本中提取思想索引。源文包含行程报道、主持与记者提问、大学演讲、记者会问答和少量附录，本轮优先保留李敖发言标签、明确归属李敖的判断整理段，以及北大、清华、复旦等无说话人标签的演讲正文。标题用于检索浓缩，description 保留源文本原段落。',
  source_file_count: sourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  eligible_count: eligibleCountTotal,
  record_count: records.length,
  skipped_duplicate_count: duplicateDescriptions.length,
  skipped_duplicates: duplicateDescriptions,
  skipped_files: skippedFiles,
  category_counts: categoryCounts(records),
};

const payload = { taxonomy, book, records };

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), toMarkdown(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), [
  `# ${bookTitle} 提取说明`,
  '',
  `- 源目录：${book.sourceDir}`,
  `- 正文文件：${sourceFiles.length}`,
  `- 源段落数：${sourceParagraphCount}`,
  `- 达阈值候选：${eligibleCountTotal}`,
  `- 提取条目：${records.length}`,
  '- 轮次：提取轮，待校对。',
  '- 取舍：保留李敖发言、明确归属李敖的判断整理段，以及北大、清华、复旦等无说话人标签的演讲正文；剔除主持、记者、旁白、资源信息、制作信息、纯现场说明和过短应答。',
  '- 原文：description 字段逐条取自 GB18030 源文本段落，不做改写。',
  '',
  '## 分类分布',
  '',
  ...book.category_counts.map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n'), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  sourceFiles: sourceFiles.length,
  sourceParagraphs: sourceParagraphCount,
  eligible: eligibleCountTotal,
  records: records.length,
  category_counts: book.category_counts,
  outputDir: path.relative(rootDir, outputDir),
}, null, 2));
