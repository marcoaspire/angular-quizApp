import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: [
  ]
})
export class TestComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private categoriesService:CategoryService) { }

  questions:any[]=[];

  ngOnInit(): void {
    
    this.activatedRoute.params
    .subscribe(({category}) => {
      //console.log(category);
      this.categoriesService.getCategory(category)
      .subscribe((res:any) => {
        console.log(res);
        this.questions=res;
      });


    });




  }

}
