
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { StudyResource } from './entities/study-resource.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StudyResource])],
    controllers: [ResourceController],
    providers: [ResourceService],
})
export class ResourcesModule { }
