import { FetchHttp } from "./http";
export class UserCollection extends FetchHttp {
  constructor() {
    super("/api/v1/users");
  }
}
