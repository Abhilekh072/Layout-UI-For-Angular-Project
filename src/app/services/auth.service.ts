import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl = environment.url
  constructor(private http: HttpClient, private router: Router) { }

  // {withCredentials : true}
  login(credentials:any) : Observable<any>{
    const api = this.apiurl + 'auth/'
    return this.http.post(api + 'login', credentials, {withCredentials:true}).pipe(
      map((res : any)=>{
        console.log(res);
        return res;
      })
    )
  }
}
