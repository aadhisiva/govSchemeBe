import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'OtpLogs'})
  export class OtpLogs {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    otp: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    Mobile: string;
  
    @Column({ type: 'text', default: null})
    Message: string;
  
    @Column({ type: 'text', default: null})
    Response: string;
  
    @Column({ type: 'nvarchar', length: 30, default: null})
    UserId: string;
  
    @CreateDateColumn()
    createdDate: Date;
  }
  