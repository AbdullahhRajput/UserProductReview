    import { Injectable, NotFoundException } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { User } from './schema/user.schema';
    import mongoose, { Model } from 'mongoose';
    import { createUserDto } from './dto/create-user.dto';
    import { UserRepository } from './user.repository';
    @Injectable()
    export class UserService {
    constructor(
        @InjectModel(User.name) private userModel:Model<User>
    ) {}  

 //used for sign up



    //used for login
    async findUserByEmail(email: string): Promise<User>
    {
        return this.userModel.findOne({email})
    }


    // update password


    // post
    async create(reqBody:createUserDto): Promise<User> {
    return await this.userModel.create(reqBody);
    }


    // One user perchasing multiple products
    async addAllProductsToUser(userId: string) {
        const user = await this.userModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(userId) },
            },
            {
                $addFields: {
                    convertedId: { $toString: "$_id" }
                    }
            },
            {
                $lookup: {
                from: 'products',
                localField: 'convertedId',
                foreignField: 'userId',
                as: 'userProducts',
            },
            }
        ]);
        if (!user || user.length === 0) {
            throw new NotFoundException(`User not Exist`);
        }
        
        return user[0];
        }

    // get
    async findAll(): Promise<User[]>{
        try {
            const myUser = await this.userModel.find();
            return myUser;
        } catch (error) {
        throw new NotFoundException('Data not Found!')
    }
}

    // update data
    async updateUserById(userId: string, updateUserDto: Partial<User>){
        try {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto);
        console.log(updatedUser)
        return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    // delete data
        async deletebyId (id: string): Promise<any> {
            try {
            const deletedUser = await this.userModel.findByIdAndDelete(id);
            if (!deletedUser) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return 'Deleted Successfully';
            } catch (error) {
            throw new NotFoundException('Invalid id');
        }
        }
    }
        