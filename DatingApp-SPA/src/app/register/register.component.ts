import { AlertifyService } from './../service/alertify.service';
import { AuthServiceService } from './../service/AuthService.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() cancelregister = new EventEmitter ;

  model: any = {};

  constructor(private authservice : AuthServiceService , private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authservice.register(this.model).subscribe(() => { this.alertify.success('successfully registered'); }, 
    error => {
      this.alertify.error(error);
    }
    )
  }

  cancel(){
    this.cancelregister.emit(false);
    
  }

}
