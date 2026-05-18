import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 portrait
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const margin = 50;
  let y = 790;

  page.drawText("SafeSobati Driver Onboarding Guide", {
    x: margin,
    y,
    size: 20,
    font: titleFont,
    color: rgb(0.09, 0.11, 0.16),
  });

  y -= 34;
  page.drawText("Verified Driver Partner Program", {
    x: margin,
    y,
    size: 13,
    font: titleFont,
    color: rgb(0.92, 0.35, 0.05),
  });

  y -= 30;
  const lines = [
    "Welcome to the SafeSobati Partner Network.",
    "",
    "What customers get after your approval:",
    "- Vehicle details visibility",
    "- Public rating visibility",
    "- Ride enquiry access",
    "- Trusted trip booking visibility",
    "",
    "Operational standards:",
    "- Keep vehicle clean and presentable",
    "- Keep documents valid and updated",
    "- Keep response time fast and professional",
    "",
    "How to grow faster:",
    "- Reply quickly to new enquiries",
    "- Maintain professional communication",
    "- Keep route and fare communication transparent",
    "- Prioritize airport and wedding reliability",
    "",
    "SafeSobati helps trusted local drivers grow with verified leads,",
    "premium visibility, and trust-first positioning.",
  ];

  for (const line of lines) {
    page.drawText(line, {
      x: margin,
      y,
      size: 11,
      font: bodyFont,
      color: rgb(0.2, 0.23, 0.29),
    });
    y -= 18;
  }

  page.drawText("safesobati.com", {
    x: margin,
    y: 35,
    size: 10,
    font: bodyFont,
    color: rgb(0.45, 0.5, 0.56),
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="safesobati-driver-onboarding-guide.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
