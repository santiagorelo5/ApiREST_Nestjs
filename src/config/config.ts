import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";

export const config = {
    app_token_expiration: process.env.APP_TOKEN_EXPIRATION || 14400000,
    app_listen_port: 80,
    app_private_key: process.env.APP_PRIVATE_KEY || 'super-secret',
    app_register_token_expiration: '30m',
};

export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: 'mongodb://user:pwd@localhost:27018/mydb',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}