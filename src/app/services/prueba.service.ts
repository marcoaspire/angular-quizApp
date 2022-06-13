import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { Post } from './prueba.service.spec';

@Injectable({
  providedIn: 'root'
})

export class PruebaService {
  //base_url= environment.base_url;
  base_url = 'http://jsonplaceholder.typicode.com';

  
  constructor(private  http: HttpClient) {
  }

  getPostData() {
    //return this.http.get(`${this.base_url}/categories`);
    //return this.http.get<Post[]>(`${this.base_url}/posts`);
  }

}
