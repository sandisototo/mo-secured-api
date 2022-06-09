import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Admin } from "./Admin";
import { Client } from "./Client";
import { FlagStatusType } from "./FlagStatusType";

@Entity()
export class Checkin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: string;

  @Column()
  adminId: string;

  @Column()
  checkInCode: string;

  @Column()
  visitorName: string;

  @Column()
  visitorIdNumber: string;

  @Column()
  visitorCarRegistrationNumber: string;

  @Column()
  flagReason: string;

  @Column()
  expiryInMinutes: number;

  @Column()
  timeIn: Date;

  @Column()
  timeOut: Date;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => FlagStatusType)
  @JoinColumn()
  flagStatusType: FlagStatusType;

  @ManyToOne(() => Client, (client) => client.checkins)
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Admin, (admin) => admin.checkins)
  @JoinColumn()
  admin: Admin;
}
