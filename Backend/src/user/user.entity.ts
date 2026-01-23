import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    studentId: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        type: 'enum',
        enum: ['ADMIN', 'MODERATOR', 'STUDENT', 'CONTRIBUTOR'],
        default: 'STUDENT',
    })
    role: string;


}
