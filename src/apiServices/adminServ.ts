import { Service } from "typedi";
import { AdminRepo } from "../apiRepository/AdminRepo";
import { OtpServices } from "../sms/smsServceResusable";


@Service()
export class AdminServices {
    constructor(
        public adminRepo: AdminRepo,
        public otpServices: OtpServices
    ) { };


}