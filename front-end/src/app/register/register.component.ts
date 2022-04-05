import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AddStudentModel } from '../constant/constants';
import { UserService } from '../services/user-service';
import { WarningComponent } from '../warning/warning.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isCreating = false;
  maxChar = 200;
  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$';
  nameRegEx = '^(?! )[A-Za-z0-9 ]*(?<! )$';

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegEx)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role_id: new FormControl('')
  });

  constructor(public dialog: MatDialog, public addUserDialogRef: MatDialogRef<RegisterComponent>,
    private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  public closeDialog() {
    this.addUserDialogRef.close('cancel');
  }

  public addStudent() {
    this.isCreating = true;
    this.addUserDialogRef.disableClose = true;
    this.registerForm.patchValue({
      role_id: 1
    });
    const data = this.registerForm.value;
    this.userService.register(data).subscribe((result: AddStudentModel) => {
      if (result.success) {
        this.addUserDialogRef.close('success');
        this.warningDialog('Student Registered Successfully', 'success');
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
