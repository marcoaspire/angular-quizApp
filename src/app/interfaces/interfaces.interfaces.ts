// Generated by https://quicktype.io

export interface Category {
    $id?:          string;
    categoryID:   number;
    categoryName: string;
    question?:     null;
}

// Generated by https://quicktype.io

 export interface Question {
     query:      string;
     categoryID: number;
     questionID?: number;
 }

// // Generated by https://quicktype.io

 export interface Answer {
     posibleAnswer: string;
     questionID?:    number;
     correct:       boolean;
 }




export interface UserAnswers {
   
    answerID:   number;
    questionID: number;
    question?:  string;
}



      // Generated by https://quicktype.io

      export interface Category {
        category: CategoryClass;
      }
      
      export interface CategoryClass {
        categoryID:   number;
        categoryName: string;
        question:     Question[];
      }
      
    //   export interface Question {
    //     questionID: number;
    //     query:      string;
    //     categoryID: number;
    //     answers?:    Answer[];
    //   }
      
    //   export interface Answer {
    //     answerID:      number;
    //     posibleAnswer: string;
    //     questionID:    number;
    //     correct:       boolean;
    //   }
      
          
       
    