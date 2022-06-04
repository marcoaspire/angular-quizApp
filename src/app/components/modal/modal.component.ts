import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  change(event:any){
    console.log(event);
    
  }
  closeModal(){
    console.log("closing");
    
  }
  upload(){
    console.log('uplod');
    
  }

}
