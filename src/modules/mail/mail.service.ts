import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService{

    async sendMail(emails: string[]) {
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
                <h1>Form Shared</h1>
                <p>A form has been shared with you. Please check your dashboard to access it.</p>
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
