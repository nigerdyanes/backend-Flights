import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UserPartials extends PartialType(UserDTO) {}

export class UpdateUserDTO extends OmitType(UserPartials, [
  'password',
  'email',
  'username',
] as const) {
  @IsOptional()
  readonly name: string;
}
