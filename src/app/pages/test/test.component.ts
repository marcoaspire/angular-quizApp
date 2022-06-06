import { Component, OnDestroy, OnInit } from '@angular/core';
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
  

  public interval:any;

  constructor(private activatedRoute:ActivatedRoute, private categoriesService:CategoryService,private fb:FormBuilder,
              private router:Router
    ) {
   }

  // myForm: FormGroup = this.fb.group({
  //    question: ['',Validators.required],
  // });

  myForm!: FormGroup;

  group:any = {
  };

  categoryName:string="";
  questions:any[]=[];
  correctAnswers:any[]=[];
  initiated:boolean=false;
  results:boolean[]=[];
  score:number=0;

  ngOnInit(): void {
    this.restart();
    //console.log(this.initiated);
    
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  getData(){
    this.activatedRoute.params
    .pipe(
      delay(1000)
    )
    .subscribe(({category}) => {
      //console.log(category);
      this.categoriesService.getCategory(category)
      .subscribe((res:any) => {
        if (res.questions.length==0){
          const navigationExtras: NavigationExtras = {state: {data: 'Question Bank is empty, add some questions please'}};
          this.router.navigate(['/home'], navigationExtras);
        }
        this.categoryName=res.categoryName;
        this.questions=res.questions;

        console.log("question");
        
        console.log(this.questions);
        

        this.questions.forEach(element => {
          this.categoriesService.shuffleArray(element.answers.$values);
          this.group['questionID'+element.questionID] = ['', [Validators.required]];
          element.answers.$values.forEach(
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
  check(){
    //idquestion/idAnswer
    let userAnswers:Map<number,number>=new Map();
    

    console.log(this.correctAnswers);
    for (const [key, value] of Object.entries(this.myForm.value)) {
      const idQuestion=parseInt(key.split('ID')[1]);
      const idAnswer=value as number;
      userAnswers.set(idQuestion,idAnswer);
    }

    console.log(userAnswers);

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
    //TODO: OPEN ALERT
    console.log(this.score);
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
          //restart quiz
          this.restart();
          //this.getData();
          //clearInterval(this.interval);
          //this.setCountDownDate();

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
          //this.getData();
          //clearInterval(this.interval);
          //this.setCountDownDate();

        }
      })
    }
  }

  checkAnswer(index:number){
    return !this.results[index] && !this.initiated;
  }
  isValid(field: string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
  restart(){
    clearInterval(this.interval);
    this.score=0;
    this.getData();
    if (this.seconds!=this.timerDefault)
    {
      this.setCountDownDate(this.seconds);
    }
    else{
      this.restartValues();
      this.setCountDownDate(this.timerDefault);
    }
    this.initiated=true;
  }

  restartValues(){
    this.hours=0;
    this.minutes=0;
    this.seconds=0;
    this.days=0; 
  }
  
  setCountDownDate(seconds:number){
    //var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
    var countDownDate = new Date();
    
    //countDownDate.setMinutes(countDownDate.getMinutes()+5);
    //countDownDate.setMinutes(countDownDate.getMinutes()+1);

    countDownDate.setSeconds(countDownDate.getSeconds()+seconds+2);


    this.interval=setInterval(()=>{
       console.log("si");
       
      // Get today's date and time
      var now = new Date().getTime();
      
      // Find the distance between now and the count down date
      var distance = countDownDate.getTime() - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
      // If the count down is finished, write some text
      if (distance < 0) {
        this.initiated=false;
        this.check();
        clearInterval(this.interval);
        console.log("borrado");
        
        this.restartValues();
      }
    },1000);
  }

}
