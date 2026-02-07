import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/Login/login,module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashBoardModule } from './modules/dashboard/dashboard.module';
import { FormsModule } from './modules/forms/forms.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://formsdb_kxxu_user:W3E7bbFZMO0QQoOhmhGdfX8zdCS09bPV@dpg-d63d9svpm1nc7384v5og-a.oregon-postgres.render.com/formsdb_kxxu',
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
