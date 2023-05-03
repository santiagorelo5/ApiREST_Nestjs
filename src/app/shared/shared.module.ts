import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt/jwt.strategy';


@Global()
@Module({
    imports: [],
    providers: [JwtStrategy]
})
export class SharedModule { }