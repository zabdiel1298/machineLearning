import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public todo: any;
  constructor(private http: HttpClient) {}
  getPasajeros(body: any) {
    const API_KEY =
      'RB9gXLk2EMa9EFLrBZ2BnpVoE7SDq+ZnmbREjkga8mKmgW4SqOq5wGff9z02C61WqmtoiRixKUyAWh5ijZX21A==';
    const path = 'http://localhost:4200/api';
    console.log(body);
    return this.http.post(path, body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-lenght': JSON.stringify(body).length.toString(),
      },
    });
  }
}
