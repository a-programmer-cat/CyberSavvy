export const parseMarkdownTitle = (content: string): string => {
  const match = content.match(/^(?:\s*)#\s*([^\n]+?)\s*(?:\n|$)/m);
  return match?.[1]?.trim() || 'Untitled';
};

export const removeTitleFromContent = (content: string): string => {
  return content.replace(/^#\s+.+\n/, '');
};