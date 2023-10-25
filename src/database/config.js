import dotenv from 'dotenv';
import mysql from 'mysql2';
import sqlite from 'sqlite3'
import { Sequelize } from "sequelize";

dotenv.config()

let sequelize;

if (process.env.Type == 'Test') {
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: './test/database/test.db',
		dialectModule: sqlite,
		logging: false
	})
} else {
	sequelize = new Sequelize({
		dialect: 'mysql',
		host: process.env.DB_HOST,
		password: process.env.DB_PASSWORD,
		username: process.env.DB_USER,
		database: process.env.DB_NAME,
		dialectModule: mysql,
		logging: false
	})
}

export default sequelize;
