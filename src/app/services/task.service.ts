import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './../interfaces/task';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public todo: any;
  constructor(private http: HttpClient) {}
  getAllTasks(body: any) {
    //apikey  335B16A6qPAwCNriQ9053TgPTyIrhAFiYIclLtq0OdXBO6hXN0t4VY8/K34nrAG3D26Hqp0Uk17eGftbS3iRkw==

    const path =
      'http://localhost:4200/api';
    return this.http.post(path, body, {
      headers: {
        Authorization:
          'Bearer 335B16A6qPAwCNriQ9053TgPTyIrhAFiYIclLtq0OdXBO6hXN0t4VY8/K34nrAG3D26Hqp0Uk17eGftbS3iRkw==',
        'Content-Length': (JSON.stringify(body).length).toString(),
      },
    });
  }
}
