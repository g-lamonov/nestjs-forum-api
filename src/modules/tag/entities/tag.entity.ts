import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;
}
