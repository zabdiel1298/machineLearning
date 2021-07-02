import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'machine-learning';
  constructor(private taskService: TaskService) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService
      .getAllTasks({
        Inputs: {
          input1: {
            ColumnNames: ['UserId', 'movieId', 'Rating', 'Timestamp'],
            Values: [
              ['0', '0', '0', '0'],
              ['0', '0', '0', '0'],
            ],
          },
        },
        GlobalParameters: {},
      })
      .subscribe(
        (todos) => {
          console.log({ todos });
        },
        (err) => console.log(err)
      );
  }
}
