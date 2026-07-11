import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '113';
const bookTitle = '大江大海骗了你';
const slug = 'big-river-big-sea-deceived-you';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '015.大江大海骗了你');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
002|11|未读之书和未闻之事都可成为新知|知识|新书;秘密;倾听
004|2|非正式自传可能比正式自传更接近真实|写作|自传;真实;口述
004|8|故事必须充分展开才能弥补结构零散|写作|故事;结构;展开
004|10|错误前提会使后续推论全部失效|方法|前提;推论;逻辑
005|3|重大历史题目需要经验与史料长期积累|方法|历史题目;经验;史料
006|13|书名应让受影响的读者进入问题|写作|书名;读者;问题意识
006|23|批评应同时抓住代表人物和错误类型|方法|批评;人物类型;错误类型
007|3|选择史料不能只取对自己有利的一面|方法|史料选择;日记;偏见
007|7|知识分子进入政党容易受其控制|人格|知识分子;政党;独立
008|7|公共财产不能因政治功绩而变成私产|法权|公共财产;占用;政治功绩
008|10|儒家理想应以实际行为接受检验|文化|儒家;行为;理想
009|3|学术成就不等于文化判断权威|知识|学术成就;文化判断;权威
009|5|政治正统会借学术正统压制异议|政治|政治正统;学术正统;自由主义
009|8|私人交情不能取代公共判断|人格|私人交情;公共判断;是非
010|3|前后著作对读可以揭示自相矛盾|方法|著作对读;矛盾;作者
010|5|考古发现可以推翻权威的作者判断|方法|考古;作者归属;权威
010|7|新证据可以推翻长期流行的伪书判断|方法|新证据;伪书;学术权威
011|3|开放档案仍须防范专为欺骗后人而造的文字|方法|档案;欺骗;史料批评
011|7|白纸黑字也可能是写给后世看的骗局|方法|文字证据;日记;后世
012|3|政治人物会专门制造留给后人看的文字|政治|专立文字;政治手法;档案
013|3|书面批示也可能只是表演而不执行|方法|批示;执行;政治表演
014|3|口头承诺不留记录便难以追究责任|法权|口头承诺;记录;责任
017|9|只写现象不追原因会混淆真相与是非|方法|现象;原因;是非
017|11|流利文字可以包裹腐败思想|写作|文笔;思想;内容
017|13|流畅文风可能误导缺乏判断力的读者|写作|文风;读者;误导
019|3|处理历史问题需要历史训练|知识|历史训练;专业;历史问题
019|11|完整叙事必须追查现象背后的原因|方法|现象;原因;完整叙事
020|2|坏书不应被禁且可作为研究样本|法权|坏书;禁书;研究样本
020|4|历史抽样必须同时符合历史学与统计学|方法|抽样;历史学;统计学
020|10|销量不能证明作品质量|写作|销量;作品质量;畅销
021|10|历史比较必须先确认原因具有可比性|方法|历史比较;原因;可比性
023|6|战争叙事必须追究战略决策责任|政治|战争;战略责任;决策者
025|6|判断争议必须同时阅读对立双方的材料|方法|双方材料;公正;判断
027|4|理解历史应追踪人物及其后代的完整人生|方法|人物追踪;世代;历史
029|3|文化冲突不能遮蔽事件中的具体暴力|文化|文化冲突;暴力;二二八
030|11|同一史料的选择性引用会暴露立场偏差|方法|选择性引用;同一史料;偏差
031|4|宏观文化解释不能抹去具体责任|方法|文化解释;暴力;责任
034|14|理解世界不以亲历和旅行作为唯一条件|知识|亲历;文献;理解
035|3|因果责任应沿外交文献向前追查|方法|外交文献;因果;责任
035|8|历史责任必须放回完整的决策时间线|方法|时间线;外交;历史责任
036|6|只呈现局部现象会遮蔽问题根源|方法|局部现象;根源;历史叙事
038|3|掌权者不能把自己承认的责任推给部属|人格|掌权者;责任;推诿
040|3|相隔地域的事件也能互相提供线索|方法|跨地域;线索;历史研究
040|5|单方证言必须与其他受害者和记录核对|方法|单方证言;受害者;交叉核对
040|7|受害经历不能免除事后的自我反省|人格|受害者;反省;责任
041|3|双方都应反省本群体施加的暴力|人格|换位;群体;暴力
042|9|国家政策必须放回制度和权力结构判断|政治|国家政策;制度;权力结构
043|3|制造争议却不纠正错误是不负责任的写作|写作|争议;错误;写作责任
043|5|迟来的正义可能变成机会主义正义|法权|迟来正义;机会主义;二二八
049|3|揭露一种外国暴行时不能选择性忽略另一种|方法|选择性揭露;外国暴行;双重标准
051|2|外交语言不应美化性暴力|政治|外交语言;性暴力;美化
051|4|出版与媒体网络可以共同扭曲事实|文化|出版;媒体;事实
051|6|不能向党派媒体索求公正判断|人格|党派媒体;公正;独立
053|5|同一作者对不同强权应使用一致标准|方法|一致标准;强权;选择性
054|9|公开质询可以补足畅销书刻意回避的事实|政治|公开质询;事实;回避
054|13|亲美倾向会成为一种根深蒂固的文化现象|文化|亲美;文化现象;外交
056|3|历史采访应覆盖关键决策者和完整世代|方法|采访;决策者;世代
056|9|群体迁徙要追踪三代人的完整变化|方法|群体迁徙;三代;历史
057|5|失败者会集体改写失败原因|方法|失败者;集体记忆;改写历史
058|3|官方英雄数字必须与调查材料相互核对|方法|官方数字;调查;英雄神话
058|5|姓名与人证可以揭穿集体英雄神话|方法|姓名;人证;神话
058|7|被强迫的英雄叙事不能证明自愿牺牲|人格|强迫;英雄;牺牲
059|3|政权可以在死后替人制造烈士身份|政治|烈士;政权;历史制造
062|3|只批评日常小恶可能是在回避根本暴政|政治|小恶;暴政;批评上限
062|5|知识分子会用间接批评逃避真正的权力对象|人格|知识分子;间接批评;权力
064|3|政治权力会形成自己的文学体制|文化|政治文学;体制;国民党
065|16|政治文化会在独裁者死后继续替其免责|政治|独裁者;免责;政治文化
066|3|反问句也能承担讽刺功能|写作|反问;讽刺;修辞
066|7|专家误译会使基本语义发生颠倒|写作|误译;语义;专家
067|3|批评文字可以采用直接棒喝的方式|写作|批评;棒喝;文风
068|5|使命型政党即使不执政也能传播理念|政治|使命政党;选举;理念
070|3|书名和称谓可能掩盖最基本的事实|方法|书名;称谓;事实
070|5|史家受党派框架限制会终身写错历史|方法|史家;党派框架;历史
070|15|政治史观会预先限定历史解释|方法|政治史观;框架;解释
071|3|受害者也可能认同并服务迫害者|人格|受害者;迫害者;认同
071|7|反省能力比受难经历更能检验知识分子|人格|反省;受难;知识分子
071|9|历史人物应写出行动而非只供读者怜悯|写作|历史人物;行动;怜悯
072|5|采访群体现象必须追查背后的组织原因|方法|群体现象;组织;采访
072|12|没有原因的现象汇编不能成为完整作品|写作|原因;现象;完整作品
073|3|专业史料搜索不会轻信过于简单的故事|方法|史料搜索;怀疑;故事
073|5|强制征用必须追查制度命令的来源|政治|强制征用;命令;责任
074|3|对最高权力者的态度可以检验人的标准|人格|最高权力;道德;检验
074|9|历史写作不能绕开决定性的统治者|写作|历史写作;统治者;责任
076|3|反抗暴君也是恢复公民人格|人格|暴君;公民人格;反抗
077|3|个人品格良好不保证宏观政治方向正确|政治|个人品格;政治方向;爱国
078|3|强权会选择性忽视附庸政权的人权问题|政治|强权;人权;附庸
079|9|名家称赞不能替代对作品真假的检验|方法|名家;称赞;作品检验
080|5|国家合法性必须同时接受历史与法理检验|法权|国家;合法性;历史法理
080|6|后继政党不能追认前身未参与的建国功劳|政治|政党;建国;历史归属
080|8|国际承认本身不能证明政权继替合法|法权|国际承认;政权继替;合法性
080|9|国家承认和政府承认应在国际法中区分|法权|国家承认;政府承认;国际法
081|7|政治修辞不能改变政权灭亡的客观事实|方法|政治修辞;客观事实;亡国
082|3|政治纪念的年数必须接受基本时间核算|方法|纪念;年数;时间核算
083|3|知识精英的去留不能由少数名人代表|方法|知识精英;抽样;去留
083|5|权力机构会在思想家死后收编其名义|文化|思想家;收编;机构
084|8|基本姓名错误能够检验研究态度|方法|姓名;错误;研究态度
085|13|借用名人名号不能替错误行为免责|人格|名人名号;免责;责任
085|15|无价值的军事坚守不能用姿态代替责任|政治|军事坚守;姿态;责任
087|8|私人记录与公开说法的矛盾可以检验行为|方法|私人记录;公开说法;矛盾
087|12|事后改变战争叙事不能取代当时命令|方法|战争叙事;当时命令;事后改写
087|14|战略说辞应与实际防守命令相互核对|方法|战略;命令;核对
088|3|历史神话在专业考证前无法成立|方法|历史神话;考证;专业
089|3|权力把人才变成奴才会摧毁公民尊严|政治|人才;奴才;公民尊严
089|4|历史正义不能因时间过去而一笔勾销|人格|历史正义;时间;是非
089|6|历史研究必须持续击破权力制造的假象|方法|权力;假象;历史研究
090|5|履行契约是不能推给时代的个人责任|法权|契约;个人责任;时代
093|5|统治者自封救星是一种政治宣传|政治|救星;统治者;宣传
093|7|民主与救亡功劳必须接受反向事实检验|方法|民主;救亡;反证
094|3|被称为救星者也可能正是灾难责任人|政治|救星;责任;灾难
094|5|政党可以借外围写作者替自己制造谎言|文化|政党;写作者;谎言
098|4|统帅回忆录会省略对自己不利的撤退事实|方法|回忆录;撤退;省略
099|5|基层见证可以补足统帅回忆录的空白|方法|基层见证;回忆录;空白
099|9|回忆录必须结合人证和内部资料交叉验证|方法|回忆录;人证;内部资料
100|3|难民研究必须区分权贵与普通人的处境|方法|难民;阶层;区分
100|6|长期流亡会形成独特的政治心理|人格|流亡;政治心理;难民
101|5|撤退资格的不平等会暴露权力阶层|政治|撤退;特权;阶层
103|3|要求他人共存亡的统治者往往先为自己留后路|政治|共存亡;统治者;逃亡
103|8|政治领袖先行逃亡会击破牺牲宣传|政治|领袖;逃亡;宣传
104|8|权贵撤离的材料能反证全民共患难叙事|方法|权贵;撤离;反证
105|5|日记可显示掌权者在逃亡时仍继续杀人|政治|日记;逃亡;杀人
105|10|交通工具分配能够呈现撤退中的阶级特权|政治|交通工具;撤退;特权
105|17|断后者不应被禁止逃生|人格|断后;逃生;军人
106|14|零散同期记录可以共同拼出历史图景|方法|同期记录;碎片;历史图景
107|3|历史采访必须先有文献基础|方法|采访;文献;史料基础
107|5|历史书写应保存普通人的非凡故事|写作|普通人;历史书写;故事
107|15|档案能够恢复采访已无法取得的故事|方法|档案;采访;历史恢复
109|5|人的最后觉悟比早年的政治身份更重要|人格|觉悟;政治身份;晚年
111|3|口述线索能够把分散史料串成完整真相|方法|口述;史料;真相
112|5|掌权者不能以人质控制部属并背弃承诺|政治|人质;承诺;部属
114|4|完成职责后选择生死属于个人自由|法权|生死;个人自由;职责
114|5|统治者无权要求部属替自己殉死|法权|殉死;统治者;部属
114|6|先行逃亡的领袖无权谴责被俘军人|人格|领袖;军人;责任
116|3|历史叙事必须继续追踪灾难之后的人生|方法|后续人生;灾难;历史叙事
117|3|只写受难前半截会遮蔽后续报复与选择|方法|前半截;报复;完整历史
120|5|成功采访需要对线索保持警觉|方法|采访;线索;警觉
120|14|文献搜寻可以补回被遗忘的人生结局|方法|文献;人生结局;历史
122|3|言论自由要由实际承担的风险衡量|人格|言论自由;风险;行动
122|5|秘密手稿的保存与出版可以突破政治压制|知识|手稿;出版;政治压制
122|6|遗漏关键文件会扭曲一九四九叙事|写作|关键文件;遗漏;历史叙事
125|5|秘密拘禁而不审判违背基本司法程序|法权|秘密拘禁;审判;司法程序
126|3|出版受压制者的回忆录需要承担风险|人格|出版;回忆录;风险
128|3|缺乏经验和史料训练无法处理重大题目|方法|经验;史料训练;重大题目
128|7|证人消失后仍可用资料重建历史|方法|证人;资料;历史重建
129|14|历史正义要求记住加害者与暴行|人格|加害者;暴行;历史正义
130|2|平反不应依赖原加害政权的恩赐|法权|平反;加害政权;正义
130|13|研究儿童流亡必须追查成年组织者|方法|儿童流亡;组织者;原因
133|3|细读制度文本可以发现关键删节|方法|制度文本;删节;细读
133|5|书目丰富不能掩盖关键材料的遗漏|方法|书目;遗漏;关键材料
134|3|逮捕叙事必须与行动细节和文件核对|方法|逮捕;行动细节;文件
134|5|公开机密证据可以纠正长期政治叙事|人格|机密证据;公开;政治叙事
139|3|反复流传的谎言会被当成事实|方法|谎言;流传;事实
139|7|历史会被事后添加虚构的自由资历|方法|自由资历;虚构;历史
140|2|机构会借思想家的名字取得解释权|文化|机构;思想家;解释权
140|3|盗用解释权会改造思想家的公共形象|文化|解释权;公共形象;盗用
142|5|政治批评的风险大小应与权力对象相称|人格|政治批评;风险;权力
142|7|批评上限可以检验知识分子的勇气|人格|批评上限;勇气;知识分子
142|11|权力内部人士会把自己改写成反抗者|政治|权力内部;反抗者;历史改写
142|13|批评触及的最高层级能够衡量其力度|写作|批评;最高层级;力度
142|15|权力集中与知识分子怯懦会互相强化|文化|权力集中;知识分子;怯懦
143|3|战败者并非沉默而是大量自我辩解|方法|战败者;沉默;自我辩解
143|5|失败叙事必须检验当事人是否真正反省|人格|失败;反省;当事人
145|5|缩小叙事范围可以提高史实可靠度|写作|叙事范围;史实;可靠度
147|6|英雄遗书应与敌方记录和同期材料核对|方法|遗书;敌方记录;英雄神话
147|17|政治宽大不能用后来不再任用来伪装|政治|宽大;任用;政治宣传
147|21|统治者不能要求被俘者选择自己未选择的死亡|人格|被俘;死亡;统治者
150|3|政党有计划制造的战史不能直接当作史实|方法|党史;战史;史实
154|3|常识可以成为检验离奇史说的第一关|方法|常识;史说;检验
154|7|历史解释不能把臆想当作密码|方法|臆想;密码;历史解释
155|5|不同时期的出版物与书信可以揭穿神话|方法|出版物;书信;神话
156|3|协助权力后保持沉默仍是一种人格选择|人格|沉默;权力;人格
159|5|只写苦难片段而不追责任会制造廉价同情|写作|苦难;责任;同情
159|8|人物史必须追踪童年之后的完整人生|方法|人物史;童年;完整人生
159|13|一个历史故事必须追问人物为何陷入处境|方法|历史故事;原因;处境
160|8|权贵的迁徙经验不能代表普通人的现实条件|政治|权贵;迁徙;普通人
162|7|普通人会在政权夹缝中被剥夺亲情|法权|政权;亲情;普通人
163|7|政治人格应以关键时刻的行动检验|人格|政治人格;行动;检验
164|3|公开忠诚应与家庭实际选择相互核对|方法|公开忠诚;家庭;核对
164|12|历史采访不能遗漏黑牢中的受害者|方法|采访;黑牢;受害者
165|5|即使带有憎恶也必须用证据写历史|方法|憎恶;证据;历史写作
165|7|批评应证明指控而不止于辱骂|写作|批评;证明;辱骂
165|13|照片和文件可以直接推翻公共神话|方法|照片;文件;神话
166|3|对照原始照片可以发现历史影像被篡改|方法|原始照片;篡改;历史影像
167|3|要求全民牺牲的领袖常先准备个人退路|政治|全民牺牲;领袖;退路
167|9|叙事遗漏领袖行踪会改变责任判断|写作|领袖行踪;遗漏;责任
168|3|强权支持自由往往服从自身利益|政治|强权;自由;国家利益
169|4|附庸政权可能主动要求外国接管权力|政治|附庸;外国;权力
169|6|外国顾问制度会架空本国政治责任|政治|外国顾问;政治责任;主权
169|8|政治附庸关系会由一代统治者传给下一代|政治|附庸;继承;统治者
170|3|不断改期的政治承诺证明目标不可实现|方法|政治承诺;改期;可实现性
170|4|拆穿政治神话的人往往先遭到迫害|人格|政治神话;迫害;真话
171|2|掌握军权的政府仍须向民意机关负责|政治|军权;民意机关;负责
172|4|政党不能追溯吞并与自己无组织关系的前史|方法|政党历史;组织关系;追溯
172|6|历史组织的继承关系必须接受精密考证|方法|组织继承;考证;党史
172|7|组织合并与另行成立必须严格区分|方法|组织合并;成立;历史
172|8|领袖自述可以反证政党连续性神话|方法|领袖自述;连续性;政党
172|9|把建党时间向前拉长是在占有他人功劳|政治|建党时间;功劳;党史
173|3|独裁体制会使民主转型留下假民主|政治|独裁;民主转型;假民主
173|5|对立政党可能共享同一种权力思维|政治|对立政党;权力思维;蓝绿
174|6|少数以暴力阻止多数表决不是真民主|政治|少数;暴力;表决
174|8|好人支持集体作恶仍须承担责任|人格|好人;集体作恶;责任
174|9|只看地方利益可能反而伤害地方|政治|地方利益;大势;政治
174|10|对外依附会使议会服务外国利益|政治|议会;外国利益;依附
174|12|列宁式政党难以产生真正民主|政治|列宁式政党;民主;政党
175|3|独裁者死后应平反冤案并清算其政治遗产|法权|独裁者;冤案;政治遗产
175|5|不依法平反冤案不能自称人权法治|法权|平反;人权;法治
175|7|金钱补偿不能替代司法平反|法权|补偿;赔偿;平反
176|6|失败既可能源于能力不足也可能源于主观不为|方法|能力;主观;失败原因
176|8|脚注列过史料却漏引关键文字是选择性取证|方法|脚注;漏引;选择性取证
177|5|外国战争类比必须先检验事件性质是否相同|方法|战争类比;事件性质;可比性
178|8|判断人物要看他反对什么而不只看支持什么|人格|人物判断;反对;支持
179|3|西化知识分子可能用外国尺度疏离本国历史|文化|西化;外国尺度;历史
180|3|文风流畅不能弥补常识和用字错误|写作|文风;常识;用字
182|7|提出问题时其实已经隐含价值答案|方法|问题;答案;价值
182|9|把结论藏进问题属于丐词推理|方法|丐词;结论;问题
182|10|史学批评应把重点放在可核验的考据|方法|史学批评;考据;证据
184|3|言论自由的立场要由实际行动与代价证明|人格|言论自由;行动;代价
185|3|人物历史应写出受难到依附的完整历程|方法|完整历程;受难;依附
185|5|完整人生还应包括人物最终是否觉悟|人格|完整人生;觉悟;历史人物
185|9|觉悟不以写书作为唯一证明|人格|觉悟;写书;证明
185|31|知识分子应有拒非抗暴且不媚俗的独立人格|人格|知识分子;抗暴;独立
186|5|事实考证与哲学争执使用不同证明方式|知识|考据;哲学;证明
186|7|史学硬功夫要求主动搜集可核验证据|方法|史学;考据;证据
187|3|只有结论没有证据的攻击会替对手宣传|写作|攻击;证据;宣传
187|4|正确主张交给不适格的人会产生反效果|人格|正确主张;资格;反效果
188|3|批评家不能以批评成就代替创作|写作|批评家;创作;成就
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
    const matches = allSourceFiles.filter((name) => name.startsWith(`${fileToken}.`));
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
if (allSourceFiles.length !== 190) throw new Error(`Expected 190 source files, found ${allSourceFiles.length}`);
const paragraphMap = new Map(allSourceFiles.map((name) => [name, paragraphs(name)]));
const sourceParagraphCount = [...paragraphMap.values()].reduce((sum, items) => sum + items.length, 0);
if (sourceParagraphCount !== 2634) throw new Error(`Expected 2634 paragraphs, found ${sourceParagraphCount}`);

