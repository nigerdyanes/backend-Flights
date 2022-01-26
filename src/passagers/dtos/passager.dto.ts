import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePassagerDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class UpdatePassagerDTO extends PartialType(CreatePassagerDTO) {
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly email: string;
}
