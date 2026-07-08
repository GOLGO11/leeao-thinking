import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const sequence = '091';
const bookTitle = '李敖演讲集';
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

const genericTitles = new Set([
  '国民党叙事要被拆穿',
  '美国神话要被拆穿',
  '共产党问题要放回中国历史',
  '蒋介石叙事要被拆穿',
  '言论自由要靠争取',
  '司法问题要看权力结构',
  '坐牢不能摧毁精神',
  '台独叙事是假的',
  '台独历史被改写',
  '中华民国亡国要按史料看',
  '民主不能只是口号',
  '选举也可以变成思想运动',
  '台湾是中国的一部分',
  '胡适价值要重新放回历史',
  '中文需要被开发',
  '查禁反而留下法权证据',
  '情爱关系要看人性',
  '有为主义反对悲愤',
  '过程和手段比目的更重要',
  '历史判断必须有证据',
  '历史人物不能只看演义',
]);

const dropReasons = new Map();
const addDrops = (ids, reason) => {
  for (const id of ids) dropReasons.set(id, reason);
};

addDrops(
  [2, 19, 23, 28, 43, 54, 81, 85, 97, 111, 152, 158, 169, 173, 186, 191, 202, 227],
  '偏现场铺陈、自我宣传、趣谈转场或与相邻条目相比索引独立性较弱',
);
addDrops(
  [16, 99, 122, 193],
  '与同场相邻条目主题重复，校对轮保留判断更完整或标题更清楚者',
);

