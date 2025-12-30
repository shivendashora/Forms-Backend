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
      url: 'postgresql://newforms_user:lkJCIBARfl64FMylu7507SKfJbt7x1Dy@dpg-d59ooju3jp1c73c6ipg0-a.oregon-postgres.render.com/newforms',
      ssl: {
        rejectUnauthorized: false,
      },
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
