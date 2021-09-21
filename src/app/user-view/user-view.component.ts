import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataHandleService } from '../shared/data-handle.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  @Input() isLoadData: boolean = false;
  @Input() usersData: UserModel[] = [];

  @Input() userEditMode: boolean[] = [];

  fname: FormControl[] = [];
  mname: FormControl[] = [];
  lname: FormControl[] = [];
  email: FormControl[] = [];
  pno: FormControl[] = [];
  role: FormControl[] = [];
  address: FormControl[] = [];

  constructor(private dataHandleService: DataHandleService) {}

  ngOnInit(): void {}

  editRow(i: number) {
    if (!this.fname[0]) {
      for (let i in this.usersData) {
        this.fname.push(new FormControl(''));
        this.mname.push(new FormControl(''));
        this.lname.push(new FormControl(''));
        this.email.push(new FormControl(''));
        this.pno.push(new FormControl(''));
        this.role.push(new FormControl(''));
        this.address.push(new FormControl(''));
      }
    }
    this.userEditMode[i] = true;
    this.fname[i].setValue(this.usersData[i].fname);
    this.mname[i].setValue(this.usersData[i].mname);
    this.lname[i].setValue(this.usersData[i].lname);
    this.email[i].setValue(this.usersData[i].email);
    this.pno[i].setValue(this.usersData[i].pno);
    if (this.usersData[i].role === 'subscriber') {
      this.role[i].setValue('subscriber');
    } else if (this.usersData[i].role === 'admin') {
      this.role[i].setValue('admin');
    } else {
      this.role[i].setValue('superAdmin');
    }
    this.address[i].setValue(this.usersData[i].address);
  }

  saveRow(i: number) {
    let newUserData: UserModel = {
      id: +this.usersData[i].id,
      fname: this.fname[i].value,
      mname: this.mname[i].value,
      lname: this.lname[i].value,
      email: this.email[i].value,
      pno: this.pno[i].value,
      role: this.role[i].value,
      address: this.address[i].value,
    };
    this.dataHandleService.saveRow(newUserData).subscribe((response) => {
      if (response.message === 'success') {
        this.userEditMode[i] = false;
        this.usersData.push(newUserData);
        this.usersData.splice(i, 1);
        this.usersData = [...this.usersData.sort(function(a, b) { 
          return a.id - b.id;
        })];
      }
    });
  }

  deleteData(i: number) {
    this.dataHandleService
      .deleteRow(+this.usersData[i].id)
      .subscribe((response) => {
        if (response.message == 'success') {
          this.usersData.splice(i, 1);
          this.userEditMode.splice(i, 1);
        }
      });
  }
  cancelEdit(i: number) {
    this.userEditMode[i] = false;
  }
}
