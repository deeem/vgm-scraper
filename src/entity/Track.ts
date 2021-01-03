import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Game } from './Game'
import { Playlist } from './Playlist'

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  type: string

  @Column()
  file: string

  @ManyToMany(() => Playlist, (playlist) => playlist.tracks)
  playlists: Playlist[]

  @ManyToMany(() => Game, (game) => game.tracks)
  @JoinTable()
  games: Game[]
}
