import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FLIGHT } from '../common/models/index';
import { IFlight } from '../common/interfaces/flight.interface';
import { CreateFlightDTO, UpdateFlightDTO } from './dtos/flights.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async findAll(): Promise<IFlight[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id).populate('passagers');
  }

  async create(flight: CreateFlightDTO): Promise<IFlight> {
    const newFlight = await new this.model({ ...flight });
    return await newFlight.save();
  }

  async update(id: string, changes: UpdateFlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(
      id,
      { ...changes },
      { new: true },
    );
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async addPassager(flightId, passagerId) {
    return this.model.findByIdAndUpdate(
      flightId,
      {
        $addToSet: { passagers: passagerId },
      },
      { new: true },
    );
  }
}
