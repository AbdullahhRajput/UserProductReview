import { Module } from '@nestjs/common';
import { ProdService } from './prod.service';
import { ProdController } from './prod.controller';
import { model } from 'mongoose';
import { Prod, ProdSchema } from './schema/prod.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdRepository } from './prod.repository';
import { InvoiceSchema } from './invoice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Invoice', schema: InvoiceSchema},{name: 'Prod', schema: ProdSchema}])

  ], 
  controllers: [ProdController],
  providers: [ProdService,ProdRepository],
  exports: [ProdService,ProdRepository],

})
export class ProdModule {};
