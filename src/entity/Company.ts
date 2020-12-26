import { Hardware } from './Hardware'
import { System } from './System'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Hardware, (hardware) => hardware.companies, {
    cascade: true,
  })
  @JoinTable()
  hardwares: Hardware[]

  @OneToMany(() => System, (system) => system.company, {
    cascade: true,
  })
  systems: System[]
}
