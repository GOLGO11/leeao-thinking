import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sourceRoot = path.join(projectRoot, '《大李敖全集6.0》分章节');
const categoryDir = path.join(sourceRoot, '003.惊世杂文类');
const sourceBookDir = fs
  .readdirSync(categoryDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(categoryDir, entry.name))
  .find((dir) => path.basename(dir).startsWith('005.'));

if (!sourceBookDir) {
  throw new Error('未找到《世论新语》源文目录');
}

const outputDir = path.join(projectRoot, 'outputs', '020.世论新语');
fs.mkdirSync(outputDir, { recursive: true });

const decoder = new TextDecoder('gb18030');
const sourceFiles = fs
  .readdirSync(sourceBookDir)
  .filter((name) => name.endsWith('.txt') && !name.includes('目录'))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }));

const paragraphCache = new Map();

function readParagraphs(filename) {
  if (!paragraphCache.has(filename)) {
    const text = decoder.decode(fs.readFileSync(path.join(sourceBookDir, filename)));
    const paragraphs = text
      .replace(/\r\n/g, '\n')
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean);
    paragraphCache.set(filename, paragraphs);
  }
  return paragraphCache.get(filename);
}

function resolveSourceFile(sourceKey) {
  const matches = sourceFiles.filter((name) => {
    const base = path.basename(name, '.txt');
    return base === sourceKey || base.startsWith(`${sourceKey}.`) || base.includes(sourceKey);
  });

  if (matches.length !== 1) {
    throw new Error(`源文件匹配异常: ${sourceKey} -> ${matches.join(', ')}`);
  }

  return matches[0];
}

