import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity()
  export class RefractionistLogin {
  
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    UserId: string;

    @Column()
    Name: string;

    @Column()
    Mobile: string;

    @Column()
    Otp: string;

    @Column()
    Token: string;

    @Column()
    TokenExpirationTime: string;

    @Column()
    Status: string;
  
    @Column()
    CreatedBy: string;
  
    @Column()
    UpdatedBy: string;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  };
  