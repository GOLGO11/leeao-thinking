import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '004.李敖回忆录');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT004-002', '这一段主要是1935年前后的时代背景铺陈，李敖本人的“遗民”历史感已由 LAT004-003 承载。'],
  ['LAT004-006', '父亲研究土地问题的段落偏家族与父亲经历，李敖个人读书养成可由 LAT004-009、LAT004-010、LAT004-014 承载。'],
  ['LAT004-011', '书店购书与金圆券现场混在同一段，读书材料已有 LAT004-010，金融政治批判已有 LAT004-012。'],
  ['LAT004-013', '战乱难童段落偏社会惨象记录，独立思想索引价值低于同章政治与读书条目。'],
  ['LAT004-019', '退学段落偏个人履历转折，思想取向已由后续教育批判和思想定型条目承载。'],
  ['LAT004-025', '政工人员查思想与 LAT004-027 的思想考核档案主题重复，保留后者更具制度性。'],
  ['LAT004-034', '持续写辩难文章与 LAT004-033 的学问/写作分叉高度重叠，校对轮保留分叉判断。'],
  ['LAT004-036', '求去不留的情节与 LAT004-035 拒绝入党换方便主题相近，保留后者更集中。'],
  ['LAT004-039', '胡秋原官司段落偏个案经过，司法结构批判已有后文冤狱、再审、法庭战斗条目。'],
  ['LAT004-041', '《文星》杂志生命起点的判断与 LAT004-040、LAT004-044 的思想传播结构重复。'],
  ['LAT004-047', '蒋经国不会放过《文星》的判断与 LAT004-048 连续查禁、LAT004-049 主流变乱流重复。'],
  ['LAT004-051', '告密者与变节者段落偏人物道德评判，和本书校对轮主轴距离略远。'],
  ['LAT004-054', '软禁时期概述偏章节转场，具体法权经验由跟监、名单、国际人权条目承载。'],
  ['LAT004-056', '不向洋人低头的姿态偏个性轶事，国际人权援助主题由 LAT004-060 承载。'],
  ['LAT004-058', '政治犯名单发现过程与 LAT004-057、LAT004-064 重复，保留后两条的行动和法理判断。'],
  ['LAT004-061', '台独联盟误认段落偏事件细节，校对轮保留人权名单与法理抗辩主轴。'],
  ['LAT004-068', '出国作饵的策略段落偏政治周旋，和思想索引主线不如坐牢、复出、写作条目稳定。'],
  ['LAT004-072', '复出首书销量与心情偏出版现场，复出机制由 LAT004-070、LAT004-071 承载。'],
  ['LAT004-073', '婚姻中拒绝迷信的段落思想较单薄，且依赖私人轶事语境。'],
  ['LAT004-074', '离婚自制段落偏私人关系评价，校对轮不作为思想索引重点。'],
  ['LAT004-079', '牢中做工段落主要记录看守所日常，法权结构由狱吏、查扣、书信检查条目承载。'],
]);

