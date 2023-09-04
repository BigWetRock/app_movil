import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email: string="";
  Contrasena: string="";

  constructor(private router:Router,private helper:HelperService) { }

  ngOnInit() {

  }

  onLogin(){ 
    console.log("Usuario",this.Email);
    console.log("Contraseña",this.Contrasena);

    if (this.Email == "") {
      //alert("Debe ingresar un usuario");
      this.helper.showAlert("Debe ingresar un usuario","Error");
      return;
    }
    if (this.Contrasena == "") {
      alert("Debe ingresar una contraseña");
      return;
    }

    if (this.Email == "pgy4121001d" && this.Contrasena == "pgy4121001d") {
      //alert("Login correcto");
      this.router.navigateByUrl('home');
    }else{
      alert("Usuario o contraseña incorrecta.")
    }
  }



}
