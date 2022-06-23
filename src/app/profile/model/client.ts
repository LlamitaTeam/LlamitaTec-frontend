import { User } from "./user";
export class Client {
    id: number;
    name: string;
    age: number;
    phone: string;
    altphone: string;
    urlToImage: string;
    address: string;
    description: string;
    user: User;

    constructor() {
      this.id = 0;
      this.name = "";
      this.age = 0;
      this.phone = "";
      this.altphone = "";
      this.urlToImage="";
      this.address = "";
      this.description = "";
      this.user={
        id:0,
        email:"",
        typeuser:"",
        password:""
      }
    }
  }