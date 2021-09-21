import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../user-view/user.model';
@Injectable({ providedIn: 'root' })
export class DataHandleService {
  constructor(private http: HttpClient) {}

  addUser(userData: {
    fname: string;
    mname: string;
    lname: string;
    email: string;
    pno: string;
    role: string;
    address: string;
  }) {
    return this.http.post<{ message: string; data: UserModel }>(
      'http://localhost:3000/addData',
      userData
    );
  }

  fetchUsers() {
    return this.http.get<UserModel[]>('http://localhost:3000/refreshData');
  }

  deleteRow(rowId: number) {
    return this.http.delete<{ message: string }>(
      `http://localhost:3000/deleterow/${rowId}`
    );
  }

  saveRow(newUserData: {
    fname: string;
    mname: string;
    lname: string;
    email: string;
    pno: string;
    role: string;
    address: string;
  }) {
    return this.http.post<{ message: string }>(
      'http://localhost:3000/editRow',
      newUserData
    );
  }
}
