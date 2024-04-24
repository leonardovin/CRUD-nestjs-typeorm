interface ITask {
  id: number;
  title: string;
  description?: string;
  done: boolean;
}

export class CreateTaskDto {
  tasks: ITask[];
}
