import {JwtPayload} from "jwt-decode";

export interface IPayload extends JwtPayload {
  roles: string[];
}
