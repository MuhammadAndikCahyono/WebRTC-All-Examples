import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing'
import { BsDatepickerModule, DatepickerModule, AlertModule, TimepickerModule, RatingModule, TooltipModule, TypeaheadModule, ModalModule, CarouselModule, ProgressbarModule } from 'ngx-bootstrap';
import { SimplePeerComponent } from './simple-peer/simple-peer.component';
import { VideoChatWebRTCComponent } from './video-chat-web-rtc/video-chat-web-rtc.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SimplePeerComponent,
    VideoChatWebRTCComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, RouterModule,
    HttpClientModule, FormsModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
