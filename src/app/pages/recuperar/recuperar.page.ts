import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  recEmail:string="";
  recContrasena:string="";

  constructor(private router:Router,private helper:HelperService) { }

  ngOnInit() {
  }

  onRecuperar() {
    this.router.navigateByUrl('recuperar');
  }


}
