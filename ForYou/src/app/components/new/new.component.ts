import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  @Input() categorys: any = [];
  @Input() title: string = '';

  new: any = {
    value: '',
    description: '',
    category: '',
    date: ''
  }

  constructor() { }

  ngOnInit(): void {
  
  }

  create() {
    console.log(this.new);
  }

}
