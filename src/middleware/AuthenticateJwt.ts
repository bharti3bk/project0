import {injectable} from 'inversify'
import * as jwt from "jsonwebtoken";
import {logger} from '../logging/Logging'

@injectable()
export class AuthenticateJwt {
 
    validateUser(token: String | undefined , role: String){
      if(token) {
      jwt.verify( token?.toString() , 'myaccesstokensign' , (error: any, user: any) => { 
          if(error) { 
              logger.error("Invalid token")
              throw new Error('Invalid token')
          } 

          if(user.role == role) {
              return;
          }
          else {
              logger.warn(`user ${user.name} is not authrized`)
              throw new Error("user not authorized");
          }
      } )
    }
    else {
        logger.error("Token was empty in request")
        throw new Error("token not provided")
    }
}
}