export const YES = 'Yes';
export const SUPER_ADMIN = 'Super Admin';

export const API_VERSION_ISSUE = 'New Version Available. Please Contact To Technical Team';


export enum WEBPAGES {
    LOGIN_PAGE='Login Page',
    USER_MANAGEMENT='User Management',
    SCEHEMS='Schemes' 
}


export enum RESPONSETYPE {
    SUCCESS='SUCCESS',
    FAILED='FAILED'
}
export enum WEBMESSAGES {
    SEND_OTP='Send Otp',
    VERIFY_OTP='Send Otp',
    GET_ALLDATA='Get All Data',
    ADDED='New Data Added',
    UPDATE='Update Exist Data', 
}
export enum MOBILE_MESSAGES {
    SEND_OTP='Send Otp',
    VERIFY_OTP='Verify Otp',
    GET_ALLDATA='Get All Data',
    ADDED='New Data Added',
    UPDATE='Update Exist Data',
    GET_CHILD_DATA="Get Child Data From External Source",
    GET_KUTUMBA_DATA="Get Kutumba Data From External Source",
    SUBMIT_DATA="Submit Data.",
};

export enum API_MESSAGES {
    VERIFICATION_FAILED='Verification Failed',
    VERIFICATION_SUCCESS='Verification Success'
};

export enum ROLES {
    SUPER_ADMIN='Super Admin',
    DISTRICT_OFFICER='District Officer',
    TALUK_OFFICER='Taluk Officer',
    PHCO_OFFICER='Phco Officer'
};