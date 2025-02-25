import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    console.log("http " + this.http);
    return this.http.get(url);
  }

  async post(url: string, postData: any): Promise<any> {
    /*let test: Promise<Object> = this.http.get(url);
    test.then(value => {
      console.log(value);
    }).catch(error => {
      console.error(error);
    });
    return await lastValueFrom(this.http.post(url, postData));*/
  }

  updatePost(url: string, postData: any): Observable<any> {
    return this.http.put(url, postData);
  }

  deletePost(url: string, id: number): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
}
