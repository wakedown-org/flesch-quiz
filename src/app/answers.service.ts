import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { User } from './_models/user';
import { Answer } from './_models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  constructor(private db: NgxIndexedDBService) {
  }

  getUserCount() {
    return this.db.count('user');
  }

  async clearAll() {
    await this.db.clear('answer');
    await this.db.clear('user');
  }

  getAnswer(userId: number, questionIdx: number) {
    return new Promise((resolve, reject) => {
      this.db.getAll<Answer>('answer').then((answers) => {
        const answer = answers.find((a) => a.userId === userId && a.questionIdx === questionIdx);
        // console.log('get answer', answer);
        if (answer === undefined) {
          this.addAnswer(new Answer({ userId: userId, questionIdx: questionIdx })).then((id) => {
            this.db.getByKey<Answer>('answer', id).then((newAnswer) => {
              resolve(newAnswer);
            });
          })
        } else {
          resolve(answer);
        }
      });
    });
  }

  getLastUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.getAll<User>('user').then((users) => {
        const notCompleted = users.find((u) => !u.completed);
        if (notCompleted === undefined) {
          this.addUser(new User()).then((id) => {
            this.db.getByKey<User>('user', id).then((newUser) => {
              resolve(newUser);
            });
          });
        } else {
          resolve(notCompleted);
        }
      });
    });
  }

  updateUser(user: User) {
    this.db.update<User>('user', user).then(
      () => {
        // console.log('user updated', user);
      },
      error => {
        console.log(error);
      }
    );
  }

  addUser(user: User) {
    return this.db.add<User>('user', user);
  }

  updateAnswer(answer: Answer) {
    this.db.update<Answer>('answer', answer).then(
      () => {
        // console.log('answer updated', answer);
      },
      error => {
        console.log(error);
      }
    );
  }

  addAnswer(answer: Answer) {
    return this.db.add<Answer>('answer', answer);
  }
}
