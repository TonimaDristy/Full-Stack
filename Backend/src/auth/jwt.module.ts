import { JwtModule } from '@nestjs/jwt';

export const jwtModule = JwtModule.register({
    secret: 'UNISHARE_SECRET_KEY',
    signOptions: { expiresIn: '1d' },
});
