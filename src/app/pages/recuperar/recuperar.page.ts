import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recEmail:string="";
  recContrasena:string="";

  constructor(private router:Router,private helper:HelperService,private auth:AngularFireAuth,) { }

  ngOnInit() {
  }

  async resetPassword(){
    const loader = await this.helper.showLoader("Cargando");
    if (this.recEmail == '') {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar un correo." ,"Error");
      return;
    }
    try {
      await this.auth.sendPasswordResetEmail(this.recEmail);
      await this.helper.showAlert("Debe revisar su correo","Información");
      await loader.dismiss();
      await this.router.navigateByUrl("login");
    } catch (error:any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es el correcto.","Error");
      }
    }
  }


}
