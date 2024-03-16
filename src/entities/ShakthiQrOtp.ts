import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'ShakthiQrOtp'})
  export class ShakthiQrOtp {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    Otp: string;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    Mobile: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @CreateDateColumn()
    UpdatedDate: Date;
  }
  