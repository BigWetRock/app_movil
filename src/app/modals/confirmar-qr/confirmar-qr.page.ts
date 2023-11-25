import { Component, OnInit,  Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-confirmar-qr',
  templateUrl: './confirmar-qr.page.html',
  styleUrls: ['./confirmar-qr.page.scss'],
})
export class ConfirmarQrPage implements OnInit {

  @Input() i:any;
  asistencia:any;
  id:string="";
  correo:string="";
  constructor(private modalController:ModalController, private auth:AngularFireAuth, private storage:StorageService) { }

  ngOnInit() {
    this.getCorreo();
    this.i = JSON.parse(this.asistencia);
  }

  async getCorreo(){
    this.correo = (await this.auth.currentUser)?.email!;
  }


  async gAsistencia(){
    this.id = this.i.asignatura + this.i.fecha + this.i.hora + this.i.seccion + this.correo;
    var asistencia = [{
      idAsistencia:this.id,
      correo:this.correo,
      asignatura:this.i.asignatura,
      docente:this.i.docente,
      fecha:this.i.fecha,
      hora:this.i.hora,
      leccion:this.i.leccion,
      sala:this.i.sala,
      seccion:this.i.seccion

    }];
    console.log(asistencia);
    this.storage.guardarAsistencia(asistencia);
    this.close();
  }


  close(){
    this.modalController.dismiss();
  }
}
