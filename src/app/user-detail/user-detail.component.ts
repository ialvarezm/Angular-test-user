import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ApiService} from '../API/services/api.service';
import {User} from '../API/models/user';
import { NewUser } from '../API/models/new-user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})
export class UserDetailComponent implements OnInit, ApiService.UpdateUserParams {
  @Input() user: User;
  @Input() _id: string;

  constructor(
    private route: ActivatedRoute,
    private userService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let params: ApiService.UpdateUserParams = {
      user: this.user as NewUser,
      _id: this.user._id
    };

    this.userService.updateUser(params)
      .subscribe(() => this.goBack());
  }
}