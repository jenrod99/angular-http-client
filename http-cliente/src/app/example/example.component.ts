import { Component, OnInit } from '@angular/core';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.sass']
})
export class ExampleComponent implements OnInit {

  constructor( private taskService: TaskService) { }

  ngOnInit(): void {
  }

  // Como ya importamos nuestro servicio, podemos acceder a las funciones que están dentro de el, en este caso será "getAllTasks"
  getAllTasks () {
    this.taskService.getAllTasks().subscribe(tasks => console.log(tasks))
  }

  // Debido a que debemos enviar el identificador de la tarea que deseamos consultar, escribimos 'numero'
  getOneTask() {
    this.taskService.getOneTask('5').subscribe(task => console.log(task))
  }

  createTask(){
    const newTask = {
      // -> Ya no es necesario enviar el id, ya que declaramos el id como opcional dentro de nuestra interface
      // id: '201', // NO siempre debemos enviarle el id. Debido a que en nuestra interfaz está como obligatorio se lo enviamos
      userId: '1',
      title: 'My New Task',
      completed: false,
    }

    // Envíamos la tarea creada anteriormente 
    this.taskService.createTask(newTask).subscribe((newTask) => console.log(newTask))
  }

  updateTask(){
    const updatedTask = {
      id : '200',
      userId: '2',
      title: 'Updated Task',
      completed: false,
    }
    //Envíamos la tarea actualizada
    this.taskService.updateTask(updatedTask).subscribe(updatedTask => {console.log(updatedTask)})
  }

  deleteTask() {
    this.taskService.deleteTask('5').subscribe(deletedTask => console.log(deletedTask))
  }

}
