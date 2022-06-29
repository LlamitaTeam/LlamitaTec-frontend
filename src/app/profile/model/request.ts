import { Client } from "./client";
import { Employee } from "./employee";
import { Service } from "./service";

export class Request {
    id: number;
    title: string;
    description: string;
    urlToImage: string;
    paid: boolean;
    client: Client;
    employee: Employee;
    service: Service;
    constructor() {
      this.id = 0;
      this.title = "";
      this.description = "";
      this.urlToImage= "";
      this.paid=false;
      this.service={
        id:0,
        name:"",
        urlToImage:"",
        description:""
      }
      this.client={
        id:0,
        name:"",
        age: 0,
        phone: "",
        altphone: "",
        urlToImage: "",
        address: "",
        description: "",
        user: {
          id:0,
          email:"",
          password:"",
          roles: [{
            id: 0, 
            name: ""
          }]
        }
      }
      this.employee={
        id:0,
        name:"",
        age: 0,
        phone: "",
        altphone: "",
        urlToImage: "",
        description: "",
        service: {
          id:0,
          name:"",
          urlToImage:"",
          description:""
        },
        user: {
          id:0,
          email:"",
          password:"",
          roles: [{
            id: 0, 
            name: ""
          }]
        }
      }
    }
  }