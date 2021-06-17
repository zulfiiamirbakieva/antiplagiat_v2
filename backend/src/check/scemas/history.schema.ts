import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as MongoDB from "mongodb"

export type HistoryDocument = History & mongoose.Document;

@Schema()
export class History {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
    userId: MongoDB.ObjectId;

    @Prop()
    checkResults: string;

    @Prop()
    lang: string;

    @Prop(raw({
        firstName: { type: String },
        lastName: { type: String },
        group: { type: String }
    }))
    student: Record<string, any>;

    @Prop()
    createdAt: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);