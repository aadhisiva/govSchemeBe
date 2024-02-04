/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * File: for db connection
 * created: [2024-02-04]
 * Project: Guarantee Schemes
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { entities } from "../entityManager";

dotenv.config();

console.log("process.env.PRO_DB_DATABASE",process.env.PRO_DB_DATABASE)

export const AppDataSource= new DataSource({
  type: "mssql",
  host: String(process.env.PRO_DB_HOST),
  port: Number(process.env.PRO_DB_PORT),
  username: process.env.PRO_DB_USERNAME,
  password: process.env.PRO_DB_PASSWORD,
  database: process.env.PRO_DB_DATABASE,
  entities: entities(),
  logging: true,
  synchronize: false,
  options: {
      encrypt: false
  }
});



