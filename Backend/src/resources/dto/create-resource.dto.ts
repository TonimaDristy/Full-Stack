
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResourceDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    semester: string;

    @IsNotEmpty()
    @IsString()
    type: string; // PDF, PPT, Link
}
