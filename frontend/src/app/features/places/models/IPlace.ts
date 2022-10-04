import {IAddress} from "./IAddress";
import {IContact} from "./IContact";

export interface IPlace {
  id: number;
  googleId?: string;
  name: string;
  address: IAddress;
  contact: IContact;
  type: string;
  description: string;
  image: string;
  userId: number;
  userNickname: string;
  dateCreated: string;
  dateLastModified: string;
}
