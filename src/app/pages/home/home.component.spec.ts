import { getTestBed, TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { from, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';
import { Answer, Question } from 'src/app/interfaces/interfaces.interfaces';

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
  //let mockService: jasmine.SpyObj<CategoryService>;
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
        FormBuilder,
        { provide: CategoryService, useValue: jasmine.createSpyObj('CategoryService', ['deleteCategory']) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // TODO: spy on other methods too
    http = jasmine.createSpyObj('HttpClient', ['get','delete','post']);
    service = new CategoryService(http);
    component= new HomeComponent(service,new FormBuilder(),router);
  });
  
  
  xit('HomeComponent should be created', () => {
    const fixture= TestBed.createComponent(HomeComponent);
    const app= fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  xit("AddNewAnswer should be true",()=>{
    component.typeNewAnswer();
    expect(component.addNewAnswer).toBeTrue(); 
  });

  xit('Should loads categories', () => {
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

  xit("Should remove an element from array Answers",()=>{
    const fb=new FormBuilder();
    const mockAnswers=new FormArray([]);
    mockAnswers.push(fb.group({name: '1'}));
    let myForm= fb.group({
      answers : mockAnswers
    });
    component.myForm=myForm;
    component.delete(0);
    expect(mockAnswers.length).toBe(0);
  });

  xit('should add a new possible answer', (done) => {
    const fb=new FormBuilder();
    let mockNewAnswer:FormControl = fb.control('Answer1');
    let myForm= fb.group({
      question: [],
      answers : fb.array( 
        [])
    });
    component.newAnswer=mockNewAnswer;
    component.myForm=myForm;
    component.addAnswer();
    let answers= component.myForm.controls['answers'].value as unknown as Array<string>;
    expect(answers.length).toBe(1);
    done();
  });

  xit('answers from forms should be empty', (done) => {
    const fb=new FormBuilder();
    const mockAnswers=new FormArray([]);
    mockAnswers.push(fb.group({name: '1'}));
    let myForm= fb.group({
      answers : mockAnswers
    });
    component.myForm=myForm;
    component.reset();
    let answers= component.myForm.controls['answers'].value as unknown as Array<string>;
    expect(answers.length).toBe(0);
    done();
  });



  xit('should delete category', (done) => {
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
    const deleteSuccess= {msg: "Category deleted4"};
    console.log(component.categories.length);
    //component.ngOnInit();
    
    spyOn(service,'deleteCategory2').and.callFake(()=>{
      mockCategories.categories=mockCategories.categories.filter(item => item.categoryID !== 4);
      return of(deleteSuccess);
    });
    
    component.deleteCategory(1011);
    
    expect(Swal.isVisible()).toBeTruthy();
    //expect(Swal.getTitle()).toEqual('Are you sure to delete item?');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(component.categories.length).toEqual(1);
      Swal.clickConfirm();
      done();
    });
   });

  
   //saveAnswers
  xit('should saves answers', (done) => {
    const fb=new FormBuilder();
    const mockAnswers:Answer[]=[
      {
        correct:true,
        posibleAnswer:'Marco',
        questionID:4
      }
    ];
    /*
    const mockCategoryID=4;
    let mockQuestion:Question;

    mockAnswers.push(fb.group({name: 'Marco'}));
    let mockForm= fb.group({
      question: ["Como te llamas?"],
      answers : mockAnswers
    });
    
    component.categoryID=mockCategoryID;
    component.myForm=mockForm;
    */
    
    spyOn(service,'postAnswers').and.callFake(()=>{
      console.log("respuestas recibidas por el servicio");
      
      console.log(mockAnswers);
      
      return from(mockAnswers);
    });
    component.saveAnswers(mockAnswers);
    expect(Swal.isVisible()).toBeTrue();
    expect(Swal.getTitle()?.innerHTML).toEqual('Answers saved');
    setTimeout(() => {
      Swal.clickConfirm();
      done();
    });
  });


   //saveQuestion
   xit('should saves questions', (done) => {
    const fb=new FormBuilder();
    const mockAnswers=new FormArray([]);
    const mockCategoryID=4;
    let mockQuestion:Question;

    mockAnswers.push(fb.group({name: 'Marco2'}));
    let mockForm= fb.group({
      question: ["Como te llamas?"],
      answers : mockAnswers
    });
    
    component.categoryID=mockCategoryID;
    component.myForm=mockForm;

    mockQuestion={
      categoryID:mockCategoryID,
      query:"Como te llamas?",
      questionID:1
    }

    spyOn(service,'postQuestion').and.callFake(()=>{
      return of(mockQuestion);
    });


    spyOn(service,'postAnswers').and.callFake(()=>{
      return of(mockAnswers);
    });

    component.saveQuestion();
    expect(Swal.isVisible()).toBeTrue();
    expect(Swal.getTitle()?.innerHTML).toEqual('Answers saved');
    setTimeout(() => {
      Swal.clickConfirm();
      done();
    });

    
  });
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
