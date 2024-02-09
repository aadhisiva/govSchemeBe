import { Service } from "typedi";
import { AdminRepo } from "../apiRepository/AdminRepo";
import { OtpServices } from "../sms/smsServceResusable";
import { generateEOfTTime, generateOTP, generateRandomString, incrementGenerator, saveMobileOtps } from "../utils/resuableCode";
import { ROLES } from "../utils/constants";
import { RESPONSEMSG } from "../utils/statusCodes";


@Service()
export class AdminServices {
    constructor(
        public adminRepo: AdminRepo,
        public otpServices: OtpServices
    ) { };

    async webLogin(data) {
        const { Role, Mobile } = data;
        if (Role == ROLES.SUPER_ADMIN) {
            data.otp = generateOTP(4);
            data.Token = generateRandomString(40);
            data.TokenExpirationTime = generateEOfTTime();
            let result = await this.adminRepo.checkLoginUser(data);
            if (result?.code) return { code: 404, message: "User Not Exists." }
            let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
            await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
            if (sendSingleSms.code !== 200) {
                return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            }
            return result;
            // return await this.adminRepo.loginToSuperAdmin(result);
        }
        // return this.adminRepo.webLogin(data);
    }

    async getAllAssignedUsers() {
        return this.adminRepo.getAllAssignedUsers();
    }

    async getMasterData() {
        return this.adminRepo.getMasterData();
    }

    async addRefractionist(data) {
        data.UserId = await incrementGenerator()
        return this.adminRepo.addRefractionist(data);
    }

    async modifyRefractionist(data) {
        return this.adminRepo.modifyRefractionist(data);
    }

    async getGruhaLlakshmiReports(data) {
        return this.adminRepo.getGruhaLlakshmiReports(data);
    }

    async getGruhaLJyothiReports(data) {
        return this.adminRepo.getGruhaLJyothiReports(data);
    }

    async getAnnaBhagyaReports(data) {
        return this.adminRepo.getAnnaBhagyaReports(data);
    }

    async getYuvaNidhiReports(data) {
        return this.adminRepo.getYuvaNidhiReports(data);
    }

    async getShakthiReports(data) {
        return this.adminRepo.getShakthiReports(data);
    }
}