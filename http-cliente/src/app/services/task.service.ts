import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Declaramos una variable global que contenga el dominio del API para no repetir esta información a lo largo de todas las peticiones que hagamos
  private apiDomain = 'https://jsonplaceholder.typicode.com';
  
  constructor(private httpClient: HttpClient ) { }

  // Definimos el método GET que necesitamos para OBTENER todas las tareas
  getAllTasks() {
    // Definimos el path o url que utilizaremos para conectarnos al API y al endpoint que usaremos
    //  -> Lo podemos declarar así, pero como el dominio siempre será el mismo lo hemos pasado a la variable apiDomain. -> const apiPath = 'https://jsonplaceholder.typicode.com/todos';
    const apiPath = `${this.apiDomain}/todos/`
    console.log(this.apiDomain)
    // Retornamos un Array de tipo Task (El 'tipo Task' hace referencia a la interface que creamos previamente)
    // Gracias a que tenemos tipada la información que obtenemos, podremos acceder de forma más precisa a la información
    return this.httpClient.get<Task[]>(apiPath)
  } 

  // Definimos el método get que necesitamos para obtener una tarea específica
  // Como queremos obtener una única tarea, debemos enviarle por parámetro el id de la tarea que buscamos
  getOneTask (id: string) {
    //  -> Lo podemos declarar así, pero como el dominio siempre será el mismo lo hemos pasado a la variable apiDomain. -> const apiPath = `https://jsonplaceholder.typicode.com/todos/${id}`
    const apiPath = `${this.apiDomain}/todos/${id}`
    // Aquí no recibiremos un array, puesto que estamos consultando una única tarea.
    return this.httpClient.get<Task>(apiPath)
  }

  // Para CREAR una tarea usamos el método POST
  // Como debemos insertar una tarea, es necesario recibir como parámetro un objeto de tipo Task y así mismo, poder realizar la inserción a través del método POST
  createTask (task: Task) {
    const apiPath = `${this.apiDomain}/todos`;
    // El método POST no siempre se deja tipado, pero por lo general SI recibe dos parámetros.
    // 1. El path o URL que nos permitirá conectarnos al endpoint
    // 2. El objeto que deseamos insertar en la BD
    return this.httpClient.post(apiPath, task)
  }

  // Para ACUTUALIZAR una tarea usamos el método PUT
  // Similar al crear, debemos recibir el objeto completo de tipo Task que deseamos actualizar, por lo tanto, lo declaramos como parámetro
  // ----- Una pequeña desventaja del método PUT es que SIEMPRE debo enviar TODO el objeto, por lo tanto, NO puedo enviar únicamente la información que deseo cambiar dentro del objeto.
  updateTask (task: Task) {
    // Debido a que estamos actualizando una tarea en específico, debemos obtener el id del objeto en sí
    const apiPath = `${this.apiDomain}/todos/${task.id}`;
    return this.httpClient.put<Task>(apiPath, task)
  }

  // Para ELIMINAR una tarea usamos el método DELETE
  // Para usar este método solo necesitamos enviar el id de la tarea que queremos eliminar (Aunque esto dependerá del API que estemos consumiendo)
  deleteTask( id: string) {
    const apiPath = `${this.apiDomain}/todos/${id}`;
    return this.httpClient.delete(apiPath)    
  }
}
