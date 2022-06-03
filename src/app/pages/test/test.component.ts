import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  hours:number=0;
  minutes:number=0;
  seconds:number=0;
  days:number=0;
  
  timer: any= { hours:0, minutes: 30, seconds: 15 };

  public interval:any;

  constructor(private activatedRoute:ActivatedRoute, private categoriesService:CategoryService,private fb:FormBuilder) {

    


   }

  // myForm: FormGroup = this.fb.group({
  //    question: ['',Validators.required],
  // });

  myForm!: FormGroup;

  group:any = {
  };

  questions:any[]=[];
  correctAnswers:any[]=[];

  ngOnInit(): void {
    this.restart();
    
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);

  }

  getData(){
    this.activatedRoute.params
    .subscribe(({category}) => {
      //console.log(category);
      this.categoriesService.getCategory(category)
      .subscribe((res:any) => {
        this.questions=res;
        this.questions.forEach(element => {
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

  check(){
    //idquestion/idAnswer
    let userAnswers:Map<number,number>=new Map();
    let score:number=0;

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
        console.log("bien");
        
        score++;
      }
    }
    //TODO: OPEN ALERT
    console.log(score);
    if (score>5)
    {
      Swal.fire({
        title: 'Congratulations!',
        text: `You got ${score} answers right`,
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
        text: `You got ${score} answers right`,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restart quiz',
        cancelButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          //reiniciar quiz
          this.restart();
          //this.getData();
          //clearInterval(this.interval);
          //this.setCountDownDate();

        }
      })
    }

    

    //reiniciar
    
    
  }

  isValid(field: string){
    
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }


  set(){
    console.log(this.timer);
    console.log(this.timer.seconds);
    var now = new Date();
    now.setHours(now.getHours() + this.hours);
    now.setMinutes(now.getMinutes() + this.minutes);
    now.setSeconds(now.getSeconds() + this.seconds);
    var currentDate = new Date().getTime();
    console.log(currentDate);
    // Set the date we're counting down to
    var countDownDate = new Date().getTime();
    //var distance = countDownDate - now;
     // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((currentDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((currentDate % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((currentDate % (1000 * 60)) / 1000);

    console.log("dia");
    /*
    console.log(hours,
      minutes,
      seconds);
    */
    
  }


  restart(){
    clearInterval(this.interval);
    
    this.restartValues();
    this.getData();
    this.setCountDownDate();
    

  }

  restartValues(){
    this.hours=0;
    this.minutes=0;
    this.seconds=0;
    this.days=0;  
  }
  
  setCountDownDate(){
    //var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
    var countDownDate = new Date();
    
    //countDownDate.setMinutes(countDownDate.getMinutes()+5);
    countDownDate.setSeconds(countDownDate.getSeconds()+15);


    this.interval=setInterval(()=>{
       console.log("si");
       //this.seconds--;
      
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
        
        this.check();
        clearInterval(this.interval);
        this.restartValues();
      }
    },1000);
  }

}
