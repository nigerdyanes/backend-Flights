import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PassagersService } from './passagers.service';
import { CreatePassagerDTO, UpdatePassagerDTO } from './dtos/passager.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@ApiTags('passagers')
@Controller('passagers')
export class PassagersController {
  constructor(private readonly passagersService: PassagersService) {}

  @Get()
  getAll() {
    return this.passagersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.passagersService.findOne(id);
  }

  @Post()
  create(@Body() body: CreatePassagerDTO) {
    return this.passagersService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() changes: UpdatePassagerDTO) {
    return this.passagersService.update(id, changes);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passagersService.delete(id);
  }
}
