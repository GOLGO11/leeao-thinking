import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '112';
const bookTitle = '闽变研究与文星讼案';
const slug = 'fukien-revolt-and-wenxing-case';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '014.闽变研究与文星讼案');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
001|2|现代史研究受史料与人情禁忌双重限制|方法|现代史;史料;内批评
001|4|垄断史料会阻碍当代历史研究|政治|史料垄断;研究机构;文献
001|5|当事人常改写自己及亲人的历史|人格|当事人;改写历史;自传
001|6|改写个人历史不能脱离事实|人格|改写历史;事实;欺骗
001|8|学者有责任阻止公众受历史曲解欺骗|人格|历史真实;公众;学者责任
001|11|民意代表不能借公职处理私怨|政治|民意代表;公职;私怨
001|34|自述必须与当时记录相互核对|方法|自述;同期记录;核对
001|35|参与者的后见解释不能取代事件事实|方法|参与者;后见解释;史实
001|36|日期误差可以暴露回忆叙事的不可靠|方法|日期;回忆;可靠性
001|37|删去关键人名会改变历史叙事|写作|删节;人名;历史叙事
001|38|事件成为历史后仍可接受公共研究|方法|历史事件;公共研究;旧账
001|53|旧事成为现代史后不能禁止研究|方法|现代史;旧事;研究自由
001|54|民意代表应替人民发言而非借法律压制人民|法权|民意代表;出版法;言论自由
001|60|知识分子的尊严在于独立而非向政府求援|人格|知识分子;独立;政府
001|61|严以责人而轻以律己不合学人品格|人格|学人;律己;法律
001|67|历史研究涉及人物不等于政治定罪|方法|历史研究;人物;政治定罪
001|77|历史术语应由同时代与跨语种文献确认|方法|历史术语;文献;跨语种
002|5|对事不对人是传统论辩准绳|文化|论辩;对事不对人;传统
002|8|党派与无意识会影响历史记录|方法|党派;无意识;历史记录
002|11|外批评负责鉴别史料来源与真伪|方法|外批评;史料;真伪
002|12|内批评要研究文字形成时的心理活动|方法|内批评;心理活动;作者
002|13|证言应先检查作者是否与事件同时|方法|证言;同时代;作者
002|14|证言资格取决于是否亲见|方法|证言;亲见;人证
002|15|观察范围决定叙述的完整程度|方法|观察范围;叙述;完整性
002|16|接近真相的条件决定史料深度|方法|真相;条件;史料
002|17|作者诚意影响叙述可信度|方法|诚意;叙述;可信度
002|18|人格品质是评估证言的因素|方法|人格品质;证言;可信度
002|19|精神状态会影响证言可靠性|方法|精神状态;证言;可靠性
002|21|个人利益可能使作者隐瞒真相|人格|个人利益;隐瞒;真相
002|22|威胁会使作者不敢说真话|人格|威胁;真话;作者
002|23|利诱会使作者不肯说真话|人格|利诱;真话;作者
002|24|好恶会造成不确实的陈述|方法|好恶;陈述;偏见
002|25|舆论压力会扭曲文字记录|方法|舆论;文字记录;扭曲
002|26|文学粉饰和夸大会损害史料价值|写作|文学粉饰;夸大;史料
002|28|先入偏见会阻碍事实观察|方法|偏见;观察;事实
002|29|知识经验和注意力限制观察能力|方法|知识;经验;注意力
002|30|事后先知不能替代当时判断|方法|事后先知;后见之明;判断
002|31|观察位置决定证言效力|方法|观察位置;证言;效力
002|32|研究作者处境是理解文字的必要工作|方法|作者处境;文字;内批评
002|33|真实陈述和适当公评不应被诽谤罪箝制|法权|真实陈述;公评;言论自由
002|34|人物研究须删除与因果关系无关的部分|方法|人物研究;因果关系;相关性
002|35|人身调查本身不必然包含恶意|方法|人身调查;恶意;中性概念
002|36|禁止人物调查会使历史判断无法成立|法权|历史判断;学术自由;人物调查
008|6|活着的现场参与者可以检验历史争议|方法|现场参与者;证人;历史争议
008|9|争议事件应由直接参与者出庭作证|方法|直接证人;出庭;事件核验
008|10|多名不同位置的证人可以交叉确认事实|方法|多名证人;交叉确认;事实
009|6|没有证据不能指控他人盗窃|法权|举证;盗窃;指控
009|8|文字归属必须先核对署名作者|方法|文字归属;署名;核对
009|9|把他人文字归给被告属于证据变造|法权|证据变造;作者归属;诬告
010|3|不能借司法判决制造历史定论|法权|司法;历史定论;研究自由
010|6|复杂指控应先分类再逐项答复|方法|分类;指控;答辩
010|9|固定历史名词具有约定的文献含义|知识|历史名词;文献;固定含义
010|14|当事人回避固定术语可能源于自身忌讳|方法|术语回避;当事人;动机
010|16|当事人的遮掩不能消灭历史|人格|历史;遮掩;当事人
010|22|严肃举证应排除重复与抄袭资料|方法|举证;重复;抄袭
010|69|历史定性可用必要充分条件检验|方法|必要条件;充分条件;历史定性
010|78|维护历史真实不能接受偷换定性|人格|历史真实;定性;知识分子
010|79|非党派公民也有辨伪责任|人格|公民;辨伪;责任
010|123|原始文件可以检验事后否认|方法|原始文件;事后否认;核验
010|132|战略事实应由同时代行动记录判断|方法|战略;行动记录;史实
010|135|外国档案可与本国资料交叉印证|方法|外国档案;本国资料;互证
010|271|多份文献切片可以呈现历史关系|方法|文献切片;历史关系;归纳
010|279|澄清历史事实不等于要求个人偿命|法权|历史澄清;个人责任;界限
010|280|违反常识的历史主张仍应由证人核验|方法|常识;证人;核验
010|281|时间排序可以组织事件证据|方法|时间顺序;事件证据;组织
010|324|连续同期报道可以反驳无事发生论|方法|同期报道;连续证据;反驳
010|336|政治行动不能用动机说辞取代|方法|政治行动;动机;事实
010|337|过去声誉不能证明后来行动|方法|过去声誉;后来行动;判断
010|372|证据链充分后不必无限堆叠材料|方法|证据链;充分性;材料
010|391|不同语言的事件名称可以互证历史定性|方法|跨语种;事件名称;历史定性
010|417|文献可以确定军事行动的最迟时间|方法|文献;时间线;军事行动
010|418|比较先后次序可以击破自我叙事|方法|先后次序;自我叙事;时间线
010|430|自述必须服从可核验的事件时间线|方法|自述;时间线;核验
010|431|旁证能够揭穿事后编造的故事|方法|旁证;事后编造;考据
010|442|诉讼不应成为威吓历史研究的工具|法权|诉讼;历史研究;威吓
010|444|历史争议应在实证基础上接受法律判断|方法|实证;历史争议;法律判断
011|4|言论者应预估文字的长期社会影响|写作|言论责任;长期影响;社会
011|5|言论者失职会把读者引向错误|写作|言论者;读者;责任
011|6|谨慎怀疑是立言应有的态度|人格|立言;谨慎;怀疑
011|7|冒充舆论的轻率言论会摇惑人心|写作|舆论;轻率;人心
011|239|言论贡献不能只按字数衡量|写作|言论;字数;贡献
011|255|政论必须接受前后言论一致性检验|写作|政论;一致性;检验
011|256|知识分子也须承担国家成败责任|人格|知识分子;国家;责任
011|257|文字力量无形而后果深远|写作|文字力量;后果;责任
012|8|公开质疑司法独立会损害当事人权益|法权|司法独立;当事人;质疑
012|9|判决前宣称他人有罪违背司法程序|法权|未审先判;司法程序;有罪
014|33|词语本身的褒贬须由语义和语境判断|方法|词语;语义;语境
014|53|作者一贯用法可以证明词语没有特定恶意|方法|一贯用法;词语;恶意
014|66|摘引可删除与论题无关的枝节|写作|摘引;论题;枝节
014|91|删节是否曲解应看原意有无改变|方法|删节;原意;曲解
014|92|句法结构可以检验文字是否遭到曲解|写作|句法;文字;曲解
014|96|明知作者不同仍追究他人刑责是错误归属|法权|作者归属;刑责;误认
014|103|解释人物动机要追踪行动发生前的承诺|方法|人物动机;承诺;时间线
014|105|同一运动参与者可能具有不同动机|方法|运动;参与者;动机
014|107|攀附贤达不能成为自证清白的证据|方法|比附;贤达;证据力
014|112|政治身份本身没有证明人格的证据力|方法|政治身份;人格;证据力
014|116|政治赦免不能抹去历史记录|方法|政治赦免;历史记录;层次
014|120|暂时压制研究也不能永久消灭真相|人格|历史真相;压制;时间
014|132|后来的立场不能抹去先前的经历|方法|先前经历;后来立场;层次
014|137|引用争议应回到准确篇名和原句核对|方法|引用;篇名;原句
014|143|左右标签随判断基线而变化|知识|左右派;判断基线;政治术语
014|147|政治标签必须先界定语义坐标|方法|政治标签;语义;坐标
014|154|作者自己的分类可以反驳其临时定义|方法|作者分类;定义;反证
014|190|摘引只须完整保留所讨论的命题|方法|摘引;命题;相关性
014|200|原始宣言比事后节本更能证明运动性质|方法|原始宣言;节本;运动性质
014|206|把文字形式化可以显出隐藏的逻辑后果|方法|形式化;逻辑;文字
014|211|可用对方自己的定义检验其行为|方法|定义;行为;类推
014|220|投诚与联合必须按组织关系严格区分|方法|投诚;联合;组织关系
014|232|主张应接受本人既有定义的反向检验|方法|既有定义;主张;反向检验
014|237|泛称他人皆如此不能替自己行为辩护|方法|比附;个人行为;辩护
014|253|比喻性泛论不能移作针对个人的指控|方法|比喻;个人指控;语境
014|256|评价文章应看文章本身而非出版者|写作|文章;出版者;独立意见
014|258|相似判例可为诽谤责任提供参照|法权|判例;诽谤;参照
014|260|历史不容任意歪曲|人格|历史;歪曲;真实
014|261|法律与政治手段不能永久改写历史|法权|法律;政治手段;历史
015|13|官方调查结果可以反证无据指控|法权|官方调查;指控;反证
015|15|把独立写作者说成受人指使是否定其人格|人格|独立人格;幕后人;写作者
020|18|明知不实仍公开指控应承担法律责任|法权|明知不实;公开指控;法律责任
021|6|部分指控真实不能免除其余虚假诬告责任|法权|诬告;部分真实;责任
021|7|刑事归责必须先确认作品署名与责任主体|法权|署名;责任主体;刑事归责
021|8|控方主张应由控方承担举证责任|法权|举证责任;控方;主张
021|9|故意错置作者并使用该材料属于证据变造|法权|证据变造;作者;诬告
021|10|刑事证明必须达到超越合理怀疑|法权|合理怀疑;证明力;刑事证据
022|3|不能让人对并非自己所写的文字负刑责|法权|文字归属;刑责;诬告
022|4|量刑公平可以通过同类项目统计检验|方法|量刑;统计;公平
022|8|罪少判重而罪多判轻违反量刑公平|法权|量刑;公平;比较
022|9|年龄和地位不应影响司法判断|法权|年龄;地位;司法偏见
022|10|维护历史真实比个人诉讼得失更重要|人格|历史真实;诉讼;原则
022|11|历史问题不宜由法院代替学术裁决|法权|历史问题;法院;学术
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
  const lines = [`# ${bookTitle} 思想索引（${round}）`, '', `- 书名：${bookTitle}`, `- 条目：${records.length}`, '- 说明：标题用于检索浓缩，description 保留源文本原段落。', ''];
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
if (bodySourceFiles.length !== 22) throw new Error(`Expected 22 body files, found ${bodySourceFiles.length}`);
const sourceParagraphCount = bodySourceFiles.reduce((sum, name) => sum + paragraphs(name).length, 0);
if (sourceParagraphCount !== 2073) throw new Error(`Expected 2073 paragraphs, found ${sourceParagraphCount}`);

