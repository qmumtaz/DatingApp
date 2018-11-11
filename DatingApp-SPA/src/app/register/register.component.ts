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

  constructor(private authservice : AuthServiceService) { }

  ngOnInit() {
  }

  register(){
    this.authservice.register(this.model).subscribe(() => { console.log('register complete'); }, 
    error => {
      console.log(error);
    }
    )
  }

  cancel(){
    this.cancelregister.emit(false);
    console.log('cancelled');
  }

}
