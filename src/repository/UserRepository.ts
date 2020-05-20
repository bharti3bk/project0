import { Repository, EntityRepository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(): Promise<User[]> {
    return await this.find();
  }

  async getUser(userId: Number): Promise<User | undefined> {
    return await this.findOne({ where: { id: userId } });
  } 

 async getUserByEmail(email: String): Promise<User | undefined>{
  return await this.findOne({ where: { email: email } });
  }

  async addUser(user: User): Promise<User> {
    return await this.save(user);
  }

  async deleteUser(userId: Number): Promise<User> {
    return await (await this.delete({ id: userId })).raw;
  } 


}
