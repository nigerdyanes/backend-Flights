import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDTO, UpdateFlightDTO } from './dtos/flights.dto';
import { PassagersService } from '../passagers/passagers.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(
    private readonly flightsService: FlightsService,
    private readonly passagerService: PassagersService,
  ) {}
  @Get()
  getAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }

  @Post()
  create(@Body() flight: CreateFlightDTO) {
    return this.flightsService.create(flight);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() flightChanges: UpdateFlightDTO) {
    return this.flightsService.update(id, flightChanges);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flightsService.delete(id);
  }

  @Post(':flightId/passager/:passagerId')
  async addPassager(
    @Param('flightId') flightId: string,
    @Param('passagerId') passagerId: string,
  ) {
    const foundPassager = await this.passagerService.findOne(passagerId);
    if (!foundPassager)
      throw new HttpException('Passager not found', HttpStatus.NOT_FOUND);

    return await this.flightsService.addPassager(flightId, passagerId);
  }
}
