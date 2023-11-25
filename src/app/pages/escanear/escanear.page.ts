import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { BarcodeScanner } from 'capacitor-barcode-scanner'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmarQrPage } from 'src/app/modals/confirmar-qr/confirmar-qr.page';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {

  constructor(private router:Router,private helper:HelperService,private auth:AngularFireAuth, private storage:StorageService) { }

  resultadoQr:any="";
  usuario:any;
  usuarioFiltro:any;
  asistencia:any;

  ngOnInit() {
  }

  async Scan(){
        this.resultadoQr = (await BarcodeScanner.scan()).code;
        
        this.resultado();

        // if (resultadoQr) {
        //   console.log("QR", JSON.parse(resultadoQr));
        // }
    
        // var infoQr = [];
        // infoQr.push(
        //             {
        //               idAsistencia:"prueba",
        //               asignatura:"prueba",
        //               docente:"prueba",
        //               fecha:"prueba",
        //               hora:"prueba",
        //               leccion:"prueba",
        //               sala:"prueba",
        //               seccion:"prueba"
        //             }
        //           );
    
        //           const parametros = {asistencia:infoQr};
        
        // this.helper.showModal(ConfirmarQrPage,parametros);
      }



      async resultado(){

        var qr = [];
        try {
          let valorJSON = JSON.parse(this.resultadoQr);
          if( !valorJSON.asignatura || !valorJSON.seccion || !valorJSON.docente || !valorJSON.sala || !valorJSON.fecha || !valorJSON.hora || !valorJSON.leccion){
            throw new Error("Qr no valido");
          }
        } catch (error) {

          await this.helper.showAlert("Qr no valido. ","Error");
          return;
        }
        
        qr.push(this.resultadoQr);
        const parametros = {asistencia:this.resultadoQr};
        await this.helper.showModal(ConfirmarQrPage,parametros);
      }
  }


  

  

