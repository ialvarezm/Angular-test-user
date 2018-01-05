import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/services/api.service';
import { User } from '../API/models/user';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
 
  constructor(private userService: ApiService) { }
 
  ngOnInit() {
    this.getUsers();
  }
 
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users.slice(1, 5));
  }
}