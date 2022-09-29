import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiServer = environment.APISERVER + "comment/";

  constructor(private httpClient: HttpClient) { }

  readAllByPlace(id: number): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<any>(this.apiServer + "place/" + id, {headers});
  }

  add(comment: any): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.post<any>(this.apiServer + "create", comment,{headers});
  }

  delete(id: number): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.delete<any>(this.apiServer + "delete/" + id, {headers});
  }
}
