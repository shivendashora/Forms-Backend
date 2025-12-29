import { Body, Controller, Post } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { GetFormsDto } from "./dashboard-dto.ts/dashboard.dto";

@Controller('/dashboard')
export class DashboardController {
    constructor(private readonly DashboardService: DashboardService) { }
    @Post('/get-forms')
    async createdForms(
        @Body() body: GetFormsDto
    ) {
        const response = await this.DashboardService.GetFormsInfo(body)
        return response

    }

    @Post("/get-filled-forms")
    async getFilledForms(@Body() body: GetFormsDto) {
        return this.DashboardService.getFilledForms(body);
    }
}
