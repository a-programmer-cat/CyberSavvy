import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

export const SafeMarkdown = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-invert prose-sm sm:prose lg:prose-lg xl:prose-xl prose-theme max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, className, children, ...props }) {
            const isInline = !className?.includes("language-");
            return isInline ? (
              <code
                className={`bg-bg-card text-text-secondary px-1 py-0.5 rounded ${className}`}
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-bg-card border border-bg-border rounded-lg p-4 overflow-x-auto">
                <code className={`${className} text-text-main`} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          img: ({ src, alt }) => (
            <div className="my-4 flex justify-center">
              <img
                src={src}
                alt={alt || ""}
                className="rounded-lg shadow-md max-h-[500px] object-contain border border-bg-border"
                loading="lazy"
              />
            </div>
          ),
          br: () => <br className="my-2 block" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
