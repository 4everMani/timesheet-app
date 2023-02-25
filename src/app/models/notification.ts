export class Notification {
  public email?: string;
  public subscription?: Object;

  constructor(email: string, sub: any) {
    this.email = email;
    this.subscription = sub;
  }
}