const fullyExcludedOwners = new Map([
  ['003', '许登源署名文章'],
  ['004', '萧孟能署名文章'],
  ['005', '萧孟能与李晋芳署名答辩'],
  ['006', '李晋芳署名答辩'],
  ['007', '萧孟能署名反诉状'],
  ['013', '李晋芳署名答辩'],
  ['016', '曹伟修函'],
  ['017', '罗家伦函'],
  ['018', '高荫祖函'],
  ['019', '李晋芳署名辩护意旨'],
]);
const excludedRanges = bodySourceFiles
  .filter((name) => fullyExcludedOwners.has(name.slice(0, 3)))
  .map((name) => ({
    fileToken: name.slice(0, 3),
    start: 1,
    end: paragraphs(name).length,
    owner: fullyExcludedOwners.get(name.slice(0, 3)),
  }));
const productionCreditRanges = bodySourceFiles
  .filter((name) => !fullyExcludedOwners.has(name.slice(0, 3)))
  .map((name) => {
    const count = paragraphs(name).length;
    return { fileToken: name.slice(0, 3), start: count - 4, end: count, owner: '数字版制作附注' };
  });
const excludedNonLiOrNonProseRanges = [...excludedRanges, ...productionCreditRanges];
const excludedParagraphKeys = new Set();
for (const range of excludedNonLiOrNonProseRanges) {
  for (let paragraph = range.start; paragraph <= range.end; paragraph += 1) {
    excludedParagraphKeys.add(`${range.fileToken}:${paragraph}`);
  }
}

