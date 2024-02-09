import { Container, Service } from 'typedi';
import express from "express";
import { UserServices } from '../apiServices/userServices';
import { mobileAppResponse } from '../utils/errorHandling';
import { getRoleAndUserId } from '../utils/resuableCode';
import { MOBILE_MESSAGES } from '../utils/constants';
import { authTokenAndVersion } from '../utils/middlewares';

const userRouter = express.Router()

const userServices = Container.get(UserServices);

userRouter.post('/addUser', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.addUser(body);
        return await mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.ADDED));
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});

userRouter.post('/sendOtp', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.sendOtp(body);
        return await mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.SEND_OTP));
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});

userRouter.post('/verifyOtp', authTokenAndVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.verifyOtp(body);
        return await mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.VERIFY_OTP));
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});


/* ********************************** Kutumba api **************************************** */

userRouter.post('/getKutumbaData',authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers["userid"]}};
        let result = await userServices.getKutumbaData(body);
        return await mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});

userRouter.post('/sample', async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers["userid"]}};
        let dsf = await userServices.getKutumbaData(body);
        res.send(dsf)
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});

userRouter.post('/saveSurveyData',authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers["userid"]}};
        let result = await userServices.saveSurveyData(body);
        return await mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.SUBMIT_DATA));
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});
userRouter.post('/saveSurveyLocation',authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers["userid"]}};
        let result = await userServices.saveSurveyLocation(body);
        return await mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.SUBMIT_DATA));
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});
userRouter.post('/surveyedUserCount',authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers["userid"]}};
        let result = await userServices.surveyedUserCount(body);
        return await mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.SUBMIT_DATA));
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});


export {
    userRouter
};