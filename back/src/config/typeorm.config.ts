import { registerAs } from "@nestjs/config";
import { configDotenv } from "dotenv"
import { DataSource ,DataSourceOptions} from "typeorm"

configDotenv()

const config={
    type:'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrationsRun: true,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    logging: process.env.NODE_ENV=='dev',
    migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`]
}

export const TypeOrmConfig= registerAs('database', () =>config)
export const connectionSource = new DataSource(config as DataSourceOptions)