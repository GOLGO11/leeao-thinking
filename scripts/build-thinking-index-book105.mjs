import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '105';
const bookTitle = '李登辉的假面具';
const slug = 'the-mask-of-lee-teng-hui';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '007.李登辉的假面具');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
《李登辉的假面具》引言.txt|3|权力会使小人物得意到以神自居|人格|权力;自大;假面具
001.“新瓶装新酒”吗？.txt|3|政治套语可能建立在错误翻译上|写作|政治套语;翻译;新酒
001.“新瓶装新酒”吗？.txt|4|翻译必须还原词语的历史实物|方法|翻译;词义;历史实物
001.“新瓶装新酒”吗？.txt|5|语句含义必须放回物质背景理解|方法|语境;物质背景;新约
001.“新瓶装新酒”吗？.txt|7|错误前提会让政治比喻失效|写作|政治比喻;错误前提;旧皮袋
002.这是哪门子“新酒”？.txt|2|公开举手会把党内选举变成独裁|政治|举手表决;党内选举;独裁
002.这是哪门子“新酒”？.txt|5|政党会为现实人选破坏自己的法规|法权|党内法规;现实利益;恢复党籍
002.这是哪门子“新酒”？.txt|7|与被开除者合作会暴露规则虚假|法权|开除党籍;合作;规则
002.这是哪门子“新酒”？.txt|8|短视收编会同时腐蚀政治伦理和法规|政治|收编;政治伦理;法规
003.李登辉的户籍.txt|4|新闻事实不能轻易推翻正式公文书|法权|公文书;新闻;事实认定
003.李登辉的户籍.txt|5|事实认定也会成为公务扰民工具|法权|事实认定;公务员;扰民
004.白信封中的黑资料.txt|5|批判文字可能被政党拿来内斗|政治|批判文字;政党;内斗
005.“奸匪李登辉”字眼赫然出现！.txt|2|民主领袖隐藏过去会损害公共信任|政治|民主;领袖;过去
005.“奸匪李登辉”字眼赫然出现！.txt|3|官方秘密记录能够揭开被压住的履历|方法|官方记录;履历;证据
005.“奸匪李登辉”字眼赫然出现！.txt|4|变节者可能比原来所属者更坏|人格|变节;叛徒;人格
006.李登辉的共产党问题.txt|2|文证和图证比道听途说可靠|方法|文证;图证;道听途说
006.李登辉的共产党问题.txt|5|完整交心记录应包含关键事实|方法|交心;关键事实;推论
006.李登辉的共产党问题.txt|7|法律解释可以检验政治履历说法|法权|法律解释;政治履历;脱党
006.李登辉的共产党问题.txt|8|官方秘密文件可以印证隐藏历史|方法|官方文件;隐藏历史;印证
006.李登辉的共产党问题.txt|9|踩着同志命运上升暴露人格大节|人格|同志;升迁;人格
007.李登辉召见林栋慰问个屁.txt|20|统治者会用案件整肃党内派系|政治|案件;派系;整肃
007.李登辉召见林栋慰问个屁.txt|21|领袖慰问问题人物暴露集团伦理|人格|领袖;慰问;集团伦理
008.李登辉“意淫大陆，手淫台湾”.txt|4|政治欲望可以分成远方幻想和近地支配|政治|政治欲望;幻想;支配
008.李登辉“意淫大陆，手淫台湾”.txt|5|对外幻想常与对内支配同时发生|政治|对外幻想;对内支配;权力
008.李登辉“意淫大陆，手淫台湾”.txt|6|中央官署重复设置可能服务政治神话|政治|中央官署;重复设置;政治神话
008.李登辉“意淫大陆，手淫台湾”.txt|7|失去对象的机关会为名义继续膨胀|政治|机关;名义;膨胀
008.李登辉“意淫大陆，手淫台湾”.txt|8|象征性省府会把政治幻觉变成预算|政治|省府;预算;政治幻觉
008.李登辉“意淫大陆，手淫台湾”.txt|9|纸上复国机构会让政治幻想消耗公帑|政治|复国;机构;公帑
008.李登辉“意淫大陆，手淫台湾”.txt|10|中央地方重叠反映象征主权需求|政治|中央地方;重叠;主权
008.李登辉“意淫大陆，手淫台湾”.txt|11|失地名义会成为政权自我麻醉|政治|失地;名义;自我麻醉
009.歪嘴又打朱熹牌！.txt|3|政权会借古代思想控制人民精神|文化|政权;古代思想;精神控制
009.歪嘴又打朱熹牌！.txt|5|政治领袖会把哲学家变成权力招牌|文化|领袖;哲学家;权力
009.歪嘴又打朱熹牌！.txt|6|文本上下文能够揭穿错误引用|方法|文本;上下文;错误引用
009.歪嘴又打朱熹牌！.txt|7|借古人抬高自己是文化权力术|文化|古人;抬高;文化权力
010.为有源头朱熹来！.txt|6|长期掌权会使领袖忘记自身分量|人格|掌权;领袖;自知
010.为有源头朱熹来！.txt|7|官方主导的文化团体只是民间外衣|政治|文化团体;官方;民间外衣
010.为有源头朱熹来！.txt|12|突然密集展示文化也可能只是表演|文化|文化展示;表演;诗词
010.为有源头朱熹来！.txt|30|统治者会把哲学改造成权力工具|文化|哲学;统治者;权力工具
010.为有源头朱熹来！.txt|32|领袖复兴哲学常在延续思想统制|文化|哲学复兴;思想统制;领袖
010.为有源头朱熹来！.txt|34|格物致知把求理连接到政治秩序|知识|格物致知;求理;政治秩序
010.为有源头朱熹来！.txt|35|朱熹与王阳明的分歧在理居物中还是心中|知识|朱熹;王阳明;心物
010.为有源头朱熹来！.txt|36|对立学说也可能共享深层前提|方法|对立学说;前提;比较
010.为有源头朱熹来！.txt|37|道德哲学不能保证实践者的道德|文化|道德哲学;实践;杀人
010.为有源头朱熹来！.txt|38|统治者选择哲学也会服从地域认同|文化|哲学;地域认同;统治者
010.为有源头朱熹来！.txt|39|权力突然推动文化复兴必须受检验|文化|文化复兴;权力;检验
011.财阀伸手捞国策，总统幕后搞“台独”.txt|7|资金来源和人员筛选会塑造研究结论|方法|资金;人员筛选;研究
011.财阀伸手捞国策，总统幕后搞“台独”.txt|8|学术机构也可能成为财阀政治外衣|政治|学术机构;财阀;政治
011.财阀伸手捞国策，总统幕后搞“台独”.txt|10|知识分子参与政治不能冒充学术自主|政治|知识分子;政治;学术自主
011.财阀伸手捞国策，总统幕后搞“台独”.txt|18|用清君侧思路替领袖开脱是错误的|政治|清君侧;领袖;责任
012.李登辉的三民主义阿米巴.txt|4|抽象政治名词会随情势不断变形|写作|抽象名词;变形;三民主义
012.李登辉的三民主义阿米巴.txt|9|概念重叠会暴露分类只是文字戏法|方法|概念重叠;分类;文字戏法
012.李登辉的三民主义阿米巴.txt|10|翻译必须分辨原句的主宾关系|写作|翻译;主宾关系;林肯
012.李登辉的三民主义阿米巴.txt|11|对称译语会掩盖原义的不对称|写作|对称;译语;原义
012.李登辉的三民主义阿米巴.txt|13|概念附会会把思想变成统战工具|政治|概念附会;思想;统战
012.李登辉的三民主义阿米巴.txt|14|排列抽象名词只会制造自欺宣传|写作|抽象名词;宣传;自欺
013.从杨廷椅被枪毙到李登辉是共产党.txt|44|官方秘密记录可以补足报道缺口|方法|官方记录;报道;补足
013.从杨廷椅被枪毙到李登辉是共产党.txt|45|证据不应被省籍感情压倒|方法|证据;省籍;感情
013.从杨廷椅被枪毙到李登辉是共产党.txt|48|评论政治人物必须同时检验过去|政治|政治人物;过去;公开
014.李登辉默认自己曾出卖共产党同志.txt|6|对重大指控保持沉默会被视为默认|方法|沉默;指控;默认
015.李登辉郝柏村岂有一好一坏之分！.txt|6|政变解释必须符合行动者的现实能力|方法|政变;解释;现实能力
015.李登辉郝柏村岂有一好一坏之分！.txt|7|权力双方合则两利时没有政变必要|政治|权力;合作;政变
015.李登辉郝柏村岂有一好一坏之分！.txt|8|政治盟友不能被虚构成一好一坏|政治|政治盟友;好坏;假象
016.谢聪敏再谈泰山与李登辉.txt|12|历史追踪应随新资料不断修正|方法|历史追踪;新资料;修正
016.谢聪敏再谈泰山与李登辉.txt|13|史实追踪和历史解释必须分开检验|方法|史实;解释;检验
016.谢聪敏再谈泰山与李登辉.txt|16|制度和常理可以构成历史反证|方法|制度;常理;反证
016.谢聪敏再谈泰山与李登辉.txt|17|历史解释必须符合实际执法环境|方法|历史解释;执法;环境
016.谢聪敏再谈泰山与李登辉.txt|18|民主候选人必须公开自己的秘密过去|政治|民主候选人;公开;过去
017.李登辉滥调重弹，了无新义.txt|12|旧文件可以检验今日言论是否创新|方法|旧文件;今日言论;检验
017.李登辉滥调重弹，了无新义.txt|13|重复前任口号不能算政治创新|政治|前任;口号;创新
018.李登辉学蒋介石.txt|2|政治人物也会在晚年突然成为异数|政治|政治人物;晚年;异数
018.李登辉学蒋介石.txt|4|旧政权引发的反弹也会成就继承者|政治|旧政权;反弹;继承者
018.李登辉学蒋介石.txt|7|总统应超然于单一政党|政治|总统;政党;超然
018.李登辉学蒋介石.txt|8|总统兼任党主席会使民主倒退|政治|总统;党主席;民主
018.李登辉学蒋介石.txt|10|公开表决会以群体监视胁迫一致|政治|公开表决;监视;一致
018.李登辉学蒋介石.txt|12|长期违宪会让人民习惯权力越界|法权|违宪;人民;权力越界
018.李登辉学蒋介石.txt|13|元首风度首先在绝对节制自己|人格|元首;节制;风度
018.李登辉学蒋介石.txt|14|领袖不炫智逞能才能发挥众人责任|政治|领袖;众人;责任
018.李登辉学蒋介石.txt|15|虚位元首不应亲自管理行政细务|法权|虚位元首;行政;体制
018.李登辉学蒋介石.txt|17|领袖语录成为行政指导就是个人崇拜|政治|领袖语录;行政;个人崇拜
018.李登辉学蒋介石.txt|18|行政首长干预报道会摧毁新闻自由|法权|行政首长;新闻自由;干预
018.李登辉学蒋介石.txt|19|总统指示司法机关会破坏司法独立|法权|总统;司法机关;司法独立
018.李登辉学蒋介石.txt|20|复兴古代哲学也可能延续文化统制|文化|古代哲学;文化统制;复兴
018.李登辉学蒋介石.txt|21|文化复兴组织会延续强人文化工程|文化|文化复兴;强人;政治工程
018.李登辉学蒋介石.txt|22|不让官员预知任命是在展示支配权|人格|官员;任命;支配
018.李登辉学蒋介石.txt|23|只接受外国专访是对本国媒体的轻视|写作|外国媒体;本国媒体;专访
018.李登辉学蒋介石.txt|24|学者形象也能遮蔽威权继承|政治|学者形象;威权;继承
019.李登辉比蒋介石还蒋介石.txt|3|党政领袖合一容易形成一党专制|政治|党政合一;一党专制;领袖
019.李登辉比蒋介石还蒋介石.txt|4|知识分子会作践专业替权力造势|人格|知识分子;专业;权力
019.李登辉比蒋介石还蒋介石.txt|5|垄断党内职位反映拒绝分享权力|政治|党内职位;权力;垄断
019.李登辉比蒋介石还蒋介石.txt|6|继承者会沿着前人铺平的非法道路得权|政治|继承者;非法;权力
019.李登辉比蒋介石还蒋介石.txt|7|官方劝进是威权政治的动员戏法|政治|劝进;威权;动员
019.李登辉比蒋介石还蒋介石.txt|8|只有单一候选人连民主假戏都不成立|政治|单一候选人;民主;选举
019.李登辉比蒋介石还蒋介石.txt|9|公开签名会把忠诚表态变成强制|政治|公开签名;忠诚;强制
019.李登辉比蒋介石还蒋介石.txt|10|废除临时条款不等于终结临时条款心态|法权|临时条款;宪法;责任政治
019.李登辉比蒋介石还蒋介石.txt|11|宪法外机构会不断扩张总统权力|法权|宪法外机构;总统;权力
019.李登辉比蒋介石还蒋介石.txt|12|领袖会因无法控制会议而逃避党章|政治|领袖;会议;党章
019.李登辉比蒋介石还蒋介石.txt|14|厌恶旧统治者会使人忽略其选定的继承者|政治|旧统治者;继承者;忽略
020.评李登辉指示《“二二八事件”研究报告》.txt|5|自称学术就必须接受学术标准约束|方法|学术;标准;自律
020.评李登辉指示《“二二八事件”研究报告》.txt|6|政治目的委托的研究先失去中立性|方法|政治目的;研究;中立
020.评李登辉指示《“二二八事件”研究报告》.txt|7|本朝御用文人难以公正书写当代史|方法|当代史;御用文人;公正
020.评李登辉指示《“二二八事件”研究报告》.txt|27|主观感情不能冒充事实分析|方法|主观感情;事实;分析
020.评李登辉指示《“二二八事件”研究报告》.txt|51|抄录与计数错误会毁掉学术谨严|方法|抄录;计数;学术
020.评李登辉指示《“二二八事件”研究报告》.txt|53|感情可以做宣传却不能代替学术|方法|感情;宣传;学术
020.评李登辉指示《“二二八事件”研究报告》.txt|61|同一来源必须接受同一证据标准|方法|来源;证据标准;一致
020.评李登辉指示《“二二八事件”研究报告》.txt|62|亲见目睹标准必须前后一致|方法|亲见目睹;标准;一致
020.评李登辉指示《“二二八事件”研究报告》.txt|64|学术报告不能捏造无出处的否定语|方法|学术报告;出处;捏造
020.评李登辉指示《“二二八事件”研究报告》.txt|89|只利用证人的有利之言会扭曲证据|方法|证人;选择性引用;证据
020.评李登辉指示《“二二八事件”研究报告》.txt|91|学术不能埋没证据或缺席判决|方法|埋没证据;缺席判决;史学
020.评李登辉指示《“二二八事件”研究报告》.txt|94|口述史缺一方就必须用文字史料补足|方法|口述史;文字史料;补足
020.评李登辉指示《“二二八事件”研究报告》.txt|95|引用资料不能只挑有利部分|方法|引用;资料;选择偏差
020.评李登辉指示《“二二八事件”研究报告》.txt|109|篇幅分配会暴露研究者的价值轻重|写作|篇幅;价值;研究
020.评李登辉指示《“二二八事件”研究报告》.txt|111|事件史的关键在普通受害者而非高官|方法|事件史;普通受害者;高官
020.评李登辉指示《“二二八事件”研究报告》.txt|132|交叉核对附录可以发现被消音的身份|方法|附录;交叉核对;身份
020.评李登辉指示《“二二八事件”研究报告》.txt|139|省略不便原因只会形成媚世学术|方法|原因;省略;媚世学术
020.评李登辉指示《“二二八事件”研究报告》.txt|151|同一作者前后冲突的说法必须对质|方法|作者;前后冲突;对质
020.评李登辉指示《“二二八事件”研究报告》.txt|152|历时比较能够揭穿人物论述反转|方法|历时比较;论述;反转
020.评李登辉指示《“二二八事件”研究报告》.txt|170|归责前必须纳入与结论相反的证据|方法|归责;反证;证据
020.评李登辉指示《“二二八事件”研究报告》.txt|172|省略本地背景就无法解释事件原因|方法|本地背景;事件;原因
020.评李登辉指示《“二二八事件”研究报告》.txt|175|抗暴混入流氓暴力是政治耻辱|政治|抗暴;流氓;暴力
020.评李登辉指示《“二二八事件”研究报告》.txt|184|报告结论不能无视自己附录中的证据|方法|结论;附录;证据
020.评李登辉指示《“二二八事件”研究报告》.txt|191|历史分析必须把关键事实调查落实|方法|历史分析;调查;事实
020.评李登辉指示《“二二八事件”研究报告》.txt|192|敌方证言也能帮助恢复公正判断|方法|敌方证言;公正;判断
020.评李登辉指示《“二二八事件”研究报告》.txt|194|宣称不判责任却加重一方责任是自相矛盾|方法|责任;自相矛盾;报告
020.评李登辉指示《“二二八事件”研究报告》.txt|200|把相关证据分散书写会淡化责任|写作|证据;分散;责任
020.评李登辉指示《“二二八事件”研究报告》.txt|201|常理推断不能只在方便时采用|方法|常理;推断;选择性
020.评李登辉指示《“二二八事件”研究报告》.txt|208|多份证言可以重建地方共谋关系|方法|证言;地方;共谋
020.评李登辉指示《“二二八事件”研究报告》.txt|231|大量死亡估计必须从姓名与特征查起|方法|死亡估计;姓名;特征
020.评李登辉指示《“二二八事件”研究报告》.txt|248|列出可核名册比数字猜谜更可信|方法|名册;数字;可信
020.评李登辉指示《“二二八事件”研究报告》.txt|250|误差高达一半的估计不足以称为统计|知识|统计;误差;估计
020.评李登辉指示《“二二八事件”研究报告》.txt|252|预设立场会使学术研究背离真相|方法|预设立场;学术;真相
020.评李登辉指示《“二二八事件”研究报告》.txt|254|政治可责难缺席者但学术不能如此|方法|缺席者;政治;学术
020.评李登辉指示《“二二八事件”研究报告》.txt|255|公义不能只为自己一方受害发声|人格|公义;受害;双重标准
020.评李登辉指示《“二二八事件”研究报告》.txt|256|后代不应继承族群的集体罪责|法权|后代;族群;集体罪责
020.评李登辉指示《“二二八事件”研究报告》.txt|257|真相判断只能分好坏不能分省籍|人格|真相;好坏;省籍
020.评李登辉指示《“二二八事件”研究报告》.txt|258|知识分子不捍卫真相也会伤害真相|人格|知识分子;真相;捍卫
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|9|口头辩解挡不住可核验的文证|方法|口头辩解;文证;核验
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|12|公职身份也可能成为商业促销杠杆|政治|公职身份;商业;促销
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|32|领导人购买会产生难以估计的广告利益|政治|领导人;购买;广告利益
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|42|土地迅速变更用途会暴露特权|方法|土地;变更;特权
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|47|公共土地快速让售变更必须追查|方法|公共土地;让售;变更
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|63|高层违法会成为后来者仿效的先例|政治|高层;违法;先例
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|68|公共生态不能为私人住宅任意破坏|法权|公共生态;私人住宅;破坏
021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt|91|申报财力无法覆盖购屋就须追查隐情|方法|财力;购屋;隐情
022.中共和它的一个叛徒.txt|5|政治策略会因不了解中间人物而走弯路|政治|政治策略;中间人物;两岸
022.中共和它的一个叛徒.txt|6|权谋不能代替向更高智慧求学|知识|权谋;智慧;求学
`.trim();

const skippedDuplicates = [
  ['006.李登辉的共产党问题.txt', 6, '李登辉的真面目', path.join('《大李敖全集6.0》分章节', '012.人物研究类', '006.李登辉的真面目'), '001.共产党李登辉出卖同志的官方证据.txt', 5],
  ['021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt', 67, '李敖来电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '004.李敖来电集'), '034.2000年5月26日.txt', 22],
  ['021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt', 69, '李敖来电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '004.李敖来电集'), '034.2000年5月26日.txt', 24],
  ['021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt', 72, '李敖来电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '004.李敖来电集'), '035.2000年5月29日.txt', 4],
  ['021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt', 79, '李敖来电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '004.李敖来电集'), '035.2000年5月29日.txt', 11],
  ['021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt', 94, '李敖来电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '004.李敖来电集'), '036.2000年5月30日.txt', 6],
  ['021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt', 116, '李敖来电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '004.李敖来电集'), '037.2000年5月31日.txt', 5],
  ['021.李登辉“鸿禧山庄”贪污舞弊案调查报告.txt', 128, '李敖来电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '004.李敖来电集'), '037.2000年5月31日.txt', 17],
].map(([source_file, source_paragraph, previous_book, previous_source_dir, previous_source_file, previous_source_paragraph]) => ({
  source_file,
  source_paragraph,
  previous_book,
  previous_source_dir,
  previous_source_file,
  previous_source_paragraph,
  reason: '与上一册源段落完全相同，本轮不重复提取',
}));

function sourceFiles() {
  return fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(fileName, dir = sourceDir) {
  return decoder.decode(fs.readFileSync(path.join(dir, fileName))).replace(/\r/g, '')
    .split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
}

function parseSpecs() {
  return specLines.split(/\n+/).map((line, index) => {
    const [fileName, paragraphText, title, category, keywordText, ...extra] = line.split('|');
    if (extra.length || !fileName || !paragraphText || !title || !category || !keywordText) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    if (!categorySet.has(category)) throw new Error(`Invalid category ${category}`);
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
if (bodySourceFiles.length !== 23) throw new Error(`Expected 23 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 825) throw new Error(`Expected 825 paragraphs, found ${sourceParagraphCount}`);

