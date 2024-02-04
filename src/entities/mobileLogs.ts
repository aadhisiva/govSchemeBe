import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity({ name: "MobileLogs"})
  export class MobileLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    UserId: string;

   @Column({ type: 'text', default: null})
    logMessage: string;

   @Column({ type: 'text', default: null})
    apiMessage: string;

   @Column({ type: 'text', default: null})
    Request: string;

   @Column({ type: 'text', default: null})
    Response: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  