import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const indexPath = process.argv[2]
  ? path.resolve(rootDir, process.argv[2])
  : path.join(rootDir, 'outputs', '001.李敖自传与回忆', '思想索引-提取轮.json');
const decoder = new TextDecoder('gb18030');

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function paragraphs(record) {
  const fullPath = record.source_path
    ? path.resolve(rootDir, record.source_path)
    : path.join(
      rootDir,
      '《大李敖全集6.0》分章节',
      '001.自传回忆类',
      '001.李敖自传与回忆',
      record.source_file,
    );
  const text = decoder.decode(fs.readFileSync(fullPath));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const payload = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const { records } = payload;
const expectedSequence = payload.book?.sequence ?? records[0]?.id?.match(/^LAT(\d{3})-/)?.[1] ?? '001';
const paragraphCache = new Map();
const seenDescriptions = new Map();

records.forEach((record, index) => {
  const expectedId = `LAT${expectedSequence}-${String(index + 1).padStart(3, '0')}`;
  if (record.id !== expectedId) {
    fail(`ID mismatch at row ${index + 1}: expected ${expectedId}, got ${record.id}`);
  }

  const sourcePath = record.source_path
    ? path.resolve(rootDir, record.source_path)
    : path.join(
      rootDir,
      '《大李敖全集6.0》分章节',
      '001.自传回忆类',
      '001.李敖自传与回忆',
      record.source_file,
    );
  if (!fs.existsSync(sourcePath)) {
    fail(`Missing source file for ${record.id}: ${record.source_file}`);
    return;
  }

  const cacheKey = sourcePath;
  if (!paragraphCache.has(cacheKey)) {
    paragraphCache.set(cacheKey, paragraphs(record));
  }

  const sourceParagraphs = paragraphCache.get(cacheKey);
  const sourceText = sourceParagraphs[record.source_paragraph - 1];
  if (!sourceText) {
    fail(`Missing source paragraph for ${record.id}: ${record.source_file} P${record.source_paragraph}`);
  } else if (normalize(record.description) !== sourceText) {
    fail(`Description does not match source paragraph for ${record.id}`);
  }

  const normalizedDescription = normalize(record.description);
  if (seenDescriptions.has(normalizedDescription)) {
    fail(`Duplicate description: ${seenDescriptions.get(normalizedDescription)} and ${record.id}`);
  } else {
    seenDescriptions.set(normalizedDescription, record.id);
  }

  for (const field of ['book', 'round', 'status', 'category', 'title', 'description', 'keywords']) {
    if (!normalize(record[field])) {
      fail(`Empty ${field} in ${record.id}`);
    }
  }
});

if (!process.exitCode) {
  console.log(`Validated ${records.length} records. Source paragraph matches: ${records.length}.`);
}
