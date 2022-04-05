import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AddStudentModel } from '../constant/constants';
import { UserService } from '../services/user-service';
import { WarningComponent } from '../warning/warning.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  isCreating = false;
  maxChar = 200;
  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$';
  nameRegEx = '^(?! )[A-Za-z0-9 ]*(?<! )$';

  addStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegEx)]),
    class_name: new FormControl('', [Validators.required]),
    roll_number: new FormControl('')
  });

  constructor(public dialog: MatDialog, public addUserDialogRef: MatDialogRef<AddUserComponent>,
    private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  public closeDialog() {
    this.addUserDialogRef.close('cancel');
  }

  public addStudent() {
    this.isCreating = true;
    this.addUserDialogRef.disableClose = true;
    const data = this.addStudentForm.value;
    this.userService.addStudent(data).subscribe((result: AddStudentModel) => {
      if (result.success) {
        this.addUserDialogRef.close('success');
        this.warningDialog(result.message, 'success');
      } else {
        this.isCreating = false;
      }
    },
      (error) => {
        this.addUserDialogRef.close('error');
        this.warningDialog('Something went wrong', 'warning');
      });
  }

  warningDialog(messageString: string, styleClass: string) {
    this.dialog.open(WarningComponent, {
      panelClass: 'custom-dialog-container-small',
      autoFocus: false, restoreFocus: false, data: { message: messageString, class: styleClass }
    });
  }

}
