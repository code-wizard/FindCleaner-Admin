import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  saveToLocalStorage = (storageName, storageContents): Observable<boolean> => {
    const storageNameToString = storageName.toString();
    const storageContentsStringified = JSON.stringify(storageContents);
    localStorage.setItem(storageNameToString, storageContentsStringified);
    return of(true);
  };

  getFromLocalStorage = storageName => {
    const storageNameToString = storageName.toString();
    return localStorage.getItem(storageNameToString);
  };

  deleteFromLocalStorage = storageName => {
    const storageNameToString = storageName.toString();
    localStorage.removeItem(storageNameToString);
  };
}
