import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  public getMetadata() {
    return this.http.get('assets/api/v1/my_portfolios/metadata.json')
      .pipe((res) => res);
  }

  public getPortfolios() {
    return this.http.get('assets/api/v1/my_portfolios/portfolios.json')
      .pipe((res) => res);
  }

  
 
}
