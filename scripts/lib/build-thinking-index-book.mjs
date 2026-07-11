import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(taxonomy);
const decoder = new TextDecoder('gb18030');

function sourceFiles(sourceDir) {
  return fs.readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt') && !name.includes('目录'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function paragraphs(sourceDir, fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)))
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function parseSpecs(specLines, allSourceFiles) {
  return specLines.trim().split(/\n+/).map((line, index) => {
    const [fileToken, paragraphText, title, category, keywordText, ...extra] = line.split('|');
    if (extra.length || !fileToken || !paragraphText || !title || !category || !keywordText) {
      throw new Error(`Invalid spec line ${index + 1}: ${line}`);
    }
    if (!categorySet.has(category)) throw new Error(`Invalid category: ${category}`);
    const matches = fileToken === '序'
      ? allSourceFiles.filter((name) => name.includes('自序'))
      : allSourceFiles.filter((name) => (
        name.startsWith(`${fileToken}.`)
        || (!/^\d+$/.test(fileToken) && name.includes(fileToken))
      ));
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
  const headers = [
    'id', 'book', 'round', 'status', 'category', 'title', 'description',
    'source_file', 'source_paragraph', 'source_path', 'keywords',
  ];
  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, bookTitle, round, records) {
  const lines = [
    `# ${bookTitle}思想索引（${round}）`, '',
    `- 书名：${bookTitle}`,
    `- 条目：${records.length}`,
    '- 说明：标题用于检索浓缩，description 保留源文原段落。', '',
  ];
  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`, '');
    for (const item of items) {
      lines.push(
        `### ${item.id} ${item.title}`, '',
        `出处：${item.source_file}#${item.source_paragraph}`,
        `关键词：${item.keywords.join('、')}`, '',
        item.description, '',
      );
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

export function buildThinkingIndexBook(config) {
  const rootDir = process.cwd();
  const {
    sequence,
    bookTitle,
    slug,
    sourceBookDir,
    expectedSourceFiles,
    expectedParagraphs,
    specLines,
    note,
    extractionPrinciples = [],
  } = config;
  const round = '提取轮';
  const status = '待校对';
  const sourceDir = path.join(rootDir, sourceBookDir);
  const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');

  const allSourceFiles = sourceFiles(sourceDir);
  if (allSourceFiles.length !== expectedSourceFiles) {
    throw new Error(`Expected ${expectedSourceFiles} source files, found ${allSourceFiles.length}`);
  }
  const paragraphMap = new Map(allSourceFiles.map((name) => [name, paragraphs(sourceDir, name)]));
  const sourceParagraphCount = [...paragraphMap.values()].reduce((sum, items) => sum + items.length, 0);
  if (sourceParagraphCount !== expectedParagraphs) {
    throw new Error(`Expected ${expectedParagraphs} paragraphs, found ${sourceParagraphCount}`);
  }

  const specs = parseSpecs(specLines, allSourceFiles);
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
      if (seen.has(candidate[key])) {
        throw new Error(`Duplicate candidate ${key}: ${candidate.fileName}#${candidate.source_paragraph}`);
      }
      seen.set(candidate[key], candidate);
    }
  }

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const priorByDescription = new Map();
  for (const record of master.records) {
    if (record.book !== bookTitle && !priorByDescription.has(record.description)) {
      priorByDescription.set(record.description, record);
    }
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
      note,
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
  writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), bookTitle, round, records);
  fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  writeCsv(path.join(outputDir, '思想索引.csv'), records);
  writeTxt(path.join(outputDir, '思想索引.txt'), records);

  const extractionNote = [
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
    ...extractionPrinciples.map((item) => `- ${item}`),
    '- 分类固定为八个原子分类，不为本书临时增加复合分类。',
    '- 标题用于检索浓缩；description 保留源文原段落。', '',
    '## 重复来源', '',
    ...(skippedDuplicates.length
      ? skippedDuplicates.map((item) => `- ${item.source_file}#${item.source_paragraph} = ${item.previous_book} ${item.previous_id}`)
      : ['- 无']), '',
    '## 分类统计', '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`), '',
  ].join('\n');
  fs.writeFileSync(path.join(outputDir, '提取说明.md'), extractionNote, 'utf8');

  const result = {
    book: bookTitle,
    candidates: candidates.length,
    records: records.length,
    source_file_count: allSourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    skipped_duplicate_count: skippedDuplicates.length,
    category_counts: payload.book.category_counts,
  };
  console.log(JSON.stringify(result, null, 2));
  return result;
}
