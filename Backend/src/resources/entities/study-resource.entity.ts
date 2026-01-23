// src/resources/entities/study-resource.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class StudyResource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    semester: string;

    @Column()
    type: string; // PDF, PPT, Link

    @Column({ type: 'float', default: 0 })
    rating: number;

    @Column({ default: 0 })
    reviews: number;

    @Column({ default: 0 })
    downloads: number;

    @Column()
    date: string; 
}
