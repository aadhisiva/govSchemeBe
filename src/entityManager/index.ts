import {
    AdminData,
    AnnaBhagya,
    DistrictAssign,
    GSMasterData,
    GruhaJyothi,
    GruhaLakshmi,
    KutumbaData,
    MobileLogs,OtpLogs, PersonLocation, PhcoAssign, RefractionistLogin, Shakthi, TalukAssign, Version, YuvaNidhi, webLogs
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
        AdminData,
        TalukAssign,
        DistrictAssign,
        PhcoAssign
    ];
};