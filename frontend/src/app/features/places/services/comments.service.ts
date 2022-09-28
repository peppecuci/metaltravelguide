import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import {Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { IComment } from "../models/IComment";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiServer = environment.APISERVER + "comment/";

  constructor(private httpClient: HttpClient) { }

  readAllByPlace(id: number): Observable<IComment[]> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<IComment[]>(this.apiServer + "place/" + id, {headers}).pipe(catchError(this.errorHandler));
  }

  add(comment: any): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.post<any[]>(this.apiServer + "create", comment,{headers}).pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.delete<any>(this.apiServer + "delete/" + id, {headers}).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
