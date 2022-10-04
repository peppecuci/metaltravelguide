export interface IComment {
  id?: number;
  text: string;
  status?: boolean;
  userId: number;
  userNickname: string;
  placeId: number;
  dateCreated?: string;
}
