import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Employee, EmployeeCollection, EmployeeDocument } from "../schema/employees.schema";
import { Model } from "mongoose";
import { Util } from "../shared/shared.service";

@Injectable()
export class EmployeesService {
    constructor(@InjectModel(EmployeeCollection.name) private employeeModel: Model<EmployeeDocument>) { }

    async getAll(): Promise<Employee[]> {
        return await this.employeeModel.find();
    }

    // obtener empleado por el token
    async getEmployeeToken(email: string): Promise<String> {
        const user = await this.employeeModel.findOne({ email });
        if (!user) {
            return "usuario no encontrado"
        }
        return await Util.CreateToken(email);
    }

    async getEmployee(id: string): Promise<Employee> {
        return await this.employeeModel.findById(id);
    }

    async createEmployee(employee: Employee): Promise<Employee> {

        return await this.employeeModel.create(employee);

    }

    async updateEmployee(id: string, employee: Employee): Promise<Employee> {
        return await this.employeeModel.findOneAndUpdate({ _id: id }, employee);
    }
}