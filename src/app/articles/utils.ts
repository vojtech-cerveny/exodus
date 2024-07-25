import fs from "fs";
import matter from "gray-matter";

export async function getMarkdownData(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content };
}
