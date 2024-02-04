import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  
  @Entity({ name: 'Version' })
  export class Version {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'nvarchar', length: 10, default: null})
    Version: string;

    @CreateDateColumn()
    createdDate: Date;
  };
  