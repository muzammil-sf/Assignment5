import { Component, EventEmitter, Output } from '@angular/core';
import { DataHandleService } from './shared/data-handle.service';
import { UserModel } from './user-view/user.model';
// import { UserViewComponent } from './user-view/user-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  usersData: UserModel[] = [];
  userEditMode: boolean[] = []
  isLoadData = false;
  constructor(private dataHandleService: DataHandleService) {}
  
  ngOnInit() {
    this.fetchData();
    for (let i in this.usersData) {
      this.userEditMode.push(false);
    }
  }

  onLoadData() {
    this.isLoadData = true;
  }
  newUserAdded(userData: UserModel) {
    this.usersData.push(userData);
    // this.usersData = [...this.usersData.sort(function(a, b) { 
    //   return a.id - b.id;
    // })];
  }

  userEditModeChanged(userEditMode: any) {
    this.userEditMode = [...userEditMode];
  }

  fetchData(): void {
    this.dataHandleService.fetchUsers().subscribe((response: UserModel[]) => {
      this.usersData = response;
      response.map(() => {
        this.userEditMode.push(false);
      });
      this.usersData = [...this.usersData.sort(function(a, b) { 
        return a.id - b.id;
      })];
    });
    
  }
}
