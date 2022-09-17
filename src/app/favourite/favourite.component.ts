import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favourites } from 'src/model/favourites';
import { Login } from 'src/model/login';
import Swal from 'sweetalert2';
import { FavouriteService } from '../Services/favourite.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  public favList: Favourites[] = [];
  loggedInUser:any = '';
  public user:any = new Login();
  constructor(private favouritesService: FavouriteService, private router: Router, private ls: LoginService) { }

  ngOnInit(): void {
    this.getAllFavorites(); 
  }


  getAllFavorites(): any {
    this.loggedInUser = localStorage.getItem("username");
    this.favouritesService.getAllFavorites().subscribe(data => {
      this.favList = data.filter((s: { loggedInUser: string; }) => s.loggedInUser.startsWith(this.loggedInUser));
    });
  }

  deleteFavourites(fav:number): any {
      this.favouritesService.deleteFavourites(fav).subscribe(()=>{})
      Swal.fire("Successfully Deleted!");
      this.favList =[];
      this.getAllFavorites();
  }

  logout() {
    this.user.username = localStorage.getItem('username');
    this.user.password = localStorage.getItem('password');
    this.ls.logout(this.user).subscribe(
      () => {
        Swal.fire({text:'See you soon '+this.user.username.toUpperCase()+"👋"})
      }
    );
    localStorage.setItem("username","")
    localStorage.setItem("password","")
    this.router.navigate(['/login']);
  }

}
