import { IPassager } from '../interfaces/passager.interface';

export interface IFlight extends Document {
  _id?: string;
  pilot: string;
  airPlane: string;
  destinationCity: string;
  fligthDate: Date;
  passagers: IPassager[];
}
