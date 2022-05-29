export class Employee {
    id: number;
    name: string;
    age: number;
    serviceId: number;
    email: string;
    number: number;
    altnumber: number;
    urlToImage: string;
    description: string;
  
    constructor() {
      this.id = 0;
      this.name = "";
      this.age = 0;
      this.serviceId=0;
      this.email = "";
      this.number = 0;
      this.altnumber = 0;
      this.urlToImage="";
      this.description = "";
    }
  }