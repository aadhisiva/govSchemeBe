import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'Shakthi' })
  export class Shakthi {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    RcNo: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    Name: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    Mobile: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    UserId: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    RelationShip: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    Gender: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    MemberId: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    Dob: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    Age: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS1: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS2: string;
   
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS3: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS4: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS5: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS6: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS7: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    SS8: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    SurveyStatus: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    SurveyMode: string;
  
    @Column({type: 'nvarchar', length: 50, default: null})
    CreatedBy: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    CreatedMobile: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };