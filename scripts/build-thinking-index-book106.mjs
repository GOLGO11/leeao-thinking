import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '106';
const bookTitle = '郑南榕研究';
const slug = 'cheng-nan-jung-study';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '008.郑南榕研究');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
《郑南榕研究》自序.txt|3|知识分子的抱负在挽回狂澜|人格|知识分子;抱负;狂澜
《郑南榕研究》自序.txt|5|郑南榕的核心功绩是争取言论自由|法权|郑南榕;言论自由;功绩
《郑南榕研究》自序.txt|6|为真实理念牺牲高于政治宗教解释|人格|真实理念;牺牲;信仰
001.党外·党内·性.txt|5|知识狭窄会限制政治判断|知识|知识范围;狭窄;政治判断
001.党外·党内·性.txt|6|政治青年不应现实小气|人格|青年;现实;是非标准
001.党外·党内·性.txt|7|优异应是全面表现|人格|优异;全面;标准
001.党外·党内·性.txt|10|社会环境塑造青年|文化|社会教育;环境;青年
001.党外·党内·性.txt|11|合法抗议也须以身作则|人格|抗议;以身作则;烟酒公卖
001.党外·党内·性.txt|12|抵制策略必须落实个人实践|方法|抵制;实践;合法方法
001.党外·党内·性.txt|15|仓促组党会制造内部独裁|政治|组党;独裁;分赃
001.党外·党内·性.txt|17|受威吓便改组党主张暴露怯弱|人格|威吓;组党;勇气
001.党外·党内·性.txt|20|岛屿处境容易强化地域意识|文化|岛屿;地域意识;环境
001.党外·党内·性.txt|22|比较地域意识必须考察大陆关系|方法|地域意识;比较;大陆关系
001.党外·党内·性.txt|24|受压群体的排斥会随环境改善|文化|受压群体;排斥;环境
001.党外·党内·性.txt|26|地域意识可沦为政治工具|政治|地域意识;政治斗争;是非
001.党外·党内·性.txt|27|群众动员不能牺牲语言进步|文化|群众运动;语言;进步
001.党外·党内·性.txt|30|多本周刊可突破言论垄断|政治|周刊;言论自由;垄断
001.党外·党内·性.txt|32|党外刊物不能以销量背离目标|写作|党外杂志;销量;目标
001.党外·党内·性.txt|34|政治刊物须兼具事实深度|写作|政治刊物;事实;深度
001.党外·党内·性.txt|36|新闻性过强会削弱理论性|写作|新闻性;理论性;刊物
001.党外·党内·性.txt|42|政党不能用现在洗掉历史|政治|政党;历史;合法性
001.党外·党内·性.txt|43|理解当下必须追溯历史|方法|当下;历史;追溯
001.党外·党内·性.txt|44|理解政党必须追查传统根源|方法|政党;传统;寻根
001.党外·党内·性.txt|46|历史包袱越深越需要历史方法|方法|历史方法;传统包袱;中国
001.党外·党内·性.txt|53|坐牢也应坐出英雄气|人格|坐牢;英雄;示范
001.党外·党内·性.txt|57|作家水准应以整体表现判断|写作|作家;整体表现;可读性
001.党外·党内·性.txt|59|比较人物必须限定时代范围|方法|比较;时代;范围
001.党外·党内·性.txt|63|知识储备决定持续输出能力|知识|知识储备;输出;江郎才尽
001.党外·党内·性.txt|65|学者狭窄会阻碍大思想|知识|学者;狭窄;大思想
001.党外·党内·性.txt|67|名声会诱使专家越界发言|知识|专家;名声;越界
001.党外·党内·性.txt|70|强者有能力面对错误|人格|强者;错误;道歉
001.党外·党内·性.txt|72|认错是勇气的表现|人格|认错;勇气;知耻
001.党外·党内·性.txt|75|群众魅力来自胆识表达|人格|群众魅力;胆识;表达
001.党外·党内·性.txt|76|文章气势依靠人格力量|写作|文章;人格力量;气势
001.党外·党内·性.txt|77|没有生命力的作品难以传播|写作|生命力;作品;传播
001.党外·党内·性.txt|78|好作家必须有持久生命力|写作|作家;生命力;持久
001.党外·党内·性.txt|86|性不该成为无意义的禁忌|情爱|性;禁忌;人生
001.党外·党内·性.txt|88|两性关系应该单纯快乐|情爱|两性关系;单纯;快乐
002.言论自由第一优先.txt|43|原则坚持的意义常被当时忽视|人格|原则;坚持;长远意义
002.言论自由第一优先.txt|46|民主契约仍须受原则约束|法权|民主契约;原则;程序
002.言论自由第一优先.txt|48|选举不能成为拘束言论的理由|法权|选举;言论自由;契约
002.言论自由第一优先.txt|49|言论自由是第一自由|法权|言论自由;第一自由;宪法
002.言论自由第一优先.txt|50|多数程序无权剥夺言论自由|法权|多数程序;言论自由;自变数
002.言论自由第一优先.txt|51|不可牺牲原则换取可疑利益|人格|原则;利益;甘地
003.是该打屁股的！.txt|4|挂名仍会产生法律外责任|人格|挂名;责任;品管
003.是该打屁股的！.txt|9|史源错误会削弱正确批判|方法|史源;批判;历史
003.是该打屁股的！.txt|11|追查史料必须找到最早来源|方法|史料;来源;史源学
003.是该打屁股的！.txt|12|文章下笔必须严谨|写作|文章;严谨;品管
004.给林正杰先生的公开信.txt|9|不合作也能传递反省讯号|人格|不合作;反省;讯号
004.给林正杰先生的公开信.txt|14|对人的评价不能随利用价值翻转|人格|评价;利用;是非
004.给林正杰先生的公开信.txt|23|漂亮承诺必须接受行动检验|人格|承诺;行动;检验
004.给林正杰先生的公开信.txt|34|依靠第三势力会造成战略错误|政治|第三势力;战略;党外
004.给林正杰先生的公开信.txt|35|真正转变值得敬佩|人格|转变;勇气;迷途
004.给林正杰先生的公开信.txt|38|权位会加速理想主义滑落|政治|权位;理想主义;变节
004.给林正杰先生的公开信.txt|39|公开指控也应面对自身行径|人格|公开指控;自身行径;责任
005.关于“小董留给李敖密件”.txt|29|自传缺漏会损害公信力|写作|自传;缺漏;公信力
005.关于“小董留给李敖密件”.txt|30|文字能够显露人物性情|写作|文字;人物;性情
005.关于“小董留给李敖密件”.txt|32|制度持续追逼会阻断从良|法权|制度;前科;从良
005.关于“小董留给李敖密件”.txt|35|党化教育能把杀人包装成爱国|文化|党化教育;爱国;杀人
005.关于“小董留给李敖密件”.txt|41|国家标签会为私人暴力提供目标|政治|国家标签;暴力;宣传
005.关于“小董留给李敖密件”.txt|43|国家招安可制造重新做人的幻觉|政治|招安;国家;重新做人
005.关于“小董留给李敖密件”.txt|50|政权会牺牲为它效命的人|政治|政权;牺牲;效命
005.关于“小董留给李敖密件”.txt|52|公开真相不能等待绝对安全|人格|公开真相;风险;行动
006.千呼万唤“屎”出来.txt|3|论战对象必须值得回应|写作|论战;回应;价值
006.千呼万唤“屎”出来.txt|4|有内容不怕空洞攻击|写作|内容;攻击;胡适
006.千呼万唤“屎”出来.txt|9|超越敌我才能看见文章真伪|方法|敌我;文章;审美
006.千呼万唤“屎”出来.txt|10|强大对手也可成为教练|人格|对手;教练;磨练
006.千呼万唤“屎”出来.txt|12|靠打倒别人壮大源于自卑|人格|自卑;打倒;教育
006.千呼万唤“屎”出来.txt|13|赞成批评不等于接受失实批评|写作|批评;失实;伦理
006.千呼万唤“屎”出来.txt|18|新材料必须带来新解释|方法|新材料;史学;解释
006.千呼万唤“屎”出来.txt|19|断章取义会伪造历史|写作|断章取义;历史;材料
006.千呼万唤“屎”出来.txt|20|批评者不能隐匿已知材料|写作|批评;材料;隐匿
006.千呼万唤“屎”出来.txt|21|报道资格必须通过真实检验|写作|报道;真实;资格
006.千呼万唤“屎”出来.txt|23|法律判断必须区分不同刑罚概念|法权|法律概念;刑罚;判断
006.千呼万唤“屎”出来.txt|29|完整证据才能还原人物面目|方法|证据;人物;还原
006.千呼万唤“屎”出来.txt|30|关键错误足以暴露整体品质|方法|关键错误;整体品质;检验
007.不愿自己也走慢了.txt|5|战斗性隐居保护独立人格|人格|隐居;独立;世俗
007.不愿自己也走慢了.txt|6|是非应先于交情利害|人格|是非;交情;利害
007.不愿自己也走慢了.txt|7|一流人物能在矛盾中坚持标准|人格|矛盾;标准;坚持
007.不愿自己也走慢了.txt|8|最坏的不是非不明而是以非为是|文化|是非;社会;耻感
007.不愿自己也走慢了.txt|9|合作不能拖慢个人原则|人格|合作;独行;原则
007.不愿自己也走慢了.txt|10|辨明是非不能要求乡愿|人格|是非;乡愿;知识分子
008.你叫我的魂，我夺你的魄.txt|4|权力会用多重手段压制杂志|法权|杂志;压制;权力
008.你叫我的魂，我夺你的魄.txt|9|备用刊名可以突破行政封锁|方法|刊名;行政封锁;出版
008.你叫我的魂，我夺你的魄.txt|11|压制越强越要扩大出版反击|人格|压制;出版;反击
008.你叫我的魂，我夺你的魄.txt|13|争取自由须承担后果|人格|自由;后果;勇气
008.你叫我的魂，我夺你的魄.txt|15|没有普及性的自由仍不完整|法权|自由;普及性;传播
009.怀念郑南榕.txt|3|没有积累的反对者容易投机|政治|反对者;积累;投机
009.怀念郑南榕.txt|8|言论自由突破需要实际勇气|法权|言论自由;勇气;突破
009.怀念郑南榕.txt|11|知识分子应有救世诚意|人格|知识分子;救世;诚意
009.怀念郑南榕.txt|12|坚定需要勇气|人格|坚定;勇气;信心
009.怀念郑南榕.txt|13|反抗威权不能保留幻想|政治|威权;不合作;幻想
009.怀念郑南榕.txt|14|理想行动也需要经营能力|方法|理想;经营能力;行动
009.怀念郑南榕.txt|15|言行一致必须承受得罪人|人格|言行一致;是非;得罪
009.怀念郑南榕.txt|16|牺牲精神不是主动求死|人格|牺牲;危险;舍生取义
009.怀念郑南榕.txt|19|付出不应以功劳归属为条件|人格|付出;功劳;行动
009.怀念郑南榕.txt|20|沉默也可以具有高效率|人格|沉默;效率;精神
009.怀念郑南榕.txt|26|举重若轻是行动者的才干|方法|行动者;才干;举重若轻
010.这样的法官能审党外人士吗？.txt|3|触类旁通会让知识工作更累|知识|触类旁通;知识;思考
010.这样的法官能审党外人士吗？.txt|6|未审先判会破坏法官心证|法权|未审先判;法官;心证
010.这样的法官能审党外人士吗？.txt|10|被申请回避者不能参与裁定|法权|法官回避;裁定;程序
010.这样的法官能审党外人士吗？.txt|12|政治问题司法化会扭曲审判|法权|政治问题;司法;审判
010.这样的法官能审党外人士吗？.txt|13|情治人员进入司法会危及小民|法权|情治人员;司法;小民
010.这样的法官能审党外人士吗？.txt|15|讯问被告必须态度恳切|法权|讯问;被告;态度
010.这样的法官能审党外人士吗？.txt|21|公开党派敌意足以构成偏颇|法权|党派敌意;偏颇;法官
010.这样的法官能审党外人士吗？.txt|25|客观偏颇足以要求法官回避|法权|客观偏颇;法官回避;公平
010.这样的法官能审党外人士吗？.txt|26|法官必须超越党派独立审判|法权|法官;党派;独立审判
011.大小大气象.txt|4|牺牲行动必须判断相对条件|方法|牺牲;相对条件;绝食
011.大小大气象.txt|7|身陷牢狱仍要保持大气象|人格|牢狱;大气象;判断
011.大小大气象.txt|8|保存自己才能继续实践理想|人格|保存自己;理想;奋斗
012.逼出是非来！.txt|5|原则会在个人利益前暴露真伪|人格|原则;个人利益;反转
012.逼出是非来！.txt|6|受害者也会转而援用恶法|法权|恶法;受害者;选罢法
012.逼出是非来！.txt|7|反对恶法不能因私利反转|人格|恶法;私利;一致
012.逼出是非来！.txt|13|法律程序可以逼对方举证|方法|法律程序;举证;是非
013.难怪会被蒋氏父子作弄至今也！.txt|10|政治行动应按个人长处分工|方法|分工;长处;政治行动
013.难怪会被蒋氏父子作弄至今也！.txt|11|反抗者应选择自己的有效方式|方法|反抗;方式;独立作业
013.难怪会被蒋氏父子作弄至今也！.txt|12|威权不守法时沟通只是自欺|政治|威权;沟通;守法
014.言论自由还是第一优先.txt|2|言论自由原则不能成为被变数|法权|言论自由;原则;被变数
014.言论自由还是第一优先.txt|4|争取自由也要保持容纳异议的心胸|法权|自由;异议;心胸
014.言论自由还是第一优先.txt|5|政治活动会使思想杂志舍本逐末|写作|政治活动;思想杂志;舍本逐末
014.言论自由还是第一优先.txt|6|组织政治会连累思想传播|政治|组织政治;思想传播;自由中国
014.言论自由还是第一优先.txt|7|政治执迷会成为言论自由的绊脚石|政治|政治;执迷;言论自由
014.言论自由还是第一优先.txt|8|知识分子必须拒绝政治污染|人格|知识分子;政治;清明
014.言论自由还是第一优先.txt|9|言论自由不应同政治活动捆绑|法权|言论自由;政治活动;分割
015.起点一样、终点不同.txt|4|政治活动会使知识分子执迷|人格|知识分子;政治活动;执迷
015.起点一样、终点不同.txt|5|司法原则不能服从政治敌友|法权|司法;政治敌友;原则
015.起点一样、终点不同.txt|6|超前者必须承受长期孤单|人格|超前;孤单;前进
016.郑南榕死矣！.txt|3|道义是在麻烦出现时承担责任|人格|道义;麻烦;责任
016.郑南榕死矣！.txt|6|不要为梦幻理想牺牲|人格|梦幻;理想;牺牲
016.郑南榕死矣！.txt|7|政治团体会把死者变成筹码|政治|死者;政治团体;筹码
017.里头自焚、外头自烧.txt|2|政治指控必须通过常识检验|方法|政治指控;常识;检验
017.里头自焚、外头自烧.txt|5|对立阵营都可能为目的歪曲死者|政治|对立阵营;政治目的;死者
017.里头自焚、外头自烧.txt|6|实践牺牲宣示需要从容|人格|牺牲;宣示;从容
018.“杀君马者道旁儿”.txt|3|被排斥身份可能推动过度证明|文化|身份;排斥;过度证明
018.“杀君马者道旁儿”.txt|5|不当鼓励会把人逼向极端|人格|鼓励;极端;群体
018.“杀君马者道旁儿”.txt|6|独立判断能抵抗群体鼓噪|人格|独立判断;群体;鼓噪
019.别小化了南榕之死.txt|3|表面死因只是理想的具体依托|方法|死因;理想;依托
019.别小化了南榕之死.txt|4|只看表面会小化志士之死|方法|表面;志士;死亡
019.别小化了南榕之死.txt|5|理想意义能够超越时空|文化|理想;意义;时空
019.别小化了南榕之死.txt|6|牺牲本身可能比表面理由重要|人格|牺牲;理由;哲学
020.政治籍贯学.txt|3|籍贯会被政治成败重新解释|政治|籍贯;成败;政治
020.政治籍贯学.txt|5|政治语言可随需要改写身份|政治|政治语言;身份;改写
020.政治籍贯学.txt|7|政治认同不能靠改籍取媚|人格|政治认同;改籍;取媚
021.何妨一烈？.txt|8|死者容易被变成政治资源|政治|死者;政治资源;利用
021.何妨一烈？.txt|9|烈士意义首先来自本人|人格|烈士;意义;本人
021.何妨一烈？.txt|10|牺牲也可能证明此路不通|方法|牺牲;此路不通;证明
021.何妨一烈？.txt|11|人心沉寂时仍需要烈士|人格|人心;烈士;国殇
022.放过小女孩吧！.txt|2|政治斗争罪及妻孥极其残忍|政治|政治斗争;妻孥;残忍
022.放过小女孩吧！.txt|7|儿童不该成为政治工具|法权|儿童;政治工具;保护
023.郑南榕论李敖.txt|3|政治歧见不应毁掉道义之交|人格|政治歧见;道义;友谊
023.郑南榕论李敖.txt|7|自由立场不等于国家立场|政治|自由;国家立场;歧见
024.外省人做烈士.txt|3|掌权将军可能只会欺压人民|政治|将军;权力;欺压
024.外省人做烈士.txt|8|相同牺牲可以服务相反目标|方法|牺牲;目标;比较
024.外省人做烈士.txt|9|狭窄教育会缩小政治格局|文化|教育;政治格局;狭窄
025.郑南榕生哀死难荣.txt|4|后来者不应忘记前人付出的代价|人格|后来者;前人;代价
025.郑南榕生哀死难荣.txt|6|反对运动可取资于对手赔款|方法|反对运动;赔款;资源
025.郑南榕生哀死难荣.txt|7|低格调参与者会伤害自由运动|政治|参与者;格调;自由运动
025.郑南榕生哀死难荣.txt|8|政治投入会侵蚀知识分子清明|人格|政治投入;知识分子;清明
026.《九十年代》与情报局.txt|4|重大指控不能在无证据时定罪|方法|重大指控;证据;定罪
026.《九十年代》与情报局.txt|5|编辑不能以时间不足免除查证|写作|编辑;查证;责任
026.《九十年代》与情报局.txt|6|死者无法承担更正责任|写作|死者;更正;责任
026.《九十年代》与情报局.txt|7|涉及死者名誉必须经过查证|写作|死者名誉;查证;报道
026.《九十年代》与情报局.txt|8|勾连情报机关会把报道变成抹黑|政治|情报机关;报道;抹黑
028.郑南榕论林正杰拆滥污.txt|2|公共财务疑案必须追问到底|政治|公共财务;疑案;追问
028.郑南榕论林正杰拆滥污.txt|8|真正朋友会认真追查事实|人格|朋友;追查;事实
029.“南榕，让你看家”.txt|3|反复行动最终会成为答案|人格|行动;答案;人生
029.“南榕，让你看家”.txt|6|把痛苦转成行动是一种人生能力|人格|痛苦;行动;人生能力
`.trim();

const skippedDuplicates = [
  {
    source_file: '001.党外·党内·性.txt',
    source_paragraph: 16,
    previous_book: '李敖书信集',
    previous_source_dir: path.join('《大李敖全集6.0》分章节', '008.书信函件类', '002.李敖书信集'),
    previous_source_file: '037.给谢长廷的一封信.txt',
    previous_source_paragraph: 11,
    reason: '与既有总表源段落完全相同，本轮不重复提取',
  },
  {
    source_file: '004.给林正杰先生的公开信.txt',
    source_paragraph: 26,
    previous_book: '李敖书信集',
    previous_source_dir: path.join('《大李敖全集6.0》分章节', '008.书信函件类', '002.李敖书信集'),
    previous_source_file: '027.小批新生代.txt',
    previous_source_paragraph: 5,
    reason: '与既有总表源段落完全相同，本轮不重复提取',
  },
  {
    source_file: '007.不愿自己也走慢了.txt',
    source_paragraph: 4,
    previous_book: '李敖语录',
    previous_source_dir: path.join('《大李敖全集6.0》分章节', '005.诗集语录类', '004.李敖语录'),
    previous_source_file: '005.立言家的真面目.txt',
    previous_source_paragraph: 6,
    reason: '与既有总表源段落完全相同，本轮不重复提取',
  },
];

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
if (bodySourceFiles.length !== 30) throw new Error(`Expected 30 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 867) throw new Error(`Expected 867 paragraphs, found ${sourceParagraphCount}`);

