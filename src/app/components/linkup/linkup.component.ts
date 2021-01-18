import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FriendService } from 'src/app/services/friends-mgmt.service';

@Component({
  selector: 'app-linkup',
  templateUrl: './linkup.component.html',
  styleUrls: ['./linkup.component.scss'],
})
export class LinkupComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message = '';
  constructor(
    private formBuilder: FormBuilder,
    private friendService: FriendService,
    private _snackBar: MatSnackBar
  ) {}

  linkUpForm = this.formBuilder.group({
    email: ['', Validators.required],
    friendEmail: ['', Validators.required],
  });

  ngOnInit(): void {
    this.message = '';
  }

  onSubmitLinkUpForm() {
    console.log(this.linkUpForm.value);
    this.friendService.linking(this.linkUpForm.value).subscribe((res) => {
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
