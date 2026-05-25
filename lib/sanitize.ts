/** Strip HTML tags, trim, enforce max length */
export function sanitizeText(input: string, maxLength = 255): string {
  return input.replace(/<[^>]*>/g, '').trim().slice(0, maxLength);
}

/** Convert to URL-safe slug: lowercase, remove special chars, replace spaces with hyphens */
export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

/** Validate icon name: only alphanumeric, hyphens, underscores */
export function isValidIconName(name: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(name);
}

/** Validate input and return error message or null */
export function validateRequired(
  value: string,
  fieldName: string,
  maxLength = 255,
): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return `${fieldName} is required`;
  }

  if (trimmed.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less`;
  }

  return null;
}
