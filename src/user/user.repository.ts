import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import {User ,UserDocument} from "./schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepository {
  update: any;
  constructor(
    @InjectModel(User.name) private userModel:Model<UserDocument>
  ) {}

  // post api
  async createUser(user: User): Promise<any>
  {
  return await this.userModel.create(user);
  }


  // update password
  async updateData(email: string, password: string): Promise<User>
  {
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        password: password
      },
    };
    return this.userModel.findOneAndUpdate(filter, updateDoc, options);
  }


  //  find email for updatePassword and delete User and token(authorization)  
      async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
      }
    }




