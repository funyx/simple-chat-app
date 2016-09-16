import { User } from './user.interface';
export interface Room {
  id: number;
  uid: string;
  name: string;
  createdAt: any;
  updatedAt: any;
  value: string;
  users: User[];
}
