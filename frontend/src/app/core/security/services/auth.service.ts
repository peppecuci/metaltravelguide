import { environment } from "../../../../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // variables
  private apiServer = environment.APISERVER + "user/";

  // constructors
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  // methods
  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "login", {"username": username, "password": password });
  }

  public register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "register", {"username": username, "password": password });
  }
}
