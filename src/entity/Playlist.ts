import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Track } from './Track'

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Track, (track) => track.playlists, {
    cascade: true,
  })
  @JoinTable()
  tracks: Track[]
}
