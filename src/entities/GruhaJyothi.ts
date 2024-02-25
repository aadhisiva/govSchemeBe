import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'GruhaJyothi' })
  export class GruhaJyothi {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    RcNo: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    UserId: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    Mobile: string;

    @Column({type: 'nvarchar', length: 100, default: null})
    ElectricACNo: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    Name: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    RelationShip: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    Gender: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    MemberId: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    GJ_Flag: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    Dob: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    Age: string;
  
    @Column({type: 'nvarchar', length: 'max', default: null})
    GJ1: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    GJ2: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    GJ3: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    GJ4: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    GJ5: string;

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