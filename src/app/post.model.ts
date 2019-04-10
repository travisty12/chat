export class Post {
  public timestamp = Date.now();
  public time = new Date(Date.now()).toLocaleString();
  public recentTimestamp = Date.now();
  constructor(public title: string, public username: string, public comment: string, public image: string) {};
}
