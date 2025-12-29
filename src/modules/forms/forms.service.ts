import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnswerOptionEntity, QuestionEntity, FormsEntity } from "../../entites/forms/form.entity";
import { CreateFormDto } from "./forms.dto";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(FormsEntity)
        private readonly formRepo: Repository<FormsEntity>,

        @InjectRepository(QuestionEntity)
        private readonly questionRepo: Repository<QuestionEntity>,

        @InjectRepository(AnswerOptionEntity)
        private readonly optionRepo: Repository<AnswerOptionEntity>
    ) { }

    async createForm(dto: CreateFormDto) {
        let savedForm;

        if (dto.formId) {
            // EDIT MODE: update existing form
            savedForm = await this.formRepo.findOne({ where: { id: dto.formId } });
            if (!savedForm) throw new Error("Form not found");

            savedForm.title = dto.title;
            savedForm.status = dto.status;
            await this.formRepo.save(savedForm);

            // Remove existing questions/options for simplicity
            const existingQuestions = await this.questionRepo.find({ where: { formId: savedForm.id } });
            for (const q of existingQuestions) {
                await this.optionRepo.delete({ questionId: q.id });
            }
            await this.questionRepo.delete({ formId: savedForm.id });
        } else {
            // CREATE MODE
            const form = this.formRepo.create({
                title: dto.title,
                status: dto.status,
                createdById: dto.createdById,
            });
            savedForm = await this.formRepo.save(form);
        }

        // Save questions & options
        for (const q of dto.questions) {
            const question = this.questionRepo.create({
                formId: savedForm.id,
                question: q.question,
                order: q.order,
                answerType: { id: q.answerTypeId } as any,
            });

            const savedQuestion = await this.questionRepo.save(question);

            if (q.options?.length) {
                const options = q.options.map((opt) =>
                    this.optionRepo.create({
                        questionId: savedQuestion.id,
                        value: opt.value,
                        order: opt.order,
                    })
                );

                await this.optionRepo.save(options);
            }
        }

        return {
            message: "Form saved successfully",
            formId: savedForm.id,
        };
    }

    async getFormById(formId: number) {
        return this.formRepo.findOne({
            where: { id: formId },
            relations: {
                questions: {
                    options: true,
                    answerType: true,
                },
            },
            order: {
                questions: {
                    order: "ASC",
                    options: {
                        order: "ASC",
                    },
                },
            },
        });
    }


    async deleteForm(formId: number) {

        const form = await this.formRepo.findOne({ where: { id: formId } });
        if (!form) {
            throw new Error("Form not found");
        }

        await this.formRepo.delete({ id: formId });

        await this.formRepo.delete(formId);

        return { message: "Form deleted successfully" };
    }
}

