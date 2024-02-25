import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { AdminData, AnnaBhagya, DistrictAssign, GSMasterData, GruhaJyothi, GruhaLakshmi, PhcoAssign, RefractionistLogin, Shakthi, TalukAssign, YuvaNidhi } from '../entities';

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
      const {type} = data;
      // let query =  `exec getDashBoardCounts @0,@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12,@13`;
      // let result = await AppDataSource.query(query, [type]);
      return [];
   };

   async getDisAndTalukAssignedData(data) {
      const { allData, role, code, isAssignMent, Mobile } = data;
      let query =  `exec getAssignedDataWithMasters @0,@1,@2,@3,@4`;
      let result = await AppDataSource.query(query, [allData, role, code, isAssignMent, Mobile]);
      return result;
   };
   async assignToDistrict(data) {
      const { DistrictCode, Mobile, isNew } = data;
      let checkMobile  = await districtAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile > 1) return {code: 400, message: "Already Registered."};
      let findData = await districtAssignRepo.findOneBy({DistrictCode, Mobile})
      let newData = {...findData, ...data};
      return await districtAssignRepo.save(newData);
   };
   async assignToPhc(data) {
      const { PHCCode, Mobile, isNew } = data;
      let checkMobile  = await phcAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile > 1) return {code: 400, message: "Already Registered."};
      let findData = await phcAssignRepo.findOneBy({PHCCode, Mobile});
      let newData = {...findData, ...data};
      return await phcAssignRepo.save(newData);
   };

   async assignToTaluk(data) {
      const { TalukOrTownCode, Mobile, isNew } = data;
      let checkMobile  = await talukAssignRepo.countBy({Mobile});
      if(checkMobile && checkMobile > 1) return {code: 400, message: "Already Registered."};
      let findData = await talukAssignRepo.findOneBy({TalukOrTownCode, Mobile});
      let newData = {...findData, ...data};
      return await talukAssignRepo.save(newData);
   };

   async assignToSubCenter(data) {
      const { Mobile, UserId } = data;
      let checkMobile  = await refractionistRepo.countBy({Mobile});
      if(checkMobile && checkMobile > 1) return {code: 400, message: "Already Registered."};
      let findData = await refractionistRepo.findOneBy({UserId});
      let newData = {...findData, ...data};
      return await refractionistRepo.save(newData);
   };

   async getGruhaLakshmiReports(data) {
      try{
      const { FromDate, ToDate } = data;
      // let getCount = 
      let query =  `exec getGruhaLakshmiReports @0,@1,@2,@3`;
      let result = await AppDataSource.query(query, [1, 10, 'id', 222]);
      return result;
      } catch(e){
         console.log("e",e)
      }
   };

   async getGruhaLJyothiReports(data) {
      const { FromDate, ToDate } = data;
      let query =   `exec getGruhaLJyothiReports @From,@To`;
      let result = await AppDataSource.query(query, [FromDate, ToDate]);
      return result;
   };

   async getAnnaBhagyaReports(data) {
      const { FromDate, ToDate } = data;
      let query =   `exec getAnnaBhagyaReports @From,@To`;
      let result = await AppDataSource.query(query, [FromDate, ToDate]);
      return result;
   };

   async getYuvaNidhiReports(data) {
      const { FromDate, ToDate } = data;
      let query =   `exec getYuvaNidhiReports @From,@To`;
      let result = await AppDataSource.query(query, [FromDate, ToDate]);
      return result;
   };

   async getShakthiReports(data) {
      const { FromDate, ToDate } = data;
      let query =   `exec getShakthiReports @From,@To`;
      let result = await AppDataSource.query(query, [FromDate, ToDate]);
      return result;
   };

   async addRefractionist(data) {
      return await refractionistRepo.save(data);
   }

   async modifyRefractionist(data) {
      const { UserId } = data;
      let findData = await refractionistRepo.findOneBy({UserId});
      let newData = {...findData, ...data};
      return await refractionistRepo.save(newData);
   }

   async getDistinctTaluk(data) {
      let result = await masterDataRepo.createQueryBuilder("master")
      .select(`DISTINCT master.TalukOrTownCode, 
             master.TalukOrTownName as TalukOrTownName,`)
      .where("master.DistrictName= :id", {id: data?.district})
      .orderBy("master.TalukOrTownName", "ASC")
      .getRawMany();
      return result;

   }

   async getDistinctSubCenter(data) {
      let result = await masterDataRepo.createQueryBuilder("master")
      .select(`DISTINCT master.SubCenterCode, 
      master.SubCenterName as SubCenterName,`)
      .where("master.TalukOrTownName= :id", {id: data?.taluk})
      .orderBy("master.SubCenterName", "ASC")
      .getRawMany();
      return result;
   }
};