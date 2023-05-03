import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeCollection } from '../schema/employees.schema';
import { AuthGuard } from '../shared/security/auth.guard';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [MongooseModule.forFeature([EmployeeCollection]), RolesModule],
  controllers: [EmployeesController],
  providers: [EmployeesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class EmployeesModule { }
