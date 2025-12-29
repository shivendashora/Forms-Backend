import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormsEntity } from "../forms/form.entity";

@Entity('registerdUsers')
export class RegisterUserEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    userName:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(() => FormsEntity, (form) => form.createdBy)
    forms: FormsEntity[];

    
}