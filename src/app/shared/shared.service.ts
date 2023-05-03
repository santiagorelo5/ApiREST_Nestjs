import * as jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export class Util {
    static async CreateToken(email: String): Promise<string> {
        let token: string = await jwt.sign(
            { email: email },
            config.app_private_key,
            { expiresIn: config.app_register_token_expiration });

        return token;
    }
}