import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { message: string, class: string },
    public warningModalDialogRef: MatDialogRef<WarningComponent>) { }

  warningDialog() {
    this.dialog.open(WarningComponent, { panelClass: 'custom-dialog-container-small', autoFocus: false, restoreFocus: false });
  }

}
