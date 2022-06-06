import { Time } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public message:String="";
  addNewAnswer:boolean=false;


  newAnswer:FormControl = this.fb.control('',Validators.required);
  
  get answersArr(){
    return this.myForm.get('answers') as FormArray;
  }

  constructor(private categoryService:CategoryService,private fb:FormBuilder,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state != undefined)
    {
      const state = navigation?.extras.state as {data: string};
      this.message=state.data;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: state.data
      })
      //console.log(state.data);
    }
   // this.data = state.data;
    
   }
  

  ngOnInit(): void {
    
    //now.setHours();
    this.categoryService.getCategories()
    .subscribe((resp:any) => {
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

  typeNewAnswer(){
    this.addNewAnswer=true;
  }

  click(id:number){
    this.categoryID=id;
    console.log(id);
    
    
  }
  deleteCategory(id:number){

    return Swal.fire({
      title: `Are you sure you want to delete?`,
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => 
    {
      if (result.isConfirmed) 
      {
        this.categoryService.deleteCategory(id)
        .subscribe({
          next: (res:any) => {
            Swal.fire('chido',res.msg,'success');
            
          },
          error:(res:any) => Swal.fire('error',res.msg,'error')
        });
      }
    })
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
    this.addNewAnswer=false;

  }
  

}
