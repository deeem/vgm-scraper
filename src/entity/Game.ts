import { System } from './System'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Track } from './Track'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  released_at: string

  @Column()
  packUrl: string

  @Column()
  imageUrl: string

  @Column()
  isDone: string

  @ManyToOne(() => System, (system) => system.games)
  system: System

  @ManyToMany(() => Track, (track) => track.games)
  tracks: Track[]
}
