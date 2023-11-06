import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import { FilterQuery, HydratedDocument, Model } from "mongoose";
import { Prod ,ProdDocument } from "./schema/prod.schema";
import { CreateProdDto } from "./dto/create-prod.dto";
import { updateProdDto } from "./dto/update.prod";

@Injectable()
export class ProdRepository {
constructor(
    @InjectModel(Prod.name) private ProdModel:Model<ProdDocument>

) {}

// post
async save(newProduct: Prod): Promise<Prod> {
    console.log(newProduct,"newPrkkkoduct")
    return await this.ProdModel.create(newProduct);
    }

// Get all
async findAll(): Promise<Prod[]>{
    return await this.ProdModel.find();
    }


// get by id
async findById(id: string): Promise<Prod>{
    return await this.ProdModel.findById(id);
    }


    // UPDATE
    async findByIdAndUpdate(id: string, updateData: updateProdDto): Promise<Prod>{
        return await this.ProdModel.findByIdAndUpdate(id,updateData, { new: true });
        }

// delete data
    async deletebyId(id: string): Promise<any>{
        return await this.ProdModel.deleteOne({_id:id});
        }
}


