import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '107';
const bookTitle = '陈水扁的真面目';
const slug = 'the-truth-about-chen-shui-bian';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '009.陈水扁的真面目');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specLines = `
《陈水扁的真面目》引言.txt|4|小人物也可以成为警世研究的样本|方法|人物研究;警世;样本
《陈水扁的真面目》引言.txt|5|有限选项会迫使选民选择较小危害|政治|选举;有限选项;危害
《陈水扁的真面目》引言.txt|6|投错票可能招来国家灾祸|政治|投票;国家灾祸;证据
012.陈水扁就会这样！.txt|5|反对党也会复制破坏议会规格的坏习惯|政治|反对党;议会规格;坏习惯
012.陈水扁就会这样！.txt|6|假民主会远离真正的民主政治|政治|假民主;民主政治;台湾
012.陈水扁就会这样！.txt|7|权力会任意改写民主字眼的含义|写作|政治语言;民主;权力
012.陈水扁就会这样！.txt|8|民主是一种生活教养和风度|文化|民主;生活方式;风度
012.陈水扁就会这样！.txt|9|反对威权不等于自己具备民主|政治|反对党;威权;民主
012.陈水扁就会这样！.txt|10|粗暴抗争会先摧毁民主|政治|粗暴抗争;民主;革命
012.陈水扁就会这样！.txt|11|民主规范也来自不成文的法律精神|法权|民主规范;不成文规范;法律精神
012.陈水扁就会这样！.txt|12|明知规范仍破格是风度问题|人格|规范;破格;风度
012.陈水扁就会这样！.txt|13|未明文禁止不等于可以破坏规范|法权|明文规则;规范;自我反省
012.陈水扁就会这样！.txt|14|规则不可能穷尽所有常识|法权|规则;常识;列举
012.陈水扁就会这样！.txt|15|政治人物应把犀利和从容结合|人格|政治人物;犀利;从容
013.学者不可曲学阿世阿“阿扁”.txt|4|敌人不正当不能为自己的不择手段辩护|人格|敌人;不择手段;制度
013.学者不可曲学阿世阿“阿扁”.txt|5|为目的不择手段是政治悲剧的根源|政治|目的;手段;政治悲剧
013.学者不可曲学阿世阿“阿扁”.txt|7|目的正当不保证手段正当|方法|目的;手段;正当
013.学者不可曲学阿世阿“阿扁”.txt|8|正当目的不能使不正当手段正当|方法|正当目的;不正当手段;原则
013.学者不可曲学阿世阿“阿扁”.txt|9|不正当手段会污染正当目的|方法|手段;目的;污染
013.学者不可曲学阿世阿“阿扁”.txt|10|为了目的不择手段是谬误|方法|目的;手段;谬误
013.学者不可曲学阿世阿“阿扁”.txt|16|反对者抛弃手段原则会自我堕落|人格|反对者;手段原则;自我堕落
013.学者不可曲学阿世阿“阿扁”.txt|17|政治胜利也应堂堂正正|人格|政治胜利;堂堂正正;亚历山大
015.陈水扁抄人家七年前的.txt|3|政策抄袭会暴露思想不成熟|政治|政策;抄袭;不成熟
016.陈水扁给李大哥的信.txt|6|政治地位会使人变得势利现实|人格|政治地位;势利;现实
017.阿扁心胸太狭窄了！.txt|4|国家领导者不应以籍贯划圈|政治|国家领导者;籍贯;台南
018.为阿扁论李敖的谈话进一解.txt|4|打击敌人不能歪曲真相|方法|敌人;歪曲;真相
019.去他妈的二二八公园！.txt|2|是非不应由族群立场决定|人格|是非;族群;立场
019.去他妈的二二八公园！.txt|3|公共纪念不能选择性抹杀不利史实|文化|公共纪念;史实;族群
020.阿扁骗选票，敢说不敢做.txt|4|预言和平交权必须等到事实发生|方法|和平交权;事实;核验
020.阿扁骗选票，敢说不敢做.txt|5|未来承诺不能在期限前当成事实|方法|未来承诺;期限;事实
020.阿扁骗选票，敢说不敢做.txt|7|后人不了解会使历史遭到改写|方法|历史;改写;不了解
020.阿扁骗选票，敢说不敢做.txt|10|政治命令修改教科书会扭曲历史|文化|政治命令;教科书;历史
020.阿扁骗选票，敢说不敢做.txt|14|政治需要会改变人物籍贯|政治|政治需要;籍贯;认同
020.阿扁骗选票，敢说不敢做.txt|17|历史被扭曲时更需要敢说真话|人格|历史;真话;勇气
020.阿扁骗选票，敢说不敢做.txt|20|竞选承诺可能在外部压力下不兑现|政治|竞选承诺;外部压力;兑现
020.阿扁骗选票，敢说不敢做.txt|22|政治团结口号也可能暗含排除|政治|政治团结;族群;排除
020.阿扁骗选票，敢说不敢做.txt|24|无族群承诺必须用实际言论核验|方法|族群承诺;言论;核验
020.阿扁骗选票，敢说不敢做.txt|25|政治继承宣称可以揭示权力联盟|方法|政治继承;权力联盟;约书亚
020.阿扁骗选票，敢说不敢做.txt|26|崇高自由口号可能被卖给财阀|政治|自由口号;财阀;谄媚
020.阿扁骗选票，敢说不敢做.txt|28|资源分配失衡可能隐藏利益交换|方法|资源分配;利益交换;财团
020.阿扁骗选票，敢说不敢做.txt|29|公开尊严口号可能掩盖私下交易|政治|公开口号;私下交易;两岸
020.阿扁骗选票，敢说不敢做.txt|30|政见来源应接受旧资料核验|方法|政见;旧资料;核验
020.阿扁骗选票，敢说不敢做.txt|31|政策白皮书应先核查现行法律|方法|政策白皮书;现行法律;核查
020.阿扁骗选票，敢说不敢做.txt|32|剪彩不能冒充长期建设功劳|政治|剪彩;建设;功劳
021.民主政治不能贵族.txt|3|官商结合会在民主中制造新贵族|政治|官商结合;民主;新贵族
021.民主政治不能贵族.txt|4|政党对辩论的标准会随身份翻转|政治|政党;辩论;双重标准
021.民主政治不能贵族.txt|5|民主辩论不能分贵族和平民|政治|民主辩论;贵族;平民
023.吕秀莲被逼供了吗？.txt|2|政治受难身份不能靠自传包装|写作|政治受难;自传;包装
023.吕秀莲被逼供了吗？.txt|3|公开笔录可以检验逼供叙述|方法|公开笔录;逼供;检验
023.吕秀莲被逼供了吗？.txt|4|还原历史必须对照当时文证|方法|历史;当时文证;还原
024.“台湾之子”又来骗我们了！.txt|2|政治宣传书不应说谎|写作|政治宣传书;说谎;台湾之子
024.“台湾之子”又来骗我们了！.txt|3|政治犯身份必须与案件性质相符|法权|政治犯;案件性质;诽谤
024.“台湾之子”又来骗我们了！.txt|4|刑期矛盾可以揭示叙事欺骗|方法|刑期;矛盾;叙事
024.“台湾之子”又来骗我们了！.txt|5|公开拒绝上诉不能与秘密上诉并存|人格|拒绝上诉;秘密上诉;诚信
024.“台湾之子”又来骗我们了！.txt|6|朋友也应公开指出政治欺骗|人格|朋友;公开批评;政治欺骗
024.“台湾之子”又来骗我们了！.txt|68|政治反复源于根性和准备不足|人格|政治反复;根性;准备
024.“台湾之子”又来骗我们了！.txt|70|配偶独立上诉不应违背自由被告的明示意志|法权|配偶上诉;明示意志;法理
024.“台湾之子”又来骗我们了！.txt|75|亲人保护不能扯崇高行动的后腿|人格|亲人;保护;崇高行动
024.“台湾之子”又来骗我们了！.txt|77|行动者不坚定也会导致亲人动摇|人格|行动者;坚定;亲人
024.“台湾之子”又来骗我们了！.txt|78|判断行动应看它实际符合谁的利益|方法|行动;实际利益;判断
024.“台湾之子”又来骗我们了！.txt|80|形式上保护被告的程序可能实际有利政权|法权|法律程序;被告利益;政权
024.“台湾之子”又来骗我们了！.txt|82|原则之爱不能以姑息使人犯错|人格|原则;爱;姑息
024.“台湾之子”又来骗我们了！.txt|114|公共讨论应共同追求至善|人格|公共讨论;至善;批评
024.“台湾之子”又来骗我们了！.txt|116|误解反对不应使人停止说真话|人格|误解;反对;真话
024.“台湾之子”又来骗我们了！.txt|117|政治道德不能止于善|人格|政治道德;善;至善
024.“台湾之子”又来骗我们了！.txt|118|以爱为名的保护可能使人背叛原原则|人格|保护;原原则;背叛
024.“台湾之子”又来骗我们了！.txt|119|朋友利益冲突人民利益时应选择人民|政治|朋友利益;人民利益;选择
024.“台湾之子”又来骗我们了！.txt|120|政治反对运动常混淆小义与大义|人格|反对运动;小义;大义
025.陈水扁迟来的抄袭.txt|3|单向利益共享必须建立在互易上|政治|单向直航;利益共享;互易
025.陈水扁迟来的抄袭.txt|4|政策来源应追溯更早资料|方法|政策来源;旧资料;追溯
025.陈水扁迟来的抄袭.txt|5|政策条件会随力量变化失效|政治|政策条件;力量变化;失效
025.陈水扁迟来的抄袭.txt|6|过时抄袭已经失去政策价值|政治|抄袭;时机;政策价值
026.陈水扁挑二二八.txt|2|受害情感不能授权背离历史真相|方法|受害情感;历史真相;公道
026.陈水扁挑二二八.txt|3|纪念展示不能以伪造录音充当证据|方法|纪念馆;伪造录音;证据
026.陈水扁挑二二八.txt|4|历史纪念不能选择性书写族群暴力|文化|历史纪念;族群暴力;选择性
027.陈水扁公正吗？.txt|3|历史报告不能只记录一方暴力|方法|历史报告;一方暴力;公正
027.陈水扁公正吗？.txt|4|报告附录和正文应遵守同一证据标准|方法|报告附录;正文;证据标准
027.陈水扁公正吗？.txt|5|公共纪念实体会强化选择性历史|文化|公共纪念;选择性历史;族群
028.陈水扁政见是谎话.txt|23|政府不得故意歪曲法令保护特权|法权|政府;歪曲法令;特权
030.陈水扁勇敢吗？.txt|2|勇敢形象必须接受行动记录检验|方法|勇敢形象;行动记录;检验
030.陈水扁勇敢吗？.txt|3|公开拒绝上诉与秘密上诉不能同时算勇敢|人格|公开拒绝;秘密上诉;勇敢
030.陈水扁勇敢吗？.txt|4|没有额外坐牢风险仍退缩不算勇敢|人格|坐牢风险;组党;勇敢
030.陈水扁勇敢吗？.txt|5|错失政治时机反映判断不足|方法|政治时机;判断;组党
`.trim();

