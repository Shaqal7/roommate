/**
 * Formats an AI response with proper markdown styling
 * 
 * This utility function takes a raw AI response text and formats it
 * to ensure proper markdown rendering, including code blocks, lists,
 * headings, and other markdown elements.
 * 
 * @param text The raw AI response text
 * @returns Formatted text with proper markdown
 */
export function formatAiResponse(text: string): string {
  if (!text) return '';
  
  // Ensure code blocks are properly formatted
  let formattedText = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
    // Ensure there's a newline before and after code blocks
    return `\n\`\`\`${language}\n${code.trim()}\n\`\`\`\n`;
  });
  
  // Ensure proper spacing for headings
  formattedText = formattedText.replace(/^(#{1,6})\s*(.+)$/gm, (match, hashes, content) => {
    return `\n${hashes} ${content.trim()}\n`;
  });
  
  // Ensure proper spacing for lists
  formattedText = formattedText.replace(/^(\s*[-*+]|\s*\d+\.)\s+(.+)$/gm, (match) => {
    return match;
  });
  
  // Ensure proper spacing for blockquotes
  formattedText = formattedText.replace(/^>\s*(.+)$/gm, (match, content) => {
    return `> ${content.trim()}`;
  });
  
  // Remove excessive newlines (more than 2 consecutive)
  formattedText = formattedText.replace(/\n{3,}/g, '\n\n');
  
  return formattedText;
}

/**
 * Detects if a string contains markdown formatting
 * 
 * @param text The text to check for markdown
 * @returns True if the text contains markdown formatting
 */
export function containsMarkdown(text: string): boolean {
  if (!text) return false;
  
  // Check for common markdown patterns
  const markdownPatterns = [
    /^#{1,6}\s+.+$/m,                  // Headers
    /`{3}[\s\S]*?`{3}/,                // Code blocks
    /!\[.*?\]\(.*?\)/,                 // Images
    /\[.*?\]\(.*?\)/,                  // Links
    /^[-*+]\s+.+$/m,                   // Unordered lists
    /^>\s+.+$/m,                       // Blockquotes
    /^(\d+\.)\s+.+$/m,                 // Ordered lists
    /\*\*.*?\*\*/,                     // Bold
    /\*.*?\*/,                         // Italic
    /~~.*?~~/,                         // Strikethrough
    /^(\|[^|]+\|)+$/m,                 // Tables
    /^-{3,}$/m,                        // Horizontal rules
  ];
  
  return markdownPatterns.some(pattern => pattern.test(text));
}
