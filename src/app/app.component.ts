import { Component } from '@angular/core';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz';
  showUser = true;
  showQuestions = false;
  showFinalResult = false;
  lastQuestion = 0;
  questions = [];

  constructor(private service: QuestionsService) {
    this.service.get().subscribe((questions: any[]) => {
      this.questions = questions;
    })
  }

  initQuestions() {
    this.showUser = false;
    this.showQuestions = true;
    return false;
  }

  prevQuestion() {
    this.lastQuestion--;
    return false;
  }

  showUserInfo() {
    this.showUser = true;
    this.showQuestions = false;
    return false;
  }

  nextQuestion() {
    this.lastQuestion++;
    return false;
  }

  showResult() {
    this.showUser = false;
    this.showQuestions = false;
    this.showFinalResult = true;
    return false;
  }
}
