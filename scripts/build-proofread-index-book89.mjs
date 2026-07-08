import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const bookDir = path.join(repoRoot, 'outputs', '089.李敖语妙天下');
const inputPath = path.join(bookDir, '思想索引-提取轮.json');

const outputJson = path.join(bookDir, '思想索引-校对轮.json');
const outputCsv = path.join(bookDir, '思想索引-校对轮.csv');
const outputMd = path.join(bookDir, '思想索引-校对轮.md');
const canonicalJson = path.join(bookDir, '思想索引.json');
const canonicalCsv = path.join(bookDir, '思想索引.csv');
const canonicalTxt = path.join(bookDir, '思想索引.txt');
const proofreadNote = path.join(bookDir, '校对说明.md');

const categories = new Set(['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱']);

const dropReasons = new Map();
const addDrops = (ids, reason) => {
  for (const id of ids) {
    dropReasons.set(id, reason);
  }
};

addDrops([3, 4, 26, 28, 33, 54, 55, 58, 64, 82, 90, 98, 100, 104, 167, 171, 186, 252, 261, 266], '语义偏节目串场或论点依附上下文，索引独立性弱');
addDrops([8, 18, 20, 45, 49, 66, 75, 80, 95, 116, 118, 122, 133, 140, 142, 148, 149, 159, 181, 182, 185, 192, 193, 200, 208, 217, 233, 245, 250, 275], '与同题相邻条目重复，保留信息更完整者');
addDrops([88], '标题与来源段落指向不稳，剔除以免误导分类');

