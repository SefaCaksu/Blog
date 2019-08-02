import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("loginUrl") && localStorage.getItem("loginUrl")=="Login"){
      localStorage.removeItem("loginUrl");
      location.reload();
    }else{
      
    }
    
  }

}
