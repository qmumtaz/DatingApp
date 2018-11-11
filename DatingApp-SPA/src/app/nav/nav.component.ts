import { AuthServiceService } from './../service/AuthService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authservice: AuthServiceService) { }

  ngOnInit() {
  }

  login(){
    this.authservice.login(this.model).subscribe(next => {
      console.log('Successful');
    }, error => { console.log('failed to log in');}); 
  }

  loggedin(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedout(){
     localStorage.removeItem('token');
     console.log('logged out');
  }

}
