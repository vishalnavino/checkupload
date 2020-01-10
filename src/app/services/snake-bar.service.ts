import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {
  }

  SuccessSnackBar(messages) {
    this.snackBar.open(messages, '', {
      duration: 5000,
      panelClass: ['green-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  FailureError(messages) {
    this.snackBar.open(messages, '', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
