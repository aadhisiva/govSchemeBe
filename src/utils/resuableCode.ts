import { AppDataSource } from "../db/config";
import { MobileLogs, OtpLogs, RefractionistLogin, webLogs } from "../entities";
import cryptoJs from "crypto";
import Logger from "../loggers/winstonLogger";
import { KutumbaData } from "../entities/KutumbaData";


// const mobileLogsRepo = AppDataSource.getRepository(MobileLogs);
const otpLogsRepo = AppDataSource.getRepository(OtpLogs);

// generate random string
export const generateRandomString = (RequiredLength) => {
  let newString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < RequiredLength; i++) {
    let randomCharacter = characters.charAt(Math.floor(Math.random() * charactersLength));
    newString += randomCharacter;
  }
  return newString;
};

export function generateOTP(length) {
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export function generateEOfTTime() {
  // generate time 
  const end = new Date();
  // end.setHours(23, 59, 59, 999);
  return end.toLocaleDateString();
};

export function generateCurrentTime() {
  // generate time 
  const current = new Date();
  return current.toLocaleDateString();
};

export function generateUniqueId() {
  // generate time 
  const [year, month, day] = new Date().toJSON().split('T')[0].split('-');
  return year + month + day + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds();
};

// generate sequence wise id
export const incrementGenerator = async () => {
  try {
    return `GS${generateUniqueId()}`;
  } catch (e) {
    return e;
  }
}
// export function generateUniqueId() {
//   const [year, month, day] = new Date().toJSON().split('T')[0].split('-');
//   return year + month + day + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds();
// };

export const saveWebLogs = async (WebPage, Message, UserId, Request, Response, Role, ResponseType) => {
  const webLogsRepo = AppDataSource.getRepository(webLogs);
  // generate time
  let newBody = {
    WebPage,
    Message,
    UserId,
    Role,
    Request: JSON.stringify(Request),
    Response: JSON.stringify(Response),
    ResponseType
  }
   await webLogsRepo.save(newBody);
   return null;
};

export const saveMobileLogs = async (logMessage, apiMessage, UserId, Request, Response, Role, ResponseType) => {
  try{
  const mobileLogsRepo = AppDataSource.getRepository(MobileLogs);
  // generate time
  let data = new MobileLogs();
  data.logMessage = logMessage;
    data.apiMessage = apiMessage;
    data.apiMessage = apiMessage;
    data.UserId = UserId;
    data.Request= JSON.stringify(Request);
    data.Response= JSON.stringify(Response);
    data.ResponseType = ResponseType;
   await mobileLogsRepo.save(data);
   return null;
} catch(e){
  Logger.error(e)
}
};

export const getRoleAndUserId = (req, message) => {
  // create new Object
  let newBody = {
    userId: req.headers["userid"],
    role: req.headers["role"],
    logMessage: message
  }
  return newBody;;
};

export const saveMobileOtps = async (Mobile, text, response, UserId = '', otp) => {
  // create new Object
  let newBody = {
    otp,
    Mobile,
    Message: JSON.stringify(text),
    Response: JSON.stringify(response),
    UserId
  }
  return await otpLogsRepo.save(newBody);
};

export const assignKutumaToTableFormate = (actualData) => {
  let data = new KutumbaData();
  data.Name = actualData.MEMBER_NAME_ENG || null;
  data.Gender = actualData.MBR_GENDER || null;
  data.Dob = actualData.MBR_DOB || null;
  data.RelationShip = actualData.RELATION_NAME || null;
  data.RcNo = actualData.RC_NUMBER || null;
  data.GJ_Flag = actualData.GJ_FLAG || null;
  data.GL_Flag = actualData.GL_FLAG || null;
  data.YN_Flag = actualData.YN_FLAG || null;
  data.AB_Flag = actualData.AB_FLAG || null;
  data.MemberId = actualData.MEMBER_ID || null;
  data.KutumbaIdStatus = actualData.Kutumba_ID_status || null;
  return data;
};

export const getAgeFromBirthDateMultipleScenario = (dob) => {
  let currentDate: any = new Date();
  let [dayM, monM, yearM] = dob.split("/");
  if(dayM){
    if(dayM.length > 2){
      let [year, mon, day] = dob.split("/");
      let originDate: any = new Date(`"${mon + "/" + day + "/" + year}"`);
      var milliDay = 1000 * 60 * 60 * 24 // a day in milliseconds;
      let age = Math.floor(((currentDate - originDate) / milliDay) / 365);
      return age;
    }
    let originDate: any = new Date(`"${monM + "/" + dayM + "/" + yearM}"`);
    var milliDay = 1000 * 60 * 60 * 24 // a day in milliseconds;
    let age = Math.floor(((currentDate - originDate) / milliDay) / 365);
    return age;
  } else {
    let [dayS, monS, yearS] = dob.split("-");
    if(dayS.length > 2){
      let [year, mon, day] = dob.split("-");
      let originDate: any = new Date(`"${mon + "/" + day + "/" + year}"`);
      var milliDay = 1000 * 60 * 60 * 24 // a day in milliseconds;
      let age = Math.floor(((currentDate - originDate) / milliDay) / 365);
      return age;
    } else{
      let originDate: any = new Date(`"${monS + "/" + dayS + "/" + yearS}"`);
      var milliDay = 1000 * 60 * 60 * 24 // a day in milliseconds;
      let age = Math.floor(((currentDate - originDate) / milliDay) / 365);
      return age;
    }
  }
};

// convert aadhar no to hash for getting details from kutumba
export const convertAadharToSha256Hex = async (data) => {
  try {
    let hash = cryptoJs.createHash(process.env.HASHING256);
    hash.update(data);
    return hash.digest("hex").toUpperCase();
  } catch (e) {
    Logger.error("[******* convertAadharToSha256Hex *******]", e);
    return e.message;
  }
};

// hashmac means its combination of (aadhar no, client code, sec key, etc...)
export const HashHMACHex = (hMACKey, InputValue) => {
  let hashHMACHex = '';

  const HashHMAC = (message, hmac) => {
    return hmac.update(message).digest();
  };
  const HashEncode = (hash) => {
    return Buffer.from(hash).toString('base64');
  };
  try {
    const keyByte = Buffer.from(hMACKey, 'ascii');
    const hmacsha256 = cryptoJs.createHmac('sha256', keyByte);
    const messageBytes = Buffer.from(InputValue, 'ascii');

    const hash = HashHMAC(messageBytes, hmacsha256);
    hashHMACHex = HashEncode(hash);
  } catch (ex) {
    Logger.error("Error Message: [" + ex.message.toString() + "]");
    return ex.message;
  }
  return hashHMACHex;
};

// convert kutumba decryptData readable formate
export const DecryptStringFromEncrypt = (key, IV, cipherText) => {
  const buffer = Buffer.from(cipherText, 'base64');
  const aes = cryptoJs.createDecipheriv('aes-256-cbc', key, IV);
  let decrypted = aes.update(buffer, null, 'utf8');
  decrypted += aes.final('utf8');
  return decrypted;
};