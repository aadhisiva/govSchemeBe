import {
    AnnaBhagya,
    GruhaLakshmi,
    MobileLogs,OtpLogs, RefractionistLogin, Shakthi, Version, YuvaNidhi, webLogs
} from "../entities"
import { GruhaJyothi } from "../entities/GruhaJyothi";


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
        AnnaBhagya
    ];
};