import { BadRequestException, Injectable } from "@nestjs/common";
import {NotAcceptableException} from "@nestjs/common";
import {SignupUserDto} from "./dto/signup-user.dto";
import {User} from "../user/schema/user.schema"
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as crypto from 'crypto';
import { EmailService } from "./email.service";
import { UserRepository } from "src/user/user.repository";
import { jwtConstants } from "./constants/constants";
import { sign } from "jsonwebtoken";
import { Role } from "src/prod/enums/role.enum";

@Injectable()
export class AuthService {
    // validateUserById: any;
  constructor(
    private userService:UserService,
    private jwtService:JwtService,
    private emailService:EmailService,
    private userRepository:UserRepository
    ) {}
  
      //signup
      async signup(signUpUserDto:SignupUserDto) {
        const { password,role } = signUpUserDto;
        const user = await this.userRepository.createUser({...signUpUserDto,
          role,
          password: await AuthService.hashPassword(password),
        });
        return user
      } 
      //hashed password to save in database
      private static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
      }
      
      
      //login (Validat user here)
      async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findUserByEmail(email);
        if (!user || !(await this.validatePassword(password, user.password))) {
          return null; 
        }
        const payload = {
          username: user.username,
          email: user.email,
        };
        sign(payload, jwtConstants.secret, { expiresIn: '1h' });
        return user;
      }
      
      //login (Validat password here)
      async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
      }
      //login User
      async login(user: any ) {
        console.log(user);
        const payload = {
          id: user.id,
          userName: user.userName,
          email: user.email,
          password:user.password,
          role:user.role
        };
      const access_token = this.jwtService.sign(payload,jwtConstants)
          return {
            access_token };
        }

  // email for OTP
  generateOTP(): string {
        return crypto.randomBytes(2).toString('hex').toUpperCase();
      }
      async SendEmail(reqBody) {
        const OtpSender = await this.emailService.sendEmail(reqBody.email, 'EMAIL-SENDER', 'working.....');
      if (!OtpSender)
      {
        throw new NotAcceptableException(`User with email ${reqBody.email} not found`);
      }
      else
      {
        const otpGenerate = this.generateOTP();
          await this.emailService.sendEmail(reqBody.email, 'Your OTP Code', `Your OTP code is: ${otpGenerate}`);
          return ('OTP has been sent to your Email.')

        }
      }

      
      // forgetPassword with OTP
      async forgotPassword(reqBody) {
        const otpGenerate = this.generateOTP();
        const user = await this.userService.findUserByEmail(reqBody.email);
        if(!otpGenerate){
          throw new NotAcceptableException('OTP not Found');
        }
        if (!user)
        {
          throw new NotAcceptableException('could not find the user');
        }
        if (reqBody.newPassword !== reqBody.confirmPassword) {
          throw new BadRequestException('Passwords should be match');
        }
        if(reqBody.newPassword == reqBody.confirmPassword)
        {
          const saltOrRounds = 10;
            const updatedPass =  await bcrypt.hash(reqBody.confirmPassword,saltOrRounds);
            const result=await this.userRepository.updateData(reqBody.email,updatedPass);
            console.log(result);
          }
          return ('Password Successfully updated');
        }
      }
    
      // async validateUser( email: string, password:string): Promise<User | null> {
        //   const user = await this.UserService.findUserByEmail(email);
      //   console.log(user)
      //   const passwordValid = await bcrypt.compare(password, user.password)
      // if (!user)
      // {
      //   throw new NotAcceptableException('could not find the user');
      // }
      //   if (user && passwordValid)
      //   {
        //     return user;
        //   }
        //   return null;
        // }



        // const existingUser = await this.UserService.findUserByEmail(user.email);
        // console.log('user.email',user.email);
        //   if (existingUser) {
        //     throw new ConflictException('User already Exist');
        //   }