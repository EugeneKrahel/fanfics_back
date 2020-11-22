import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fanfic } from './fanfic.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(type => User, user => user.comments, { onDelete: 'CASCADE', cascade: ['insert', 'update', 'recover'], eager: true })
  author: User;
  @Column({ type: 'text' })
  content: string;
  @ManyToOne(type => Fanfic, fanfic => fanfic.comments, {onDelete: 'CASCADE', cascade: ['insert', 'update', 'recover'], eager: true })
  fanfic: Fanfic;
}
