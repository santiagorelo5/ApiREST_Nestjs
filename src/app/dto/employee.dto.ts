import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmployeeDto {
    @IsNotEmpty({ message: ' El code es requerido' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: ' El code es requerido' })
    @IsString()
    phone: string;

    @IsNotEmpty({ message: ' El code es requerido' })
    @IsNumber()
    age: number;

    @IsNotEmpty({ message: ' El code es requerido' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: ' El code es requerido' })
    @IsArray()
    roles: [];
}