import { ISchedule } from './ISchedule';

export interface ICreateClass {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
  schedule: ISchedule[];
}
