import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

class CreateOptionDto {
  @IsString()
  value: string;

  @IsNumber()
  order: number;
}

class CreateQuestionDto {
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
}
