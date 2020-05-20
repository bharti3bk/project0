import { createConnection, Repository, getCustomRepository } from "typeorm";
import { Container } from "inversify";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import "./controllers/UserController";
import "./controllers/TaskController";
import "./controllers/AuthController";
import "./middleware/AuthenticateJwt";
import * as bodyParser from "body-parser";
import { SwaggerDefinitionConstant } from "swagger-express-ts";
import * as swagger from "swagger-express-ts";
import * as express from "express";
import { AuthenticateJwt } from "./middleware/AuthenticateJwt";
import { User } from "./entity/User";
import { UserRepository } from "./repository/UserRepository";
import { Task } from "./entity/Task";
import { TaskRespository } from "./repository/TaskRepository";

// Setup a container
let container = new Container();
container.bind<AuthenticateJwt>(Symbol.for('AuthenticateJwt')).to(AuthenticateJwt);

createConnection().then(() => {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(bodyParser.json());
    app.use("/api-docs/swagger", express.static("swagger"));
    app.use(
      "/api-docs/swagger/assets",
      express.static("node_modules/swagger-ui-dist")
    );
    app.use(
      swagger.express({
        definition: {
          info: {
            title: "Task Api",
            version: "1.0",
          },
          externalDocs: {
            url: "http://localhost:3000",
          },
        },
      })
    );
  });
  let app = server.build();
  app.listen(3000); 
  console.log("working"); 
  app.use()
}); 


