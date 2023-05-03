import { SetMetadata } from '@nestjs/common';

export enum Role {
    Login = 'LOGIN',
    Register = 'REGISTER',
    RestPass = 'RESET_PASSWORD',
    Admin = 'ADMIN',
    application = 'APPLICATION',
}

export interface Grant {
    role: string;
    grant?: string;
}

export const GRANTS_KEY = 'grants';

export const Grants = (...roles: Grant[]) =>
    SetMetadata(GRANTS_KEY, roles);