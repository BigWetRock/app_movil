import { Component } from '@angular/core';
import { Menu } from '../models/menu';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { HelperService } from '../services/helper.service';
import type { Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
    setTimeout(() => {this.loading = false;}, 2000);
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

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll("ion-card"))
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
}

  async logout(){
    
    var confirm = await this.helper.showConfirm("Desea cerrar la sesión actual?","Confirmar","Cancelar");
    if(confirm == true ) {
      this.router.navigateByUrl("login");
    }
  }
  

}