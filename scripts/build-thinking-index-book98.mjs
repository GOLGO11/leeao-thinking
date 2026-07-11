import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 98;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '李敖通电集';
const slug = 'leeao-tongdian-collection';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '011.李敖电子报',
  '005.李敖通电集',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
001.2000年6月29日.txt|7|受损仍要有始有终|人格|履约;有始有终;义助
001.2000年6月29日.txt|12|政治气候会改变答案|政治|政治气候;承诺;诚信
001.2000年6月29日.txt|14|言论声势会招来权力打压|政治|新闻自由;言论自由;打压
002.2000年6月30日.txt|6|维权可同时运用法律与舆论|法权|维权;民刑事;舆论
002.2000年6月30日.txt|14|未定著作收益不是主持报酬|法权|著作权;主持报酬;契约
002.2000年6月30日.txt|16|书籍可与媒体互换价值|写作|李敖大全集;电视;以货易金
003.2000年7月3日.txt|11|时间线能拆穿身份指控|方法|时间线;身份;证据
003.2000年7月3日.txt|14|封锁资料会使监察失效|法权|监察人;资料;封锁
003.2000年7月3日.txt|16|母公司监察权不能移花接木|法权|母公司;子公司;监察人
004.2000年7月4日.txt|5|监察人负责调查而非经营|法权|公司法;监察人;经营
004.2000年7月4日.txt|6|背信须有职务与损害因果|法权|背信;职务;因果关系
004.2000年7月4日.txt|7|无经营权难以构成掏空|法权|掏空;监察人;经营权
004.2000年7月4日.txt|11|做人高下要看怎么还债|人格|还债;信用;做人
004.2000年7月4日.txt|17|违约赔偿是被害人保障|法权|违约;被害人;契约
004.2000年7月4日.txt|19|个人言论责任应自己承担|人格|言论;责任;担当
005.2000年7月5日.txt|10|患难时的情义更能验人|情爱|患难;夫妻;情义
005.2000年7月5日.txt|23|民意代表必须让人民找得到|法权|民意代表;请愿;隐私权
006.2000年7月6日.txt|3|理解文字必须顾全上下文|方法|上下文;断章取义;解读
006.2000年7月6日.txt|5|过分解释会曲解原意|方法|过分解释;原意;比喻
006.2000年7月6日.txt|14|募资承诺的股权应还给投资人|法权|股权;募资;背信
006.2000年7月6日.txt|15|人头股东会伤害真实投资者|法权|人头股东;伪造文书;投资者
006.2000年7月6日.txt|20|集体诉讼可以追回股东权益|法权|集体诉讼;股东;民视
006.2000年7月6日.txt|24|两党欺骗人民应一视同仁|政治|国民党;民进党;一视同仁
006.2000年7月6日.txt|25|政治人物要为助推后果负责|政治|政治责任;承诺;媒体
008.2000年7月10日.txt|9|公众募集的资产不得私相授受|法权|公众募资;股份;背信
009.2000年7月11日.txt|18|官方报告略去的细节就是疑点|方法|官方报告;疑点;行政责任
009.2000年7月11日.txt|19|冲突纪录应与年年甲等交叉检验|方法|考绩;冲突纪录;交叉检验
010.2000年7月12日.txt|13|实地调查可比官方报告更逼真|方法|实地调查;官方报告;真相
010.2000年7月12日.txt|17|调查范围不该预先排除行政责任|法权|调查委员会;行政责任;授意
010.2000年7月12日.txt|19|陈情只转回被控单位会使监察失效|法权|监察院;陈情;责任
012.2000年7月14日.txt|4|时间精力有限就不能包揽一切|人格|时间;精力;本职
012.2000年7月14日.txt|5|代为卸责的调查不叫独立|方法|独立调查;卸责;责任
012.2000年7月14日.txt|7|人命事故不能只谈道义责任|法权|行政责任;道义责任;人命
012.2000年7月14日.txt|8|官员犯错不能拿国家的钱善后|法权|特支费;纳税人;赔偿
012.2000年7月14日.txt|9|道歉往往是被持续追责逼出来的|人格|道歉;追责;坚持
012.2000年7月14日.txt|13|任用程序不能为私人选择性放弃|法权|任用程序;私人;特权
017.2000年7月21日.txt|19|爱国方式要随环境改变|政治|爱国;环境;方式
017.2000年7月21日.txt|20|威权败退是抗争结果而非主动从良|政治|威权;民主;抗争
018.2000年7月24日.txt|9|行政职位会检验知识分子风骨|人格|知识分子;行政职;风骨
018.2000年7月24日.txt|11|学术专长不等于行政能力|知识|学术;行政;能力
018.2000年7月24日.txt|12|整合口号可能只留下增设|方法|学科整合;设所;口号
019.2000年7月25日.txt|3|制度的分合最后可能全成了分|方法|学科;整合;组织
019.2000年7月25日.txt|4|高薪补差不应玩文字花样|法权|补足差额;特聘研究员;透明
020.2000年7月26日.txt|3|浪费公帑有时比贪污更可怕|法权|公帑;浪费;贪污
020.2000年7月26日.txt|4|接受挑战就应公开工程档案|方法|工程;档案;公开
020.2000年7月26日.txt|11|学者应先做到自己宣示的中立|人格|学者;中立;言行一致
020.2000年7月26日.txt|13|监督社会前要先管好自己机构|人格|监督;本职;中研院
021.2000年7月27日.txt|10|公家消耗品仍是公家财产|法权|公家财产;消耗品;私用
021.2000年7月27日.txt|16|连任不能证明施政有能力|政治|连任;施政;能力
021.2000年7月27日.txt|17|个案求证能使政治批评具体|方法|个案;求证;政治批评
022.2000年7月28日.txt|6|司法纠错后政府应主动补救|法权|司法;纠错;补救
022.2000年7月28日.txt|7|诉愿有结果仍可被行政拖延|法权|诉愿;拖延;人民权益
022.2000年7月28日.txt|10|释疑可被官僚用作拖延工具|方法|释疑;拖延;行政效率
022.2000年7月28日.txt|11|公文旅行只会让责任回到原点|方法|公文旅行;责任;官僚
023.2000年7月31日.txt|5|政党轮替可能把旧错放大|政治|政党轮替;旧错;行政
023.2000年7月31日.txt|6|光说漂亮话不等于做漂亮事|人格|漂亮话;行动;政客
024.2000年8月1日.txt|4|家人亲笔回忆可成为回忆录外章|写作|母亲遗稿;李敖回忆录;家史
029.2000年8月8日.txt|4|两个专任职务不能同时全专|法权|专任;兼职;制度
029.2000年8月8日.txt|5|上台就为自己破坏制度是特权|法权|待遇;特权;制度
030.2000年8月9日.txt|13|补足美国薪资差额是规避限制|法权|补足差额;美国薪资;规避
030.2000年8月9日.txt|14|承认无法反驳仍要求例外|法权|专案;例外;人事行政局
031.2000年8月10日.txt|13|受益人不应为自己的加薪文件盖印|法权|利益冲突;盖印;加薪
031.2000年8月10日.txt|17|政治解决不能使违法变合法|政治|政治解决;违法;连战
031.2000年8月10日.txt|20|个人加薪不应被当成最速件|法权|最速件;加薪;公文
031.2000年8月10日.txt|21|清高形象不能遮掉占取国家钱|人格|清高;国家钱;李远哲
032.2000年8月11日.txt|6|一人主持会议不能命令裁掉法定机构|法权|政风室;法律;总统府
032.2000年8月11日.txt|10|学术机构扩权会模糊宪政位阶|政治|中研院;扩权;宪政位阶
032.2000年8月11日.txt|11|扩编很容易变成有官大家做|政治|扩编;行政职;组织法
032.2000年8月11日.txt|22|最高学术机构不应插手国家方针|知识|学术研究;国家方针;职能
033.2000年8月14日.txt|4|培育人才的职能不应与教育机关重叠|知识|人才培育;教育部;职能
033.2000年8月14日.txt|5|没有实践的机构任务只是空话|方法|机构任务;实践;空话
033.2000年8月14日.txt|6|院长连任选举会引入请托逼迎|政治|院长任期;连任;权势
033.2000年8月14日.txt|8|没有基本沟通就谈不上整合|方法|沟通;整合;国际研究生院
033.2000年8月14日.txt|10|定有官等的职位应由有资格者担任|法权|公务人员;任用资格;秘书长
033.2000年8月14日.txt|11|研究人员广泛兼任行政职会破坏体制|法权|研究人员;兼任;行政职
034.2000年8月15日.txt|6|个人特色的杂志应与创办人及身而绝|文化|杂志;创办人;个人特色
034.2000年8月15日.txt|10|不给迫害者自行退场的台阶|人格|软禁;台阶;抗争
035.2000年8月16日.txt|6|真正编成全集还得靠私人机构|文化|胡适全集;私人机构;公家机构
035.2000年8月16日.txt|7|渐老时更该做别人做不成的事|人格|老去;责任;难事
035.2000年8月16日.txt|8|史料杂志的功过必须一并追问|文化|传记文学;史料;功过
035.2000年8月16日.txt|10|内行能从史料缝隙看出苦心|方法|读书得间;史料;内行
035.2000年8月16日.txt|11|占有言论阵地就有扩宽自由的责任|写作|言论阵地;言论自由;媒体责任
035.2000年8月16日.txt|12|言论尺度扩展未必是统治者从良|政治|言论尺度;统治者;历史记忆
035.2000年8月16日.txt|16|生存妥协会造成不同的文化路线|人格|生存;妥协;文化路线
037.2000年8月18日.txt|7|把辞职偷换成请假是语言欺骗|政治|辞职;请假;政治语言
040.2000年8月23日.txt|3|没把钱放进私袋也要遵守行政程序|法权|行政程序;采购;公帑
040.2000年8月23日.txt|4|四十天不上班显示公共机构管理失灵|法权|旷职;公共机构;著作权
043.2000年8月28日.txt|4|权势会使人以神自居|人格|权势;自我神化;疯狂
043.2000年8月28日.txt|6|小人物掌权也能成为警世样本|方法|权力;样本;警世
043.2000年8月28日.txt|12|毛笔辞呈显示封建官场文化|文化|毛笔字;辞呈;官场文化
043.2000年8月28日.txt|14|专家自我膨胀后会以为无所不知|知识|专家;自我膨胀;权威
043.2000年8月28日.txt|17|对国家有意见不必巧立顾问名目|政治|国政顾问;国家体制;意见
043.2000年8月28日.txt|21|拆除造神要先让人看原始证据|方法|造神;原始证据;拆神
044.2000年8月29日.txt|3|老照片可用当事人题注保存家史|知识|老照片;题注;家史
045.2000年8月30日.txt|3|诉讼反击要逼对方出庭遍传证人|方法|出庭;反诉;证人
047.2000年9月1日.txt|44|资源高度集中于关系机构必须追问|法权|利益冲突;捐款;基金会
048.2000年9月4日.txt|10|明确违法不只是看法不同|法权|违法;看法;副院长
048.2000年9月4日.txt|14|科学家不应抹杀文件证据|知识|科学家;公文;证据
049.2000年9月5日.txt|7|八行书是否真诚要看后续追问|方法|八行书;回信;追问
049.2000年9月5日.txt|11|利用大众传播诽谤构成加重|法权|诽谤;大众传播;法律
053.2000年9月11日.txt|6|皇民化不只是语言教育认同|文化|皇民化;语言;教育
058.2000年9月18日.txt|29|选举机关应以设立它的母法为准|法权|中选会;母法;选罢法
059.2000年9月19日.txt|3|行政机关不能从母法之外创设义务|法权|母法;财产申报;中选会
059.2000年9月19日.txt|9|细则公告部函都不是法律|法权|法律;细则;公告
059.2000年9月19日.txt|24|法条并列结构可证总统候选人被排除|法权|法条;总统候选人;财产申报
059.2000年9月19日.txt|27|施行细则不得凌驾母法|法权|子法;母法;命令
060.2000年9月20日.txt|3|历史旁证能显出命令扩权的路径|方法|历史旁证;戒严法;扩权
060.2000年9月20日.txt|6|戒严的军事限制不能扩张到男女问题|法权|戒严法;扩张解释;出版
060.2000年9月20日.txt|7|叫办法或细则的文件属于命令|法权|中央法规标准法;命令;细则
061.2000年9月21日.txt|5|不明确的罚则不能靠部函补出|法权|罚则;部函;法律明确性
061.2000年9月21日.txt|21|清廉监督对象应是公职人员|法权|公职人员;候选人;清廉
061.2000年9月21日.txt|25|候选人财产公开会波及家人隐私|法权|财产隐私;配偶;未成年子女
061.2000年9月21日.txt|27|以身试法可用来厘清法律矛盾|法权|以身试法;宪法;法律矛盾
062.2000年9月22日.txt|58|官僚自抄公文都会抄出错误|方法|公文;抄写;粗心
062.2000年9月22日.txt|59|现场承认与事后答辩要交叉对照|方法|现场;答辩;交叉对照
063.2000年9月25日.txt|7|发表稿的用词替换值得校勘|写作|校勘;删改;发表稿
063.2000年9月25日.txt|12|校勘要恢复发表时被删掉的尾段|写作|校勘;删节;原稿
064.2000年9月26日.txt|3|批判机构先要做功能定性|方法|定性分析;监督;调查
064.2000年9月26日.txt|8|以高道德监督别人会自封圣者|人格|道德;监督;圣者
064.2000年9月26日.txt|18|监督别人的人也应把自己送检|法权|自我监督;检调;捐款
066.2000年9月28日.txt|5|实证写作可以醒世但正法也要接受检验|文化|实证;佛法;巫术
069.2000年10月3日.txt|10|科学光照下的灵异陈述仍属巫术|知识|科学;巫术;密教
071.2000年10月5日.txt|3|公布大批秘件要先编号|方法|秘件;编号;公布
076.2000年10月12日.txt|11|无法联系资料源时可先公布召唤后续史料|方法|公布;资料源;史料
076.2000年10月12日.txt|31|文件语气极端不等于所有问题都不值讨论|方法|文件;语气;讨论
077.2000年10月13日.txt|18|政党不敢追究时可脱党起诉|方法|脱党;起诉;财团
077.2000年10月13日.txt|19|年事已高不是不告的理由|法权|起诉;年龄;虎头蛇尾
077.2000年10月13日.txt|20|面对财团声势仍要有勇气|人格|财团;勇气;王永庆
078.2000年10月16日.txt|5|专业立场被预设服从就会自我推翻|人格|专业;服从;核四
078.2000年10月16日.txt|6|良知与专业不能遇到上级就放弃|人格|良知;专业;政治权威
078.2000年10月16日.txt|7|领导先画方向会压缩部属判断|政治|领导;自主判断;核四
078.2000年10月16日.txt|9|政务官的基本气质是人格一贯|人格|政务官;人格一贯;畏上媚下
078.2000年10月16日.txt|11|个人能力有限应把精力用在更大的事|人格|个案;优先级;精力
078.2000年10月16日.txt|12|离开电视是为了回到写作大业|写作|电视;写作;退出
078.2000年10月16日.txt|13|晚年应退回写作基本面|写作|晚年;写作基本面;时间
079.2000年10月17日.txt|3|公布双方信件是为了保存史料|知识|信件;史料;公布
080.2000年10月18日.txt|50|两批往返文件应对照阅读|方法|往返文件;对照;证据
081.2000年10月19日.txt|4|被窃说法与伪件说法不能同时成立|方法|逻辑;窃案;伪件
086.2000年10月26日.txt|22|五个数字不值得用三百字公函索取|法权|补正;公函;行政成本
086.2000年10月26日.txt|26|程式瑕疵不影响要件就应受理|法权|程式瑕疵;诉愿;判例
087.2000年10月27日.txt|3|要人民补正的机关也得补正自己|法权|公文程式;补正;行政院
087.2000年10月27日.txt|15|革命常从良币替代劣币结束于新劣币驱逐良币|政治|革命;良币;劣币
087.2000年10月27日.txt|16|在野政客可在夺权前就露出恶棍心术|政治|在野;夺权;同志
087.2000年10月27日.txt|18|政党头衔比民选职位更容易被人取巧|政治|党工;民选;夺权
087.2000年10月27日.txt|19|器量狭小的派系会加速政党死亡|政治|派系;器量;政党
088.2000年10月30日.txt|15|公平不能用来拒绝衰病老人优先|法权|公平;政治受难者;优先
088.2000年10月30日.txt|63|机关要人民十五日补件自己却慢吞吞|法权|补件;行政效率;官僚
088.2000年10月30日.txt|64|反复要求额外文件可成为拖刀计|方法|额外文件;拖刀计;补偿
089.2000年10月31日.txt|10|没有列入申请规定的文件不应临时追要|法权|申请规定;切结书;补件
089.2000年10月31日.txt|12|必要补件应一次要足|方法|补件;一次告知;行政效率
089.2000年10月31日.txt|23|切结是古代对夷狄罪犯的不信任手法|知识|切结;历史;不信任
089.2000年10月31日.txt|24|要人申明属实隐含对申请人的有罪推定|法权|有罪推定;切结书;人格
089.2000年10月31日.txt|25|预先承诺缴回会迫使申请人自污|法权|缴回;自污;申请人
089.2000年10月31日.txt|26|法律责任不因事前切结而增减|法权|法律责任;切结;追讨
089.2000年10月31日.txt|27|已有追责规定就不必再叠床架屋|法权|追责;重复文件;行政
089.2000年10月31日.txt|31|户籍原档比流动身分证更有证明力|方法|户籍资料;身分证;证明力
089.2000年10月31日.txt|32|事后追加的文件清单不应转嫁责任|法权|事后追加;文件清单;责任
089.2000年10月31日.txt|41|在野时的正确质询不该上台后遗忘|政治|在野;执政;白色恐怖补偿
089.2000年10月31日.txt|45|媒体内容为迁就读者往往得谈琐事|写作|媒体;读者;台湾议题
089.2000年10月31日.txt|46|没有正式收入也可以换回时间自由|人格|收入;时间;自由
089.2000年10月31日.txt|55|违约造成损失就应赔偿|法权|违约;损失;赔偿
089.2000年10月31日.txt|57|合作终止也要做到有始有终|人格|合作;有始有终;责任
089.2000年10月31日.txt|58|责任在对方仍可感谢一年的发行|人格|感谢;违约;发行
`.trim();

function getSourceFiles() {
  return fs.readdirSync(sourceDir)
    .filter((fileName) => fileName.endsWith('.txt'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function readParagraphs(fileName) {
  const filePath = path.join(sourceDir, fileName);
  const text = decoder.decode(fs.readFileSync(filePath)).replace(/\r/g, '');
  return text.split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function parseSpec() {
  return specLines.split(/\n+/).map((line, index) => {
    const parts = line.split('|');
    if (parts.length !== 5) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    const [fileName, paragraphText, title, category, keywordText] = parts;
    if (!categorySet.has(category)) {
      throw new Error(`Invalid category "${category}" on line ${index + 1}`);
    }
    const source_paragraph = Number(paragraphText);
    if (!Number.isInteger(source_paragraph) || source_paragraph < 1) {
      throw new Error(`Invalid paragraph "${paragraphText}" on line ${index + 1}`);
    }
    return {
      fileName,
      source_paragraph,
      title,
      category,
      keywords: keywordText.split(';').map((keyword) => keyword.trim()).filter(Boolean),
    };
  });
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function writeCsv(filePath, records) {
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
  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => {
      const value = Array.isArray(record[header]) ? record[header].join(';') : record[header];
      return csvEscape(value);
    }).join(',')),
  ];
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [
    `# ${bookTitle} 思想索引（提取轮）`,
    '',
    `- 书名：${bookTitle}`,
    `- 条目：${records.length}`,
    '- 说明：标题用于检索浓缩，description 保留源文本原段落。',
    '',
  ];
  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (items.length === 0) continue;
    lines.push(`## ${category}`, '');
    for (const item of items) {
      lines.push(`### ${item.id} ${item.title}`);
      lines.push('');
      lines.push(`- 来源：${item.source_file} 第 ${item.source_paragraph} 段`);
      lines.push(`- 关键词：${item.keywords.join('、')}`);
      lines.push('');
      lines.push(item.description);
      lines.push('');
    }
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeTxt(filePath, records) {
  const text = records.map((record) => [
    `${record.id}｜${record.category}｜${record.title}`,
    `来源：${record.source_file} 第 ${record.source_paragraph} 段`,
    `关键词：${record.keywords.join('、')}`,
    record.description,
  ].join('\n')).join('\n\n---\n\n');
  fs.writeFileSync(filePath, `${text}\n`, 'utf8');
}

