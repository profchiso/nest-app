import {
  AfterInsert,
  BeforeInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logUser() {
    console.log(this);
  }

  @BeforeInsert()
  checkPasswordLength() {
    if (this.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
  }
}
