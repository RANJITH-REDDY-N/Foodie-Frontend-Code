import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FavouriteService } from '../Services/favourite.service';

describe('FavouriteService', () => {
  let service: FavouriteService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[FavouriteService],
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(FavouriteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should save the favourite',() =>
  {
    let newfavourite = {restaurantId:123,restaurantName:'KFC',loggedInUser:"ranjith"};
    service.saveFavourites(newfavourite).subscribe((f: any)=> 
      {
        expect(f).toEqual(newfavourite);
      }
      
      );
      let req = httpMock.expectOne({
        url:'http://localhost:9508/api/grill/fs/addfav',
        method:'POST'
      })
      expect(req.request.body).toEqual(newfavourite);  
  })

  it('should delete the particular favourite restaurant  ',()=>{
    service.deleteFavourites(1).subscribe();
    let req = httpMock.expectOne({
      method:'DELETE',
      url:'http://localhost:9508/api/grill/fs/1',
    });
    expect(req).toBeDefined;
    expect(req.cancelled).toBeFalsy;
    expect(req.request.method).toBe('DELETE');
    expect(req.request.responseType).toBe('json');
  });

  it('should throw error when particular favourite restaurant is not present',()=>{
    let error : string="";
    service.deleteFavourites(101).subscribe(null,e=>{
      error = e;
    });
    let req = httpMock.expectOne({
      method: 'DELETE',
      url:'http://localhost:9508/api/grill/fs/101'
    });
    req.flush("Wrong operation",{
      status: 404,
      statusText: "Food not present on database"
    });
    expect(error).toBeTruthy();
  });

  it('should get all favourites',()=>{
    service.getAllFavorites().subscribe();
    let req = httpMock.expectOne({
      method:'GET',
      url:'http://localhost:9508/api/grill/fs/getAllFavourites/',
    });
    expect(req).toBeDefined;
    expect(req.cancelled).toBeFalsy;
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('json');
  });
});
