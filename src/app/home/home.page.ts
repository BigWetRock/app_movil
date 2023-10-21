import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../models/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, IonCard, MenuController } from '@ionic/angular';
import { HelperService } from '../services/helper.service';
import type { Animation } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from '../services/storage.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  private animation!: Animation;

  menuArray:Menu[]=[];

  loading:boolean = true;
  usuario:any;
  usuarioFiltro:any;
  correo:string = "";

  constructor(
    private router:Router,
    private animationCtrl:AnimationController,
    private helper:HelperService,
    private auth:AngularFireAuth,
    private menuCtrl:MenuController,
    private storage:StorageService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarMenu();
    this.cargarUsuario();
    this.correo = this.activatedRoute.snapshot.params['email'];
    console.log(ScreenOrientation.orientation())
    this.cualquierCosa();
    setTimeout(() => {this.loading = false;}, 0); // 2000
  }

  perfilUsuario(){
    this.router.navigateByUrl("perfil-usuario");

  }

  async cualquierCosa(){
    await ScreenOrientation.orientation().then((e:any) => {
      console.log(e);
      if(e.type == "landscape-primary"){
        this.helper.showToast("Estas en modo horizontal",5000);
      
      }
      else{
        this.helper.showToast("Estas en modo vertical",5000);
      }
    });
  }

  


  async cargarUsuario(){
    this.usuario = await this.storage.obtenerUsuario();
    var emailUserToken = await this.auth.currentUser;
    this.usuarioFiltro = this.usuario.filter((e: { correo: string;  }) => e.correo == emailUserToken?.email)
    
  }

  cargarMenu(){
    this.menuArray.push(
    {
      id:1,
      nombre:'Escanear',
      url:'/escanear',
      icono:'qr-code-outline'
    },

    {
      id:2,
      nombre:'Visualizar',
      url:'/visualizar',
      icono:'reorder-four-outline'
    }
    )
}

  ionViewDidEnter(){
    this.animation = this.animationCtrl.create()
    .addElement( document.querySelectorAll(".__card") ) //document.querySelectorAll("ion-button") 
    .duration(1500)
    .iterations(Infinity)
    .direction('alternate')
    .fromTo('background', 'blue', 'var(--background)');
    this.animation.play();
    this.helper.showToast("Bienvenido "+this.correo);
  }

  ionViewDidLeave(){
    this.animation.stop();
  }

  menu(){
    this.menuCtrl.toggle();
  }

  closeMenu(){
    this.menuCtrl.close();
  }

  async logout(){
    
    var confirm = await this.helper.showConfirm("Desea cerrar la sesión actual?","Confirmar","Cancelar");
    if(confirm == true ) {
      await this.auth.signOut();
      this.router.navigateByUrl("login");
    }
  }
  

  
}