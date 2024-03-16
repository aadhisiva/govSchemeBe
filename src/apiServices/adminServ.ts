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
        if (!Role) return alert("Please Provide Role.");
        data.Otp = generateOTP(4);
        data.Token = generateRandomString(40);
        data.TokenExpirationTime = generateEOfTTime();
        if (Role == ROLES.SUPER_ADMIN) {
            delete data?.Role;
            let result = await this.adminRepo.checkLoginUser(data);
            if (result?.code) return { code: 404, message: "User Not Exists." }
            delete result?.CreatedDate;
            delete result?.UpdatedDate;
            result.Role = Role;
            result.loginRole = 'Super Admin';
            let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
            await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
            if (sendSingleSms.code !== 200) {
                return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            }
            return result;
            // return await this.adminRepo.loginToSuperAdmin(result);
        } else if (Role === ROLES.DISTRICT_OFFICER) {
            delete data?.Role;
            let result = await this.adminRepo.checkDistrictUser(data);
            if (result?.code) return { code: 404, message: "User Not Exists." };
            delete result?.CreatedDate;
            delete result?.UpdatedDate;
            result.loginCode = result?.DistrictCode;
            result.loginRole = result?.Role;
            result.Role = Role;
            let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
            await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
            if (sendSingleSms.code !== 200) {
                return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            }
            return result;
        } else if (Role === ROLES.TALUK_OFFICER) {
            delete data?.Role;
            let result = await this.adminRepo.checkTalukUser(data);
            if (result?.code) return { code: 404, message: "User Not Exists." };
            delete result?.CreatedDate;
            delete result?.UpdatedDate;
            result.loginRole = result?.Role;
            result.loginCode = result?.TalukOrTownCode;
            result.Role = Role;
            let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
            await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
            if (sendSingleSms.code !== 200) {
                return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            }
            return result;
        } else if (Role === ROLES.PHCO_OFFICER) {
            delete data?.Role;
            let result = await this.adminRepo.checkPhcUser(data);
            if (result?.code) return { code: 404, message: "User Not Exists." };
            delete result?.CreatedDate;
            delete result?.UpdatedDate;
            result.loginRole = result?.Role;
            result.loginCode = result?.PHCCode;
            result.Role = Role;
            let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
            await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
            if (sendSingleSms.code !== 200) {
                return { code: 422, message: RESPONSEMSG.OTP_FAILED };
            }
            return result;
        } else {
            return {code: 400, message: 'Role Not Found'};
        }
        // return this.adminRepo.webLogin(data);
    }

    async getAllAssignedUsers() {
        return this.adminRepo.getAllAssignedUsers();
    }
    async getDashBoardCounts(data) {
        return this.adminRepo.getDashBoardCounts(data);
    }

    async addDistrictAndTalukUser(data) {
        const { type } = data;
        if (type == "DO") {
            return this.adminRepo.assignToDistrict(data);
        } else if (type == "PO") {
            return this.adminRepo.assignToPhc(data);
        } else if (type == "TO") {
            return this.adminRepo.assignToTaluk(data)
        } else if (type == "SO") {
            return this.adminRepo.assignToSubCenter(data)
        } else {
            return [];
        }
    }

    async addOrUpdateAllLogin(data) {
        const { type } = data;
        if (type == "DO") {
            return this.adminRepo.assignToDistrictNew(data);
        } else if (type == "PO") {
            return this.adminRepo.assignToPhcNew(data);
        } else if (type == "TO") {
            return this.adminRepo.assignToTalukNew(data)
        } else if (type == "SO") {
            return this.adminRepo.assignToSubCenter(data)
        } else {
            return [];
        }
    }

    async getDisAndTalukAssignedData(data) {
        return this.adminRepo.getDisAndTalukAssignedData(data);
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

    async getEachSchemeCounts(data) {
        return this.adminRepo.getEachSchemeCounts(data);
    }

    async phcMissingData(data) {
        return this.adminRepo.phcMissingData(data);
    }

    async updatePhcMissingData(data) {
        return this.adminRepo.updatePhcMissingData(data);
    }

    async getCountsOfDistrictAndTaluk(data) {
        return this.adminRepo.getCountsOfDistrictAndTaluk(data);
    }
    async getDistinctTaluk(data) {
        const { Type } = data;
        if(Type === 'Taluk'){
            return this.adminRepo.getDistinctTaluk(data);
        } else if(Type === 'Phc') {
            return this.adminRepo.getDistinctPhc(data);
        } else {
            return this.adminRepo.getDistinctSubCenter(data);
        }
    }
    async getReportsOfEachScheme(data) {
      const { Scheme, SearchType} = data;
      if(!Scheme) return { code: 422, message: "Provide Scheme"}
      if(!SearchType) return { code: 422, message: "Provide SearchType"}
        return this.adminRepo.getReportsOfEachScheme(data);
    }
    async sendOtpForWebQr(data) {
      const { Mobile } = data;
      if(!Mobile) return { code: 422, message: "Provide Mobile."}
      data.Otp = generateOTP(4);
      let sendSingleSms = await this.otpServices.sendSmsInKannadaUnicode(Mobile, data?.Otp);
      await saveMobileOtps(Mobile, sendSingleSms?.otpMessage, sendSingleSms?.response, data?.UserId, data?.Otp);
      return this.adminRepo.sendOtpForWebQr(data);
    }
}