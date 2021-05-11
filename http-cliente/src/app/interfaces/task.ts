export interface Task {
  userId: string;
  // Como no siempre debemos enviar el id desde el front y enviarlo puede generar problemas en la BD o en los consecutivos que se están manejando, debemos dejar este campo como opcional. Esto lo hacemos añadiendo un signo de pregunta después del nombre de la variable
  id?: string;
  title: string;
  completed: boolean;
}