const specs = parseSpecs(allSourceFiles);
const candidates = specs.map((spec) => {
  const sourceParagraphs = paragraphMap.get(spec.fileName);
  const description = sourceParagraphs[spec.source_paragraph - 1];
  if (!description) throw new Error(`Missing paragraph: ${spec.fileName}#${spec.source_paragraph}`);
  if (spec.source_paragraph === 1 || description.startsWith('■')) {
    throw new Error(`Selected title or interviewer prompt: ${spec.fileName}#${spec.source_paragraph}`);
  }
  if (/李敖影音E书|李敖数字博物馆|资源下载站|油管\/抖音/.test(description)) {
    throw new Error(`Selected production credit: ${spec.fileName}#${spec.source_paragraph}`);
  }
  return {
    ...spec,
    description,
    source_path: path.join(sourceBookDir, spec.fileName),
  };
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

const structuralExclusions = {
  chapter_titles: allSourceFiles.length,
  interviewer_prompts: [...paragraphMap.values()].flat().filter((value) => value.startsWith('■')).length,
  production_credits: allSourceFiles.length * 5,
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
    note: '本轮从秘密谈话正文、李敖明确回答及其串联史料的本人判断中提取；采访者问题、龙应台原文、回忆录与档案长引、第三方署名文章及数字版制作附注只作证据，不转列为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
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
  '- 只提取李敖本人明确表达、可以脱离问答上下文独立检索的历史方法、政治责任、法律原则、公共人格与写作判断。',
  '- 采访者问题、龙应台原文、日记、回忆录、档案和第三方文章只作为李敖判断的证据，不把被引材料直接记在李敖名下。',
  '- 同一观点在不同章节反复出现时，提取轮保留有独立信息或证据路径的表达，纯同义短句不机械建项。',
  '- 纯人名攻讦、外貌与性别羞辱、依赖特定笑话的短句、情节叙述和数字版制作附注不单独建项。',
  '- 与既有总表源文完全相同的段落只记录重复来源，不重复建项。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 结构性排除', '',
  `- 各篇标题：${structuralExclusions.chapter_titles}`,
  `- 采访者问题：${structuralExclusions.interviewer_prompts}`,
  `- 数字版制作附注：${structuralExclusions.production_credits}`, '',
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
  source_file_count: allSourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  structural_exclusions: structuralExclusions,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
