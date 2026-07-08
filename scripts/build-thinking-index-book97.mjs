import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 97;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '李敖来电集';
const slug = 'leeao-laidian-collection';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '011.李敖电子报',
  '004.李敖来电集',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
001.2000年4月11日.txt|8|被忽略也能逼出文学界反省|文化|台湾文学界;诺贝尔奖;反省
001.2000年4月11日.txt|12|诺贝尔奖暴露中国文学情结|文化|诺贝尔文学奖;中国人;国籍
001.2000年4月11日.txt|15|文学奖看整体理想主义|写作|诺贝尔文学奖;理想主义;整体著作
001.2000年4月11日.txt|16|理想主义经历也是文学资格|人格|北京法源寺;理想主义;坐牢
002.2000年4月12日.txt|7|翻译后不懂责任在读者|文化|北京法源寺;英文译本;西方读者
002.2000年4月12日.txt|12|真正佛教是由出世回到入世|文化|佛教;入世;回向
002.2000年4月12日.txt|16|激烈人格也能平静写作|写作|个性;写作层次;平静
002.2000年4月12日.txt|18|战士比烈士更能再回来|人格|梁启超;谭嗣同;战士
002.2000年4月12日.txt|20|走太快会被误认落伍|人格|康有为;领先;落伍
002.2000年4月12日.txt|24|小说前途在思想深广|写作|小说;思想;文字力量
002.2000年4月12日.txt|26|情性也可成为小说命题|情爱|男女关系;情;性
003.2000年4月13日.txt|7|火爆语言后还要有肉|写作|骂;资料;思想
003.2000年4月13日.txt|13|争千秋也要争一时注意|方法|哗众取宠;注意力;千秋
003.2000年4月13日.txt|24|经济独立才能挺直腰杆|人格|赚钱;独立;封锁
003.2000年4月13日.txt|29|精神独乐可以消除孤独|人格|孤独;精神快乐;单干
003.2000年4月13日.txt|30|写作需要长期自我隔离|写作|写作;闭门;专注
004.2000年4月14日.txt|6|理想女性进入残忍政治会被牺牲|政治|谢雪红;女人;政治
004.2000年4月14日.txt|8|革命牺牲要追问值不值得|人格|革命;牺牲;代价
004.2000年4月14日.txt|10|革命感情会被漫长苦难磨掉|情爱|革命感情;婚姻;曼德拉
004.2000年4月14日.txt|16|谢雪红的路显示此路不通|政治|谢雪红;政治道路;女性
004.2000年4月14日.txt|29|中国政治没有知识分子角色|政治|中国政治;知识分子;流氓
005.2000年4月17日.txt|13|优秀女人不该被鼓动去政治|政治|女人;政治;旁观者
005.2000年4月17日.txt|32|共产主义理想主义常以失落收场|政治|共产主义;理想主义;失落
005.2000年4月17日.txt|34|脱离信仰也要光荣承认|人格|李登辉;共产主义;承认
006.2000年4月18日.txt|4|政治视野狭窄是陋|政治|政治视野;台湾;国际气候
006.2000年4月18日.txt|8|共产主义与台独都要看可行性|政治|谢雪红;共产主义;台独
006.2000年4月18日.txt|10|小动作显示政治风度|文化|撒切尔夫人;风度;小动作
006.2000年4月18日.txt|12|政治旁观者别把牺牲当道路|政治|谢雪红;旁观者;政治道路
006.2000年4月18日.txt|37|选出不成熟者全民付学费|政治|陈水扁;成熟;学费
007.2000年4月19日.txt|37|小说可为历史人物重建传记|写作|谢雪红;水经注;传记
007.2000年4月19日.txt|44|历史小说可假故事真场景|写作|历史小说;场景;大仲马
007.2000年4月19日.txt|46|借古人说现代自己的话|写作|北京法源寺;古人;现代精神
008.2000年4月20日.txt|21|历史细节要全部注意|写作|北京法源寺;细节;历史
008.2000年4月20日.txt|32|文学要从派别争斗中救出|文化|台湾文学;战斗文学;乡土文学
008.2000年4月20日.txt|37|安全名义可能掩盖欺骗|法权|中研院;安全考量;公文
009.2000年4月21日.txt|5|专业鉴定比安全口号可靠|法权|近美大楼;鉴定;补强
009.2000年4月21日.txt|16|决策暗中变化要追文件|方法|补强;拆除;文件
010.2000年4月24日.txt|17|政策转弯会从内部签呈露出|方法|签呈;李远哲;补强
010.2000年4月24日.txt|18|内行质疑能挡住强拆|法权|所长;规定;补强
010.2000年4月24日.txt|19|专家决策反复必有蹊跷|方法|专家;决策;纳税人
011.2000年4月25日.txt|10|错误决策比贪污更可怕|法权|错误决策;贪污;纳税人
011.2000年4月25日.txt|11|一小时专家不能压倒完整鉴定|方法|专家;鉴定报告;证据
011.2000年4月25日.txt|12|专业问题不能靠院长一眼决定|方法|李远哲;专业技师;判断
011.2000年4月25日.txt|14|公文张冠李戴就是蓄意欺骗|法权|公文;鉴定报告;诚信
011.2000年4月25日.txt|16|详细资料能拆穿官方声明|方法|资料;声明;证据
011.2000年4月25日.txt|17|公共人物施政必须经得起检验|政治|李远哲;施政;检验
015.2000年5月1日.txt|5|打倒恶党只是第一步|政治|国民党;恶党;执政党
015.2000年5月1日.txt|6|新执政党不能成为小国民党|政治|民进党;小国民党;污染
015.2000年5月1日.txt|8|旧党失败不等于新党胜利|政治|国民党;民进党;胜利
015.2000年5月1日.txt|9|个人胜利不等于政党执政|政治|陈水扁;民进党;小集团
015.2000年5月1日.txt|12|国家也会短命而亡|政治|国家;寿命;中华民国
015.2000年5月1日.txt|15|困在小岛政治就是沉沦|人格|小岛;上升;沉沦
016.2000年5月2日.txt|3|文学圈同族联合不等于文学|文化|联合文学;文学圈;同族
016.2000年5月2日.txt|5|批评要小心求证|方法|批评;假设;求证
016.2000年5月2日.txt|8|真正批评来自能力不是虚誉|方法|胡适;批评;虚誉
016.2000年5月2日.txt|14|欢迎真理上的匡正|人格|真理;匡正;宽容
016.2000年5月2日.txt|15|考证粗心会败坏议论|方法|杨照;考证方法;粗心
018.2000年5月4日.txt|5|副院长是不是官要能解释|法权|中研院;副院长;政务官
018.2000年5月4日.txt|6|清高学者违法当黑官|法权|杨国枢;学官两栖;黑官
018.2000年5月4日.txt|7|制度之外的第四条路是夜路|法权|退休;延长服务;行政职
018.2000年5月4日.txt|13|知识分子修法自利更显难看|法权|修法;知识分子;行政职
018.2000年5月4日.txt|16|依法行政可挡住知识分子自利|法权|行政院;依法行政;承诺
019.2000年5月5日.txt|4|隐瞒兼任行政职已涉伪造|法权|杨国枢;延长服务;伪造文书
019.2000年5月5日.txt|7|违法后动用行政力量掩饰|法权|中研院;声明;掩饰
019.2000年5月5日.txt|8|声称同意必须拿出证据|方法|总统府;证据;同意
019.2000年5月5日.txt|9|公文提醒不能被解释成放水|法权|公文;提醒;总统府
019.2000年5月5日.txt|10|不同制度不能随便比照违法|法权|大学;中研院;法令
020.2000年5月8日.txt|4|退休再任不能继续占宿舍|法权|宿舍;退休;再任
020.2000年5月8日.txt|5|仁义讲词要受行为检验|人格|知识分子;良知;行为
021.2000年5月9日.txt|20|第一流人不该虚度在小岛政治|人格|陈文茜;虚拟人生;小岛政治
021.2000年5月9日.txt|22|上瘾会夺走人的脑袋|方法|上瘾;思维;高科技
021.2000年5月9日.txt|23|群众狂热会把人变成符号|政治|纳粹;文革;拥护符号
022.2000年5月10日.txt|7|高科技关键在善用|方法|高科技;虚拟;思维
022.2000年5月10日.txt|13|虚拟人生可使人生更丰富|文化|虚拟人生;高科技;人生
022.2000年5月10日.txt|17|虚拟政治没有实力只是逃避|政治|虚拟政治;实力;逃避
022.2000年5月10日.txt|20|虚拟可以无中生有|文化|虚拟;无中生有;高科技
022.2000年5月10日.txt|21|第一流人应该最世界|人格|陈文茜;第一流;世界
023.2000年5月11日.txt|3|追杀也是一种记录方式|写作|追杀;记录;蒋介石评传
023.2000年5月11日.txt|7|细密考证才是论从史出|知识|考证;论从史出;历史真相
023.2000年5月11日.txt|8|公允不是褒贬各半|知识|公允;史家;褒贬
023.2000年5月11日.txt|9|历史必然偶然不是轻易题目|知识|历史哲学;必然;偶然
023.2000年5月11日.txt|10|政治化指控要说明目的|方法|政治化;蒋介石评传;指控
023.2000年5月11日.txt|11|复仇可以凭证据成为正义|人格|复仇;证据;正义
023.2000年5月11日.txt|15|恨敌人也要知己知彼|方法|蒋介石;研究;知己知彼
024.2000年5月12日.txt|5|不同意见由史料证据裁判|知识|史料;证据;修史
024.2000年5月12日.txt|7|评传要完备考证与明晰叙事|写作|评传;史料;考证
024.2000年5月12日.txt|11|统治者拦路造成更大损失|政治|蒋介石;拦路;损失
024.2000年5月12日.txt|13|专制遗害需要后人清场|政治|专制;后遗症;清场
024.2000年5月12日.txt|14|毒辣敌人会耗掉整个青春|人格|敌人;青春;斗法
025.2000年5月15日.txt|4|骂人也要遵守求真证据|知识|蒋介石;史料;证据法则
025.2000年5月15日.txt|6|报复敌人的方法是专题研究|方法|自力报复;蒋介石;专题研究
025.2000年5月15日.txt|8|结论要能经新史料验证|知识|结论;新史料;验证
025.2000年5月15日.txt|11|深恶痛绝也可凭证据写史|知识|历史家;证据;深恶痛绝
025.2000年5月15日.txt|12|复仇也能写成学术著作|写作|复仇;学术著作;蒋介石
025.2000年5月15日.txt|15|结束敌人也结束自己一页|人格|蒋介石;快意恩仇;结束
026.2000年5月16日.txt|3|赠别也要划出漂亮句点|人格|新党;赠别;句点
026.2000年5月16日.txt|12|替天行道是侠义精神|人格|水浒传;侠义;替天行道
026.2000年5月16日.txt|16|善缘也可从政治冲突中收束|人格|新党;善缘;政治冲突
032.2000年5月24日.txt|8|总统豁免卸任后才可追究|法权|李登辉;总统豁免;告发
032.2000年5月24日.txt|29|权贵客户会变成财团招牌|政治|鸿禧山庄;李登辉;财团
032.2000年5月24日.txt|30|总统牌能摆平违法行政|法权|总统牌;违法;行政
032.2000年5月24日.txt|38|土地变更要追国有水利用地|法权|水利用地;丙建;让售
032.2000年5月24日.txt|40|戳破权贵说法要查交易时点|方法|鸿禧山庄;交易时点;证据
033.2000年5月25日.txt|13|权贵带头购买会制造财团暴利|政治|李登辉;鸿禧山庄;带头作用
033.2000年5月25日.txt|23|十五天变更土地显示特权|法权|土地变更;特权;水利用地
033.2000年5月25日.txt|28|国有水利用地快速变建地是特权|法权|国有水利用地;丙种建地;特权
034.2000年5月26日.txt|18|违建始作俑者会带动跟风|法权|李登辉;违建;道路用地
034.2000年5月26日.txt|22|公共水利用地低价让售要查利益输送|法权|水利用地;低价让售;利益输送
034.2000年5月26日.txt|23|把河砍成三段不是民之所欲|政治|虎豹溪;国有河川;民之所欲
034.2000年5月26日.txt|24|行政配合财团会瞒过人民|法权|财团;行政配合;使用执照
034.2000年5月26日.txt|25|对照水利地证据可拆穿谎言|方法|水利地;证据;李登辉
035.2000年5月29日.txt|4|房屋公证价与市价差异要追|方法|鸿禧山庄;公证书;市价
035.2000年5月29日.txt|11|财产申报可检验买房说法|法权|阳光法案;财产申报;买房
035.2000年5月29日.txt|15|收入核算能逼出资金缺口|方法|收入核算;资金缺口;房价
035.2000年5月29日.txt|17|折扣优惠可能构成官商勾结|法权|折扣;官商勾结;图利
035.2000年5月29日.txt|22|巨额不足款要问钱从何来|法权|鸿禧山庄;资金来源;贷款
036.2000年5月30日.txt|6|光明正大就应说出价钱|方法|李登辉;房价;光明正大
036.2000年5月30日.txt|10|用对门房价可交叉检验|方法|连战;房价;交叉检验
036.2000年5月30日.txt|15|低税负会暴露社会公平问题|法权|赠与税;公平正义;房产
037.2000年5月31日.txt|5|国税局欺善怕恶造成税负不平|法权|国税局;逃漏税;小市民
037.2000年5月31日.txt|12|第一客户也是官商勾结样本|政治|李登辉;第一客户;官商勾结
037.2000年5月31日.txt|17|不当低价利益可能是贿赂|法权|不正利益;贿赂;检察官
038.2000年6月1日.txt|4|公共积款不能被强行改用途|法权|共有存款;用途;水电费
038.2000年6月1日.txt|11|财务印信分掌才能防弊|法权|印信;财务;防弊
038.2000年6月1日.txt|12|主委不碰钱才是好传统|法权|主任委员;不碰钱;传统
038.2000年6月1日.txt|14|移交要按权责程序办理|法权|移交;印鉴;权责
038.2000年6月1日.txt|15|私产收益动用要经权利人同意|法权|私产;车位;收益
038.2000年6月1日.txt|16|会计制衡不能一把抓|法权|会计;制衡;一把抓
038.2000年6月1日.txt|22|处分公共财产须经住户大会|法权|公共财产;住户大会;公约
039.2000年6月2日.txt|4|公共分摊要看谁长期补贴|方法|管理费;补贴;分摊
039.2000年6月2日.txt|5|沟通不能以诬告代替|人格|沟通;诬告;邻居
040.2000年6月5日.txt|4|共有收益不能越过产权基础|法权|地下室;产权;收益
040.2000年6月5日.txt|8|四合一管钱不可能秉公|法权|管钱;制衡;主任委员
040.2000年6月5日.txt|14|管理调整也要合乎人情常识|法权|管理费;社会习惯;老兵
041.2000年6月6日.txt|5|多数同意也要先有完整报价|方法|外墙整修;报价;多数
041.2000年6月6日.txt|14|家与书房不等于营业场所|法权|书房;营业场所;管理费
042.2000年6月7日.txt|3|扶弱抑强要先研究证据|方法|JOJO;证据;道义支持
049.2000年6月16日.txt|6|法院连出版社弄错就是不用心|法权|最高法院;出版社;判决
049.2000年6月16日.txt|14|著作卖断后销售责任转移|法权|著作权;卖断;销售
049.2000年6月16日.txt|15|发行人只对自己出版品负责|法权|出版法;发行人;责任
049.2000年6月16日.txt|20|法人行为不能混成发行人责任|法权|法人;发行人;公司
049.2000年6月16日.txt|25|连续犯必须同一行为人|法权|连续犯;行为人;犯意
049.2000年6月16日.txt|28|枉法裁判会制造连续犯错觉|法权|枉法裁判;连续犯;行为人
049.2000年6月16日.txt|29|公布枉法裁判者以为后戒|法权|枉法裁判;法官;公开
050.2000年6月19日.txt|10|研究文字不能推定所有权|法权|秦孝仪;周越;所有权
050.2000年6月19日.txt|11|媒体错误无需逐一更正|方法|媒体;更正;林肯
050.2000年6月19日.txt|12|法定职责不能因对象而拒绝|法权|故宫;搜购;法定职责
050.2000年6月19日.txt|16|心里想的不能冒充事实|法权|幻觉;事实;诽谤
050.2000年6月19日.txt|17|误认不能成为诽谤根据|法权|误认;诽谤;过失
050.2000年6月19日.txt|21|时效起算要靠收件证据|法权|时效;证据;邮寄
050.2000年6月19日.txt|25|精神痛苦有时不证自明|法权|慰藉金;精神痛苦;不证自明
051.2000年6月20日.txt|15|总统任次不能腰斩法统|政治|中华民国;总统任次;法统
051.2000年6月20日.txt|16|承认民国年数就不能切断历史|政治|中华民国;历史;法统
051.2000年6月20日.txt|17|中华民国早已亡国|政治|中华民国;亡国;总统
052.2000年6月21日.txt|6|基金会可两度鹊巢鸠占|文化|殷海光基金会;鹊巢鸠占;自由主义
052.2000年6月21日.txt|7|借殷尸还张魂混不了自由主义|文化|殷海光;张忠栋;自由主义
052.2000年6月21日.txt|12|外省人台独会名称自相矛盾|政治|外独会;台独;名称
053.2000年6月22日.txt|5|台湾认同需分户籍省籍国籍|政治|台湾认同;省籍;国籍
053.2000年6月22日.txt|6|出生尊严不可践踏|人格|出生;尊严;人格
053.2000年6月22日.txt|8|自由主义救中国不是反中国|政治|殷海光;自由主义;中国
053.2000年6月22日.txt|11|学者尊严不能拿去巴结权势|人格|殷海光;尊严;权势
053.2000年6月22日.txt|12|尊敬老师就不要糟蹋其名|人格|殷海光;学生;尊敬
054.2000年6月23日.txt|3|政见上台十一天就作废无信|政治|李远哲;陈水扁;政见
054.2000年6月23日.txt|19|就职前承诺不能上台后遗忘|政治|党政军退出媒体;游锡堃;承诺
054.2000年6月23日.txt|25|执政党会接收旧政权媒体习气|政治|民进党;媒体;国民党化
055.2000年6月26日.txt|3|回击美国要熟知美国历史|知识|美国历史;六四;宣传
056.2000年6月27日.txt|9|美国也曾以军队对人民动手|政治|美国;奖金进军;军队
056.2000年6月27日.txt|12|施暴于人民没有本质差别|政治|天安门;美国;人民
056.2000年6月27日.txt|13|美国以自己枪声苛责中国很厚脸皮|政治|美国;枪声;双标
056.2000年6月27日.txt|14|宣传要靠读书回嘴|知识|宣传;读书;美国
056.2000年6月27日.txt|15|指出美国无理不等于替六四辩护|方法|天安门;美国;逻辑
057.2000年6月28日.txt|6|西化痕迹可藏在日常运动里|文化|溜冰;西化;历史痕迹
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
    note: '本轮从《李敖来电集》2000年4月至6月电子报文本中提取思想索引。源文包含诺贝尔访谈、女人与政治对话、北京法源寺写作观、中研院与李登辉揭弊、蒋介石评传序跋、法权诉讼、自由主义名义争夺、党政军退出媒体政见与美国历史双标。本轮只保留李敖自己的回答、导语、定稿文章和可独立检索的判断；转载他人长文原则上不作为李敖思想条目。标题用于检索浓缩，description 保留源文本原段落。',
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
  '- 只提取李敖自己的回答、导语、定稿文章和可独立检索的判断。',
  '- 转载他人长文、记者铺垫、人物书信和纯材料表格原则上不作为李敖思想条目。',
  '- 访谈类文本过滤采访者问题和他人长段，只保留李敖明确判断。',
  '- 揭弊类文本优先保留证据方法、法权原则、权力结构判断，减少过细地号与金额流水。',
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
