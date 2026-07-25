const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Postgres throws on a malformed `@db.Uuid` filter — check the shape first so a bad route param renders a clean 404 instead of a 500. */
export function isValidUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}
