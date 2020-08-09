import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  avatar: string;

  @Column('varchar')
  whatsapp: string;

  @Column('varchar')
  bio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
