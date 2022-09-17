import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public baseUrl = "https://developers.zomato.com/api/v2.1/";

  constructor(private httpService: HttpClient) { }

  public restid:any[] =[];
  

  getRestaurant():Observable<any>
{

  return this.httpService.get(this.baseUrl+"restaurant?apikey=b10ae687582b28b844081e3eedf16935&res_id=18693847");
}

getLocation():Observable<any>
{
  return this.httpService.get<any>(this.baseUrl+"location_details?apikey=b10ae687582b28b844081e3eedf16935&entity_id=11290&entity_type=city");
}
}
