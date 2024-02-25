import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { AnnaBhagya, GruhaJyothi, GruhaLakshmi, PersonLocation, Shakthi, Version, YuvaNidhi } from '../entities';
import { KutumbaData } from '../entities/KutumbaData';
import { RefractionistLogin } from '../entities/RefractionistLogin';
import Logger from '../loggers/winstonLogger';

const refractionistDataRepo = AppDataSource.getRepository(RefractionistLogin);
const versionDataRepo = AppDataSource.getRepository(Version);
const kutumbaDataRepo = AppDataSource.getRepository(KutumbaData);
const gruhaLakshmiRepo = AppDataSource.getRepository(GruhaLakshmi);
const gruhaJyothiRepo = AppDataSource.getRepository(GruhaJyothi);
const yuvaNidhiRepo = AppDataSource.getRepository(YuvaNidhi);
const annaBhagyaRepo = AppDataSource.getRepository(AnnaBhagya);
const shakthiRepo = AppDataSource.getRepository(Shakthi);
const personLocationRepo = AppDataSource.getRepository(PersonLocation);

@Service()
export class UserRepo {

    async getUserData(Mobile) {
        return await refractionistDataRepo.findOneBy({ Mobile });
    }

    async getUserDataById(UserId) {
        return await refractionistDataRepo.findOneBy({ UserId });
    }

    async getVersionOfApp() {
        let data = await AppDataSource.getRepository(Version).find();
        if (data?.length == 0) return { code: 404 };
        return data;
    }

    async checkUserExits(Mobile, UserId) {
        return await refractionistDataRepo.findOneBy({ UserId, Mobile });
    }

    async sendOtp(data) {
        try {
            const { Mobile, Role } = data;
            let findOneBy = await refractionistDataRepo.findOneBy({ Mobile, Role });
            if (!findOneBy) return { code: 404, message: "UserData Not Found." };
            let newData = { ...findOneBy, ...data };
            return await refractionistDataRepo.save(newData);
        } catch (E) {
            Logger.info("sendOtp repo", E);
        }
    }

    async addUser(data) {
        return await refractionistDataRepo.save(data);
    }

    async saveKutumbaDataToTable(data) {
        return await kutumbaDataRepo.save(data);
    }

    async getDataFromKutumbaTable(rc) {
        return await kutumbaDataRepo.find({
            where: {
                RcNo: rc
            }
        });
    };

    async getEachPersonDataFromKutumba(RcNo, MemberId) {
        return await kutumbaDataRepo.findOneBy({
            RcNo, MemberId
        });
    };

    async nonEligiblePerson(RcNo, MemberId) {
        let result = await kutumbaDataRepo.findOneBy({RcNo, MemberId});
        let newData = {...result, ...{SurveyCompleted: 'Completed'}};
        return await kutumbaDataRepo.save(newData);
    };

    async saveStatusOfEachPerson(RcNo, MemberId) {
        let findData = await kutumbaDataRepo.findOneBy({ RcNo, MemberId });
        let newData = { ...findData, ...{ SurveyCompleted: "Completed" } }
        return await kutumbaDataRepo.save(newData);
    };

    async getLoginDetails(UserId) {
        return await refractionistDataRepo.createQueryBuilder('child').
            select(['child.Name as CreatedBy', 'child.UserId as UserId', 'child.Mobile as CreatedMobile',])
            .where("child.UserId= :UserId", { UserId }).getRawOne();
    };

