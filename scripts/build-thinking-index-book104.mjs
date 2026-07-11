import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '104';
const bookTitle = '李登辉的真面目';
const slug = 'the-true-face-of-lee-teng-hui';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '006.李登辉的真面目');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
《李登辉的真面目》引言.txt|2|政治人物也应成为历史警戒|政治|政治人物;历史;警戒
《李登辉的真面目》引言.txt|3|憎恨旧政权会美化它的继承者|政治|旧政权;继承者;民主
001.共产党李登辉出卖同志的官方证据.txt|4|完整自白应包含关键交代|方法|自白;关键事实;证据
001.共产党李登辉出卖同志的官方证据.txt|5|政治任用须经过安全调查|政治|政治任用;安全调查;升迁
001.共产党李登辉出卖同志的官方证据.txt|6|脱党不当然终止继续参加|法权|脱党;继续参加;法律解释
001.共产党李登辉出卖同志的官方证据.txt|7|官方秘密文件可作直接证据|方法|官方文件;直接证据;档案
001.共产党李登辉出卖同志的官方证据.txt|8|变节者可能比原党员更恶劣|人格|变节;党员;出卖
002.“李登辉并无共党背景”吗？.txt|3|官方文件优先于间接报道|方法|官方文件;间接报道;证据
002.“李登辉并无共党背景”吗？.txt|4|久远记忆不能压倒直接记录|方法|记忆;直接记录;证言
002.“李登辉并无共党背景”吗？.txt|5|结论应向更强证据开放|方法|结论;证据;开放
003.共产党李登辉的种种.txt|3|没有证据前不宜贸然讨论|方法|证据;讨论;求真
003.共产党李登辉的种种.txt|4|晚年回忆冷门人名并不可靠|方法|晚年回忆;人名;可靠性
003.共产党李登辉的种种.txt|5|制度常理可以检验个别说法|方法|制度;常理;检验
003.共产党李登辉的种种.txt|6|社会关系不能限于同乡线索|方法|社会关系;同乡;推论
003.共产党李登辉的种种.txt|7|组织外证人未必知道组织内情|方法|证人;组织;内情
003.共产党李登辉的种种.txt|8|类比人物必须辨明转换背景|方法|类比;政治转换;背景
003.共产党李登辉的种种.txt|9|直接记录胜过成群间接证言|方法|直接记录;间接证言;证据
004.李登辉的屁股功夫.txt|3|政治地位常来自顺从而非才智|人格|顺从;才智;政治地位
004.李登辉的屁股功夫.txt|5|权位超过能力必将形成危害|政治|权位;能力;危害
004.李登辉的屁股功夫.txt|7|君臣姿态暴露统治哲学|政治|君臣;姿态;统治
004.李登辉的屁股功夫.txt|8|奴性能够成为官僚升迁资本|人格|奴性;官僚;升迁
005.还有另一个李登辉么？.txt|4|证据不足时只能提出解释轮廓|方法|证据不足;解释;理解
006.李登辉笨态百出.txt|5|政治人物也会成为观念的傀儡|政治|观念;傀儡;三民主义
006.李登辉笨态百出.txt|7|不肯媚俗就不能期待群众奖赏|人格|媚俗;群众;奖赏
007.李登辉的亡国动作.txt|5|政权败亡会显出制度丑态|政治|政权;败亡;制度
007.李登辉的亡国动作.txt|6|秘密文件能揭露公开名义|知识|秘密文件;名义;中华民国
007.李登辉的亡国动作.txt|7|残存小朝廷靠名义自欺|政治|小朝廷;名义;自欺
007.李登辉的亡国动作.txt|9|领袖求签暴露迷信政治|文化|领袖;求签;迷信
007.李登辉的亡国动作.txt|10|统治者迷信会形成社会示范|文化|统治者;迷信;示范
008.李登辉无人君之风.txt|6|领袖问题在实质而不在外貌|人格|领袖;实质;外貌
008.李登辉无人君之风.txt|7|人君之风在容人和虚己|人格|容人;虚己;领袖
008.李登辉无人君之风.txt|8|领袖应克制自己并运用众智|政治|领袖;众智;克制
008.李登辉无人君之风.txt|9|事必躬亲会把人才变成奴才|政治|事必躬亲;人才;奴才
008.李登辉无人君之风.txt|10|民主政治必须实行分层负责|政治|民主;分层负责;领导
009.李登辉被罚跪考.txt|2|跪姿差异不等于民族差异|文化|跪姿;民族;礼俗
009.李登辉被罚跪考.txt|3|古代中国坐姿本来就是跪坐|知识|坐姿;跪坐;古代中国
009.李登辉被罚跪考.txt|4|文化传播不能硬套民族界线|文化|文化传播;民族;礼俗
009.李登辉被罚跪考.txt|6|生理能力不等于文化姿势|文化|生理;文化;姿势
009.李登辉被罚跪考.txt|7|姿态规范会随礼俗而变化|文化|姿态;礼俗;规范
010.李登辉式“平反”.txt|5|平反应以正式法权程序完成|法权|平反;程序;受难者
010.李登辉式“平反”.txt|6|不能认错的政权无法顺守|政治|政权;认错;顺守
013.李登辉岂可迫害谷正文！.txt|8|秘密书信能够终结历史争议|方法|秘密书信;历史争议;证据
013.李登辉岂可迫害谷正文！.txt|11|反独裁的政治支持只能是策略|政治|独裁;政治支持;策略
013.李登辉岂可迫害谷正文！.txt|12|迫害恩人暴露掌权者无情|人格|恩人;迫害;掌权者
014.李登辉是“耕读世家”吗？.txt|2|宗族组织带有封建等级性|文化|宗族;封建;等级
014.李登辉是“耕读世家”吗？.txt|4|家世说法须以事实核对|方法|家世;事实;核对
014.李登辉是“耕读世家”吗？.txt|5|吹捧活人会歪曲他的祖先|人格|吹捧;家世;歪曲
015.李登辉、林洋港配谈司法革新吗？.txt|3|司法首长也会压制司法独立|法权|司法首长;司法独立;压制
015.李登辉、林洋港配谈司法革新吗？.txt|4|司法首长不得干预个案|法权|司法首长;个案;干预
015.李登辉、林洋港配谈司法革新吗？.txt|6|不懂权力边界才会夸耀干预|法权|权力边界;干预;官员
015.李登辉、林洋港配谈司法革新吗？.txt|7|总统讨论个案已伤司法独立|法权|总统;个案;司法独立
016.李登辉杀鸡儆猴处分黄玉明.txt|2|政党会惩罚追问领袖历史的老党员|政治|政党;处分;老党员
016.李登辉杀鸡儆猴处分黄玉明.txt|21|党纪经常服从选择性标准|政治|党纪;选择性标准;双重标准
017.文化总会总不会文化.txt|4|总统领导民间团体是国家机关伪装|政治|总统;民间团体;国家机关
017.文化总会总不会文化.txt|6|文化事务不应由官员主导|文化|文化;官员;主导
017.文化总会总不会文化.txt|7|文化应高于政治运动|文化|文化;政治运动;独立
017.文化总会总不会文化.txt|8|党国文化必然走向复古与党化|文化|党国;复古;党化
017.文化总会总不会文化.txt|9|没有文化的人最爱管理文化|文化|文化管理;官僚;无知
017.文化总会总不会文化.txt|10|边缘文化常与避难文化重叠|文化|边缘文化;避难文化;台湾
017.文化总会总不会文化.txt|11|文化复兴不能缩成器物民俗|文化|文化复兴;器物;民俗
017.文化总会总不会文化.txt|12|文化官僚化会排斥真正作家|文化|文化官僚;作家;排斥
017.文化总会总不会文化.txt|13|政治派系都可能伤害真正文化|文化|政治派系;文化;伤害
018.开妓院的也进了“中华文化复兴运动”芳名册.txt|2|所谓民间文化组织可能延续国家工程|政治|民间组织;国家工程;文化复兴
018.开妓院的也进了“中华文化复兴运动”芳名册.txt|3|文化资格会被政治名册掏空|文化|文化资格;政治名册;标准
019.李登辉只祭蒋陵不祭黄陵.txt|3|党报会用政治祭祀压倒共同传统|文化|党报;祭祀;传统
019.李登辉只祭蒋陵不祭黄陵.txt|4|国家祭祀也会服从政治逢迎|政治|国家祭祀;逢迎;蒋陵
020.李登辉啊，不是过渡，而是永远.txt|4|社会规范破坏后很难恢复|文化|社会规范;破坏;恢复
020.李登辉啊，不是过渡，而是永远.txt|5|不成文规范靠长期习惯维持|文化|不成文规范;习惯;社会
020.李登辉啊，不是过渡，而是永远.txt|6|法权秩序还包括惯例和法理|法权|法权秩序;惯例;法理
020.李登辉啊，不是过渡，而是永远.txt|8|法律未明禁不等于行为正当|法权|法律;正当;自制
020.李登辉啊，不是过渡，而是永远.txt|13|只问效果的政治会摧毁道德|人格|效果;政治;道德
020.李登辉啊，不是过渡，而是永远.txt|14|民主是一种生活教育和风格|政治|民主;生活;教育
020.李登辉啊，不是过渡，而是永远.txt|15|政治坏榜样会传给下一代|文化|政治;榜样;下一代
021.李登辉忘了自己是老几.txt|7|名义国家可能只剩地方政权|政治|名义国家;地方政权;现实
021.李登辉忘了自己是老几.txt|8|政党密件会承认公开否认的现实|方法|政党密件;公开说法;现实
021.李登辉忘了自己是老几.txt|12|政治地位必须面对现实尺度|政治|政治地位;现实;台湾
021.李登辉忘了自己是老几.txt|13|不对称地位不能靠自大消除|人格|不对称;自大;政治地位
022.李登辉在走袁大头、蒋光头的老路！.txt|6|竞选承诺会被稳定借口推翻|政治|竞选承诺;稳定;连任
022.李登辉在走袁大头、蒋光头的老路！.txt|7|民众拥戴是威权政治的旧戏法|政治|民众拥戴;威权;戏法
022.李登辉在走袁大头、蒋光头的老路！.txt|8|违背任期承诺者仍可能再次当选|政治|任期;承诺;当选
022.李登辉在走袁大头、蒋光头的老路！.txt|9|政治领袖不能玩弄国民人格|人格|领袖;国民人格;玩弄
022.李登辉在走袁大头、蒋光头的老路！.txt|10|以欺骗求连任应被拒绝|政治|欺骗;连任;拒绝
023.李登辉智能障碍得了“蒙古症”.txt|10|政治人物的失败自认值得采信|方法|失败;自认;政治人物
023.李登辉智能障碍得了“蒙古症”.txt|16|政党会把政策失败归咎于书刊|政治|政策失败;书刊;归咎
023.李登辉智能障碍得了“蒙古症”.txt|17|造成分裂者也会扮演统一维护者|政治|分裂;统一;双重标准
023.李登辉智能障碍得了“蒙古症”.txt|18|务实政治也必须把话说清楚|写作|务实;表达;政治
023.李登辉智能障碍得了“蒙古症”.txt|20|经国大计可能只是延误问题|政治|经国大计;延误;问题
024.魏赵全围，管他是谁.txt|2|朋友关系也可能妨碍真相|人格|朋友;真相;妨碍
024.魏赵全围，管他是谁.txt|4|揭露事实不因敌我而失效|方法|事实;敌我;揭露
024.魏赵全围，管他是谁.txt|6|仇敌求真时也应给予支持|人格|仇敌;求真;支持
024.魏赵全围，管他是谁.txt|8|只有象征支持而无行动仍是表演|人格|支持;行动;表演
024.魏赵全围，管他是谁.txt|9|反对党也会被金钱收编|政治|反对党;金钱;收编
024.魏赵全围，管他是谁.txt|10|政治动机不能盖过重大原则|方法|政治动机;原则;判断
024.魏赵全围，管他是谁.txt|13|国家损失不能等同私人损失|法权|国家损失;私人损失;利益
024.魏赵全围，管他是谁.txt|15|地方身份不能成为侵占国家财产的理由|法权|地方身份;国家财产;侵占
024.魏赵全围，管他是谁.txt|18|连续制度变更若只利一人即显特权|政治|制度变更;利益;特权
024.魏赵全围，管他是谁.txt|19|反特权者可能正是特权核心|人格|反特权;特权;双重标准
024.魏赵全围，管他是谁.txt|20|原则可以要求支持政治对手|人格|原则;政治对手;支持
024.魏赵全围，管他是谁.txt|21|政治判断应超越永久敌友|人格|敌友;正义;政治判断
025.李登辉以下图利张荣发内幕.txt|4|规则效果可以揭露量身定做|方法|规则;效果;量身定做
025.李登辉以下图利张荣发内幕.txt|7|以贸易量替代航空经验会牺牲安全|法权|贸易量;航空经验;安全
025.李登辉以下图利张荣发内幕.txt|16|追查受益者才能看懂制度变更|方法|受益者;制度变更;利益
026.郭南宏低声下气，张荣发大摇大摆.txt|6|公文时序能够证明先批后修法|方法|公文;时序;修法
026.郭南宏低声下气，张荣发大摇大摆.txt|7|法律可能为单一申请人量身修改|法权|法律;申请人;量身修改
026.郭南宏低声下气，张荣发大摇大摆.txt|8|行政机关也会违反自己制定的法律|法权|行政机关;法律;违法
027.李登辉支持张荣发“租霸王地”内幕.txt|24|上级机关暗示会扭曲行政权限|法权|上级机关;暗示;行政权限
027.李登辉支持张荣发“租霸王地”内幕.txt|31|突然改案应追查外部压力|方法|改案;外部压力;机场
027.李登辉支持张荣发“租霸王地”内幕.txt|37|不肯配合权贵可能丢掉官位|政治|权贵;官位;配合
027.李登辉支持张荣发“租霸王地”内幕.txt|40|长期租地能够制造事实垄断|法权|租地;垄断;机场
028.“开放天空”并不“开放优待”.txt|25|监管者集体受惠仍属集体腐化|人格|监管者;受惠;腐化
028.“开放天空”并不“开放优待”.txt|26|被监管者难以自由拒绝监管者馈赠|法权|监管者;馈赠;拒绝
028.“开放天空”并不“开放优待”.txt|27|公职人员不得参与自身利益交易|人格|公职;利益;交易
028.“开放天空”并不“开放优待”.txt|35|法规例外会显出选择性优待|法权|法规例外;选择性;优待
028.“开放天空”并不“开放优待”.txt|36|政治后台能使企业逃过一般规则|政治|政治后台;企业;规则
029.张荣发——一发不可收拾啦！.txt|3|异常资本来源应接受事实追查|方法|资本;来源;追查
029.张荣发——一发不可收拾啦！.txt|5|成熟特权会先改变规则|法权|特权;规则;改变
029.张荣发——一发不可收拾啦！.txt|7|量身修法后申请也能披上合法外衣|法权|修法;申请;合法
029.张荣发——一发不可收拾啦！.txt|12|金钱本位会把公共安全置后|法权|金钱本位;公共安全;航空
029.张荣发——一发不可收拾啦！.txt|13|特权受益者会把自己包装成受害者|人格|特权;受益者;受害者
029.张荣发——一发不可收拾啦！.txt|16|行政裁量可能只照顾特定企业|法权|行政裁量;企业;偏袒
029.张荣发——一发不可收拾啦！.txt|17|一次性例外会在受益者通过后关闭|法权|例外;受益者;关闭
029.张荣发——一发不可收拾啦！.txt|18|法律开关也可能服务私人利益|法权|法律;私人利益;开关
029.张荣发——一发不可收拾啦！.txt|19|政治支持会躲在合法程序背后|政治|政治支持;合法程序;特权
029.张荣发——一发不可收拾啦！.txt|20|玩弄法律不同于遵守法律|法权|法律;玩弄;遵守
030.拆穿对长荣出走问题的欺人之谈.txt|9|得到威权政党赞扬应先自我怀疑|人格|威权政党;赞扬;自省
030.拆穿对长荣出走问题的欺人之谈.txt|10|被政党赞美也可能是人格警讯|人格|政党;赞美;人格
030.拆穿对长荣出走问题的欺人之谈.txt|11|观察朋友可以辅助判断一个人|人格|朋友;识人;判断
030.拆穿对长荣出走问题的欺人之谈.txt|12|持续被拉拢反映真实合作关系|政治|拉拢;合作;政商
030.拆穿对长荣出走问题的欺人之谈.txt|14|政治转向若只攻击支持者便不可信|人格|政治转向;支持者;可信
030.拆穿对长荣出走问题的欺人之谈.txt|15|权贵可以从黑暗司法中获利|法权|权贵;司法;获利
030.拆穿对长荣出走问题的欺人之谈.txt|25|经济出走说可能掩盖特权关系|政治|经济出走;特权;关系
030.拆穿对长荣出走问题的欺人之谈.txt|26|取得利益后的出走姿态只是表演|人格|利益;出走;表演
030.拆穿对长荣出走问题的欺人之谈.txt|27|投资数据可以检验出走说法|方法|投资数据;出走;检验
030.拆穿对长荣出走问题的欺人之谈.txt|29|政治赢家的出走姿态不合利益逻辑|政治|政治赢家;出走;利益
031.日本鬼子是长荣集团的黑后台！.txt|17|交叉新闻资料可以揭出资本关系|方法|新闻资料;资本;交叉验证
031.日本鬼子是长荣集团的黑后台！.txt|19|外资可借本地资本家形成政治影响|政治|外资;资本家;政治影响
032.为长荣集团的日本资本追资料.txt|14|零散资料可以拼出资本网络|方法|资料;资本网络;拼接
033.李登辉何德何能，岂可自比萨达特.txt|12|无私领袖不应把权位置于人格之上|人格|领袖;权位;无私
033.李登辉何德何能，岂可自比萨达特.txt|17|对自己忠实是领袖人格的底线|人格|忠实;领袖;人格
034.李登辉想拖人下水.txt|23|新诗应以非美直接面对现实|写作|新诗;现实;闻一多
034.李登辉想拖人下水.txt|29|政治希望会因政党变质而破灭|政治|政治希望;政党;变质
034.李登辉想拖人下水.txt|60|进步不能自动洗净专制死水|政治|进步;专制;死水
034.李登辉想拖人下水.txt|62|浑浊源头不能产生政治活水|政治|源头;活水;政治
035.拆穿李登辉的笨谎话！.txt|15|荒谬理由会把公众当作傻瓜|人格|理由;公众;欺骗
`.trim();

function sourceFiles() {
  return fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/\r/g, '')
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
if (bodySourceFiles.length !== 36) throw new Error(`Expected 36 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 824) throw new Error(`Expected 824 paragraphs, found ${sourceParagraphCount}`);

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

