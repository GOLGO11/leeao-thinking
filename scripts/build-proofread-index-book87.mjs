import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 87;
const bookTitle = '李敖有话说';
const sequence = String(bookSeq).padStart(3, '0');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT087-021', '以天安门石柱为例的段落偏现场展示，思想判断不够独立。'],
  ['LAT087-071', '阳明山房产和林语堂住宅比较偏生活掌故，索引思想密度不足。'],
  ['LAT087-077', '写作灵感段落以生理笑谈为主，公共思想索引价值较弱。'],
  ['LAT087-089', '大陆情感段落偏私人交游回忆，思想概念不够集中。'],
  ['LAT087-096', '半岛电视台采访段落偏自我位置展示，和美国问题主题有更强条目承载。'],
  ['LAT087-102', '老照片与王菲祖父段落偏人物趣闻，难以独立构成思想索引。'],
  ['LAT087-119', '何柱国与东北军段落偏史事介绍，缺少可复用思想判断。'],
  ['LAT087-123', '书房展示段落偏个人生活铺陈，索引价值弱于读书方法条目。'],
  ['LAT087-131', '七十岁生日照片段落偏私人回忆，校对轮不单列。'],
  ['LAT087-133', '蒋家死亡照片段落偏节目现场刺激，思想判断不够稳定。'],
  ['LAT087-139', '三一九枪击推演过窄且时事性重，由选举与证据条目承载。'],
  ['LAT087-157', '慰安妇义卖与政治人物互动偏活动回忆，思想密度不足。'],
  ['LAT087-170', '逃难友人财产掌故偏私人记忆，和文物思想关联较弱。'],
  ['LAT087-184', '北京演讲前的礼遇与不放心偏过程回忆，校对轮不单列。'],
  ['LAT087-204', '女主播照片和报纸用字段落偏媒体趣谈，长期索引价值较弱。'],
  ['LAT087-214', '吴冠中绘画类比偏现场鉴赏，思想判断不够展开。'],
  ['LAT087-216', '陈文茜评价李敖的段落偏外部赞语，李敖自有判断较薄。'],
  ['LAT087-245', '参选台北市长民调段落偏竞选进程，不单列思想索引。'],
  ['LAT087-246', '郝龙斌参选攻防偏当期选举战术，稳定性较弱。'],
  ['LAT087-247', '新党与国民党籍问题偏选举人事攻防，校对轮删除。'],
  ['LAT087-254', '二二八外媒材料段落与后续真相重组条目重复，保留更集中的 LAT087-256。'],
  ['LAT087-255', '二二八节目竞逐与新资料铺陈偏过程，主题由 LAT087-256、LAT087-257 承载。'],
  ['LAT087-258', '成功人士问卷段落偏个人生活调查，思想索引价值不足。'],
  ['LAT087-263', '告布什新闻进展与军购主题重复，由 LAT087-262、LAT087-268 承载。'],
  ['LAT087-264', '告发布什后的逻辑重申与相邻军购条目重复，校对轮删除。'],
  ['LAT087-273', '厦门大学聘书题字偏私人交游，缺少独立思想主题。'],
  ['LAT087-277', '拳王与独处类比偏人物轶闻，未形成清晰可检索判断。'],
  ['LAT087-287', '女性外貌与职业造型段落偏审美偏见，思想索引稳定性不足。'],
  ['LAT087-289', '新加坡民主段落以友人优秀为主，李敖判断较散。'],
  ['LAT087-301', '恐惧症清单过长且偏知识铺陈，自由主题不如其他法权条目集中。'],
  ['LAT087-302', 'SOGO案过程段落偏案情与现场表演，长期思想价值较低。'],
  ['LAT087-311', '男高音与形象段落偏演艺闲谈，和写作/思想关系较弱。'],
  ['LAT087-344', '参选市长段落偏竞选现场自述，校对轮不单列。'],
]);

