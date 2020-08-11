import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Classes } from './classes.entity';

@Entity('class_schedule')
export class ClassSchedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  week_day: number;

  @Column('integer')
  from: number;

  @Column('integer')
  to: number;

  @ManyToOne(() => Classes)
  @JoinColumn({ name: 'class_id' })
  classes: Classes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
