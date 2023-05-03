import { Controller, Get, HttpStatus, Param, Res, Post, Body, Put, UseGuards } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { EmployeeDto } from "../dto/employee.dto";
import { JwtAuthGuard } from "../shared/jwt/jwt.guard";
import { Grants } from "../shared/security/grant.decorator";

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Get('/token/:email')
  async getEmployeeToken(@Res() response, @Param('email') email: string) {
    const serviceResponse = await this.employeesService.getEmployeeToken(email);
    response.status(HttpStatus.OK).json(serviceResponse);
  }


  @Get('all')
  async getAll(@Res() response) {
    const serviceResponse = await this.employeesService.getAll();
    response.status(HttpStatus.OK).json(serviceResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Grants({ role: 'Admin_Role' }, { role: 'Client_Role' })
  @Get(':id')
  async getEmployee(@Res() response, @Param('id') id: string) {
    const serviceResponse = await this.employeesService.getEmployee(id);
    response.status(HttpStatus.OK).json(serviceResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Grants({ role: 'Admin_Role' })
  @Post()
  async createEmployee(@Res() response, @Body() employee: EmployeeDto) {
    const serviceResponse = await this.employeesService.createEmployee(employee);
    response.status(HttpStatus.OK).json(serviceResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Grants({ role: 'Admin_Role' }, { role: 'Client_Role' })
  @Put(':id')
  async updateEmployee(@Res() response, @Param('id') id: string, @Body() employee: EmployeeDto) {
    const serviceResponse = await this.employeesService.updateEmployee(id, employee);
    response.status(HttpStatus.OK).json(serviceResponse);
  }


}