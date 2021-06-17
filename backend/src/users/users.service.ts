import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({email: email});
    }

    async create(payload: any): Promise<UserDocument> {
        return this.userModel.create(payload)
    }
}
