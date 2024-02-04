import cryptoJs from "crypto";
import Logger from "../../loggers/winstonLogger";
import { DecryptStringFromEncrypt, HashHMACHex, convertAadharToSha256Hex } from "../resuableCode";
import axios from "axios";

const getReqBody = async (data, creteHMAC) => {
    const { aadhar, rc } = data;
    return {
        DeptID: "",
        BenID: "",
        RC_Number: rc ? `${rc}` : "",
        Aadhar_No: aadhar ? await convertAadharToSha256Hex(aadhar) : "",
        ClientCode: process.env.KUTUMA_CLIENT_CODE,
        HashedMac: creteHMAC,
        APIVersion: "1.0",
        IsPhotoRequired: "0",
        Member_ID: "",
        Mobile_No: "",
        Request_ID: "0123456789",
        UIDType: "1"
    };
};



export const fetchDataFromKutumba = async (data) => {
    try {
        let inputValue = "";
        inputValue = (data?.aadhar) ?
            `${process.env.KUTUMA_CLIENT_CODE}___${data.aadhar}_` :
            `${process.env.KUTUMA_CLIENT_CODE}__${data.rc}__`;
        let creteHMAC = HashHMACHex(process.env.KUTUMBA_CLIENT_SEC_KEY, inputValue);
        console.log("await getReqBody(data, creteHMAC)",await getReqBody(data, creteHMAC))
        let response = await axios.post(process.env.KUTUMBA_API, await getReqBody(data, creteHMAC), {
            headers: {
                "Accept": "application/json"
            }
        });
        if (response.status == 200 && response.data?.StatusCode == 0) {
            let decryptString = DecryptStringFromEncrypt(process.env.KUTUMBA_AES_KEY, process.env.KUTUMBA_IV_KEY, response?.data?.EncResultData)
            let pasingDecryptData = JSON.parse(decryptString);
            if (pasingDecryptData?.StatusCode === 0 && pasingDecryptData?.StatusText === "Sucess") {
                return pasingDecryptData?.ResultDataList;
            } else {
                return pasingDecryptData;
            }
        } else {
            return response.data;
            /* 
getUserDetails {
  StatusCode: -4,
  StatusText: 'Kindly pass at least one input parameter.',
  Response_ID: '03022024110835078733464',
  Request_ID: '0123456789',
  ResultDataList: ''
} */
        }
    } catch (e) {
        Logger.error("[ *********** getFamilyAdDataFromKutumba ************* ]", e);
        return e.message;
    };
};