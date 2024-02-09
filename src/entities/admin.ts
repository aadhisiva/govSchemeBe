import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'AdminData'})
  export class AdminData {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    otp: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    Mobile: string;
  
    @Column({ type: 'nvarchar', default: null})
    Name: string;
  
    @Column({ type: 'text', default: null})
    Token: string;
  
    @Column({ type: 'nvarchar', length: 30, default: null})
    TokenExpirationTime: string;
  
    @CreateDateColumn()
    createdDate: Date;
  };
  