const explicitTitles = new Map([
  [1, '诚实荣誉要靠实行'],
  [3, '关公形象要回到正史'],
  [4, '历史评介要看正史'],
  [24, '酷刑不能用诡辩推卸责任'],
  [39, '道德标准要配合现实经济'],
  [49, '佛教原始精神反对造神'],
  [50, '信命不如相信造命'],
  [64, '爱真理要胜过爱老师'],
  [66, '生活条件要配合研究条件'],
  [72, '殉情不能浪漫化'],
  [74, '中国文学被语言隔开'],
  [81, '《北京法源寺》是思想小说'],
  [87, '民主不只是人头计数'],
  [103, '评价事物也可以比大'],
  [104, '中文能力关系表达能力'],
  [107, '海洋经验也要有哲理思考'],
  [116, '陈水扁不是政治犯'],
  [120, '台湾文化土壤难生思想家'],
  [128, '女人参政论背后是政治观'],
  [147, '努力可以弥补天才不足'],
  [148, '读书要切割分类做资料'],
  [151, '间接经验也能滋养爱情'],
  [159, '实际问题重于学理钻研'],
  [164, '思想人物不同于政治人物'],
  [165, '现代抗议要理性表达'],
  [178, '写作数量不等于效果'],
  [181, '知识分子不能独善其身'],
  [185, '选举不能停在蓝绿二分'],
  [211, '溥心畬代表文人画余脉'],
  [212, '舞台表达要靠肢体语言'],
  [213, '穷达问题要看合作能力'],
  [214, '学问不该排斥旁门知识'],
  [221, '货殖智慧也能改变人生观'],
  [223, '救国英雄不必是好人'],
  [225, '读书靠复习和抓重点'],
  [226, '美国人生观倾向寅支卯粮'],
  [229, '沉默也是审判中的抵抗'],
  [239, '简体字也有传统来源'],
  [240, '威权时代不能选择服从'],
  [10, '国民党不肯放逐反对者'],
  [11, '美国移民仍难舍中国'],
  [14, '民进党也学党纪处分'],
  [33, '金钱外交换不来尊严'],
  [44, '目标不能当成结果'],
  [47, '特殊国与国关系必须面对战争'],
  [55, '民主自由也有第一优先'],
  [60, '独立必须经过战争检验'],
  [61, '总统不能只看地方身份'],
  [62, '两国论进宪法也不敢做'],
  [63, '屈服等待也是生存策略'],
  [67, '大陆需要时间走向自由民主'],
  [68, '查宋楚瑜也要查全部责任'],
  [70, '美国也曾向人民开枪'],
  [71, '看大陆要想到五十年前台湾'],
  [73, '弱小台湾也可借强邻获利'],
  [75, '证据还要靠解释本领'],
  [76, '真理未普遍时要重复'],
  [78, '香港终审权要看法治权力'],
  [82, '候选人进校园也是言论自由'],
  [83, '李登辉问题来自蒋经国选择'],
  [84, '电视言论自由受新闻局压制'],
  [86, '大学教育失败要靠自己突破'],
  [88, '希望不能当成结论'],
  [89, '谈判名义要由谈判产生'],
  [90, '做烈士是失败者'],
  [91, '蒋介石反攻口号困住台湾'],
  [92, '小国谈判也能占便宜'],
  [93, '候选人要比较优缺点'],
  [94, '一国两制谈判可反置责任'],
  [98, '民进党执政县市也会腐败'],
  [102, '战争幻想不能只算人口'],
  [112, '台湾民主经验是大陆所无'],
  [113, '关门政策挡不住大陆邻居'],
  [114, '一厢情愿的两国论没有用'],
  [115, '政治意见要以可行性衡量'],
  [117, '施性忠用幽默反制国民党'],
  [119, '台湾可以反向利用强邻'],
  [121, '李敖思想可延续谈判精神'],
  [123, '两国论会破坏两岸谈判气氛'],
  [133, '写蒋介石评传也要公道'],
  [134, '两岸谈判已有可取条件'],
  [135, '选举不是选圣人'],
  [136, '白色恐怖斗争资格来自第一线'],
  [141, '台湾存活来自等待机会'],
  [142, '李远哲伪善要拿证据拆穿'],
  [143, '假信暴露李远哲伪善'],
  [144, '国民党下台才有安全机会'],
  [145, '少年观护要突破再犯循环'],
  [153, '追女孩子不能怕拒绝'],
  [154, '英雄人物不是一般人做得了'],
  [156, '一中宪法架构让共产党占据主动'],
  [157, '去中国化教育不会生根'],
  [160, '查禁清单证明言论压制'],
  [161, '争取自由要聪明避免暴力'],
  [162, '中国人民不该放弃自由'],
  [163, '擦边球也是言论自由方法'],
  [167, '清华传统重务实富强'],
  [168, '美国人权高调经不起人口现实'],
  [170, '硬塞文化不会生根'],
  [175, '台独不是革命势力'],
  [176, '看祖国进步不需要做梦'],
  [177, '阻止军购也是落实统一'],
  [180, '胡适助人不必被说成收买'],
  [182, '香港反抗不应学台湾叫嚣'],
  [183, '台湾自由民主也不开放记者'],
  [184, '一国两制争议核心在一国'],
  [188, '根本问题不解决救不了个案'],
  [189, '反抗可怜人需要民主修养'],
  [190, '首都市长可放大抵抗力量'],
  [194, '民进党台独公投是做戏'],
  [195, '不信国民党也不信台独'],
  [196, '开放三通才能摆脱反共教育'],
  [197, '台湾文学先天缺少累积'],
  [199, '给共产党时间不等于放弃自由'],
  [201, '不要做无意义牺牲者'],
  [203, '北大不再请我证明言论边界'],
  [204, '反对者不能比对象更退步'],
  [206, '共产党太臭会损害正面话语'],
  [209, '给共产党机会要看历史残局'],
  [218, '香港可以作为自由支点'],
  [219, '陈方安生应有中国认同'],
  [220, '禁书仍有市场价值'],
  [222, '历史研究要靠强史料'],
  [230, '台独三十年无人敢做'],
  [231, '宪法权利常被现实取消'],
  [232, '台独历史会遗忘真正坐牢者'],
  [233, '郑南榕之死真相被改写'],
  [236, '情报误判也会制造台独罪名'],
  [237, '自救宣言不是台独运动'],
  [238, '台湾文学情结应放弃小格局'],
  [27, '宪法领土证明中华民国亡国'],
  [42, '《蓝色的毛毯》暴露左派启蒙'],
  [53, '大学生应像五四学生站出来'],
  [77, '追求真相要敢翻案'],
  [79, '反攻无望论曾被围剿'],
  [101, '台语没有文字难成文学'],
  [108, '国家资格还要别人承认'],
  [126, '母语政策会制造族群冲突'],
  [208, '权利法案应译为权利清单'],
]);

