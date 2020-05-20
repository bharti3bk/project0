import { getCustomRepository } from "typeorm";
import { TaskRespository } from "../repository/TaskRepository";
import { Task } from "../entity/Task";
import {
  controller,
  httpGet,
  httpPost,
  httpDelete,
  requestParam,
  requestBody,
} from "inversify-express-utils";
import { UserRepository } from "../repository/UserRepository";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationDelete,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiPath({
  path: "/api/tasks",
  name: "Task",
})
@controller("/api/tasks")
export class TaskController {
  private taskRepo: TaskRespository;
  private userRepo: UserRepository;

  constructor() {
    this.taskRepo = getCustomRepository(TaskRespository);
    this.userRepo = getCustomRepository(UserRepository);
  }

  //--------------------------------------------------------------------------------
  @ApiOperationGet({
    description: "Get all Tasks",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "Task",
      },
    },
  })
  @httpGet("/")
  async getTasks(): Promise<Task[]> {
    return await this.taskRepo.getTasks();
  }

  //--------------------------------------------------------------------------------
  @ApiOperationGet({
    description: "Get specific Task",
    parameters: {
      path: {
        id: {
          required: true,
          type: SwaggerDefinitionConstant.Parameter.Type.NUMBER,
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "Task",
      },
    },
  })
  @httpGet("/:id")
  async getTask(@requestParam("id") id: Number): Promise<Task | undefined> {
    return await this.taskRepo.getTask(id);
  }

  //--------------------------------------------------------------------------------
  @ApiOperationPost({
    description: "adds a Task",
    parameters: {
      body: {
        description: "new task",
        required: true,
        model: "Task",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "Task",
      },
    },
  })
  @httpPost("/")
  async addTask(@requestBody() task: Task): Promise<Task> {
    let user = await this.userRepo.getUser(task.user.id);

    if (user) {
      task.user = user;
      let result = this.taskRepo.addTask(task);
      (await result).user.password = "****"
      return result;
    }

    throw new Error("user id not found");
  }

  //--------------------------------------------------------------------------------
  @ApiOperationDelete({
    description: "Delets a Task",
    parameters: {
      path: {
        id: {
          required: true,
          type: SwaggerDefinitionConstant.Parameter.Type.NUMBER,
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "Task",
      },
    },
  })
  @httpDelete("/:id")
  async deleteTask(@requestParam("id") id: Number): Promise<Task> {
    return await this.taskRepo.deleteTask(id);
  }
}
