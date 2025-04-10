import { Injectable } from '@nestjs/common';

const users = [
  {
    username: 'doudou',
    githubId: '46888268',
    email: 'yyy@163.com',
    hobbies: ['sleep', 'writting'],
  },
  {
    username: 'dongdong',
    email: 'xxx@xx.com',
    hobbies: ['swimming'],
  },
];

@Injectable()
export class AppService {
  findUserByGithubId(id: string) {
    return users.find((item) => item.githubId === id);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
