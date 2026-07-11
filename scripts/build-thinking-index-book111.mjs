import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '111';
const bookTitle = '丑陋的中国人研究';
const slug = 'ugly-chinese-research';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '013.丑陋的中国人研究');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
001|4|民族性只代表主要人格而非唯一人格|知识|民族性;人格类型;抽样
001|5|地理生理不足以单独解释民族性|方法|民族性;后天教化;框框看法
001|6|研究民族性不能抹去少数光明样本|方法|民族性;少数样本;偏见
001|7|只取群体缺点会制造整体污名|文化|群体缺点;整体污名;偏见
001|8|以偏概全会暴露作者的人格与学格|人格|以偏概全;人格;学格
002|5|家长式领袖崇拜是强迫孺慕|政治|领袖崇拜;家长政治;愚民
002|6|政治教育可能使有识者比普通人更盲从|文化|政治教育;盲从;国民党
002|9|主动攀附权力是一种自愿孺慕|人格|权力;攀附;孺慕
002|14|普通人的讽刺能揭穿领袖崇拜|文化|老兵;讽刺;领袖崇拜
003|2|不学的权力人物常借学术附庸风雅|知识|权力;学术;附庸风雅
003|4|年代比对可以揭穿典故误置|方法|年代;典故;史实
003|7|文艺移情会使旁观者变成分享者|知识|移情;文艺心理;观众
003|8|领袖崇拜会把文艺移情推向荒谬|政治|领袖崇拜;移情;戏剧
004|5|错误事实上的解释比错误解释更不可原谅|方法|事实;解释;媒体
004|6|知识分子的特立独行可以成为榜样|人格|知识分子;独立;辜鸿铭
004|7|查核籍贯与谱系可以揭穿攀亲|方法|籍贯;谱系;事实核验
004|8|虚假攀亲背后可能是文化心理作祟|文化|攀亲;文化心理;身份
004|9|认祖攀贵是权势文化的历史惯性|文化|认族;权势;历史
004|11|攀附名人会反过来伤害被攀附者|人格|攀附;名人;名誉
005|2|婚姻守信能够体现人格伟大|情爱|婚姻;守信;胡适
005|13|权势可以让公共丑闻突然断线|政治|权势;新闻;压制
005|22|销毁私人手稿会使社会史料永久消失|知识|手稿;社会史料;销毁
005|24|保存唯一原本可以挽救历史记忆|知识|原本;保存;历史记忆
005|41|权势消失后的人情变化最能检验友情|人格|人情冷暖;友情;胡适
005|42|证人有偏执也不能据此否定具体事实|方法|证人;偏执;事实
005|43|空间与门牌事实可以核验公开否认|方法|空间证据;门牌;核验
005|44|人物论断必须接受事实查证|方法|人物论断;事实;查证
005|45|宏大人格赞词可以被微小行为反证|人格|人格评价;行为;反证
005|46|面对一面倒的悼词仍应保存另一面|人格|悼词;公道;历史评价
005|51|批评机构时仍须说明对方没有做过的恶|人格|批评;公允;机构
005|52|保留未发表批评可以证明并非赶尽杀绝|人格|批评;克制;保留
005|53|辩正史实必须同时查考公私材料|方法|史料;私藏;公藏
005|55|图片钤记可以反证机构否认馆藏|方法|图片证据;钤记;馆藏
005|64|教育机构不应协助外人陷害自己的学生|法权|大学;学生;伪证
005|65|大学披露学生资料必须有权力与法理依据|法权|学生资料;大学;法理
005|66|不敢维护自由却协助迫害更加可耻|人格|学术自由;迫害;软弱
005|75|旧报小广告也能保存权力欺压的证据|方法|报纸广告;权力;证据
005|77|学者成为学官后可能荒废所学|知识|学者;学官;学术
005|78|政党把持学术机构会损害学术|政治|政党;大学;学术机构
005|79|学术领袖也可能参与打击自由分子|政治|学术领袖;自由分子;迫害
005|81|政治卵翼会制造伪君子型学人|文化|政治卵翼;学人;伪君子
005|82|有火气的历史判断仍须以证据为基础|方法|历史判断;证据;火气
006|4|写作者可以替无力发声者主持公道|人格|写作者;弱者;公道
006|38|接受遗嘱执行责任后不能任意卸责|法权|遗嘱执行人;责任;法律
006|39|司法程序可以阻止受托人逃避责任|法权|司法;遗嘱;责任
006|47|手足情义与受托责任都要求收拾遗债|人格|手足;遗嘱;债务
006|70|公开材料可以呈现受托人的道义责任|方法|公开信;道义;证据
006|78|责任人不能把自己的义务转推给第三者|人格|责任;推诿;遗嘱
006|79|法律无效时社会仍可实施道义制裁|人格|道义制裁;社会;责任
007|3|善行记录具有施教与警世作用|人格|善行;记录;施教
007|5|人权援助不应取决于文学评价|人格|人权;文学评价;援助
007|6|成名可能迫使无才作者继续写作|写作|成名;写作才能;重复
007|11|真相未明前不应轻率怀疑朋友忘恩|人格|朋友;怀疑;真相
007|51|短暂释放也可能是监视联络对象的手段|政治|释放;监视;侦查
007|131|危难时应先抢救作品而非空头招牌|知识|作品保存;出版社;危难
007|132|替人保存藏书不应趁机据为己有|人格|藏书;保管;私利
007|133|法律文书可以成为保存狱中真相的通道|方法|法律文书;冤狱;证言
007|134|国际传播可以突破国内新闻封锁|政治|国际传播;新闻封锁;冤狱
007|141|法律保障被忽略时知识分子必须发声|法权|法律保障;知识分子;人权
007|142|海外舆论能对爱面子的政权形成压力|政治|海外舆论;政权;压力
007|143|公开恶行可以阻止迫害者依赖秘密|政治|公开;迫害;监督
007|144|持续揭发比沉默抗议和求情更能形成制约|政治|揭发;求情;制约
007|145|是否反对政权不影响冤狱的成立|法权|冤狱;政治立场;司法
007|183|人权目标不能在救出一个人后停止|人格|人权;普遍性;营救
007|185|施助者可以无所求而受助者仍应知恩|人格|施助;感恩;道德
008|58|证词中的可查证细节可以成为翻案活扣|方法|证词;查证;翻案
008|76|不能因结局失败便抹杀当事人的努力|人格|努力;结局;公允
008|87|评价离异伴侣仍应承认其患难付出|情爱|伴侣;离异;患难
008|91|表面上的不谅需要更多同情与理解|人格|表面;同情;理解
008|97|患难中的行动比事后的诗句更能证明感情|情爱|患难;行动;感情
008|101|办案必须具有区分事实与猜疑的判断力|法权|办案;事实;判断力
008|102|威权会把援助政治犯也变成罪状|政治|威权;政治犯;援助
009|4|以大义责友不等于否定相知|人格|朋友;大义;批评
009|16|被迫害者未必原本就是反对者|政治|迫害;反对者;政治立场
009|18|入狱未必会改变原有的权力依恋|人格|入狱;权力依恋;人格
009|19|判断政治写作要看其批评上限|写作|政治写作;批评;上限
009|21|过去的政治立场不能保证出狱后的选择|人格|政治立场;出狱;变化
009|25|监狱经验不能自动带来勇气|人格|监狱;勇气;经验
009|33|恐惧会使受难者为避免麻烦而自我删改|人格|恐惧;自我审查;受难
009|35|故人之情不能阻止对道德标准的批评|人格|故人;道德;批评
009|38|道义必须保持完整而不能选择性适用|人格|道义;完整性;公评
009|40|为人权喊冤与私人恩怨属于不同层次|法权|人权;私人恩怨;冤狱
010|21|和解首先要求犯错者承认错误|人格|和解;认错;责任
010|23|不说明恩义差异的和解会混淆是非|人格|和解;恩义;是非
010|25|合作必须建立在共同抵抗暴政之上|政治|合作;暴政;大义
010|27|忽略和解条件只会制造虚假的和局|人格|和解条件;虚假;和局
010|28|私人感情会蒙蔽道德判断|人格|私情;道德判断;护短
010|29|人权承诺必须从个案推广到所有人|法权|人权;个案;普遍性
010|30|只为一人发怒会使公共正义随私情消失|人格|公共正义;私情;普遍性
010|35|把已有证据的问题说成复杂是一种遁词|方法|证据;复杂;遁词
010|36|以复杂为借口可能掩饰道德勇气不足|人格|复杂;道德勇气;乡愿
010|37|逐项列明证据可以使人事判断变得可核验|方法|证据;人事判断;核验
010|39|科学家的求真态度也应贯彻到道德判断|人格|科学家;求真;道德判断
010|40|人间天理未明时其他公共主张都是空的|人格|天理;公共主张;是非
010|44|社会病症只有落实到具体的人才可处理|方法|社会病症;个人;落实
010|45|相反价值不能同时得到肯定|人格|价值冲突;选择;乡愿
010|46|正义比朋友关系更重要|人格|正义;朋友;选择
011|7|传统作者归属必须接受史料检验|方法|作者归属;春秋;史料
011|8|史书价值来自对社会活动的广泛记录|知识|史书;社会活动;记录
011|11|首尾照应能提升编年史的可读性|写作|编年史;照应;可读性
011|12|写与不写都可以形成历史褒贬|写作|历史书法;取舍;褒贬
011|13|读古书应求制度义理而非停在章句末节|知识|古书;制度;义理
012|11|论战著作可能因工具价值获得更长生命|知识|说文;论战;工具书
012|12|文字源流研究可以帮助进入古典|知识|文字源流;说文;古典
012|16|权威记录会使错误观察积非成是|方法|权威;观察;积非成是
012|20|多条文化附会会共同制造污名|文化|附会;污名;绿帽
012|28|词语早期用法不能用后来的贬义倒推|方法|词源;早期用法;贬义
012|32|词源解释必须同时符合事实与情理|方法|词源;事实;情理
012|44|夫妻人格各自独立并受法律分别保护|法权|夫妻;人格权;法律
013|24|公开说错后不应为了面子错到底|人格|认错;面子;公开表态
013|25|性嫉妒会制造幻想中的迫害者|文化|性嫉妒;迫害妄想;文化心理
014|25|无差别的公平也可能偏离真正重点|人格|公平;重点;是非
014|26|维护正义时不能同时姑息不义|人格|正义;姑息;不义
014|27|肯定正面价值必须同时揭穿仿冒|方法|肯定;揭穿;仿冒
014|28|完整信仰必须从自救走向入世行动|文化|信仰;自救;入世
014|29|中国佛教常大乘其外而小乘其中|文化|佛教;大乘;小乘
014|30|只实践一半是各种意识形态的共同困境|文化|意识形态;实践;半途
014|31|乡愿以似是而非的德行迎合污世|人格|乡愿;伪君子;迎合
014|32|学习君子外表可能反而养成乡愿|文化|君子;乡愿;传统
014|33|守静与虚学会把人变成无用之人|文化|虚学;实用;颜元
014|34|建立真理必须同时破除伪学|方法|破除;建立;真理
014|35|制度会让伪君子占据正统位置|文化|制度;伪君子;正统
014|36|意识形态会被打着其旗号的人作弄|文化|意识形态;名号;作弄
014|39|真理是完整的不能只做一半|人格|真理;完整;行动
015|4|抽取一个样本可以检验宏观历史能力|方法|抽样;历史能力;检验
015|6|历史书写应同时保存事实与正义|写作|历史书写;事实;正义
015|9|批评暴君也必须建立在史实之上|方法|暴君;史实;批评
015|13|当事人原信可以确认刑罚选择原因|方法|原信;刑罚;史实
015|14|普遍残暴不能被误写成针对个人的特例|方法|普遍性;特例;历史解释
016|3|短文也可能密集包含严重史实错误|写作|短文;史实错误;核查
016|5|基础人物关系应回到正史原文核对|方法|人物关系;正史;核对
017|2|历史剧可以改编但不能颠倒史实|写作|历史剧;改编;史实
017|3|阅读很多书不等于读到了合格史料|知识|阅读;史料;历史剧
017|8|没有根据的据说不能算作历史|方法|据说;根据;历史
017|11|年代与婚姻事实可以击破复仇神话|方法|年代;婚姻;神话
017|12|低劣历史书会继续制造更低劣的文化作品|文化|历史书;文化传播;错误
018|4|外交电报可以检验政治事件的性质|方法|外交电报;政治事件;核验
018|5|私人日记可以反证公开叙事|方法|日记;公开叙事;反证
018|6|行动前的军事态势可以判断是否投降|方法|军事态势;投降;历史判断
018|7|谈判要求可以显示双方真实力量关系|政治|谈判;力量关系;历史
018|8|多种史料互证可以揭穿政治叙事|方法|史料互证;政治叙事;历史
019|4|历史谬误走向国际时更需要公开纠正|人格|历史谬误;国际;纠正
019|53|英雄神话必须接受时间线与政策文件检验|方法|英雄神话;时间线;政策文件
020|4|真正的朋友会以资源支持对方身后事业|人格|朋友;资源;身后事业
020|8|无法偿还的大恩可能诱发毁灭恩人的冲动|人格|大恩;忘恩负义;心理
020|9|对恩人的恐惧可能成为固定的迫害目标|人格|恩人;恐惧;迫害
020|10|把忘恩攻击视为病态可以获得心理距离|方法|忘恩;病态;心理距离
021|4|长期拘禁压力可能使人格转向依附迫害者|人格|拘禁;人格;迫害者
021|5|自由后继续谄媚迫害者比拘禁反应更可耻|人格|自由;谄媚;迫害者
021|7|受害者不愿批判压迫者至少可以保持沉默|人格|受害者;压迫者;沉默
032|6|把转载本与原刊对照可以发现删改|方法|转载;原刊;删改
032|7|删除他人贡献会扭曲历史并抬高自己|人格|删除;历史;自我抬高
032|8|靠窜改他人文章抬高自己违反写作伦理|写作|窜改;文章;写作伦理
033|3|只关心权势人物的人权是选择性人权|法权|人权;权势;选择性
033|4|作者原稿对照可以确认未经授权的删改|方法|原稿;删改;授权
033|5|擅改文章同时欺骗作者对象与读者|写作|擅改;作者;读者
033|6|高压环境下疏远老友也可能是一种保护|人格|高压;老友;保护
034|4|刑求会诱发假口供并被制度加工成罪案|法权|刑求;假口供;司法
034|6|翻译古文必须先辨明句子的主词|写作|古文;翻译;主词
034|7|能力不足的翻译会让读者承担错误|写作|翻译;能力;读者
035|5|不懂术语时不能用想当然填补意义|方法|术语;想当然;翻译
035|7|解释古代术语必须重建原有知识系统|知识|古代术语;知识系统;太岁
035|9|民间迷信可能由早期知识模型衍生|文化|迷信;知识模型;太岁
035|11|荒谬观念也会因社会心理长期流传|文化|荒谬观念;流传;社会心理
035|12|词义演变不能取代具体语境中的原义|方法|词义演变;语境;原义
036|6|翻译不应把易懂处变难又在难处乱猜|写作|翻译;难易;乱猜
036|14|冲突的作者记载要靠来源关系判断|方法|作者归属;来源;判断
036|15|人物性格与历史处境可以帮助理解语气|方法|人物性格;历史处境;语气
036|24|历代解释累积也可能始终没有贴近口语|知识|历代解释;口语;古文
036|25|反讽语气必须结合说话者处境解释|写作|反讽;语气;处境
036|30|译义必须放回其他用例检验是否通顺|方法|译义;用例;检验
036|33|跨文本用例可以确认古代口语含义|方法|跨文本;口语;含义
036|34|翻译古书需要历史语感而非望文生义|写作|古书;翻译;历史语感
037|7|把本土教育成果定为敌人会反证教育失败|政治|教育;政治定罪;反证
037|8|预先把作品送往海外可以对抗出版封锁|政治|海外出版;封锁;作品
037|10|第三方公论也会被威权扣上政治罪名|政治|公论;威权;政治罪名
037|12|株连式定罪会让公共讨论无人敢发言|政治|株连;公共讨论;噤声
037|13|帮助查证冤案事实是不能推卸的小义|人格|冤案;查证;道义
037|18|私人信件会被政治斗争转化为定罪材料|法权|私人信件;政治斗争;定罪
038|35|风险推测必须经过实际查证才能成立|方法|风险;推测;查证
038|36|好人的沉默若无行动便与放任没有区别|人格|沉默;行动;放任
038|37|决定不行动也应设法通知求助者|人格|不行动;通知;求助者
038|40|出版事实应由付款与业务记录纠正|方法|出版;付款;事实核验
`.trim();

function sourceFiles() {
  return fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/\r/g, '')
    .split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
}

function parseSpecs(allSourceFiles) {
  const available = new Set(allSourceFiles);
  return specLines.split(/\n+/).map((line, index) => {
    const [fileToken, paragraphText, title, category, keywordText, ...extra] = line.split('|');
    if (extra.length || !fileToken || !paragraphText || !title || !category || !keywordText) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    if (!categorySet.has(category)) throw new Error(`Invalid category ${category}`);
    let fileName = fileToken;
    if (!available.has(fileName)) {
      const matches = allSourceFiles.filter((name) => name.startsWith(fileToken));
      if (matches.length !== 1) throw new Error(`Cannot resolve source token: ${fileToken}`);
      [fileName] = matches;
    }
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
if (bodySourceFiles.length !== 38) throw new Error(`Expected 38 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 1705) throw new Error(`Expected 1705 paragraphs, found ${sourceParagraphCount}`);

