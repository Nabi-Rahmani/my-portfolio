'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  const markdownImageLoader = ({ src }: { src: string }) => src;

  return (
    <div className="lesson-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginTop: '2rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginTop: '2rem',
                marginBottom: '0.75rem',
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.5rem',
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginTop: '1.5rem',
                marginBottom: '0.5rem',
                color: 'var(--text-primary)',
              }}
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginTop: '1.25rem',
                marginBottom: '0.5rem',
                color: 'var(--text-primary)',
              }}
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p
              style={{
                marginBottom: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
                listStyleType: 'disc',
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
                listStyleType: 'decimal',
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li
              style={{
                marginBottom: '0.5rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}
            >
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent)',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
            >
              {children}
            </a>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '0.2rem 0.4rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    color: 'var(--accent)',
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre
              style={{
                backgroundColor: '#1e1e1e',
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                lineHeight: 1.5,
              }}
            >
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: '4px solid var(--accent)',
                paddingLeft: '1rem',
                marginLeft: 0,
                marginBottom: '1rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
              }}
            >
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                }}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '0.75rem',
                textAlign: 'left',
                fontWeight: 600,
                borderBottom: '2px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: '0.75rem',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              {children}
            </td>
          ),
          hr: () => (
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid var(--border-color)',
                margin: '2rem 0',
              }}
            />
          ),
          img: ({ src, alt }) => {
            if (typeof src !== 'string') return null;
            return (
              <Image
                src={src}
                alt={alt || ''}
                width={1200}
                height={800}
                loader={markdownImageLoader}
                unoptimized
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
                sizes="100vw"
              />
            );
          },
          strong: ({ children }) => (
            <strong style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em style={{ fontStyle: 'italic' }}>{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      <style jsx global>{`
        .lesson-content pre code {
          background: transparent !important;
          padding: 0 !important;
          font-size: 0.875rem !important;
        }
        .lesson-content .hljs {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
