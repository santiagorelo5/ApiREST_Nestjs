import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleCollection } from '../schema/roles.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { EmployeeCollection } from '../schema/employees.schema';
import { AuthGuard } from '../shared/security/auth.guard';

@Module({
    imports: [MongooseModule.forFeature([RoleCollection, EmployeeCollection])],
    controllers: [RolesController],
    providers: [RolesService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
    exports: [RolesService]
})
export class RolesModule { }
