import { Time } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/interfaces.interfaces';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {


  
  public categories:Category[]=[];


  constructor(private categoryService:CategoryService) {
    
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
  

}
