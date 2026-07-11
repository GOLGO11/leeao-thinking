import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '117';
const bookTitle = '蒋介石研究四集';
const slug = 'chiang-kai-shek-research-fourth-series';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '019.蒋介石研究四集');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
序|3|批评不应随一时政治目的改变|人格|批评;政治目的;一以贯之
序|5|真实画像不必美化丑陋对象|写作|真实画像;美化;人物批评
001|9|借显赫祖先争政治高下是荒唐|文化|显赫祖先;政治高下;家谱
001|14|祖谱考证也会陷入显赫竞赛|文化|祖谱;显赫;考证
001|17|革命者不必借显赫祖先抬高自己|文化|革命者;祖先;家世
002|2|大型叙事应重视资料积累|写作|大型叙事;资料积累;历史写作
002|4|持续搜集资料可提升文学史学价值|写作|搜集资料;文学价值;史学价值
002|42|想当然补叙会损害作品可信度|写作|想当然;补叙;可信度
002|60|史料考证必须覆盖反面文本|方法|史料考证;反面文本;周延
002|99|后出史料应促使旧说重审|方法|后出史料;旧说;重审
002|108|官方传记会隐去不利家史|写作|官方传记;家史;隐瞒
002|109|离奇自述可以反推被隐瞒身份|方法|自述;身份;反推
002|111|当事特务证言可提高传说可信度|方法|当事证言;特务;身世传说
002|112|个人回忆可反证钦定家世叙事|方法|个人回忆;钦定家世;反证
002|114|社会习惯资料可解释身世疑案|方法|社会习惯;身世;历史解释
002|117|社会学方法可以提出身世新解|方法|社会学;身世;新解
002|118|个人情结会被绝对权力放大|人格|个人情结;绝对权力;政治人格
003|2|钦定学历应由学校性质检验|方法|钦定学历;学校性质;检验
003|17|课程表可以还原真实教育程度|方法|课程表;教育程度;还原
003|19|修业年限必须按同时期制度核算|方法|修业年限;同时期制度;核算
003|20|有限军事教育不能证明将才|知识|军事教育;将才;教育程度
004|9|后来任职不能改写原定人选|方法|原定人选;后来任职;黄埔校长
005|3|政治法统应服从实际承认|法权|政治法统;实际承认;政府
005|14|删去共产党参与会篡改黄埔史实|写作|共产党;黄埔;史实删改
005|18|组织编制可以揭穿参与者删漏|方法|组织编制;参与者;删漏
005|26|职位权限和联名文件可验证真实参与|方法|职位权限;联名文件;参与
005|31|政治组织壮大可能依靠外援武器|政治|政治组织;外援;武器
005|33|先借外力后否认参与是历史窜改|写作|外力;否认;历史窜改
005|36|对立政党可能共享同一组织源流|政治|对立政党;组织源流;黄埔
006|2|钦定全集会重塑领袖思想面貌|写作|钦定全集;领袖思想;重塑
006|62|早期言论可以推翻终身反共形象|方法|早期言论;反共形象;反证
007|3|秘密灭门必须成为历史警戒|法权|秘密灭门;历史警戒;杨虎城
007|17|被迫内战会催生联合对手的选择|政治|内战;联合对手;东北军
007|21|命令原文可以纠正不抵抗责任归属|方法|命令原文;不抵抗;责任
007|44|多方当事资料可以验证政治承诺|方法|当事资料;政治承诺;交叉验证
007|56|行动动机应依据公开主张判断|方法|行动动机;公开主张;判断
007|62|承担风险能够显示政治人格|人格|承担风险;政治人格;张学良
007|63|自愿同行不能成为剥夺自由理由|法权|自愿同行;自由;军法审判
007|71|长期监禁不能用起用承诺粉饰|法权|长期监禁;起用承诺;自由
007|80|宽大名义可能变成无期监禁|法权|宽大;无期监禁;张学良
007|83|违背不咎既往担保是政治骗局|人格|不咎既往;担保;政治骗局
007|101|危机中自制可为善后保留余地|人格|危机;自制;善后
007|113|不问主张内容的裁决不是讲理|法权|主张内容;裁决;军纪
007|114|分化异己军队会伴随政治失信|政治|异己军队;分化;政治失信
007|121|主动赴国难仍可能遭权力设局|人格|赴国难;权力设局;杨虎城
007|123|爱国名将可被非法监禁并杀害|法权|爱国名将;非法监禁;谋杀
007|128|唯命是从会压过民族和友情|人格|唯命是从;民族;友情
007|169|掩盖罪行终会被事实揭露|方法|掩盖罪行;事实;揭露
007|170|守死不变者可能被所助政权杀害|人格|守死不变;政权;杨虎城
007|175|兵败政权仍会向异己施加报复|政治|兵败;异己;报复
007|176|保存历史记忆是对暴力的抵抗|写作|历史记忆;暴力;抵抗
007|184|御用史家会以曲笔抹去非法囚杀|写作|御用史家;曲笔;非法囚杀
008|3|高压统治会把知识人变成精神俘虏|政治|高压统治;知识人;精神俘虏
008|16|私人代表会架空正式外交机关|政治|私人代表;外交机关;架空
008|18|地下外交会为外国要挟提供方便|政治|地下外交;外国要挟;政治代理
009|9|沉默声明可以暴露高压下的禁言|方法|沉默声明;高压;禁言
009|19|知道条约卖国仍可能拒绝签字|人格|卖国条约;拒绝签字;宋子文
009|24|未参与密约的国家不受其法律拘束|法权|密约;法律拘束;国家
009|31|对方违约后仍履约是外交失职|政治|违约;履约;外交失职
009|33|违约事实成立时就应及时追责|政治|违约事实;及时追责;外交
009|35|议会起立表决可能为卖国政策背书|政治|议会表决;卖国政策;背书
009|43|无知无能又爱面子会延误外交反应|人格|无知;爱面子;外交反应
009|50|政策改弦更张也可能延续自大自卑|人格|政策;自大;自卑
009|89|卖国者受恩宠会摧毁政治公道|政治|卖国者;恩宠;政治公道
009|97|政党不应以爱国之名倒置卖国责任|写作|爱国;卖国责任;倒置
009|98|长期统治会摧毁社会评价标准|文化|长期统治;评价标准;社会
009|110|后见之明不能卸除当初受骗责任|人格|后见之明;受骗责任;外交
010|3|揭露卖国须追到决策参与者|方法|卖国;决策参与者;追责
010|35|外部压力不能成为超额让步借口|政治|外部压力;超额让步;外交
010|37|保留宗主权仍被放弃属于加码让步|政治|宗主权;加码让步;外蒙古
010|39|公民投票可能沦为卸责文章|政治|公民投票;卸责;外蒙古
010|65|观察员身份可被用来规避监督责任|法权|观察员;监督责任;投票
010|76|领土投票应由本国政府依法监督|法权|领土投票;政府;依法监督
010|77|只准参观不得干涉是奉命放水|政治|参观;不得干涉;放水
010|78|封锁投票报告可以掩盖虚假程序|写作|投票报告;虚假程序;封锁
010|80|官方回忆可揭露投票数字假象|方法|官方回忆;投票数字;假象
010|90|预知民意反对会催生遮盖手法|政治|民意反对;遮盖;卖国
011|18|武装特务组织会以民众工作扩张权力|政治|武装特务;民众工作;权力
011|19|自由学人身份也须核查特务经历|方法|自由学人;特务经历;核查
011|39|装聋沉默可能暗示真相不可公开|方法|装聋;沉默;真相
011|43|逃难者无权苛责别人未能殉难|人格|逃难者;殉难;双重标准
011|47|理解政治组织须追踪混合意识形态|方法|政治组织;意识形态;追踪
011|50|临难死节标准会排斥被俘者|文化|临难死节;被俘者;标准
011|51|烈士崇拜会先制造死亡叙事|文化|烈士崇拜;死亡叙事;宣传
011|53|烈士稀缺会降低史实审查标准|写作|烈士稀缺;史实审查;谣言
011|59|典故不能用来暗示不存在的殉难|写作|典故;殉难;误导
012|10|官方讣告会把自杀改写为病逝|写作|官方讣告;自杀;病逝
012|17|反宣传也可能成为自造谣言|写作|反宣传;谣言;自杀
012|34|遗书中的痛苦可以反证忠诚神话|方法|遗书;痛苦;忠诚神话
012|35|乐观套话无法遮蔽失败现实|写作|乐观套话;失败现实;遗书
012|41|当事人辩白可能反证自杀诱因|方法|当事人辩白;自杀诱因;反证
012|47|临终自责必须放回政治环境理解|方法|临终自责;政治环境;陈布雷
012|51|高压统治无法理解知识人投向反对党|政治|高压统治;知识人;反对党
012|52|家庭政治分裂会加重忠诚冲突|人格|家庭;政治分裂;忠诚冲突
012|54|亲属选择会暴露政治认同裂缝|政治|亲属选择;政治认同;裂缝
012|62|现实理想冲突可能导致自我毁灭|人格|现实;理想;自我毁灭
012|73|知识分子依附权力可能否定一生|人格|知识分子;依附权力;悲惨下场
013|10|第一手在场证言不能被事后宣传抹除|方法|第一手证言;事后宣传;抹除
013|26|歪曲他人观点是一种宣传栽诬|写作|歪曲观点;宣传;栽诬
013|27|反污蔑者也可能亲自制造污蔑|写作|反污蔑;制造污蔑;宣传
013|30|跟随宣传路线会使老实人继续栽诬|人格|宣传路线;老实人;栽诬
013|32|权力功臣也可能清贫而终|人格|权力功臣;清贫;陈布雷
014|10|尸谏概念不能被倒置为维护统治者|文化|尸谏;概念倒置;统治者
015|17|判断亡国应服从事实而非法统口号|政治|亡国;事实;法统口号
015|19|领袖自承可以反证官方法统说辞|方法|领袖自承;法统说辞;反证
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
if (allSourceFiles.length !== 16) throw new Error(`Expected 16 source files, found ${allSourceFiles.length}`);
const paragraphMap = new Map(allSourceFiles.map((name) => [name, paragraphs(name)]));
const sourceParagraphCount = [...paragraphMap.values()].reduce((sum, items) => sum + items.length, 0);
if (sourceParagraphCount !== 991) throw new Error(`Expected 991 paragraphs, found ${sourceParagraphCount}`);

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
    note: '本轮只提取李敖自序及评论段落中可独立检索的史料方法、政治、法权、人格、文化、写作与知识判断。《金陵春梦》原文、蒋介石旧文、官方文件、他人回忆、编辑按语和长篇引文只作证据，不直接转列为李敖思想。标题用于检索浓缩，description 保留源文原段落。',
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
  '- 《金陵春梦》原文、蒋介石旧文、官方文件、他人回忆、编辑按语和长篇引文只作证据，不把被引作者的判断记在李敖名下。',
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
