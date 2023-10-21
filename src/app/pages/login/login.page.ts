import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email: string="";
  Contrasena: string="";

  constructor(private router:Router,private helper:HelperService,
              private auth:AngularFireAuth, private storage:StorageService
              ) { }

  ngOnInit() {

  }

  async onLogin(){ 
    const loader = await this.helper.showLoader("Iniciando sesión...");

    if (this.Email == "") {
      await loader.dismiss();
      //alert("Debe ingresar un usuario");
      this.helper.showAlert("Debe ingresar un usuario","Error");
      return;
    }
    if (this.Contrasena == "") {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar una contraseña","Error");
      return;
    }

    try {
      let req = await this.auth.signInWithEmailAndPassword(this.Email,this.Contrasena);
      //alert("Login correcto");
      this.storage.correoUsuario = this.Email;
      await loader.dismiss();
      
      await this.router.navigateByUrl('home/'+this.Email);
    }catch (error:any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es el correcto.","Error");
      }
      if (error.code == 'auth/weak-password') {
        await loader.dismiss();
        await this.helper.showAlert("El largo de la contraseña es muy corto.","Error");
      }
    }
  }

  onRegistrar(){

    this.router.navigateByUrl('registro');
  }

  onRecuperar(){
    this.router.navigateByUrl('recuperar');
  }

}
