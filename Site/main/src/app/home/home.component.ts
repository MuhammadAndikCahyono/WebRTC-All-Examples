import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../services/core.service';
import { CarouselConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  constructor(private coreService: CoreService, private router: Router, private route: ActivatedRoute, private http: HttpClient,  private carouselConfig: CarouselConfig) {
    carouselConfig.interval = 5500;
  }
 
  ngOnInit() {
 
   
  }

  //public get id() {
  //  let value = this.route.snapshot.queryParams['id'];
  //  return value;
  //}

  


  

  
}
