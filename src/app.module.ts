import { Module } from '@nestjs/common';
import { EmployeesModule } from './app/employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/config';
import { RolesModule } from './app/roles/roles.module';
import { SharedModule } from './app/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    SharedModule,
    EmployeesModule,
    RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
