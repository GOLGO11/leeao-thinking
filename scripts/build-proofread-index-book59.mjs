import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '059.李敖书信集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT059-020', '承认理论段落偏概念铺垫，后续“事实承认”“倒果为因”已能承载护照案的法权判断，校对轮删除。'],
  ['LAT059-033', '国务卿午宴例子偏外部佐证，闭关读思和珍惜余生条目已能承载时间方法，校对轮删除。'],
  ['LAT059-039', '家庭写作玩笑较重，苦难见证的索引价值不够稳定，校对轮删除。'],
  ['LAT059-045', '封锁成本偏照片印制和杂志成本说明，思想入口较弱，校对轮删除。'],
  ['LAT059-047', '与 LAT059-052 同题，后者更完整呈现知识分子带路和信仰献身，校对轮删除。'],
  ['LAT059-048', '受难时无人讲话偏事实补充，知识分子明哲保身条目已更完整，校对轮删除。'],
  ['LAT059-051', '人情冷暖偏个案回忆，知识分子品格主题已有更强条目，校对轮删除。'],
  ['LAT059-053', '敌友情绪偏陈鼓应个案心理分析，独立思想索引价值较弱，校对轮删除。'],
  ['LAT059-062', '林正杰个案色彩较重，青年路线主题由“青年勿圆滑”“明智一择”承载，校对轮删除。'],
  ['LAT059-066', '小偷政治段落偏短，偷风坦荡条目已更完整展开，校对轮删除。'],
  ['LAT059-069', '遥控群众段落自我戏谑较重，写作隐居主题已有更稳定条目，校对轮删除。'],
  ['LAT059-077', '丘吉尔失败段落以外部故事为主，失败韧性主题已有更直接条目，校对轮删除。'],
  ['LAT059-081', '买票伪装偏贿选事实补充，诚实无耻和收钱改投条目更具判断性，校对轮删除。'],
  ['LAT059-089', '地方当然人选偏新竹市长补选个案，党外原则主题已有更可复用条目，校对轮删除。'],
  ['LAT059-098', '民心士气段落偏反讽一时罪名，查禁帽子主题由“罪名免疫”承载，校对轮删除。'],
  ['LAT059-100', '够朋友段落主要是外界对李敖的传闻和自我形象，校对轮删除。'],
  ['LAT059-102', '统一战线段落外部引文较多，结论由“不可靠朋友”条目承载，校对轮删除。'],
  ['LAT059-106', '撤销基金偏个案处理结论，财团法人监督条目已完整承载法权主题，校对轮删除。'],
  ['LAT059-108', '暴行调查段落是外部质询文字，不作为李敖思想索引主描述，校对轮删除。'],
  ['LAT059-119', '责任中止段落是出版法论证的引子，发行人责任条目更直接，校对轮删除。'],
  ['LAT059-121', '变更登记偏细部法条步骤，发行人责任和法律信任条目已承载主旨，校对轮删除。'],
  ['LAT059-122', '代理出版偏细部法律分支，发行人责任主题已有更稳定条目，校对轮删除。'],
  ['LAT059-126', '回光返照段落依赖《传道书》和党史笑谈，索引主旨不够收敛，校对轮删除。'],
  ['LAT059-127', '外部来信对李敖定位的判断，不直接作为李敖本人思想条目，校对轮删除。'],
  ['LAT059-128', '外部来信劝告李敖鞭挞封建，保留李敖本人回应段落即可，校对轮删除。'],
  ['LAT059-129', '外部来信结论，不直接作为李敖本人思想条目，校对轮删除。'],
  ['LAT059-131', '胡适引文为主，李敖自己的方法论由后续条目承载，校对轮删除。'],
  ['LAT059-132', '胡适科学方法引文为主，李敖自己的借题发挥和经世写作条目更合适，校对轮删除。'],
  ['LAT059-135', '调停协议段落偏单一人事纠纷，索引主旨不够独立，校对轮删除。'],
  ['LAT059-136', '与蓬莱岛案作者责任条目重复，后文条目更集中，校对轮删除。'],
  ['LAT059-137', '党外相忍段落疑为外部文章引文，且偏事件呼吁，校对轮删除。'],
  ['LAT059-147', '作者挺身与 LAT059-148、LAT059-150 同题，后两条更完整，校对轮删除。'],
  ['LAT059-159', '地图史位偏单项补注，缺少可展开的思想判断，校对轮删除。'],
  ['LAT059-160', '小文归根偏家书私事，思想入口不够稳定，校对轮删除。'],
  ['LAT059-165', '故宫自证段落为引文引子且不完整，保留“故宫藏赝”条目，校对轮删除。'],
  ['LAT059-168', '残本文字缺损较多，文化外悠和拒绝刀笔吏条目已可承载主旨，校对轮删除。'],
  ['LAT059-170', '海外揭真段落为不完整引文，保留更完整的海外知识声援条目，校对轮删除。'],
  ['LAT059-175', '单元弹性偏稿约和付款安排，写作思想价值较弱，校对轮删除。'],
  ['LAT059-179', '时代性段落偏医院文案草稿，和李敖思想索引关联较弱，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT059-001', { title: '异端独立', keywords: '自序,异端,独立气概' }],
  ['LAT059-002', { title: '书信存诚', keywords: '书信,坦然,真诚' }],
  ['LAT059-003', { title: '真相不避人', keywords: '真相,批评,得罪' }],
  ['LAT059-004', { title: '靠写书过活', keywords: '失业,写书,查禁' }],
  ['LAT059-005', { title: '训导如警局', keywords: '训导,恶法,才吏' }],
  ['LAT059-006', { title: '清官也扰人', keywords: '清官,道德过失,才吏' }],
  ['LAT059-007', { title: '正直不必灰心', keywords: '才吏,正直,灰心' }],
  ['LAT059-008', { title: '不委曲缓祸', keywords: '英雄,激烈,委曲' }],
  ['LAT059-009', { title: '坐牢应成史料', keywords: '坐牢,人权史,狱政史' }],
  ['LAT059-010', { title: '知彼要公开', keywords: '党史,知己知彼,公开度' }],
  ['LAT059-011', { title: '思想警察围剿', keywords: '思想警察,围剿,卖国' }],
  ['LAT059-012', { category: '法权', title: '困居岛内', keywords: '出境,自由,护照' }],
  ['LAT059-013', { category: '写作', title: '作家拒统制', keywords: '作家,文艺统制,傲骨' }],
  ['LAT059-014', { title: '想清楚写简单', keywords: '思想方法,写作,简单' }],
  ['LAT059-015', { title: '衙门失职', keywords: '护照,公务员,失职' }],
  ['LAT059-016', { title: '国家赔偿', keywords: '自由,权利,宪法' }],
  ['LAT059-017', { title: '公文胜剪报', keywords: '护照,公文书,依法' }],
  ['LAT059-018', { title: '外交部扰民', keywords: '外交部,户政,扰民' }],
  ['LAT059-019', { title: '婚姻形式要件', keywords: '民法,婚姻,形式要件' }],
  ['LAT059-021', { title: '事实承认', keywords: '法律承认,事实承认,外交' }],
  ['LAT059-022', { title: '法律倒果为因', keywords: '外交,法律承认,荒唐' }],
  ['LAT059-023', { title: '批评自由', keywords: '言论自由,批评,封杀' }],
  ['LAT059-024', { title: '杂志公器', keywords: '杂志,公器,立场' }],
  ['LAT059-025', { title: '拒入庙堂', keywords: '选举,无政府主义,党外' }],
  ['LAT059-026', { title: '俗务碍写作', keywords: '写作,时间,俗务' }],
  ['LAT059-027', { title: '清议在手', keywords: '坐牢,公论,历史' }],
  ['LAT059-028', { title: '老人政权', keywords: '斗争,敌人,政权' }],
  ['LAT059-029', { title: '酷吏断刑', keywords: '司法,酷吏,用刑' }],
  ['LAT059-030', { title: '判刑须有条件', keywords: '司法公正,狱政,假释' }],
  ['LAT059-031', { title: '狱犴不治不可刑', keywords: '狱政,法官,刑罚' }],
  ['LAT059-032', { title: '闭关得失', keywords: '隐居,阅读,讨论' }],
  ['LAT059-034', { title: '珍惜余生', keywords: '应酬,效率,使命' }],
  ['LAT059-035', { title: '独力研究', keywords: '写作,独力研究,闭关' }],
  ['LAT059-036', { title: '受难活法', keywords: '受难,目标,苦中作乐' }],
  ['LAT059-037', { title: '真理高于小民', keywords: '真理,男子汉,献身' }],
  ['LAT059-038', { title: '傲骨自大', keywords: '自大,傲骨,千秋' }],
  ['LAT059-040', { title: '知识分子窑变', keywords: '知识分子,台湾,大儒' }],
  ['LAT059-041', { category: '知识', title: '大陆型知识分子', keywords: '大陆型,知识分子,台湾' }],
  ['LAT059-042', { title: '求真先于自卫', keywords: '自卫,求真,理想主义' }],
  ['LAT059-043', { title: '成品即朋友', keywords: '朋友,成品,千秋大业' }],
  ['LAT059-044', { title: '骂人须事实', keywords: '批评,事实,威力' }],
  ['LAT059-046', { title: '沉默到大义', keywords: '朋友,沉默,曲学阿世' }],
  ['LAT059-049', { title: '明哲保身成风', keywords: '知识分子,品格,国民党' }],
  ['LAT059-050', { title: '伟大须尊重事实', keywords: '事实,道义,说谎' }],
  ['LAT059-052', { title: '带路不媚众', keywords: '知识分子,群众,信仰' }],
  ['LAT059-054', { title: '敌友要敢当', keywords: '伪君子,敌人,品质' }],
  ['LAT059-055', { title: '中立是软弱', keywords: '中立主义,软弱,选择' }],
  ['LAT059-056', { title: '敌友都要光明', keywords: '朋友,敌人,光明磊落' }],
  ['LAT059-057', { title: '正派士绅', keywords: '正派士绅,国民党,原则' }],
  ['LAT059-058', { title: '古典朋友', keywords: '友情,传统人格,忠心' }],
  ['LAT059-059', { title: '山头才有联合', keywords: '党外,山头,联合' }],
  ['LAT059-060', { title: '敬业才可接替', keywords: '写作,后进,敬业' }],
  ['LAT059-061', { title: '青年勿圆滑', keywords: '新生代,正义感,圆滑' }],
  ['LAT059-063', { title: '明智一择', keywords: '选择,新生代,试验' }],
  ['LAT059-064', { title: '青年不凭势力', keywords: '青年,势力,气魄' }],
  ['LAT059-065', { title: '杂志不说混话', keywords: '杂志,水平,言论' }],
  ['LAT059-067', { title: '大盗式坦荡', keywords: '禁书,党外,大盗' }],
  ['LAT059-068', { title: '隐居保温', keywords: '隐居,写作,目标' }],
  ['LAT059-070', { title: '文网恢恢', keywords: '查禁,出版,文网' }],
  ['LAT059-071', { title: '人物检定', keywords: '人物评价,是非,党外' }],
  ['LAT059-072', { title: '政治看大方向', keywords: '政治反对者,原则,枝节' }],
  ['LAT059-073', { title: '分清轻重', keywords: '战士,双重标准,枝节' }],
  ['LAT059-074', { title: '领袖先是战士', keywords: '党外,战士,领袖' }],
  ['LAT059-075', { title: '强者不丧志', keywords: '失败,强者,落选' }],
  ['LAT059-076', { title: '失败中磨刀', keywords: '失败,大丈夫,气概' }],
  ['LAT059-078', { title: '阳刚须阴柔', keywords: '阳刚,阴柔,战斗' }],
  ['LAT059-079', { title: '好人也要韧性', keywords: '失败,战斗,好人' }],
  ['LAT059-080', { title: '干净选举幻象', keywords: '贿选,选举,国民党' }],
  ['LAT059-082', { title: '诚实的无耻', keywords: '黑吃黑,选票,民主' }],
  ['LAT059-083', { title: '收钱不投票', keywords: '黑吃黑,贿选,选民' }],
  ['LAT059-084', { title: '人权案算我一份', keywords: '人权,国民党,营救' }],
  ['LAT059-085', { title: '个案揭司法', keywords: '司法黑暗,个案,调查' }],
  ['LAT059-086', { title: '基础事实成立', keywords: '求证,评论,事实' }],
  ['LAT059-087', { title: '党外不能牺牲原则', keywords: '党外,原则,万年国会' }],
  ['LAT059-088', { title: '终身委员非法', keywords: '宪法,万年国会,非法' }],
  ['LAT059-090', { title: '公开为大义', keywords: '朋友,大义,公开' }],
  ['LAT059-091', { title: '文章留下纪录', keywords: '写作,监所,历史纪录' }],
  ['LAT059-092', { title: '冤狱可反击', keywords: '冤狱,法官,公道' }],
  ['LAT059-093', { title: '垄断报纸斗臭', keywords: '报纸,垄断,良心' }],
  ['LAT059-094', { title: '反对势力被迫', keywords: '反政府,司法,批评' }],
  ['LAT059-095', { title: '新闻司法退步', keywords: '新闻界,司法界,倒车' }],
  ['LAT059-096', { title: '留下历史罪证', keywords: '历史纪录,政敌,国民党' }],
  ['LAT059-097', { title: '罪名戴久成免疫', keywords: '查禁,罪名,言论' }],
  ['LAT059-099', { title: '直接面对敌人', keywords: '敌人,沟通,谈判' }],
  ['LAT059-101', { title: '事实不可错', keywords: '事实,论断,求证' }],
  ['LAT059-103', { title: '不可靠朋友', keywords: '左右逢源,敌人,党外' }],
  ['LAT059-104', { title: '恩怨分明', keywords: '人权,敌人,法律' }],
  ['LAT059-105', { title: '财团法人监督', keywords: '财团法人,监督,民法' }],
  ['LAT059-107', { title: '病监特权', keywords: '监狱,病监,特权' }],
  ['LAT059-109', { title: '包庇导致暴行', keywords: '狱政,人权,包庇' }],
  ['LAT059-110', { title: '正义历史在我', keywords: '正义,历史,法务' }],
  ['LAT059-111', { title: '法学不可谋禄', keywords: '法学,良知,狱政' }],
  ['LAT059-112', { title: '承认积弊', keywords: '狱政,勇气,同流合污' }],
  ['LAT059-113', { title: '为善自足', keywords: '为善,恶报,志士' }],
  ['LAT059-114', { title: '文艺纯度', keywords: '文艺工作者,独立,公关' }],
  ['LAT059-115', { title: '真相为公义曝光', keywords: '真相,公义,反省' }],
  ['LAT059-116', { title: '书美不隐恶', keywords: '同志,真相,人缘' }],
  ['LAT059-117', { title: '同志不可护短', keywords: '同志,护短,真相' }],
  ['LAT059-118', { title: '司法积弊', keywords: '司法,法官,改革' }],
  ['LAT059-120', { title: '发行人责任', keywords: '出版法,发行人,免责' }],
  ['LAT059-123', { title: '发行责任崩坏', keywords: '发行人,法院,法官' }],
  ['LAT059-124', { title: '司法形象', keywords: '司法院,司法,形象' }],
  ['LAT059-125', { title: '恐共症升级', keywords: '匪谍,恐共,国民党' }],
  ['LAT059-130', { title: '小题纵深', keywords: '封建主义,机会教育,写作' }],
  ['LAT059-133', { title: '考证要借题', keywords: '考证,方法,封建主义' }],
  ['LAT059-134', { title: '经世写作', keywords: '写作,借题发挥,封建主义' }],
  ['LAT059-138', { title: '背景不详则武断', keywords: '校订,史实,背景' }],
  ['LAT059-139', { title: '科际训练', keywords: '文化论,理论,训练' }],
  ['LAT059-140', { title: '批评自由', keywords: '批评,自由,错误' }],
  ['LAT059-141', { category: '方法', title: '只看其文', keywords: '读书,客观,闭关' }],
  ['LAT059-142', { title: '侠盗正义', keywords: '罗宾汉,正义,形式' }],
  ['LAT059-143', { title: '乡愁成因', keywords: '乡愁,现代化,台湾' }],
  ['LAT059-144', { title: '怀古胜怀乡', keywords: '怀古,怀乡,情操' }],
  ['LAT059-145', { title: '功德高于好恶', keywords: '功德,苍生,好恶' }],
  ['LAT059-146', { title: '查禁率反证', keywords: '查禁,言论自由,党外' }],
  ['LAT059-148', { title: '作者负举证', keywords: '办杂志,责任,原则' }],
  ['LAT059-149', { title: '保护懦夫', keywords: '责任,懦夫,原则' }],
  ['LAT059-150', { title: '义气有边界', keywords: '作者,证据,政治迫害' }],
  ['LAT059-151', { title: '伪善最厌', keywords: '伪善,中产阶级,清教徒' }],
  ['LAT059-152', { title: '混血伪君子', keywords: '伪君子,党外,国民党' }],
  ['LAT059-153', { title: '节操时穷可见', keywords: '知识分子,政权,节操' }],
  ['LAT059-154', { title: '知识界邪气', keywords: '知识分子,政权,台湾' }],
  ['LAT059-155', { title: '浩然气榜样', keywords: '知识分子,敌人,浩然' }],
  ['LAT059-156', { title: '史家清算', keywords: '国民党,历史,清算' }],
  ['LAT059-157', { title: '亡天下', keywords: '知识分子,道德,国民党' }],
  ['LAT059-158', { title: '原文互校', keywords: '校勘,独立评论,原文' }],
  ['LAT059-161', { title: '封锁处境', keywords: '警备,查禁,纽约时报' }],
  ['LAT059-162', { title: '言论责任分界', keywords: '文星,言论,责任' }],
  ['LAT059-163', { title: '失败的榜样', keywords: '失败,朋友,历史记录' }],
  ['LAT059-164', { title: '范仲淹绝笔', keywords: '范仲淹,墨宝,文物' }],
  ['LAT059-166', { title: '故宫藏赝', keywords: '故宫,赝品,王世杰' }],
  ['LAT059-167', { title: '文化外悠', keywords: '文化,软实力,官方' }],
  ['LAT059-169', { title: '拒绝刀笔吏', keywords: '出版,书名,三联' }],
  ['LAT059-171', { title: '海外知识声援', keywords: '海外知识界,自由民主,声援' }],
  ['LAT059-172', { title: '查禁毁信用', keywords: '没收,出版,信用' }],
  ['LAT059-173', { title: '资料排比鉴定', keywords: '林语堂,资料,章目' }],
  ['LAT059-174', { title: '分题写史', keywords: '中国历史,写作,夹叙夹议' }],
  ['LAT059-176', { title: '台湾文网', keywords: '文网,柏杨,警备' }],
  ['LAT059-177', { title: '借海外发声', keywords: '纽约时报,香港,文星' }],
  ['LAT059-178', { title: '杂志品管', keywords: '杂志,品管,出版' }],
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
    'source_id',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const extractionIds = new Set(extraction.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!extractionIds.has(id)) {
    throw new Error(`Unknown extraction id: ${id}`);
  }
}

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...edit,
      id: `LAT059-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }
  const source = extraction.records.find((item) => item.id === record.source_id);
  if (!source) {
    throw new Error(`Missing source record for ${record.id}`);
  }
  if (record.description !== source.description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除外部来信观点、外部引文、纯案情推进、短证据段、同题重复、合同付款细节、家书私事和不够独立的段落；保留能独立呈现李敖法权意识、写作方法、知识分子判断、人格伦理、党外政治、反封建方法和文化判断的原文段落。description 未改写。',
  },
  records,
  dropped,
};

const jsonPath = path.join(outputDir, '思想索引-校对轮.json');
const csvPath = path.join(outputDir, '思想索引-校对轮.csv');
const mdPath = path.join(outputDir, '思想索引-校对轮.md');
const notePath = path.join(outputDir, '校对说明.md');

fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(csvPath, records);
writeMarkdown(mdPath, payload);

const noteLines = [
  '# 《李敖书信集》思想索引校对说明',
  '',
  `- 校对输入：${path.relative(rootDir, extractionPath)}`,
  `- 校对输出：${path.relative(rootDir, jsonPath)}`,
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 校对原则',
  '',
  '- description 只沿用原书段落，不做转述和改写。',
  '- 删除外部来信观点、外部大段引文、纯案情推进、短证据段、同题重复、合同付款细节、家书私事和不够独立的段落。',
  '- 书信中的法律攻防归入法权；党外路线和国民党统治归入政治；学术考证、文物鉴定和知识分子判断归入知识。',
  '- 本书不强行补情爱类；涉及婚姻、家庭或私人关系的段落，若主旨是权利、人格或处境，归入对应主类。',
  '',
];

if (dropped.length) {
  noteLines.push('## 删除条目', '');
  for (const item of dropped) {
    noteLines.push(`- ${item.id} ${item.title}：${item.reason}`);
  }
  noteLines.push('');
}

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread 059.李敖书信集: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
