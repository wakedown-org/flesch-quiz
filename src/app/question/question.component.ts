import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  private answerValue: any;
  @Input()
  get answer() {
    return this.answerValue;
  }
  @Output() answerChange = new EventEmitter();
  set answer(val) {
    this.answerValue = val;
    this.answerChange.emit(this.answerValue);
  }

  @Input() question = '';
  @Input() answers: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
