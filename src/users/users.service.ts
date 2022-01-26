import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from '../common/models/index';
import { IUser } from '../common/interfaces/user.interface';
import { CreateUserDTO, UpdateUserDTO } from './dtos/user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return this.model.findById(id);
  }

  async create(user: CreateUserDTO): Promise<IUser> {
    const hashedPassword = await this.#hashPassword(user.password);
    const newUser = new this.model({ ...user, password: hashedPassword });
    return await newUser.save();
  }

  async update(id: string, changes: UpdateUserDTO): Promise<IUser> {
    await this.model.findByIdAndUpdate(id, { ...changes });
    return await this.findOne(id);
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async #hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
