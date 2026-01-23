import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }


    async register(dto: CreateUserDto): Promise<UserEntity> {
        const { name, email, studentId, password, confirmPassword } = dto;


        if (confirmPassword && password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }


        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = this.userRepository.create({
            name,
            email,
            studentId,
            password: hashedPassword,
        });


        return await this.userRepository.save(newUser);
    }


    async login(dto: LoginUserDto): Promise<{ token: string; user: any }> {
        const { email, password } = dto;

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        const payload = {
            id: user.id,
            email: user.email,
            role: "STUDENT",
        };

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
