import {
    AdminData,
    AnnaBhagya,
    GSMasterData,
    GruhaJyothi,
    GruhaLakshmi,
    KutumbaData,
    MobileLogs,OtpLogs, PersonLocation, RefractionistLogin, Shakthi, Version, YuvaNidhi, webLogs
} from "../entities"


export const entities = () => {
    return [
        MobileLogs,
        OtpLogs,
        RefractionistLogin,
        webLogs,
        Version,
        GruhaJyothi,
        GruhaLakshmi,
        YuvaNidhi,
        Shakthi,
        AnnaBhagya,
        KutumbaData,
        PersonLocation,
        GSMasterData,
        AdminData
    ];
};