import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { AdminData, AnnaBhagya, GSMasterData, GruhaJyothi, GruhaLakshmi, RefractionistLogin, Shakthi, YuvaNidhi } from '../entities';

const masterDataRepo = AppDataSource.getRepository(GSMasterData);
const refractionistRepo = AppDataSource.getRepository(RefractionistLogin);
const adminDataRepo = AppDataSource.getRepository(AdminData);
const gruhaLakshmiRepo = AppDataSource.getRepository(GruhaLakshmi);
const gruhaJyothiRepo = AppDataSource.getRepository(GruhaJyothi);
const yuvaNidhiRepo = AppDataSource.getRepository(YuvaNidhi);
const annaBhagyaRepo = AppDataSource.getRepository(AnnaBhagya);
const shakthiRepo = AppDataSource.getRepository(Shakthi);

@Service()
export class AdminRepo {
   async checkLoginUser(data) {
      const { Mobile } = data;
      let result = await adminDataRepo.findOneBy({Mobile});
      if(!result) return { code: 404 };
      let newData = { ...result, ...data };
      return adminDataRepo.save(newData);
   };

   // async loginToSuperAdmin(data) {
   //    return await adminDataRepo.s({Mobile});
   // }

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
      let data = await refractionistRepo.createQueryBuilder("user")
      .innerJoinAndSelect('GSMasterData', "master", "user.SubCenterCode = master.SubCenterCode")
      .select(`
      master.DistrictName as DistrictName,
      master.SubCenterName as SubCenterName,
      master.TalukOrTownName as TalukOrTownName,
      master.HobliOrZoneName as HobliOrZoneName,
      master.PHCName as PHCName,
      master.Type as Type,
      user.Name as Name,
      user.Mobile as Mobile,
      user.UserId as UserId,
      user.Role as Role,
      user.CreatedBy as CreatedBy,
      user.CreatedMobile as CreatedMobile
      `)
      .orderBy("user.createdDate", "DESC")
      .getRawMany();
      return data;
   };

   async getGruhaLlakshmiReports(data) {
      const { FromDate, ToDate } = data;
      let query =   `exec getGruhaLlakshmiReports @From,@To`;
      let result = await AppDataSource.query(query, [FromDate, ToDate]);
      return result;
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
};