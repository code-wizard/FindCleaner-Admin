import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  expiredToken = new BehaviorSubject<any>('');
  reloadService = new BehaviorSubject<boolean>(true);
  signedInUserDetails = new BehaviorSubject<any>('');
  tokenGenerated = new BehaviorSubject<string>('');
  httpStatus = new BehaviorSubject<string>('firstload');
  filterQueryClientIDs = new BehaviorSubject<string>('');

  constructor(private router: Router, private http: HttpClient) {}


  // Alert Message for Adding informations into the database
  alert(data: any) {
    const swalWithBootstrapButtons = Swal.mixin({});
    swalWithBootstrapButtons.fire(data.header, data.text, data.type);
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError = (error: any): Observable<any> => {
    let message = '';
    if (error) {
      if (error.error) {
        message = error.error.message;
      } else {
        message = error.message;
      }
    }
    console.log(message, ' General Error Message');
    return of(null);
  }

  sweetAlertUpdates(type) {
    return Swal.fire({
      title: `Update ${type}?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    });
  }

  sweetAlertDeletions(type) {
    return Swal.fire({
      title: `Delete ${type}?`,
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  }

  sweetAlertSucess(action, msg) {
    return Swal.fire(`${action}`, msg, 'success');
  }

  sweetAlertError(msg) {
    return Swal.fire('Try again!', msg, 'error');
  }

  sweetAlertFieldValidation(fields) {
    return Swal.fire({
      text: `${fields}`,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Okay'
    });
  }
}
