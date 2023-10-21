import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {

  
  loading:boolean = true;
  asistencia:any;
  filAsis:any;

  constructor(
    private router:Router,
    private animationCtrl:AnimationController,
    private helper:HelperService,
    private storage:StorageService,
    private auth:AngularFireAuth
      ) { }

  ngOnInit() {
    this.cargarAsistencias();
    setTimeout(() => {this.loading = false;}, 2000);

  }

  async cargarAsistencias(){
    this.asistencia = await this.storage.obtenerAsistencias();
    var emailUserToken = await this.auth.currentUser;
    this.filAsis = this.asistencia.filter((e: { asistencia: string; }) => e.asistencia == emailUserToken?.email);
  }


}

