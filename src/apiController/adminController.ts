import { Container } from 'typedi';
import express from "express";
import { webAppResponse, webAppResponseForLarge } from '../utils/errorHandling';
import { AdminServices } from '../apiServices/adminServ';
import { WEBMESSAGES } from '../utils/constants';
// import { AppDataSource } from '../db/config';
// import { GSMasterData } from '../entities';
import fs from 'fs';
import { data } from "../dummy";
// import { generateUniqueId } from '../utils/resuableCode';


const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

// adminRouter.post('/addMasterData', async (req, res) => {
//     try {
//         for (let i = 0; i < (data.length || 0); i++) {
//             let eachrow: any = data[i];
//             await AppDataSource.getRepository(GSMasterData).save(eachrow)
//         }
//         res.send("result")
//     } catch (error) {
//         return await mobileAppResponse(res, error);
//     }
// });

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

adminRouter.post('/getEachSchemeCountForWebReports', async (req, res) => {
    try {
        let body = req.body;
        let result = await adminServices.getEachSchemeCountForWebReports(body);
        return await webAppResponseForLarge(res, result, "", "getEachSchemeCountForWebReports", WEBMESSAGES.GET_ALLDATA, "userid", "role");
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

adminRouter.post('/createSheetMasterDataWsie', async (req, res) => {
    try {
        for (let i = 0; i < data.length; i++) {
            let eachRow = data[i];
            let query = `INSERT [dbo].[GSMasterData] ([PHCName], [SubCenterCode], [SubCenterName], [Type], [DistrictCode], [DistrictName], [TalukOrTownCode], [TalukOrTownName], [PHCCode]) VALUES ('${eachRow.PHCName}','${eachRow.SubCenterCode}' , '${eachRow.SubCenterName}', 'Urban', '${eachRow.DistrictCode}', '${eachRow.DistrictName}', '${eachRow.TalukOrTownCode}', '${eachRow.TalukOrTownName}','${eachRow.PHCCode}')`
            let logger = fs.createWriteStream('sql.txt', {
                flags: 'a' // 'a' means appending (old data will be preserved)
            })
            logger.write(`\n${query}`);
        }
        // for (let i = 0; i < data.length; i++) {
        //     let eachRow = data[i];
        //     // let id =   `${String(generateUniqueId())}${i+1}`
        //     let query = `UPDATE PhcoAssign set Role='${eachRow.Role}', PHCCode='${eachRow.PHCCode}', CreatedBy='${eachRow.PHCRole}' where Mobile='${eachRow.Mobile}'`
        //     let logger = fs.createWriteStream('updatePhc.txt', {
        //         flags: 'a' // 'a' means appending (old data will be preserved)
        //     })
        //     logger.write(`\n${query}`);
        // }
        res.send("Written in sql.text file.")

    } catch (error) {
        return await webAppResponse(res, error);
    }
});
export {
    adminRouter
};