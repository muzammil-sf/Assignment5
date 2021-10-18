import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataHandleService } from '../shared/data-handle.service';
import { UserModel } from '../user-view/user.model';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css'],
})
export class AddNewUserComponent implements OnInit {
  addUserForm: FormGroup;
  @Output() userAdded = new EventEmitter<UserModel>();
  constructor(private dataHandleService: DataHandleService, fb: FormBuilder) {
    this.addUserForm = fb.group({
      fname: fb.control('', { validators: Validators.required }),
      mname: fb.control('', { validators: Validators.required }),
      lname: fb.control('', { validators: Validators.required }),
      email: fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      pno: fb.control('', { validators: Validators.required }),
      role: fb.control('subscriber', { validators: Validators.required }),
      address: fb.control('', { validators: Validators.required }),
    });
  }

  ngOnInit(): void {}

  addData(): void {
    if (!this.addUserForm.valid) {
      return;
    }
    this.dataHandleService
      .addUser(this.addUserForm.value)
      .subscribe((response) => {
        if (response.message == 'success') {
          this.userAdded.emit(response.data);
          this.addUserForm.reset();
          this.addUserForm.patchValue({
            role: 'subscriber',
          });
        }
      });
  }
}
