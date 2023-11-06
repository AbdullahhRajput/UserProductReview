import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdDto } from './dto/create-prod.dto';
import { Prod, ProdDocument } from './schema/prod.schema'
import { ProdRepository } from './prod.repository';
import { Model } from 'mongoose';
import { updateProdDto } from './dto/update.prod';
import { Roles } from './decorators/role.decorator';
import { Role } from './enums/role.enum';
import { request } from 'express';

@Injectable()
export class ProdService {
    constructor(
        private readonly prodRepository:ProdRepository,
    ) {}  

async createProd(reqBody:CreateProdDto): Promise<Prod> {
    const { price, quantity } = reqBody;
    const subtotal = price * quantity;
    const taxRate = 0.1; 
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    // const userRole = request.user.role;  
    const newProduct: Prod = {
        ...reqBody,
        subtotal,
        tax,
        total,
        role: Role.Admin,    
    };
    // console.log('newProduct', newProduct)
    try {
        return await this.prodRepository.save(newProduct);
        } catch (error) {
        console.error('Error while saving product:', error);
        throw error;
        }
}


  // get
    async findAll(): Promise<Prod[]>{
    try {
    return await this.prodRepository.findAll();
    } catch (error) {
    throw new NotFoundException('Data not Found!')
    }
}


// get By ID
async findById(_id: string): Promise<Prod>{
    try {
    return await this.prodRepository.findById(_id);
    } catch (error) {
    throw new NotFoundException('User not Found!')
    }
    }


async updateUserById(id: string, updateData: updateProdDto): Promise<Prod | null> {
    try {
    const updatedUser = await this.prodRepository.findByIdAndUpdate(id,updateData)
    return updatedUser;
    } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
    }
    }

// delete data
async deletebyId(id: string): Promise<any>{
    try {
        return  await this.prodRepository.deletebyId(id);
    }catch (error) {
        throw new NotFoundException('Invalid id')
    }
}
}
