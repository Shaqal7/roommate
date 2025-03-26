'use client';

import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { formatAiResponse, containsMarkdown } from '@/lib/formatAiResponse';

interface AiResponseRendererProps {
  content: string;
  className?: string;
}

/**
 * Component for rendering AI responses with proper markdown formatting
 * 
 * This component takes an AI response text and renders it with proper
 * markdown formatting, including code blocks, lists, headings, and other
 * markdown elements.
 */
const AiResponseRenderer: React.FC<AiResponseRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  // Only format the content if it doesn't already contain markdown
  const formattedContent = containsMarkdown(content) 
    ? content 
    : formatAiResponse(content);

  return (
    <div className={`ai-response ${className}`}>
      <MarkdownRenderer content={formattedContent} />
    </div>
  );
};

export default AiResponseRenderer;
