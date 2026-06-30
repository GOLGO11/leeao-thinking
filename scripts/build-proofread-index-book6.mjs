import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '006.李敖议坛哀思录');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT006-006', '段落主要说明参选姿态和书名语义，思想主轴已由自我定位、布道平台等条目承载。'],
  ['LAT006-007', '亡国定位主题与 LAT006-113 的蒋介石自证亡国段落重复，校对轮保留证据密度更高的后者。'],
  ['LAT006-013', '选贤与造势的判断与 LAT006-014 的不拜票特立独行主题相近，保留后者更有个人方法辨识度。'],
  ['LAT006-016', '办公室拆门偏现场布置，公开透明主题不如宣誓、发言权、程序正义等法权条目稳定。'],
  ['LAT006-024', '以讽讽议坛与 LAT006-003、LAT006-004 的反对和玩笑方法重复。'],
  ['LAT006-028', '蓝绿自欺危机属于四项危机中的一项，校对轮保留亲美、仇共和失血三条更能展开政治结构。'],
  ['LAT006-038', '美国面前无尊严与军购看门狗主题重复，保留 LAT006-034 与 LAT006-069。'],
  ['LAT006-040', '军备竞赛三轮追汽车与 LAT006-075 的军备竞赛民穷主题重复，保留后者的后果判断。'],
  ['LAT006-044', '美国未保证来救与严重关切主题重复，保留 LAT006-069 的说帖式论证。'],
  ['LAT006-058', '公开退礼偏现场动作，与拒绝政治献金、拒绝管道主题相近，校对轮不单列。'],
  ['LAT006-074', '军购问答的说明段偏材料导语，军购无效论证由前提、严重关切、美国利益等条目承载。'],
  ['LAT006-086', '台湾关系法安全承诺与 LAT006-033、LAT006-043、LAT006-071、LAT006-114 重复。'],
  ['LAT006-094', '军购奶嘴比喻与反军购主轴重复，校对轮保留论证更完整的条目。'],
  ['LAT006-097', '语言文字传承主题与 LAT006-055、LAT006-056 重叠，且依附大法官质询语境。'],
  ['LAT006-104', '创立中国智慧党的事件说明与 LAT006-105 的政党理论重复，保留后者。'],
]);

