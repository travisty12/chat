export class Message {
  public timestamp = Date.now();
  public time = new Date(Date.now()).toLocaleString();
  constructor(public text: string, public name: string) {};
}
