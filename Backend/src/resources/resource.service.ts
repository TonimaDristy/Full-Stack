import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyResource } from './entities/study-resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(StudyResource)
        private studyResourceRepo: Repository<StudyResource>,
    ) { }

    // Get all resources
    findAll() {
        return this.studyResourceRepo.find();
    }

    // Get single resource
    findOne(id: number) {
        return this.studyResourceRepo.findOne({ where: { id } });
    }

    // Create resource
    create(dto: CreateResourceDto) {
        const resource = this.studyResourceRepo.create({
            ...dto,
            rating: 0,
            reviews: 0,
            downloads: 0,
            date: new Date().toISOString().split("T")[0],
        });
        return this.studyResourceRepo.save(resource);
    }


    async download(id: number, userId: number) {
        const resource = await this.studyResourceRepo.findOne({ where: { id } });
        if (!resource) throw new NotFoundException('Resource not found');

        resource.downloads = (resource.downloads || 0) + 1;
        await this.studyResourceRepo.save(resource);

        return { message: `User ${userId} downloaded resource ${id}` };
    }

    // Bookmark placeholder
    async bookmark(id: number, userId: number) {
        const resource = await this.studyResourceRepo.findOne({ where: { id } });
        if (!resource) throw new NotFoundException('Resource not found');


        return { message: `User ${userId} bookmarked resource ${id}` };
    }

    // Rate resource
    async rate(id: number, userId: number, rating: number) {
        const resource = await this.studyResourceRepo.findOne({ where: { id } });
        if (!resource) throw new NotFoundException('Resource not found');

        resource.reviews = (resource.reviews || 0) + 1;
        resource.rating = ((resource.rating || 0) * (resource.reviews - 1) + rating) / resource.reviews;

        await this.studyResourceRepo.save(resource);

        return { message: `User ${userId} rated resource ${id} with ${rating}` };
    }
}
