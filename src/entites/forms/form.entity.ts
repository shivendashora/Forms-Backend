import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from "typeorm";
import { RegisterUserEntity } from "../login/login.entity";




@Entity("forms")
export class FormsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  status: string; 

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column()
  createdById: number;

  @ManyToOne(() => RegisterUserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "createdById" })
  createdBy: RegisterUserEntity;


  @OneToMany(() => QuestionEntity, (q) => q.form)
  questions: QuestionEntity[];


}

@Entity("answertypes")
export class AnswerTypeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; 
}


@Entity("questions")
export class QuestionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  formId: number;

  @ManyToOne(() => FormsEntity, (form) => form.questions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "formId" })
  form: FormsEntity;

  @Column()
  question: string;

  @Column()
  order: number;

  @ManyToOne(() => AnswerTypeEntity)
  @JoinColumn({ name: "answerTypeId" })
  answerType: AnswerTypeEntity;

  @OneToMany(() => AnswerOptionEntity, (opt) => opt.question)
  options: AnswerOptionEntity[];
}



@Entity("answeroptions")
export class AnswerOptionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @ManyToOne(() => QuestionEntity, (q) => q.options, { onDelete: "CASCADE" })
  @JoinColumn({ name: "questionId" })
  question: QuestionEntity;

  @Column()
  value: string;

  @Column()
  order: number;
}


@Entity('userforforms')
export class UsersEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
}


@Entity("formsubmissions")
export class FormSubmissionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  formId: number;

  @ManyToOne(() => FormsEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "formId" })
  form: FormsEntity;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  submittedAt: Date;

  @Column()
  userId: number; 

  @ManyToOne(() => UsersEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UsersEntity;

  @OneToMany(() => SubmissionAnswerEntity, (a) => a.submission)
  answers: SubmissionAnswerEntity[];
}


@Entity("submissionanswers")
export class SubmissionAnswerEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  submissionId: number;

  @ManyToOne(() => FormSubmissionEntity, (s) => s.answers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "submissionId" })
  submission: FormSubmissionEntity;

  @Column()
  questionId: number;

  @Column({ type: "jsonb" })
  value: string | string[];
}