const overrides = new Map([
  ['LAT006-001', { title: '热讽冷嘲小岛政治', keywords: '小岛,热讽冷嘲,政治批判' }],
  ['LAT006-002', { title: '回忆文字要少弄假', keywords: '自传,回忆,真实' }],
  ['LAT006-003', { title: '反对与嘲弄的议坛方法', keywords: '反对,嘲弄,朝隐' }],
  ['LAT006-004', { title: '以玩笑保全反对', keywords: '玩笑,反对,长命' }],
  ['LAT006-005', { title: '现代人不信怪力', keywords: '迷信,鬼神,现代人' }],
  ['LAT006-008', { title: '借蒋介石证亡国', keywords: '蒋介石,亡国,证据' }],
  ['LAT006-009', { title: '小化自我以放大国家', keywords: '自我,国家,台湾' }],
  ['LAT006-010', { title: '一言堂自任天下法', keywords: '一言堂,特立独行,天下法' }],
  ['LAT006-011', { title: '立委头衔只是布道道具', keywords: '立委,道具,布道' }],
  ['LAT006-012', { title: '选举程序不可做票', keywords: '选举,做票,正当性' }],
  ['LAT006-014', { title: '不拜票的特立独行', keywords: '选举,不拜票,特立独行' }],
  ['LAT006-015', { title: '不用政治献金当选', keywords: '政治献金,拒收,当选' }],
  ['LAT006-017', { title: '台湾三角架构错乱', keywords: '台湾,三角架构,统一' }],
  ['LAT006-018', { title: '拆穿蒋介石的道德意义', keywords: '蒋介石,拆穿,人格' }],
  ['LAT006-019', { title: '美国不责白色恐怖走狗', keywords: '美国,人权,白色恐怖' }],
  ['LAT006-020', { title: '好人不能做共犯', keywords: '中华民国,统一,共犯' }],
  ['LAT006-021', { title: '被害者投票给加害权力', keywords: '斯德哥尔摩,投票,外省族群' }],
  ['LAT006-022', { title: '坏人政治变成浑人政治', keywords: '坏人,浑人,本土政权' }],
  ['LAT006-023', { title: '王闿运式逍遥', keywords: '王闿运,逍遥,玩世' }],
  ['LAT006-025', { title: '讽谏必须讲手段', keywords: '讽谏,孔子,手段' }],
  ['LAT006-026', { title: '先知不靠愚昧取力', keywords: '先知,鬼神,自得' }],
  ['LAT006-027', { title: '拒向假宣誓者宣誓', keywords: '宣誓,伪造文书,孙中山' }],
  ['LAT006-029', { title: '亲美造成军购危机', keywords: '亲美,军购,奶嘴' }],
  ['LAT006-030', { title: '仇共遮蔽谈判空间', keywords: '仇共,宪法,谈判' }],
  ['LAT006-031', { title: '小岛会失血而死', keywords: '危机,正本清源,失血' }],
  ['LAT006-032', { title: '选立委为反美军购', keywords: '军购,媚美,美国' }],
  ['LAT006-033', { title: '台湾关系法不是条约', keywords: '台湾关系法,国内法,条约' }],
  ['LAT006-034', { title: '看门狗不自买骨头', keywords: '军购,看门狗,尊严' }],
  ['LAT006-035', { title: '国防不能只算军事', keywords: '国防,军事层面,国家安全' }],
  ['LAT006-036', { title: '党团分裂挡预算', keywords: '党团,政党协商,预算' }],
  ['LAT006-037', { title: '保存问政记录', keywords: '质询,议会政治,记录' }],
  ['LAT006-039', { category: '政治', title: '台湾不只属于爱台湾者', keywords: '台湾,爱台湾,判断' }],
  ['LAT006-041', { title: '记录老兵生命', keywords: '荣民,生命纪录,国家' }],
  ['LAT006-042', { title: '程序不能为理想牺牲', keywords: '程序,理想,老党外' }],
  ['LAT006-043', { title: 'provide不是买卖', keywords: 'provide,台湾关系法,供应' }],
  ['LAT006-045', { title: '宪法是两岸关系刹车', keywords: '陆委会,宪法,内地' }],
  ['LAT006-046', { title: '数字会说谎', keywords: '数字,统计,谎话' }],
  ['LAT006-047', { title: '最高战略是不战', keywords: '孙子兵法,战略,高压电塔' }],
  ['LAT006-048', { title: '考虑不设防', keywords: '不设防,租赁,国防' }],
  ['LAT006-049', { title: '从大战略看利害', keywords: '大战略,历史,占便宜' }],
  ['LAT006-050', { title: '公投否决案不可再审', keywords: '公投法,渎职,司法程序' }],
  ['LAT006-051', { title: '莫须有是考据问题', keywords: '莫须有,考据,罪名' }],
  ['LAT006-052', { title: '军队失去为何而战', keywords: '军队,信念,为何而战' }],
  ['LAT006-053', { title: '抵抗权不能暂停法律', keywords: '抵抗权,法律,大法官' }],
  ['LAT006-054', { title: '从外部拆穿体制', keywords: '质询,外部拆穿,体制' }],
  ['LAT006-055', { title: '台湾话就是闽南话', keywords: '台湾话,闽南话,本土语言' }],
  ['LAT006-056', { title: '抢救语言不能压给孩子', keywords: '语言,教育,孩子' }],
  ['LAT006-057', { title: '困难要排除', keywords: '困难,将军,办法' }],
  ['LAT006-059', { title: '侮辱官署是军阀法律', keywords: '侮辱官署,法律,军阀' }],
  ['LAT006-060', { title: '安全不是黑暗作业护符', keywords: '安全,黑暗作业,自由中国' }],
  ['LAT006-061', { title: '秘密基金要报缴国库', keywords: '秘密基金,预算,国库' }],
  ['LAT006-062', { title: '判决书不能藏成机密', keywords: '判决书,机密,法官' }],
  ['LAT006-063', { title: '化敌为友才是安全', keywords: '国家安全,化敌为友,逻辑' }],
  ['LAT006-064', { title: '地图不能硬塞政治', keywords: '古地图,台湾史,政治' }],
  ['LAT006-065', { title: '校长要为受害教授作证', keywords: '台大,殷海光,道德勇气' }],
  ['LAT006-066', { title: '去中国化撞上宪法', keywords: '去中国化,宪法,大陆地区' }],
  ['LAT006-067', { title: '学术机构不应介入政治', keywords: '中央研究院,公信力,政治' }],
  ['LAT006-068', { title: '军购论证先清前提', keywords: '军购,前提,澄清' }],
  ['LAT006-069', { title: '严重关切不能当保证', keywords: '严重关切,美国,火海' }],
  ['LAT006-070', { title: '美国利益不等于台湾利益', keywords: '美国利益,台湾,责任' }],
  ['LAT006-071', { title: '台湾关系法在国际法上脆弱', keywords: '台湾关系法,国际法,脆弱' }],
  ['LAT006-072', { title: '假民主要看在野党', keywords: '假民主,在野党,国会' }],
  ['LAT006-073', { title: '哥斯达黎加无军队模式', keywords: '哥斯达黎加,无军队,警察' }],
  ['LAT006-075', { title: '军备竞赛使台湾民穷', keywords: '军备竞赛,民穷财尽,预算' }],
  ['LAT006-076', { title: '国民党已经下班', keywords: '国民党,信念,党员' }],
  ['LAT006-077', { title: '政党协商破坏程序', keywords: '程序正义,政党协商,立委' }],
  ['LAT006-078', { title: '民进党可能成为小国民党', keywords: '民进党,小国民党,执政' }],
  ['LAT006-079', { title: '先知的光荣与痛苦', keywords: '先知,预言,痛苦' }],
  ['LAT006-080', { title: '拒绝表决就是假民主', keywords: '罢免,民进党,假民主' }],
  ['LAT006-081', { title: '反分裂法约束大陆', keywords: '反分裂法,台独,安全' }],
  ['LAT006-082', { title: '知识分子要抵抗坏政府', keywords: '蔡元培,胡适,知识分子' }],
  ['LAT006-083', { title: '核废料要专业处理', keywords: '核废料,公投,专业' }],
  ['LAT006-084', { title: '谈判投降也可保存文化', keywords: '投降计划,谈判,文化' }],
  ['LAT006-085', { title: '部长缺席就是藐视国会', keywords: '国防部长,国会,尊严' }],
  ['LAT006-087', { title: '阻挠议事是少数权利', keywords: 'filibuster,阻挠议事,少数' }],
  ['LAT006-088', { title: '纪律处分要合比例', keywords: '比例原则,纪律,瓦斯' }],
  ['LAT006-089', { title: '用选举传播理念', keywords: '选市长,传播,理想' }],
  ['LAT006-090', { title: '抛弃蓝绿新思维', keywords: '蓝绿,新思维,台湾' }],
  ['LAT006-091', { title: '一千问答维护二二八正义', keywords: '二二八,问答,正义' }],
  ['LAT006-092', { title: '媚外造成角色错乱', keywords: '媚外,角色错乱,台湾' }],
  ['LAT006-093', { title: '紧急预算不能违法', keywords: '预算法,太平岛,预算' }],
  ['LAT006-095', { title: '大法官要能对抗当政者', keywords: '大法官,风骨,对抗' }],
  ['LAT006-096', { title: '大法官要有胆量良知', keywords: '大法官,胆量,良知' }],
  ['LAT006-098', { title: '国家安全不能交给将军', keywords: '国家安全,将军,爱台湾' }],
  ['LAT006-099', { title: '政治只分压迫者', keywords: '压迫者,被压迫者,台湾' }],
  ['LAT006-100', { title: '一个人的作用在外胁', keywords: '立法院,外胁,风潮' }],
  ['LAT006-101', { title: '权力使人腐化', keywords: '权力,腐化,定律' }],
  ['LAT006-102', { title: '颠覆伪国会', keywords: '伪民主,伪国会,列宁' }],
  ['LAT006-103', { title: '国会减半毁掉制衡', keywords: '国会减半,制衡,民主' }],
  ['LAT006-105', { title: '民主政党没有列宁阴魂', keywords: '民主政党,柔性政党,列宁' }],
  ['LAT006-106', { title: '智慧测量依据证据', keywords: '智慧测量,证据,政见' }],
  ['LAT006-107', { title: '少数暴力阻止多数投票', keywords: '假民主,少数党,投票' }],
  ['LAT006-108', { title: '蒋氏政治遗害蓝绿', keywords: '蒋介石,蓝绿,思想型模' }],
  ['LAT006-109', { title: '中国也属于台湾人', keywords: '中国,所有权,台湾人' }],
  ['LAT006-110', { title: '宣誓条例应废止', keywords: '宣誓条例,中央法规标准法,废止' }],
  ['LAT006-111', { title: '决议文侵犯程序正义', keywords: '决议文,程序正义,侵权' }],
  ['LAT006-112', { title: '民主真谛是和而不同', keywords: '民主,和而不同,多元意见' }],
  ['LAT006-113', { title: '蒋介石自证中华民国亡国', keywords: '中华民国,亡国,蒋介石' }],
  ['LAT006-114', { title: '台湾关系法自相矛盾', keywords: '台湾关系法,建交公报,自相矛盾' }],
  ['LAT006-115', { title: '法律中的中国不能偷换', keywords: '中国,法律,民法' }],
  ['LAT006-116', { title: '一中宪法不能回避', keywords: '一中宪法,国统纲领,统一' }],
  ['LAT006-117', { title: '假罪名下的真实坐牢', keywords: '台独,坐牢,真假' }],
  ['LAT006-118', { title: '发言权不可被剥夺', keywords: '立法权,发言权,宪法' }],
  ['LAT006-119', { title: '行政院不得抵抗立法权', keywords: '立法院,立法权,核四' }],
  ['LAT006-120', { title: '审计必须铁面无私', keywords: '审计部,铁面无私,包公' }],
]);

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
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
    '- 分类策略：校对轮继续使用 7 个原子分类，删除偏现场、偏导语和重复论证的条目。',
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
  const counts = categoryCounts(records, taxonomy);

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
    ...counts.map((item) => `- ${item.category}：${item.count}`),
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
const taxonomy = originalPayload.taxonomy;
const bookBase = {
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
      id: `LAT${bookBase.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: bookBase.title,
      round: bookBase.round,
      status: bookBase.status,
      proofread_from: record.id,
    };
  });

const book = {
  ...bookBase,
  record_count: records.length,
  category_counts: categoryCounts(records, taxonomy),
};

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
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
