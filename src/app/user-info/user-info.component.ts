import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  encapsulation: ViewEncapsulation.None,
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

  @Input() termos: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
  @Output() keyUp = new EventEmitter();

  public keyup() {
    this.keyUp.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
