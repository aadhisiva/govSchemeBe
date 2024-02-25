import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: 'PhcoAssign' })
  export class PhcoAssign {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    Name: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    PHCCode: string;
    
    @Column({type: 'nvarchar', length: 20, default: null})
    Mobile: string;

    @Column({type: 'nvarchar', length: 'max', default: null})
    Otp: string;

    @Column({type: 'nvarchar', length: 50, default: null})
    Role: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    Token: string;
    
    @Column({type: 'nvarchar', length: 'max', default: null})
    TokenExpirationTime: string;
  
    @Column({type: 'nvarchar', length: 50, default: null})
    CreatedBy: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    CreatedMobile: string;
  
    @CreateDateColumn()
    CreatedDate: Date;
  
    @UpdateDateColumn()
    UpdatedDate: Date;
  
  };