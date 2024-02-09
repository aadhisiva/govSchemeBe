import { Container, Service } from "typedi";
import { UserRepo } from "../apiRepository/userRepo";
import { assignKutumaToTableFormate, generateEOfTTime, generateOTP, generateRandomString, incrementGenerator, saveMobileOtps } from "../utils/resuableCode";
import { API_MESSAGES } from "../utils/constants";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { fetchDataFromKutumba } from "../utils/kutumba/kutumbaData";
import { RefractionistLogin } from "../entities";

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
        const { Mobile } = data;
        if (!Mobile) return { code: 400 };
        let version: any = await this.userRepo.getVersionOfApp();
        data.Otp = generateOTP(4);
        data.Token = generateRandomString(40);
        data.TokenExpirationTime = generateEOfTTime();
        let checkUserData = await this.userRepo.sendOtp(data);
        if (checkUserData?.code) return checkUserData;
        let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
        await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
        if (sendSingleSms.code !== 200) {
            return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        }
        return {
            Token: checkUserData.Token,
            UserId: checkUserData?.UserId,
            Version: version[0].Version
        };
    };

    async verifyOtp(data: RefractionistLogin) {
        const { UserId, Otp } = data;
        if (!UserId) return { code: 400, message: 'User id not provided.' }
        let getUserDetails = await this.userRepo.getUserDataById(data.UserId);
        let checkOtp = getUserDetails.Otp == Otp;
        if (!checkOtp) return { code: 422, message: API_MESSAGES.VERIFICATION_FAILED };
        return { message: API_MESSAGES.VERIFICATION_SUCCESS, data: {} };
    }

    async getKutumbaData(data) {
        const { rc, UserId } = data;
        let getUserData = await this.userRepo.getLoginDetails(UserId);
        let checkRcNo = await this.userRepo.getDataFromKutumbaTable(rc);
        if(checkRcNo.length ==0 ){
            let getUserDetails = await fetchDataFromKutumba(data);

            for (let i = 0; i < getUserDetails?.length; i++) {
                let assignedData = assignKutumaToTableFormate(getUserDetails[i]);
                await this.userRepo.saveKutumbaDataToTable({...assignedData, ...getUserData});
            }
            let getData = await this.userRepo.getDataFromKutumbaTable(rc);
            return getData;
        } else {
            return checkRcNo;
        }
    }

    async saveSurveyData(data) {
        const { MemberId, RcNo, GruhaLakshmi, GruhaJyothi, AnnaBhagya, ShakthiScheme, Yuvanidhi, UserId } = data;
        if(!MemberId || !RcNo) return { code: 400 };
        let newArray = {
            GruhaLakshmi: "",
            GruhaJyothi: "",
            AnnaBhagya: "",
            ShakthiScheme: "",
            Yuvanidhi: ""
        };
        let getUserData = await this.userRepo.getLoginDetails(UserId);
        if(GruhaLakshmi){
            let newData = {...GruhaLakshmi, ...{ MemberId, RcNo }, ...getUserData};
            let saveData = await this.userRepo.savingToGruhalakshi(newData);
            newArray.GruhaLakshmi = (saveData.length == 0) ? saveData : "saved"; 
        }
        if(GruhaJyothi){
            let newData = {...GruhaJyothi, ...{ MemberId, RcNo }, ...getUserData};
            let saveData = await this.userRepo.savingToGruhaJyothi(newData)
            newArray.GruhaJyothi = (saveData.length == 0) ? saveData : "saved"; 
        }
        if(AnnaBhagya){
            let newData = {...AnnaBhagya, ...{ MemberId, RcNo }, ...getUserData};
            let saveData = await this.userRepo.savingToAnnaBhagya(newData)
            newArray.AnnaBhagya = (saveData.length == 0) ? saveData : "saved"; 
        }
        if(ShakthiScheme){
            let newData = {...ShakthiScheme, ...{ MemberId, RcNo }, ...getUserData};
            let saveData = await this.userRepo.savingToShakthi(newData)
            newArray.ShakthiScheme = (saveData.length == 0) ? saveData : "saved"; 
        }
        if(Yuvanidhi){
            let newData = {...Yuvanidhi, ...{ MemberId, RcNo }, ...getUserData};
            let saveData = await this.userRepo.savingToYuvaNidhi(newData)
            newArray.Yuvanidhi = (saveData.length == 0) ? saveData : "saved"; 
        }
        await this.userRepo.saveStatusOfEachPerson(RcNo, MemberId);
        return newArray;
    }

    async saveSurveyLocation(data){
        const { MemberId, RcNo, UserId } = data;
        if(!MemberId || !RcNo) return { code: 400 };
        let getUserData = await this.userRepo.getLoginDetails(UserId);
        let newData = {...getUserData, ...data};
        await this.userRepo.savaPersonLocaion(newData);
        return "Data saved";
    }
    async surveyedUserCount(data){
        let result = await this.userRepo.surveyedUserCount(data);
        return result;
    }
};