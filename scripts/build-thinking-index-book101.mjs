import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 101;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '胡适与我';
const slug = 'hu-shih-and-me';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '012.人物研究类',
  '003.胡适与我',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
《胡适与我》自序.txt|3|身后影响需要后来人|文化|身后影响;后来人;历史评价
《胡适与我》自序.txt|4|热闹交游不保证身后忠诚|人格|朋友;身后;胡适
《胡适与我》自序.txt|6|真正朋友会保存思想遗产|人格|朋友;思想遗产;胡适
《胡适与我》自序.txt|7|学术评价不能追随时势|知识|学术评价;时势;胡适专家
001.给胡适的两首寿诗.txt|38|独立写作不求苟同|写作|文雄;立异;独立
001.给胡适的两首寿诗.txt|44|种下学术是为国家|人格|种树;造因;中华
001.给胡适的两首寿诗.txt|45|笔杆也有千斤重量|写作|笔杆;学阀;力量
001.给胡适的两首寿诗.txt|50|四十年坚持白话立场|写作|白话;坚持;文学
001.给胡适的两首寿诗.txt|51|真理必须经受辩驳|方法|真理;辩驳;批评
001.给胡适的两首寿诗.txt|62|珍爱自由不做暗投|人格|自由;明珠;操守
002.三封没发表的信.txt|6|主持机构也要讲求效率|政治|机构;效率;薪资
002.三封没发表的信.txt|7|独占工作必须保障生活|法权|专任;薪资;生活保障
003.胡适之不怕老婆考.txt|4|学术认真不能替宣传担保|方法|认真;宣传;考证
003.胡适之不怕老婆考.txt|5|人物形象必须接受事实检验|方法|形象;事实;胡适
003.胡适之不怕老婆考.txt|9|双方争执要重视直接证言|方法|证言;当事人;考证
004.胡祸呢？还是祸胡？.txt|14|赞毁阵营暴露知识尺度|知识|赞扬;攻击;知识标准
004.胡祸呢？还是祸胡？.txt|15|诬蔑不能冒充学术研究|知识|诬蔑;学术研究;胡适
004.胡祸呢？还是祸胡？.txt|17|教授头衔不保证学问人格|知识|教授;学问;人格
004.胡祸呢？还是祸胡？.txt|18|迫害者也会幻想遭受迫害|人格|迫害狂;心理;诬蔑
004.胡祸呢？还是祸胡？.txt|33|留学也可能加固本土狂热|文化|留学;狂热;文化性格
004.胡祸呢？还是祸胡？.txt|38|诬蔑论证经不起事实检验|方法|诬蔑;论证;事实
004.胡祸呢？还是祸胡？.txt|40|思想迫害会更换标签|政治|思想迫害;红帽子;标签
004.胡祸呢？还是祸胡？.txt|41|栽赃依靠拼接外围证据|方法|栽赃;证据;联想
004.胡祸呢？还是祸胡？.txt|46|旁人恶行不能证明胡祸|方法|胡祸;推论;证据
004.胡祸呢？还是祸胡？.txt|47|私人报复会伪装成思想清算|人格|报复;思想清算;动机
005.胡适和三个人.txt|23|回应使传闻成为研究材料|方法|传闻;回应;史料
005.胡适和三个人.txt|26|保留式道歉没有承认错误|人格|道歉;错误;编辑
005.胡适和三个人.txt|30|遗漏关键往来会留下合理疑问|方法|订婚;史料;疑问
005.胡适和三个人.txt|41|古典掌故可以生成幽默|写作|掌故;幽默;讽刺
005.胡适和三个人.txt|45|新方法能够补足旧学根基|知识|方法;旧学;学派
005.胡适和三个人.txt|85|版本删信会改变历史面貌|方法|版本;删信;史料
005.胡适和三个人.txt|107|识才需要眼光和勇气|人格|蔡元培;识才;勇气
005.胡适和三个人.txt|110|学术谱系必须核对事实|方法|学术谱系;考证;错误
005.胡适和三个人.txt|121|保护异见需要制度担当|政治|蔡元培;保护;思想迫害
005.胡适和三个人.txt|124|大学伟大在于学术多元|文化|大学;多元;蔡元培
006.《胡适语粹》序目.txt|2|重复摘录不能代替有效编选|写作|摘录;重复;编选
006.《胡适语粹》序目.txt|6|长期停编会留下思想断层|写作|续编;思想;断层
006.《胡适语粹》序目.txt|7|整篇选本容易漏掉代表思想|写作|选本;整篇;代表思想
006.《胡适语粹》序目.txt|8|分类语粹能够保存思想全貌|写作|语粹;分类;思想
006.《胡适语粹》序目.txt|9|检索标题需要统一编排|方法|标题;分类;检索
006.《胡适语粹》序目.txt|30|思想分类难免带有编者限度|方法|分类;主观;编者
006.《胡适语粹》序目.txt|33|身后编选是公共文化责任|文化|身后;编选;责任
007.残存日记中的爱国者.txt|7|战争判断必须核准时间线|方法|抗战;时间线;史实
007.残存日记中的爱国者.txt|36|轰炸学校就是摧毁文化|文化|南开大学;轰炸;文化
007.残存日记中的爱国者.txt|42|立场转变本身值得研究|方法|主和;抗战;转变
007.残存日记中的爱国者.txt|43|爱国判断必须计算实力后果|政治|爱国;实力;战争
007.残存日记中的爱国者.txt|44|逆流发言需要精神勇气|人格|逆流;诚实;勇气
007.残存日记中的爱国者.txt|47|容纳异议必须落实到实践|政治|异议;民主;实践
007.残存日记中的爱国者.txt|50|理性判断不能追随流行|人格|理性;流行;判断
007.残存日记中的爱国者.txt|56|政治发言必须承担后果|政治|发言;后果;责任
007.残存日记中的爱国者.txt|59|冷静有时比激昂更爱国|政治|冷静;爱国;激昂
007.残存日记中的爱国者.txt|60|爱国名义也可能伤害国家|政治|爱国;伤害;舆论
007.残存日记中的爱国者.txt|80|和平方案受限于敌情知识|知识|和平方案;日本;判断
007.残存日记中的爱国者.txt|89|文官政府未必控制得了军队|政治|文官;军队;日本
007.残存日记中的爱国者.txt|91|没有实力的热情无法止战|政治|实力;热情;和平
007.残存日记中的爱国者.txt|123|主和抗战可以服从同一原则|政治|主和;抗战;国力
007.残存日记中的爱国者.txt|139|决定抗战就应全力承担|人格|抗战;承担;胡适
007.残存日记中的爱国者.txt|149|承担风险本身具有价值|人格|风险;责任;胡适
007.残存日记中的爱国者.txt|157|和平抗战都可坚持不投降|人格|和平;抗战;不投降
008.从小逆流到大回归.txt|15|评价言论必须放回历史现场|方法|历史现场;演讲;评价
008.从小逆流到大回归.txt|33|抽象名词容易制造阵营对立|政治|抽象名词;阵营;对立
008.从小逆流到大回归.txt|37|逆流立场容易成为攻击目标|政治|反苏;逆流;攻击
008.从小逆流到大回归.txt|45|思想家也会误判理论现实|知识|苏联;理论;误判
008.从小逆流到大回归.txt|54|局部认同可能遮蔽整体判断|方法|唯物论;社会主义;苏联
008.从小逆流到大回归.txt|60|旧文献能够暴露思想混乱|方法|旧文献;思想;事实
008.从小逆流到大回归.txt|62|最低限度的实验主义可以防错|方法|实验主义;防错;苏联
008.从小逆流到大回归.txt|67|公开自省能够留下思想教训|人格|自省;公开;教训
008.从小逆流到大回归.txt|69|第一流思想家也可能受骗|知识|思想家;受骗;政党
008.从小逆流到大回归.txt|70|成熟觉醒应当改变后来选择|人格|觉醒;选择;胡适
009.“千秋万岁名，寂寞身后事”.txt|10|完整书目是整理全集的基础|方法|书目;全集;胡适
009.“千秋万岁名，寂寞身后事”.txt|11|思想继承建立在真正理解上|知识|继承;理解;胡适
009.“千秋万岁名，寂寞身后事”.txt|21|生前朋友未必守护身后事业|人格|朋友;身后;胡适
009.“千秋万岁名，寂寞身后事”.txt|28|继承者失职更应感到羞耻|人格|继承者;失职;羞耻
009.“千秋万岁名，寂寞身后事”.txt|29|友谊要用身后行动检验|人格|友谊;行动;身后
009.“千秋万岁名，寂寞身后事”.txt|33|真正纪念不能停在口头|人格|纪念;行动;胡适
009.“千秋万岁名，寂寞身后事”.txt|35|散佚文章需要系统整理|写作|散佚;文章;整理
009.“千秋万岁名，寂寞身后事”.txt|37|选本价值来自准确和稀见|写作|选本;准确;稀见
009.“千秋万岁名，寂寞身后事”.txt|38|出版可以成为报答方式|人格|出版;报答;胡适
009.“千秋万岁名，寂寞身后事”.txt|44|机构垄断会阻碍文化整理|文化|机构;垄断;全集
009.“千秋万岁名，寂寞身后事”.txt|52|遗嘱变更会改变权利归属|法权|遗嘱;著作权;归属
009.“千秋万岁名，寂寞身后事”.txt|53|控制文化遗产就必须负责|法权|控制;文化遗产;责任
009.“千秋万岁名，寂寞身后事”.txt|55|全集目录也可能残缺错误|方法|全集;目录;错误
009.“千秋万岁名，寂寞身后事”.txt|56|公共机构未必有效完成文化工作|文化|公共机构;效率;全集
009.“千秋万岁名，寂寞身后事”.txt|61|思想遗产最终属于人类|文化|思想遗产;人类;作者
009.“千秋万岁名，寂寞身后事”.txt|62|接受遗嘱就要兑现遗愿|法权|遗嘱;遗愿;责任
009.“千秋万岁名，寂寞身后事”.txt|64|失职机构无权阻挡独立出版|法权|机构;出版;权利
009.“千秋万岁名，寂寞身后事”.txt|70|法律主张必须先有诉讼资格|法权|诉讼资格;法律;著作权
009.“千秋万岁名，寂寞身后事”.txt|75|传播思想比争夺功劳重要|文化|思想传播;功劳;出版
009.“千秋万岁名，寂寞身后事”.txt|76|阻碍作品流通就是文化检查|法权|文化检查;作品;流通
009.“千秋万岁名，寂寞身后事”.txt|88|作品选编不能被说成割裂精神|方法|选编;精神;逻辑
009.“千秋万岁名，寂寞身后事”.txt|91|文化争讼暴露道德双重标准|人格|双重标准;争讼;道德
009.“千秋万岁名，寂寞身后事”.txt|92|坏朋友会伤害身后不朽|人格|朋友;身后;不朽
010.一贯作业搜奇.txt|2|法律可以揭开政治争端结构|法权|法律;政治;争端
010.一贯作业搜奇.txt|7|事后制造资格违反法律常识|法权|资格;事后;法律
010.一贯作业搜奇.txt|17|起诉时必须已经具备资格|法权|起诉;资格;法院
010.一贯作业搜奇.txt|30|权利转移必须核对完整链条|法权|遗嘱;权利;转移
010.一贯作业搜奇.txt|31|公有权利不能私相授受|法权|公有;权利;赠与
010.一贯作业搜奇.txt|52|接受遗赠后不能任意反悔|法权|遗赠;接受;反悔
010.一贯作业搜奇.txt|58|权利关系必须保持法律确定性|法权|确定性;遗赠;权利
010.一贯作业搜奇.txt|61|任何人不能转让未有权利|法权|转让;权利;法律
010.一贯作业搜奇.txt|64|否认事实不能抹掉书面证据|方法|事实;文件;证据
010.一贯作业搜奇.txt|69|行政机关也会制造法律错误|法权|行政机关;错误;著作权
010.一贯作业搜奇.txt|72|公文造假会破坏权利秩序|法权|公文;造假;权利
010.一贯作业搜奇.txt|77|法律不能追溯处罚既往行为|法权|不溯既往;法律;判决
010.一贯作业搜奇.txt|80|正义需要保存记忆揭露真相|法权|正义;记忆;真相
011.“你们后死有责！”.txt|4|受托者对身后事业负有责任|法权|受托者;责任;全集
011.“你们后死有责！”.txt|9|纪念不能只留下名义|人格|纪念;名义;胡适
011.“你们后死有责！”.txt|28|反复决议不等于完成工作|政治|委员会;决议;效率
011.“你们后死有责！”.txt|29|文化事业成败要用结果判断|文化|机构;文化事业;结果
011.“你们后死有责！”.txt|35|自己失职不能再阻止别人|人格|失职;阻止;全集
011.“你们后死有责！”.txt|40|道歉不能替代身后责任|人格|道歉;责任;胡适
011.“你们后死有责！”.txt|43|文化工作必须交给合格者|知识|资格;文化工作;错误
011.“你们后死有责！”.txt|54|完整全集需要严格编辑规范|写作|全集;编辑;校勘
012.豹死留了什么皮？.txt|3|传记记录需要文学史识忠诚|写作|传记;文学;史识
012.豹死留了什么皮？.txt|14|删改材料会制造虚假人物|方法|删改;人物;传记
012.豹死留了什么皮？.txt|18|统一思想意味着思想僵化|文化|统一思想;僵化;变化
012.豹死留了什么皮？.txt|20|压制进步思想会失去社会支持|政治|思想;支持;政党
012.豹死留了什么皮？.txt|40|删削最先损害反极权思想|政治|删削;极权;思想
012.豹死留了什么皮？.txt|42|完整文集才能还原真实人物|写作|文集;真实;胡适
012.豹死留了什么皮？.txt|46|官方塑造的是面具不是人物|政治|官方;面具;人物
012.豹死留了什么皮？.txt|47|忠于人物比形式归属重要|人格|忠诚;归属;胡适
013.用胡适给傅斯年的一封私信收尾.txt|3|被忽略的思想需要重新揭示|写作|思想;揭示;胡适
013.用胡适给傅斯年的一封私信收尾.txt|10|民主制度需要相容的性格|政治|民主;科学;性格
013.用胡适给傅斯年的一封私信收尾.txt|11|转述研究必须注明来源|知识|转述;来源;研究
013.用胡适给傅斯年的一封私信收尾.txt|12|理解历史必须回到原始文件|方法|原始文件;历史;真相
013.用胡适给傅斯年的一封私信收尾.txt|42|知识分子应辨明独裁主张的受益者|政治|知识分子;独裁;受益者
013.用胡适给傅斯年的一封私信收尾.txt|54|军阀统一以后仍会压迫人民|政治|军阀;统一;人民
013.用胡适给傅斯年的一封私信收尾.txt|81|掌权者要为武力政治负责|政治|武力;责任;蒋介石
013.用胡适给傅斯年的一封私信收尾.txt|90|党高于国会摧毁公共忠诚|政治|党国;国家;独裁
013.用胡适给傅斯年的一封私信收尾.txt|135|自由承诺必须用具体实践检验|法权|自由;承诺;实践
013.用胡适给傅斯年的一封私信收尾.txt|151|知识分子鼓吹独裁必须负责|人格|知识分子;独裁;责任
014.武侠小说，下流！.txt|3|谈话记录不能草率失真|写作|谈话记录;失真;回忆
014.武侠小说，下流！.txt|6|出版不能为销量降低文化标准|文化|出版;销量;文化标准
015.为旧账算新账.txt|13|不了解文献容易制造政治猜疑|方法|文献;猜疑;胡适
015.为旧账算新账.txt|14|批评者也要补上史料功课|方法|批评;史料;旧账
016.我与胡适的“微妙关系”.txt|7|直言维护可能同时得罪双方|人格|直言;维护;胡适
016.我与胡适的“微妙关系”.txt|8|追求真相必须承受多方不悦|人格|真相;代价;批评
016.我与胡适的“微妙关系”.txt|13|勤查公开资料胜过阴谋猜测|方法|公开资料;勤奋;阴谋
017.从蒋介石非法连任看钱穆与胡适.txt|2|知识分子必须守住政治底线|人格|知识分子;底线;胡适
017.从蒋介石非法连任看钱穆与胡适.txt|4|总统复位必须遵守宪法程序|法权|总统;复位;宪法
017.从蒋介石非法连任看钱穆与胡适.txt|5|临时条款不能掩盖违法连任|法权|临时条款;连任;违法
017.从蒋介石非法连任看钱穆与胡适.txt|8|经济依附会腐蚀学者立场|人格|经济依附;学者;立场
017.从蒋介石非法连任看钱穆与胡适.txt|36|避免决裂不能取代原则反对|政治|妥协;原则;连任
017.从蒋介石非法连任看钱穆与胡适.txt|37|任何思想人物都应接受批评|方法|批评;人物;胡适
018.蒋介石与胡适密件之一.txt|20|不同史料应当相互印证|方法|档案;日记;印证
018.蒋介石与胡适密件之一.txt|22|私人档案可以检验公开回忆|方法|档案;回忆;检验
019.蒋介石与胡适密件之二.txt|8|互相冲突的史料必须存疑|方法|史料;冲突;存疑
019.蒋介石与胡适密件之二.txt|9|腐败局势不能靠个人挽救|政治|腐败;个人;局势
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
if (bodySourceFiles.length !== 20) {
  throw new Error(`Expected 20 body source files, found ${bodySourceFiles.length}`);
}
const sourceParagraphCount = bodySourceFiles
  .reduce((count, fileName) => count + readParagraphs(fileName).length, 0);
if (sourceParagraphCount !== 1335) {
  throw new Error(`Expected 1335 source paragraphs, found ${sourceParagraphCount}`);
}
const records = buildRecords();
if (records.length !== 148) {
  throw new Error(`Expected 148 records, found ${records.length}`);
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
    note: '本轮从《胡适与我》的自序和十九篇正文中提取思想索引。全书含诗作、信件、胡适日记、私信、档案与大段他人原文；本轮只保留李敖自己的判断、论证、史料辨析、人物评价、文化批评与法权分析，不把胡适、傅斯年、蔡元培等被引人物的独立意见计为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
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
  '- 只提取李敖自己的判断、论证、史料辨析、人物评价、文化批评和法权分析。',
  '- 胡适日记、私人书信、诗文、档案和其他人物原文，不因观点完整而独立列为李敖思想。',
  '- 李敖对引文作出明确评价、反驳或方法说明的段落可以保留，标题只指向李敖的判断。',
  '- 诗作只保留能够脱离祝寿语境独立检索的判断句，不按诗行密集收录。',
  '- 提取轮适度展开同题的不同证据和论证层面，供校对轮再做删减和重新编号。',
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
