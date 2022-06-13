// import { TestBed } from '@angular/core/testing';
// import {HttpClientModule} from '@angular/common/http';
// import { PruebaService } from './prueba.service';

// export interface Post{
//   id: number;
//   userId: string;
//   body: string;
//   title: string;
// }

// describe('PruebaService', () => {
//   let service: PruebaService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports:[HttpClientModule],
//       providers: [PruebaService]
//     });
//     service = TestBed.inject(PruebaService);
//   });

//   /*
//   it('should be created', () => {
//     const service: PruebaService = TestBed.get();
//     expect(service).toBeTruthy();
//   });
//   */
//   it('be able to retrieve posts from the API bia GET', () => {
//     const dummyPosts: Post[] = [{
//         userId: '1',
//         id: 1,
//         body: 'Http Client',
//         title: 'Testing Angular Service'
//         }, {
//         userId: '2',
//         id: 2,
//         body: 'Hello World2',
//         title: 'Testing Angular Services'
//     }];
//     service.getPostData().subscribe(
//       {
//         next: (posts:any) => {
//           console.log(posts.length);
//           console.log("fin prueba test");
//           expect(posts.length).toBe(100);
          
//             //expect(posts).toEqual(dummyPosts);
//           },
//         error: (err) => {
//           console.log("error cachado");
          
//         }
//       }
      
    
    
//     );
//   });


// });
