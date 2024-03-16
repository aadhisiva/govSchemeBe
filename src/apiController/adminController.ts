import { Container } from 'typedi';
import express from "express";
import { webAppResponse, webAppResponseForLarge } from '../utils/errorHandling';
import { AdminServices } from '../apiServices/adminServ';
import { WEBMESSAGES } from '../utils/constants';

const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

adminRouter.post('/webLogin', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.webLogin(body);
        return await webAppResponse(res, result, "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getAllMasterData', async (req, res) => {
    try {
        let result = await adminServices.getMasterData();
        return await webAppResponseForLarge(res, result, "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getAllAssignedUsers', async (req, res) => {
    try {
        let result = await adminServices.getAllAssignedUsers();
        return await webAppResponse(res, result, "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getDashBoardCounts', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getDashBoardCounts(body);
        return await webAppResponse(res, result, "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/addDistrictAndTalukUser', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.addDistrictAndTalukUser(body);
        return await webAppResponse(res, result, "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/addOrUpdateAllLogin', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.addOrUpdateAllLogin(body);
        return await webAppResponse(res, result, "", "addOrUpdateAllLogin", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getDisAndTalukAssignedData', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getDisAndTalukAssignedData(body);
        return await webAppResponse(res, result, "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/addRefractionist', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.addRefractionist(body);
        return await webAppResponse(res, result, "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/modifyRefractionist', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.modifyRefractionist(body);
        return await webAppResponse(res, "", "", "Master Data", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getEachSchemeCounts', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getEachSchemeCounts(body);
        return await webAppResponseForLarge(res, result, "", "getEachSchemeCountForWebReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/phcMissingData', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.phcMissingData(body);
        return await webAppResponseForLarge(res, result, "", "phcMissingData", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/updatePhcMissingData', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.updatePhcMissingData(body);
        return await webAppResponseForLarge(res, result, "", "updatePhcMissingData", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getCountsOfDistrictAndTaluk', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getCountsOfDistrictAndTaluk(body);
        return await webAppResponseForLarge(res, result, "", "getEachSchemeCountForWebReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getDistinctOfEach', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getDistinctTaluk(body);
        return await webAppResponseForLarge(res, result, "", "getDistinctTaluk", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getReportsOfEachScheme', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getReportsOfEachScheme(body);
        return await webAppResponseForLarge(res, result, "", "getReportsOfEachScheme", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/sendOtpForWebQr', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.sendOtpForWebQr(body);
        return await webAppResponseForLarge(res, result, "", "senOtpForWebQr", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

export {
    adminRouter
};