const titleOverrides = new Map([
  [1, '翻译要分清语感'],
  [2, '文字技巧也能杀人放火'],
  [5, '同生死共存亡也要说得精致'],
  [6, '军购会把台湾变成冤大头'],
  [7, '三国说书传统要看底本'],
  [9, '孔明精神不等于死守忠君'],
  [10, '孔明精神要回到历史行为'],
  [11, '三国英雄要放进历史脉络'],
  [12, '曹操冥婚挑战经典礼法'],
  [13, '蒋介石像曹操式权谋人物'],
  [14, '历史判断要靠书信与原文'],
  [15, '许历农代表国民党觉悟路线'],
  [16, '不接受投降路线才是真觉悟'],
  [17, '保钓与两岸立场不能伪装'],
  [19, '小说查禁暴露反分裂法压制'],
  [21, '文学作品要敢写人性'],
  [22, '想象力可以补足情爱叙事'],
  [23, '英雄临终奇行显出气魄'],
  [24, '英雄临终也有幽默姿态'],
  [25, '军购使台湾与民同病'],
  [27, '民生痛苦要看制度窍门'],
  [29, '聪明人只爱一点点'],
  [30, '爱情不能只靠纠缠'],
  [31, '想象力比知识更能突破限制'],
  [32, '想象力也要靠材料支撑'],
  [34, '殷海光遗产不该被宗教遮蔽'],
  [35, '思想遗产需要出版自由'],
  [36, '知识分子要敢背负孤独'],
  [37, '知识分子风骨要能承担代价'],
  [38, '知识分子不能只讲漂亮话'],
  [39, '风骨不是姿态而是承担'],
  [40, '马英九军购放水要被追问'],
  [41, '书法能藏住中国文化典故'],
  [42, '书法史要看传承线索'],
  [43, '书法评价不能只看名气'],
  [44, '阿扁弊案要看制度性贪污'],
  [46, '历史判断不能只看成败'],
  [47, '纪念雷震要先守言论自由'],
  [48, '知识分子要有独立判断'],
  [50, '虽千万人也要敢往'],
  [51, '美国会制造自己的敌人'],
  [52, '美国敌人常由美国政策制造'],
  [53, '愚蠢会让人不知死因'],
  [56, '个案救济不能代替制度责任'],
  [57, '求知要学会触类旁通'],
  [59, '胡适五四观需要纠正'],
  [60, '胡适价值不该被政治遮蔽'],
  [61, '台湾话不是独立语言'],
  [62, '语言问题要看历史源流'],
  [63, '苏东坡代表文人完整性'],
  [65, '粗话也能有表达力量'],
  [67, '为胡适讨公道要敢穿过乌云'],
  [68, '胡适的胆识要放回历史看'],
  [69, '胡适言论自由要守底线'],
  [70, '胡适最后精神不该被低估'],
  [71, '中美日恩怨要看战时真相'],
  [72, '美国政策会把盟友变敌人'],
  [73, '中国统一要看大历史'],
  [74, '台湾只是中国版图一角'],
  [76, '统一问题不能靠台独幻想'],
  [77, '独裁者粗细也有差别'],
  [78, '蒋介石宣传比斯大林更细腻'],
  [79, '独裁神化会改写真实'],
  [81, '熊猫政治暴露身份焦虑'],
  [83, '熊猫议题背后是中国认同'],
  [84, '蓝绿都会借文化祸国殃民'],
  [85, '扒林云要揭穿迷信权威'],
  [86, '蓝绿阵营同样需要警惕'],
  [87, '才女美女问题背后是社会迷思'],
  [89, '人要适格才不误位置'],
  [91, '身临情境未必懂爱情'],
  [92, '佳偶会在权力关系中成怨偶'],
  [93, '爱情纠缠会消耗人'],
  [94, '行善要分清责任主体'],
  [96, '独处能保全人格'],
  [97, '独处也要有精神支撑'],
  [99, '台湾民主轨迹要看权力结构'],
  [101, '二二八叙事不能遮蔽真相'],
  [102, '蓝绿民主都会制造假象'],
  [103, '台独真面目是政治伪装'],
  [105, '台独话语常被权力利用'],
  [106, '中华民国亡国要按原文看'],
  [107, '性观念也有文化细节'],
  [108, '传统性观念要回到人性'],
  [109, '与台独过招要看资料'],
  [110, '历史真相不能靠台独改写'],
  [111, '劣币驱逐良币会伤害社会'],
  [112, '劣币政治会把好人赶走'],
  [113, '金圆券证明权力掠夺财富'],
  [114, '劣币逻辑会延续到台湾'],
  [115, '决斗体现荣誉制度'],
  [117, '李登辉问题要看日本情结'],
  [119, '李登辉路线伤害国家认同'],
  [120, '卖台标签要看历史证据'],
  [121, '到底谁卖台要看行为'],
  [123, '卖国有时被包装成爱国'],
  [124, '日本侵华史不能被淡化'],
  [125, '食色性也是人性问题'],
  [126, '历史求真不能感情用事'],
  [127, '知识分子可笑在缺乏独立'],
  [128, '批判知识分子也要写成文章'],
  [129, '宪法言论自由常是假的'],
  [130, '宋楚瑜评价要看行政能力'],
  [131, '周公吐哺不等于现代政治'],
  [132, '言论自由不能只写在宪法'],
  [134, '美国只会讲风凉话'],
  [135, '美国承诺不能当保障'],
  [136, '南北战争叙事需要重看原文'],
  [137, '南北战争并非只为解放黑奴'],
  [138, '郭冠英案要先看身份与文本'],
  [139, '守宪不该被政治处罚'],
  [141, '自由派也要保护讨厌言论'],
  [143, '郭冠英案检验言论自由'],
  [144, '女人学历史要过求真关'],
  [145, '历史求真要防情绪化'],
  [146, '民有民治民享也可能是假民主'],
  [147, '假民主会被多数包装'],
  [150, '偷改历史要用证据拒绝'],
  [151, '假历史会制造政治仇恨'],
  [152, '纪念雷震不能偷换立场'],
  [153, '陈仪是二二八中的悲剧人物'],
  [154, '爱国者也会被权力吞掉'],
  [155, '殖民伤痕不该被政治淡化'],
  [156, '伤害不全来自敌人'],
  [157, '化敌为友要看时代位置'],
  [158, '敌友关系会随政治转换'],
  [160, '化敌为友需要现实方法'],
  [161, '亦敌亦友是一种历史常态'],
  [162, '敌人常被自己政策制造'],
  [163, '学贯中西要能拿资料说话'],
  [164, '学贯中西不是摆知识架子'],
  [165, '历史真相要靠资料追索'],
  [166, '名片也能显出文字战场'],
  [168, '国民党也会学逃避责任'],
  [169, '言论自由不能被政治假装'],
  [170, '国民党蹈绘会制造虚伪'],
  [172, '争取权利要有智慧'],
  [173, '权利争取也要看窍门'],
  [174, '亲情也会成为人生包袱'],
  [175, '亲属责任要分清边界'],
  [176, '感恩不等于抹掉事实'],
  [177, '功劳不能被历史埋没'],
  [178, '家庭材料也能写出时代'],
  [179, '凶悍亲情也有权力逻辑'],
  [180, '家庭故事映出政治性格'],
  [183, '婚姻怨偶来自关系失衡'],
  [184, '凶悍性格也会影响公共判断'],
  [187, '蓝绿叙事都会制造牺牲品'],
  [188, '宿命和造命要分清'],
  [189, '前四十年坏人后二十年小人'],
  [190, '智慧可以被题目测量'],
  [191, '台湾加入联合国是神话'],
  [194, '联合国入会不能只靠口号'],
  [195, '台湾联合国神话遮蔽现实'],
  [196, '中华民国是什么要看亡国原文'],
  [197, '中华民国名号不能自欺'],
  [198, '祖国放弃台湾是历史文件'],
  [199, '台湾没有资格放弃祖国'],
  [201, '文物有情也有表达限制'],
  [202, '台湾史不能忘记日本殖民'],
  [203, '雷震纪念不能被蓝绿偷用'],
  [204, '纪念雷震要有言论自由资格'],
  [205, '纪念雷震要看材料'],
  [206, '雷震精神不该被政治借壳'],
  [207, '台湾仇恨对象不能错置'],
  [209, '郭冠英案要区分身份与言论'],
  [210, '守宪言论不该被处分'],
  [211, '惩罚郭冠英暴露假民主'],
  [212, '郭冠英案检验国家认同'],
  [213, '人世之理需要大头脑'],
  [214, '看人生也要看食色人性'],
  [215, '江南之死与李敖命运相连'],
  [216, '蓝绿资本家都缺文化'],
  [218, '粗话背后有语言史'],
  [219, '俚语也能追出文化来源'],
  [220, '言论自由被宪法条款架空'],
  [221, '宪法保障常被现实政治取消'],
  [222, '自由条文需要真实权利支撑'],
  [223, '宪法自由不能只停在纸面'],
  [224, '美国也是从盗版起家'],
  [225, '盗版问题要看历史阶段'],
  [226, '美国知识产权也有双重标准'],
  [227, '版权道德不能忘记历史'],
  [228, '李语录要看文字智慧'],
  [229, '短句也要有文字密度'],
  [230, '文字智慧在于准确用字'],
  [231, '语言表达需要法权边界'],
  [232, '敌人死光后仍要面对历史'],
  [234, '坐牢不能摧毁强者'],
  [235, '监狱有效只对弱者有效'],
  [236, '台湾对李敖太小'],
  [237, '舞台大小决定思想发挥'],
  [238, '离开台湾才能放大李敖'],
  [239, '台湾困住的不只是李敖'],
  [240, '不服气但不怄气'],
  [241, '不服气要转成快乐'],
  [242, '吐气才是不服气的结果'],
  [243, '人生观要能抗住挫败'],
  [244, '美国人不知天高地厚'],
  [246, '美国傲慢来自权力幻觉'],
  [247, '美国霸权会说风凉话'],
  [248, '孔子后代会成为活化石'],
  [249, '孔家身份不等于孔子精神'],
  [251, '孔孟思想细腻在小处'],
  [253, '中日恩怨要看细节'],
  [254, '讹传典故要先怀疑'],
  [255, '细腻求知才能还原典故'],
  [256, '典故还原要找原始出处'],
  [257, '求知需要会心效果'],
  [258, '历史纵深才有语妙天下'],
  [259, '历史纵深来自材料积累'],
  [260, '历史真相要靠史料'],
  [262, '捡到美金不如捡到知识'],
  [263, '无吏夜捉人说明政治恐惧'],
  [264, '当仁不让要有资格'],
  [265, '独裁精细处也要看见'],
  [267, '文物背后有殖民伤痕'],
  [268, '剧本写作也是李敖本领'],
  [269, '文学本领不能只看一种体裁'],
  [270, '记忆是孤独中的自救'],
  [271, '爱情记忆也会保存声音'],
  [272, '被遗忘是另一种人生悲哀'],
  [273, '梦里不知身是客'],
  [274, '统一问题不能靠梦境逃避'],
  [276, '政治称号不能遮住宪法真相'],
  [277, '粗话写作能翻覆天地'],
  [278, '蒋介石神话可以用粗话拆穿'],
  [279, '骄气外表下要有傲骨'],
  [280, '傲骨要能承担孤立'],
  [281, '傲骨不是表面骄气'],
  [282, '整人作风要看权力技术'],
  [283, '宪法言论自由常被整人作风摧毁'],
  [284, '女人要的是成为新娘的象征'],
  [285, '女人到底要什么要看欲望结构'],
  [286, '宋美龄的美国梦暴露身份欲望'],
  [287, '宋美龄私德不能遮蔽政治真相'],
  [288, '阴险也可能出于善意'],
  [289, '看人不能只看表面阴险'],
  [290, '文字上的善意也会很阴险'],
  [291, '演艺人员缺的是长期学问'],
  [292, '文化美容不能速成'],
  [293, '人间万象要看窍门'],
  [294, '身临其境未必聪明'],
  [295, '书法和图像都可替代现场'],
  [296, '想象力胜过身临其境'],
  [297, '想象力比现场更重要'],
]);

