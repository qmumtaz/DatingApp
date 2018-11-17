import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwthelper = new JwtHelperService();
  decodedtokens: any;

constructor(private http: HttpClient) { }

login(model: any){ return this.http.post(this.baseUrl + 'login', model)
                .pipe(map((response: any) => {
                const user = response;
                if (user) {
                  localStorage.setItem('token', user.token);
                  this.decodedtokens = this.jwthelper.decodeToken(user.token);
                  console.log(this.decodedtokens);
                }
              })
            );
}

register(model:any){
return this.http.post(this.baseUrl + 'register',model);

}
loggedin(){
  const token = localStorage.getItem('token');
  return !this.jwthelper.isTokenExpired(token);

}

}
