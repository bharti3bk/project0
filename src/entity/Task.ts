import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity()
@ApiModel({
  description: "Task Entity that holds task information",
})
export class Task {
  @PrimaryGeneratedColumn()
  public id: Number;

  @ApiModelProperty({
    description: "description of the task",
    required: true,
  })
  @Column()
  public description: String;

  @ApiModelProperty({
    description: "Task Completion Status",
    required: true,
  })
  @Column()
  public completed: Boolean;

  @ManyToOne((type) => User, (user) => user.task) // FK of user Table
  public user: User;
}
