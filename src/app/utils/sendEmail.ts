import nodemailer from "nodemailer";
import { config } from "../config";
import AppError from "../errorHelpers/AppError";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: Number(config.SMTP_PORT),
  secure: true,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    fileName: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: SendEmailOptions) => {
  try {
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateData);

    const info = await transporter.sendMail({
      from: config.SMTP_FROM,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.fileName,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });

    console.log(`Email sent ${to}: ${info.messageId}`);
  } catch (error) {
    console.log("email error", error);
    throw new AppError(401, "Email error");
  }
};
