

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
    ) {
       
    }

    async validate(payload: any) {
        const user = await this.userRepo.findOne({ where: { id: payload.id } });
        return user;
    }
}
