import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

/**
 * Extracts the insurance/PUC policy expiry date from an uploaded PDF.
 * Accepts multipart FormData with a single `file` field.
 * Returns: { expiry: "DD/MM/YYYY" | null }
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["application/pdf", "application/x-pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 });
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();

    const expiry = extractExpiryDate(result.text);
    return NextResponse.json({ expiry });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to parse document" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Date extraction helpers
// ---------------------------------------------------------------------------

/**
 * Searches PDF text for Indian insurance / PUC policy expiry / validity dates.
 * Strategy (in priority order):
 *   1. Keyword-anchored: look for expiry/valid-till/end-date keyword near a date
 *   2. Policy period "From X To Y" pattern — take the second (end) date
 *   3. Fallback: return the latest date found in the whole document
 */
function extractExpiryDate(text: string): string | null {
  // Normalise: collapse multiple spaces / newlines into a single space
  const flat = text.replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ");

  // -----------------------------------------------------------------------
  // Indian date patterns: DD/MM/YYYY, DD-MM-YYYY, DDth Month YYYY
  // -----------------------------------------------------------------------
  const datePattern =
    /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b|\b(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/gi;

  // Keywords that typically precede the expiry date in Indian insurance PDFs
  const expiryKeywords = [
    "expiry date",
    "expiry",
    "valid till",
    "valid upto",
    "valid up to",
    "end date",
    "policy end",
    "policy expiry",
    "date of expiry",
    "maturity date",
    "renewal date",
    "expire",
    "expires on",
  ];

  // 1. Keyword-anchored search (look at up to 80 chars after keyword)
  for (const keyword of expiryKeywords) {
    const idx = flat.toLowerCase().indexOf(keyword);
    if (idx === -1) continue;
    const slice = flat.slice(idx, idx + keyword.length + 80);
    const match = new RegExp(datePattern.source, "i").exec(slice);
    if (match) {
      return normaliseDateMatch(match);
    }
  }

  // 2. "Policy Period" from X to Y → take the end date
  const periodPattern =
    /policy\s+period[^\d]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})[^\d]+to[^\d]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i;
  const periodMatch = periodPattern.exec(flat);
  if (periodMatch?.[2]) {
    return formatDateDMY(periodMatch[2]);
  }

  // 3. Fallback: latest date in document
  const allDates: Date[] = [];
  let fallbackMatch: RegExpExecArray | null;
  const fallbackRe = /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/g;
  while ((fallbackMatch = fallbackRe.exec(flat)) !== null) {
    const d = parseIndianDate(fallbackMatch[0]);
    if (d && d > new Date()) {
      allDates.push(d);
    }
  }
  if (allDates.length > 0) {
    const latest = allDates.reduce((a, b) => (a > b ? a : b));
    return toIndianFormat(latest);
  }

  return null;
}

function normaliseDateMatch(match: RegExpExecArray): string | null {
  // Numeric date (groups 1-3)
  if (match[1] && match[2] && match[3]) {
    const d = String(match[1]).padStart(2, "0");
    const m = String(match[2]).padStart(2, "0");
    const y = match[3];
    return `${d}/${m}/${y}`;
  }
  // Written date (groups 4-6)
  if (match[4] && match[5] && match[6]) {
    const months: Record<string, string> = {
      january: "01", february: "02", march: "03", april: "04",
      may: "05", june: "06", july: "07", august: "08",
      september: "09", october: "10", november: "11", december: "12",
    };
    const d = String(match[4]).padStart(2, "0");
    const m = months[match[5].toLowerCase()] ?? "01";
    const y = match[6];
    return `${d}/${m}/${y}`;
  }
  return null;
}

function parseIndianDate(dateStr: string): Date | null {
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length !== 3) return null;
  const [d, mo, y] = parts.map(Number);
  if (!d || !mo || !y || mo > 12) return null;
  return new Date(y, mo - 1, d);
}

function toIndianFormat(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function formatDateDMY(raw: string): string {
  const parts = raw.split(/[\/\-]/);
  const d = String(parts[0]).padStart(2, "0");
  const m = String(parts[1]).padStart(2, "0");
  const y = parts[2];
  return `${d}/${m}/${y}`;
}
