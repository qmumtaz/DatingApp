import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registermode = false;
  // values: any;

  registertoggle(){
    this.registermode = true;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getValues();
  }

  /*getValues(){
    this.http.get('http://localhost:5000/api/values').subscribe(reponse => { this.values = reponse; } ,
    error => {console.log(error); });
  }*/

  cancelregistermode(registerMode: boolean){
    this.registermode = registerMode;

  }
}
