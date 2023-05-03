import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class roleDto {
    @IsNotEmpty({ message: ' El code es requerido' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: ' El code es requerido' })
    @IsArray()
    grants: string[];

}