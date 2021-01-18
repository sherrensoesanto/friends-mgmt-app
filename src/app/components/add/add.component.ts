import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FriendService } from 'src/app/services/friends-mgmt.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message = '';
  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private _snackBar: MatSnackBar
  ) {}

  addUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  ngOnInit(): void {
    this.message = '';
  }

  onSubmitAddForm() {
    console.log(this.addUserForm.value);
    this.friendService.addUser(this.addUserForm.value).subscribe((res) => {
      if (res.message) {
        this.message = res.message;
        this.openSnackBar(res.message);
      }
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
