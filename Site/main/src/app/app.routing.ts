import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimplePeerComponent } from './simple-peer/simple-peer.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent 
  },
  {
    path: 'simple-peer',
    component: SimplePeerComponent
  },


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes) //, {useHash: true}
  ],
  exports: [RouterModule]


})
export class AppRoutingModule {

}


