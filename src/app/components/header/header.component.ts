import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public myForm!:FormGroup;
  public category:string="";

  constructor(private categoriesService:CategoryService) { }

  ngOnInit(): void {
    console.log(this.category);
    
  }

  saveCategory(){
    this.categoriesService.postCategory(this.category)
      .subscribe({
        next: () =>
          Swal.fire('chido','','success')
        ,
        error:err=>{
          Swal.fire('error',err,'error');
          console.log(err);
          

        }
      });
  }
}
