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
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<UserData>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private _snackBar: MatSnackBar
  ) {}

  friendListForm = this.formBuilder.group({
    email: ['', Validators.required],
  });

  ngOnInit(): void {}

  onClickAllFriends() {
    this.displayedColumns = ['email', 'action'];
    console.log(this.friendListForm.value.email);
    this.friendService
      .getAllFriends(this.friendListForm.value.email)
      .subscribe((res) => {
        if (res.status == 'error') {
          this.openSnackBar(res.message);
        }
        console.log(res);
        this.dataSource = new MatTableDataSource(res.result);
        console.log(this.dataSource);
      });
  }

  onClickSubscribe(e) {
    let data = {
      email: this.friendListForm.value.email,
      friendEmail: e,
    };
    this.friendService.subscribeUpdate(data).subscribe((res) => {
      if (res.message) {
        this.openSnackBar(res.message);
      }
      this.onClickAllFriends();
    });
  }

  onClickUnSubscribe(e) {
    let data = {
      email: this.friendListForm.value.email,
      friendEmail: e,
    };
    this.friendService.unsubscribeUpdate(data).subscribe((res) => {
      if (res.message) {
        this.openSnackBar(res.message);
      }
      this.onClickAllFriends;
    });
  }

  onClickBlock(e) {
    let data = {
      email: this.friendListForm.value.email,
      friendEmail: e,
    };
    this.friendService.blockFriend(data).subscribe((res) => {
      if (res.message) {
        this.openSnackBar(res.message);
      }
      this.onClickAllFriends();
    });
  }

  onClickUnBlock(e) {
    let data = {
      email: this.friendListForm.value.email,
      friendEmail: e,
    };
    this.friendService.unblockFriend(data).subscribe((res) => {
      if (res.message) {
        this.openSnackBar(res.message);
      }
      this.onClickAllFriends();
    });
  }

  onClickUnFriend(e) {
    let data = {
      email: this.friendListForm.value.email,
      friendEmail: e,
    };
    this.friendService.unfriend(data).subscribe((res) => {
      if (res.message) {
        this.openSnackBar(res.message);
      }
      this.onClickAllFriends();
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Click', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
