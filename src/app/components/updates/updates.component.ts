import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { FriendService } from 'src/app/services/friends-mgmt.service';

export interface UserData {
  email: string;
}

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<UserData>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private _snackBar: MatSnackBar
  ) {}

  friendListWithUpdatesForm = this.formBuilder.group({
    email: ['', Validators.required],
  });

  ngOnInit(): void {}

  onClickFriendUpdates() {
    this.displayedColumns = ['email', 'action'];
    console.log(this.friendListWithUpdatesForm.value);
    this.friendService
      .getUpdateFriends(this.friendListWithUpdatesForm.value.email)
      .subscribe((res) => {
        if (res.status == 'error') {
          this.openSnackBar(res.message);
        }
        console.log(res);
        this.dataSource = new MatTableDataSource(res.result);
        console.log(this.dataSource);
      });
  }

  onClickUnSubscribe(e) {
    let data = {
      email: this.friendListWithUpdatesForm.value.email,
      friendEmail: e,
    };
    this.friendService.unsubscribeUpdate(data).subscribe((res) => {
      if (res.message) {
        this.openSnackBar(res.message);
      }
      this.onClickFriendUpdates();
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Close', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
