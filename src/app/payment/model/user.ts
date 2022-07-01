export class User {
    id: number;
    email: string;
    password: string;
    roles: any;
    constructor() {
      this.id = 0;
      this.email = "";
      this.password = "";
      this.roles = [{
        id: 0, 
        name: ""
      }]
    }
  }