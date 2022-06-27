import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { delay } from 'rxjs';
import { UserAnswers } from 'src/app/interfaces/interfaces.interfaces';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit,OnDestroy {

  timerDefault=10;
  hours:number=0;
  minutes:number=1;
  seconds:number=this.timerDefault;
  days:number=0;
  @ViewChild('b') b!: ElementRef<HTMLElement>;
  

  public interval:any;

  constructor(private activatedRoute:ActivatedRoute, private categoriesService:CategoryService,private fb:FormBuilder,
              private router:Router
    ) {
   }
  myForm!: FormGroup;

  group:any = {
  };

  categoryName:string="";
  questions:any[]=[];
  correctAnswers:any[]=[];
  isInitiated:boolean=false;
  results:boolean[]=[];
  score:number=0;

  ngOnInit(): void {
    this.restart();
  }


  prueba():void{
    this.prueba2();
  }
  prueba2():void{
    console.log("prueba2: no debe entrar aqui");
    
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  //ya
  getData(){
    this.activatedRoute.params
    .pipe(
      //delay(1000)
    )
    .subscribe(({category}) => {
     console.log(category);//4
      console.log(typeof(category));
      
      this.categoriesService.getQuestionsByCategory(category)
      .subscribe((res:any) => {
        console.log(res);
        if (res.questions.length==0){
          const navigationExtras: NavigationExtras = {state: {data: 'Question Bank is empty, add some questions please'}};
          this.router.navigate(['/home'], navigationExtras);
        }
        this.categoryName=res.categoryName;
        this.questions=res.questions;
        this.questions.forEach(element => {
          
          this.categoriesService.shuffleArray(element.answers);
          this.group['questionID'+element.questionID] = ['', [Validators.required]];
          element.answers.forEach(
            (e:any)=>{
              if (e.correct)
                this.correctAnswers.push(e);
            }
          );
        });
        this.myForm = this.fb.group(this.group);
      });
    });
  }

  setTimer(){
    console.log(this.seconds);
    console.log(this.minutes);
    this.setCountDownDate(this.seconds);
    this.restart();
    
  }
  checkAnswers(){
    console.log(this.correctAnswers);
    let userAnswers:Map<number,number>=new Map();
    for (const [key, value] of Object.entries(this.myForm.value)) {
      const idQuestion=parseInt(key.split('ID')[1]);
      const idAnswer=value as number;
      userAnswers.set(idQuestion,idAnswer);
    }

    for (let index = 0; index < this.correctAnswers.length; index++) {
      const element = this.correctAnswers[index].questionID;
      if (userAnswers.get(element) == this.correctAnswers[index].answerID )
      {
        this.results.push(true);
        this.score++;
      }
      else{
        this.results.push(false);
      }
    }
    if (this.score>5)
    {
      Swal.fire({
        title: 'Congratulations!',
        text: `You got ${this.score} answers right`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restart quiz',
        cancelButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          this.restart();
        }
      })
      
    }
    else{
      Swal.fire({
        title: 'Keep trying!',
        text: `You got ${this.score} answers right`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restart quiz',
        cancelButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          this.restart();
        }
      })
    }
  }

  checkAnswer(index:number){
    return !this.results[index] && !this.isInitiated;
  }
  isValid(field: string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
  restart(){
    console.log("no debe entrar a este restart");
    
    clearInterval(this.interval);
    this.score=0;
    this.getData();
    this.restartValues();
    this.setCountDownDate(this.timerDefault);
    this.isInitiated=true;
  }

  restartValues(){
    this.hours=0;
    this.minutes=0;
    this.seconds=0;
    this.days=0; 
  }
  
  setCountDownDate(seconds:number){
    var countDownDate = new Date();
    countDownDate.setSeconds(countDownDate.getSeconds()+seconds+2);
    this.interval=setInterval(()=>{
      var now = new Date().getTime();
      var distance = countDownDate.getTime() - now;
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        this.isInitiated=false;
        this.checkAnswers();
        clearInterval(this.interval);
        this.restartValues();
      }
    },1000);
  }

  unfocus(questionID:number){
    const answer=document.getElementById(`questionID${questionID}`);
    console.log("cambiando:" + `questionID${questionID}`);
    answer?.blur();
    
    //var isFocused = (document.activeElement === answer);
    //console.log(document.activeElement === answer);
  }

}
