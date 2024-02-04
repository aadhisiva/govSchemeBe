import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { Version } from '../entities';
import { KutumbaData } from '../entities/KutumbaData';
import { RefractionistLogin } from '../entities/RefractionistLogin';

const userDataRepo = AppDataSource.getRepository(RefractionistLogin);
const versionDataRepo = AppDataSource.getRepository(Version);
const kutumbaData = AppDataSource.getRepository(KutumbaData);

@Service()
export class UserRepo {

    async getUserData(Mobile){ 
        return await userDataRepo.findOneBy({Mobile});
    }

    async getUserDataById(UserId){ 
        return await userDataRepo.findOneBy({UserId});
    }

    async getVersionOfApp(){ 
        let data = await versionDataRepo.find();
        if(data?.length == 0) return {code: 404};
        return data;
    }

    async checkUserExits(Mobile, UserId){ 
        return await userDataRepo.findOneBy({ UserId, Mobile });
    }

    async sendOtp(data){
        const { Mobile } = data; 
        let findOneBy = await userDataRepo.findOneBy({Mobile});
        if(!findOneBy) return {code: 404, message: "UserData Not Found."};
        let newData = {...findOneBy, ...data};
        return await userDataRepo.save(newData);
    }

    async addUser(data){
        return await userDataRepo.save(data);
    }

    async saveKutumbaDataToTable(data){
        return await kutumbaData.save(data);
    }

    async getDataFromKutumbaTable(rc){
        return await kutumbaData.find({where: {
            RcNo: rc
        }});
    };

}