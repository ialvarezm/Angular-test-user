import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../API/services/api.service';
import { User } from '../API/models/user';
import { NewUser } from '../API/models/new-user';
import { log } from 'util';
//import { loadavg } from 'os';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  user = new NewUser('test', 12);

  constructor(private userService: ApiService) { }

  ngOnInit() {
    this.getUsers();
  }

  add(newUser: NewUser): void {
    this.userService.addUser({ newUser } as NewUser)
      .subscribe(userRes => {
        this.users.push(userRes);
      });
  }

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users);
  }


  delete(id: string): void {
    this.users = this.users.filter(h => h._id !== id);
    this.userService.deleteUser(id).subscribe();
  }
}
