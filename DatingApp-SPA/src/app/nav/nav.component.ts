import { AlertifyService } from './../service/alertify.service';
import { AuthServiceService } from './../service/AuthService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authservice: AuthServiceService , private alertify: AlertifyService, private routerservice: Router) { }

  ngOnInit() {
  }

  login(){
    this.authservice.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully ');
    }, error => { this.alertify.error(error); }, () => {
      this.routerservice.navigate(['/members']);
    }); 
  }

  loggedin(){
    return this.authservice.loggedin();
  }

  loggedout(){
     localStorage.removeItem('token');
     this.alertify.message('logged out');
     this.routerservice.navigate(['/home']);
  }

}