const titleRules = [
  [/主义是假的、国民党是假的、共产党是假的、民进党也是假的/u, '台湾政治充满假主义'],
  [/为了政治的原因.*抹杀一个历史的事实/u, '政治目标不能抹杀事实'],
  [/国民党.*吃“?台独”?的饭/u, '国民党靠台独焦虑续命'],
  [/不轻易受共产党的骗.*不给国民党骗.*不给民进党骗/u, '冷静拒绝蓝绿红骗局'],
  [/法官和国民党的司法.*荒谬/u, '打官司是留下司法记录'],
  [/不肯复兴这种“流刑”文化/u, '国民党不肯放逐反对者'],
  [/人才外流.*为美国人做事/u, '移民也要反省中国资源'],
  [/反对党.*学国民党/u, '反对党复制国民党制度'],
  [/党纪处分.*民进党还在学/u, '民进党继承党纪政治'],
  [/美国怎么独立的.*我们要不要跟中共打一仗/u, '台独类比美国必须面对战争'],
  [/台静农.*每天写多少.*18个字/u, '学问不能靠名声代替'],
  [/陶百川.*人权御史/u, '人权招牌不能遮住旧罪'],
  [/1950年3月13号.*中华民国.*亡国/u, '中华民国亡国要看原文'],
  [/个人价值尊严开始觉悟/u, '个人尊严会冲淡党国身份'],
  [/瞪眼人生/u, '勇者要敢于瞪眼'],
  [/拶指|原子笔夹/u, '酷刑不能用诡辩推卸责任'],
  [/一国两制.*不是目的而是手段/u, '一国两制是谈判手段'],
  [/祖国救了香港|索罗斯/u, '香港金融风暴暴露国家力量'],
  [/共产党.*死爱面子/u, '谈判要利用对方面子弱点'],
  [/大学生站在第二线.*政客/u, '大学生不该站在政客背后'],
  [/二十八个国家.*人口百分之一点五/u, '金钱外交换不来尊严'],
  [/蓝色的毛毯|李远哲/u, '李远哲的社会主义启蒙要看原文'],
  [/袁世凯.*孙中山.*勾结外国人/u, '革命政权也会勾结外力'],
  [/台独的人那么少.*不是玩真的/u, '台独若玩真的人数不会这么少'],
  [/暴君专制.*暴民专制/u, '暴民专制也会压制真话'],
  [/鉴定政治人物.*上升.*下降/u, '鉴定政治人物要看趋势'],
  [/孙中山的《三民主义》.*害到现在/u, '三民主义也会拖累共产党'],
  [/五星旗.*四个阶级/u, '国旗叙事会暴露阶级神话'],
  [/生活条件和战斗条件一致/u, '制度强弱要看生活战斗条件'],
  [/石原慎太郎|抹杀事实的军国主义/u, '日本军国主义不能抹杀事实'],
  [/在美国的台湾人没有资格喊台湾独立/u, '海外台独没有资格决定台湾'],
  [/打了一仗.*美国打赢独立/u, '兄弟之邦必须先面对战争'],
  [/可以说人生气了.*不可以说台湾人生气了/u, '族群广告是在挑拨身份'],
  [/七出|丈夫有七个理由/u, '传统婚姻伦理偏护女性'],
  [/表达的能力才有言论/u, '言论自由需要表达能力'],
  [/五四运动.*大学生.*站出来/u, '大学生应站在政客前面'],
  [/对我所讲的话负责任/u, '言论自由要用真名负责'],
  [/四个国民党/u, '总统选举面对四个国民党'],
  [/代议政治.*政党政治/u, '人口爆炸催生代议政治'],
  [/中华民国.*绝对是自欺欺人/u, '中华民国领土叙事是自欺'],
  [/台湾民主国抵抗日本148天/u, '台湾存活来自等待机会'],
  [/一国两制.*公开讲出来/u, '一国两制应公开讨论'],
  [/反攻没有希望|反攻无望论/u, '反攻无望是被围剿的真话'],
  [/胡适先生.*不要脸的人/u, '胡适的价值在敢讲真话'],
  [/越王勾践.*卧薪/u, '常识典故也要查原文'],
  [/追求真相.*年龄很小/u, '思想新旧不看年龄'],
  [/女孩子.*接吻|Let me teach you/u, '爱情表达也要学习'],
  [/好的中文.*开发.*词库/u, '中文开发能提高表达'],
  [/只有语言，没有文字/u, '语言没有文字就难以深耕'],
  [/一国两制.*反对的是一国/u, '台湾反对的是一国不是两制'],
  [/伟大的知识分子.*跟政府作对/u, '知识分子要向政府发表异议'],
  [/和平关系.*未来的保障/u, '两岸和平要靠谈判关系'],
  [/美国.*恐怖的平衡/u, '对共产党要建立恐怖平衡'],
  [/台湾是一个漂亮的女孩子.*地主恶霸/u, '弱小台湾也可借强邻获利'],
  [/文化土壤.*不能够产生好的思想家/u, '台湾文化土壤难生思想家'],
  [/美国人保护我们.*国际在干什么/u, '台湾谈判仍受美国保护'],
  [/台湾总统要选台湾之子|小圈圈|黄圈圈/u, '本土身份口号是在划圈'],
  [/清查国民党党产.*通通都是不可信/u, '清查党产承诺未必可信'],
  [/文化成长里面只有语言，没有文字/u, '文字缺位会阻断文化传播'],
  [/为了真理.*牺牲朋友/u, '为了真理要牺牲朋友'],
  [/政治是肮脏的.*女人/u, '反女人参政论来自政治厌恶'],
  [/言论自由标杆/u, '言论自由标杆也会被打压'],
  [/猪.*美国进口猪/u, '政见要落到产业数字'],
  [/偏安政权/u, '中华民国只是偏安政权'],
  [/放弃台独.*放弃族群的挑拨/u, '放弃台独才能消除危险'],
  [/蒋介石.*秘密手令/u, '国民党党产来自秘密手令'],
  [/过分理想|宋楚瑜是比较稳健/u, '总统选择要比较危险程度'],
  [/五个委员之一/u, '台独历史会遗忘真正坐牢者'],
  [/孙中山写给.*大隈/u, '孙中山革命也曾求助日本'],
  [/勇敢的维护他的理想/u, '人生要相信并维护理想'],
  [/中国政策都是不可行/u, '蓝绿中国政策都不可行'],
  [/台商.*每年.*200亿美金/u, '台商经济会改变两岸现状'],
  [/李远哲.*不公道的方法/u, '李远哲介入选举违背标准'],
  [/没有钱吃营养午餐.*买.*武器/u, '军购会挤压民生'],
  [/政治犯.*不是因/u, '政治犯标签不能乱贴'],
  [/国歌.*没有列举/u, '台独连国歌都不敢换'],
  [/零八宪章.*中华人民共和国宪法/u, '零八宪章赶不上宪法文本'],
  [/六四.*邓小平选集/u, '查禁六四反会留下文本证据'],
  [/自由、爱情都要开清单/u, '自由要用清单兑现'],
  [/中文.*有机会|文字都有机会/u, '中文文字也有新时代机会'],
  [/马克·吐温.*电话/u, '机会出现时不能错过'],
  [/有为主义/u, '有为主义反对悲愤'],
  [/20%.*什么都反对/u, '反对者中总有固定比例'],
  [/先天下之忧而忧/u, '知识分子不能独善其身'],
  [/香港.*民主.*空的口号/u, '香港经验说明民主不是第一优先'],
  [/一国两制.*不反对两制/u, '台湾反对一国不反对两制'],
  [/坏的中央政府.*都要抵抗/u, '地方也可抵抗坏中央'],
  [/美国人不会来救我们/u, '美国不会替台湾承担战争'],
  [/台湾关系法.*美国说得很清楚/u, '台湾关系法保护的是美国利益'],
  [/精神文明.*凭什么/u, '精神文明管制缺乏正当性'],
  [/穷不是共产主义/u, '共产主义不能等同于贫穷'],
  [/文人画/u, '溥心畬代表文人画余脉'],
  [/动作来表达我们的感情/u, '舞台表达要靠肢体语言'],
  [/穷达的问题/u, '穷达问题要看合作能力'],
  [/矿物学/u, '学问不该排斥旁门知识'],
  [/外国兵不再骑着马/u, '国家价值在赶走外国兵'],
  [/英国人.*给香港.*自由.*法治.*没有民主/u, '香港殖民经验重自由法治轻民主'],
  [/刘晓波.*赞成台独.*西藏独立/u, '刘晓波判断并不清楚'],
  [/香港.*支点/u, '香港可以成为中国自由支点'],
  [/禁书.*大陆都不能出版/u, '禁书仍有市场价值'],
  [/货殖列传/u, '货殖智慧也能改变人生观'],
  [/救国的英雄们，都不是好人/u, '救国英雄不必是好人'],
  [/英国认错|未早推行民主/u, '英国欠香港民主改革'],
  [/抓到重点|复习/u, '读书靠复习和抓重点'],
  [/言论自由是在老板身上/u, '言论自由会转移到资本家手中'],
  [/郑南榕.*没有台独/u, '郑南榕起初争的是言论自由'],
  [/台湾在没落/u, '台湾应承认自身没落'],
  [/外蒙古比台湾大45倍/u, '台湾不该把自己缩小'],
  [/威权时代.*选择服从/u, '威权时代不能选择服从'],
];

