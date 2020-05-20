import { Repository, EntityRepository } from "typeorm";

import { Task } from "../entity/Task";
import { UserRepository } from "./UserRepository";

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {
  private userRepo: UserRepository;

  async getTasks(): Promise<Task[]> {
    return await this.find();
  }

  async getTask(taskId: Number): Promise<Task | undefined> {
    return await this.findOne({ where: { id: taskId } });
  }

  async addTask(task: Task): Promise<Task> {
    return await this.save(task);
  }

  async deleteTask(taskId: Number): Promise<Task> {
    return await (await this.delete({ id: taskId })).raw;
  }

  async getTasksByUserId(userId: Number): Promise<Task[]> {
    return await this.find({ where: { userId: userId } });
  }
}
