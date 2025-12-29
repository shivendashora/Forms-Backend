import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterUserDto } from './login-dto.ts/Register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserEntity } from 'src/entites/login/login.entity';
import * as jwt from "jsonwebtoken";


const SALT_ROUNDS = 10;

@Injectable()
export class LoginService {

    constructor(
        @InjectRepository(RegisterUserEntity)
        private readonly registerdRepository: Repository<RegisterUserEntity>,
    ) { }

    private hashedPassword(password: string): Promise<string> {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    private verifyHashedPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async RegisterUser(body: RegisterUserDto): Promise<string> {
        const userName = body.userName
        const password = body.password
        const email = body.email
        const name = body.name
        console.log(body)

        const existingUser = await this.registerdRepository.findOne({
            where: [
                { userName: body.userName },
                { email: body.email }
            ]
        });

        if(existingUser){
            throw new Error('User already exists please try with some different credentials')
        }


        const hashedPassword = await this.hashedPassword(password)

        if (userName && email && name && hashedPassword) {
            await this.registerdRepository.insert(
                {
                    name: name,
                    userName: userName,
                    email: email,
                    password: hashedPassword
                }
            )
        }


        return "successfully registered User"
    }


    async login(body: LoginDto):Promise<{
        message:string,
        accessToken?:string
        id?:number,
        userName?:string
    }> {
        const { username, password } = body;

        const userRecordFound = await this.registerdRepository.find({
            where: { userName: username }
        });

        if (!userRecordFound || userRecordFound.length === 0) {
            return { message: "userNotFound" };
        }

        const user = userRecordFound[0];
        const hashedPassword = user.password;

        const verifiedPassword = await this.verifyHashedPassword(password, hashedPassword);

        if (!verifiedPassword) {
            return { message: "invalidCredentials" };
        }

        const payload = {
            userId: user.id,
            userName: user.userName
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "10m" }
        );

        console.log("Jwt token",token)

        return {
            message: "userFound",
            accessToken: token,
            id:user.id,
            userName:user.userName
        };
    }

}
