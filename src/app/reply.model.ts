export class Reply {
  public timestamp = Date.now();
  public time = new Date(Date.now()).toLocaleString();
  constructor(public comment: string, public username: string, public image: string) {};
}
