import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Grant, GRANTS_KEY } from './grant.decorator';
import jwt_decode from 'jwt-decode';
import { RolesService } from 'src/app/roles/roles.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private securityService: RolesService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredGrants = this.reflector.getAllAndOverride<Grant[]>(
      GRANTS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredGrants) {
      return true;
    }
    if (requiredGrants.length < 1) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const tokenData = this.getTokenData(req.headers);

    if (!tokenData) {
      return false;
    }
    const grants = await this.securityService.getGrants(tokenData.email);
    const grantsNames = grants.map((grant: { name: string }) => grant.name);

    const filter = requiredGrants.filter((item) =>
      grantsNames.includes(item.role)
    )

    if (filter.length < 1) {
      return false;
    }
    return true;
  }

  getTokenData(headers): any {
    let auth: string[] = [];

    let data: any = null;

    if (headers.authorization) {
      auth = headers.authorization.split(' ');
    }
    if (headers.Authorization) {
      auth = headers.Authorization.split(' ');
    }
    if (auth.length > 0) {
      if (auth[0].toLowerCase() === 'bearer') {
        data = this.decodeToken(auth[1]);
      }
    }
    return data;
  }

  decodeToken(token): any {
    try {
      return jwt_decode<any>(token);
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}