import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export default function RichText({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside text-gray-800 text-lg space-y-0"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside text-gray-800 text-lg space-y-0"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="ml-2" {...props} />,
          img: ({ node, ...props }) => (
            <img {...props} className="rounded-md max-w-full h-auto my-4" />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          u: ({ node, ...props }) => <u className="underline" {...props} />,
          del: ({ node, ...props }) => (
            <del className="line-through" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
