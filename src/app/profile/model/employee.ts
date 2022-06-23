import { Service } from "./service";
import { User } from "./user";
export class Employee {
    id: number;
    name: string;
    age: number;
    phone: string;
    altphone: string;
    urlToImage: string;
    description: string;
    user: User;
    service: Service;

    constructor() {
      this.id = 0;
      this.name = "";
      this.age = 0;
      this.phone = "";
      this.altphone = "";
      this.urlToImage="";
      this.description = "";
      this.service={
        id:0,
        name:"",
        urlToImage:"",
        description:""
      }
      this.user={
        id:0,
        email:"",
        password:"",
        typeuser:""
      }
    }
  }