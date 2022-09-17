import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favourites } from 'src/model/favourites';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http:HttpClient) { }
    //post operation
 saveFavourites(fav: Favourites): any{
  return this.http.post('http://localhost:9508/api/grill/fs/addfav', fav);
}

  //get operation
  getAllFavorites(): Observable<any>{
    return this.http.get('http://localhost:9508/api/grill/fs/getAllFavourites/');
  }

  //delete operation
  deleteFavourites(fav:number): Observable<any>{
    return this.http.delete('http://localhost:9508/api/grill/fs/'+fav);
  }
}
