import { Injectable } from "@nestjs/common";
import { FilledFormDto, GetFormsDto } from "./dashboard-dto.ts/dashboard.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FormsEntity, FormSubmissionEntity } from "src/entites/forms/form.entity";
import { Repository } from "typeorm";


@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(FormsEntity)
        private readonly FormsEntity: Repository<FormsEntity>,
        @InjectRepository(FormSubmissionEntity)
        private readonly submissionRepository: Repository<FormSubmissionEntity>
    ) { }



    async GetFormsInfo(body: GetFormsDto) {
        const userId = Number(body.id);

        console.log("userId", userId)

        const response = await this.FormsEntity.find({
            where: { createdById: userId }
        });

        return response;
    }

async getFilledForms(body: GetFormsDto) {
    const userId = body.id;

    const forms = await this.FormsEntity.find({
        where: { createdById: userId },
    });

    if (!forms.length) return [];
    
    const result: FilledFormDto[] = [];

    for (const form of forms) {
        const submissions = await this.submissionRepository.find({
            where: { formId: form.id },
            relations: ["answers", "user"], 
        });

        for (const submission of submissions) {
            result.push({
                formTitle: form.title,
                submittedAt: submission.submittedAt,
                submittedBy: submission.user.email,
                status: submission.answers.length > 0 ? "Submitted" : "Pending",
            });
        }
    }

    return result;
}




}