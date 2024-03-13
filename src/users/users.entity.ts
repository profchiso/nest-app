import {
  AfterInsert,
  BeforeInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
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
