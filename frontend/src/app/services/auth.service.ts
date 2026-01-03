import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    console.log('Attempting login with:', email);
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(map(response => {
        console.log('Login response:', response);
        const user = response.user;
        const token = response.token;
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        this.currentUserSubject.next(user);
        
        return response;
      }));
  }

  register(userData: any) {
    console.log('Attempting registration with:', userData);
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  logout() {
    console.log('Logging out user');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  getMe() {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
