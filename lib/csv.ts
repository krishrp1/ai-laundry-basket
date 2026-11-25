/**
 * Minimal CSV writer for spreadsheet use. Values come from public forms, so text that a spreadsheet
 * would run as a formula is prefixed with an apostrophe. Starts with a BOM so Excel reads UTF-8.
 */
export function toCsv(header: string[], rows: unknown[][]): string {
  const cell = (value: unknown) => {
    if (value === null || value === undefined) return "";
    let text = value instanceof Date ? value.toISOString() : String(value);
    if (typeof value === "string" && /^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  return "﻿" + [header, ...rows].map((row) => row.map(cell).join(",")).join("\r\n");
}