const book = {
  sequence: '020',
  title: '世论新语',
  slug: 'shilun-xinyu',
  sourceDir: path.relative(projectRoot, sourceBookDir).replace(/\\/g, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《世论新语》短论群中提取可复用的思想索引，重在政治、法权、知识分子、文体与公共伦理等命题；短篇较多，未按篇目机械逐篇收录。',
};

const taxonomy = {
  writing: '写作',
  method: '方法',
  knowledge: '知识',
  character: '人格',
  culture: '文化',
  politics: '政治',
  law: '法权',
};

const entries = [
  {
    sourceKey: '自序',
    paragraph: 4,
    category: taxonomy.writing,
    title: '桐城义法困于道统',
    keywords: ['桐城派', '义法', '道统', '古文'],
  },
  {
    sourceKey: '自序',
    paragraph: 5,
    category: taxonomy.writing,
    title: '梁启超使文言平易有力',
    keywords: ['梁启超', '文言', '平易', '笔势'],
  },
  {
    sourceKey: '自序',
    paragraph: 6,
    category: taxonomy.writing,
    title: '文言再活也是死文字',
    keywords: ['文言', '白话文', '文字', '生命'],
  },
  {
    sourceKey: '自序',
    paragraph: 7,
    category: taxonomy.writing,
    title: '白话失败多因思想混乱',
    keywords: ['白话文', '文章', '思想', '混乱'],
  },
  {
    sourceKey: '自序',
    paragraph: 8,
    category: taxonomy.writing,
    title: '短促突击成为文体',
    keywords: ['短促突击', '文体', '专栏', '世论新语'],
  },
  {
    sourceKey: '002',
    paragraph: 2,
    category: taxonomy.politics,
    title: '无原则互用皆无耻',
    keywords: ['国民党', '民进党', '无耻', '政治利用'],
  },
  {
    sourceKey: '003',
    paragraph: 4,
    category: taxonomy.politics,
    title: '退党应为政见非私利',
    keywords: ['退党', '政见', '提名', '政治原则'],
  },
  {
    sourceKey: '004',
    paragraph: 3,
    category: taxonomy.knowledge,
    title: '媒体颠倒读书人骨气',
    keywords: ['读书人', '骨气', '民意机关', '媒体'],
  },
  {
    sourceKey: '005',
    paragraph: 3,
    category: taxonomy.law,
    title: '人权者先面对本地黑暗',
    keywords: ['人权', '监狱', '台湾', '实地调查'],
  },
  {
    sourceKey: '007',
    paragraph: 3,
    category: taxonomy.politics,
    title: '威权惯用睁眼说瞎话',
    keywords: ['国民党', '瞎话', '欺骗', '威权'],
  },
  {
    sourceKey: '008',
    paragraph: 2,
    category: taxonomy.politics,
    title: '欺骗人比欺负人更坏',
    keywords: ['欺骗', '欺负', '言论自由', '国民党'],
  },
  {
    sourceKey: '008',
    paragraph: 3,
    category: taxonomy.writing,
    title: '谎话粗制滥造也可耻',
    keywords: ['说谎', '谎话', '言论自由', '宣传'],
  },
  {
    sourceKey: '009',
    paragraph: 3,
    category: taxonomy.writing,
    title: '写作者还要面对出版者读者',
    keywords: ['写作', '出版者', '读者', '发行'],
  },
  {
    sourceKey: '010',
    paragraph: 3,
    category: taxonomy.politics,
    title: '被欺瞒不能开脱领袖',
    keywords: ['领袖', '蒙蔽', '责任', '政治神话'],
  },
  {
    sourceKey: '011',
    paragraph: 4,
    category: taxonomy.law,
    title: '总统没有侵占市产之权',
    keywords: ['总统', '宪法', '市产', '权力边界'],
  },
  {
    sourceKey: '013',
    paragraph: 4,
    category: taxonomy.politics,
    title: '为政不在日理万机',
    keywords: ['无为而治', '行政', '分工', '治道'],
  },
  {
    sourceKey: '014',
    paragraph: 3,
    category: taxonomy.culture,
    title: '历史公道也该给原住民',
    keywords: ['原住民', '二二八', '历史公道', '受难'],
  },
  {
    sourceKey: '015',
    paragraph: 4,
    category: taxonomy.culture,
    title: '原住民面前都该反省',
    keywords: ['原住民', '台湾人', '侵略者', '历史身份'],
  },
  {
    sourceKey: '016',
    paragraph: 3,
    category: taxonomy.method,
    title: '改词不能解决问题',
    keywords: ['名词', '舞女', '政治', '问题解决'],
  },
  {
    sourceKey: '017',
    paragraph: 3,
    category: taxonomy.knowledge,
    title: '历史照片不可任意加工',
    keywords: ['历史照片', '剪报', '新闻', '史料'],
  },
  {
    sourceKey: '021',
    paragraph: 3,
    category: taxonomy.politics,
    title: '财产公开还要说明来源',
    keywords: ['财产公开', '财产来源', '政治人物', '监察'],
  },
  {
    sourceKey: '025',
    paragraph: 3,
    category: taxonomy.character,
    title: '未明事实不宜借题发挥',
    keywords: ['事实', '公平', '攻击', '政治评论'],
  },
  {
    sourceKey: '025',
    paragraph: 4,
    category: taxonomy.character,
    title: '对异见者也要公道',
    keywords: ['公道', '异见', '江南', '公平'],
  },
  {
    sourceKey: '035',
    paragraph: 2,
    category: taxonomy.law,
    title: '立法给别人守',
    keywords: ['国民党', '立法', '守法', '特权'],
  },
  {
    sourceKey: '035',
    paragraph: 4,
    category: taxonomy.law,
    title: '政府玩法会自毁',
    keywords: ['政府', '法律', '倒楣', '威信'],
  },
  {
    sourceKey: '038',
    paragraph: 2,
    category: taxonomy.law,
    title: '宪法自由被课本化',
    keywords: ['宪法', '自由权', '课本', '人民权利'],
  },
  {
    sourceKey: '038',
    paragraph: 4,
    category: taxonomy.law,
    title: '认真执行宪法反显荒谬',
    keywords: ['宪法', '自由居住', '迁徙自由', '反讽'],
  },
  {
    sourceKey: '040',
    paragraph: 3,
    category: taxonomy.character,
    title: '勿替历史惭愧而逃避自身',
    keywords: ['查禁', '惭愧', '当代', '懦弱'],
  },
  {
    sourceKey: '070',
    paragraph: 3,
    category: taxonomy.politics,
    title: '革命口号可空心化',
    keywords: ['国民党', '革命', '利益集团', '口号'],
  },
  {
    sourceKey: '070',
    paragraph: 4,
    category: taxonomy.politics,
    title: '政党属性可能羊头狗肉',
    keywords: ['民进党', '民主', '进步', '政党属性'],
  },
  {
    sourceKey: '071',
    paragraph: 3,
    category: taxonomy.law,
    title: '司法法务须摆脱政党',
    keywords: ['司法', '法务', '政党', '独立'],
  },
  {
    sourceKey: '075',
    paragraph: 3,
    category: taxonomy.method,
    title: '点名指控不是证据',
    keywords: ['推理', '证据', '特务', '指控'],
  },
  {
    sourceKey: '076',
    paragraph: 4,
    category: taxonomy.law,
    title: '调查不能绕开涉案人',
    keywords: ['调查', '检察官', '涉案人', '法务部长'],
  },
  {
    sourceKey: '079',
    paragraph: 3,
    category: taxonomy.law,
    title: '紧急避难处理权利冲突',
    keywords: ['紧急避难', '权利冲突', '刑法', '避险'],
  },
  {
    sourceKey: '079',
    paragraph: 4,
    category: taxonomy.law,
    title: '不能用司法替自己垫背',
    keywords: ['司法', '法务部', '政治责任', '权利'],
  },
  {
    sourceKey: '089',
    paragraph: 5,
    category: taxonomy.law,
    title: '乱命不值得遵守',
    keywords: ['乱命', '行政办法', '遵命', '法治'],
  },
  {
    sourceKey: '090',
    paragraph: 3,
    category: taxonomy.politics,
    title: '无为使政府少讨厌',
    keywords: ['无为', '政府', '纪念日', '政治厌恶'],
  },
  {
    sourceKey: '090',
    paragraph: 4,
    category: taxonomy.politics,
    title: '纪念办法越多越倒胃',
    keywords: ['纪念', '政治符号', '国庆', '反感'],
  },
  {
    sourceKey: '095',
    paragraph: 4,
    category: taxonomy.character,
    title: '虽千万人吾往矣',
    keywords: ['余登发', '台独', '大是大非', '勇气'],
  },
  {
    sourceKey: '096',
    paragraph: 3,
    category: taxonomy.character,
    title: '大丈夫还须时髦不能动',
    keywords: ['大丈夫', '时髦', '孟子', '余登发'],
  },
  {
    sourceKey: '096',
    paragraph: 4,
    category: taxonomy.character,
    title: '犯小人之怒更难',
    keywords: ['勇气', '小人', '日寇', '国民党'],
  },
  {
    sourceKey: '102',
    paragraph: 3,
    category: taxonomy.writing,
    title: '骂人不能气死自己',
    keywords: ['骂人', '幽默', '文章', '情绪'],
  },
  {
    sourceKey: '107',
    paragraph: 3,
    category: taxonomy.law,
    title: '人权不该从大官发端',
    keywords: ['人权', '律师', '普通人', '权利保护'],
  },
  {
    sourceKey: '108',
    paragraph: 3,
    category: taxonomy.law,
    title: '程序权利被剥夺',
    keywords: ['诉讼权', '接见', '阅卷', '冤狱'],
  },
  {
    sourceKey: '109',
    paragraph: 3,
    category: taxonomy.culture,
    title: '可耻遗迹不必万世流芳',
    keywords: ['历史遗迹', '保留', '可耻', '文化资产'],
  },
  {
    sourceKey: '110',
    paragraph: 5,
    category: taxonomy.politics,
    title: '公共遗迹可利众生',
    keywords: ['圆山', '公共利益', '遗迹', '众生'],
  },
  {
    sourceKey: '112',
    paragraph: 4,
    category: taxonomy.culture,
    title: '裸体不必破坏形象',
    keywords: ['裸体', '形象', '蒋经国', '身体观'],
  },
  {
    sourceKey: '113',
    paragraph: 4,
    category: taxonomy.culture,
    title: '孝道标准不可自相矛盾',
    keywords: ['孝道', '裸体', '尸体', '标准一致'],
  },
  {
    sourceKey: '120',
    paragraph: 3,
    category: taxonomy.character,
    title: '恩义不该被政治利益抹掉',
    keywords: ['郑南榕', '恩义', '停刊', '政治利益'],
  },
  {
    sourceKey: '121',
    paragraph: 3,
    category: taxonomy.character,
    title: '勇气须站在正义上',
    keywords: ['勇气', '正义', '张富忠', '不义'],
  },
  {
    sourceKey: '121',
    paragraph: 4,
    category: taxonomy.character,
    title: '见不义乱为勇气泡汤',
    keywords: ['勇气', '不义', '滥用', '政治行为'],
  },
  {
    sourceKey: '122',
    paragraph: 4,
    category: taxonomy.politics,
    title: '政治责任高于法律责任',
    keywords: ['政治责任', '法律责任', '官员', '去职'],
  },
  {
    sourceKey: '123',
    paragraph: 4,
    category: taxonomy.character,
    title: '抗议需要辞职勇气',
    keywords: ['抗议', '辞职', '勇气', '检察官'],
  },
  {
    sourceKey: '124',
    paragraph: 3,
    category: taxonomy.politics,
    title: '政治问题不能靠法律清白',
    keywords: ['政治问题', '法律问题', '行政院长', '部长'],
  },
  {
    sourceKey: '125',
    paragraph: 3,
    category: taxonomy.politics,
    title: '行政魄力在快刀斩乱麻',
    keywords: ['郝柏村', '行政魄力', '快刀斩乱麻', '用人'],
  },
  {
    sourceKey: '125',
    paragraph: 6,
    category: taxonomy.politics,
    title: '被阁员拖着走最糟',
    keywords: ['行政院长', '阁员', '派系', '决断'],
  },
  {
    sourceKey: '128',
    paragraph: 4,
    category: taxonomy.politics,
    title: '共患难者争权违背伦理',
    keywords: ['难友', '辩护律师', '政治伦理', '民进党'],
  },
  {
    sourceKey: '132',
    paragraph: 3,
    category: taxonomy.method,
    title: '回归宪法不能同时要求违宪',
    keywords: ['宪法', '矛盾', '总统权力', '政治思考'],
  },
  {
    sourceKey: '134',
    paragraph: 3,
    category: taxonomy.knowledge,
    title: '建国史不能归功国民党',
    keywords: ['中华民国', '国民党', '建国史', '清朝'],
  },
  {
    sourceKey: '134',
    paragraph: 6,
    category: taxonomy.law,
    title: '国家承认不同于政府承认',
    keywords: ['国际法', '国家承认', '政府承认', '中华民国'],
  },
  {
    sourceKey: '136',
    paragraph: 5,
    category: taxonomy.politics,
    title: '霸才不会被打垮',
    keywords: ['霸才', '人才', '权力斗争', '民进党'],
  },
  {
    sourceKey: '137',
    paragraph: 4,
    category: taxonomy.politics,
    title: '党外催生者也可是真创始',
    keywords: ['许信良', '民进党', '创党', '催生'],
  },
  {
    sourceKey: '140',
    paragraph: 5,
    category: taxonomy.method,
    title: '严肃目标不能儿戏处理',
    keywords: ['政治抗议', '儿戏', '退税', '游行'],
  },
  {
    sourceKey: '142',
    paragraph: 3,
    category: taxonomy.law,
    title: '台湾论述要合历史地理法理',
    keywords: ['台湾问题', '中国内政', '历史', '国际法'],
  },
  {
    sourceKey: '143',
    paragraph: 2,
    category: taxonomy.politics,
    title: '未统治到不等于可自外中央',
    keywords: ['台湾', '中央政府', '统治', '中国'],
  },
  {
    sourceKey: '143',
    paragraph: 3,
    category: taxonomy.knowledge,
    title: '小地方仍在中国历史框架',
    keywords: ['台湾', '历史比喻', '中国', '秦国'],
  },
  {
    sourceKey: '144',
    paragraph: 3,
    category: taxonomy.law,
    title: '条约用词足以辨明归属',
    keywords: ['开罗宣言', '波茨坦公告', '台湾归属', '国际法'],
  },
  {
    sourceKey: '151',
    paragraph: 4,
    category: taxonomy.character,
    title: '知识分子不能逃避现实',
    keywords: ['知识分子', '现实', '书法', '勇气'],
  },
  {
    sourceKey: '151',
    paragraph: 6,
    category: taxonomy.knowledge,
    title: '知识分子标准错乱',
    keywords: ['知识分子', '标准', '奖项', '文化评价'],
  },
  {
    sourceKey: '152',
    paragraph: 3,
    category: taxonomy.character,
    title: '真知识分子不忘名义廉隅',
    keywords: ['知识分子', '名义', '廉隅', '书法'],
  },
  {
    sourceKey: '153',
    paragraph: 5,
    category: taxonomy.character,
    title: '判断主君不是愚忠',
    keywords: ['忠诚', '判断', '程咬金', '君臣'],
  },
  {
    sourceKey: '157',
    paragraph: 4,
    category: taxonomy.culture,
    title: '神权遗产不是自由解放',
    keywords: ['达赖', '西藏', '神权', '自由'],
  },
  {
    sourceKey: '157',
    paragraph: 5,
    category: taxonomy.politics,
    title: '和平奖误读自由解放',
    keywords: ['诺贝尔和平奖', '达赖', '自由', '解放'],
  },
  {
    sourceKey: '158',
    paragraph: 3,
    category: taxonomy.politics,
    title: '非暴力可只是遁词',
    keywords: ['非暴力', '达赖', '西藏独立', '政治策略'],
  },
  {
    sourceKey: '160',
    paragraph: 2,
    category: taxonomy.method,
    title: '非暴力未必理论自足',
    keywords: ['非暴力', '方法', '达赖', '理论'],
  },
  {
    sourceKey: '161',
    paragraph: 3,
    category: taxonomy.politics,
    title: '神权背后有财权特权',
    keywords: ['神权', '财权', '达赖', '特权'],
  },
  {
    sourceKey: '161',
    paragraph: 4,
    category: taxonomy.culture,
    title: '同情神权不是同情自由',
    keywords: ['达赖', '同情', '神权', '自由'],
  },
  {
    sourceKey: '162',
    paragraph: 2,
    category: taxonomy.culture,
    title: '西藏农奴制度是黑暗世界',
    keywords: ['西藏', '农奴制度', '神权', '黑暗'],
  },
  {
    sourceKey: '167',
    paragraph: 3,
    category: taxonomy.knowledge,
    title: '知识分子不该迷信邪教',
    keywords: ['知识分子', '密宗', '迷信', '邪教'],
  },
  {
    sourceKey: '172',
    paragraph: 3,
    category: taxonomy.method,
    title: '中国事实优先于理论',
    keywords: ['中国', '事实', '理论', '现实判断'],
  },
  {
    sourceKey: '174',
    paragraph: 3,
    category: taxonomy.politics,
    title: '非暴力不能只是口号',
    keywords: ['非暴力', '甘地', '政治运动', '暴力'],
  },
  {
    sourceKey: '174',
    paragraph: 4,
    category: taxonomy.politics,
    title: '圣人名义落到政客会走样',
    keywords: ['甘地', '非暴力', '政客', '走样'],
  },
  {
    sourceKey: '175',
    paragraph: 3,
    category: taxonomy.character,
    title: '真支援是雪中送炭',
    keywords: ['雪中送炭', '锦上添花', '勇气', '支援'],
  },
  {
    sourceKey: '175',
    paragraph: 5,
    category: taxonomy.character,
    title: '安全时作秀不算勇敢',
    keywords: ['勇敢', '政治支持', '作秀', '风险'],
  },
  {
    sourceKey: '180',
    paragraph: 4,
    category: taxonomy.law,
    title: '宪政需要总统无为',
    keywords: ['宪法', '总统', '无为', '权力限制'],
  },
  {
    sourceKey: '187',
    paragraph: 4,
    category: taxonomy.politics,
    title: '民主气质会被暴力破坏',
    keywords: ['民主', '气质', '民进党', '粗暴'],
  },
  {
    sourceKey: '187',
    paragraph: 5,
    category: taxonomy.politics,
    title: '粗暴政治革民主的命',
    keywords: ['革命', '民主', '民进党', '政治粗暴'],
  },
  {
    sourceKey: '188',
    paragraph: 3,
    category: taxonomy.culture,
    title: '宗教应具体救众生',
    keywords: ['佛教', '宗教', '众生', '行动'],
  },
  {
    sourceKey: '189',
    paragraph: 5,
    category: taxonomy.politics,
    title: '反对派也会重演旧恶',
    keywords: ['民进党', '国民党', '反对派', '政治伦理'],
  },
  {
    sourceKey: '189',
    paragraph: 6,
    category: taxonomy.character,
    title: '同志爱不是利用别人坐牢',
    keywords: ['同志爱', '许信良', '坐牢', '政治伦理'],
  },
  {
    sourceKey: '193',
    paragraph: 3,
    category: taxonomy.culture,
    title: '官僚文化部会毁文化',
    keywords: ['文化部', '官僚', '文化政策', '郝柏村'],
  },
  {
    sourceKey: '194',
    paragraph: 3,
    category: taxonomy.character,
    title: '迫害知识分子不是尊重',
    keywords: ['知识分子', '迫害', '国民党', '尊重'],
  },
  {
    sourceKey: '197',
    paragraph: 4,
    category: taxonomy.law,
    title: '重典应先问大官责任',
    keywords: ['重典', '大官', '责任', '执法'],
  },
  {
    sourceKey: '198',
    paragraph: 5,
    category: taxonomy.law,
    title: '法律威信被儿戏化',
    keywords: ['法律威信', '儿戏', '国民党', '法治'],
  },
  {
    sourceKey: '198',
    paragraph: 6,
    category: taxonomy.law,
    title: '守法重于立法',
    keywords: ['守法', '立法', '司法独立', '法治'],
  },
  {
    sourceKey: '199',
    paragraph: 2,
    category: taxonomy.law,
    title: '司法系统被政治干涉毁坏',
    keywords: ['司法', '国民党', '法官', '干涉'],
  },
  {
    sourceKey: '199',
    paragraph: 3,
    category: taxonomy.law,
    title: '放手后法官也未必可用',
    keywords: ['法官', '司法改革', '政治污染', '独立'],
  },
  {
    sourceKey: '200',
    paragraph: 6,
    category: taxonomy.knowledge,
    title: '批判也要记住历史对象',
    keywords: ['蒋介石', '记忆', '批判', '历史'],
  },
  {
    sourceKey: '203',
    paragraph: 4,
    category: taxonomy.character,
    title: '恶棍少做坏事就被夸',
    keywords: ['恶棍', '坏事', '政治评价', '标准'],
  },
  {
    sourceKey: '204',
    paragraph: 3,
    category: taxonomy.law,
    title: '公平也该还给早期受难者',
    keywords: ['白色恐怖', '公平', '美丽岛', '受难者'],
  },
  {
    sourceKey: '204',
    paragraph: 4,
    category: taxonomy.politics,
    title: '不该垄断苦难成果',
    keywords: ['美丽岛', '苦难', '民进党', '政治成果'],
  },
  {
    sourceKey: '204',
    paragraph: 6,
    category: taxonomy.character,
    title: '不求回报才见真情',
    keywords: ['不求回报', '真情', '救援', '政治受难'],
  },
  {
    sourceKey: '208',
    paragraph: 4,
    category: taxonomy.law,
    title: '短期违宪也是违宪',
    keywords: ['违宪', '临时条款', '国代', '民进党'],
  },
  {
    sourceKey: '209',
    paragraph: 4,
    category: taxonomy.law,
    title: '延长任期同属违宪',
    keywords: ['延任', '国代', '违宪', '临时条款'],
  },
  {
    sourceKey: '210',
    paragraph: 6,
    category: taxonomy.culture,
    title: '知识分子政客搞低级迷信',
    keywords: ['迷信', '政客', '庙', '知识分子'],
  },
  {
    sourceKey: '217',
    paragraph: 3,
    category: taxonomy.politics,
    title: '为政不可事必躬亲',
    keywords: ['为政', '事必躬亲', '行政', '层次'],
  },
  {
    sourceKey: '218',
    paragraph: 2,
    category: taxonomy.method,
    title: '为治有体上下不可相侵',
    keywords: ['为治有体', '上下分工', '治理', '体统'],
  },
  {
    sourceKey: '218',
    paragraph: 3,
    category: taxonomy.politics,
    title: '大小不分是政治渺小',
    keywords: ['政治', '大小不分', '渺小', '格局'],
  },
  {
    sourceKey: '220',
    paragraph: 3,
    category: taxonomy.politics,
    title: '共牢难友争权难看',
    keywords: ['难友', '党主席', '权力', '政治伦理'],
  },
  {
    sourceKey: '223',
    paragraph: 3,
    category: taxonomy.politics,
    title: '选举也服务统治',
    keywords: ['选举', '统治', '德国', '威权'],
  },
  {
    sourceKey: '223',
    paragraph: 4,
    category: taxonomy.politics,
    title: '选举戏制造民主假象',
    keywords: ['选举', '民主假象', '民进党', '国民党'],
  },
  {
    sourceKey: '224',
    paragraph: 2,
    category: taxonomy.politics,
    title: '两党迷信选举各有所图',
    keywords: ['选举', '民进党', '国民党', '政治工具'],
  },
  {
    sourceKey: '224',
    paragraph: 4,
    category: taxonomy.politics,
    title: '选举可被各党工具化',
    keywords: ['选举', '统战', '民进党', '国民党'],
  },
  {
    sourceKey: '226',
    paragraph: 2,
    category: taxonomy.politics,
    title: '民进党复制极权门槛',
    keywords: ['民进党', '入党', '极权', '党组织'],
  },
  {
    sourceKey: '226',
    paragraph: 4,
    category: taxonomy.politics,
    title: '政党气度要容纳族群',
    keywords: ['政党', '族群', '大陆人', '气度'],
  },
  {
    sourceKey: '230',
    paragraph: 3,
    category: taxonomy.character,
    title: '忘恩不义应受谴责',
    keywords: ['忘恩负义', '施明德', '苏秋镇', '谴责'],
  },
  {
    sourceKey: '233',
    paragraph: 4,
    category: taxonomy.character,
    title: '敌人也不该被诬蔑',
    keywords: ['敌人', '公平', '诬蔑', '人格'],
  },
  {
    sourceKey: '233',
    paragraph: 5,
    category: taxonomy.character,
    title: '批评敌人也要守事实',
    keywords: ['批评', '敌人', '事实', '公平'],
  },
  {
    sourceKey: '235',
    paragraph: 3,
    category: taxonomy.politics,
    title: '民主斗争要文武兼具',
    keywords: ['民主斗争', '苏秋镇', '文武', '政治行动'],
  },
  {
    sourceKey: '235',
    paragraph: 5,
    category: taxonomy.law,
    title: '代议士要紧追人民权利',
    keywords: ['立法委员', '人民权利', '监督', '制度'],
  },
  {
    sourceKey: '236',
    paragraph: 3,
    category: taxonomy.politics,
    title: '民主初选不能只给副手',
    keywords: ['初选', '总统', '副总统', '民主'],
  },
  {
    sourceKey: '240',
    paragraph: 3,
    category: taxonomy.politics,
    title: '行政首长越位管小事',
    keywords: ['行政院长', '越位', '小事', '权责'],
  },
  {
    sourceKey: '240',
    paragraph: 5,
    category: taxonomy.culture,
    title: '行政首长不该迷信谄神',
    keywords: ['行政院长', '迷信', '妈祖', '理性政治'],
  },
];

const records = entries.map((entry, index) => {
  const filename = resolveSourceFile(entry.sourceKey);
  const paragraphs = readParagraphs(filename);
  const description = paragraphs[entry.paragraph - 1];

  if (!description) {
    throw new Error(`缺少段落: ${filename} P${entry.paragraph}`);
  }

  return {
    id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category: entry.category,
    title: entry.title,
    description,
    source_file: filename,
    source_paragraph: entry.paragraph,
    source_path: path.relative(projectRoot, path.join(sourceBookDir, filename)).replace(/\\/g, '/'),
    keywords: entry.keywords.join(','),
  };
});

const expectedCount = 123;
if (records.length !== expectedCount) {
  throw new Error(`条目数量异常: ${records.length} !== ${expectedCount}`);
}

const payload = {
  book,
  taxonomy: Object.values(taxonomy),
  records,
};

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.json'), `${JSON.stringify(payload, null, 2)}\n`);

const csvRows = [
  ['id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'],
  ...records.map((record) => [
    record.id,
    record.book,
    record.round,
    record.status,
    record.category,
    record.title,
    record.description,
    record.source_file,
    record.source_paragraph,
    record.source_path,
    record.keywords,
  ]),
];

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.csv'), `${csvRows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`);

const txt = [
  `# 《${book.title}》思想索引（${book.round}）`,
  '',
  `状态：${book.status}`,
  `源目录：${book.sourceDir}`,
  `条目数：${records.length}`,
  '',
  ...records.flatMap((record) => [
    `## ${record.id} ${record.title}`,
    `分类：${record.category}`,
    `出处：${record.source_file} / P${record.source_paragraph}`,
    `关键词：${record.keywords}`,
    '',
    record.description,
    '',
  ]),
];

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), `${txt.join('\n')}\n`);

const categoryLines = Object.values(taxonomy).map((category) => {
  const count = records.filter((record) => record.category === category).length;
  return `- ${category}：${count}`;
});

const note = [
  `# 《${book.title}》提取说明`,
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryLines,
  '',
  '## 提取原则',
  '',
  '- 标题为检索用浓缩标题。',
  '- `description` 保留源文原段落，由脚本按源文件段号抽取。',
  '- 本书多为短促政论，本轮只收可独立检索的判断段、方法段和结论段，不按篇目机械平均分配。',
  '- 纯新闻附录、来信原文和被引用长段，除非承载明确且可归入李敖论证的思想判断，否则不单独收录。',
  '',
];

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${note.join('\n')}\n`);

console.log(`已生成 ${records.length} 条《${book.title}》思想索引（${book.round}）：${outputDir}`);
