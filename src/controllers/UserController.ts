import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { getCustomRepository ,} from "typeorm";
import {
  controller,
  httpGet,
  httpPost,
  httpDelete,
  requestParam,
  requestBody,
  BaseHttpController,
} from "inversify-express-utils";
import { TaskRespository } from "../repository/TaskRepository";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationDelete,
  SwaggerDefinitionConstant
} from "swagger-express-ts";
import * as bcrypt from "bcrypt";
import { AuthenticateJwt } from "../middleware/AuthenticateJwt";
import { inject } from "inversify";
import {logger}  from '../logging/Logging'
@ApiPath({
  path: "/api/users",
  name: "User",
})
@controller("/api/users")
export class UserController extends BaseHttpController {
  private userRepo: UserRepository;
  private taskRepo: TaskRespository;
  private authJwt: AuthenticateJwt;


  constructor(@inject(Symbol.for("AuthenticateJwt")) authJwt: AuthenticateJwt) {
    super();
    this.userRepo = getCustomRepository(UserRepository);
    this.taskRepo = getCustomRepository(TaskRespository);
    this.authJwt = authJwt;
  }

  @ApiOperationGet({
    description: "Get specific User",
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
        model: "User",
      },
    },
  })
  @httpGet("/:id")
  async getUser(@requestParam("id") id: Number): Promise<User> {

    let user = await this.userRepo.getUser(id);
    if (user) {
      logger.info("Getting user with id: " + user.id);
      let tasks = await this.taskRepo.getTasksByUserId(user.id);
      user.task = tasks;
      logger.info("Get User complete")
      user.password = "****"
      return user;
    }

    throw new Error("user not found");
  }

  @ApiOperationGet({
    description: "Get all Users",

    security: {
      headers: [{auth: {description:"jwt token", type: SwaggerDefinitionConstant.Response.Type.STRING, required: true}}]
    },
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "User",
      },
    },
  })
  @httpGet("/")
  async getAllUsers(): Promise<User[]> {
    this.authJwt.validateUser(this.httpContext.request.headers['auth']?.toString(), 'admin')
    logger.info("Getting all users")
    let users = await this.userRepo.getUsers();
    logger.info("Get complete for all users");
    return Promise.all(users.map(async (u) => await this.getUser(u.id)));
  }

  @ApiOperationPost({
    description: "adds a User",
    parameters: {
      body: {
        description: "new user",
        required: true,
        model: "User",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: "User",
      },
    },
  })
  @httpPost("/")
  async addUser(@requestBody() user: User): Promise<User> {
    this.authJwt.validateUser(this.httpContext.request.headers['auth']?.toString(), 'admin')
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;
    let result = await this.userRepo.addUser(user);
    result.password = "*****";
    return result;
  }

  @ApiOperationDelete({
    description: "Deletes a User",
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
        model: "User",
      },
    },
  })
  @httpDelete("/:id")
  async deleteUser(@requestParam("id") id: Number): Promise<User> {
    return await this.userRepo.deleteUser(id);
  }
}