const keywordOverrides = new Map([
  [19, ['文学', '查禁', '反分裂法']],
  [47, ['雷震', '言论自由', '资格']],
  [127, ['知识分子', '独立', '批判']],
  [143, ['郭冠英', '言论自由', '假民主']],
  [172, ['权利', '智慧', '策略']],
  [203, ['雷震', '蓝绿', '借用']],
  [231, ['语言', '法权', '文字智慧']],
  [276, ['政治称号', '宪法', '中华民国']],
  [287, ['宋美龄', '私德', '政治真相']],
]);

const categoryOverrides = new Map([
  [1, '方法'],
  [5, '方法'],
  [7, '知识'],
  [9, '人格'],
  [10, '知识'],
  [11, '知识'],
  [12, '文化'],
  [14, '方法'],
  [22, '写作'],
  [23, '人格'],
  [24, '人格'],
  [34, '人格'],
  [35, '法权'],
  [36, '人格'],
  [37, '人格'],
  [38, '人格'],
  [39, '人格'],
  [40, '政治'],
  [44, '政治'],
  [46, '方法'],
  [56, '法权'],
  [57, '方法'],
  [59, '知识'],
  [60, '知识'],
  [63, '写作'],
  [65, '写作'],
  [67, '知识'],
  [68, '知识'],
  [70, '知识'],
  [77, '方法'],
  [78, '政治'],
  [79, '政治'],
  [81, '政治'],
  [83, '政治'],
  [85, '知识'],
  [87, '情爱'],
  [94, '人格'],
  [96, '人格'],
  [97, '人格'],
  [99, '政治'],
  [107, '情爱'],
  [108, '情爱'],
  [111, '政治'],
  [112, '政治'],
  [113, '知识'],
  [114, '政治'],
  [115, '文化'],
  [117, '政治'],
  [119, '政治'],
  [120, '方法'],
  [121, '政治'],
  [123, '政治'],
  [124, '政治'],
  [125, '情爱'],
  [126, '方法'],
  [127, '人格'],
  [131, '知识'],
  [134, '政治'],
  [135, '政治'],
  [136, '知识'],
  [137, '知识'],
  [144, '知识'],
  [145, '方法'],
  [146, '政治'],
  [147, '政治'],
  [150, '方法'],
  [151, '政治'],
  [153, '知识'],
  [154, '人格'],
  [155, '政治'],
  [156, '人格'],
  [157, '政治'],
  [158, '政治'],
  [160, '方法'],
  [161, '知识'],
  [162, '政治'],
  [163, '方法'],
  [164, '知识'],
  [165, '方法'],
  [168, '政治'],
  [170, '政治'],
  [174, '人格'],
  [175, '人格'],
  [176, '人格'],
  [177, '人格'],
  [180, '政治'],
  [184, '人格'],
  [187, '政治'],
  [188, '方法'],
  [189, '人格'],
  [190, '方法'],
  [191, '政治'],
  [194, '政治'],
  [195, '政治'],
  [196, '政治'],
  [197, '政治'],
  [198, '政治'],
  [199, '政治'],
  [201, '文化'],
  [202, '政治'],
  [213, '方法'],
  [214, '情爱'],
  [215, '写作'],
  [216, '政治'],
  [224, '知识'],
  [225, '知识'],
  [226, '法权'],
  [227, '知识'],
  [228, '写作'],
  [232, '人格'],
  [234, '人格'],
  [235, '人格'],
  [236, '人格'],
  [237, '方法'],
  [238, '方法'],
  [239, '人格'],
  [244, '政治'],
  [246, '政治'],
  [247, '政治'],
  [248, '文化'],
  [253, '知识'],
  [258, '知识'],
  [259, '方法'],
  [260, '方法'],
  [262, '知识'],
  [263, '政治'],
  [264, '人格'],
  [265, '方法'],
  [267, '文化'],
  [270, '人格'],
  [273, '写作'],
  [274, '政治'],
  [276, '法权'],
  [277, '写作'],
  [278, '写作'],
  [282, '方法'],
  [284, '情爱'],
  [286, '情爱'],
  [287, '政治'],
  [288, '人格'],
  [289, '方法'],
  [290, '写作'],
  [291, '知识'],
  [292, '文化'],
  [293, '方法'],
  [295, '文化'],
  [297, '写作'],
]);

