import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';
import * as bcrypt from 'bcryptjs';
import { Fanfic } from './fanfic.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  password: string;
  @Column({ type: 'varchar', length: 36 })
  role: Role;
  @Column({ type: 'varchar', length: 255, nullable: true })
  key: string;
  @Column({ type: 'boolean', nullable: true })
  unicornDarkTheme: boolean;
  @OneToMany(type => Fanfic, fanfic => fanfic.author, { cascade: ['insert', 'update', 'recover'] })
  fanfics: Fanfic[];
  @OneToMany(type => Comment, comment => comment.author, { cascade: ['insert', 'update', 'recover'] })
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
