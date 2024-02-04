import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: "KutumbaData" })
  export class KutumbaData {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    MemberId: string;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    RcNo: string;
  
    @Column({ type: 'nvarchar', length: 50, default: null})
    Name: string;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    Age: string;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    Gender: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    Dob: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    RelationShip: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    Gl_flag: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    Gj_Flag: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    Yn_Flag: string;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    KutumbaIdStatus: string;
  
    @Column({ type: 'nvarchar', length: 50, default: null})
    CreatedBy: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    CreatedMobile: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };