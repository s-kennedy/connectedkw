import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'pages', 'articles');

export async function getArticles() {
  const allFiles = fs.readdirSync(postsDirectory)
  const fileNames = allFiles.filter(f => f !== "index.js")

  const articles = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const link = `/articles/${id}`
      const mod = await import(`pages/articles/${fileName}`)

      return {
        meta: mod.meta ? mod.meta : {},
        id,
        link
      }
    })
  );

  return articles
}

