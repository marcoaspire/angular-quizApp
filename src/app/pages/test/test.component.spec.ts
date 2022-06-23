import { getTestBed, TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TestComponent } from './test.component';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { from, of, BehaviorSubject  } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';
import { Answer, Question } from 'src/app/interfaces/interfaces.interfaces';

export interface Post{
  id: number;
  userId: string;
  body: string;
  title: string;
}

xdescribe('TestComponent', () => {
  let component: TestComponent;
  let router: jasmine.SpyObj<Router>;
  let http: jasmine.SpyObj<HttpClient>;
  let service:CategoryService;
  let activatedRoute: ActivatedRoute;
  let paramsSubject  = new BehaviorSubject({
    category: 4
  });
  

  beforeEach(async()=>{
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations:[
        TestComponent
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute,  useValue: { params: paramsSubject }         }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // TODO: spy on other methods too
    http = jasmine.createSpyObj('HttpClient', ['get','delete','post']);
    service = new CategoryService(http);
    activatedRoute=TestBed.inject(ActivatedRoute);
    //console.log(activatedRoute.params);
    /*
    activatedRoute.params.subscribe(params => {
        console.log("aqui");
        
        console.log(params);
    });
    */
    component= new TestComponent(activatedRoute,service,new FormBuilder(),router);
  });
  
  
  xit('TestComponent should be created', () => {
    const fixture= TestBed.createComponent(TestComponent);
    const app= fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should get question with its answers', () => {

    const mockQuestion=
    {
        "question": {
            "questionID": 10,
            "question": "Which of these cities does NOT border the Great Lakes?",
            "categoryID": 4,
            "category": "Geography",
            "answers": [
                {
                    "answerID": 32,
                    "posibleAnswer": "Toronto",
                    "questionID": 10,
                    "correct": false,
                    "question": null
                },
                {
                    "answerID": 33,
                    "posibleAnswer": "Chicago",
                    "questionID": 10,
                    "correct": false,
                    "question": null
                }
            ]
        }
    }
    http.get.and.returnValue(of(mockQuestion));
    
    const id=4;
    //component.ngOnInit();

    spyOn(service,'getQuestionsByCategory').and.callFake((id:number) => {
        console.log("entre");
        console.log(id);
        return of(
            {
                'categoryName' : "Geography",
                'questions': mockQuestion.question
            }
        );
    });


    component.getData();
    
    expect(component.questions.length).toBe(2);
    
  });



});