const overrides = new Map([
  ['LAT087-001', { title: '台独缺少牺牲者' }],
  ['LAT087-002', { category: '政治', title: '制衡国民党不等于放任台独' }],
  ['LAT087-003', { title: '公投话术掩盖谈判反悔' }],
  ['LAT087-004', { title: '台湾问题根子在中美关系' }],
  ['LAT087-005', { title: '选举疑案必须追究' }],
  ['LAT087-006', { title: '假台独不值得武力回应' }],
  ['LAT087-007', { title: '三一九枪击要凭常识判断' }],
  ['LAT087-008', { title: '计划生育不容风凉话' }],
  ['LAT087-009', { title: '富起来靠经济观念改变' }],
  ['LAT087-010', { category: '政治', title: '枪伤真相需要专业检验' }],
  ['LAT087-011', { title: '一国两制需要勇敢承担' }],
  ['LAT087-012', { title: '台独只是政治梦境' }],
  ['LAT087-013', { category: '文化', title: '鲁迅神话要查资料' }],
  ['LAT087-014', { title: '错误人选传递错误讯息' }],
  ['LAT087-015', { category: '人格', title: '打不赢的官司也要打' }],
  ['LAT087-016', { title: '人权宣言不能当真经' }],
  ['LAT087-017', { title: '自由会在意外中松动' }],
  ['LAT087-018', { title: '政治结盟不是道德背书' }],
  ['LAT087-019', { category: '人格', title: '以德报怨不如以直报怨' }],
  ['LAT087-020', { category: '文化', title: '粗话也会随时代变化' }],
  ['LAT087-022', { title: '酷刑口供不能作真相' }],
  ['LAT087-023', { title: '民间迷信也会查禁言论' }],
  ['LAT087-024', { category: '政治', title: '左倾理想也要付代价' }],
  ['LAT087-026', { title: '少说昧良心话就是抵抗' }],
  ['LAT087-027', { category: '文化', title: '现代外表常包着古代思想' }],
  ['LAT087-028', { title: '按规则打官司也要付代价' }],
  ['LAT087-029', { title: '为反对而反对也是自由' }],
  ['LAT087-030', { title: '幽默能承受死亡' }],
  ['LAT087-031', { title: '小人物也该有程序正义' }],
  ['LAT087-032', { category: '方法', title: '读活书并写好文章' }],
  ['LAT087-033', { title: '台独政治制造丑陋循环' }],
  ['LAT087-034', { title: '独派大佬常先投降' }],
  ['LAT087-035', { category: '政治', title: '国父精神也会被神化' }],
  ['LAT087-036', { title: '不怕后果才有言论自由' }],
  ['LAT087-037', { title: '骂元首也属言论技巧' }],
  ['LAT087-038', { category: '文化', title: '文字背后有历史源流' }],
  ['LAT087-039', { category: '方法', title: '台湾问题要找到死结' }],
  ['LAT087-040', { category: '文化', title: '鲁迅缺少民主思想基础' }],
  ['LAT087-041', { title: '自由开放后会稀松平常' }],
  ['LAT087-042', { category: '文化', title: '古语要从制度里理解' }],
  ['LAT087-043', { title: '国民党史也有共产党源流' }],
  ['LAT087-044', { title: '爱情不能一次吐尽' }],
  ['LAT087-045', { title: '想象力可替代亲临现场' }],
  ['LAT087-046', { category: '文化', title: '孝道姿态可以被政治化' }],
  ['LAT087-047', { category: '政治', title: '政治权谋常不立文字' }],
  ['LAT087-048', { category: '文化', title: '台湾书法只有两个半人' }],
  ['LAT087-049', { title: '早年左翼也会被误读' }],
  ['LAT087-050', { title: '压死文星会制造乱流' }],
  ['LAT087-051', { category: '法权', title: '婚姻论文要分清法律概念' }],
  ['LAT087-052', { title: '真相不能因敬仰被回避' }],
  ['LAT087-053', { category: '人格', title: '拍马屁的诗人没有骨气' }],
  ['LAT087-054', { title: '红色十一写最后共产党' }],
  ['LAT087-055', { category: '文化', title: '生殖崇拜留在汉字里' }],
  ['LAT087-056', { category: '文化', title: '古文翻译要活起来' }],
  ['LAT087-057', { category: '文化', title: '传统观念会制造人格分裂' }],
  ['LAT087-058', { title: '不以舆论干预法律程序' }],
  ['LAT087-059', { title: '世界名器虽不公也要争' }],
  ['LAT087-060', { category: '文化', title: '国宝不该被私人带走' }],
  ['LAT087-061', { title: '机密文件能还原迫害' }],
  ['LAT087-062', { category: '政治', title: '共产主义道德近于圣人标准' }],
  ['LAT087-063', { title: '没有平台就没有言论自由' }],
  ['LAT087-064', { category: '写作', title: '广告词要有中文推动力' }],
  ['LAT087-065', { title: '五权宪法留下选举入口' }],
  ['LAT087-066', { title: '自救宣言不是台独宣言' }],
  ['LAT087-067', { title: '历史不会等待台湾' }],
  ['LAT087-068', { title: '国号更替有历史遗憾' }],
  ['LAT087-069', { title: '台独口号缺少承担者' }],
  ['LAT087-070', { title: '四不一没有困住台独路线' }],
  ['LAT087-072', { title: '抢救中文要有时间感' }],
  ['LAT087-073', { title: '电脑让中文咸鱼翻身' }],
  ['LAT087-074', { title: '中文句典要保存好句子' }],
  ['LAT087-075', { title: '中文善用具体代表抽象' }],
  ['LAT087-076', { title: '书同文之后还要语同音' }],
  ['LAT087-078', { title: '经典意境胜过迷信' }],
  ['LAT087-079', { title: '两岸称谓不用强改' }],
  ['LAT087-080', { title: '用现有宪法套住台独' }],
  ['LAT087-081', { category: '人格', title: '过分自谦就是自我否定' }],
  ['LAT087-082', { title: '反军购也保护荷包' }],
  ['LAT087-083', { title: '台湾自由民主是打出来的' }],
  ['LAT087-084', { title: '口述历史也会记忆错误' }],
  ['LAT087-085', { title: '教育折磨不会改变世道人心' }],
  ['LAT087-086', { title: '地位未定论忽略开罗宣言' }],
  ['LAT087-087', { category: '文化', title: '后出师表是伪作' }],
  ['LAT087-088', { title: '一中依据可以用文件说话' }],
  ['LAT087-090', { title: '言论自由也容许反驳' }],
  ['LAT087-091', { title: '闻过则喜限于言论自由' }],
  ['LAT087-092', { title: '台独言论可先让它说' }],
  ['LAT087-093', { title: '假民主能把老虎变吊车尾' }],
  ['LAT087-094', { title: '反分裂法可反套台独' }],
  ['LAT087-095', { title: '真台独连美国也不敢支持' }],
  ['LAT087-097', { title: '历史方法能处理政党恩怨' }],
  ['LAT087-098', { title: '二二八叙事要防记忆政治' }],
  ['LAT087-099', { title: '陈仪之死不能单面化' }],
  ['LAT087-100', { category: '人格', title: '知识分子不该肉麻追思' }],
  ['LAT087-101', { title: '爱台湾不能战到一兵一卒' }],
  ['LAT087-103', { title: '民主规格容许别人攻击' }],
  ['LAT087-104', { title: '北大也该放胡适像' }],
  ['LAT087-105', { title: '滴水之恩要以资料保存' }],
  ['LAT087-106', { title: '诗歌翻译也有文化轮回' }],
  ['LAT087-107', { category: '政治', title: '暴君荣光会迅速消失' }],
  ['LAT087-108', { title: '版本删改能揭出真相' }],
  ['LAT087-109', { category: '政治', title: '中央问政未必赢得地方' }],
  ['LAT087-110', { title: '姓名雌雄易位是文化传统' }],
  ['LAT087-111', { title: '电影明星婚姻也会自毁' }],
  ['LAT087-112', { category: '人格', title: '独处让人更像自己' }],
  ['LAT087-113', { title: '法院判决会替权力开脱' }],
  ['LAT087-114', { title: '二二八不是简单族群叙事' }],
  ['LAT087-115', { title: '历史解释权不等于造假权' }],
  ['LAT087-116', { category: '文化', title: '鲁迅研究好但思想不必神化' }],
  ['LAT087-117', { title: '二二八动员会制造国家话术' }],
  ['LAT087-118', { title: '历史真相靠日记旁证' }],
  ['LAT087-120', { title: '立法院公报就是制度证据' }],
  ['LAT087-121', { title: '内心仍向往写文章' }],
  ['LAT087-122', { title: '总统也受五院制监督' }],
  ['LAT087-124', { title: '虚构头衔要被追查' }],
  ['LAT087-125', { title: '卖台罪名要用历史追踪' }],
  ['LAT087-126', { title: '名女人瞻仰后常成赡养' }],
  ['LAT087-127', { category: '人格', title: '知识分子抗议前要先忏悔' }],
  ['LAT087-128', { title: '台湾地图教育藏着政治' }],
  ['LAT087-129', { title: '质询权也可以不发问' }],
  ['LAT087-130', { category: '写作', title: '监狱黑暗需要文学写出' }],
  ['LAT087-132', { category: '人格', title: '敌友会随时代翻转' }],
  ['LAT087-134', { category: '方法', title: '别被声光电视控制头脑' }],
  ['LAT087-135', { title: '以牙还牙也是人生规则' }],
  ['LAT087-136', { title: '真正演讲要见识更好的' }],
  ['LAT087-137', { title: '语言背后要有血肉证据' }],
  ['LAT087-138', { category: '法权', title: '盗版祖师也会转身抓盗版' }],
  ['LAT087-140', { title: '读书要像獭祭' }],
  ['LAT087-141', { title: '意见必须以事实为底' }],
  ['LAT087-142', { title: '知识分子要能疯狂表达' }],
  ['LAT087-143', { title: '美色要看见终局' }],
  ['LAT087-144', { title: '台湾政府对日本软弱' }],
  ['LAT087-145', { category: '知识', title: '慰安妇研究要靠书证' }],
  ['LAT087-146', { title: '毛泽东也容许别人骂' }],
  ['LAT087-147', { title: '以德报怨会牺牲赔偿权' }],
  ['LAT087-148', { title: '禁书制度分全毁抽毁' }],
  ['LAT087-149', { title: '文网之下活到压迫者消失' }],
  ['LAT087-150', { title: '蒋氏政治靠洗脑' }],
  ['LAT087-151', { category: '人格', title: '人生要看最后下场' }],
  ['LAT087-152', { title: '独处胜过赶景点' }],
  ['LAT087-153', { title: '政党名称也会被审查' }],
  ['LAT087-154', { title: '坏人得志不等于证据消失' }],
  ['LAT087-155', { title: '只说风凉话没有出息' }],
  ['LAT087-156', { title: '殉道精神重于口号理由' }],
  ['LAT087-158', { title: '有教养不能没有是非' }],
  ['LAT087-159', { category: '文化', title: '鲁迅文法混杂日本结构' }],
  ['LAT087-160', { title: '贴标签会剥夺人权' }],
  ['LAT087-161', { title: '鲁迅批新月派并不公道' }],
  ['LAT087-162', { category: '文化', title: '书画真迹要看材料细节' }],
  ['LAT087-163', { title: '资料说话靠博学搜罗' }],
  ['LAT087-164', { title: '国宝聚散需要政治眼光' }],
  ['LAT087-165', { category: '文化', title: '毛笔字也能看文化虚荣' }],
  ['LAT087-166', { title: '保存材料是政府基本责任' }],
  ['LAT087-167', { title: '稿本能还原政治现形' }],
  ['LAT087-168', { category: '文化', title: '粗话也有语言史' }],
  ['LAT087-169', { title: '诽谤判断要懂隐义' }],
  ['LAT087-171', { title: '台湾党派常是变相国民党' }],
  ['LAT087-172', { title: '西安事变要以旁证还原' }],
  ['LAT087-173', { title: '红色十一写共产主义道德' }],
  ['LAT087-174', { title: '主义不能压过恋人' }],
  ['LAT087-175', { category: '情爱', title: '爱情里的事不必全说破' }],
  ['LAT087-176', { title: '品行不端也要看实际伤害' }],
  ['LAT087-177', { title: '抗战真相不能只靠神话' }],
  ['LAT087-178', { title: '评论文学前先有创作本领' }],
  ['LAT087-179', { title: '小说剧本是被遮住的本领' }],
  ['LAT087-180', { title: '大手笔来自文化现场' }],
  ['LAT087-181', { title: '大胆和小心可以并存' }],
  ['LAT087-182', { title: '朋友身份不等于外人身份' }],
  ['LAT087-183', { category: '文化', title: '无神论也可在寺里讲' }],
  ['LAT087-185', { title: '言论上限和下限不同' }],
  ['LAT087-186', { category: '人格', title: '做和不做结果不同' }],
  ['LAT087-187', { title: '虽非我有也可喜' }],
  ['LAT087-188', { category: '政治', title: '共产党完成强兵之梦' }],
  ['LAT087-189', { title: '蒋氏反共想象仍在流传' }],
  ['LAT087-190', { title: '外省人不能一概而论' }],
  ['LAT087-191', { title: '机会教育要拿证据' }],
  ['LAT087-192', { category: '人格', title: '知识分子要有文化守护' }],
  ['LAT087-193', { category: '方法', title: '定位高低也是思想武器' }],
  ['LAT087-194', { title: '两条腿生活使古人长寿' }],
  ['LAT087-195', { title: '文件动手脚比照片更严重' }],
  ['LAT087-196', { category: '写作', title: '办报标题也要押韵有力' }],
  ['LAT087-197', { title: '三点不露也能争言论自由' }],
  ['LAT087-198', { category: '法权', title: '办报也能争言论自由' }],
  ['LAT087-199', { category: '写作', title: '言论自由还要有趣味' }],
  ['LAT087-200', { title: '方言难抗普通话体系' }],
  ['LAT087-201', { title: '开放报禁会释放抗议美学' }],
  ['LAT087-202', { category: '人格', title: '重话轻说也不失自己' }],
  ['LAT087-203', { category: '知识', title: '名流题字也会跟风' }],
  ['LAT087-205', { title: '宪法程序反照自由主义' }],
  ['LAT087-206', { category: '法权', title: '自由主义曾成政治罪名' }],
  ['LAT087-207', { title: '自由主义常是政治点缀' }],
  ['LAT087-208', { title: '用宪法落实替代自由主义' }],
  ['LAT087-209', { title: '选举乱象会使用乌贼战术' }],
  ['LAT087-210', { title: '民主政治相信人性会腐化' }],
  ['LAT087-211', { title: '王国维为理想而死' }],
  ['LAT087-212', { category: '文化', title: '迷信风水说明现代古人' }],
  ['LAT087-213', { title: '读书要用理想而非名气' }],
  ['LAT087-215', { category: '方法', title: '好头脑还要等资讯' }],
  ['LAT087-217', { category: '人格', title: '不谦虚也可以是真性情' }],
  ['LAT087-218', { category: '人格', title: '信仰不能戒' }],
  ['LAT087-219', { title: '解释之后还要证据化真相' }],
  ['LAT087-220', { category: '方法', title: '作假也需要知识水准' }],
  ['LAT087-221', { title: '快意恩仇也能是玩世' }],
  ['LAT087-222', { title: '台湾政党无能处理舞弊' }],
  ['LAT087-223', { title: '新思想必须带着学问' }],
  ['LAT087-224', { title: '性玩具标准会随时代变化' }],
  ['LAT087-225', { title: '性需求也需要制度面对' }],
  ['LAT087-226', { category: '人格', title: '为理想可少赚不宜多赔' }],
  ['LAT087-227', { title: '军购问题要正本清源' }],
  ['LAT087-228', { title: '军购只要买就是凯子' }],
  ['LAT087-229', { title: '打抱不平要敢对美国' }],
  ['LAT087-230', { title: '一国两制保留台湾自治' }],
  ['LAT087-231', { title: '反抗国民党不等于忧虑民进党' }],
  ['LAT087-232', { title: '读书要大卸八块' }],
  ['LAT087-233', { title: '温故知新效率不高' }],
  ['LAT087-234', { title: '会读书不是速读' }],
  ['LAT087-235', { title: '军购预算不能含糊' }],
  ['LAT087-236', { title: '圣人意思不在古书中' }],
  ['LAT087-237', { title: '省下时间要知道做什么' }],
  ['LAT087-238', { title: '质询权不容旁席打断' }],
  ['LAT087-239', { title: '家庭痛苦只有当事人知道' }],
  ['LAT087-240', { category: '人格', title: '母亲守正不阿' }],
  ['LAT087-241', { title: '读书不能死读' }],
  ['LAT087-242', { title: '好记性不如烂笔头' }],
  ['LAT087-243', { title: '台湾关系法解释权不在台湾' }],
  ['LAT087-244', { title: '告美国总统也要法律路径' }],
  ['LAT087-248', { title: '四不一没有留下宪法绳索' }],
  ['LAT087-249', { title: '台独选项背离国民党本身' }],
  ['LAT087-250', { title: '台独后果依赖美国支持' }],
  ['LAT087-251', { title: '党产问题要分开追究' }],
  ['LAT087-252', { title: '蒋经国把自由主义当毒器' }],
  ['LAT087-253', { title: '内阁制可卡住总统权力' }],
  ['LAT087-256', { category: '政治', title: '二二八真相值得重新组合' }],
  ['LAT087-257', { category: '政治', title: '二二八眼泪不该表演' }],
  ['LAT087-259', { title: '废统说法被新闻稿咬住' }],
  ['LAT087-260', { title: '谈台独要追问时间账' }],
  ['LAT087-261', { title: '守住台湾改变政治犯命运' }],
  ['LAT087-262', { title: '美国执法不等于无罪' }],
  ['LAT087-265', { category: '人格', title: '拍马屁诗人不是五四精神' }],
  ['LAT087-266', { title: '同性之爱不能回避儿童处境' }],
  ['LAT087-267', { title: '新加坡法家政治成功' }],
  ['LAT087-268', { title: '逼马英九因为他握关键票' }],
  ['LAT087-269', { title: '好人形象也会骗人' }],
  ['LAT087-270', { title: '批评马英九需要勇气' }],
  ['LAT087-271', { title: '美国会用高规格挑拨台湾' }],
  ['LAT087-272', { category: '方法', title: '监狱读书也能练成眼力' }],
  ['LAT087-274', { title: '传统美德未必传统' }],
  ['LAT087-275', { title: '台湾没有眼光错过新加坡' }],
  ['LAT087-276', { category: '方法', title: '现场判断要立刻分辨事件' }],
  ['LAT087-278', { title: '政治正确不能牺牲历史正确' }],
  ['LAT087-279', { title: '反军购先问谁付钱' }],
  ['LAT087-280', { category: '方法', title: '史料需要辨别能力' }],
  ['LAT087-281', { title: '圣经译本也有新旧高下' }],
  ['LAT087-282', { title: '台湾外交像闯空门' }],
  ['LAT087-283', { category: '人格', title: '标准应是人类标准' }],
  ['LAT087-284', { title: '学问太大会被看成疯狂' }],
  ['LAT087-285', { title: '言论尺度取决于统治者信任' }],
  ['LAT087-286', { title: '书中照片可保存现场' }],
  ['LAT087-288', { category: '法权', title: '私权问题可以诉诸法律' }],
  ['LAT087-290', { title: '议长失能暴露假民主' }],
  ['LAT087-291', { title: '暴君放伐也要历史眼光' }],
  ['LAT087-292', { title: '党报倒闭不是偶然' }],
  ['LAT087-293', { title: '好思考来自旧经验触发' }],
  ['LAT087-294', { title: '党报责任暴露假民主结构' }],
  ['LAT087-295', { category: '写作', title: '好中文要避开烂套' }],
  ['LAT087-296', { title: '政局安定不能压倒清明' }],
  ['LAT087-297', { title: '中文与科技结合会走红' }],
  ['LAT087-298', { title: '汉字意义有古今变化' }],
  ['LAT087-299', { category: '人格', title: '人生在于打好烂牌' }],
  ['LAT087-300', { category: '法权', title: '四大自由不该乱译' }],
  ['LAT087-303', { category: '写作', title: '被禁就换一个名字办报' }],
  ['LAT087-304', { category: '人格', title: '终点应成为新的起点' }],
  ['LAT087-305', { category: '人格', title: '偏见也可来自经验学识' }],
  ['LAT087-306', { category: '知识', title: '完美人格叙事要看史料' }],
  ['LAT087-307', { title: '文字能推动革命潮' }],
  ['LAT087-308', { title: '亲笔文件最能说明历史' }],
  ['LAT087-309', { title: '蒋介石发迹史要看文件' }],
  ['LAT087-310', { title: '翻译也会暴露概念理解' }],
  ['LAT087-312', { title: '司法会被权力毁掉' }],
  ['LAT087-313', { category: '写作', title: '好广告要有压迫感' }],
  ['LAT087-314', { category: '写作', title: '不去现场也能写小说' }],
  ['LAT087-315', { category: '情爱', title: '关系之美需要结局' }],
  ['LAT087-316', { title: '声光画面正在取代文字' }],
  ['LAT087-317', { category: '方法', title: '会看书要识硬功夫' }],
  ['LAT087-318', { title: '建国急迫会造成政策过快' }],
  ['LAT087-319', { title: '奇怪因缘会留下史料' }],
  ['LAT087-320', { title: '反抗要留下历史记录' }],
  ['LAT087-321', { title: '司法黑暗要点名法官' }],
  ['LAT087-322', { title: '追求目标需要残忍' }],
  ['LAT087-323', { category: '情爱', title: '女人要的是普通家庭' }],
  ['LAT087-324', { category: '政治', title: '政治斗臭会利用亲密关系' }],
  ['LAT087-325', { category: '政治', title: '牢狱中的表态不作准' }],
  ['LAT087-326', { title: '个人立委也能打制度官司' }],
  ['LAT087-327', { title: '三国要拆开善恶脸谱' }],
  ['LAT087-328', { title: '司法问题常被经济解决' }],
  ['LAT087-329', { title: '和平奖也会助长分裂' }],
  ['LAT087-330', { title: '神权统治造成知识封闭' }],
  ['LAT087-331', { title: '开议第一天就要掐关键' }],
  ['LAT087-332', { title: '退出联合国不是汉贼不两立' }],
  ['LAT087-333', { category: '政治', title: '政治斗臭会搬出前妻' }],
  ['LAT087-334', { title: '前妻叙事也要证据说清楚' }],
  ['LAT087-335', { category: '情爱', title: '政治支援会促成婚恋' }],
  ['LAT087-336', { category: '法权', title: '自传修改不能留下关键错处' }],
  ['LAT087-337', { title: '前妻争议要用证据回应' }],
  ['LAT087-338', { title: '男女分手也要凭证据回骂' }],
  ['LAT087-339', { title: '科技使中文输入翻身' }],
  ['LAT087-340', { title: '林语堂文学成就被高估' }],
  ['LAT087-341', { title: '林语堂强在语言学而非文学' }],
  ['LAT087-342', { title: '亲民党不合作可卡住军购' }],
  ['LAT087-343', { category: '文化', title: '古迹修复要尊重历史现场' }],
  ['LAT087-345', { title: '市长也可推动两岸谈判' }],
  ['LAT087-346', { title: '预算冻结是反抗坏政府的方法' }],
  ['LAT087-347', { title: '军购会制造两岸仇恨' }],
  ['LAT087-348', { title: '美国地下大使也可驱逐' }],
  ['LAT087-349', { title: '党产也要细查证据' }],
  ['LAT087-350', { title: '反军购是保护民生资源' }],
  ['LAT087-351', { category: '人格', title: '公私信封也要分清楚' }],
  ['LAT087-352', { title: '两岸问题窍门在预算' }],
  ['LAT087-353', { category: '法权', title: '阻挠议事也是少数权利' }],
  ['LAT087-354', { title: '读书要找圣人真意' }],
  ['LAT087-355', { title: '点名批判可制约假台独' }],
  ['LAT087-356', { category: '人格', title: '知识分子要跟权力唱反调' }],
  ['LAT087-357', { title: '优美中文仍要维护开创' }],
]);

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function writeCsv(filePath, records) {
  const headers = [
    'id',
    'source_id',
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
  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy.map((category) => ({
    category,
    count: records.filter((record) => record.category === category).length,
  }));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’！？。，、：；（）()\s]/gu, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
  return [...new Set(words)].join(',');
}

