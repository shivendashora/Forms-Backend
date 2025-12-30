import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/Login/login,module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashBoardModule } from './modules/dashboard/dashboard.module';
import { FormsModule } from './modules/forms/forms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    LoginModule,
    DashBoardModule,
    FormsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
