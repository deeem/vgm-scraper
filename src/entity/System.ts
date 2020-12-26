import { Company } from './Company'
import { Game } from './Game'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class System {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Company, (company) => company.systems)
  company: Company

  @OneToMany(() => Game, (game) => game.system)
  games: Game[]
}
