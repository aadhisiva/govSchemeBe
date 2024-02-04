import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity({ name: 'WebLogs' })
  export class webLogs {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 20, default: null})
    UserId: string;

    @Column({ type: 'text', default: null})
    Message: string;

    @Column({ type: 'text', default: null})
    Request: string;

    @Column({ type: 'text', default: null})
    Response: string;

    @Column({ type: 'text', default: null})
    ResponseType: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  