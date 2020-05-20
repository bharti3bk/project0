import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { getCustomRepository } from "typeorm";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationDelete,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { UserToken } from "../interface/UserToken";
import { LoginInput } from "../interface/LoginInput";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

@ApiPath({
  path: "/api/login",
  name: "Auth",
})
@controller("/api/login")
export class AuthController {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = getCustomRepository(UserRepository);
  }

  @ApiOperationPost({
    description: "login User",
    parameters: {
      body: {
        description: "logins a user",
        required: true,
        model: "LoginInput",
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
  async login(@requestBody() userInput: LoginInput): Promise<UserToken> {
    let user = await this.userRepo.getUserByEmail(userInput.email);
    if (user) {
      if (bcrypt.compareSync(userInput.password, user.password.toString())) {
        let token = jwt.sign(
          { username: user.name, email: user.email, role: user.role },
          "myaccesstokensign"
        );
        return {
          accessToken: token,
        };
      } else {
        throw new Error("User or Password is Incorrect");
      }
    } else {
      throw new Error("User not found");
    }
  }
}
