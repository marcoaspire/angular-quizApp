import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take,map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const base_url= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public questions:any[]=[];

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(`${base_url}/categories`);
  }

  getCategory(id:number){
    return this.http.get(`${base_url}/categories/${id}`)
    .pipe(
       map((res:any) => {
         this.shuffleArray(res.category.question.$values)
         return res.category.question.$values.slice(0,10);
       }
      )
    );

  }

  shuffleArray(array:any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    
}

}
