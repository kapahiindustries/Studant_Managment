import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentListModel, StudentModel } from '../constant/constants';

import { AddUserComponent } from '../add-user/add-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ELEMENT_DATA: StudentListModel[] = [];
  USER_DATA: StudentListModel[] = [];

  displayedColumns: string[] = ['name', 'last_name', 'email', 'class_name', 'roll_number', 'action'];
  dataSource = new MatTableDataSource<StudentListModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<StudentListModel>(true, []);
  users: string[] = [];
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  isLoading = false;
  email = '';
  searchQuery = '';
  timeOut: any = null;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAutocompleteTrigger) autoCompleteInput!: MatAutocompleteTrigger;

  constructor(private readonly userService: UserService, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents() {
    this.isLoading = true;
    this.userService.getStudents().subscribe((result: StudentModel) => {
      const timeOutTime = 50;
      this.ELEMENT_DATA = result.data;
      this.USER_DATA = result.data;
      this.dataSource = new MatTableDataSource<StudentListModel>(this.ELEMENT_DATA);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, timeOutTime);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  userSingleDeleteDialog(selectedStudent: StudentListModel) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { panelClass: 'custom-dialog-container-small', autoFocus: false, restoreFocus: false, data: { id: selectedStudent.id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.getStudents();
        this.selection.clear();
        this.searchQuery = '';
      }
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false, restoreFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.searchQuery = '';
        this.selection.clear();
        this.getStudents();
      }
    });
  }

  userEditDialog(selectedUser: StudentListModel) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      panelClass: 'custom-dialog-container-small', autoFocus: false, restoreFocus: false,
      data: { student: selectedUser }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        this.getStudents();
      }
    });
  }

}
