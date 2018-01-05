/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams
} from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { NewUser } from '../models/new-user';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class ApiService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }

  /**
   * Adds a user
   * @param user - New user
   */
  addUserResponse(user: NewUser): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = user;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = JSON.parse(_resp.body) as User;
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * Adds a user
   * @param user - New user
   */
  addUser(user: NewUser): Observable<User> {
    return this.addUserResponse(user).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Gets full list of users
   */
  getUsersResponse(): Observable<HttpResponse<User[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User[] = null;
        _body = _resp.body as User[]
        return _resp.clone({body: _body}) as HttpResponse<User[]>;
      })
    );
  }

  /**
   * Gets full list of users
   */
  getUsers(): Observable<User[]> {
    return this.getUsersResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Gets specific user by ID
   * @param _id - ID of user to fetch
   */
  getUserByIdResponse(_id: string): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/user/${_id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * Gets specific user by ID
   * @param _id - ID of user to fetch
   */
  getUserById(Id: string): Observable<User> {
    return this.getUserByIdResponse(Id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Updates user
   * @param user - Updated user
   * @param _id - ID of user to update
   */
  updateUserResponse(params: ApiService.UpdateUserParams): Observable<HttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.user;

    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/user/${params._id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: string = null;
        _body = _resp.body as string
        return _resp.clone({body: _body}) as HttpResponse<string>;
      })
    );
  }

  /**
   * Updates user
   * @param user - Updated user
   * @param _id - ID of user to update
   */
  updateUser(params: ApiService.UpdateUserParams): Observable<string> {
    return this.updateUserResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes user
   * @param _id - ID of user to delete
   */
  deleteUserResponse(_id: string): Observable<HttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/user/${_id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: string = null;
        _body = _resp.body as string
        return _resp.clone({body: _body}) as HttpResponse<string>;
      })
    );
  }

  /**
   * Deletes user
   * @param _id - ID of user to delete
   */
  deleteUser(_id: string): Observable<string> {
    return this.deleteUserResponse(_id).pipe(
        map(_r => _r.body)
    );
  }

  // /**
  //  * Gets list of users by search term
  //  */
  // getUsersSearchResponse(term: string): Observable<HttpResponse<User[]>> {
  //   let __params = this.newParams();
  //   let __headers = new HttpHeaders();
  //   let __body: any = null;
  //   let req = new HttpRequest<any>(
  //     "GET",
  //     this.rootUrl + `/user/search/${term}`,
  //     __body,
  //     {
  //       headers: __headers,
  //       params: __params,
  //       responseType: 'json'
  //     });

  //   return this.http.request<any>(req).pipe(
  //     filter(_r => _r instanceof HttpResponse),
  //     map(_r => {
  //       let _resp = _r as HttpResponse<any>;
  //       let _body: User[] = null;
  //       _body = _resp.body as User[]
  //       return _resp.clone({body: _body}) as HttpResponse<User[]>;
  //     })
  //   );
  // }

  /**
   * Search user by name
   * @param term - ID of user to delete
   */
    searchUsers(term: string): Observable<User[]> {
      let users;

      this.getUsersResponse().pipe(
        map(_r => users = _r.body)
      );

      return users;
    }
}

export module ApiService {
    export interface UpdateUserParams {
        user: NewUser;
        _id: string;
    }
}
