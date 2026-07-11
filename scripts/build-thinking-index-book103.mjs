import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 103;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '孙中山研究';
const slug = 'sun-yat-sen-studies';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '012.人物研究类',
  '005.孙中山研究',
);
const previousBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '012.人物研究类',
  '004.孙逸仙和中国西化医学',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
《孙中山研究》自序.txt|2|历史人物须面对真实罪责|方法|历史人物;罪责;论定
《孙中山研究》自序.txt|3|历史家负责最后审判|方法|历史家;审判;求真
《孙中山研究》自序.txt|4|爱国者也可能以卖国为手段|政治|爱国;卖国;手段
001.孙中山见了李鸿章吗？.txt|4|政治造史必须拆穿|方法|政治造史;辨伪;国民党
001.孙中山见了李鸿章吗？.txt|6|历史训练能识破编造|方法|历史训练;捏造;桂崇基
001.孙中山见了李鸿章吗？.txt|7|生平核对是辨伪起点|方法|生平;核对;辨伪
001.孙中山见了李鸿章吗？.txt|10|人物行踪可以否定会面传说|方法|行踪;会面;孙中山
001.孙中山见了李鸿章吗？.txt|17|亲历回忆仍须考订|方法|回忆;考订;陈少白
001.孙中山见了李鸿章吗？.txt|24|思想影响可从文本用语追索|方法|思想影响;文本;郑观应
001.孙中山见了李鸿章吗？.txt|26|成文地点可检验回忆真伪|方法|成文地点;回忆;上李鸿章书
001.孙中山见了李鸿章吗？.txt|27|身份关系与现实条件共同验史|方法|身份关系;现实条件;史实
001.孙中山见了李鸿章吗？.txt|33|政治宣传常逸出常识|政治|政治宣传;常识;造谣
001.孙中山见了李鸿章吗？.txt|34|半世纪后的口述也要问沉默|方法|口述;沉默;史料
001.孙中山见了李鸿章吗？.txt|41|判断行动不能把小节当大义|方法|行动;大义;李鸿章
001.孙中山见了李鸿章吗？.txt|46|单一目的说须经必要性检验|方法|目的;必要性;护照
001.孙中山见了李鸿章吗？.txt|76|政治人物会隐藏不利前史|人格|政治人物;沉默;改良
001.孙中山见了李鸿章吗？.txt|81|结论必须满足时间顺序|方法|时间顺序;推论;史料
001.孙中山见了李鸿章吗？.txt|82|权力不能垄断历史|政治|权力;历史;求真
002.孙中山向清吏下跪求饶.txt|10|宣传剧仍须接受史实检验|写作|电视剧;宣传;史实
002.孙中山向清吏下跪求饶.txt|12|历史真相容有矛盾说法|方法|罗生门;矛盾;真相
002.孙中山向清吏下跪求饶.txt|26|自述细节要与档案对读|方法|自述;档案;伦敦蒙难
002.孙中山向清吏下跪求饶.txt|28|秘件能推翻完全依据史实|方法|秘件;史实;孙中山
002.孙中山向清吏下跪求饶.txt|36|同期文件可限定行动意图|方法|同期文件;行动意图;清使馆
002.孙中山向清吏下跪求饶.txt|53|原始文件能重建事件转折|方法|原始文件;转折;自投罗网
002.孙中山向清吏下跪求饶.txt|69|受监视者也会因大意自陷|人格|监视;大意;使馆
002.孙中山向清吏下跪求饶.txt|71|自述改写要追问政治目的|方法|自述;政治目的;同情
002.孙中山向清吏下跪求饶.txt|77|政治人物会为同情改写经历|人格|政治人物;同情;改写
002.孙中山向清吏下跪求饶.txt|78|政治宣传品不能直接当信史|方法|政治宣传品;信史;史料
002.孙中山向清吏下跪求饶.txt|109|绝境会迫使人接受有害文本|人格|绝境;悔过书;求生
002.孙中山向清吏下跪求饶.txt|122|史家不能忽略敌方叙事|方法|史家;敌方叙事;罗生门
002.孙中山向清吏下跪求饶.txt|128|内部文件可突破一面之词|方法|内部文件;一面之词;真相
002.孙中山向清吏下跪求饶.txt|144|伦敦蒙难是偶发而非设计|知识|伦敦蒙难;偶发;自投罗网
002.孙中山向清吏下跪求饶.txt|153|神化人物也曾下跪求饶|人格|神化;下跪;求饶
002.孙中山向清吏下跪求饶.txt|159|政党一面宣传不足为凭|方法|政党宣传;一面之词;求证
003.孙中山与吿洋状.txt|2|意识形态常靠扣人套语|政治|意识形态;套语;告洋状
003.孙中山与吿洋状.txt|3|告洋状是扩张性政治标签|政治|告洋状;政治标签;异议
003.孙中山与吿洋状.txt|4|政治标签用来丑化异议者|政治|政治标签;丑化;党外
003.孙中山与吿洋状.txt|5|指责他人告洋状常是自我描述|人格|双重标准;告洋状;国民党
003.孙中山与吿洋状.txt|21|借外援者会包装共同利益|政治|外援;共同利益;英国
003.孙中山与吿洋状.txt|22|外援交易常预付国家权利|政治|外援;国家权利;交易
003.孙中山与吿洋状.txt|23|现代化条款也可能夹在丧权文件中|方法|现代化;丧权;文件
004.孙中山与卖国大比赛.txt|2|外国势力会同时押注朝野|政治|外国势力;朝野;押注
004.孙中山与卖国大比赛.txt|4|倚靠外援容易走向不择手段|政治|外援;不择手段;孙中山
004.孙中山与卖国大比赛.txt|5|革命外援可用国家权益交换|政治|革命;外援;国家权益
004.孙中山与卖国大比赛.txt|10|利益关系可提高秘闻可信度|方法|利益关系;秘闻;可信度
004.孙中山与卖国大比赛.txt|17|密商须从最接近者证言追索|方法|密商;证言;宫崎龙介
004.孙中山与卖国大比赛.txt|19|反复疑案会形成历史问题|方法|疑案;历史问题;孙中山
004.孙中山与卖国大比赛.txt|26|政党会隐藏不利于领袖的文件|政治|政党;隐藏;文件
004.孙中山与卖国大比赛.txt|42|当事人不否认也是辨真线索|方法|当事人;否认;辨真
004.孙中山与卖国大比赛.txt|44|求援不遂后常转为愤慨|人格|求援;愤慨;日本
004.孙中山与卖国大比赛.txt|46|外力会把内斗双方当筹码|政治|外力;内斗;筹码
004.孙中山与卖国大比赛.txt|78|档案保存时间可以反驳伪造说|方法|档案;伪造;时间
004.孙中山与卖国大比赛.txt|85|反复出现的指控值得追问|方法|指控;追问;历史
004.孙中山与卖国大比赛.txt|86|救国与卖国可能出于同一政党|政治|救国;卖国;国民党
004.孙中山与卖国大比赛.txt|102|卖国竞赛不限于单一政治阵营|政治|卖国;政治阵营;满清
005.孙中山的一个错误.txt|8|领袖过奖也可能违背史实|人格|领袖;过奖;史实
005.孙中山的一个错误.txt|37|响应次序须由时间表核定|方法|时间表;响应次序;辛亥革命
005.孙中山的一个错误.txt|38|政治人物的话必须求证|方法|政治人物;求证;孙中山
005.孙中山的一个错误.txt|50|领袖误言会被追随者加倍传抄|政治|领袖;误言;传抄
006.孙中山反对双十国庆.txt|2|奉行遗教者也会背离遗教|政治|遗教;背离;双十节
006.孙中山反对双十国庆.txt|3|国庆应纪念反对家天下|政治|国庆;家天下;共和
006.孙中山反对双十国庆.txt|5|纪念日可被小朝廷重新塑造|文化|纪念日;小朝廷;行宪
006.孙中山反对双十国庆.txt|6|口号与实际政治可以完全相反|政治|口号;实际政治;遗教
007.孙中山《国父遗教》不可不读也！.txt|3|官方经典也可反向阅读|方法|官方经典;反向阅读;国父遗教
007.孙中山《国父遗教》不可不读也！.txt|4|受限读物仍能提供反证|方法|受限读物;反证;史料
007.孙中山《国父遗教》不可不读也！.txt|24|读文件要看前事不忘|方法|文件;前事不忘;阅读
007.孙中山《国父遗教》不可不读也！.txt|25|革命成功依赖被遮蔽的社会力量|政治|革命;社会力量;黑社会
007.孙中山《国父遗教》不可不读也！.txt|28|历史事实不能被领袖批复抹杀|方法|历史事实;领袖;抹杀
007.孙中山《国父遗教》不可不读也！.txt|29|政党会利用社会力量后再踢开|政治|政党;利用;社会力量
008.孙中山蒋介石逼反老同志.txt|6|教科书会把复杂内情写成善恶对决|写作|教科书;善恶对决;陈炯明
008.孙中山蒋介石逼反老同志.txt|14|没有武力的领袖只是空头领袖|政治|武力;领袖;孙中山
008.孙中山蒋介石逼反老同志.txt|17|史料能颠覆后来宣传的功劳簿|方法|史料;宣传;功劳
008.孙中山蒋介石逼反老同志.txt|20|历史功劳必须按实际参与重算|方法|历史功劳;实际参与;蒋介石
008.孙中山蒋介石逼反老同志.txt|28|非法名位会制造预见中的恶果|法权|非法总统;名位;恶果
008.孙中山蒋介石逼反老同志.txt|36|政治异议不等于个人私见|政治|政治异议;联省自治;私见
008.孙中山蒋介石逼反老同志.txt|37|以军阀之名打军阀是双重标准|政治|军阀;双重标准;孙中山
008.孙中山蒋介石逼反老同志.txt|49|兔死狗烹会把老同志逼成敌人|政治|兔死狗烹;老同志;陈炯明
008.孙中山蒋介石逼反老同志.txt|52|领袖失控会越法迫害同志|法权|领袖;违法;迫害
008.孙中山蒋介石逼反老同志.txt|58|钦定史书会窜改不利信件|方法|钦定史书;窜改;信件
008.孙中山蒋介石逼反老同志.txt|61|漂亮公文可能掩盖全部内幕|写作|公文;内幕;修辞
008.孙中山蒋介石逼反老同志.txt|68|目的会遮蔽政治判断|人格|目的;政治判断;孙中山
008.孙中山蒋介石逼反老同志.txt|70|政党会把政见冲突改写成叛逆|政治|政见冲突;叛逆;宣传
008.孙中山蒋介石逼反老同志.txt|76|秘密结社伦理会污染公开政党|政治|秘密结社;公开政党;伦理
008.孙中山蒋介石逼反老同志.txt|77|服理不服人才是独立人格|人格|服理;独立人格;陈炯明
008.孙中山蒋介石逼反老同志.txt|98|守原则者宁可失败也不遗祸|人格|原则;失败;陈炯明
008.孙中山蒋介石逼反老同志.txt|107|领袖要求别人悔过却拒绝自省|人格|悔过;领袖;自省
008.孙中山蒋介石逼反老同志.txt|114|统治者的悔过哲学只要求别人|政治|统治者;悔过;国民党
008.孙中山蒋介石逼反老同志.txt|116|和平统一也可能只是晚来的转向|政治|和平统一;转向;孙中山
008.孙中山蒋介石逼反老同志.txt|120|失败不损磊落人格|人格|失败;磊落;陈炯明
008.孙中山蒋介石逼反老同志.txt|123|借外国武力消灭同胞仍是内战|政治|外国武力;同胞;内战
008.孙中山蒋介石逼反老同志.txt|126|知识分子应为被污名者说公道话|人格|知识分子;污名;公道
009.孙中山蒋介石为什么不殉国？.txt|4|殉国豪言与实际逃生要对照|人格|殉国;逃生;孙中山
009.孙中山蒋介石为什么不殉国？.txt|8|领袖总能解释为何尚不到死时|人格|领袖;殉国;蒋介石
009.孙中山蒋介石为什么不殉国？.txt|9|只有言教没有身教是领袖缺憾|人格|言教;身教;领袖
010.孙中山不准再打炮.txt|4|象征性武力往往无补大局|政治|武力;象征;炮教
010.孙中山不准再打炮.txt|6|贫困失败也不能夺走人的志气|人格|贫困;失败;志气
010.孙中山不准再打炮.txt|9|惩罚器物暴露封建政治心理|文化|器物;惩罚;封建
011.孙中山与林肯名言.txt|6|经典名篇也可能当场失败|写作|经典;演说;失败
011.孙中山与林肯名言.txt|8|作品价值可能晚于当世才确立|写作|作品价值;当世;林肯
011.孙中山与林肯名言.txt|18|精炼表达能胜过千言万语|写作|精炼;表达;演说
011.孙中山与林肯名言.txt|20|名言翻译须追索版本演变|方法|翻译;版本;孙中山
011.孙中山与林肯名言.txt|37|译名形成也有试译阶段|写作|译名;试译;民有民治民享
011.孙中山与林肯名言.txt|41|定译须由历次文本排比确认|方法|定译;文本排比;翻译
011.孙中山与林肯名言.txt|42|宣传译法往往简明有余明确不足|写作|宣传;翻译;明确
011.孙中山与林肯名言.txt|45|词义真相要靠历时排比|方法|词义;历时排比;真相
011.孙中山与林肯名言.txt|63|名言往往其来有自|知识|名言;来源;林肯
011.孙中山与林肯名言.txt|64|物证可以确认思想来源|方法|物证;思想来源;林肯
011.孙中山与林肯名言.txt|65|引用前人未必构成严重抄袭|写作|引用;抄袭;林肯
011.孙中山与林肯名言.txt|68|冲突起草传说可以并存|方法|起草;传说;葛底斯堡
011.孙中山与林肯名言.txt|69|过度简明会扭曲原义|写作|简明;原义;翻译
011.孙中山与林肯名言.txt|76|翻译须保留不同语法关系|写作|翻译;语法;胡适
011.孙中山与林肯名言.txt|81|词义要分辨主格与受格|知识|主格;受格;词义
011.孙中山与林肯名言.txt|92|同一人民在句中可兼主客|知识|人民;主格;受格
011.孙中山与林肯名言.txt|94|对称口号会掩盖不对称原义|写作|口号;原义;民有民治民享
011.孙中山与林肯名言.txt|95|民有民治民享并不对等|知识|民有;民治;民享
011.孙中山与林肯名言.txt|97|概念附会会把主义变成统战戏法|政治|概念附会;统战;三民主义
011.孙中山与林肯名言.txt|100|为人民口号也可能变成罚人民|政治|为人民;口号;国民党
012.孙中山把三民主义作为“统战工具”.txt|3|论定人物要把握成熟高峰|方法|人物论定;成熟;高峰
012.孙中山把三民主义作为“统战工具”.txt|5|纪念可能把人物小化|文化|纪念;小化;闻一多
012.孙中山把三民主义作为“统战工具”.txt|6|乡愿式纪念会窄化批判成就|文化|乡愿;纪念;殷海光
012.孙中山把三民主义作为“统战工具”.txt|7|真正思想家可以从打手转为批判者|人格|思想家;觉悟;殷海光
012.孙中山把三民主义作为“统战工具”.txt|8|纪念应识其大者|方法|纪念;识其大者;论定
012.孙中山把三民主义作为“统战工具”.txt|23|自由抗争需要政治与思想双轨推进|政治|自由;新党;思想
012.孙中山把三民主义作为“统战工具”.txt|25|立论必须从原著举证|方法|立论;原著;举证
013.孙中山的第二兴趣是“女人”.txt|3|坦白承认欲望胜过伪装|人格|欲望;坦白;女人
013.孙中山的第二兴趣是“女人”.txt|4|革命与情爱可以交织一生|情爱|革命;情爱;伴侣
013.孙中山的第二兴趣是“女人”.txt|6|反封建实践也会遇到旧观念阻力|文化|反封建;旧观念;女性
013.孙中山的第二兴趣是“女人”.txt|7|革命成功后应转向更宽生活|人格|革命;生活;知止
013.孙中山的第二兴趣是“女人”.txt|8|职业革命会让被革命者吃不消|政治|职业革命;知止;国民
014.孙中山与陈粹芬.txt|4|为尊者讳是封建史观|文化|为尊者讳;封建;传记
014.孙中山与陈粹芬.txt|10|被隐藏的伴侣可由老同志证言还原|方法|伴侣;证言;陈粹芬
014.孙中山与陈粹芬.txt|19|当事署名能确认被遮蔽身份|方法|署名;身份;陈粹芬
014.孙中山与陈粹芬.txt|27|革命女性常在成功后被出局|情爱|革命女性;出局;陈粹芬
014.孙中山与陈粹芬.txt|29|分居不能自动消除重婚问题|法权|分居;重婚;婚姻
014.孙中山与陈粹芬.txt|40|冷门人名可检验口述真伪|方法|人名;口述;证据
014.孙中山与陈粹芬.txt|41|人物身份知识可打通证据链|知识|人物身份;证据链;温芬
014.孙中山与陈粹芬.txt|43|历史家应为沉默女性恢复名字|人格|历史家;女性;恢复名字
015.《乱党之真相》中的孙中山.txt|2|敌对记载也可保存被压住的线索|方法|敌对记载;线索;乱党之真相
015.《乱党之真相》中的孙中山.txt|4|旁证能确认传闻的事实底座|方法|旁证;传闻;事实
015.《乱党之真相》中的孙中山.txt|7|财务文书可检验人物自述|方法|财务文书;人物自述;澳门
015.《乱党之真相》中的孙中山.txt|10|官方年谱会避开不利传说|政治|官方年谱;不利传说;孙中山
015.《乱党之真相》中的孙中山.txt|13|多方记载可恢复隐去关系|方法|多方记载;陈粹芬;关系
015.《乱党之真相》中的孙中山.txt|31|夸张资料仍可保留争端线索|方法|夸张;争端;宋嘉树
015.《乱党之真相》中的孙中山.txt|44|文献无征时只能保留可能性|方法|文献无征;可能性;制裁
`.trim();

const skippedDuplicates = [
  ['001.孙中山见了李鸿章吗？.txt', 13, '006.“改良”与“革命”之间.txt', 19],
  ['001.孙中山见了李鸿章吗？.txt', 53, '006.“改良”与“革命”之间.txt', 26],
  ['001.孙中山见了李鸿章吗？.txt', 60, '006.“改良”与“革命”之间.txt', 32],
  ['001.孙中山见了李鸿章吗？.txt', 62, '006.“改良”与“革命”之间.txt', 34],
  ['001.孙中山见了李鸿章吗？.txt', 65, '006.“改良”与“革命”之间.txt', 37],
  ['001.孙中山见了李鸿章吗？.txt', 67, '006.“改良”与“革命”之间.txt', 38],
  ['001.孙中山见了李鸿章吗？.txt', 72, '006.“改良”与“革命”之间.txt', 43],
].map(([source_file, source_paragraph, previous_source_file, previous_source_paragraph]) => ({
  source_file,
  source_paragraph,
  previous_book: '孙逸仙和中国西化医学',
  previous_source_file,
  previous_source_paragraph,
  reason: '与上一册源段落完全相同，本轮不重复提取',
}));

function getSourceFiles(dir = sourceDir) {
  return fs.readdirSync(dir)
    .filter((fileName) => fileName.endsWith('.txt'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function readParagraphs(fileName, dir = sourceDir) {
  const filePath = path.join(dir, fileName);
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

function assertUnique(records, key, label) {
  const seen = new Set();
  for (const record of records) {
    const value = record[key];
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
}

function assertSkippedDuplicates() {
  const previousDir = path.join(rootDir, previousBookDir);
  for (const item of skippedDuplicates) {
    const current = readParagraphs(item.source_file)[item.source_paragraph - 1];
    const previous = readParagraphs(item.previous_source_file, previousDir)[item.previous_source_paragraph - 1];
    if (!current || current !== previous) {
      throw new Error(`Previous-book duplicate check failed: ${item.source_file}:${item.source_paragraph}`);
    }
  }
}

function buildRecords() {
  const sourceFiles = new Set(getSourceFiles());
  const paragraphCache = new Map();
  const records = parseSpec().map((spec, index) => {
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
  assertUnique(records, 'title', 'title');
  assertUnique(records, 'description', 'description');
  return records;
}

const allSourceFiles = getSourceFiles();
const bodySourceFiles = allSourceFiles.filter((fileName) => !fileName.includes('目录'));
if (bodySourceFiles.length !== 16) {
  throw new Error(`Expected 16 body source files, found ${bodySourceFiles.length}`);
}
const sourceParagraphCount = bodySourceFiles
  .reduce((count, fileName) => count + readParagraphs(fileName).length, 0);
if (sourceParagraphCount !== 1018) {
  throw new Error(`Expected 1018 source paragraphs, found ${sourceParagraphCount}`);
}
assertSkippedDuplicates();
const records = buildRecords();
if (records.length !== 144) {
  throw new Error(`Expected 144 records, found ${records.length}`);
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
    note: '本轮从《孙中山研究》的自序与十五篇正文中提取思想索引。全书大量穿插孙中山、陈炯明、胡适、殷海光及其他当事人的演说、书信、回忆和档案；本轮只保留李敖自己的史料辨析、人物论定、政治批判、翻译考证、法权判断与情爱史观，不把被引人物的独立意见计为李敖思想。另有七个实质段落与上一册《孙逸仙和中国西化医学》源文完全相同，已校验并跳过。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: skippedDuplicates.length,
    skipped_duplicates: skippedDuplicates,
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
  `- 与上一册完全相同并跳过的实质段落：${skippedDuplicates.length}`,
  '',
  '## 提取原则',
  '',
  '- 只提取李敖自己的史料辨析、人物论定、政治批判、翻译考证、法权判断、写作判断与情爱史观。',
  '- 孙中山、陈炯明、胡适、殷海光及其他当事人的演说、书信、回忆和档案，不因观点完整而独立列为李敖思想。',
  '- 被引材料只在李敖作出明确评价、反驳、归纳或方法说明的完整段落中随文保留。',
  '- 与上一册源文完全相同的七个实质段落经逐段校验后跳过，不在本轮重复制造条目。',
  '- 提取轮适度展开人物辨伪、政治宣传、外援交易、陈炯明翻案、翻译考证和被遮蔽女性等论证层面，供校对轮再做收敛。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
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
  skipped_duplicate_count: payload.book.skipped_duplicate_count,
  category_counts: payload.book.category_counts,
}, null, 2));
