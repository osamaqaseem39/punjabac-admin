export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function extractIdFromSlug(slug: string): string {
  // Extract the ID from the end of the slug (after the last hyphen)
  const parts = slug.split('-');
  return parts[parts.length - 1];
} 