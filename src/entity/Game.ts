import { System } from './System'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  developer: string

  @Column()
  released_at: string

  @ManyToOne(() => System, (system) => system.games)
  system: System
}
