export interface IComment {
  id?: number;
  text: string;
  status?: boolean;
  userId: number;
  placeId: number;
  dateCreated?: string;
}
