import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  constructor(private router:Router,private helper:HelperService, private auth:AngularFireAuth) { }

  ngOnInit() {

  }

  async onLogin(){ 
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

    try {
      await this.auth.signInWithEmailAndPassword(this.Email,this.Contrasena);
      //alert("Login correcto");
      this.router.navigateByUrl('home');
    }catch(error:any){
      alert(error.code)
    }
  }

  onRegistrar(){

    this.router.navigateByUrl('registro');
  }

  onRecuperar(){
    this.router.navigateByUrl('recuperar');
  }

}
