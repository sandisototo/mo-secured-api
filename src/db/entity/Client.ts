import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Checkin } from "./Checkin";
import { UserType } from "./UserType";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  idNumber: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  userTypeId: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserType)
  @JoinColumn()
  userType: UserType;

  @OneToMany(() => Checkin, (checkin) => checkin.client)
  checkins: Checkin[];
}
