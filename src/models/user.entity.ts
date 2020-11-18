import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';
import * as bcrypt from 'bcryptjs';
import { Fanfic } from './fanfic.entity';

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
  @OneToMany(type => Fanfic, fanfic => fanfic.author, { cascade: ['insert', 'update', 'recover']})
  fanfics: Fanfic[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}