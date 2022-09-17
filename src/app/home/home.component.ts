import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RestaurantDetails } from 'src/model/restaurant-details';
import Swal from 'sweetalert2';
import { DashboardService } from '../Services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ds: DashboardService) { }

  ngOnInit(): void {
    this.getcollections();
  }

  public lists: any[] = [];
  public q: any;
  public title: String = '';
  public restaurantList: RestaurantDetails[]=[];
  public restaurantDetails: RestaurantDetails = new RestaurantDetails();

  // OwlOptions
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
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
    this.ds.getLocation().subscribe(
      (data:any) => {
        this.lists = data['best_rated_restaurant'];
        this.lists.reverse();
      })
  }
  redirect():void{
    Swal.fire("Please Login!");
  }
}
