import { Company } from './Company'
import { Game } from './Game'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { SystemType } from './SystemType'

@Entity()
export class System {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => SystemType, (type) => type.systems)
  type: SystemType

  @OneToMany(() => Game, (game) => game.system)
  games: Game[]

  @ManyToOne(() => Company, (company) => company.systems)
  company: Company
}
