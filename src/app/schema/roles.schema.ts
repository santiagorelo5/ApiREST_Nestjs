import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


export type RoleDocument = Role & Document

@Schema({ versionKey: false })
export class Role {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: [String], required: true })
    grants: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

export const RoleCollection = {
    name: 'Roles',
    schema: RoleSchema,
    collection: 'Roles'
}