import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fanfic } from './fanfic.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'text' })
  content: string;
  @ManyToOne(type => Fanfic, fanfic => fanfic.chapters, {onDelete: 'CASCADE', cascade: ['insert', 'update', 'recover'], eager: true })
  fanfic: Fanfic;
}
