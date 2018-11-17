import { AlertifyService } from './../service/alertify.service';
import { AuthServiceService } from './../service/AuthService.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private router : Router, private alertify: AlertifyService) { }
  canActivate(): boolean {
    if (this.auth.loggedin()) {
      return true; } 

      this.alertify.error('you shall not pass!');
      this.router.navigate(['/home']);
      return false;
  }
 
}
