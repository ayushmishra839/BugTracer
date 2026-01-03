import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private apiUrl = 'http://localhost:5000/api/bugs';

  constructor(private http: HttpClient) { }

  getBugs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBug(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBug(bugData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bugData);
  }

  updateBug(id: string, bugData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, bugData);
  }

  assignBug(id: string, assignedTo: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/assign`, { assignedTo });
  }

  deleteBug(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
