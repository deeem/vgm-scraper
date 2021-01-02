import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { System } from './System'

@Entity()
export class SystemType {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => System, (system) => system.type)
  systems: System[]
}