const categoryOverrides = new Map([
  [4, '知识'],
  [24, '法权'],
  [32, '政治'],
  [39, '方法'],
  [49, '文化'],
  [50, '人格'],
  [64, '人格'],
  [66, '方法'],
  [72, '情爱'],
  [74, '文化'],
  [75, '方法'],
  [87, '政治'],
  [103, '方法'],
  [104, '文化'],
  [107, '文化'],
  [120, '文化'],
  [128, '政治'],
  [129, '法权'],
  [134, '方法'],
  [138, '人格'],
  [147, '方法'],
  [148, '方法'],
  [159, '方法'],
  [165, '人格'],
  [167, '文化'],
  [171, '文化'],
  [178, '写作'],
  [181, '人格'],
  [185, '政治'],
  [192, '政治'],
  [196, '政治'],
  [197, '文化'],
  [198, '法权'],
  [200, '政治'],
  [211, '文化'],
  [212, '文化'],
  [213, '人格'],
  [214, '知识'],
  [225, '方法'],
  [226, '文化'],
  [229, '法权'],
  [239, '文化'],
  [10, '法权'],
  [11, '政治'],
  [33, '政治'],
  [47, '政治'],
  [55, '政治'],
  [60, '政治'],
  [61, '政治'],
  [62, '政治'],
  [63, '政治'],
  [67, '政治'],
  [68, '法权'],
  [70, '政治'],
  [71, '政治'],
  [73, '政治'],
  [76, '方法'],
  [78, '法权'],
  [82, '法权'],
  [83, '政治'],
  [84, '法权'],
  [86, '人格'],
  [88, '方法'],
  [89, '政治'],
  [90, '人格'],
  [91, '政治'],
  [92, '方法'],
  [93, '政治'],
  [94, '方法'],
  [98, '政治'],
  [102, '政治'],
  [106, '法权'],
  [112, '政治'],
  [113, '政治'],
  [114, '政治'],
  [115, '方法'],
  [117, '政治'],
  [119, '政治'],
  [121, '政治'],
  [123, '政治'],
  [133, '方法'],
  [135, '政治'],
  [136, '法权'],
  [141, '政治'],
  [142, '政治'],
  [143, '政治'],
  [144, '政治'],
  [145, '人格'],
  [153, '情爱'],
  [154, '人格'],
  [156, '政治'],
  [157, '文化'],
  [160, '法权'],
  [161, '法权'],
  [162, '政治'],
  [163, '法权'],
  [166, '法权'],
  [168, '政治'],
  [170, '文化'],
  [175, '政治'],
  [176, '政治'],
  [177, '政治'],
  [180, '人格'],
  [182, '政治'],
  [183, '法权'],
  [188, '政治'],
  [189, '政治'],
  [190, '政治'],
  [194, '政治'],
  [195, '政治'],
  [196, '政治'],
  [197, '文化'],
  [199, '法权'],
  [201, '人格'],
  [203, '法权'],
  [204, '政治'],
  [206, '政治'],
  [209, '政治'],
  [218, '法权'],
  [219, '政治'],
  [220, '法权'],
  [221, '方法'],
  [222, '方法'],
  [230, '政治'],
  [231, '法权'],
  [232, '政治'],
  [233, '政治'],
  [236, '政治'],
  [237, '政治'],
  [238, '文化'],
  [53, '法权'],
  [108, '政治'],
  [208, '法权'],
]);

