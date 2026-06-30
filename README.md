# leeao-thinking

本项目从《大李敖全集6.0》中提取李敖思想索引。

工作重点不是重写或概括李敖思想，而是：

- 按思想主题分类；
- 为每条索引写一个便于检索的浓缩标题；
- 在 `description` 字段保留源文本原文段落；
- 记录来源书名、文件名、段落号和源文件路径，方便回查；
- 一本书一本书推进，每本书先做提取轮，再做校对轮。

## 当前进度

| 书号 | 书名 | 当前轮次 | 状态 | 条目数 |
| --- | --- | --- | --- | ---: |
| 001 | 李敖自传与回忆 | 校对轮 | 已校对 | 72 |
| 002 | 李敖自传与回忆续集 | 校对轮 | 已校对 | 82 |
| 003 | 我最难忘的事和人 | 校对轮 | 已校对 | 47 |

## 当前分类

当前 201 条索引统一使用 7 个原子分类：

- 写作
- 方法
- 知识
- 人格
- 文化
- 政治
- 法权

分类名只保留单一概念，不使用“X与Y”或“X和Y”的复合结构。具体改动见 `outputs/分类重构说明.md`。

## 当前输出

- `outputs/001.李敖自传与回忆/思想索引-校对轮.csv`
- `outputs/001.李敖自传与回忆/思想索引-校对轮.json`
- `outputs/001.李敖自传与回忆/思想索引-校对轮.md`
- `outputs/002.李敖自传与回忆续集/思想索引-提取轮.csv`
- `outputs/002.李敖自传与回忆续集/思想索引-提取轮.json`
- `outputs/002.李敖自传与回忆续集/思想索引-提取轮.md`
- `outputs/002.李敖自传与回忆续集/思想索引-校对轮.csv`
- `outputs/002.李敖自传与回忆续集/思想索引-校对轮.json`
- `outputs/002.李敖自传与回忆续集/思想索引-校对轮.md`
- `outputs/003.我最难忘的事和人/思想索引-提取轮.csv`
- `outputs/003.我最难忘的事和人/思想索引-提取轮.json`
- `outputs/003.我最难忘的事和人/思想索引-提取轮.md`
- `outputs/003.我最难忘的事和人/思想索引-校对轮.csv`
- `outputs/003.我最难忘的事和人/思想索引-校对轮.json`
- `outputs/003.我最难忘的事和人/思想索引-校对轮.md`
- `outputs/思想索引总表.csv`
- `outputs/思想索引总表.json`
- `outputs/分类重构说明.md`
- `site/index.html`

## 重建命令

```powershell
node scripts\build-thinking-index-book2.mjs
node scripts\validate-thinking-index.mjs outputs\002.李敖自传与回忆续集\思想索引-提取轮.json
node scripts\build-proofread-index-book2.mjs
node scripts\validate-thinking-index.mjs outputs\002.李敖自传与回忆续集\思想索引-校对轮.json
node scripts\build-thinking-index-book3.mjs
node scripts\validate-thinking-index.mjs outputs\003.我最难忘的事和人\思想索引-提取轮.json
node scripts\build-proofread-index-book3.mjs
node scripts\validate-thinking-index.mjs outputs\003.我最难忘的事和人\思想索引-校对轮.json
node scripts\reclassify-current-index.mjs
node scripts\build-thinking-master.mjs
node scripts\build-thinking-site.mjs
```

校对轮只处理条目取舍、合并、分类和标题，不改写 `description` 原文。