const specs = parseSpecs(allSourceFiles);
const cache = new Map();
const candidates = specs.map((spec) => {
  const excludedRange = excludedNonLiOrNonProseRanges.find((range) => (
    spec.fileName.startsWith(range.fileToken)
      && spec.source_paragraph >= range.start
      && spec.source_paragraph <= range.end
  ));
  if (excludedRange) throw new Error(`Excluded range selected: ${spec.fileName}:${spec.source_paragraph}`);
  if (!cache.has(spec.fileName)) cache.set(spec.fileName, paragraphs(spec.fileName));
  const description = cache.get(spec.fileName)[spec.source_paragraph - 1];
  if (!description) throw new Error(`Missing ${spec.fileName}:${spec.source_paragraph}`);
  return { ...spec, description };
});

for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const candidate of candidates) {
    if (seen.has(candidate[key])) throw new Error(`Duplicate candidate ${key}: ${candidate.fileName}:${candidate.source_paragraph}`);
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
      reason: '与既有总表源段落完全相同，本轮不重复提取',
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
  source_path: path.join(sourceBookDir, spec.fileName),
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
    note: '本轮只提取李敖本人署名文章、本人诉状及联名诉状中可明确代表李敖立场的判断。许登源、萧孟能、李晋芳及法院与机构函件的独立意见只作为材料，不转列为李敖思想。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: bodySourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    excluded_non_li_or_non_prose_paragraph_count: excludedParagraphKeys.size,
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
  `- 明确排除的他人文本或制作附注：${excludedParagraphKeys.size}`,
  `- 人工候选段落：${candidates.length}`,
  `- 提取条目：${records.length}`,
  `- 与既有总表完全相同并跳过的段落：${skippedDuplicates.length}`, '',
  '## 提取原则', '',
  '- 只提取李敖本人明确表达的历史辨伪方法、言论责任、证据法判断、司法原则及公共人格判断。',
  '- 003 至 007、013、016 至 019 的他人署名文章、法律文书与机构函件整篇排除。',
  '- 015、020 为联名诉状，仅保留可明确代表李敖诉讼立场的共同主张；附件内转录的胡秋原意见不作为李敖思想。',
  '- 史料表格、长篇引文、辱骂性修辞、纯案情陈述和数字版制作附注不单独建项。',
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
  excluded_non_li_or_non_prose_paragraph_count: excludedParagraphKeys.size,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: payload.book.category_counts,
}, null, 2));
