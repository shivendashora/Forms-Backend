import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class MailService{

    async sendMail(emails: string[], formId: number) {
        // Get frontend URL from environment or use default
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const formLink = `${frontendUrl}/share/${formId}`;

        // Create transporter - configure with your email service
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: 'shiven.dashora@gmail.com',
                pass: 'vhdepukamo ihtiut',
            },
        });

        const mailOptions = {
            from: 'shiven.dashora@gmail.com',
            to: emails.join(','),
            subject: 'Form Shared With You',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #333;">Form Shared With You</h1>
                    <p style="color: #666; font-size: 16px;">Hello,</p>
                    <p style="color: #666; font-size: 16px;">A form has been shared with you. Here is the form which you can access:</p>
                    <div style="margin: 30px 0; text-align: center;">
                        <a href="${formLink}" style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Access Form</a>
                    </div>
                    <p style="color: #666; font-size: 14px;">Or copy and paste this link in your browser:</p>
                    <p style="color: #4CAF50; font-size: 14px; word-break: break-all;">${formLink}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #999; font-size: 12px;">If you did not expect this email, please ignore it.</p>
                </div>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Emails sent successfully to:", emails);
            return { success: true, message: "Emails sent successfully" };
        } catch (error) {
            console.error("Error sending emails:", error);
            return { success: false, message: "Failed to send emails" };
        }
    }

}
