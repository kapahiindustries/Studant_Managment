import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { StudentListModel, AddStudentModel } from '../constant/constants';
import { UserService } from '../services/user-service';
import { WarningComponent } from '../warning/warning.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  isCreating = false;
  maxChar = 200;
  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$';
  nameRegEx = '^(?! )[A-Za-z0-9 ]*(?<! )$';

  editStudentForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(this.nameRegEx)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegEx)]),
    class_name: new FormControl('', [Validators.required]),
    roll_number: new FormControl('')
  });

  constructor(public dialog: MatDialog, public editStudentDialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: StudentListModel }, private readonly userService: UserService) { }

  ngOnInit(): void {
    if (this.data.student) {
      this.editStudentForm.patchValue({
        id: this.data.student.id,
        name: this.data.student.name,
        last_name: this.data.student.last_name,
        email: this.data.student.email,
        class_name: this.data.student.class_name,
        roll_number: this.data.student.roll_number
      });
    }
  }

  public editStudent() {
    this.isCreating = true;
    this.editStudentDialogRef.disableClose = true;
    const data = this.editStudentForm.value;
    this.userService.addStudent(data).subscribe((result: AddStudentModel) => {
      if (result.success) {
        this.editStudentDialogRef.close('success');
        this.warningDialog(result.message, 'success');
      } else {
        this.isCreating = false;
      }
    },
      (error) => {
        this.editStudentDialogRef.close('error');
        this.warningDialog('Something went wrong', 'warning');
      });
  }

  warningDialog(messageString: string, styleClass: string) {
    this.dialog.open(WarningComponent, {
      panelClass: 'custom-dialog-container-small',
      autoFocus: false, restoreFocus: false, data: { message: messageString, class: styleClass }
    });
  }

  public closeDialog() {
    this.editStudentDialogRef.close('cancel');
  }

}
