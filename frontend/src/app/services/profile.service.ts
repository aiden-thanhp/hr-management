import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  createProfile(newProfile: any, userId: any): Observable<any> {
    return this.http.post("http://localhost:3000/profile", { newProfile, userId }, httpOptions)
  }
}
