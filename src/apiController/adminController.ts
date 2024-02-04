import { Container } from 'typedi';
import express from "express";
import { webAppResponse, webAppResponseForLarge } from '../utils/errorHandling';
import { AdminServices } from '../apiServices/adminServ';
import { WEBMESSAGES, WEBPAGES } from '../utils/constants';

const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

export {
    adminRouter
};