function sourceSeq(record) {
  const match = String(record.source_id || record.id || '').match(/(\d+)$/);
  if (!match) throw new Error(`无法解析记录编号：${record.id}`);
  return Number(match[1]);
}

function stripSpeaker(text) {
  return String(text || '').replace(/^李敖[：:]\s*/u, '').replace(/^答[：:]\s*/u, '').trim();
}

function baseTitle(title) {
  return String(title || '').replace(/（\d+(?:-\d+)*）$/u, '').trim();
}

function cleanTitle(text) {
  return String(text || '')
    .replace(/^[，。；：、\s]+/u, '')
    .replace(/^(所以|可是|但是|并且|同时|我认为|我觉得|我告诉各位|我告诉大家|我告诉你们|大家注意|换句话说|这就是|原因就是|问题是)/u, '')
    .replace(/[“”"「」『』]/gu, '')
    .replace(/[，。；：、！？].*$/u, '')
    .replace(/\s+/gu, '')
    .slice(0, 18);
}

function fallbackTitle(record) {
  const text = stripSpeaker(record.description);
  const parts = text
    .split(/[。！？；]/u)
    .map((part) => part.trim())
    .filter((part) => part.length >= 12 && part.length <= 120)
    .filter((part) => !/谢谢|请坐|我懂你意思|我来答复|大家想想看|举个例子/u.test(part));

  const signal = parts.find((part) => /不能|不要|应该|必须|不是|就是|证明|真相|历史|自由|民主|中国|台湾|美国|国民党|共产党|台独|宪法|中文/u.test(part));
  const title = cleanTitle(signal || parts[0] || baseTitle(record.title));
  if (title.length >= 6 && !/^(这个|这里|然后|什么原因|为什么|事实上)$/u.test(title)) {
    return title;
  }
  return `${record.category}判断要看原文`;
}

function proofreadTitle(record) {
  const seq = sourceSeq(record);
  if (explicitTitles.has(seq)) return explicitTitles.get(seq);

  const text = stripSpeaker(record.description);
  for (const [pattern, title] of titleRules) {
    if (pattern.test(text)) return title;
  }

  const originalBase = baseTitle(record.title);
  if (!genericTitles.has(originalBase) && originalBase.length >= 6 && !/^(然后呢|事实上|这就是|讲这些|进来这个|那是因为)/u.test(originalBase)) {
    return originalBase;
  }

  return fallbackTitle(record);
}

function categoryFromTitle(title, fallback) {
  if (/爱情|情爱|婚姻|殉情|男女|女朋友|妻|恋爱/u.test(title)) return '情爱';
  if (/言论自由|司法|法权|宪法|审判|政治犯|查禁|禁书|权利|法院|酷刑|坐牢|白色恐怖/u.test(title)) return '法权';
  if (/中文|文字|语言|文人画|舞台|佛教|文化|文学|艺术|殖民经验/u.test(title)) return '文化';
  if (/写作|小说|读书|文章|表达|词库|题目/u.test(title)) return '写作';
  if (/证据|资料|史料|方法|标准|可行性|条件|复习|抓重点|判断|真相|谈判手段|清单|机会/u.test(title)) return '方法';
  if (/人格|尊严|理想|人生|诚实|荣誉|瞪眼|真理|有为主义|独善其身|反对者|穷达|服从/u.test(title)) return '人格';
  if (/历史|关公|正史|典故|胡适|学问|知识|溥心畬|顾维钧/u.test(title)) return '知识';
  if (/台湾|中国|美国|日本|国民党|民进党|共产党|蒋介石|孙中山|李登辉|陈水扁|宋楚瑜|台独|一国两制|中华民国|两岸|香港|选举|民主|国家|军购|蓝绿|政权|革命|政治/u.test(title)) return '政治';
  return fallback;
}

function keywordsFor(record, title, category) {
  const pool = `${title} ${category} ${record.source_file || ''} ${(record.keywords || []).join(' ')}`;
  const seeds = [
    '李敖', '台湾', '中国', '国民党', '民进党', '共产党', '蒋介石', '李登辉', '陈水扁', '宋楚瑜',
    '美国', '日本', '香港', '台独', '一国两制', '中华民国', '民主', '言论自由', '宪法', '查禁',
    '白色恐怖', '胡适', '孙中山', '刘晓波', '中文', '佛教', '爱情', '读书', '军购', '知识分子',
  ];
  const picked = [category];
  for (const seed of seeds) {
    if (pool.includes(seed) && !picked.includes(seed)) picked.push(seed);
    if (picked.length >= 4) break;
  }
  return picked;
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

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) || 0;
    if (count > 0) {
      record.title = `${record.title}（${record.source_file.match(/^(\d+)/u)?.[1] || record.source_paragraph}-${record.source_paragraph}）`;
    }
    seen.set(record.title, count + 1);
  }
}

