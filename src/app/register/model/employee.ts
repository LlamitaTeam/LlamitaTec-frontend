import { Service } from "./service";
import { User } from "./user";
export class Employee {
    name: string;
    age: number;
    phone: string;
    altphone: string;
    urlToImage: string;
    description: string;
    constructor() {
      this.name = "";
      this.age = 0;
      this.phone = "";
      this.altphone = "";
      this.urlToImage="";
      this.description = "";
    }
  }