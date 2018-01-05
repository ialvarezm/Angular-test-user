import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {ApiService} from '../API/services/api.service';
import {User} from '../API/models/user';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: [ './user-search.component.css' ]
})

export class UserSearchComponent implements OnInit {
    users$: User[];
    filteredUsers: User[] = [];

    constructor(private userService: ApiService) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        if(term != '') {
            this.searchUsers(term);
        } else {
            this.filteredUsers = [];
        }
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(users => this.users$ = users);
    }

    searchUsers(term: string) {
        this.filteredUsers = this.users$.filter(user => {
            return user.name.toLowerCase().includes(term.toLowerCase());
        });
    }
}