function sourceDateSuffix(sourceFile) {
  const match = sourceFile.match(/\d{4}-(\d{2})-(\d{2})/u);
  return match ? `${match[1]}-${match[2]}` : sourceFile.slice(0, 3);
}

function ensureUniqueTitles(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.title)) groups.set(record.title, []);
    groups.get(record.title).push(record);
  }

  for (const group of groups.values()) {
    if (group.length < 2) continue;
    for (const record of group) {
      record.title = `${record.title}（${sourceDateSuffix(record.source_file)}）`;
      record.keywords = buildKeywords(record, record.title, record.category);
    }
  }
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
      lines.push(`- 提取轮编号：${record.source_id}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(filePath, records) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}｜提取轮编号：${record.source_id}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeProofreadNote(filePath, payload, dropped) {
  const lines = [
    `# ${payload.book.title}校对说明`,
    '',
    `本轮从提取轮 ${payload.book.source_count} 条中保留 ${payload.records.length} 条，删除 ${payload.book.dropped_count} 条。`,
    '',
    '校对重点：',
    '',
    '- 删除现场展示、个人生活铺陈、选举进程、同题重复、军购/二二八过程性重复和思想密度不足的条目。',
    '- 修正被关键词误分到 `情爱`、`法权`、`知识` 的条目，恢复到八个原子分类中更稳定的位置。',
    '- 将节目题改成思想索引题，突出可检索概念；所有保留条目的 `description` 均未改写。',
    '',
    '分类统计：',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 删除条目',
    '',
    ...dropped.map((item) => `- ${item.id}：${item.title}。${item.reason}`),
    '',
  ];

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const unknownDrops = [...dropReasons.keys()].filter((id) => !extraction.records.some((record) => record.id === id));
const unknownOverrides = [...overrides.keys()].filter((id) => !extraction.records.some((record) => record.id === id));
if (unknownDrops.length || unknownOverrides.length) {
  throw new Error(`Unknown ids: ${[...unknownDrops, ...unknownOverrides].join(', ')}`);
}

