
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }


    // Registration

    async register(dto: CreateUserDto) {
        const { name, email, studentId, password, confirmPassword } = dto;

        if (confirmPassword && password !== confirmPassword) {
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
        }

        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepo.create({
            name,
            email,
            studentId,
            password: hashedPassword,
        });

        return this.userRepo.save(newUser);
    }


    // Login

    async login(dto: LoginUserDto) {
        const { email, password } = dto;

        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        const payload = { id: user.id, email: user.email, role: 'STUDENT' };
        const token = this.jwtService.sign(payload);

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                studentId: user.studentId,
                role: payload.role,
            },
        };
    }
}
