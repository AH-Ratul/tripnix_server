import PDFDocument from "pdfkit";
import AppError from "../errorHelpers/AppError";

export interface IInvoiceData {
  transactionId: string;
  bookingDate: Date;
  userName: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

export const generatePdf = (
  invoiceData: IInvoiceData
): Promise<Buffer<ArrayBufferLike>> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      // PDF content
      const formattedInvoiceData = {
        invoiceNumber: invoiceData.transactionId,
        invoiceDate: invoiceData.bookingDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        customerName: invoiceData.userName,
        tourTitle: invoiceData.tourTitle,
        guestCount: invoiceData.guestCount,
        totalAmount: invoiceData.totalAmount.toFixed(2),
        companyName: "TRIPNIX TOUR MANAGEMENT",
        companyAddress: "Begum Rokeya Soroni, Mirpur\nDhaka, Bangladesh",
        companyEmail: "contact@tripnix.com",
        companyPhone: "+1 234 567890",
        website: "www.tripnix.com",
      };

      // --- Header Section ---
      const generateHeader = (doc: any) => {
        doc.font("Helvetica-Bold").fontSize(12).text("Tripnix", 50, 60);

        doc
          .fontSize(10)
          .font("Helvetica")
          .text(formattedInvoiceData.companyName, 400, 70)
          .text(formattedInvoiceData.companyAddress, 400, 85)
          .text(`Email: ${formattedInvoiceData.companyEmail}`, 400, 115)
          .text(`Phone: ${formattedInvoiceData.companyPhone}`, 400, 130);
      };

      // --- Customer and Invoice Info ---
      const generateCustomerInfo = (doc: any) => {
        const y = 180;
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text("INVOICE", 50, y - 50)
          .font("Helvetica")
          .fontSize(10)
          .text(`Invoice #: ${formattedInvoiceData.invoiceNumber}`, 50, y - 30)
          .text(`Date: ${formattedInvoiceData.invoiceDate}`, 50, y - 15)
          .text(`Customer: ${formattedInvoiceData.customerName}`, 50, y);

        // Draw a horizontal line
        doc
          .strokeColor("#aaaaaa")
          .lineWidth(1)
          .moveTo(50, y + 15)
          .lineTo(550, y + 15)
          .stroke();
      };

      // --- Service Table ---
      const generateServiceTable = (doc: any) => {
        const tableTop = 240;

        // Table headers
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .text("Service", 50, tableTop)
          .text("Description", 150, tableTop)
          .text("Guests", 350, tableTop)
          .text("Amount", 450, tableTop, { align: "right" });

        // Draw a line under the headers
        doc
          .lineWidth(1.5)
          .moveTo(50, tableTop + 15)
          .lineTo(550, tableTop + 15)
          .stroke();

        // Table rows
        doc.font("Helvetica");
        const y = tableTop + 30;
        doc
          .text("Tour Booking", 50, y)
          .text(formattedInvoiceData.tourTitle, 150, y)
          .text(formattedInvoiceData.guestCount.toString(), 350, y)
          .text(`$${formattedInvoiceData.totalAmount}`, 450, y, {
            align: "right",
          });

        // Draw a horizontal line after the table
        doc
          .lineWidth(1)
          .moveTo(50, y + 20)
          .lineTo(550, y + 20)
          .stroke();
      };

      // --- Totals Section ---
      const generateTotals = (doc: any) => {
        const totalsY = 320;
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text("GRAND TOTAL", 410, totalsY);

        doc.text(`$${formattedInvoiceData.totalAmount}`, 460, totalsY + 15);
      };

      // --- Footer Section ---
      const generateFooter = (doc: any) => {
        doc
          .fontSize(10)
          .font("Helvetica")
          .text(formattedInvoiceData.website, 50, doc.page.height - 50);
      };

      // --- Call the generation functions ---
      generateHeader(doc);
      generateCustomerInfo(doc);
      generateServiceTable(doc);
      generateTotals(doc);
      generateFooter(doc);

      // Finalize the PDF file
      doc.end();
    });
  } catch (error: any) {
    console.log("pdf error", error);
    throw new AppError(400, `PDF creation Error ${error.message}`);
  }
};
