import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { Genre } from './enums/genre.enum';
import { Chapter } from './chapter.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'fanfic' })
export class Fanfic {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @ManyToOne(type => User, user => user.fanfics, { onDelete: 'CASCADE', cascade: ['insert', 'update', 'recover'], eager: true })
  author: User;
  @Column({ type: 'varchar', length: 36 })
  genre: Genre;
  @OneToMany(type => Chapter, chapter => chapter.fanfic, { cascade: ['insert', 'update', 'recover', 'remove'] })
  chapters: Chapter[];
  @OneToMany(type => Comment, comment => comment.fanfic, { cascade: ['insert', 'update', 'recover', 'remove'] })
  comments: Comment[];
  @ManyToMany(type => Tag, { cascade: ['insert', 'update', 'recover'], eager: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'fanfics_tags',
    joinColumn: { name: 'fanfic_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
