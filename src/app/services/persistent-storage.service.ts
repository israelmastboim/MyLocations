import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistentStorageService {

  constructor() { }

  getFromStorageByKey(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  setToStorageByKey(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
