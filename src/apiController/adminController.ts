import { Container } from 'typedi';
import express from "express";
import { mobileAppResponse, webAppResponse, webAppResponseForLarge } from '../utils/errorHandling';
import { AdminServices } from '../apiServices/adminServ';
import { WEBMESSAGES } from '../utils/constants';
import { AppDataSource } from '../db/config';
import { GSMasterData } from '../entities';
import { data } from "../dummy";


const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

adminRouter.post('/addMasterData', async (req, res) => {
    try {
        for(let i=0; i < (data.length || 0); i++){
            let eachrow: any = data[i];
            await AppDataSource.getRepository(GSMasterData).save(eachrow)
        }
        res.send("result")
    } catch (error) {
        return await mobileAppResponse(res, error);
    }
});

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

adminRouter.post('/getGruhaLakshmiReports', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getGruhaLakshmiReports(body);
        return await webAppResponseForLarge(res, result, "", "getGruhaLlakshmiReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getGruhaLJyothiReports', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getGruhaLJyothiReports(body);
        return await webAppResponseForLarge(res, result, "", "getGruhaLJyothiReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getAnnaBhagyaReports', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getAnnaBhagyaReports(body);
        return await webAppResponseForLarge(res, result, "", "getAnnaBhagyaReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getYuvaNidhiReports', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getYuvaNidhiReports(body);
        return await webAppResponseForLarge(res, result, "", "getYuvaNidhiReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getShakthiReports', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getShakthiReports(body);
        return await webAppResponseForLarge(res, result, "", "getShakthiReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getDistinctTaluk', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getDistinctTaluk(body);
        return await webAppResponseForLarge(res, result, "", "getDistinctTaluk", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post('/getDistinctSubCenter', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getDistinctSubCenter(body);
        return await webAppResponseForLarge(res, result, "", "getDistinctSubCenter", WEBMESSAGES.GET_ALLDATA, "userid", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});
export {
    adminRouter
};