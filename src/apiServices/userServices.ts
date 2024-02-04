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
        let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(Mobile, data?.Otp);
        await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
        let checkUserData = await this.userRepo.sendOtp(data);
        if (checkUserData?.code) return checkUserData;
        if (sendSingleSms.code !== 200) {
            return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        }
        return {
            Token: checkUserData.Token,
            UserId: checkUserData?.UserId,
            Version: version
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
        const { rc } = data;
        let getUserDetails = await fetchDataFromKutumba(data);
        for (let i = 0; i < getUserDetails?.length; i++) {
            let assignedData = assignKutumaToTableFormate(getUserDetails[i]);
            await this.userRepo.saveKutumbaDataToTable(assignedData);
        }
        let getData = await this.userRepo.getDataFromKutumbaTable(rc);
        return getData;
    }
};