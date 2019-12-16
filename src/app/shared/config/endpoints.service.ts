import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  private apiUrl = environment.apiUrl;


  private usersUrl = {
    getAllUsers: 'dashboard/users',
    getOneUser: 'dashboard/user/',
  };

  constructor(private http: HttpClient) {}

  fetchAllUsers() {
    try {
      return this.http.get(`${this.apiUrl}${this.usersUrl.getAllUsers}`);
    } catch (error) {
      alert(error);
    }
  }



}
