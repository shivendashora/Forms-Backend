import { Controller, Post, Body } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('/mail')
export class MailController{
     constructor(private readonly mailService: MailService) {}

    @Post('/send-mail')
    async sendMail(@Body() body: { emails: string[] }){
        const response = await this.mailService.sendMail(body.emails)
        return response
    }

}
