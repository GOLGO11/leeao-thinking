import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const [
  bookPrefix,
  fileToken = '',
  startText = '1',
  endText = '9999',
  mode = 'summary',
  categoryPrefix = '012',
] = process.argv.slice(2);
if (!bookPrefix) {
  throw new Error('Usage: node scripts/inspect-thinking-book-source.mjs <book-prefix> [file-token] [start] [end] [summary|full] [category-prefix]');
}

const sourceRootName = fs.readdirSync(process.cwd()).find((name) => name.startsWith('《') && name.includes('分章节'));
if (!sourceRootName) throw new Error('Source root not found');
const sourceRoot = path.join(process.cwd(), sourceRootName);
const categoryName = fs.readdirSync(sourceRoot).find((name) => name.startsWith(`${categoryPrefix}.`));
if (!categoryName) throw new Error(`Source category not found: ${categoryPrefix}`);
const categoryDir = path.join(sourceRoot, categoryName);
const bookName = fs.readdirSync(categoryDir).find((name) => name.startsWith(bookPrefix));
if (!bookName) throw new Error(`Book not found: ${bookPrefix}`);

const decoder = new TextDecoder('gb18030');
const files = fs.readdirSync(path.join(categoryDir, bookName))
  .filter((name) => name.endsWith('.txt') && !name.includes('目录'))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
const selectedFiles = fileToken
  ? files.filter((name) => (
    name.startsWith(`${fileToken}.`)
    || (!/^\d+$/.test(fileToken) && name.includes(fileToken))
  ))
  : files;
if (!selectedFiles.length) throw new Error(`File token not found: ${fileToken}`);

const start = Number(startText);
const end = Number(endText);
for (const fileName of selectedFiles) {
  const paragraphs = decoder.decode(fs.readFileSync(path.join(categoryDir, bookName, fileName)))
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((value) => value.trim())
    .filter(Boolean);
  console.log(`\n===== ${fileName} (${paragraphs.length}) =====`);
  if (mode === 'sections') {
    const sectionStarts = paragraphs
      .map((paragraph, index) => (/^第.+节、/.test(paragraph) ? index : -1))
      .filter((index) => index >= 0);
    for (let section = 0; section < sectionStarts.length; section += 1) {
      const headingIndex = sectionStarts[section];
      const nextHeadingIndex = sectionStarts[section + 1] ?? paragraphs.length;
      const candidateIndexes = [headingIndex + 1, nextHeadingIndex - 2, nextHeadingIndex - 1]
        .filter((index, position, values) => (
          index > headingIndex
          && index < nextHeadingIndex
          && !values.slice(0, position).includes(index)
          && !/李敖影音E书|李敖数字博物馆|资源下载站|油管\/抖音/.test(paragraphs[index])
        ));
      console.log(`\n### [${headingIndex + 1}] ${paragraphs[headingIndex]}`);
      for (const index of candidateIndexes) {
        console.log(`[${index + 1}] (${paragraphs[index].length}) ${paragraphs[index].replace(/\s+/g, ' ').slice(0, 260)}`);
      }
    }
    continue;
  }
  for (let index = Math.max(start, 1); index <= Math.min(end, paragraphs.length); index += 1) {
    const paragraph = paragraphs[index - 1];
    if (mode === 'signal' && !/(可见|由此|因此|所以|其实|事实|显然|足见|说明|证明|反证|不难|问题|错误|真相|荒谬|无疑|值得|不能|不应|必须|正是|所谓|总之|换句话说|我们认为|我们看到)/.test(paragraph)) {
      continue;
    }
    const text = mode === 'full' ? paragraph : paragraph.replace(/\s+/g, ' ').slice(0, 220);
    console.log(`\n[${index}] (${paragraph.length}) ${text}`);
  }
}
