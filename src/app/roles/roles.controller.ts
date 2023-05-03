import { Controller, Get, HttpStatus, Param, Res, Post, Body, Put, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { roleDto } from "../dto/role.dto";
import { JwtAuthGuard } from "../shared/jwt/jwt.guard";
import { Grants } from "../shared/security/grant.decorator";

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @UseGuards(JwtAuthGuard)
    @Grants({ role: 'Admin_Role' })
    @Get('all')
    async getAll(@Res() response) {
        const serviceResponse = await this.rolesService.getAll();
        response.status(HttpStatus.OK).json(serviceResponse);
    }

    @UseGuards(JwtAuthGuard)
    @Grants({ role: 'Admin_Role' })
    @Get(':id')
    async getEmployee(@Res() response, @Param('id') id: string) {
        const serviceResponse = await this.rolesService.getRole(id);
        response.status(HttpStatus.OK).json(serviceResponse);
    }

    @UseGuards(JwtAuthGuard)
    @Grants({ role: 'Admin_Role' })
    @Post()
    async createRole(@Res() response, @Body() role: roleDto) {
        const serviceResponse = await this.rolesService.createRole(role);
        response.status(HttpStatus.OK).json(serviceResponse);
    }

    @UseGuards(JwtAuthGuard)
    @Grants({ role: 'Admin_Role' })
    @Put(':id')
    async updateEmployee(@Res() response, @Param('id') id: string, @Body() role: roleDto) {
        const serviceResponse = await this.rolesService.updateRole(id, role);
        response.status(HttpStatus.OK).json(serviceResponse);
    }


}