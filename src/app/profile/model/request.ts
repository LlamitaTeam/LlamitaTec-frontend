export class Request {
    id: number;
    title: string;
    description: string;
    serviceId: number;
    employeeId: number;
    clientId: number;
    urlToImage: string;
    payed: boolean;
    constructor() {
      this.id = 0;
      this.title = "";
      this.description = "";
      this.serviceId = 0;
      this.employeeId = 0;
      this.clientId = 0;
      this.urlToImage= "";
      this.payed=false;
    }
  }