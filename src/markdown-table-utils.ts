// Utilities for parsing and serializing Markdown tables with column width metadata

export interface MarkdownTable {
  rows: string[][];
  colWidths?: number[];
  metaLineIdx?: number; // Line index of metadata comment, if present
  tableStartIdx: number; // First line of the table
  tableEndIdx: number;   // Last line of the table
}

const METADATA_REGEX = /^<!--\s*advanced-tables:\s*(\{.*\})\s*-->$/;

export function extractTableAtCursor(lines: string[], cursorLine: number): MarkdownTable | null {
  // Find the bounds of the table (delimited by | and ---)
  let start = cursorLine;
  let end = cursorLine;
  while (start > 0 && lines[start].trim().startsWith('|')) start--;
  if (!lines[start].trim().startsWith('|')) start++;
  while (end < lines.length && lines[end].trim().startsWith('|')) end++;
  end--;
  if (start > end) return null;

  // Check for metadata above table
  let metaLineIdx: number | undefined;
  let colWidths: number[] | undefined;
  if (start > 0 && METADATA_REGEX.test(lines[start - 1])) {
    metaLineIdx = start - 1;
    const match = METADATA_REGEX.exec(lines[metaLineIdx]);
    if (match) {
      try {
        const meta = JSON.parse(match[1]);
        if (Array.isArray(meta.colWidths)) colWidths = meta.colWidths;
      } catch {}
    }
  }

  // Parse table rows
  const tableLines = lines.slice(start, end + 1);
  const rows = tableLines.map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));

  return { rows, colWidths, metaLineIdx, tableStartIdx: start, tableEndIdx: end };
}

export function serializeTable(
  rows: string[][],
  colWidths?: number[],
  metaLine?: string | null
): string[] {
  const lines: string[] = [];
  if (colWidths && colWidths.length) {
    lines.push(`<!-- advanced-tables: ${JSON.stringify({ colWidths })} -->`);
  } else if (metaLine) {
    // Keep old meta line if present
    lines.push(metaLine);
  }
  for (const row of rows) {
    lines.push(`| ${row.join(' | ')} |`);
  }
  return lines;
}