const skippedDuplicates = [
  ['014.陈水扁与“单向直航”.txt', 3, '李敖放电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '001.李敖放电集'), '004.1999年11月3日.txt', 18],
  ['017.阿扁心胸太狭窄了！.txt', 3, '李敖放电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '001.李敖放电集'), '022.1999年11月29日.txt', 4],
  ['018.为阿扁论李敖的谈话进一解.txt', 3, '李敖发电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '002.李敖发电集'), '004.1999年12月6日.txt', 4],
  ['020.阿扁骗选票，敢说不敢做.txt', 12, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '011.2000年2月21日.txt', 5],
  ['020.阿扁骗选票，敢说不敢做.txt', 16, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '011.2000年2月21日.txt', 9],
  ['020.阿扁骗选票，敢说不敢做.txt', 23, '李敖演讲集', path.join('《大李敖全集6.0》分章节', '010.节目演讲类', '011.李敖演讲集'), '030.20000116李敖苗栗演讲.txt', 27],
  ['021.民主政治不能贵族.txt', 2, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '010.2000年2月18日.txt', 10],
  ['022.陈水扁太可耻了！.txt', 3, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '012.2000年2月22日.txt', 4],
  ['022.陈水扁太可耻了！.txt', 5, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '012.2000年2月22日.txt', 6],
  ['028.陈水扁政见是谎话.txt', 46, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '045.2000年4月7日.txt', 23],
  ['028.陈水扁政见是谎话.txt', 82, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '046.2000年4月10日.txt', 17],
  ['028.陈水扁政见是谎话.txt', 89, '李敖送电集', path.join('《大李敖全集6.0》分章节', '011.李敖电子报', '003.李敖送电集'), '046.2000年4月10日.txt', 23],
].map(([source_file, source_paragraph, previous_book, previous_source_dir, previous_source_file, previous_source_paragraph]) => ({
  source_file,
  source_paragraph,
  previous_book,
  previous_source_dir,
  previous_source_file,
  previous_source_paragraph,
  reason: '与既有总表源段落完全相同，本轮不重复提取',
}));

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
if (bodySourceFiles.length !== 32) throw new Error(`Expected 32 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 1022) throw new Error(`Expected 1022 paragraphs, found ${sourceParagraphCount}`);

const liAoSourceFiles = bodySourceFiles.filter((name) => {
  if (name.includes('引言')) return true;
  const match = name.match(/^(\d{3})\./);
  return match && Number(match[1]) >= 12;
});
if (liAoSourceFiles.length !== 20) throw new Error(`Expected 20 Li Ao files, found ${liAoSourceFiles.length}`);
const liAoParagraphCount = liAoSourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (liAoParagraphCount !== 470) throw new Error(`Expected 470 Li Ao-file paragraphs, found ${liAoParagraphCount}`);
const excludedThirdPartyFiles = bodySourceFiles.filter((name) => !liAoSourceFiles.includes(name));
if (excludedThirdPartyFiles.length !== 12) throw new Error(`Expected 12 third-party files, found ${excludedThirdPartyFiles.length}`);

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
const owned = new Set(liAoSourceFiles);
const cache = new Map();
const records = parseSpecs().map((spec, index) => {
  if (!available.has(spec.fileName)) throw new Error(`Missing source file: ${spec.fileName}`);
  if (!owned.has(spec.fileName)) throw new Error(`Third-party file selected: ${spec.fileName}`);
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

if (records.length !== 83) throw new Error(`Expected 83 records, found ${records.length}`);
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
    note: '本轮只从李敖撰写的引言与第十二至第三十篇中提取思想判断。李庆元署名的前言及前十一章共十二个文件作为调查材料排除，不把其中的财产调查、政治判断或新闻分析转列为李敖思想。李敖文章中又混有邓维桢、陈锡福、林美伦、武之璋的文章、访谈、陈情书、新闻稿和公文，本轮只取李敖本人明确评论、证据判断、制度分析及价值结论的完整段落。另有十二段与既有总表源文完全相同，经逐字校验后跳过。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    li_ao_source_file_count: liAoSourceFiles.length,
    li_ao_file_paragraph_count: liAoParagraphCount,
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: skippedDuplicates.length,
    skipped_duplicates: skippedDuplicates,
    excluded_third_party_files: excludedThirdPartyFiles,
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
  `- 李敖署名范围文件数：${liAoSourceFiles.length}`,
  `- 李敖署名范围段落数：${liAoParagraphCount}`,
  `- 排除的李庆元署名文件数：${excludedThirdPartyFiles.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的实质段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖自己的民主观、目的手段论、历史方法、司法解释、政治伦理、身份政治和人格判断。',
  '- 李庆元署名的前言及前十一章整体排除，不把其财产调查、政治判断或新闻分析转列为李敖思想。',
  '- 李敖文章中的邓维桢、陈锡福、林美伦、武之璋文章、访谈、陈情书、新闻稿和公文，只在李敖明确评论、反驳或归纳的完整段落中随文保留。',
  '- 单纯骂人、交往叙述、长篇被引文件和宣传附注不建项。',
  '- 与《李敖放电集》《李敖发电集》《李敖送电集》《李敖演讲集》既有条目逐字相同的十二段只记录来源，不在总表重复建项。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文本原段落。', '',
  '## 排除文件', '',
  ...excludedThirdPartyFiles.map((name) => `- ${name}`), '',
  '## 分类统计', '',
  ...payload.book.category_counts.map(({ category, count }) => `- ${category}: ${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  records: records.length,
  source_file_count: bodySourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  li_ao_source_file_count: liAoSourceFiles.length,
  li_ao_file_paragraph_count: liAoParagraphCount,
  excluded_third_party_file_count: excludedThirdPartyFiles.length,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
