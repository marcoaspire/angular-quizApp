import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/interfaces.interfaces';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  timer: any= { hours:0, minutes: 30, seconds: 15 };

  hours:number=0;
  minutes:number=0;
  seconds:number=0;
  days:number=0;
  

  public interval:any;
  public categories:Category[]=[];


  constructor(private categoryService:CategoryService) {
    var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
    this.interval=setInterval(()=>{
       //console.log("si");
       //this.seconds--;
      
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.interval);
        
      }



    },1000);
    //clearInterval(this.interval);
   }

  ngOnInit(): void {
    
    //now.setHours();
    this.categoryService.getCategories()
    .subscribe((resp:any) => {
      //console.log(resp.categories.$values);
      this.categories=resp.categories.$values;

      /*
      this.categories.forEach((element:Category) => {
        const {categoryID, categoryName} =element;
        console.log(categoryID,categoryName)
      });
      */


    });

    //console.log(currentDate);
    

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

}