for (const item of skippedDuplicates) {
  const current = paragraphs(item.source_file)[item.source_paragraph - 1];
  const previous = paragraphs(
    item.previous_source_file,
    path.join(rootDir, item.previous_source_dir),
  )[item.previous_source_paragraph - 1];
  if (!current || current !== previous) {
    throw new Error(`Previous-book duplicate check failed: ${item.source_file}:${item.source_paragraph}`);
  }
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

if (records.length !== 167) throw new Error(`Expected 167 records, found ${records.length}`);
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
    note: '本轮从《郑南榕研究》的自序、访谈、评论、书信与纪念文章中提取李敖自己的思想判断。全书混有郑南榕文章、郑南榕旧信、小董自白、新闻材料、司法文书、受访者证词及叶菊兰口述；这些第三方文字不因包含观点而自动建项，只在李敖明确评价、检验或归纳的完整段落中随文保留。另有三段与既有总表源文完全相同，经逐字校验后跳过。标题用于检索浓缩，description 保留源文本原段落。',
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
  `- 与既有总表完全相同并跳过的实质段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖自己的自由观、政治判断、史料方法、司法批判、人格评价和情爱观点。',
  '- 郑南榕文章、郑南榕旧信、小董自白、新闻材料、司法文书、受访者证词及叶菊兰口述，不作为李敖思想独立建项。',
  '- 第三方材料只在李敖明确评价、反驳、检验或归纳的完整段落中随文保留。',
  '- 纯交往史、办刊史、悼亡叙述、重复引文与宣传附注不建项。',
  '- 与《李敖书信集》《李敖语录》既有条目逐字相同的三段只记录来源，不在总表重复建项。',
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
