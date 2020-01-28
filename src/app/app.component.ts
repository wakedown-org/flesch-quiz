import { Component } from '@angular/core';
import { QuestionsService } from './questions.service';
import { AnswersService } from './answers.service';
import { ExporterService } from './exporter.service';
import { User } from './_models/user';
import { Answer } from './_models/answer';

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
  usersCount = 0;
  answers = [];
  userInfo: User = new User();

  get actualAnswer(): Answer {
    return this.answers[this.lastQuestion];
  }

  set actualAnswer(val: Answer) {
    this.answers[this.lastQuestion] = val;
  }

  constructor(private questionsSvc: QuestionsService, private answersSvc: AnswersService, private exporter: ExporterService) {
    this.questionsSvc.get().subscribe((questions: any[]) => {
      this.questions = questions;
      setInterval(() => {
        this.loadCount();
      }, 5 * 1000);
      this.loadCount();
      this.loadNextUser();
    });
  }

  keyup() {
    this.answersSvc.updateUser(this.userInfo);
  }

  changeAnswer() {
    this.answersSvc.updateAnswer(this.actualAnswer);
  }

  loadAnswer(idx: number): Promise<number> {
    return new Promise(resolve => {
      if (this.answers[idx] === undefined) {
        this.answersSvc.getAnswer(this.userInfo.id, idx).then(answer => {
          this.answers[idx] = answer;
          resolve(idx);
        });
      } else {
        resolve(idx);
      }
    });
  }

  loadNextUser() {
    this.answersSvc.getLastUser().then((user) => {
      this.userInfo = user;
    })
  }

  loadCount() {
    this.answersSvc.getUserCount().then((count) => {
      this.usersCount = count;
    });
  }

  initQuestions() {
    this.showUser = false;
    this.showQuestions = true;
    this.loadAnswer(this.lastQuestion).then((idx) => {
      this.lastQuestion = idx;
    });
    return false;
  }

  prevQuestion() {
    this.loadAnswer(this.lastQuestion - 1).then((idx) => {
      this.lastQuestion = idx;
    });
    return false;
  }

  showUserInfo() {
    this.showUser = true;
    this.showQuestions = false;
    return false;
  }

  nextQuestion() {
    this.loadAnswer(this.lastQuestion + 1).then((idx) => {
      this.lastQuestion = idx;
    });
    return false;
  }

  showResult() {
    this.userInfo.completed = true;
    this.answersSvc.updateUser(this.userInfo);
    this.showUser = false;
    this.showQuestions = false;
    this.showFinalResult = true;
    return false;
  }

  clearData() {
    this.answersSvc.clearAll();
    this.loadCount();
    return false;
  }

  reInitAll() {
    this.showUser = true;
    this.showQuestions = false;
    this.showFinalResult = false;
    this.lastQuestion = 0;
    this.answers = [];
    this.loadNextUser();
    this.loadCount();
    return false;
  }

  export() {
    this.answersSvc.getAllUsers().then(users => {
      this.answersSvc.getAllAnswers().then(answers => {
        const data = {
          Sheets: { 'users': this.exporter.parseData(users) },
          SheetNames: [ 'users' ]
        };
        users.map((u) => {
          var list = answers.filter(v => v.userId === u.id);
          return { sheet: `user-${u.id}`, data: list };
        }).map(v => {
          data.Sheets[v.sheet] = this.exporter.parseData(v.data);
          data.SheetNames.push(v.sheet);
        });
        this.exporter.exportAsExcelFile(data, 'report');
      });
    });
    return false;
  }
}
