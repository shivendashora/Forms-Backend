import { IsNumber } from 'class-validator';

export class GetFormsDto{
    @IsNumber()
    id:number
}

export interface FilledFormDto {
  formTitle: string;
  submittedAt: Date;
  submittedBy: string;
  status: string;
}