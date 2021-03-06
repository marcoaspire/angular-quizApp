import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take,map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Answer, Question } from '../interfaces/interfaces.interfaces';


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

  getQuestionsByCategory(id:number){
    console.log("NO DEBE ENTRAR ");
    
    return this.http.get(`${base_url}/categories/${id}`)
    .pipe(
       map((res:any) => {
        if (!res.category){
          return null;
        }
        this.shuffleArray(res.category.question)
         return {
           'categoryName' : res.category.categoryName,
           'questions': res.category.question.slice(0,10)
         }
       }
      )
    );
  }

  postCategory(name:String){
    const body ={
      "categoryName":name
    }
    return this.http.post(`${base_url}/categories`,body);
  }


  deleteCategory2(id:number){
    return this.http.delete(`${base_url}/categories/${id}`);
  }


  shuffleArray(array:any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  postQuestion(body:Question){
   return this.http.post<any>(`${base_url}/questions`,body)
    .pipe(
      map((resp: {ok:boolean,question:Question} ) => resp.question) 
    );

  }

  postAnswers(body:Answer[]){
    console.log("NO DEBE ENTRAR:entre a post, se va a postear:");
    console.log(body);
    
    return this.http.post<any>(`${base_url}/answers`,body);
  }

  prueba(id:number){
    console.log("servicio prueba, NO DEBE ENTRAR");

    return of(id);
  }

}
