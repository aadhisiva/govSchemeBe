import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'PersonLocation'})
  export class PersonLocation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    RcNo: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    MemberId: string;
    
    @Column({type: 'nvarchar', length: 50, default: null})
    UserId: string;
    
    @Column({type: 'text', default: null})
    Latitude: string;
  
    @Column({type: 'text', default: null})
    Longitude: string;
  
    @Column({type: 'text', default: null})
    Photo: string;
  
    @Column({type: 'nvarchar', length: 50, default: null})
    CreatedBy: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    CreatedMobile: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };