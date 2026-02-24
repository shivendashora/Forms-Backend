import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  FormsEntity,
  QuestionEntity,
  AnswerOptionEntity,
  FormSubmissionEntity,
  SubmissionAnswerEntity,
  UsersEntity
} from "../../entites/forms/form.entity";
import { FormsService } from "./forms.service";
import { FormsController } from "./forms.controller";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FormsEntity,
      QuestionEntity,
      AnswerOptionEntity,
      FormSubmissionEntity,
      SubmissionAnswerEntity,
      UsersEntity
    ]),
    MailModule
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
