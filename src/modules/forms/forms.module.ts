import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  FormsEntity,
  QuestionEntity,
  AnswerOptionEntity,
  FormSubmissionEntity,
  SubmissionAnswerEntity
} from "../../entites/forms/form.entity";
import { FormsService } from "./forms.service";
import { FormsController } from "./forms.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FormsEntity,
      QuestionEntity,
      AnswerOptionEntity,
      FormSubmissionEntity,
      SubmissionAnswerEntity
    ])
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
