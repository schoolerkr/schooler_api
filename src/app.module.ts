import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [SchoolModule],
  controllers: [AppController],
})
export class AppModule {}
