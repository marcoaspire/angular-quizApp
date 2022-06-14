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
    /*
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
    }
    */
   }
  
   //ya
  ngOnInit(): void {
    this.getCategories();
    this.myForm= this.fb.group({
      question: [,Validators.required],
      answers : this.fb.array( 
        [], Validators.required )
    });
  }

  //ya
  getCategories(){
    console.log("get categories");
    
    console.log(this.categoryService);
    
    //now.setHours();
    this.categoryService.getCategories()
    .subscribe((resp:any) => {
      console.log(resp);
      
     this.categories=resp.categories;

      /*
      this.categories.forEach((element:Category) => {
        const {categoryID, categoryName} =element;
        console.log(categoryID,categoryName)
      });
      */


    });
    console.log("sali getCategories");
    console.log(this.categories.length);
    
  }

  typeNewAnswer(){
    this.addNewAnswer=true;
  }

  click(id:number){
    this.categoryID=id;
  }

  //ya
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
        this.categoryService.deleteCategory2(id)
        .subscribe({
          next: (res:any) => {
            console.log("eliminado a " +id);
            Swal.fire('Category deleted',res.msg,'success');
            this.getCategories();
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
            console.log("aqui");
            
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
    console.log("guardando respuestas");
    console.log(answers);
    
    this.categoryService.postAnswers(answers)
    .subscribe({
      next: () => {
        Swal.fire('chido','','success');
        
      },
      error:() => Swal.fire('error','','error')
    })
  }
  //ya
  addAnswer(){
    if (!this.newAnswer.invalid){
      this.answersArr.push(this.fb.control ( this.newAnswer.value, Validators.required) );
      //this.favoritesArr.push(new FormControl (this.newFavorite.value, Validators.required) );
      this.newAnswer.reset();
    }
  }

  //ya
  delete(index:number){
    this.answersArr.removeAt(index);    
  }
  //ya
  reset(){
    this.myForm.reset();
    let answers=this.myForm.get('answers') as FormArray;
    while (answers.length !== 0) {
      answers.removeAt(0)
    }
    console.log(answers.length);
    this.addNewAnswer=false;
  }
  

}
