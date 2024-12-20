import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;
}
