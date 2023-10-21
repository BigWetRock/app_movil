import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import { asistencia } from '../models/asistencia';



const keySorageUser = "usuarioData";
const keyStorageAsistencia = "asistenciaData";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public correoUsuario:string = "";

  constructor(private authFire:AngularFireAuth) { }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;

  }

  async setItem(llave:string, valor:string):Promise<void>{
    await Preferences.set({key:llave, value:valor});
  }

  async obtenerUsuario(){
    const usuarios = await this.getItem(keySorageUser);
    if(usuarios ==null){
      return [];
    }
    const usersObject = JSON.parse(usuarios);

    if(usersObject){
      return usersObject;
    }
    else{
      return [];
    }

    }

    async guardarUsuario(usuario:any[]){
      let usuarioStorage = await this.obtenerUsuario();
      for( let i of usuarioStorage){

        if(i) {
          usuario.push(i);
        }

      }
      this.setItem(keySorageUser, JSON.stringify(usuario));
    }

  

    async obtenerAsistencias():Promise<asistencia[]>{
      const storageData = await this.getItem(keyStorageAsistencia);
      if (storageData == null)
      {
        return[];
      }
  
      const data:any[] = JSON.parse(storageData);
      if (data)
      {
        return data;
      }
      else
      {
        return [];
      }
    }

    async guardarAsistencia(asistencia:asistencia[]){
      var asistencias = await this.obtenerAsistencias();
  
      for (const a of asistencias) {
        if(a){
          asistencia.push(a);
        }
      }
  
      this.setItem(keyStorageAsistencia,JSON.stringify(asistencia));
    }

}
