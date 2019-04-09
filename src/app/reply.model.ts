export class Reply {
  public timestamp = Date.now();
  constructor(public comment: string, public username: string, public image: string) {};
}
