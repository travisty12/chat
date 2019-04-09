export class Message {
  public timestamp = Date.now();
  constructor(public text: string, public name: string) {};
}