function baseTitle(title) {
  return String(title || '').replace(/（\d{2}-\d{2}-\d+）$/, '').trim();
}

function sequenceOf(record) {
  const match = String(record.id || '').match(/(\d+)$/);
  if (!match) {
    throw new Error(`无法解析记录编号：${record.id}`);
  }
  return Number(match[1]);
}

function categoryFor(record, title) {
  const sourceSeq = sequenceOf(record);
  if (categoryOverrides.has(sourceSeq)) {
    return categoryOverrides.get(sourceSeq);
  }

  const text = title;

  if (/宪法|言论自由|守宪|权利|查禁|法权|雷震|郭冠英|自由条文|处分|知识产权|版权/.test(text)) {
    return '法权';
  }
  if (/爱情|婚姻|女人到底|女人要|新娘|佳偶|怨偶|欲望结构|胡茵梦|性观念|食色|美国梦暴露身份欲望|爱情记忆/.test(text)) {
    return '情爱';
  }
  if (/写作|文学|小说|文章|剧本|李语录|语录|文字智慧|文字密度|准确用字|表达力量|文字战场|粗话写作|苏东坡|短句/.test(text)) {
    return '写作';
  }
  if (/书法|孔孟|孔家|台湾话|语言史|俚语|文物|文化典故|殖民伤痕|文化美容|传统性观念|粗话背后|语言问题/.test(text)) {
    return '文化';
  }
  if (/风骨|傲骨|人格|独处|英雄|不服气|强者|孤独|孤立|人生观|被遗忘|记忆|亲情|感恩|功劳|虽千万人|要敢往|监狱|坐牢/.test(text)) {
    return '人格';
  }
  if (/翻译|语感|同生死|窍门|方法|想象力|触类旁通|细腻|还原|资料|材料|原始出处|测量智慧|看人|身临其境|求知|史料|历史判断|学贯中西|阶段|舞台大小|放大李敖|精细处/.test(text)) {
    return '方法';
  }
  if (/美国|台湾|中国|统一|台独|蓝绿|国民党|民进党|蒋介石|李登辉|宋楚瑜|军购|联合国|中华民国|日本|二二八|民主|独裁|卖台|祖国|权力|政治|宋美龄/.test(text)) {
    return '政治';
  }
  if (/历史|胡适|三国|典故|南北战争|陈仪|五四|求真|知识分子|纵深|孔明|曹操|周公|演艺人员|美金|学问/.test(text)) {
    return '知识';
  }

  return record.category;
}

