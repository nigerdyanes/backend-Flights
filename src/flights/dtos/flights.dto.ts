import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFlightDTO {
  @IsNotEmpty()
  @IsString()
  readonly pilot: string;
  @IsNotEmpty()
  @IsString()
  readonly airPlane: string;
  @IsNotEmpty()
  @IsString()
  readonly destinationCity: string;
  @Type(() => Date)
  @IsDate()
  readonly fligthDate: Date;
}

export class UpdateFlightDTO extends PartialType(CreateFlightDTO) {
  @IsOptional()
  readonly pilot: string;
  @IsOptional()
  readonly airPlane: string;
  @IsOptional()
  readonly destinationCity: string;
  @IsOptional()
  readonly fligthDate: Date;
}
