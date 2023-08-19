import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private _users: User[];
  private _tweets: Tweet[];

  constructor() {
    this._users = [];
    this._tweets = [];
  }

  get users() {
    return this._users;
  }

  get tweets() {
    return this._tweets;
  }

  getHealth(): string {
    return "I'm okay!";
  }

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet(body: CreateTweetDto) {
    const { username, tweet } = body;
    const isRegistered = this.users.some((t) => t.username === username);

    if (!isRegistered) {
      throw new Error('User has not registered before');
    }

    const newTweet = new Tweet(username, tweet);
    return this.tweets.push(newTweet);
  }
}
