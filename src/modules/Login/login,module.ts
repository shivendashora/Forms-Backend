import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserEntity } from 'src/entites/login/login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterUserEntity]),],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
