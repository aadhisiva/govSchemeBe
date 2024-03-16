import { Container, Service } from "typedi";
import { UserRepo } from "../apiRepository/userRepo";
import { assignKutumaToTableFormate, generateEOfTTime, generateOTP, generateRandomString, generateUniqueId, getAgeFromBirthDateMultipleScenario, incrementGenerator, saveMobileOtps } from "../utils/resuableCode";
import { API_MESSAGES } from "../utils/constants";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { fetchDataFromKutumba } from "../utils/kutumba/kutumbaData";
import { RefractionistLogin } from "../entities";
import Logger from "../loggers/winstonLogger";

@Service()
export class UserServices {
    constructor(
        public userRepo: UserRepo,
        public otpServices: OtpServices,
    ) { };

    async addUser(data: RefractionistLogin) {
        const { Mobile } = data;
        if (!Mobile) return { code: 400 };
        data.UserId = await incrementGenerator();
        let checkUserData = await this.userRepo.addUser(data);
        return checkUserData;
    };

    async sendOtp(data: RefractionistLogin) {
            const { Mobile, Role } = data;
            if (!Mobile) return { code: 400, message: "Provide Role." };
            if (!Role) return { code: 400, message: "Provide Role." };
            let version: any = await this.userRepo.getVersionOfApp();
            data.Otp = generateOTP(4);
            data.Token = generateRandomString(40);
            data.TokenExpirationTime = generateEOfTTime();
            let checkUserData = await this.userRepo.sendOtp(data);
            if (checkUserData && checkUserData?.code == 404) return checkUserData;
            let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
            await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
            if (sendSingleSms && sendSingleSms.code !== 200) {
                return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            }
            return {
                UserId: checkUserData?.UserId,
                Version: version[0]?.Version
            };
    };

    async verifyOtp(data: RefractionistLogin) {
        const { UserId, Otp } = data;
        if (!UserId) return { code: 400, message: 'Provide UserId' };
        let getUserDetails = await this.userRepo.getUserDataById(data.UserId);
        let checkOtp = getUserDetails.Otp == Otp;
        if (!checkOtp) return { code: 422, message: API_MESSAGES.VERIFICATION_FAILED };
        return { message: API_MESSAGES.VERIFICATION_SUCCESS, data: {} };
    }

    async getKutumbaData(data) {
        const { rc, UserId } = data;
        let getUserData = await this.userRepo.getLoginDetails(UserId);
        let checkRcNo = await this.userRepo.getDataFromKutumbaTable(rc);
        if (checkRcNo.length == 0) {
            let getUserDetails = await fetchDataFromKutumba(data);

            for (let i = 0; i < getUserDetails?.length; i++) {
                let assignedData = assignKutumaToTableFormate(getUserDetails[i]);
                let getAgeFromDob = getAgeFromBirthDateMultipleScenario(assignedData.Dob);
                assignedData.Age = getAgeFromDob + '';

                await this.userRepo.saveKutumbaDataToTable({ ...assignedData, ...getUserData });
            }
            let getData = await this.userRepo.getDataFromKutumbaTable(rc);
            return getData;
        } else {
            return checkRcNo;
        }
    }
    async nonEligiblePerson(data) {
        const { RcNo, MemberId } = data;
        if (!RcNo) return { code: 400, message: "Provide RcNo." }
        if (!MemberId) return { code: 400, message: "Provide MemberId." }
        let getUserDetails = await this.userRepo.nonEligiblePerson(RcNo, MemberId);
        return getUserDetails;
    }
    async getKutumbaDataForSample(data) {
        let getUserDetails = await fetchDataFromKutumba(data);
        return getUserDetails;
    }

