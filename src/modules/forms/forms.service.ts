import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnswerOptionEntity, QuestionEntity, FormsEntity, FormSubmissionEntity, SubmissionAnswerEntity } from "../../entites/forms/form.entity";
import { CreateFormDto } from "./forms.dto";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(FormsEntity)
        private readonly formRepo: Repository<FormsEntity>,

        @InjectRepository(QuestionEntity)
        private readonly questionRepo: Repository<QuestionEntity>,

        @InjectRepository(AnswerOptionEntity)
        private readonly optionRepo: Repository<AnswerOptionEntity>,

        @InjectRepository(FormSubmissionEntity)
        private readonly formSubmissionRepo: Repository<FormSubmissionEntity>,

        @InjectRepository(SubmissionAnswerEntity)
        private readonly answerSubmissionRepo: Repository<SubmissionAnswerEntity>
    ) { }

    async createForm(dto: CreateFormDto) {
        let savedForm: FormsEntity;

        if (dto.formId) {
            const existingForm = await this.formRepo.findOne({
                where: { id: dto.formId },
            });

            if (!existingForm) {
                throw new Error("Form not found");
            }

            existingForm.title = dto.title;
            existingForm.status = dto.status;

            savedForm = await this.formRepo.save(existingForm);
        } else {
            savedForm = await this.formRepo.save(
                this.formRepo.create({
                    title: dto.title,
                    status: dto.status,
                    createdById: dto.createdById,
                })
            );
        }


        for (const q of dto.questions) {

            let savedQuestion: QuestionEntity;

            if (q.id) {

                const existingQuestion = await this.questionRepo.findOne({
                    where: { id: q.id },
                });

                if (!existingQuestion) continue;

                existingQuestion.question = q.question;
                existingQuestion.order = q.order;
                existingQuestion.answerType = { id: q.answerTypeId } as any;

                savedQuestion = await this.questionRepo.save(existingQuestion);

            } else {

                const newQuestion = this.questionRepo.create({
                    formId: savedForm.id,
                    question: q.question,
                    order: q.order,
                    answerType: { id: q.answerTypeId } as any,
                });

                savedQuestion = await this.questionRepo.save(newQuestion);
            }


            if (q.options?.length) {

                const existingOptions = await this.optionRepo.find({ where: { questionId: savedQuestion.id } });
                const existingOptionIds = existingOptions.map(o => o.id);

                const incomingOptionIds = q.options
                    .filter(opt => typeof opt.id === 'number')
                    .map(opt => opt.id);

                const toDeleteIds = existingOptionIds.filter(id => !incomingOptionIds.includes(id));
                if (toDeleteIds.length) {
                    await this.optionRepo.delete(toDeleteIds);
                }


                for (const opt of q.options) {
                    if (typeof opt.id === 'number') {

                        await this.optionRepo.update(opt.id, {
                            value: opt.value,
                            order: opt.order,
                        });
                    } else {

                        await this.optionRepo.save(
                            this.optionRepo.create({
                                questionId: savedQuestion.id,
                                value: opt.value,
                                order: opt.order,
                            })
                        );
                    }
                }
            } else {
                await this.optionRepo.delete({ questionId: savedQuestion.id });
            }


        }

        if (dto.answers && dto.answers.length > 0) {

            let submission = await this.formSubmissionRepo.findOne({
                where: {
                    formId: savedForm.id,
                    userId: 1,
                },
            });

            if (submission) {
                submission.submittedAt = new Date();
                await this.formSubmissionRepo.save(submission);
            }
            else {
                submission = await this.formSubmissionRepo.save(
                    this.formSubmissionRepo.create({
                        formId: savedForm.id,
                        userId: 1,
                    })
                );
            }


            for (const element of dto.answers) {

                const existingAnswer = await this.answerSubmissionRepo.findOne({
                    where: {
                        questionId: element.questionId,
                    },
                });

                const value =
                    typeof element.answer === "string"
                        ? element.answer
                        : JSON.stringify(element.answer);

                if (existingAnswer) {

                    await this.answerSubmissionRepo.update(
                        { id: existingAnswer.id },
                        {
                            submissionId: submission.id,
                            value
                        }
                    );
                } else {
                    await this.answerSubmissionRepo.save(
                        this.answerSubmissionRepo.create({
                            submissionId: submission.id,
                            questionId: element.questionId,
                            value,
                        })
                    );
                }
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

