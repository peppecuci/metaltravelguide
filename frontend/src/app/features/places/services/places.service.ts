import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { IPlace } from "../models/IPlace";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private apiServer = environment.APISERVER + "place/";

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<IPlace[]>(this.apiServer + "all", {headers});
  }

  readOne(id: number): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<IPlace>(this.apiServer + id, {headers});
  }

  add(place: any): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.post<any>(this.apiServer + "create/", place, {headers});
  }

  update(id: number, place: any): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.patch<any>(this.apiServer + "update/" + id, place, {headers});
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