function keywordsFor(record, title, category) {
  if (keywordOverrides.has(record.id)) {
    return keywordOverrides.get(record.id);
  }

  const pool = [
    title,
    baseTitle(record.title),
    ...(Array.isArray(record.keywords) ? record.keywords : []),
    record.source_file || '',
  ].join(' ');

  const candidates = [
    '李敖', '台湾', '中国', '美国', '日本', '台独', '蓝绿', '国民党', '蒋介石', '李登辉',
    '胡适', '雷震', '郭冠英', '殷海光', '宋楚瑜', '宋美龄', '陈仪', '苏东坡', '孔孟',
    '言论自由', '宪法', '知识分子', '历史真相', '史料', '想象力', '书法', '文物',
    '文学', '写作', '爱情', '婚姻', '女人', '风骨', '傲骨', '独处', '联合国', '军购',
  ];

  const picked = [];
  for (const candidate of candidates) {
    if (pool.includes(candidate) && !picked.includes(candidate)) {
      picked.push(candidate);
    }
    if (picked.length >= 3) break;
  }
  if (!picked.includes(category)) picked.unshift(category);
  return [...new Set(picked)].slice(0, 4);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function toCsv(records) {
  const headers = ['id', 'title', 'category', 'description', 'book', 'source_file', 'source_paragraph', 'keywords'];
  const lines = [headers.join(',')];
  for (const record of records) {
    lines.push(headers.map((header) => {
      if (header === 'keywords') return csvEscape((record.keywords || []).join(';'));
      return csvEscape(record[header]);
    }).join(','));
  }
  return `${lines.join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    '# 李敖语妙天下 思想索引（校对轮）',
    '',
    `- 书名：李敖语妙天下`,
    `- 轮次：校对轮`,
    `- 保留条目：${records.length}`,
    `- 说明：描述字段保持提取轮原文，只校对标题、分类、关键词、保留状态。`,
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.book} / ${record.source_file} / 段落 ${record.source_paragraph}`);
    lines.push(`- 关键词：${(record.keywords || []).join('、')}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => {
    return [
      `${record.id}. ${record.title}`,
      `分类：${record.category}`,
      `来源：${record.book} / ${record.source_file} / 段落 ${record.source_paragraph}`,
      `关键词：${(record.keywords || []).join('、')}`,
      record.description,
    ].join('\n');
  }).join('\n\n')}\n`;
}

function ensureUniqueTitles(records) {
  const seen = new Map();
  for (const record of records) {
    const count = seen.get(record.title) || 0;
    if (count > 0) {
      record.title = `${record.title}（${record.source_file}#${record.source_paragraph}）`;
    }
    seen.set(record.title, count + 1);
  }
}

function buildNote(inputRecords, outputRecords) {
  const dropsByReason = new Map();
  for (const [id, reason] of dropReasons.entries()) {
    if (!dropsByReason.has(reason)) dropsByReason.set(reason, []);
    dropsByReason.get(reason).push(id);
  }

  const lines = [
    '# 李敖语妙天下 校对说明',
    '',
    `- 提取轮条目：${inputRecords.length}`,
    `- 校对轮保留：${outputRecords.length}`,
    `- 校对轮剔除：${inputRecords.length - outputRecords.length}`,
    '- 校对原则：不改写 description 原文，只校正标题、分类、关键词和保留状态；重复思想保留信息量更完整或索引性更强的段落。',
    '',
    '## 剔除记录',
    '',
  ];

  for (const [reason, ids] of dropsByReason.entries()) {
    lines.push(`- ${reason}：${ids.map((id) => String(id).padStart(3, '0')).join('、')}`);
  }

  lines.push('');
  lines.push('## 分类收敛');
  lines.push('');
  const counts = new Map();
  for (const record of outputRecords) {
    counts.set(record.category, (counts.get(record.category) || 0) + 1);
  }
  for (const category of ['政治', '方法', '知识', '写作', '法权', '人格', '文化', '情爱']) {
    if (counts.has(category)) {
      lines.push(`- ${category}：${counts.get(category)}`);
    }
  }

  lines.push('');
  return `${lines.join('\n')}\n`;
}

const inputPayload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const inputRecords = Array.isArray(inputPayload) ? inputPayload : inputPayload.records;
if (!Array.isArray(inputRecords)) {
  throw new Error('提取轮 JSON 未找到 records 数组');
}
const inputSeqs = new Set(inputRecords.map((record) => sequenceOf(record)));
const missingDrops = [...dropReasons.keys()].filter((id) => !inputSeqs.has(id));
const missingTitles = [...titleOverrides.keys()].filter((id) => !inputSeqs.has(id));

if (missingDrops.length || missingTitles.length) {
  throw new Error(`校对配置包含不存在的 id：drops=${missingDrops.join(',')} titles=${missingTitles.join(',')}`);
}

const outputRecords = [];
for (const record of inputRecords) {
  const sourceSeq = sequenceOf(record);
  if (dropReasons.has(sourceSeq)) continue;

  const title = titleOverrides.get(sourceSeq) || baseTitle(record.title);
  const category = categoryFor(record, title);
  if (!categories.has(category)) {
    throw new Error(`未知分类：${record.id} ${category}`);
  }

  outputRecords.push({
    ...record,
    id: `LAT089-${String(outputRecords.length + 1).padStart(3, '0')}`,
    source_id: record.source_id || record.id,
    title,
    category,
    keywords: keywordsFor({ ...record, id: sourceSeq }, title, category),
    round: '校对轮',
    status: '已校对',
  });
}

ensureUniqueTitles(outputRecords);

const categoryCounts = [...categories].map((category) => ({
  category,
  count: outputRecords.filter((record) => record.category === category).length,
})).filter((item) => item.count > 0);

const payload = {
  book: {
    ...(inputPayload.book || {}),
    sequence: '089',
    title: '李敖语妙天下',
    round: '校对轮',
    status: '已校对',
    note: '校对轮删除同题重复、节目串场、单纯现场展示和索引独立性较弱的条目；将节目题改为可检索的思想判断题，并收敛政治、法权、方法、知识、写作、人格、文化、情爱分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    record_count: outputRecords.length,
    candidate_count: inputRecords.length,
    skipped_duplicate_count: 0,
    skipped_duplicates: [],
    category_counts: categoryCounts,
    source_count: inputRecords.length,
    dropped_count: inputRecords.length - outputRecords.length,
  },
  records: outputRecords,
};

fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputCsv, toCsv(outputRecords), 'utf8');
fs.writeFileSync(outputMd, toMarkdown(outputRecords), 'utf8');
fs.writeFileSync(canonicalJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(canonicalCsv, toCsv(outputRecords), 'utf8');
fs.writeFileSync(canonicalTxt, toTxt(outputRecords), 'utf8');
fs.writeFileSync(proofreadNote, buildNote(inputRecords, outputRecords), 'utf8');

console.log(JSON.stringify({
  book: '李敖语妙天下',
  input: inputRecords.length,
  output: outputRecords.length,
  dropped: inputRecords.length - outputRecords.length,
  files: [
    path.relative(repoRoot, outputJson),
    path.relative(repoRoot, outputCsv),
    path.relative(repoRoot, outputMd),
    path.relative(repoRoot, canonicalJson),
    path.relative(repoRoot, canonicalCsv),
    path.relative(repoRoot, canonicalTxt),
    path.relative(repoRoot, proofreadNote),
  ],
}, null, 2));
