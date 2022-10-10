export interface IUser {
  id: number;
  username: string;
  password: string;
  nickname: string;
  image?: string;
  countryIso: string;
  places: number[];
}
