import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto, RegisterUserDto } from "./login-dto.ts/Register.dto";

@Controller('/login')
export class LoginController {
    constructor(private readonly LoginService: LoginService) { }

    @Post('/register-user')
    async register(
        @Body() body: RegisterUserDto
    ) {
        const response = await this.LoginService.RegisterUser(body)
        return response
    }

    @Post('/login-user')
    async login(
        @Body() body: LoginDto
    ) {
        const response = await this.LoginService.login(body)
        return response
    }

}