const overrides = new Map([
  ['LAT004-001', { title: '乱世中的立德立言', keywords: '立德,立言,乱世,自许' }],
  ['LAT004-003', { title: '出生即遗民', keywords: '遗民,满洲国,历史感' }],
  ['LAT004-004', { title: '死亡也要有准备', keywords: '死亡,慎终,传统' }],
  ['LAT004-005', { title: '户政权力收束籍贯自由', keywords: '籍贯,户政,政府权力' }],
  ['LAT004-007', { title: '党国爱国的陷阱', keywords: '爱国,国民党,弃民' }],
  ['LAT004-008', { title: '共存亡口号里的先逃者', keywords: '共存亡,逃难,傅作义' }],
  ['LAT004-009', { title: '课外古文与图书馆养成', keywords: '课外书,古文,图书馆' }],
  ['LAT004-010', { category: '方法', title: '少年时代的资料意识', keywords: '东北志,资料,少年读书' }],
  ['LAT004-012', { title: '金圆券败坏政府信用', keywords: '金圆券,政府信用,通货' }],
  ['LAT004-014', { title: '课外书养成写作能力', keywords: '课外书,写作,藏书' }],
  ['LAT004-015', { title: '制式教育压低个性', keywords: '制式教育,个性,杜威' }],
  ['LAT004-016', { title: '思想定型来自困学求变', keywords: '思想定型,困学求变,知识分子' }],
  ['LAT004-017', { title: '感念师长不等于师承', keywords: '钱穆,师承,思想定型' }],
  ['LAT004-018', { title: '严侨的人格身教', keywords: '严侨,人格,自由主义' }],
  ['LAT004-020', { title: '丧礼改革中的现代意识', keywords: '丧礼改革,胡适,传统' }],
  ['LAT004-021', { title: '一篇序牵动出版自由', keywords: '查禁,出版自由,调查局' }],
  ['LAT004-022', { title: '不过旧历年的现代化实验', keywords: '旧历年,现代化,自由意志' }],
  ['LAT004-023', { title: '只谈方法学还不够', keywords: '殷海光,知识基础,方法学' }],
  ['LAT004-024', { title: '追问政治历史诚实', keywords: '殷海光,国民党,历史诚实' }],
  ['LAT004-026', { title: '不以恐吓换入党', keywords: '入党,金门,恐吓' }],
  ['LAT004-027', { title: '思想档案如何害人', keywords: '思想考核,政工,档案' }],
  ['LAT004-028', { title: '败军统治下的军中妓院', keywords: '军中乐园,败军,性控制' }],
  ['LAT004-029', { title: '军队经验凝固悍气', keywords: '军队,悍气,大学教育' }],
  ['LAT004-030', { title: '选择独处与孤立', keywords: '独处,孤立,反派' }],
  ['LAT004-031', { title: '从学问生活投进文章急湍', keywords: '文星,文章,命运' }],
  ['LAT004-032', { title: '学问需要安定与气质', keywords: '学问,安定,文化浪人' }],
  ['LAT004-033', { title: '学问路与写作路分叉', keywords: '学问,文章,文星' }],
  ['LAT004-035', { title: '拒绝以入党换方便', keywords: '入党,方便,拒绝' }],
  ['LAT004-037', { category: '方法', title: '旧报旧刊也能查真相', keywords: '旧报纸,资料,真相' }],
  ['LAT004-038', { title: '文证俱在的考据反击', keywords: '文证,考据,胡适' }],
  ['LAT004-040', { title: '文化商人承担思想传播', keywords: '文化商人,思想传播,文星' }],
  ['LAT004-042', { title: '现代化路线被政权扣帽', keywords: '文星,现代化,官方指控' }],
  ['LAT004-043', { title: '现代化不等于反中国文化', keywords: '现代化,中国文化,研究' }],
  ['LAT004-044', { title: '杂志与书店组成传播链', keywords: '杂志,书店,思想传播' }],
  ['LAT004-045', { title: '党命令压过行政命令', keywords: '文星停刊,党命令,行政命令' }],
  ['LAT004-046', { title: '无党缘也不愿自保', keywords: '国民党,死硬派,自保' }],
  ['LAT004-048', { title: '试办背后继续查禁', keywords: '查禁,文星,警总' }],
  ['LAT004-049', { title: '压死主流只会放出乱流', keywords: '文星,主流,乱流' }],
  ['LAT004-050', { title: '装订厂抢书越过出版法', keywords: '查禁,抢书,出版自由' }],
  ['LAT004-052', { category: '法权', title: '新党运动连累言论尺度', keywords: '自由中国,新党,言论自由' }],
  ['LAT004-053', { title: '讲学讲演自由被剥夺', keywords: '讲学自由,台大,殷海光' }],
  ['LAT004-055', { title: '软禁中的跟监机器', keywords: '跟监,警总,软禁' }],
  ['LAT004-057', { title: '把跟监照片交给国际特赦', keywords: '政治犯名单,跟监照片,国际特赦' }],
  ['LAT004-059', { title: '刑求逼供的权力心理', keywords: '刑求,逼供,保安处' }],
  ['LAT004-060', { title: '借国际人权揭发黑暗', keywords: '人权,国际特赦,黑暗' }],
  ['LAT004-062', { title: '判决书如何罗织罪名', keywords: '判决书,叛乱,罗织' }],
  ['LAT004-063', { title: '史料不应成为叛乱罪证', keywords: '史料,叛乱罪,宣言' }],
  ['LAT004-064', { title: '政治犯名单不是政府机密', keywords: '政治犯名单,机密,非法' }],
  ['LAT004-065', { title: '缄默受审的耶稣姿态', keywords: '缄默,审判,耶稣' }],
  ['LAT004-066', { title: '文字力量带来坐牢命运', keywords: '文字力量,坐牢,命运' }],
  ['LAT004-067', { title: '闭关坐牢的自我承担', keywords: '坐牢,闭关,自我承担' }],
  ['LAT004-069', { title: '不给国民党做打手', keywords: '中央日报,国民党,拒绝' }],
  ['LAT004-070', { title: '出版家判断李敖会回来', keywords: '远景出版社,复出,出版' }],
  ['LAT004-071', { title: '复出需要媒体窗口', keywords: '复出,中国时报,出版' }],
  ['LAT004-075', { title: '专栏复出遭官方封杀', keywords: '专栏,封杀,中国时报' }],
  ['LAT004-076', { title: '司法冤狱的政工背景', keywords: '冤狱,法官,政工' }],
  ['LAT004-077', { title: '官官相护驳回再审', keywords: '再审,官官相护,伪造文书' }],
  ['LAT004-078', { title: '书信检查超过必要', keywords: '书信检查,看守所,思想罗织' }],
  ['LAT004-080', { title: '狱吏威风的传统', keywords: '狱吏,传统,法警' }],
  ['LAT004-081', { title: '书刊查扣暴露公务程度', keywords: '书刊查扣,公务程度,看守所' }],
  ['LAT004-082', { title: '牢中资料偷运成书', keywords: '牢中写作,资料,读者' }],
  ['LAT004-083', { title: '杂志执照卷进政治判决', keywords: '杂志执照,政治判决,千秋评论' }],
  ['LAT004-084', { title: '入狱前预编杂志', keywords: '千秋评论,坐牢,预编' }],
  ['LAT004-085', { title: '评论写作作为持续战斗', keywords: '千秋评论,笔伐,国民党' }],
  ['LAT004-086', { title: '争取百分百自由', keywords: '自由,郑南榕,杂志' }],
  ['LAT004-087', { title: '在烂报中保障一字不改', keywords: '世论新语,报纸,言论自由' }],
  ['LAT004-088', { title: '求是评论的实事求是', keywords: '求是评论,实事求是,思想家' }],
  ['LAT004-089', { title: '禁书九十六种的言论钳制', keywords: '禁书,言论自由,国民党' }],
  ['LAT004-090', { title: '口诛以日常谈吐为底', keywords: '演讲,口诛,表达' }],
  ['LAT004-091', { title: '终老学术胜过实际政治', keywords: '学术,政治,章孝慈' }],
  ['LAT004-092', { title: '东吴禁网与宪法自由', keywords: '东吴,言论自由,宪法' }],
  ['LAT004-093', { title: '从笔伐进入口诛', keywords: '笔伐,口诛,电视' }],
  ['LAT004-094', { title: '正言不讳不揣摩敌人', keywords: '正言不讳,祢衡,敌人' }],
  ['LAT004-095', { title: '自兼恩格斯编全集', keywords: '全集,马克思,恩格斯' }],
  ['LAT004-096', { title: '恩怨分明的善霸观', keywords: '善霸,恩怨,报仇' }],
  ['LAT004-097', { title: '从被告到原告的法庭战斗', keywords: '官司,被告,原告' }],
  ['LAT004-098', { title: '与国民党与子偕小', keywords: '台湾,国民党,方向' }],
  ['LAT004-099', { title: '台湾是战场不是敌人', keywords: '台湾,战场,乡愁' }],
]);

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
    'proofread_from',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：校对轮继续使用 7 个原子分类，删除偏背景、偏轶事、偏重复的条目。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push(`- 提取轮编号：${record.proofread_from}`);
      lines.push('');
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const categoryCounts = taxonomy
    .map((category) => [category, records.filter((record) => record.category === category).length])
    .filter(([, count]) => count > 0);

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮由提取轮 ${originalRecords.length} 条校对为 ${records.length} 条，删除 ${dropReasons.size} 条。`,
    '',
    '校对动作只涉及条目取舍、分类、标题、关键词和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 分类统计',
    '',
    ...categoryCounts.map(([category, count]) => `- ${category}：${count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id);
    if (!override) {
      throw new Error(`Missing proofreading override for ${record.id}`);
    }

    return {
      ...record,
      ...override,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: book.title,
      round: book.round,
      status: book.status,
      proofread_from: record.id,
    };
  });

const payload = {
  book,
  taxonomy: originalPayload.taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Proofread ${originalPayload.records.length} records into ${records.length} records for ${book.title}.`);
