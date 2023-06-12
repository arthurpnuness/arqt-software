import 'dotenv/config';
import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from './entities/user.entity';
import { MessageEntity } from './entities/messages.entity';

const config: DataSourceOptions = {
	type: 'postgres',
	host : process.env.HOST,
	port : 5432,
	database : process.env.DATABASE,
	username : process.env.USER,
	password : process.env.PASSWORD,
    entities: [UserEntity, MessageEntity],
    migrations: ["./dist/database/migrations/*.js"],
	synchronize: false,
	logging: false,
	ssl: {
		rejectUnauthorized: false,
	},
};

export const dataSource = new DataSource(config);