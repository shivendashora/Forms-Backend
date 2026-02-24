import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/Login/login,module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashBoardModule } from './modules/dashboard/dashboard.module';
import { FormsModule } from './modules/forms/forms.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    LoginModule,
    DashBoardModule,
    FormsModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