function categoryCounts(records) {
  return categories
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter((item) => item.count > 0);
}

function buildNote(inputRecords, outputRecords) {
  const byReason = new Map();
  for (const [id, reason] of dropReasons.entries()) {
    if (!byReason.has(reason)) byReason.set(reason, []);
    byReason.get(reason).push(id);
  }

  const lines = [
    `# ${bookTitle} 校对说明`,
    '',
    `- 提取轮条目：${inputRecords.length}`,
    `- 校对轮保留：${outputRecords.length}`,
    `- 校对轮剔除：${inputRecords.length - outputRecords.length}`,
    '- 校对原则：description 保持原文，不改写；剔除现场铺陈、自我宣传、相邻重复和索引独立性弱的条目；将模板标题改成可检索的具体思想判断句。',
    '',
    '## 剔除记录',
    '',
  ];

  for (const [reason, ids] of byReason.entries()) {
    lines.push(`- ${reason}：${ids.map((id) => `LAT091-${String(id).padStart(3, '0')}`).join('、')}`);
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
const inputRecords = Array.isArray(inputPayload) ? inputPayload : inputPayload.records;
if (!Array.isArray(inputRecords)) {
  throw new Error('提取轮 JSON 未找到 records 数组');
}

const inputSeqs = new Set(inputRecords.map(sourceSeq));
const missingDrops = [...dropReasons.keys()].filter((id) => !inputSeqs.has(id));
const missingTitles = [...explicitTitles.keys()].filter((id) => !inputSeqs.has(id));
const missingCategories = [...categoryOverrides.keys()].filter((id) => !inputSeqs.has(id));
if (missingDrops.length || missingTitles.length || missingCategories.length) {
  throw new Error(`校对配置包含不存在的 id：drops=${missingDrops.join(',')} titles=${missingTitles.join(',')} categories=${missingCategories.join(',')}`);
}

const records = [];
for (const record of inputRecords) {
  const seq = sourceSeq(record);
  if (dropReasons.has(seq)) continue;

  const title = proofreadTitle(record);
  const category = categoryOverrides.get(seq) || categoryFromTitle(title, record.category);
  if (!categorySet.has(category)) {
    throw new Error(`未知分类：${record.id} ${category}`);
  }

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
  book: {
    ...(inputPayload.book || {}),
    sequence,
    title: bookTitle,
    round: '校对轮',
    status: '已校对',
    note: '校对轮剔除现场铺陈、自我宣传、相邻重复和索引独立性较弱的条目；将模板标题改成可检索的具体思想判断句，并收整政治、法权、文化、知识、方法、人格、写作、情爱分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    record_count: records.length,
    candidate_count: inputRecords.length,
    skipped_duplicate_count: 0,
    skipped_duplicates: [],
    category_counts: categoryCounts(records),
    source_count: inputRecords.length,
    dropped_count: inputRecords.length - records.length,
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
