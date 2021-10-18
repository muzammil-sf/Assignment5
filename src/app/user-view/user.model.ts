export class UserModel {
  constructor(
    public id: number,
    public fname: string,
    public mname: string,
    public lname: string,
    public email: string,
    public pno: string,
    public role: string,
    public address: string
  ) {}
}
