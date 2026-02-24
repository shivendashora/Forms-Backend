import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

class CreateOptionDto {

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  value: string;

  @IsNumber()
  order: number;
}

class CreateQuestionDto {

  @IsOptional()
  @IsNumber()
  id?: number;


  @IsString()
  question: string;

  @IsNumber()
  order: number;

  @IsNumber()
  answerTypeId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options: CreateOptionDto[];
}

class CreateAnswerDto {
  @IsNumber()
  questionId: number;

  answer: string | string[];
}


export class CreateFormDto {

  @IsOptional()
  @IsNumber()
  formId:number;
  
  @IsString()
  title: string;

  @IsString()
  status: string;

  @IsNumber()
  createdById: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];

  @IsOptional()
  @IsArray()
  answers: CreateAnswerDto[];

  @IsOptional()
  shareAvailable:boolean;
}

export class ShareFormDto {
  @IsArray()
  @IsString({ each: true })
  emails: string[];
}
