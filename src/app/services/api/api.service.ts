import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { firstValueFrom  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    body: any = null,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    const httpHeaders = new HttpHeaders(headers);

    const options = {
      headers: httpHeaders,
      body: body,
    };

    const observable = this.http.request<T>(method, url, options);
    return await firstValueFrom(observable);
  }
}
