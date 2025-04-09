import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'dou',
      password: '123456',
    },
    {
      userId: 2,
      username: 'haha',
      password: 'ha',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
