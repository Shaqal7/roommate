'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown-styles.css';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="markdown-h1" {...props} />,
          h2: (props) => <h2 className="markdown-h2" {...props} />,
          h3: (props) => <h3 className="markdown-h3" {...props} />,
          h4: (props) => <h4 className="markdown-h4" {...props} />,
          p: (props) => <p className="markdown-p" {...props} />,
          ul: (props) => <ul className="markdown-ul" {...props} />,
          ol: (props) => <ol className="markdown-ol" {...props} />,
          li: (props) => <li className="markdown-li" {...props} />,
          a: (props) => <a className="markdown-a" {...props} />,
          blockquote: (props) => <blockquote className="markdown-blockquote" {...props} />,
          table: (props) => <table className="markdown-table" {...props} />,
          thead: (props) => <thead className="markdown-thead" {...props} />,
          tbody: (props) => <tbody className="markdown-tbody" {...props} />,
          tr: (props) => <tr className="markdown-tr" {...props} />,
          th: (props) => <th className="markdown-th" {...props} />,
          td: (props) => <td className="markdown-td" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
