import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassagersController } from './passagers.controller';
import { PassagersService } from './passagers.service';
import { PASSAGER } from '../common/models/index';
import { PassagerSchema } from './schema/passager.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSAGER.name,
        useFactory: () => PassagerSchema,
      },
    ]),
  ],
  controllers: [PassagersController],
  providers: [PassagersService],
})
export class PassagersModule {}
