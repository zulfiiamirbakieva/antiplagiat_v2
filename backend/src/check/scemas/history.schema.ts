import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema()
export class History {
    @Prop()
    userId: string;

    @Prop()
    checkResults: string;

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