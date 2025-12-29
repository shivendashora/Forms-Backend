import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerOptionEntity, AnswerTypeEntity, FormsEntity, FormSubmissionEntity, QuestionEntity, SubmissionAnswerEntity, UsersEntity } from 'src/entites/forms/form.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormsEntity,FormSubmissionEntity,QuestionEntity,AnswerOptionEntity,AnswerTypeEntity,SubmissionAnswerEntity,UsersEntity]),],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashBoardModule {}
