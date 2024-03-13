import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  findUser(id: number): Promise<User> {
    const user = this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  findAllUsers(): Promise<User[]> {
    return this.repo.find({});
  }
  async updateUser(
    id: number,
    userUpdateDetails: Partial<User>,
  ): Promise<User> {
    const user = await this.findUser(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    Object.assign(user, userUpdateDetails);

    return await this.repo.save(user);
  }
  async removeUser(id: number) {
    const user = await this.findUser(id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return this.repo.remove(user);
  }
}
