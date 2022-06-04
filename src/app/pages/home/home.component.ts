import { Time } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Answer, Category, Question } from 'src/app/interfaces/interfaces.interfaces';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {


  
  public categories:Category[]=[];
  public categoryID!:number;
  public myForm!:FormGroup;
  newAnswer:FormControl = this.fb.control('',Validators.required);
  
  get answersArr(){
    return this.myForm.get('answers') as FormArray;
  }

  constructor(private categoryService:CategoryService,private fb:FormBuilder) {
    
   }
  

  ngOnInit(): void {
    
    //now.setHours();
    this.categoryService.getCategories()
    .subscribe((resp:any) => {
      console.log(resp.categories.$values);
      this.categories=resp.categories.$values;

      /*
      this.categories.forEach((element:Category) => {
        const {categoryID, categoryName} =element;
        console.log(categoryID,categoryName)
      });
      */


    });

    

    this.myForm= this.fb.group({
      question: [,Validators.required],
      answers : this.fb.array( 
        [
        ], Validators.required )
      
     
    });

    //console.log(currentDate);
    

  }

  click(id:number){
    this.categoryID=id;
    console.log(id);
    
    
  }

  saveQuestion(){
    console.log("save question");
    console.log("category "+this.categoryID);
    console.log(this.myForm.value.question);
    console.log("answers");
    
    console.log(this.myForm.value.answers);
    
    let question:Question = { 
      categoryID:this.categoryID,
      query:this.myForm.value.question
    }

    let answers:Answer[]=[];


    this.categoryService.postQuestion(question)
      .subscribe(
        {
          next: (resp:Question) => {
            const questionID= resp.questionID;
            //save question
            for (let index = 0; index < this.myForm.value.answers.length; index++) {

              let answer:Answer={
                correct:false,
                posibleAnswer:''
              };

              if (index==0)
                answer.correct=true;
              else
                answer.correct=false;
              answer.posibleAnswer=this.myForm.value.answers[index];
              answer.questionID=questionID;
              
              answers.push(answer);

            } 
            console.log("Answers que se van a guardar");
            
            console.log(answers);
            this.saveAnswers(answers);
            



          },
          error: console.error
        }
      );

    
    
    
    
    




    //question
    /*
    {
      "query": "Which of these countries was NOT a part of the Soviet Union?",
      "categoryID": 4
    }
    */
    //answer
    /*
    {
      "posibleAnswer": "Indiana",
      "questionID": 3,
      "correct": true
    }
    */
    //this.categoryService.postQuestion(this.myForm.value);
    
  }

  saveAnswers(answers:Answer[]){
    this.categoryService.postAnswers(answers)
    .subscribe({
      next: () => {
        Swal.fire('chido','','success');
        
      },
      error:() => Swal.fire('error','','error')
    })
  }

  addAnswer(){
    if (this.newAnswer.invalid){

    }
    else{
      this.answersArr.push(this.fb.control ( this.newAnswer.value, Validators.required) );
      //this.favoritesArr.push(new FormControl (this.newFavorite.value, Validators.required) );
      this.newAnswer.reset();
    }
  }

  delete(index:number){
    this.answersArr.removeAt(index);
    
  }

  reset(){
    console.log("restart");
    //this.newAnswer.reset();
    this.myForm.reset();
    let a=this.myForm.get('answers') as FormArray;
    while (a.length !== 0) {
      a.removeAt(0)
    }
    console.log(a.length);
  }
  

}
