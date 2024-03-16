import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { AdminData, AnnaBhagya, DistrictAssign, GSMasterData, GruhaJyothi, GruhaLakshmi, PhcoAssign, RefractionistLogin, Shakthi, ShakthiQrOtp, TalukAssign, YuvaNidhi } from '../entities';

const masterDataRepo = AppDataSource.getRepository(GSMasterData);
const refractionistRepo = AppDataSource.getRepository(RefractionistLogin);
const adminDataRepo = AppDataSource.getRepository(AdminData);
const gruhaLakshmiRepo = AppDataSource.getRepository(GruhaLakshmi);
const gruhaJyothiRepo = AppDataSource.getRepository(GruhaJyothi);
const yuvaNidhiRepo = AppDataSource.getRepository(YuvaNidhi);
const annaBhagyaRepo = AppDataSource.getRepository(AnnaBhagya);
const shakthiRepo = AppDataSource.getRepository(Shakthi);
const talukAssignRepo = AppDataSource.getRepository(TalukAssign);
const districtAssignRepo = AppDataSource.getRepository(DistrictAssign);
const phcAssignRepo = AppDataSource.getRepository(PhcoAssign);
const shakthiQrOtpRepo = AppDataSource.getRepository(ShakthiQrOtp);

@Service()
export class AdminRepo {
   async checkLoginUser(data) {
      const { Mobile } = data;
      let result = await adminDataRepo.findOneBy({Mobile});
      if(!result) return { code: 404 };
      let newData = { ...result, ...data };
      return adminDataRepo.save(newData);
   };
   async checkDistrictUser(data) {
      const { Mobile } = data;
      let result = await districtAssignRepo.findOneBy({Mobile});
      if(!result) return { code: 404 };
      let newData = { ...result, ...data };
      return districtAssignRepo.save(newData);
   };
   async checkTalukUser(data) {
      const { Mobile } = data;
      let result = await talukAssignRepo.findOneBy({Mobile});
      if(!result) return { code: 404 };
      let newData = { ...result, ...data };
      return talukAssignRepo.save(newData);
   };
   async checkPhcUser(data) {
      const { Mobile } = data;
      let result = await phcAssignRepo.findOneBy({Mobile});
      if(!result) return { code: 404 };
      let newData = { ...result, ...data };
      return phcAssignRepo.save(newData);
   };

   async getMasterData() {
      let data = await masterDataRepo.createQueryBuilder("master")
      .select(`DISTINCT master.SubCenterCode, 
      master.DistrictName as DistrictName,
      master.SubCenterName as SubCenterName,
      master.TalukOrTownName as TalukOrTownName,
      master.HobliOrZoneName as HobliOrZoneName,
      master.PHCName as PHCName,
      master.Type as Type`)
      .orderBy("master.DistrictName", "ASC")
      .getRawMany();
      return data;
   };

   async getAllAssignedUsers() {
      let query =  `exec assignedFromMasterData`;
      let result = await AppDataSource.query(query);
      return result;
   };

   async getDashBoardCounts(data) {
      const {Role, Code} = data;
      let query =  `exec getDashBoardCounts @0,@1`;
      let result = await AppDataSource.query(query, [Role, Code]);
      return result;
   };

   async getDisAndTalukAssignedData(data) {
      const { allData, role, code, isAssignMent, Mobile } = data;
      let query =  `exec getAssignedDataWithMasters @0,@1,@2,@3,@4`;
      let result = await AppDataSource.query(query, [allData, role, code, isAssignMent, Mobile]);
      return result;
   };
   async assignToDistrict(data) {
      const { DistrictCode, Mobile } = data;
      let checkMobile  = await districtAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      let findData = await districtAssignRepo.findOneBy({DistrictCode, Mobile})
      let newData = {...findData, ...data};
      return await districtAssignRepo.save(newData);
   };
   async assignToPhc(data) {
      const { PHCCode, Mobile } = data;
      let checkMobile  = await phcAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      let findData = await phcAssignRepo.findOneBy({PHCCode, Mobile});
      let newData = {...findData, ...data};
      return await phcAssignRepo.save(newData);
   };

   async assignToTaluk(data) {
      const { TalukOrTownCode, Mobile } = data;
      let checkMobile  = await talukAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      let findData = await talukAssignRepo.findOneBy({TalukOrTownCode, Mobile});
      let newData = {...findData, ...data};
      return await talukAssignRepo.save(newData);
   };

