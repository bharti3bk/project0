import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Min, Max, IsEmail, NotContains, MinLength, ArrayContains } from "class-validator";
import { Task } from "./Task";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@Entity()
@ApiModel({
  description: "User Entity that holds User information",
})
export class User {
  @PrimaryGeneratedColumn()
  public id: Number;

  @ApiModelProperty({
    description: "age of the User",
    required: true,
  })
  @Column()
  @Min(1)
  @Max(150)
  public age: Number;

  @ApiModelProperty({
    description: "name of the user",
    required: true,
  })
  @Column()
  public name: String;

  @OneToMany((type) => Task, (task) => task.user)
  public task: Task[];

  @ApiModelProperty({
    description: "email of the user",
    required: true,
  })
  @Column()
  @IsEmail()
  public email: String;

  @ApiModelProperty({
    description: "password of the User",
    required: true,
  })
  @Column()
  @MinLength(7)
  @NotContains("password")
  public password: String; 

  @ApiModelProperty({
    description: "role of the User",
    required: true,
  })
  @Column()
  @ArrayContains(["admin", "member"])
  public role: String
}
