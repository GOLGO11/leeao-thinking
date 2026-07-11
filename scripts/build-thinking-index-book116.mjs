import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sequence = '116';
const bookTitle = '蒋介石研究三集';
const slug = 'chiang-kai-shek-research-third-series';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const sourceBookDir = path.join('《大李敖全集6.0》分章节', '012.人物研究类', '018.蒋介石研究三集');
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

const specLines = `
序|3|同书异禁可检验审查尺度|法权|出版审查;同书异禁;禁书理由
001|3|人物纪念可沿用先例形成规格|文化|人物纪念;仪式规格;政治先例
001|7|冷门出版物可能保存关键答案|方法|冷门资料;关键证据;史料发现
001|9|版本对读可辨认文字底本|方法|版本对读;文字底本;年鉴
001|12|历史写作有责任恢复被删关键字|写作|历史责任;关键字;删改
001|25|互异记述可能共同误认真凶|方法|互异记述;真凶;史料辨误
001|37|政治暗杀须追问知情责任|政治|政治暗杀;知情责任;权力核心
001|42|行动事实可推翻事后官方辩解|方法|行动事实;官方辩解;暗杀
002|3|军事胜利可能依赖收买和情报|政治|军事胜利;收买;情报
002|9|领袖神机叙事会遮蔽密码情报|写作|领袖神机;密码情报;宣传
002|11|神机妙算也可能来自窃取密码|方法|密码;情报;神机妙算
002|13|拆开证据即可还原天纵英明|写作|天纵英明;证据;领袖宣传
003|4|表面战史会掩盖将领的巧妙抗命|写作|表面战史;巧妙抗命;战功
003|11|派系背景可解释统帅用兵疑忌|政治|派系背景;用兵;疑忌
003|13|清除异己会改变军事部署|政治|清除异己;军事部署;派系
003|16|自主抗战会打乱权力者排挤计划|政治|自主抗战;排挤;军事计划
003|26|一味退让仍不能阻止侵略扩大|政治|退让;侵略;外交
003|39|巧妙抗命可能改变战争结局|人格|抗命;战争结局;军事人格
003|80|只给口头支持不能免除不增援责任|政治|口头支持;增援;统帅责任
003|85|领袖可在参战后继续孤立异己部队|政治|参战;孤立;异己部队
003|107|自主抵抗能推翻失败主义|人格|自主抵抗;失败主义;军人意志
003|120|无增援记录会把责任指回当局|方法|无增援;记录;责任追查
003|124|内部矛盾可拆穿统帅自辩|方法|内部矛盾;统帅自辩;史料检验
003|125|未公开辩词更能暴露权力心态|方法|未公开辩词;权力心态;历史真相
004|17|排比史料可揭穿军事丰功神话|方法|史料排比;军事神话;官方宣传
004|26|集中主力的速胜计划可能重演旧错|政治|集中主力;速胜;军事错误
004|32|两种回忆对读可还原撤退计划|方法|回忆对读;撤退计划;战史
004|35|实际战局可检验既定计划|方法|实际战局;既定计划;战史检验
004|57|个人意志主导错误战场须负全责|政治|个人意志;战场选择;统帅责任
004|59|越级指挥会把战略错误放大到战术|政治|越级指挥;战略错误;战术
004|62|正式指挥体系可能被个人命令架空|政治|指挥体系;个人命令;架空
004|64|直接听命会使组织层级沦为空壳|政治|直接听命;组织层级;军事指挥
004|72|越级干预局部足以反证全面操控|方法|越级干预;局部证据;全面操控
004|78|私自调兵会破坏正式指挥关系|政治|私自调兵;指挥关系;军事组织
004|82|颂扬亲自指挥反会暴露混乱根源|写作|亲自指挥;颂扬;混乱根源
004|90|个人受辱可能驱动国家军事冒险|人格|个人受辱;军事冒险;权力人格
004|96|统帅反复犹豫会错失先机|政治|统帅犹豫;先机;作战责任
004|106|不了解工事和武器就开战是轻率|政治|工事;武器;轻率开战
004|108|空话不能掩盖惨重军事代价|写作|军事空话;伤亡;宣传
004|109|不知彼己的战争就是糊涂战|方法|知彼知己;糊涂战;战略判断
004|111|熟读英雄战史不等于学会教训|知识|战史;历史教训;军事素养
004|113|采纳顾问意见不能卸除自身责任|政治|顾问意见;采纳;决策责任
004|119|牵制敌军的战略可能反被敌军牵制|政治|战略牵制;主力;战场选择
004|121|战略错误须放进更大国际格局检验|方法|战略错误;国际格局;历史解释
004|122|言论受禁者的秘本可保存独到见解|写作|言论自由;秘本;独到见解
004|157|战争判断应放进世界战略因果中|方法|世界战略;战争因果;历史判断
004|158|当事人承认可反证事后战略神话|方法|当事人承认;战略神话;反证
004|172|对外软弱可能源于另一战场牵制|政治|对外软弱;战场牵制;国际政治
004|175|大国竞争中的错误调兵会让第三方获利|政治|大国竞争;调兵;第三方获利
004|176|替他国承受战争会遭盟友反向出卖|政治|替他国作战;盟友;出卖
004|177|民族救星的政策可能救了别的民族|写作|民族救星;政策后果;政治反讽
004|206|作战失败和撤退失败都应追究统帅|政治|作战失败;撤退失败;统帅责任
005|5|现代战争的残酷可超过古代酷刑|文化|现代战争;古代酷刑;残酷
005|9|士兵惨状会揭穿领袖的丰功叙事|写作|士兵惨状;丰功叙事;战争
006|2|主战主和的官方二分可能颠倒事实|写作|主战主和;官方叙事;事实
006|5|政治领袖可让他人承担坏名声|政治|坏名声;责任转移;政治领袖
006|12|权力者会占好名声并转嫁恶名|人格|好名声;恶名;责任转嫁
006|15|主和立场须按时间变化辨认|方法|主和;时间变化;政治立场
006|16|追踪立场源流可避免静态定性|方法|立场源流;静态定性;历史追踪
006|22|官方汇编会删去不利电文|写作|官方汇编;电文;删节
006|30|谈判求和不应被先验判为错误|政治|谈判;求和;政治判断
006|33|秘密文件可为公开说法提供旁证|方法|秘密文件;公开说法;旁证
006|35|权力者有能力阻止出走就须负责任|政治|阻止出走;权力能力;政治责任
006|44|虚假政治表演可能演成真实结果|政治|政治表演;真实结果;权力
006|46|外交条件对比可辨认真实主和者|方法|外交条件;主和者;对比
006|48|和平接触须依时间线检验|方法|和平接触;时间线;历史检验
006|50|主战主和不能套用简单二分|方法|主战主和;简单二分;历史判断
006|79|实际开战不等于政府正式宣战|知识|实际开战;正式宣战;抗战
006|80|公开抗日口号可能遮蔽秘密接触|政治|抗日口号;秘密接触;政治两面
006|82|权力者会垄断接敌并给别人定罪|法权|秘密接触;通敌罪;权力垄断
006|83|战争名声可能来自谈判未果|写作|战争名声;秘密谈判;宣传
006|84|敌对作者的材料也可能反证其结论|方法|敌对作者;反证;史料阅读
007|32|私人亲密关系可能介入外交活动|情爱|亲密关系;外交;政治
007|42|行程时间可用于检验秘闻|方法|行程时间;秘闻;检验
007|43|政治利益可能借助性魅力取得|情爱|性魅力;政治利益;外交
007|47|政治秘闻应在多种证言间求证|方法|政治秘闻;证言;求证
008|2|正式名单不等于实际随行名单|方法|正式名单;随行名单;史料差异
008|5|领袖不应窃取部属私人物品|人格|领袖;私人物品;窃取
008|10|过度干预部属细务不是领导本领|人格|干预细务;领导;部属
008|17|安全名义可能侵入部属隐私|法权|安全检查;部属隐私;权力
009|4|被俘者是否自杀须接受现实检验|方法|被俘;自杀;现实检验
009|7|军人伦理不应把被俘等同必死|文化|军人伦理;被俘;自杀
009|8|忠烈观念来自多重传统塑造|文化|忠烈;传统;军人伦理
009|11|完成职责后求生不等于不忠|人格|职责;求生;忠诚
009|12|忠诚有多种概念不可简化为送死|文化|忠诚;送死;伦理
009|13|死亡选择属于个人自由意志|法权|死亡选择;自由意志;个人
009|14|守住道德底线就可以追求生存|人格|道德底线;生存;人格
009|15|统治者不能强求自己做不到的殉节|人格|统治者;殉节;双重标准
009|16|要求部下送死而自己求生是双重标准|人格|部下送死;自己求生;双重标准
010|7|基层军官失职也须追到教育领导责任|政治|军官失职;教育;领导责任
010|10|互不救援反映整体指挥文化|政治|互不救援;指挥文化;军队
010|13|公开理由会掩饰永久排斥政策|写作|公开理由;排斥;政治修辞
010|14|权力对低阶军官的惩罚往往更重|政治|低阶军官;惩罚;权力
010|15|幸存者留下证言可赋予余生价值|写作|幸存者;证言;余生价值
011|20|领袖会向不同集团展示不同面孔|政治|领袖;不同集团;政治角色
011|21|总统向黑帮首领行礼暴露统治结构|政治|总统;黑帮首领;统治结构
012|4|当事人回忆可揭露秘密投票控制|方法|当事人回忆;秘密投票;控制
012|5|政党不能强迫民意机关服从个人|法权|民意机关;政党;个人意志
012|14|不从众可体现独立政治人格|人格|不从众;独立人格;政治
012|15|独裁者会用威胁制造集体意见|政治|独裁者;威胁;集体意见
013|8|事必躬亲的领导难成大事|人格|事必躬亲;领导;大事
014|5|旁证可帮助检验领袖私生活叙事|方法|旁证;私生活;叙事检验
014|6|祭拜仪式可能只是迷信表演|文化|祭拜;迷信;政治仪式
015|5|把领袖强制认作父亲是政治灌输|文化|领袖;父亲;政治灌输
015|6|知识分子可能比普通士兵更自愿服从|人格|知识分子;士兵;服从
015|7|批评领袖者也可能保留父权认同|文化|批评领袖;父权;认同
015|9|自动建立父子依附是领袖崇拜|文化|父子依附;领袖崇拜;政治
015|13|自觉认父同样属于政治依附|文化|自觉认父;政治依附;领袖
015|14|普通士兵可能更能拒绝强制认父|人格|普通士兵;拒绝;强制认父
016|5|纪念母亲的公共工程也可用于自我宣传|写作|纪念母亲;公共工程;自我宣传
016|16|同一作者的时间矛盾会暴露说谎|方法|时间矛盾;同一作者;说谎
016|17|修祖坟可能是传统政治统战|文化|修祖坟;统战;政治传统
016|18|毁人生活者也可能遭遇身后不宁|人格|毁人生活;身后;报应
017|3|口述史中的细节值得继续追问|方法|口述史;细节;追问
017|10|使用书面歌词可反推不会唱国歌|方法|书面歌词;国歌;反推
017|15|动作细节可检验仪式叙事|方法|动作细节;仪式叙事;检验
017|16|党歌成为国歌体现政治挪用|文化|党歌;国歌;政治挪用
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
if (allSourceFiles.length !== 18) throw new Error(`Expected 18 source files, found ${allSourceFiles.length}`);
const paragraphMap = new Map(allSourceFiles.map((name) => [name, paragraphs(name)]));
const sourceParagraphCount = [...paragraphMap.values()].reduce((sum, items) => sum + items.length, 0);
if (sourceParagraphCount !== 852) throw new Error(`Expected 852 paragraphs, found ${sourceParagraphCount}`);

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
    note: '本轮只提取李敖自序及评论段落中可独立检索的史料方法、政治、法权、人格、文化、写作、知识与情爱判断。官方战史、公文、电报、他人回忆、来信和长篇引文只作证据，不直接转列为李敖思想。标题用于检索浓缩，description 保留源文原段落。',
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
  '- 保留李敖本人明确表达、可脱离单一史实独立检索的史料批评、宣传拆解、制度辨析、权力责任及人格判断。',
  '- 官方战史、公文、电报、他人回忆、来信和长篇引文只作证据，不把被引作者的判断记在李敖名下。',
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