    async saveSurveyData(data) {
        const { MemberId, RcNo, GruhaLakshmi, GruhaJyothi, AnnaBhagya, ShakthiScheme, Yuvanidhi, UserId, SurveyMode, Name, Mobile, RelationShip, Age, Dob } = data;
        if (!SurveyMode) return { code: 400, message: "Provide SurveyMode." };
        // var MemberIdGen = SurveyMode === "Online" ? MemberId : generateUniqueId();
        let newArray = {
            GruhaLakshmi: "",
            GruhaJyothi: "",
            AnnaBhagya: "",
            ShakthiScheme: "",
            Yuvanidhi: ""
        };
        if (SurveyMode === "Online") {
            if(!MemberId) return {code: 400, message: "Provide Member Id"};
            if(!RcNo) return {code: 400, message: "Provide RcNo"};
            let getUserData = await this.userRepo.getLoginDetails(UserId);
            if (GruhaLakshmi) {
                let newData = { ...GruhaLakshmi, ...{ MemberId, RcNo,SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToGruhalakshi(newData);
                newArray.GruhaLakshmi = (saveData.length == 0) ? saveData : "saved";
            }
            if (GruhaJyothi) {
                let newData = { ...GruhaJyothi, ...{ MemberId, RcNo,SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToGruhaJyothi(newData)
                newArray.GruhaJyothi = (saveData.length == 0) ? saveData : "saved";
            }
            if (AnnaBhagya) {
                let newData = { ...AnnaBhagya, ...{ MemberId, RcNo,SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToAnnaBhagya(newData)
                newArray.AnnaBhagya = (saveData.length == 0) ? saveData : "saved";
            }
            if (ShakthiScheme) {
                let newData = { ...ShakthiScheme, ...{ MemberId, RcNo,SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToShakthi(newData)
                newArray.ShakthiScheme = (saveData.length == 0) ? saveData : "saved";
            }
            if (Yuvanidhi) {
                let newData = { ...Yuvanidhi, ...{ MemberId, RcNo, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToYuvaNidhi(newData)
                newArray.Yuvanidhi = (saveData.length == 0) ? saveData : "saved";
            }
            await this.userRepo.saveStatusOfEachPerson(RcNo, MemberId);
            return newArray;
        } else if(SurveyMode === "Offline"){
            if(!RcNo) return {code: 400, message: "Provide RcNo"};
            let MemberIdGen = generateUniqueId();
            let getUserData = await this.userRepo.getLoginDetails(UserId);
            if (GruhaLakshmi) {
                let newData = { ...GruhaLakshmi, ...{ MemberId: MemberIdGen, RcNo, Name, RelationShip, Age, Dob, Mobile, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToGruhalakshiForOfflineRc(newData);
                newArray.GruhaLakshmi = (saveData.length == 0) ? saveData : "saved";
            }
            if (GruhaJyothi) {
                let newData = { ...GruhaJyothi, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile,SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToGruhaJyothiForOfflineRc(newData)
                newArray.GruhaJyothi = (saveData.length == 0) ? saveData : "saved";
            }
            if (AnnaBhagya) {
                let newData = { ...AnnaBhagya, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToAnnaBhagyaForOfflineRc(newData)
                newArray.AnnaBhagya = (saveData.length == 0) ? saveData : "saved";
            }
            if (ShakthiScheme) {
                let newData = { ...ShakthiScheme, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToShakthiForOfflineRc(newData)
                newArray.ShakthiScheme = (saveData.length == 0) ? saveData : "saved";
            }
            if (Yuvanidhi) {
                let newData = { ...Yuvanidhi, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToYuvaNidhiForOfflineRc(newData)
                newArray.Yuvanidhi = (saveData.length == 0) ? saveData : "saved";
            }
            await this.userRepo.saveStatusOfEachPerson(RcNo, MemberId);
            return newArray;
        } else if(SurveyMode === "Mobile"){
            if(!Mobile) return {code: 400, message: "Provide Mobile"};
            let MemberIdGen = generateUniqueId();
            let getUserData = await this.userRepo.getLoginDetails(UserId);
            if (GruhaLakshmi) {
                let newData = { ...GruhaLakshmi, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToGruhalakshiForMobileBase(newData);
                newArray.GruhaLakshmi = (saveData.length == 0) ? saveData : "saved";
            }
            if (GruhaJyothi) {
                let newData = { ...GruhaJyothi, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile,SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToGruhaJyothiForMobileBase(newData)
                newArray.GruhaJyothi = (saveData.length == 0) ? saveData : "saved";
            }
            if (AnnaBhagya) {
                let newData = { ...AnnaBhagya, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile,SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToAnnaBhagyaForMobileBase(newData)
                newArray.AnnaBhagya = (saveData.length == 0) ? saveData : "saved";
            }
            if (ShakthiScheme) {
                let newData = { ...ShakthiScheme, ...{ MemberId: MemberIdGen, RcNo, Name,  RelationShip, Age, Dob, Mobile, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToShakthiForMobileBase(newData)
                newArray.ShakthiScheme = (saveData.length == 0) ? saveData : "saved";
            }
            if (Yuvanidhi) {
                let newData = { ...Yuvanidhi, ...{ MemberId: MemberIdGen, RcNo, Name, Mobile,  RelationShip, Age, Dob, SurveyMode }, ...getUserData };
                let saveData = await this.userRepo.savingToYuvaNidhiForMobileBase(newData)
                newArray.Yuvanidhi = (saveData.length == 0) ? saveData : "saved";
            }
            await this.userRepo.saveStatusOfEachPerson(RcNo, MemberId);
            return newArray;

        } else if(SurveyMode === "QrSurvey"){
            if (ShakthiScheme) {
                let newData = { ...ShakthiScheme, ...{Name, Age, Mobile, SurveyMode, UserId } };
                let saveData = await this.userRepo.savingToShakthiTOQrSurvey(newData)
                return saveData;
            }
        } else if(SurveyMode === "DeathPerson"){
            let getUserData = await this.userRepo.getLoginDetails(UserId);
            let newData = { ...data, ...getUserData };
            return await this.userRepo.savingDeathPersonData(newData);
        } else if(SurveyMode === "NewPerson"){
            if(!RcNo) return {code: 400, message: "Provide RcNo"};
            if(!data?.RelationShip) return {code: 400, message: "Provide RelationShip."}
            let MemberIdGen = generateUniqueId();
            let getUserData = await this.userRepo.getLoginDetails(UserId);
            let newData = { ...data, ...getUserData, ...{MemberId: MemberIdGen} };
            return await this.userRepo.savingNewRcPersonData(newData);
        }
    }
    async saveSurveyLocation(data) {
        const { MemberId, RcNo, UserId } = data;
        if (!MemberId || !RcNo) return { code: 400 };
        let getUserData = await this.userRepo.getLoginDetails(UserId);
        let newData = { ...getUserData, ...data };
        await this.userRepo.savaPersonLocaion(newData);
        return "Data saved";
    }
    async surveyedUserCount(data) {
        let result = await this.userRepo.surveyedUserCount(data);
        return result;
    }

    async sendOtpFortest(data) {
        const { Mobile } = data;
        if (!Mobile) return { code: 400 };
        if (Mobile.length > 10) return { code: 400, message: "Give Valid Mobile." };
        // let version: any = await this.userRepo.getVersionOfApp();
        data.Otp = "554433"
        data.UserId = await incrementGenerator();
        data.Token = generateRandomString(40);
        data.TokenExpirationTime = generateEOfTTime();
        let checkUserData = await this.userRepo.sendOtpFortest(data);
        // if (checkUserData?.code) return checkUserData;
        // let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
        // await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
        // if (sendSingleSms.code !== 200) {
        //     return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        // }
        return {
            Token: checkUserData.Token,
            // UserId: checkUserData?.UserId,
            Otp: checkUserData?.Otp
        };
    }

    async otpVerifyFortest(data) {
        const { Mobile, Otp } = data;
        if (!Mobile) return { code: 400, message: 'Mobile no not provided.' }
        let getUserDetails = await this.userRepo.getUserDataByIdForTest(Mobile);
        let checkOtp = getUserDetails.Otp == Otp;
        if (!checkOtp) return { code: 422, message: API_MESSAGES.VERIFICATION_FAILED };
        return { message: API_MESSAGES.VERIFICATION_SUCCESS, data: {} };
    }

    async saveSurveyDataForTest(data) {
        const { MemberId, RcNo, GruhaLakshmi, GruhaJyothi, AnnaBhagya, ShakthiScheme, Yuvanidhi, UserId } = data;
        if (!MemberId || !RcNo) return { code: 400 };
        let newArray = {
            GruhaLakshmi: "",
            GruhaJyothi: "",
            AnnaBhagya: "",
            ShakthiScheme: "",
            Yuvanidhi: ""
        };
        let getUserData = await this.userRepo.getLoginDetails(UserId);
        if (GruhaLakshmi) {
            let newData = { ...GruhaLakshmi, ...{ MemberId, RcNo }, ...getUserData };
            let saveData = await this.userRepo.savingToGruhalakshiForTest(newData);
            newArray.GruhaLakshmi = (saveData.length == 0) ? saveData : "saved";
        }
        if (GruhaJyothi) {
            let newData = { ...GruhaJyothi, ...{ MemberId, RcNo }, ...getUserData };
            let saveData = await this.userRepo.savingToGruhaJyothiForTest(newData)
            newArray.GruhaJyothi = (saveData.length == 0) ? saveData : "saved";
        }
        if (AnnaBhagya) {
            let newData = { ...AnnaBhagya, ...{ MemberId, RcNo }, ...getUserData };
            let saveData = await this.userRepo.savingToAnnaBhagyaForTest(newData)
            newArray.AnnaBhagya = (saveData.length == 0) ? saveData : "saved";
        }
        if (ShakthiScheme) {
            let newData = { ...ShakthiScheme, ...{ MemberId, RcNo }, ...getUserData };
            let saveData = await this.userRepo.savingToShakthiForTest(newData)
            newArray.ShakthiScheme = (saveData.length == 0) ? saveData : "saved";
        }
        if (Yuvanidhi) {
            let newData = { ...Yuvanidhi, ...{ MemberId, RcNo }, ...getUserData };
            let saveData = await this.userRepo.savingToYuvaNidhiForTest(newData)
            newArray.Yuvanidhi = (saveData.length == 0) ? saveData : "saved";
        }
        await this.userRepo.saveStatusOfEachPerson(RcNo, MemberId);
        return newArray;
    }

    async saveSurveyLocationForTest(data) {
        const { MemberId, RcNo, UserId } = data;
        if (!MemberId || !RcNo) return { code: 400 };
        let getUserData = await this.userRepo.getLoginDetails(UserId);
        let newData = { ...getUserData, ...data };
        await this.userRepo.savaPersonLocaion(newData);
        return "Data saved";
    }
};