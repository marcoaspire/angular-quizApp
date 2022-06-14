import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HomeComponent } from '../pages/home/home.component';

import { CategoryService } from './category.service';

xdescribe('CategoryService', () => {
  let service: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

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
    TestBed.configureTestingModule({});
    //service = TestBed.inject(CategoryService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CategoryService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return questions',  (done: DoneFn)  => {
    const mockCategory=
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
            }
        ]
      }
    }
    const mockResultCategory={
      "categoryName":"Geography",
      "questions": mockCategory.category.question
    }
    httpClientSpy.get.and.returnValue(of(mockCategory));

    service.getQuestionsByCategory(4)
    .subscribe( 
      {
      next: resultCategory => {
        expect(resultCategory).toEqual(mockResultCategory);
        done();
      },
      error:  done.fail
      }
    );
  });

  it('should return null if categoryID does not exist',  (done: DoneFn)  => {
    const mockCategory=
    {
      "category": null
    }
    httpClientSpy.get.and.returnValue(of(mockCategory));
    service.getQuestionsByCategory(4)
    .subscribe( 
      {
      next: resultCategory => {
        expect(resultCategory).toEqual(null);
        done();
      },
      error:  done.fail
      }
    );
  });


  it('should return categories (HttpClient called once)',  (done: DoneFn)  => {
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
          },
          {
              "categoryID": 5,
              "categoryName": "Planets",
              "question": null
          },
          {
              "categoryID": 1003,
              "categoryName": "Soccer",
              "question": null
          },
          {
              "categoryID": 7,
              "categoryName": "Which One Doesn't Belong ",
              "question": null
          },
          {
              "categoryID": 6,
              "categoryName": "World War II",
              "question": null
          }
      ]
    }
    httpClientSpy.get.and.returnValue(of(mockCategories));

    service.getCategories()
    .subscribe({
      next: categories => {
        expect(categories).toEqual(mockCategories);
        done();
      },
      error: done.fail
      });
      expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });


  it('should return an object category when user posts a new category',  (done: DoneFn)  => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new CategoryService(httpClientSpy);

   
    const mockResultPostCategory={
      "category": {
        "categoryID": 1012,
        "categoryName": "Colors",
        "question": null
      }
    }
    httpClientSpy.post.and.returnValue(of(mockResultPostCategory));
    //act
    service.postCategory("colors")
    .subscribe({
      next: category => {
        expect(category).toEqual(mockResultPostCategory);
        done();
      },
      error: done.fail
      });
      expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });


  it('should return HTTP​ 500 error if user try to post an existing category',  (done: DoneFn)  => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new CategoryService(httpClientSpy);

   
    const error= new HttpErrorResponse({
      error: 'test 500 error',
      status:500,
    });

    httpClientSpy.post.and.returnValue(throwError(() => error));
    //act
    service.postCategory("")
    .subscribe({
      error:err =>{
        expect(err).toEqual(error);
        done();
      } 
      });
      expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });


  it('should return a message after delete a category',  (done: DoneFn)  => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['delete']);
    service = new CategoryService(httpClientSpy);

    const deleteSuccess= {msg: "Category deleted"};

    httpClientSpy.delete.and.returnValue(of(deleteSuccess));
    //act
    service.deleteCategory2(1012)
    .subscribe({
      next: res => {
        expect(res).toEqual(deleteSuccess);
        done();
      } 
      });
      expect(httpClientSpy.delete.calls.count())
      .withContext('one call')
      .toBe(1);
  });





  it('should return an object question when user posts a new question',  (done: DoneFn)  => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      service = new CategoryService(httpClientSpy);
  
      const mockPostQuestion={
        "query": "Which of these countries was NOT a part of the Soviet Union?",
        "categoryID": 4
      }
      const mockResultPostQuestion={
        "question": {
          "questionID": 1020,
          "query": "delete",
          "categoryID": 4
        }
      }

      httpClientSpy.post.and.returnValue(of(mockResultPostQuestion));
      //act
      service.postQuestion(mockPostQuestion)
      .subscribe({
        next: question => {
          expect(question).toEqual(mockResultPostQuestion.question);
          done();
        },
        error: done.fail
        });
        expect(httpClientSpy.post.calls.count())
        .withContext('one call')
        .toBe(1);
    });


    it('should return an array of objects Answer when user posts answer(s)',  (done: DoneFn)  => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      service = new CategoryService(httpClientSpy);
  
      const mockPostAnswers=[
        {
        "posibleAnswer": "120",
        "questionID": 3,
        "correct": false
        },
        {
        "posibleAnswer": "120",
        "questionID": 3,
        "correct": true
        }
      ];
      const mockResultPostAnswers={
        "answers": [
            {
                "answerID": 1156,
                "posibleAnswer": "120",
                "questionID": 3,
                "correct": false,
                "question": null
            },
            {
                "answerID": 1157,
                "posibleAnswer": "120",
                "questionID": 3,
                "correct": true,
                "question": null
            }
        ]
    }

      httpClientSpy.post.and.returnValue(of(mockResultPostAnswers));
      //act
      service.postAnswers(mockPostAnswers)
      .subscribe({
        next: answers => {
          expect(answers).toEqual(mockResultPostAnswers.answers);
          done();
        },
        error: done.fail
        });
        expect(httpClientSpy.post.calls.count())
        .withContext('one call')
        .toBe(1);
    });

    
    it('should return HTTP​ 500 error if user post an answer with a nonexistent question',  (done: DoneFn)  => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      service = new CategoryService(httpClientSpy);

       const mockPostAnswers=[
        {
        "posibleAnswer": "Answer",
        "questionID": 354654,
        "correct": false
        }
      ];
  
      const error= new HttpErrorResponse({
        error: 'test 500 error',
        status:500,
      });
  
      httpClientSpy.post.and.returnValue(throwError(() => error));
      //act
      service.postAnswers(mockPostAnswers)
      .subscribe({
        error:err =>{
          expect(err).toEqual(error);
          done();
        } 
        });
    });
  
})
