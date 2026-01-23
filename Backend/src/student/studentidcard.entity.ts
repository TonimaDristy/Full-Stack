// src/student/studentidcard.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity('idcard')
export class StudentIDCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardNumber: string;

    @Column()
    issueDate: string;

    @OneToOne(() => StudentEntity, student => student.idCard)
    @JoinColumn()
    student: StudentEntity;
}
