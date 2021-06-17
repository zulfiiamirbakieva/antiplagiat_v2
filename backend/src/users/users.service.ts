import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {History, HistoryDocument} from "../check/scemas/history.schema";


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
    ) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({email: email});
    }

    async create(payload: any): Promise<UserDocument> {
        return this.userModel.create(payload)
    }

    async history(userId: string): Promise<HistoryDocument[]> {
        return this.historyModel.find({
            userId: new Types.ObjectId(userId)
        })
    }
}
