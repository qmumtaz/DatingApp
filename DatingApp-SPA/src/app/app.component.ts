import { AuthServiceService } from './service/AuthService.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwthelper = new JwtHelperService();

  constructor(private autherservice: AuthServiceService) {}

  ngOnInit(){
    const token = localStorage.getItem('token');
      if(token){
        this.autherservice.decodedtokens = this.jwthelper.decodeToken(token);
      }
     
  }

}
