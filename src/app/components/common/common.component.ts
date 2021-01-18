import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss'],
})
export class CommonComponent implements OnInit {
  displayedColumns: string[] = ['email'];
  dataSource: MatTableDataSource<UserData>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private _snackBar: MatSnackBar
  ) {}

  commonFriendsForm = this.formBuilder.group({
    email: ['', Validators.required],
    friendEmail: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmitForm() {
    console.log(this.commonFriendsForm.value);
    this.friendService
      .getCommonFriends(this.commonFriendsForm.value)
      .subscribe((res) => {
        if (res.status == 'error') {
          this.openSnackBar(res.message);
        }
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        console.log(this.dataSource);
      });
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'close', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
