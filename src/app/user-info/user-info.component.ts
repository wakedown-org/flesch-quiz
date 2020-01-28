import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  private userValue: any;
  @Input()
  get user(): User {
    return this.userValue;
  }
  @Output() userChange = new EventEmitter<User>();
  set user(val: User) {
    this.userValue = val;
    this.userChange.emit(this.userValue);
  }

  @Output() keyUp = new EventEmitter();

  public keyup() {
    this.keyUp.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
