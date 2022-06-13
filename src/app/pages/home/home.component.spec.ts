import { getTestBed, TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';
import { from, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';

export interface Post{
  id: number;
  userId: string;
  body: string;
  title: string;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let router: jasmine.SpyObj<Router>;
  let http: jasmine.SpyObj<HttpClient>;
  let service:CategoryService;
  
  /*
  
  beforeEach(() => {
    console.log("ante7");
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [HomeComponent]
    });
    http= TestBed.inject(HttpClient);
    service= new CategoryService(http);
    component= new HomeComponent(service,new FormBuilder(),router);
    
  

  });
  */
  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations:[
        HomeComponent
      ],
      providers: [
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // TODO: spy on other methods too
    http = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CategoryService(http);
    component= new HomeComponent(service,new FormBuilder(),router);
  });
  
  
  it('HomeComponent should be created', () => {
    const fixture= TestBed.createComponent(HomeComponent);
    const app= fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("AddNewAnswer should be true",()=>{
    component.typeNewAnswer();
    expect(component.addNewAnswer).toBeTrue(); 
  });

  it('Should loads categories', () => {
    const mockCategories=
    {
      "categories": [
          {
              "categoryID": 1011,
              "categoryName": "Dishes",
              "question": null
          },
          {
              "categoryID": 4,
              "categoryName": "Geography",
              "question": null
          }
      ]
    }
    http.get.and.returnValue(of(mockCategories));
    component.ngOnInit();
    expect(component.categories.length).toBeGreaterThan(0);

  });

  it("Should remove an element from array Answers",()=>{
    const fb=new FormBuilder()
    const n=new FormArray([]);
    n.push(fb.group({name: '1'}));
    let myForm= fb.group({
      answers : n
    });
    component.myForm=myForm;
    component.delete(0);
    expect(n.length).toBe(0);
  });

/*

  it('should delete item on confirmation', (done) => {
    const mockCategories=
    {
      "categories": [
          {
              "categoryID": 1011,
              "categoryName": "Dishes",
              "question": null
          },
          {
              "categoryID": 4,
              "categoryName": "Geography",
              "question": null
          }
      ]
    }
    http = jasmine.createSpyObj('HttpClient', ['delete','get']);
    console.log(http);
    
    http.get.and.returnValue(of(mockCategories));


    component.ngOnInit();

    component.deleteCategory(1011);
    //console.log(Swal.getTitle().);
    console.log("qwerty");
    
    console.log(component.categories.length);
    
    
    expect(Swal.isVisible()).toBeTruthy();
    //expect(Swal.getTitle()).toEqual('Are you sure to delete item?');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(component.categories.length).toEqual(1);
      done();
    });
  });
*/


  /*
  it('should return expected categories', () => {
    
    //console.log(http.get('http://localhost:10706/api/Categories'));
    console.log("inicio");
    component= new HomeComponent(service,new FormBuilder(),router);
    console.log("servicio741");
    
    console.log(service);
    console.log(component);
    
    /*
    
    spyOn(service,'getCategories').and.callFake(()=>{
        component.categories = [{
            categoryID:1,
            categoryName:'saddsa'
        }];
        return from([component.categories]);
    });
    */
    
  //   spyOn(service,'getCategories').and.callThrough();
  //   service.getCategories();    
  //   //component.ngOnInit();


  //   //console.log(service.getCategories());

  //   console.log(component.categories);
    
    
  //   console.log(component);
    
  //   expect(component.categories.length).toBe(4);
    
  // });
  


});
