import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 86;
const bookTitle = '李敖大哥大';
const round = '提取轮';
const status = '待校对';
const sequence = String(bookSeq).padStart(3, '0');
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('006.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));

const book = {
  sequence,
  title: bookTitle,
  slug: 'leeao-big-brother',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖大哥大》一百二十七集节目文字中提取思想索引。取舍以李敖本人可独立检索的判断段为主，保留政治制度、两岸定位、言论自由、历史证据、法权尺度、文化教育、性与隐私、人格标准等核心段落；主持串场、来宾问答、现场玩笑、纯个案攻防和过窄节目互动从严剔除。标题用于检索浓缩，description 保留源文本原段落。',
};

const candidateLines = `
001.|10|政治|拒绝东北独立
001.|21|方法|用证据替张学良平反
002.|7|情爱|爱情神话需要拆穿
002.|11|政治|确保东北进入中国版图
002.|17|人格|认同压迫者是一种病症
002.|29|知识|西安事变真相需要还原
003.|14|政治|惯例维系议会秩序
003.|24|法权|规则不能只供参考
004.|8|方法|冗长发言也是议会技术
004.|29|知识|国家档案不能毁灭现代史
005.|12|法权|国家档案必须开放
005.|15|政治|两个中国曾被接受
005.|21|知识|卖国真相要看秘密文件
006.|8|法权|反对意见本身有价值
006.|20|法权|宪法才是权力障碍
007.|19|人格|慰安妇尊严不能卖给日本
007.|27|人格|尊严不能只对大陆讲
008.|11|方法|政治也是专业工作
008.|20|法权|诉讼必须有法律罪名
009.|13|法权|法律位阶高于行政命令
009.|20|政治|打压不是单向罪状
009.|24|政治|台独只做选举炒作
010.|14|文化|不稳定宗教会变政治运动
010.|29|政治|敌视大陆不是出路
011.|12|方法|以貌取人会误读政治
012.|13|知识|历史真相要靠还原
013.|19|政治|台独只做小动作
014.|10|政治|下台总统待遇过高
015.|27|人格|仁义道德要辨公私
016.|17|人格|留在台湾不等于做狗
017.|8|法权|特权会拖住司法
018.|24|法权|扫黄不能扰民滥权
019.|13|情爱|隐私受害不能被道德审判
020.|20|政治|权力家族混合性与政治
021.|26|知识|优秀学者会被台湾打压
022.|16|情爱|手淫需要正常性教育
022.|24|法权|扫黄误用警力
023.|17|知识|许强历史不能被窄化
024.|14|政治|CHINA不能被赶出场
024.|24|政治|进联合国受安理会现实限制
025.|8|方法|独裁者也受奴才解读
025.|14|人格|政见前后矛盾就是无耻
026.|11|政治|撕破脸政治不是国会规范
026.|26|政治|政治意见要保留含蓄
027.|9|政治|假民主也要保留竞争资源
028.|13|文化|神圣者也有身体需求
028.|18|方法|膀胱有力也是政治能力
029.|11|人格|谈自由需要面对尖锐问题
029.|17|知识|启蒙会被政治活动破坏
029.|21|知识|知识分子影响力没落
030.|51|法权|冤案不能因政党轮替被处决
030.|197|政治|终身权力会消除短线炒作
031.|11|法权|两岸称谓有法律定义
031.|12|法权|办法不能替代法律
032.|24|写作|土法炼钢支撑写作
032.|28|写作|写小说不必亲临现场
033.|11|文化|鲁迅杂文不宜神化
033.|20|法权|电视成为言论自由工具
034.|12|政治|台湾缺过正常生活
034.|15|政治|反对台湾分离主义
035.|10|文化|佛教原本没有偶像崇拜
035.|12|知识|取经源于佛教被混乱
036.|27|知识|外蒙古独立有强权交易
036.|30|法权|承认现实也要修法
037.|12|法权|小市民也能抗争权益
037.|16|政治|交流政策不能双标
038.|10|知识|二二八叙事不能单面改写
038.|12|人格|外省原罪道歉不公
038.|30|知识|二二八研究要拿证据
039.|15|知识|台湾史料单薄难治
039.|19|政治|总统兼党主席是党政合一
040.|29|文化|学生负担不能只怪学校
041.|23|知识|暴力路线会引来屠杀
042.|12|政治|司法可以消灭政治对手
042.|17|政治|长期权力未必只会炒短线
042.|25|政治|台湾经济高度依赖大陆
043.|27|政治|民选总统不等于民选党主席
043.|38|人格|知识分子有说真话的责任
044.|20|文化|本土语言政策会排挤竞争力
044.|25|文化|文字不能硬绑口语
044.|34|文化|台湾语言仍在中国文化掌心
045.|7|政治|台湾是美国国防线的一环
045.|20|政治|美国总统并不可靠
045.|30|政治|不要只做华盛顿走狗
046.|7|知识|盗版是弱势文化常见现象
046.|28|知识|孙中山卖国文件要看证据
046.|30|知识|外蒙古独立不是简单承认
046.|39|政治|夺权会使人不择手段
047.|11|法权|被质询者不能反问
047.|18|法权|质询规则可以让官员闭嘴
047.|22|法权|国会议员有风闻言事权
047.|37|政治|宣示主权应走向钓鱼台
048.|8|法权|监狱性侵来自封闭权力
048.|17|情爱|性侵高发于权力封闭场域
048.|22|文化|神职禁欲遮不住欲望
048.|30|情爱|允许婚配可能比伪禁欲合理
048.|34|人格|活着寂寞死后朋友变多
049.|11|政治|正名暴露尚未独立
049.|13|政治|台独表演像张天师捉鬼
049.|17|方法|热心统一也可能成为道具
049.|22|政治|要求台独给出时间表
050.|7|政治|总统兼党主席是民主倒退
050.|8|政治|党政合一不是完美制度
050.|17|法权|利益冲突应当回避
050.|29|文化|教育改革不能急躁蛮干
050.|32|文化|联考有一次性公平好处
051.|7|法权|言论自由不能被权力玩弄
051.|10|法权|言论自由是第一自由
051.|13|法权|不喜欢媒体也要保护权利
051.|21|法权|国防不能做黑暗统治护符
051.|38|政治|情报内斗会反噬权力
052.|19|政治|政党领袖应进入国会
052.|32|知识|政权移交也有档案解释问题
052.|39|方法|丑闻要摊在阳光下
053.|17|人格|信念摧毁会灭亡国家
053.|25|法权|外患罪会迫害新闻自由
053.|26|人格|法官可以辞职拒审
054.|12|法权|搜查媒体伤害言论自由
054.|13|政治|美国神主牌不足以自救
054.|20|法权|泄密证据仍应调查
055.|12|政治|国统纲领是一中依据
055.|13|政治|一个中国表述被阿扁赖掉
055.|16|政治|WTO仍需要两岸协商
056.|8|法权|法院曾配合政治私通
056.|9|政治|民主之父神话很肉麻
056.|14|政治|党外人物也会被历史检验
057.|9|政治|李登辉政治广告要看利益
057.|20|政治|三党合作会互相变色
057.|28|法权|法律不能抵触正式法律
058.|23|政治|新党应由台湾人主导
059.|9|人格|顾炎武拒绝错误合作
059.|19|知识|许强是台湾共产党
060.|10|知识|儒将神话要拆开看
060.|30|人格|张昭雄说真话
061.|17|政治|排宋条款是开门后绑人
061.|27|政治|三合一布局是逼宋
062.|20|知识|艺术品市场不能凭想象
062.|25|方法|鉴定要证据
063.|9|人格|人格信用会影响事实判断
063.|12|知识|严侨共产党身份不能遮盖
063.|14|人格|救老师比清算更重要
064.|24|政治|新党不能发蓝
064.|25|政治|新党不能随色变形
065.|10|法权|政党退出媒体承诺被抛弃
065.|18|政治|国民党不反省排宋
065.|19|政治|国民党已是历史名词
066.|20|法权|美国人做台湾立委有利益冲突
066.|22|方法|攻击宣传会损害正面政见
066.|26|政治|国家利益高于政党
067.|14|法权|政治问题也可法律解决
067.|15|法权|检察官会制造冤案
068.|16|政治|政党领袖应坐镇国会
068.|20|政治|宋楚瑜应进入立法院
068.|21|政治|总统制是坏制度
069.|24|政治|推责是陈水扁政治特色
070.|18|政治|媒体政治也会麦卡锡化
070.|25|法权|言论自由要保护异议主持
071.|9|政治|阿扁政权靠欺骗得来
071.|18|政治|台独执政后不敢实现
072.|13|文化|Call-in节目会培养暴力
072.|20|政治|新党还有最后机会
072.|29|政治|金门可用公投反制
073.|8|方法|警察控制经济有定律
073.|22|法权|警察国家会窃听虐待
073.|26|政治|身份变迁来自权力定义
074.|17|文化|文化水平低会露出政治判断
074.|24|政治|妇女政策不能只表演
074.|30|方法|个人行为与群体评价要分开
075.|10|法权|政府不可诱民入罪
075.|21|政治|金门福建体制只是意淫
075.|27|法权|尹案不能草率了结
076.|7|文化|中国艺术早已面对裸体
076.|17|文化|媒体宠儿是一种霸权
076.|23|文化|不许小妹大是媒体竞争
077.|10|情爱|遇隐私问题不必否认
077.|11|人格|道德攻击常不相干
077.|18|法权|司法拖延会消耗真相
078.|19|法权|公营电视本身有问题
078.|22|法权|媒体人应批政府而非护航
079.|21|人格|缩头也一样挨刀
079.|22|法权|资讯自由承诺被封杀
079.|23|人格|退让不等于正确
080.|16|政治|民视是民进党的台
080.|18|法权|调查局可替权力护航
081.|8|政治|李登辉频繁修宪
081.|11|法权|宪法原是内阁制
081.|17|政治|总统制难以成功
082.|9|情爱|色情影像可疏解欲望
082.|14|文化|女性身体可以留下历史
082.|17|法权|情欲挥洒仍要依法解决
083.|10|情爱|被偷拍者可开明面对
083.|16|文化|妓女进国会证明开放
083.|26|法权|美国言论自由也会低头
084.|9|政治|女权政策也会虚伪
084.|14|知识|赛金花历史可以重估
084.|24|政治|性工作者也能进入国会
085.|14|法权|搜查反而证明言论自由受害
085.|20|法权|媒体不该对权力放水
086.|20|人格|知识分子要与权力过不去
086.|26|文化|台湾可能成为文化沙漠
087.|16|法权|打压媒体不配谈杰斐逊
088.|16|人格|仁义道德要辨公私
088.|19|知识|还原历史不能洗白钱穆
089.|6|政治|台湾是美国儿政府
089.|15|政治|正名是躲躲躲
089.|16|政治|首都仍然不是台北
090.|9|人格|军人说战死有气魄
090.|12|知识|美国不打台湾有历史理由
090.|15|方法|战到最后也要有参谋作业
091.|25|政治|台湾民主是假的
091.|27|法权|不成文法也是政治约定
092.|18|方法|新闻专业需要现场判断
093.|8|知识|美国并非抗战恩人
093.|25|文化|亲日媒体会压制异声
094.|7|法权|百分百言论自由被背叛
094.|21|法权|自由承诺经不起权力考验
094.|22|政治|台独执政后不敢做
095.|25|人格|报纸没有风骨
095.|26|知识|文星真相不能被余光中遮盖
096.|15|人格|声援自由不能选择性
096.|19|写作|一介书生也能办报
096.|20|知识|人权斗士名词不能乱给
097.|15|方法|思想清楚才能比较人物
097.|18|人格|权力者听不进真相
098.|8|法权|法律文书不能写阿扁
098.|23|知识|档案移交不能各说各话
099.|12|政治|彭明敏活着证明死了
099.|20|政治|台独是事实不是理论
100.|7|人格|师者要有人格传道
100.|8|知识|三民主义有统战功能
100.|14|法权|警察国家会变恐怖
101.|9|政治|正名是骗政府
101.|13|政治|靠嘴巴骗政权
101.|22|人格|报纸也要有原则
102.|13|政治|官场会用暗示拖延
102.|24|政治|总统府资政浪费税金
103.|13|人格|知识分子要有专业和骨气
104.|17|政治|总统兼党主席威胁民主
104.|20|政治|自由民主政党不同于乙式政党
105.|10|知识|用李登辉过去检验现在
105.|13|知识|靖国神社是战犯问题
106.|13|政治|抗拒大陆经济无济于事
106.|20|知识|李登辉统一言论要留下
107.|17|方法|污点证人也可同归于尽
107.|18|政治|宋楚瑜资源少于李登辉
108.|8|文化|大学生被政治骗成小绵羊
108.|16|政治|台湾人不是中国人说不通
108.|26|文化|大学生思想太弱
109.|13|政治|内阁制比总统制稳健
110.|12|方法|感情介入会把脑袋当屁股
110.|17|人格|慰安妇拒领日本钱保留尊严
111.|16|知识|大学生软件使用涉及产权
111.|17|方法|盗版也会带来宣传效果
112.|13|政治|核废问题要放在一中框架
112.|17|人格|宁可同归于尽也是性格
112.|18|政治|国民党做好事常常太晚
112.|24|人格|坐牢不能白做
113.|9|知识|李登辉也曾骂台独
113.|16|人格|李敖没有做狗
114.|20|文化|母语政治会反咬自身
114.|21|政治|国统纲领仍统计中国
115.|18|政治|台湾正名依赖美国
115.|23|政治|独立方案寄托美国脑海
116.|11|政治|阿扁挡住台湾正名
116.|14|政治|不敢正名是因为美国
117.|11|法权|国内法下仍是中国人
117.|14|政治|否认中华民国也要说清楚
118.|8|政治|金门姿态是在骗美国
118.|9|方法|糊涂身份要先追问
118.|20|政治|澎湖也可开台湾玩笑
119.|10|政治|正名先骂到李登辉
119.|20|政治|台独不是理论而是事实
120.|13|法权|迁徙自由可反问美国
120.|14|政治|台湾被WHA抛弃
121.|17|人格|李登辉统一言论暴露分裂
122.|9|政治|美国支持一个中国
122.|10|政治|阿扁回避统一
122.|16|政治|阿米巴政治只做小动作
123.|14|政治|两国论被美国压回
123.|17|政治|公投也会被美国反对
123.|18|人格|台湾没有尊严
124.|8|知识|历史捏造要拆穿
124.|16|知识|合成照片会制造继承神话
124.|22|文化|文化种猪没有考试
125.|8|法权|出生地条款不合宪政
125.|12|文化|太岁不是凶神
126.|10|政治|台湾做美国棋子互斗
126.|20|方法|古迹应先控制现场
126.|21|写作|正名文章有语言误读
127.|20|政治|青年反台独会觉醒
127.|23|人格|领导人应办正事
127.|24|法权|已有科技基本法还要制定
`;

const allCandidates = candidateLines
  .trim()
  .split(/\r?\n/u)
  .map((line) => {
    const [prefix, paragraphNumberText, category, title] = line.split('|');
    if (!prefix || !paragraphNumberText || !category || !title) {
      throw new Error(`Bad candidate line: ${line}`);
    }
    const paragraphNumber = Number(paragraphNumberText);
    if (!Number.isInteger(paragraphNumber) || paragraphNumber < 1) {
      throw new Error(`Bad paragraph number in candidate line: ${line}`);
    }
    if (!taxonomy.includes(category)) {
      throw new Error(`Bad category in candidate line: ${line}`);
    }
    return {
      prefix: prefix.trim(),
      paragraphNumber,
      category: category.trim(),
      title: title.trim(),
    };
  });

const selectedCandidateLines = `
001.|10
001.|21
002.|11
002.|29
003.|24
004.|8
005.|12
005.|21
006.|20
007.|19
007.|27
008.|11
009.|13
009.|24
010.|29
011.|12
012.|13
013.|19
014.|10
015.|27
016.|17
017.|8
018.|24
019.|13
020.|20
021.|26
022.|16
022.|24
023.|17
024.|14
024.|24
025.|8
026.|11
027.|9
028.|13
029.|17
029.|21
030.|51
030.|197
031.|11
032.|24
032.|28
033.|11
034.|15
035.|10
035.|12
036.|27
036.|30
037.|16
038.|10
038.|30
039.|19
040.|29
041.|23
042.|17
042.|25
043.|27
043.|38
044.|20
044.|34
045.|7
045.|20
045.|30
046.|7
046.|28
046.|39
047.|11
047.|22
047.|37
048.|8
048.|22
048.|30
049.|11
049.|13
049.|22
050.|7
050.|17
050.|29
051.|7
051.|10
051.|13
051.|21
052.|19
052.|39
053.|17
053.|25
054.|12
054.|20
055.|12
055.|16
056.|8
057.|20
058.|23
059.|19
060.|10
061.|17
062.|25
063.|9
064.|25
065.|19
066.|20
066.|26
067.|14
068.|21
069.|24
070.|25
071.|9
072.|13
072.|20
072.|29
073.|22
074.|24
075.|10
076.|7
077.|10
078.|22
079.|21
080.|16
081.|8
081.|17
082.|9
083.|10
083.|26
084.|24
085.|14
086.|20
087.|16
088.|16
089.|6
089.|16
090.|9
091.|25
092.|18
093.|8
094.|7
095.|25
096.|19
097.|15
098.|8
099.|20
100.|7
100.|14
101.|13
102.|24
103.|13
104.|17
105.|10
106.|13
107.|17
108.|8
108.|26
109.|13
110.|17
111.|16
112.|13
113.|16
114.|21
115.|23
116.|11
117.|11
118.|8
119.|20
120.|14
121.|17
122.|9
122.|16
123.|14
123.|18
124.|16
125.|8
126.|10
127.|20
127.|24
`;

const selectedCandidateRefs = new Set(
  selectedCandidateLines
    .trim()
    .split(/\r?\n/u)
    .map((line) => {
      const [prefix, paragraphNumberText] = line.split('|');
      return `${prefix.trim()}#${Number(paragraphNumberText)}`;
    }),
);

const candidateRefs = new Set(allCandidates.map(({ prefix, paragraphNumber }) => `${prefix}#${paragraphNumber}`));
for (const selectedRef of selectedCandidateRefs) {
  if (!candidateRefs.has(selectedRef)) throw new Error(`Selected candidate is not defined: ${selectedRef}`);
}

const candidates = allCandidates.filter(({ prefix, paragraphNumber }) =>
  selectedCandidateRefs.has(`${prefix}#${paragraphNumber}`),
);

function normalize(text) {
  return String(text ?? '').replace(/\s+/gu, ' ').trim();
}

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot resolve source file prefix: ${prefix}`);
  return sourceFile;
}

const paragraphCache = new Map();

function readParagraphs(sourceFile) {
  if (!paragraphCache.has(sourceFile)) {
    const fullPath = path.join(sourceDir, sourceFile);
    const text = decoder.decode(fs.readFileSync(fullPath));
    const paragraphs = text
      .replace(/\r/g, '')
      .split(/\n\s*\n+/u)
      .map(normalize)
      .filter(Boolean);
    paragraphCache.set(sourceFile, paragraphs);
  }
  return paragraphCache.get(sourceFile);
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const descriptions = new Map();
  for (const record of master.records ?? []) {
    if (record.book === bookTitle || String(record.id ?? '').startsWith(`LAT${sequence}-`)) continue;
    descriptions.set(normalize(record.description), record.id);
  }
  return descriptions;
}

function makeKeywords(category, title, sourceFile) {
  return [category, title, sourceFile.replace(/^\d+\./u, '').replace(/\.txt$/u, '')].join(',');
}

function buildRecords() {
  const existingDescriptions = loadExistingDescriptions();
  const localDescriptions = new Map();
  const seenSourceRefs = new Set();
  const records = [];
  const skippedDuplicates = [];

  for (const candidate of candidates) {
    const { prefix, paragraphNumber, category, title } = candidate;
    const sourceFile = resolveSourceFile(prefix);
    const sourceRef = `${sourceFile}#${paragraphNumber}`;
    if (seenSourceRefs.has(sourceRef)) {
      throw new Error(`Duplicate candidate source ref: ${sourceRef}`);
    }
    seenSourceRefs.add(sourceRef);

    const paragraphs = readParagraphs(sourceFile);
    const description = paragraphs[paragraphNumber - 1];
    if (!description) {
      throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
    }

    const normalizedDescription = normalize(description);
    const duplicateId = localDescriptions.get(normalizedDescription) ?? existingDescriptions.get(normalizedDescription);
    if (duplicateId) {
      skippedDuplicates.push({ prefix, paragraphNumber, title, duplicateId });
      continue;
    }

    const id = `LAT${sequence}-${String(records.length + 1).padStart(3, '0')}`;
    localDescriptions.set(normalizedDescription, id);
    records.push({
      id,
      book: book.title,
      round,
      status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: paragraphNumber,
      source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(category, title, sourceFile),
    });
  }

  return { records, skippedDuplicates };
}

