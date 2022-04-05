import { AddStudentModel, StudentListModel, StudentModel } from '../constant/constants';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})


/**
 * This class is for creating services related to user management
 */
export class UserService {


    constructor(private readonly httpClient: HttpClient) {
    }


    /**
     * method to get list of all students
     */
    public getStudents(): Observable<StudentModel> {
        const endpoint = 'api/student';
        return this.httpClient.get<StudentModel>(`${environment.baseUrl}${endpoint}`);
    }

    /**
   * method to add student
   */
    public addStudent(postData: Object): Observable<AddStudentModel> {
        const endPoint = 'api/student';
        return this.httpClient.post<AddStudentModel>(`${environment.baseUrl}${endPoint}`, postData);
    }



    /**
    * method to edit student
    */
    public editStudent(postData: Object) {
        const endPoint = 'Users/update';
        return this.httpClient.post(`${endPoint}`, postData);
    }

    /**
     * method to delete student
     */
    public deleteStudent(id: number) {
        const endPoint = 'api/student';
        return this.httpClient.delete(`${environment.baseUrl}${endPoint}/${id}`);
    }

}

