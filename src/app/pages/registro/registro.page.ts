import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  Email:string ="";
  Contrasena:string ="";

  constructor(private auth:AngularFireAuth) { }

  ngOnInit() {
  }


  async registro(){
    try{
      const res = await this.auth.createUserWithEmailAndPassword(this.Email,this.Contrasena);
      console.log(res);
    }catch(error){
      console.dir(error);
    }

  }
}
