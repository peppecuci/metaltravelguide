export interface IComment {
  id?: number;
  text: string;
  status?: boolean;
  username: string;
  placeId: number;
  dateCreated?: string;
}
