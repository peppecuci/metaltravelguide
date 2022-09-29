import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServer = environment.APISERVER + "user/";

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<any>(this.apiServer + "all", {headers});
  }

  getProfile(): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<any>(this.apiServer + "profile", {headers});
  }

  update(form: any): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const user: any = {
      "username": form.username,
      "nickname": form.nickname,
      "countryIso": form.countryIso
    }
    if (form.password.length > 0)
      user.password = form.password;
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.patch<any>(this.apiServer + "updateProfile", user, {headers});
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