for (const item of skippedDuplicates) {
  const current = paragraphs(item.source_file)[item.source_paragraph - 1];
  const previous = paragraphs(item.previous_source_file, path.join(rootDir, item.previous_source_dir))[item.previous_source_paragraph - 1];
  if (!current || current !== previous) throw new Error(`Previous-book duplicate check failed: ${item.source_file}:${item.source_paragraph}`);
}

const available = new Set(allSourceFiles);
const cache = new Map();
const records = parseSpecs().map((spec, index) => {
  if (!available.has(spec.fileName)) throw new Error(`Missing source file: ${spec.fileName}`);
  if (!cache.has(spec.fileName)) cache.set(spec.fileName, paragraphs(spec.fileName));
  const description = cache.get(spec.fileName)[spec.source_paragraph - 1];
  if (!description) throw new Error(`Missing ${spec.fileName}:${spec.source_paragraph}`);
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

if (records.length !== 145) throw new Error(`Expected 145 records, found ${records.length}`);
for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const record of records) {
    if (seen.has(record[key])) {
      throw new Error(`Duplicate ${key}: ${seen.get(record[key]).source_file}:${seen.get(record[key]).source_paragraph} and ${record.source_file}:${record.source_paragraph}`);
    }
    seen.set(record[key], record);
  }
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
    note: '本轮从《李登辉的假面具》的引言与二十二篇正文中提取李敖自己的思想判断。全书包含新闻报道、官方档案、谢聪敏文章、胡适日记、二二八口述史、政府报告及鸿禧山庄调查材料；本轮只在李敖明确作出翻译考证、史料判断、制度批判、政治伦理、文化评价或调查结论的段落建项，不把被引人物的独立意见计为李敖思想。《鸿禧山庄》一文为李敖与亓丰瑜合写且由李敖总其成，本轮只取李敖纳入正文的分析和总结，不取被引会计师、记者的独立意见。另有一段与上一册源文完全相同，已校验并跳过。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
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
  `- 源段落数：${sourceParagraphCount}`,
  `- 提取条目：${records.length}`,
  `- 与上一册完全相同并跳过的实质段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖自己的翻译考证、史料判断、制度批判、政治伦理、文化评价和调查结论。',
  '- 新闻报道、官方档案、谢聪敏文章、胡适日记、二二八口述史和政府报告，只在李敖明确评价、反驳或归纳的完整段落中随文保留。',
  '- 《鸿禧山庄》一文为李敖与亓丰瑜合写且由李敖总其成，只取李敖纳入正文的分析和总结，不取被引会计师、记者的独立意见。',
  '- 与上一册源文完全相同的一段经逐字校验后跳过，不在总表重复制造条目。',
  '- 二二八报告部分重点索引证据标准、引文一致性、口述史平衡、数字推计和公义原则，不把长篇被引史料逐段当成李敖思想。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 分类统计', '',
  ...payload.book.category_counts.map(({ category, count }) => `- ${category}: ${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  records: records.length,
  source_file_count: bodySourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
