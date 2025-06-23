import { User } from '../entities/User';

export interface FormRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(form: User): Promise<User>;
  update(id: string, form: User): Promise<User | null>;
  delete(id: string): Promise<boolean>;
} 