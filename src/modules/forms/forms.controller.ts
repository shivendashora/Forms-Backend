import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete } from "@nestjs/common";
import { FormsService } from "./forms.service";
import { CreateFormDto, ShareFormDto } from "./forms.dto";

@Controller("forms")
export class FormsController {
    constructor(private readonly formsService: FormsService) { }

    @Get(":id")
    getFormById(@Param("id", ParseIntPipe) id: number) {
        return this.formsService.getFormById(id);
    }


    @Post("save")
    saveForm(@Body() dto: CreateFormDto) {
        return this.formsService.createForm(dto);
    }

    @Delete("delete-form/:id")
    async deleteForm(@Param("id") id: string) {
        const formId = Number(id);
        if (Number.isNaN(formId)) {
            throw new TypeError("Invalid form ID");
        }
        return await this.formsService.deleteForm(formId);
    }

    @Post("share")
    async shareForm(@Body() dto: ShareFormDto) {
        return await this.formsService.shareForm(dto.emails, dto.formId);
    }
}
