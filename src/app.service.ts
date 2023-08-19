import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';
import { Tweet, TweetWithAvatar } from './entities/tweet.entity';

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

  getTweets(page: number): TweetWithAvatar[] {
    const maxTweets = 15;
    const start = (page - 1) * maxTweets;
    const end = start + maxTweets;

    const tweetsCopy = this.tweets.slice();
    tweetsCopy.reverse();
    const tweetsPage = tweetsCopy.slice(start, end);

    const response = tweetsPage.map((elem) => {
      const { username, tweet } = elem;
      const user = this.users.find(
        (userElem) => userElem.username === username,
      );
      return new TweetWithAvatar(username, user.avatar, tweet);
    });

    return response;
  }

  getTweetsByUsername(username: string): TweetWithAvatar[] {
    const user = this.users.find((userElem) => userElem.username === username);

    const tweetsByUser = this.tweets
      .filter((t) => t.username === username)
      .map((t) => {
        return new TweetWithAvatar(username, user.avatar, t.tweet);
      });
    return tweetsByUser;
  }
}
