import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    try {
      await this.tasksRepository.save(createTaskDto.tasks);
      return 'Task created successfully';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.tasksRepository.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    const result = await this.tasksRepository.findOne({ where: { id } });
    if (result) {
      return result;
    }
    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const result = await this.tasksRepository.update(id, updateTaskDto);
      if (result.affected) {
        return `Task with id ${id} updated successfully`;
      }
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } catch (e: any) {
      // check if the exception already has a status code
      const httpStatus = e.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(e.message, httpStatus);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.tasksRepository.delete(id);
      if (result.affected) {
        return result;
      }
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } catch (e: any) {
      // check if the exception already has a status code
      const httpStatus = e.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(e.message, httpStatus);
    }
  }
}
