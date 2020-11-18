import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({type: 'varchar', length: 255})
  name: string;
}
