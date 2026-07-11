import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '118';
const bookTitle = '蒋介石研究五集';
const slug = 'chiang-kai-shek-research-fifth-series';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '020.蒋介石研究五集');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
序|2|查禁愈烈反而促成持续出版|人格|查禁;出版;回应
序|5|行政密函可追究妨害自由责任|法权|行政密函;妨害自由;公务员
序|6|面对言论钳制应立即以出版回应|写作|言论钳制;出版;回应
001|5|历史措辞会制造唯一共患难者的假象|写作|历史措辞;唯一战友;假象
001|7|曲笔写史常出于谄媚权力|写作|曲笔;谄媚;权力
001|8|领袖宣传会让其他历史参与者淡出|写作|领袖宣传;历史参与者;淡出
001|15|生花妙笔也会制造误导性历史图像|写作|生花妙笔;历史图像;误导
001|17|突出一人功劳不该抹杀更久参与者|人格|功劳;参与者;抹杀
001|19|新传记也可能延续捏造历史|写作|传记;捏造历史;歌功颂德
002|2|权力改写革命史常用抹杀法|写作|革命史;抹杀;丑化
002|3|抹杀丑化的写史套路会扩散到异己|写作|异己;抹杀;丑化
002|22|高压环境会让知情者不敢为历史辩护|政治|高压;知情者;历史辩护
002|25|电报原文可以厘清战争责任|方法|电报;战争责任;厘清
002|32|名义指挥权不能遮蔽实际遥控者责任|方法|名义指挥;实际遥控;责任
002|44|自己无法做到的部署不能反过来苛责他人|人格|部署;苛责;双重标准
002|50|直接遥控者应承担贻误军机的责任|政治|直接遥控;军机;责任
002|54|官方叙事可能把嫡系失误转嫁给杂牌军|写作|官方叙事;嫡系;责任转嫁
002|62|当事将领回忆可以校正败战责任|方法|将领回忆;败战;责任
002|97|按命令时间线可以拆穿撤退叙事|方法|命令时间线;撤退;反证
003|3|失败政党惯于把败因推给他人|政治|败因;归责;张学良
003|18|事件后果不能取代真实因果关系|方法|事件后果;因果关系;西安事变
003|21|互相矛盾的官方记载会反证宣传说法|方法|官方记载;矛盾;反证
003|22|内部困难不能全部归因于外部事件|政治|内部困难;外部事件;归因
003|29|公开反共不代表没有秘密接触|政治|公开立场;秘密接触;国共
003|69|家乡沦陷者不愿继续打内战并非无理|人格|家乡沦陷;内战;东北军
003|136|接触时间表可以检验政治合作起点|方法|时间表;政治接触;合作
003|138|既有合作协议会削弱预谋事变之说|方法|合作协议;预谋;西安事变
003|141|事发后的震惊反应可以反证事前合谋|方法|震惊反应;事前合谋;反证
003|156|秘密依赖苏联最终付出蒙古代价|政治|苏联;秘密合作;蒙古
003|177|不知双方已有密谈使张学良成为天真中间人|人格|密谈;张学良;天真
003|207|政治合作扩大时促成者反而失去自由|法权|政治合作;张学良;自由
003|249|爱国苦衷连政敌阵营也可能承认|人格|爱国;苦衷;政敌
004|4|公开路线和秘密路线可以完全相反|政治|公开路线;秘密路线;国共
004|7|主动接触方应由往来证据确定|方法|主动接触;往来证据;国共
004|13|事变前已大致谈妥合作就不能归功于事变|方法|合作;事变;时间关系
004|14|挪动史实日期是一种曲笔辩护|写作|日期;曲笔;辩护
004|18|同一材料中的多处日期可以互相校验|方法|日期;材料;校验
004|22|历史解释不能违反基本常识|方法|历史解释;常识;检验
004|23|引用材料不能得出与材料相反的结论|方法|材料;结论;反向解释
004|24|历史研究不可曲解史料迎合钦定标准|方法|历史研究;曲解史料;钦定标准
005|3|不抵抗责任不能只让张学良独负|政治|不抵抗;责任;张学良
005|10|把共同责任全推给一人是蓄意伤害|人格|共同责任;替罪羊;伤害
005|16|政治真相可能连第一线军官都被蒙蔽|政治|政治真相;军官;蒙蔽
005|30|时间记录可以拆穿桃色谣言|方法|时间记录;桃色谣言;胡蝶
005|34|传播敌方谣言会暴露写作者的双重标准|写作|敌方谣言;双重标准;写作者
005|41|权力可以一面归罪一面长期禁锢|法权|归罪;禁锢;张学良
005|44|受限当事人的证据无法公开会固化替罪叙事|方法|当事证据;公开;替罪叙事
005|52|迟出的行踪证据可以洗刷旧日谣言|方法|行踪证据;谣言;澄清
005|53|囚禁后再造谣是政治宣传的不公|写作|囚禁;造谣;政治宣传
005|66|被长期禁锢者无法澄清自己的历史污名|法权|长期禁锢;历史污名;澄清
005|69|为名声保持沉默可能牺牲他人名誉|人格|沉默;名声;他人名誉
006|9|同一事件应以不同当事人叙述互证|方法|当事人叙述;互证;西安事变
006|10|对照直接证言可以拆穿临危不乱的自塑|方法|直接证言;对照;自我塑造
006|11|细节差异可以检验领袖自传的英雄姿态|方法|细节差异;领袖自传;英雄姿态
006|12|动作细节能校正经过修饰的个人叙事|方法|动作细节;个人叙事;校正
006|13|行动过程可以揭露被省略的狼狈|方法|行动过程;省略;狼狈
006|14|完整对话能还原领袖受制时的情绪|方法|完整对话;领袖;情绪
006|15|后续在场证言可以纠正提前离场之说|方法|在场证言;离场;纠正
006|16|恐惧反应可以反证视死如归的自述|方法|恐惧反应;自述;反证
006|17|多点对照会显出自我英雄化的整体失真|写作|多点对照;英雄化;失真
007|2|经领袖核定的战史应由领袖共同负责|政治|核定;战史;责任
007|5|让敌人炸堤阻挡自己违反战争常识|方法|炸堤;战争常识;矛盾
007|7|花园口决堤是中国统治者主动造成的惨事|政治|花园口;决堤;责任
007|15|洪水不会只伤敌人不伤百姓|知识|洪水;百姓;战争
007|28|宣传会把大规模平民灾难缩成轻微代价|写作|宣传;平民灾难;花园口
007|41|同一宣传对阻敌时长说法不一|方法|阻敌时长;宣传;矛盾
007|43|巨大民众代价不能由短暂备战时间辩护|政治|民众代价;备战;辩护
007|46|以洪水阻敌本身也需要事前准备|知识|洪水阻敌;准备;军事
007|47|互相冲突的决堤说法可以追出命令责任|方法|决堤;冲突说法;命令
007|80|死亡数字和零伤亡宣传不能并存|写作|死亡数字;零伤亡;宣传
007|93|伤害人民的政权最终也会被自己的政策淹没|政治|人民;政权;花园口
008|2|掘堤淹敌却多淹同胞是统治无能|政治|掘堤;同胞;无能
008|4|地理位置和日期足以拆穿阻止开封之说|方法|地理位置;日期;开封
008|7|巨大平民代价若无阻敌效果更不可辩护|政治|平民代价;阻敌效果;决堤
009|2|尚未完成法律手续不能算正式废约|法权|法律手续;废约;教科书
009|17|条约文本必须与实施真相相互核对|方法|条约文本;实施;核对
009|26|关键领土未解决仍签约是外交屈服|政治|九龙;签约;外交
009|28|九龙未收回证明所谓完全废约不成立|法权|九龙;完全废约;主权
009|30|为争最早废约而改动日期是窜改历史|写作|废约日期;窜改历史;教科书
009|31|宣布与签约必须严格区分|法权|宣布;签约;法律效力
009|39|伪政权更早收回法租界会削弱官方功劳叙事|政治|伪政权;法租界;功劳
009|41|废除不平等条约并非国民党首先完成|政治|不平等条约;军阀;先后
009|43|参加世界大战可以提高弱国国际地位|政治|世界大战;国际地位;外交判断
009|47|时间对照可以戳破首创平等新约的宣传|方法|时间对照;平等新约;宣传
009|52|后订条约不能抹去前政府的外交成果|政治|条约;前政府;外交成果
009|58|先知蒙古重要却在执政后失去蒙古最为讽刺|人格|蒙古;执政;讽刺
009|59|政治吹牛经不起历史核对|方法|政治吹牛;历史;核对
009|61|被骂卖国的军阀在外交上未必不如国民党|政治|军阀;外交;国民党
009|71|外交评价应看到被忽略的细部努力|方法|外交评价;细部;租界
009|76|让职业外交家自主办事能使弱国外交有效|政治|职业外交家;自主;弱国外交
009|78|追求真相必须反驳政党垄断的历史解释|人格|真相;历史解释;政党
009|87|既有归还先例使拒还九龙的理由站不住脚|方法|归还先例;九龙;检验
009|89|列强战时放弃已失特权只是顺水人情|政治|列强;特权;顺水人情
009|94|重签已宣布失效的旧权利会自失法律立场|法权|旧权利;重签;法律立场
009|97|第一次平等新约并非国民党所订|知识|平等新约;国民党;史实
009|100|第二次平等互惠条约也早于国民党|知识|平等互惠;条约;史实
009|117|军阀也可能尊重中央和异己法官|人格|军阀;中央;异己法官
009|120|新造不平等条约不只中苏条约一件|法权|不平等条约;中苏;中美
010|51|废约行动晚于伪政权却被教科书改早|写作|废约;伪政权;教科书
010|52|宣布早不等于正式签约早|法权|宣布;签约;废约
010|53|承认维琪政府使国民党在法租界问题上被动|政治|维琪政府;法租界;外交
010|54|多方证言可以追查九一八不抵抗命令|方法|九一八;不抵抗命令;证言
010|56|禁言抗日暴露热河失守的责任|政治|热河;抗日;责任
010|57|割地类比也须比较所得与代价|方法|割地;类比;所得代价
010|58|研究尚未完成时应承认论列有限|写作|研究;未完成;论列
011|5|用苏联换取支持却失去蒙古是失败交易|政治|苏联;蒙古;外交交易
011|12|领袖自认责任可以否定替人卸责|方法|领袖自认;责任;反证
011|14|外交错误应在条件成熟时及时纠正|政治|外交错误;纠正;时机
011|17|对方违约后拖延废约是政治失职|政治|违约;拖延;废约
011|19|随美国态度行动不能改变既成损失|政治|美国;外交行动;既成损失
011|20|为避免否决而弃权仍是放弃权利|法权|弃权;否决权;蒙古
011|22|反复自认负责说明外交失败无法卸责|人格|自认负责;外交失败;卸责
012|4|侵略战争须追查早期组织和策划者|方法|侵略战争;策划;冈村宁次
012|19|战争必胜口号终会被失败事实收拾|写作|必胜口号;失败;战争
012|21|亲日关系可能使侵略元凶逃过审判|法权|亲日;侵略元凶;审判
012|38|战犯判决若抹去侵略策划就是开脱|法权|战犯;侵略策划;判决
012|41|既称劳绩赎罪就反证原本有罪|方法|劳绩赎罪;有罪;反证
012|43|奉命投降不能成为免除战犯罪责的劳绩|法权|投降;战犯罪责;劳绩
012|85|优先遣返侵略者却牺牲同胞是政治失格|政治|遣返;侵略者;同胞
012|92|失去国土后仍替侵略将领服务到底|政治|侵略将领;服务;国土
012|94|国家机器会继续替侵略者解除政治限制|政治|国家机器;侵略者;政治限制
012|96|对异己严酷而对侵略者宽大是统治者怪象|人格|异己;侵略者;宽大
012|105|战犯处理数字可以揭露系统性放水|方法|战犯;统计;放水
012|111|审判前已私下许诺无罪会掏空司法|法权|私下许诺;无罪;司法
013|6|面对查禁可以转而研究被禁主题|写作|查禁;研究;回应
013|9|政治宣传会批量制造活烈士|文化|政治宣传;烈士;将领
013|24|鼓吹殉国者自己寿终正寝是政治反讽|人格|殉国;寿终正寝;反讽
013|25|系统列举可以检验烈士宣传的真实性|方法|列举;烈士宣传;检验
013|29|大量被俘将领反证军人殉节神话|方法|被俘将领;殉节;反证
014|3|理解特务人物须追踪其组织系统|方法|特务;组织系统;康泽
014|27|自由学人身份也须核查特务经历|方法|自由学人;特务经历;徐复观
014|36|刻意装聋可能暗示真相不可公开|方法|装聋;真相;郭勋祺
014|40|逃难者无权苛责别人未能殉难|人格|逃难者;殉难;双重标准
014|44|烈士样板需求会预先设想人物死亡|文化|烈士样板;死亡;宣传
014|56|较早获释可以反证所谓被俘不屈|方法|获释;被俘不屈;反证
014|57|典故不能用来暗示不存在的殉难|写作|典故;殉难;误导
014|58|现实影像会击破被俘不屈的宣传形象|方法|现实影像;宣传形象;康泽
015|3|降将获祭而后投降会使烈士叙事破产|文化|降将;烈士叙事;洪承畴
015|8|内定烈士未能殉节会暴露政权尴尬|文化|烈士;殉节;政权
015|11|军事训诫也会反衬亲信未得真传|写作|军事训诫;亲信;反衬
016|3|保存文件并加导读可留给后人理解政治|写作|保存文件;导读;政治
016|8|政治力量不足时孤注组党难以成功|政治|政治力量;组党;雷震
016|12|钳制言论的公文会成为钳制本身的铁证|法权|钳制言论;公文;铁证
016|45|会面规格变化可以显示政治疏远|方法|会面规格;政治疏远;胡适
016|46|简短日记也能画出权力对知识人的冷落|写作|日记;权力;冷落
016|47|判决已内定时军法司法之争失去意义|法权|内定判决;军法;司法
016|48|私人日记中的删名可以反推预期读者|方法|私人日记;删名;预期读者
016|50|有地位的知识人只做调人难以挽救政治受害者|人格|知识人;调人;政治受害者
`.trim();

function sourceFiles() {
  return fs.readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt') && !name.includes('目录'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)))
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function parseSpecs(allSourceFiles) {
  return specLines.split(/\n+/).map((line, index) => {
    const [fileToken, paragraphText, title, category, keywordText, ...extra] = line.split('|');
    if (extra.length || !fileToken || !paragraphText || !title || !category || !keywordText) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    if (!categorySet.has(category)) throw new Error(`Invalid category: ${category}`);
    const matches = fileToken === '序'
      ? allSourceFiles.filter((name) => name.includes('自序'))
      : allSourceFiles.filter((name) => name.startsWith(`${fileToken}.`));
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
  const text = Array.isArray(value) ? value.join(';') : String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath, records) {
  const headers = ['id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  const rows = [headers.join(','), ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(','))];
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [`# ${bookTitle}思想索引（${round}）`, '', `- 书名：${bookTitle}`, `- 条目：${records.length}`, '- 说明：标题用于检索浓缩，description 保留源文原段落。', ''];
  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`, '');
    for (const item of items) {
      lines.push(`### ${item.id} ${item.title}`, '', `出处：${item.source_file}#${item.source_paragraph}`, `关键词：${item.keywords.join('、')}`, '', item.description, '');
    }
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeTxt(filePath, records) {
  const blocks = records.map((record) => [
    `${record.id}｜${record.category}｜${record.title}`,
    record.description,
    `出处：${record.source_file}#${record.source_paragraph}`,
  ].join('\n'));
  fs.writeFileSync(filePath, `${blocks.join('\n\n---\n\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter(({ count }) => count > 0);
}

const allSourceFiles = sourceFiles();
if (allSourceFiles.length !== 17) throw new Error(`Expected 17 source files, found ${allSourceFiles.length}`);
const paragraphMap = new Map(allSourceFiles.map((name) => [name, paragraphs(name)]));
const sourceParagraphCount = [...paragraphMap.values()].reduce((sum, items) => sum + items.length, 0);
if (sourceParagraphCount !== 1224) throw new Error(`Expected 1224 paragraphs, found ${sourceParagraphCount}`);

const specs = parseSpecs(allSourceFiles);
const candidates = specs.map((spec) => {
  const description = paragraphMap.get(spec.fileName)[spec.source_paragraph - 1];
  if (!description) throw new Error(`Missing paragraph: ${spec.fileName}#${spec.source_paragraph}`);
  if (spec.source_paragraph === 1 || /李敖影音E书|李敖数字博物馆|资源下载站|油管\/抖音/.test(description)) {
    throw new Error(`Selected structural paragraph: ${spec.fileName}#${spec.source_paragraph}`);
  }
  return { ...spec, description, source_path: path.join(sourceBookDir, spec.fileName) };
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
      reason: '与既有总表源段落完全相同，本轮不重复提取。',
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

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    sequence,
    title: bookTitle,
    slug,
    sourceDir: sourceBookDir,
    round,
    status,
    note: '本轮只提取李敖自序、文章及答函中可独立检索的史料方法、政治、法权、人格、文化、写作与知识判断。车之鉴来信、蒋介石及其他当事人原文、官方文件、他人回忆、编辑按语和长篇引文只作证据，不直接转列为李敖思想。标题用于检索浓缩，description 保留源文原段落。',
    source_file_count: allSourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
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
  `# ${bookTitle}提取说明`, '',
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 源目录：${sourceBookDir}`,
  `- 源文件：${allSourceFiles.length}`,
  `- 源段落：${sourceParagraphCount}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 保留李敖本人明确表达、可脱离单一史实独立检索的史料批评、宣传拆解、法权辨析、权力责任及人格判断。',
  '- 车之鉴来信、蒋介石及其他当事人原文、官方文件、他人回忆、编辑按语和长篇引文只作证据，不把被引作者的判断记在李敖名下。',
  '- 提取轮适度保留不同证据路径，待校对轮再合并重复方法或过度依赖单一事例的条目。',
  '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
  '- 标题用于检索浓缩；description 保留源文原段落。', '',
  '## 重复来源', '',
  ...(skippedDuplicates.length
    ? skippedDuplicates.map((item) => `- ${item.source_file}#${item.source_paragraph} = ${item.previous_book} ${item.previous_id}`)
    : ['- 无']), '',
  '## 分类统计', '',
  ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  candidates: candidates.length,
  records: records.length,
  source_file_count: allSourceFiles.length,
  source_paragraph_count: sourceParagraphCount,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
