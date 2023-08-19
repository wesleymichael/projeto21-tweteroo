export class Tweet {
  private _username: string;
  private _tweet: string;

  constructor(username: string, tweet: string) {
    this._username = username;
    this._tweet = tweet;
  }
}