const excludedEmbeddedRanges = [
  { fileToken: '005', start: 8, end: 12, owner: '报刊报道' },
  { fileToken: '005', start: 16, end: 21, owner: '唐德刚文章' },
  { fileToken: '005', start: 26, end: 40, owner: '江冬秀自传' },
  { fileToken: '005', start: 73, end: 74, owner: '报纸广告' },
  { fileToken: '006', start: 8, end: 25, owner: '辜伟甫遗嘱' },
  { fileToken: '006', start: 49, end: 68, owner: '林坤元来信' },
  { fileToken: '006', start: 71, end: 77, owner: '辜振甫复信' },
  { fileToken: '007', start: 14, end: 49, owner: '柏杨书信' },
  { fileToken: '007', start: 57, end: 125, owner: '柏杨身后事书信' },
  { fileToken: '007', start: 148, end: 166, owner: '孙观汉复信' },
  { fileToken: '007', start: 169, end: 182, owner: '孙观汉文章与引文' },
  { fileToken: '008', start: 4, end: 40, owner: '艾玫书信' },
  { fileToken: '008', start: 42, end: 55, owner: '中央社内部文件' },
  { fileToken: '008', start: 57, end: 57, owner: '柏杨答辩书' },
  { fileToken: '008', start: 66, end: 72, owner: '艾玫复信' },
  { fileToken: '008', start: 75, end: 75, owner: '艾玫书信' },
  { fileToken: '008', start: 77, end: 81, owner: '林黎女报道' },
  { fileToken: '008', start: 83, end: 86, owner: '柏杨诗文' },
  { fileToken: '008', start: 89, end: 90, owner: '艾玫书信' },
  { fileToken: '008', start: 93, end: 96, owner: '张香华诗文' },
  { fileToken: '009', start: 17, end: 17, owner: '柏杨答辩书' },
  { fileToken: '009', start: 22, end: 24, owner: '孙观汉文章' },
  { fileToken: '009', start: 26, end: 32, owner: '柏杨访谈' },
  { fileToken: '009', start: 36, end: 37, owner: '孙观汉文章' },
  { fileToken: '010', start: 11, end: 17, owner: '孙观汉文章' },
  { fileToken: '011', start: 18, end: 30, owner: '屠申虹附录' },
  { fileToken: '012', start: 34, end: 43, owner: '法院判决书' },
  { fileToken: '013', start: 10, end: 23, owner: '新闻报道与李翰祥谈话' },
  { fileToken: '014', start: 2, end: 18, owner: '邓维贤来信' },
  { fileToken: '015', start: 8, end: 8, owner: '柏杨译文' },
  { fileToken: '015', start: 10, end: 10, owner: '汉书原文' },
  { fileToken: '015', start: 12, end: 12, owner: '司马迁书信' },
  { fileToken: '016', start: 4, end: 4, owner: '柏杨文章' },
  { fileToken: '017', start: 5, end: 6, owner: '柏杨文章' },
  { fileToken: '018', start: 3, end: 3, owner: '柏杨文章' },
  { fileToken: '019', start: 6, end: 51, owner: '理查·霍夫斯塔特研究长引' },
  { fileToken: '020', start: 7, end: 7, owner: '国史补故事原文' },
  { fileToken: '022', start: 1, end: 228, owner: '屠申虹文章' },
  { fileToken: '023', start: 1, end: 39, owner: '李明德文章' },
  { fileToken: '024', start: 1, end: 85, owner: '孙国栋文章' },
  { fileToken: '025', start: 1, end: 45, owner: '陈启明文章' },
  { fileToken: '026', start: 1, end: 42, owner: '孙国栋文章' },
  { fileToken: '027', start: 1, end: 25, owner: '汪子飏文章' },
  { fileToken: '028', start: 1, end: 29, owner: '水逆蕃文章' },
  { fileToken: '029', start: 1, end: 21, owner: '大风文章' },
  { fileToken: '030', start: 1, end: 26, owner: '宗鹰文章' },
  { fileToken: '031', start: 1, end: 37, owner: '孙国栋文章' },
  { fileToken: '032', start: 3, end: 3, owner: '孙国栋文章' },
  { fileToken: '037', start: 20, end: 26, owner: '王光逖附录' },
  { fileToken: '038', start: 2, end: 32, owner: '王金仲达来信' },
];

