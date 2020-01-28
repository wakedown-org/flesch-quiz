import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Answer } from '../_models/answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  private answerValue: Answer;
  @Input()
  get answer(): Answer {
    return this.answerValue;
  }
  @Output() answerChange = new EventEmitter<Answer>();
  set answer(val: Answer) {
    if (this.answerValue === undefined) {
      this.answerValue = val;
    } else {
      Object.keys(val).forEach((prop) => {
        this.answerValue[prop] = val[prop];
      });
    }
    this.answerChange.emit(this.answerValue);
  }

  @Input() question = '';
  @Input() answers: any[] = [];
  @Output() answered = new EventEmitter<Answer>();

  constructor() { }

  ngOnInit() {
  }

  radioChange(event) {
    this.answered.emit();
  }

}
