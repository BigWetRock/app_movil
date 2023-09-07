import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Visualizar } from 'src/app/models/visualizar';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {

  menuVisualizar: Visualizar [] = [];
  loading:boolean = true;

  constructor(
    private router:Router,
    private animationCtrl:AnimationController,
    private helper:HelperService,) { }

  ngOnInit() {
    this.cargarVisualizar();
    setTimeout(() => {this.loading = false;}, 2000);

  }


  cargarVisualizar(){
    this.menuVisualizar.push(
      {
        id:1,
        nombre:'Programacion de Aplicaciones',
        asignatura:'PGY4121',
        fecha:'06-09-2023',
        hora:'10:00',
        profesor:'Guillermo Villacura',
        sala:'Sala 1',
    },
    {
      id:2,
      nombre:'Programacion de Aplicaciones',
      asignatura:'PGY4121',
      fecha:'09-09-2023',
      hora:'10:00',
      profesor:'Guillermo Villacura',
      sala:'Sala 2',

    }
    )
}
}
