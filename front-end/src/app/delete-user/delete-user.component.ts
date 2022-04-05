import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WarningComponent } from '../warning/warning.component';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {

  isDeleting = false;
  isValid = false;

  constructor(private readonly userService: UserService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }, public deleteUserDialogRef: MatDialogRef<DeleteUserComponent>) { }

  public deleteStudent() {
    this.isDeleting = true;
    this.deleteUserDialogRef.disableClose = true;
    this.userService.deleteStudent(this.data.id).subscribe((result) => {
      this.deleteUserDialogRef.close('success');
      this.warningDialog('Student Deleted Successfully', 'success');
    },
      (error) => {
        this.deleteUserDialogRef.close('error');
        this.warningDialog('Something went wrong', 'warning');
      });
  }

  public closeDialog() {
    this.deleteUserDialogRef.close('cancel');
  }

  warningDialog(messageString: string, styleClass: string) {
    this.dialog.open(WarningComponent, {
      panelClass: 'custom-dialog-container-small',
      autoFocus: false, restoreFocus: false, data: { message: messageString, class: styleClass }
    });
  }

}
