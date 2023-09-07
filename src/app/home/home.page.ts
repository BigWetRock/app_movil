import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../models/menu';
import { Router } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import { HelperService } from '../services/helper.service';
import type { Animation } from '@ionic/angular';

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

  constructor(
    private router:Router,
    private animationCtrl:AnimationController,
    private helper:HelperService,
  ) {}

  ngOnInit() {
    this.cargarMenu();
    setTimeout(() => {this.loading = false;}, 0); // 2000
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
  }

  ionViewDidLeave(){
    this.animation.stop();
  }

  async logout(){
    
    var confirm = await this.helper.showConfirm("Desea cerrar la sesión actual?","Confirmar","Cancelar");
    if(confirm == true ) {
      this.router.navigateByUrl("login");
    }
  }
  

  // playAnimation() {
  //   this.animation.play();
  //   console.log(this.animation);
  // }

  // stopAnimation() {
  //   this.animation.stop();
  // }
}