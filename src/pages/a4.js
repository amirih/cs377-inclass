// pages/markdownPage.js
import fs from "fs";
import path from "path";
import React from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";

const MarkdownPage = ({ content }) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "solutions/a4.md");
  const content = fs.readFileSync(filePath, "utf8");

  return {
    props: {
      content,
    },
  };
}

export default MarkdownPage;
