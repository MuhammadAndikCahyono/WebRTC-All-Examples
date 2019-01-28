import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimplePeerComponent } from './simple-peer/simple-peer.component';
import { VideoChatWebRTCComponent } from './video-chat-web-rtc/video-chat-web-rtc.component'; 

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
  {
    path: 'video-chat-webRTC',
    component: VideoChatWebRTCComponent
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes) //, {useHash: true}
  ],
  exports: [RouterModule]


})
export class AppRoutingModule {

}


