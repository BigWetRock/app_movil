import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private alertService:AlertController) { }

  
  async showAlert(msg:string,title:string){
    var alert = await this.alertService.create({cssClass:"alertClass", message:msg,header:title,buttons:['Aceptar']})
    await alert.present();
    return alert;
  }

  async showConfirm(msg:string,btn_si:string,btn_no:string){
    let promise = new Promise<boolean>(async (resolve) =>{
      var alert = await this.alertService.create({cssClass:"", message:msg,buttons:
      [
        {
          text:btn_si,
          handler:() =>{
            resolve(true);
          }
        },
        {
          text:btn_no,
          handler:() =>{
            resolve(false);
          }
      }
    ]
    });
    await alert.present();
  })
  return promise;
}




}
