import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PASSAGER } from '../common/models/index';
import { IPassager } from '../common/interfaces/passager.interface';
import { Model } from 'mongoose';
import { CreatePassagerDTO, UpdatePassagerDTO } from './dtos/passager.dto';

@Injectable()
export class PassagersService {
  constructor(
    @InjectModel(PASSAGER.name) private readonly model: Model<IPassager>,
  ) {}

  async findAll(): Promise<IPassager[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassager> {
    return await this.model.findById(id);
  }

  async create(passager: CreatePassagerDTO): Promise<IPassager> {
    const newPassager = new this.model(passager);
    return await newPassager.save();
  }

  async update(id: string, changes: UpdatePassagerDTO): Promise<IPassager> {
    await this.model.findByIdAndUpdate(id, { ...changes });
    return await this.findOne(id);
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