function categoryCounts(records) {
  const counts = new Map(taxonomy.map((category) => [category, 0]));
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) ?? 0) + 1);
  }
  return taxonomy.map((category) => ({ category, count: counts.get(category) ?? 0 }));
}

function escapeCsv(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function writeCsv(records, filePath) {
  const columns = [
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
  const rows = [columns.join(',')];
  for (const record of records) {
    rows.push(columns.map((column) => escapeCsv(record[column])).join(','));
  }
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(payload, filePath) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书名：${payload.book.title}`,
    `- 轮次：${payload.book.round}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 候选数：${payload.book.candidate_count}`,
    `- 跳过重复：${payload.book.skipped_duplicate_count}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    '## 索引',
    '',
  ];

  for (const record of payload.records) {
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(records, filePath) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeNote(payload, filePath) {
  const lines = [
    `# ${payload.book.title}提取说明`,
    '',
    `本轮从源目录 \`${payload.book.sourceDir}\` 提取。`,
    '',
    '取舍原则：',
    '',
    '- 优先保留李敖自己的明确判断、方法、价值标准或可复用概念。',
    '- 对主持串场、来宾问答、节目笑料、纯个人攻防和过窄现场互动从严剔除。',
    '- 标题用于检索和浓缩主题；所有 `description` 均保留源文本原段落，不改写。',
    '',
    '分类统计：',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    `候选 ${payload.book.candidate_count} 条，生成 ${payload.records.length} 条，跳过重复 ${payload.book.skipped_duplicate_count} 条。`,
    '',
  ];

  if (payload.book.skipped_duplicate_count) {
    lines.push('跳过重复：');
    lines.push('');
    for (const skipped of payload.book.skipped_duplicates) {
      lines.push(`- ${skipped.prefix} P${skipped.paragraphNumber}：${skipped.title}（重复于 ${skipped.duplicateId}）`);
    }
    lines.push('');
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const { records, skippedDuplicates } = buildRecords();
const payload = {
  book: {
    ...book,
    record_count: records.length,
    candidate_count: candidates.length,
    skipped_duplicate_count: skippedDuplicates.length,
    skipped_duplicates: skippedDuplicates,
    category_counts: categoryCounts(records),
  },
  records,
};

fs.mkdirSync(outputDir, { recursive: true });

const roundBase = `思想索引-${round}`;
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);
const indexJsonPath = path.join(outputDir, '思想索引.json');
const indexCsvPath = path.join(outputDir, '思想索引.csv');
const indexTxtPath = path.join(outputDir, '思想索引.txt');

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.copyFileSync(roundJsonPath, indexJsonPath);
writeCsv(records, roundCsvPath);
fs.copyFileSync(roundCsvPath, indexCsvPath);
writeMarkdown(payload, roundMdPath);
writeText(records, indexTxtPath);
writeNote(payload, path.join(outputDir, '提取说明.md'));

console.log(
  `Built ${payload.book.title}: ${records.length} records, ${skippedDuplicates.length} skipped duplicates. Categories: ${payload.book.category_counts
    .map(({ category, count }) => `${category}=${count}`)
    .join(', ')}`,
);
