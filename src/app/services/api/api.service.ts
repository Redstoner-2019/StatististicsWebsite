import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  post(url: string, postData: any): any {
    this.http.post(url, postData).subscribe(response => {
      return response;
    });
    //return this.http.post(url, postData);
  }

  updatePost(url: string, id: number, postData: any): Observable<any> {
    return this.http.put(`${url}/${id}`, postData);
  }

  deletePost(url: string, id: number): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
}
