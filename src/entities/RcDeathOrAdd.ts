import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: "RCDeathOrAdd" })
  export class RCDeathOrAdd {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 30, default: null})
    MemberId: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    RcNo: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    UserId: string;
  
    @Column({ type: 'nvarchar', length: 50, default: null})
    Name: string;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    Age: string;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    Gender: string;
  
    @Column({ type: 'text', default: null})
    Dob: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    RelationShip: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    GL_Flag: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    GJ_Flag: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    YN_Flag: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    AB_Flag: string;
  
    @Column({ type: 'text', default: null})
    KutumbaIdStatus: string;
  
    @Column({ type: 'nvarchar', length: 50, default: null})
    CreatedBy: string;
    
    @Column({ type: 'nvarchar', length: 50, default: null})
    SurveyMode: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    CreatedMobile: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };