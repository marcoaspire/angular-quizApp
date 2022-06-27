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

describe('TestComponent', () => {
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
    component= new TestComponent(activatedRoute,service,new FormBuilder(),router);
  });
  
  
  xit('TestComponent should be created', () => {
    const fixture= TestBed.createComponent(TestComponent);
    const app= fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  xit('Should get question with its answers', () => {
    const mockQuestions=
    {
        "category": {
          "categoryID": 4,
          "categoryName": "Geography",
          "question": [
                {
                    "questionID": 3,
                    "query": "Which of these U.S. states does NOT border Canada?",
                    "categoryID": 4,
                    "answers": [
                        {
                            "answerID": 4,
                            "posibleAnswer": "Maine",
                            "questionID": 3,
                            "correct": false
                        },
                        {
                            "answerID": 5,
                            "posibleAnswer": "Minnesota",
                            "questionID": 3,
                            "correct": false
                        },
                        {
                            "answerID": 6,
                            "posibleAnswer": "Alaska",
                            "questionID": 3,
                            "correct": false
                        },
                        {
                            "answerID": 7,
                            "posibleAnswer": "Indiana",
                            "questionID": 3,
                            "correct": true
                        }
                    ]
                },
                {
                    "questionID": 4,
                    "query": "Which of these countries was NOT a part of the Soviet Union?",
                    "categoryID": 4,
                    "answers": [
                        {
                            "answerID": 8,
                            "posibleAnswer": "Belarus",
                            "questionID": 4,
                            "correct": false
                        },
                        {
                            "answerID": 9,
                            "posibleAnswer": "Ukraine",
                            "questionID": 4,
                            "correct": false
                        },
                        {
                            "answerID": 10,
                            "posibleAnswer": "Georgia",
                            "questionID": 4,
                            "correct": false
                        },
                        {
                            "answerID": 11,
                            "posibleAnswer": "Poland",
                            "questionID": 4,
                            "correct": true
                        }
                    ]
                },
            ]
        }
    }
    http.get.and.returnValue(of(mockQuestions));
    const id=4;
    spyOn(service,'getQuestionsByCategory').and.callFake((id:number) => {
        return of(
            {
                'categoryName' : "Geography",
                'questions': mockQuestions.category.question
            }
        );
    });
    
    component.getData();
    expect(component.questions.length).toBe(2);
    expect(service.getQuestionsByCategory).toHaveBeenCalled();
  });

  //TODO> FIX
  xit('should lose the focus automatically after user select an option', () => {
    const fixture= TestBed.createComponent(TestComponent);
    const app= fixture.componentInstance;
    var dummyElement = document.createElement('div');
    dummyElement.setAttribute("id","questionID1");
    dummyElement.setAttribute("tabindex","1");

    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    
    //component.unfocus(1);
    console.log("aqui");
    var a=document.getElementById('d');
    dummyElement?.focus();
    a?.focus();
    //console.log( document.getElementById('d')?.focus());
    console.log("focus ");
    
    console.log(document.activeElement);
    console.log(document.activeElement === document.getElementById('d'));
      
    console.log("funcion");
    
    component.unfocus(4);


  });

  it('should show a modal with the results', (done) => {
    const fb=new FormBuilder();
    const mockCategoryID=4;
    let mockAnswers:any[]=[];
    mockAnswers.push(
      {
        correct:false,
        posibleAnswer:'1',
        questionID:1,
        answerID:1
      },
      {
        correct:true,
        posibleAnswer:'1',
        questionID:2,
        answerID:2
      }
    );
    let mockForm= fb.group({
      questionID1: ["1"],
      questionID2: ["0"]
      //answers : mockAnswers
    });
    component.myForm=mockForm;
    component.correctAnswers=mockAnswers;
    spyOn(component,'restart').and.callFake(() => {});

    //act
    component.checkAnswers();
    //assert
    expect(Swal.isVisible()).toBeTrue();
    if (component.score>5)
      expect(Swal.getTitle()?.innerHTML).toEqual('Congratulations!');
    else
      expect(Swal.getTitle()?.innerHTML).toEqual('Keep trying!');

     Swal.clickConfirm();
     done();
  });


  




});
