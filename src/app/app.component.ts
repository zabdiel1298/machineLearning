import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'machine-learning';
  constructor(
    private taskService:TaskService
  ){}

  getAllTasks(){
    this.taskService.getAllTasks()
    .subscribe(todos =>{
      console.log({todos});
    })
  }
}