   async assignToSubCenter(data) {
      const { Mobile, UserId } = data;
      let checkMobile  = await refractionistRepo.countBy({Mobile});
      if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      let findData = await refractionistRepo.findOneBy({UserId});
      let newData = {...findData, ...data};
      return await refractionistRepo.save(newData);
   };
   async assignToDistrictNew(data) {
      const { Mobile, id } = data;
      let checkMobile  = await districtAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      if(id){
         let findData = await districtAssignRepo.findOneBy({id})
         let newData = {...findData, ...data};
         return await districtAssignRepo.save(newData);
      }
      return await districtAssignRepo.save(data);
   };
   async assignToPhcNew(data) {
      const { id, Mobile } = data;
      let checkMobile  = await phcAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      if(id){
         let findData = await phcAssignRepo.findOneBy({id})
         let newData = {...findData, ...data};
         return await phcAssignRepo.save(newData);
      }
      return await phcAssignRepo.save(data);
   };

   async assignToTalukNew(data) {
      const { Mobile, id } = data;
      let checkMobile  = await talukAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      if(id){
         let findData = await talukAssignRepo.findOneBy({id});
         let newData = {...findData, ...data};
         return await talukAssignRepo.save(newData);
      }
      return await talukAssignRepo.save(data);
   };

   async addRefractionist(data) {
      const { Mobile } = data;
        let checkMobile  = await refractionistRepo.countBy({Mobile});
        if(checkMobile && checkMobile >= 1) return {code: 400, message: "Already Registered."};
      return await refractionistRepo.save(data);
   }

   async modifyRefractionist(data) {
      const { UserId } = data;
      let findData = await refractionistRepo.findOneBy({UserId});
      let newData = {...findData, ...data};
      return await refractionistRepo.save(newData);
   }

   async getEachSchemeCounts(data) {
      const { Role, Code} = data;
      let query = 'exec getEachSchemeCountsForAll @0,@1';
      let result = await AppDataSource.query(query, [Role, Code]);
      return result;
   }

   async phcMissingData(data) {
      const { Role, CreatedByMobile} = data;
      let query = 'exec phcMissingData @0,@1';
      let result = await AppDataSource.query(query, [Role, CreatedByMobile]);
      return result;
   }

   async updatePhcMissingData(data) {
      const {id} = data;
      let findData = await phcAssignRepo.findOneBy({id});
      let newData = {...findData, ...data};
      let result = await phcAssignRepo.save(newData);
      return result;
   }

   async getCountsOfDistrictAndTaluk(data) {
      const { Role, Code} = data;
      let query = 'exec getCountsOfDistrictAndTalukForAll @0,@1';
      let result = await AppDataSource.query(query, [Role, Code]);
      return result;
   }

   async getDistinctTaluk(data) {
      let result = await masterDataRepo.createQueryBuilder("master")
      .select(`DISTINCT master.TalukOrTownCode as value, 
             master.TalukOrTownName as role`)
      .where("master.DistrictName = :name", {name: data?.Code})
      .orderBy("master.TalukOrTownName", "ASC")
      .getRawMany();
      return result;

   }

   async getDistinctPhc(data) {
      let result = await masterDataRepo.createQueryBuilder("master")
      .select(`DISTINCT master.PHCCode as value, 
      master.PHCName as role`)
      .where("master.TalukOrTownCode = :id", {id: data?.Code})
      .orderBy("master.PHCName", "ASC")
      .getRawMany();
      return result;
   }

   async getDistinctSubCenter(data) {
      let result = await masterDataRepo.createQueryBuilder("master")
      .select(`DISTINCT master.SubCenterCode as value, 
      master.SubCenterName as role`)
      .where("master.PHCCode = :id", {id: data?.Code})
      .orderBy("master.SubCenterName", "ASC")
      .getRawMany();
      return result;
   }

   async getReportsOfEachScheme(data) {
      const { Scheme, SearchType, DistrictCode, TalukCode, PhcCode, SubCenterCode, FromDate, ToDate} = data;
      let query = 'exec getReportsOfEachScheme @0,@1,@2,@3,@4,@5,@6,@7';
      let result = await AppDataSource.query(query, [Scheme, SearchType, DistrictCode, TalukCode, PhcCode, SubCenterCode, FromDate, ToDate]);
      return result;
   }

   async sendOtpForWebQr(data) {
      const { Mobile } = data;
      let findData = await shakthiQrOtpRepo.findOneBy({Mobile});
      let newData = {...findData, ...data};
      return await shakthiQrOtpRepo.save(newData);
   }
};