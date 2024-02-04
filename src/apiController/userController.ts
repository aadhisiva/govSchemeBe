import { Container, Service } from 'typedi';
import express from "express";
import { UserServices } from '../apiServices/userServices';
import { mobileAppResponse, mobileAppResponseForLarge } from '../utils/errorHandling';
import { getRoleAndUserId } from '../utils/resuableCode';
import { MOBILE_MESSAGES } from '../utils/constants';
import { authTokenAndVersion, authVersion } from '../utils/middlewares';

const userRouter = express.Router()

const userServices = Container.get(UserServices);

userRouter.post('/addUser', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.addUser(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.ADDED));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/sendOtp', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.sendOtp(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.SEND_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/verifyOtp', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.verifyOtp(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.VERIFY_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});


/* ********************************** Kutumba api **************************************** */

userRouter.post('/getKutumbaData', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.getKutumbaData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});


export {
    userRouter
};