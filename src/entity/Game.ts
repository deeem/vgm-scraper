import { System } from './System'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  packUrl: string

  @Column({
    default: 'false',
  })
  isDone: string

  @ManyToOne(() => System, (system) => system.games)
  system: System
}
