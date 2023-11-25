import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  Email:string ="";
  Contrasena:string ="";
  name:string = '';
  number:string = '';

  regiones:Region[]= [];
  comunas:Comuna[]= [];
  regionSel:number = 0;
  comunaSel:number = 0;
  comunaSelNombre:string = '';
  regionSelNombre:string = '';

  disabledComuna:boolean = true;

  constructor(private auth:AngularFireAuth,
              private helper:HelperService,
              private router:Router,
              private storage:StorageService,
              private locationService:LocationService
              ) { }

  ngOnInit() {
    this.cargarRegion();
  }

  async cargarRegion(){
    let req = await this.locationService.getRegion();
    this.regiones = req.data;
  }


  async cargarComuna(){

    try {
      const req = await this.locationService.getComuna(this.regionSel);
      this.comunas = req.data;
      this.disabledComuna = false;
    } catch (error) {
      
    }
  }


  async registro(){
    const loader = await this.helper.showLoader("Cargando");
    if (this.Email == '') {
      await loader.dismiss(); 
      await this.helper.showAlert("Debe ingresar un correo","Error");
      return;
    }
    if(this.regionSel==0){
      await loader.dismiss(); 
      await this.helper.showAlert("Debe seleccionar una región","Error");
      return;
    }
    if(this.comunaSel==0){
      await loader.dismiss(); 
      await this.helper.showAlert("Debe seleccionar una comuna","Error");
      return;
    }
    this.comunaSelNombre = this.comunas.filter(e => e.id == this.comunaSel)[0].nombre;
    this.regionSelNombre = this.regiones.filter(e => e.id == this.regionSel)[0].nombre;
    var user = 
    [
      {
        correo:this.Email,
        contrasena:this.Contrasena,
        nombre: this.name,
        telefono: this.number,
        regionSel: this.regionSelNombre,
        comunaSel: this.comunaSelNombre
      }
    ]
    try {
    const request = await this.auth.createUserWithEmailAndPassword(this.Email,this.Contrasena);
      this.storage.guardarUsuario(user);
    await this.router.navigateByUrl('login');
    await loader.dismiss(); 
    await this.helper.showAlert("Usuario registrado correctamente","Información");  
    } catch (error:any) {
      if (error.code == 'auth/email-already-in-use') {
        await loader.dismiss();
        await this.helper.showAlert("El correo ya se encuentra registrado.","Error");
      }
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es el correcto.","Error");
      }
      if (error.code == 'auth/weak-password') {
        await loader.dismiss();
        await this.helper.showAlert("El largo de la contraseña es muy corto.","Error");
      }
      if (this.name == null) {
        await loader.dismiss();
        await this.helper.showAlert("Debe ingresar un nombre.","Error");
      }
      if (this.name.length < 3)
      {
        await loader.dismiss();
        await this.helper.showAlert("Debe ingresar mas de 3 letras.","Error");
      }
      if (this.number == null) {
        await loader.dismiss();
        await this.helper.showAlert("Debe ingresar un número de teléfono.","Error");
      }
      if (this.number.length < 9)
      {
        await loader.dismiss();
        await this.helper.showAlert("Debe ingresar un número de teléfono válido.","Error");
      } 
    }
  }
}