    async savingToGruhalakshi(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        let findGlData = await gruhaLakshmiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData, ...{SurveyStatus: 'Completed'} };
        return await gruhaLakshmiRepo.save(newGlData);
    };
    async savingToGruhaJyothi(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await gruhaJyothiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData,...{SurveyStatus: 'Completed'}  };
        return await gruhaJyothiRepo.save(newGlData);
    };
    async savingToAnnaBhagya(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await annaBhagyaRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData, ...{SurveyStatus: 'Completed'}  };
        return await annaBhagyaRepo.save(newGlData);
    };
    async savingToYuvaNidhi(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await yuvaNidhiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData,...{SurveyStatus: 'Completed'}  };
        return await yuvaNidhiRepo.save(newGlData);
    };
    async savingToShakthi(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await shakthiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData, ...{SurveyStatus: 'Completed'}  };
        return await shakthiRepo.save(newGlData);
    };

    /* ***************************** Saving Offline Record ********************************** */

    async savingToGruhalakshiForOfflineRc(data) {
        const { RcNo } = data;
        let findGlData = await gruhaLakshmiRepo.findOneBy({ RcNo });
        if(findGlData) return { code: 400, message: "Already Registered."}
        let newGlData = { ...findGlData, ...data };
        return await gruhaLakshmiRepo.save(newGlData);
    };

    async savingToGruhaJyothiForOfflineRc(data) {
        const { RcNo } = data;
        let findGlData = await gruhaJyothiRepo.findOneBy({ RcNo });
        let newGlData = { ...findGlData, ...data };
        return await gruhaJyothiRepo.save(newGlData);
    };

    async savingToAnnaBhagyaForOfflineRc(data) {
        const { RcNo } = data;
        let findGlData = await annaBhagyaRepo.findOneBy({ RcNo });
        if(findGlData) return { code: 400, message: "Already Registered."}
        let newGlData = { ...findGlData, ...data };
        return await annaBhagyaRepo.save(newGlData);
    };
    async savingToYuvaNidhiForOfflineRc(data) {
        const { RcNo } = data;
        let findGlData = await yuvaNidhiRepo.findOneBy({ RcNo });
        let newGlData = { ...findGlData, ...data };
        return await yuvaNidhiRepo.save(newGlData);
    };
    async savingToShakthiForOfflineRc(data) {
        const { RcNo } = data;
        let findGlData = await shakthiRepo.findOneBy({ RcNo });
        let newGlData = { ...findGlData, ...data };
        return await shakthiRepo.save(newGlData);
    };

    async savaPersonLocaion(data) {
        const { RcNo, MemberId } = data;
        let findGlData = await personLocationRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...data };
        return await personLocationRepo.save(newGlData);
    };

    /* ***************************** Saving Mobile Record ********************************** */

    
    async savingToGruhalakshiForMobileBase(data) {
        return await gruhaLakshmiRepo.save(data);
    };
    
    async savingToGruhaJyothiForMobileBase(data) {
        return await gruhaJyothiRepo.save(data);
    };

    async savingToAnnaBhagyaForMobileBase(data) {
        return await annaBhagyaRepo.save(data);
    };
    async savingToYuvaNidhiForMobileBase(data) {
        return await yuvaNidhiRepo.save(data);
    };
    async savingToShakthiForMobileBase(data) {
        return await shakthiRepo.save(data);
    };

    // async savaPersonLocaion(data) {
    //     const { RcNo, MemberId } = data;
    //     let findGlData = await personLocationRepo.findOneBy({ RcNo, MemberId });
    //     let newGlData = { ...findGlData, ...data };
    //     return await personLocationRepo.save(newGlData);
    // };

    async surveyedUserCount(data) {
        const { UserId } = data;
        let sp = `exec surveyedUserCount @0`;
        let getData = await AppDataSource.query(sp, [UserId]);
        return getData;
    };
    /* test apis */
    async sendOtpFortest(data) {
        const { Mobile } = data;
        // let findOneBy = await refractionistDataRepo.findOneBy({Mobile});
        // let newData = {...findOneBy, ...data};
        return await refractionistDataRepo.save(data);
    };


    async getUserDataByIdForTest(Mobile) {
        return await refractionistDataRepo.findOneBy({ Mobile });
    }
    async savingToGruhalakshiForTest(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await gruhaLakshmiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData };
        return await gruhaLakshmiRepo.save(newGlData);
    };
    async savingToGruhaJyothiForTest(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await gruhaJyothiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData };
        return await gruhaJyothiRepo.save(newGlData);
    };
    async savingToAnnaBhagyaForTest(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await annaBhagyaRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData };
        return await annaBhagyaRepo.save(newGlData);
    };
    async savingToYuvaNidhiForTest(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await yuvaNidhiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData };
        return await yuvaNidhiRepo.save(newGlData);
    };
    async savingToShakthiForTest(data) {
        const { RcNo, MemberId } = data;
        let findRcData = await this.getEachPersonDataFromKutumba(RcNo, MemberId);
        let newData = { ...findRcData, ...data };
        delete newData?.id;
        delete newData?.CreatedDate;
        delete newData?.UpdatedDate;
        let findGlData = await shakthiRepo.findOneBy({ RcNo, MemberId });
        let newGlData = { ...findGlData, ...newData };
        return await shakthiRepo.save(newGlData);
    };
}