import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'GSMasterData' })
  export class GSMasterData {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    PHCName: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    SubCenterCode: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SubCenterName: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    Type: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    DistrictCode: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    DistrictName: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    TalukOrTownCode: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    TalukOrTownName: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    HobliOrZoneCode: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    HobliOrZoneName: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    VillageOrWardCode: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    VillageOrWardName: string;

    @CreateDateColumn()
    CreatedDate: Date;
  };