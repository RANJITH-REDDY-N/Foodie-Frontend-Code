import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/model/login';
import Swal from 'sweetalert2';
import { DashboardService } from '../Services/dashboard.service';
import { LoginService } from '../Services/login.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Favourites } from 'src/model/favourites';
import { FavouriteService } from '../Services/favourite.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public list: any[] = [];
  public q: any;
  search1:String = "";
  public user: any = new Login();
  loggedInUser:any = "";
  favList: Favourites[]= [];

  constructor(private dashboardService: DashboardService, private ls:LoginService, private route:Router,private favService:FavouriteService) { }

  ngOnInit(): void {
    this.getAllFavorites();
    this.getcollections();
  }

  // OwlOptions
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin:15,
    autoplay: true,
    autoplaySpeed:2500,
    autoplayHoverPause: true,
    autoplayTimeout:3000,
    navSpeed: 1000,
    navText: ['<< Prev', 'Next >>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  
  getcollections(): any {
    this.dashboardService.getLocation().subscribe(
      (data:any) => {
        this.list = data['best_rated_restaurant'];
        this.list.reverse();
      });
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
    this.route.navigate(['/login']);
  }
  
  res:any[] = this.list;
  detailedInfo(){
    if(this.search1 == ""){
      Swal.fire("Enter Restaurant Name to Search");
      return this.res = [];
    }
    else{
      return this.res = this.list.filter(s => s.restaurant.name.toLowerCase().startsWith(this.search1.toLowerCase()));
    } 
  }

  // FAvourites
  public ids:any[]=[];
  getAllFavorites(): any {
    this.favService.getAllFavorites().subscribe(data => {
      this.favList = data;
    });
  }

  newfav: any = new Favourites();
  saveFavourites(fav: any) {
    this.newfav.loggedInUser = localStorage.getItem("username");
    this.newfav.restaurantId = fav.restaurant.R.res_id;
    this.newfav.restaurantName = fav.restaurant.name;
    if(this.ids.includes(this.newfav.restaurantId)){
      Swal.fire("Already Added!");
    }
    else{
      this.favService.saveFavourites(this.newfav).subscribe(() => {
        this.ids.push(this.newfav.restaurantId);
        Swal.fire("Successfully Added to Favorites!");
        this.getAllFavorites();
      })
    }
  }
}