function countByCategory(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function buildRecords() {
  const sourceFiles = new Set(getSourceFiles());
  const paragraphCache = new Map();
  return parseSpec().map((spec, index) => {
    if (!sourceFiles.has(spec.fileName)) {
      throw new Error(`Missing source file: ${spec.fileName}`);
    }
    if (!paragraphCache.has(spec.fileName)) {
      paragraphCache.set(spec.fileName, readParagraphs(spec.fileName));
    }
    const paragraphs = paragraphCache.get(spec.fileName);
    const description = paragraphs[spec.source_paragraph - 1];
    if (!description) {
      throw new Error(`Missing paragraph ${spec.source_paragraph} in ${spec.fileName}`);
    }
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
}

const allSourceFiles = getSourceFiles();
const records = buildRecords();
const payload = {
  generated_at: new Date().toISOString(),
  book: {
    sequence,
    title: bookTitle,
    slug,
    sourceDir: sourceBookDir,
    round,
    status,
    note: '本轮从《李敖通电集》2000年6月至10月电子报文本中提取思想索引。源文夹有母亲遗稿、他人专文、记者报导、法律文件、表格与密件全文；本轮只保留李敖自己的判断、证据方法、法权原则、知识分子人格观、写作观与时间选择。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: allSourceFiles.filter((fileName) => !fileName.includes('目录')).length,
    source_paragraph_count: allSourceFiles
      .filter((fileName) => !fileName.includes('目录'))
      .reduce((count, fileName) => count + readParagraphs(fileName).length, 0),
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: 0,
    skipped_duplicates: [],
    skipped_files: allSourceFiles.filter((fileName) => fileName.includes('目录')),
    category_counts: countByCategory(records),
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
  `# ${bookTitle} 提取说明`,
  '',
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 源目录：${sourceBookDir}`,
  `- 源正文文件数：${payload.book.source_file_count}`,
  `- 源段落数：${payload.book.source_paragraph_count}`,
  `- 提取条目：${records.length}`,
  '',
  '## 提取原则',
  '',
  '- 只提取李敖自己的导语、分析、信函、定稿文章和可独立检索的判断。',
  '- 母亲遗稿、他人专文、记者报导、新闻稿、密件原文和纯材料表格不作为李敖思想条目。',
  '- 法权文本优先保留法源层级、程序权利、行政责任和证据方法，减少纯案情流水。',
  '- 同题论证在提取轮适度展开，供校对轮再做删减、合并和重新编号。',
  '- 标题用于检索浓缩；description 保留源文本原段落。',
  '',
  '## 分类统计',
  '',
  ...payload.book.category_counts.map((item) => `- ${item.category}: ${item.count}`),
  '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  records: records.length,
  source_file_count: payload.book.source_file_count,
  source_paragraph_count: payload.book.source_paragraph_count,
  category_counts: payload.book.category_counts,
}, null, 2));
