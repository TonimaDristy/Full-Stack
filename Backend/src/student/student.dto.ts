import { IsNotEmpty, IsAlpha, IsEmail, Matches, IsString, MinLength, MaxLength, IsInt, Min, IsOptional, IsNumber } from "class-validator";

export class UserDto {

  @IsNotEmpty()
  @IsAlpha()
  @IsString()
  @MaxLength(100)
  fullname: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;

  @Matches(/^(active|inactive)$/i, {
    message: "Status must be either active or inactive",
  })
  status: string;


  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  @Matches(/[A-Z]/, { message: 'Password must have at least one uppercase letter' })
  password: string; // ✅ Add this



  // @IsOptional()
  // @IsString()
  // phoneNumber?: string;

  @IsOptional()
  @IsString()
  department?: string;

  // @IsOptional()
  // @IsInt()
  // semester?: number;


  @IsNotEmpty()
  @IsString()
  @Matches(/^(male|female)$/i, { message: 'Gender must be either male or female' })
  gender: string;


  @IsNotEmpty()
  @IsEmail()
  @Matches(/@aiub\.edu$/, { message: 'Email must be an AIUB email (aiub.edu)' })
  email: string;

}

export class CourseDto {
  @IsString()
  courseName: string;

  @IsNumber()
  @Min(1)
  credit: number;
}