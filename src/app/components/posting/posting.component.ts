import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FriendService } from 'src/app/services/friends-mgmt.service';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss'],
})
export class PostingComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private _snackBar: MatSnackBar
  ) {}

  updateForm = this.formBuilder.group({
    email: ['', Validators.required],
    friendEmail: ['', Validators.required],
    text: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmitPost() {
    console.log(this.updateForm.value);
    this.friendService.postUpdates(this.updateForm.value).subscribe((res) => {
      if (res.message) {
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