if (records.length !== 144) throw new Error(`Expected 144 records, found ${records.length}`);
for (const [key, label] of [['title', 'title'], ['description', 'description']]) {
  const seen = new Map();
  for (const record of records) {
    if (seen.has(record[key])) {
      throw new Error(`Duplicate ${label}: ${seen.get(record[key]).source_file}:${seen.get(record[key]).source_paragraph} and ${record.source_file}:${record.source_paragraph}`);
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
    note: '本轮从《李登辉的真面目》的引言与三十五篇正文中提取李敖自己的思想判断。书中包含大量官方文件、新闻报道、书信、人物回忆、诗文及萨达特自传引文；本轮只在李敖明确作出证据判断、人物论定、制度批判或文化评价的段落建项，不把被引人物的独立意见计为李敖思想。纯材料汇编、未经证据支撑的谋杀猜测、人物辱骂和重复事实不单独建项。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    eligible_count: records.length,
    record_count: records.length,
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
  `- 提取条目：${records.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖自己的证据判断、人物论定、制度批判、法权主张、文化评价与写作判断。',
  '- 官方文件、新闻报道、书信、人物回忆、诗文和萨达特自传引文，只在李敖作出明确评价或归纳的完整段落中随文保留。',
  '- 纯材料汇编、人物名单、未经证据支撑的谋杀猜测、人物辱骂和重复事实不单独建立思想索引。',
  '- 对长荣集团与政治特权的连续调查适度展开证据链、修法、行政裁量、监管利益和垄断等层面，留待校对轮进一步收敛。',
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
  category_counts: payload.book.category_counts,
}, null, 2));
