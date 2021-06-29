import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from './../interfaces/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public todo:any
  constructor(
    private http: HttpClient
  ) { }
  getAllTasks(){
    //apikey  335B16A6qPAwCNriQ9053TgPTyIrhAFiYIclLtq0OdXBO6hXN0t4VY8/K34nrAG3D26Hqp0Uk17eGftbS3iRkw==

    const path='https://ussouthcentral.services.azureml.net/workspaces/be769bc549c24feb8cc5715d5120eaa1/services/65f2625e6f5b4b35ad7f6aa692b9d873/execute?api-version=2.0&details=true';
    return this.http.post<Task[]>((``),path);
  }
}

