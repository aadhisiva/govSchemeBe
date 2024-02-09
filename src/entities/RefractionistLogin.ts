import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity({ name: "RefractionistLogin"} )
  export class RefractionistLogin {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    UserId: string;

    @Column({type: 'nvarchar', length: 50, default: null})
    Name: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    Mobile: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    Otp: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    Role: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    Type: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    SubCenterCode: string;

    @Column({type: 'nvarchar', length: 50, default: null})
    Token: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    TokenExpirationTime: string;

    @Column({type: 'nvarchar', length: 20, default: null})
    Status: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    CreatedBy: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    CreatedMobile: string;
  
    @Column({type: 'nvarchar', length: 20, default: null})
    UpdatedBy: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  