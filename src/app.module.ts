import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [NewsModule, UsersModule, AuthModule, JwtModule.register({global: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