const fullyExcludedTokens = new Set(['022', '023', '024', '025', '026', '027', '028', '029', '030', '031']);
const productionCreditRanges = bodySourceFiles
  .filter((name) => !fullyExcludedTokens.has(name.slice(0, 3)))
  .map((name) => {
    const count = paragraphs(name).length;
    return { fileToken: name.slice(0, 3), start: count - 4, end: count, owner: '数字版制作附注' };
  });
const excludedNonLiOrNonProseRanges = [...excludedEmbeddedRanges, ...productionCreditRanges];
const excludedParagraphKeys = new Set();
for (const range of excludedNonLiOrNonProseRanges) {
  for (let paragraph = range.start; paragraph <= range.end; paragraph += 1) {
    excludedParagraphKeys.add(`${range.fileToken}:${paragraph}`);
  }
}
const excludedNonLiOrNonProseParagraphCount = excludedParagraphKeys.size;
if (excludedNonLiOrNonProseParagraphCount !== 1170) {
  throw new Error(`Expected 1170 excluded embedded paragraphs, found ${excludedNonLiOrNonProseParagraphCount}`);
}

const specs = parseSpecs(allSourceFiles);
if (specs.length !== 183) throw new Error(`Expected 183 candidate specs, found ${specs.length}`);
const cache = new Map();
const candidates = specs.map((spec) => {
  const excludedRange = excludedNonLiOrNonProseRanges.find((range) => (
    spec.fileName.startsWith(range.fileToken)
      && spec.source_paragraph >= range.start
      && spec.source_paragraph <= range.end
  ));
  if (excludedRange) {
    throw new Error(`Excluded range selected: ${spec.fileName}:${spec.source_paragraph}`);
  }
  if (!cache.has(spec.fileName)) cache.set(spec.fileName, paragraphs(spec.fileName));
  const description = cache.get(spec.fileName)[spec.source_paragraph - 1];
  if (!description) throw new Error(`Missing ${spec.fileName}:${spec.source_paragraph}`);
  return { ...spec, description };
});

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const candidate of candidates) {
    if (seen.has(candidate[key])) {
      throw new Error(`Duplicate candidate ${key}: ${seen.get(candidate[key]).fileName}:${seen.get(candidate[key]).source_paragraph} and ${candidate.fileName}:${candidate.source_paragraph}`);
    }
    seen.set(candidate[key], candidate);
  }
}

