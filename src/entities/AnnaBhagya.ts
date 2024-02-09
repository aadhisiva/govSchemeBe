import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'AnnaBhagya'})
  export class AnnaBhagya {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    RcNo: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    UserId: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    Name: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    Relationship: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    Gender: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    MemberId: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    GL_Flag: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    GJ_Flag: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    YN_Flag: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    Dob: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    Age: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    AB1: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    AB2: string;
   
    @Column({type: 'nvarchar', length: 'max', default: null})
    AB3: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    AB4: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    AB5: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    AB6: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    SurveyStatus: string;
  
    @Column({type: 'nvarchar', length: 50, default: null})
    CreatedBy: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    CreatedMobile: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };