import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, RoleCollection, RoleDocument } from "../schema/roles.schema";
import { EmployeeCollection, EmployeeDocument } from "../schema/employees.schema";

@Injectable()
export class RolesService {
    constructor(@InjectModel(RoleCollection.name) private roleModel: Model<RoleDocument>,
        @InjectModel(EmployeeCollection.name) private employeeModel: Model<EmployeeDocument>) { }

    async getAll(): Promise<Role[]> {
        return await this.roleModel.find().exec();
    }

    async getRole(id: string): Promise<Role> {
        return await this.roleModel.findById(id);
    }

    async createRole(role: Role): Promise<Role> {
        return await this.roleModel.create(role);
    }

    async updateRole(id: string, role: Role): Promise<Role> {
        return await this.roleModel.findOneAndUpdate({ _id: id }, role);
    }

    async getGrants(email: string): Promise<any> {
        const employee = await this.employeeModel.aggregate([
            {
                $match: {
                    email,
                },
            },
            {
                $lookup: {
                    from: 'Roles',
                    localField: 'roles',
                    foreignField: '_id',
                    as: 'roles',
                },
            },
        ]);
        return employee[0].roles;
        // const grants = employee.roles;
        // return grants
    }
}