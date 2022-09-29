import { environment } from "../../../../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // variables
  private apiServer = environment.APISERVER + "user/";

  // constructors
  constructor(private httpClient: HttpClient) { }

  // methods
  public login(form: any): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "login", {"username": form.username, "password": form.password });
  }

  public register(form: any): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "register", {"username": form.username, "password": form.password });
  }
}