const dropped = [];
const records = [];

for (const record of extraction.records) {
  const reason = dropReasons.get(record.id);
  if (reason) {
    dropped.push({ id: record.id, title: record.title, reason });
    continue;
  }

  const override = overrides.get(record.id) ?? {};
  const category = override.category ?? record.category;
  const title = override.title ?? record.title;
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} in ${record.id}`);
  }

  records.push({
    ...record,
    id: `LAT${extraction.book.sequence}-${String(records.length + 1).padStart(3, '0')}`,
    source_id: record.source_id ?? record.id,
    round: '校对轮',
    status: '已校对',
    category,
    title,
    keywords: buildKeywords(record, title, category),
  });
}

ensureUniqueTitles(records);

const payload = {
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除现场展示、个人生活铺陈、选举进程、同题重复、军购/二二八过程性重复和思想密度不足的条目；修正被关键词误分到情爱、法权、知识的条目，并将节目题改成思想索引题。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
};

const roundBase = '思想索引-校对轮';
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(roundCsvPath, records);
writeMarkdown(roundMdPath, payload);
writeText(path.join(outputDir, '思想索引.txt'), records);
fs.copyFileSync(roundJsonPath, path.join(outputDir, '思想索引.json'));
fs.copyFileSync(roundCsvPath, path.join(outputDir, '思想索引.csv'));
writeProofreadNote(path.join(outputDir, '校对说明.md'), payload, dropped);

console.log(
  `Proofread ${payload.book.title}: ${records.length}/${extraction.records.length} kept, ${dropped.length} dropped. Categories: ${payload.book.category_counts
    .map((item) => `${item.category}=${item.count}`)
    .join(', ')}`,
);