const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const priorByDescription = new Map();
for (const record of master.records) {
  if (record.book !== bookTitle && !priorByDescription.has(record.description)) {
    priorByDescription.set(record.description, record);
  }
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
if (skippedDuplicates.length !== 10) throw new Error(`Expected 10 skipped duplicates, found ${skippedDuplicates.length}`);
if (retainedCandidates.length !== 173) throw new Error(`Expected 173 retained candidates, found ${retainedCandidates.length}`);
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
  source_path: path.join(sourceBookDir, spec.fileName),
  keywords: spec.keywords,
}));

for (const key of ['title', 'description']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate retained ${key}`);
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
    note: '本轮只提取李敖本人明确撰写、评论、考证或归纳的独立判断。屠申虹、李明德、孙国栋、陈启明、汪子飏、水逆蕃、大风、宗鹰、王光逖、王金仲达及来信、判决书、报刊长引中的独立观点不转列为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    excluded_non_li_or_non_prose_paragraph_count: excludedNonLiOrNonProseParagraphCount,
    excluded_non_li_or_non_prose_ranges: excludedNonLiOrNonProseRanges,
    candidate_count: candidates.length,
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
  `- 全部源段落数：${sourceParagraphCount}`,
  `- 明确排除的他人文本或非论述段落：${excludedNonLiOrNonProseParagraphCount}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖本人明确撰写、评论、考证或归纳的民族性研究、史料核验、翻译方法、公共正义、人权行动、友情伦理和威权心理。',
  '- 022 至 031 十篇署名他人的文章整篇排除；屠申虹、李明德、孙国栋、陈启明、汪子飏、水逆蕃、大风、宗鹰的独立观点不转列为李敖思想。',
  '- 前后篇章中的柏杨、艾玫、孙观汉、江冬秀、王光逖、王金仲达等书信、新闻、判决书和研究长引只作为论证材料。',
  '- 个案秘辛、辱骂性修辞、完整书信和制作附注不单独建项；涉及具体人物的段落须同时包含可独立检索的判断或方法。',
  '- 与既有总表源文完全相同的段落只记录重复来源，不重复建项。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 排除范围', '',
  ...excludedNonLiOrNonProseRanges.map((range) => `- ${range.fileToken} 第 ${range.start}-${range.end} 段：${range.owner}`), '',
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
  source_file_count: bodySourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  excluded_non_li_or_non_prose_paragraph_count: excludedNonLiOrNonProseParagraphCount,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
