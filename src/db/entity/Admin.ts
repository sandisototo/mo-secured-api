import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Checkin } from "./Checkin";
import { Role } from "./Role";
import { UserType } from "./UserType";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  userTypeId: number;

  @Column()
  roleId: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserType)
  @JoinColumn()
  userType: UserType;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "roleId", referencedColumnName: "id" })
  role: Role;

  @OneToMany(() => Checkin, (checkin) => checkin.client)
  checkins: Checkin[];
}
