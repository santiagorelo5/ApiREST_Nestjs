import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';


export type EmployeeDocument = Employee & Document

@Schema({ versionKey: false })
export class Employee {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: Number, required: true })
    age: number;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: [Types.ObjectId], required: true })
    roles: Types.ObjectId[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

export const EmployeeCollection = {
    name: 'Employees',
    schema: EmployeeSchema,
    collection: 'Employees'
}