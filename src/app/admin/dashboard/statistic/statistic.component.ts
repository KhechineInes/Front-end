import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  constructor() { }
  link:string ="";
  ngOnInit(): void {
  }
  nbAnswers(){
    this.link='ans';

  }
  nbCat(){
    this.link='cat';
  }
  nbPost(){
    this.link='post';
  }
  anal(){
    this.link='';
  }
}
