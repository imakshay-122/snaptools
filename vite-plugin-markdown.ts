import { Plugin } from 'vite';
import { readFileSync } from 'fs';
import matter from 'gray-matter';

export default function markdown(): Plugin {
  return {
    name: 'vite-plugin-markdown',
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) return null;

      // Parse frontmatter and content
      const { data: frontmatter, content } = matter(code);

      // Convert the markdown content and frontmatter into a module
      return {
        code: `export const frontmatter = ${JSON.stringify(frontmatter)};
export const content = ${JSON.stringify(content)};
export default { frontmatter, content };`,
        map: null
      };
    }
  };
}