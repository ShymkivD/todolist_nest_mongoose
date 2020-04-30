import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { User } from "../models/user/user.interface";
import { UserAuthDto } from '../models/user/user.auth.dto';
import { JwtService } from '@nestjs/jwt';

import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel?: Model<User>,
              private readonly jwtService?: JwtService) {}

  async register(user: UserAuthDto) {
    const loginAvaibility = await this.userModel.findOne({ username: user.username }, (err, foundUser) => foundUser);
    if(loginAvaibility) return {
      msg: 'USERNAME IS ALREADY TAKEN'
    };
    const userPassword = user.password;
    const hashedPassword = bcrypt.hashSync(userPassword, 10);
    const newUser : UserAuthDto = {
      username: user.username,
      password: hashedPassword
    };

    const createdUser = new this.userModel(newUser);
    createdUser.save();

    return {
      msg: 'USER WAS SUCCESSFULLY CREATED'
    };
  }

  async logIn(userData: UserAuthDto) : Promise<any> {
    const user = await this.userModel.findOne({username: userData.username}, (err, foundUser) => foundUser);

    if(!user) return false;

    const passwordCorrectness = bcrypt.compareSync(userData.password, user.password);

    if(passwordCorrectness) {
      const payload = {
        id: user._id,
        username: user.username
      };

      const accessToken = this.jwtService.sign(payload);

      await this.userModel.updateOne({ username: userData.username }, {
        temporaryToken: accessToken
      });

      return {
        tokenExists: true,
        accessToken
      };
    }
    else return false;
  }

  async verifyJWT(token: string) {
    return await this.jwtService.verifyAsync(token).then((value) => {
      return true;
    }).catch(err => {
      return false;
    });
  }
}
