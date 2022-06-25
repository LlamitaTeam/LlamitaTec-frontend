export class User {
    id: number;
    email: string;
    password: string;
    typeuser: string;

    constructor() {
      this.id = 0;
      this.email = "";
      this.password = "";
      this.typeuser = "";
    }
  }