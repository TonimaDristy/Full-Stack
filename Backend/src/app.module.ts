// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student/student.entity';
import { CourseEntity } from './student/moderator/course.entity';
import { StudentIDCard } from './student/studentidcard.entity';

import { ResourcesModule } from './resources/resources.module';
import { StudyResource } from './resources/entities/study-resource.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'student',
      entities: [StudentEntity, CourseEntity, StudentIDCard, StudyResource],
      synchronize: true,
      autoLoadEntities: true,
    }),
    StudentModule,
    AuthModule,
    UserModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
