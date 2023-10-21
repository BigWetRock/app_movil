import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redireccionLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'home/:email',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'escanear',
    loadChildren: () => import('./pages/escanear/escanear.module').then( m => m.EscanearPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'visualizar',
    loadChildren: () => import('./pages/visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'confirmar-qr',
    loadChildren: () => import('./modals/confirmar-qr/confirmar-qr.module').then( m => m.ConfirmarQrPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
