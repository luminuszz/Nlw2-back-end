import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '@modules/users/entities/users.entity';

@Entity('classes')
export class Classes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  subject: string;

  @Column('decimal')
  cost: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
