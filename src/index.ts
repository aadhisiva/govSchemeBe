/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * File: for db connection
 * created: [2024-02-04]
 * Project: Guarantee Schemes
 */

import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from "fs";
import cors from "cors";
import compression from "compression";
import { AppDataSource } from './db/config';
import Logger from './loggers/winstonLogger';

//controllers
import { adminRouter, userRouter } from "./apiController";

// for accessing env variables
dotenv.config();


// express adding sever to app
const app = express();

// setting port num from env
const port: any = process.env.PORT || 3000;

// used for body parsers in apis
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// cors setup for communication of sever and client
app.use(cors({ origin: ['http://103.138.197.190', 'http://localhost:8080', 'http://10.10.40.249', 'http://gss.karnataka.gov.in', 'https://gss.karnataka.gov.in'] }));

//setting req headers and res headers 
app.use(function (req, res, next) {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block'");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("strict-transport-security", "max-age=63072000; includeSubdomains; preload");
  res.setHeader('Content-Security-Policy', '<policy-directive>; <policy-directive>')
  next();
});

// create for logs śad
app.use(morgan('common', {
  stream: fs.createWriteStream('./logs/application.log', { flags: 'a' })
}));

app.use(morgan('dev'));
app.use(compression())

app.get('/init', (req, res) => {
  // Perform any initialization logic here
  console.log('Application initialized');

  res.status(200).send('Initialization complete');
});

// controllers
app.use('/GuranteeScheme/user', userRouter);
app.use('/GuranteeScheme/admin', adminRouter);

// app.listen(port, '192.168.45.170');
AppDataSource.initialize().then(async (connection) => {
  app.listen(port, async () => {
    Logger.info(`⚡️[Database]: Database connected....+++++++ ${port}`);
  });
}).catch(error => {
  Logger.error("connection error :::::::", error);
  throw new Error("new Connection ERROR " + JSON.stringify(error));
})


